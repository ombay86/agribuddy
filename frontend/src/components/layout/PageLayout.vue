<template>
  <div :class="variants[variant]">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * Pembungkus isi halaman setelah login.
 *
 * Padding halaman dan jarak bawah (untuk BottomNav) diatur SATU kali di <main>
 * pada App.vue, jadi di sini hanya jarak vertikal antar blok (space-y).
 * Untuk menyeragamkan jarak antar blok, samakan nilai variant di bawah.
 */
withDefaults(
  defineProps<{
    variant?: "compact" | "wide" | "responsive" | "fullscreen";
  }>(),
  { variant: "compact" },
);

const variants: Record<string, string> = {
  // BerandaView, LumbungView, ProfilView
  "compact": "space-y-4",
  // BukuTaniView, KatalogView, MonitoringView
  "wide": "space-y-6",
  // RencanaTaniView
  "responsive": "space-y-4 sm:space-y-6",
  // DokterTaniView (layout chat satu layar penuh)
  "fullscreen": "flex flex-1 h-full min-h-0 overflow-hidden bg-[#fff2d9] relative",
};
</script>
