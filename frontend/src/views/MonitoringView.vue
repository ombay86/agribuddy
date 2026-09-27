<template>
  <div class="space-y-6 pb-20 md:pb-8">
    <!-- Header Monitoring Utama -->
    <div class="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 md:p-8 rounded-3xl shadow-md relative overflow-hidden">
      <div class="relative z-10 space-y-2 max-w-3xl">
        <div class="inline-flex items-center gap-1.5 bg-emerald-400/20 text-emerald-200 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
          <Activity :size="14" /> Pusat Kendali Pertanian Cerdas
        </div>
        <h2 class="text-2xl md:text-3xl font-black tracking-tight leading-tight">
          Monitoring Usahatani Terpadu
        </h2>
        <p class="text-xs md:text-sm text-emerald-100/90 leading-relaxed">
          Pantau kondisi iklim lahan sawah real-time, rekomendasi irigasi, Rencana Anggaran Biaya (RAB) AI, status tahapan budidaya (HST), dan buku modal pengeluaran dalam satu dasbor cerdas.
        </p>
      </div>
      <div class="absolute -right-6 -bottom-8 select-none pointer-events-none opacity-15">
        <img src="/logo/logo-white-icon.svg" alt="watermark" class="w-48 h-48 md:w-64 md:h-64 object-contain" />
      </div>
    </div>

    <!-- Top Grid: Cuaca GPS & Quick Action Dokter Tani -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Cuaca & Rekomendasi GPS -->
      <div v-if="weather" class="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-3xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
              Cuaca Lahan Real-Time
            </span>
            <div class="flex items-center gap-2">
              <button
                @click="detectGPSWeather"
                :disabled="isLocatingWeather"
                type="button"
                class="text-[10px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-0.5 rounded-lg active:scale-95 transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                title="Deteksi lokasi GPS otomatis"
              >
                <Navigation :size="11" class="animate-pulse" />
                <span>{{ isLocatingWeather ? 'GPS...' : '📍 GPS' }}</span>
              </button>
              <span class="text-xs font-medium text-slate-500 flex items-center gap-1">
                <MapPin :size="13" /> {{ weather.location }}
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <div class="text-3xl font-black text-slate-800 tracking-tight">
                {{ weather.temp_celsius }}°<span class="text-xl font-bold text-slate-600">C</span>
              </div>
              <p class="text-xs font-semibold text-slate-700 mt-0.5">{{ weather.weather_condition }}</p>
            </div>
            <div class="text-right space-y-1 text-xs text-slate-600 font-medium">
              <div class="flex items-center justify-end gap-1.5">
                <Droplets :size="14" class="text-sky-500" />
                <span>Lembab: <strong>{{ weather.humidity_percent }}%</strong></span>
              </div>
              <div class="flex items-center justify-end gap-1.5">
                <CloudRain :size="14" class="text-indigo-500" />
                <span>Peluang Hujan: <strong>{{ weather.rain_probability_percent }}%</strong></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Anjuran Pengairan Sawah -->
        <div
          class="p-3.5 rounded-2xl border flex items-start gap-3 mt-2"
          :class="weather.irrigation_needed 
            ? 'bg-emerald-600 text-white border-emerald-700' 
            : 'bg-amber-500 text-white border-amber-600'"
        >
          <div class="p-1.5 bg-white/20 rounded-xl mt-0.5 shrink-0">
            <CheckCircle2 v-if="weather.irrigation_needed" :size="20" />
            <AlertTriangle v-else :size="20" />
          </div>
          <div>
            <h4 class="font-extrabold text-sm leading-snug">{{ weather.advice_title }}</h4>
            <p class="text-[11px] text-white/90 mt-0.5 leading-relaxed">
              {{ weather.advice_detail }}
            </p>
          </div>
        </div>
      </div>

      <!-- Quick Action: Dokter Tani AI Periksa Daun -->
      <router-link
        to="/dokter"
        class="bg-gradient-to-br from-teal-800 via-emerald-800 to-teal-950 text-white p-5 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between group active:scale-98 cursor-pointer"
      >
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <div class="inline-flex items-center gap-1.5 text-xs font-black bg-emerald-400/20 text-emerald-200 px-3 py-1 rounded-full">
              <Sparkles :size="13" /> Dokter Tani AI
            </div>
            <span class="text-2xl group-hover:scale-110 transition-transform">🔬</span>
          </div>
          <h4 class="text-base font-black">Daun Padi Menguning atau Berbintik Hama?</h4>
          <p class="text-xs text-emerald-100/80 leading-relaxed">
            Foto daun padi Anda dan sistem Google Gemini Vision cerdas kami akan mendiagnosis penyakit kresek, hawar daun, atau blas lengkap dengan dosis obat dan mitigasi agronomi.
          </p>
        </div>
        <div class="pt-3 flex items-center justify-between text-xs font-black text-emerald-300">
          <span>Buka Diagnosis Kamera & Riwayat Lab →</span>
          <div class="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-emerald-900 transition-colors">
            🔍
          </div>
        </div>
      </router-link>
    </div>

    <!-- Rencana Tani AI & Manajemen Lahan Terpadu -->
    <div class="pt-2">
      <RencanaTaniView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api, WeatherData } from '@/services/api';
import RencanaTaniView from '@/views/RencanaTaniView.vue';
import { 
  Activity, MapPin, Navigation, Droplets, 
  CloudRain, CheckCircle2, AlertTriangle, Sparkles 
} from 'lucide-vue-next';

const weather = ref<WeatherData | null>(null);
const isLocatingWeather = ref(false);

const fetchWeatherData = async () => {
  try {
    weather.value = await api.getWeather();
  } catch (err) {
    console.error('Error fetching weather data:', err);
  }
};

const detectGPSWeather = () => {
  if (!navigator.geolocation) return;
  isLocatingWeather.value = true;
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        weather.value = await api.getWeather(latitude, longitude, 'Lokasi GPS Sawah');
      } catch (err) {
        console.error('Error fetching GPS weather:', err);
      } finally {
        isLocatingWeather.value = false;
      }
    },
    (err) => {
      console.warn('GPS location access denied:', err);
      isLocatingWeather.value = false;
    },
    { enableHighAccuracy: true, timeout: 8000 }
  );
};

onMounted(() => {
  fetchWeatherData();
});
</script>
