<template>
  <router-link
    :to="to"
    class="rounded-xl font-bold transition-all group flex items-center"
    :class="[
      active ? 'bg-[#99c30c] text-[#000] shadow-md' : 'text-[#fff] hover:bg-[#99c30c]/20 hover:text-[#000]/60',
      collapsed ? 'justify-center p-2.5 relative' : 'gap-3 px-3 py-2.5'
    ]"
    :title="title"
  >
    <slot />
    <span v-if="!collapsed" class="truncate">{{ label }}</span>
  </router-link>
</template>

<script setup lang="ts">
/** Satu menu utama di WebSidebar (ikon di slot). `collapsed` = sidebar diminimalkan. */
defineProps<{
  to: string;
  title: string;
  label: string;
  active: boolean;
  collapsed: boolean;
}>();
</script>
