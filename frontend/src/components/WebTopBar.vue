<template>
  <header class="bg-white border-b border-slate-200/90 px-4 md:px-8 py-3.5 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
    <!-- Left: Contextual Title & Breadcrumbs -->
    <div class="flex items-center gap-3">
      <!-- Mobile Logo Icon -->
      <router-link to="/" class="md:hidden w-9 h-9 rounded-xl bg-emerald-50 text-white flex items-center justify-center p-1 shrink-0 border border-emerald-200 shadow-2xs" title="AgriBuddy">
        <img src="/logo/logo-color-icon.svg" alt="AgriBuddy Logo" class="w-full h-full object-contain" />
      </router-link>

      <!-- Contextual Title & Breadcrumbs -->
      <div>
        <div class="hidden sm:flex items-center gap-1 text-[11px] font-bold text-slate-400">
          <span>AgriBuddy</span>
          <span>/</span>
          <span class="text-emerald-700 capitalize">{{ currentSectionName }}</span>
        </div>
        <h2 class="text-sm md:text-base font-black text-slate-800 tracking-tight leading-tight">
          {{ currentPageTitle }}
        </h2>
      </div>
    </div>

    <!-- Right: User Profile -->
    <div class="flex items-center gap-2.5">
      <!-- Quick User Info Badge -->
      <router-link
        to="/profil"
        class="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-all"
        title="Lihat Profil Usahatani"
      >
        <span class="text-lg">👨‍🌾</span>
        <div class="text-left hidden sm:block">
          <p class="text-xs font-black text-slate-800 leading-tight">Pak Joko</p>
          <p class="text-[10px] font-semibold text-emerald-700">Petani Mandiri</p>
        </div>
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const currentSectionName = computed(() => {
  const p = route.path;
  if (p === '/' || p.startsWith('/monitoring')) return 'Monitoring Usahatani';
  if (p === '/rencana') return 'Rencana Tani AI';
  if (p === '/dokter') return 'Dokter Tani AI';
  if (p === '/buku-tani' || p === '/inventaris' || p === '/lumbung') return 'Buku Tani';
  if (p === '/layanan' || p === '/katalog') return 'Direktori Layanan';
  if (p === '/profil') return 'Profil Usahatani';
  return 'Dashboard';
});

const currentPageTitle = computed(() => {
  const p = route.path;
  if (p === '/' || p.startsWith('/monitoring')) return 'Monitoring Sawah, Cuaca & Irigasi Cerdas';
  if (p === '/rencana') return 'Rencana Tani AI & Kalkulator Modal Usahatani';
  if (p === '/dokter') return 'Dokter Tani AI — Deteksi Penyakit Daun Padi';
  if (p === '/buku-tani' || p === '/inventaris' || p === '/lumbung') return 'Buku Tani — Manajemen Stok & Lumbung Panen';
  if (p === '/layanan' || p === '/katalog') return 'Direktori Layanan Mekanisasi & Saprotan Tani';
  if (p === '/profil') return 'Identitas Petani & Pengaturan Usahatani';
  return 'AgriBuddy Smart Farming';
});
</script>
