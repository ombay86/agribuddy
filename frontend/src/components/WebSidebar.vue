<template>
  <aside
    class="hidden md:flex flex-col bg-slate-900 text-slate-100 h-screen sticky top-0 shrink-0 z-40 border-r border-slate-800 shadow-xl overflow-hidden justify-between select-none transition-all duration-300 ease-in-out"
    :class="isCollapsed ? 'w-20' : 'w-64 lg:w-72'"
  >
    <div
      class="space-y-4 flex-1 flex flex-col justify-start overflow-hidden transition-all duration-300"
      :class="isCollapsed ? 'p-3' : 'p-4 lg:p-5'"
    >
      <!-- Brand Logo & Header with Minimize Toggle -->
      <div v-if="!isCollapsed" class="flex items-center justify-between pb-1">
        <router-link to="/" class="flex items-center gap-3 group overflow-hidden">
          <div class="w-10 h-10 rounded-2xl bg-white/10 p-1 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0 border border-white/10">
            <img src="/logo/logo-color-icon.svg" alt="AgriBuddy Icon" class="w-full h-full object-contain" />
          </div>
          <div class="truncate">
            <div class="flex items-center gap-1.5">
              <h1 class="text-base font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors whitespace-nowrap">
                AgriBuddy
              </h1>
              <span class="text-[9px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded-full uppercase">
                v2.0
              </span>
            </div>
            <p class="text-[10px] text-emerald-300/80 font-bold whitespace-nowrap">Sahabat Petani</p>
          </div>
        </router-link>

        <!-- Toggle Switch Button to Minimize Sidebar -->
        <button
          @click="toggleSidebar"
          class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center shrink-0 border border-transparent hover:border-slate-700"
          title="Minimize Sidebar"
        >
          <PanelLeftClose :size="18" />
        </button>
      </div>

      <!-- Minimized Header View -->
      <div v-else class="flex flex-col items-center gap-2 pb-1">
        <button
          @click="toggleSidebar"
          class="w-full p-2 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center border border-slate-800 hover:border-emerald-500/30"
          title="Perluas Sidebar"
        >
          <PanelLeftOpen :size="18" class="text-emerald-400" />
        </button>

        <router-link to="/" class="group mt-1" title="AgriBuddy - Sahabat Petani">
          <div class="w-10 h-10 rounded-2xl bg-white/10 p-1 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-white/10">
            <img src="/logo/logo-color-icon.svg" alt="AgriBuddy Icon" class="w-full h-full object-contain" />
          </div>
        </router-link>
      </div>

      <!-- Navigation Links -->
      <nav class="space-y-1 text-xs flex-1 overflow-y-auto no-scrollbar">
        <span v-if="!isCollapsed" class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 block mb-1.5">
          Modul Usahatani Cerdas
        </span>
        <div v-else class="border-t border-slate-800/80 my-1.5 mx-1"></div>

        <!-- 1. Monitoring Sawah (Beranda) -->
        <router-link
          to="/"
          class="rounded-xl font-bold transition-all group flex items-center"
          :class="[
            $route.path === '/' || $route.path === '/monitoring' ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white',
            isCollapsed ? 'justify-center p-2.5 relative' : 'gap-3 px-3 py-2.5'
          ]"
          title="Monitoring Sawah & Cuaca"
        >
          <Activity :size="18" class="shrink-0" />
          <span v-if="!isCollapsed" class="truncate">Monitoring Sawah</span>
        </router-link>

        <!-- 2. Subgroup: Rencana & Kontrol Tanam -->
        <div class="space-y-1">
          <!-- Minimized Mode Link -->
          <router-link
            v-if="isCollapsed"
            to="/rencana"
            class="rounded-xl font-bold transition-all group flex items-center justify-center p-2.5 relative"
            :class="[
              $route.path === '/rencana' ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            ]"
            title="Rencana & Kontrol Tanam"
          >
            <CalendarDays :size="18" class="shrink-0 text-emerald-400" />
          </router-link>

          <!-- Expanded Mode: Collapsible Header Button -->
          <button
            v-else
            @click="toggleRencanaSubmenu"
            type="button"
            class="w-full rounded-xl font-bold transition-all group flex items-center justify-between text-left cursor-pointer px-3 py-2.5"
            :class="[
              $route.path === '/rencana' 
                ? 'text-emerald-400 font-extrabold bg-slate-800/80 border border-slate-700/60' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            ]"
          >
            <div class="flex items-center gap-3 truncate">
              <CalendarDays :size="18" class="shrink-0 text-emerald-400" />
              <span class="truncate text-xs font-bold">Rencana & Kontrol</span>
            </div>
            <div class="text-slate-400 group-hover:text-white transition-transform">
              <ChevronDown v-if="isRencanaOpen" :size="14" />
              <ChevronRight v-else :size="14" />
            </div>
          </button>

          <!-- Submenu Items (Indented) -->
          <div v-if="!isCollapsed && isRencanaOpen" class="pl-3 py-1 space-y-1 border-l border-slate-700/80 ml-5 animate-in fade-in duration-200">
            <!-- Submenu 1: Rencana Tanam -->
            <router-link
              to="/rencana?tab=rencana"
              class="rounded-lg text-xs font-bold transition-all flex items-center gap-2 px-2.5 py-1.5"
              :class="[
                $route.path === '/rencana' && $route.query.tab !== 'kontrol' && $route.query.tab !== 'ceklis'
                  ? 'bg-emerald-600 text-white font-black shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              ]"
            >
              <Calculator :size="14" class="shrink-0" />
              <span class="truncate">Rencana Tanam</span>
            </router-link>

            <!-- Submenu 2: Kontrol Tanam & Modal -->
            <router-link
              to="/rencana?tab=kontrol"
              class="rounded-lg text-xs font-bold transition-all flex items-center gap-2 px-2.5 py-1.5"
              :class="[
                $route.path === '/rencana' && ($route.query.tab === 'kontrol' || $route.query.tab === 'ceklis')
                  ? 'bg-emerald-600 text-white font-black shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              ]"
            >
              <Scale :size="14" class="shrink-0" />
              <span class="truncate">Kontrol Tanam & Modal</span>
            </router-link>
          </div>
        </div>

        <!-- 3. AgriAI -->
        <router-link
          to="/dokter"
          class="rounded-xl font-bold transition-all group flex items-center"
          :class="[
            $route.path === '/dokter' ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white',
            isCollapsed ? 'justify-center p-2.5 relative' : 'gap-3 px-3 py-2.5'
          ]"
          title="AgriAI (Asisten Cerdas & Fitopatologi)"
        >
          <Sparkles :size="18" class="text-amber-400 shrink-0" />
          <span v-if="!isCollapsed" class="truncate">AgriAI</span>
        </router-link>

        <!-- 4. Buku Tani (Stok & Lumbung) -->
        <router-link
          to="/buku-tani"
          class="rounded-xl font-bold transition-all group flex items-center"
          :class="[
            $route.path === '/buku-tani' || $route.path === '/inventaris' || $route.path === '/lumbung' ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white',
            isCollapsed ? 'justify-center p-2.5 relative' : 'gap-3 px-3 py-2.5'
          ]"
          title="Buku Tani (Gudang & Lumbung)"
        >
          <Package :size="18" class="shrink-0" />
          <span v-if="!isCollapsed" class="truncate">Buku Tani</span>
        </router-link>

        <!-- 5. Direktori Layanan Ekosistem -->
        <router-link
          to="/layanan"
          class="rounded-xl font-bold transition-all group flex items-center"
          :class="[
            $route.path === '/layanan' || $route.path === '/katalog' ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white',
            isCollapsed ? 'justify-center p-2.5 relative' : 'gap-3 px-3 py-2.5'
          ]"
          title="Direktori Layanan & Mitra"
        >
          <Store :size="18" class="shrink-0" />
          <span v-if="!isCollapsed" class="truncate">Direktori Layanan</span>
        </router-link>

        <!-- 6. Profil Petani Mandiri -->
        <router-link
          to="/profil"
          class="rounded-xl font-bold transition-all group flex items-center"
          :class="[
            $route.path === '/profil' ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white',
            isCollapsed ? 'justify-center p-2.5 relative' : 'gap-3 px-3 py-2.5'
          ]"
          title="Profil Usahatani"
        >
          <User :size="18" class="shrink-0" />
          <span v-if="!isCollapsed" class="truncate">Profil Usahatani</span>
        </router-link>
      </nav>
    </div>

    <!-- Sidebar Footer: Cuaca & Tombol Keluar (Expanded View) -->
    <div v-if="!isCollapsed" class="p-4 border-t border-slate-800 bg-slate-950/60 space-y-3 shrink-0">
      <div class="flex items-center justify-between text-[11px]">
        <div class="flex items-center gap-1.5 font-bold text-slate-300">
          <CloudSun :size="14" class="text-amber-400" />
          <span>Cuaca Sukamaju</span>
        </div>
        <span class="text-emerald-400 font-extrabold">{{ weather?.temp_celsius || 28 }}°C</span>
      </div>
      <p class="text-[10px] text-slate-400 leading-snug line-clamp-2">
        {{ weather?.advice_title || 'Kondisi sawah optimal untuk budidaya terencana.' }}
      </p>

      <button
        @click="handleLogout"
        class="w-full py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-95"
        title="Keluar dari Akun"
      >
        <LogOut :size="14" />
        <span>Keluar dari Akun</span>
      </button>
    </div>

    <!-- Sidebar Footer: Minimized View -->
    <div v-else class="p-2.5 border-t border-slate-800 bg-slate-950/60 flex flex-col items-center gap-2.5 shrink-0">
      <div
        class="w-full py-2 rounded-xl bg-slate-800/60 text-slate-300 flex flex-col items-center justify-center gap-0.5 cursor-pointer"
        :title="`Cuaca: ${weather?.temp_celsius || 28}°C - ${weather?.advice_title || 'Optimal'}`"
      >
        <CloudSun :size="16" class="text-amber-400" />
        <span class="text-[10px] font-black text-emerald-400">{{ weather?.temp_celsius || 28 }}°</span>
      </div>

      <button
        @click="handleLogout"
        class="w-full p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 transition-all flex items-center justify-center active:scale-95"
        title="Keluar dari Akun"
      >
        <LogOut :size="16" />
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserState } from '@/services/userState';
import { api, WeatherData } from '@/services/api';
import { 
  Activity, CalendarDays, Sparkles, 
  Package, Store, User, LogOut, 
  CloudSun, PanelLeftClose, PanelLeftOpen,
  ChevronDown, ChevronRight, Calculator, Scale
} from 'lucide-vue-next';

const router = useRouter();
const { logout } = useUserState();

const handleLogout = () => {
  logout();
  router.push('/login');
};

const isCollapsed = ref(localStorage.getItem('agribuddy_sidebar_collapsed') === 'true');
const isRencanaOpen = ref(true);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  localStorage.setItem('agribuddy_sidebar_collapsed', isCollapsed.value ? 'true' : 'false');
};

const toggleRencanaSubmenu = () => {
  isRencanaOpen.value = !isRencanaOpen.value;
};

const weather = ref<WeatherData | null>(null);

const fetchSidebarData = async () => {
  try {
    const w = await api.getWeather();
    weather.value = w;
  } catch (err) {
    console.error('Error fetching sidebar data:', err);
  }
};

onMounted(() => {
  fetchSidebarData();
});
</script>
