<template>
  <div class="p-4 space-y-4 pb-24">
    <!-- Header Modul -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
          <Package class="text-emerald-600" :size="24" /> Buku Tani
        </h2>
        <p class="text-xs text-slate-500 mt-0.5">Kelola stok pupuk, benih, dan obat pertanian</p>
      </div>
      <button
        @click="showAddModal = true"
        class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-2xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
      >
        <Plus :size="15" /> Tambah Item
      </button>
    </div>

    <!-- Filter Kategori -->
    <div class="flex gap-2 overflow-x-auto pb-1">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selectedCategory = cat"
        class="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0"
        :class="selectedCategory === cat 
          ? 'bg-emerald-700 text-white shadow-sm' 
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Daftar Stok Barang -->
    <div class="space-y-3">
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="bg-white border rounded-3xl p-4 shadow-sm transition-all"
        :class="item.is_low_stock ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200'"
      >
        <div class="flex items-start justify-between">
          <div>
            <div class="flex items-center gap-2">
              <span
                class="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                :class="{
                  'bg-emerald-100 text-emerald-800': item.type === 'PUPUK',
                  'bg-sky-100 text-sky-800': item.type === 'BIBIT',
                  'bg-purple-100 text-purple-800': item.type === 'OBAT'
                }"
              >
                {{ item.type }}
              </span>
              <span v-if="item.is_low_stock" class="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                <AlertTriangle :size="11" /> Stok Menipis
              </span>
            </div>
            <h3 class="font-extrabold text-base text-slate-800 mt-1">{{ item.name }}</h3>
            <p v-if="item.notes" class="text-xs text-slate-500 mt-0.5">{{ item.notes }}</p>
          </div>

          <!-- Indikator Jumlah -->
          <div class="text-right">
            <div class="text-2xl font-black text-slate-800 leading-none">
              {{ item.quantity }}
            </div>
            <span class="text-[11px] font-medium text-slate-500">{{ item.unit }}</span>
          </div>
        </div>

        <!-- Tombol Aksi Cepat Cukup Sentuh (+ / -) -->
        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <button
            @click="deleteItem(item.id)"
            class="text-xs text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-rose-50 transition-all"
          >
            <Trash2 :size="14" /> Hapus
          </button>

          <div class="flex items-center gap-2">
            <button
              @click="adjustStock(item.id, -1)"
              class="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-lg flex items-center justify-center active:scale-95 transition-all"
              title="Kurang 1"
            >
              -
            </button>
            <span class="text-xs font-bold text-slate-500 px-1">Atur</span>
            <button
              @click="adjustStock(item.id, 1)"
              class="w-10 h-10 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg flex items-center justify-center active:scale-95 transition-all shadow-sm"
              title="Tambah 1"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Tambah Item Baru -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white w-full max-w-sm rounded-3xl p-5 shadow-xl space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-extrabold text-base text-slate-800">Tambah Saprotan Baru</h3>
          <button @click="showAddModal = false" class="text-slate-400 hover:text-slate-600">
            <X :size="20" />
          </button>
        </div>

        <div class="space-y-3">
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Nama Barang</label>
            <input
              v-model="newItem.name"
              type="text"
              placeholder="Contoh: Pupuk SP-36"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Kategori</label>
              <select
                v-model="newItem.type"
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
                v-model="newItem.unit"
                type="text"
                placeholder="Karung / Kantong / Botol"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Jumlah Awal</label>
              <input
                v-model.number="newItem.quantity"
                type="number"
                min="0"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Batas Menipis</label>
              <input
                v-model.number="newItem.min_threshold"
                type="number"
                min="1"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        <div class="pt-2 flex gap-2">
          <button
            @click="showAddModal = false"
            class="w-1/2 py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-600"
          >
            Batal
          </button>
          <button
            @click="saveNewItem"
            class="w-1/2 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
          >
            Simpan Stok
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { api, InventoryItem } from '@/services/api';
import { Package, Plus, AlertTriangle, Trash2, X } from 'lucide-vue-next';

const inventory = ref<InventoryItem[]>([]);
const selectedCategory = ref('Semua');
const categories = ['Semua', 'PUPUK', 'BIBIT', 'OBAT'];
const showAddModal = ref(false);

const newItem = ref({
  name: '',
  type: 'PUPUK' as 'PUPUK' | 'BIBIT' | 'OBAT',
  quantity: 2,
  unit: 'Karung',
  min_threshold: 2,
  notes: ''
});

const filteredItems = computed(() => {
  if (selectedCategory.value === 'Semua') return inventory.value;
  return inventory.value.filter(i => i.type === selectedCategory.value);
});

const loadInventory = async () => {
  try {
    inventory.value = await api.getInventory();
  } catch (err) {
    console.error(err);
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

const deleteItem = async (itemId: string) => {
  if (confirm('Yakin ingin menghapus item ini dari inventaris?')) {
    try {
      await api.deleteInventory(itemId);
      inventory.value = inventory.value.filter(i => i.id !== itemId);
    } catch (err) {
      console.error(err);
    }
  }
};

const saveNewItem = async () => {
  if (!newItem.value.name) {
    alert('Nama barang wajib diisi');
    return;
  }
  try {
    const created = await api.addInventory(newItem.value);
    inventory.value.push(created);
    showAddModal.value = false;
    newItem.value = {
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

onMounted(loadInventory);
</script>
