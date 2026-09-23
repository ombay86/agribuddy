import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { db } from '../database/db.js';

const router = Router();

function formatTimeIndo(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  return `${now.toLocaleDateString('id-ID', options)} WIB`;
}

// GET /farmlands
router.get('/', (req: Request, res: Response) => {
  const userId = req.query.user_id as string;
  const farms = db.getCollection("farmlands");

  if (userId) {
    return res.json(farms.filter((f: any) => f.user_id === userId));
  }
  res.json(farms);
});

// GET /farmlands/:farmId
router.get('/:farmId', (req: Request, res: Response) => {
  const { farmId } = req.params;
  const farms = db.getCollection("farmlands");
  const farm = farms.find((f: any) => f.id === farmId);

  if (!farm) {
    return res.status(404).json({ detail: "Data lahan sawah tidak ditemukan" });
  }
  res.json(farm);
});

// POST /farmlands
router.post('/', (req: Request, res: Response) => {
  const userId = (req.query.user_id as string) || "usr_petani";
  const payload = req.body;

  if (!payload.land_size_ha || payload.land_size_ha <= 0) {
    return res.status(400).json({ detail: "Luas lahan harus lebih besar dari 0 Ha." });
  }

  const users = db.getCollection("users");
  const user = users.find((u: any) => u.id === userId);
  const ownerName = user?.full_name || "Petani";

  let collaborators = [];
  if (payload.collaborators && Array.isArray(payload.collaborators) && payload.collaborators.length > 0) {
    collaborators = payload.collaborators;
  } else {
    collaborators = [
      {
        id: `collab_${crypto.randomBytes(3).toString('hex')}`,
        name: ownerName,
        role: "Pemilik Lahan & Pengelola Utama",
        share_percentage: 100.0,
        phone: user?.phone_number || ""
      }
    ];
  }

  const newFarm = {
    id: `farm_${crypto.randomBytes(3).toString('hex')}`,
    user_id: userId,
    name: payload.name,
    land_size_ha: Number(payload.land_size_ha),
    commodity: payload.commodity || "Padi Sawah Inpari 32",
    soil_type: payload.soil_type || "Lempung Berliat (Subur)",
    water_source: payload.water_source || "Irigasi Teknis Bendungan",
    location: payload.location || "Desa Sukamaju, Jawa Timur",
    latitude: payload.latitude !== undefined ? Number(payload.latitude) : -7.2504,
    longitude: payload.longitude !== undefined ? Number(payload.longitude) : 112.7512,
    collaborators,
    capital_expenses: [],
    created_at: new Date().toISOString()
  };

  const inserted = db.insert("farmlands", newFarm);
  res.json(inserted);
});

// PUT /farmlands/:farmId
router.put('/:farmId', (req: Request, res: Response) => {
  const { farmId } = req.params;
  const payload = req.body;
  const farms = db.getCollection("farmlands");
  const farm = farms.find((f: any) => f.id === farmId);

  if (!farm) {
    return res.status(404).json({ detail: "Lahan tidak ditemukan" });
  }

  const updates: Record<string, any> = {};
  if (payload.name !== undefined) updates.name = payload.name;
  if (payload.land_size_ha !== undefined) {
    if (payload.land_size_ha <= 0) {
      return res.status(400).json({ detail: "Luas lahan harus lebih besar dari 0 Ha." });
    }
    updates.land_size_ha = Number(payload.land_size_ha);
  }
  if (payload.commodity !== undefined) updates.commodity = payload.commodity;
  if (payload.soil_type !== undefined) updates.soil_type = payload.soil_type;
  if (payload.water_source !== undefined) updates.water_source = payload.water_source;
  if (payload.location !== undefined) updates.location = payload.location;
  if (payload.latitude !== undefined) updates.latitude = Number(payload.latitude);
  if (payload.longitude !== undefined) updates.longitude = Number(payload.longitude);
  if (payload.collaborators !== undefined) updates.collaborators = payload.collaborators;

  const updated = db.update("farmlands", farmId, updates);
  res.json(updated);
});

// DELETE /farmlands/:farmId
router.delete('/:farmId', (req: Request, res: Response) => {
  const { farmId } = req.params;
  const success = db.delete("farmlands", farmId);

  if (!success) {
    return res.status(404).json({ detail: "Lahan tidak ditemukan" });
  }
  res.json({ message: "Lahan sawah berhasil dihapus", farm_id: farmId });
});

// POST /farmlands/:farmId/collaborators
router.post('/:farmId/collaborators', (req: Request, res: Response) => {
  const { farmId } = req.params;
  const collaborator = req.body;
  const farms = db.getCollection("farmlands");
  const farm = farms.find((f: any) => f.id === farmId);

  if (!farm) {
    return res.status(404).json({ detail: "Lahan tidak ditemukan" });
  }

  const collabs = farm.collaborators || [];
  const newC = { ...collaborator };
  if (!newC.id) {
    newC.id = `collab_${crypto.randomBytes(3).toString('hex')}`;
  }

  collabs.push(newC);
  const updated = db.update("farmlands", farmId, { collaborators: collabs });
  res.json(updated);
});

// DELETE /farmlands/:farmId/collaborators/:collaboratorId
router.delete('/:farmId/collaborators/:collaboratorId', (req: Request, res: Response) => {
  const { farmId, collaboratorId } = req.params;
  const farms = db.getCollection("farmlands");
  const farm = farms.find((f: any) => f.id === farmId);

  if (!farm) {
    return res.status(404).json({ detail: "Lahan tidak ditemukan" });
  }

  const collabs = (farm.collaborators || []).filter((c: any) => c.id !== collaboratorId);
  const updated = db.update("farmlands", farmId, { collaborators: collabs });
  res.json(updated);
});

// POST /farmlands/:farmId/expenses
router.post('/:farmId/expenses', (req: Request, res: Response) => {
  const { farmId } = req.params;
  const payload = req.body;
  const farms = db.getCollection("farmlands");
  const farm = farms.find((f: any) => f.id === farmId);

  if (!farm) {
    return res.status(404).json({ detail: "Lahan tidak ditemukan" });
  }

  const expenseItem = {
    id: `exp_${crypto.randomBytes(3).toString('hex')}`,
    farm_id: farmId,
    item_name: payload.item_name,
    amount: Number(payload.amount),
    category: payload.category,
    source: payload.source || "MARKETPLACE",
    order_ref_id: payload.order_ref_id || null,
    date: formatTimeIndo()
  };

  const expenses = farm.capital_expenses || [];
  expenses.unshift(expenseItem);
  db.update("farmlands", farmId, { capital_expenses: expenses });

  const totalExpenses = expenses.reduce((acc: number, curr: any) => acc + (Number(curr.amount) || 0), 0);

  res.json({
    message: `Biaya Rp ${Number(payload.amount).toLocaleString('id-ID')} berhasil dicatat ke Buku Modal ${farm.name}`,
    expense: expenseItem,
    farm_id: farmId,
    total_expenses: totalExpenses
  });
});

// GET /farmlands/:farmId/expenses
router.get('/:farmId/expenses', (req: Request, res: Response) => {
  const { farmId } = req.params;
  const farms = db.getCollection("farmlands");
  const farm = farms.find((f: any) => f.id === farmId);

  if (!farm) {
    return res.status(404).json({ detail: "Lahan tidak ditemukan" });
  }
  res.json(farm.capital_expenses || []);
});

export default router;
