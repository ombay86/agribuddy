<template>
  <div class="p-4 space-y-4 pb-24">
    <!-- Kartu Cuaca & Rekomendasi Utama -->
    <div v-if="weather" class="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-3xl p-5 shadow-sm">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
          Cuaca & Lahan Hari Ini
        </span>
        <div class="flex items-center gap-2">
          <button
            @click="detectGPSWeather"
            :disabled="isLocatingWeather"
            type="button"
            class="text-[10px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-0.5 rounded-lg active:scale-95 transition-all flex items-center gap-1 shadow-xs"
            title="Deteksi lokasi GPS otomatis"
          >
            <Navigation :size="11" class="animate-pulse" />
            <span>{{ isLocatingWeather ? 'GPS...' : 'GPS' }}</span>
          </button>
          <span class="text-xs font-medium text-slate-500 flex items-center gap-1">
            <MapPin :size="13" /> {{ weather.location }}
          </span>
        </div>
      </div>


      <div class="flex items-center justify-between mt-4">
        <div>
          <div class="text-4xl font-black text-slate-800 tracking-tight">
            {{ weather.temp_celsius }}°<span class="text-2xl font-bold text-slate-600">C</span>
          </div>
          <p class="text-sm font-semibold text-slate-700 mt-1">{{ weather.weather_condition }}</p>
        </div>
        <div class="text-right space-y-1 text-xs text-slate-600 font-medium">
          <div class="flex items-center justify-end gap-1.5">
            <Droplets :size="15" class="text-sky-500" />
            <span>Lembab: <strong>{{ weather.humidity_percent }}%</strong></span>
          </div>
          <div class="flex items-center justify-end gap-1.5">
            <CloudRain :size="15" class="text-indigo-500" />
            <span>Peluang Hujan: <strong>{{ weather.rain_probability_percent }}%</strong></span>
          </div>
        </div>
      </div>

      <!-- Kotak Saran Aksi Pengairan Cerdas -->
      <div
        class="mt-4 p-4 rounded-2xl border flex items-start gap-3 transition-all"
        :class="weather.irrigation_needed 
          ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm' 
          : 'bg-amber-500 text-white border-amber-600 shadow-sm'"
      >
        <div class="p-2 bg-white/20 rounded-xl mt-0.5">
          <CheckCircle2 v-if="weather.irrigation_needed" :size="24" />
          <AlertTriangle v-else :size="24" />
        </div>
        <div>
          <h4 class="font-extrabold text-base leading-snug">{{ weather.advice_title }}</h4>
          <p class="text-xs text-white/90 mt-1 leading-relaxed">
            {{ weather.advice_detail }}
          </p>
        </div>
      </div>
    </div>

    <!-- Call to Action: Rencana Tani AI & Modal -->
    <div class="bg-gradient-to-r from-emerald-700 via-teal-800 to-emerald-900 text-white p-5 rounded-3xl shadow-md relative overflow-hidden">
      <div class="relative z-10">
        <div class="inline-flex items-center gap-1.5 bg-emerald-400/20 text-emerald-200 text-xs font-bold px-2.5 py-0.5 rounded-full mb-2">
          <Sparkles :size="13" /> Rencana Tani AI
        </div>
        <h3 class="text-lg font-extrabold leading-tight">Perencanaan Tanam & Modal Produksi</h3>
        <p class="text-xs text-emerald-100 mt-1 mb-4 leading-relaxed">
          Cukup masukkan luas lahan, AI menghitung RAB operasional, pupuk, traktor, upah buruh, serta monitoring hingga panen.
        </p>
        <router-link
          to="/rencana"
          class="btn-farmer bg-white text-emerald-800 hover:bg-emerald-50 active:scale-95 shadow font-extrabold text-sm w-full flex items-center justify-center gap-1.5"
        >
          <CalendarCheck :size="18" /> Buka Rencana Tani AI <ArrowRight :size="16" />
        </router-link>
      </div>
    </div>

    <!-- Quick Call to Action: Dokter Tani AI -->
    <div class="bg-gradient-to-r from-teal-700 to-emerald-800 text-white p-5 rounded-3xl shadow-md relative overflow-hidden">
      <div class="relative z-10">
        <div class="inline-flex items-center gap-1.5 bg-emerald-400/20 text-emerald-200 text-xs font-bold px-2.5 py-0.5 rounded-full mb-2">
          <Sparkles :size="13" /> Fitur AI Dokter
        </div>
        <h3 class="text-lg font-extrabold leading-tight">Daun Tanaman Sakit / Menguning?</h3>
        <p class="text-xs text-emerald-100 mt-1 mb-4 leading-relaxed">
          Ambil foto daun tanaman Anda sekarang. AI Dokter Tani akan mendiagnosis penyakit dan memberikan dosis obat yang tepat.
        </p>
        <router-link
          to="/dokter"
          class="btn-farmer bg-white text-emerald-800 hover:bg-emerald-50 active:scale-95 shadow font-extrabold text-sm w-full"
        >
          <Camera :size="18" /> Periksa Tanaman Sekarang
        </router-link>
      </div>
    </div>


    <!-- Ringkasan Cepat Buku Tani & Lumbung -->
    <div class="grid grid-cols-2 gap-3">
      <!-- Card Ringkasan Stok -->
      <router-link to="/inventaris" class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-all block">
        <div class="flex items-center justify-between text-slate-500 mb-2">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-600">Stok Saprotan</span>
          <Package :size="18" class="text-emerald-600" />
        </div>
        <div class="text-2xl font-black text-slate-800">
          {{ inventoryCount }} <span class="text-xs font-semibold text-slate-500">Item</span>
        </div>
        <div class="mt-2 text-[11px] font-semibold flex items-center gap-1" :class="lowStockCount > 0 ? 'text-amber-600' : 'text-emerald-600'">
          <AlertCircle v-if="lowStockCount > 0" :size="13" />
          <Check v-else :size="13" />
          <span>{{ lowStockCount > 0 ? `${lowStockCount} stok menipis` : 'Semua stok aman' }}</span>
        </div>
      </router-link>

      <!-- Card Ringkasan Lumbung -->
      <router-link to="/lumbung" class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-all block">
        <div class="flex items-center justify-between text-slate-500 mb-2">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-600">Lumbung Panen</span>
          <Warehouse :size="18" class="text-amber-600" />
        </div>
        <div class="text-2xl font-black text-slate-800">
          {{ totalHarvestWeight }} <span class="text-xs font-semibold text-slate-500">Kg</span>
        </div>
        <div class="mt-2 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
          <TrendingUp :size="13" />
          <span>Harga gabah naik</span>
        </div>
      </router-link>
    </div>

    <!-- Tips Singkat Perawatan Padi -->
    <div class="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
      <h4 class="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
        <Info :size="14" class="text-emerald-600" /> Tips Perawatan Hari Ini
      </h4>
      <p class="text-xs text-slate-600 leading-relaxed">
        Pada fase pembentukan malai, pastikan kedalaman air sawah dipertahankan setinggi 3-5 cm. Hindari kekeringan agar pengisian bulir padi maksimal.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { api, WeatherData, InventoryItem, HarvestItem } from '@/services/api';
import { 
  MapPin, Droplets, CloudRain, CheckCircle2, AlertTriangle, 
  Sparkles, Camera, Package, Warehouse, AlertCircle, Check, 
  TrendingUp, Info, CalendarCheck, ArrowRight, Navigation 
} from 'lucide-vue-next';

const weather = ref<WeatherData | null>(null);
const inventoryList = ref<InventoryItem[]>([]);
const harvestList = ref<HarvestItem[]>([]);
const isLocatingWeather = ref(false);

const inventoryCount = computed(() => inventoryList.value.length);
const lowStockCount = computed(() => inventoryList.value.filter(i => i.is_low_stock).length);
const totalHarvestWeight = computed(() => 
  harvestList.value.reduce((sum, item) => sum + item.total_weight_kg, 0)
);

const detectGPSWeather = () => {
  if (!navigator.geolocation) return;
  isLocatingWeather.value = true;
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const w = await api.getWeather(latitude, longitude, 'Lokasi GPS Petani');
        weather.value = w;
      } catch (err) {
        console.error('Error fetching GPS weather:', err);
      } finally {
        isLocatingWeather.value = false;
      }
    },
    (err) => {
      console.warn('GPS location access denied or unavailable:', err);
      isLocatingWeather.value = false;
    },
    { enableHighAccuracy: true, timeout: 8000 }
  );
};

onMounted(async () => {
  try {
    const [w, inv, hrv] = await Promise.all([
      api.getWeather(),
      api.getInventory(),
      api.getHarvests()
    ]);
    weather.value = w;
    inventoryList.value = inv;
    harvestList.value = hrv;
    // Coba minta deteksi otomatis
    detectGPSWeather();
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
  }
});
</script>

