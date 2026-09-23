import { Router, Request, Response } from 'express';
import { db } from '../database/db.js';

const router = Router();

// GET /
router.get('/', (req: Request, res: Response) => {
  const items = db.getCollection("inventory");
  const processed = items.map((item: any) => ({
    ...item,
    is_low_stock: (item.quantity || 0) <= (item.min_threshold || 2)
  }));
  res.json(processed);
});

// POST /
router.post('/', (req: Request, res: Response) => {
  const item = req.body;
  const inserted = db.insert("inventory", item);
  res.json({
    ...inserted,
    is_low_stock: (inserted.quantity || 0) <= (inserted.min_threshold || 2)
  });
});

// PATCH /:id/quick-adjust
router.patch('/:id/quick-adjust', (req: Request, res: Response) => {
  const { id } = req.params;
  const { delta } = req.body;
  const items = db.getCollection("inventory");
  const current = items.find((i: any) => i.id === id);

  if (!current) {
    return res.status(404).json({ detail: "Item inventaris tidak ditemukan" });
  }

  const newQty = Math.max(0, (current.quantity || 0) + (Number(delta) || 0));
  const updated = db.update("inventory", id, { quantity: newQty });

  res.json({
    ...updated,
    is_low_stock: newQty <= (current.min_threshold || 2)
  });
});

// DELETE /:id
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const success = db.delete("inventory", id);
  if (!success) {
    return res.status(404).json({ detail: "Item tidak ditemukan" });
  }
  res.json({ message: "Item berhasil dihapus" });
});

export default router;
