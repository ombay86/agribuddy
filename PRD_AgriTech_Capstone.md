# Product Requirements Document (PRD)
## Proyek Capstone: "AgriBuddy" — Smart Farming Decision Support System 🌾
**Dokumen Kebutuhan Produk & Arsitektur Sistem Terkini (Versi 2.0)**

---

## 1. Ringkasan Eksekutif & Visi Produk

* **Nama Produk:** AgriBuddy
* **Jenis Platform:** Modern Responsive Web Application (Desktop, Laptop, Tablet, & Mobile Browser)
* **Visi Produk:** Menghadirkan platform *Smart Farming Decision Support System (DSS)* terpadu pendamping petani padi untuk manajemen petak lahan geospasial, perencanaan anggaran biaya dan jadwal tanam berbasis AI (Smart Farm Planner), deteksi dini fitopatologi daun padi berbasis Computer Vision (**Google Gemini 1.5 Flash Multimodal Vision**), pencatatan inventaris sarana produksi dan hasil panen di lumbung (Buku Tani), serta direktori kemitraan layanan mekanisasi dan kios saprotan desa.
* **Fokus Riset Tugas Akhir / Capstone (STSI4440):** 
  Aplikasi difokuskan murni pada keunggulan ilmiah *Decision Support System (DSS)* dan *Artificial Intelligence (AI)* dalam membantu pengambilan keputusan budidaya padi oleh petani, menghilangkan fitur sekunder yang redundan (seperti media sosial umum dan bursa lelang bidding) demi menjaga ketajaman ruang lingkup penelitian dan keandalan sistem saat sidang pengujian.
* **Tech Stack Terkini:**
  * **Frontend:** Vue.js 3, Vite, TypeScript, Tailwind CSS, Lucide Icons, Leaflet Maps (OpenStreetMap).
  * **Backend API:** Node.js (v24+), Express.js, TypeScript.
  * **Database & Persistence:** File-based JSON Persistence Engine (`local_db.json`).
  * **AI & Machine Learning Engine:**
    * **Google Gemini API** (`@google/genai` model `gemini-1.5-flash` multimodal vision) untuk analisis penyakit daun padi.
    * **Smart Agronomic Planner Engine** untuk kalkulasi Rencana Anggaran Biaya (RAB), tahapan budidaya (HST), prakiraan cuaca, dan rekomendasi irigasi.

---

## 2. Analisis Pengguna & Skenario Usahatani

### A. Persona Pengguna Utama
* **Pak Joko (Petani Padi Mandiri):**
  * Mengelola petak sawah irigasi teknis di Desa Sukamaju (Sawah Blok Krajan 0.8 Ha & Sawah Blok Timur 1.2 Ha).
  * Menghadapi ketidakpastian biaya modal budidaya, risiko serangan hama/penyakit kresek di musim hujan, serta keterbatasan pencatatan stok pupuk dan tonase panen.
  * Membutuhkan sistem yang dapat:
    1. Mengalkulasi estimasi biaya modal usahatani secara presisi berdasarkan luas lahan dan prakiraan cuaca lokal.
    2. Memberikan diagnosa instan saat daun padi menguning atau berbintik bercak jamur melalui foto kamera smartphone.
    3. Mengelola stok pupuk subsidi / benih di gudang dan mencatat hasil panen gabah di lumbung.
    4. Menghubungi penyedia jasa olah tanah traktor terdekat atau kios saprotan secara mudah via WhatsApp.

---

## 3. Struktur Navigasi & Arsitektur Informasi

Sesuai penyederhanaan arsitektur informasi terkini, platform mengusung **5 Modul Utama** yang terstruktur secara ergonomis:

```
[ AgriBuddy Web Application (Desktop Sidebar & Mobile Bottom Nav) ]
   │
   ├── 1. MONITORING SAWAH (Beranda Utama - /)
   │     ├── Dashboard Cuaca GPS Real-Time (Suhu, Kelembaban, Peluang Hujan)
   │     ├── Rekomendasi Pengairan & Irigasi Cerdas Berbasis Cuaca
   │     ├── Manajemen Multi-Lahan Sawah (Peta Leaflet GIS & Detail Petak)
   │     ├── Buku Modal Lahan (Pencatatan Biaya Riil Usahatani)
   │     └── Ringkasan Status Rencana Tani AI Aktif
   │
   ├── 2. RENCANA TANI AI (Smart Farm Planner - /rencana)
   │     ├── Input Parameter Lahan (Luas Ha, Komoditas, Tanah, Sumber Air)
   │     ├── Kalkulasi Rencana Anggaran Biaya (RAB) 12 Item Riil
   │     ├── Linimasa 5 Fase Budidaya (HST) dengan AI Agronomy Tips
   │     └── Proyeksi Finansial: HPP/kg, Estimasi Hasil Panen, Laba Bersih, & ROI (%)
   │
   ├── 3. DOKTER TANI AI (Gemini Multimodal Vision - /dokter)
   │     ├── Unggah Foto Daun Padi / Pilihan Sampel Uji Cepat
   │     ├── Inferensi Google Gemini 1.5 Flash Vision Multimodal
   │     ├── Output: Nama Penyakit, Akurasi (%), Tingkat Keparahan, Gejala, & Solusi
   │     └── Riwayat Diagnosa Lab Pertanian
   │
   ├── 4. BUKU TANI (Gudang & Lumbung - /buku-tani)
   │     ├── Tab 1: Gudang Saprotan (Stok Pupuk, Benih, Obat + Quick Adjust + Low Stock Alert)
   │     └── Tab 2: Lumbung Panen (Catatan Tonase Gabah GKP/GKG & Pantauan Harga Pasar)
   │
   ├── 5. DIREKTORI LAYANAN EKOSISTEM (/layanan)
   │     ├── Direktori Jasa Traktor, Pompa Irigasi, Buruh Tanam, Kios Pupuk, & Penggilingan
   │     ├── Filter Kategori Cepat & Pencarian Kata Kunci
   │     ├── Kartu Informasi Tarif & Spesifikasi Layanan
   │     ├── Tombol Aksi Langsung: "Hubungi via WhatsApp" (Pesan Otomatis)
   │     └── Form Pasang Layanan Mandiri
   │
   └── 6. PROFIL PETANI MANDIRI (/profil)
         ├── Informasi Usahatani Pengguna (Pak Joko)
         └── Tombol Keluar Akun (Logout)
```

---

## 4. Spesifikasi Modul & Kebutuhan Fungsional (FR)

### FR-01: Monitoring Sawah & Cuaca Lahan Real-Time (Beranda)
* **Deskripsi:** Dasbor utama pemantauan iklim mikro sawah dan kondisi lahan geospasial petani.
* **Fitur Utama:**
  * Pengambilan telemetri cuaca terkini (suhu, kelembaban, probabilitas curah hujan).
  * Fitur *Auto-Detect GPS* untuk mendeteksi koordinat lintang & bujur sawah pengguna secara instan.
  * Rekomendasi irigasi cerdas: Menganjurkan penyiraman atau penundaan pengairan secara otomatis berdasarkan probabilitas hujan demi menghemat bahan bakar pompa dan tenaga kerja.
  * Visualisasi peta geospasial sawah interaktif berbasis Leaflet GIS dan OpenStreetMap.
  * Buku Modal Pengeluaran Lahan: Pencatatan pengeluaran riil per petak sawah.

### FR-02: Rencana Tani AI & Kalkulator Modal (Smart Farm Planner)
* **Deskripsi:** Sistem pendukung keputusan agronomi cerdas untuk perencanaan musim tanam yang terukur.
* **Fitur Utama:**
  * Kalkulasi Rencana Anggaran Biaya (RAB) 12 item kebutuhan riil usahatani (sewa traktor, buruh cangkul, benih bersertifikat, buruh tanam legowo, urea subsidi, NPK majemuk, pupuk organik, biaya air, obat pengendali hama, upah semprot, tenaga panen, karung angkut).
  * Penyesuaian dosis pupuk otomatis terhadap iklim: jika musim hujan tinggi, dosis urea otomatis diturunkan 15% untuk mencegah kerentanan penyakit kresek, dan penguatan pupuk Kalium ditingkatkan.
  * Jadwal budidaya 5 tahapan Hari Setelah Tanam (HST) dengan status pengerjaan (*SELESAI*, *SEDANG_BERJALAN*, *BELUM*) dan catatan biaya aktual riil.
  * Proyeksi finansial komprehensif: Harga Pokok Produksi (HPP) per kg, estimasi tonase hasil panen, proyeksi pendapatan kotor, laba bersih usahatani, dan rasio ROI (*Return on Investment*).

### FR-03: Dokter Tani AI — Fitopatologi Daun Padi (Gemini Vision)
* **Deskripsi:** Modul kecerdasan buatan visual untuk deteksi dini penyakit tanaman padi dari citra daun.
* **Fitur Utama:**
  * Integrasi resmi **Google Gemini API** (`@google/genai` model `gemini-1.5-flash`) untuk inferensi multimodal visual.
  * Klasifikasi kondisi daun padi:
    1. *Hawar Daun Bakteri (Kresek / Xanthomonas oryzae)*
    2. *Blas Daun (Pyricularia oryzae)*
    3. *Bercak Coklat (Helminthosporium oryzae)*
    4. *Daun Padi Sehat*
  * Output terstruktur: Nama penyakit lokal & ilmiah, skor keyakinan (*confidence score* 0.0 - 1.0), tingkat keparahan (*Aman/Sedang/Tinggi*), gejala klinis visual, dan langkah penanganan agronomi nyata (pengeringan petak, pengurangan urea, anjuran bakterisida/fungisida tembaga).
  * *Graceful Fallback Mechanism*: Otomatis beralih ke basis pengetahuan lokal Kementan & IRRI jika perangkat offline atau API key belum terpasang (*anti-crash & demo-ready*).
  * Tersedia sampel foto daun siap uji untuk kemudahan demonstrasi tanpa harus menyiapkan citra eksternal.

### FR-04: Buku Tani — Gudang Saprotan & Lumbung Panen
* **Deskripsi:** Pengelolaan logistik persediaan sarana produksi dan catatan hasil panen mandiri petani.
* **Fitur Utama:**
  * **Gudang Saprotan**: Pencatatan stok pupuk, benih, dan obat dengan tombol penyesuaian cepat (+ / - 1 unit) tanpa perlu form edit rumit.
  * Indikator peringatan stok menipis (*low-stock warning*) jika persediaan berada di bawah batas ambang aman.
  * **Lumbung Panen**: Pencatatan tonase hasil panen gabah (GKP/GKG), tanggal panen, lokasi petak asal, dan total akumulasi komoditas tersimpan.
  * Pantauan tren harga pasar komoditas daerah terkini (GKP, GKG, Beras Medium IR-64, Jagung Pipil) untuk membantu petani menentukan waktu jual terbaik.

### FR-05: Direktori Layanan & Kemitraan Ekosistem (WhatsApp Direct)
* **Deskripsi:** Direktori kontak penyedia jasa mekanisasi pertanian dan saprotan desa.
* **Fitur Utama:**
  * Katalog direktori mitra terverifikasi: Jasa Olah Tanah Traktor, Pompa Air Irigasi, Regu Buruh Tanam Legowo, Kios Saprotan Resmi KPL, dan Penggilingan Padi.
  * Filter kategori cepat dan pencarian kata kunci layanan.
  * Tombol aksi **"Hubungi via WhatsApp"** pada setiap kartu layanan yang secara otomatis membuka aplikasi WhatsApp dengan pesan terformat rapi (nama pemesan, jenis layanan, dan pertanyaan ketersediaan jadwal/stok).
  * Formulir mandiri bagi pengguna yang ingin mendaftarkan jasa usahataninya ke dalam direktori.

---

## 5. Kebutuhan Non-Fungsional (NFR)

* **NFR-01: Kinerja & Waktu Respon:** 
  Waktu muat awal halaman di bawah 2 detik. Inferensi diagnosa daun AI via Google Gemini API selesai dalam waktu kurang dari 3 detik pada koneksi internet standar.
* **NFR-02: Keandalan & Toleransi Kesalahan (*Graceful Degradation*):** 
  Sistem AI dilengkapi mesin fallback lokal berbasis aturan fitopatologi Kementan/IRRI sehingga sistem tetap dapat mendemonstrasikan diagnosa daun meskipun koneksi internet terputus di ruang sidang.
* **NFR-03: Kompatibilitas Antarmuka:** 
  Aplikasi 100% responsif pada layar laptop/desktop (resolusi 1366x768 s/d 1920x1080) dengan navigasi bilah samping (*Sidebar*), serta ramah sentuhan pada layar ponsel pintar dengan navigasi bawah (*Bottom Navigation*).
* **NFR-04: Portabilitas Data:** 
  Penyimpanan data lokal berbasis JSON (`local_db.json`) memungkinkan aplikasi dijalankan secara portabel tanpa memerlukan instalasi RDBMS server terpisah.

---

## 6. Matriks Pengujian & Kriteria Keberhasilan Capstone

| ID | Fitur yang Diuji | Skenario Pengujian | Hasil yang Diharapkan |
| :--- | :--- | :--- | :--- |
| **TC-01** | Autentikasi | Login dengan nomor telepon petani | Dashboard monitoring sawah terbuka langsung |
| **TC-02** | Cuaca & Irigasi | Deteksi GPS lokasi sawah | Data suhu, kelembaban, dan rekomendasi irigasi terupdate |
| **TC-03** | Rencana Tani AI | Input luas lahan 1.2 Ha pada sawah irigasi | RAB 12 item, jadwal 5 fase HST, dan kalkulasi laba/ROI tampil presisi |
| **TC-04** | Dokter Tani AI | Unggah citra daun padi bergejala kresek | Google Gemini API mengembalikan diagnosa Hawar Daun Bakteri beserta rekomendasi bakterisida tembaga |
| **TC-05** | Fallback Dokter Tani | Matikan koneksi internet & pilih sampel daun | Sistem lokal menampilkan diagnosa akurat tanpa menimbulkan *crash* |
| **TC-06** | Buku Tani | Atur stok pupuk dengan tombol (-) hingga di bawah batas | Indikator kuning "Menipis" muncul otomatis |
| **TC-07** | Direktori WhatsApp | Klik tombol "Hubungi via WhatsApp" pada jasa traktor | Tautan `https://wa.me/...` terbuka dengan template teks terisi lengkap |
