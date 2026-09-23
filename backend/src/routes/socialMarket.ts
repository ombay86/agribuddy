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

// ==================== KIOS SAPROTAN ====================
// GET /products
router.get('/products', (req: Request, res: Response) => {
  const category = req.query.category as string;
  let products = db.getCollection("shop_products");

  if (category && category !== 'SEMUA') {
    products = products.filter((p: any) => p.category === category);
  }
  res.json(products);
});

// POST /products
router.post('/products', (req: Request, res: Response) => {
  const payload = req.body;
  const inserted = db.insert("shop_products", payload);
  res.json(inserted);
});

// POST /orders
router.post('/orders', (req: Request, res: Response) => {
  const payload = req.body;
  const products = db.getCollection("shop_products");
  const product = products.find((p: any) => p.id === payload.product_id);

  if (!product) {
    return res.status(404).json({ detail: "Produk saprotan tidak ditemukan" });
  }

  const qty = Number(payload.quantity) || 1;
  const totalPrice = product.price * qty;

  const newOrder = {
    product_id: product.id,
    product_name: product.name,
    product_type: product.category,
    quantity: qty,
    unit: product.unit,
    total_price: totalPrice,
    buyer_name: payload.buyer_name || "Pak Joko (Petani)",
    seller_name: product.seller_name,
    payment_method: payload.payment_method || "COD / Bayar Saat Ambil",
    status: "DIPESAN",
    created_at: formatTimeIndo(),
    delivery_note: payload.delivery_note || ""
  };

  const inserted = db.insert("saprotan_orders", newOrder);
  res.json(inserted);
});

// GET /orders
router.get('/orders', (req: Request, res: Response) => {
  const orders = db.getCollection("saprotan_orders");
  res.json(orders);
});

// PATCH /orders/:orderId/status
router.patch('/orders/:orderId/status', (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const updated = db.update("saprotan_orders", orderId, { status });

  if (!updated) {
    return res.status(404).json({ detail: "Pesanan tidak ditemukan" });
  }

  res.json({ order: updated, message: `Status pesanan diubah menjadi ${status}` });
});

// ==================== BURSA PANEN & LELANG ====================
// GET /listings
router.get('/listings', (req: Request, res: Response) => {
  const listings = db.getCollection("market_listings");
  res.json(listings);
});

// POST /listings
router.post('/listings', (req: Request, res: Response) => {
  const payload = req.body;
  const newListing = {
    seller_name: payload.seller_name || "Pak Joko (Petani)",
    commodity: payload.commodity,
    total_weight_kg: Number(payload.total_weight_kg) || 1000,
    starting_price_per_kg: Number(payload.starting_price_per_kg) || 6800,
    min_order_kg: Number(payload.min_order_kg) || 500,
    location: payload.location || "Lumbung Desa Sukamaju",
    status: "DIBUKA",
    notes: payload.notes || "Kadar air normal, gabah bersih siap serap.",
    created_at: formatTimeIndo(),
    bids: []
  };

  const inserted = db.insert("market_listings", newListing);
  res.json(inserted);
});

// POST /listings/:listingId/bids
router.post('/listings/:listingId/bids', (req: Request, res: Response) => {
  const { listingId } = req.params;
  const payload = req.body;
  const listings = db.getCollection("market_listings");
  const listing = listings.find((l: any) => l.id === listingId);

  if (!listing) {
    return res.status(404).json({ detail: "Tiket lelang tidak ditemukan" });
  }

  const bids = listing.bids || [];
  const newBid = {
    id: `bid_${crypto.randomBytes(4).toString('hex')}`,
    bidder_name: payload.bidder_name,
    bidder_role: payload.bidder_role || "PEDAGANG",
    bid_price_per_kg: Number(payload.bid_price_per_kg),
    bid_weight_kg: Number(payload.bid_weight_kg),
    notes: payload.notes || "Siap jemput lumbung",
    status: "MENUNGGU",
    created_at: formatTimeIndo()
  };

  bids.push(newBid);
  db.update("market_listings", listingId, { bids });
  res.json(newBid);
});

// POST /listings/:listingId/accept-bid/:bidId
router.post('/listings/:listingId/accept-bid/:bidId', (req: Request, res: Response) => {
  const { listingId, bidId } = req.params;
  const listings = db.getCollection("market_listings");
  const listing = listings.find((l: any) => l.id === listingId);

  if (!listing) {
    return res.status(404).json({ detail: "Tiket lelang tidak ditemukan" });
  }

  const bids = listing.bids || [];
  let acceptedBid: any = null;

  for (const bid of bids) {
    if (bid.id === bidId) {
      bid.status = "DISETUJUI";
      acceptedBid = bid;
    } else {
      bid.status = "DITOLAK";
    }
  }

  if (!acceptedBid) {
    return res.status(404).json({ detail: "Tawaran bid tidak ditemukan" });
  }

  db.update("market_listings", listingId, {
    status: "TERJUAL",
    bids,
    accepted_bid: acceptedBid
  });

  res.json({
    message: `Penawaran dari ${acceptedBid.bidder_name} berhasil disetujui! Transaksi telah dikunci.`,
    accepted_bid: acceptedBid
  });
});

// ==================== FEED SOSIAL KOMUNITAS ====================
// GET /posts
router.get('/posts', (req: Request, res: Response) => {
  const posts = db.getCollection("community_posts");
  res.json(posts);
});

// POST /posts
router.post('/posts', (req: Request, res: Response) => {
  const payload = req.body;
  const categoryLabels: Record<string, string> = {
    TANYA_HAMA: "Hama & Penyakit",
    INFO_POKTAN: "Info Poktan",
    TIPS_TANI: "Tips Budidaya",
    BERITA_HARGA: "Kabar Pasar"
  };

  const newPost = {
    author_name: payload.author_name || "Pak Joko",
    author_role: payload.author_role || "PETANI",
    author_role_label: "Petani Padi (Sukamaju)",
    title: payload.title,
    content: payload.content,
    category: payload.category || "TIPS_TANI",
    category_label: categoryLabels[payload.category] || "Umum",
    created_at: formatTimeIndo(),
    likes_count: 0,
    comments: []
  };

  const inserted = db.insert("community_posts", newPost);
  res.json(inserted);
});

// POST /posts/:postId/like
router.post('/posts/:postId/like', (req: Request, res: Response) => {
  const { postId } = req.params;
  const posts = db.getCollection("community_posts");
  const post = posts.find((p: any) => p.id === postId);

  if (!post) {
    return res.status(404).json({ detail: "Postingan tidak ditemukan" });
  }

  const newLikes = (post.likes_count || 0) + 1;
  db.update("community_posts", postId, { likes_count: newLikes });
  res.json({ likes_count: newLikes });
});

// POST /posts/:postId/comments
router.post('/posts/:postId/comments', (req: Request, res: Response) => {
  const { postId } = req.params;
  const payload = req.body;
  const posts = db.getCollection("community_posts");
  const post = posts.find((p: any) => p.id === postId);

  if (!post) {
    return res.status(404).json({ detail: "Postingan tidak ditemukan" });
  }

  const comments = post.comments || [];
  const newComment = {
    id: `comm_${crypto.randomBytes(4).toString('hex')}`,
    author_name: payload.author_name || "Pak Joko",
    author_role: payload.author_role || "Petani",
    comment: payload.comment,
    created_at: formatTimeIndo()
  };

  comments.push(newComment);
  db.update("community_posts", postId, { comments });
  res.json(newComment);
});

export default router;
