# Use Case Diagram & Spesifikasi Fungsional — AgriBuddy v2.0
**Platform Ekosistem Usahatani Cerdas: Manajemen Lahan AI, Marketplace Jasa, Lumbung Traceability, dan Bursa Lelang Komoditas**  
*Capstone Project STSI4440 • Tugas Akhir Sarjana Sistem Informasi 2026*

---

## 1. Pendahuluan & Lingkup Sistem

Diagram Use Case ini memodelkan seluruh fungsionalitas dan batasan (*system boundary*) dari platform **AgriBuddy v2.0**. Berbeda dengan sistem agritech konvensional yang kaku, AgriBuddy mengusung paradigma **Ecosystem-First**, di mana seluruh pelaku usahatani (pemilik lahan, buruh garap, penyedia alat mesin pertanian / alsintan, kios saprotan, hingga pedagang pengepul) diposisikan sebagai entitas setara yang saling berinteraksi secara kolaboratif (*peer-to-peer collaboration*).

Sistem memfasilitasi interaksi mulai dari perencanaan budidaya cerdas berbasis kecerdasan buatan (*Agronomic AI Decision Engine*), manajemen pembagian hasil panen, pemesanan armada usahatani di katalog jasa terpadu, pencatatan biaya modal otomatis, hingga penyimpanan lumbung berketertelusuran (*food traceability*) dan transaksi bursa lelang komoditas.

---

## 2. Definisi & Karakteristik Aktor (*Actors*)

Sistem AgriBuddy mengidentifikasi **4 Aktor Primer (Pengguna Manusia)** dengan relasi generalisasi (*is-a*), serta **2 Aktor Sekunder (Sistem Eksternal)**:

| No | Nama Aktor | Kategori | Deskripsi & Peran dalam Sistem |
| :---: | :--- | :---: | :--- |
| **1** | **Warga Ekosistem (Pengguna Terdaftar)** | Aktor Primer *(Induk / Basis)* | Pengguna umum yang telah terdaftar dalam sistem. Memiliki akses terhadap autentikasi, manajemen profil, linimasa jejaring sosial tani, dan penerimaan notifikasi in-app. |
| **2** | **Petani / Pengelola Lahan** | Aktor Primer *(Spesialisasi)* | Pengguna yang mengelola petak sawah, menyusun rencana kebutuhan modal AI, mengatur kolaborator bagi hasil panen, memesan layanan/alsintan di katalog, serta menyimpan dan melelang hasil panen. *(Mewarisi hak akses Warga Ekosistem)* |
| **3** | **Penyedia Jasa / Penjual (*Seller*)** | Aktor Primer *(Spesialisasi)* | Pengguna atau mitra usaha yang menawarkan alat/jasa pertanian (sewa traktor roda dua/empat, pompa alkon irigasi, buruh tanam, penggilingan gabah) serta saprotan, mengelola pemesanan masuk, dan berkoordinasi dengan pemesan. *(Mewarisi hak akses Warga Ekosistem)* |
| **4** | **Pedagang / Pengepul (*Bidder*)** | Aktor Primer *(Spesialisasi)* | Mitra penebas, agen penggilingan padi, atau pembeli partai besar yang mencari pasokan komoditas pangan berkualitas di bursa lelang dan mengajukan penawaran harga (*bidding*). *(Mewarisi hak akses Warga Ekosistem)* |
| **5** | **AI Decision & Vision Engine** | Aktor Sekunder *(Sistem AI)* | Layanan kecerdasan buatan backend yang menghitung Rencana Anggaran Biaya (RAB) agronomis, kebutuhan pupuk/benih, estimasi hasil panen, serta model Computer Vision untuk mendiagnosis penyakit daun padi. |
| **6** | **Layanan Peta Geospasial (OpenStreetMap)** | Aktor Sekunder *(External API)* | Layanan pemetaan eksternal yang menyediakan peta interaktif dan reverse-geocoding koordinat GPS petak lahan sawah. |

### Diagram Hirarki Aktor (Generalization Hierarchy)
```mermaid
classDiagram
    direction BT
    class WargaEkosistem["Warga Ekosistem Tani (Pengguna Terdaftar)"]
    class Petani["Petani / Pengelola Lahan"]
    class PenyediaJasa["Penyedia Jasa / Penjual (Seller)"]
    class Pedagang["Pedagang / Pengepul (Bidder)"]

    Petani --|> WargaEkosistem : Mewarisi hak akses
    PenyediaJasa --|> WargaEkosistem : Mewarisi hak akses
    Pedagang --|> WargaEkosistem : Mewarisi hak akses
```

---

## 3. Visual Use Case Diagram Lengkap

Berikut adalah diagram visual Use Case sistem AgriBuddy v2.0 beresolusi tinggi yang mencakup seluruh 29 Use Case dalam 5 paket sistem fungsional:

![Use Case Diagram AgriBuddy v2.0](USE_CASE_AgriBuddy.jpg)

*(File vektor SVG juga tersedia di: [`USE_CASE_AgriBuddy.svg`](USE_CASE_AgriBuddy.svg))*

---

## 4. Pemodelan Diagram Use Case Terpadu (Mermaid UML)

```mermaid
flowchart LR
    %% Aktor Pengguna di Kiri
    subgraph AktorPengguna["AKTOR PENGGUNA (HUMAN ACTORS)"]
        direction TB
        User["Pengguna Terdaftar<br/>(Warga Ekosistem Tani)"]
        Petani["Petani / Pengelola Lahan"]
        Seller["Penyedia Jasa / Penjual"]
        Bidder["Pedagang / Pengepul"]
        
        Petani -. mewarisi hak akses .-> User
        Seller -. mewarisi hak akses .-> User
        Bidder -. mewarisi hak akses .-> User
    end

    %% Batasan Sistem Utama
    subgraph AgriBuddy["SISTEM AGRIBUDDY v2.0 (BOUNDARY)"]
        direction TB
        
        subgraph P1["1. Autentikasi & Profil"]
            UC01(["UC-01: Registrasi Akun Warga"])
            UC02(["UC-02: Masuk Sistem (Login & Persona)"])
            UC03(["UC-03: Kelola Profil & Keahlian"])
            UC04(["UC-04: Keluar Sistem (Logout)"])
        end

        subgraph P2["2. Jejaring Sosial Tani"]
            UC05(["UC-05: Buat Postingan Feed Tani"])
            UC06(["UC-06: Beri Tanggapan Suka & Komentar"])
            UC07(["UC-07: Ikuti Profil Warga (Follow)"])
            UC08(["UC-08: Terima Notifikasi In-App"])
        end

        subgraph P3["3. Manajemen Lahan & AI Monitoring"]
            UC09(["UC-09: Kelola Data Petak Sawah"])
            UC10(["UC-10: Tentukan Koordinat GPS Peta"])
            UC11(["UC-11: Atur Tim Bagi Hasil (%)"])
            UC12(["UC-12: Hitung Rencana AI & RAB Modal"])
            UC13(["UC-13: Perbarui Progres Budidaya"])
            UC14(["UC-14: Kelola Buku Modal Lahan"])
            UC15(["UC-15: Diagnosis Penyakit Daun Padi"])
        end

        subgraph P4["4. Marketplace Jasa & Transaksi"]
            UC16(["UC-16: Kelola Pasang Jasa (Seller)"])
            UC17(["UC-17: Jelajah & Filter Katalog Jasa"])
            UC18(["UC-18: Tanya Jawab Diskusi Produk"])
            UC19(["UC-19: Pemesanan Layanan (Checkout)"])
            UC20(["UC-20: Catat Biaya ke Buku Modal"])
            UC21(["UC-21: Konfirmasi Status Armada (Seller)"])
            UC22(["UC-22: Live Tracking Status Pesanan"])
            UC23(["UC-23: Koordinasi Chat Transaksi"])
        end

        subgraph P5["5. Lumbung Traceability & Bursa Lelang"]
            UC24(["UC-24: Kelola Inventaris Stok Saprotan"])
            UC25(["UC-25: Simpan Panen ke Lumbung"])
            UC26(["UC-26: Keterlacakan Lahan Asal"])
            UC27(["UC-27: Daftarkan Lelang Komoditas"])
            UC28(["UC-28: Ajukan Tawaran Harga (Bid)"])
            UC29(["UC-29: Setujui / Tolak Tawaran Lelang"])
        end
    end

    %% Aktor Sekunder / Sistem di Kanan
    subgraph AktorSistem["AKTOR SEKUNDER (SISTEM)"]
        direction TB
        OSM["Layanan Peta Geospasial<br/>(OpenStreetMap / GPS)"]
        AIEngine["AI Decision & Vision Engine<br/>(Agronomic & Vision AI)"]
    end

    %% Asosiasi Pengguna Terdaftar
    User --- UC01
    User --- UC02
    User --- UC03
    User --- UC04
    User --- UC05
    User --- UC06
    User --- UC07
    User --- UC08

    %% Asosiasi Petani
    Petani --- UC09
    Petani --- UC11
    Petani --- UC12
    Petani --- UC13
    Petani --- UC14
    Petani --- UC15
    Petani --- UC17
    Petani --- UC18
    Petani --- UC19
    Petani --- UC22
    Petani --- UC24
    Petani --- UC25
    Petani --- UC27
    Petani --- UC29

    %% Asosiasi Seller
    Seller --- UC16
    Seller --- UC18
    Seller --- UC21
    Seller --- UC23

    %% Asosiasi Bidder
    Bidder --- UC27
    Bidder --- UC28

    %% Asosiasi ke Aktor Sekunder (Murni Garis Lurus Association sesuai UML 2.5)
    UC10 --- OSM
    UC12 --- AIEngine
    UC15 --- AIEngine

    %% Relasi Include (Hanya Antar-Use Case)
    UC09 -. include .-> UC10
    UC25 -. include .-> UC26
    UC26 -. include .-> UC09

    %% Relasi Extend (Hanya Antar-Use Case)
    UC20 -. extend .-> UC19
    UC23 -. extend .-> UC22

    %% Styling
    style User fill:#064e3b,stroke:#059669,stroke-width:2px,color:#ffffff
    style Petani fill:#064e3b,stroke:#059669,stroke-width:2px,color:#ffffff
    style Seller fill:#064e3b,stroke:#059669,stroke-width:2px,color:#ffffff
    style Bidder fill:#064e3b,stroke:#059669,stroke-width:2px,color:#ffffff
    style OSM fill:#1e3a8a,stroke:#3b82f6,stroke-width:2px,color:#ffffff
    style AIEngine fill:#1e3a8a,stroke:#3b82f6,stroke-width:2px,color:#ffffff
```

---

## 5. Diagram Use Case Modular per Paket Fungsional

Untuk memudahkan penyajian dalam penulisan naskah Bab 4 Tugas Akhir / Skripsi, berikut adalah rincian diagram per modul/paket:

### 5.1. Paket 1 & 2: Autentikasi, Profil, & Jejaring Komunitas
```mermaid
flowchart LR
    User["Warga Ekosistem Tani"]
    
    subgraph ModulSosial["Modul Autentikasi & Komunitas"]
        UC01(["UC-01: Registrasi Akun"])
        UC02(["UC-02: Masuk Sistem (Login)"])
        UC03(["UC-03: Kelola Profil"])
        UC04(["UC-04: Keluar Sistem (Logout)"])
        UC05(["UC-05: Buat Postingan Feed"])
        UC06(["UC-06: Beri Suka & Komentar"])
        UC07(["UC-07: Ikuti Profil Warga (Follow)"])
        UC08(["UC-08: Terima Notifikasi In-App"])
    end

    User --- UC01
    User --- UC02
    User --- UC03
    User --- UC04
    User --- UC05
    User --- UC06
    User --- UC07
    User --- UC08
```

### 5.2. Paket 3: Manajemen Lahan, Monitoring Sawah & AI Engine
```mermaid
flowchart LR
    Petani["Petani / Pengelola Lahan"]
    OSM["Layanan Peta OpenStreetMap"]
    AIEngine["AI Decision & Vision Engine"]

    subgraph ModulMonitoring["Modul Monitoring Lahan & AI"]
        UC09(["UC-09: Kelola Petak Sawah"])
        UC10(["UC-10: Tentukan Koordinat GPS"])
        UC11(["UC-11: Atur Tim Bagi Hasil (%)"])
        UC12(["UC-12: Hitung Rencana AI & RAB"])
        UC13(["UC-13: Perbarui Progres Budidaya"])
        UC14(["UC-14: Kelola Buku Modal Lahan"])
        UC15(["UC-15: Diagnosis Penyakit Daun"])
    end

    Petani --- UC09
    Petani --- UC11
    Petani --- UC12
    Petani --- UC13
    Petani --- UC14
    Petani --- UC15

    UC10 --- OSM
    UC12 --- AIEngine
    UC15 --- AIEngine

    UC09 -. "<<include>>" .-> UC10
```

### 5.3. Paket 4: Marketplace Jasa, Pemesanan, & Chat Transaksi
```mermaid
flowchart LR
    Petani["Petani (Pembeli Jasa)"]
    Seller["Penyedia Jasa (Penjual)"]

    subgraph ModulMarketplace["Modul Marketplace Layanan & Pesanan"]
        UC16(["UC-16: Kelola Pasang Jasa"])
        UC17(["UC-17: Jelajah & Filter Katalog"])
        UC18(["UC-18: Tanya Jawab Diskusi Produk"])
        UC19(["UC-19: In-App Checkout"])
        UC20(["UC-20: Catat Biaya ke Buku Modal"])
        UC21(["UC-21: Konfirmasi Status Armada"])
        UC22(["UC-22: Live Tracking Pesanan"])
        UC23(["UC-23: Koordinasi Chat Transaksi"])
    end

    Seller --- UC16
    Seller --- UC18
    Seller --- UC21
    Seller --- UC23

    Petani --- UC17
    Petani --- UC18
    Petani --- UC19
    Petani --- UC22
    Petani --- UC23

    UC20 -. "<<extend>>" .-> UC19
    UC23 -. "<<extend>>" .-> UC22
```

### 5.4. Paket 5: Lumbung Traceability & Bursa Lelang Panen
```mermaid
flowchart LR
    Petani["Petani (Pemilik Panen)"]
    Bidder["Pedagang / Pengepul (Bidder)"]

    subgraph ModulLumbungLelang["Modul Lumbung Traceability & Bursa Lelang"]
        UC24(["UC-24: Kelola Inventaris Saprotan"])
        UC25(["UC-25: Simpan Panen ke Lumbung"])
        UC26(["UC-26: Keterlacakan Lahan Asal"])
        UC27(["UC-27: Daftarkan Lelang Komoditas"])
        UC28(["UC-28: Ajukan Tawaran Harga (Bid)"])
        UC29(["UC-29: Setujui / Tolak Tawaran"])
    end

    Petani --- UC24
    Petani --- UC25
    Petani --- UC27
    Petani --- UC29

    Bidder --- UC27
    Bidder --- UC28

    UC25 -. "<<include>>" .-> UC26
```

---

## 6. Matriks & Kamus Detail Seluruh Use Case (UC-01 s/d UC-29)

| ID Use Case | Nama Use Case | Aktor Utama | Aktor Pendukung | Tipe Relasi | Prekondisi | Pasca-kondisi |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **UC-01** | Registrasi Akun Warga Tani | Pengguna Terdaftar | - | - | Pengguna belum memiliki akun. | Akun baru terdaftar di basis data dan profil terbuat. |
| **UC-02** | Masuk Sistem (Login / Switcher) | Pengguna Terdaftar | - | - | Akun terdaftar aktif. | Sesi autentikasi terbentuk, diarahkan ke dashboard. |
| **UC-03** | Mengelola Profil & Keahlian | Pengguna Terdaftar | - | - | Pengguna telah login. | Data profil, kontak WhatsApp, dan keahlian diperbarui. |
| **UC-04** | Keluar Sistem (Logout) | Pengguna Terdaftar | - | - | Pengguna berada di sesi aktif. | Sesi dihapus dan pengguna diarahkan ke layar login. |
| **UC-05** | Membuat Postingan Feed Tani | Pengguna Terdaftar | - | - | Pengguna telah login. | Postingan muncul di linimasa komunitas tani. |
| **UC-06** | Memberikan Suka & Komentar | Pengguna Terdaftar | - | - | Postingan komunitas tersedia. | Jumlah suka bertambah, komentar tampil di utas. |
| **UC-07** | Mengikuti Warga Lain (*Follow*) | Pengguna Terdaftar | - | - | Profil pengguna lain valid. | Hubungan pertemanan/pengikut tersimpan. |
| **UC-08** | Menerima Notifikasi In-App | Pengguna Terdaftar | - | - | Terjadi peristiwa interaksi. | Notifikasi merah muncul di lonceng bilah atas. |
| **UC-09** | Mengelola Data Petak Lahan Sawah | Petani | - | - | Petani telah terautentikasi. | Petak sawah tercatat dengan data luas dan komoditas. |
| **UC-10** | Menentukan Titik Koordinat Peta | Petani | Layanan Peta GPS | Asosiasi (Aktor Sekunder) & `<<include>>` (oleh UC-09) | Fitur geolokasi browser aktif. | Lintang dan bujur lahan sawah tersimpan presisi. |
| **UC-11** | Mengatur Tim Bagi Hasil (%) | Petani | - | - | Petak sawah telah terdaftar. | Daftar anggota kolaborator & porsi bagi hasil tersimpan. |
| **UC-12** | Menghitung Rencana AI & RAB | Petani | AI Decision Engine | Asosiasi (Aktor Sekunder) | Luas lahan dan jenis tanah valid. | RAB biaya modal, kebutuhan benih/pupuk, & jadwal dibuat. |
| **UC-13** | Memperbarui Progres Budidaya | Petani | - | - | Rencana tani aktif tersedia. | Status tahapan (*Selesai*) & realisasi biaya diperbarui. |
| **UC-14** | Mengelola Buku Modal Lahan | Petani | - | - | Petak sawah terdaftar. | Arus kas pengeluaran modal per petak tercatat rapi. |
| **UC-15** | Diagnosis Penyakit Daun Padi | Petani | AI Vision Engine | Asosiasi (Aktor Sekunder) | Foto daun padi diunggah. | Hasil analisis jenis penyakit & rekomendasi obat tampil. |
| **UC-16** | Mengelola Pasang Layanan Jasa | Penyedia Jasa | - | - | Pengguna berperan sebagai mitra. | Jasa tayang di katalog publik (*available*). |
| **UC-17** | Menjelajah & Filter Katalog Jasa | Petani / Pengguna | - | - | Layanan jasa aktif di katalog. | Hasil pencarian tersaring berdasarkan kategori & wilayah. |
| **UC-18** | Tanya-Jawab Diskusi Produk | Petani, Penyedia | - | - | Produk jasa memiliki halaman tanya. | Diskusi publik terjalin dan notifikasi terkirim. |
| **UC-19** | Melakukan In-App Checkout | Petani (Buyer) | Penyedia Jasa | - | Layanan jasa tersedia. | Pesanan terbentuk dengan status `MENUNGGU`. |
| **UC-20** | Catat Biaya ke Buku Modal Lahan | Petani (Buyer) | - | `<<extend>>` (UC-19) | Checkout berhasil dilakukan. | Biaya pesanan langsung masuk ke buku modal sawah. |
| **UC-21** | Konfirmasi Status Armada Pesanan | Penyedia (Seller) | Petani (Buyer) | - | Pesanan berstatus `MENUNGGU`. | Status berubah (`DIPROSES`/`DIKIRIM`/`SELESAI`). |
| **UC-22** | Memantau Pelacakan Status Pesanan | Petani (Buyer) | - | - | Pesanan aktif berjalan. | Indikator progres & catatan armada tampil real-time. |
| **UC-23** | Koordinasi Obrolan Pesanan (*Chat*) | Petani, Penyedia | - | `<<extend>>` (UC-22) | Pesanan aktif ada. | Percakapan koordinasi waktu tiba armada tersimpan. |
| **UC-24** | Mengelola Inventaris Stok Saprotan | Petani | - | - | Petani memiliki pupuk/benih. | Saldo stok fisik tercatat dengan ambang batas minim. |
| **UC-25** | Menyimpan Hasil Panen ke Lumbung | Petani | - | - | Siklus panen telah selesai. | Tonase panen tercatat di lumbung penyimpanan. |
| **UC-26** | Keterlacakan Lahan Asal (*Traceability*) | Petani | - | `<<include>>` (UC-25) | Lahan sawah terdata di sistem. | Panen terhubung secara permanen dengan petak asal. |
| **UC-27** | Mendaftarkan Komoditas ke Lelang | Petani (Seller) | - | - | Panen tersimpan di lumbung. | Lelang komoditas terbuka di bursa pasar lelang. |
| **UC-28** | Mengajukan Tawaran Harga (*Bid*) | Pedagang (Bidder) | Petani (Seller) | - | Lelang komoditas berstatus aktif. | Penawaran harga/kg & tonase tercatat di sistem. |
| **UC-29** | Menyetujui / Menolak Tawaran | Petani (Seller) | Pedagang (Bidder) | - | Penawaran harga lelang masuk. | Transaksi lelang disepakati, stok panen terpotong. |

---

## 7. Skenario Naratif Use Case Inti (*Use Case Specifications*)

### 7.1. Skenario UC-12: Menghitung Rencana Tani AI & Anggaran Biaya (RAB)
* **Aktor Utama:** Petani / Pengelola Lahan
* **Aktor Sekunder:** AI Decision Engine
* **Deskripsi:** Petani meminta sistem kecerdasan buatan untuk menghitungkan kebutuhan modal, pupuk, benih, dan jadwal kerja agronomis berdasarkan luas lahan sawah.
* **Prekondisi:** Petani telah memilih petak sawah yang memiliki data luas lahan dan karakteristik tanah.
* **Alur Utama (*Main Flow*):**
  1. Petani membuka menu **Monitoring** $\rightarrow$ tab **Sawah & AI**.
  2. Petani memilih petak sawah sasaran (misal: *Sawah Blok Krajan 0.8 Ha*).
  3. Petani menekan tombol **"Hitung Ulang Rencana AI"**.
  4. Sistem mengirimkan parameter luas lahan, jenis tanah, komoditas, dan sumber air ke **AI Decision Engine**.
  5. AI Engine memproses kalkulasi agronomis: estimasi tonase panen, proyeksi penerimaan kotor, RAB modal per fase tanam, dan estimasi laba bersih.
  6. Sistem menyimpan rencana ke entitas `FARM_PLAN` dan menghasilkan 5 tahapan kerja interaktif di `FARM_PLAN_STEP`.
  7. Sistem menampilkan dashboard rencana kerja dan grafik kalkulasi modal kepada petani.
* **Alur Alternatif (*Alternative Flow*):**
  * *4a. Parameter lahan belum lengkap:* Sistem menampilkan notifikasi pengisian luas lahan terlebih dahulu.
* **Pasca-kondisi:** Rencana Tani AI tersimpan dan siap dijadikan panduan operasional lapangan.

---

### 7.2. Skenario UC-19 & UC-20: Pemesanan Layanan (Checkout) & Integrasi Buku Modal
* **Aktor Utama:** Petani (Pembeli Jasa)
* **Aktor Pendukung:** Penyedia Jasa (Penjual)
* **Deskripsi:** Petani memesan jasa olah tanah traktor di katalog marketplace dan secara otomatis mencatat biayanya ke dalam buku kas modal sawah yang bersangkutan.
* **Prekondisi:** Layanan traktor berstatus aktif (*is_available = true*) dan petani memiliki minimal satu petak sawah terdaftar.
* **Alur Utama (*Main Flow*):**
  1. Petani membuka menu **Katalog** dan memilih layanan *"Sewa Traktor Quick Kubota"*.
  2. Petani menekan tombol **"Pesan Sekarang"**.
  3. Sistem menampilkan modal checkout dengan rincian luas lahan yang akan dibajak (misal: 0.8 Ha), kalkulasi total tarif (Rp 960.000), dan opsi metode pembayaran (*YARNEN / Bayar Pasca-Panen*).
  4. Petani mengisi instruksi lahan dan menekan tombol **"Konfirmasi Pesanan"**.
  5. Sistem membuat transaksi `SERVICE_ORDER` baru dengan status `MENUNGGU` serta memicu notifikasi `ORDER_RECEIVED` ke akun penyedia traktor.
  6. *(Relasi `<<extend>>` UC-20)*: Sistem memunculkan prompt konfirmasi: *"Apakah ingin mencatat pengeluaran Rp 960.000 ini ke Buku Modal Lahan?"*.
  7. Petani memilih *"Sawah Blok Krajan"* dan menyetujui prompt.
  8. Sistem menambahkan entitas `CAPITAL_EXPENSE` pada lahan tersebut dengan kategori `OLAH_TANAH` dan sumber `MARKETPLACE`.
* **Pasca-kondisi:** Pesanan masuk ke daftar tunggu penyedia jasa dan buku kas pengeluaran sawah bertambah secara akurat.

---

### 7.3. Skenario UC-25, UC-26, & UC-27: Simpan Panen Lumbung & Keterlacakan Lelang
* **Aktor Utama:** Petani / Pengelola Lahan
* **Aktor Pendukung:** Pedagang / Pengepul (*Bidder*)
* **Deskripsi:** Petani mencatat panen gabah ke lumbung dengan mengaitkan petak sawah asalnya, kemudian melelang komoditas tersebut di bursa lelang.
* **Prekondisi:** Petak sawah telah menyelesaikan masa pemeliharaan budidaya.
* **Alur Utama (*Main Flow*):**
  1. Petani membuka menu **Monitoring** $\rightarrow$ tab **Lumbung**.
  2. Petani menekan tombol **"Tambah Stok Panen"**.
  3. Petani mengisi tonase hasil panen (misal: 4.800 Kg Gabah Kering Panen / GKP) dan memilih petak sawah asalnya (*Sawah Blok Krajan*).
  4. *(Relasi `<<include>>` UC-26)*: Sistem menautkan ID lahan ke entitas `HARVEST_STORAGE` (`farmland_id FK`) sehingga seluruh catatan varietas dan riwayat lahan terikat secara permanen.
  5. Petani memilih opsi **"Buka Lelang Bursa"** pada kartu panen tersebut.
  6. Petani menentukan harga awal (misal: Rp 7.200 / Kg) dan volume minimal pembelian (500 Kg).
  7. Sistem menerbitkan listing lelang pada entitas `MARKET_LISTING` dengan status `DIBUKA`.
  8. Pedagang komoditas dapat melihat lelang di bursa dan mengajukan penawaran harga (`MARKET_BID`).
* **Pasca-kondisi:** Komoditas panen tersimpan dengan histori asal lahan yang dapat dilacak (*traceable*) dan siap ditransaksikan di bursa lelang.

---

## 8. Kesimpulan & Relevansi Pengujian Akademis

Rancangan Use Case Diagram AgriBuddy v2.0 ini:
1. **Mematuhi Kaidah Baku UML 2.5 secara Ketat:**
   - **Garis Asosiasi Solid ke Aktor Sekunder**: Hubungan antara Use Case (`UC-10`, `UC-12`, `UC-15`) dengan aktor sistem sekunder eksternal (`Layanan Peta Geospasial` dan `AI Decision & Vision Engine`) dimodelkan menggunakan **garis solid Association biasa**. Sesuai kaidah baku UML 2.5, aktor sistem berada di luar batasan sistem (*system boundary*) sehingga tidak dapat menjadi subjek maupun objek dari relasi ketergantungan `<<include>>` atau `<<extend>>`.
   - **Relasi `<<include>>` dan `<<extend>>` Murni Antar-Use Case**: Relasi dependensi hanya menghubungkan dua Use Case di dalam *system boundary*:
     - `UC-09 (Kelola Lahan)` $\xrightarrow{\ll include\gg}$ `UC-10 (Tentukan Koordinat GPS)`: Syarat mutlak kelengkapan data lahan.
     - `UC-25 (Simpan Panen)` $\xrightarrow{\ll include\gg}$ `UC-26 (Keterlacakan Lahan Asal)` $\xrightarrow{\ll include\gg}$ `UC-09`: Syarat mutlak *food traceability*.
     - `UC-20 (Catat Buku Modal)` $\xrightarrow{\ll extend\gg}$ `UC-19 (Checkout)`: Alur opsional pasca-pemesanan.
     - `UC-23 (Chat Transaksi)` $\xrightarrow{\ll extend\gg}$ `UC-22 (Live Tracking)`: Fitur komunikasi opsional selama pelacakan pesanan.
2. **Menjawab Dinamika Ekosistem Tani:** Menjelaskan secara gamblang bagaimana peran fleksibel (*petani, tukang bajak, penyewa pompa, juragan gabah*) dapat saling bertukar peran secara elegan di satu platform berkat relasi pewarisan (*generalization*) dari entitas `Pengguna Terdaftar`.
3. **Keterpaduan Sistem AI & Geospasial:** Menempatkan modul kecerdasan buatan (*Agronomic Decision Engine* dan *AI Vision Leaf Classifier*) serta pemetaan GPS sebagai aktor layanan eksternal yang diintegrasikan secara fungsional ke dalam alur operasional usahatani cerdas.
