<template>
  <PageLayout variant="wide">

    <!-- ==================== LOADING SKELETON ==================== -->
    <div v-if="isLoadingFarms" class="space-y-6 animate-pulse">
      <div class="bg-[#324d1d]/20 rounded-3xl h-36 w-full"></div>
      <div class="bg-slate-200 rounded-3xl h-48 w-full"></div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-slate-100 rounded-3xl h-32"></div>
        <div class="bg-slate-100 rounded-3xl h-32"></div>
      </div>
      <div class="flex justify-center pt-2">
        <div class="flex items-center gap-2 text-slate-400 text-sm font-semibold">
          <Loader2 :size="16" class="animate-spin" />
          <span>Memuat data usahatani...</span>
        </div>
      </div>
    </div>

    <!-- ==================== EMPTY STATE: BELUM ADA LAHAN ==================== -->
    <div v-else-if="hasNoFarmlands" class="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 py-12 space-y-6">
      <!-- Ilustrasi -->
      <div class="w-24 h-24 rounded-3xl bg-[#99c30c]/10 border-2 border-[#99c30c]/30 flex items-center justify-center shadow-xs">
        <Sprout :size="44" class="text-[#99c30c]" />
      </div>

      <!-- Teks -->
      <div class="space-y-2 max-w-sm">
        <h3 class="text-sm text-slate-800 leading-tight">
          Kamu belum membuat lahan untuk diolah
        </h3>
      </div>

      <!-- CTA Button -->
      <button
        type="button"
        @click="router.push('/rencana')"
        class="inline-flex font-bold items-center gap-2.5 bg-[#324d1d]/90 hover:bg-[#324d1d] text-white active:scale-95 text-[#324d1d] text-sm  px-6 py-3 rounded-2xl shadow-sm transition-all cursor-pointer"
      >
        Buat Sekarang
      </button>
    </div>

    <!-- ==================== KONTEN UTAMA (ada lahan) ==================== -->
    <template v-else>

    <!-- ==================== TOP BANNER / COCKPIT HEADER ==================== -->
    <div class="bg-gradient-to-r from-[#324d1d] via-[#324d1d] to-[#324d1d] text-white p-6 md:p-8 rounded-3xl shadow-md relative overflow-hidden">
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="space-y-2 max-w-2xl">
          <h2 class="text-xl md:text-3xl font-bold tracking-tight leading-tight">
            Pusat Kendali Budidaya Sawah
          </h2>
          <p class="text-xs text-[#fff2d9]/90 leading-relaxed">
            Pantau perkembangan tanaman, kondisi cuaca, kebutuhan air, kesehatan tanaman, biaya usaha tani, dan kesiapan hasil panen dengan mudah.
          </p>
        </div>

        <!-- Quick Plot Switcher Pill in Header -->
        <div class="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl shrink-0 space-y-1.5">
          <label class="text-[10px] font-bold uppercase tracking-wider text-[#99c30c] flex items-center gap-1">
            Petak Sawah yang Dipantau:
          </label>
          <div class="relative">
            <select
              v-model="selectedFarmId"
              @change="handleFarmChange"
              class="w-full bg-black/80 font-bold text-white text-xs  px-3 py-2 rounded-xl border border-white/25 focus:outline-none focus:border-[#99c30c] cursor-pointer pr-8"
            >
              <option v-for="farm in farmlands" :key="farm.id" :value="farm.id">
                {{ farm.name }} ({{ farm.land_size_ha }} Ha)
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== HERO CARD: STATUS LAHAN & PROGRESS BAR SIKLUS TANAM ==================== -->
    <div class="bg-white border border-slate-200/90 rounded-3xl p-5 md:p-7 shadow-xs space-y-6">
      <!-- Row 1: Identitas Lahan & Status Fase Berjalan -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div class="flex items-start gap-3.5">
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="text-base md:text-lg  text-slate-800 tracking-tight font-bold">
                {{ activeFarmland.name }}
              </h3>
              <span class="text-[10px] font-bold bg-[#99c30c]/20 text-[#324d1d] border border-[#99c30c]/40 px-2 py-0.5 rounded-full uppercase">
                {{ activeFarmland.commodity }}
              </span>
            </div>
            <p class="text-xs text-slate-500 font-semibold mt-0.5 flex items-center gap-2 flex-wrap">
              <span>{{ activeFarmland.location }}</span>
              <span>•</span>
              <span>{{ activeFarmland.land_size_ha }} Hektar</span>
              <span>•</span>
              <span>{{ activeFarmland.water_source }}</span>
            </p>
          </div>
        </div>

        <!-- Fase Berjalan & Badge HST -->
        <div class="flex items-center gap-3 bg-[#fff2d9] border border-slate-200/80 p-3 rounded-2xl">
          <div class="text-right">
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Status Saat Ini</span>
            <span class="text-xs md:text-sm font-bold text-[#324d1d] block">{{ currentPhase.name }}</span>
            <span class="text-[11px] font-semibold text-slate-500">Rentang: {{ currentPhase.day_range }}</span>
          </div>
          <div class="w-12 h-12 rounded-xl bg-[#324d1d]/90 text-white flex flex-col items-center justify-center shrink-0 shadow-sm">
            <span class="text-[9px] font-bold uppercase leading-none">HST</span>
            <span class="text-lg  leading-none mt-0.5">{{ currentHST }}</span>
          </div>
        </div>
      </div>

      <!-- Row 2: Milestone Lifecycle Progress Bar (0% - 100%) -->
      <div class="space-y-3">
        <div class="flex items-center justify-between text-sm">
          <span class="font-extrabold text-slate-700 flex items-center gap-1.5">
            Kemajuan Siklus Budidaya Menuju Panen
          </span>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-[#324d1d] bg-[#99c30c]/10 px-2.5 py-0.5 rounded-full border border-[#99c30c]/40">
              {{ lifecycleProgress }}% Selesai
            </span>
            <span class="text-[11px] font-bold text-slate-500">
              (Sisa {{ daysUntilHarvest }} Hari Menuju Panen)
            </span>
          </div>
        </div>

        <!-- The Visual Bar with 5 Phase Steps -->
        <div class="relative pt-2 pb-6">
          <!-- Track Bar -->
          <div class="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
            <div
              class="h-full bg-gradient-to-r from-[#99c30c] to-[#99c30c] rounded-full transition-all duration-700 ease-out"
              :style="{ width: `${lifecycleProgress}%` }"
            ></div>
          </div>

          <!-- 5 Milestone Points -->
          <div class="flex justify-between items-center text-[10px] font-bold mt-2">
            <div
              v-for="(phase, idx) in phases"
              :key="idx"
              class="flex flex-col items-center text-center max-w-[70px] md:max-w-[100px]"
            >
              <div
                class="w-5 h-5 rounded-full flex items-center justify-center text-[10px]  border transition-all mb-1"
                :class="getPhaseBadgeClass(phase.status)"
              >
                <Check v-if="phase.status === 'SELESAI'" :size="10" />
                <span v-else>{{ idx + 1 }}</span>
              </div>
              <span
                class="hidden sm:block leading-tight text-[10px]"
                :class="phase.status === 'SEDANG_BERJALAN' ? 'text-[#324d1d] ' : 'text-slate-500'"
              >
                {{ phase.short_name }}
              </span>
            </div>
          </div>
        </div>

        <!-- Quick Highlights Chips -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-slate-100">
          <div class="p-2.5 bg-[#fff2d9] rounded-2xl border border-slate-100">
            <span class="text-[10px] font-semibold text-slate-400 uppercase block">Tanggal Mulai</span>
            <span class="text-xs font-bold text-slate-700">{{ startDateFormatted }}</span>
          </div>
          <div class="p-2.5 bg-[#fff2d9] rounded-2xl border border-slate-100">
            <span class="text-[10px] font-semibold text-slate-400 uppercase block">Estimasi Panen</span>
            <span class="text-xs font-bold text-[#324d1d]">{{ targetHarvestDateFormatted }}</span>
          </div>
          <div class="p-2.5 bg-[#fff2d9] rounded-2xl border border-slate-100">
            <span class="text-[10px] font-semibold text-slate-400 uppercase block">Proyeksi Hasil</span>
            <span class="text-xs font-bold text-slate-700">{{ projectedYieldTon }} Ton GKP</span>
          </div>
          <div class="p-2.5 bg-[#fff2d9] rounded-2xl border border-slate-100">
            <span class="text-[10px] font-semibold text-slate-400 uppercase block">Proyeksi Laba</span>
            <span class="text-xs font-bold text-[#324d1d]">{{ projectedProfit }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== 2-COLUMN REAL-TIME DSS GRID ==================== -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      <!-- ==================== KOLOM KIRI (7 COLS): Agro-Klimat & Tugas Hari Ini ==================== -->
      <div class="lg:col-span-7 space-y-6">
        
        <!-- WIDGET 1: Cuaca Mikro Real-Time & Anjuran Irigasi Cerdas -->
        <SectionCard>
          <SectionHeader>
            <div class="flex items-center gap-2">
              <span class="text-xs font-extrabold uppercase tracking-wider text-[#324d1d] bg-[#99c30c]/70 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                Agro-Klimat & Irigasi Sawah
              </span>
            </div>
          </SectionHeader>

          <!-- Kondisi Cuaca Sensor -->
          <div v-if="weather" class="space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
                  {{ weather.temp_celsius }}°<span class="text-xl font-bold text-slate-600">C</span>
                </div>
                <p class="text-xs font-bold text-slate-700 mt-0.5 flex items-center gap-1">
                  <span>{{ weather.weather_condition }}</span>
                  <span class="text-slate-400 font-normal">({{ weather.location }})</span>
                </p>
              </div>

              <div class="text-right space-y-1.5 text-xs text-slate-600 font-semibold">
                <div class="flex items-center justify-end gap-1.5">
                  <Droplets :size="14" class="text-[#99c30c]" />
                  <span>Kelembaban: <strong class="text-slate-800">{{ weather.humidity_percent }}%</strong></span>
                </div>
                <div class="flex items-center justify-end gap-1.5">
                  <CloudRain :size="14" class="text-[#fe8b02]" />
                  <span>Peluang Hujan: <strong class="text-slate-800">{{ weather.rain_probability_percent }}%</strong></span>
                </div>
              </div>
            </div>

            <!-- Rekomendasi Pintar Irigasi (DSS Decision Box) -->
            <div
              class="p-4 rounded-2xl border flex items-start gap-3 transition-all"
              :class="weather.irrigation_needed 
                ? 'bg-[#99c30c]/10 text-[#324d1d] border-[#99c30c]/40' 
                : 'bg-[#fed701]/10 text-[#324d1d] border-[#fed701]/40'"
            >
              <div
                class="p-2 rounded-xl mt-0.5 shrink-0 shadow-2xs"
                :class="weather.irrigation_needed ? 'bg-[#324d1d]/90 text-white' : 'bg-[#fed701] text-[#324d1d]'"
              >
                <CheckCircle2 v-if="weather.irrigation_needed" :size="20" />
                <AlertTriangle v-else :size="20" />
              </div>
              <div class="space-y-0.5">
                <div class="flex items-center gap-2">
                  <h4 class="font-extrabold text-xs md:text-sm">{{ weather.advice_title }}</h4>
                </div>
                <p class="text-xs leading-relaxed opacity-90">
                  {{ weather.advice_detail }}
                </p>
              </div>
            </div>
          </div>
        </SectionCard>

        <!-- WIDGET 2: Checklist Tugas Agronomi Fase Ini (Interactive To-Do) -->
        <SectionCard>
          <SectionHeader>
            <div>
              <h4 class="text-sm font-bold text-slate-800 flex items-center gap-2">
                Checklist Tugas Lapangan: {{ currentPhase.short_name }}
              </h4>
              <p class="text-[11px] text-slate-500 font-medium">Tandai aksi agronomi yang sudah selesai dikerjakan</p>
            </div>
            <span class="text-xs font-bold text-[#324d1d] bg-[#99c30c]/10 px-2.5 py-1 rounded-xl border border-[#99c30c]/40">
              {{ completedTasksCount }} / {{ activeTasks.length }} Tuntas
            </span>
          </SectionHeader>

          <!-- Task Items -->
          <div class="space-y-2.5">
            <div
              v-for="(task, tIdx) in activeTasks"
              :key="tIdx"
              @click="toggleTask(tIdx)"
              class="p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none"
              :class="task.done 
                ? 'bg-[#99c30c]/60 border-[#99c30c]/40 text-slate-500 line-through' 
                : 'bg-[#fff2d9] hover:bg-white border-slate-200 text-slate-800 shadow-2xs'"
            >
              <div
                class="w-5 h-5 rounded-lg border mt-0.5 flex items-center justify-center shrink-0 transition-colors"
                :class="task.done ? 'bg-[#324d1d]/90 border-[#324d1d] text-white' : 'border-slate-300 bg-white'"
              >
                <Check v-if="task.done" :size="12" />
              </div>
              <div class="flex-1">
                <span class="text-xs leading-snug">{{ task.text }}</span>
              </div>
            </div>
          </div>

          <!-- AI Tips Agronomi untuk Fase Ini -->
          <div class="bg-gradient-to-r from-[#99c30c]/10 to-[#99c30c]/10 border border-[#99c30c]/70 p-3.5 rounded-2xl flex items-start gap-2.5">
            <!-- <Sparkles :size="16" class="text-[#324d1d] shrink-0 mt-0.5" /> -->
            <div>
              <span class="text-[10px] font-bold uppercase text-[#324d1d] block">Tips:</span>
              <p class="text-xs text-[#324d1d] font-medium mt-0.5 leading-relaxed">
                {{ currentPhase.ai_tips || "Pantau kedalaman genangan air pada angka 3-5 cm untuk merangsang anakan produktif dan kurangi pemberian urea jika curah hujan mingguan tinggi." }}
              </p>
            </div>
          </div>

          <div class="pt-1 flex items-center justify-between">
            <router-link
              :to="{ path: '/rencana', query: { tab: 'kontrol', farm_id: selectedFarmId } }"
              class="text-xs font-bold underline text-[#324d1d] hover:text-[#324d1d] flex items-center gap-1 group"
            >
              <span>Buka Seluruh 5 Fase Kontrol Tanam & Modal</span>
            </router-link>
          </div>
        </SectionCard>

      </div>

      <!-- ==================== KOLOM KANAN (5 COLS): Kesehatan AI, Modal, & Gudang ==================== -->
      <div class="lg:col-span-5 space-y-6">

        <!-- WIDGET 3: Agri AI (Asisten Cerdas & Fitopatologi) -->
        <div class="bg-gradient-to-br from-[#324d1d] to-[#324d1d] text-white border border-[#324d1d] rounded-3xl p-5 md:p-6 shadow-xs space-y-4 relative overflow-hidden">
          <div class="flex items-center justify-between pb-2 border-b border-[#324d1d]/80">
            <div class="flex items-center gap-2">
              <Sparkles :size="18" class="text-[#fed701]" />
              <h4 class="text-sm font-bold text-white">Agri AI Assistant</h4>
            </div>
          </div>

          <!-- Status Daun Terakhir -->
          <div class="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-bold text-[#fff2d9] uppercase">Diagnosa Terakhir:</span>
              <span class="text-[10px] text-slate-300">{{ lastDiagnosis.detected_at }}</span>
            </div>
            <div class="flex items-center gap-2.5">
              <div>
                <h5 class="text-sm font-bold text-white leading-tight">
                  {{ lastDiagnosis.disease_name }}
                </h5>
                <p class="text-[11px] text-[#fff2d9]/90 font-medium">
                  Tingkat Keparahan: <strong class="text-white">{{ lastDiagnosis.severity }}</strong> (Keyakinan: {{ Math.round(lastDiagnosis.confidence * 100) }}%)
                </p>
              </div>
            </div>
            <p class="text-[11.5px] text-[#fff2d9]/80 leading-relaxed border-t border-white/10 pt-2 mt-1">
              {{ lastDiagnosis.symptoms[0] || "Daun dalam kondisi hijau normal tanpa tanda nekrosis patogen." }}
            </p>
          </div>

          <!-- Tombol CTA Scan Daun / Chat -->
          <router-link
            to="/dokter"
            class="w-full font-bold bg-[#99c30c] hover:bg-[#99c30c]/80 text-black  text-xs py-3 px-4 rounded-2xl shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 text-center"
          >
            <span>Chat & Periksa Tanaman via Agri AI</span>
          </router-link>
        </div>

        <!-- WIDGET 4: Serapan Modal Sawah (Buku Kas Realisasi) -->
        <SectionCard>
          <SectionHeader>
            <h4 class="text-sm font-bold text-slate-800 flex items-center gap-2">
              Realisasi Modal Lahan
            </h4>
          </SectionHeader>

          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-[10px] font-bold text-slate-400 uppercase block">Total Terpakai</span>
                <span class="text-xl font-bold text-slate-800">Rp {{ totalSpentFormatted }}</span>
              </div>
              <div class="text-right">
                <span class="text-[10px] font-bold text-slate-400 uppercase block">Alokasi RAB AI</span>
                <span class="text-sm font-bold text-slate-500">Rp {{ totalBudgetFormatted }}</span>
              </div>
            </div>

            <!-- Progress Bar Serapan Modal -->
            <div class="space-y-1">
              <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                <div
                  class="h-full bg-[#324d1d]/90 rounded-full transition-all duration-500"
                  :style="{ width: `${budgetSpentPercent}%` }"
                ></div>
              </div>
              <div class="flex justify-between text-[10px] font-bold text-slate-400">
                <span>{{ budgetSpentPercent }}% Anggaran Terpakai</span>
                <span>Sisa: Rp {{ remainingBudgetFormatted }}</span>
              </div>
            </div>

            <div class="p-3 bg-[#fff2d9] rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
              <div class="flex items-center gap-2">
                <TrendingUp :size="16" class="text-[#324d1d]" />
                <span class="font-bold text-slate-700">HPP / Kg Berjalan:</span>
              </div>
              <span class="font-bold text-[#324d1d]">{{ hppPerKgFormatted }}</span>
            </div>

            <!-- Riwayat Pengeluaran Petak Sawah Ini (Database) -->
            <div class="pt-2 border-t border-slate-100 space-y-2">
              <div class="flex items-center justify-between text-[11px] font-bold text-slate-500">
                <span>Riwayat Pengeluaran (Buku Modal):</span>
                <span class="text-[#324d1d] ">{{ activeFarmland.capital_expenses?.length || 0 }} Item</span>
              </div>
              <div v-if="activeFarmland.capital_expenses && activeFarmland.capital_expenses.length > 0" class="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                <div
                  v-for="exp in activeFarmland.capital_expenses"
                  :key="exp.id"
                  class="flex items-center justify-between text-[11px] p-2 rounded-xl bg-[#fff2d9] border border-slate-100 hover:bg-slate-100/80 transition-colors"
                >
                  <div class="truncate pr-2">
                    <p class="font-bold text-slate-800 truncate">{{ exp.item_name }}</p>
                    <p class="text-[9px] text-slate-400">{{ exp.date }}</p>
                  </div>
                  <span class=" text-slate-800 shrink-0">Rp {{ (exp.amount || 0).toLocaleString('id-ID') }}</span>
                </div>
              </div>
              <div v-else class="text-center py-2.5 bg-[#fff2d9] rounded-xl border border-dashed border-slate-200">
                <p class="text-[11px] text-slate-400 font-medium">Belum ada pengeluaran dicatat untuk petak ini.</p>
              </div>
            </div>
          </div>
        </SectionCard>

      </div>

    </div>

    </template><!-- end v-else (ada lahan) -->
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { api, WeatherData, Farmland, InventoryItem, HarvestItem, DiagnosisResult } from '@/services/api';
import { useFarmlandState } from '@/composables/useFarmlandState';
import { useUserState } from '@/services/userState';
import { 
  Activity, Navigation, Droplets, CloudRain, 
  CheckCircle2, AlertTriangle, Sparkles, Calendar,
  CalendarDays, CheckSquare, Check, ArrowRight, Camera,
  Wallet, Package, Store, TrendingUp, CloudSun, Warehouse,
  Loader2, Sprout
} from 'lucide-vue-next';
import PageLayout from '@/components/layout/PageLayout.vue';
import QuickLinkCard from '@/components/ui/QuickLinkCard.vue';
import SectionCard from '@/components/ui/SectionCard.vue';
import SectionHeader from '@/components/ui/SectionHeader.vue';

// State & Shared Farmland State
const router = useRouter();
const { currentUserId, currentPersona } = useUserState();
const { globalFarmlands, activeFarmId, loadGlobalFarmlands, setActiveFarmId } = useFarmlandState();
const weather = ref<WeatherData | null>(null);
const isLocatingWeather = ref(false);
const isLoadingFarms = ref(false);
const farmlands = globalFarmlands;
const selectedFarmId = ref<string>(activeFarmId.value || '');

const hasNoFarmlands = computed(() => !isLoadingFarms.value && farmlands.value.length === 0);

watch(activeFarmId, (newId) => {
  if (newId && newId !== selectedFarmId.value) {
    selectedFarmId.value = newId;
    loadTasks();
    fetchWeatherData();
  }
});

watch(currentUserId, async (newUserId) => {
  if (newUserId) {
    await loadGlobalFarmlands(newUserId);
    if (activeFarmId.value) {
      selectedFarmId.value = activeFarmId.value;
      loadTasks();
      fetchWeatherData();
    }
  }
});

// Logistik Ringkas (Gudang vs Lumbung)
const logisticsTab = ref<'gudang' | 'lumbung'>('gudang');

// Inventaris Ringkas Gudang
const inventorySummary = ref<InventoryItem[]>([
  { id: 'inv_1', name: 'Pupuk Urea N-46', type: 'PUPUK', quantity: 1, unit: 'Karung (50kg)', min_threshold: 2, is_low_stock: true },
  { id: 'inv_2', name: 'Pupuk NPK Phonska Plus', type: 'PUPUK', quantity: 4, unit: 'Karung (50kg)', min_threshold: 2, is_low_stock: false },
  { id: 'inv_3', name: 'Fungisida Tembaga Hidroksida', type: 'OBAT', quantity: 3, unit: 'Botol 500ml', min_threshold: 1, is_low_stock: false },
]);

// Lumbung Hasil Panen
const harvests = ref<HarvestItem[]>([
  { id: 'hrv_1', commodity: 'Gabah Kering Panen (GKP)', total_weight_kg: 2400, harvest_date: '2026-08-20', status: 'TERSIMPAN', notes: 'Lumbung Utama' },
  { id: 'hrv_2', commodity: 'Beras Konsumsi Super', total_weight_kg: 450, harvest_date: '2026-08-25', status: 'TERSIMPAN', notes: 'Gilingan Mandiri' }
]);

const totalHarvestStockKg = computed(() => {
  return harvests.value.reduce((sum, h) => sum + (Number(h.total_weight_kg) || 0), 0);
});

const totalHarvestStockTon = computed(() => {
  return (totalHarvestStockKg.value / 1000).toFixed(1);
});

const totalHarvestValueFormatted = computed(() => {
  const val = totalHarvestStockKg.value * 6800;
  return val.toLocaleString('id-ID');
});

// Diagnosa Daun Terakhir
const lastDiagnosis = ref<DiagnosisResult>({
  disease_name: "Daun Padi Sehat & Normal",
  english_name: "Healthy Rice Leaf Condition",
  confidence: 0.96,
  severity: "Aman",
  symptoms: ["Warna hijau segar merata, klorofil aktif optimal tanpa lesi nekrotik."],
  actions: ["Lanjutkan sanitasi rutin pematang sawah dan jaga genangan air 3-5 cm."],
  detected_at: "24 Sep 2026, 08:30 WIB"
});

// Dynamic Farm Data
const activeFarmland = computed<Farmland>(() => {
  const found = farmlands.value.find(f => f.id === selectedFarmId.value);
  if (found) return found;
  if (farmlands.value.length > 0) return farmlands.value[0];
  return {
    id: `farm_${currentUserId.value}`,
    user_id: currentUserId.value,
    name: `Petak Sawah ${currentPersona.value.name}`,
    land_size_ha: currentPersona.value.specialties?.[1] ? parseFloat(currentPersona.value.specialties[1]) || 0.8 : 0.8,
    commodity: currentPersona.value.serviceCategory || 'Padi Sawah Inpari 32',
    soil_type: 'Lempung Berliat (Subur)',
    water_source: 'Irigasi Teknis Bendungan',
    location: currentPersona.value.location || 'Desa Sukamaju Krajan',
    latitude: -7.2504,
    longitude: 112.7512,
    collaborators: [],
    capital_expenses: [],
    planting_date: '2026-08-16',
    target_harvest_date: '2026-12-09'
  };
});

// Dynamic HST based on selected farm's planting_date or created_at
const currentHST = computed(() => {
  const farm = activeFarmland.value;
  if (farm.planting_date) {
    const plantTime = new Date(farm.planting_date).getTime();
    const now = new Date().getTime();
    const diffDays = Math.floor((now - plantTime) / (1000 * 60 * 60 * 24));
    return Math.max(0, Math.min(115, diffDays));
  }
  // Deterministic fallback by farm ID
  if (farm.id === 'farm_001') return 42;
  if (farm.id === 'farm_002') return 14;
  if (farm.id === 'farm_dc651c') return 75;
  return 30;
});

const totalDays = 115;
const daysUntilHarvest = computed(() => Math.max(0, totalDays - currentHST.value));
const lifecycleProgress = computed(() => Math.min(100, Math.round((currentHST.value / totalDays) * 100)));

// Dynamic Dates per Farm
const startDateFormatted = computed(() => {
  const farm = activeFarmland.value;
  const dStr = farm.planting_date || farm.created_at || '2026-08-16';
  const d = new Date(dStr);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
});

const targetHarvestDateFormatted = computed(() => {
  const farm = activeFarmland.value;
  if (farm.target_harvest_date) {
    return new Date(farm.target_harvest_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  const dStr = farm.planting_date || farm.created_at || '2026-08-16';
  const d = new Date(dStr);
  d.setDate(d.getDate() + 115);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
});

// Dynamic 5 Phases linked to Farm HST, Size, and Real Expenses
const phases = computed(() => {
  const hst = currentHST.value;
  const ha = activeFarmland.value.land_size_ha || 1.0;
  const expenses = activeFarmland.value.capital_expenses || [];

  const sumCat = (cat: string) => expenses.filter(e => e.category === cat).reduce((s, e) => s + (e.amount || 0), 0);
  const olahTanahActual = sumCat('OLAH_TANAH');
  const benihActual = sumCat('BENIH_BIBIT');
  const pupukActual = sumCat('PUPUK_NUTRISI');
  const rawatActual = sumCat('PESTISIDA') + sumCat('TENAGA_KERJA');
  const panenActual = sumCat('PANEN');

  const p1Status = hst >= 1 ? 'SELESAI' : 'SEDANG_BERJALAN';
  const p2Status = hst > 15 ? 'SELESAI' : (hst >= 1 ? 'SEDANG_BERJALAN' : 'BELUM');
  const p3Status = hst > 45 ? 'SELESAI' : (hst >= 16 ? 'SEDANG_BERJALAN' : 'BELUM');
  const p4Status = hst > 85 ? 'SELESAI' : (hst >= 46 ? 'SEDANG_BERJALAN' : 'BELUM');
  const p5Status = hst >= 115 ? 'SELESAI' : (hst >= 86 ? 'SEDANG_BERJALAN' : 'BELUM');

  return [
    {
      step_no: 1,
      short_name: "Olah Tanah",
      name: "Fase 1: Persiapan & Olah Tanah",
      day_range: "HST -15 s/d 0",
      status: p1Status,
      budget: Math.round(ha * 1500000),
      actual: olahTanahActual || (p1Status === 'SELESAI' ? Math.round(ha * 1450000) : 0),
      ai_tips: "Lakukan pembajakan tanah sedalam 20-25 cm, genangi air tipis 2-3 hari untuk melunakkan bongkahan tanah dan mensterilkan bibit gulma."
    },
    {
      step_no: 2,
      short_name: "Tanam",
      name: "Fase 2: Penanaman Bibit & Pupuk Dasar",
      day_range: "HST 1 s/d 15",
      status: p2Status,
      budget: Math.round(ha * 2000000),
      actual: benihActual || (p2Status === 'SELESAI' ? Math.round(ha * 1900000) : 0),
      ai_tips: "Tanam bibit umur 15-20 hari dengan sistem jajar legowo 2:1 (25x12.5x50 cm). Berikan pupuk dasar SP-36 dan 1/3 Urea, serta atur macak-macak air sawah."
    },
    {
      step_no: 3,
      short_name: "Vegetatif",
      name: "Fase 3: Pembentukan Anakan & Pupuk Susulan",
      day_range: "HST 16 s/d 45",
      status: p3Status,
      budget: Math.round(ha * 1750000),
      actual: pupukActual || (p3Status === 'SELESAI' ? Math.round(ha * 1650000) : 0),
      ai_tips: "Jaga genangan air 3-5 cm untuk merangsang anakan produktif maksimal. Aplikasikan pupuk susulan NPK Phonska dan semprot fungisida jika cuaca lembab ekstrem."
    },
    {
      step_no: 4,
      short_name: "Generatif",
      name: "Fase 4: Primordia & Pengisian Bulir",
      day_range: "HST 46 s/d 85",
      status: p4Status,
      budget: Math.round(ha * 1400000),
      actual: rawatActual || (p4Status === 'SELESAI' ? Math.round(ha * 1350000) : 0),
      ai_tips: "Masuk fase bunting! Naikkan air 5-7 cm saat pengisian bulir. Semprot pupuk daun kalium tinggi (MKP/KNO3) untuk bobot bulir gabah padat bernas."
    },
    {
      step_no: 5,
      short_name: "Panen",
      name: "Fase 5: Pematangan Bulir & Panen Raya",
      day_range: "HST 86 s/d 115",
      status: p5Status,
      budget: Math.round(ha * 1400000),
      actual: panenActual || (p5Status === 'SELESAI' ? Math.round(ha * 1400000) : 0),
      ai_tips: "Keringkan petak sawah 7-10 hari sebelum panen untuk menyeragamkan kematangan gabah dan memudahkan traktor combine harvester masuk."
    }
  ];
});

// Current Phase
const currentPhase = computed(() => {
  return phases.value.find(p => p.status === 'SEDANG_BERJALAN') || phases.value[phases.value.length - 1];
});

// Proyeksi
const projectedYieldTon = computed(() => {
  const baseYield = activeFarmland.value.land_size_ha * 6.5;
  return baseYield.toFixed(1);
});

// Budget & Expenses
const totalBudget = computed(() => {
  return Math.round(activeFarmland.value.land_size_ha * 6400000);
});

const totalSpent = computed(() => {
  const expenses = activeFarmland.value.capital_expenses;
  if (expenses && expenses.length > 0) {
    return expenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  }
  return 0;
});

const projectedProfit = computed(() => {
  const rev = activeFarmland.value.land_size_ha * 6500 * 6800;
  const cost = totalBudget.value;
  const prof = rev - cost;
  return `Rp ${(prof / 1000000).toFixed(1)} Juta`;
});

const budgetSpentPercent = computed(() => {
  if (totalBudget.value <= 0) return 0;
  return Math.min(100, Math.round((totalSpent.value / totalBudget.value) * 100));
});

const hppPerKgFormatted = computed(() => {
  const yieldKg = activeFarmland.value.land_size_ha * 6500;
  if (yieldKg <= 0 || totalSpent.value <= 0) return 'Rp 3.850 / kg';
  const hpp = Math.round(totalSpent.value / yieldKg);
  return `Rp ${hpp.toLocaleString('id-ID')} / kg`;
});

const totalBudgetFormatted = computed(() => totalBudget.value.toLocaleString('id-ID'));
const totalSpentFormatted = computed(() => totalSpent.value.toLocaleString('id-ID'));
const remainingBudgetFormatted = computed(() => Math.max(0, totalBudget.value - totalSpent.value).toLocaleString('id-ID'));

// To-Do Tasks for current phase
interface LocalTask {
  text: string;
  done: boolean;
}

const defaultTasksByPhase: Record<number, LocalTask[]> = {
  1: [
    { text: "Pembajakan singkal pertama dan pembalikan tanah sawah", done: true },
    { text: "Penggenangan air tipis 2-3 hari untuk melunakkan bongkahan tanah", done: true },
    { text: "Penggaruan dan perataan permukaan petak sawah siap tanam", done: false },
    { text: "Aplikasi pembenah tanah dolomit dan pupuk kandang matang", done: false }
  ],
  2: [
    { text: "Persiapan bibit siap pindah tanam umur 15-18 hari dari persemaian", done: true },
    { text: "Pengaplikasian pupuk dasar SP-36 merata sebelum tanam", done: true },
    { text: "Pemasangan patok jajar legowo 2:1 jarak 25 x 12.5 x 50 cm", done: false },
    { text: "Pengecekan keong mas pada 3 hari pertama genangan air", done: false }
  ],
  3: [
    { text: "Pembersihan gulma liar dan cek pematang dari lubang tikus", done: true },
    { text: "Aplikasi pemupukan susulan II: NPK Phonska & Urea berimbang", done: false },
    { text: "Pengamatan embun pagi pada daun padi terhadap bercak blas/kresek", done: false },
    { text: "Pengaturan sirkulasi debit pintu air irigasi setinggi 3-5 cm", done: true }
  ],
  4: [
    { text: "Pengecekan serangan penggerek batang (sundep/beluk) saat fase bunting", done: true },
    { text: "Pemberian nutrisi pengisi bulir: Pupuk Kalium tinggi (KNO3 / MKP)", done: false },
    { text: "Penaikan level air irigasi sawah menjadi 5-7 cm saat bulir keluar", done: true },
    { text: "Pemasangan tali kresek/orang-orangan sawah antisipasi hama burung", done: false }
  ],
  5: [
    { text: "Pengeringan lahan sawah 10 hari menjelang panen raya", done: true },
    { text: "Pengecekan kadar air bulir gabah (target < 22% GKP)", done: false },
    { text: "Koordinasi sewa mesin combine harvester atau buruh panen lokal", done: false },
    { text: "Persiapan karung goni dan terpal jemur di area lumbung", done: true }
  ]
};

const activeTasks = ref<LocalTask[]>([]);

const completedTasksCount = computed(() => activeTasks.value.filter(t => t.done).length);

const toggleTask = (index: number) => {
  activeTasks.value[index].done = !activeTasks.value[index].done;
  saveTasks();
};

const saveTasks = () => {
  try {
    localStorage.setItem(`agribuddy_tasks_${selectedFarmId.value}`, JSON.stringify(activeTasks.value));
  } catch (e) {
    // ignore
  }
};

const loadTasks = () => {
  try {
    const raw = localStorage.getItem(`agribuddy_tasks_${selectedFarmId.value}`);
    if (raw) {
      activeTasks.value = JSON.parse(raw);
    } else {
      const stepNo = currentPhase.value.step_no;
      activeTasks.value = JSON.parse(JSON.stringify(defaultTasksByPhase[stepNo] || defaultTasksByPhase[3]));
    }
  } catch (e) {
    activeTasks.value = JSON.parse(JSON.stringify(defaultTasksByPhase[3]));
  }
};

// Phase badge styling
const getPhaseBadgeClass = (status: string) => {
  if (status === 'SELESAI') return 'bg-[#324d1d]/90 border-[#324d1d] text-white';
  if (status === 'SEDANG_BERJALAN') return 'bg-[#fed701] border-[#fed701] text-[#324d1d] animate-pulse ring-4 ring-[#fed701]/20';
  return 'bg-slate-100 border-slate-300 text-slate-400';
};

// Farm change
const handleFarmChange = () => {
  setActiveFarmId(selectedFarmId.value);
  loadTasks();
  fetchWeatherData();
};

// Weather API
const fetchWeatherData = async () => {
  try {
    const farm = activeFarmland.value;
    weather.value = await api.getWeather(farm.latitude, farm.longitude, farm.location);
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

onMounted(async () => {
  // Load Farmlands via Shared State
  isLoadingFarms.value = true;
  try {
    await loadGlobalFarmlands(currentUserId.value);
    if (activeFarmId.value) {
      selectedFarmId.value = activeFarmId.value;
    }
  } catch (err) {
    console.error('Error fetching farmlands:', err);
  } finally {
    isLoadingFarms.value = false;
  }

  // Load Last Diagnosis from localStorage
  try {
    const savedDiag = localStorage.getItem('agribuddy_last_diagnosis');
    if (savedDiag) {
      lastDiagnosis.value = JSON.parse(savedDiag);
    }
  } catch (err) {
    console.warn('Could not parse last diagnosis:', err);
  }

  // Load Inventory Summary from API
  try {
    const inv = await api.getInventory(currentUserId.value);
    if (inv && inv.length > 0) {
      inventorySummary.value = inv.slice(0, 3).map(item => ({
        ...item,
        is_low_stock: item.quantity <= item.min_threshold
      }));
    } else {
      inventorySummary.value = [];
    }
  } catch (err) {
    console.warn('Could not load inventory:', err);
  }

  // Load Harvests (Lumbung Panen) from API
  try {
    const hrv = await api.getHarvests(currentUserId.value);
    if (hrv && hrv.length > 0) {
      harvests.value = hrv;
    } else {
      harvests.value = [];
    }
  } catch (err) {
    console.warn('Could not load harvests:', err);
  }

  loadTasks();
  await fetchWeatherData();
});
</script>
