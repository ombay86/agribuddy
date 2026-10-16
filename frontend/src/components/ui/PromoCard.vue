<template>
  <div
    :class="[
      'text-white p-5 rounded-3xl shadow-md relative overflow-hidden',
      gradients[gradient],
    ]"
  >
    <div class="relative z-10">
      <div
        class="inline-flex items-center gap-1.5 bg-[#99c30c]/20 text-[#fff2d9] text-xs font-bold px-2.5 py-0.5 rounded-full mb-2"
      >
        <Sparkles :size="13" /> {{ badge }}
      </div>
      <h3 class="text-lg font-extrabold leading-tight">{{ title }}</h3>
      <p class="text-xs text-[#fff2d9] mt-1 mb-4 leading-relaxed">
        {{ description }}
      </p>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/** Kartu ajakan (call to action) bergradasi hijau di Beranda. Tombol aksi ada di slot. */
import { Sparkles } from "lucide-vue-next";

withDefaults(
  defineProps<{
    badge: string;
    title: string;
    description: string;
    gradient?: "primary" | "secondary";
  }>(),
  { gradient: "primary" },
);

const gradients: Record<string, string> = {
  "primary": "bg-gradient-to-r from-[#324d1d] via-[#324d1d] to-[#324d1d]",
  "secondary": "bg-gradient-to-r from-[#324d1d] to-[#324d1d]",
};
</script>
