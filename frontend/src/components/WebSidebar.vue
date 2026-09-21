<template>
  <aside class="hidden md:flex flex-col w-64 lg:w-72 bg-slate-900 text-slate-100 h-screen sticky top-0 shrink-0 z-40 border-r border-slate-800 shadow-xl overflow-hidden justify-between select-none">
    <div class="p-4 lg:p-5 space-y-4 flex-1 flex flex-col justify-start overflow-hidden">
      <!-- Brand Logo & Header -->
      <div class="flex items-center justify-between pb-1">
        <router-link to="/" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
            🌾
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <h1 class="text-base font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                AgriBuddy
              </h1>
              <span class="text-[9px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded-full uppercase">
                v2.0
              </span>
            </div>
            <p class="text-[10px] text-slate-400 font-semibold">Ekosistem Tani Cerdas</p>
          </div>
        </router-link>
      </div>

      <!-- Navigation Links (Compact & Fit to Screen) -->
      <nav class="space-y-1 text-xs flex-1">
        <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 block mb-1.5">
          Menu Utama
        </span>

        <!-- 1. Jejaring -->
        <router-link
          to="/"
          class="flex items-center gap-3 px-3 py-2 rounded-xl font-bold transition-all"
          :class="$route.path === '/' || $route.path === '/jejaring' ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
        >
          <Users :size="16" />
          <span>Jejaring Komunitas</span>
        </router-link>

        <!-- 2. Monitoring Sawah & AI -->
        <router-link
          to="/monitoring"
          class="flex items-center gap-3 px-3 py-2 rounded-xl font-bold transition-all"
          :class="$route.path.startsWith('/monitoring') && !isTransaksiTab ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
        >
          <Activity :size="16" />
          <span>Monitoring Sawah & AI</span>
        </router-link>

        <!-- 3. Katalog Marketplace -->
        <router-link
          to="/katalog"
          class="flex items-center gap-3 px-3 py-2 rounded-xl font-bold transition-all"
          :class="$route.path === '/katalog' ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
        >
          <Store :size="16" />
          <span>Katalog Layanan & Jasa</span>
        </router-link>

        <!-- 4. Transaksi & Pesanan -->
        <router-link
          to="/monitoring?tab=transaksi"
          class="flex items-center justify-between px-3 py-2 rounded-xl font-bold transition-all"
          :class="isTransaksiTab ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
        >
          <div class="flex items-center gap-3">
            <Receipt :size="16" />
            <span>Pesanan & Transaksi</span>
          </div>
          <span v-if="pendingOrdersCount > 0" class="bg-amber-500 text-slate-900 text-[10px] font-black px-1.5 py-0.2 rounded-full">
            {{ pendingOrdersCount }}
          </span>
        </router-link>

        <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 block pt-3 mb-1.5">
          Modul Pendukung
        </span>

        <!-- 5. Dokter Tani AI -->
        <router-link
          to="/dokter"
          class="flex items-center gap-3 px-3 py-2 rounded-xl font-bold transition-all"
          :class="$route.path === '/dokter' ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
        >
          <Sparkles :size="16" class="text-amber-400" />
          <span>Dokter Tani AI</span>
        </router-link>

        <!-- 6. Buku Tani (Stok Saprotan) -->
        <router-link
          to="/inventaris"
          class="flex items-center gap-3 px-3 py-2 rounded-xl font-bold transition-all"
          :class="$route.path === '/inventaris' ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
        >
          <Package :size="16" />
          <span>Buku Tani (Stok)</span>
        </router-link>

        <!-- 7. Lumbung Panen -->
        <router-link
          to="/lumbung"
          class="flex items-center gap-3 px-3 py-2 rounded-xl font-bold transition-all"
          :class="$route.path === '/lumbung' ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
        >
          <Warehouse :size="16" />
          <span>Lumbung & Bursa Lelang</span>
        </router-link>

        <!-- 8. Profil Saya -->
        <router-link
          to="/profil"
          class="flex items-center gap-3 px-3 py-2 rounded-xl font-bold transition-all"
          :class="$route.path === '/profil' ? 'bg-emerald-600 text-white font-black shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
        >
          <User :size="16" />
          <span>Profil & Layanan Saya</span>
        </router-link>
      </nav>
    </div>

    <!-- Sidebar Footer: Cuaca & Tombol Keluar -->
    <div class="p-4 border-t border-slate-800 bg-slate-950/60 space-y-3 shrink-0">
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
        @click="logout"
        class="w-full py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-95"
        title="Keluar dari Akun"
      >
        <LogOut :size="14" />
        <span>Keluar dari Akun</span>
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
  CloudSun 
} from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const { currentUserId, logout } = useUserState();

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
