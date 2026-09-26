<template>
  <nav class="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 z-50 flex justify-around items-center shadow-lg md:hidden">
    <!-- 1. Monitoring (Beranda) -->
    <router-link
      to="/"
      class="flex flex-col items-center gap-0.5 py-1 px-2 rounded-2xl transition-all"
      :class="$route.path === '/' || $route.path === '/monitoring' ? 'text-emerald-700 font-black scale-105' : 'text-slate-500 hover:text-slate-800 font-semibold'"
    >
      <div :class="$route.path === '/' || $route.path === '/monitoring' ? 'bg-emerald-100 p-1.5 rounded-xl shadow-xs' : 'p-1.5'">
        <Activity :size="18" />
      </div>
      <span class="text-[10px] tracking-tight">Sawah</span>
    </router-link>

    <!-- 2. Rencana Tani AI -->
    <router-link
      to="/rencana"
      class="flex flex-col items-center gap-0.5 py-1 px-2 rounded-2xl transition-all"
      :class="$route.path === '/rencana' ? 'text-emerald-700 font-black scale-105' : 'text-slate-500 hover:text-slate-800 font-semibold'"
    >
      <div :class="$route.path === '/rencana' ? 'bg-emerald-100 p-1.5 rounded-xl shadow-xs' : 'p-1.5'">
        <CalendarDays :size="18" />
      </div>
      <span class="text-[10px] tracking-tight">Rencana</span>
    </router-link>

    <!-- 3. Dokter Tani AI -->
    <router-link
      to="/dokter"
      class="flex flex-col items-center gap-0.5 py-1 px-2 rounded-2xl transition-all"
      :class="$route.path === '/dokter' ? 'text-emerald-700 font-black scale-105' : 'text-slate-500 hover:text-slate-800 font-semibold'"
    >
      <div :class="$route.path === '/dokter' ? 'bg-emerald-100 p-1.5 rounded-xl shadow-xs' : 'p-1.5'">
        <Sparkles :size="18" class="text-amber-500" />
      </div>
      <span class="text-[10px] tracking-tight">Dokter AI</span>
    </router-link>

    <!-- 4. Buku Tani (Stok & Lumbung) -->
    <router-link
      to="/buku-tani"
      class="flex flex-col items-center gap-0.5 py-1 px-2 rounded-2xl transition-all"
      :class="$route.path === '/buku-tani' || $route.path === '/inventaris' || $route.path === '/lumbung' ? 'text-emerald-700 font-black scale-105' : 'text-slate-500 hover:text-slate-800 font-semibold'"
    >
      <div :class="$route.path === '/buku-tani' || $route.path === '/inventaris' || $route.path === '/lumbung' ? 'bg-emerald-100 p-1.5 rounded-xl shadow-xs' : 'p-1.5'">
        <Package :size="18" />
      </div>
      <span class="text-[10px] tracking-tight">Buku Tani</span>
    </router-link>

    <!-- 5. Direktori Layanan -->
    <router-link
      to="/layanan"
      class="flex flex-col items-center gap-0.5 py-1 px-2 rounded-2xl transition-all"
      :class="$route.path === '/layanan' || $route.path === '/katalog' ? 'text-emerald-700 font-black scale-105' : 'text-slate-500 hover:text-slate-800 font-semibold'"
    >
      <div :class="$route.path === '/layanan' || $route.path === '/katalog' ? 'bg-emerald-100 p-1.5 rounded-xl shadow-xs' : 'p-1.5'">
        <Store :size="18" />
      </div>
      <span class="text-[10px] tracking-tight">Layanan</span>
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { Activity, CalendarDays, Sparkles, Package, Store } from 'lucide-vue-next';
</script>
