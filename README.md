#AgriBuddy — Smart Farming Decision Support System


AgriBuddy adalah platform Smart Farming Decision Support System (DSS) terpadu pendamping petani padi. Platform ini dirancang menggunakan pendekatan User-Centered Design (UCD) untuk membantu pengelolaan petak lahan geospasial, perencanaan anggaran biaya dan jadwal tanam berbasis AI (Smart Farm Planner), deteksi dini penyakit tanaman padi berbasis Computer Vision (Google Gemini Multimodal Vision), pencatatan inventaris sarana produksi dan hasil panen (Buku Tani), serta direktori kemitraan layanan mekanisasi dan kios saprotan desa.

---

## Cara Menjalankan Aplikasi (Satu Klik)

### Opsi 1: Menggunakan Skrip Otomatis (Rekomendasi)
Cukup klik dua kali file run_app.bat di direktori utama repositori.

Skrip ini akan otomatis membuka:
Backend Node.js & Gemini API: http://127.0.0.1:8000/ (API Status & Base Endpoint /api/v1)
Frontend Vue.js: http://localhost:5173 (Aplikasi Web Responsif Desktop & Mobile)

---

### Opsi 2: Menjalankan Manual Lewat Terminal

### 1. Backend (Node.js + Express + TypeScript + Gemini API)
```bash
cd backend
npm install
npm run dev
```
Base API Endpoint: `http://127.0.0.1:8000/api/v1`

### 2. Frontend (Vue.js 3 + Vite + Tailwind CSS)
```bash
cd frontend
npm install
npm run dev
```
Buka aplikasi di browser: `http://localhost:5173`

---
##Platform AgriBuddy terdiri dari 5 fitur utama yaitu:
###1. Monitoring Sawah & Cuaca Lahan Real-Time (Beranda Utama)

Pemantauan kondisi iklim lokal (suhu, kelembaban, dan probabilitas hujan) secara    presisi via titik GPS sawah.

Anjuran waktu pengairan dan pemupukan cerdas berbasis estimasi cuaca harian.

Peta batas petak sawah berbasis Leaflet GIS dengan dukungan pengelolaan multi-lahan.

###2. Rencana Tani AI & Kalkulator Modal Usaha tani 

Kustomisasi variabel luas lahan (Ha), varietas komoditas, jenis tanah, hingga sumber irigasi.

Kalkulasi otomatis Rencana Anggaran Biaya (RAB) mencakup 12 item kebutuhan riil usahatani.

Panduan linimasa 5 fase tumbuh (Hari Setelah Tanam / HST) dengan rekomendasi agronomis adaptif.

Proyeksi HPP per kg, perkiraan tonase panen, estimasi laba bersih, serta rasio Return on Investment (ROI %).


###3. Agri AI — Deteksi Penyakit Daun Padi (Google Gemini Multimodal Vision)

Deteksi penyakit tanaman melalui citra foto daun padi menggunakan Google Gemini Multimodal Vision (gemini-flash-latest).

Mengidentifikasi Hawar Daun Bakteri (Kresek), Blas Daun (Pyricularia), Bercak Coklat, atau status Sehat.

Menampilkan tingkat keparahan (confidence score), gejala klinis, serta langkah mitigasi agronomi dan dosis pestisida sesuai anjuran Kementan & IRRI.


###4. Buku Tani — Gudang Saprotan & Lumbung Panen

Pencatatan stok pupuk, benih, dan pestisida dengan fitur penyesuaian cepat (+ / -) serta indikator peringatan stok menipis (low-stock alert).

Pencatatan tonase hasil panen gabah (GKP/GKG), lokasi penyimpanan, dan pemantauan tren harga pasar komoditas daerah.


###5. Direktori Layanan & Kemitraan Ekosistem

Direktori kontak penyedia jasa olah tanah (traktor), sewa pompa air, regu buruh tani, kios saprotan resmi, hingga armada penyerap gabah.

Tombol interaktif "Hubungi via WhatsApp" yang memicu chat otomatis beserta draf pesan template untuk transaksi cepat dan praktis.

---

##Tech Stack & Arsitektur

Frontend: Vue.js 3, Vite, Tailwind CSS, TypeScript, Lucide Icons, Leaflet Maps.
Backend: Node.js, Express.js, TypeScript, Multer, File-based Database Persistence (local_db.json).
AI Engine: Google Gemini API (@google/genai multimodal vision gemini-flash-latest ) & Smart Agronomic Planner Engine.
