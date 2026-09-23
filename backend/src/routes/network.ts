import { Router, Request, Response } from 'express';
import { db } from '../database/db.js';

const router = Router();

// GET /partners
router.get('/partners', (req: Request, res: Response) => {
  const category = req.query.category as string;
  let partners = db.getCollection("partners");

  if (category && category !== 'SEMUA') {
    partners = partners.filter((p: any) => p.category === category);
  }
  res.json(partners);
});

// POST /connect/:partnerId
router.post('/connect/:partnerId', (req: Request, res: Response) => {
  const { partnerId } = req.params;
  const partners = db.getCollection("partners");
  const partner = partners.find((p: any) => p.id === partnerId);

  if (!partner) {
    return res.status(404).json({ detail: "Mitra tidak ditemukan" });
  }

  const newStatus = !partner.is_connected;
  db.update("partners", partnerId, { is_connected: newStatus });

  res.json({
    is_connected: newStatus,
    message: newStatus
      ? `Terhubung dengan ${partner.name}. Anda dapat langsung menawarkan hasil panen.`
      : `Koneksi dengan ${partner.name} diputuskan.`
  });
});

// POST /offer-harvest
router.post('/offer-harvest', (req: Request, res: Response) => {
  const payload = req.body;
  const partners = db.getCollection("partners");
  const partner = partners.find((p: any) => p.id === payload.partner_id);

  if (!partner) {
    return res.status(404).json({ detail: "Mitra tujuan tidak ditemukan" });
  }

  const priceText = payload.offered_price_per_kg
    ? `Rp ${payload.offered_price_per_kg.toLocaleString('id-ID')}/kg`
    : "Sesuai harga pasar terbaik";

  const message = `Halo ${partner.pic_name}, saya dari AgriBuddy ingin menawarkan hasil panen:\n` +
    `🌾 Komoditas: ${payload.commodity}\n` +
    `⚖️ Estimasi Volume: ${payload.weight_kg} kg\n` +
    `💰 Harapan Harga: ${priceText}\n` +
    (payload.notes ? `📝 Catatan: ${payload.notes}\n` : '') +
    `Apakah KUD/Penggilingan siap menyerap panen kami? Terima kasih.`;

  const phone = partner.phone_whatsapp.replace(/\D/g, '');
  const cleanPhone = phone.startsWith('0') ? '62' + phone.substring(1) : phone;
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  const createdAt = `${now.toLocaleDateString('id-ID', options)} WIB`;

  const newOffer = {
    partner_id: partner.id,
    partner_name: partner.name,
    commodity: payload.commodity,
    weight_kg: payload.weight_kg,
    offered_price_per_kg: payload.offered_price_per_kg,
    status: "MENUNGGU_RESPON",
    created_at: createdAt,
    whatsapp_url: waUrl
  };

  const inserted = db.insert("offers", newOffer);
  res.json(inserted);
});

// GET /offers
router.get('/offers', (req: Request, res: Response) => {
  const offers = db.getCollection("offers");
  res.json(offers);
});

export default router;
