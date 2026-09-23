# AgriBuddy — Ekosistem Pendamping Petani Cerdas 🌾
**Capstone Project / Tugas Akhir STSI4440**

AgriBuddy adalah platform aplikasi web cerdas pendamping petani dan ekosistem pertanian untuk manajemen kondisi lahan, perencanaan usahatani berbasis AI, persediaan sarana produksi (Buku Tani), deteksi dini penyakit tanaman (Dokter Tani AI), katalog marketplace layanan usahatani, pencatatan hasil panen lumbung, serta ruang diskusi komunitas dan transaksi interaktif.

---

## 🚀 Cara Menjalankan Aplikasi (Satu Klik)

### Opsi 1: Menggunakan Skrip Otomatis (Rekomendasi)
Cukup klik dua kali file **`run_app.bat`** di direktori utama.
Skrip ini akan otomatis membuka:
1. **Backend Node.js & Gemini API:** [http://127.0.0.1:8000/](http://127.0.0.1:8000/) (API Status & Base Endpoint)
2. **Frontend Vue.js:** [http://localhost:5173](http://localhost:5173) (Aplikasi Web Responsif Desktop & Mobile)

---

### Opsi 2: Menjalankan Manual Lewat Terminal

#### 1. Backend (Node.js + Express + TypeScript + Gemini API)
```bash
cd backend
npm install
npm run dev
```
Base API Endpoint: `http://127.0.0.1:8000/api/v1`

#### 2. Frontend (Vue.js 3 + Vite + Tailwind CSS)
```bash
cd frontend
npm install
npm run dev
```
Buka aplikasi di browser: `http://localhost:5173`

---

## 🌟 Fitur Unggulan Platform AgriBuddy

1. **Format Web Responsif Modern**:
   - Layout lebar optimal untuk layar monitor laptop/PC dengan navigasi header desktop modern (*Jejaring, Monitoring, Katalog, Profil*).
   - Tetap adaptif dan ramah sentuhan (*touch-friendly*) jika dibuka dari smartphone/tablet dengan navigasi bawah (*Bottom Navigation*).

2. **Jejaring Sosial & Diskusi Komunitas Tani**:
   - Berbagi kabar perkembangan panen, foto sawah, like postingan, dan komentar diskusi antar warga ekosistem tani.
   - Fitur ikuti profil (*Follow user*) dan notifikasi pengikut baru.

3. **Rencana Tani AI & Kalkulator Modal Usahatani**:
   - Cukup masukkan luas petak lahan (atau deteksi otomatis via GPS / peta koordinat Leaflet), AI mengalkulasi Rencana Anggaran Biaya (RAB), jadwal timeline fase tanam, kondisi cuaca, dan kebutuhan sarana produksi secara komprehensif.

4. **Multi-Lahan Sawah & Kolaborator Bagi Hasil**:
   - Mengelola lebih dari satu lahan sawah (*Multi-plot management*).
   - Pengaturan tim pengelola sawah dengan persentase bagi hasil panen (%) serta visualisasi bar proporsi dan estimasi nominal rupiah.
   - Buku Modal Lahan: Pencatatan pengeluaran modal riil di masing-masing lahan sawah.

5. **Katalog & Marketplace Layanan Ekosistem**:
   - Marketplace untuk sewa traktor olah tanah, jasa pompa irigasi, regu buruh cangkul/tanam, saprotan pupuk/benih, hingga jasa pasca-panen penggilingan padi.
   - Pemasangan dan pengelolaan layanan mandiri bagi setiap pengguna.
   - **In-App Checkout**: Pemesanan langsung dari dalam aplikasi dengan opsi pembayaran COD, YARNEN (bayar pasca panen), dan Transfer Bank.
   - **Otomatisasi Buku Modal**: Pilihan langsung pasca-checkout untuk mencatat biaya ke buku modal lahan tertentu.

6. **Konfirmasi Seller & Pelacakan Real-time Pembeli**:
   - Tab khusus *Pesanan Masuk* bagi penjual untuk mengonfirmasi kondisi pesanan (*Diproses, Mulai Dikirim/Jalan ke Lahan, Selesai, Stok Habis, Dibatalkan*) beserta catatan penjelasan langsung.
   - Sub-tab *Transaksi* bagi pembeli untuk melacak status pesanan secara real-time.

7. **Fitur Diskusi Interaktif**:
   - **Diskusi Pesanan / Chat Transaksi**: Obrolan dua arah langsung di setiap kartu pesanan antara Pembeli dan Penjual untuk koordinasi titik lokasi sawah dan jadwal jam tiba armada.
   - **Diskusi Produk di Katalog**: Tanya jawab publik pada setiap kartu layanan katalog untuk bertanya spesifikasi produk dan mendapatkan jawaban terbuka dari penyedia.

8. **Sistem Notifikasi Universal**:
   - Notifikasi in-app terpadu untuk pesanan masuk, pembaruan status pesanan, pesan obrolan transaksi, pertanyaan produk, komentar postingan, dan pengikut baru dengan lonceng interaktif pada header bar.

9. **Dokter Tani AI & Buku Tani**:
   - Deteksi dini penyakit tanaman padi (Hawar Daun, Blas, dsb.) didukung **Google Gemini API Multimodal Vision** (`gemini-2.5-flash`) dengan fallback ke basis pengetahuan fitopatologi Kementan/IRRI.
   - Inventaris stok saprotan dan hasil panen lumbung.

---

## 🛠️ Tech Stack

- **Frontend:** Vue.js 3, Vite, Tailwind CSS, TypeScript, Lucide Icons, Leaflet Maps.
- **Backend:** Node.js, Express.js, TypeScript, Multer, In-Memory / File-based Database Persistence (`local_db.json`).
- **AI Engine:** Google Gemini API (`@google/genai` multimodal vision `gemini-2.5-flash`) & Smart Agronomic Planner Engine.
