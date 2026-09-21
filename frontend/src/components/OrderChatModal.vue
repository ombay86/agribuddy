<template>
  <div
    v-if="isOpen && order"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in"
  >
    <div class="bg-white w-full max-w-lg rounded-3xl shadow-2xl flex flex-col h-[85vh] max-h-[680px] overflow-hidden border border-slate-200">
      <!-- Header Modal Chat Transaksi -->
      <div class="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center text-lg">
            💬
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <h3 class="text-xs font-black text-white truncate max-w-[200px] sm:max-w-xs">
                {{ order.service_title }}
              </h3>
              <span class="text-[9px] font-bold text-slate-400">#{{ order.id }}</span>
            </div>
            <p class="text-[11px] text-slate-300 font-semibold mt-0.5">
              Obrolan: <strong>{{ counterpartName }}</strong> ({{ counterpartRoleLabel }})
            </p>
          </div>
        </div>

        <button
          @click="$emit('close')"
          class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center text-xs font-bold transition-all"
        >
          ✕
        </button>
      </div>

      <!-- Ringkasan Singkat Pesanan -->
      <div class="bg-slate-50 px-4 py-2 border-b border-slate-200/80 flex items-center justify-between text-xs shrink-0 font-semibold">
        <span class="text-slate-600">
          {{ order.quantity }} {{ order.unit }} • <strong>Rp {{ order.total_price.toLocaleString('id-ID') }}</strong>
        </span>
        <span
          class="text-[10px] font-black px-2 py-0.5 rounded-full uppercase"
          :class="order.status === 'SELESAI' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'"
        >
          {{ order.status }}
        </span>
      </div>

      <!-- Container Percakapan Chat -->
      <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-100/60">
        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-10 space-y-2">
          <Loader2 :size="24" class="animate-spin text-emerald-600 mx-auto" />
          <p class="text-xs font-semibold text-slate-400">Memuat obrolan diskusi...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="messages.length === 0" class="text-center py-12 px-4 space-y-2">
          <div class="text-3xl">🤝</div>
          <h4 class="text-xs font-black text-slate-700">Mulai Obrolan Transaksi</h4>
          <p class="text-[11px] text-slate-500 max-w-xs mx-auto leading-relaxed">
            Koordinasikan lokasi pengerjaan sawah, rute armada, jadwal jam tiba, atau konfirmasi ketersediaan dengan lawan transaksi Anda di sini.
          </p>
        </div>

        <!-- Chat Bubbles -->
        <template v-else>
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="flex flex-col"
            :class="msg.sender_id === currentUserId ? 'items-end' : 'items-start'"
          >
            <!-- Sender Tag -->
            <div class="flex items-center gap-1.5 mb-1 px-1 text-[10px] font-bold text-slate-500">
              <span>{{ msg.sender_name }}</span>
              <span
                class="px-1.5 py-0.2 rounded-md text-[9px] font-extrabold"
                :class="msg.sender_role === 'PENJUAL' ? 'bg-indigo-100 text-indigo-800' : 'bg-emerald-100 text-emerald-800'"
              >
                {{ msg.sender_role === 'PENJUAL' ? 'Penyedia Jasa' : 'Pembeli' }}
              </span>
            </div>

            <!-- Bubble Content -->
            <div
              class="max-w-[82%] sm:max-w-md p-3 rounded-2xl text-xs font-semibold leading-relaxed shadow-xs"
              :class="msg.sender_id === currentUserId
                ? 'bg-emerald-700 text-white rounded-tr-xs'
                : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'"
            >
              {{ msg.message }}
            </div>

            <!-- Timestamp -->
            <span class="text-[9px] text-slate-400 px-1 mt-0.5">
              {{ msg.created_at }}
            </span>
          </div>
        </template>
      </div>

      <!-- Bottom Input Form -->
      <form @submit.prevent="handleSendMessage" class="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
        <input
          v-model="newMessageText"
          type="text"
          placeholder="Tulis pesan koordinasi atau pertanyaan..."
          required
          class="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white"
        />
        <button
          type="submit"
          :disabled="isSending || !newMessageText.trim()"
          class="btn-farmer bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black text-xs py-2.5 px-4 rounded-2xl shadow-sm active:scale-95 transition-all flex items-center gap-1 shrink-0"
        >
          <Loader2 v-if="isSending" :size="14" class="animate-spin" />
          <Send v-else :size="14" />
          <span class="hidden sm:inline">Kirim</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue';
import { api, ServiceOrder, OrderMessage } from '@/services/api';
import { useUserState } from '@/services/userState';
import { Loader2, Send } from 'lucide-vue-next';

const props = defineProps<{
  isOpen: boolean;
  order: ServiceOrder | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const { currentUserId, currentPersona } = useUserState();

const isLoading = ref(false);
const isSending = ref(false);
const messages = ref<OrderMessage[]>([]);
const newMessageText = ref('');
const chatContainer = ref<HTMLElement | null>(null);

const counterpartName = computed(() => {
  if (!props.order) return '';
  return props.order.buyer_id === currentUserId.value
    ? props.order.seller_name
    : props.order.buyer_name;
});

const counterpartRoleLabel = computed(() => {
  if (!props.order) return '';
  return props.order.buyer_id === currentUserId.value
    ? 'Penyedia Layanan'
    : 'Petani Pembeli';
});

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

const fetchMessages = async () => {
  if (!props.order) return;
  try {
    isLoading.value = true;
    const res = await api.getOrderMessages(props.order.id);
    messages.value = res;
    scrollToBottom();
  } catch (err) {
    console.error('Error fetching order messages:', err);
  } finally {
    isLoading.value = false;
  }
};

const handleSendMessage = async () => {
  if (!props.order || !newMessageText.value.trim()) return;
  try {
    isSending.value = true;
    const newMsg = await api.sendOrderMessage(props.order.id, {
      sender_id: currentUserId.value,
      sender_name: currentPersona.value.name,
      message: newMessageText.value.trim()
    });
    messages.value.push(newMsg);
    newMessageText.value = '';
    scrollToBottom();
  } catch (err: any) {
    alert(err.message || 'Gagal mengirim pesan');
  } finally {
    isSending.value = false;
  }
};

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal && props.order) {
      newMessageText.value = '';
      fetchMessages();
    }
  }
);
</script>
