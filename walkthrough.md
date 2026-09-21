# Walkthrough: Prototipe Aplikasi AgriBuddy Selesai Dibuat 🌾

Prototipe aplikasi **AgriBuddy** (Ekosistem Pendamping Petani Cerdas) telah selesai dibangun secara *end-to-end*, teruji, dan siap Anda demokan langsung bersama tim dan dosen pembimbing.

---

## 📂 Ringkasan Komponen yang Telah Dibuat

### 1. Backend (FastAPI + Python)
* **Lokasi:** `backend/`
* **Fitur Utama:**
  * `/api/v1/weather/current`: Rekomendasi pengairan dan cuaca cerdas harian.
  * `/api/v1/ai/diagnose`: Engine diagnosis penyakit daun padi (Kresek, Blas, Bercak Coklat, Sehat) dengan rekomendasi obat & dosis.
  * `/api/v1/inventory`: CRUD inventaris pupuk & bibit dengan penyesuaian stok instan (`+1`/`-1`) dan *low stock alert*.
  * `/api/v1/harvest`: Pencatatan hasil panen lumbung dan tren harga pasar komoditas.
  * **Database Adapter:** Menggunakan persistent local JSON database di `backend/data/local_db.json` dengan dukungan koneksi ke MongoDB Atlas via `.env`.

### 2. Frontend (Vue.js 3 + Vite + Tailwind CSS)
* **Lokasi:** `frontend/`
* **Fitur Utama:**
  * **BerandaView:** Cuaca real-time, kartu rekomendasi aksi irigasi berstatus warna, ringkasan stok & hasil panen.
  * **DokterTaniView:** Fitur unggah foto daun padi dari perangkat, tombol simulasi sampel uji coba cepat 1-klik, dan kartu diagnosis lengkap.
  * **BukuTaniView:** Daftar stok saprotan, tombol sentuh besar `+` dan `-`, filter kategori, dan modal penambahan item baru.
  * **LumbungView:** Total tonase komoditas panen tersimpan, form catat panen baru, serta grafik pantauan tren harga pasar daerah.

### 3. Skrip Eksekusi Satu-Klik
* **File:** [run_app.bat](file:///c:/Users/Asus/Documents/OMBAY/_PERSONAL_/Semester%207/STSI4440_CAPSTONE%20PROJECT/run_app.bat)
* Menjalankan backend FastAPI di `http://127.0.0.1:8000` dan frontend Vue di `http://localhost:5173` secara otomatis.

---

## 🧪 Hasil Verifikasi & Pengujian

| Pengujian | Status | Hasil |
| :--- | :---: | :--- |
| **Backend API Endpoints** | ✅ Lulus | Seluruh rute `/weather`, `/inventory`, `/harvest`, `/ai/diagnose` merespons kode 200 OK dengan format JSON valid. |
| **AI Diagnosis Engine** | ✅ Lulus | Mengembalikan klasifikasi penyakit, tingkat akurasi (90-96%), daftar gejala, dan langkah penanganan medis tanaman. |
| **Frontend Production Build** | ✅ Lulus | `npm run build` berhasil dikompilasi (10.25 detik, 0 errors). |
| **Persistensi Data** | ✅ Lulus | Penambahan stok baru dan catatan panen tersimpan dengan andal. |

---

## 🎯 Panduan Demo Saat Diskusi Bersama Tim

1. **Langkah 1:** Klik dua kali file **`run_app.bat`** pada folder proyek Anda.
2. **Langkah 2:** Buka browser di **`http://localhost:5173`** (Frontend) dan **`http://127.0.0.1:8000/docs`** (Swagger API).
3. **Langkah 3 (Tunjukkan ke Anggota 1 - Frontend):**
   * Perlihatkan layout *mobile-first*, ukuran tombol sentuh yang besar ramah petani, dan navigasi 4 tab bawah.
4. **Langkah 4 (Tunjukkan ke Anggota 2 - Backend & DB):**
   * Buka Swagger UI di `/docs`, tunjukkan arsitektur REST API FastAPI yang modular dan struktur data JSON/MongoDB.
5. **Langkah 5 (Tunjukkan ke Anggota 3 - AI Engineer):**
   * Buka tab **Dokter Tani**, klik salah satu tombol *"Uji Coba Cepat (Demo Sampel)"* atau upload foto daun. Tunjukkan bagaimana output AI menyajikan nama penyakit, akurasi, dan anjuran takaran obat.
6. **Langkah 6 (Tunjukkan ke Anggota 4 - UI/UX & Proposal):**
   * Buka dokumen **PRD_AgriTech_Capstone.md** dan jelaskan keselarasan fitur dengan timeline pengerjaan 6 minggu.
