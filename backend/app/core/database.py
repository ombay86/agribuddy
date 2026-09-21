import os
import json
import uuid
from datetime import datetime
from typing import List, Dict, Any, Optional

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "data")
DB_FILE = os.path.join(DATA_DIR, "local_db.json")

INITIAL_DATA = {
    "users": [
        {
            "id": "usr_petani",
            "phone_number": "08123456789",
            "full_name": "Pak Joko",
            "role": "PETANI_MANDIRI",
            "role_label": "Petani Mandiri",
            "category_badge": "Petani Mandiri",
            "village": "Desa Sukamaju, Jawa Timur",
            "commodity": "Padi Inpari 32",
            "land_size_ha": 1.2,
            "whatsapp_number": "08123456789",
            "bio": "Petani Padi Binaan Poktan Makmur. Mengelola 1.2 Ha sawah irigasi teknis dengan perencanaan digital.",
            "created_at": datetime.now().isoformat()
        },
        {
            "id": "usr_traktor",
            "phone_number": "081298765432",
            "full_name": "Mas Bambang",
            "role": "JASA_TRAKTOR",
            "role_label": "Jasa Olah Tanah & Traktor",
            "category_badge": "Sewa Traktor",
            "village": "Desa Sukamaju Krajan",
            "commodity": "Jasa Traktor Quick Kubota 8.5 HP",
            "land_size_ha": 0.0,
            "whatsapp_number": "081298765432",
            "bio": "Menyediakan jasa bajak singkal & rotavator lengkap operator untuk olah tanah sawah siap tanam.",
            "created_at": datetime.now().isoformat()
        },
        {
            "id": "usr_pengairan",
            "phone_number": "085799988811",
            "full_name": "Pak Slamet",
            "role": "JASA_PENGAIRAN",
            "role_label": "Jasa Pompa Air & Irigasi",
            "category_badge": "Jasa Pengairan",
            "village": "Desa Sukamaju Blok Saluran",
            "commodity": "Pompa Alkon 3 Inci & Sumur Pantek",
            "land_size_ha": 0.0,
            "whatsapp_number": "085799988811",
            "bio": "Layanan sedot air sungai / embung dan persewaan pompa alkon ke petak sawah.",
            "created_at": datetime.now().isoformat()
        },
        {
            "id": "usr_cangkul",
            "phone_number": "087811223344",
            "full_name": "Mang Udin",
            "role": "JASA_CANGKUL",
            "role_label": "Jasa Cangkul & Tanam",
            "category_badge": "Jasa Cangkul",
            "village": "Desa Sukamaju Girang",
            "commodity": "Regu Tanam & Cangkul Galengan",
            "land_size_ha": 0.0,
            "whatsapp_number": "087811223344",
            "bio": "Koordinator regu tenaga kerja cangkul pematang sawah dan penanaman padi jajar legowo.",
            "created_at": datetime.now().isoformat()
        },
        {
            "id": "usr_distributor",
            "phone_number": "085712345678",
            "full_name": "Ibu Ratna",
            "role": "KIOS_SAPROTAN",
            "role_label": "Kios Saprotan & Pupuk",
            "category_badge": "Kios Saprotan",
            "village": "Pasar Tradisional Sukamaju Kios B-04",
            "commodity": "Saprotan Pupuk & Benih",
            "land_size_ha": 0.0,
            "whatsapp_number": "085712345678",
            "bio": "Pengelola KPL resmi penyalur pupuk subsidi dan benih bersertifikat di Sukamaju.",
            "created_at": datetime.now().isoformat()
        },
        {
            "id": "usr_agen",
            "phone_number": "081356789012",
            "full_name": "Bpk. Hendra Jaya",
            "role": "PENGGILINGAN_PADI",
            "role_label": "Penggilingan Padi & Pengepul",
            "category_badge": "Penggilingan Padi",
            "village": "Kawasan Sentra Penggilingan Padi Km 3",
            "commodity": "Gabah Kering Panen (GKP)",
            "land_size_ha": 0.0,
            "whatsapp_number": "081356789012",
            "bio": "Mitra penyerapan gabah dan penggilingan beras petani lokal dengan timbangan digital.",
            "created_at": datetime.now().isoformat()
        }
    ],

    "inventory": [
        {
            "id": "inv_001",
            "user_id": "usr_001",
            "name": "Pupuk Urea N-46",
            "type": "PUPUK",
            "quantity": 4,
            "unit": "Karung (50kg)",
            "min_threshold": 2,
            "notes": "Untuk pemupukan susulan I & II",
            "updated_at": datetime.now().isoformat()
        },
        {
            "id": "inv_002",
            "user_id": "usr_001",
            "name": "Pupuk NPK Phonska",
            "type": "PUPUK",
            "quantity": 1,
            "unit": "Karung (50kg)",
            "min_threshold": 2,
            "notes": "Stok menipis, segera beli",
            "updated_at": datetime.now().isoformat()
        },
        {
            "id": "inv_003",
            "user_id": "usr_001",
            "name": "Benih Padi Inpari 32",
            "type": "BIBIT",
            "quantity": 5,
            "unit": "Kantong (5kg)",
            "min_threshold": 2,
            "notes": "Tahan wereng coklat",
            "updated_at": datetime.now().isoformat()
        }
    ],
    "harvests": [
        {
            "id": "hrv_001",
            "user_id": "usr_001",
            "commodity": "Gabah Kering Panen (GKP)",
            "total_weight_kg": 2400,
            "harvest_date": "2026-08-20",
            "status": "TERSIMPAN",
            "notes": "Hasil panen petak timur, disimpan di lumbung utama"
        },
        {
            "id": "hrv_002",
            "user_id": "usr_001",
            "commodity": "Gabah Kering Giling (GKG)",
            "total_weight_kg": 1100,
            "harvest_date": "2026-07-10",
            "status": "TERJUAL_SEBAGIAN",
            "notes": "Sudah terjual 500kg ke KUD lokal"
        }
    ],
    "diagnoses": [],
    "partners": [
        {
            "id": "prt_001",
            "name": "KUD Sumber Rejeki Sukamaju",
            "category": "KOPERASI",
            "category_label": "Koperasi Unit Desa",
            "pic_name": "Bpk. H. Bambang (Ketua KUD)",
            "phone_whatsapp": "6281298765432",
            "location": "Jl. Raya Sukamaju No. 12, Jawa Timur",
            "description": "Menyerap gabah hasil panen anggota kelompok tani, penyalur pupuk subsidi resmi, dan simpan pinjam tani.",
            "is_verified": True,
            "accepted_commodities": ["Gabah Kering Panen", "Gabah Kering Giling", "Jagung"],
            "buying_price_hint": "Beli GKP: Rp 6.800 - 7.000/kg",
            "is_connected": True
        },
        {
            "id": "prt_002",
            "name": "Kios Tani Subur Makmur (KPL Resmi)",
            "category": "DISTRIBUTOR_PUPUK",
            "category_label": "Distributor Pupuk & Bibit",
            "pic_name": "Ibu Ratna (Pengelola Kios)",
            "phone_whatsapp": "6285712345678",
            "location": "Pasar Tradisional Sukamaju Kios B-04",
            "description": "Penyalur resmi pupuk subsidi (Urea & NPK Phonska) menggunakan Kartu Tani serta benih bersertifikat.",
            "is_verified": True,
            "accepted_commodities": ["Saprotan Pupuk Subsidi & Non-Subsidi"],
            "buying_price_hint": "Stok Urea & NPK Baru Tiba Kemarin",
            "is_connected": False
        },
        {
            "id": "prt_003",
            "name": "Penggilingan Padi Sri Jaya",
            "category": "PENGGILINGAN_PASAR",
            "category_label": "Penggilingan & Pengepul",
            "pic_name": "Bpk. Hendra Jaya",
            "phone_whatsapp": "6281356789012",
            "location": "Kawasan Sentra Penggilingan Padi Km 3",
            "description": "Menerima gabah kering panen partai besar (truk/pick-up) dengan timbangan digital terkalibrasi dan pembayaran tunai/transfer langsung.",
            "is_verified": True,
            "accepted_commodities": ["Gabah Kering Panen (GKP)", "Beras Pecah Kulit"],
            "buying_price_hint": "Siap Jemput Muatan ke Lokasi Lumbung",
            "is_connected": False
        }
    ],
    "offers": [],
    # --- KOLEKSI BARU EKOSISTEM SOSIAL & PERDAGANGAN TERTUTUP ---
    "shop_products": [
        {
            "id": "prod_001",
            "seller_name": "Kios Tani Subur Makmur",
            "seller_role": "DISTRIBUTOR",
            "name": "Pupuk Urea N-46 (Subsidi)",
            "category": "PUPUK",
            "price": 112500,
            "unit": "Karung (50kg)",
            "stock_available": 45,
            "is_subsidi": True,
            "description": "Pupuk nitrogen murni untuk memacu pertumbuhan vegetatif daun dan anakan padi.",
            "image_emoji": "🌱"
        },
        {
            "id": "prod_002",
            "seller_name": "Kios Tani Subur Makmur",
            "seller_role": "DISTRIBUTOR",
            "name": "Pupuk NPK Phonska Plus 15-15-15",
            "category": "PUPUK",
            "price": 185000,
            "unit": "Karung (50kg)",
            "stock_available": 30,
            "is_subsidi": False,
            "description": "NPK majemuk diperkaya Seng (Zn) dan Sulfur untuk malai padi berisi penuh dan bobot berat.",
            "image_emoji": "🌾"
        },
        {
            "id": "prod_003",
            "seller_name": "KUD Sumber Rejeki Sukamaju",
            "seller_role": "DISTRIBUTOR",
            "name": "Benih Padi Inpari 32 Bersertifikat",
            "category": "BIBIT",
            "price": 75000,
            "unit": "Kantong (5kg)",
            "stock_available": 20,
            "is_subsidi": False,
            "description": "Benih label ungu resmi Balitbangtan, potensi hasil 10,5 ton/ha, tahan rebah & wereng coklat.",
            "image_emoji": "🌾"
        },
        {
            "id": "prod_004",
            "seller_name": "Kios Tani Subur Makmur",
            "seller_role": "DISTRIBUTOR",
            "name": "Bakterisida Hayati Kuproxat 345 SC",
            "category": "OBAT",
            "price": 65000,
            "unit": "Botol (250ml)",
            "stock_available": 15,
            "is_subsidi": False,
            "description": "Solusi ampuh mengendalikan Hawar Daun Bakteri (Kresek) rekomendasi Dokter Tani AI.",
            "image_emoji": "🧪"
        }
    ],
    "saprotan_orders": [
        {
            "id": "ord_001",
            "product_id": "prod_001",
            "product_name": "Pupuk Urea N-46 (Subsidi)",
            "product_type": "PUPUK",
            "quantity": 2,
            "unit": "Karung (50kg)",
            "total_price": 225000,
            "buyer_name": "Pak Joko (Petani)",
            "seller_name": "Kios Tani Subur Makmur",
            "payment_method": "COD / Bayar Saat Ambil",
            "status": "SELESAI",
            "created_at": "19 Sep 2026, 10:15 WIB",
            "delivery_note": "Diambil sore saat pulang sawah"
        }
    ],
    "market_listings": [
        {
            "id": "list_001",
            "seller_name": "Pak Joko (Petani)",
            "commodity": "Gabah Kering Panen (GKP)",
            "total_weight_kg": 1500,
            "starting_price_per_kg": 6800,
            "min_order_kg": 500,
            "location": "Lumbung Desa Sukamaju (Petak Timur)",
            "status": "DIBUKA",
            "notes": "Kadar air sekitar 14%, bulir bersih siap giling.",
            "created_at": "20 Sep 2026, 09:30 WIB",
            "bids": [
                {
                    "id": "bid_001",
                    "bidder_name": "Penggilingan Padi Sri Jaya",
                    "bidder_role": "PENGGILINGAN",
                    "bid_price_per_kg": 6950,
                    "bid_weight_kg": 1500,
                    "notes": "Siap jemput dengan pick-up hari Kamis, timbangan di tempat tunai.",
                    "status": "MENUNGGU",
                    "created_at": "20 Sep 2026, 11:20 WIB"
                },
                {
                    "id": "bid_002",
                    "bidder_name": "KUD Sumber Rejeki Sukamaju",
                    "bidder_role": "KOPERASI",
                    "bid_price_per_kg": 6850,
                    "bid_weight_kg": 1500,
                    "notes": "Penyerapan gabah program ketahanan pangan desa.",
                    "status": "MENUNGGU",
                    "created_at": "20 Sep 2026, 12:45 WIB"
                }
            ]
        }
    ],
    "community_posts": [
        {
            "id": "post_001",
            "author_name": "Bpk. H. Bambang",
            "author_role": "KETUA_POKTAN",
            "author_role_label": "Ketua Kelompok Tani Makmur",
            "title": "Pengumuman: Jadwal Aliran Air Irigasi Tersier Petak Utara",
            "content": "Bapak-bapak anggota Poktan Makmur, pintu air Dam Timur akan dibuka mulai besok pagi jam 06.00 s.d 15.00 WIB untuk pengairan fase bunting. Mohon bersihkan saluran pematang masing-masing agar debit air lancar.",
            "category": "INFO_POKTAN",
            "category_label": "Info Poktan",
            "created_at": "20 Sep 2026, 08:00 WIB",
            "likes_count": 12,
            "comments": [
                {
                    "id": "comm_001",
                    "author_name": "Pak Joko",
                    "author_role": "Petani",
                    "comment": "Siap Pak Ketua, saluran petak saya sudah dibersihkan dari jerami tadi pagi.",
                    "created_at": "20 Sep 2026, 08:35 WIB"
                }
            ]
        },
        {
            "id": "post_002",
            "author_name": "Pak Joko",
            "author_role": "PETANI",
            "author_role_label": "Petani Padi (Sukamaju)",
            "title": "Waspada Gejala Daun Padi Menguning Kering di Tepi",
            "content": "Pagi ini daun padi saya di petak timur terdeteksi Hawar Daun Bakteri (Kresek) lewat Dokter Tani AI. Tetangga sawah harap cek petak masing-masing dan kurangi urea jika musim hujan.",
            "category": "TANYA_HAMA",
            "category_label": "Hama & Penyakit",
            "created_at": "20 Sep 2026, 14:15 WIB",
            "likes_count": 8,
            "comments": [
                {
                    "id": "comm_002",
                    "author_name": "Kios Tani Subur Makmur",
                    "author_role": "Distributor",
                    "comment": "Pak Joko, stok bakterisida tembaga di kios sudah ready, silakan langsung pesan di tab Kios jika butuh.",
                    "created_at": "20 Sep 2026, 15:00 WIB"
                }
            ]
        }
    ],
    "farm_plans": [],
    "ecosystem_services": [
        {
            "id": "srv_001",
            "provider_id": "usr_traktor",
            "provider_name": "Mas Bambang",
            "provider_badge": "Sewa Traktor",
            "provider_avatar": "🚜",
            "title": "Sewa Traktor Quick Kubota (Bajak & Garu)",
            "category": "JASA_TRAKTOR",
            "category_label": "Jasa Olah Tanah",
            "price": 1200000,
            "price_unit": "/ Hektar",
            "location": "Desa Sukamaju Krajan",
            "phone": "6281298765432",
            "description": "Paket olah tanah sawah sampai gembur siap tanam. Termasuk traktor Quick Kubota 8.5 HP, operator berpengalaman, dan BBM solar.",
            "tags": ["Traktor Roda 2", "Singkal & Garu", "Lahan Basah & Kering"],
            "is_available": True,
            "created_at": "2026-09-20T08:00:00"
        },
        {
            "id": "srv_002",
            "provider_id": "usr_traktor",
            "provider_name": "Mas Bambang",
            "provider_badge": "Sewa Traktor",
            "provider_avatar": "🚜",
            "title": "Olah Tanah Rotavator Cepat",
            "category": "JASA_TRAKTOR",
            "category_label": "Jasa Olah Tanah",
            "price": 1100000,
            "price_unit": "/ Hektar",
            "location": "Desa Sukamaju Krajan",
            "phone": "6281298765432",
            "description": "Penghancuran tanah dan gulma dalam sekali jalan dengan pisau rotavator tajam, tanah langsung gembur merata.",
            "tags": ["Rotavator", "Gulma Hancur", "Cepat Selesai"],
            "is_available": True,
            "created_at": "2026-09-20T08:30:00"
        },
        {
            "id": "srv_003",
            "provider_id": "usr_pengairan",
            "provider_name": "Pak Slamet",
            "provider_badge": "Jasa Pengairan",
            "provider_avatar": "💧",
            "title": "Sewa Mesin Pompa Alkon 3 Inci + Selang Spiral 50m",
            "category": "JASA_PENGAIRAN",
            "category_label": "Jasa Pengairan",
            "price": 150000,
            "price_unit": "/ Hari",
            "location": "Desa Sukamaju Blok Saluran",
            "phone": "6285799988811",
            "description": "Mesin pompa diesel alkon 3 inci hisap debit tinggi, lengkap selang buang 50 meter dan saringan hisap.",
            "tags": ["Pompa Alkon 3 Inci", "Selang 50m", "Debit Tinggi"],
            "is_available": True,
            "created_at": "2026-09-20T09:00:00"
        },
        {
            "id": "srv_004",
            "provider_id": "usr_pengairan",
            "provider_name": "Pak Slamet",
            "provider_badge": "Jasa Pengairan",
            "provider_avatar": "💧",
            "title": "Jasa Sedot Air Sungai / Embung ke Petak Sawah",
            "category": "JASA_PENGAIRAN",
            "category_label": "Jasa Pengairan",
            "price": 350000,
            "price_unit": "/ Paket (1 Ha)",
            "location": "Desa Sukamaju",
            "phone": "6285799988811",
            "description": "Paket borongan pengairan sawah sampai air tergenang macak-macak siap tabur pupuk susulan.",
            "tags": ["Borongan Sedot", "Musim Kemarau", "Antar Mesin"],
            "is_available": True,
            "created_at": "2026-09-20T09:15:00"
        },
        {
            "id": "srv_005",
            "provider_id": "usr_cangkul",
            "provider_name": "Mang Udin",
            "provider_badge": "Jasa Cangkul",
            "provider_avatar": "🌾",
            "title": "Regu Tanam Padi Borongan (Sistem Jajar Legowo 2:1)",
            "category": "JASA_TENAGA_KERJA",
            "category_label": "Tenaga Kerja Tani",
            "price": 1400000,
            "price_unit": "/ Hektar",
            "location": "Desa Sukamaju Girang",
            "phone": "6287811223344",
            "description": "Regu tanam wanita dan pria terampil 10-12 orang, pola tanam jajar legowo lurus rapi, jarak tanam teratur.",
            "tags": ["Jajar Legowo 2:1", "Rapi & Cepat", "1 Hari Selesai"],
            "is_available": True,
            "created_at": "2026-09-20T09:30:00"
        },
        {
            "id": "srv_006",
            "provider_id": "usr_cangkul",
            "provider_name": "Mang Udin",
            "provider_badge": "Jasa Cangkul",
            "provider_avatar": "🌾",
            "title": "Jasa Cangkul & Perbaikan Galengan Pematang Sawah",
            "category": "JASA_TENAGA_KERJA",
            "category_label": "Tenaga Kerja Tani",
            "price": 120000,
            "price_unit": "/ Orang / Hari",
            "location": "Desa Sukamaju",
            "phone": "6287811223344",
            "description": "Pembersihan rumput galengan, penutupan lubang kepiting penahan kebocoran air, dan pematang kokoh.",
            "tags": ["Cangkul Galengan", "Tahan Bocor", "Tenaga Kuat"],
            "is_available": True,
            "created_at": "2026-09-20T10:00:00"
        },
        {
            "id": "srv_007",
            "provider_id": "usr_distributor",
            "provider_name": "Ibu Ratna",
            "provider_badge": "Kios Saprotan",
            "provider_avatar": "🏪",
            "title": "Pupuk Urea N-46 Petrokimia (Subsidi)",
            "category": "SAPROTAN",
            "category_label": "Pupuk & Benih",
            "price": 112500,
            "price_unit": "/ Karung (50kg)",
            "location": "Pasar Sukamaju Kios B-04",
            "phone": "6285712345678",
            "description": "Urea butiran putih kadar Nitrogen 46% resmi subsidi pemerintah. Syarat membawa Kartu Tani Poktan Makmur.",
            "tags": ["Pupuk Subsidi", "Nitrogen 46%", "Kartu Tani"],
            "is_available": True,
            "created_at": "2026-09-20T10:15:00"
        },
        {
            "id": "srv_008",
            "provider_id": "usr_distributor",
            "provider_name": "Ibu Ratna",
            "provider_badge": "Kios Saprotan",
            "provider_avatar": "🏪",
            "title": "Benih Padi Inpari 32 Bersertifikat Balitbangtan",
            "category": "SAPROTAN",
            "category_label": "Pupuk & Benih",
            "price": 75000,
            "price_unit": "/ Kantong (5kg)",
            "location": "Pasar Sukamaju Kios B-04",
            "phone": "6285712345678",
            "description": "Benih label ungu resmi, daya berkecambah 92%, tahan wereng batang coklat dan hawar daun kresek.",
            "tags": ["Benih Resmi", "Label Ungu", "Potensi 10 Ton"],
            "is_available": True,
            "created_at": "2026-09-20T10:30:00"
        },
        {
            "id": "srv_009",
            "provider_id": "usr_agen",
            "provider_name": "Bpk. Hendra Jaya",
            "provider_badge": "Penggilingan Padi",
            "provider_avatar": "🚚",
            "title": "Penyerapan Beli Gabah Kering Panen (GKP) Jemput Lumbung",
            "category": "HASIL_PANEN",
            "category_label": "Penyerapan Panen",
            "price": 6850,
            "price_unit": "/ kg GKP",
            "location": "Sentra Penggilingan Km 3",
            "phone": "6281356789012",
            "description": "Beli gabah petani langsung di lumbung/pematang dengan timbangan digital terkalibrasi. Bayar tunai atau transfer seketika.",
            "tags": ["Beli Tunai", "Timbangan Digital", "Jemput Pick-up"],
            "is_available": True,
            "created_at": "2026-09-20T11:00:00"
        },
        {
            "id": "srv_010",
            "provider_id": "usr_agen",
            "provider_name": "Bpk. Hendra Jaya",
            "provider_badge": "Penggilingan Padi",
            "provider_avatar": "🚚",
            "title": "Jasa Giling Gabah Jadi Beras Putih Super + Poles",
            "category": "PASCA_PANEN",
            "category_label": "Jasa Pasca Panen",
            "price": 500,
            "price_unit": "/ kg Gabah",
            "location": "Sentra Penggilingan Km 3",
            "phone": "6281356789012",
            "description": "Mesin giling modern Satake menghasilkan beras putih bersih rendemen tinggi (65-68%) minim patah/menir.",
            "tags": ["Mesin Satake", "Beras Utuh", "Rendemen Tinggi"],
            "is_available": True,
            "created_at": "2026-09-20T11:30:00"
        },
        {
            "id": "srv_011",
            "provider_id": "usr_petani",
            "provider_name": "Pak Joko",
            "provider_badge": "Petani Mandiri",
            "provider_avatar": "👨‍🌾",
            "title": "Bibit Padi Inpari 32 Siap Tanam Umur 16 Hari (Dapog)",
            "category": "SAPROTAN",
            "category_label": "Bibit Siap Tanam",
            "price": 3500,
            "price_unit": "/ Kotak Dapog",
            "location": "Sawah Sukamaju Petak Timur",
            "phone": "628123456789",
            "description": "Bibit semai dapog siap tanam mesin transplanter atau manual, akar kuat dan daun hijau segar bebas hama.",
            "tags": ["Bibit Dapog", "Umur 16 Hari", "Akar Kuat"],
            "is_available": True,
            "created_at": "2026-09-20T12:00:00"
        }
    ],
    "farmlands": [
        {
            "id": "farm_001",
            "user_id": "usr_petani",
            "name": "Sawah Blok Krajan (Padi Inpari 32)",
            "land_size_ha": 0.8,
            "commodity": "Padi Sawah Inpari 32",
            "soil_type": "Lempung Berliat (Subur)",
            "water_source": "Irigasi Teknis Bendungan",
            "location": "Desa Sukamaju Krajan",
            "latitude": -7.2504,
            "longitude": 112.7512,
            "collaborators": [
                {
                    "id": "collab_01",
                    "name": "Pak Joko",
                    "role": "Pemilik Lahan & Pengelola",
                    "share_percentage": 60.0,
                    "phone": "08123456789"
                },
                {
                    "id": "collab_02",
                    "name": "Mang Udin",
                    "role": "Penggarap & Perawatan Pematang",
                    "share_percentage": 40.0,
                    "phone": "087811223344"
                }
            ],
            "capital_expenses": [
                {
                    "id": "exp_001",
                    "farm_id": "farm_001",
                    "item_name": "Sewa Traktor Olah Tanah & Bajak Garu",
                    "amount": 960000.0,
                    "category": "OLAH_TANAH",
                    "source": "MARKETPLACE",
                    "order_ref_id": "ord_trk_01",
                    "date": "18 Sep 2026, 09:30 WIB"
                },
                {
                    "id": "exp_002",
                    "farm_id": "farm_001",
                    "item_name": "Pupuk NPK Phonska & Urea Subsidi",
                    "amount": 420000.0,
                    "category": "PUPUK_NUTRISI",
                    "source": "MARKETPLACE",
                    "order_ref_id": "ord_sap_01",
                    "date": "19 Sep 2026, 14:15 WIB"
                }
            ],
            "created_at": "2026-09-15T08:00:00"
        },
        {
            "id": "farm_002",
            "user_id": "usr_petani",
            "name": "Sawah Blok Timur (Padi Ciherang)",
            "land_size_ha": 1.2,
            "commodity": "Padi Ciherang",
            "soil_type": "Aluvial Sawah Teknis",
            "water_source": "Irigasi Teknis Bendungan",
            "location": "Desa Sukamaju Blok Saluran",
            "latitude": -7.2550,
            "longitude": 112.7580,
            "collaborators": [
                {
                    "id": "collab_03",
                    "name": "Pak Joko",
                    "role": "Pemilik & Penggarap Mandiri",
                    "share_percentage": 100.0,
                    "phone": "08123456789"
                }
            ],
            "capital_expenses": [
                {
                    "id": "exp_003",
                    "farm_id": "farm_002",
                    "item_name": "Benih Padi Ciherang Bersertifikat 30kg",
                    "amount": 450000.0,
                    "category": "BENIH_BIBIT",
                    "source": "MANUAL",
                    "order_ref_id": None,
                    "date": "16 Sep 2026, 10:00 WIB"
                }
            ],
            "created_at": "2026-09-16T09:00:00"
        }
    ],
    "service_orders": [
        {
            "id": "ord_trk_01",
            "service_id": "srv_001",
            "service_title": "Sewa Traktor Quick Kubota (Bajak & Garu)",
            "seller_id": "usr_traktor",
            "seller_name": "Mas Bambang",
            "buyer_id": "usr_petani",
            "buyer_name": "Pak Joko",
            "quantity": 0.8,
            "unit": "/ Hektar",
            "unit_price": 1200000.0,
            "total_price": 960000.0,
            "payment_method": "COD / Bayar Saat Pengerjaan",
            "delivery_notes": "Mohon dikerjakan mulai jam 07.00 pagi di Sawah Blok Krajan",
            "status": "SELESAI",
            "created_at": "18 Sep 2026, 09:30 WIB"
        }
    ],
    "notifications": [
        {
            "id": "notif_001",
            "user_id": "usr_traktor",
            "title": "Pesanan Jasa Baru Masuk! 🚜",
            "message": "Pak Joko memesan Jasa Sewa Traktor Quick 0.8 Ha (Rp 960.000) di Blok Krajan.",
            "type": "ORDER_RECEIVED",
            "reference_id": "ord_trk_01",
            "is_read": False,
            "created_at": "18 Sep 2026, 09:30 WIB"
        },
        {
            "id": "notif_002",
            "user_id": "usr_petani",
            "title": "Pengikut Baru! 👤",
            "message": "Mang Udin mulai mengikuti profil usahatani Anda.",
            "type": "NEW_FOLLOWER",
            "reference_id": "usr_cangkul",
            "is_read": False,
            "created_at": "20 Sep 2026, 11:20 WIB"
        },
        {
            "id": "notif_003",
            "user_id": "usr_petani",
            "title": "Komentar Baru di Postingan! 💬",
            "message": "Ibu Ratna mengomentari: 'Pak Joko, stok bakterisida tembaga di kios sudah ready ya...'",
            "type": "NEW_COMMENT",
            "reference_id": "post_002",
            "is_read": False,
            "created_at": "20 Sep 2026, 15:02 WIB"
        },
        {
            "id": "notif_004",
            "user_id": "usr_pengairan",
            "title": "Pengikut Baru! 👤",
            "message": "Pak Joko mulai mengikuti profil jasa pengairan Anda.",
            "type": "NEW_FOLLOWER",
            "reference_id": "usr_petani",
            "is_read": False,
            "created_at": "21 Sep 2026, 08:00 WIB"
        }
    ]
}

class DatabaseManager:
    def __init__(self):
        os.makedirs(DATA_DIR, exist_ok=True)
        if not os.path.exists(DB_FILE):
            self._save_raw(INITIAL_DATA)
        else:
            # Pastikan seluruh koleksi ekosistem sosial, farm_plans & services tersedia
            current = self._read_raw()
            modified = False
            for key in ["partners", "offers", "shop_products", "saprotan_orders", "market_listings", "community_posts", "farm_plans", "ecosystem_services", "farmlands", "service_orders", "notifications"]:
                if key not in current or (key in ["ecosystem_services", "farmlands", "notifications"] and not current[key]):
                    current[key] = INITIAL_DATA.get(key, [])
                    modified = True

            # Sinkronisasi user profiles terpisah
            existing_user_ids = {u.get("id") for u in current.get("users", [])}
            for u in INITIAL_DATA["users"]:
                if u["id"] not in existing_user_ids:
                    current.setdefault("users", []).append(u)
                    modified = True

            if modified:
                self._save_raw(current)


    def _read_raw(self) -> Dict[str, Any]:
        try:
            with open(DB_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return INITIAL_DATA

    def _save_raw(self, data: Dict[str, Any]):
        with open(DB_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

    def get_collection(self, collection_name: str) -> List[Dict[str, Any]]:
        data = self._read_raw()
        return data.get(collection_name, [])

    def insert(self, collection_name: str, item: Dict[str, Any]) -> Dict[str, Any]:
        data = self._read_raw()
        if "id" not in item:
            item["id"] = f"{collection_name[:3]}_{uuid.uuid4().hex[:8]}"
        if "created_at" not in item:
            item["created_at"] = datetime.now().isoformat()
        
        if collection_name not in data:
            data[collection_name] = []
        data[collection_name].append(item)
        self._save_raw(data)
        return item

    def update(self, collection_name: str, item_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        data = self._read_raw()
        items = data.get(collection_name, [])
        for idx, itm in enumerate(items):
            if itm.get("id") == item_id:
                itm.update(updates)
                itm["updated_at"] = datetime.now().isoformat()
                items[idx] = itm
                data[collection_name] = items
                self._save_raw(data)
                return itm
        return None

    def delete(self, collection_name: str, item_id: str) -> bool:
        data = self._read_raw()
        items = data.get(collection_name, [])
        initial_len = len(items)
        items = [i for i in items if i.get("id") != item_id]
        if len(items) < initial_len:
            data[collection_name] = items
            self._save_raw(data)
            return True
        return False

db = DatabaseManager()
