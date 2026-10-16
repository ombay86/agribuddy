<template>
  <router-link
    :to="to"
    class="flex flex-col items-center gap-0.5 py-1 px-2 rounded-2xl transition-all"
    :class="active ? 'text-[#324d1d] scale-105' : 'text-slate-500 hover:text-slate-800 font-semibold'"
  >
    <div :class="active ? 'bg-[#99c30c]/20 p-1.5 rounded-xl shadow-xs' : 'p-1.5'">
      <slot />
    </div>
    <span class="text-[10px] tracking-tight">{{ label }}</span>
  </router-link>
</template>

<script setup lang="ts">
/** Satu tombol menu di BottomNav (ikon di slot, label di bawah). */
defineProps<{
  to: string;
  label: string;
  active: boolean;
}>();
</script>
