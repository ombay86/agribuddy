# Rencana Implementasi: Prototipe Web "AgriBuddy" (Vue.js 3 + FastAPI + AI)

Membangun prototipe aplikasi web interaktif (*responsive mobile-first design*) yang dapat langsung dibuka di browser untuk didemokan dan didiskusikan bersama tim dan dosen. 

* **Frontend:** Vue.js 3 + Vite + Tailwind CSS (desain responsif ramah petani dengan mode tampilan saku/smartphone, tombol besar, kontras jelas, dan zero setup).
* **Backend:** FastAPI (Python 3.14) dengan REST API modular dan dokumentasi otomatis Swagger UI di `/docs`.
* **Modul AI:** Diagnosis citra penyakit daun padi (Hawar Daun Bakteri, Blas Daun, Bercak Coklat, Daun Sehat) lengkap dengan tingkat keyakinan (*confidence*) dan rekomendasi obat/tindakan.
* **Database:** MongoDB dengan adapter cerdas (*auto-fallback* ke penyimpanan lokal/JSON jika MongoDB Atlas belum dikonfigurasi, sehingga langsung bisa dijalankan tanpa instalasi DB).

---

## Arsitektur & Struktur Direktori

```
STSI4440_CAPSTONE PROJECT/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth.py             # Login PIN & Profil Petani
│   │   │   ├── weather.py          # Cuaca & Rekomendasi Siram/Lahan
│   │   │   ├── inventory.py        # CRUD Stok Bibit & Pupuk (+ Low stock alert)
│   │   │   ├── harvest.py          # CRUD Lumbung Panen & Harga Pasar
│   │   │   └── ai_diagnose.py      # Diagnosis Foto Daun + Rekomendasi Solusi
│   │   ├── core/
│   │   │   ├── config.py           # Konfigurasi & Variabel Lingkungan
│   │   │   └── database.py         # Koneksi MongoDB & Fallback Manager
│   │   ├── models/schemas.py       # Pydantic Schemas
│   │   ├── services/
│   │   │   ├── ai_service.py       # Engine Diagnosis Penyakit Tanaman
│   │   │   └── weather_service.py  # Integrasi Cuaca & Logika Rekomendasi
│   │   └── main.py                 # Inisialisasi FastAPI & CORS Middleware
│   ├── sample_images/              # Contoh foto daun padi sakit untuk tes AI
│   ├── requirements.txt            # Dependensi FastAPI, Uvicorn, Pillow, dll.
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/             # Navbar, Kartu Status Cuaca, Bottom Navigation
│   │   ├── views/
│   │   │   ├── BerandaView.vue     # Dashboard Cuaca, Rekomendasi Lahan, Status
│   │   │   ├── DokterTaniView.vue  # Scanner Foto Daun + Hasil Diagnosis AI
│   │   │   ├── BukuTaniView.vue    # Manajemen Stok Pupuk & Bibit (Quick + / -)
│   │   │   └── LumbungView.vue     # Catatan Hasil Panen & Pantauan Harga Pasar
│   │   ├── services/api.ts         # Axios/Fetch client ke FastAPI backend
│   │   ├── router/index.ts         # Vue Router
│   │   ├── App.vue
│   │   └── main.ts
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── run_app.bat                     # Skrip 1-klik menjalankan Backend & Frontend
└── README.md                       # Petunjuk demo untuk presentasi tim
```

---

## Detail Fitur yang Siap Didemokan

1. **Beranda & Kondisi Lahan (Dashboard):**
   * Indikator Cuaca (Suhu, Kelembaban, Curah Hujan).
   * Kartu Status Tindakan Hari Ini (*Action Card*: misal *"Tanah Butuh Disiram"* vs *"Akan Turun Hujan - Tunda Penyiraman"*).
   * Quick glance stok kritis dan hasil panen terbaru.
2. **Dokter Tani (AI Scanner):**
   * Pilihan ambil foto / upload file dari komputer atau klik tombol *"Gunakan Contoh Foto Daun Sakit"* untuk pengujian cepat tanpa repot cari foto.
   * Proses analisis dengan indikator loading.
   * Kartu hasil diagnosis: Nama Penyakit, Akurasi AI (%), Tingkat Keparahan, dan Langkah Penanganan (Dosis pupuk/obat).
3. **Buku Tani (Inventaris Saprotan):**
   * Daftar stok bibit dan pupuk.
   * Tombol sentuh cepat: Tambah 1 karung (`+1`), Kurangi 1 karung (`-1`).
   * Tombol tambah jenis saprotan baru dengan modal pop-up.
4. **Lumbung Tani (Hasil Panen):**
   * Daftar hasil panen tersimpan di gudang dengan total tonase.
   * Formulir catat panen baru.
   * Grafik/indikator tren harga pasar komoditas beras/gabah terkini.

---

## Verification Plan

### 1. Uji Backend
* Menjalankan server FastAPI di `http://127.0.0.1:8000`.
* Memeriksa Swagger docs di `http://127.0.0.1:8000/docs`.
* Uji endpoint AI `/api/v1/ai/diagnose` dengan citra daun padi.

### 2. Uji Frontend Web
* Menjalankan server dev Vite di `http://localhost:5173`.
* Memastikan tampilan responsif di desktop maupun mode inspeksi mobile (smartphone view).
* Memastikan semua fitur (tambah stok, scan foto AI, catat lumbung) terhubung mulus ke backend.
