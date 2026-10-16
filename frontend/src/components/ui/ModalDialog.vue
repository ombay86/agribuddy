<template>
  <BaseModal backdrop="60-sm" animate>
    <div
      class="bg-white w-full max-w-xl rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto relative"
    >
      <button
        @click="emit('close')"
        class="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-500 p-1.5 rounded-full transition-all cursor-pointer"
      >
        ✕
      </button>
      <slot />
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
/**
 * Modal standar (kartu putih + tombol tutup ✕ di pojok kanan atas).
 * Dipakai oleh modal-modal di RencanaTaniView.
 *
 * Penggunaan: <ModalDialog v-if="isOpen" @close="isOpen = false"> ... </ModalDialog>
 */
import BaseModal from "@/components/ui/BaseModal.vue";

const emit = defineEmits<{ (e: "close"): void }>();
</script>
