import { getWeatherAndRecommendation } from './weatherService.js';

export interface BudgetItem {
  id: string;
  phase: string;
  name: string;
  category: string;
  recommended_provider: string;
  quantity: number;
  unit: string;
  unit_price: number;
  total_price: number;
  notes: string;
}

export interface TimelinePhase {
  step_no: number;
  name: string;
  day_range: string;
  duration_days: number;
  status: 'BELUM' | 'SEDANG_BERJALAN' | 'SELESAI';
  allocated_budget: number;
  actual_cost: number;
  tasks: string[];
  ai_tips: string;
}

export interface FinancialSummary {
  total_budget: number;
  hpp_per_kg: number;
  projected_yield_kg: number;
  projected_selling_price_per_kg: number;
  projected_revenue: number;
  projected_net_profit: number;
  roi_percentage: number;
}

export interface EcosystemRecommendation {
  role_category: string;
  partner_name: string;
  action_text: string;
  phone: string;
}

export interface FarmPlan {
  plan_id: string;
  user_id: string;
  land_size_ha: number;
  commodity: string;
  soil_type: string;
  water_source: string;
  location: string;
  latitude: number;
  longitude: number;
  coordinates_label: string;
  weather_condition: {
    temp_celsius: number;
    rain_probability: number;
    season: string;
    note: string;
  };
  financial_summary: FinancialSummary;
  budget_items: BudgetItem[];
  timeline_phases: TimelinePhase[];
  ecosystem_recommendations: EcosystemRecommendation[];
}

export class FarmPlannerService {
  public calculatePlan(params: {
    land_size_ha: number;
    commodity?: string;
    soil_type?: string;
    water_source?: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    coordinates_label?: string;
    user_id?: string;
  }): FarmPlan {
    const ha = Math.max(Number(params.land_size_ha) || 1.0, 0.05);
    const commodity = params.commodity || "Padi Sawah Inpari 32";
    const soilType = params.soil_type || "Lempung Berliat (Subur)";
    const waterSource = params.water_source || "Irigasi Teknis Bendungan";
    const location = params.location || "Sukamaju, Jawa Timur";
    const latitude = params.latitude !== undefined ? params.latitude : -7.2504;
    const longitude = params.longitude !== undefined ? params.longitude : 112.7512;
    const coordinatesLabel = params.coordinates_label || `${latitude.toFixed(4)}, ${longitude.toFixed(4)} (${location})`;
    const userId = params.user_id || "usr_petani";

    const weatherRec = getWeatherAndRecommendation(latitude, longitude, location);
    const isWetSeason = weatherRec.rain_probability_percent >= 50;

    // Parameter Dasar (per Hektar)
    const seedKgPerHa = 25.0;
    const seedPricePerKg = 15000.0;
    const tractorFeePerHa = 1200000.0;
    const cangkulLaborPerHa = 500000.0;
    const transplantLaborPerHa = 1400000.0;

    let ureaKgPerHa: number;
    let npkKgPerHa: number;
    let weatherNote: string;

    if (isWetSeason) {
      ureaKgPerHa = 175.0;
      npkKgPerHa = 320.0;
      weatherNote = `Curah hujan tinggi terdeteksi (${weatherRec.rain_probability_percent}%). Dosis Urea diturunkan 15% untuk mencegah serangan Hawar Daun dan rebah batang.`;
    } else {
      ureaKgPerHa = 200.0;
      npkKgPerHa = 300.0;
      weatherNote = `Kondisi cuaca cerah/normal (${weatherRec.temp_celsius}°C). Dosis pemupukan NPK dan Urea standar berimbang dianjurkan.`;
    }

    const ureaPricePerKg = 2250.0;
    const npkPricePerKg = 3300.0;
    const organicFertilizerPerHa = 400000.0;

    let waterCostPerHa = 150000.0;
    if (waterSource === "Sumur Pompa Diesel / Bor") {
      waterCostPerHa = isWetSeason ? 350000.0 : 850000.0;
    } else if (waterSource === "Tadah Hujan") {
      waterCostPerHa = isWetSeason ? 0.0 : 450000.0;
    }

    const pesticidePerHa = 650000.0;
    const sprayLaborPerHa = 350000.0;
    const harvestLaborPerHa = 1800000.0;
    const transportSacksPerHa = 350000.0;

    const budgetItems: BudgetItem[] = [
      {
        id: "bgt_1",
        phase: "Olah Tanah & Lahan",
        name: "Sewa Traktor & Operator (Bajak & Garu)",
        category: "JASA_TRAKTOR",
        recommended_provider: "Mas Bambang (Jasa Traktor Quick Sukamaju)",
        quantity: Math.round(ha * 100) / 100,
        unit: "Hektar",
        unit_price: Math.round(tractorFeePerHa),
        total_price: Math.round(tractorFeePerHa * ha),
        notes: "Olah tanah sempurna gembur dan perataan gulma"
      },
      {
        id: "bgt_2",
        phase: "Olah Tanah & Lahan",
        name: "Jasa Cangkul & Perbaikan Galengan/Pematang",
        category: "JASA_CANGKUL",
        recommended_provider: "Mang Udin & Kelompok Buruh Cangkul",
        quantity: Math.max(1, Math.round(ha * 3)),
        unit: "Orang-Hari",
        unit_price: Math.round(cangkulLaborPerHa / 3),
        total_price: Math.round(cangkulLaborPerHa * ha),
        notes: "Pembersihan kebocoran pematang sawah penahan air"
      },
      {
        id: "bgt_3",
        phase: "Persemaian & Benih",
        name: `Benih ${commodity} Bersertifikat`,
        category: "SAPROTAN",
        recommended_provider: "Kios Tani Subur Makmur (Ibu Ratna)",
        quantity: Math.round(seedKgPerHa * ha * 10) / 10,
        unit: "kg",
        unit_price: Math.round(seedPricePerKg),
        total_price: Math.round(seedKgPerHa * seedPricePerKg * ha),
        notes: "Daya tumbuh > 85%, tahan rebah"
      },
      {
        id: "bgt_4",
        phase: "Tanam",
        name: "Upah Buruh Tanam (Sistem Jajar Legowo 2:1)",
        category: "JASA_BURUH",
        recommended_provider: "Kelompok Tani Makmur (Regu Tanam Melati)",
        quantity: Math.max(1, Math.round(ha * 10)),
        unit: "Orang-Hari",
        unit_price: Math.round(transplantLaborPerHa / 10),
        total_price: Math.round(transplantLaborPerHa * ha),
        notes: "Populasi rumpun optimal dan sirkulasi udara baik"
      },
      {
        id: "bgt_5",
        phase: "Nutrisi & Pemupukan",
        name: "Pupuk Urea N-46 (Subsidi)",
        category: "PUPUK",
        recommended_provider: "Kios Pupuk KPL Resmi",
        quantity: Math.round(ureaKgPerHa * ha * 10) / 10,
        unit: "kg",
        unit_price: Math.round(ureaPricePerKg),
        total_price: Math.round(ureaKgPerHa * ureaPricePerKg * ha),
        notes: "Pemupukan dasar (1/3 dosis) dan susulan I & II"
      },
      {
        id: "bgt_6",
        phase: "Nutrisi & Pemupukan",
        name: "Pupuk Majemuk NPK Phonska 15-15-15",
        category: "PUPUK",
        recommended_provider: "Kios Pupuk KPL Resmi",
        quantity: Math.round(npkKgPerHa * ha * 10) / 10,
        unit: "kg",
        unit_price: Math.round(npkPricePerKg),
        total_price: Math.round(npkKgPerHa * npkPricePerKg * ha),
        notes: "Nutrisi N-P-K berimbang untuk anakan dan pembentukan malai"
      },
      {
        id: "bgt_7",
        phase: "Nutrisi & Pemupukan",
        name: "Bahan Organik / Pupuk Kandang Fermentasi",
        category: "PUPUK_ORGANIK",
        recommended_provider: "Kelompok Ternak Desa",
        quantity: Math.round(ha * 10) / 10,
        unit: "Ton",
        unit_price: Math.round(organicFertilizerPerHa),
        total_price: Math.round(organicFertilizerPerHa * ha),
        notes: "Memperbaiki struktur mikroorganisme tanah dan porositas"
      },
      {
        id: "bgt_8",
        phase: "Pengairan",
        name: `Biaya Pengairan & Distribusi Air (${waterSource})`,
        category: "PENGAIRAN",
        recommended_provider: "Pak Slamet (Jasa Pompa Air & Irigasi)",
        quantity: Math.round(ha * 10) / 10,
        unit: "Paket Musim",
        unit_price: Math.round(waterCostPerHa),
        total_price: Math.round(waterCostPerHa * ha),
        notes: "Irigasi berkala macak-macak sesuai umur tanaman"
      },
      {
        id: "bgt_9",
        phase: "Perlindungan Tanaman",
        name: "Insektisida & Fungisida Ramah Lingkungan",
        category: "PESTISIDA",
        recommended_provider: "Kios Tani Subur Makmur",
        quantity: Math.round(ha * 10) / 10,
        unit: "Paket Musim",
        unit_price: Math.round(pesticidePerHa),
        total_price: Math.round(pesticidePerHa * ha),
        notes: "Pencegahan dini wereng batang coklat dan penggerek batang"
      },
      {
        id: "bgt_10",
        phase: "Perlindungan Tanaman",
        name: "Upah Tenaga Semprot Hama (3x Aplikasi)",
        category: "JASA_BURUH",
        recommended_provider: "Regu Pengendali Hama (RPH) Desa",
        quantity: Math.max(1, Math.round(ha * 3)),
        unit: "Aplikasi",
        unit_price: Math.round(sprayLaborPerHa / 3),
        total_price: Math.round(sprayLaborPerHa * ha),
        notes: "Aplikasi umur 20 HST, 40 HST, dan 60 HST"
      },
      {
        id: "bgt_11",
        phase: "Panen & Pasca Panen",
        name: "Upah Regu Panen Gabah (Bawon / Gejlok)",
        category: "JASA_BURUH",
        recommended_provider: "Bpk. Hendra Jaya (Mitra Penggilingan Padi)",
        quantity: Math.round(ha * 10) / 10,
        unit: "Hektar",
        unit_price: Math.round(harvestLaborPerHa),
        total_price: Math.round(harvestLaborPerHa * ha),
        notes: "Pemotongan sabit bergerigi & perontokan mesin threser"
      },
      {
        id: "bgt_12",
        phase: "Panen & Pasca Panen",
        name: "Karung Kemasan & Pengangkutan ke Lumbung",
        category: "LOGISTIK",
        recommended_provider: "Armada Angkut Desa",
        quantity: Math.round(ha * 10) / 10,
        unit: "Paket Angkut",
        unit_price: Math.round(transportSacksPerHa),
        total_price: Math.round(transportSacksPerHa * ha),
        notes: "Pengangkutan gabah dari pematang sawah ke lumbung simpan"
      }
    ];

    const totalBudget = budgetItems.reduce((acc, curr) => acc + curr.total_price, 0);

    // Proyeksi Hasil Panen & Finansial
    const yieldKgPerHa = 6200.0;
    const projectedYieldKg = Math.round(yieldKgPerHa * ha);
    const sellingPricePerKg = 6800.0;
    const projectedRevenue = Math.round(projectedYieldKg * sellingPricePerKg);
    const projectedNetProfit = projectedRevenue - totalBudget;
    const hppPerKg = Math.round(totalBudget / projectedYieldKg);
    const roiPercentage = Math.round((projectedNetProfit / totalBudget) * 1000) / 10;

    const timelinePhases: TimelinePhase[] = [
      {
        step_no: 1,
        name: "Olah Tanah & Persemaian",
        day_range: "H-15 s/d H-1",
        duration_days: 15,
        status: "SELESAI",
        allocated_budget: Math.round((tractorFeePerHa + cangkulLaborPerHa + (seedKgPerHa * seedPricePerKg)) * ha),
        actual_cost: Math.round((tractorFeePerHa + cangkulLaborPerHa + (seedKgPerHa * seedPricePerKg)) * ha),
        tasks: [
          "Bajak singkal dan pembalikan tanah dengan traktor",
          "Perbaikan pematang dan galengan sawah penahan air",
          "Penyemaian benih padi dengan perendaman larutan garam",
          "Aplikasi pupuk organik kandang fermentasi"
        ],
        ai_tips: "Pastikan tanah terendam air 2-3 hari setelah dibajak agar bongkahan tanah lunak dan gulma terdekomposisi sempurna."
      },
      {
        step_no: 2,
        name: "Penanaman Bibit",
        day_range: "HST 1 s/d HST 5",
        duration_days: 5,
        status: "SEDANG_BERJALAN",
        allocated_budget: Math.round(transplantLaborPerHa * ha),
        actual_cost: 0,
        tasks: [
          "Pencabutan bibit semai (dapog) umur 15-18 hari",
          "Tanam pindah dengan sistem jajar legowo 2:1 (jarak 25x12.5x50 cm)",
          "Kedalaman tanam dangkal 1.5 - 2 cm (1-2 batang per rumpun)"
        ],
        ai_tips: "Tanam bibit muda (< 18 hari) dengan posisi dangkal memacu jumlah anakan produktif lebih dari 25 malai per rumpun."
      },
      {
        step_no: 3,
        name: "Fase Vegetatif & Pemupukan I & II",
        day_range: "HST 7 s/d HST 35",
        duration_days: 28,
        status: "BELUM",
        allocated_budget: Math.round(((ureaKgPerHa * ureaPricePerKg * 0.7) + (npkKgPerHa * npkPricePerKg * 0.5) + (sprayLaborPerHa * 0.5)) * ha),
        actual_cost: 0,
        tasks: [
          "Pemupukan dasar susulan I (HST 7-10): Urea + NPK Phonska",
          "Penyiangan rumput/gulma dengan alat gasrok/landak (HST 15-20)",
          "Pemupukan susulan II (HST 25-30): Tambahan NPK & sedikit Urea",
          "Pemantauan gejala hama wereng dan kresek daun via Dokter Tani AI"
        ],
        ai_tips: "Kondisikan air sawah macak-macak (ketinggian 1-2 cm) saat penaburan pupuk agar nutrisi tidak larut terbawa aliran pembuangan."
      },
      {
        step_no: 4,
        name: "Fase Generatif / Bunting & Pengisian Bulir",
        day_range: "HST 40 s/d HST 75",
        duration_days: 35,
        status: "BELUM",
        allocated_budget: Math.round(((npkKgPerHa * npkPricePerKg * 0.5) + (pesticidePerHa * 0.6) + waterCostPerHa) * ha),
        actual_cost: 0,
        tasks: [
          "Pemupukan susulan III / booster malai (HST 45-50): Fokus unsur Kalium & Fosfat",
          "Pengairan teratur menjaga kelembaban optimal saat pembungaan",
          "Penyemprotan pencegahan penyakit blas malai (Pyricularia)",
          "Pemasangan orang-orangan sawah / jaring pelindung burung pipit"
        ],
        ai_tips: "Jangan biarkan sawah kekeringan pada saat padi berbunga (keluar malai) karena dapat menyebabkan bulir gabah hampa."
      },
      {
        step_no: 5,
        name: "Pematangan Bulir & Panen Raya",
        day_range: "HST 80 s/d HST 105",
        duration_days: 25,
        status: "BELUM",
        allocated_budget: Math.round((harvestLaborPerHa + transportSacksPerHa) * ha),
        actual_cost: 0,
        tasks: [
          "Pengeringan total petak sawah 7-10 hari sebelum jadwal panen",
          "Pengecekan kemasakan bulir (90-95% malai telah menguning)",
          "Pelaksanaan panen gabah dengan regu sabit / mesin perontok",
          "Penimbangan tonase riil dan pencatatan ke fitur Lumbung Panen AgriBuddy",
          "Pembukaan tiket bursa lelang gabah ke mitra pengepul"
        ],
        ai_tips: "Pengeringan lahan sebelum panen mempermudah mobilitas regu panen dan meningkatkan kualitas rendemen giling beras."
      }
    ];

    const ecosystemRecommendations: EcosystemRecommendation[] = [
      {
        role_category: "Penyedia Jasa Olah Tanah",
        partner_name: "Mas Bambang (Traktor Quick Kubota)",
        action_text: "Sewa traktor bajak singkal & rotavator siap kerja di Desa Sukamaju",
        phone: "6281298765432"
      },
      {
        role_category: "Distributor Saprotan & Pupuk",
        partner_name: "Kios Tani Subur Makmur (Ibu Ratna)",
        action_text: "Pesan pupuk Urea & NPK Phonska tebus Kartu Tani dan benih bersertifikat",
        phone: "6285712345678"
      },
      {
        role_category: "Penyedia Jasa Pengairan",
        partner_name: "Pak Slamet (Pompa Alkon 3 Inci)",
        action_text: "Sewa pompa air diesel darurat untuk pengairan musim kemarau",
        phone: "6285799988811"
      },
      {
        role_category: "Penyerapan Hasil Panen",
        partner_name: "Bpk. Hendra Jaya (Sentra Penggilingan Padi Km 3)",
        action_text: "Penjualan lelang Gabah Kering Panen (GKP) timbangan digital jemput lumbung",
        phone: "6281356789012"
      }
    ];

    return {
      plan_id: `plan_${Date.now().toString(36)}`,
      user_id: userId,
      land_size_ha: ha,
      commodity,
      soil_type: soilType,
      water_source: waterSource,
      location,
      latitude,
      longitude,
      coordinates_label: coordinatesLabel,
      weather_condition: {
        temp_celsius: weatherRec.temp_celsius,
        rain_probability: weatherRec.rain_probability_percent,
        season: isWetSeason ? "Musim Hujan (Rendeng)" : "Musim Kemarau (Gadu)",
        note: weatherNote
      },
      financial_summary: {
        total_budget: totalBudget,
        hpp_per_kg: hppPerKg,
        projected_yield_kg: projectedYieldKg,
        projected_selling_price_per_kg: Math.round(sellingPricePerKg),
        projected_revenue: projectedRevenue,
        projected_net_profit: projectedNetProfit,
        roi_percentage: roiPercentage
      },
      budget_items: budgetItems,
      timeline_phases: timelinePhases,
      ecosystem_recommendations: ecosystemRecommendations
    };
  }
}

export const plannerService = new FarmPlannerService();
