<template>
  <PageLayout variant="wide">
    <!-- Header Banner -->
    <PageBanner
      badge="Logistik & Penyimpanan Tani"
      title="Buku Tani — Gudang & Lumbung"
      description="Pencatatan persediaan saprotan mandiri (pupuk, bibit, obat) dan manajemen stok hasil panen gabah di lumbung simpan serta pantauan tren harga pasar komoditas."
    >
      <!-- Tab Switcher -->
      <div class="mt-6 flex flex-wrap items-center gap-2 border-b border-[#99c30c]/20 pb-1">
        <button
          @click="activeTab = 'stok'"
          class="px-5 py-2.5 rounded-2xl  text-xs transition-all cursor-pointer flex items-center gap-2"
          :class="activeTab === 'stok'
            ? 'bg-[#99c30c] text-[#324d1d] shadow-lg shadow-[#324d1d]/40'
            : 'bg-[#99c30c]/20 text-white hover:bg-[#99c30c]/20'"
        >
          <Package :size="16" />
          <span class="font-bold">Gudang Saprotan ({{ inventory.length }})</span>
        </button>

        <button
          @click="activeTab = 'lumbung'"
          class="px-5 py-2.5 rounded-2xl  text-xs transition-all cursor-pointer flex items-center gap-2"
          :class="activeTab === 'lumbung'
            ? 'bg-[#99c30c] text-[#324d1d] shadow-lg shadow-[#324d1d]/40'
            : 'bg-[#99c30c]/20 text-white hover:bg-[#99c30c]/20'"
        >
          <Warehouse :size="16" />
          <span class="font-bold">Lumbung Hasil Panen ({{ harvests.length }})</span>
        </button>
      </div>
    </PageBanner>

    <!-- TAB 1: GUDANG SAPROTAN -->
    <div v-if="activeTab === 'stok'" class="space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <!-- Filter Kategori -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat"
            class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer"
            :class="selectedCategory === cat
              ? 'bg-[#324d1d] text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'"
          >
            {{ cat }}
          </button>
        </div>

        <button
          @click="showAddInventoryModal = true"
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#324d1d]/90 hover:bg-[#324d1d] text-white text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Plus :size="15" />
          <span>Tambah Saprotan</span>
        </button>
      </div>

      <!-- Empty State Stok Barang -->
      <div v-if="filteredInventory.length === 0" class="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 p-6 space-y-3">
        <h4 class="text-sm font-extrabold text-slate-800">Gudang Saprotan Kosong</h4>
        <p class="text-xs text-slate-500 max-w-sm mx-auto">
          Kamu belum memiliki catatan stok pupuk, bibit, atau obat di gudang usahatani milikmu.
        </p>
      </div>

      <!-- Grid Daftar Stok Barang -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="item in filteredInventory"
          :key="item.id"
          class="bg-white border rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          :class="item.is_low_stock ? 'border-[#fed701]/60 bg-[#fed701]/20' : 'border-slate-200'"
        >
          <div>
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-2">
                <span
                  class="text-[10px] font-bold px-2.5 py-0.5 rounded-lg uppercase tracking-wider"
                  :class="{
                    'bg-[#99c30c]/20 text-[#324d1d]': item.type === 'PUPUK',
                    'bg-[#fed701]/20 text-[#324d1d]': item.type === 'BIBIT',
                    'bg-[#fe8b02]/20 text-[#324d1d]': item.type === 'OBAT'
                  }"
                >
                  {{ item.type }}
                </span>
                <span v-if="item.is_low_stock" class="text-[10px] font-bold bg-[#fed701]/20 text-[#324d1d] px-2 py-0.5 rounded-lg flex items-center gap-1">
                  <AlertTriangle :size="11" /> Menipis
                </span>
              </div>

              <!-- Indikator Jumlah -->
              <div class="text-right">
                <span class="text-2xl  text-slate-800 leading-none">
                  {{ item.quantity }}
                </span>
                <span class="text-xs font-semibold text-slate-500 ml-1">{{ item.unit }}</span>
              </div>
            </div>

            <h3 class="font-extrabold text-base text-slate-800 mt-2">{{ item.name }}</h3>
            <p v-if="item.notes" class="text-xs text-slate-500 mt-1 leading-relaxed">{{ item.notes }}</p>

            <!-- STIKER PESANAN DALAM PROSES (PENDING ORDER) -->
            <div
              v-for="order in (item.pending_orders || [])"
              :key="order.id"
              class="mt-3 p-3 rounded-2xl bg-[#fed701]/90 border-2 border-[#fed701]/60 shadow-2xs space-y-2 animate-in fade-in"
            >
              <div class="flex items-start justify-between gap-2">
                <div class="flex items-start gap-2">
                  <div>
                    <div class="flex items-center gap-1.5 flex-wrap">
                      <span class="inline-flex items-center text-[9px] font-bold uppercase tracking-wide bg-[#fed701]/40 text-[#324d1d] -ml-2 px-2 py-1 rounded-md">
                        Sedang Dipesan
                      </span>
                      <span class="text-[10px] text-slate-500 font-bold">{{ order.created_at }}</span>
                    </div>
                    <p class="text-xs  text-slate-800 mt-1">
                      Pesan: <span class="text-[#324d1d] ">+{{ order.quantity }} {{ order.unit }}</span>
                    </p>
                    <p class="text-[10px] text-slate-600 font-medium">
                      Toko: <span class="font-bold text-slate-800">{{ order.store_name }}</span>
                    </p>
                  </div>
                </div>

                <!-- Tombol ceklis dan silang -->
                <div class="flex items-center gap-1.5 shrink-0 pt-0.5">
                  <!-- Ceklis: Barang Sampai -->
                  <button
                    @click="handleConfirmArrival(item, order)"
                    type="button"
                    class="w-7 h-7 rounded-xl bg-[#324d1d]/90 hover:bg-[#324d1d] text-white flex items-center justify-center shadow-xs transition-all active:scale-90 cursor-pointer"
                    title="Pesanan sudah sampai! Konfirmasi & tambah ke stok"
                  >
                    <Check :size="15" />
                  </button>
                  <!-- Silang: Batalkan Pesanan -->
                  <button
                    @click="handleCancelOrder(item, order)"
                    type="button"
                    class="w-7 h-7 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 flex items-center justify-center transition-all active:scale-90 cursor-pointer border border-rose-200"
                    title="Batalkan pesanan"
                  >
                    <X :size="15" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Adjust & Order Controls -->
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              @click="deleteInventoryItem(item.id)"
              class="text-xs text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-rose-50 transition-all cursor-pointer"
              title="Hapus barang dari gudang"
            >
              <Trash2 :size="14" />
            </button>

            <div class="flex items-center gap-2">
              <!-- Tombol Pesan via WA -->
              <button
                @click="openOrderModal(item)"
                type="button"
                class="px-2.5 py-1.5 rounded-xl bg-[#99c30c]/10 hover:bg-[#99c30c]/20 text-[#324d1d] border border-[#99c30c]/60 font-bold text-xs flex items-center gap-1 transition-all active:scale-95 shadow-2xs cursor-pointer"
                title="Pesan restock otomatis via WhatsApp"
              >
                <MessageCircle :size="13" class="text-[#324d1d]" />
                <span>Pesan WA</span>
              </button>

              <!-- Tombol - / + Manual -->
              <div class="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200/80">
                <button
                  @click="adjustStock(item.id, -1)"
                  class="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 text-slate-800  text-sm flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-2xs"
                  title="Kurang 1"
                >
                  -
                </button>
                <span class="text-[10px] font-bold text-slate-500 px-1 select-none">Atur</span>
                <button
                  @click="adjustStock(item.id, 1)"
                  class="w-7 h-7 rounded-lg bg-[#324d1d]/90 hover:bg-[#324d1d] text-white  text-sm flex items-center justify-center active:scale-95 transition-all shadow-2xs cursor-pointer"
                  title="Tambah 1"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 2: LUMBUNG HASIL PANEN & HARGA PASAR -->
    <div v-else-if="activeTab === 'lumbung'" class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-base font-bold text-slate-800">Lumbung Hasil Panen Mandiri</h2>
          <p class="text-xs text-slate-500">Pencatatan volume gabah panen dan pantauan harga komoditas pasar</p>
        </div>
        <button
          @click="showAddHarvestModal = true"
          class="bg-[#324d1d]/90 hover:bg-[#324d1d] text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          <Plus :size="15" /> Catat Panen Baru
        </button>
      </div>

      <!-- Ringkasan Total Panen Tersimpan -->
      <div class="bg-gradient-to-br from-[#fed701] to-[#fe8b02] text-white p-6 rounded-3xl shadow-md">
        <span class="text-xs text-bold uppercase tracking-wider text-[#fff2d9]">
          Total Komoditas Gabah Tersimpan di Lumbung
        </span>
        <div class="text-3xl font-bold mt-2">
          {{ (totalHarvestWeight / 1000).toFixed(2) }} <span class="text-lg font-bold text-[#fff2d9]">Ton</span>
          <span class="text-sm font-bold font-medium text-[#fff2d9] ml-1">({{ totalHarvestWeight.toLocaleString() }} Kg)</span>
        </div>
      </div>

      <!-- Pantauan Tren Harga Pasar Komoditas -->
      <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-xs text-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            Referensi Harga Pasar Daerah
          </h3>
          <span class="text-[10px] text-slate-400 font-medium">Diperbarui hari ini</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="price in marketPrices"
            :key="price.commodity"
            class="p-3.5 bg-[#fff2d9] rounded-2xl border border-slate-100 space-y-1"
          >
            <h4 class="text-xs  text-slate-800">{{ price.commodity }}</h4>
            <div class="flex items-baseline justify-between">
              <span class="text-sm font-extrabold text-black">
                Rp {{ price.price_per_kg.toLocaleString() }} <span class="text-[10px] text-slate-500">/kg</span>
              </span>
              <span
                class="text-[10px] font-bold inline-flex items-center gap-0.5"
                :class="price.trend === 'up' ? 'text-[#324d1d]' : 'text-slate-500'"
              >
                <ArrowUpRight v-if="price.trend === 'up'" :size="12" />
                {{ price.change_percent }}
              </span>
            </div>
            <p class="text-[10px] text-slate-500 line-clamp-1">{{ price.note }}</p>
          </div>
        </div>
      </div>

      <!-- Riwayat Panen Tersimpan -->
      <div class="space-y-3">
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 px-1">
          Daftar Catatan Panen Sawah
        </h3>

        <div v-if="harvests.length === 0" class="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 p-6 space-y-3">
          <h4 class="text-sm font-extrabold text-slate-800">Lumbung Masih Kosong</h4>
          <p class="text-xs text-slate-500 max-w-sm mx-auto">
            Kamu belum mencatat hasil panen gabah di lumbung usahatani milikmu.
          </p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div
            v-for="harvest in harvests"
            :key="harvest.id"
            class="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs flex items-center justify-between"
          >
            <div>
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[#99c30c]/20 text-[#324d1d] uppercase">
                  {{ harvest.status }}
                </span>
                <span class="text-[11px] text-slate-400 font-bold flex items-center gap-1">
                  <Calendar :size="12" /> {{ harvest.harvest_date }}
                </span>
              </div>
              <h4 class="text-sm font-extrabold text-slate-800 mt-1">{{ harvest.commodity }}</h4>
              <p v-if="harvest.notes" class="text-xs text-slate-500 mt-0.5">{{ harvest.notes }}</p>
            </div>

            <div class="text-right">
              <div class="text-xl font-bold text-[#324d1d]">
                {{ harvest.total_weight_kg }} <span class="text-xs font-bold text-slate-500">Kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Tambah Saprotan Baru -->
    <BaseModal v-if="showAddInventoryModal">
      <div class="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-extrabold text-base text-slate-800">Tambah Stok Saprotan</h3>
          <button @click="showAddInventoryModal = false" class="text-slate-400 hover:text-slate-600">
            <X :size="20" />
          </button>
        </div>

        <div class="space-y-3">
          <div>
            <FormLabel>Nama Barang</FormLabel>
            <input
              v-model="newInventory.name"
              type="text"
              placeholder="Contoh: Pupuk SP-36 Petro"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#99c30c]"
            />
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <FormLabel>Kategori</FormLabel>
              <select
                v-model="newInventory.type"
                class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#99c30c] bg-white"
              >
                <option value="PUPUK">Pupuk</option>
                <option value="BIBIT">Bibit / Benih</option>
                <option value="OBAT">Obat / Pestisida</option>
              </select>
            </div>
            <div>
              <FormLabel>Satuan</FormLabel>
              <input
                v-model="newInventory.unit"
                type="text"
                placeholder="Karung (50kg)"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#99c30c]"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <FormLabel>Jumlah</FormLabel>
              <input
                v-model.number="newInventory.quantity"
                type="number"
                min="0"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#99c30c]"
              />
            </div>
            <div>
              <FormLabel>Batas Menipis</FormLabel>
              <input
                v-model.number="newInventory.min_threshold"
                type="number"
                min="1"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#99c30c]"
              />
            </div>
          </div>
        </div>

        <div class="pt-2 flex gap-2">
          <button
            @click="showAddInventoryModal = false"
            class="w-1/2 py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-600"
          >
            Batal
          </button>
          <button
            @click="saveNewInventory"
            class="w-1/2 py-2.5 rounded-xl font-bold text-xs bg-[#324d1d]/90 hover:bg-[#324d1d] text-white shadow-sm"
          >
            Simpan Stok
          </button>
        </div>
      </div>
    </BaseModal>

    <!-- Modal: Catat Panen Baru -->
    <BaseModal v-if="showAddHarvestModal">
      <div class="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-extrabold text-base text-slate-800">Catat Hasil Panen</h3>
          <button @click="showAddHarvestModal = false" class="text-slate-400 hover:text-slate-600">
            <X :size="20" />
          </button>
        </div>

        <div class="space-y-3">
          <div>
            <FormLabel>Nama Komoditas</FormLabel>
            <input
              v-model="newHarvest.commodity"
              type="text"
              placeholder="Contoh: Gabah Kering Panen (GKP)"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#99c30c]"
            />
          </div>

          <div>
            <FormLabel>Total Berat (Kg)</FormLabel>
            <input
              v-model.number="newHarvest.total_weight_kg"
              type="number"
              min="1"
              placeholder="1500"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#99c30c]"
            />
          </div>

          <div>
            <FormLabel>Tanggal Panen</FormLabel>
            <input
              v-model="newHarvest.harvest_date"
              type="date"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#99c30c] bg-white"
            />
          </div>

          <div>
            <FormLabel>Catatan Lokasi / Petak</FormLabel>
            <input
              v-model="newHarvest.notes"
              type="text"
              placeholder="Petak timur, lumbung no 1"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#99c30c]"
            />
          </div>
        </div>

        <div class="pt-2 flex gap-2">
          <button
            @click="showAddHarvestModal = false"
            class="w-1/2 py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
          >
            Batal
          </button>
          <button
            @click="saveNewHarvest"
            class="w-1/2 py-2.5 rounded-xl font-bold text-xs bg-[#324d1d]/90 hover:bg-[#324d1d] text-white shadow-sm cursor-pointer"
          >
            Simpan Panen
          </button>
        </div>
      </div>
    </BaseModal>

    <!-- MODAL: PESAN RESTOCK VIA WHATSAPP -->
    <BaseModal
      v-if="showOrderModal && selectedOrderItem"
      backdrop="70-xs"
      animate
    >
      <div class="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
        <!-- Header -->
        <div class="px-5 py-4 bg-gradient-to-r from-[#324d1d] to-[#324d1d] text-white flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl font-bold bg-[#99c30c]/30 text-[#fff2d9] flex items-center justify-center font-bold">
              <MessageCircle :size="20" />
            </div>
            <div>
              <h3 class="text-sm font-bold tracking-tight">Pesan Restock via WhatsApp</h3>
            </div>
          </div>
          <button
            @click="showOrderModal = false"
            class="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X :size="15" />
          </button>
        </div>

        <form @submit.prevent="submitOrder" class="p-5 space-y-4 max-h-[85vh] overflow-y-auto">
          <!-- Info Produk yang Dipesan -->
          <div class="p-3.5 bg-[#fff2d9] border border-slate-200 rounded-2xl flex items-center justify-between">
            <div>
              <span class="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Produk / Saprotan</span>
              <h4 class="text-sm  text-slate-800">{{ selectedOrderItem.name }}</h4>
            </div>
            <div class="text-right">
              <span class="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Stok Saat Ini</span>
              <p class="text-xs  text-slate-700">{{ selectedOrderItem.quantity }} {{ selectedOrderItem.unit }}</p>
            </div>
          </div>

          <!-- Counter Pemesanan (+/-) -->
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1.5 flex items-center justify-between">
              <span>Jumlah yang Ingin Dipesan</span>
              <span class="text-[10px] text-[#324d1d] font-bold">Klik tombol + untuk menambah</span>
            </label>
            <div class="flex items-center justify-center gap-4 p-3 bg-[#99c30c]/50 border border-[#99c30c]/40 rounded-2xl">
              <button
                type="button"
                @click="orderForm.quantity = Math.max(1, orderForm.quantity - 1)"
                class="w-11 h-11 rounded-xl bg-white hover:bg-slate-100 text-slate-800  text-xl flex items-center justify-center active:scale-95 transition-all shadow-xs cursor-pointer border border-slate-200"
                title="Kurangi 1"
              >
                -
              </button>
              <div class="text-center px-4">
                <span class="text-3xl  text-[#324d1d] leading-none">
                  {{ orderForm.quantity }}
                </span>
                <span class="text-xs font-bold text-[#324d1d] block mt-0.5">
                  {{ selectedOrderItem.unit }}
                </span>
              </div>
              <button
                type="button"
                @click="orderForm.quantity++"
                class="w-11 h-11 rounded-xl bg-[#324d1d]/90 hover:bg-[#324d1d] text-white  text-xl flex items-center justify-center active:scale-95 transition-all shadow-md cursor-pointer"
                title="Tambah 1"
              >
                +
              </button>
            </div>
          </div>

          <!-- Pilih Kios / Toko Tujuan -->
          <div>
            <FormLabel>Pilih Kios / Toko Saprotan Tujuan</FormLabel>
            <select
              v-model="orderForm.selectedStoreIndex"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#99c30c] bg-white cursor-pointer"
            >
              <option v-for="(s, idx) in storeList" :key="idx" :value="idx">
                {{ s.name }} (WA: {{ s.phone }})
              </option>
            </select>
          </div>

          <!-- Alamat Pengiriman -->
          <div>
            <FormLabel>Alamat Tujuan Pengiriman</FormLabel>
            <input
              v-model="orderForm.delivery_address"
              type="text"
              required
              placeholder="Contoh: Desa Sukamaju, Jawa Timur"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-[#99c30c]"
            />
          </div>

          <!-- Catatan Tambahan -->
          <div>
            <FormLabel>Catatan Tambahan (Opsional)</FormLabel>
            <input
              v-model="orderForm.notes"
              type="text"
              placeholder="Contoh: Tolong kirim pagi ini sebelum jam 11"
              class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#99c30c]"
            />
          </div>

          <!-- Pratinjau Pesan WA Otomatis -->
          <div>
            <label class="text-[10px] font-bold text-slate-500 uppercase block mb-1">Pratinjau Pesan WhatsApp Otomatis</label>
            <div class="p-3 bg-[#99c30c]/10 border border-[#99c30c]/40 rounded-2xl text-[11px] leading-relaxed text-slate-800 space-y-1">
              <p class=" text-[#324d1d]">Pesan yang Terkirim ke Kios:</p>
              <p class="whitespace-pre-line italic text-slate-700">{{ waPreviewText }}</p>
            </div>
          </div>

          <!-- Tombol Kirim WA & Pasang Stiker -->
          <div class="flex items-center gap-2 pt-2">
            <button
              type="button"
              @click="showOrderModal = false"
              class="w-1/3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              class="w-2/3 py-2.5 px-4 rounded-xl bg-[#324d1d]/90 hover:bg-[#324d1d] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <MessageCircle :size="16" /> Kirim WA & Pasang Stiker
            </button>
          </div>
        </form>
      </div>
    </BaseModal>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { api, InventoryItem, HarvestItem, MarketPrice } from '@/services/api';
import { useUserState } from '@/services/userState';
import { showConfirm, showSuccess, showError, showWarning } from '@/utils/swal';
import { 
  Package, Warehouse, Plus, AlertTriangle, 
  Trash2, X, TrendingUp, ArrowUpRight, Calendar,
  MessageCircle, Check
} from 'lucide-vue-next';
import BaseModal from '@/components/ui/BaseModal.vue';
import FormLabel from '@/components/ui/FormLabel.vue';
import PageBanner from '@/components/ui/PageBanner.vue';
import PageLayout from '@/components/layout/PageLayout.vue';

const { currentPersona, currentUserId } = useUserState();
const activeTab = ref<'stok' | 'lumbung'>('stok');

// Daftar Kios / Toko Saprotan Mitra Ekosistem
const storeList = [
  {
    name: 'Ibu Ratna (Kios Saprotan & KPL Resmi Sukamaju)',
    owner: 'Ibu Ratna',
    phone: '085712345678',
    location: 'Pasar Tradisional Sukamaju Kios B-04'
  },
  {
    name: 'Kios Tani Subur Makmur',
    owner: 'Ibu Ratna / Tim Toko',
    phone: '085712345678',
    location: 'Pasar Tradisional Sukamaju'
  },
  {
    name: 'Toko Perlengkapan Tani Mas Bambang',
    owner: 'Mas Bambang',
    phone: '081298765432',
    location: 'Desa Sukamaju Krajan'
  },
  {
    name: 'KUD Makmur Sejahtera Sukamaju',
    owner: 'Admin KUD',
    phone: '081234567890',
    location: 'Kantor Balai Desa Sukamaju'
  }
];

// State Pemesanan Restock via WA
const showOrderModal = ref(false);
const selectedOrderItem = ref<InventoryItem | null>(null);
const orderForm = ref({
  quantity: 6,
  selectedStoreIndex: 0,
  delivery_address: 'Desa Sukamaju, Jawa Timur',
  notes: ''
});

const openOrderModal = (item: InventoryItem) => {
  selectedOrderItem.value = item;
  orderForm.value.quantity = 6; // Nilai default 6 sak / unit
  orderForm.value.selectedStoreIndex = 0;
  orderForm.value.delivery_address = currentPersona.value.location || 'Desa Sukamaju, Jawa Timur';
  orderForm.value.notes = '';
  showOrderModal.value = true;
};

const waPreviewText = computed(() => {
  if (!selectedOrderItem.value) return '';
  const store = storeList[orderForm.value.selectedStoreIndex] || storeList[0];
  const buyerName = currentPersona.value.name || 'Pak Joko';
  const itemName = selectedOrderItem.value.name;
  const qty = orderForm.value.quantity;
  const unit = selectedOrderItem.value.unit;
  const address = orderForm.value.delivery_address || 'Desa Sukamaju';
  const notesText = orderForm.value.notes ? `\nCatatan: ${orderForm.value.notes}` : '';

  return `Halo ${store.owner}, saya ${buyerName} dari AgriBuddy ingin memesan:\n` +
    `${qty} ${unit} ${itemName}\n` +
    `Mohon untuk dikirimkan ke alamat: ${address}${notesText}\n\n` +
    `Mohon info ketersediaan barang dan total biayanya. Terima kasih!`;
});

const submitOrder = async () => {
  if (!selectedOrderItem.value) return;
  const store = storeList[orderForm.value.selectedStoreIndex] || storeList[0];
  const item = selectedOrderItem.value;

  try {
    const res = await api.createInventoryOrder(item.id, {
      store_name: store.name,
      store_phone: store.phone,
      quantity: orderForm.value.quantity,
      delivery_address: orderForm.value.delivery_address,
      notes: orderForm.value.notes
    });

    // Update item di inventaris lokal agar stiker langsung muncul
    const idx = inventory.value.findIndex(i => i.id === item.id);
    if (idx !== -1) {
      inventory.value[idx] = res.item;
    }

    // Buka WhatsApp
    const phone = store.phone.replace(/\D/g, '');
    const cleanPhone = phone.startsWith('0') ? '62' + phone.substring(1) : phone;
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waPreviewText.value)}`;
    window.open(waUrl, '_blank');

    showOrderModal.value = false;
  } catch (err: any) {
    showError('Gagal Mencatat', err.message || 'Gagal mencatat pesanan');
  }
};

const handleConfirmArrival = async (item: InventoryItem, order: any) => {
  const confirmed = await showConfirm({
    title: 'Konfirmasi Barang Sampai?',
    text: `Pesanan ${order.quantity} ${order.unit} dari ${order.store_name} telah sampai? Stok ${item.name} akan otomatis bertambah +${order.quantity} ${order.unit}.`,
    confirmButtonText: 'Ya, Sudah Sampai',
    cancelButtonText: 'Belum',
    isDanger: false,
    icon: 'question'
  });
  if (!confirmed) return;

  try {
    const res = await api.confirmInventoryOrder(item.id, order.id);
    const idx = inventory.value.findIndex(i => i.id === item.id);
    if (idx !== -1) {
      inventory.value[idx] = res.item;
    }
    showSuccess('Stok Bertambah', res.message || 'Stok berhasil ditambahkan!');
  } catch (err: any) {
    showError('Gagal Konfirmasi', err.message || 'Gagal mengonfirmasi pesanan');
  }
};

const handleCancelOrder = async (item: InventoryItem, order: any) => {
  const confirmed = await showConfirm({
    title: 'Batalkan Pesanan?',
    text: `Batalkan pesanan ${order.quantity} ${order.unit} dari ${order.store_name}?`,
    confirmButtonText: 'Ya, Batalkan',
    cancelButtonText: 'Kembali',
    isDanger: true
  });
  if (!confirmed) return;

  try {
    const res = await api.cancelInventoryOrder(item.id, order.id);
    const idx = inventory.value.findIndex(i => i.id === item.id);
    if (idx !== -1) {
      inventory.value[idx] = res.item;
    }
    showSuccess('Pesanan Dibatalkan', 'Pesanan berhasil dibatalkan.');
  } catch (err: any) {
    showError('Gagal Membatalkan', err.message || 'Gagal membatalkan pesanan');
  }
};

// Inventaris Saprotan
const inventory = ref<InventoryItem[]>([]);
const selectedCategory = ref('Semua');
const categories = ['Semua', 'PUPUK', 'BIBIT', 'OBAT'];
const showAddInventoryModal = ref(false);

const newInventory = ref({
  name: '',
  type: 'PUPUK' as 'PUPUK' | 'BIBIT' | 'OBAT',
  quantity: 2,
  unit: 'Karung',
  min_threshold: 2,
  notes: ''
});

// Lumbung Panen
const harvests = ref<HarvestItem[]>([]);
const marketPrices = ref<MarketPrice[]>([]);
const showAddHarvestModal = ref(false);

const newHarvest = ref({
  commodity: 'Gabah Kering Panen (GKP)',
  total_weight_kg: 1000,
  harvest_date: new Date().toISOString().split('T')[0],
  status: 'TERSIMPAN',
  notes: 'Disimpan di lumbung utama'
});

const filteredInventory = computed(() => {
  if (selectedCategory.value === 'Semua') return inventory.value;
  return inventory.value.filter(i => i.type === selectedCategory.value);
});

const totalHarvestWeight = computed(() => {
  return harvests.value.reduce((acc, curr) => acc + (Number(curr.total_weight_kg) || 0), 0);
});

const loadData = async () => {
  try {
    const uid = currentUserId.value;
    const [inv, hrv, prices] = await Promise.all([
      api.getInventory(uid),
      api.getHarvests(uid),
      api.getMarketPrices()
    ]);
    inventory.value = inv;
    harvests.value = hrv;
    marketPrices.value = prices;
  } catch (err) {
    console.error('Error loading Buku Tani data:', err);
  }
};

const adjustStock = async (itemId: string, delta: number) => {
  try {
    const updated = await api.quickAdjustInventory(itemId, delta);
    const idx = inventory.value.findIndex(i => i.id === itemId);
    if (idx !== -1) inventory.value[idx] = updated;
  } catch (err) {
    console.error(err);
  }
};

const deleteInventoryItem = async (itemId: string) => {
  const confirmed = await showConfirm({
    title: 'Hapus Item Inventaris?',
    text: 'Item saprotan ini akan dihapus dari gudang usahatani milikmu.',
    confirmButtonText: 'Ya, Hapus',
    cancelButtonText: 'Batal',
    isDanger: true
  });
  if (!confirmed) return;

  try {
    await api.deleteInventory(itemId);
    inventory.value = inventory.value.filter(i => i.id !== itemId);
    showSuccess('Item Dihapus', 'Item berhasil dihapus dari inventaris.');
  } catch (err: any) {
    showError('Gagal Menghapus', err.message || 'Gagal menghapus item inventaris');
  }
};

const saveNewInventory = async () => {
  if (!newInventory.value.name) {
    showWarning('Nama Barang Wajib Diisi', 'Silakan masukkan nama produk saprotan.');
    return;
  }
  try {
    const created = await api.addInventory(newInventory.value, currentUserId.value);
    inventory.value.push(created);
    showAddInventoryModal.value = false;
    newInventory.value = {
      name: '',
      type: 'PUPUK',
      quantity: 2,
      unit: 'Karung',
      min_threshold: 2,
      notes: ''
    };
    showSuccess('Saprotan Ditambahkan', 'Item berhasil disimpan ke gudang usahatani.');
  } catch (err: any) {
    showError('Gagal Menyimpan', err.message || 'Gagal menyimpan item saprotan');
  }
};

const saveNewHarvest = async () => {
  if (!newHarvest.value.commodity || !newHarvest.value.total_weight_kg) {
    showWarning('Data Belum Lengkap', 'Komoditas dan berat panen wajib diisi.');
    return;
  }
  try {
    const created = await api.addHarvest(newHarvest.value, currentUserId.value);
    harvests.value.unshift(created);
    showAddHarvestModal.value = false;
    newHarvest.value = {
      commodity: 'Gabah Kering Panen (GKP)',
      total_weight_kg: 1000,
      harvest_date: new Date().toISOString().split('T')[0],
      status: 'TERSIMPAN',
      notes: 'Disimpan di lumbung utama'
    };
    showSuccess('Panen Dicatat', 'Hasil panen berhasil ditambahkan ke lumbung simpan.');
  } catch (err: any) {
    showError('Gagal Mencatat', err.message || 'Gagal mencatat panen');
  }
};

watch(currentUserId, () => {
  loadData();
});

onMounted(() => {
  loadData();
});
</script>
