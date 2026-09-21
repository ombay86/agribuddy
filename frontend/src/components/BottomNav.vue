<template>
  <nav class="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 z-50 flex justify-around items-center shadow-lg md:hidden">
    <!-- 1. Jejaring (Utama / Aktivitas Orang Lain) -->
    <router-link
      to="/"
      class="flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all"
      :class="$route.path === '/' || $route.path === '/jejaring' ? 'text-emerald-700 font-black scale-105' : 'text-slate-500 hover:text-slate-800 font-semibold'"
    >
      <div :class="$route.path === '/' || $route.path === '/jejaring' ? 'bg-emerald-100 p-2 rounded-2xl shadow-xs' : 'p-2'">
        <Users :size="20" />
      </div>
      <span class="text-[11px] tracking-tight">Jejaring</span>
    </router-link>

    <!-- 2. Monitoring (Pantau Sawah, Stok, & Transaksi) -->
    <router-link
      to="/monitoring"
      class="flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all"
      :class="$route.path.startsWith('/monitoring') || $route.path === '/rencana' || $route.path === '/inventaris' || $route.path === '/lumbung' ? 'text-emerald-700 font-black scale-105' : 'text-slate-500 hover:text-slate-800 font-semibold'"
    >
      <div :class="$route.path.startsWith('/monitoring') || $route.path === '/rencana' || $route.path === '/inventaris' || $route.path === '/lumbung' ? 'bg-emerald-100 p-2 rounded-2xl shadow-xs' : 'p-2'">
        <Activity :size="20" />
      </div>
      <span class="text-[11px] tracking-tight">Monitoring</span>
    </router-link>

    <!-- 3. Katalog (Marketplace Layanan & Produk) -->
    <router-link
      to="/katalog"
      class="flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all"
      :class="$route.path === '/katalog' ? 'text-emerald-700 font-black scale-105' : 'text-slate-500 hover:text-slate-800 font-semibold'"
    >
      <div :class="$route.path === '/katalog' ? 'bg-emerald-100 p-2 rounded-2xl shadow-xs' : 'p-2'">
        <Store :size="20" />
      </div>
      <span class="text-[11px] tracking-tight">Katalog</span>
    </router-link>

    <!-- 4. Profil (Identitas Saya & Layanan Saya) -->
    <router-link
      to="/profil"
      class="flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all"
      :class="$route.path === '/profil' ? 'text-emerald-700 font-black scale-105' : 'text-slate-500 hover:text-slate-800 font-semibold'"
    >
      <div :class="$route.path === '/profil' ? 'bg-emerald-100 p-2 rounded-2xl shadow-xs' : 'p-2'">
        <User :size="20" />
      </div>
      <span class="text-[11px] tracking-tight">Profil</span>
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { Users, Activity, Store, User } from 'lucide-vue-next';
</script>
