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

// GET /services
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
  res.json({ status: "success", message: "Layanan berhasil dihapus dari katalog." });
});

// ==================== IN-APP CHECKOUT & NOTIFIKASI ====================
// POST /checkout
router.post('/checkout', (req: Request, res: Response) => {
  const payload = req.body;
  const services = db.getCollection("ecosystem_services");
  const service = services.find((s: any) => s.id === payload.service_id);

  if (!service) {
    return res.status(404).json({ detail: "Layanan atau produk tidak ditemukan" });
  }

  const unitPrice = Number(service.price) || 0;
  const qty = Number(payload.quantity) || 1;
  const totalPrice = qty * unitPrice;
  const orderId = `ord_${crypto.randomBytes(4).toString('hex')}`;
  const timestamp = formatTimeIndo();

  const orderItem = {
    id: orderId,
    service_id: service.id,
    service_title: service.title,
    seller_id: service.provider_id,
    seller_name: service.provider_name,
    buyer_id: payload.buyer_id,
    buyer_name: payload.buyer_name,
    quantity: qty,
    unit: payload.unit || service.price_unit || "",
    unit_price: unitPrice,
    total_price: totalPrice,
    payment_method: payload.payment_method,
    delivery_notes: payload.delivery_notes || "",
    status: "MENUNGGU_KONFIRMASI",
    created_at: timestamp
  };
  db.insert("service_orders", orderItem);

  // Trigger notifikasi instan untuk Seller
  const sellerNotif = {
    id: `notif_${crypto.randomBytes(4).toString('hex')}`,
    user_id: service.provider_id,
    title: "Pesanan Jasa Baru Masuk! 🛒",
    message: `${payload.buyer_name} memesan ${service.title} (${qty} ${payload.unit || service.price_unit || ''}) senilai Rp ${totalPrice.toLocaleString('id-ID')}.`,
    type: "ORDER_RECEIVED",
    reference_id: orderId,
    is_read: false,
    created_at: timestamp
  };
  db.insert("notifications", sellerNotif);

  // Trigger notifikasi untuk Buyer
  const buyerNotif = {
    id: `notif_${crypto.randomBytes(4).toString('hex')}`,
    user_id: payload.buyer_id,
    title: "Pesanan Terkirim ke Mitra ✅",
    message: `Pesanan ${service.title} telah diteruskan ke ${service.provider_name}. Menunggu konfirmasi pengerjaan.`,
    type: "ORDER_STATUS",
    reference_id: orderId,
    is_read: false,
    created_at: timestamp
  };
  db.insert("notifications", buyerNotif);

  res.json({
    status: "success",
    message: "Pesanan berhasil dibuat",
    order: orderItem,
    seller_notified: service.provider_name
  });
});

// GET /notifications
router.get('/notifications', (req: Request, res: Response) => {
  const userId = (req.query.user_id as string) || "usr_petani";
  const notifs = db.getCollection("notifications");
  const userNotifs = notifs.filter((n: any) => n.user_id === userId);
  userNotifs.sort((a: any, b: any) => (b.created_at || '').localeCompare(a.created_at || ''));
  res.json(userNotifs);
});

// PATCH /notifications/:notifId/read
router.patch('/notifications/:notifId/read', (req: Request, res: Response) => {
  const { notifId } = req.params;
  const updated = db.update("notifications", notifId, { is_read: true });

  if (!updated) {
    return res.status(404).json({ detail: "Notifikasi tidak ditemukan" });
  }
  res.json(updated);
});

// POST /notifications/mark-all-read
router.post('/notifications/mark-all-read', (req: Request, res: Response) => {
  const userId = (req.query.user_id as string) || "usr_petani";
  const notifs = db.getCollection("notifications");

  for (const n of notifs) {
    if (n.user_id === userId && !n.is_read) {
      db.update("notifications", n.id, { is_read: true });
    }
  }
  res.json({ message: "Semua notifikasi telah ditandai dibaca" });
});

// ==================== SELLER & BUYER ORDERS ====================
// GET /orders/seller
router.get('/orders/seller', (req: Request, res: Response) => {
  const sellerId = req.query.seller_id as string;
  const orders = db.getCollection("service_orders");
  const sellerOrders = orders.filter((o: any) => o.seller_id === sellerId);
  sellerOrders.sort((a: any, b: any) => (b.created_at || '').localeCompare(a.created_at || ''));
  res.json(sellerOrders);
});

// GET /orders/buyer
router.get('/orders/buyer', (req: Request, res: Response) => {
  const buyerId = req.query.buyer_id as string;
  const orders = db.getCollection("service_orders");
  const buyerOrders = orders.filter((o: any) => o.buyer_id === buyerId);
  buyerOrders.sort((a: any, b: any) => (b.created_at || '').localeCompare(a.created_at || ''));
  res.json(buyerOrders);
});

// PATCH /orders/:orderId/status
router.patch('/orders/:orderId/status', (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { status, seller_notes } = req.body;

  const orders = db.getCollection("service_orders");
  const order = orders.find((o: any) => o.id === orderId);

  if (!order) {
    return res.status(404).json({ detail: "Pesanan tidak ditemukan" });
  }

  const timestamp = formatTimeIndo();
  const updates = {
    status,
    seller_notes: seller_notes || "",
    status_updated_at: timestamp
  };
  const updated = db.update("service_orders", orderId, updates);

  const notifConfig: Record<string, [string, string]> = {
    "DIPROSES": ["Pesanan Sedang Diproses 🚜", "Pesanan Anda sedang dipersiapkan dan dijadwalkan oleh penyedia."],
    "SEDANG_DIKIRIM": ["Pesanan Mulai Dikirim / Berangkat 🚚", "Barang atau armada pengerjaan sedang menuju ke lokasi lahan Anda."],
    "SELESAI": ["Pesanan Telah Tuntas & Selesai ✅", "Penyedia telah menyelesaikan layanan/pengiriman pesanan Anda."],
    "STOK_HABIS": ["Pemberitahuan: Stok Habis / Jadwal Penuh ⚠️", "Penyedia mengabarkan bahwa stok barang atau slot jadwal pengerjaan sedang tidak tersedia."],
    "DIBATALKAN": ["Pesanan Dibatalkan ❌", "Pesanan Anda tidak dapat diproses oleh penyedia."]
  };

  const [title, defaultMsg] = notifConfig[status] || ["Status Pesanan Diperbarui 📦", "Status pesanan Anda telah diperbarui oleh penjual."];
  const noteSuffix = seller_notes ? ` Catatan penjual: "${seller_notes}"` : ` ${defaultMsg}`;
  const customMsg = `${order.seller_name || 'Penjual'} mengonfirmasi pesanan ${order.service_title || ''}: [${status}].${noteSuffix}`;

  const buyerNotif = {
    id: `notif_${crypto.randomBytes(4).toString('hex')}`,
    user_id: order.buyer_id || "usr_petani",
    title,
    message: customMsg,
    type: "ORDER_STATUS",
    reference_id: orderId,
    is_read: false,
    created_at: timestamp
  };
  db.insert("notifications", buyerNotif);

  res.json({
    status: "success",
    message: `Status pesanan berhasil diubah menjadi ${status}`,
    order: updated
  });
});

// ==================== DISKUSI PESANAN & PRODUK ====================
// GET /orders/:orderId/messages
router.get('/orders/:orderId/messages', (req: Request, res: Response) => {
  const { orderId } = req.params;
  const msgs = db.getCollection("order_messages");
  res.json(msgs.filter((m: any) => m.order_id === orderId));
});

// POST /orders/:orderId/messages
router.post('/orders/:orderId/messages', (req: Request, res: Response) => {
  const { orderId } = req.params;
  const payload = req.body;

  const orders = db.getCollection("service_orders");
  const order = orders.find((o: any) => o.id === orderId);

  if (!order) {
    return res.status(404).json({ detail: "Pesanan tidak ditemukan" });
  }

  const isBuyer = (payload.sender_id === order.buyer_id);
  const senderRole = isBuyer ? "PEMBELI" : "PENJUAL";
  const recipientId = isBuyer ? order.seller_id : order.buyer_id;
  const timestamp = formatTimeIndo();

  const msgObj = {
    id: `msg_${crypto.randomBytes(4).toString('hex')}`,
    order_id: orderId,
    sender_id: payload.sender_id,
    sender_name: payload.sender_name,
    sender_role: senderRole,
    message: payload.message,
    created_at: timestamp
  };
  db.insert("order_messages", msgObj);

  if (recipientId) {
    const notif = {
      id: `notif_${crypto.randomBytes(4).toString('hex')}`,
      user_id: recipientId,
      title: "Pesan Diskusi Pesanan 💬",
      message: `${payload.sender_name}: "${payload.message.substring(0, 60)}..."`,
      type: "ORDER_DISCUSSION",
      reference_id: orderId,
      is_read: false,
      created_at: timestamp
    };
    db.insert("notifications", notif);
  }

  res.json(msgObj);
});

// GET /services/:serviceId/discussions
router.get('/services/:serviceId/discussions', (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const discussions = db.getCollection("product_discussions");
  res.json(discussions.filter((d: any) => d.service_id === serviceId));
});

// POST /services/:serviceId/discussions
router.post('/services/:serviceId/discussions', (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const payload = req.body;

  const services = db.getCollection("ecosystem_services");
  const service = services.find((s: any) => s.id === serviceId);

  if (!service) {
    return res.status(404).json({ detail: "Layanan tidak ditemukan" });
  }

  const timestamp = formatTimeIndo();
  const discObj = {
    id: `disc_${crypto.randomBytes(4).toString('hex')}`,
    service_id: serviceId,
    user_id: payload.user_id,
    user_name: payload.user_name,
    user_avatar: payload.user_avatar || "🌾",
    question: payload.question,
    reply: null,
    replied_by: null,
    replied_at: null,
    created_at: timestamp
  };
  db.insert("product_discussions", discObj);

  const providerId = service.provider_id;
  if (providerId && providerId !== payload.user_id) {
    const notif = {
      id: `notif_${crypto.randomBytes(4).toString('hex')}`,
      user_id: providerId,
      title: "Pertanyaan Baru di Produk Anda! ❓",
      message: `${payload.user_name} bertanya di "${service.title}": "${payload.question.substring(0, 60)}..."`,
      type: "PRODUCT_DISCUSSION",
      reference_id: serviceId,
      is_read: false,
      created_at: timestamp
    };
    db.insert("notifications", notif);
  }

  res.json(discObj);
});

// POST /services/:serviceId/discussions/:discussionId/reply
router.post('/services/:serviceId/discussions/:discussionId/reply', (req: Request, res: Response) => {
  const { serviceId, discussionId } = req.params;
  const payload = req.body;

  const services = db.getCollection("ecosystem_services");
  const service = services.find((s: any) => s.id === serviceId);

  const discussions = db.getCollection("product_discussions");
  const disc = discussions.find((d: any) => d.id === discussionId);

  if (!disc) {
    return res.status(404).json({ detail: "Diskusi tidak ditemukan" });
  }

  const timestamp = formatTimeIndo();
  const updates = {
    reply: payload.reply,
    replied_by: payload.replied_by,
    replied_at: timestamp
  };
  const updated = db.update("product_discussions", discussionId, updates);

  const askerId = disc.user_id;
  if (askerId) {
    const svcTitle = service?.title || "Layanan";
    const notif = {
      id: `notif_${crypto.randomBytes(4).toString('hex')}`,
      user_id: askerId,
      title: "Jawaban Diskusi Produk 💡",
      message: `${payload.replied_by} menjawab pertanyaan Anda di "${svcTitle}": "${payload.reply.substring(0, 60)}..."`,
      type: "PRODUCT_DISCUSSION",
      reference_id: serviceId,
      is_read: false,
      created_at: timestamp
    };
    db.insert("notifications", notif);
  }

  res.json(updated);
});

export default router;
