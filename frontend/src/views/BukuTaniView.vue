<template>
  <div class="space-y-6 pb-20 md:pb-8">
    <!-- Header Banner -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-6 md:p-8 text-white shadow-xl border border-slate-800">
      <div class="relative z-10 max-w-2xl space-y-2">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
          <span>📦</span>
          <span>Logistik & Penyimpanan Tani</span>
        </div>
        <h1 class="text-2xl md:text-3xl font-black tracking-tight">
          Buku Tani — Gudang & Lumbung
        </h1>
        <p class="text-sm text-slate-300 leading-relaxed">
          Pencatatan persediaan saprotan mandiri (pupuk, bibit, obat) dan manajemen stok hasil panen gabah di lumbung simpan serta pantauan tren harga pasar komoditas.
        </p>
      </div>

      <!-- Tab Switcher -->
      <div class="mt-6 flex flex-wrap items-center gap-2 border-b border-slate-800 pb-1">
        <button
          @click="activeTab = 'stok'"
          class="px-5 py-2.5 rounded-2xl font-black text-xs transition-all cursor-pointer flex items-center gap-2"
          :class="activeTab === 'stok'
            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
            : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'"
        >
          <Package :size="16" />
          <span>Gudang Saprotan ({{ inventory.length }})</span>
        </button>

        <button
          @click="activeTab = 'lumbung'"
          class="px-5 py-2.5 rounded-2xl font-black text-xs transition-all cursor-pointer flex items-center gap-2"
          :class="activeTab === 'lumbung'
            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
            : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'"
        >
          <Warehouse :size="16" />
          <span>Lumbung Hasil Panen ({{ harvests.length }})</span>
        </button>
      </div>
    </div>

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
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'"
          >
            {{ cat }}
          </button>
        </div>

        <button
          @click="showAddInventoryModal = true"
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Plus :size="15" />
          <span>Tambah Saprotan</span>
        </button>
      </div>

      <!-- Grid Daftar Stok Barang -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="item in filteredInventory"
          :key="item.id"
          class="bg-white border rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          :class="item.is_low_stock ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200'"
        >
          <div>
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-2">
                <span
                  class="text-[10px] font-black px-2.5 py-0.5 rounded-lg uppercase tracking-wider"
                  :class="{
                    'bg-emerald-100 text-emerald-800': item.type === 'PUPUK',
                    'bg-sky-100 text-sky-800': item.type === 'BIBIT',
                    'bg-purple-100 text-purple-800': item.type === 'OBAT'
                  }"
                >
                  {{ item.type }}
                </span>
                <span v-if="item.is_low_stock" class="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-lg flex items-center gap-1">
                  <AlertTriangle :size="11" /> Menipis
                </span>
              </div>

              <!-- Indikator Jumlah -->
              <div class="text-right">
                <span class="text-2xl font-black text-slate-800 leading-none">
                  {{ item.quantity }}
                </span>
                <span class="text-xs font-semibold text-slate-500 ml-1">{{ item.unit }}</span>
              </div>
            </div>

            <h3 class="font-extrabold text-base text-slate-800 mt-2">{{ item.name }}</h3>
            <p v-if="item.notes" class="text-xs text-slate-500 mt-1 leading-relaxed">{{ item.notes }}</p>
          </div>

          <!-- Quick Adjust Controls -->
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              @click="deleteInventoryItem(item.id)"
              class="text-xs text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-rose-50 transition-all cursor-pointer"
            >
              <Trash2 :size="14" /> Hapus
            </button>

            <div class="flex items-center gap-2">
              <button
                @click="adjustStock(item.id, -1)"
                class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-base flex items-center justify-center active:scale-95 transition-all cursor-pointer"
                title="Kurang 1"
              >
                -
              </button>
              <span class="text-xs font-bold text-slate-500 px-1">Atur</span>
              <button
                @click="adjustStock(item.id, 1)"
                class="w-8 h-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base flex items-center justify-center active:scale-95 transition-all shadow-xs cursor-pointer"
                title="Tambah 1"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 2: LUMBUNG HASIL PANEN & HARGA PASAR -->
    <div v-else-if="activeTab === 'lumbung'" class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-base font-black text-slate-800">Lumbung Hasil Panen Mandiri</h2>
          <p class="text-xs text-slate-500">Pencatatan volume gabah panen dan pantauan harga komoditas pasar</p>
        </div>
        <button
          @click="showAddHarvestModal = true"
          class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          <Plus :size="15" /> Catat Panen Baru
        </button>
      </div>

      <!-- Ringkasan Total Panen Tersimpan -->
      <div class="bg-gradient-to-br from-amber-500 to-amber-700 text-white p-6 rounded-3xl shadow-md">
        <span class="text-xs font-bold uppercase tracking-wider text-amber-200">
          Total Komoditas Gabah Tersimpan di Lumbung
        </span>
        <div class="text-3xl font-black mt-2">
          {{ (totalHarvestWeight / 1000).toFixed(2) }} <span class="text-lg font-bold text-amber-200">Ton</span>
          <span class="text-sm font-medium text-amber-200 ml-1">({{ totalHarvestWeight.toLocaleString() }} Kg)</span>
        </div>
        <p class="text-xs text-amber-100 mt-1">
          Stok gabah terdata rapi siap diserap oleh mitra penggilingan lokal.
        </p>
      </div>

      <!-- Pantauan Tren Harga Pasar Komoditas -->
      <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <TrendingUp :size="15" class="text-emerald-600" /> Referensi Harga Pasar Daerah
          </h3>
          <span class="text-[10px] text-slate-400 font-medium">Diperbarui hari ini</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="price in marketPrices"
            :key="price.commodity"
            class="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1"
          >
            <h4 class="text-xs font-black text-slate-800">{{ price.commodity }}</h4>
            <div class="flex items-baseline justify-between">
              <span class="text-sm font-extrabold text-slate-900">
                Rp {{ price.price_per_kg.toLocaleString() }} <span class="text-[10px] text-slate-500">/kg</span>
              </span>
              <span
                class="text-[10px] font-bold inline-flex items-center gap-0.5"
                :class="price.trend === 'up' ? 'text-emerald-600' : 'text-slate-500'"
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

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div
            v-for="harvest in harvests"
            :key="harvest.id"
            class="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs flex items-center justify-between"
          >
            <div>
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-black px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 uppercase">
                  {{ harvest.status }}
                </span>
                <span class="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                  <Calendar :size="12" /> {{ harvest.harvest_date }}
                </span>
              </div>
              <h4 class="text-sm font-extrabold text-slate-800 mt-1">{{ harvest.commodity }}</h4>
              <p v-if="harvest.notes" class="text-xs text-slate-500 mt-0.5">{{ harvest.notes }}</p>
            </div>

            <div class="text-right">
              <div class="text-xl font-black text-emerald-700">
                {{ harvest.total_weight_kg }} <span class="text-xs font-semibold text-slate-500">Kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Tambah Saprotan Baru -->
    <div v-if="showAddInventoryModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div class="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-extrabold text-base text-slate-800">Tambah Stok Saprotan</h3>
          <button @click="showAddInventoryModal = false" class="text-slate-400 hover:text-slate-600">
            <X :size="20" />
          </button>
        </div>

        <div class="space-y-3">
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Nama Barang</label>
            <input
              v-model="newInventory.name"
              type="text"
              placeholder="Contoh: Pupuk SP-36 Petro"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Kategori</label>
              <select
                v-model="newInventory.type"
                class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500 bg-white"
              >
                <option value="PUPUK">Pupuk</option>
                <option value="BIBIT">Bibit / Benih</option>
                <option value="OBAT">Obat / Pestisida</option>
              </select>
            </div>
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Satuan</label>
              <input
                v-model="newInventory.unit"
                type="text"
                placeholder="Karung (50kg)"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Jumlah</label>
              <input
                v-model.number="newInventory.quantity"
                type="number"
                min="0"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Batas Menipis</label>
              <input
                v-model.number="newInventory.min_threshold"
                type="number"
                min="1"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500"
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
            class="w-1/2 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
          >
            Simpan Stok
          </button>
        </div>
      </div>
    </div>

    <!-- Modal: Catat Panen Baru -->
    <div v-if="showAddHarvestModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div class="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-extrabold text-base text-slate-800">Catat Hasil Panen</h3>
          <button @click="showAddHarvestModal = false" class="text-slate-400 hover:text-slate-600">
            <X :size="20" />
          </button>
        </div>

        <div class="space-y-3">
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Nama Komoditas</label>
            <input
              v-model="newHarvest.commodity"
              type="text"
              placeholder="Contoh: Gabah Kering Panen (GKP)"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Total Berat (Kg)</label>
            <input
              v-model.number="newHarvest.total_weight_kg"
              type="number"
              min="1"
              placeholder="1500"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Tanggal Panen</label>
            <input
              v-model="newHarvest.harvest_date"
              type="date"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500 bg-white"
            />
          </div>

          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Catatan Lokasi / Petak</label>
            <input
              v-model="newHarvest.notes"
              type="text"
              placeholder="Petak timur, lumbung no 1"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div class="pt-2 flex gap-2">
          <button
            @click="showAddHarvestModal = false"
            class="w-1/2 py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-600"
          >
            Batal
          </button>
          <button
            @click="saveNewHarvest"
            class="w-1/2 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
          >
            Simpan Panen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { api, InventoryItem, HarvestItem, MarketPrice } from '@/services/api';
import { 
  Package, Warehouse, Plus, AlertTriangle, 
  Trash2, X, TrendingUp, ArrowUpRight, Calendar 
} from 'lucide-vue-next';

const activeTab = ref<'stok' | 'lumbung'>('stok');

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
    const [inv, hrv, prices] = await Promise.all([
      api.getInventory(),
      api.getHarvests(),
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
  if (confirm('Yakin ingin menghapus item ini dari inventaris?')) {
    try {
      await api.deleteInventory(itemId);
      inventory.value = inventory.value.filter(i => i.id !== itemId);
    } catch (err) {
      console.error(err);
    }
  }
};

const saveNewInventory = async () => {
  if (!newInventory.value.name) {
    alert('Nama barang wajib diisi');
    return;
  }
  try {
    const created = await api.addInventory(newInventory.value);
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
  } catch (err) {
    console.error(err);
  }
};

const saveNewHarvest = async () => {
  if (!newHarvest.value.commodity || !newHarvest.value.total_weight_kg) {
    alert('Komoditas dan berat panen wajib diisi');
    return;
  }
  try {
    const created = await api.addHarvest(newHarvest.value);
    harvests.value.unshift(created);
    showAddHarvestModal.value = false;
    newHarvest.value = {
      commodity: 'Gabah Kering Panen (GKP)',
      total_weight_kg: 1000,
      harvest_date: new Date().toISOString().split('T')[0],
      status: 'TERSIMPAN',
      notes: 'Disimpan di lumbung utama'
    };
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  loadData();
});
</script>
