# AgriBuddy — Smart Farming Decision Support System 🌾
**Capstone Project / Tugas Akhir STSI4440**

AgriBuddy adalah platform *Smart Farming Decision Support System (DSS)* terpadu pendamping petani padi untuk manajemen petak lahan geospasial, perencanaan anggaran biaya dan jadwal tanam berbasis AI (Smart Farm Planner), deteksi dini penyakit tanaman padi berbasis Computer Vision (**Google Gemini 2.5 Flash Multimodal Vision**), pencatatan inventaris sarana produksi dan hasil panen di lumbung (Buku Tani), serta direktori kemitraan layanan mekanisasi dan kios saprotan desa.

---

## 🚀 Cara Menjalankan Aplikasi (Satu Klik)

### Opsi 1: Menggunakan Skrip Otomatis (Rekomendasi)
Cukup klik dua kali file **`run_app.bat`** di direktori utama.
Skrip ini akan otomatis membuka:
1. **Backend Node.js & Gemini API:** [http://127.0.0.1:8000/](http://127.0.0.1:8000/) (API Status & Base Endpoint `/api/v1`)
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

## 🌟 5 Modul Utama Platform AgriBuddy

1. **Monitoring Sawah & Cuaca Lahan Real-Time (Beranda Utama)**:
   - Dashboard terpadu kondisi iklim (suhu, kelembaban, probabilitas hujan) via GPS sawah.
   - Anjuran waktu pengairan dan pemupukan cerdas berbasis cuaca.
   - Peta batas petak sawah geospasial (Leaflet GIS) dan pengelolaan multi-lahan.

2. **Rencana Tani AI & Kalkulator Modal Usahatani (Smart Farm Planner)**:
   - Input parameter lahan (luas Ha, varietas komoditas, jenis tanah, sumber air).
   - Kalkulasi otomatis Rencana Anggaran Biaya (RAB) 12 item kebutuhan riil.
   - Linimasa jadwal 5 fase budidaya (HST) dengan rekomendasi agronomis adaptif.
   - Analisis finansial: HPP per kg, proyeksi tonase panen, estimasi laba bersih, dan rasio ROI (%).

3. **Dokter Tani AI — Deteksi Penyakit Daun Padi (Google Gemini Multimodal Vision)**:
   - Diagnosis fitopatologi daun padi dari unggahan foto kamera petani menggunakan **Google Gemini 2.5 Flash Vision**.
   - Identifikasi penyakit: Hawar Daun Bakteri (Kresek), Blas Daun (Pyricularia), Bercak Coklat, atau Sehat.
   - Menyajikan skor keyakinan (*confidence score*), tingkat keparahan, gejala klinis, dan langkah mitigasi agronomi / dosis bakterisida anjuran Kementan & IRRI.
   - Dilengkapi *graceful fallback* ke basis pengetahuan lokal jika offline (*anti-crash*).

4. **Buku Tani — Gudang Saprotan & Lumbung Panen**:
   - **Gudang Saprotan**: Pencatatan stok pupuk, benih, dan obat dengan tombol penyesuaian cepat (+ / -) serta indikator peringatan stok menipis (*low-stock warning*).
   - **Lumbung Panen**: Pencatatan tonase hasil panen gabah (GKP/GKG), lokasi penyimpanan, dan pantauan tren harga komoditas pasar daerah.

5. **Direktori Layanan & Kemitraan Ekosistem**:
   - Direktori kontak penyedia jasa olah tanah (traktor), persewaan pompa irigasi, regu buruh cangkul/tanam, kios pupuk resmi, dan armada jemput gabah.
   - Tombol langsung **"Hubungi via WhatsApp"** yang membuka chat WA dengan pesan template otomatis, memudahkan petani bertransaksi secara nyata dan nyaman.

---

## 🛠️ Tech Stack

- **Frontend:** Vue.js 3, Vite, Tailwind CSS, TypeScript, Lucide Icons, Leaflet Maps.
- **Backend:** Node.js, Express.js, TypeScript, Multer, File-based Database Persistence (`local_db.json`).
- **AI Engine:** Google Gemini API (`@google/genai` multimodal vision `gemini-2.5-flash`) & Smart Agronomic Planner Engine.
