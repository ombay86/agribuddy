# Product Requirements Document (PRD)
## Proyek Capstone: "AgriBuddy" — Ekosistem Pendamping Petani Cerdas

---

## 1. Ringkasan Eksekutif & Visi Produk

* **Nama Produk (Tentatif):** AgriBuddy
* **Jenis Aplikasi:** Mobile Application (Hybrid Android via Ionic Vue & Capacitor)
* **Target Pengguna:** Petani skala kecil & menengah (fokus awal: komoditas Padi / Hortikultura Cabai)
* **Visi Produk:** Menghadirkan asisten saku digital ramah petani yang menyederhanakan manajemen lahan, persediaan sarana produksi (saprotan), deteksi dini penyakit tanaman menggunakan AI, serta pencatatan hasil panen lumbung tanpa kurva belajar yang rumit.
* **Tim Pengembang:** 4 Mahasiswa (Capstone Project)
* **Tech Stack:**
  * **Frontend Mobile:** Ionic Vue (Vue 3 + Vite + Capacitor)
  * **Backend API:** FastAPI (Python 3.10+)
  * **Database:** MongoDB (Atlas / Community) via ODM Beanie / Motor
  * **AI Module:** PyTorch / Ultralytics (YOLOv8-Nano atau MobileNetV3)

---

## 2. Analisis Pengguna (*User Persona*)

### Persona: Pak Joko (52 Tahun, Petani Padi)
* **Karakteristik:**
  * Terbiasa menggunakan WhatsApp, namun jarang menggunakan aplikasi kompleks seperti e-commerce atau spreadsheet.
  * Mengoperasikan HP di lapangan dengan kondisi pencahayaan terang dan waktu luang terbatas.
* **Titik Masalah (*Pain Points*):**
  * Lupa jadwal pemupukan dan takaran dosis yang tepat.
  * Sering terlambat mendeteksi hama/penyakit daun; bertanya ke tetangga sering menghasilkan diagnosis yang salah.
  * Stok pupuk/bibit di rumah habis tiba-tiba tanpa disadari.
  * Pencatatan hasil panen di lumbung masih memakai ingatan atau buku kertas yang rawan hilang.
* **Kebutuhan Solusi:**
  * Tombol navigasi berukuran besar dengan ikon visual dan teks minim.
  * Fitur kamera untuk mendiagnosis masalah tanaman secara instan.
  * Indikator warna sederhana untuk status tanah/tanaman.

---

## 3. Ruang Lingkup Proyek (*Scope & Non-Scope MVP*)

Untuk memastikan proyek selesai tepat waktu dalam batas waktu ketat total **8 Minggu** (1 minggu proposal + 6 minggu pengembangan aplikasi + 1 minggu laporan akhir) oleh tim 4 orang:

### In-Scope (Fitur Utama MVP):
1. **Autentikasi Sederhana:** Registrasi dan login berbasis No. HP / Username + PIN atau kata sandi sederhana.
2. **Dashboard "Kondisi Lahan Hari Ini":**
   * Widget cuaca lokal harian (integrasi API OpenWeatherMap).
   * Status pengairan & rekomendasi aksi hari ini (misal: "Tanah butuh disiram" atau "Hujan lebat diprediksi sore, tunda penyiraman").
3. **Buku Tani (Inventaris Saprotan & Siklus Tanam):**
   * Pencatatan stok bibit dan pupuk (tambah/kurang cepat dengan tombol preset).
   * Pembuatan jadwal siklus tanam berdasarkan tanggal mulai tanam.
4. **Dokter Tani (AI Diagnosis Penyakit Tanaman):**
   * Pengambilan foto daun tanaman via kamera HP.
   * Model Computer Vision mendeteksi klasifikasi penyakit (misal: Blas Daun, Hawar Daun Bakteri, Sehat).
   * Menampilkan hasil diagnosis berupa nama penyakit, tingkat keyakinan (*confidence*), dan rekomendasi tindakan penanganan sederhana.
5. **Lumbung Tani (Pencatatan Panen & Pantauan Harga):**
   * Pencatatan kuantitas hasil panen yang disimpan di lumbung/gudang.
   * Visualisasi informasi tren harga komoditas lokal terkini.

### Out-of-Scope (Bukan Prioritas MVP):
* Integrasi perangkat keras IoT fisik (digantikan dengan simulasi data cuaca geolokasi).
* Pembayaran digital (*Payment Gateway*) dan kurir logistik e-commerce.
* Multi-bahasa daerah (fokus awal Bahasa Indonesia yang ringkas dan lugas).

---

## 4. Spesifikasi Modul & Kebutuhan Fungsional (FR)

```
[ Frontend: Ionic Vue ]
   ├── Modul Autentikasi (Login / Register PIN)
   ├── Modul Beranda (Kondisi Cuaca & Rekomendasi Hari Ini)
   ├── Modul Dokter Tani (Kamera -> AI Inference -> Solusi)
   ├── Modul Inventaris (Stok Bibit & Pupuk)
   └── Modul Lumbung (Hasil Panen & Log Riwayat)
            │
      (REST API JSON)
            │
[ Backend: FastAPI ]
   ├── Router: /auth
   ├── Router: /weather-recommendation
   ├── Router: /inventory (Bibit & Pupuk)
   ├── Router: /harvest (Lumbung)
   └── Router: /ai/diagnose (Upload Gambar -> Inference)
            │
   ┌────────┴────────┐
   ▼                 ▼
[ MongoDB Database ]  [ AI Model (YOLOv8n/MobileNet) ]
```

### FR-01: Modul Beranda & Rekomendasi Cuaca
* **Deskripsi:** Menampilkan ringkasan status lahan petani dan rekomendasi otomatis.
* **Input:** Koordinat GPS petani (didapatkan dari Capacitor Geolocation).
* **Output:** Suhu, curah hujan, serta kartu rekomendasi: *"Hari ini cuaca terik, disarankan menyiram petak sawah sebelum pukul 09.00 WIB"*.

### FR-02: Modul Dokter Tani (AI Vision)
* **Deskripsi:** Memproses foto tanaman dari kamera/galeri untuk mendeteksi penyakit.
* **Alur:**
  1. Pengguna membuka tab "Dokter Tani" dan menekan tombol kamera besar.
  2. Gambar dikompres di sisi klien (Ionic) sebelum dikirim ke endpoint `/api/v1/ai/diagnose`.
  3. FastAPI memproses gambar menggunakan model inferensi Python.
  4. Backend mengembalikan response:
     ```json
     {
       "disease_name": "Hawar Daun Bakteri (Bacterial Blight)",
       "confidence": 0.93,
       "severity": "Sedang",
       "action_recommendation": [
         "Kurangi pemupukan Nitrogen (Urea) berlebih",
         "Gunakan bakterisida berbahan aktif tembaga sesuai dosis",
         "Jaga sirkulasi pengairan agar tidak tergenang terlalu tinggi"
       ]
     }
     ```
  5. UI menampilkan diagnosis dengan badge visual dan solusi yang mudah dibaca.

### FR-03: Modul Inventaris Saprotan (Buku Tani)
* **Deskripsi:** Pengelolaan stok bibit dan pupuk.
* **Fitur:**
  * Tombol tambah stok cepat (`+1 karung`, `+5 kg`).
  * Notifikasi peringatan visual jika stok mencapai ambang batas minimum (*Low Stock Alert*).

### FR-04: Modul Lumbung Panen
* **Deskripsi:** Mencatat komoditas hasil panen yang disimpan atau siap dijual.
* **Fitur:**
  * Form input sederhana: Komoditas, Berat (kg/ton), Tanggal Panen, Lokasi Simpan.
  * Riwayat transaksi keluar/masuk hasil panen.

---

## 5. Rancangan Struktur Data (MongoDB Collections)

### 1. Collection: `users`
```json
{
  "_id": "ObjectId(...)",
  "phone_number": "08123456789",
  "full_name": "Pak Joko",
  "pin_hash": "$2b$12$...",
  "location": {
    "village": "Desa Sukamaju",
    "latitude": -7.250445,
    "longitude": 112.768845
  },
  "commodity_focus": "Padi",
  "created_at": "2026-09-20T00:00:00Z"
}
```

### 2. Collection: `inventory`
```json
{
  "_id": "ObjectId(...)",
  "user_id": "ObjectId(...)",
  "item_type": "PUPUK", // "BIBIT" | "PUPUK" | "OBAT"
  "item_name": "Pupuk Urea N-46",
  "quantity": 3,
  "unit": "Karung (50kg)",
  "min_threshold": 1,
  "updated_at": "2026-09-20T00:00:00Z"
}
```

### 3. Collection: `disease_diagnoses`
```json
{
  "_id": "ObjectId(...)",
  "user_id": "ObjectId(...)",
  "image_url": "https://storage.../leaf_sample.jpg",
  "detected_label": "Bacterial Blight",
  "confidence_score": 0.93,
  "created_at": "2026-09-20T10:30:00Z"
}
```

### 4. Collection: `harvest_storage` (Lumbung)
```json
{
  "_id": "ObjectId(...)",
  "user_id": "ObjectId(...)",
  "commodity": "Gabah Kering Panen (GKP)",
  "total_weight_kg": 1500,
  "harvest_date": "2026-08-15",
  "status": "TERSIMPAN", // "TERSIMPAN" | "TERJUAL_SEBAGIAN" | "HABIS"
  "notes": "Hasil petak utara"
}
```

---

## 6. Kebutuhan Non-Fungsional (NFR) & Aspek Desain

* **Kecepatan Inferensi AI:** Response time diagnosis AI harus di bawah **2,5 detik** pada koneksi 4G standar.
* **Responsivitas Offline/Cache:** Data stok dan riwayat panen terakhir harus tetap dapat dilihat meski sinyal internet di sawah sedang terputus (manfaatkan Pinia + LocalStorage di Ionic).
* **Usabilitas (UX):**
  * Ukuran tombol minimum $48 \times 48$ piksel (*touch target size* nyaman untuk jempol).
  * Kontras warna memenuhi standar WCAG AA agar tetap terbaca di bawah terik sinar matahari.

---

## 7. Pembagian Kerja Tim & Matriks Tanggung Jawab (RACI)

| Anggota | Peran | Output Utama yang Dinilai Dosen Penguji |
| :--- | :--- | :--- |
| **Anggota 1** | **Frontend & Mobile Lead (Ionic Vue)** | Source code aplikasi mobile, integrasi Capacitor (Kamera & GPS), build file `.apk`, State Management (Pinia). |
| **Anggota 2** | **Backend & Database Lead (FastAPI + MongoDB)** | REST API terstruktur, skema Beanie/Motor, integrasi OpenWeather API, dokumentasi Swagger UI (`/docs`). |
| **Anggota 3** | **AI / Data Engineer (Python & Computer Vision)** | Dataset tanaman terlabel, notebook pelatihan model, evaluasi metrik (Akurasi, F1-Score), pipeline inferensi model ringan (`.onnx` atau PyTorch lite). |
| **Anggota 4** | **Product Lead, UI/UX Designer & QA** | Desain interaktif Figma, penyusunan dataset panduan penanganan penyakit, pengujian fungsional (Blackbox Testing), serta penulisan Laporan Akhir. |

---

## 8. Jadwal Pelaksanaan Proyek (Timeline Total 8 Minggu)

Total durasi proyek adalah **8 Minggu**, dengan alokasi **1 Minggu Proposal**, **6 Minggu Pengerjaan Aplikasi (Sprint 1–6)**, dan **1 Minggu Penyusunan Laporan Akhir**:

| Periode | Fase | Fokus & Target Output (*Deliverables*) | PIC Utama |
| :--- | :--- | :--- | :--- |
| **Minggu 1** | **Penyusunan Proposal** | - Penyusunan Dokumen Proposal Capstone lengkap (Latar belakang, masalah, batasan, PRD).<br>- Wireframe/mockup UI awal di Figma & riset dataset AI (Kaggle/PlantVillage).<br>- Pengajuan dan persetujuan dosen pembimbing. | Semua Anggota (Lead: Anggota 4) |
| **Minggu 2** | **Sprint 1: Setup & Pondasi** | - Setup repository Git, project Ionic Vue (Vite + Capacitor), dan environment FastAPI.<br>- Setup cluster database MongoDB Atlas & koneksi ODM Beanie.<br>- Pra-pemrosesan & labeling dataset tanaman. | Anggota 1, 2, 3 |
| **Minggu 3** | **Sprint 2: Auth & Buku Tani** | - Backend: API Autentikasi (JWT/PIN) & CRUD Inventaris Pupuk/Bibit.<br>- Frontend: Halaman Login, Dashboard beranda, dan halaman Buku Tani.<br>- AI: Pelatihan model baseline deteksi penyakit daun (Target akurasi awal > 80%). | Anggota 1, 2, 3 |
| **Minggu 4** | **Sprint 3: Integrasi Dokter Tani (AI)** | - Frontend: Integrasi kamera/galeri HP via `@capacitor/camera` dan kompresi gambar.<br>- Backend: Endpoint `/api/v1/ai/diagnose` menerima payload gambar & memanggil model inferensi.<br>- UI menampilkan hasil diagnosis, akurasi, dan kartu rekomendasi obat/tindakan. | Anggota 1, 2, 3 |
| **Minggu 5** | **Sprint 4: Lumbung & Cuaca** | - Integrasi API Cuaca (OpenWeatherMap) berbasis lokasi GPS (`@capacitor/geolocation`).<br>- Modul Lumbung Tani (Pencatatan stok panen & estimasi harga lokal).<br>- Sinkronisasi data lokal (Pinia/LocalStorage) untuk ketahanan offline ringan. | Anggota 1 & 2 |
| **Minggu 6** | **Sprint 5: Integrasi Penuh & Refinement** | - Penyempurnaan alur navigasi aplikasi (UI testing, tombol ramah jempol, warna kontras).<br>- Optimasi ukuran model AI (konversi ke ONNX / Quantization agar inferensi cepat).<br>- Testing API terintegrasi & penanganan error (handling bad connection). | Semua Anggota |
| **Minggu 7** | **Sprint 6: Testing & Build APK** | - *Blackbox Testing* seluruh skenario pengguna.<br>- Build final `.apk` Android menggunakan Android Studio / Capacitor CLI.<br>- Uji coba langsung instalasi di smartphone Android fisik. | Anggota 1, 2, 4 |
| **Minggu 8** | **Laporan Akhir & Demo** | - Penyusunan Laporan Akhir Tugas Akhir (Bab 1 s.d. Bab 5 dan lampiran).<br>- Perekaman video demo aplikasi dan pembuatan slide presentasi sidang.<br>- Gladi bersih persiapan presentasi / sidang Capstone. | Semua Anggota (Lead: Anggota 4) |

> [!IMPORTANT]
> **Strategi Sukses 6 Minggu Pengerjaan:**
> 1. **Gunakan Model Pre-trained (*Transfer Learning*):** Jangan melatih arsitektur neural network dari nol. Gunakan weights awal MobileNetV3 atau YOLOv8n yang di-*fine-tune* pada dataset penyakit tanaman agar selesai dalam 2-3 hari.
> 2. **Hindari *Feature Creep*:** Kunci fitur hanya pada yang tertulis di PRD. Tolak ide penambahan fitur baru di tengah Sprint 3–6.
> 3. **Sinkronisasi Harian (*Daily Standup* 10 Menit):** Rutin evaluasi blocker setiap malam agar masalah teknis tidak menumpuk di akhir minggu.

