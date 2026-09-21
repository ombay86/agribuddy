<template>
  <div class="p-4 space-y-4 pb-28">
    <!-- Header Banner Marketplace -->
    <div class="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 rounded-3xl shadow-md relative overflow-hidden">
      <div class="relative z-10 space-y-1.5">
        <div class="inline-flex items-center gap-1.5 bg-emerald-400/20 text-emerald-200 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          <Store :size="13" /> Marketplace Ekosistem Tani
        </div>
        <h2 class="text-xl font-black tracking-tight leading-tight">
          Katalog Layanan & Produk Pendukung
        </h2>
        <p class="text-xs text-emerald-100/90 leading-relaxed">
          Temukan jasa olah tanah traktor, pengairan pompa, regu buruh cangkul & tanam, saprotan, hingga penggilingan padi dari sesama warga ekosistem.
        </p>
      </div>
      <!-- Action Buttons -->
      <div class="relative z-10 pt-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          @click="openCreateModal"
          class="btn-farmer bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-black py-2.5 px-3.5 rounded-xl shadow-md active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
        >
          <PlusCircle :size="15" class="text-emerald-700" /> Pasang Layanan
        </button>
        <button
          @click="toggleMyServicesOnly"
          class="text-xs font-black py-2.5 px-3 rounded-xl border transition-all flex items-center gap-1.5 active:scale-95 shrink-0"
          :class="showMyServicesOnly ? 'bg-emerald-700 text-white border-emerald-400' : 'bg-emerald-950/40 text-emerald-200 border-emerald-300/60 hover:bg-emerald-900/60'"
        >
          <Briefcase :size="14" /> {{ showMyServicesOnly ? 'Semua Katalog' : 'Layanan Saya' }}
        </button>
        <button
          @click="toggleSellerOrdersView"
          class="text-xs font-black py-2.5 px-3 rounded-xl border transition-all flex items-center gap-1.5 active:scale-95 shrink-0 relative"
          :class="showSellerOrdersView ? 'bg-amber-500 text-slate-900 border-amber-300 font-black shadow-sm' : 'bg-emerald-950/40 text-emerald-200 border-emerald-300/60 hover:bg-emerald-900/60'"
        >
          <ClipboardList :size="14" /> Pesanan Masuk
          <span v-if="pendingSellerOrdersCount > 0" class="bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full animate-pulse">
            {{ pendingSellerOrdersCount }}
          </span>
        </button>
      </div>
      <div class="absolute -right-4 -bottom-6 text-emerald-700/20 select-none pointer-events-none text-9xl font-black">
        🛒
      </div>
    </div>

    <!-- SECTION SELLER ORDERS MANAGEMENT -->
    <div v-if="showSellerOrdersView" class="space-y-3">
      <div class="flex items-center justify-between px-1">
        <div>
          <h3 class="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <ClipboardList :size="14" class="text-amber-600" /> Pesanan Masuk Layanan Anda
          </h3>
          <p class="text-[11px] text-slate-500 font-semibold mt-0.5">
            Beri konfirmasi kepastian pengerjaan, keberangkatan, atau stok barang ke pembeli.
          </p>
        </div>
        <span class="text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-1 rounded-xl">
          {{ filteredSellerOrders.length }} Pesanan
        </span>
      </div>

      <!-- Filter Tabs Pesanan Masuk -->
      <div class="flex p-1 bg-slate-200/80 rounded-2xl gap-1 overflow-x-auto no-scrollbar text-xs font-black">
        <button
          v-for="flt in [
            { key: 'SEMUA', label: 'Semua' },
            { key: 'MENUNGGU', label: 'Perlu Konfirmasi' },
            { key: 'PROSES', label: 'Sedang Proses / Jalan' },
            { key: 'SELESAI', label: 'Selesai' },
            { key: 'BATAL', label: 'Stok Habis / Batal' }
          ]"
          :key="flt.key"
          @click="sellerOrdersFilter = flt.key"
          class="flex-1 py-1.5 px-2 rounded-xl transition-all whitespace-nowrap text-center text-[11px]"
          :class="sellerOrdersFilter === flt.key ? 'bg-white text-emerald-800 shadow-sm font-black' : 'text-slate-600 hover:text-slate-800'"
        >
          {{ flt.label }}
        </button>
      </div>

      <!-- Empty State -->
      <div v-if="filteredSellerOrders.length === 0" class="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-2">
        <div class="text-3xl">📦</div>
        <h4 class="text-xs font-black text-slate-800">Tidak ada pesanan pada filter ini</h4>
        <p class="text-[11px] text-slate-500 max-w-xs mx-auto">
          Saat ada warga yang memesan layanan Anda di katalog, pesanan akan muncul di sini untuk dikonfirmasi.
        </p>
      </div>

      <!-- List Pesanan Masuk (Grid Responsif Web) -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="ord in filteredSellerOrders"
          :key="ord.id"
          class="bg-white border border-slate-200 rounded-3xl p-4.5 shadow-sm space-y-3 hover:border-emerald-300 transition-all flex flex-col justify-between"
        >
          <div class="space-y-3">
            <!-- Header Pesanan -->
            <div class="flex items-start justify-between gap-2">
              <div>
                <div class="flex items-center gap-1.5">
                  <span class="text-xs font-black text-slate-800">{{ ord.buyer_name }}</span>
                  <span class="text-[9px] font-bold text-slate-400">#{{ ord.id }}</span>
                </div>
                <p class="text-[10px] text-slate-500 font-semibold mt-0.5">Dipesan pada: {{ ord.created_at }}</p>
              </div>
              <!-- Status Badge -->
              <span
                class="text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1"
                :class="getOrderStatusBadgeClass(ord.status)"
              >
                {{ getOrderStatusLabel(ord.status) }}
              </span>
            </div>

            <!-- Rincian Layanan & Biaya -->
            <div class="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
              <div class="flex items-baseline justify-between">
                <span class="font-black text-slate-800">{{ ord.service_title }}</span>
                <span class="font-black text-emerald-700">Rp {{ ord.total_price.toLocaleString('id-ID') }}</span>
              </div>
              <div class="text-[11px] text-slate-500 font-semibold flex items-center justify-between">
                <span>Jumlah: <strong>{{ ord.quantity }} {{ ord.unit }}</strong></span>
                <span>Metode: <strong>{{ ord.payment_method }}</strong></span>
              </div>
              <div v-if="ord.delivery_notes" class="text-[11px] text-slate-600 italic pt-1 border-t border-slate-200/60">
                "{{ ord.delivery_notes }}"
              </div>
            </div>

            <!-- Catatan Terakhir dari Penjual jika ada -->
            <div v-if="ord.seller_notes" class="p-2.5 bg-amber-50/70 border border-amber-200/60 rounded-xl text-[11px] text-amber-900 font-medium">
              <strong>Catatan Konfirmasi Anda:</strong> {{ ord.seller_notes }}
              <span v-if="ord.status_updated_at" class="block text-[9px] text-amber-700/80 mt-0.5">Diperbarui: {{ ord.status_updated_at }}</span>
            </div>
          </div>

          <!-- Tombol Aksi Konfirmasi Seller & Chat Pembeli -->
          <div class="pt-2 border-t border-slate-100 flex items-center justify-end gap-2 flex-wrap">
            <button
              @click="openOrderChat(ord)"
              class="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 py-2 px-3 rounded-xl active:scale-95 transition-all flex items-center gap-1.5"
              title="Buka Obrolan Transaksi dengan Pembeli"
            >
              <MessageSquare :size="13" class="text-blue-600" /> Chat Pembeli
            </button>
            <button
              @click="openOrderStatusModal(ord)"
              class="btn-farmer bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs py-2 px-3.5 rounded-xl shadow-sm active:scale-95 transition-all flex items-center gap-1.5"
            >
              <ClipboardList :size="13" /> Beri Konfirmasi / Ubah Status
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION 2: NORMAL CATALOG SERVICES (KETIKA TIDAK MEMBUKA TAB PESANAN SELLER) -->
    <div v-else class="space-y-4">
      <!-- Search Bar & Filters -->
      <div class="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm space-y-2.5">
      <!-- Search Input -->
      <div class="relative">
        <Search :size="16" class="absolute inset-y-0 left-3 my-auto text-slate-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari traktor, pompa, buruh tanam, pupuk, gabah..."
          class="w-full pl-9 pr-4 py-2 text-xs font-semibold rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500"
          @input="fetchServices"
        />
        <button
          v-if="searchQuery"
          @click="searchQuery = ''; fetchServices()"
          class="absolute inset-y-0 right-3 my-auto text-xs text-slate-400 font-bold"
        >
          ✕
        </button>
      </div>

      <!-- Kategori Filter Chips -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
        <button
          v-for="cat in categories"
          :key="cat.key"
          @click="selectCategory(cat.key)"
          class="px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1 shrink-0 active:scale-95"
          :class="selectedCategory === cat.key
            ? 'bg-emerald-600 text-white font-black shadow-sm'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
        >
          <span>{{ cat.emoji }}</span>
          <span>{{ cat.label }}</span>
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-12 space-y-2">
      <Loader2 :size="32" class="animate-spin text-emerald-600 mx-auto" />
      <p class="text-xs font-bold text-slate-500">Memuat katalog layanan ekosistem...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="services.length === 0" class="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-3">
      <div class="text-4xl">🔍</div>
      <h3 class="text-sm font-black text-slate-800">Tidak ada layanan ditemukan</h3>
      <p class="text-xs text-slate-500 max-w-xs mx-auto">
        Belum ada layanan atau produk yang sesuai dengan kriteria pencarian Anda.
      </p>
      <button
        @click="openCreateModal"
        class="btn-farmer bg-emerald-600 text-white text-xs font-black py-2 px-4 rounded-xl mx-auto flex items-center gap-1.5"
      >
        <PlusCircle :size="14" /> Pasang Layanan Baru
      </button>
    </div>

    <!-- Services Grid/List (Responsif Web Multi-Kolom) -->
    <div v-else class="space-y-3">
      <div class="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
        <span>Ditemukan {{ services.length }} Layanan & Produk</span>
        <span v-if="showMyServicesOnly" class="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md text-[11px] font-black">
          Kelola Layanan Akun Saya
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="service in services"
          :key="service.id"
          class="bg-white border rounded-3xl p-4.5 shadow-sm space-y-3 hover:border-emerald-300 transition-all flex flex-col justify-between"
          :class="isMyService(service) ? 'border-emerald-200 bg-emerald-50/15 ring-1 ring-emerald-100' : 'border-slate-200'"
        >
          <div class="space-y-3">
            <!-- Header: Provider Info & Category -->
            <div class="flex items-start justify-between gap-2">
              <div class="flex items-center gap-2.5">
                <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 border border-emerald-200 flex items-center justify-center text-xl shadow-xs">
                  {{ service.provider_avatar || '🌾' }}
                </div>
                <div>
                  <div class="flex items-center gap-1.5">
                    <h4 class="text-xs font-black text-slate-800">{{ service.provider_name }}</h4>
                    <span class="text-[9px] font-extrabold px-2 py-0.5 rounded-full" :class="getBadgeClass(service.category)">
                      {{ service.provider_badge }}
                    </span>
                  </div>
                  <div class="text-[10px] text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                    <MapPin :size="11" class="text-slate-400" /> {{ service.location }}
                  </div>
                </div>
              </div>

              <!-- Availability Tag -->
              <span
                class="text-[10px] font-extrabold px-2 py-0.5 rounded-md"
                :class="service.is_available ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'"
              >
                {{ service.is_available ? '● Siap Kerja' : '○ Penuh' }}
              </span>
            </div>

            <!-- Service Title & Price -->
            <div class="border-t border-slate-100 pt-2.5 flex items-start justify-between gap-2">
              <div>
                <span class="text-[10px] font-extrabold uppercase text-emerald-700 tracking-wider block">
                  {{ service.category_label }}
                </span>
                <h3 class="text-sm font-black text-slate-800 mt-0.5 leading-snug">
                  {{ service.title }}
                </h3>
              </div>
              <div class="text-right shrink-0">
                <div class="text-base font-black text-emerald-700">
                  Rp {{ service.price.toLocaleString('id-ID') }}
                </div>
                <span class="text-[10px] text-slate-500 font-bold block">{{ service.price_unit }}</span>
              </div>
            </div>

            <!-- Description -->
            <p class="text-xs text-slate-600 leading-relaxed">
              {{ service.description }}
            </p>

            <!-- Skill & Service Tags -->
            <div v-if="service.tags && service.tags.length > 0" class="flex flex-wrap gap-1">
              <span
                v-for="(tag, tIdx) in service.tags"
                :key="tIdx"
                class="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg"
              >
                # {{ tag }}
              </span>
            </div>
          </div>

          <!-- Action Footer -->
          <div class="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
            <!-- When It's My Service: Edit, Delete, & Diskusi -->
            <template v-if="isMyService(service)">
              <div class="flex items-center gap-1.5 flex-wrap">
                <button
                  @click="openProductDiscussion(service)"
                  class="text-xs font-black text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1"
                  title="Lihat Pertanyaan Warga"
                >
                  <MessageCircle :size="13" /> Diskusi
                </button>
                <button
                  @click="openEditModal(service)"
                  class="text-xs font-black text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1"
                >
                  <Edit :size="13" /> Edit
                </button>
                <button
                  @click="handleDeleteService(service.id)"
                  class="text-xs font-black text-rose-600 bg-rose-50 hover:bg-rose-100 px-2 py-1.5 rounded-xl transition-all flex items-center gap-1"
                >
                  <Trash2 :size="13" />
                </button>
              </div>
              <span class="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded-lg">
                Layanan Aktif
              </span>
            </template>

            <!-- When It's Another User's Service: Diskusi, WA, Checkout -->
            <template v-else>
              <div class="flex items-center gap-1.5 w-full justify-between pt-1">
                <button
                  @click="openProductDiscussion(service)"
                  class="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 py-2 px-2.5 rounded-xl active:scale-95 transition-all flex items-center gap-1"
                  title="Tanya Jawab / Diskusi Produk"
                >
                  <MessageCircle :size="13" class="text-amber-600" /> Diskusi
                </button>
                <div class="flex items-center gap-1.5">
                  <button
                    @click="contactService(service)"
                    class="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 py-2 px-2.5 rounded-xl active:scale-95 transition-all flex items-center gap-1"
                    title="Chat via WhatsApp"
                  >
                    <MessageSquare :size="13" class="text-emerald-600" /> WA
                  </button>
                  <button
                    @click="openCheckoutModal(service)"
                    class="btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-2 px-3 rounded-xl shadow-sm active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <ShoppingCart :size="13" /> Pesan
                  </button>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>

    <!-- Modal Form: Tambah / Edit Layanan Pengguna -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div class="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto relative">
        <!-- Close Button -->
        <button
          @click="isModalOpen = false"
          class="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-500 p-1.5 rounded-full transition-all"
        >
          ✕
        </button>

        <!-- Modal Header -->
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
            {{ isEditing ? 'Edit Layanan' : 'Layanan Baru' }}
          </div>
          <h3 class="text-base font-black text-slate-800">
            {{ isEditing ? 'Perbarui Layanan & Tarif' : 'Pasang Layanan / Produk Anda' }}
          </h3>
          <p class="text-xs text-slate-500">
            Tawarkan keahlian atau produk usahatani Anda ke seluruh warga ekosistem AgriBuddy.
          </p>
        </div>

        <!-- Form Input -->
        <form @submit.prevent="saveService" class="space-y-3 pt-1">
          <!-- Judul Layanan -->
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Nama Layanan / Produk</label>
            <input
              v-model="serviceForm.title"
              type="text"
              required
              placeholder="Contoh: Sewa Traktor Quick, Jasa Pompa Alkon, Bibit Inpari"
              class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
            />
          </div>

          <!-- Kategori -->
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Kategori Layanan</label>
            <select
              v-model="serviceForm.category"
              class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 bg-white"
            >
              <option value="JASA_TRAKTOR">🚜 Jasa Olah Tanah & Traktor</option>
              <option value="JASA_PENGAIRAN">💧 Jasa Pompa Air & Irigasi</option>
              <option value="JASA_TENAGA_KERJA">🌾 Tenaga Kerja Tani (Cangkul & Tanam)</option>
              <option value="SAPROTAN">🏪 Saprotan (Pupuk, Benih, Obat)</option>
              <option value="HASIL_PANEN">📦 Hasil Panen & Pembelian Gabah</option>
              <option value="PASCA_PANEN">🚚 Pasca Panen, Penggilingan & Angkut</option>
            </select>
          </div>

          <!-- Harga & Satuan -->
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Tarif / Harga (Rp)</label>
              <input
                v-model.number="serviceForm.price"
                type="number"
                required
                placeholder="1200000"
                class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-black text-slate-800 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Satuan Tarif</label>
              <select
                v-model="serviceForm.price_unit"
                class="w-full px-2.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 bg-white"
              >
                <option value="/ Hektar">/ Hektar</option>
                <option value="/ Hari">/ Hari</option>
                <option value="/ Jam">/ Jam</option>
                <option value="/ Orang / Hari">/ Orang / Hari</option>
                <option value="/ Karung (50kg)">/ Karung (50kg)</option>
                <option value="/ kg GKP">/ kg GKP</option>
                <option value="/ Paket Lahan">/ Paket Lahan</option>
              </select>
            </div>
          </div>

          <!-- Lokasi Jangkauan -->
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Lokasi Wilayah Layanan</label>
            <input
              v-model="serviceForm.location"
              type="text"
              required
              placeholder="Desa Sukamaju Krajan (Siap ke Lokasi)"
              class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
            />
          </div>

          <!-- Nomor WhatsApp -->
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Nomor WhatsApp Kontak</label>
            <input
              v-model="serviceForm.phone"
              type="tel"
              placeholder="628123456789"
              class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
            />
          </div>

          <!-- Deskripsi Layanan -->
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Keterangan & Rincian Fasilitas</label>
            <textarea
              v-model="serviceForm.description"
              rows="3"
              required
              placeholder="Jelaskan spesifikasi alat, kapasitas, jumlah operator, atau jaminan hasil kerja..."
              class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
            ></textarea>
          </div>

          <!-- Tag Spesialisasi (Koma pisah) -->
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Tag Keahlian (Pisahkan dengan koma)</label>
            <input
              v-model="tagsInput"
              type="text"
              placeholder="Traktor Roda 2, Operator Ahli, Lahan Basah"
              class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
            />
          </div>

          <!-- Submit Buttons -->
          <div class="pt-3 flex gap-2">
            <button
              type="button"
              @click="isModalOpen = false"
              class="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex-1 btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 rounded-xl shadow-md active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-60"
            >
              <Check :size="15" />
              <span>{{ isSubmitting ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Publikasikan Layanan') }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal 2: In-App Checkout Layanan / Produk -->
    <div v-if="isCheckoutModalOpen && selectedServiceForOrder" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div class="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto relative">
        <button
          @click="isCheckoutModalOpen = false"
          class="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-500 p-1.5 rounded-full transition-all"
        >
          ✕
        </button>

        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
            🛒 Checkout Layanan Ekosistem
          </div>
          <h3 class="text-base font-black text-slate-800">
            Pesan Jasa / Produk Langsung
          </h3>
          <p class="text-xs text-slate-500">
            Pemesanan akan langsung diteruskan dan memicu notifikasi ke penyedia jasa.
          </p>
        </div>

        <!-- Ringkasan Layanan yang Dipilih -->
        <div class="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-3.5 space-y-2">
          <div class="flex items-start justify-between">
            <div>
              <span class="text-[10px] font-extrabold text-emerald-700 uppercase">
                {{ selectedServiceForOrder.category_label }}
              </span>
              <h4 class="text-sm font-black text-slate-800">{{ selectedServiceForOrder.title }}</h4>
              <p class="text-[11px] text-slate-500 font-semibold mt-0.5">
                Penyedia: <strong>{{ selectedServiceForOrder.provider_name }}</strong> ({{ selectedServiceForOrder.provider_badge }})
              </p>
            </div>
            <div class="text-right">
              <span class="text-[10px] font-bold text-slate-400 block">Tarif Satuan</span>
              <span class="text-sm font-black text-emerald-700">
                Rp {{ selectedServiceForOrder.price.toLocaleString('id-ID') }}
              </span>
              <span class="text-[10px] text-slate-500 block">{{ selectedServiceForOrder.price_unit }}</span>
            </div>
          </div>
        </div>

        <!-- Form Pemesanan -->
        <form @submit.prevent="handleCheckoutSubmit" class="space-y-3 pt-1">
          <!-- Kuantitas / Luas Lahan / Jumlah Jam -->
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">
              Jumlah Pemesanan ({{ selectedServiceForOrder.price_unit }}):
            </label>
            <div class="flex items-center gap-2">
              <input
                v-model.number="checkoutForm.quantity"
                type="number"
                step="0.1"
                min="0.1"
                required
                class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
              />
              <span class="text-xs font-bold text-slate-500 shrink-0">
                {{ selectedServiceForOrder.price_unit }}
              </span>
            </div>
          </div>

          <!-- Total Biaya Kalkulasi Realtime -->
          <div class="p-3 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
            <span class="text-xs font-bold text-slate-300">Total Biaya Pemesanan:</span>
            <span class="text-base font-black text-emerald-400">
              Rp {{ (checkoutForm.quantity * selectedServiceForOrder.price).toLocaleString('id-ID') }}
            </span>
          </div>

          <!-- Metode Pembayaran -->
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Metode Pembayaran</label>
            <select
              v-model="checkoutForm.payment_method"
              class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 bg-white"
            >
              <option value="COD / Bayar Saat Pengerjaan">💵 COD / Bayar Tunai Saat Pengerjaan</option>
              <option value="YARNEN (Bayar Saat Panen)">🌾 YARNEN (Bayar Pasca Panen)</option>
              <option value="Transfer Rekening Bank / QRIS">💳 Transfer Bank / QRIS</option>
            </select>
          </div>

          <!-- Catatan / Tanggal Pengerjaan -->
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Catatan Lokasi & Waktu Pengerjaan</label>
            <textarea
              v-model="checkoutForm.delivery_notes"
              rows="2"
              placeholder="Contoh: Tolong mulai Sabtu pagi jam 07.00 di Sawah Blok Krajan dekat saluran tersier."
              class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
            ></textarea>
          </div>

          <div class="pt-2 flex items-center gap-2">
            <button
              type="button"
              @click="isCheckoutModalOpen = false"
              class="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="isSubmittingOrder || checkoutForm.quantity <= 0"
              class="flex-1 btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 rounded-xl shadow-md active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-60"
            >
              <Loader2 v-if="isSubmittingOrder" :size="15" class="animate-spin" />
              <Check v-else :size="15" />
              <span>{{ isSubmittingOrder ? 'Memproses...' : 'Konfirmasi Pesanan' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal 3: Konfirmasi Post-Checkout: Masukkan ke Buku Modal Lahan -->
    <div v-if="isPostCheckoutPromptOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div class="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto relative">
        <!-- Success Animation / Header -->
        <div class="text-center space-y-1.5 pt-2">
          <div class="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-inner">
            ✅
          </div>
          <h3 class="text-base font-black text-slate-800">
            Pesanan Berhasil Dibuat!
          </h3>
          <p class="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
            Notifikasi pemesanan telah dikirim ke <strong>{{ createdOrderData?.seller_notified }}</strong>.
          </p>
        </div>

        <!-- Question Prompt Requested by User -->
        <div class="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 space-y-3">
          <div class="flex items-start gap-2.5">
            <span class="text-xl">💰</span>
            <div>
              <h4 class="text-xs font-black text-amber-900 leading-snug">
                Apakah kamu ingin memasukkannya ke dalam buku modal?
              </h4>
              <p class="text-[11px] text-amber-800/90 mt-0.5">
                Biaya transaksi <strong>Rp {{ createdOrderData?.order?.total_price?.toLocaleString('id-ID') }}</strong> dapat langsung dicatat ke pos pengeluaran lahan sawah Anda.
              </p>
            </div>
          </div>

          <!-- Step: Pilih Lahan -->
          <div class="space-y-2 pt-1 border-t border-amber-200/60">
            <label class="text-xs font-black text-slate-700 block">
              Pilih Lahan yang Dibiayai:
            </label>
            <select
              v-model="selectedFarmIdForExpense"
              class="w-full px-3 py-2 rounded-xl border border-amber-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 bg-white shadow-xs"
            >
              <option v-for="farm in userFarmlands" :key="farm.id" :value="farm.id">
                🌾 {{ farm.name }} ({{ farm.land_size_ha }} Ha)
              </option>
            </select>

            <label class="text-xs font-black text-slate-700 block pt-1">
              Kategori Pengeluaran:
            </label>
            <select
              v-model="expenseCategory"
              class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 bg-white"
            >
              <option value="OLAH_TANAH">🚜 Olah Tanah & Lahan</option>
              <option value="PENGAIRAN">💧 Operasional Pompa & Pengairan</option>
              <option value="BENIH_BIBIT">🌱 Benih / Bibit Semai</option>
              <option value="PUPUK_NUTRISI">🌿 Pupuk Organik & Kimia</option>
              <option value="TENAGA_KERJA">👥 Upah Tenaga Tanam / Buruh</option>
              <option value="OBAT_HAMA">🛡️ Perlindungan Hama / Pestisida</option>
              <option value="LAINNYA">📦 Operasional Panen / Lainnya</option>
            </select>
          </div>
        </div>

        <!-- Success Toast Feedback inline -->
        <div v-if="expenseSuccessMessage" class="bg-emerald-600 text-white p-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 animate-in fade-in">
          <CheckCircle2 :size="15" />
          <span>{{ expenseSuccessMessage }}</span>
        </div>

        <!-- Buttons: Ya vs Tidak -->
        <div v-if="!expenseSuccessMessage" class="flex items-center gap-2 pt-1">
          <button
            type="button"
            @click="closePostCheckoutPrompt"
            class="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
          >
            Tidak, Nanti Saja
          </button>
          <button
            type="button"
            @click="saveExpenseToFarmModal"
            :disabled="isRecordingExpense || !selectedFarmIdForExpense"
            class="flex-1 btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 rounded-xl shadow-md active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-60"
          >
            <Loader2 v-if="isRecordingExpense" :size="15" class="animate-spin" />
            <Check v-else :size="15" />
            <span>{{ isRecordingExpense ? 'Mencatat...' : 'Ya, Masukkan ke Modal' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal 4: Konfirmasi Status Pesanan oleh Seller -->
    <div v-if="isOrderStatusModalOpen && selectedOrderForStatus" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div class="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto relative">
        <button
          @click="isOrderStatusModalOpen = false"
          class="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-500 p-1.5 rounded-full transition-all"
        >
          ✕
        </button>

        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
            📋 Konfirmasi Penjual
          </div>
          <h3 class="text-base font-black text-slate-800">
            Perbarui Status & Beri Kepastian
          </h3>
          <p class="text-xs text-slate-500">
            Pembeli (<strong>{{ selectedOrderForStatus.buyer_name }}</strong>) akan menerima notifikasi status dan catatan ini seketika.
          </p>
        </div>

        <form @submit.prevent="submitOrderStatusUpdate" class="space-y-3 pt-1">
          <!-- Pilihan Status Konfirmasi -->
          <div class="space-y-1.5">
            <label class="text-xs font-bold text-slate-700 block">Pilih Status Pesanan Saat Ini:</label>
            <div class="grid grid-cols-1 gap-2">
              <label
                v-for="opt in [
                  { val: 'DIPROSES', icon: '🚜', title: 'Konfirmasi & Mulai Proses', desc: 'Jadwal disetujui / persiapan pengerjaan' },
                  { val: 'SEDANG_DIKIRIM', icon: '🚚', title: 'Mulai Dikirim / Berangkat ke Lahan', desc: 'Armada / tenaga kerja sedang dalam perjalanan' },
                  { val: 'SELESAI', icon: '✅', title: 'Pesanan Selesai / Tuntas', desc: 'Pengerjaan selesai sempurna atau barang diterima' },
                  { val: 'STOK_HABIS', icon: '⚠️', title: 'Stok Habis / Jadwal Penuh', desc: 'Tidak dapat melayani pesanan saat ini' },
                  { val: 'DIBATALKAN', icon: '❌', title: 'Tolak / Batalkan Pesanan', desc: 'Batalkan transaksi dengan alasan tertentu' }
                ]"
                :key="opt.val"
                class="p-2.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-2.5 active:scale-98"
                :class="orderStatusForm.status === opt.val
                  ? 'border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-400'
                  : 'border-slate-200 hover:bg-slate-50'"
              >
                <input
                  type="radio"
                  :value="opt.val"
                  v-model="orderStatusForm.status"
                  class="mt-1 text-emerald-600 focus:ring-emerald-500"
                />
                <div class="text-xs">
                  <div class="font-black text-slate-800 flex items-center gap-1.5">
                    <span>{{ opt.icon }}</span>
                    <span>{{ opt.title }}</span>
                  </div>
                  <p class="text-[10px] text-slate-500 mt-0.5">{{ opt.desc }}</p>
                </div>
              </label>
            </div>
          </div>

          <!-- Input Catatan Penjual -->
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Catatan Langsung untuk Pembeli</label>
            <textarea
              v-model="orderStatusForm.seller_notes"
              rows="2"
              required
              placeholder="Contoh: Traktor siap meluncur Sabtu pagi jam 07.00 WIB atau Stok sak habis, baru ready 3 hari lagi."
              class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
            ></textarea>
          </div>

          <div class="pt-2 flex items-center gap-2">
            <button
              type="button"
              @click="isOrderStatusModalOpen = false"
              class="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="isSubmittingStatus"
              class="flex-1 btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 rounded-xl shadow-md active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-60"
            >
              <Loader2 v-if="isSubmittingStatus" :size="15" class="animate-spin" />
              <Check v-else :size="15" />
              <span>{{ isSubmittingStatus ? 'Mengirim...' : 'Kirim Konfirmasi' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal 5: Obrolan Diskusi Pesanan (Chat Transaksi) -->
    <OrderChatModal
      :isOpen="isOrderChatOpen"
      :order="selectedOrderForChat"
      @close="isOrderChatOpen = false"
    />

    <!-- Modal 6: Diskusi & Tanya Jawab Produk / Layanan -->
    <ProductDiscussionModal
      :isOpen="isProductDiscussionOpen"
      :service="selectedServiceForDiscussion"
      @close="isProductDiscussionOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { api, EcosystemServiceItem, Farmland, ServiceOrder } from '@/services/api';
import { useUserState } from '@/services/userState';
import OrderChatModal from '@/components/OrderChatModal.vue';
import ProductDiscussionModal from '@/components/ProductDiscussionModal.vue';
import { 
  Store, Search, PlusCircle, Briefcase, MapPin, 
  MessageSquare, Loader2, Edit, Trash2, Check,
  ShoppingCart, CheckCircle2, ClipboardList, MessageCircle
} from 'lucide-vue-next';

// --- DISKUSI PESANAN & PRODUK STATE ---
const isOrderChatOpen = ref(false);
const selectedOrderForChat = ref<ServiceOrder | null>(null);
const isProductDiscussionOpen = ref(false);
const selectedServiceForDiscussion = ref<EcosystemServiceItem | null>(null);

const openOrderChat = (order: ServiceOrder) => {
  selectedOrderForChat.value = order;
  isOrderChatOpen.value = true;
};

const openProductDiscussion = (service: EcosystemServiceItem) => {
  selectedServiceForDiscussion.value = service;
  isProductDiscussionOpen.value = true;
};

const { currentPersona, currentUserId } = useUserState();

const isLoading = ref(false);
const isSubmitting = ref(false);
const services = ref<EcosystemServiceItem[]>([]);
const searchQuery = ref('');
const selectedCategory = ref('SEMUA');
const showMyServicesOnly = ref(false);

const isModalOpen = ref(false);
const isEditing = ref(false);
const currentEditingId = ref<string | null>(null);

const tagsInput = ref('');
const serviceForm = ref({
  title: '',
  category: 'JASA_TRAKTOR',
  price: 1200000,
  price_unit: '/ Hektar',
  location: 'Desa Sukamaju',
  phone: '628123456789',
  description: '',
  is_available: true
});

const categories = [
  { key: 'SEMUA', label: 'Semua', emoji: '🌟' },
  { key: 'JASA_TRAKTOR', label: 'Olah Tanah & Traktor', emoji: '🚜' },
  { key: 'JASA_PENGAIRAN', label: 'Pompa & Irigasi', emoji: '💧' },
  { key: 'JASA_TENAGA_KERJA', label: 'Cangkul & Tanam', emoji: '🌾' },
  { key: 'SAPROTAN', label: 'Pupuk & Benih', emoji: '🏪' },
  { key: 'HASIL_PANEN', label: 'Bursa Panen', emoji: '📦' },
  { key: 'PASCA_PANEN', label: 'Penggilingan Padi', emoji: '🚚' }
];

const fetchServices = async () => {
  try {
    isLoading.value = true;
    if (showMyServicesOnly.value) {
      const myServ = await api.getMyServices();
      services.value = myServ;
    } else {
      const allServ = await api.getCatalogServices(selectedCategory.value, searchQuery.value);
      services.value = allServ;
    }
  } catch (err) {
    console.error('Error fetching services:', err);
  } finally {
    isLoading.value = false;
  }
};

const selectCategory = (catKey: string) => {
  selectedCategory.value = catKey;
  showMyServicesOnly.value = false;
  fetchServices();
};

const toggleMyServicesOnly = () => {
  showMyServicesOnly.value = !showMyServicesOnly.value;
  fetchServices();
};

const isMyService = (service: EcosystemServiceItem) => {
  return service.provider_id === currentUserId.value;
};

const getBadgeClass = (category: string) => {
  switch (category) {
    case 'JASA_TRAKTOR': return 'bg-amber-100 text-amber-800';
    case 'JASA_PENGAIRAN': return 'bg-sky-100 text-sky-800';
    case 'JASA_TENAGA_KERJA': return 'bg-lime-100 text-lime-800';
    case 'SAPROTAN': return 'bg-teal-100 text-teal-800';
    case 'HASIL_PANEN': return 'bg-emerald-100 text-emerald-800';
    case 'PASCA_PANEN': return 'bg-indigo-100 text-indigo-800';
    default: return 'bg-slate-100 text-slate-700';
  }
};

const contactService = (service: EcosystemServiceItem) => {
  const phone = service.phone.replace(/[^0-9]/g, '');
  const text = encodeURIComponent(`Halo ${service.provider_name}, saya melihat layanan "${service.title}" di Katalog AgriBuddy dan ingin memesan / berkonsultasi.`);
  window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
};

const openCreateModal = () => {
  isEditing.value = false;
  currentEditingId.value = null;
  tagsInput.value = '';
  serviceForm.value = {
    title: '',
    category: 'JASA_TRAKTOR',
    price: 1200000,
    price_unit: '/ Hektar',
    location: 'Desa Sukamaju',
    phone: '',
    description: '',
    is_available: true
  };
  isModalOpen.value = true;
};

const openEditModal = (service: EcosystemServiceItem) => {
  isEditing.value = true;
  currentEditingId.value = service.id;
  tagsInput.value = service.tags.join(', ');
  serviceForm.value = {
    title: service.title,
    category: service.category,
    price: service.price,
    price_unit: service.price_unit,
    location: service.location,
    phone: service.phone,
    description: service.description,
    is_available: service.is_available
  };
  isModalOpen.value = true;
};

const saveService = async () => {
  try {
    isSubmitting.value = true;
    const tags = tagsInput.value
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    if (isEditing.value && currentEditingId.value) {
      await api.updateService(currentEditingId.value, {
        ...serviceForm.value,
        tags
      });
    } else {
      await api.createService({
        ...serviceForm.value,
        tags
      });
    }

    isModalOpen.value = false;
    await fetchServices();
  } catch (err: any) {
    alert(err.message || 'Gagal menyimpan layanan');
  } finally {
    isSubmitting.value = false;
  }
};

const handleDeleteService = async (serviceId: string) => {
  if (!confirm('Apakah Anda yakin ingin menghapus layanan ini dari katalog?')) return;
  try {
    await api.deleteService(serviceId);
    await fetchServices();
  } catch (err: any) {
    alert(err.message || 'Gagal menghapus layanan');
  }
};

// --- IN-APP CHECKOUT & POST-CHECKOUT BUKU MODAL STATE ---
const isCheckoutModalOpen = ref(false);
const selectedServiceForOrder = ref<EcosystemServiceItem | null>(null);
const isSubmittingOrder = ref(false);
const checkoutForm = ref({
  quantity: 1,
  payment_method: 'COD / Bayar Saat Pengerjaan',
  delivery_notes: ''
});

const isPostCheckoutPromptOpen = ref(false);
const createdOrderData = ref<any>(null);
const userFarmlands = ref<Farmland[]>([]);
const selectedFarmIdForExpense = ref('');
const expenseCategory = ref('OLAH_TANAH');
const isRecordingExpense = ref(false);
const expenseSuccessMessage = ref('');

const openCheckoutModal = (service: EcosystemServiceItem) => {
  selectedServiceForOrder.value = service;
  checkoutForm.value = {
    quantity: service.category === 'JASA_TRAKTOR' ? 0.8 : 1,
    payment_method: 'COD / Bayar Saat Pengerjaan',
    delivery_notes: ''
  };
  isCheckoutModalOpen.value = true;
};

const handleCheckoutSubmit = async () => {
  if (!selectedServiceForOrder.value) return;
  try {
    isSubmittingOrder.value = true;
    const res = await api.checkoutCatalogService({
      service_id: selectedServiceForOrder.value.id,
      buyer_id: currentUserId.value,
      buyer_name: currentPersona.value.name,
      quantity: checkoutForm.value.quantity,
      unit: selectedServiceForOrder.value.price_unit,
      payment_method: checkoutForm.value.payment_method,
      delivery_notes: checkoutForm.value.delivery_notes
    });

    createdOrderData.value = res;
    isCheckoutModalOpen.value = false;

    // Load lahan sawah milik pengguna untuk pilihan Buku Modal
    const farms = await api.getFarmlands(currentUserId.value);
    userFarmlands.value = farms;
    if (farms.length > 0) {
      selectedFarmIdForExpense.value = farms[0].id;
    }

    // Tentukan kategori pengeluaran default
    const cat = selectedServiceForOrder.value.category;
    if (cat === 'JASA_TRAKTOR') expenseCategory.value = 'OLAH_TANAH';
    else if (cat === 'JASA_PENGAIRAN') expenseCategory.value = 'PENGAIRAN';
    else if (cat === 'JASA_TENAGA_KERJA') expenseCategory.value = 'TENAGA_KERJA';
    else if (cat === 'SAPROTAN') expenseCategory.value = 'PUPUK_NUTRISI';
    else expenseCategory.value = 'LAINNYA';

    expenseSuccessMessage.value = '';
    isPostCheckoutPromptOpen.value = true;
  } catch (err: any) {
    alert(err.message || 'Gagal melakukan pemesanan jasa');
  } finally {
    isSubmittingOrder.value = false;
  }
};

const closePostCheckoutPrompt = () => {
  isPostCheckoutPromptOpen.value = false;
  createdOrderData.value = null;
};

const saveExpenseToFarmModal = async () => {
  if (!selectedFarmIdForExpense.value || !createdOrderData.value) return;
  try {
    isRecordingExpense.value = true;
    const order = createdOrderData.value.order;
    const farm = userFarmlands.value.find(f => f.id === selectedFarmIdForExpense.value);
    const farmName = farm ? farm.name : 'Lahan Sawah';

    await api.recordFarmExpense(selectedFarmIdForExpense.value, {
      item_name: `${order.service_title} (${order.quantity} ${order.unit})`,
      amount: order.total_price,
      category: expenseCategory.value,
      source: 'MARKETPLACE',
      order_ref_id: order.id
    });

    expenseSuccessMessage.value = `Tercatat ke Buku Modal: ${farmName}`;
    setTimeout(() => {
      closePostCheckoutPrompt();
    }, 1600);
  } catch (err: any) {
    alert(err.message || 'Gagal mencatat biaya ke buku modal');
  } finally {
    isRecordingExpense.value = false;
  }
};

// --- SELLER ORDERS MANAGEMENT STATE & METHODS ---
const showSellerOrdersView = ref(false);
const sellerOrders = ref<ServiceOrder[]>([]);
const sellerOrdersFilter = ref('SEMUA');
const isOrderStatusModalOpen = ref(false);
const selectedOrderForStatus = ref<ServiceOrder | null>(null);
const orderStatusForm = ref<{
  status: 'DIPROSES' | 'SEDANG_DIKIRIM' | 'SELESAI' | 'STOK_HABIS' | 'DIBATALKAN';
  seller_notes: string;
}>({
  status: 'DIPROSES',
  seller_notes: ''
});
const isSubmittingStatus = ref(false);

const pendingSellerOrdersCount = computed(() => {
  return sellerOrders.value.filter(o => o.status === 'MENUNGGU_KONFIRMASI').length;
});

const filteredSellerOrders = computed(() => {
  if (sellerOrdersFilter.value === 'MENUNGGU') {
    return sellerOrders.value.filter(o => o.status === 'MENUNGGU_KONFIRMASI');
  }
  if (sellerOrdersFilter.value === 'PROSES') {
    return sellerOrders.value.filter(o => o.status === 'DIPROSES' || o.status === 'SEDANG_DIKIRIM');
  }
  if (sellerOrdersFilter.value === 'SELESAI') {
    return sellerOrders.value.filter(o => o.status === 'SELESAI');
  }
  if (sellerOrdersFilter.value === 'BATAL') {
    return sellerOrders.value.filter(o => o.status === 'STOK_HABIS' || o.status === 'DIBATALKAN');
  }
  return sellerOrders.value;
});

const fetchSellerOrders = async () => {
  try {
    const res = await api.getSellerOrders(currentUserId.value);
    sellerOrders.value = res;
  } catch (err) {
    console.error('Error fetching seller orders:', err);
  }
};

const toggleSellerOrdersView = () => {
  showSellerOrdersView.value = !showSellerOrdersView.value;
  if (showSellerOrdersView.value) {
    showMyServicesOnly.value = false;
    fetchSellerOrders();
  }
};

const openOrderStatusModal = (order: ServiceOrder) => {
  selectedOrderForStatus.value = order;
  orderStatusForm.value = {
    status: (order.status === 'MENUNGGU_KONFIRMASI' ? 'DIPROSES' : order.status) as any,
    seller_notes: order.seller_notes || ''
  };
  isOrderStatusModalOpen.value = true;
};

const submitOrderStatusUpdate = async () => {
  if (!selectedOrderForStatus.value) return;
  try {
    isSubmittingStatus.value = true;
    await api.updateServiceOrderStatus(
      selectedOrderForStatus.value.id,
      orderStatusForm.value.status,
      orderStatusForm.value.seller_notes
    );
    isOrderStatusModalOpen.value = false;
    await fetchSellerOrders();
  } catch (err: any) {
    alert(err.message || 'Gagal memperbarui status pesanan');
  } finally {
    isSubmittingStatus.value = false;
  }
};

const getOrderStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'MENUNGGU_KONFIRMASI':
      return 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse';
    case 'DIPROSES':
      return 'bg-blue-100 text-blue-900 border border-blue-300';
    case 'SEDANG_DIKIRIM':
      return 'bg-indigo-100 text-indigo-900 border border-indigo-300';
    case 'SELESAI':
      return 'bg-emerald-100 text-emerald-900 border border-emerald-300';
    case 'STOK_HABIS':
      return 'bg-rose-100 text-rose-900 border border-rose-300';
    case 'DIBATALKAN':
      return 'bg-slate-200 text-slate-700 border border-slate-300';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

const getOrderStatusLabel = (status: string) => {
  switch (status) {
    case 'MENUNGGU_KONFIRMASI':
      return '⏳ Menunggu Konfirmasi';
    case 'DIPROSES':
      return '🚜 Mulai Diproses';
    case 'SEDANG_DIKIRIM':
      return '🚚 Mulai Dikirim / Berangkat';
    case 'SELESAI':
      return '✅ Selesai';
    case 'STOK_HABIS':
      return '⚠️ Stok Habis / Jadwal Penuh';
    case 'DIBATALKAN':
      return '❌ Dibatalkan';
    default:
      return status;
  }
};

onMounted(() => {
  fetchServices();
  fetchSellerOrders();
});

watch(currentUserId, () => {
  fetchServices();
  fetchSellerOrders();
});
</script>
