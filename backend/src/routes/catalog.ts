import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { db } from '../database/db.js';

const router = Router();

const CATEGORY_LABELS: Record<string, string> = {
  "JASA_TRAKTOR": "Jasa Olah Tanah",
  "JASA_PENGAIRAN": "Jasa Pengairan",
  "JASA_TENAGA_KERJA": "Tenaga Kerja Tani",
  "SAPROTAN": "Pupuk & Benih",
  "HASIL_PANEN": "Penyerapan Panen",
  "PASCA_PANEN": "Jasa Pasca Panen"
};

// GET /services (Direktori Layanan Ekosistem)
router.get('/services', (req: Request, res: Response) => {
  const category = req.query.category as string;
  const search = req.query.search as string;

  const services = db.getCollection("ecosystem_services");
  const results = [];

  for (const s of services) {
    if (category && category !== 'SEMUA' && s.category !== category) {
      continue;
    }
    if (search) {
      const q = search.toLowerCase();
      const titleMatch = (s.title || '').toLowerCase().includes(q);
      const descMatch = (s.description || '').toLowerCase().includes(q);
      const provMatch = (s.provider_name || '').toLowerCase().includes(q);
      const tagMatch = (s.tags || []).some((t: string) => t.toLowerCase().includes(q));
      if (!(titleMatch || descMatch || provMatch || tagMatch)) {
        continue;
      }
    }
    results.push(s);
  }

  res.json(results);
});

// GET /my-services
router.get('/my-services', (req: Request, res: Response) => {
  const activeUserId = (req.headers['x-user-id'] as string) || (req.query.user_id as string) || 'usr_petani';
  const services = db.getCollection("ecosystem_services");
  const userServices = services.filter((s: any) => s.provider_id === activeUserId);
  res.json(userServices);
});

// POST /services
router.post('/services', (req: Request, res: Response) => {
  const activeUserId = (req.headers['x-user-id'] as string) || (req.query.user_id as string) || 'usr_petani';
  const payload = req.body;
  const users = db.getCollection("users");
  const user = users.find((u: any) => u.id === activeUserId);

  const providerName = user?.full_name || "Pengguna AgriBuddy";
  const providerBadge = user?.category_badge || user?.role_label || "Penyedia Jasa";
  const providerPhone = payload.phone || user?.whatsapp_number || user?.phone_number || "08123456789";

  const avatarMap: Record<string, string> = {
    "JASA_TRAKTOR": "🚜",
    "JASA_PENGAIRAN": "💧",
    "JASA_TENAGA_KERJA": "🌾",
    "SAPROTAN": "🏪",
    "HASIL_PANEN": "📦",
    "PASCA_PANEN": "🚚"
  };
  const avatar = avatarMap[payload.category] || "🌾";

  const itemData = {
    id: `srv_${crypto.randomBytes(4).toString('hex')}`,
    provider_id: activeUserId,
    provider_name: providerName,
    provider_badge: providerBadge,
    provider_avatar: avatar,
    image_url: payload.image_url,
    rating: 5.0,
    completed_orders_count: 0,
    title: payload.title,
    category: payload.category,
    category_label: CATEGORY_LABELS[payload.category] || "Layanan Ekosistem",
    price: Number(payload.price) || 0,
    price_unit: payload.price_unit,
    location: payload.location || (user?.village || "Desa Sukamaju"),
    phone: providerPhone,
    description: payload.description,
    tags: payload.tags || [],
    is_available: payload.is_available !== undefined ? payload.is_available : true,
    created_at: new Date().toISOString()
  };

  const inserted = db.insert("ecosystem_services", itemData);
  res.json(inserted);
});

// PUT /services/:serviceId
router.put('/services/:serviceId', (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const payload = req.body;
  const services = db.getCollection("ecosystem_services");
  const service = services.find((s: any) => s.id === serviceId);

  if (!service) {
    return res.status(404).json({ detail: "Layanan tidak ditemukan." });
  }

  const updates: Record<string, any> = { ...payload };
  if (updates.category) {
    updates.category_label = CATEGORY_LABELS[updates.category] || "Layanan Ekosistem";
  }

  const updated = db.update("ecosystem_services", serviceId, updates);
  res.json(updated);
});

// DELETE /services/:serviceId
router.delete('/services/:serviceId', (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const success = db.delete("ecosystem_services", serviceId);

  if (!success) {
    return res.status(404).json({ detail: "Layanan tidak ditemukan." });
  }
  res.json({ status: "success", message: "Layanan berhasil dihapus dari direktori." });
});

export default router;
