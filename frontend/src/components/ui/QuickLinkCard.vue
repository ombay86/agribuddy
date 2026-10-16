<template>
  <router-link
    :to="to"
    class="p-4 bg-white border border-slate-200 rounded-2xl hover:border-[#99c30c] hover:shadow-xs transition-all group flex items-center gap-3"
  >
    <div
      :class="[
        'w-10 h-10 rounded-xl flex items-center justify-center font-black group-hover:scale-110 transition-transform',
        tones[tone],
      ]"
    >
      <slot name="icon" />
    </div>
    <div>
      <h5 class="text-xs font-black text-slate-800">{{ title }}</h5>
      <p class="text-[10px] text-slate-400">{{ subtitle }}</p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
/** Kartu pintasan menu (ikon + judul + subjudul). Ikon diletakkan di slot "icon". */
defineProps<{
  to: string;
  title: string;
  subtitle: string;
  tone: "primary" | "secondary" | "warning" | "info";
}>();

const tones: Record<string, string> = {
  "primary": "bg-[#99c30c]/20 text-[#324d1d]",
  "secondary": "bg-[#99c30c]/20 text-[#324d1d]",
  "warning": "bg-[#fed701]/20 text-[#324d1d]",
  "info": "bg-[#fe8b02]/20 text-[#324d1d]",
};
</script>
