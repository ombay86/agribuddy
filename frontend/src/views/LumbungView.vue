<template>
  <div class="p-4 space-y-4 pb-24">
    <!-- Header Modul -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
          <Warehouse class="text-emerald-600" :size="24" /> Lumbung Tani
        </h2>
        <p class="text-xs text-slate-500 mt-0.5">Catatan hasil panen & pantauan harga pasar daerah</p>
      </div>
      <button
        @click="showAddModal = true"
        class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-2xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
      >
        <Plus :size="15" /> Catat Panen
      </button>
    </div>

    <!-- Ringkasan Total Panen Tersimpan -->
    <div class="bg-gradient-to-br from-amber-500 to-amber-700 text-white p-5 rounded-3xl shadow-md">
      <span class="text-xs font-bold uppercase tracking-wider text-amber-200">
        Total Komoditas Tersimpan di Lumbung
      </span>
      <div class="text-3xl font-black mt-2">
        {{ (totalWeight / 1000).toFixed(2) }} <span class="text-lg font-bold text-amber-200">Ton</span>
        <span class="text-sm font-medium text-amber-200 ml-1">({{ totalWeight.toLocaleString() }} Kg)</span>
      </div>
      <p class="text-xs text-amber-100 mt-1">
        Siap digiling atau dijual saat harga komoditas pasar mencapai puncaknya.
      </p>
    </div>

    <!-- Pantauan Tren Harga Pasar Komoditas -->
    <div class="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <TrendingUp :size="15" class="text-emerald-600" /> Pantauan Harga Pasar Terkini
        </h3>
        <span class="text-[10px] text-slate-400 font-medium">Diperbarui hari ini</span>
      </div>

      <div class="space-y-2">
        <div
          v-for="price in marketPrices"
          :key="price.commodity"
          class="p-3 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100"
        >
          <div>
            <h4 class="text-xs font-bold text-slate-800">{{ price.commodity }}</h4>
            <p class="text-[10px] text-slate-500 mt-0.5">{{ price.note }}</p>
          </div>
          <div class="text-right">
            <div class="text-sm font-extrabold text-slate-800">
              Rp {{ price.price_per_kg.toLocaleString() }} <span class="text-[10px] text-slate-500">/kg</span>
            </div>
            <span
              class="text-[10px] font-bold inline-flex items-center gap-0.5"
              :class="price.trend === 'up' ? 'text-emerald-600' : 'text-slate-500'"
            >
              <ArrowUpRight v-if="price.trend === 'up'" :size="12" />
              {{ price.change_percent }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Riwayat Panen Tersimpan -->
    <div class="space-y-2">
      <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 px-1">
        Daftar Catatan Panen
      </h3>

      <div
        v-for="harvest in harvests"
        :key="harvest.id"
        class="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm flex items-center justify-between"
      >
        <div>
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
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

    <!-- Modal Catat Panen Baru -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white w-full max-w-sm rounded-3xl p-5 shadow-xl space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-extrabold text-base text-slate-800">Catat Hasil Panen</h3>
          <button @click="showAddModal = false" class="text-slate-400 hover:text-slate-600">
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
              placeholder="Petak barat, lumbung no 2"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500"
            />
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
import { api, HarvestItem, MarketPrice } from '@/services/api';
import { Warehouse, Plus, TrendingUp, ArrowUpRight, Calendar, X } from 'lucide-vue-next';

const harvests = ref<HarvestItem[]>([]);
const marketPrices = ref<MarketPrice[]>([]);
const showAddModal = ref(false);

const newHarvest = ref({
  commodity: 'Gabah Kering Panen (GKP)',
  total_weight_kg: 1000,
  harvest_date: new Date().toISOString().split('T')[0],
  status: 'TERSIMPAN',
  notes: ''
});

const totalWeight = computed(() =>
  harvests.value.reduce((sum, item) => sum + item.total_weight_kg, 0)
);

const loadData = async () => {
  try {
    const [h, p] = await Promise.all([
      api.getHarvests(),
      api.getMarketPrices()
    ]);
    harvests.value = h;
    marketPrices.value = p;
  } catch (err) {
    console.error(err);
  }
};

const saveNewHarvest = async () => {
  if (!newHarvest.value.commodity || !newHarvest.value.total_weight_kg) {
    alert('Mohon lengkapi nama komoditas dan berat panen');
    return;
  }
  try {
    const created = await api.addHarvest(newHarvest.value);
    harvests.value.unshift(created);
    showAddModal.value = false;
    newHarvest.value = {
      commodity: 'Gabah Kering Panen (GKP)',
      total_weight_kg: 1000,
      harvest_date: new Date().toISOString().split('T')[0],
      status: 'TERSIMPAN',
      notes: ''
    };
  } catch (err) {
    console.error(err);
  }
};

onMounted(loadData);
</script>
