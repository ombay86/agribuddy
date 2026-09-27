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

const isUserJoko = (uid: string) => uid === 'usr_petani' || uid === 'usr_001';

const getDefaultPhases = (landSizeHa: number = 0.8) => {
  const scale = landSizeHa / 0.8;
  return [
    {
      step_no: 1,
      name: "Fase 1: Olah Tanah & Bajak Garu",
      day_range: "H-14 s/d H-1",
      duration_days: 14,
      status: "SELESAI",
      target_cost: Math.round(960000 * scale),
      allocated_budget: Math.round(960000 * scale),
      actual_cost: 0,
      tasks: [
        "Pembersihan gulma & sisa jerami",
        "Penggenangan air macak-macak",
        "Bajak singkal I (kedalaman 20-25 cm)",
        "Garu & perataan tanah (macak-macak)",
        "Aplikasi pupuk kandang/organik 2 ton/ha"
      ],
      ai_tips: "Pastikan tanah terolah gembur sempurna dan kedalaman lumpur minimal 20 cm agar perakaran benih padi kokoh."
    },
    {
      step_no: 2,
      name: "Fase 2: Tanam Padi & Persemaian",
      day_range: "HST 1 - 15",
      duration_days: 15,
      status: "SEDANG_BERJALAN",
      target_cost: Math.round(850000 * scale),
      allocated_budget: Math.round(850000 * scale),
      actual_cost: 0,
      tasks: [
        "Persemaian benih bersertifikat (15-20 hari)",
        "Pindah tanam sistem jajar legowo (2:1 / 4:1)",
        "Jarak tanam 25x25 cm atau 20x20 cm",
        "Penyulaman bibit mati (maksimal HST 7)",
        "Pengaturan air macak-macak (1-2 cm)"
      ],
      ai_tips: "Gunakan bibit muda (umur 15-18 HSS) dengan 1-2 bibit per rumpun untuk memicu anakan produktif lebih banyak."
    },
    {
      step_no: 3,
      name: "Fase 3: Pemupukan & Perawatan Vegetatif",
      day_range: "HST 16 - 45",
      duration_days: 30,
      status: "BELUM",
      target_cost: Math.round(1650000 * scale),
      allocated_budget: Math.round(1650000 * scale),
      actual_cost: 0,
      tasks: [
        "Pemupukan susulan I (HST 7-10) Urea + NPK",
        "Penyiangan gulma mekanis (gasrok / manual)",
        "Pemupukan susulan II (HST 21-25) NPK Phonska",
        "Pemantauan hama wereng coklat & penggerek batang",
        "Pengeringan berkala (intermittent irrigation)"
      ],
      ai_tips: "Terapkan pemupukan berimbang 5:3:2 (Urea, NPK, Organik). Jangan biarkan sawah tergenang terus-menerus agar akar bernapas."
    },
    {
      step_no: 4,
      name: "Fase 4: Proteksi Hama & Generatif",
      day_range: "HST 46 - 80",
      duration_days: 35,
      status: "BELUM",
      target_cost: Math.round(950000 * scale),
      allocated_budget: Math.round(950000 * scale),
      actual_cost: 0,
      tasks: [
        "Aplikasi booster malai & kalium cair (HST 50)",
        "Pengendalian walang sangit & kepik hijau",
        "Pencegahan blas daun & hawar pelepah (fungisida)",
        "Pengairan teratur setinggi 3-5 cm saat bunting",
        "Pemasangan orang-orangan / jaring pengusir burung"
      ],
      ai_tips: "Waspadai serangan walang sangit pada fase matang susu. Semprot agen hayati Beauveria bassiana atau insektisida nabati pagi hari."
    },
    {
      step_no: 5,
      name: "Fase 5: Pengeringan & Panen Raya",
      day_range: "HST 81 - 115",
      duration_days: 35,
      status: "BELUM",
      target_cost: Math.round(2005000 * scale),
      allocated_budget: Math.round(2005000 * scale),
      actual_cost: 0,
      tasks: [
        "Pengeringan sawah total 10-14 hari sebelum panen",
        "Pemeriksaan kematangan bulir (90-95% menguning)",
        "Pemesanan mesin Combine Harvester / regu sabit",
        "Pemanenan gabah & perontokan",
        "Pengemasan karung & penimbangan GKP"
      ],
      ai_tips: "Keringkan petakan 10 hari sebelum panen untuk mempermudah operasional combine harvester dan menjaga mutu kadar air gabah."
    }
  ];
};

function enrichPhases(phases: any[], landHa: number = 0.8) {
  const defaults = getDefaultPhases(landHa);
  if (!phases || phases.length === 0) return defaults;
  return defaults.map(def => {
    const existing = phases.find((p: any) => p.step_no === def.step_no);
    if (!existing) return def;
    return {
      ...def,
      ...existing,
      allocated_budget: existing.allocated_budget ?? existing.target_cost ?? def.allocated_budget,
      tasks: (existing.tasks && existing.tasks.length > 0) ? existing.tasks : def.tasks,
      ai_tips: existing.ai_tips || def.ai_tips
    };
  });
}

// GET /farmlands
router.get('/', (req: Request, res: Response) => {
  const userId = (req.query.user_id as string) || (req.headers['x-user-id'] as string);
  const farms = db.getCollection("farmlands");

  if (userId) {
    const userFarms = farms.filter((f: any) => 
      f.user_id === userId || 
      (isUserJoko(userId) && isUserJoko(f.user_id)) ||
      (f.collaborators && f.collaborators.some((c: any) => c.user_id === userId && c.status === 'ACTIVE'))
    );

    const enriched = userFarms.map((f: any) => ({
      ...f,
      timeline_phases: enrichPhases(f.timeline_phases, f.land_size_ha || 0.8),
      total_budget: f.total_budget || Math.round((f.land_size_ha || 0.8) * 6400000)
    }));
    return res.json(enriched);
  }

  // Jika tidak ada userId spesifik, jangan bocorkan lahan akun lain ke publik
  return res.json([]);
});

// GET /farmlands/:farmId
router.get('/:farmId', (req: Request, res: Response) => {
  const { farmId } = req.params;
  const farms = db.getCollection("farmlands");
  const farm = farms.find((f: any) => f.id === farmId);

  if (!farm) {
    return res.status(404).json({ detail: "Data lahan sawah tidak ditemukan" });
  }
  const enriched = {
    ...farm,
    timeline_phases: enrichPhases(farm.timeline_phases, farm.land_size_ha || 0.8),
    total_budget: farm.total_budget || Math.round((farm.land_size_ha || 0.8) * 6400000)
  };
  res.json(enriched);
});

// POST /farmlands
router.post('/', (req: Request, res: Response) => {
  const userId = (req.query.user_id as string) || (req.headers['x-user-id'] as string) || "usr_petani";
  const payload = req.body;

  if (!payload.land_size_ha || payload.land_size_ha <= 0) {
    return res.status(400).json({ detail: "Luas lahan harus lebih besar dari 0 Ha." });
  }

  const users = db.getCollection("users");
  const user = users.find((u: any) => u.id === userId);
  const ownerName = user?.full_name || "Petani";
  const landHa = Number(payload.land_size_ha);

  let collaborators = [];
  if (payload.collaborators && Array.isArray(payload.collaborators) && payload.collaborators.length > 0) {
    collaborators = payload.collaborators;
  } else {
    collaborators = [
      {
        id: `collab_${crypto.randomBytes(3).toString('hex')}`,
        user_id: userId,
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
    owner_name: ownerName,
    name: payload.name,
    status: payload.status || "ACTIVE",
    land_size_ha: landHa,
    commodity: payload.commodity || "Padi Sawah Inpari 32",
    soil_type: payload.soil_type || "Lempung Berliat (Subur)",
    water_source: payload.water_source || "Irigasi Teknis Bendungan",
    location: payload.location || "Desa Sukamaju, Jawa Timur",
    latitude: payload.latitude !== undefined ? Number(payload.latitude) : -7.2504,
    longitude: payload.longitude !== undefined ? Number(payload.longitude) : 112.7512,
    collaborators,
    capital_expenses: [],
    timeline_phases: payload.timeline_phases || getDefaultPhases(landHa),
    total_budget: payload.total_budget || Math.round(landHa * 6400000),
    planting_date: payload.planting_date || new Date().toISOString().split('T')[0],
    target_harvest_date: payload.target_harvest_date || "",
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
  if (payload.status !== undefined) updates.status = payload.status;
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
  if (payload.timeline_phases !== undefined) updates.timeline_phases = payload.timeline_phases;
  if (payload.total_budget !== undefined) updates.total_budget = payload.total_budget;
  if (payload.planting_date !== undefined) updates.planting_date = payload.planting_date;
  if (payload.target_harvest_date !== undefined) updates.target_harvest_date = payload.target_harvest_date;

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

// POST /farmlands/:farmId/set-active-phase
// Fitur untuk Petani Konvensional yang ingin langsung memulai dari fase berjalan (misal Fase 2, 3, 4, atau 5)
router.post('/:farmId/set-active-phase', (req: Request, res: Response) => {
  const { farmId } = req.params;
  const { active_step_no, planting_date } = req.body;
  const farms = db.getCollection("farmlands");
  const farm = farms.find((f: any) => f.id === farmId);

  if (!farm) {
    return res.status(404).json({ detail: "Lahan tidak ditemukan" });
  }

  const targetStep = Math.min(5, Math.max(1, Number(active_step_no) || 1));
  const currentPhases = enrichPhases(farm.timeline_phases || [], farm.land_size_ha || 0.8);

  const updatedPhases = currentPhases.map((phase: any) => {
    if (phase.step_no < targetStep) {
      return { ...phase, status: "SELESAI" };
    } else if (phase.step_no === targetStep) {
      return { ...phase, status: "SEDANG_BERJALAN" };
    } else {
      return { ...phase, status: "BELUM" };
    }
  });

  const updates: Record<string, any> = {
    timeline_phases: updatedPhases
  };
  if (planting_date) {
    updates.planting_date = planting_date;
  }

  const updated = db.update("farmlands", farmId, updates);
  res.json({
    message: `Siklus budidaya berhasil disesuaikan! Memulai langsung dari Fase ${targetStep}.`,
    farmland: {
      ...updated,
      timeline_phases: updatedPhases
    }
  });
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

  // Jika ada user_id yang ditag, default status adalah PENDING
  if (!newC.status) {
    newC.status = newC.user_id ? 'PENDING' : 'ACTIVE';
  }

  collabs.push(newC);
  const updated = db.update("farmlands", farmId, { collaborators: collabs });

  // Buat notifikasi jika kolaborator ditag dari akun pengguna yang ada
  if (newC.user_id && newC.status === 'PENDING') {
    const users = db.getCollection("users");
    const owner = users.find((u: any) => u.id === farm.user_id);
    const ownerName = owner?.full_name || "Pemilik Lahan";

    db.insert("notifications", {
      user_id: newC.user_id, // Penerima notifikasi
      type: 'COLLAB_INVITE',
      title: 'Undangan Kolaborasi Baru 🤝',
      message: `${ownerName} mengundang Anda untuk mengelola lahan "${farm.name}" (${farm.land_size_ha} Ha) dengan peran "${newC.role}" dan bagi hasil ${newC.share_percentage}%.`,
      from_user_id: farm.user_id,
      from_user_name: ownerName,
      to_user_id: newC.user_id,
      to_user_name: newC.name,
      farm_id: farm.id,
      farm_name: farm.name,
      collab_id: newC.id,
      share_percentage: newC.share_percentage,
      role: newC.role,
      status: 'PENDING',
      is_read: false
    });
  }

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

// PUT /farmlands/:farmId/phases/:stepNo
router.put('/:farmId/phases/:stepNo', (req: Request, res: Response) => {
  const { farmId, stepNo } = req.params;
  const { status, actual_cost } = req.body;
  const farms = db.getCollection("farmlands");
  const farm = farms.find((f: any) => f.id === farmId);

  if (!farm) {
    return res.status(404).json({ detail: "Lahan tidak ditemukan" });
  }

  let phases = farm.timeline_phases;
  if (!phases || !Array.isArray(phases) || phases.length === 0) {
    phases = getDefaultPhases(farm.land_size_ha || 0.8);
  }

  const stepNumber = Number(stepNo);
  const targetPhase = phases.find((p: any) => p.step_no === stepNumber);
  if (targetPhase) {
    if (status !== undefined) targetPhase.status = status;
    if (actual_cost !== undefined) targetPhase.actual_cost = Number(actual_cost);
  } else {
    phases.push({
      step_no: stepNumber,
      name: `Fase ${stepNumber}`,
      day_range: `HST`,
      duration_days: 15,
      status: status || 'BELUM',
      actual_cost: actual_cost ? Number(actual_cost) : 0,
      target_cost: 0
    });
  }

  const updated = db.update("farmlands", farmId, { timeline_phases: phases });
  res.json(updated);
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

// DELETE /farmlands/:farmId/expenses/:expenseId
router.delete('/:farmId/expenses/:expenseId', (req: Request, res: Response) => {
  const { farmId, expenseId } = req.params;
  const farms = db.getCollection("farmlands");
  const farm = farms.find((f: any) => f.id === farmId);

  if (!farm) {
    return res.status(404).json({ detail: "Lahan tidak ditemukan" });
  }

  const expenses = (farm.capital_expenses || []).filter((e: any) => e.id !== expenseId);
  const updated = db.update("farmlands", farmId, { capital_expenses: expenses });
  res.json({ message: "Pengeluaran berhasil dihapus", farm: updated });
});

export default router;
