import { Router, Request, Response } from 'express';
import { db } from '../database/db.js';

const router = Router();

const PUBLIC_PROFILES_DATA: Record<string, any> = {
  "Pak Joko": {
    id: "usr_petani",
    username: "pak_joko",
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
    username: "bambang_traktor",
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
    username: "slamet_irigasi",
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
    username: "udin_cangkul",
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
    username: "ratna_kios",
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
    username: "kios_makmur",
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
    username: "gilingan_hendra",
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

// POST /register
router.post('/register', (req: Request, res: Response) => {
  try {
    const { 
      full_name, 
      username, 
      phone_number, 
      pin, 
      role = 'PETANI_MANDIRI', 
      village, 
      commodity = 'Padi Inpari 32', 
      land_size_ha = 1.0, 
      bio 
    } = req.body;

    if (!full_name || !full_name.trim()) {
      return res.status(400).json({ detail: "Nama lengkap wajib diisi." });
    }
    if (!phone_number || !phone_number.trim()) {
      return res.status(400).json({ detail: "Nomor handphone/WhatsApp wajib diisi." });
    }

    const cleanUsername = (username || full_name.toLowerCase().replace(/\s+/g, '_')).trim().replace(/^@/, '');
    const cleanPhone = phone_number.trim();

    const users = db.getCollection("users");
    const existingPhone = users.find((u: any) => u.phone_number === cleanPhone);
    if (existingPhone) {
      return res.status(400).json({ detail: "Nomor handphone sudah terdaftar. Silakan langsung masuk." });
    }

    const existingUser = users.find((u: any) => u.username && u.username.toLowerCase() === cleanUsername.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ detail: `Username @${cleanUsername} sudah digunakan. Silakan pilih username lain.` });
    }

    const roleBadges: Record<string, { label: string; badge: string; avatar: string }> = {
      PETANI_MANDIRI: { label: "Petani Mandiri", badge: "Petani Mandiri", avatar: "👨‍🌾" },
      JASA_TRAKTOR: { label: "Jasa Olah Tanah & Traktor", badge: "Sewa Traktor", avatar: "🚜" },
      JASA_PENGAIRAN: { label: "Jasa Pompa Irigasi", badge: "Jasa Pengairan", avatar: "💧" },
      JASA_CANGKUL: { label: "Regu Buruh Tanam", badge: "Jasa Cangkul", avatar: "🌾" },
      KIOS_SAPROTAN: { label: "Kios Saprotan KPL", badge: "Kios Saprotan", avatar: "🏪" },
      PENGGILINGAN_PADI: { label: "Penggilingan & Pengepul", badge: "Penggilingan", avatar: "🚚" },
    };

    const roleInfo = roleBadges[role] || roleBadges.PETANI_MANDIRI;
    const newUserId = `usr_${Date.now()}`;

    const newUser = {
      id: newUserId,
      full_name: full_name.trim(),
      username: cleanUsername,
      phone_number: cleanPhone,
      pin: pin ? String(pin).trim() : "1234",
      role,
      role_label: roleInfo.label,
      category_badge: roleInfo.badge,
      avatar: roleInfo.avatar,
      village: (village && village.trim()) || "Desa Sukamaju, Jawa Timur",
      commodity: (commodity && commodity.trim()) || "Padi Inpari 32",
      land_size_ha: Number(land_size_ha) || 1.0,
      whatsapp_number: cleanPhone,
      bio: (bio && bio.trim()) || `Akun ${roleInfo.label} terdaftar di AgriBuddy.`,
      created_at: new Date().toISOString()
    };

    const insertedUser = db.insert("users", newUser);

    // Otomatis buatkan 1 petak sawah perdana untuk user jika berperan Petani Mandiri
    if (role === 'PETANI_MANDIRI') {
      db.insert("farmlands", {
        id: `farm_${Date.now()}`,
        user_id: newUserId,
        owner_name: full_name.trim(),
        name: `Petak Sawah ${full_name.trim()}`,
        ownership_type: "MILIK_SENDIRI",
        land_size_ha: Number(land_size_ha) || 1.0,
        status: "Aktif Garap",
        commodity: (commodity && commodity.trim()) || "Padi Sawah Inpari 32",
        soil_type: "Lempung Berliat (Subur)",
        water_source: "Irigasi Teknis Desa",
        location: (village && village.trim()) || "Desa Sukamaju, Jawa Timur",
        latitude: -7.2504,
        longitude: 112.7512,
        collaborators: [],
        capital_expenses: [],
        planting_date: new Date().toISOString().split('T')[0],
        target_harvest_date: "",
        created_at: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      message: "Akun baru berhasil didaftarkan!",
      user: insertedUser
    });
  } catch (err: any) {
    res.status(500).json({ detail: "Gagal mendaftarkan akun baru: " + (err.message || err) });
  }
});

// POST /login
router.post('/login', (req: Request, res: Response) => {
  const { phone_number, username, pin } = req.body;
  const users = db.getCollection("users");

  const cleanPhone = phone_number ? String(phone_number).trim() : '';
  const cleanUsername = username ? String(username).trim().replace(/^@/, '').toLowerCase() : '';

  let user = users.find((u: any) => 
    (cleanPhone && u.phone_number && u.phone_number.trim() === cleanPhone) ||
    (cleanUsername && u.username && u.username.toLowerCase() === cleanUsername)
  );

  // Jika akun tidak ditemukan
  if (!user) {
    // Jika nomor telepon adalah demo default, buat user default
    if (cleanPhone === '08123456789') {
      user = users.find((u: any) => u.id === 'usr_petani') || users[0];
      return res.json(user);
    }
    return res.status(404).json({ 
      detail: "Nomor HP atau Username belum terdaftar. Silakan buat akun baru terlebih dahulu." 
    });
  }

  // Cek validasi PIN jika tersedia
  if (user.pin && pin && String(pin).trim() !== String(user.pin).trim()) {
    return res.status(401).json({ detail: "Kode PIN yang Anda masukkan tidak sesuai." });
  }

  res.json(user);
});

// GET /profile
router.get('/profile', (req: Request, res: Response) => {
  const userId = (req.headers['x-user-id'] as string) || 'usr_petani';
  const users = db.getCollection("users");
  let user = users.find((u: any) => u.id === userId);

  if (!user) {
    const staticProf = Object.values(PUBLIC_PROFILES_DATA).find((p: any) => p.id === userId);
    if (staticProf) {
      return res.json(staticProf);
    }
    user = users[0];
  }

  if (!user) {
    return res.status(404).json({ detail: "Profil pengguna tidak ditemukan" });
  }

  // Lengkapi username fallback jika akun demo belum terisi
  if (!user.username) {
    const staticProf = Object.values(PUBLIC_PROFILES_DATA).find((p: any) => p.id === user.id);
    if (staticProf?.username) {
      user.username = staticProf.username;
    }
  }

  res.json(user);
});

// PUT /profile
router.put('/profile', (req: Request, res: Response) => {
  const userId = (req.headers['x-user-id'] as string) || 'usr_petani';
  const updates = req.body;

  if (updates.username) {
    const cleanUsername = String(updates.username).trim().replace(/^@/, '').toLowerCase();
    const users = db.getCollection("users");
    const existing = users.find((u: any) => u.id !== userId && u.username && u.username.toLowerCase() === cleanUsername);
    if (existing) {
      return res.status(400).json({ detail: `Username @${cleanUsername} sudah digunakan oleh akun lain. Silakan pilih username yang unik.` });
    }
    updates.username = cleanUsername;
  }

  const updated = db.update("users", userId, updates);

  if (!updated) {
    return res.status(404).json({ detail: "Pengguna tidak ditemukan" });
  }
  res.json(updated);
});

// GET /users-search
router.get('/users-search', (req: Request, res: Response) => {
  const query = (req.query.q as string || '').trim().replace(/^@/, '').toLowerCase();
  const dbUsers = db.getCollection("users");
  const staticProfiles = Object.values(PUBLIC_PROFILES_DATA);

  // Gabungkan database users dan static profiles secara unik
  const userMap = new Map();
  for (const p of staticProfiles) {
    userMap.set(p.username || p.id, {
      id: p.id,
      username: p.username || p.name?.toLowerCase().replace(/\s+/g, '_'),
      name: p.name,
      role_label: p.role_label,
      category_badge: p.category_badge,
      avatar: p.avatar || '👨‍🌾',
      village: p.village || 'Desa Sukamaju',
      commodity: p.commodity || 'Padi Inpari 32',
      whatsapp_number: p.whatsapp_number
    });
  }
  for (const u of dbUsers) {
    userMap.set(u.username || u.id, {
      id: u.id,
      username: u.username || u.full_name?.toLowerCase().replace(/\s+/g, '_'),
      name: u.full_name || u.name,
      role_label: u.role_label || u.role,
      category_badge: u.category_badge || u.role,
      avatar: u.avatar || '👨‍🌾',
      village: u.village || 'Desa Sukamaju',
      commodity: u.commodity || 'Padi Inpari 32',
      whatsapp_number: u.phone_number || u.whatsapp_number
    });
  }

  const allProfiles = Array.from(userMap.values());
  if (!query) {
    return res.json(allProfiles);
  }
  const filtered = allProfiles.filter((p: any) => 
    p.username?.toLowerCase().includes(query) ||
    p.name?.toLowerCase().includes(query) ||
    p.category_badge?.toLowerCase().includes(query) ||
    p.village?.toLowerCase().includes(query)
  );
  res.json(filtered);
});

// GET /users/:authorName
router.get('/users/:authorName', (req: Request, res: Response) => {
  const { authorName } = req.params;
  const cleanName = decodeURIComponent(authorName).trim().replace(/^@/, '');

  let profile = Object.values(PUBLIC_PROFILES_DATA).find(
    (p: any) => p.username?.toLowerCase() === cleanName.toLowerCase() || p.name?.toLowerCase() === cleanName.toLowerCase()
  );
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
      username: cleanName.replace(/\s+/g, '_').toLowerCase(),
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
