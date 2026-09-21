# Product Requirements Document (PRD)
## Proyek Capstone: "AgriBuddy" — Ekosistem Pendamping Petani Cerdas 🌾
**Dokumen Kebutuhan Produk & Arsitektur Sistem Terkini**

---

## 1. Ringkasan Eksekutif & Visi Produk

* **Nama Produk:** AgriBuddy
* **Jenis Platform:** Modern Responsive Web Application (Desktop, Laptop, Tablet, & Mobile Browser)
* **Visi Produk:** Menghadirkan ekosistem digital pertanian terpadu yang memberdayakan seluruh pelaku usahatani (pemilik sawah, penggarap, penyedia traktor, pengairan pompa, buruh tani, kios saprotan, hingga penggilingan padi) melalui perencanaan usahatani berbasis AI, kemitraan bagi hasil kolaboratif, marketplace layanan dengan in-app checkout, pelacakan transaksi real-time, dan ruang diskusi interaktif.
* **Paradigma Pengguna Baru (*Ecosystem-First*):** 
  Aplikasi tidak lagi mengelompokkan pengguna secara kaku menjadi petani, agen, atau distributor. Semua pengguna diposisikan setara sebagai **Warga Ekosistem AgriBuddy** dengan peran dan spesialisasi masing-masing (jasa cangkul, sewa traktor, irigasi pompa, penggilingan gabah, saprotan, dll.) yang dapat saling bertransaksi, berdiskusi, dan berkolaborasi.
* **Tech Stack:**
  * **Frontend:** Vue.js 3, Vite, TypeScript, Tailwind CSS, Lucide Icons, Leaflet Maps (OpenStreetMap).
  * **Backend API:** FastAPI (Python 3.10+), Pydantic v2, Uvicorn.
  * **Database & Persistence:** Schemaless Persistence Layer (JSON / MongoDB-ready collections).
  * **AI & Machine Learning:** Agronomic Decision Engine (Kalkulasi Rencana Anggaran Biaya, Kondisi Tanah, Cuaca, dan Air) & Computer Vision Diagnosis Daun Padi (PyTorch / CNN Classifier).

---

## 2. Analisis Pengguna & Skenario Ekosistem

### A. Persona Ekosistem Tani
1. **Pak Joko (Petani Pemilik Sawah):**
   * Mengelola beberapa petak sawah (misal: Sawah Blok Krajan 0.8 Ha & Sawah Blok Timur 1.2 Ha).
   * Membutuhkan kalkulasi otomatis kebutuhan modal tanam, pupuk, dan jadwal kerja berdasarkan luas lahan.
   * Bermitra dengan penggarap lokal dan membutuhkan pembagian persentase bagi hasil panen yang transparan.
   * Membutuhkan kemudahan memesan jasa olah tanah traktor dan buruh tanam langsung dari aplikasi.
2. **Mas Bambang (Penyedia Jasa Traktor & Olah Tanah):**
   * Memiliki traktor roda dua (Quick Kubota) dan siap melayani pembajakan sawah di sekitar desa.
   * Mengiklankan jasanya di katalog marketplace dengan tarif per hektar.
   * Menerima notifikasi pesanan masuk, mengonfirmasi status keberangkatan armada ke sawah, serta berkoordinasi langsung dengan pemesan melalui chat transaksi.
3. **Pak Slamet (Jasa Pengairan & Pompa Irigasi):**
   * Menyediakan pompa alkon diesel dan selang buang untuk sawah tadah hujan.
   * Menjawab tanya-jawab teknis calon pelanggan di kolom diskusi produk sebelum disewa.
4. **Warga Komunitas Tani (Buruh Tanam, Kios KPL, Pengepul):**
   * Berbagi kabar perkembangan panen dan foto sawah di linimasa (feed), saling menyukai, berkomentar, dan menjalin kemitraan bagi hasil.

---

## 3. Struktur Navigasi & Format Web Responsif

Sesuai penyederhanaan arsitektur informasi terbaru, aplikasi mengusung **4 Menu Utama**:

```
[ AgriBuddy Web Application (Max-W 7xl Responsive) ]
   ├── Top Desktop Navbar (md:flex) / Bottom Nav Mobile (md:hidden)
   │
   ├── 1. JEJARING (Komunitas & Media Sosial Tani)
   │     ├── Feed Aktivitas Warga (Postingan, Foto, Like, Komentar)
   │     ├── Profil Publik Warga & Fitur Follow / Pengikut
   │     └── Notifikasi Pengikut Baru & Komentar
   │
   ├── 2. MONITORING (Pusat Kendali Usahatani)
   │     ├── Sub-tab 1: Sawah & AI
   │     │     ├── Manajemen Multi-Lahan Sawah (Pilih & Tambah Petak)
   │     │     ├── Peta Koordinat Interaktif (Leaflet Map & GPS Auto-Locate)
   │     │     ├── Tim Kolaborator & Pembagian Hasil Panen (%)
   │     │     ├── Rencana Tani AI & Kalkulator Modal Produksi (RAB)
   │     │     └── Buku Modal Lahan (Pencatatan Biaya Riil Lahan)
   │     ├── Sub-tab 2: Stok (Buku Tani Inventaris Saprotan)
   │     ├── Sub-tab 3: Lumbung (Stok Panen & Bursa Lelang)
   │     └── Sub-tab 4: Transaksi (Live Tracking Pesanan Jasa & Chat Penjual)
   │
   ├── 3. KATALOG (Marketplace Layanan & Produk Ekosistem)
   │     ├── Jelajah Layanan: Traktor, Pompa, Buruh Cangkul, Pupuk, Penggilingan
   │     ├── Fitur Diskusi & Tanya Jawab Publik Produk
   │     ├── In-App Checkout (COD, YARNEN/Pasca-Panen, Transfer Bank)
   │     ├── Prompt Otomatis Pasca-Checkout: Masukkan ke Buku Modal Lahan
   │     └── Tab "Pesanan Masuk" Seller (Konfirmasi Status Armada + Chat Pembeli)
   │
   └── 4. PROFIL (Identitas Saya & Pasang Layanan)
         ├── Informasi Identitas Pengguna & Switcher Akun Cepat
         ├── Pasang & Kelola Layanan Saya (CRUD Katalog)
         └── Tombol Keluar (Logout)
```

---

## 4. Spesifikasi Modul & Kebutuhan Fungsional (FR)

### FR-01: Format Web Responsif & Bilah Navigasi Terpadu
* **Deskripsi:** Aplikasi tampil optimal di berbagai dimensi layar tanpa batasan lebar sempit.
* **Fitur Utama:**
  * Di layar desktop/laptop (`md:` ke atas): bilah navigasi utama bertengger di bagian atas ([HeaderBar.vue](file:///c:/Users/Asus/Documents/OMBAY/_PERSONAL_/Semester%207/STSI4440_CAPSTONE%20PROJECT/frontend/src/components/HeaderBar.vue)), menyajikan tautan langsung ke Jejaring, Monitoring, Katalog, dan Profil. Bottom navigation otomatis disembunyikan.
  * Di layar smartphone: [BottomNav.vue](file:///c:/Users/Asus/Documents/OMBAY/_PERSONAL_/Semester%207/STSI4440_CAPSTONE%20PROJECT/frontend/src/components/BottomNav.vue) aktif untuk memudahkan sentuhan jempol tangan.
  * Sistem grid adaptif multi-kolom (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) pada kartu layanan, pesanan, dan pemantauan.

### FR-02: Jejaring Sosial & Komunitas Ekosistem
* **Deskripsi:** Ruang interaksi antarwarga ekosistem tani untuk berbagi ilmu, perkembangan tanaman, dan kemitraan.
* **Fitur Utama:**
  * Pembuatan postingan teks dan foto kondisi sawah terkini.
  * Reaksi suka (*Like*) dan utas komentar publik.
  * Tombol *Follow / Ikuti* pada profil warga tani lain.
  * Notifikasi in-app instan untuk komentar baru (`NEW_COMMENT`) dan pengikut baru (`NEW_FOLLOWER`).

### FR-03: Rencana Tani AI & Kalkulator Modal Usahatani
* **Deskripsi:** Cukup memasukkan luas lahan (atau deteksi via GPS/peta), AI mengalkulasi seluruh proses usahatani dengan mempertimbangkan tanah, cuaca, dan air.
* **Fitur Utama:**
  * **Integrasi GPS & Leaflet Map Picker:** Mendeteksi posisi pengguna secara otomatis dan menyediakan pin peta untuk mengambil koordinat presisi petak sawah.
  * **Kalkulasi Agronomis Otomatis:**
    * Perhitungan kebutuhan benih, pupuk dasar, pupuk susulan 1 & 2, dan obat pengendali OPT.
    * Rencana Anggaran Biaya (RAB) per fase tanam (Olah tanah, semai, tanam, perawatan, panen).
    * Estimasi tonase hasil panen (kuintal/ton) dan proyeksi penerimaan laba bersih (Rp).
  * **Timeline Interaktif:** Petani dapat memperbarui status pengerjaan tahapan (*Belum, Sedang Berjalan, Selesai*) beserta pencatatan biaya aktual.

### FR-04: Manajemen Multi-Lahan Sawah & Kolaborator Bagi Hasil
* **Deskripsi:** Mengakomodasi petani yang menggarap lebih dari satu petak sawah dan bekerja sama dengan mitra bagi hasil.
* **Fitur Utama:**
  * **Multi-Plot Management:** Beralih antarpetak sawah (misal: Sawah Blok Krajan vs Sawah Blok Timur) dengan parameter agronomis yang independen.
  * **Kolaborator Bagi Hasil (%):**
    * Menentukan anggota pengelola (Pemilik Lahan, Penggarap Utama, Buruh Cangkul, dsb.) beserta persentase pembagian hasil (misal: 60% : 40%).
    * Visualisasi progress bar multi-warna proporsi kepemilikan hasil.
    * Kalkulasi estimasi rupiah nominal yang akan diterima masing-masing kolaborator berdasarkan proyeksi panen AI.
  * **Buku Modal Lahan:** Buku kas pengeluaran modal per petak sawah yang menampung transaksi marketplace maupun input manual lapangan.

### FR-05: Katalog Marketplace & In-App Checkout
* **Deskripsi:** Pusat pencarian dan penyewaan layanan usahatani serta saprotan pendukung.
* **Fitur Utama:**
  * Filter kategori: *Olah Tanah & Traktor, Pompa & Irigasi, Cangkul & Tanam, Pupuk & Benih, Bursa Panen, Penggilingan Padi*.
  * Pasang layanan mandiri bagi setiap pengguna (tarif, satuan, lokasi, deskripsi, nomor kontak).
  * **In-App Checkout:** Pemesanan instan dalam aplikasi dengan rincian kuantitas, total biaya kalkulasi otomatis, dan metode pembayaran (*COD, YARNEN / Bayar Panen, Transfer Bank / QRIS*).
  * **Konfirmasi Pasca-Checkout Buku Modal:** Muncul pop-up konfirmasi *"Apakah kamu ingin memasukkannya ke dalam buku modal?"* dengan pemilihan petak lahan sawah yang dibiayai.

### FR-06: Manajemen Pesanan Penjual & Live Tracking Pembeli
* **Deskripsi:** Sinkronisasi status pengerjaan pesanan antara penjual jasa dan pembeli.
* **Fitur Utama:**
  * **Tab Pesanan Masuk (Seller):**
    * Indikator counter badge merah berkedip saat ada pesanan baru menunggu konfirmasi.
    * Modal konfirmasi status oleh penjual:
      * 🚜 *DIPROSES (Konfirmasi & Mulai Proses)*
      * 🚚 *SEDANG_DIKIRIM (Mulai Dikirim / Berangkat ke Lahan)*
      * ✅ *SELESAI (Pesanan Selesai / Tuntas)*
      * ⚠️ *STOK_HABIS (Stok Habis / Jadwal Penuh)*
      * ❌ *DIBATALKAN (Tolak / Batalkan Pesanan)*
    * Input catatan penjelasan langsung untuk pembeli (misal: jadwal jam tiba armada traktor).
  * **Live Tracking Pembeli (Monitoring -> Transaksi):**
    * Pemantauan status pesanan real-time dengan badge warna dan kotak catatan resmi dari penjual.

### FR-07: Fitur Diskusi Pesanan (Chat Transaksi) & Diskusi Produk
* **Deskripsi:** Saluran komunikasi langsung untuk koordinasi transaksi dan tanya jawab produk.
* **Fitur Utama:**
  * **Diskusi Pesanan / Chat Transaksi:**
    * Tombol obrolan langsung pada kartu pesanan pembeli maupun penjual.
    * Gelembung pesan percakapan (*chat bubbles*) dengan pembeda warna pengirim, label peran (*Penyedia Jasa* vs *Pembeli*), waktu kirim, dan auto-scroll.
    * Memicu notifikasi in-app `ORDER_DISCUSSION` ke lawan transaksi.
  * **Diskusi Produk di Katalog:**
    * Utas tanya jawab publik pada setiap item katalog.
    * Petani dapat bertanya spesifikasi produk dan penyedia dapat memberikan jawaban resmi.
    * Memicu notifikasi in-app `PRODUCT_DISCUSSION` ke pemilik layanan.

### FR-08: Sistem Notifikasi Universal
* **Deskripsi:** Pusat pemberitahuan aktivitas pengguna yang terintegrasi pada lonceng HeaderBar.
* **Tipe Notifikasi:**
  * `ORDER_RECEIVED`: Pesanan baru masuk ke akun penjual.
  * `ORDER_STATUS`: Konfirmasi status pesanan dan catatan penjual diterima oleh pembeli.
  * `ORDER_DISCUSSION`: Pesan baru dalam obrolan transaksi.
  * `PRODUCT_DISCUSSION`: Pertanyaan baru pada produk layanan.
  * `NEW_COMMENT`: Komentar baru pada postingan feed jejaring.
  * `NEW_FOLLOWER`: Pengguna lain mulai mengikuti profil.

### FR-09: Dokter Tani AI (Diagnosis Daun Padi)
* **Deskripsi:** Modul Computer Vision untuk deteksi dini penyakit tanaman melalui foto daun.
* **Fitur Utama:**
  * Diagnosis otomatis: Hawar Daun Bakteri (Kresek), Blas Daun (Pyricularia), Bercak Coklat, dan Daun Sehat.
  * Menampilkan skor akurasi (*confidence score*), tingkat keparahan, dan anjuran dosis obat/penanganan.

---

## 5. Arsitektur Data Terkini (Collections Schema)

### 1. Collection: `users`
```json
{
  "id": "usr_petani",
  "username": "pak_joko",
  "full_name": "Pak Joko (Petani Padi)",
  "specialization": "Usahatani Padi Organik & Bibit Inpari",
  "village": "Desa Sukamaju, Kec. Megamendung",
  "phone_number": "081234567890",
  "avatar": "👨‍🌾",
  "followers_count": 28,
  "created_at": "2026-09-20T00:00:00Z"
}
```

### 2. Collection: `farmlands`
```json
{
  "id": "farm_001",
  "user_id": "usr_petani",
  "name": "Sawah Blok Krajan",
  "land_size_ha": 0.8,
  "commodity": "Padi Sawah Inpari 32",
  "soil_type": "Lempung Berliat (Subur)",
  "water_source": "Irigasi Teknis Bendungan",
  "location": "Desa Sukamaju, Jawa Timur",
  "latitude": -7.2504,
  "longitude": 112.7512,
  "collaborators": [
    { "id": "col_1", "name": "Pak Joko", "role": "Pemilik Lahan", "share_percentage": 60.0 },
    { "id": "col_2", "name": "Mang Udin", "role": "Penggarap Lapangan", "share_percentage": 40.0 }
  ],
  "capital_expenses": [
    {
      "id": "exp_001",
      "item_name": "Sewa Traktor Quick Kubota (0.8 / Hektar)",
      "amount": 960000,
      "category": "OLAH_TANAH",
      "source": "MARKETPLACE",
      "order_ref_id": "ord_123",
      "date": "21 Sep 2026, 09:30 WIB"
    }
  ]
}
```

### 3. Collection: `ecosystem_services` (Katalog Marketplace)
```json
{
  "id": "srv_001",
  "provider_id": "usr_traktor",
  "provider_name": "Mas Bambang",
  "provider_badge": "Operator Traktor Handal",
  "provider_avatar": "🚜",
  "title": "Sewa Traktor Quick Kubota (Bajak & Garu)",
  "category": "JASA_TRAKTOR",
  "category_label": "Jasa Olah Tanah",
  "price": 1200000,
  "price_unit": "/ Hektar",
  "location": "Desa Sukamaju (Radius 5 km)",
  "phone": "628123456789",
  "description": "Siap bajak singkal, gelebeg, dan garu halus tanah sawah becek maupun tegalan.",
  "tags": ["Traktor", "OlahTanah", "BajakSawah"],
  "is_available": true
}
```

### 4. Collection: `service_orders`
```json
{
  "id": "ord_20dfbddd",
  "service_id": "srv_001",
  "service_title": "Sewa Traktor Quick Kubota (Bajak & Garu)",
  "seller_id": "usr_traktor",
  "seller_name": "Mas Bambang",
  "buyer_id": "usr_petani",
  "buyer_name": "Pak Joko (Petani Padi)",
  "quantity": 1.0,
  "unit": "/ Hektar",
  "unit_price": 1200000,
  "total_price": 1200000,
  "payment_method": "COD / Bayar Saat Pengerjaan",
  "delivery_notes": "Sawah Blok Krajan dekat saung, tolong Sabtu pagi.",
  "status": "SEDANG_DIKIRIM",
  "seller_notes": "Traktor sudah berangkat menuju sawah Pak Joko!",
  "created_at": "21 Sep 2026, 09:47 WIB",
  "status_updated_at": "21 Sep 2026, 09:48 WIB"
}
```

### 5. Collection: `order_messages` (Diskusi Transaksi)
```json
{
  "id": "msg_01",
  "order_id": "ord_20dfbddd",
  "sender_id": "usr_petani",
  "sender_name": "Pak Joko",
  "sender_role": "PEMBELI",
  "message": "Halo Mas Bambang, saya tunggu Sabtu jam 07.00 ya!",
  "created_at": "21 Sep 2026, 09:50 WIB"
}
```

### 6. Collection: `product_discussions` (Tanya Jawab Produk)
```json
{
  "id": "disc_01",
  "service_id": "srv_001",
  "user_id": "usr_petani",
  "user_name": "Pak Joko",
  "user_avatar": "🌾",
  "question": "Apakah traktor bisa masuk galengan sempit 80cm?",
  "reply": "Bisa Pak Joko, roda traktor quick kami bisa diatur sempit.",
  "replied_by": "Mas Bambang (Penyedia Jasa)",
  "replied_at": "21 Sep 2026, 09:52 WIB",
  "created_at": "21 Sep 2026, 09:51 WIB"
}
```

### 7. Collection: `notifications`
```json
{
  "id": "notif_01",
  "user_id": "usr_petani",
  "title": "Pesanan Mulai Dikirim / Berangkat 🚚",
  "message": "Mas Bambang mengonfirmasi pesanan Sewa Traktor: [SEDANG_DIKIRIM]. Catatan: \"Traktor sudah berangkat!\"",
  "type": "ORDER_STATUS",
  "reference_id": "ord_20dfbddd",
  "is_read": false,
  "created_at": "21 Sep 2026, 09:48 WIB"
}
```

---

## 6. Kebutuhan Non-Fungsional (NFR)

1. **Responsivitas Format Web:**
   - Waktu muat awal (*First Contentful Paint*) di bawah **1,5 detik**.
   - Layout responsif fleksibel dari resolusi 360px (mobile) hingga 1920px (desktop monitor) tanpa pemotongan teks atau tombol tersembunyi.
2. **Ketersediaan Offline Ringan & Ketahanan Jaringan:**
   - Cache lokal state pengguna dan data sawah di sisi klien browser (*Client-side reactive state*) sehingga tidak kehilangan form input jika jaringan seluler di sawah melemah.
3. **Usabilitas Desain Antarmuka (*Ergonomics*):**
   - Menggunakan prinsip *Farmer-First Design*: tombol sentuh besar (*thumb-friendly*), teks berbobot tebal (*font-black*), kontras tinggi, serta indikator visual emoji dan status berwarna cerah.
4. **Keamanan Data Transaksi:**
   - Validasi data input ketat menggunakan skema Pydantic v2 di seluruh endpoint API.

---

## 7. Matriks Pembagian Kerja Tim Capstone (RACI)

| Anggota Tim | Peran Spesifik | Tanggung Jawab Utama Terverifikasi |
| :--- | :--- | :--- |
| **Anggota 1** | **Frontend Web & UI/UX Lead** | - Mengembangkan antarmuka Vue 3 + Tailwind CSS untuk 4 menu utama (*Jejaring, Monitoring, Katalog, Profil*).<br>- Membangun komponen responsif desktop navbar & bottom nav mobile.<br>- Membangun dialog obrolan transaksi (`OrderChatModal`) dan diskusi produk (`ProductDiscussionModal`). |
| **Anggota 2** | **Backend & Database Architect** | - Membangun REST API FastAPI terstruktur untuk modul farmlands, catalog, checkout, notifications, dan discussion thread.<br>- Mendesain skema data Pydantic v2 dan relasi koleksi data database.<br>- Menguji endpoint via Swagger UI (`/docs`) dan skrip integrasi otomatis. |
| **Anggota 3** | **AI & Agronomic System Engineer** | - Mengembangkan algoritma perhitungan Rencana Tani AI & RAB berdasarkan kondisi tanah, cuaca, dan luas lahan.<br>- Membangun modul computer vision Dokter Tani AI untuk deteksi penyakit daun padi.<br>- Integrasi peta koordinat Leaflet Maps dan API cuaca geolokasi. |
| **Anggota 4** | **Product Lead, QA & DevOps** | - Menyusun dan memperbarui dokumen PRD Capstone sesuai arahan dosen/stakeholder.<br>- Menjalankan pengujian otomatis (*End-to-End Integration Testing*).<br>- Mengelola repositori Git ([ombay86/agribuddy](https://github.com/ombay86/agribuddy)), deployment, dan penyusunan laporan akhir tugas akhir. |

---

## 8. Status Implementasi & Verifikasi

Seluruh kebutuhan fungsional yang tertuang dalam PRD ini telah **selesai diimplementasikan dan diverifikasi 100%**:
* ✅ Backend API FastAPI berjalan stabil pada port `8000`.
* ✅ Frontend Vue 3 berjalan responsif pada port `5173` dengan build tanpa error.
* ✅ Pengujian otomatis skrip integrasi (Multi-Lahan, Kolaborator Bagi Hasil, In-App Checkout, Buku Modal, Live Status Seller, Obrolan Transaksi, dan Diskusi Produk) lulus dengan status `ALL TESTS PASSED`.
* ✅ Seluruh source code tersinkronisasi dan ter-deploy di branch `main` repositori GitHub [ombay86/agribuddy](https://github.com/ombay86/agribuddy).
