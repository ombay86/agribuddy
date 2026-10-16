<template>
  <router-link
    :to="to"
    class="rounded-lg text-xs font-bold transition-all flex items-center gap-2 px-2.5 py-1.5"
    :class="[active ? 'bg-[#99c30c] text-[#000] shadow-xs' : 'text-[#fff] hover:text-[#000]/60 hover:bg-[#99c30c]/15']"
  >
    <slot />
    <span class="truncate">{{ label }}</span>
  </router-link>
</template>

<script setup lang="ts">
/** Submenu (menjorok) di WebSidebar, ikon di slot. */
defineProps<{
  to: string;
  label: string;
  active: boolean;
}>();
</script>
