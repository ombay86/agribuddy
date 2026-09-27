import { Router, Request, Response } from 'express';
import { db } from '../database/db.js';

const router = Router();

const MARKET_PRICES = [
  {
    commodity: "Gabah Kering Panen (GKP)",
    price_per_kg: 6850,
    trend: "up",
    change_percent: "+2.5%",
    note: "Harga stabil di penggilingan lokal"
  },
  {
    commodity: "Gabah Kering Giling (GKG)",
    price_per_kg: 7900,
    trend: "stable",
    change_percent: "0.0%",
    note: "Standar kadar air 14% SNI"
  },
  {
    commodity: "Beras Medium IR-64",
    price_per_kg: 13200,
    trend: "up",
    change_percent: "+1.2%",
    note: "Tingkat konsumsi pasar tradisional tinggi"
  },
  {
    commodity: "Jagung Pipil Kering",
    price_per_kg: 5600,
    trend: "down",
    change_percent: "-1.8%",
    note: "Pasokan dari panen raya Blitar melimpah"
  }
];

const isUserJoko = (uid: string) => uid === 'usr_petani' || uid === 'usr_001';

// GET /
router.get('/', (req: Request, res: Response) => {
  const userId = (req.query.user_id as string) || (req.headers['x-user-id'] as string) || '';
  const harvests = db.getCollection("harvests");

  let userHarvests: any[] = [];
  if (userId) {
    if (isUserJoko(userId)) {
      userHarvests = harvests.filter((item: any) => !item.user_id || isUserJoko(item.user_id));
    } else {
      userHarvests = harvests.filter((item: any) => item.user_id === userId);
    }
  }

  res.json(userHarvests);
});

// POST /
router.post('/', (req: Request, res: Response) => {
  const userId = (req.query.user_id as string) || (req.headers['x-user-id'] as string) || req.body.user_id || 'usr_petani';
  const data = req.body;
  const newHarvest = {
    ...data,
    user_id: userId,
    status: data.status || "TERSIMPAN"
  };
  const inserted = db.insert("harvests", newHarvest);
  res.json(inserted);
});

// DELETE /:id
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const success = db.delete("harvests", id);
  if (!success) {
    return res.status(404).json({ detail: "Catatan panen tidak ditemukan" });
  }
  res.json({ message: "Catatan panen berhasil dihapus" });
});

// GET /market-prices
router.get('/market-prices', (req: Request, res: Response) => {
  res.json(MARKET_PRICES);
});

export default router;
