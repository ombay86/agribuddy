import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { db } from '../database/db.js';

const router = Router();

// GET /notifications?user_id=...
router.get('/', (req: Request, res: Response) => {
  const userId = req.query.user_id as string;
  const allNotifs = db.getCollection("notifications");

  if (!userId) {
    return res.json(allNotifs.reverse());
  }

  const userNotifs = allNotifs.filter((n: any) => n.user_id === userId);
  // Sort descending by created_at
  userNotifs.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  res.json(userNotifs);
});

// POST /notifications/:notifId/respond
router.post('/:notifId/respond', (req: Request, res: Response) => {
  const { notifId } = req.params;
  const { action } = req.body; // 'ACCEPT' | 'REJECT'

  const allNotifs = db.getCollection("notifications");
  const notif = allNotifs.find((n: any) => n.id === notifId);

  if (!notif) {
    return res.status(404).json({ detail: "Notifikasi tidak ditemukan" });
  }

  if (notif.status !== 'PENDING') {
    return res.status(400).json({ detail: "Undangan kolaborasi ini sudah pernah direspon sebelumnya." });
  }

  const farms = db.getCollection("farmlands");
  const farm = farms.find((f: any) => f.id === notif.farm_id);

  if (!farm) {
    return res.status(404).json({ detail: "Data lahan terkait tidak ditemukan" });
  }

  const collabs = farm.collaborators || [];
  const targetCollabIndex = collabs.findIndex((c: any) => 
    c.id === notif.collab_id || c.user_id === notif.user_id || c.name === notif.to_user_name
  );

  if (action === 'ACCEPT') {
    if (targetCollabIndex !== -1) {
      collabs[targetCollabIndex].status = 'ACTIVE';
    } else {
      collabs.push({
        id: notif.collab_id || `collab_${crypto.randomBytes(3).toString('hex')}`,
        user_id: notif.user_id,
        name: notif.to_user_name,
        role: notif.role || 'Penggarap Lahan',
        share_percentage: notif.share_percentage || 20,
        status: 'ACTIVE'
      });
    }

    db.update("farmlands", farm.id, { collaborators: collabs });

    // Update notifikasi penerima
    db.update("notifications", notif.id, {
      status: 'RESOLVED_ACCEPTED',
      is_read: true
    });

    // Kirim notifikasi balasan ke pemilik lahan
    db.insert("notifications", {
      user_id: notif.from_user_id,
      type: 'COLLAB_RESPONSE',
      title: 'Undangan Kolaborasi Disetujui! 🎉',
      message: `${notif.to_user_name} telah MENERIMA undangan kolaborasi pada lahan "${farm.name}" (${notif.share_percentage}% bagi hasil).`,
      farm_id: farm.id,
      farm_name: farm.name,
      status: 'INFO',
      is_read: false
    });

    return res.json({
      success: true,
      message: `Anda telah bergabung sebagai kolaborator pada lahan ${farm.name}`,
      farm_id: farm.id
    });

  } else if (action === 'REJECT') {
    // Hapus kolaborator pending dari lahan
    const filteredCollabs = collabs.filter((c: any) => 
      !(c.id === notif.collab_id || c.user_id === notif.user_id || c.name === notif.to_user_name)
    );

    db.update("farmlands", farm.id, { collaborators: filteredCollabs });

    // Update notifikasi penerima
    db.update("notifications", notif.id, {
      status: 'RESOLVED_REJECTED',
      is_read: true
    });

    // Kirim notifikasi balasan ke pemilik lahan
    db.insert("notifications", {
      user_id: notif.from_user_id,
      type: 'COLLAB_RESPONSE',
      title: 'Undangan Kolaborasi Ditolak',
      message: `${notif.to_user_name} menolak undangan kolaborasi pada lahan "${farm.name}". Porsi persentase telah dikembalikan ke Anda.`,
      farm_id: farm.id,
      farm_name: farm.name,
      status: 'INFO',
      is_read: false
    });

    return res.json({
      success: true,
      message: `Undangan kolaborasi telah ditolak.`,
      farm_id: farm.id
    });
  } else {
    return res.status(400).json({ detail: "Aksi tidak valid, pilih ACCEPT atau REJECT" });
  }
});

// PATCH /notifications/:notifId/read
router.patch('/:notifId/read', (req: Request, res: Response) => {
  const { notifId } = req.params;
  const updated = db.update("notifications", notifId, { is_read: true });
  if (!updated) {
    return res.status(404).json({ detail: "Notifikasi tidak ditemukan" });
  }
  res.json(updated);
});

export default router;
