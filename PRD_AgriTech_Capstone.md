# Product Requirements Document (PRD)
## Proyek Capstone: "AgriBuddy" — Smart Farming Decision Support System 🌾
**Dokumen Kebutuhan Produk & Arsitektur Sistem Terkini (Versi 2.5 - Final Capstone Release)**

---

## 1. Ringkasan Eksekutif & Visi Produk

* **Nama Produk:** AgriBuddy
* **Jenis Platform:** Modern Responsive Progressive Web Application (Desktop, Laptop, Tablet, & Mobile Browser)
* **Visi Produk:** Menghadirkan platform *Smart Farming Decision Support System (DSS)* terpadu pendamping petani padi untuk manajemen petak lahan geospasial, perencanaan anggaran biaya dan jadwal tanam berbasis AI (Smart Farm Planner), kendali modal dan siklus budidaya interaktif, deteksi dini fitopatologi daun padi berbasis Computer Vision (**Google Gemini 2.5 Flash Multimodal Vision**), asisten tanya-jawab agronomi (Agri AI Chat), pencatatan inventaris sarana produksi dan hasil panen di lumbung yang terisolasi aman per akun usahatani (Buku Tani), serta direktori kemitraan layanan mekanisasi dan kios saprotan desa terhubung langsung via WhatsApp.
* **Fokus Riset Tugas Akhir / Capstone (STSI4440):** 
  Aplikasi difokuskan murni pada keunggulan ilmiah *Decision Support System (DSS)* dan *Artificial Intelligence (AI)* dalam membantu pengambilan keputusan budidaya padi oleh petani, menghilangkan fitur sekunder yang redundan demi menjaga ketajaman ruang lingkup penelitian dan keandalan sistem saat sidang pengujian.
* **Tech Stack Terkini:**
  * **Frontend:** Vue.js 3 (Composition API `<script setup>`), Vite, TypeScript, Tailwind CSS, Lucide Icons, Leaflet Maps (OpenStreetMap), SweetAlert2 (Desain Modal Konfirmasi & Notifikasi Interaktif Modern).
  * **Backend API:** Node.js (v20+ / v24+), Express.js, TypeScript.
  * **Database & Dual Persistence Engine:**
    * **Production (Cloud Coolify):** PostgreSQL Database (`agribuddy_records` table dengan JSONB storage dan schema indexing).
    * **Development / Offline:** File-based JSON Persistence Engine (`local_db.json`) dengan mekanisme *auto-seeding* ke PostgreSQL saat inisialisasi awal server.
  * **AI & Machine Learning Engine:**
    * **Google Gemini API** (`@google/genai` model `gemini-flash-latest` / Gemini 2.5 Flash Vision Multimodal) untuk analisis penyakit daun padi dan percakapan konsultasi interaktif.
    * **BYOK (Bring Your Own Key) Engine:** Mendukung pemasangan Gemini API Key pribadi per akun pengguna dari Google AI Studio untuk akses kuota gratis tanpa batas antrean.
    * **Smart Agronomic Planner Engine** untuk kalkulasi Rencana Anggaran Biaya (RAB), tahapan budidaya (HST), prakiraan cuaca, dan rekomendasi irigasi.

---

## 2. Analisis Pengguna & Multi-Persona Usahatani

AgriBuddy mendukung sistem autentikasi multi-peran dengan username unik (`@username`), nomor WhatsApp/telepon, kode PIN keamanan, dan avatar kustom. Terdapat **6 Persona Usahatani** terdaftar dalam ekosistem:

1. **Pak Joko (`@pak_joko` / `PETANI_MANDIRI`):**
   * Petani Padi Binaan Kelompok Tani Makmur di Desa Sukamaju.
   * Mengelola petak sawah irigasi teknis dengan varietas Padi Inpari 32.
   * Kebutuhan: Perencanaan biaya modal tanam (RAB), monitoring cuaca & irigasi, diagnosa penyakit daun via kamera, kontrol fase pengerjaan, dan pencatatan stok pupuk di gudang usahatani.

2. **Mas Bambang (`@bambang_traktor` / `JASA_TRAKTOR`):**
   * Pemilik Bengkel & Persewaan Traktor Quick Kubota di Sukamaju Krajan.
   * Kebutuhan: Terhubung dalam direktori layanan mekanisasi olah tanah, menerima order sewa bajak tanah via WhatsApp dari petani sekitar.

3. **Pak Slamet (`@slamet_irigasi` / `JASA_PENGAIRAN`):**
   * Pengelola Jasa Pompa Air Alkon 3 Inci dan sumur bor pantek sawah.
   * Kebutuhan: Menyediakan layanan pompanisasi saat musim kemarau dan menerima panggilan darurat pengairan sawah via WhatsApp.

4. **Mang Udin (`@udin_cangkul` / `JASA_CANGKUL`):**
   * Koordinator Regu Buruh Tanam Borongan & Tenaga Cangkul Galengan.
   * Kebutuhan: Mendapatkan order borongan olah pematang, pindah tanam jajar legowo, dan penyiangan gulma.

5. **Ibu Ratna (`@ratna_kios` / `KIOS_SAPROTAN`):**
   * Pengelola KPL Resmi Kios Tani Subur Makmur (Pasar Tradisional Sukamaju).
   * Kebutuhan: Menerima pesanan restock pupuk subsidi (Urea, NPK) dan benih bersertifikat dari petani via WhatsApp dengan konfirmasi instan.

6. **Bpk. Hendra Jaya (`@gilingan_hendra` / `PENGGILINGAN_PADI`):**
   * Pemilik Penggilingan Padi Sri Jaya (Sentra Penggilingan Km 3).
   * Kebutuhan: Penyerapan gabah hasil panen petani (GKP/GKG) dengan timbangan terkalibrasi dan armada jemput lumbung.

7. **Pengguna Baru / Petani Terdaftar Kustom (e.g. `@ombay`):**
   * Pengguna mandiri yang mendaftar akun baru dengan username unik, peran, nomor WhatsApp, dan PIN.
   * Memulai dengan **0 lahan** (tanpa pemaksaan lahan default). Menikmati isolasi data mandiri untuk gudang pupuk dan lumbung panen.

---

## 3. Struktur Navigasi & Arsitektur Informasi

Platform mengusung struktur ergonomis yang responsif penuh antara Desktop Sidebar dan Mobile Top/Bottom Bar:

```
[ AgriBuddy Modern Responsive Web Application ]
   │
   ├── 1. MONITORING USAHATANI (/ atau /monitoring)
   │     ├── Dashboard Cuaca GPS Real-Time (Suhu, Kelembaban, Curah Hujan, Kecepatan Angin)
   │     ├── Rekomendasi Irigasi & Pengairan Cerdas (Auto-Detect Cuaca & Hujan)
   │     ├── Peta Geospasial Sawah Interaktif (Leaflet GIS + OpenStreetMap Tile)
   │     ├── Ringkasan Kartu Cepat: Stok Saprotan & Lumbung Panen Akun Aktif
   │     └── Tugas Agronomi Harian Berdasarkan Fase Sawah Berjalan
   │
   ├── 2. KELOLA LAHAN (/rencana)
   │     ├── Sub-Mode 1: RENCANA TANI AI (Perencanaan Musim Tanam Baru)
   │     │     ├── Form Wizard 4 Langkah (Identitas Lahan, Luas Ha, Komoditas, Tanah, Sumber Air)
   │     │     ├── Kalkulasi Otomatis Rencana Anggaran Biaya (RAB) 12 Komponen Riil
   │     │     ├── Penyesuaian Dosis Pupuk Otomatis terhadap Iklim Mikro
   │     │     ├── Linimasa 5 Fase Budidaya (HST) dengan AI Agronomy Recommendations
   │     │     ├── Proyeksi Finansial: HPP/kg, Estimasi Tonase, Laba Bersih, & ROI (%)
   │     │     └── Aksi: Simpan Draf Rencana atau Langsung "Mulai Garap Sawah"
   │     │
   │     └── Sub-Mode 2: KONTROL TANAM & MODAL (Monitoring Siklus & Kas Riil)
   │           ├── Empty State (Jika 0 Lahan: "Kamu belum membuat lahan untuk diolah" + "Buat Sekarang")
   │           ├── Panel Kelola Lahan:
   │           │     ├── Pilihan Switcher Multi-Lahan
   │           │     ├── Modal Edit Lahan (Nama, Luas, Komoditas, Lokasi, Tgl Tanam)
   │           │     ├── Modal Hapus Lahan (Konfirmasi SweetAlert2 Danger & Pembersihan Cache)
   │           │     └── Modal Set Fase Lapangan (Fast-Track Mulai dari Tengah untuk Petani Konvensional)
   │           ├── Neraca Kendali Modal & Siklus Budidaya (Plafon RAB AI, Modal Terpakai, Sisa Modal, Progress Bar)
   │           ├── Tab Kiri: 5 Fase Interaktif (Dual Control: Checklist Tugas + Kontak Mitra WA)
   │           ├── Tab Kiri: Arus Kas Transaksi Riil (Pencatatan Beban Modal Usahatani)
   │           └── Panel Kanan: Kemitraan Usahatani (Kolaborator Bagi Hasil & Undangan Mitra)
   │
   ├── 3. DOKTER TANI AI (/dokter)
   │     ├── Mode 1: LAB DIAGNOSA DAUN (Computer Vision Multimodal)
   │     │     ├── Unggah Foto Daun Kamera / Pilih Sampel Uji Cepat Padi
   │     │     ├── Inferensi Google Gemini 2.5 Flash Vision Multimodal
   │     │     ├── Hasil Diagnosa: Nama Penyakit, Akurasi (%), Keparahan, Gejala, & Solusi Kementan/IRRI
   │     │     └── Riwayat Diagnosa Lab Pertanian
   │     │
   │     └── Mode 2: AGRI AI CHATBOT (Konsultasi Agronomi Interaktif)
   │           ├── Chat Tanya-Jawab AI Real-Time
   │           ├── Riwayat Sesi Obrolan & Tombol Obrolan Baru
   │           ├── 2 Contoh Pertanyaan Populer Ringkas 1 Baris (Hawar Daun & Wereng Coklat)
   │           └── Panduan Cepat Pasang Gemini API Key Pribadi (Tampil Utuh Tanpa Scroll)
   │
   ├── 4. BUKU TANI (/buku-tani) — Isolasi Ketat Per Akun
   │     ├── Tab 1: Gudang Saprotan
   │     │     ├── Inventaris Stok Pupuk, Benih, dan Obat Mandiri Petani
   │     │     ├── Tombol Penyesuaian Cepat (+ / - 1 Unit)
   │     │     ├── Indikator Peringatan Stok Menipis (Low-Stock Alert)
   │     │     ├── Tambah Item Saprotan Baru ke Gudang
   │     │     └── Modal Pesan Restock via WhatsApp ke Kios Mitra Resmi + Konfirmasi Barang Tiba
   │     │
   │     └── Tab 2: Lumbung Hasil Panen
   │           ├── Akumulasi Total Tonase Gabah Tersimpan (Ton & Kg)
   │           ├── Catatan Hasil Panen Sawah (Komoditas, Tanggal, Tonase, Status Simpan/Jual)
   │           ├── Formulir Catat Hasil Panen Baru
   │           └── Pantauan Tren Harga Pasar Komoditas Daerah Harian (GKP, GKG, Beras, Jagung)
   │
   ├── 5. DIREKTORI LAYANAN EKOSISTEM (/layanan)
   │     ├── Katalog Direktori Mitra: Jasa Traktor, Pompa Air, Regu Tanam, Kios Pupuk, Penggilingan
   │     ├── Filter Kategori Cepat & Pencarian Kata Kunci
   │     ├── Tombol Interaktif "Hubungi via WhatsApp" (Pesan Otomatis Terisi)
   │     └── Formulir Pasang Profil Layanan Mandiri bagi Mitra
   │
   └── 6. PROFIL PENGGUNA (/profil)
         ├── Identitas Petani, Username Unik (@username), Peran Usahatani, & Kontak
         ├── Unggah Foto Avatar Kustom & Ubah Username
         ├── Pengaturan Google Gemini API Key Pribadi (BYOK)
         └── Tombol Keluar Sistem (Logout)
```

---

## 4. Spesifikasi Modul & Kebutuhan Fungsional (FR)

### FR-01: Monitoring Usahatani & Telemetri Cuaca Real-Time (`/` atau `/monitoring`)
* **Deskripsi:** Dasbor utama pemantauan mikroklimat sawah dan status operasional usahatani.
* **Fitur Utama:**
  * Pengambilan telemetri cuaca terkini (suhu, kelembaban udara, probabilitas curah hujan harian, kecepatan angin).
  * Fitur *Auto-Detect GPS* untuk mendeteksi koordinat lintang & bujur sawah secara instan menggunakan sensor perangkat.
  * Rekomendasi irigasi cerdas otomatis: Menganjurkan penyiraman atau penundaan pengairan berdasarkan curah hujan untuk efisiensi pompa dan bahan bakar.
  * Visualisasi peta geospasial sawah interaktif berbasis Leaflet GIS dan OpenStreetMap Tile.
  * Switcher petak sawah aktif dengan integrasi tugas agronomi fase berjalan.

### FR-02: Kelola Lahan — Rencana Tani AI & Kontrol Tanam/Modal (`/rencana`)
* **Deskripsi:** Modul terintegrasi perencanaan usahatani cerdas berbasis AI dan pengendalian siklus budidaya riil di lapangan.
* **Fitur Utama:**
  * **Aturan Akun 0 Lahan:** Tidak ada pemaksaan atau auto-provisioning lahan default. Setiap akun boleh memiliki 0 lahan. Jika belum ada lahan aktif, sistem menyajikan *Empty State* elegan (*"Kamu belum membuat lahan untuk diolah."* + tombol *"Buat Sekarang"*).
  * **Smart Farm Planner (Wizard 4 Langkah):**
    * Input parameter: Nama petak sawah, luasan (Ha), komoditas utama (Padi Inpari 32, Ciherang, dll), karakteristik tanah, sumber air, dan koordinat peta.
    * Kalkulasi Rencana Anggaran Biaya (RAB) 12 item riil (sewa traktor, buruh cangkul, benih bersertifikat, buruh tanam legowo, urea subsidi, NPK majemuk, pupuk organik, biaya air, obat hama, upah semprot, tenaga panen, karung angkut).
    * Penyesuaian dosis pupuk cerdas iklim mikro (penurunan urea saat curah hujan tinggi untuk mencegah penyakit kresek).
    * Proyeksi finansial komprehensif: Harga Pokok Produksi (HPP/kg), estimasi tonase hasil panen, proyeksi omzet penjualan, estimasi laba bersih, dan rasio ROI (*Return on Investment*).
    * Opsi: Simpan sebagai Draf Perencanaan atau Langsung Aktifkan Menjadi Sawah Garap Aktif.
  * **Kontrol Tanam & Modal Usahatani:**
    * **Panel Kelola Lahan:**
      * Pilihan dropdown multi-lahan aktif.
      * Modal Edit Lahan: Ubah nama petak, luas hektar, komoditas, lokasi, dan tanggal tanam.
      * Modal Hapus Lahan: Menghapus lahan permanen dengan dialog konfirmasi SweetAlert2 bertema bahaya (*danger*) dan pembersihan cache/localStorage tuntas.
      * Modal Set Fase Lapangan (Fast-Track): Memfasilitasi petani konvensional yang baru bergabung namun proses di lapangan sudah berjalan (langsung melompat ke Fase 2 Tanam, Fase 3 Pemupukan, Fase 4 Proteksi, atau Fase 5 Panen; sistem otomatis menyesuaikan estimasi tanggal tanam dan menandai fase sebelumnya SELESAI).
    * **Neraca Kendali Modal & Siklus Budidaya:**
      * Menampilkan 3 kartu metrik: Plafon Anggaran RAB AI, Total Modal Terpakai (dari riwayat transaksi), dan Sisa Modal Tersedia.
      * Progress Bar persentase serapan modal dan indikator status arus kas (Aman / Waspada / Kritis).
    * **Dual Control (Fase & Arus Kas):**
      * Tab Fase: 5 tahapan budidaya interaktif dengan fitur checklist pengerjaan kegiatan (*tasks*), tips agronomi cerdas, status fase (SELESAI, SEDANG_BERJALAN, BELUM), tombol expand/collapse kartu, dan tautan kontak mitra WhatsApp terintegrasi per fase.
      * Tab Arus Kas: Buku kas pencatatan pengeluaran modal riil usahatani per petak sawah.
    * **Kemitraan Usahatani:** Kolaborator penggarap lahan dengan persentase bagi hasil, status undangan (ACTIVE / PENDING), dan notifikasi penerimaan/penolakan kolaborasi.

### FR-03: Dokter Tani AI — Gemini Multimodal Vision & Chatbot Konsultasi (`/dokter`)
* **Deskripsi:** Pusat diagnosis visual fitopatologi tanaman padi dan asisten tanya-jawab agronomi cerdas.
* **Fitur Utama:**
  * **Lab Diagnosa Daun (Computer Vision):**
    * Unggah citra daun padi via kamera smartphone / galeri file atau pilih sampel foto daun siap uji.
    * Inferensi multimodal resmi Google Gemini API (`@google/genai` model `gemini-flash-latest`).
    * Klasifikasi 4 kondisi tanaman: *Hawar Daun Bakteri (Kresek / Xanthomonas oryzae)*, *Blas Daun (Pyricularia oryzae)*, *Bercak Coklat (Helminthosporium oryzae)*, dan *Daun Padi Sehat*.
    * Output terstruktur: Nama penyakit lokal & ilmiah, skor keyakinan (*confidence score* 0.0 - 1.0), tingkat keparahan (*Aman/Sedang/Tinggi*), gejala klinis visual, dan langkah penanganan agronomi nyata (rekomendasi bakterisida tembaga, fungisida, dan tata kelola air).
    * *Graceful Offline Fallback*: Otomatis beralih ke basis pengetahuan lokal Kementan & IRRI jika perangkat offline atau API key belum terpasang.
  * **Agri AI Chatbot (Konsultasi Interaktif):**
    * Antarmuka chat interaktif untuk konsultasi agronomi, dosis pupuk, pengendalian wereng, dll.
    * Manajemen riwayat percakapan (`ai_chat_sessions`) dan tombol *Obrolan Baru*.
    * Dua contoh pertanyaan populer ringkas dalam 1 baris di layar awal.
    * **Panduan Cepat Pasang Gemini API Key:** Panduan 3 langkah visual (Buka AI Studio $\rightarrow$ Create Key $\rightarrow$ Pasang di Sini) dengan tombol aksi langsung yang didesain ringkas *above the fold* (langsung terlihat utuh tanpa tersembunyi scroll/overflow).

### FR-04: Buku Tani — Gudang Saprotan & Lumbung Panen (`/buku-tani`)
* **Deskripsi:** Pengelolaan logistik persediaan sarana produksi dan catatan hasil panen mandiri dengan isolasi data ketat per akun.
* **Fitur Utama:**
  * **Isolasi Data Ketat Per Akun:** Setiap akun pengguna (Pak Joko, Mas Bambang, atau pengguna kustom) hanya dapat melihat dan mengelola inventaris dan hasil panen miliknya sendiri. Tidak ada kebocoran data antar-akun.
  * **Gudang Saprotan:**
    * Pencatatan stok pupuk, benih, dan obat dengan tombol penyesuaian cepat (+ / - 1 unit).
    * Indikator peringatan stok menipis (*low-stock warning*) jika persediaan berada di bawah batas ambang aman.
    * Formulir tambah item saprotan baru.
    * Fitur **Pesan Restock via WhatsApp** ke toko mitra resmi (Ibu Ratna/KPL resmi Sukamaju): Menyusun teks pesanan otomatis ke WhatsApp dan menandai stiker status pesanan berjalan, serta tombol *Konfirmasi Barang Sampai* yang otomatis menambahkan kuantitas ke stok gudang.
  * **Lumbung Hasil Panen:**
    * Ringkasan akumulasi total tonase gabah tersimpan di lumbung (dalam satuan Ton dan Kg).
    * Catatan panen sawah: komoditas, total berat kg, tanggal panen, status (TERSIMPAN / TERJUAL_SEBAGIAN / TERJUAL_SEMUA), dan catatan lokasi penyimpanan.
    * Formulir pencatatan panen baru.
    * Pantauan tren harga pasar komoditas daerah harian (Gabah Kering Panen GKP, Gabah Kering Giling GKG, Beras Medium IR-64, Jagung Pipil) untuk membantu petani menentukan waktu jual terbaik.

### FR-05: Direktori Layanan & Ekosistem Usahatani (`/layanan`)
* **Deskripsi:** Direktori kontak penyedia jasa mekanisasi pertanian, tenaga kerja, dan saprotan desa.
* **Fitur Utama:**
  * Katalog direktori mitra terverifikasi: Jasa Olah Tanah Traktor, Pompa Air Irigasi, Regu Buruh Tanam Legowo, Kios Saprotan Resmi KPL, dan Penggilingan Padi.
  * Filter kategori cepat dan pencarian kata kunci layanan.
  * Tombol aksi **"Hubungi via WhatsApp"** pada setiap kartu layanan yang membuka aplikasi WhatsApp dengan pesan terformat rapi.
  * Formulir mandiri bagi pengguna untuk mendaftarkan jasa usahataninya ke dalam direktori.

### FR-06: Manajemen Akun & Personalisasi (`/profil` & `/login`)
* **Deskripsi:** Pengelolaan identitas pengguna, keamanan akun, dan preferensi AI.
* **Fitur Utama:**
  * Masuk cepat berbasis 6 Persona Usahatani atau login menggunakan Nomor Telepon/WhatsApp & PIN.
  * Pendaftaran akun baru dengan username unik (`@username`), validasi ketersediaan, nomor telepon, peran, dan PIN.
  * Personalisasi avatar kustom (unggah foto/kamera) dan perubahan username unik.
  * Pengaturan Google Gemini API Key pribadi (BYOK) per akun pengguna.

---

## 5. Kebutuhan Non-Fungsional (NFR)

* **NFR-01: Kinerja & Waktu Respon:** Waktu muat awal halaman di bawah 2 detik. Inferensi diagnosa daun AI via Google Gemini API selesai dalam waktu kurang dari 3 detik pada koneksi internet standar.
* **NFR-02: Keandalan & Toleransi Kesalahan (*Graceful Degradation*):** Sistem AI dilengkapi mesin fallback lokal berbasis aturan fitopatologi Kementan/IRRI sehingga sistem tetap dapat mendemonstrasikan diagnosa daun meskipun koneksi internet terputus di ruang sidang.
* **NFR-03: Desain UI/UX & Kompatibilitas Antarmuka:** Antarmuka responsif 100% pada semua ukuran layar (Mobile, Tablet, Desktop). Semua dialog konfirmasi menggunakan modal interaktif modern (SweetAlert2) untuk menghindari popup native browser yang kaku. Konten panduan cepat dirancang ergonomis *above the fold* tanpa terpotong overflow.
* **NFR-04: Keamanan & Isolasi Data (*Data Privacy*):** Basis data inventaris dan lumbung panen diisolasi ketat berdasarkan ID akun terautentikasi (`user_id`). Tidak ada kebocoran data silang antar-pengguna. Kunci API Gemini disimpan secara privat per akun pengguna.
* **NFR-05: Portabilitas & Ketahanan Data (Dual Persistence):** Mendukung persistensi ganda (PostgreSQL untuk deployment production di cloud dan JSON Engine lokal untuk pengujian luring/sidang).

---

## 6. Matriks Pengujian & Kriteria Keberhasilan Capstone

| ID | Fitur yang Diuji | Skenario Pengujian | Hasil yang Diharapkan |
| :--- | :--- | :--- | :--- |
| **TC-01** | Autentikasi & Multi-Persona | Login dengan Persona Mas Bambang atau Akun Baru | Profil berganti sesuai peran, avatar dan username terisolasi |
| **TC-02** | Cuaca & Irigasi GPS | Deteksi GPS lokasi sawah di Beranda | Data suhu, kelembaban, dan rekomendasi irigasi terupdate otomatis |
| **TC-03** | Rencana Tani AI | Input luas lahan 1.2 Ha pada sawah irigasi | RAB 12 item, linimasa 5 fase HST, dan proyeksi ROI tampil presisi |
| **TC-04** | Aturan 0 Lahan & Hapus Lahan | Buka akun baru tanpa lahan atau hapus lahan aktif satu-satunya | Menampilkan Empty State ("Kamu belum membuat lahan") tanpa membuat lahan otomatis |
| **TC-05** | Set Fase Lapangan (Fast-Track) | Pilih Fase 3 (Pemupukan) pada lahan konvensional | Lahan langsung melompat ke Fase 3, fase 1 & 2 berstatus SELESAI |
| **TC-06** | Dokter Tani AI | Unggah citra daun padi bergejala kresek | Google Gemini API mengembalikan diagnosa Hawar Daun Bakteri beserta rekomendasi penanganan |
| **TC-07** | Panduan Cepat API Key | Buka modul Dokter Tani pada layar HP | Panduan cepat 3 langkah langsung terlihat utuh tanpa terpotong scroll |
| **TC-08** | Isolasi Buku Tani | Login akun Mas Bambang setelah akun Pak Joko | Gudang Mas Bambang tampil kosong (tidak melihat stok milik Pak Joko) |
| **TC-09** | Restock WhatsApp Saprotan | Klik pesan restock pupuk ke Kios Ibu Ratna | Tautan WhatsApp terbuka dengan format pesanan dan stiker aktif terpasang |
| **TC-10** | Konfirmasi Barang Tiba | Klik konfirmasi pesanan pupuk telah sampai | Stok pupuk otomatis bertambah sesuai jumlah yang dipesan |
| **TC-11** | Direktori WhatsApp | Klik tombol "Hubungi via WhatsApp" pada jasa traktor | Tautan `https://wa.me/...` terbuka dengan template teks terisi lengkap |
