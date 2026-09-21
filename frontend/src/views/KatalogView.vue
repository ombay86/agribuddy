<template>
  <div class="space-y-6">
    <!-- Header Banner Marketplace -->
    <div class="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 md:p-8 rounded-3xl shadow-md relative overflow-hidden">
      <div class="relative z-10 space-y-2 max-w-3xl">
        <div class="inline-flex items-center gap-1.5 bg-emerald-400/20 text-emerald-200 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
          <Store :size="14" /> Marketplace Ekosistem Tani
        </div>
        <h2 class="text-2xl md:text-3xl font-black tracking-tight leading-tight">
          Katalog Layanan & Produk Pendukung
        </h2>
        <p class="text-xs md:text-sm text-emerald-100/90 leading-relaxed">
          Temukan jasa olah tanah traktor, pengairan pompa, regu buruh cangkul & tanam, kios pupuk resmi, hingga penggilingan gabah langsung dari sesama warga ekosistem Sukamaju.
        </p>
      </div>
      <div class="absolute -right-4 -bottom-6 text-emerald-700/20 select-none pointer-events-none text-9xl md:text-[140px] font-black">
        🛒
      </div>
    </div>

    <!-- RESPONSIVE 2-COLUMN MARKETPLACE LAYOUT: 3 COLS (SIDEBAR) vs 9 COLS (GRID / ORDERS) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- ==================== SIDEBAR KIRI (3 COLS) ==================== -->
      <div class="lg:col-span-3 space-y-4">
        <!-- Quick Action Card -->
        <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
          <button
            @click="openCreateModal"
            class="w-full btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-3 rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <PlusCircle :size="16" /> Pasang Layanan Baru
          </button>

          <div class="space-y-2 pt-1">
            <button
              @click="toggleSellerOrdersView"
              class="w-full p-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between active:scale-95 text-left"
              :class="showSellerOrdersView ? 'bg-amber-500 text-slate-900 border-amber-400 shadow-sm font-black' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'"
            >
              <span class="flex items-center gap-2">
                <ClipboardList :size="16" class="text-amber-700" /> Pesanan Masuk Layanan
              </span>
              <span v-if="pendingSellerOrdersCount > 0" class="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">
                {{ pendingSellerOrdersCount }}
              </span>
            </button>

            <button
              @click="toggleMyServicesOnly"
              class="w-full p-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between active:scale-95 text-left"
              :class="showMyServicesOnly ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm font-black' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'"
            >
              <span class="flex items-center gap-2">
                <Briefcase :size="16" :class="showMyServicesOnly ? 'text-white' : 'text-emerald-700'" /> {{ showMyServicesOnly ? 'Semua Katalog' : 'Layanan Saya Saja' }}
              </span>
            </button>
          </div>
        </div>

        <!-- Filter Kategori Card Vertikal -->
        <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 class="text-xs font-black uppercase tracking-wider text-slate-800">
              Kategori Layanan
            </h4>
            <button
              v-if="selectedCategory !== 'SEMUA'"
              @click="selectCategory('SEMUA')"
              class="text-[10px] font-bold text-emerald-700 hover:underline"
            >
              Reset
            </button>
          </div>

          <div class="space-y-1">
            <button
              v-for="cat in categories"
              :key="cat.key"
              @click="selectCategory(cat.key)"
              class="w-full px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between text-left active:scale-98"
              :class="selectedCategory === cat.key
                ? 'bg-emerald-50 text-emerald-800 font-black border border-emerald-300 shadow-2xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
            >
              <span class="flex items-center gap-2">
                <span class="text-base">{{ cat.emoji }}</span>
                <span>{{ cat.label }}</span>
              </span>
              <span v-if="selectedCategory === cat.key" class="text-emerald-600 font-black text-xs">●</span>
            </button>
          </div>
        </div>

        <!-- Edukasi Transaksi Aman -->
        <div class="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200/70 rounded-3xl p-4.5 space-y-2">
          <div class="flex items-center gap-1.5 text-xs font-black text-teal-800">
            <span>🛡️</span> Transaksi Aman Ekosistem
          </div>
          <p class="text-[11px] text-teal-900/80 leading-relaxed font-medium">
            Setiap checkout langsung tercatat di dasbor penjual dan dapat dimasukkan otomatis ke Buku Modal petak sawah Anda.
          </p>
        </div>
      </div>

      <!-- ==================== KANVAS KANAN (9 COLS) ==================== -->
      <div class="lg:col-span-9 space-y-4">
        <!-- MODE 1: PESANAN SELLER MANAGEMENT -->
        <div v-if="showSellerOrdersView" class="space-y-4">
          <div class="flex items-center justify-between px-1">
            <div>
              <h3 class="text-sm md:text-base font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <ClipboardList :size="18" class="text-amber-600" /> Pesanan Masuk Layanan Anda
              </h3>
              <p class="text-xs text-slate-500 font-semibold mt-0.5">
                Beri konfirmasi kepastian pengerjaan, keberangkatan, atau ketersediaan stok barang ke pembeli.
              </p>
            </div>
            <span class="text-xs font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-xl">
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
              class="flex-1 py-2 px-2.5 rounded-xl transition-all whitespace-nowrap text-center text-xs"
              :class="sellerOrdersFilter === flt.key ? 'bg-white text-emerald-800 shadow-sm font-black' : 'text-slate-600 hover:text-slate-800'"
            >
              {{ flt.label }}
            </button>
          </div>

          <!-- Empty State -->
          <div v-if="filteredSellerOrders.length === 0" class="bg-white border border-slate-200 rounded-3xl p-10 text-center space-y-2">
            <div class="text-4xl">📦</div>
            <h4 class="text-sm font-black text-slate-800">Tidak ada pesanan pada filter ini</h4>
            <p class="text-xs text-slate-500 max-w-xs mx-auto">
              Saat ada warga yang memesan layanan Anda di katalog, pesanan akan muncul di sini untuk dikonfirmasi.
            </p>
          </div>

          <!-- List Pesanan Masuk (Grid Responsif Web) -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="ord in filteredSellerOrders"
              :key="ord.id"
              class="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3.5 hover:border-emerald-300 transition-all flex flex-col justify-between"
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

        <!-- MODE 2: NORMAL CATALOG SERVICES -->
        <div v-else class="space-y-4">
          <!-- Search Bar & Results Counter -->
          <div class="bg-white border border-slate-200 rounded-2xl p-3 md:p-4 shadow-sm flex items-center justify-between gap-3">
            <div class="relative flex-1">
              <Search :size="16" class="absolute inset-y-0 left-3 my-auto text-slate-400" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari traktor rotary, pompa diesel, buruh tanam, NPK Phonska, gabah..."
                class="w-full pl-9 pr-8 py-2.5 text-xs font-semibold rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500"
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

            <div class="text-xs font-bold text-slate-500 shrink-0 hidden sm:block">
              <span>{{ services.length }} Layanan Aktif</span>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="text-center py-16 space-y-2 bg-white rounded-3xl border border-slate-200">
            <Loader2 :size="32" class="animate-spin text-emerald-600 mx-auto" />
            <p class="text-xs font-bold text-slate-500">Memuat katalog layanan ekosistem...</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="services.length === 0" class="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
            <div class="text-5xl">🔍</div>
            <h3 class="text-base font-black text-slate-800">Tidak ada layanan ditemukan</h3>
            <p class="text-xs text-slate-500 max-w-xs mx-auto">
              Belum ada layanan atau produk yang sesuai dengan kriteria pencarian Anda.
            </p>
            <button
              @click="openCreateModal"
              class="btn-farmer bg-emerald-600 text-white text-xs font-black py-2.5 px-4 rounded-xl mx-auto flex items-center gap-1.5 shadow-sm"
            >
              <PlusCircle :size="15" /> Pasang Layanan Baru
            </button>
          </div>

          <!-- Services Grid (Responsif Web Multi-Kolom Tokopedia & Shopee Style Grid) -->
          <div v-else class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold text-slate-600 px-1 sm:hidden">
              <span>Ditemukan {{ services.length }} Layanan & Produk</span>
              <span v-if="showMyServicesOnly" class="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md text-[11px] font-black">
                Layanan Saya
              </span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              <div
                v-for="service in services"
                :key="service.id"
                @click="openCheckoutModal(service)"
                class="bg-white border rounded-2xl overflow-hidden shadow-2xs hover:shadow-xl hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group cursor-pointer relative"
                :class="isMyService(service) ? 'border-emerald-300 ring-1 ring-emerald-200 bg-emerald-50/10' : 'border-slate-200/90'"
              >
                <!-- TOP: Thumbnail Image (Square Aspect 1:1) with Overlays -->
                <div class="relative w-full aspect-square bg-slate-100 overflow-hidden">
                  <img
                    :src="service.image_url || getCategoryFallbackImage(service.category)"
                    :alt="service.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    @error="onImageError($event, service.category)"
                  />

                  <!-- Gradient overlay for text contrast -->
                  <div class="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20 pointer-events-none opacity-60 group-hover:opacity-75 transition-opacity"></div>

                  <!-- Top Left: Availability Badge -->
                  <div class="absolute top-2 left-2 z-10">
                    <span
                      class="text-[9px] md:text-[10px] font-black px-2 py-0.5 rounded-full backdrop-blur-md shadow-sm flex items-center gap-1 border"
                      :class="service.is_available ? 'bg-white/95 text-emerald-800 border-emerald-200' : 'bg-slate-900/85 text-slate-300 border-slate-700'"
                    >
                      <span class="w-1.5 h-1.5 rounded-full" :class="service.is_available ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'"></span>
                      <span>{{ service.is_available ? 'Siap' : 'Penuh' }}</span>
                    </span>
                  </div>

                  <!-- Top Right: Category Icon with Label Color -->
                  <div class="absolute top-2 right-2 z-10">
                    <span 
                      class="w-7 h-7 md:w-8 md:h-8 rounded-xl flex items-center justify-center shadow-md backdrop-blur-md text-sm md:text-base border border-white/20 transition-transform group-hover:scale-110"
                      :class="getCategoryOverlayBadgeClass(service.category)"
                      :title="service.category_label"
                    >
                      {{ getCategoryEmoji(service.category) }}
                    </span>
                  </div>

                  <!-- Bottom Left: Promo / Advantage Banner (Shopee/Tokopedia style) -->
                  <div v-if="service.promo_tag" class="absolute bottom-2 left-2 z-10">
                    <span class="bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-[9px] font-black px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                      ⚡ {{ service.promo_tag }}
                    </span>
                  </div>
                </div>

                <!-- BOTTOM: Content & Details -->
                <div class="p-3 flex flex-col justify-between flex-1 gap-2.5">
                  <div class="space-y-2">
                    <!-- Provider & Location Row (Atas Bawah untuk Karakter Maksimal) -->
                    <div class="space-y-1">
                      <!-- Baris 1: Nama Provider & Avatar -->
                      <div class="flex items-center gap-1.5 text-xs text-slate-800 font-bold truncate">
                        <span class="text-sm shrink-0">{{ service.provider_avatar || '🌾' }}</span>
                        <span class="truncate font-black text-slate-800">{{ service.provider_name }}</span>
                        <span class="text-[9px] font-extrabold px-1.5 py-0.2 rounded-md shrink-0" :class="getBadgeClass(service.category)">
                          {{ service.provider_badge }}
                        </span>
                      </div>

                      <!-- Baris 2: Lokasi Wilayah (Atas Bawah, Lebih Banyak Karakter) -->
                      <div class="flex items-center gap-1 text-[11px] text-slate-500 font-medium truncate">
                        <MapPin :size="11" class="text-slate-400 shrink-0" />
                        <span class="truncate">{{ service.location }}</span>
                      </div>
                    </div>

                    <!-- Product Title (2-Lines Clamp) -->
                    <h3 
                      class="text-xs md:text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors"
                      :title="service.title"
                    >
                      {{ service.title }}
                    </h3>

                    <!-- Price Section -->
                    <div class="pt-0.5">
                      <div class="flex items-baseline gap-1 flex-wrap">
                        <span class="text-sm md:text-base font-black text-emerald-700 tracking-tight">
                          Rp {{ service.price.toLocaleString('id-ID') }}
                        </span>
                        <span class="text-[10px] md:text-[11px] text-slate-500 font-bold">
                          {{ service.price_unit }}
                        </span>
                      </div>
                    </div>

                    <!-- Social Proof: Rating & Completed Orders -->
                    <div class="flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold text-slate-600">
                      <span class="text-amber-500 flex items-center gap-0.5 font-black">
                        ★ {{ (service.rating || 4.9).toFixed(1) }}
                      </span>
                      <span class="text-slate-300">•</span>
                      <span class="text-slate-500 text-[10px]">
                        {{ service.completed_orders_count || 30 }}+ disewa
                      </span>
                    </div>
                  </div>

                  <!-- Action Footer Buttons (Icon-Only Diskusi + Full Width Pesan) -->
                  <div class="pt-2 border-t border-slate-100 flex items-center gap-2" @click.stop>
                    <!-- When It's My Service: Edit, Delete, & Diskusi -->
                    <template v-if="isMyService(service)">
                      <div class="flex items-center justify-between w-full">
                        <div class="flex items-center gap-1.5">
                          <button
                            @click.stop="openProductDiscussion(service)"
                            class="w-8 h-8 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 flex items-center justify-center transition-all border border-amber-200"
                            title="Lihat Pertanyaan Warga"
                          >
                            <MessageCircle :size="14" />
                          </button>
                          <button
                            @click.stop="openEditModal(service)"
                            class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all border border-slate-200"
                            title="Edit Layanan"
                          >
                            <Edit :size="14" />
                          </button>
                          <button
                            @click.stop="handleDeleteService(service.id)"
                            class="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-all border border-rose-200"
                            title="Hapus Layanan"
                          >
                            <Trash2 :size="14" />
                          </button>
                        </div>
                        <span class="text-[9px] font-black text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                          Layanan Anda
                        </span>
                      </div>
                    </template>

                    <!-- When It's Another User's Service: Diskusi (Icon Only) & Pesan (Full Width) -->
                    <template v-else>
                      <!-- Diskusi (Icon Only) -->
                      <button
                        @click.stop="openProductDiscussion(service)"
                        class="w-9 h-9 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 text-slate-600 hover:text-amber-700 flex items-center justify-center shrink-0 active:scale-95 transition-all shadow-2xs"
                        title="Tanya Jawab / Diskusi Produk"
                      >
                        <MessageCircle :size="16" class="text-amber-600" />
                      </button>

                      <!-- Pesan (Checkout) - Full Width Sempurna, Tidak Terpotong -->
                      <button
                        @click.stop="openCheckoutModal(service)"
                        class="flex-1 btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2 px-3.5 rounded-xl shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
                      >
                        <ShoppingCart :size="14" />
                        <span>Pesan</span>
                      </button>
                    </template>
                  </div>
                </div>
              </div>
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

          <!-- Foto Thumbnail Layanan / Produk -->
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Foto / Thumbnail (Pilih Preset atau URL)</label>
            <div class="space-y-1.5">
              <input
                v-model="serviceForm.image_url"
                type="url"
                placeholder="https://images.unsplash.com/... (atau pilih preset di bawah)"
                class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
              />
              <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                <button
                  v-for="pImg in presetImages"
                  :key="pImg.url"
                  type="button"
                  @click="serviceForm.image_url = pImg.url"
                  class="px-2 py-1 rounded-lg text-[10px] font-bold border shrink-0 transition-all active:scale-95"
                  :class="serviceForm.image_url === pImg.url ? 'bg-emerald-100 border-emerald-400 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'"
                >
                  {{ pImg.label }}
                </button>
              </div>
            </div>
          </div>

          <!-- Tag Keunggulan / Promo Badge -->
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Badge Keunggulan / Promo (Opsional)</label>
            <input
              v-model="serviceForm.promo_tag"
              type="text"
              placeholder="Contoh: Bisa Bayar Panen, Siap Antar Sawah, Hasil Gembur Cepat"
              class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
            />
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
  ShoppingCart, CheckCircle2, ClipboardList, MessageCircle,
  Phone, Star, Sparkles, Image as ImageIcon
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
  image_url: '',
  promo_tag: '',
  is_available: true
});

const presetImages = [
  { label: '🚜 Traktor Kubota', url: 'https://images.unsplash.com/photo-1594771804886-a933bb2d609b?auto=format&fit=crop&w=600&q=80' },
  { label: '⚙️ Rotavator Cepat', url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80' },
  { label: '💧 Pompa Alkon', url: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80' },
  { label: '🌾 Regu Tanam Padi', url: 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&w=600&q=80' },
  { label: '👨‍🌾 Cangkul Pematang', url: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80' },
  { label: '🏪 Pupuk Subsidi', url: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80' },
  { label: '🌱 Bibit / Benih', url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80' },
  { label: '📦 Gabah Panen', url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80' },
  { label: '🚚 Giling Padi', url: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80' }
];

const categories = [
  { key: 'SEMUA', label: 'Semua', emoji: '🌟' },
  { key: 'JASA_TRAKTOR', label: 'Olah Tanah & Traktor', emoji: '🚜' },
  { key: 'JASA_PENGAIRAN', label: 'Pompa & Irigasi', emoji: '💧' },
  { key: 'JASA_TENAGA_KERJA', label: 'Cangkul & Tanam', emoji: '🌾' },
  { key: 'SAPROTAN', label: 'Pupuk & Benih', emoji: '🏪' },
  { key: 'HASIL_PANEN', label: 'Bursa Panen', emoji: '📦' },
  { key: 'PASCA_PANEN', label: 'Penggilingan Padi', emoji: '🚚' }
];

const getCategoryFallbackImage = (category: string) => {
  const fallbacks: Record<string, string> = {
    'JASA_TRAKTOR': 'https://images.unsplash.com/photo-1594771804886-a933bb2d609b?auto=format&fit=crop&w=600&q=80',
    'JASA_PENGAIRAN': 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80',
    'JASA_TENAGA_KERJA': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    'SAPROTAN': 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80',
    'HASIL_PANEN': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    'PASCA_PANEN': 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80'
  };
  return fallbacks[category] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80';
};

const onImageError = (event: Event, category: string) => {
  const target = event.target as HTMLImageElement;
  if (target.dataset.triedFallback) {
    target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect fill="%23ecfdf5" width="300" height="300"/><text fill="%23059669" font-family="sans-serif" font-size="20" font-weight="bold" x="50%" y="50%" text-anchor="middle" dominant-baseline="middle">AgriBuddy 🌾</text></svg>';
    return;
  }
  target.dataset.triedFallback = 'true';
  target.src = getCategoryFallbackImage(category);
};

const getCategoryOverlayBadgeClass = (category: string) => {
  switch (category) {
    case 'JASA_TRAKTOR': return 'bg-amber-600/90 text-white';
    case 'JASA_PENGAIRAN': return 'bg-sky-600/90 text-white';
    case 'JASA_TENAGA_KERJA': return 'bg-emerald-700/90 text-white';
    case 'SAPROTAN': return 'bg-teal-700/90 text-white';
    case 'HASIL_PANEN': return 'bg-orange-600/90 text-white';
    case 'PASCA_PANEN': return 'bg-indigo-700/90 text-white';
    default: return 'bg-slate-800/90 text-white';
  }
};

const getCategoryEmoji = (category: string) => {
  switch (category) {
    case 'JASA_TRAKTOR': return '🚜';
    case 'JASA_PENGAIRAN': return '💧';
    case 'JASA_TENAGA_KERJA': return '🌾';
    case 'SAPROTAN': return '🏪';
    case 'HASIL_PANEN': return '📦';
    case 'PASCA_PANEN': return '🚚';
    default: return '🌾';
  }
};

const openWhatsApp = (phone?: string, title?: string) => {
  const p = (phone || '628123456789').replace(/[^0-9]/g, '');
  const text = encodeURIComponent(`Halo, saya melihat layanan "${title || 'Katalog'}" di AgriBuddy dan ingin memesan / berkonsultasi.`);
  window.open(`https://wa.me/${p}?text=${text}`, '_blank');
};

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
  openWhatsApp(service.phone, service.title);
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
    image_url: '',
    promo_tag: '',
    is_available: true
  };
  isModalOpen.value = true;
};

const openEditModal = (service: EcosystemServiceItem) => {
  isEditing.value = true;
  currentEditingId.value = service.id;
  tagsInput.value = (service.tags || []).join(', ');
  serviceForm.value = {
    title: service.title,
    category: service.category,
    price: service.price,
    price_unit: service.price_unit,
    location: service.location,
    phone: service.phone,
    description: service.description,
    image_url: service.image_url || '',
    promo_tag: service.promo_tag || '',
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
