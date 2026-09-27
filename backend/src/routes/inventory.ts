import { Router, Request, Response } from 'express';
import { db } from '../database/db.js';

const router = Router();

const isUserJoko = (uid: string) => uid === 'usr_petani' || uid === 'usr_001';

// GET /
router.get('/', (req: Request, res: Response) => {
  const userId = (req.query.user_id as string) || (req.headers['x-user-id'] as string) || '';
  const items = db.getCollection("inventory");

  let userItems = items;
  if (userId) {
    if (isUserJoko(userId)) {
      userItems = items.filter((item: any) => !item.user_id || isUserJoko(item.user_id));
    } else {
      userItems = items.filter((item: any) => item.user_id === userId);
    }
  }

  const processed = userItems.map((item: any) => ({
    ...item,
    is_low_stock: (item.quantity || 0) <= (item.min_threshold || 2)
  }));
  res.json(processed);
});

// POST /
router.post('/', (req: Request, res: Response) => {
  const userId = (req.query.user_id as string) || (req.headers['x-user-id'] as string) || 'usr_petani';
  const item = {
    ...req.body,
    user_id: userId
  };
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

// POST /:id/orders (Pesan Restock via WA)
router.post('/:id/orders', (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const items = db.getCollection("inventory");
  const current = items.find((i: any) => i.id === id);

  if (!current) {
    return res.status(404).json({ detail: "Item inventaris tidak ditemukan" });
  }

  const now = new Date();
  const timeStr = now.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }) + ' WIB';

  const newOrder = {
    id: `ord_${Date.now()}`,
    store_name: payload.store_name || "Kios Saprotan",
    store_phone: payload.store_phone || "",
    quantity: Number(payload.quantity) || 1,
    unit: current.unit || "Unit",
    delivery_address: payload.delivery_address || "",
    notes: payload.notes || "",
    created_at: timeStr,
    status: "PENDING"
  };

  const pendingOrders = current.pending_orders || [];
  pendingOrders.unshift(newOrder);

  const updated = db.update("inventory", id, { pending_orders: pendingOrders });
  res.json({
    message: "Pesanan berhasil dicatat sebagai proses berjalan",
    order: newOrder,
    item: {
      ...updated,
      is_low_stock: (updated.quantity || 0) <= (updated.min_threshold || 2)
    }
  });
});

// POST /:id/orders/:orderId/confirm (Konfirmasi Barang Sampai -> Tambah Stok)
router.post('/:id/orders/:orderId/confirm', (req: Request, res: Response) => {
  const { id, orderId } = req.params;
  const items = db.getCollection("inventory");
  const current = items.find((i: any) => i.id === id);

  if (!current) {
    return res.status(404).json({ detail: "Item inventaris tidak ditemukan" });
  }

  const pendingOrders = current.pending_orders || [];
  const targetOrder = pendingOrders.find((o: any) => o.id === orderId);

  if (!targetOrder) {
    return res.status(404).json({ detail: "Pesanan tidak ditemukan" });
  }

  // Tambahkan jumlah produk sesuai pesanan
  const addedQty = Number(targetOrder.quantity) || 0;
  const newQty = (current.quantity || 0) + addedQty;

  // Hapus dari pending_orders dan pindahkan ke riwayat selesai jika diperlukan
  const remainingOrders = pendingOrders.filter((o: any) => o.id !== orderId);

  const updated = db.update("inventory", id, {
    quantity: newQty,
    pending_orders: remainingOrders
  });

  res.json({
    message: `Pesanan ${addedQty} ${current.unit} telah sampai! Stok berhasil ditambahkan.`,
    item: {
      ...updated,
      is_low_stock: newQty <= (current.min_threshold || 2)
    },
    added_quantity: addedQty
  });
});

// POST /:id/orders/:orderId/cancel (Batalkan Pesanan)
router.post('/:id/orders/:orderId/cancel', (req: Request, res: Response) => {
  const { id, orderId } = req.params;
  const items = db.getCollection("inventory");
  const current = items.find((i: any) => i.id === id);

  if (!current) {
    return res.status(404).json({ detail: "Item inventaris tidak ditemukan" });
  }

  const pendingOrders = current.pending_orders || [];
  const remainingOrders = pendingOrders.filter((o: any) => o.id !== orderId);

  const updated = db.update("inventory", id, { pending_orders: remainingOrders });

  res.json({
    message: "Pesanan berhasil dibatalkan",
    item: {
      ...updated,
      is_low_stock: (updated.quantity || 0) <= (updated.min_threshold || 2)
    }
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
