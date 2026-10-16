<template>
  <div
    :class="[
      'fixed inset-0 z-50 flex items-center justify-center p-4',
      backdrops[backdrop],
      animate ? 'animate-in fade-in' : '',
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * Overlay (latar gelap + posisi tengah) untuk semua modal.
 * Isi kartu modal diletakkan di slot.
 *
 * Penggunaan: <BaseModal v-if="showModal" backdrop="70-xs" animate> ... </BaseModal>
 */
withDefaults(
  defineProps<{
    backdrop?: "60-xs" | "70-xs" | "80-sm" | "50-sm" | "60-sm";
    animate?: boolean;
  }>(),
  { backdrop: "60-xs", animate: false },
);

const backdrops: Record<string, string> = {
  "60-xs": "bg-black/60 backdrop-blur-xs",
  "70-xs": "bg-black/70 backdrop-blur-xs",
  "80-sm": "bg-black/80 backdrop-blur-sm",
  "50-sm": "bg-black/50 backdrop-blur-sm",
  "60-sm": "bg-black/60 backdrop-blur-sm",
};
</script>
