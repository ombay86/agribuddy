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
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform shrink-0">
            🌾
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
            <p class="text-[10px] text-slate-400 font-semibold whitespace-nowrap">Ekosistem Tani Cerdas</p>
          </div>
        </router-link>

        <!-- Toggle Switch Button to Minimize Sidebar -->
        <button
          @click="toggleSidebar"
          class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center shrink-0 border border-transparent hover:border-slate-700"
          title="Minimize Sidebar (Hanya Ikon)"
        >
          <PanelLeftClose :size="18" />
        </button>
      </div>

      <!-- Minimized Header View -->
      <div v-else class="flex flex-col items-center gap-2 pb-1">
        <!-- Expand Button on Top Right / Centered in Minimized Rail -->
        <button
          @click="toggleSidebar"
          class="w-full p-2 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center border border-slate-800 hover:border-emerald-500/30"
          title="Perluas Sidebar"
        >
          <PanelLeftOpen :size="18" class="text-emerald-400" />
        </button>

        <router-link to="/" class="group mt-1" title="AgriBuddy v2.0 - Ekosistem Tani Cerdas">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
            🌾
          </div>
        </router-link>
      </div>

      <!-- Navigation Links (Compact & Fit to Screen) -->
      <nav class="space-y-1 text-xs flex-1 overflow-y-auto no-scrollbar">
        <!-- Section: Menu Utama -->
        <span v-if="!isCollapsed" class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 block mb-1.5">
          Menu Utama
        </span>
        <div v-else class="border-t border-slate-800/80 my-1.5 mx-1"></div>

        <!-- 1. Jejaring -->
        <router-link
          to="/"
          class="rounded-xl font-bold transition-all group flex items-center"
          :class="[
            $route.path === '/' || $route.path === '/jejaring' ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white',
            isCollapsed ? 'justify-center p-2.5 relative' : 'gap-3 px-3 py-2'
          ]"
          title="Jejaring Komunitas"
        >
          <Users :size="18" class="shrink-0" />
          <span v-if="!isCollapsed" class="truncate">Jejaring Komunitas</span>
        </router-link>

        <!-- 2. Monitoring Sawah & AI -->
        <router-link
          to="/monitoring"
          class="rounded-xl font-bold transition-all group flex items-center"
          :class="[
            $route.path === '/monitoring' ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white',
            isCollapsed ? 'justify-center p-2.5 relative' : 'gap-3 px-3 py-2'
          ]"
          title="Monitoring Sawah & AI"
        >
          <Activity :size="18" class="shrink-0" />
          <span v-if="!isCollapsed" class="truncate">Monitoring Sawah & AI</span>
        </router-link>

        <!-- 3. Katalog Marketplace -->
        <router-link
          to="/katalog"
          class="rounded-xl font-bold transition-all group flex items-center"
          :class="[
            $route.path === '/katalog' ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white',
            isCollapsed ? 'justify-center p-2.5 relative' : 'gap-3 px-3 py-2'
          ]"
          title="Katalog Layanan & Jasa"
        >
          <Store :size="18" class="shrink-0" />
          <span v-if="!isCollapsed" class="truncate">Katalog Layanan & Jasa</span>
        </router-link>

        <!-- 4. Transaksi & Pesanan -->
        <router-link
          to="/pesanan"
          class="rounded-xl font-bold transition-all group flex items-center"
          :class="[
            $route.path === '/pesanan' || $route.path === '/transaksi' ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white',
            isCollapsed ? 'justify-center p-2.5 relative' : 'justify-between px-3 py-2'
          ]"
          title="Pesanan & Transaksi"
        >
          <div class="flex items-center" :class="isCollapsed ? 'justify-center' : 'gap-3'">
            <Receipt :size="18" class="shrink-0" />
            <span v-if="!isCollapsed" class="truncate">Pesanan & Transaksi</span>
          </div>

          <!-- Pending Orders Count Badge -->
          <template v-if="pendingOrdersCount > 0">
            <span v-if="!isCollapsed" class="bg-amber-500 text-slate-900 text-[10px] font-black px-1.5 py-0.2 rounded-full">
              {{ pendingOrdersCount }}
            </span>
            <!-- Dot indicator for collapsed state -->
            <span v-else class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
          </template>
        </router-link>

        <!-- Section: Modul Pendukung -->
        <span v-if="!isCollapsed" class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 block pt-3 mb-1.5">
          Modul Pendukung
        </span>
        <div v-else class="border-t border-slate-800/80 my-2 mx-1"></div>

        <!-- 5. Dokter Tani AI -->
        <router-link
          to="/dokter"
          class="rounded-xl font-bold transition-all group flex items-center"
          :class="[
            $route.path === '/dokter' ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white',
            isCollapsed ? 'justify-center p-2.5 relative' : 'gap-3 px-3 py-2'
          ]"
          title="Dokter Tani AI"
        >
          <Sparkles :size="18" class="text-amber-400 shrink-0" />
          <span v-if="!isCollapsed" class="truncate">Dokter Tani AI</span>
        </router-link>

        <!-- 6. Buku Tani (Stok Saprotan) -->
        <router-link
          to="/inventaris"
          class="rounded-xl font-bold transition-all group flex items-center"
          :class="[
            $route.path === '/inventaris' ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white',
            isCollapsed ? 'justify-center p-2.5 relative' : 'gap-3 px-3 py-2'
          ]"
          title="Buku Tani (Stok)"
        >
          <Package :size="18" class="shrink-0" />
          <span v-if="!isCollapsed" class="truncate">Buku Tani (Stok)</span>
        </router-link>

        <!-- 7. Lumbung Panen -->
        <router-link
          to="/lumbung"
          class="rounded-xl font-bold transition-all group flex items-center"
          :class="[
            $route.path === '/lumbung' ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white',
            isCollapsed ? 'justify-center p-2.5 relative' : 'gap-3 px-3 py-2'
          ]"
          title="Lumbung & Bursa Lelang"
        >
          <Warehouse :size="18" class="shrink-0" />
          <span v-if="!isCollapsed" class="truncate">Lumbung & Bursa Lelang</span>
        </router-link>

        <!-- 8. Profil Saya -->
        <router-link
          to="/profil"
          class="rounded-xl font-bold transition-all group flex items-center"
          :class="[
            $route.path === '/profil' ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white',
            isCollapsed ? 'justify-center p-2.5 relative' : 'gap-3 px-3 py-2'
          ]"
          title="Profil & Layanan Saya"
        >
          <User :size="18" class="shrink-0" />
          <span v-if="!isCollapsed" class="truncate">Profil & Layanan Saya</span>
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
        {{ weather?.advice_title || 'Kondisi sawah optimal untuk pemupukan dan penyiangan.' }}
      </p>

      <!-- Tombol Keluar di Footer Sidebar -->
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
        :title="`Cuaca Sukamaju: ${weather?.temp_celsius || 28}°C - ${weather?.advice_title || 'Optimal'}`"
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
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserState } from '@/services/userState';
import { api, WeatherData } from '@/services/api';
import { 
  Users, Activity, Store, Receipt, Sparkles, 
  Package, Warehouse, User, LogOut, 
  CloudSun, PanelLeftClose, PanelLeftOpen
} from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const { currentUserId, logout } = useUserState();

const handleLogout = () => {
  logout();
  router.push('/login');
};

const isCollapsed = ref(localStorage.getItem('agribuddy_sidebar_collapsed') === 'true');

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  localStorage.setItem('agribuddy_sidebar_collapsed', isCollapsed.value ? 'true' : 'false');
};

const weather = ref<WeatherData | null>(null);
const pendingOrdersCount = ref(0);

const isTransaksiTab = computed(() => {
  return route.path === '/monitoring' && route.query.tab === 'transaksi';
});

const fetchSidebarData = async () => {
  try {
    const [w, sellerOrders] = await Promise.all([
      api.getWeather(),
      api.getSellerOrders(currentUserId.value).catch(() => [])
    ]);
    weather.value = w;
    pendingOrdersCount.value = sellerOrders.filter(o => o.status === 'MENUNGGU_KONFIRMASI').length;
  } catch (err) {
    console.error('Error fetching sidebar data:', err);
  }
};

onMounted(() => {
  fetchSidebarData();
});

watch(currentUserId, () => {
  fetchSidebarData();
});
</script>
