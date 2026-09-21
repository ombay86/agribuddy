# Rencana Implementasi: Fitur Social Networking & Jejaring Distribusi ("Jejaring Mitra") pada AgriBuddy

Menambahkan modul **Jejaring Mitra & Profil Petani** pada ekosistem AgriBuddy agar petani dapat mengelola identitas usahatani mereka dan terhubung langsung dengan para pemangku kepentingan kunci dalam rantai pasok pertanian:
1. **Koperasi Unit Desa (KUD):** Penyerapan hasil panen gabah, program kemitraan desa, dan permodalan.
2. **Distributor / Kios Saprotan Resmi:** Cek ketersediaan pupuk bersubsidi/non-subsidi dan pemesanan benih.
3. **Penggilingan Padi & Pasar Induk:** Negosiasi harga dan distribusi hasil panen partai besar secara transparan.

---

## User Review Required

> [!IMPORTANT]
> **Integrasi Komunikasi Instan (WhatsApp Direct Link):**
> Untuk mempermudah adopsi oleh petani dan distributor di lapangan, fitur "Terhubung" dilengkapi dengan **Generator Tautan WhatsApp Langsung (`wa.me`)** yang otomatis menyusun pesan siap kirim (misal: *"Halo KUD Sukamaju, saya Pak Joko ingin menawarkan 2.400 kg Gabah Kering Panen dari Lumbung AgriBuddy saya..."*).

> [!NOTE]
> **Navigasi Aplikasi:**
> Navigasi bawah (*Bottom Navigation Bar*) akan ditambahkan satu tab baru: **"Jejaring"** (atau ikon komunitas/mitra) dan opsi **"Profil Saya"** pada header, sehingga tetap mempertahankan batas ergonomis 5 tab mobile.

---

## Proposed Changes

### 1. Backend (FastAPI + Data Persistence)

#### [MODIFY] `backend/app/core/database.py`
* Menambahkan koleksi awal `partners` (daftar mitra terverifikasi: KUD Sukamaju, Kios Tani Berkah, Penggilingan Beras Makmur).
* Menambahkan koleksi `network_connections` (riwayat koneksi/kemitraan dan penawaran panen).

#### [NEW] `backend/app/api/network.py`
* `GET /api/v1/network/partners`: Mengambil direktori mitra dengan filter kategori (`KOPERASI`, `DISTRIBUTOR_PUPUK`, `PENGGILINGAN_PASAR`).
* `POST /api/v1/network/connect`: Mengajukan status kemitraan dengan mitra.
* `POST /api/v1/network/offer-harvest`: Mengirimkan penawaran hasil panen lumbung langsung ke mitra target.
* `PUT /api/v1/auth/profile`: Memperbarui profil petani (luas lahan, komoditas unggulan, no WhatsApp).

#### [MODIFY] `backend/app/main.py`
* Mendaftarkan router `/api/v1/network`.

---

### 2. Frontend (Vue.js 3 + Tailwind)

#### [NEW] `frontend/src/views/JejaringView.vue`
* Tampilan direktori mitra terverifikasi dengan badge kategori warna.
* Filter mitra: **Semua**, **Koperasi Desa**, **Distributor Pupuk**, **Penggilingan/Pasar**.
* Kartu Profil Mitra: Nama instansi, PIC, lokasi, status verifikasi, dan tombol **"Hubungi via WhatsApp"** & **"Ajukan Kemitraan"**.
* Fitur **"Bursa Panen"**: Tombol satu-klik untuk menawarkan stok lumbung yang ada ke mitra terpilih.

#### [NEW] `frontend/src/views/ProfilView.vue` (atau Modal Profil Petani)
* Mengelola data diri petani: Nama Lengkap, Nomor HP/WhatsApp, Desa/Kecamatan, Luas Lahan (Ha), Komoditas Utama.
* Badge reputasi petani binaan.

#### [MODIFY] `frontend/src/components/BottomNav.vue` & `frontend/src/router/index.ts`
* Menambahkan rute dan ikon navigasi `/jejaring` ke dalam BottomNav.
* Menambahkan akses cepat edit profil di `HeaderBar.vue`.

#### [MODIFY] `frontend/src/services/api.ts`
* Menambahkan fungsi pemanggilan API profil & direktori mitra jejaring.

---

## Verification Plan

### 1. Backend API
* Menguji endpoint `GET /api/v1/network/partners` mengembalikan daftar mitra dengan nomor kontak dan profil lengkap.
* Menguji endpoint `POST /api/v1/network/offer-harvest` berhasil mencatat penawaran distribusi.

### 2. Frontend & Usability Testing
* Menguji navigasi ke tab **Jejaring**.
* Menguji filter kategori mitra (Koperasi vs Distributor vs Pasar).
* Menguji klik tombol WhatsApp (memastikan format URL `wa.me` dan pesan otomatis tersusun rapi).
* Menguji pengeditan profil petani dan verifikasi perubahan data tersimpan di backend.
