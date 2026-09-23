import { Router, Request, Response } from 'express';
import { db } from '../database/db.js';

const router = Router();

const PUBLIC_PROFILES_DATA: Record<string, any> = {
  "Pak Joko": {
    id: "usr_petani",
    name: "Pak Joko",
    role_label: "Petani Mandiri (Sukamaju)",
    category_badge: "Petani Mandiri",
    service_specialties: ["Budidaya Padi Inpari 32", "Sistem Jajar Legowo", "Petak Lahan 1.2 Ha"],
    avatar: "👨‍🌾",
    village: "Desa Sukamaju, Jawa Timur",
    commodity: "Padi Inpari 32",
    land_size_ha: 1.2,
    whatsapp_number: "628123456789",
    bio: "Petani padi binaan Poktan Makmur sejak 2012. Fokus pada budidaya ramah lingkungan, pemupukan berimbang, dan pencatatan digital.",
    followers_count: 34,
    following_count: 18,
    is_followed: false,
    posts_count: 6
  },
  "Mas Bambang": {
    id: "usr_traktor",
    name: "Mas Bambang",
    role_label: "Jasa Olah Tanah & Traktor Quick",
    category_badge: "Sewa Traktor",
    service_specialties: ["Bajak Singkal", "Rotavator Lahan Kering & Basah", "Operator Handal"],
    avatar: "🚜",
    village: "Desa Sukamaju Krajan",
    commodity: "Jasa Mekanisasi Olah Tanah",
    land_size_ha: 0.0,
    whatsapp_number: "6281298765432",
    bio: "Menyediakan sewa traktor roda dua Quick Kubota 8.5 HP lengkap dengan operator ahli untuk olah tanah gembur siap tanam.",
    followers_count: 92,
    following_count: 14,
    is_followed: true,
    posts_count: 11
  },
  "Pak Slamet": {
    id: "usr_pengairan",
    name: "Pak Slamet",
    role_label: "Jasa Pompa Air & Irigasi",
    category_badge: "Jasa Pengairan",
    service_specialties: ["Pompa Alkon 3 Inci", "Sedot Air Sungai / Embung", "Pengeboran Sumur Pantek"],
    avatar: "💧",
    village: "Desa Sukamaju Blok Saluran",
    commodity: "Jasa Pompanisasi & Pengairan",
    land_size_ha: 0.0,
    whatsapp_number: "6285799988811",
    bio: "Siap antar unit mesin pompa diesel alkon 3 inci ke pematang sawah untuk pengairan darurat musim kemarau.",
    followers_count: 58,
    following_count: 9,
    is_followed: false,
    posts_count: 7
  },
  "Mang Udin": {
    id: "usr_cangkul",
    name: "Mang Udin",
    role_label: "Jasa Cangkul & Regu Tanam",
    category_badge: "Jasa Cangkul & Tanam",
    service_specialties: ["Cangkul Pematang Galengan", "Regu Tanam Borongan", "Penyiangan Gulma Landak"],
    avatar: "🌾",
    village: "Desa Sukamaju Girang",
    commodity: "Jasa Tenaga Kerja Tani",
    land_size_ha: 0.0,
    whatsapp_number: "6287811223344",
    bio: "Koordinator regu buruh tani terampil untuk perbaikan pematang sawah, penanaman sistem tegel atau jajar legowo, dan penyiangan rumput.",
    followers_count: 45,
    following_count: 11,
    is_followed: false,
    posts_count: 5
  },
  "Ibu Ratna": {
    id: "usr_distributor",
    name: "Ibu Ratna",
    role_label: "Kios Saprotan & Pupuk Resmi KPL",
    category_badge: "Kios Saprotan",
    service_specialties: ["Pupuk Subsidi & Non-Subsidi", "Benih Padi Bersertifikat", "Pestisida & Obat Hama"],
    avatar: "🏪",
    village: "Pasar Tradisional Sukamaju Kios B-04",
    commodity: "Saprotan Pupuk & Benih",
    land_size_ha: 0.0,
    whatsapp_number: "6285712345678",
    bio: "Penyalur resmi pupuk bersubsidi (Urea & NPK) serta benih resmi Balitbangtan. Siap melayani pesan antar dan tebus Kartu Tani.",
    followers_count: 128,
    following_count: 19,
    is_followed: true,
    posts_count: 14
  },
  "Kios Tani Subur Makmur": {
    id: "usr_distributor",
    name: "Kios Tani Subur Makmur",
    role_label: "Kios Saprotan & Pupuk Resmi KPL",
    category_badge: "Kios Saprotan",
    service_specialties: ["Pupuk Subsidi", "Benih Inpari 32", "Bakterisida Hayati"],
    avatar: "🏪",
    village: "Pasar Tradisional Sukamaju Kios B-04",
    commodity: "Saprotan Pupuk & Benih",
    land_size_ha: 0.0,
    whatsapp_number: "6285712345678",
    bio: "Kios Resmi Penyalur Lengkap Saprotan desa Sukamaju mitra petani binaan.",
    followers_count: 128,
    following_count: 19,
    is_followed: true,
    posts_count: 14
  },
  "Bpk. Hendra Jaya": {
    id: "usr_agen",
    name: "Bpk. Hendra Jaya",
    role_label: "Penggilingan Padi & Pengepul GKP",
    category_badge: "Penggilingan Padi",
    service_specialties: ["Timbangan Digital Terkalibrasi", "Armada Pick-Up Jemput Lumbung", "Beli Gabah Tunai"],
    avatar: "🚚",
    village: "Kawasan Sentra Penggilingan Km 3",
    commodity: "Penampung Gabah Kering Panen",
    land_size_ha: 0.0,
    whatsapp_number: "6281356789012",
    bio: "Mitra penyerapan gabah petani lokal dengan timbangan digital terkalibrasi, harga transparan sesuai mutu, dan armada jemput langsung.",
    followers_count: 86,
    following_count: 12,
    is_followed: false,
    posts_count: 8
  }
};

const FOLLOWED_USERS: Set<string> = new Set(["usr_traktor", "usr_distributor"]);

// POST /login
router.post('/login', (req: Request, res: Response) => {
  const { phone_number } = req.body;
  const users = db.getCollection("users");
  let user = users.find((u: any) => u.phone_number === phone_number);

  if (!user) {
    user = db.insert("users", {
      phone_number: phone_number || "08123456789",
      full_name: "Pak Joko",
      role: "PETANI_MANDIRI",
      role_label: "Petani Mandiri",
      village: "Desa Sukamaju, Jawa Timur",
      commodity: "Padi Inpari 32",
      land_size_ha: 1.2,
      whatsapp_number: phone_number || "08123456789",
      bio: "Petani Padi Binaan Kelompok Tani Makmur"
    });
  }

  res.json(user);
});

// GET /profile
router.get('/profile', (req: Request, res: Response) => {
  const userId = (req.headers['x-user-id'] as string) || 'usr_petani';
  const users = db.getCollection("users");
  const user = users.find((u: any) => u.id === userId) || users[0];

  if (!user) {
    return res.status(404).json({ detail: "Profil pengguna tidak ditemukan" });
  }
  res.json(user);
});

// PUT /profile
router.put('/profile', (req: Request, res: Response) => {
  const userId = (req.headers['x-user-id'] as string) || 'usr_petani';
  const updates = req.body;
  const updated = db.update("users", userId, updates);

  if (!updated) {
    return res.status(404).json({ detail: "Pengguna tidak ditemukan" });
  }
  res.json(updated);
});

// GET /users/:authorName
router.get('/users/:authorName', (req: Request, res: Response) => {
  const { authorName } = req.params;
  const cleanName = decodeURIComponent(authorName).trim();

  let profile = PUBLIC_PROFILES_DATA[cleanName];
  if (!profile) {
    for (const key of Object.keys(PUBLIC_PROFILES_DATA)) {
      if (key.toLowerCase().includes(cleanName.toLowerCase()) || cleanName.toLowerCase().includes(key.toLowerCase())) {
        profile = PUBLIC_PROFILES_DATA[key];
        break;
      }
    }
  }

  if (!profile) {
    profile = {
      id: `usr_${cleanName.replace(/\s+/g, '_').toLowerCase()}`,
      name: cleanName,
      role_label: "Warga Komunitas Tani Sukamaju",
      category_badge: "Warga Komunitas",
      service_specialties: ["Pertanian Umum", "Gotong Royong Desa"],
      avatar: "👨‍🌾",
      village: "Desa Sukamaju, Jawa Timur",
      commodity: "Padi & Palawija",
      land_size_ha: 1.0,
      whatsapp_number: "628123456789",
      bio: `Anggota aktif ekosistem pertanian desa Sukamaju. Bersinergi memajukan usahatani lokal.`,
      followers_count: 24,
      following_count: 12,
      is_followed: false,
      posts_count: 3
    };
  }

  const profileCopy = { ...profile };
  profileCopy.is_followed = FOLLOWED_USERS.has(profile.id);
  res.json(profileCopy);
});

// POST /users/:authorName/toggle-follow
router.post('/users/:authorName/toggle-follow', (req: Request, res: Response) => {
  const { authorName } = req.params;
  const cleanName = decodeURIComponent(authorName).trim();
  const profile = PUBLIC_PROFILES_DATA[cleanName];
  const targetId = profile ? profile.id : `usr_${cleanName.replace(/\s+/g, '_').toLowerCase()}`;

  let isFollowed = false;
  if (FOLLOWED_USERS.has(targetId)) {
    FOLLOWED_USERS.delete(targetId);
    isFollowed = false;
  } else {
    FOLLOWED_USERS.add(targetId);
    isFollowed = true;
  }

  res.json({
    is_followed: isFollowed,
    followers_count: (profile ? profile.followers_count : 24) + (isFollowed ? 1 : 0),
    message: isFollowed ? `Anda sekarang mengikuti ${cleanName}` : `Anda berhenti mengikuti ${cleanName}`
  });
});

// GET /switchable-users
router.get('/switchable-users', (req: Request, res: Response) => {
  const users = db.getCollection("users");
  res.json(users);
});

export default router;
