<template>
  <div class="min-h-screen bg-slate-100 flex flex-col justify-between">
    <!-- Responsive Web Layout Container -->
    <div class="web-viewport flex flex-col min-h-screen relative">
      <!-- Header with Desktop Navigation & Notifications -->
      <HeaderBar />

      <!-- Konten Halaman Aktif -->
      <main class="flex-1 w-full pb-20 md:pb-8">
        <router-view />
      </main>

      <!-- Navigasi Bawah (Hanya tampil di Mobile) -->
      <BottomNav class="md:hidden" />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue'
import BottomNav from '@/components/BottomNav.vue'
</script>
