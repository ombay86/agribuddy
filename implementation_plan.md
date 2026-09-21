# Master Implementation Plan: AgriBuddy 🌾
**Platform Ekosistem Digital Pertanian Cerdas (Format Web Responsif & Interaktif)**

Dokumen ini merupakan rencana implementasi induk terpadu (*Master Implementation Plan*) yang memetakan seluruh arsitektur modul, komponen, endpoint API, dan alur integrasi sistem platform **AgriBuddy**.

---

## 1. Visi Arsitektur & Prinsip Desain Terkini

1. **Format Web Responsif (*Web-First & Mobile-Adaptive*):**
   - Menghilangkan batasan sempit mobile frame pada layar desktop monitor/laptop.
   - Menggunakan kontainer fleksibel `.web-viewport` dengan lebar hingga `max-w-7xl` (`1400px`).
   - Menyediakan bilah menu navigasi desktop modern di header ([HeaderBar.vue](file:///c:/Users/Asus/Documents/OMBAY/_PERSONAL_/Semester%207/STSI4440_CAPSTONE%20PROJECT/frontend/src/components/HeaderBar.vue)) dan menyembunyikan navigasi bawah pada layar besar (`md:hidden`).
2. **Paradigma *Ecosystem-First* (Warga Ekosistem Setara):**
   - Tidak ada pengotakan kaku antara petani dan penyedia jasa. Seluruh pengguna berinteraksi dalam satu pasar dan komunitas terpadu.
3. **Penyederhanaan 4 Menu Utama Navigasi:**
   - **Jejaring:** Linimasa sosial, kabar panen, like, komentar diskusi, dan profil warga tani.
   - **Monitoring:** Pusat kendali multi-lahan sawah, kolaborator bagi hasil (%), Rencana Tani AI & RAB otomatis, Buku Modal Lahan riil, Buku Tani (stok), Lumbung panen, dan pelacakan pesanan transaksi.
   - **Katalog:** Marketplace layanan ekosistem (sewa traktor, irigasi pompa, buruh tani, saprotan, pasca panen), in-app checkout, integrasi buku modal, manajemen pesanan penjual, dan tanya-jawab produk.
   - **Profil:** Identitas pengguna, pengelolaan pasang layanan mandiri (CRUD), portofolio, dan logout cepat.
4. **Komunikasi & Diskusi Interaktif:**
   - Obrolan transaksi dua arah antara pembeli dan penjual langsung di setiap kartu pesanan.
   - Utas tanya-jawab publik pada setiap produk katalog.
5. **Sistem Notifikasi Terpadu (In-App Notifications):**
   - Lonceng interaktif HeaderBar untuk segala jenis interaksi warga (pesanan baru, update status pengerjaan, chat transaksi, pertanyaan produk, komentar postingan, pengikut baru).

---

## 2. Struktur Modul & Rincian Komponen Sistem

```
STSI4440_CAPSTONE PROJECT/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth.py             # Profil Pengguna, Persona, & Follow User
│   │   │   ├── catalog.py          # Marketplace, Checkout, Pesanan Seller/Buyer, Chat Transaksi, & Tanya Jawab Produk
│   │   │   ├── farmlands.py        # Multi-Plot Sawah, Kolaborator Bagi Hasil (%), & Buku Modal Lahan
│   │   │   ├── farm_plan.py        # Rencana Tani AI & Kalkulator Modal Usahatani (RAB)
│   │   │   ├── social_market.py    # Feed Komunitas, Postingan, Like, & Komentar
│   │   │   ├── weather.py          # Cuaca Geolokasi & Anjuran Pengairan
│   │   │   ├── ai_diagnose.py      # Dokter Tani AI (Computer Vision Daun Padi)
│   │   │   ├── inventory.py        # Buku Tani (Stok Saprotan)
│   │   │   ├── harvest.py          # Lumbung Panen & Bursa Pasar
│   │   │   └── network.py          # Kemitraan & Penawaran Panen
│   │   ├── core/
│   │   │   ├── config.py           # Variabel Lingkungan & Pengaturan
│   │   │   └── database.py         # Persistence Layer JSON / MongoDB
│   │   ├── models/schemas.py       # Pydantic Schemas Data Model
│   │   ├── services/
│   │   │   ├── ai_service.py       # Computer Vision Classifier
│   │   │   ├── planner_service.py  # Algoritma Agronomis & Kalkulasi RAB
│   │   │   └── weather_service.py  # Rekomendasi Cuaca & Irigasi
│   │   └── main.py                 # FastAPI Inisialisasi & Router Assembly
│   ├── requirements.txt            # Dependensi Backend (FastAPI, Uvicorn, Pillow, dll)
│   └── data/local_db.json          # File Penyimpanan Data Persisten
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HeaderBar.vue              # Navbar Desktop, Lonceng Notifikasi, Profile Switcher
│   │   │   ├── BottomNav.vue              # Navigasi Mobile (md:hidden)
│   │   │   ├── OrderChatModal.vue         # Obrolan Langsung Transaksi (Chat Pembeli-Penjual)
│   │   │   ├── ProductDiscussionModal.vue # Forum Tanya-Jawab Publik Produk Katalog
│   │   │   ├── FarmlandMapPicker.vue      # Peta Koordinat Interaktif Leaflet Maps
│   │   │   └── UserProfileModal.vue       # Detail Profil & Portofolio Pengguna
│   │   ├── views/
│   │   │   ├── JejaringView.vue    # Feed Sosial Komunitas Tani
│   │   │   ├── MonitoringView.vue  # Multi-Lahan, Kolaborator Bagi Hasil, Stok, Lumbung, Transaksi
│   │   │   ├── RencanaTaniView.vue # Kalkulator Rencana Tani AI & RAB Fase Usahatani
│   │   │   ├── KatalogView.vue     # Marketplace Layanan, In-App Checkout, Pesanan Masuk Penjual
│   │   │   ├── ProfilView.vue      # Identitas Pengguna & Pasang Layanan Mandiri
│   │   │   ├── DokterTaniView.vue  # Scanner Foto Daun & Rekomendasi Obat AI
│   │   │   ├── BukuTaniView.vue    # Inventaris Saprotan (Quick + / -)
│   │   │   └── LumbungView.vue     # Stok Panen & Bursa Lelang
│   │   ├── services/
│   │   │   ├── api.ts              # HTTP Client & Definisi TypeScript Interfaces
│   │   │   └── userState.ts        # Reaktif State Persona & Pengguna Aktif
│   │   ├── router/index.ts         # Routing Navigasi
│   │   ├── style.css               # Tailwind Setup & Responsive Web Viewport
│   │   └── App.vue                 # Layout Shell Induk
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── .gitignore                      # Mengabaikan node_modules, dist, cache, .env
├── PRD_AgriTech_Capstone.md        # Dokumen Kebutuhan Produk (PRD) Terkini
├── ERD_AgriBuddy.md                # Entity Relationship Diagram (ERD) Mermaid
├── implementation_plan.md          # Dokumen Rencana Implementasi Master
├── run_app.bat                     # Skrip 1-Klik Jalankan Backend & Frontend
└── README.md                       # Panduan Lengkap Menjalankan & Demo Fitur
```

---

## 3. Rencana Alur Kerja & Endpoint API

### A. Modul Multi-Lahan Sawah & Kolaborator Bagi Hasil
* `GET /api/v1/farmlands?user_id={id}`: Mengambil daftar petak sawah pengguna.
* `POST /api/v1/farmlands`: Membuat petak sawah baru (luas, koordinat Leaflet/GPS, tanah, air).
* `POST /api/v1/farmlands/{id}/collaborators`: Menambah kolaborator pengelola dan persentase bagi hasil (%).
* `POST /api/v1/farmlands/{id}/expenses`: Mencatat pengeluaran modal ke Buku Modal Lahan.
* `GET /api/v1/farmlands/{id}/expenses`: Mengambil rekap pos pengeluaran modal lahan.

### B. Modul Rencana Tani AI & Kalkulator Modal
* `POST /api/v1/farm-plan/calculate`: AI mengalkulasi RAB, tahapan fase usahatani, kebutuhan benih/pupuk/pestisida, serta proyeksi panen dan laba bersih.
* `PATCH /api/v1/farm-plan/{id}/step`: Memperbarui status tahapan dan pencatatan biaya aktual.

### C. Modul Katalog Marketplace, In-App Checkout & Buku Modal
* `GET /api/v1/catalog/services`: Mengambil direktori layanan/produk pendukung usahatani.
* `POST /api/v1/catalog/services`: Pasang layanan baru oleh pengguna mandiri.
* `POST /api/v1/catalog/checkout`: Checkout pesanan jasa/produk in-app (COD, YARNEN, Transfer).
* `GET /api/v1/catalog/orders/seller`: Daftar pesanan masuk untuk penjual.
* `GET /api/v1/catalog/orders/buyer`: Riwayat pesanan usahatani untuk pembeli.
* `PATCH /api/v1/catalog/orders/{id}/status`: Penjual memperbarui status armada pengerjaan (*Diproses, Dikirim, Selesai, Stok Habis, Batal*) dengan catatan langsung untuk pembeli.

### D. Modul Diskusi Transaksi & Diskusi Produk
* `GET /api/v1/catalog/orders/{id}/messages`: Mengambil obrolan chat transaksi pesanan.
* `POST /api/v1/catalog/orders/{id}/messages`: Mengirim pesan chat koordinasi (memicu notifikasi `ORDER_DISCUSSION`).
* `GET /api/v1/catalog/services/{id}/discussions`: Utas tanya-jawab publik produk katalog.
* `POST /api/v1/catalog/services/{id}/discussions`: Mengajukan pertanyaan produk (memicu notifikasi `PRODUCT_DISCUSSION`).
* `POST /api/v1/catalog/services/{id}/discussions/{disc_id}/reply`: Penyedia layanan membalas pertanyaan.

### E. Modul Jejaring Sosial & Notifikasi Terpadu
* `GET /api/v1/social-market/posts`: Mengambil feed komunitas tani.
* `POST /api/v1/social-market/posts/{id}/comments`: Komentar diskusi feed (memicu `NEW_COMMENT`).
* `POST /api/v1/auth/users/{author_name}/toggle-follow`: Ikuti profil warga tani (memicu `NEW_FOLLOWER`).
* `GET /api/v1/catalog/notifications?user_id={id}`: Mengambil notifikasi lonceng header.
* `POST /api/v1/catalog/notifications/mark-all-read`: Menandai seluruh notifikasi dibaca.

---

## 4. Rencana Verifikasi & Standar Kualitas

1. **Automated Integration Testing:**
   - Skrip Python untuk memvalidasi alur end-to-end (Multi-Sawah, Kolaborator %, In-App Checkout, Buku Modal, Konfirmasi Penjual, Chat Transaksi, Tanya-Jawab Produk, Notifikasi).
2. **Kompilasi Frontend (Vite Build):**
   - Menjamin build lolos 100% tanpa error TypeScript dan tanpa warning duplikasi dependensi (`npm run build`).
3. **Ergonomi & Aksesibilitas:**
   - Tombol sentuh besar (*thumb-friendly*), warna kontras ramah kondisi terik lapangan, dan teks berbahasa Indonesia yang lugas dan mudah dimengerti petani.
4. **Manajemen Repositori Git:**
   - Seluruh perubahan tercatat bersih di branch `main` repositori GitHub [ombay86/agribuddy](https://github.com/ombay86/agribuddy).
