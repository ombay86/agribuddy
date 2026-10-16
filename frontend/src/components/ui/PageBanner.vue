<template>
  <div
    class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#324d1d] via-[#324d1d] to-[#324d1d] p-6 md:p-8 text-white shadow-xl border border-[#99c30c]/20"
  >
    <div class="relative z-10 max-w-2xl space-y-2">
      <h1 class="text-xl md:text-3xl font-bold tracking-tight leading-tight">
        {{ title }}
      </h1>
      <p class="text-xs text-[#fff2d9]/90 leading-relaxed">
        {{ description }}
      </p>
    </div>

    <!-- Konten tambahan di bawah teks (tombol aksi, tab, dll.) -->
    <slot />
  </div>
</template>

<script setup lang="ts">
/** Banner header gelap di bagian atas halaman (BukuTani, Katalog). */
defineProps<{
  icon: string;
  badge: string;
  title: string;
  description: string;
}>();
</script>
