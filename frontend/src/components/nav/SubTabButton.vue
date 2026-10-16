<template>
  <button
    class="flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold transition-all border-b-2"
    :class="active ? 'text-[#324d1d] border-[#324d1d] bg-[#99c30c]/60' : 'text-slate-500 border-transparent hover:text-slate-700'"
  >
    <span v-if="icon">{{ icon }}</span>
    <span>{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
/** Tab submenu (mobile) di baris kedua WebTopBar. `type` dan `@click` diteruskan ke <button>. */
defineProps<{
  active: boolean;
  icon?: string;
  label: string;
}>();
</script>