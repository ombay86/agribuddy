// Pure compiled in-memory seed data for serverless resilience
export const initialSeedData: Record<string, any[]> = {
  "users": [
    {
      "id": "usr_001",
      "village": "Desa Sukamaju, Jawa Timur",
      "username": "pak_joko",
      "commodity": "Padi",
      "full_name": "Pak Joko",
      "created_at": "2026-09-20T22:55:36.860226",
      "phone_number": "08123456789"
    },
    {
      "id": "usr_petani",
      "bio": "Petani Padi Binaan Kelompok Tani Makmur. Mengelola 1.2 Ha sawah irigasi teknis.",
      "role": "PETANI",
      "village": "Desa Sukamaju, Jawa Timur",
      "username": "pak_joko",
      "commodity": "Padi Inpari 32",
      "full_name": "Pak Joko",
      "avatar_url": "data:image/jpeg;base64,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",
      "created_at": "2026-09-20T23:43:51.015494",
      "updated_at": "2026-10-09T02:20:26.250Z",
      "land_size_ha": 1.2,
      "phone_number": "08123456789",
      "gemini_api_key": "fefe",
      "whatsapp_number": "08123456789"
    },
    {
      "id": "usr_distributor",
      "bio": "Pengelola KPL resmi penyalur pupuk subsidi dan benih bersertifikat di Sukamaju.",
      "role": "DISTRIBUTOR",
      "village": "Pasar Tradisional Sukamaju Kios B-04",
      "username": "ratna_kios",
      "commodity": "Saprotan Pupuk & Benih",
      "full_name": "Ibu Ratna",
      "created_at": "2026-09-20T23:43:51.015517",
      "land_size_ha": 0,
      "phone_number": "085712345678",
      "whatsapp_number": "085712345678"
    },
    {
      "id": "usr_agen",
      "bio": "Mitra penyerapan gabah dan penggilingan beras petani lokal dengan timbangan digital.",
      "role": "AGEN_PEMBELI",
      "village": "Kawasan Sentra Penggilingan Padi Km 3",
      "username": "gilingan_hendra",
      "commodity": "Gabah Kering Panen (GKP)",
      "full_name": "Bpk. Hendra Jaya",
      "created_at": "2026-09-20T23:43:51.015519",
      "land_size_ha": 0,
      "phone_number": "081356789012",
      "whatsapp_number": "081356789012"
    },
    {
      "id": "usr_traktor",
      "bio": "Menyediakan jasa bajak singkal & rotavator lengkap operator untuk olah tanah sawah siap tanam.",
      "role": "JASA_TRAKTOR",
      "village": "Desa Sukamaju Krajan",
      "username": "bambang_traktor",
      "commodity": "Jasa Traktor Quick Kubota 8.5 HP",
      "full_name": "Mas Bambang",
      "created_at": "2026-09-21T08:53:01.457976",
      "role_label": "Jasa Olah Tanah & Traktor",
      "land_size_ha": 0,
      "phone_number": "081298765432",
      "category_badge": "Sewa Traktor",
      "whatsapp_number": "081298765432"
    },
    {
      "id": "usr_pengairan",
      "bio": "Layanan sedot air sungai / embung dan persewaan pompa alkon ke petak sawah.",
      "role": "JASA_PENGAIRAN",
      "village": "Desa Sukamaju Blok Saluran",
      "username": "slamet_irigasi",
      "commodity": "Pompa Alkon 3 Inci & Sumur Pantek",
      "full_name": "Pak Slamet",
      "created_at": "2026-09-21T08:53:01.457977",
      "role_label": "Jasa Pompa Air & Irigasi",
      "land_size_ha": 0,
      "phone_number": "085799988811",
      "category_badge": "Jasa Pengairan",
      "whatsapp_number": "085799988811"
    },
    {
      "id": "usr_cangkul",
      "bio": "Koordinator regu tenaga kerja cangkul pematang sawah dan penanaman padi jajar legowo.",
      "role": "JASA_CANGKUL",
      "village": "Desa Sukamaju Girang",
      "username": "udin_cangkul",
      "commodity": "Regu Tanam & Cangkul Galengan",
      "full_name": "Mang Udin",
      "created_at": "2026-09-21T08:53:01.457978",
      "role_label": "Jasa Cangkul & Tanam",
      "land_size_ha": 0,
      "phone_number": "087811223344",
      "category_badge": "Jasa Cangkul",
      "whatsapp_number": "087811223344"
    },
    {
      "id": "usr_1791517561901",
      "bio": "Akun Petani Mandiri terdaftar di AgriBuddy.",
      "pin": "1234",
      "role": "PETANI_MANDIRI",
      "avatar": "/icons/petani.svg",
      "village": "Desa Sukamaju, Jawa Timur",
      "username": "petaniyyy",
      "commodity": "Padi Inpari 32",
      "full_name": "petaniyyy",
      "created_at": "2026-10-09T03:46:01.902Z",
      "role_label": "Petani Mandiri",
      "updated_at": "2026-10-16T15:21:53.350Z",
      "land_size_ha": 1,
      "phone_number": "081987654321",
      "category_badge": "Petani Mandiri",
      "whatsapp_number": "081987654321"
    }
  ],
  "inventory": [
    {
      "id": "inv_001",
      "name": "Pupuk Urea N-46",
      "type": "PUPUK",
      "unit": "Karung (50kg)",
      "notes": "Untuk pemupukan susulan I & II",
      "user_id": "usr_petani",
      "quantity": 5,
      "updated_at": "2026-09-27T03:05:58.266Z",
      "min_threshold": 2
    },
    {
      "id": "inv_002",
      "name": "Pupuk NPK Phonska",
      "type": "PUPUK",
      "unit": "Karung (50kg)",
      "notes": "Stok menipis, segera beli",
      "user_id": "usr_petani",
      "quantity": 10,
      "updated_at": "2026-09-27T05:31:32.055Z",
      "min_threshold": 2,
      "pending_orders": []
    },
    {
      "id": "inv_003",
      "name": "Benih Padi Inpari 32",
      "type": "BIBIT",
      "unit": "Kantong (5kg)",
      "notes": "Tahan wereng coklat",
      "user_id": "usr_petani",
      "quantity": 6,
      "updated_at": "2026-09-21T20:35:39.951789",
      "min_threshold": 2
    },
    {
      "id": "inv_8de008bd",
      "name": "Pupuk SP",
      "type": "PUPUK",
      "unit": "Karung",
      "notes": "",
      "user_id": "usr_1791517561901",
      "quantity": 2,
      "created_at": "2026-10-16T16:09:39.353Z",
      "min_threshold": 2
    }
  ],
  "harvests": [
    {
      "id": "hrv_001",
      "notes": "Hasil panen petak timur, disimpan di lumbung utama",
      "status": "TERSIMPAN",
      "user_id": "usr_petani",
      "commodity": "Gabah Kering Panen (GKP)",
      "harvest_date": "2026-08-20",
      "total_weight_kg": 2400
    },
    {
      "id": "hrv_002",
      "notes": "Sudah terjual 500kg ke KUD lokal",
      "status": "TERJUAL_SEBAGIAN",
      "user_id": "usr_petani",
      "commodity": "Gabah Kering Giling (GKG)",
      "harvest_date": "2026-07-10",
      "total_weight_kg": 1100
    },
    {
      "id": "har_e9180aa9",
      "notes": "Disimpan di lumbung utama",
      "status": "TERSIMPAN",
      "user_id": "usr_1791517561901",
      "commodity": "Gabah Kering Panen (GKP)",
      "created_at": "2026-10-16T09:17:09.723Z",
      "harvest_date": "2026-10-16",
      "total_weight_kg": 1000
    },
    {
      "id": "har_8f9fca7d",
      "notes": "Disimpan di lumbung utama",
      "status": "TERSIMPAN",
      "user_id": "usr_1791517561901",
      "commodity": "Gabah Kering Panen (GKP)",
      "created_at": "2026-10-16T09:18:28.131Z",
      "harvest_date": "2026-10-16",
      "total_weight_kg": 10000
    }
  ],
  "diagnoses": [
    {
      "id": "dia_e04f36fa",
      "severity": "Tinggi",
      "confidence": 0.96,
      "created_at": "2026-09-20T22:57:38.207990",
      "detected_at": "20 Sep 2026, 22:57 WIB",
      "disease_name": "Hawar Daun Bakteri (Kresek)"
    },
    {
      "id": "dia_b621d405",
      "severity": "Tinggi",
      "confidence": 0.95,
      "created_at": "2026-09-21T09:03:25.045144",
      "detected_at": "21 Sep 2026, 09:03 WIB",
      "disease_name": "Blas Daun (Pyricularia oryzae)"
    },
    {
      "id": "dia_8dba19b5",
      "severity": "Tinggi",
      "confidence": 0.93,
      "created_at": "2026-09-21T11:22:51.517296",
      "detected_at": "21 Sep 2026, 11:22 WIB",
      "disease_name": "Blas Daun (Pyricularia oryzae)"
    },
    {
      "id": "dia_7cbaaced",
      "severity": "Tinggi",
      "confidence": 0.93,
      "created_at": "2026-09-21T20:39:16.816720",
      "detected_at": "21 Sep 2026, 20:39 WIB",
      "disease_name": "Hawar Daun Bakteri (Kresek)"
    },
    {
      "id": "dia_51cb4b4b",
      "severity": "Tinggi",
      "confidence": 0.95,
      "created_at": "2026-09-21T20:39:37.168025",
      "detected_at": "21 Sep 2026, 20:39 WIB",
      "disease_name": "Blas Daun (Pyricularia oryzae)"
    },
    {
      "id": "dia_eb2e9d75",
      "severity": "Tinggi",
      "confidence": 0.94,
      "created_at": "2026-09-21T20:39:38.129586",
      "detected_at": "21 Sep 2026, 20:39 WIB",
      "disease_name": "Blas Daun (Pyricularia oryzae)"
    },
    {
      "id": "dia_786e86e0",
      "severity": "Sedang",
      "confidence": 0.92,
      "created_at": "2026-09-21T20:39:46.261091",
      "detected_at": "21 Sep 2026, 20:39 WIB",
      "disease_name": "Bercak Coklat (Helminthosporium oryzae)"
    },
    {
      "id": "dia_50d805a3",
      "severity": "Aman",
      "confidence": 0.95,
      "created_at": "2026-09-21T20:39:48.107164",
      "detected_at": "21 Sep 2026, 20:39 WIB",
      "disease_name": "Daun Padi Sehat"
    },
    {
      "id": "dia_a8815b45",
      "severity": "Sedang",
      "confidence": 0.94,
      "created_at": "2026-09-21T20:39:52.951910",
      "detected_at": "21 Sep 2026, 20:39 WIB",
      "disease_name": "Bercak Coklat (Helminthosporium oryzae)"
    },
    {
      "id": "dia_40e058f0",
      "severity": "Tinggi",
      "confidence": 0.93,
      "created_at": "2026-09-23T15:21:28.484Z",
      "ai_provider": "AgriBuddy Knowledge Engine (Sample)",
      "detected_at": "23 Sep 2026, 22.21 WIB",
      "disease_name": "Hawar Daun Bakteri (Kresek)",
      "english_name": "Bacterial Leaf Blight (Xanthomonas oryzae)"
    },
    {
      "id": "dia_587ba8f2",
      "severity": "Aman",
      "confidence": 0.94,
      "created_at": "2026-09-26T23:36:28.898Z",
      "ai_provider": "AgriBuddy Knowledge Engine (Sample)",
      "detected_at": "27 Sep 2026, 06.36 WIB",
      "disease_name": "Daun Padi Sehat",
      "english_name": "Healthy Rice Leaf"
    }
  ],
  "partners": [
    {
      "id": "prt_001",
      "name": "KUD Sumber Rejeki Sukamaju",
      "category": "KOPERASI",
      "location": "Jl. Raya Sukamaju No. 12, Jawa Timur",
      "pic_name": "Bpk. H. Bambang (Ketua KUD)",
      "description": "Menyerap gabah hasil panen anggota kelompok tani, penyalur pupuk subsidi resmi, dan simpan pinjam tani.",
      "is_verified": true,
      "is_connected": true,
      "category_label": "Koperasi Unit Desa",
      "phone_whatsapp": "6281298765432",
      "buying_price_hint": "Beli GKP: Rp 6.800 - 7.000/kg",
      "accepted_commodities": [
        "Gabah Kering Panen",
        "Gabah Kering Giling",
        "Jagung"
      ]
    },
    {
      "id": "prt_002",
      "name": "Kios Tani Subur Makmur (KPL Resmi)",
      "category": "DISTRIBUTOR_PUPUK",
      "location": "Pasar Tradisional Sukamaju Kios B-04",
      "pic_name": "Ibu Ratna (Pengelola Kios)",
      "description": "Penyalur resmi pupuk subsidi (Urea & NPK Phonska) menggunakan Kartu Tani serta benih bersertifikat.",
      "is_verified": true,
      "is_connected": false,
      "category_label": "Distributor Pupuk & Bibit",
      "phone_whatsapp": "6285712345678",
      "buying_price_hint": "Stok Urea & NPK Baru Tiba Kemarin",
      "accepted_commodities": [
        "Saprotan Pupuk Subsidi & Non-Subsidi"
      ]
    },
    {
      "id": "prt_003",
      "name": "Penggilingan Padi Sri Jaya",
      "category": "PENGGILINGAN_PASAR",
      "location": "Kawasan Sentra Penggilingan Padi Km 3",
      "pic_name": "Bpk. Hendra Jaya",
      "description": "Menerima gabah kering panen partai besar (truk/pick-up) dengan timbangan digital terkalibrasi dan pembayaran tunai/transfer langsung.",
      "is_verified": true,
      "is_connected": false,
      "category_label": "Penggilingan & Pengepul",
      "phone_whatsapp": "6281356789012",
      "buying_price_hint": "Siap Jemput Muatan ke Lokasi Lumbung",
      "accepted_commodities": [
        "Gabah Kering Panen (GKP)",
        "Beras Pecah Kulit"
      ]
    },
    {
      "id": "prt_004",
      "name": "Asosiasi Pedagang Pasar Induk Agrobisnis",
      "category": "PENGGILINGAN_PASAR",
      "location": "Pasar Induk Komoditas Pertanian Blok A",
      "pic_name": "Bpk. Suryanto",
      "description": "Jaringan pedagang beras grosir antar kota, siap menampung pasokan beras medium & premium hasil panen kelompok tani.",
      "is_verified": true,
      "is_connected": false,
      "category_label": "Pasar Induk Daerah",
      "phone_whatsapp": "6282145678901",
      "buying_price_hint": "Kontrak Pasokan Rutin Mingguan",
      "accepted_commodities": [
        "Beras Medium",
        "Beras Premium Inpari",
        "Beras Merah"
      ]
    }
  ],
  "offers": [
    {
      "id": "off_001",
      "notes": "Gabah kering siap angkut dari lumbung barat",
      "status": "MENUNGGU_KONFIRMASI",
      "commodity": "Gabah Kering Panen (GKP)",
      "weight_kg": 1500,
      "created_at": "20 Sep 2026, 14:00 WIB",
      "partner_id": "prt_001",
      "partner_name": "KUD Sumber Rejeki Sukamaju",
      "offered_price_per_kg": 6900
    }
  ],
  "shop_products": [
    {
      "id": "prod_001",
      "name": "Pupuk Urea N-46 (Subsidi)",
      "unit": "Karung (50kg)",
      "price": 112500,
      "category": "PUPUK",
      "is_subsidi": true,
      "description": "Pupuk nitrogen murni untuk memacu pertumbuhan vegetatif daun dan anakan padi.",
      "image_emoji": "",
      "seller_name": "Kios Tani Subur Makmur",
      "seller_role": "DISTRIBUTOR",
      "stock_available": 45
    },
    {
      "id": "prod_002",
      "name": "Pupuk NPK Phonska Plus 15-15-15",
      "unit": "Karung (50kg)",
      "price": 185000,
      "category": "PUPUK",
      "is_subsidi": false,
      "description": "NPK majemuk diperkaya Seng (Zn) dan Sulfur untuk malai padi berisi penuh dan bobot berat.",
      "image_emoji": "",
      "seller_name": "Kios Tani Subur Makmur",
      "seller_role": "DISTRIBUTOR",
      "stock_available": 30
    },
    {
      "id": "prod_003",
      "name": "Benih Padi Inpari 32 Bersertifikat",
      "unit": "Kantong (5kg)",
      "price": 75000,
      "category": "BIBIT",
      "is_subsidi": false,
      "description": "Benih label ungu resmi Balitbangtan, potensi hasil 10,5 ton/ha, tahan rebah & wereng coklat.",
      "image_emoji": "",
      "seller_name": "KUD Sumber Rejeki Sukamaju",
      "seller_role": "DISTRIBUTOR",
      "stock_available": 20
    },
    {
      "id": "prod_004",
      "name": "Bakterisida Hayati Kuproxat 345 SC",
      "unit": "Botol (250ml)",
      "price": 65000,
      "category": "OBAT",
      "is_subsidi": false,
      "description": "Solusi ampuh mengendalikan Hawar Daun Bakteri (Kresek) rekomendasi Dokter Tani AI.",
      "image_emoji": "",
      "seller_name": "Kios Tani Subur Makmur",
      "seller_role": "DISTRIBUTOR",
      "stock_available": 15
    }
  ],
  "saprotan_orders": [
    {
      "id": "ord_001",
      "unit": "Karung (50kg)",
      "status": "SELESAI",
      "quantity": 2,
      "buyer_name": "Pak Joko (Petani)",
      "created_at": "19 Sep 2026, 10:15 WIB",
      "product_id": "prod_001",
      "seller_name": "Kios Tani Subur Makmur",
      "total_price": 225000,
      "product_name": "Pupuk Urea N-46 (Subsidi)",
      "product_type": "PUPUK",
      "delivery_note": "Diambil sore saat pulang sawah",
      "payment_method": "COD / Bayar Saat Ambil"
    }
  ],
  "market_listings": [
    {
      "id": "list_001",
      "bids": [
        {
          "id": "bid_001",
          "notes": "Siap jemput dengan pick-up hari Kamis, timbangan di tempat tunai.",
          "status": "MENUNGGU",
          "created_at": "20 Sep 2026, 11:20 WIB",
          "bidder_name": "Penggilingan Padi Sri Jaya",
          "bidder_role": "PENGGILINGAN",
          "bid_weight_kg": 1500,
          "bid_price_per_kg": 6950
        },
        {
          "id": "bid_002",
          "notes": "Penyerapan gabah program ketahanan pangan desa.",
          "status": "MENUNGGU",
          "created_at": "20 Sep 2026, 12:45 WIB",
          "bidder_name": "KUD Sumber Rejeki Sukamaju",
          "bidder_role": "KOPERASI",
          "bid_weight_kg": 1500,
          "bid_price_per_kg": 6850
        }
      ],
      "notes": "Kadar air sekitar 14%, bulir bersih siap giling.",
      "status": "DIBUKA",
      "location": "Lumbung Desa Sukamaju (Petak Timur)",
      "commodity": "Gabah Kering Panen (GKP)",
      "created_at": "20 Sep 2026, 09:30 WIB",
      "seller_name": "Pak Joko (Petani)",
      "min_order_kg": 500,
      "total_weight_kg": 1500,
      "starting_price_per_kg": 6800
    }
  ],
  "community_posts": [
    {
      "id": "post_001",
      "title": "Pengumuman: Jadwal Aliran Air Irigasi Tersier Petak Utara",
      "content": "Bapak-bapak anggota Poktan Makmur, pintu air Dam Timur akan dibuka mulai besok pagi jam 06.00 s.d 15.00 WIB untuk pengairan fase bunting. Mohon bersihkan saluran pematang masing-masing agar debit air lancar.",
      "category": "INFO_POKTAN",
      "comments": [
        {
          "id": "comm_001",
          "comment": "Siap Pak Ketua, saluran petak saya sudah dibersihkan dari jerami tadi pagi.",
          "created_at": "20 Sep 2026, 08:35 WIB",
          "author_name": "Pak Joko",
          "author_role": "Petani"
        },
        {
          "id": "comm_8e555f",
          "comment": "Siap bantu olah tanah Pak, kabari saja jadwalnya.",
          "created_at": "21 Sep 2026, 09:38 WIB",
          "author_name": "Mas Bambang",
          "author_role": "Jasa Traktor"
        }
      ],
      "created_at": "20 Sep 2026, 08:00 WIB",
      "updated_at": "2026-09-21T09:38:35.988232",
      "author_name": "Bpk. H. Bambang",
      "author_role": "KETUA_POKTAN",
      "likes_count": 12,
      "category_label": "Info Poktan",
      "author_role_label": "Ketua Kelompok Tani Makmur"
    },
    {
      "id": "post_002",
      "title": "Waspada Gejala Daun Padi Menguning Kering di Tepi",
      "content": "Pagi ini daun padi saya di petak timur terdeteksi Hawar Daun Bakteri (Kresek) lewat Dokter Tani AI. Tetangga sawah harap cek petak masing-masing dan kurangi urea jika musim hujan.",
      "category": "TANYA_HAMA",
      "comments": [
        {
          "id": "comm_002",
          "comment": "Pak Joko, stok bakterisida tembaga di kios sudah ready, silakan langsung pesan di tab Kios jika butuh.",
          "created_at": "20 Sep 2026, 15:00 WIB",
          "author_name": "Kios Tani Subur Makmur",
          "author_role": "Distributor"
        }
      ],
      "created_at": "20 Sep 2026, 14:15 WIB",
      "author_name": "Pak Joko",
      "author_role": "PETANI",
      "likes_count": 8,
      "category_label": "Hama & Penyakit",
      "author_role_label": "Petani Padi (Sukamaju)"
    }
  ],
  "farm_plans": [
    {
      "id": "far_892ac03e",
      "plan_id": "pln_80_9800",
      "user_id": "usr_001",
      "latitude": -7.2504,
      "location": "Desa Sukamaju Krajan",
      "commodity": "Padi Sawah Inpari 32",
      "longitude": 112.7512,
      "soil_type": "Lempung Berliat (Subur)",
      "created_at": "2026-09-21T08:53:04.123669",
      "updated_at": "2026-09-21T21:34:05.652235",
      "budget_items": [
        {
          "id": "bgt_1",
          "name": "Sewa Traktor & Operator (Bajak & Garu)",
          "unit": "Hektar",
          "notes": "Olah tanah sempurna gembur dan perataan gulma",
          "phase": "Olah Tanah & Lahan",
          "category": "JASA_TRAKTOR",
          "quantity": 0.8,
          "unit_price": 1200000,
          "total_price": 960000,
          "recommended_provider": "Mas Bambang (Jasa Traktor Quick Sukamaju)"
        },
        {
          "id": "bgt_2",
          "name": "Jasa Cangkul & Perbaikan Galengan/Pematang",
          "unit": "Orang-Hari",
          "notes": "Pembersihan kebocoran pematang sawah penahan air",
          "phase": "Olah Tanah & Lahan",
          "category": "JASA_CANGKUL",
          "quantity": 2,
          "unit_price": 166666,
          "total_price": 400000,
          "recommended_provider": "Mang Udin & Kelompok Buruh Cangkul"
        },
        {
          "id": "bgt_3",
          "name": "Benih Padi Sawah Inpari 32 Bersertifikat",
          "unit": "kg",
          "notes": "Daya tumbuh > 85%, tahan rebah",
          "phase": "Persemaian & Benih",
          "category": "SAPROTAN",
          "quantity": 20,
          "unit_price": 15000,
          "total_price": 300000,
          "recommended_provider": "Kios Tani Subur Makmur (Ibu Ratna)"
        },
        {
          "id": "bgt_4",
          "name": "Upah Buruh Tanam (Sistem Jajar Legowo 2:1)",
          "unit": "Orang-Hari",
          "notes": "Populasi rumpun optimal dan sirkulasi udara baik",
          "phase": "Tanam",
          "category": "JASA_BURUH",
          "quantity": 8,
          "unit_price": 140000,
          "total_price": 1120000,
          "recommended_provider": "Kelompok Tani Makmur (Regu Tanam Melati)"
        },
        {
          "id": "bgt_5",
          "name": "Pupuk Urea N-46 (Subsidi)",
          "unit": "kg",
          "notes": "Pemupukan dasar (1/3 dosis) dan susulan I & II",
          "phase": "Nutrisi & Pemupukan",
          "category": "PUPUK",
          "quantity": 140,
          "unit_price": 2250,
          "total_price": 315000,
          "recommended_provider": "Kios Pupuk KPL Resmi"
        },
        {
          "id": "bgt_6",
          "name": "Pupuk Majemuk NPK Phonska 15-15-15",
          "unit": "kg",
          "notes": "Keseimbangan fosfat & kalium untuk bobot bulir",
          "phase": "Nutrisi & Pemupukan",
          "category": "PUPUK",
          "quantity": 256,
          "unit_price": 3300,
          "total_price": 844800,
          "recommended_provider": "Kios Pupuk KPL Resmi"
        },
        {
          "id": "bgt_7",
          "name": "Pupuk Hayati Organik / Pembenah Tanah",
          "unit": "kg",
          "notes": "Menjaga mikroba tanah jenis Lempung Berliat (Subur)",
          "phase": "Nutrisi & Pemupukan",
          "category": "PUPUK",
          "quantity": 400,
          "unit_price": 800,
          "total_price": 320000,
          "recommended_provider": "Koperasi Unit Desa (KUD Sukamaju)"
        },
        {
          "id": "bgt_8",
          "name": "Operasional Pengairan (Irigasi Teknis Bendungan)",
          "unit": "Paket Lahan",
          "notes": "Memanfaatkan saluran irigasi teknis P3A poktan (hemat biaya operasional).",
          "phase": "Pengairan",
          "category": "JASA_PENGAIRAN",
          "quantity": 0.8,
          "unit_price": 50000,
          "total_price": 40000,
          "recommended_provider": "Pak Slamet (Jasa Pompa Air Alkon Sukamaju)"
        },
        {
          "id": "bgt_9",
          "name": "Paket Fungisida & Bakterisida Hayati (Anti-Kresek)",
          "unit": "Paket Obat",
          "notes": "Pencegahan dini hawar daun bakteri dan jamur bulir",
          "phase": "Perawatan & Hama",
          "category": "SAPROTAN",
          "quantity": 2,
          "unit_price": 325000,
          "total_price": 520000,
          "recommended_provider": "Kios Tani Subur Makmur"
        },
        {
          "id": "bgt_10",
          "name": "Upah Panen / Sewa Mesin Combine Harvester",
          "unit": "Hektar",
          "notes": "Termasuk perontokan dan penimbangan langsung",
          "phase": "Panen & Pengangkutan",
          "category": "JASA_PANEN",
          "quantity": 0.8,
          "unit_price": 1800000,
          "total_price": 1440000,
          "recommended_provider": "Bpk. Hendra Jaya (Mitra Penggilingan Sri Jaya)"
        },
        {
          "id": "bgt_11",
          "name": "Karung & Ongkos Angkut ke Lumbung/Pengepul",
          "unit": "Paket Muatan",
          "notes": "Karung isi 50-60kg dan pengiriman ke lumbung tani",
          "phase": "Panen & Pengangkutan",
          "category": "JASA_LOGISTIK",
          "quantity": 0.8,
          "unit_price": 350000,
          "total_price": 280000,
          "recommended_provider": "Armada Pick-Up Desa Sukamaju"
        }
      ],
      "land_size_ha": 0.8,
      "water_source": "Irigasi Teknis Bendungan",
      "timeline_phases": [
        {
          "name": "Persemaian Benih & Pengolahan Tanah Pertama",
          "tasks": [
            "Rendam benih 24 jam dan tiriskan 48 jam hingga berkecambah",
            "Bajak tanah pertama (singkal) sedalam 20-25 cm",
            "Garu dan ratakan permukaan sawah agar lumpur matang sempurna"
          ],
          "status": "SELESAI",
          "ai_tips": "Pastikan bedengan persemaian tidak tergenang air lebih dari 2 cm agar kecambah tidak busuk.",
          "step_no": 1,
          "day_range": "H-15 s/d H-5",
          "actual_cost": 1660000,
          "duration_days": 10,
          "allocated_budget": 1660000
        },
        {
          "name": "Penanaman Bibit & Pemupukan Dasar",
          "tasks": [
            "Tanam bibit umur muda (15-18 hari setelah semai), 1-2 bibit per rumpun",
            "Gunakan jarak tanam Jajar Legowo 2:1 (20 x 10 x 40 cm)",
            "Aplikasi pupuk organik kandang dan 1/3 dosis Urea sebagai pupuk dasar"
          ],
          "status": "SEDANG_BERJALAN",
          "ai_tips": "Tanam dangkal (1-2 cm) memicu pembentukan anakan produktif lebih cepat dan kuat.",
          "step_no": 2,
          "day_range": "H+1 s/d H+7",
          "actual_cost": 0,
          "duration_days": 7,
          "allocated_budget": 1534500
        },
        {
          "name": "Pemupukan Susulan I & Penyiangan Gulma",
          "tasks": [
            "Penyiangan rumput liar/gulma dengan alat gosrok/landak",
            "Taburkan pupuk susulan I (campuran NPK Phonska dan Urea)",
            "Kondisikan air macak-macak (nyemek) saat menabur pupuk"
          ],
          "status": "BELUM",
          "ai_tips": "Curah hujan tinggi terdeteksi (probabilitas 65%). Dosis Urea diturunkan 15% untuk mencegah serangan Hawar Daun (Kresek) dan rebah batang, dengan penguatan Kalium NPK. Jangan tabur pupuk saat mendung pekat menjelang hujan deras agar tidak hanyut.",
          "step_no": 3,
          "day_range": "H+18 s/d H+24",
          "actual_cost": 0,
          "duration_days": 6,
          "allocated_budget": 532650
        },
        {
          "name": "Pemupukan Susulan II & Fase Primordia (Bunting)",
          "tasks": [
            "Pengamatan malai bunting dan serangan hama sundep/penggerek batang",
            "Aplikasi pupuk susulan terakhir penambah Kalium untuk pengisian bulir",
            "Pengaturan debit pintu air irigasi masuk setinggi 3-5 cm"
          ],
          "status": "BELUM",
          "ai_tips": "Kebutuhan air pada fase bunting sangat krusial, hubungi pengelola pompa jika saluran kering.",
          "step_no": 4,
          "day_range": "H+40 s/d H+50",
          "actual_cost": 0,
          "duration_days": 10,
          "allocated_budget": 572650
        },
        {
          "name": "Pengisian Bulir, Pemasakan & Pencegahan Hama",
          "tasks": [
            "Semprot fungisida/bakterisida hayati bila tampak tanda daun menguning bercak",
            "Pemasangan tali kresek/orang-orangan sawah pengusir burung pipit",
            "Mulai kurangi ketinggian air sawah 10 hari sebelum panen raya"
          ],
          "status": "BELUM",
          "ai_tips": "Keringkan sawah saat gabah sudah mulai menguning 85% untuk mempercepat kematangan serentak.",
          "step_no": 5,
          "day_range": "H+65 s/d H+85",
          "actual_cost": 0,
          "duration_days": 20,
          "allocated_budget": 520000
        },
        {
          "name": "Panen Raya & Distribusi ke Lumbung/Pengepul",
          "tasks": [
            "Cek kadar air gabah kering panen (target 14-18%)",
            "Pemanenan dengan Combine Harvester atau sabit gerigi",
            "Pencatatan timbangan gabah dan penawaran langsung di Bursa Panen AgriBuddy"
          ],
          "status": "BELUM",
          "ai_tips": "Langsung buat listing panen di AgriBuddy untuk mendapatkan penawaran harga tertinggi dari pengepul.",
          "step_no": 6,
          "day_range": "H+100 s/d H+115",
          "actual_cost": 0,
          "duration_days": 15,
          "allocated_budget": 1720000
        }
      ],
      "coordinates_label": "-7.2504, 112.7512 (Desa Sukamaju Krajan)",
      "financial_summary": {
        "hpp_per_kg": 1216,
        "total_budget": 6539800,
        "roi_percentage": 463.1,
        "projected_revenue": 36825600,
        "projected_yield_kg": 5376,
        "projected_net_profit": 30285800,
        "projected_selling_price_per_kg": 6850
      },
      "weather_condition": {
        "note": "Curah hujan tinggi terdeteksi (probabilitas 65%). Dosis Urea diturunkan 15% untuk mencegah serangan Hawar Daun (Kresek) dan rebah batang, dengan penguatan Kalium NPK.",
        "season": "Musim Hujan (Rendeng)",
        "temp_celsius": 26,
        "rain_probability": 65
      },
      "ecosystem_recommendations": [
        {
          "phone": "6281298765432",
          "action_text": "Hubungi untuk jadwal bajak lahan",
          "partner_name": "Mas Bambang (Traktor Quick)",
          "role_category": "Jasa Olah Tanah"
        },
        {
          "phone": "6285799988811",
          "action_text": "Booking jadwal sedot saluran",
          "partner_name": "Pak Slamet (Pompa Alkon 3 Inci)",
          "role_category": "Jasa Pengairan"
        },
        {
          "phone": "6285712345678",
          "action_text": "Pesan pupuk & benih bersertifikat",
          "partner_name": "Kios Tani Subur Makmur (Ibu Ratna)",
          "role_category": "Penyedia Saprotan"
        },
        {
          "phone": "6281356789012",
          "action_text": "Cek harga serapan gabah panen",
          "partner_name": "Bpk. Hendra Jaya (Sri Jaya)",
          "role_category": "Penggilingan Padi"
        }
      ]
    },
    {
      "id": "far_3d4b8a3b",
      "plan_id": "plan_mvfl0zfc",
      "user_id": "usr_petani",
      "latitude": -7.2504,
      "location": "Desa Sukamaju, Jawa Timur",
      "commodity": "Padi Sawah Inpari 32",
      "longitude": 112.7512,
      "soil_type": "Lempung Berliat (Subur)",
      "created_at": "2026-09-23T15:21:32.822Z",
      "updated_at": "2026-10-19T18:22:53.016Z",
      "budget_items": [
        {
          "id": "bgt_1",
          "name": "Sewa Traktor & Operator (Bajak & Garu)",
          "unit": "Hektar",
          "notes": "Olah tanah sempurna gembur dan perataan gulma",
          "phase": "Olah Tanah & Lahan",
          "category": "JASA_TRAKTOR",
          "quantity": 1,
          "unit_price": 1200000,
          "total_price": 1200000,
          "recommended_provider": "Mas Bambang (Jasa Traktor Quick Sukamaju)"
        },
        {
          "id": "bgt_2",
          "name": "Jasa Cangkul & Perbaikan Galengan/Pematang",
          "unit": "Orang-Hari",
          "notes": "Pembersihan kebocoran pematang sawah penahan air",
          "phase": "Olah Tanah & Lahan",
          "category": "JASA_CANGKUL",
          "quantity": 3,
          "unit_price": 166667,
          "total_price": 500000,
          "recommended_provider": "Mang Udin & Kelompok Buruh Cangkul"
        },
        {
          "id": "bgt_3",
          "name": "Benih Padi Sawah Inpari 32 Bersertifikat",
          "unit": "kg",
          "notes": "Daya tumbuh > 85%, tahan rebah",
          "phase": "Persemaian & Benih",
          "category": "SAPROTAN",
          "quantity": 25,
          "unit_price": 15000,
          "total_price": 375000,
          "recommended_provider": "Kios Tani Subur Makmur (Ibu Ratna)"
        },
        {
          "id": "bgt_4",
          "name": "Upah Buruh Tanam (Sistem Jajar Legowo 2:1)",
          "unit": "Orang-Hari",
          "notes": "Populasi rumpun optimal dan sirkulasi udara baik",
          "phase": "Tanam",
          "category": "JASA_BURUH",
          "quantity": 10,
          "unit_price": 140000,
          "total_price": 1400000,
          "recommended_provider": "Kelompok Tani Makmur (Regu Tanam Melati)"
        },
        {
          "id": "bgt_5",
          "name": "Pupuk Urea N-46 (Subsidi)",
          "unit": "kg",
          "notes": "Pemupukan dasar (1/3 dosis) dan susulan I & II",
          "phase": "Nutrisi & Pemupukan",
          "category": "PUPUK",
          "quantity": 175,
          "unit_price": 2250,
          "total_price": 393750,
          "recommended_provider": "Kios Pupuk KPL Resmi"
        },
        {
          "id": "bgt_6",
          "name": "Pupuk Majemuk NPK Phonska 15-15-15",
          "unit": "kg",
          "notes": "Nutrisi N-P-K berimbang untuk anakan dan pembentukan malai",
          "phase": "Nutrisi & Pemupukan",
          "category": "PUPUK",
          "quantity": 320,
          "unit_price": 3300,
          "total_price": 1056000,
          "recommended_provider": "Kios Pupuk KPL Resmi"
        },
        {
          "id": "bgt_7",
          "name": "Bahan Organik / Pupuk Kandang Fermentasi",
          "unit": "Ton",
          "notes": "Memperbaiki struktur mikroorganisme tanah dan porositas",
          "phase": "Nutrisi & Pemupukan",
          "category": "PUPUK_ORGANIK",
          "quantity": 1,
          "unit_price": 400000,
          "total_price": 400000,
          "recommended_provider": "Kelompok Ternak Desa"
        },
        {
          "id": "bgt_8",
          "name": "Biaya Pengairan & Distribusi Air (Irigasi Teknis Bendungan)",
          "unit": "Paket Musim",
          "notes": "Irigasi berkala macak-macak sesuai umur tanaman",
          "phase": "Pengairan",
          "category": "PENGAIRAN",
          "quantity": 1,
          "unit_price": 150000,
          "total_price": 150000,
          "recommended_provider": "Pak Slamet (Jasa Pompa Air & Irigasi)"
        },
        {
          "id": "bgt_9",
          "name": "Insektisida & Fungisida Ramah Lingkungan",
          "unit": "Paket Musim",
          "notes": "Pencegahan dini wereng batang coklat dan penggerek batang",
          "phase": "Perlindungan Tanaman",
          "category": "PESTISIDA",
          "quantity": 1,
          "unit_price": 650000,
          "total_price": 650000,
          "recommended_provider": "Kios Tani Subur Makmur"
        },
        {
          "id": "bgt_10",
          "name": "Upah Tenaga Semprot Hama (3x Aplikasi)",
          "unit": "Aplikasi",
          "notes": "Aplikasi umur 20 HST, 40 HST, dan 60 HST",
          "phase": "Perlindungan Tanaman",
          "category": "JASA_BURUH",
          "quantity": 3,
          "unit_price": 116667,
          "total_price": 350000,
          "recommended_provider": "Regu Pengendali Hama (RPH) Desa"
        },
        {
          "id": "bgt_11",
          "name": "Upah Regu Panen Gabah (Bawon / Gejlok)",
          "unit": "Hektar",
          "notes": "Pemotongan sabit bergerigi & perontokan mesin threser",
          "phase": "Panen & Pasca Panen",
          "category": "JASA_BURUH",
          "quantity": 1,
          "unit_price": 1800000,
          "total_price": 1800000,
          "recommended_provider": "Bpk. Hendra Jaya (Mitra Penggilingan Padi)"
        },
        {
          "id": "bgt_12",
          "name": "Karung Kemasan & Pengangkutan ke Lumbung",
          "unit": "Paket Angkut",
          "notes": "Pengangkutan gabah dari pematang sawah ke lumbung simpan",
          "phase": "Panen & Pasca Panen",
          "category": "LOGISTIK",
          "quantity": 1,
          "unit_price": 350000,
          "total_price": 350000,
          "recommended_provider": "Armada Angkut Desa"
        }
      ],
      "land_size_ha": 1,
      "water_source": "Irigasi Teknis Bendungan",
      "timeline_phases": [
        {
          "name": "Olah Tanah & Persemaian",
          "tasks": [
            "Bajak singkal dan pembalikan tanah dengan traktor",
            "Perbaikan pematang dan galengan sawah penahan air",
            "Penyemaian benih padi dengan perendaman larutan garam",
            "Aplikasi pupuk organik kandang fermentasi"
          ],
          "status": "BELUM",
          "ai_tips": "Pastikan tanah terendam air 2-3 hari setelah dibajak agar bongkahan tanah lunak dan gulma terdekomposisi sempurna.",
          "step_no": 1,
          "day_range": "H-15 s/d H-1",
          "actual_cost": 0,
          "duration_days": 15,
          "allocated_budget": 2075000
        },
        {
          "name": "Penanaman Bibit",
          "tasks": [
            "Pencabutan bibit semai (dapog) umur 15-18 hari",
            "Tanam pindah dengan sistem jajar legowo 2:1 (jarak 25x12.5x50 cm)",
            "Kedalaman tanam dangkal 1.5 - 2 cm (1-2 batang per rumpun)"
          ],
          "status": "BELUM",
          "ai_tips": "Tanam bibit muda (< 18 hari) dengan posisi dangkal memacu jumlah anakan produktif lebih dari 25 malai per rumpun.",
          "step_no": 2,
          "day_range": "HST 1 s/d HST 5",
          "actual_cost": 0,
          "duration_days": 5,
          "allocated_budget": 1400000
        },
        {
          "name": "Fase Vegetatif & Pemupukan I & II",
          "tasks": [
            "Pemupukan dasar susulan I (HST 7-10): Urea + NPK Phonska",
            "Penyiangan rumput/gulma dengan alat gasrok/landak (HST 15-20)",
            "Pemupukan susulan II (HST 25-30): Tambahan NPK & sedikit Urea",
            "Pemantauan gejala hama wereng dan kresek daun via Agri AI"
          ],
          "status": "BELUM",
          "ai_tips": "Kondisikan air sawah macak-macak (ketinggian 1-2 cm) saat penaburan pupuk agar nutrisi tidak larut terbawa aliran pembuangan.",
          "step_no": 3,
          "day_range": "HST 7 s/d HST 35",
          "actual_cost": 0,
          "duration_days": 28,
          "allocated_budget": 978625
        },
        {
          "name": "Fase Generatif / Bunting & Pengisian Bulir",
          "tasks": [
            "Pemupukan susulan III / booster malai (HST 45-50): Fokus unsur Kalium & Fosfat",
            "Pengairan teratur menjaga kelembaban optimal saat pembungaan",
            "Penyemprotan pencegahan penyakit blas malai (Pyricularia)",
            "Pemasangan orang-orangan sawah / jaring pelindung burung pipit"
          ],
          "status": "BELUM",
          "ai_tips": "Jangan biarkan sawah kekeringan pada saat padi berbunga (keluar malai) karena dapat menyebabkan bulir gabah hampa.",
          "step_no": 4,
          "day_range": "HST 40 s/d HST 75",
          "actual_cost": 0,
          "duration_days": 35,
          "allocated_budget": 1068000
        },
        {
          "name": "Pematangan Bulir & Panen Raya",
          "tasks": [
            "Pengeringan total petak sawah 7-10 hari sebelum jadwal panen",
            "Pengecekan kemasakan bulir (90-95% malai telah menguning)",
            "Pelaksanaan panen gabah dengan regu sabit / mesin perontok",
            "Penimbangan tonase riil dan pencatatan ke fitur Lumbung Panen AgriBuddy",
            "Pembukaan tiket bursa lelang gabah ke mitra pengepul"
          ],
          "status": "BELUM",
          "ai_tips": "Pengeringan lahan sebelum panen mempermudah mobilitas regu panen dan meningkatkan kualitas rendemen giling beras.",
          "step_no": 5,
          "day_range": "HST 80 s/d HST 105",
          "actual_cost": 0,
          "duration_days": 25,
          "allocated_budget": 2150000
        }
      ],
      "coordinates_label": "-7.2504, 112.7512 (Desa Sukamaju, Jawa Timur)",
      "financial_summary": {
        "hpp_per_kg": 1391,
        "total_budget": 8624750,
        "roi_percentage": 388.8,
        "projected_revenue": 42160000,
        "projected_yield_kg": 6200,
        "projected_net_profit": 33535250,
        "projected_selling_price_per_kg": 6800
      },
      "weather_condition": {
        "note": "Curah hujan tinggi terdeteksi (65%). Dosis Urea diturunkan 15% untuk mencegah serangan Hawar Daun dan rebah batang.",
        "season": "Musim Hujan (Rendeng)",
        "temp_celsius": 26,
        "rain_probability": 65
      },
      "ecosystem_recommendations": [
        {
          "phone": "6281298765432",
          "action_text": "Sewa traktor bajak singkal & rotavator siap kerja di Desa Sukamaju",
          "partner_name": "Mas Bambang (Traktor Quick Kubota)",
          "role_category": "Penyedia Jasa Olah Tanah"
        },
        {
          "phone": "6285712345678",
          "action_text": "Pesan pupuk Urea & NPK Phonska tebus Kartu Tani dan benih bersertifikat",
          "partner_name": "Kios Tani Subur Makmur (Ibu Ratna)",
          "role_category": "Distributor Saprotan & Pupuk"
        },
        {
          "phone": "6285799988811",
          "action_text": "Sewa pompa air diesel darurat untuk pengairan musim kemarau",
          "partner_name": "Pak Slamet (Pompa Alkon 3 Inci)",
          "role_category": "Penyedia Jasa Pengairan"
        },
        {
          "phone": "6281356789012",
          "action_text": "Penjualan lelang Gabah Kering Panen (GKP) timbangan digital jemput lumbung",
          "partner_name": "Bpk. Hendra Jaya (Sentra Penggilingan Padi Km 3)",
          "role_category": "Penyerapan Hasil Panen"
        }
      ]
    }
  ],
  "ecosystem_services": [
    {
      "id": "srv_001",
      "tags": [
        "Traktor Roda 2",
        "Singkal & Garu",
        "Lahan Basah & Kering"
      ],
      "phone": "6281298765432",
      "price": 1200000,
      "title": "Sewa Traktor Quick Kubota (Bajak & Garu)",
      "rating": 4.9,
      "category": "JASA_TRAKTOR",
      "location": "Desa Sukamaju Krajan",
      "image_url": "https://images.unsplash.com/photo-1594771804886-a933bb2d609b?auto=format&fit=crop&w=600&q=80",
      "promo_tag": "Bisa Bayar Panen",
      "created_at": "2026-09-20T08:00:00",
      "price_unit": "/ Hektar",
      "description": "Paket olah tanah sawah sampai gembur siap tanam. Termasuk traktor Quick Kubota 8.5 HP, operator berpengalaman, dan BBM solar.",
      "provider_id": "usr_traktor",
      "is_available": true,
      "provider_name": "Mas Bambang",
      "category_label": "Jasa Olah Tanah",
      "provider_badge": "Sewa Traktor",
      "provider_avatar": "",
      "completed_orders_count": 54
    },
    {
      "id": "srv_002",
      "tags": [
        "Rotavator",
        "Gulma Hancur",
        "Cepat Selesai"
      ],
      "phone": "6281298765432",
      "price": 1100000,
      "title": "Olah Tanah Rotavator Cepat",
      "rating": 4.8,
      "category": "JASA_TRAKTOR",
      "location": "Desa Sukamaju Krajan",
      "image_url": "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80",
      "promo_tag": "Hasil Gembur Cepat",
      "created_at": "2026-09-20T08:30:00",
      "price_unit": "/ Hektar",
      "description": "Penghancuran tanah dan gulma dalam sekali jalan dengan pisau rotavator tajam, tanah langsung gembur merata.",
      "provider_id": "usr_traktor",
      "is_available": true,
      "provider_name": "Mas Bambang",
      "category_label": "Jasa Olah Tanah",
      "provider_badge": "Sewa Traktor",
      "provider_avatar": "",
      "completed_orders_count": 38
    },
    {
      "id": "srv_003",
      "tags": [
        "Pompa Alkon 3 Inci",
        "Selang 50m",
        "Debit Tinggi"
      ],
      "phone": "6285799988811",
      "price": 150000,
      "title": "Sewa Mesin Pompa Alkon 3 Inci + Selang Spiral 50m",
      "rating": 4.9,
      "category": "JASA_PENGAIRAN",
      "location": "Desa Sukamaju Blok Saluran",
      "image_url": "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80",
      "promo_tag": "Siap Antar Sawah",
      "created_at": "2026-09-20T09:00:00",
      "price_unit": "/ Hari",
      "description": "Mesin pompa diesel alkon 3 inci hisap debit tinggi, lengkap selang buang 50 meter dan saringan hisap.",
      "provider_id": "usr_pengairan",
      "is_available": true,
      "provider_name": "Pak Slamet",
      "category_label": "Jasa Pengairan",
      "provider_badge": "Jasa Pengairan",
      "provider_avatar": "",
      "completed_orders_count": 72
    },
    {
      "id": "srv_004",
      "tags": [
        "Borongan Sedot",
        "Musim Kemarau",
        "Antar Mesin"
      ],
      "phone": "6285799988811",
      "price": 350000,
      "title": "Jasa Sedot Air Sungai / Embung ke Petak Sawah",
      "rating": 4.7,
      "category": "JASA_PENGAIRAN",
      "location": "Desa Sukamaju",
      "image_url": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
      "promo_tag": "Debit Air Kencang",
      "created_at": "2026-09-20T09:15:00",
      "price_unit": "/ Paket (1 Ha)",
      "description": "Paket borongan pengairan sawah sampai air tergenang macak-macak siap tabur pupuk susulan.",
      "provider_id": "usr_pengairan",
      "is_available": true,
      "provider_name": "Pak Slamet",
      "category_label": "Jasa Pengairan",
      "provider_badge": "Jasa Pengairan",
      "provider_avatar": "",
      "completed_orders_count": 29
    },
    {
      "id": "srv_005",
      "tags": [
        "Jajar Legowo 2:1",
        "Rapi & Cepat",
        "1 Hari Selesai"
      ],
      "phone": "6287811223344",
      "price": 1400000,
      "title": "Regu Tanam Padi Borongan (Sistem Jajar Legowo 2:1)",
      "rating": 5,
      "category": "JASA_TENAGA_KERJA",
      "location": "Desa Sukamaju Girang",
      "image_url": "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&w=600&q=80",
      "promo_tag": "Regu Berpengalaman",
      "created_at": "2026-09-20T09:30:00",
      "price_unit": "/ Hektar",
      "description": "Regu tanam wanita dan pria terampil 10-12 orang, pola tanam jajar legowo lurus rapi, jarak tanam teratur.",
      "provider_id": "usr_cangkul",
      "is_available": true,
      "provider_name": "Mang Udin",
      "category_label": "Tenaga Kerja Tani",
      "provider_badge": "Jasa Cangkul",
      "provider_avatar": "",
      "completed_orders_count": 64
    },
    {
      "id": "srv_006",
      "tags": [
        "Cangkul Galengan",
        "Tahan Bocor",
        "Tenaga Kuat"
      ],
      "phone": "6287811223344",
      "price": 120000,
      "title": "Jasa Cangkul & Perbaikan Galengan Pematang Sawah",
      "rating": 4.8,
      "category": "JASA_TENAGA_KERJA",
      "location": "Desa Sukamaju",
      "image_url": "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80",
      "promo_tag": "Pematang Rapih",
      "created_at": "2026-09-20T10:00:00",
      "price_unit": "/ Orang / Hari",
      "description": "Pembersihan rumput galengan, penutupan lubang kepiting penahan kebocoran air, dan pematang kokoh.",
      "provider_id": "usr_cangkul",
      "is_available": true,
      "provider_name": "Mang Udin",
      "category_label": "Tenaga Kerja Tani",
      "provider_badge": "Jasa Cangkul",
      "provider_avatar": "",
      "completed_orders_count": 41
    },
    {
      "id": "srv_007",
      "tags": [
        "Pupuk Subsidi",
        "Nitrogen 46%",
        "Kartu Tani"
      ],
      "phone": "6285712345678",
      "price": 112500,
      "title": "Pupuk Urea N-46 Petrokimia (Subsidi)",
      "rating": 4.9,
      "category": "SAPROTAN",
      "location": "Pasar Sukamaju Kios B-04",
      "image_url": "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80",
      "promo_tag": "Subsidi Resmi KPL",
      "created_at": "2026-09-20T10:15:00",
      "price_unit": "/ Karung (50kg)",
      "description": "Urea butiran putih kadar Nitrogen 46% resmi subsidi pemerintah. Syarat membawa Kartu Tani Poktan Makmur.",
      "provider_id": "usr_distributor",
      "is_available": true,
      "provider_name": "Ibu Ratna",
      "category_label": "Pupuk & Benih",
      "provider_badge": "Kios Saprotan",
      "provider_avatar": "",
      "completed_orders_count": 118
    },
    {
      "id": "srv_008",
      "tags": [
        "Benih Resmi",
        "Label Ungu",
        "Potensi 10 Ton"
      ],
      "phone": "6285712345678",
      "price": 75000,
      "title": "Benih Padi Inpari 32 Bersertifikat Balitbangtan",
      "rating": 4.9,
      "category": "SAPROTAN",
      "location": "Pasar Sukamaju Kios B-04",
      "image_url": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
      "promo_tag": "Daya Tumbuh 95%",
      "created_at": "2026-09-20T10:30:00",
      "price_unit": "/ Kantong (5kg)",
      "description": "Benih label ungu resmi, daya berkecambah 92%, tahan wereng batang coklat dan hawar daun kresek.",
      "provider_id": "usr_distributor",
      "is_available": true,
      "provider_name": "Ibu Ratna",
      "category_label": "Pupuk & Benih",
      "provider_badge": "Kios Saprotan",
      "provider_avatar": "",
      "completed_orders_count": 92
    },
    {
      "id": "srv_009",
      "tags": [
        "Beli Tunai",
        "Timbangan Digital",
        "Jemput Pick-up"
      ],
      "phone": "6281356789012",
      "price": 6850,
      "title": "Penyerapan Beli Gabah Kering Panen (GKP) Jemput Lumbung",
      "rating": 5,
      "category": "HASIL_PANEN",
      "location": "Sentra Penggilingan Km 3",
      "image_url": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
      "promo_tag": "Timbang di Tempat",
      "created_at": "2026-09-20T11:00:00",
      "price_unit": "/ kg GKP",
      "description": "Beli gabah petani langsung di lumbung/pematang dengan timbangan digital terkalibrasi. Bayar tunai atau transfer seketika.",
      "provider_id": "usr_agen",
      "is_available": true,
      "provider_name": "Bpk. Hendra Jaya",
      "category_label": "Penyerapan Panen",
      "provider_badge": "Penggilingan Padi",
      "provider_avatar": "",
      "completed_orders_count": 35
    },
    {
      "id": "srv_010",
      "tags": [
        "Mesin Satake",
        "Beras Utuh",
        "Rendemen Tinggi"
      ],
      "phone": "6281356789012",
      "price": 500,
      "title": "Jasa Giling Gabah Jadi Beras Putih Super + Poles",
      "rating": 4.9,
      "category": "PASCA_PANEN",
      "location": "Sentra Penggilingan Km 3",
      "image_url": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80",
      "promo_tag": "Beras Putih Bersih",
      "created_at": "2026-09-20T11:30:00",
      "price_unit": "/ kg Gabah",
      "description": "Mesin giling modern Satake menghasilkan beras putih bersih rendemen tinggi (65-68%) minim patah/menir.",
      "provider_id": "usr_agen",
      "is_available": true,
      "provider_name": "Bpk. Hendra Jaya",
      "category_label": "Jasa Pasca Panen",
      "provider_badge": "Penggilingan Padi",
      "provider_avatar": "",
      "completed_orders_count": 86
    },
    {
      "id": "srv_011",
      "tags": [
        "Bibit Dapog",
        "Umur 16 Hari",
        "Akar Kuat"
      ],
      "phone": "628123456789",
      "price": 3500,
      "title": "Bibit Padi Inpari 32 Siap Tanam Umur 16 Hari (Dapog)",
      "rating": 4.9,
      "category": "SAPROTAN",
      "location": "Sawah Sukamaju Petak Timur",
      "image_url": "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80",
      "promo_tag": "Siap Tanam Dapog",
      "created_at": "2026-09-20T12:00:00",
      "price_unit": "/ Kotak Dapog",
      "description": "Bibit semai dapog siap tanam mesin transplanter atau manual, akar kuat dan daun hijau segar bebas hama.",
      "provider_id": "usr_petani",
      "is_available": true,
      "provider_name": "Pak Joko",
      "category_label": "Bibit Siap Tanam",
      "provider_badge": "Petani Mandiri",
      "provider_avatar": "",
      "completed_orders_count": 47
    },
    {
      "id": "eco_47e72080",
      "tags": [],
      "phone": "087811223344",
      "price": 130000,
      "title": "Jasa Cangkul Borongan Baru",
      "rating": 4.8,
      "category": "JASA_TENAGA_KERJA",
      "location": "Sukamaju",
      "image_url": "https://images.unsplash.com/photo-1592417817098-8f3d69102a46?auto=format&fit=crop&w=600&q=80",
      "promo_tag": "Cangkul Cepat",
      "created_at": "2026-09-21T09:14:18.708712",
      "price_unit": "/ Hari",
      "description": "Siap kerja 5 orang",
      "provider_id": "usr_cangkul",
      "is_available": true,
      "provider_name": "Mang Udin",
      "category_label": "Tenaga Kerja Tani",
      "provider_badge": "Jasa Cangkul",
      "provider_avatar": "",
      "completed_orders_count": 23
    },
    {
      "id": "srv_3b3e8286",
      "tags": [
        "Mitra Lokal",
        "Cepat & Rapi"
      ],
      "phone": "08123456789",
      "price": 19000000,
      "title": "Sewa Sapi",
      "rating": 5,
      "category": "JASA_TRAKTOR",
      "location": "Desa Sukamaju",
      "created_at": "2026-10-16T15:25:48.767Z",
      "price_unit": "/ Hektar",
      "description": "biar bisa make sapi",
      "provider_id": "usr_1791517561901",
      "is_available": true,
      "provider_name": "petaniyyy",
      "category_label": "Jasa Olah Tanah",
      "provider_badge": "Petani Mandiri",
      "provider_avatar": "/icons/petani.svg",
      "completed_orders_count": 0
    }
  ],
  "notifications": [
    {
      "id": "notif_1d851f6c",
      "type": "ORDER_STATUS",
      "title": "Pesanan Mulai Dikirim / Berangkat",
      "is_read": false,
      "message": "Mas Bambang mengonfirmasi pesanan Sewa Traktor Quick Kubota (Bajak & Garu): [SEDANG_DIKIRIM]. Catatan penjual: \"Traktor Quick G1000 sudah dimuat ke pikap, siap jalan Sabtu jam 06.30 WIB.\"",
      "user_id": "usr_petani",
      "created_at": "21 Sep 2026, 09:47 WIB",
      "reference_id": "ord_20dfbddd"
    },
    {
      "id": "notif_fc6cb285",
      "type": "ORDER_RECEIVED",
      "title": "Pesanan Jasa Baru Masuk!",
      "is_read": false,
      "message": "Pak Joko (Petani Padi) memesan Sewa Traktor Quick Kubota (Bajak & Garu) (1.0 / Hektar) senilai Rp 1,200,000.",
      "user_id": "usr_traktor",
      "created_at": "21 Sep 2026, 09:47 WIB",
      "reference_id": "ord_a09ba0b1"
    },
    {
      "id": "notif_07b1694c",
      "type": "ORDER_STATUS",
      "title": "Pesanan Terkirim ke Mitra",
      "is_read": false,
      "message": "Pesanan Sewa Traktor Quick Kubota (Bajak & Garu) telah diteruskan ke Mas Bambang. Menunggu konfirmasi pengerjaan.",
      "user_id": "usr_petani",
      "created_at": "21 Sep 2026, 09:47 WIB",
      "reference_id": "ord_a09ba0b1"
    },
    {
      "id": "notif_001",
      "type": "ORDER_RECEIVED",
      "title": "Pesanan Jasa Baru Masuk!",
      "is_read": false,
      "message": "Pak Joko memesan Jasa Sewa Traktor Quick 0.8 Ha (Rp 960.000) di Blok Krajan.",
      "user_id": "usr_traktor",
      "created_at": "18 Sep 2026, 09:30 WIB",
      "reference_id": "ord_trk_01"
    },
    {
      "id": "notif_002",
      "type": "NEW_FOLLOWER",
      "title": "Pengikut Baru!",
      "is_read": false,
      "message": "Mang Udin mulai mengikuti profil usahatani Anda.",
      "user_id": "usr_petani",
      "created_at": "20 Sep 2026, 11:20 WIB",
      "reference_id": "usr_cangkul"
    },
    {
      "id": "notif_003",
      "type": "NEW_COMMENT",
      "title": "Komentar Baru di Postingan!",
      "is_read": false,
      "message": "Ibu Ratna mengomentari: 'Pak Joko, stok bakterisida tembaga di kios sudah ready ya...'",
      "user_id": "usr_petani",
      "created_at": "20 Sep 2026, 15:02 WIB",
      "reference_id": "post_002"
    },
    {
      "id": "notif_004",
      "type": "NEW_FOLLOWER",
      "title": "Pengikut Baru!",
      "is_read": false,
      "message": "Pak Joko mulai mengikuti profil jasa pengairan Anda.",
      "user_id": "usr_pengairan",
      "created_at": "21 Sep 2026, 08:00 WIB",
      "reference_id": "usr_petani"
    },
    {
      "id": "notif_af5551f7",
      "type": "ORDER_RECEIVED",
      "title": "Pesanan Jasa Baru Masuk!",
      "is_read": false,
      "message": "Pak Joko memesan Sewa Traktor Quick Kubota (Bajak & Garu) (1.0 / Hektar) senilai Rp 1,200,000.",
      "user_id": "usr_traktor",
      "created_at": "21 Sep 2026, 09:35 WIB",
      "reference_id": "ord_f3e9f006"
    },
    {
      "id": "notif_bddb6a62",
      "type": "ORDER_STATUS",
      "title": "Pesanan Terkirim ke Mitra",
      "is_read": false,
      "message": "Pesanan Sewa Traktor Quick Kubota (Bajak & Garu) telah diteruskan ke Mas Bambang. Menunggu konfirmasi pengerjaan.",
      "user_id": "usr_petani",
      "created_at": "21 Sep 2026, 09:35 WIB",
      "reference_id": "ord_f3e9f006"
    },
    {
      "id": "notif_42719096",
      "type": "ORDER_RECEIVED",
      "title": "Pesanan Jasa Baru Masuk!",
      "is_read": false,
      "message": "Pak Joko memesan Sewa Traktor Quick Kubota (Bajak & Garu) (0.65 / Hektar) senilai Rp 780,000.",
      "user_id": "usr_traktor",
      "created_at": "21 Sep 2026, 09:38 WIB",
      "reference_id": "ord_459303ed"
    },
    {
      "id": "notif_5c04ffd9",
      "type": "ORDER_STATUS",
      "title": "Pesanan Terkirim ke Mitra",
      "is_read": false,
      "message": "Pesanan Sewa Traktor Quick Kubota (Bajak & Garu) telah diteruskan ke Mas Bambang. Menunggu konfirmasi pengerjaan.",
      "user_id": "usr_petani",
      "created_at": "21 Sep 2026, 09:38 WIB",
      "reference_id": "ord_459303ed"
    },
    {
      "id": "notif_0ea7b032",
      "type": "NEW_FOLLOWER",
      "title": "Pengikut Baru!",
      "is_read": false,
      "message": "Seorang warga ekosistem mulai mengikuti profil usahatani Anda.",
      "user_id": "usr_pengairan",
      "created_at": "21 Sep 2026, 09:38 WIB",
      "reference_id": "usr_pengairan"
    },
    {
      "id": "notif_bd4c8a11",
      "type": "NEW_COMMENT",
      "title": "Komentar Baru di Diskusi!",
      "is_read": false,
      "message": "Mas Bambang mengomentari postingan Anda: \"Siap bantu olah tanah Pak, kabari saja jadwalnya....\"",
      "user_id": "usr_petani",
      "created_at": "21 Sep 2026, 09:38 WIB",
      "reference_id": "post_001"
    },
    {
      "id": "notif_de50582b",
      "type": "ORDER_RECEIVED",
      "title": "Pesanan Jasa Baru Masuk!",
      "is_read": false,
      "message": "Pak Joko (Petani Padi) memesan Sewa Traktor Quick Kubota (Bajak & Garu) (1.5 / Hektar) senilai Rp 1,800,000.",
      "user_id": "usr_traktor",
      "created_at": "21 Sep 2026, 09:47 WIB",
      "reference_id": "ord_3f27f6e5"
    },
    {
      "id": "notif_a25b3eec",
      "type": "ORDER_STATUS",
      "title": "Pesanan Terkirim ke Mitra",
      "is_read": false,
      "message": "Pesanan Sewa Traktor Quick Kubota (Bajak & Garu) telah diteruskan ke Mas Bambang. Menunggu konfirmasi pengerjaan.",
      "user_id": "usr_petani",
      "created_at": "21 Sep 2026, 09:47 WIB",
      "reference_id": "ord_3f27f6e5"
    },
    {
      "id": "notif_ae4bc366",
      "type": "ORDER_STATUS",
      "title": "Pesanan Mulai Dikirim / Berangkat",
      "is_read": false,
      "message": "Mas Bambang mengonfirmasi pesanan Sewa Traktor Quick Kubota (Bajak & Garu): [SEDANG_DIKIRIM]. Catatan penjual: \"Traktor Quick G1000 sudah dimuat ke pikap, siap jalan Sabtu jam 06.30 WIB.\"",
      "user_id": "usr_petani",
      "created_at": "21 Sep 2026, 09:47 WIB",
      "reference_id": "ord_3f27f6e5"
    },
    {
      "id": "notif_fc588a62",
      "type": "ORDER_RECEIVED",
      "title": "Pesanan Jasa Baru Masuk!",
      "is_read": false,
      "message": "Pak Joko (Petani Padi) memesan Sewa Traktor Quick Kubota (Bajak & Garu) (1.5 / Hektar) senilai Rp 1,800,000.",
      "user_id": "usr_traktor",
      "created_at": "21 Sep 2026, 09:47 WIB",
      "reference_id": "ord_20dfbddd"
    },
    {
      "id": "notif_a00c16b4",
      "type": "ORDER_STATUS",
      "title": "Pesanan Terkirim ke Mitra",
      "is_read": false,
      "message": "Pesanan Sewa Traktor Quick Kubota (Bajak & Garu) telah diteruskan ke Mas Bambang. Menunggu konfirmasi pengerjaan.",
      "user_id": "usr_petani",
      "created_at": "21 Sep 2026, 09:47 WIB",
      "reference_id": "ord_20dfbddd"
    },
    {
      "id": "notif_72e0ff36",
      "type": "ORDER_STATUS",
      "title": "Pesanan Mulai Dikirim / Berangkat",
      "is_read": false,
      "message": "Mas Bambang mengonfirmasi pesanan Sewa Traktor Quick Kubota (Bajak & Garu): [SEDANG_DIKIRIM]. Catatan penjual: \"Traktor sudah berangkat menuju sawah Pak Joko!\"",
      "user_id": "usr_petani",
      "created_at": "21 Sep 2026, 09:47 WIB",
      "reference_id": "ord_a09ba0b1"
    },
    {
      "id": "notif_14c781a1",
      "type": "ORDER_RECEIVED",
      "title": "Pesanan Jasa Baru Masuk!",
      "is_read": false,
      "message": "Pak Joko (Petani Padi) memesan Sewa Traktor Quick Kubota (Bajak & Garu) (1.0 / Hektar) senilai Rp 1,200,000.",
      "user_id": "usr_traktor",
      "created_at": "21 Sep 2026, 09:57 WIB",
      "reference_id": "ord_1476372d"
    },
    {
      "id": "notif_9ac1ec9a",
      "type": "ORDER_STATUS",
      "title": "Pesanan Terkirim ke Mitra",
      "is_read": false,
      "message": "Pesanan Sewa Traktor Quick Kubota (Bajak & Garu) telah diteruskan ke Mas Bambang. Menunggu konfirmasi pengerjaan.",
      "user_id": "usr_petani",
      "created_at": "21 Sep 2026, 09:57 WIB",
      "reference_id": "ord_1476372d"
    },
    {
      "id": "notif_4b1034c7",
      "type": "ORDER_DISCUSSION",
      "title": "Pesan Diskusi Pesanan",
      "is_read": false,
      "message": "Pak Joko: \"Halo Mas Bambang, saya tunggu Sabtu jam 07.00 ya!...\"",
      "user_id": "usr_traktor",
      "created_at": "21 Sep 2026, 09:57 WIB",
      "reference_id": "ord_1476372d"
    },
    {
      "id": "notif_6c891a2c",
      "type": "ORDER_DISCUSSION",
      "title": "Pesan Diskusi Pesanan",
      "is_read": false,
      "message": "Mas Bambang: \"Siap Pak Joko, solar dan bajak sudah kami siapkan!...\"",
      "user_id": "usr_petani",
      "created_at": "21 Sep 2026, 09:57 WIB",
      "reference_id": "ord_1476372d"
    },
    {
      "id": "notif_b83aea19",
      "type": "PRODUCT_DISCUSSION",
      "title": "Pertanyaan Baru di Produk Anda!",
      "is_read": false,
      "message": "Pak Joko bertanya di \"Sewa Traktor Quick Kubota (Bajak & Garu)\": \"Apakah traktor bisa masuk galengan sempit 80cm?...\"",
      "user_id": "usr_traktor",
      "created_at": "21 Sep 2026, 09:57 WIB",
      "reference_id": "srv_001"
    },
    {
      "id": "notif_eb351dea",
      "type": "PRODUCT_DISCUSSION",
      "title": "Jawaban Diskusi Produk",
      "is_read": false,
      "message": "Mas Bambang (Penyedia Jasa) menjawab pertanyaan Anda di \"Sewa Traktor Quick Kubota (Bajak & Garu)\": \"Bisa Pak Joko, roda traktor quick kami bisa diatur sempit....\"",
      "user_id": "usr_petani",
      "created_at": "21 Sep 2026, 09:57 WIB",
      "reference_id": "srv_001"
    },
    {
      "id": "notif_c8d6fb6c",
      "type": "ORDER_RECEIVED",
      "title": "Pesanan Jasa Baru Masuk!",
      "is_read": false,
      "message": "Pak Joko memesan Jasa Cangkul & Perbaikan Galengan Pematang Sawah (1.0 / Orang / Hari) senilai Rp 120,000.",
      "user_id": "usr_cangkul",
      "created_at": "21 Sep 2026, 10:04 WIB",
      "reference_id": "ord_d7c7bf7e"
    },
    {
      "id": "notif_b955a033",
      "type": "ORDER_STATUS",
      "title": "Pesanan Terkirim ke Mitra",
      "is_read": false,
      "message": "Pesanan Jasa Cangkul & Perbaikan Galengan Pematang Sawah telah diteruskan ke Mang Udin. Menunggu konfirmasi pengerjaan.",
      "user_id": "usr_petani",
      "created_at": "21 Sep 2026, 10:04 WIB",
      "reference_id": "ord_d7c7bf7e"
    },
    {
      "id": "notif_00470b17",
      "type": "NEW_FOLLOWER",
      "title": "Pengikut Baru!",
      "is_read": false,
      "message": "Seorang warga ekosistem mulai mengikuti profil usahatani Anda.",
      "user_id": "usr_001",
      "created_at": "21 Sep 2026, 15:00 WIB",
      "reference_id": "usr_001"
    },
    {
      "id": "notif_85ce9681",
      "type": "NEW_FOLLOWER",
      "title": "Pengikut Baru!",
      "is_read": false,
      "message": "Seorang warga ekosistem mulai mengikuti profil usahatani Anda.",
      "user_id": "usr_1923",
      "created_at": "21 Sep 2026, 15:00 WIB",
      "reference_id": "usr_1923"
    },
    {
      "id": "not_0f8d6ab9",
      "role": "PETANI",
      "type": "COLLAB_INVITE",
      "title": "Undangan Kolaborasi Baru",
      "status": "PENDING",
      "farm_id": "farm_e66bad",
      "is_read": false,
      "message": "admin mengundang Anda untuk mengelola lahan \"Sawah Petak Baru (admin)\" (0.75 Ha) dengan peran \"PETANI\" dan bagi hasil 30%.",
      "user_id": "usr_petani",
      "collab_id": "collab_28fd08",
      "farm_name": "Sawah Petak Baru (admin)",
      "created_at": "2026-10-11T14:37:31.698Z",
      "to_user_id": "usr_petani",
      "from_user_id": "usr_1791517561901",
      "to_user_name": "Pak Joko",
      "from_user_name": "admin",
      "share_percentage": 30
    },
    {
      "id": "not_24c62e27",
      "role": "Sewa Traktor",
      "type": "COLLAB_INVITE",
      "title": "Undangan Kolaborasi Baru",
      "status": "PENDING",
      "farm_id": "farm_e66bad",
      "is_read": false,
      "message": "admin mengundang Anda untuk mengelola lahan \"Sawah Petak Baru (admin)\" (0.75 Ha) dengan peran \"Sewa Traktor\" dan bagi hasil 20%.",
      "user_id": "usr_traktor",
      "collab_id": "collab_928ad4",
      "farm_name": "Sawah Petak Baru (admin)",
      "created_at": "2026-10-11T14:42:07.587Z",
      "to_user_id": "usr_traktor",
      "from_user_id": "usr_1791517561901",
      "to_user_name": "Mas Bambang",
      "from_user_name": "admin",
      "share_percentage": 20
    },
    {
      "id": "not_264ad184",
      "role": "Jasa Pengairan",
      "type": "COLLAB_INVITE",
      "title": "Undangan Kolaborasi Baru",
      "status": "PENDING",
      "farm_id": "farm_9a88a8",
      "is_read": false,
      "message": "admin mengundang Anda untuk mengelola lahan \"Sawah Blok Cempaka 1\" (1 Ha) dengan peran \"Jasa Pengairan\" dan bagi hasil 10%.",
      "user_id": "usr_pengairan",
      "collab_id": "collab_d1dc5b",
      "farm_name": "Sawah Blok Cempaka 1",
      "created_at": "2026-10-12T05:09:53.418Z",
      "to_user_id": "usr_pengairan",
      "from_user_id": "usr_1791517561901",
      "to_user_name": "Pak Slamet",
      "from_user_name": "admin",
      "share_percentage": 10
    },
    {
      "id": "not_bf7b7a29",
      "role": "PETANI",
      "type": "COLLAB_INVITE",
      "title": "Undangan Kolaborasi Baru",
      "status": "PENDING",
      "farm_id": "farm_9a88a8",
      "is_read": false,
      "message": "admin mengundang Anda untuk mengelola lahan \"Sawah Blok Cempaka 1\" (1 Ha) dengan peran \"PETANI\" dan bagi hasil 20%.",
      "user_id": "usr_petani",
      "collab_id": "collab_bb1bea",
      "farm_name": "Sawah Blok Cempaka 1",
      "created_at": "2026-10-12T05:10:28.602Z",
      "to_user_id": "usr_petani",
      "from_user_id": "usr_1791517561901",
      "to_user_name": "Pak Joko",
      "from_user_name": "admin",
      "share_percentage": 20
    }
  ],
  "farmlands": [
    {
      "id": "farm_001",
      "name": "Sawah Blok Krajan (Padi Inpari 32)",
      "user_id": "usr_petani",
      "latitude": -7.2504,
      "location": "Desa Sukamaju Krajan",
      "commodity": "Padi Sawah Inpari 32",
      "longitude": 112.7512,
      "soil_type": "Lempung Berliat (Subur)",
      "created_at": "2026-09-15T08:00:00",
      "owner_name": "Pak Joko",
      "updated_at": "2026-09-21T09:35:10.630880",
      "land_size_ha": 0.8,
      "water_source": "Irigasi Teknis Bendungan",
      "collaborators": [
        {
          "id": "collab_02",
          "name": "Mang Udin",
          "role": "Penggarap & Perawatan Pematang",
          "phone": "087811223344",
          "share_percentage": 40
        }
      ],
      "planting_date": "2026-08-16",
      "capital_expenses": [
        {
          "id": "exp_e9766a",
          "date": "21 Sep 2026, 09:35 WIB",
          "amount": 500000,
          "source": "MARKETPLACE",
          "farm_id": "farm_001",
          "category": "OLAH_TANAH",
          "item_name": "Test Sewa Traktor",
          "order_ref_id": null
        },
        {
          "id": "exp_001",
          "date": "18 Sep 2026, 09:30 WIB",
          "amount": 960000,
          "source": "MARKETPLACE",
          "farm_id": "farm_001",
          "category": "OLAH_TANAH",
          "item_name": "Sewa Traktor Olah Tanah & Bajak Garu",
          "order_ref_id": "ord_trk_01"
        },
        {
          "id": "exp_002",
          "date": "19 Sep 2026, 14:15 WIB",
          "amount": 420000,
          "source": "MARKETPLACE",
          "farm_id": "farm_001",
          "category": "PUPUK_NUTRISI",
          "item_name": "Pupuk NPK Phonska & Urea Subsidi",
          "order_ref_id": "ord_sap_01"
        }
      ],
      "target_harvest_date": "2026-12-09"
    },
    {
      "id": "farm_002",
      "name": "Sawah Blok Timur (Padi Ciherang)",
      "user_id": "usr_petani",
      "latitude": -7.255,
      "location": "Desa Sukamaju Blok Saluran",
      "commodity": "Padi Ciherang",
      "longitude": 112.758,
      "soil_type": "Aluvial Sawah Teknis",
      "created_at": "2026-09-16T09:00:00",
      "owner_name": "Pak Joko",
      "land_size_ha": 1.2,
      "water_source": "Irigasi Teknis Bendungan",
      "collaborators": [],
      "planting_date": "2026-09-13",
      "capital_expenses": [
        {
          "id": "exp_003",
          "date": "16 Sep 2026, 10:00 WIB",
          "amount": 450000,
          "source": "MANUAL",
          "farm_id": "farm_002",
          "category": "BENIH_BIBIT",
          "item_name": "Benih Padi Ciherang Bersertifikat 30kg",
          "order_ref_id": null
        }
      ],
      "target_harvest_date": "2027-01-06"
    },
    {
      "id": "farm_dc651c",
      "name": "Sawah Petak Legok Uji Coba",
      "user_id": "usr_petani",
      "latitude": -7.2504,
      "location": "Desa Sukamaju Barat",
      "commodity": "Padi Sawah Inpari 32",
      "longitude": 112.7512,
      "soil_type": "Lempung Berliat (Subur)",
      "created_at": "2026-09-21T09:38:35.919571",
      "owner_name": "Pak Joko",
      "updated_at": "2026-09-27T02:34:41.330Z",
      "land_size_ha": 0.65,
      "water_source": "Irigasi Teknis Bendungan",
      "collaborators": [
        {
          "id": "collab_test",
          "name": "Mang Udin",
          "role": "Penggarap Lapangan",
          "phone": "087811223344",
          "share_percentage": 40
        },
        {
          "id": "collab_4cdf3f",
          "name": "Bu Mitro",
          "role": "Investor",
          "phone": "",
          "share_percentage": 25
        }
      ],
      "planting_date": "2026-07-14",
      "capital_expenses": [
        {
          "id": "exp_61a59c",
          "date": "21 Sep 2026, 09:38 WIB",
          "amount": 780000,
          "source": "MARKETPLACE",
          "farm_id": "farm_dc651c",
          "category": "OLAH_TANAH",
          "item_name": "Sewa Traktor Quick Kubota (Bajak & Garu) (0.65 / Hektar)",
          "order_ref_id": "ord_459303ed"
        }
      ],
      "target_harvest_date": "2026-11-06"
    },
    {
      "id": "farm_0885a6",
      "name": "Petak Sawah Bpk. Hendra Jaya",
      "status": "ACTIVE",
      "user_id": "usr_agen",
      "latitude": -7.2504,
      "location": "Kawasan Sentra Penggilingan Padi Km 3",
      "commodity": "Gabah Kering Panen (GKP)",
      "longitude": 112.7512,
      "soil_type": "Lempung Berliat (Subur)",
      "created_at": "2026-09-27T09:07:29.717Z",
      "owner_name": "Bpk. Hendra Jaya",
      "land_size_ha": 0.8,
      "total_budget": 5120000,
      "water_source": "Irigasi Teknis Bendungan",
      "collaborators": [],
      "planting_date": "2026-09-27",
      "ownership_type": "MILIK_SENDIRI",
      "timeline_phases": [
        {
          "name": "Fase 1: Olah Tanah & Bajak Garu",
          "status": "SELESAI",
          "step_no": 1,
          "day_range": "H-14 s/d H-1",
          "actual_cost": 0,
          "target_cost": 960000,
          "duration_days": 14
        },
        {
          "name": "Fase 2: Tanam Padi & Persemaian",
          "status": "SEDANG_BERJALAN",
          "step_no": 2,
          "day_range": "HST 1 - 15",
          "actual_cost": 0,
          "target_cost": 850000,
          "duration_days": 15
        },
        {
          "name": "Fase 3: Pemupukan & Perawatan Vegetatif",
          "status": "BELUM",
          "step_no": 3,
          "day_range": "HST 16 - 45",
          "actual_cost": 0,
          "target_cost": 1650000,
          "duration_days": 30
        },
        {
          "name": "Fase 4: Proteksi Hama & Generatif",
          "status": "BELUM",
          "step_no": 4,
          "day_range": "HST 46 - 80",
          "actual_cost": 0,
          "target_cost": 950000,
          "duration_days": 35
        },
        {
          "name": "Fase 5: Pengeringan & Panen Raya",
          "status": "BELUM",
          "step_no": 5,
          "day_range": "HST 81 - 115",
          "actual_cost": 0,
          "target_cost": 2005000,
          "duration_days": 35
        }
      ],
      "capital_expenses": [],
      "target_harvest_date": ""
    },
    {
      "id": "farm_53d39f",
      "name": "Sawah Blok Cempaka 1",
      "status": "ACTIVE",
      "user_id": "usr_cangkul",
      "latitude": -7.2504,
      "location": "Desa Sukamaju, Jawa Timur",
      "commodity": "Jagung Hibrida Bisi-18",
      "longitude": 112.7512,
      "soil_type": "Aluvial Sawah Teknis",
      "created_at": "2026-10-04T13:48:45.102Z",
      "owner_name": "Mang Udin",
      "land_size_ha": 1.2,
      "total_budget": 7680000,
      "water_source": "Sawah Tadah Hujan",
      "collaborators": [],
      "planting_date": "2026-10-04",
      "timeline_phases": [
        {
          "name": "Fase 1: Olah Tanah & Bajak Garu",
          "tasks": [
            "Pembersihan gulma & sisa jerami",
            "Penggenangan air macak-macak",
            "Bajak singkal I (kedalaman 20-25 cm)",
            "Garu & perataan tanah (macak-macak)",
            "Aplikasi pupuk kandang/organik 2 ton/ha"
          ],
          "status": "SELESAI",
          "ai_tips": "Pastikan tanah terolah gembur sempurna dan kedalaman lumpur minimal 20 cm agar perakaran benih padi kokoh.",
          "step_no": 1,
          "day_range": "H-14 s/d H-1",
          "actual_cost": 0,
          "target_cost": 1440000,
          "duration_days": 14,
          "allocated_budget": 1440000
        },
        {
          "name": "Fase 2: Tanam Padi & Persemaian",
          "tasks": [
            "Persemaian benih bersertifikat (15-20 hari)",
            "Pindah tanam sistem jajar legowo (2:1 / 4:1)",
            "Jarak tanam 25x25 cm atau 20x20 cm",
            "Penyulaman bibit mati (maksimal HST 7)",
            "Pengaturan air macak-macak (1-2 cm)"
          ],
          "status": "SEDANG_BERJALAN",
          "ai_tips": "Gunakan bibit muda (umur 15-18 HSS) dengan 1-2 bibit per rumpun untuk memicu anakan produktif lebih banyak.",
          "step_no": 2,
          "day_range": "HST 1 - 15",
          "actual_cost": 0,
          "target_cost": 1275000,
          "duration_days": 15,
          "allocated_budget": 1275000
        },
        {
          "name": "Fase 3: Pemupukan & Perawatan Vegetatif",
          "tasks": [
            "Pemupukan susulan I (HST 7-10) Urea + NPK",
            "Penyiangan gulma mekanis (gasrok / manual)",
            "Pemupukan susulan II (HST 21-25) NPK Phonska",
            "Pemantauan hama wereng coklat & penggerek batang",
            "Pengeringan berkala (intermittent irrigation)"
          ],
          "status": "BELUM",
          "ai_tips": "Terapkan pemupukan berimbang 5:3:2 (Urea, NPK, Organik). Jangan biarkan sawah tergenang terus-menerus agar akar bernapas.",
          "step_no": 3,
          "day_range": "HST 16 - 45",
          "actual_cost": 0,
          "target_cost": 2475000,
          "duration_days": 30,
          "allocated_budget": 2475000
        },
        {
          "name": "Fase 4: Proteksi Hama & Generatif",
          "tasks": [
            "Aplikasi booster malai & kalium cair (HST 50)",
            "Pengendalian walang sangit & kepik hijau",
            "Pencegahan blas daun & hawar pelepah (fungisida)",
            "Pengairan teratur setinggi 3-5 cm saat bunting",
            "Pemasangan orang-orangan / jaring pengusir burung"
          ],
          "status": "BELUM",
          "ai_tips": "Waspadai serangan walang sangit pada fase matang susu. Semprot agen hayati Beauveria bassiana atau insektisida nabati pagi hari.",
          "step_no": 4,
          "day_range": "HST 46 - 80",
          "actual_cost": 0,
          "target_cost": 1425000,
          "duration_days": 35,
          "allocated_budget": 1425000
        },
        {
          "name": "Fase 5: Pengeringan & Panen Raya",
          "tasks": [
            "Pengeringan sawah total 10-14 hari sebelum panen",
            "Pemeriksaan kematangan bulir (90-95% menguning)",
            "Pemesanan mesin Combine Harvester / regu sabit",
            "Pemanenan gabah & perontokan",
            "Pengemasan karung & penimbangan GKP"
          ],
          "status": "BELUM",
          "ai_tips": "Keringkan petakan 10 hari sebelum panen untuk mempermudah operasional combine harvester dan menjaga mutu kadar air gabah.",
          "step_no": 5,
          "day_range": "HST 81 - 115",
          "actual_cost": 0,
          "target_cost": 3007500,
          "duration_days": 35,
          "allocated_budget": 3007500
        }
      ],
      "capital_expenses": [],
      "target_harvest_date": ""
    },
    {
      "id": "farm_456ca2",
      "name": "Sawah Blok Cempaka 1",
      "status": "ACTIVE",
      "user_id": "usr_1791517561901",
      "latitude": -7.2504,
      "location": "Desa Sukamaju, Jawa Timur",
      "commodity": "Padi Sawah Inpari 32",
      "longitude": 112.7512,
      "soil_type": "Lempung Berliat (Subur)",
      "created_at": "2026-10-12T06:41:38.960Z",
      "owner_name": "admin",
      "land_size_ha": 1,
      "total_budget": 6400000,
      "water_source": "Irigasi Teknis Bendungan",
      "collaborators": [],
      "planting_date": "2026-10-12",
      "timeline_phases": [
        {
          "name": "Fase 1: Olah Tanah & Bajak Garu",
          "tasks": [
            "Pembersihan gulma & sisa jerami",
            "Penggenangan air macak-macak",
            "Bajak singkal I (kedalaman 20-25 cm)",
            "Garu & perataan tanah (macak-macak)",
            "Aplikasi pupuk kandang/organik 2 ton/ha"
          ],
          "status": "SELESAI",
          "ai_tips": "Pastikan tanah terolah gembur sempurna dan kedalaman lumpur minimal 20 cm agar perakaran benih padi kokoh.",
          "step_no": 1,
          "day_range": "H-14 s/d H-1",
          "actual_cost": 0,
          "target_cost": 1200000,
          "duration_days": 14,
          "allocated_budget": 1200000
        },
        {
          "name": "Fase 2: Tanam Padi & Persemaian",
          "tasks": [
            "Persemaian benih bersertifikat (15-20 hari)",
            "Pindah tanam sistem jajar legowo (2:1 / 4:1)",
            "Jarak tanam 25x25 cm atau 20x20 cm",
            "Penyulaman bibit mati (maksimal HST 7)",
            "Pengaturan air macak-macak (1-2 cm)"
          ],
          "status": "SEDANG_BERJALAN",
          "ai_tips": "Gunakan bibit muda (umur 15-18 HSS) dengan 1-2 bibit per rumpun untuk memicu anakan produktif lebih banyak.",
          "step_no": 2,
          "day_range": "HST 1 - 15",
          "actual_cost": 0,
          "target_cost": 1062500,
          "duration_days": 15,
          "allocated_budget": 1062500
        },
        {
          "name": "Fase 3: Pemupukan & Perawatan Vegetatif",
          "tasks": [
            "Pemupukan susulan I (HST 7-10) Urea + NPK",
            "Penyiangan gulma mekanis (gasrok / manual)",
            "Pemupukan susulan II (HST 21-25) NPK Phonska",
            "Pemantauan hama wereng coklat & penggerek batang",
            "Pengeringan berkala (intermittent irrigation)"
          ],
          "status": "BELUM",
          "ai_tips": "Terapkan pemupukan berimbang 5:3:2 (Urea, NPK, Organik). Jangan biarkan sawah tergenang terus-menerus agar akar bernapas.",
          "step_no": 3,
          "day_range": "HST 16 - 45",
          "actual_cost": 0,
          "target_cost": 2062500,
          "duration_days": 30,
          "allocated_budget": 2062500
        },
        {
          "name": "Fase 4: Proteksi Hama & Generatif",
          "tasks": [
            "Aplikasi booster malai & kalium cair (HST 50)",
            "Pengendalian walang sangit & kepik hijau",
            "Pencegahan blas daun & hawar pelepah (fungisida)",
            "Pengairan teratur setinggi 3-5 cm saat bunting",
            "Pemasangan orang-orangan / jaring pengusir burung"
          ],
          "status": "BELUM",
          "ai_tips": "Waspadai serangan walang sangit pada fase matang susu. Semprot agen hayati Beauveria bassiana atau insektisida nabati pagi hari.",
          "step_no": 4,
          "day_range": "HST 46 - 80",
          "actual_cost": 0,
          "target_cost": 1187500,
          "duration_days": 35,
          "allocated_budget": 1187500
        },
        {
          "name": "Fase 5: Pengeringan & Panen Raya",
          "tasks": [
            "Pengeringan sawah total 10-14 hari sebelum panen",
            "Pemeriksaan kematangan bulir (90-95% menguning)",
            "Pemesanan mesin Combine Harvester / regu sabit",
            "Pemanenan gabah & perontokan",
            "Pengemasan karung & penimbangan GKP"
          ],
          "status": "BELUM",
          "ai_tips": "Keringkan petakan 10 hari sebelum panen untuk mempermudah operasional combine harvester dan menjaga mutu kadar air gabah.",
          "step_no": 5,
          "day_range": "HST 81 - 115",
          "actual_cost": 0,
          "target_cost": 2506250,
          "duration_days": 35,
          "allocated_budget": 2506250
        }
      ],
      "capital_expenses": [],
      "target_harvest_date": ""
    },
    {
      "id": "farm_a2e35c",
      "name": "Sawah dimong",
      "status": "ACTIVE",
      "user_id": "usr_cangkul",
      "latitude": -7.5911455161767325,
      "location": "Dempelan, Madiun, Jawa Timur",
      "commodity": "Padi Sawah Inpari 32",
      "longitude": 111.58814056492406,
      "soil_type": "Lempung Berliat (Subur)",
      "created_at": "2026-10-19T18:19:04.372Z",
      "owner_name": "Mang Udin",
      "rental_cost": 0,
      "land_size_ha": 1,
      "total_budget": 6400000,
      "water_source": "Irigasi Teknis Bendungan",
      "collaborators": [],
      "planting_date": "2026-10-19",
      "ownership_type": "MILIK_SENDIRI",
      "timeline_phases": [
        {
          "name": "Fase 1: Olah Tanah & Bajak Garu",
          "tasks": [
            "Pembersihan gulma & sisa jerami",
            "Penggenangan air macak-macak",
            "Bajak singkal I (kedalaman 20-25 cm)",
            "Garu & perataan tanah (macak-macak)",
            "Aplikasi pupuk kandang/organik 2 ton/ha"
          ],
          "status": "BELUM",
          "ai_tips": "Pastikan tanah terolah gembur sempurna dan kedalaman lumpur minimal 20 cm agar perakaran benih padi kokoh.",
          "step_no": 1,
          "day_range": "H-14 s/d H-1",
          "actual_cost": 0,
          "target_cost": 1200000,
          "duration_days": 14,
          "allocated_budget": 1200000
        },
        {
          "name": "Fase 2: Tanam Padi & Persemaian",
          "tasks": [
            "Persemaian benih bersertifikat (15-20 hari)",
            "Pindah tanam sistem jajar legowo (2:1 / 4:1)",
            "Jarak tanam 25x25 cm atau 20x20 cm",
            "Penyulaman bibit mati (maksimal HST 7)",
            "Pengaturan air macak-macak (1-2 cm)"
          ],
          "status": "BELUM",
          "ai_tips": "Gunakan bibit muda (umur 15-18 HSS) dengan 1-2 bibit per rumpun untuk memicu anakan produktif lebih banyak.",
          "step_no": 2,
          "day_range": "HST 1 - 15",
          "actual_cost": 0,
          "target_cost": 1062500,
          "duration_days": 15,
          "allocated_budget": 1062500
        },
        {
          "name": "Fase 3: Pemupukan & Perawatan Vegetatif",
          "tasks": [
            "Pemupukan susulan I (HST 7-10) Urea + NPK",
            "Penyiangan gulma mekanis (gasrok / manual)",
            "Pemupukan susulan II (HST 21-25) NPK Phonska",
            "Pemantauan hama wereng coklat & penggerek batang",
            "Pengeringan berkala (intermittent irrigation)"
          ],
          "status": "BELUM",
          "ai_tips": "Terapkan pemupukan berimbang 5:3:2 (Urea, NPK, Organik). Jangan biarkan sawah tergenang terus-menerus agar akar bernapas.",
          "step_no": 3,
          "day_range": "HST 16 - 45",
          "actual_cost": 0,
          "target_cost": 2062500,
          "duration_days": 30,
          "allocated_budget": 2062500
        },
        {
          "name": "Fase 4: Proteksi Hama & Generatif",
          "tasks": [
            "Aplikasi booster malai & kalium cair (HST 50)",
            "Pengendalian walang sangit & kepik hijau",
            "Pencegahan blas daun & hawar pelepah (fungisida)",
            "Pengairan teratur setinggi 3-5 cm saat bunting",
            "Pemasangan orang-orangan / jaring pengusir burung"
          ],
          "status": "BELUM",
          "ai_tips": "Waspadai serangan walang sangit pada fase matang susu. Semprot agen hayati Beauveria bassiana atau insektisida nabati pagi hari.",
          "step_no": 4,
          "day_range": "HST 46 - 80",
          "actual_cost": 0,
          "target_cost": 1187500,
          "duration_days": 35,
          "allocated_budget": 1187500
        },
        {
          "name": "Fase 5: Pengeringan & Panen Raya",
          "tasks": [
            "Pengeringan sawah total 10-14 hari sebelum panen",
            "Pemeriksaan kematangan bulir (90-95% menguning)",
            "Pemesanan mesin Combine Harvester / regu sabit",
            "Pemanenan gabah & perontokan",
            "Pengemasan karung & penimbangan GKP"
          ],
          "status": "BELUM",
          "ai_tips": "Keringkan petakan 10 hari sebelum panen untuk mempermudah operasional combine harvester dan menjaga mutu kadar air gabah.",
          "step_no": 5,
          "day_range": "HST 81 - 115",
          "actual_cost": 0,
          "target_cost": 2506250,
          "duration_days": 35,
          "allocated_budget": 2506250
        }
      ],
      "capital_expenses": [],
      "target_harvest_date": ""
    },
    {
      "id": "farm_7c6718",
      "name": "Sawah Blok Baru (Padi Sawah Inpari 32)",
      "status": "ACTIVE",
      "user_id": "usr_cangkul",
      "latitude": -7.2504,
      "location": "Desa Sukamaju, Jawa Timur",
      "commodity": "Padi Sawah Inpari 32",
      "longitude": 112.7512,
      "soil_type": "Lempung Berliat (Subur)",
      "created_at": "2026-10-19T18:20:57.513Z",
      "owner_name": "Mang Udin",
      "rental_cost": 0,
      "land_size_ha": 1,
      "total_budget": 6400000,
      "water_source": "Irigasi Teknis Bendungan",
      "collaborators": [],
      "planting_date": "2026-10-19",
      "ownership_type": "MILIK_SENDIRI",
      "timeline_phases": [
        {
          "name": "Fase 1: Olah Tanah & Bajak Garu",
          "tasks": [
            "Pembersihan gulma & sisa jerami",
            "Penggenangan air macak-macak",
            "Bajak singkal I (kedalaman 20-25 cm)",
            "Garu & perataan tanah (macak-macak)",
            "Aplikasi pupuk kandang/organik 2 ton/ha"
          ],
          "status": "BELUM",
          "ai_tips": "Pastikan tanah terolah gembur sempurna dan kedalaman lumpur minimal 20 cm agar perakaran benih padi kokoh.",
          "step_no": 1,
          "day_range": "H-14 s/d H-1",
          "actual_cost": 0,
          "target_cost": 1200000,
          "duration_days": 14,
          "allocated_budget": 1200000
        },
        {
          "name": "Fase 2: Tanam Padi & Persemaian",
          "tasks": [
            "Persemaian benih bersertifikat (15-20 hari)",
            "Pindah tanam sistem jajar legowo (2:1 / 4:1)",
            "Jarak tanam 25x25 cm atau 20x20 cm",
            "Penyulaman bibit mati (maksimal HST 7)",
            "Pengaturan air macak-macak (1-2 cm)"
          ],
          "status": "BELUM",
          "ai_tips": "Gunakan bibit muda (umur 15-18 HSS) dengan 1-2 bibit per rumpun untuk memicu anakan produktif lebih banyak.",
          "step_no": 2,
          "day_range": "HST 1 - 15",
          "actual_cost": 0,
          "target_cost": 1062500,
          "duration_days": 15,
          "allocated_budget": 1062500
        },
        {
          "name": "Fase 3: Pemupukan & Perawatan Vegetatif",
          "tasks": [
            "Pemupukan susulan I (HST 7-10) Urea + NPK",
            "Penyiangan gulma mekanis (gasrok / manual)",
            "Pemupukan susulan II (HST 21-25) NPK Phonska",
            "Pemantauan hama wereng coklat & penggerek batang",
            "Pengeringan berkala (intermittent irrigation)"
          ],
          "status": "BELUM",
          "ai_tips": "Terapkan pemupukan berimbang 5:3:2 (Urea, NPK, Organik). Jangan biarkan sawah tergenang terus-menerus agar akar bernapas.",
          "step_no": 3,
          "day_range": "HST 16 - 45",
          "actual_cost": 0,
          "target_cost": 2062500,
          "duration_days": 30,
          "allocated_budget": 2062500
        },
        {
          "name": "Fase 4: Proteksi Hama & Generatif",
          "tasks": [
            "Aplikasi booster malai & kalium cair (HST 50)",
            "Pengendalian walang sangit & kepik hijau",
            "Pencegahan blas daun & hawar pelepah (fungisida)",
            "Pengairan teratur setinggi 3-5 cm saat bunting",
            "Pemasangan orang-orangan / jaring pengusir burung"
          ],
          "status": "BELUM",
          "ai_tips": "Waspadai serangan walang sangit pada fase matang susu. Semprot agen hayati Beauveria bassiana atau insektisida nabati pagi hari.",
          "step_no": 4,
          "day_range": "HST 46 - 80",
          "actual_cost": 0,
          "target_cost": 1187500,
          "duration_days": 35,
          "allocated_budget": 1187500
        },
        {
          "name": "Fase 5: Pengeringan & Panen Raya",
          "tasks": [
            "Pengeringan sawah total 10-14 hari sebelum panen",
            "Pemeriksaan kematangan bulir (90-95% menguning)",
            "Pemesanan mesin Combine Harvester / regu sabit",
            "Pemanenan gabah & perontokan",
            "Pengemasan karung & penimbangan GKP"
          ],
          "status": "BELUM",
          "ai_tips": "Keringkan petakan 10 hari sebelum panen untuk mempermudah operasional combine harvester dan menjaga mutu kadar air gabah.",
          "step_no": 5,
          "day_range": "HST 81 - 115",
          "actual_cost": 0,
          "target_cost": 2506250,
          "duration_days": 35,
          "allocated_budget": 2506250
        }
      ],
      "capital_expenses": [],
      "target_harvest_date": ""
    },
    {
      "id": "farm_15daf2",
      "name": "Sawah Blok Baru (Padi Sawah Inpari 32)",
      "status": "ACTIVE",
      "user_id": "usr_traktor",
      "latitude": -7.2504,
      "location": "Desa Sukamaju, Jawa Timur",
      "commodity": "Padi Sawah Inpari 32",
      "longitude": 112.7512,
      "soil_type": "Lempung Berliat (Subur)",
      "created_at": "2026-10-19T18:22:53.007Z",
      "owner_name": "Mas Bambang",
      "rental_cost": 0,
      "land_size_ha": 1,
      "total_budget": 6400000,
      "water_source": "Irigasi Teknis Bendungan",
      "collaborators": [],
      "planting_date": "2026-10-19",
      "ownership_type": "MILIK_SENDIRI",
      "timeline_phases": [
        {
          "name": "Fase 1: Olah Tanah & Bajak Garu",
          "tasks": [
            "Pembersihan gulma & sisa jerami",
            "Penggenangan air macak-macak",
            "Bajak singkal I (kedalaman 20-25 cm)",
            "Garu & perataan tanah (macak-macak)",
            "Aplikasi pupuk kandang/organik 2 ton/ha"
          ],
          "status": "BELUM",
          "ai_tips": "Pastikan tanah terolah gembur sempurna dan kedalaman lumpur minimal 20 cm agar perakaran benih padi kokoh.",
          "step_no": 1,
          "day_range": "H-14 s/d H-1",
          "actual_cost": 0,
          "target_cost": 1200000,
          "duration_days": 14,
          "allocated_budget": 1200000
        },
        {
          "name": "Fase 2: Tanam Padi & Persemaian",
          "tasks": [
            "Persemaian benih bersertifikat (15-20 hari)",
            "Pindah tanam sistem jajar legowo (2:1 / 4:1)",
            "Jarak tanam 25x25 cm atau 20x20 cm",
            "Penyulaman bibit mati (maksimal HST 7)",
            "Pengaturan air macak-macak (1-2 cm)"
          ],
          "status": "BELUM",
          "ai_tips": "Gunakan bibit muda (umur 15-18 HSS) dengan 1-2 bibit per rumpun untuk memicu anakan produktif lebih banyak.",
          "step_no": 2,
          "day_range": "HST 1 - 15",
          "actual_cost": 0,
          "target_cost": 1062500,
          "duration_days": 15,
          "allocated_budget": 1062500
        },
        {
          "name": "Fase 3: Pemupukan & Perawatan Vegetatif",
          "tasks": [
            "Pemupukan susulan I (HST 7-10) Urea + NPK",
            "Penyiangan gulma mekanis (gasrok / manual)",
            "Pemupukan susulan II (HST 21-25) NPK Phonska",
            "Pemantauan hama wereng coklat & penggerek batang",
            "Pengeringan berkala (intermittent irrigation)"
          ],
          "status": "BELUM",
          "ai_tips": "Terapkan pemupukan berimbang 5:3:2 (Urea, NPK, Organik). Jangan biarkan sawah tergenang terus-menerus agar akar bernapas.",
          "step_no": 3,
          "day_range": "HST 16 - 45",
          "actual_cost": 0,
          "target_cost": 2062500,
          "duration_days": 30,
          "allocated_budget": 2062500
        },
        {
          "name": "Fase 4: Proteksi Hama & Generatif",
          "tasks": [
            "Aplikasi booster malai & kalium cair (HST 50)",
            "Pengendalian walang sangit & kepik hijau",
            "Pencegahan blas daun & hawar pelepah (fungisida)",
            "Pengairan teratur setinggi 3-5 cm saat bunting",
            "Pemasangan orang-orangan / jaring pengusir burung"
          ],
          "status": "BELUM",
          "ai_tips": "Waspadai serangan walang sangit pada fase matang susu. Semprot agen hayati Beauveria bassiana atau insektisida nabati pagi hari.",
          "step_no": 4,
          "day_range": "HST 46 - 80",
          "actual_cost": 0,
          "target_cost": 1187500,
          "duration_days": 35,
          "allocated_budget": 1187500
        },
        {
          "name": "Fase 5: Pengeringan & Panen Raya",
          "tasks": [
            "Pengeringan sawah total 10-14 hari sebelum panen",
            "Pemeriksaan kematangan bulir (90-95% menguning)",
            "Pemesanan mesin Combine Harvester / regu sabit",
            "Pemanenan gabah & perontokan",
            "Pengemasan karung & penimbangan GKP"
          ],
          "status": "BELUM",
          "ai_tips": "Keringkan petakan 10 hari sebelum panen untuk mempermudah operasional combine harvester dan menjaga mutu kadar air gabah.",
          "step_no": 5,
          "day_range": "HST 81 - 115",
          "actual_cost": 0,
          "target_cost": 2506250,
          "duration_days": 35,
          "allocated_budget": 2506250
        }
      ],
      "capital_expenses": [],
      "target_harvest_date": ""
    }
  ],
  "service_orders": [
    {
      "id": "ord_trk_01",
      "unit": "/ Hektar",
      "status": "SELESAI",
      "buyer_id": "usr_petani",
      "quantity": 0.8,
      "seller_id": "usr_traktor",
      "buyer_name": "Pak Joko",
      "created_at": "18 Sep 2026, 09:30 WIB",
      "service_id": "srv_001",
      "unit_price": 1200000,
      "seller_name": "Mas Bambang",
      "total_price": 960000,
      "service_title": "Sewa Traktor Quick Kubota (Bajak & Garu)",
      "delivery_notes": "Mohon dikerjakan mulai jam 07.00 pagi di Sawah Blok Krajan",
      "payment_method": "COD / Bayar Saat Pengerjaan"
    },
    {
      "id": "ord_f3e9f006",
      "unit": "/ Hektar",
      "status": "MENUNGGU_KONFIRMASI",
      "buyer_id": "usr_petani",
      "quantity": 1,
      "seller_id": "usr_traktor",
      "buyer_name": "Pak Joko",
      "created_at": "21 Sep 2026, 09:35 WIB",
      "service_id": "srv_001",
      "unit_price": 1200000,
      "seller_name": "Mas Bambang",
      "total_price": 1200000,
      "service_title": "Sewa Traktor Quick Kubota (Bajak & Garu)",
      "delivery_notes": "Sawah petak 1",
      "payment_method": "COD / Bayar Saat Pengerjaan"
    },
    {
      "id": "ord_459303ed",
      "unit": "/ Hektar",
      "status": "MENUNGGU_KONFIRMASI",
      "buyer_id": "usr_petani",
      "quantity": 0.65,
      "seller_id": "usr_traktor",
      "buyer_name": "Pak Joko",
      "created_at": "21 Sep 2026, 09:38 WIB",
      "service_id": "srv_001",
      "unit_price": 1200000,
      "seller_name": "Mas Bambang",
      "total_price": 780000,
      "service_title": "Sewa Traktor Quick Kubota (Bajak & Garu)",
      "delivery_notes": "Tolong olah tanah di petak Legok",
      "payment_method": "COD / Bayar Saat Pengerjaan"
    },
    {
      "id": "ord_3f27f6e5",
      "unit": "/ Hektar",
      "status": "SEDANG_DIKIRIM",
      "buyer_id": "usr_petani",
      "quantity": 1.5,
      "seller_id": "usr_traktor",
      "buyer_name": "Pak Joko (Petani Padi)",
      "created_at": "21 Sep 2026, 09:47 WIB",
      "service_id": "srv_001",
      "unit_price": 1200000,
      "updated_at": "2026-09-21T09:47:19.707156",
      "seller_name": "Mas Bambang",
      "total_price": 1800000,
      "seller_notes": "Traktor Quick G1000 sudah dimuat ke pikap, siap jalan Sabtu jam 06.30 WIB.",
      "service_title": "Sewa Traktor Quick Kubota (Bajak & Garu)",
      "delivery_notes": "Sawah Blok Krajan dekat saung, tolong Sabtu pagi.",
      "payment_method": "COD / Bayar Saat Pengerjaan",
      "status_updated_at": "21 Sep 2026, 09:47 WIB"
    },
    {
      "id": "ord_20dfbddd",
      "unit": "/ Hektar",
      "status": "SEDANG_DIKIRIM",
      "buyer_id": "usr_petani",
      "quantity": 1.5,
      "seller_id": "usr_traktor",
      "buyer_name": "Pak Joko (Petani Padi)",
      "created_at": "21 Sep 2026, 09:47 WIB",
      "service_id": "srv_001",
      "unit_price": 1200000,
      "updated_at": "2026-09-21T09:47:32.929184",
      "seller_name": "Mas Bambang",
      "total_price": 1800000,
      "seller_notes": "Traktor Quick G1000 sudah dimuat ke pikap, siap jalan Sabtu jam 06.30 WIB.",
      "service_title": "Sewa Traktor Quick Kubota (Bajak & Garu)",
      "delivery_notes": "Sawah Blok Krajan dekat saung, tolong Sabtu pagi.",
      "payment_method": "COD / Bayar Saat Pengerjaan",
      "status_updated_at": "21 Sep 2026, 09:47 WIB"
    },
    {
      "id": "ord_a09ba0b1",
      "unit": "/ Hektar",
      "status": "SEDANG_DIKIRIM",
      "buyer_id": "usr_petani",
      "quantity": 1,
      "seller_id": "usr_traktor",
      "buyer_name": "Pak Joko (Petani Padi)",
      "created_at": "21 Sep 2026, 09:47 WIB",
      "service_id": "srv_001",
      "unit_price": 1200000,
      "updated_at": "2026-09-21T09:47:47.177737",
      "seller_name": "Mas Bambang",
      "total_price": 1200000,
      "seller_notes": "Traktor sudah berangkat menuju sawah Pak Joko!",
      "service_title": "Sewa Traktor Quick Kubota (Bajak & Garu)",
      "delivery_notes": "Sawah Blok Krajan, tolong dikabari.",
      "payment_method": "COD / Bayar Saat Pengerjaan",
      "status_updated_at": "21 Sep 2026, 09:47 WIB"
    },
    {
      "id": "ord_1476372d",
      "unit": "/ Hektar",
      "status": "MENUNGGU_KONFIRMASI",
      "buyer_id": "usr_petani",
      "quantity": 1,
      "seller_id": "usr_traktor",
      "buyer_name": "Pak Joko (Petani Padi)",
      "created_at": "21 Sep 2026, 09:57 WIB",
      "service_id": "srv_001",
      "unit_price": 1200000,
      "seller_name": "Mas Bambang",
      "total_price": 1200000,
      "service_title": "Sewa Traktor Quick Kubota (Bajak & Garu)",
      "delivery_notes": "Sawah Blok Krajan",
      "payment_method": "COD / Bayar Saat Pengerjaan"
    },
    {
      "id": "ord_d7c7bf7e",
      "unit": "/ Orang / Hari",
      "status": "MENUNGGU_KONFIRMASI",
      "buyer_id": "usr_petani",
      "quantity": 1,
      "seller_id": "usr_cangkul",
      "buyer_name": "Pak Joko",
      "created_at": "21 Sep 2026, 10:04 WIB",
      "service_id": "srv_006",
      "unit_price": 120000,
      "seller_name": "Mang Udin",
      "total_price": 120000,
      "service_title": "Jasa Cangkul & Perbaikan Galengan Pematang Sawah",
      "delivery_notes": "",
      "payment_method": "YARNEN (Bayar Saat Panen)"
    }
  ],
  "order_messages": [
    {
      "id": "msg_8eef1089",
      "message": "Halo Mas Bambang, saya tunggu Sabtu jam 07.00 ya!",
      "order_id": "ord_1476372d",
      "sender_id": "usr_petani",
      "created_at": "21 Sep 2026, 09:57 WIB",
      "sender_name": "Pak Joko",
      "sender_role": "PEMBELI"
    },
    {
      "id": "msg_5f47046f",
      "message": "Siap Pak Joko, solar dan bajak sudah kami siapkan!",
      "order_id": "ord_1476372d",
      "sender_id": "usr_traktor",
      "created_at": "21 Sep 2026, 09:57 WIB",
      "sender_name": "Mas Bambang",
      "sender_role": "PENJUAL"
    }
  ],
  "product_discussions": [
    {
      "id": "disc_cf069c87",
      "reply": "Bisa Pak Joko, roda traktor quick kami bisa diatur sempit.",
      "user_id": "usr_petani",
      "question": "Apakah traktor bisa masuk galengan sempit 80cm?",
      "user_name": "Pak Joko",
      "created_at": "21 Sep 2026, 09:57 WIB",
      "replied_at": "21 Sep 2026, 09:57 WIB",
      "replied_by": "Mas Bambang (Penyedia Jasa)",
      "service_id": "srv_001",
      "updated_at": "2026-09-21T09:57:26.725282",
      "user_avatar": ""
    }
  ],
  "ai_chat_sessions": [
    {
      "id": "session_1790491928400",
      "title": "halo. sudah bisakah kamu merespon sa...",
      "user_id": "usr_petani",
      "messages": [
        {
          "id": "msg_1790491928402_u",
          "role": "user",
          "image": null,
          "content": "halo. sudah bisakah kamu merespon saya?",
          "timestamp": "27 Sep, 13.52 WIB"
        },
        {
          "id": "msg_1790491928402_m",
          "role": "model",
          "content": "Halo Pak Tani! Saya **Agri AI**, asisten pertanian cerdas Anda di AgriBuddy. \n\nSaya siap membantu menjawab seputar:\n\u2022 Deteksi dan solusi penyakit daun padi & hama tanaman\n\u2022 Rekomendasi dosis pemupukan berimbang & jadwal aplikasi\n\u2022 Pengelolaan air sawah, bibit unggul, serta pasca panen\n\nSilakan ketik pertanyaan Anda atau lampirkan foto tanaman/daun melalui tombol kamera di bawah!",
          "timestamp": "27 Sep, 13.52 WIB",
          "detected_diagnosis": null
        },
        {
          "id": "msg_1790491984321_u",
          "role": "user",
          "image": null,
          "content": "berapa lama waktu ideal yang dibutuhkan untuk menanam padi dari persiapan hingga panen?",
          "timestamp": "27 Sep, 13.53 WIB"
        },
        {
          "id": "msg_1790491984321_m",
          "role": "model",
          "content": "Halo Pak Tani! Saya **Agri AI**, asisten pertanian cerdas Anda di AgriBuddy. \n\nSaya siap membantu menjawab seputar:\n\u2022 Deteksi dan solusi penyakit daun padi & hama tanaman\n\u2022 Rekomendasi dosis pemupukan berimbang & jadwal aplikasi\n\u2022 Pengelolaan air sawah, bibit unggul, serta pasca panen\n\nSilakan ketik pertanyaan Anda atau lampirkan foto tanaman/daun melalui tombol kamera di bawah!",
          "timestamp": "27 Sep, 13.53 WIB",
          "detected_diagnosis": null
        },
        {
          "id": "msg_1790492007821_u",
          "role": "user",
          "image": null,
          "content": "halo",
          "timestamp": "27 Sep, 13.53 WIB"
        },
        {
          "id": "msg_1790492007821_m",
          "role": "model",
          "content": "Halo Pak/Bu Tani!  Senang sekali bisa terhubung kembali dengan Anda. \n\nAda yang bisa Agri AI bantu hari ini seputar kebun atau sawah Bapak/Ibu? Mau tanya soal jadwal pemupukan, cara mengatasi hama, atau persiapan tanam padi dan palawija? Silakan tulis pertanyaannya ya! ",
          "timestamp": "27 Sep, 13.53 WIB",
          "detected_diagnosis": null
        },
        {
          "id": "msg_1790492026438_u",
          "role": "user",
          "image": null,
          "content": "berapa lama waktu ideal yang dibutuhkan untuk menanam padi dari persiapan hingga panen?",
          "timestamp": "27 Sep, 13.53 WIB"
        },
        {
          "id": "msg_1790492026438_m",
          "role": "model",
          "content": "Halo Pak/Bu Tani! Pertanyaan yang sangat bagus. \n\nSecara umum, waktu ideal yang dibutuhkan untuk budidaya padi dari tahap persiapan lahan hingga panen adalah sekitar **100 hingga 120 hari (kurang lebih 3,5 - 4 bulan)**. \n\nNamun, durasi pastinya sangat tergantung pada varietas benih yang Bapak/Ibu tanam. Berikut adalah rincian tahapan waktunya:\n\n**1. Persiapan Lahan & Persemaian (Hari ke-1 s.d. 21 / \u00b1 3 Minggu)**\n*   **Pengolahan tanah (bajak dan garu):** 7\u201310 hari.\n*   **Persemaian benih:** Benih disebar dan dirawat di persemaian selama 15\u201321 hari sebelum siap dipindah tanam (pindah tanam/tandur).\n\n**2. Masa Vegetatif / Pertumbuhan (Hari ke-22 s.d. 60)**\n*   Tanaman beradaptasi setelah pindah tanam, mulai beranak (anakan aktif), dan membentuk rumpun.\n*   Pada fase ini, pemupukan pertama dan kedua sangat penting untuk pertumbuhan batang dan daun.\n\n**3. Masa Generatif / Pembungaan & Pengisian Bulir (Hari ke-61 s.d. 100)**\n*   Tanaman mulai bunting, keluar malai (bunga padi), hingga penyerbukan dan pengisian bulir padi (fase jerami mulai menguning).\n*   Pengairan harus dijaga dengan baik (tidak boleh terlalu kering, tapi juga jangan tergenang terlalu dalam saat menjelang panen).\n\n**4. Pematangan & Panen (Hari ke-100 s.d. 120)**\n*   Bulir padi sudah terisi penuh, keras, dan warna malai berubah menjadi kuning kecokelatan (sekitar 85-90% gabah menguning).\n*   Air di sawah dikeringkan 7\u201310 hari sebelum panen agar tanahnya keras dan memudahkan proses pemanenan.\n\n---\n\n** Tips Tambahan dari Agri AI:**\n*   **Varietas Genjah (Umur Pendek):** Seperti varietas Inpari 32, Ciherang, atau Mekongga, biasanya siap panen dalam waktu **100\u2013115 hari**.\n*   **Varietas Berumur Panjang:** Padi lokal tertentu atau padi hibrida tertentu bisa memakan waktu hingga **120\u2013130 hari**.\n\nPastikan memilih benih bersertifikat dan sesuaikan dengan ketersediaan air di irigasi Bapak/Ibu ya! Ada hal lain seputar persiapan tanam yang ingin ditanyakan, Pak/Bu? ",
          "timestamp": "27 Sep, 13.53 WIB",
          "detected_diagnosis": null
        }
      ],
      "created_at": "27 Sep, 13.52 WIB",
      "updated_at": "2026-09-27T06:53:46.438Z"
    },
    {
      "id": "session_1792138821384",
      "title": "fuafha",
      "user_id": "usr_1791517561901",
      "messages": [
        {
          "id": "msg_1792138821388_u",
          "role": "user",
          "image": null,
          "content": "fuafha",
          "timestamp": "16 Okt, 15.20 WIB"
        },
        {
          "id": "msg_1792138821388_m",
          "role": "model",
          "content": "Halo Pak Tani! Saya **Agri AI**, asisten pertanian cerdas Anda di AgriBuddy. \n\nSaya siap membantu menjawab seputar:\n\u2022 Deteksi dan solusi penyakit daun padi & hama tanaman\n\u2022 Rekomendasi dosis pemupukan berimbang & jadwal aplikasi\n\u2022 Pengelolaan air sawah, bibit unggul, serta pasca panen\n\nSilakan ketik pertanyaan Anda atau lampirkan foto tanaman/daun melalui tombol kamera di bawah!",
          "timestamp": "16 Okt, 15.20 WIB",
          "detected_diagnosis": null
        },
        {
          "id": "msg_1792141178409_u",
          "role": "user",
          "image": null,
          "content": "adeaf",
          "timestamp": "16 Okt, 15.59 WIB"
        },
        {
          "id": "msg_1792141178409_m",
          "role": "model",
          "content": "Halo Pak Tani! Saya **Agri AI**, asisten pertanian cerdas Anda di AgriBuddy.\n\nSaya siap membantu menjawab seputar:\n\u2022 Deteksi dan solusi penyakit daun padi & hama tanaman\n\u2022 Rekomendasi dosis pemupukan berimbang & jadwal aplikasi\n\u2022 Pengelolaan air sawah, bibit unggul, serta pasca panen\n\nSilakan ketik pertanyaan Anda atau lampirkan foto tanaman/daun melalui tombol kamera di bawah!",
          "timestamp": "16 Okt, 15.59 WIB",
          "detected_diagnosis": null
        }
      ],
      "created_at": "16 Okt, 15.20 WIB",
      "updated_at": "2026-10-16T08:59:38.409Z"
    },
    {
      "id": "session_1792166941953",
      "title": "Daun Menguning & Kering di Ujung",
      "user_id": "usr_1791517561901",
      "messages": [
        {
          "id": "msg_1792166941963_u",
          "role": "user",
          "image": null,
          "content": "Daun Menguning & Kering di Ujung",
          "timestamp": "16 Okt, 23.09 WIB"
        },
        {
          "id": "msg_1792166941963_m",
          "role": "model",
          "content": "Daun padi yang menguning atau bercak umumnya dipicu oleh:\n\n1. **Kekurangan Nitrogen:** Daun tua menguning dari ujung membentuk huruf 'V'. Solusi: tambahkan Urea berimbang.\n2. **Hawar Daun Bakteri (Kresek):** Ujung daun mengering keputihan bergelombang. Solusi: semprot bakterisida tembaga.\n3. **Jamur Blas Daun:** Bercak belah ketupat abu-abu kecoklatan. Solusi: fungisida trisiklazol.\n\nAnda juga dapat mengambil foto daunnya sekarang dan lampirkan di chat ini agar saya analisiskan!",
          "timestamp": "16 Okt, 23.09 WIB",
          "detected_diagnosis": null
        }
      ],
      "created_at": "16 Okt, 23.09 WIB",
      "updated_at": "2026-10-16T16:09:01.963Z"
    },
    {
      "id": "session_1792420853884",
      "title": "Daun Menguning & Kering di Ujung",
      "user_id": "usr_petani",
      "messages": [
        {
          "id": "msg_1792420854571_u",
          "role": "user",
          "image": null,
          "content": "Daun Menguning & Kering di Ujung",
          "timestamp": "19 Okt, 21.40 WIB"
        },
        {
          "id": "msg_1792420854571_m",
          "role": "model",
          "content": "Daun padi yang menguning atau bercak umumnya dipicu oleh:\n\n1. **Kekurangan Nitrogen:** Daun tua menguning dari ujung membentuk huruf 'V'. Solusi: tambahkan Urea berimbang.\n2. **Hawar Daun Bakteri (Kresek):** Ujung daun mengering keputihan bergelombang. Solusi: semprot bakterisida tembaga.\n3. **Jamur Blas Daun:** Bercak belah ketupat abu-abu kecoklatan. Solusi: fungisida trisiklazol.\n\nAnda juga dapat mengambil foto daunnya sekarang dan lampirkan di chat ini agar saya analisiskan!",
          "timestamp": "19 Okt, 21.40 WIB",
          "detected_diagnosis": null
        }
      ],
      "created_at": "19 Okt, 21.40 WIB",
      "updated_at": "2026-10-19T14:40:54.571Z"
    }
  ]
};
