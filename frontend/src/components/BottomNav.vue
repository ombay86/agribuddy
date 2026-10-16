<template>
  <nav class="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 z-50 flex justify-around items-center shadow-lg md:hidden">
    <!-- 1. Monitoring (Beranda) -->
    <NavTabItem
      to="/"
      label="Sawah"
      :active="$route.path === '/' || $route.path === '/monitoring'"
    >
      <Activity :size="18" />
    </NavTabItem>

    <!-- 2. Rencana Tani AI -->
    <NavTabItem
      to="/rencana"
      label="Rencana"
      :active="$route.path === '/rencana'"
    >
      <CalendarDays :size="18" />
    </NavTabItem>

    <!-- 3. Agri AI -->
    <NavTabItem
      to="/dokter"
      label="Agri AI"
      :active="$route.path === '/dokter'"
    >
      <Sparkles :size="18" class="text-[#fe8b02]" />
    </NavTabItem>

    <!-- 4. Buku Tani (Stok & Lumbung) -->
    <NavTabItem
      to="/buku-tani"
      label="Buku Tani"
      :active="$route.path === '/buku-tani' || $route.path === '/inventaris' || $route.path === '/lumbung'"
    >
      <Package :size="18" />
    </NavTabItem>

    <!-- 5. Direktori Layanan -->
    <NavTabItem
      to="/layanan"
      label="Layanan"
      :active="$route.path === '/layanan' || $route.path === '/katalog'"
    >
      <Store :size="18" />
    </NavTabItem>
  </nav>
</template>

<script setup lang="ts">
import { Activity, CalendarDays, Sparkles, Package, Store } from 'lucide-vue-next';
import NavTabItem from '@/components/nav/NavTabItem.vue';
</script>
