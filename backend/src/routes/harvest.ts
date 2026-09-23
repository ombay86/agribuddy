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

// GET /
router.get('/', (req: Request, res: Response) => {
  const harvests = db.getCollection("harvests");
  res.json(harvests);
});

// POST /
router.post('/', (req: Request, res: Response) => {
  const data = req.body;
  const newHarvest = {
    ...data,
    status: data.status || "TERSIMPAN"
  };
  const inserted = db.insert("harvests", newHarvest);
  res.json(inserted);
});

// GET /market-prices
router.get('/market-prices', (req: Request, res: Response) => {
  res.json(MARKET_PRICES);
});

export default router;
