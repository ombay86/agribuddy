<template>
  <div
    v-if="isOpen && service"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in"
  >
    <div class="bg-white w-full max-w-xl rounded-3xl shadow-2xl flex flex-col h-[85vh] max-h-[720px] overflow-hidden border border-slate-200">
      <!-- Header Modal Diskusi Produk -->
      <div class="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-xl shadow-xs">
            {{ service.provider_avatar || '🌾' }}
          </div>
          <div>
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300">
              Diskusi & Tanya Jawab Produk
            </span>
            <h3 class="text-xs sm:text-sm font-black text-white truncate max-w-[220px] sm:max-w-md">
              {{ service.title }}
            </h3>
            <p class="text-[10px] text-emerald-100 font-semibold mt-0.5">
              Penyedia: <strong>{{ service.provider_name }}</strong> • Rp {{ service.price.toLocaleString('id-ID') }} {{ service.price_unit }}
            </p>
          </div>
        </div>

        <button
          @click="$emit('close')"
          class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white flex items-center justify-center text-xs font-bold transition-all"
        >
          ✕
        </button>
      </div>

      <!-- Container Diskusi / Q&A -->
      <div class="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50">
        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-12 space-y-2">
          <Loader2 :size="24" class="animate-spin text-emerald-600 mx-auto" />
          <p class="text-xs font-semibold text-slate-400">Memuat diskusi produk...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="discussions.length === 0" class="text-center py-14 px-4 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-2">
          <div class="text-3xl">❓</div>
          <h4 class="text-xs font-black text-slate-800">Belum Ada Pertanyaan</h4>
          <p class="text-[11px] text-slate-500 max-w-xs mx-auto leading-relaxed">
            Punya pertanyaan mengenai jadwal ketersediaan traktor, batas luas, spesifikasi benih, atau lokasi jangkauan? Tanyakan di bawah!
          </p>
        </div>

        <!-- List Diskusi Item -->
        <div
          v-for="disc in discussions"
          :key="disc.id"
          class="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3"
        >
          <!-- Pertanyaan Warga -->
          <div class="flex items-start gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-sm shrink-0">
              {{ disc.user_avatar || '🌾' }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-1">
                <span class="text-xs font-black text-slate-800">{{ disc.user_name }}</span>
                <span class="text-[9px] text-slate-400">{{ disc.created_at }}</span>
              </div>
              <p class="text-xs text-slate-700 font-semibold mt-1 leading-relaxed">
                {{ disc.question }}
              </p>
            </div>
          </div>

          <!-- Jawaban Penyedia (Jika Sudah Ada) -->
          <div
            v-if="disc.reply"
            class="ml-8 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1"
          >
            <div class="flex items-center justify-between gap-1">
              <span class="font-black text-emerald-900 flex items-center gap-1 text-[11px]">
                <span>✅</span> Jawaban dari <strong>{{ disc.replied_by }}</strong>
                <span class="text-[9px] font-extrabold bg-emerald-200/80 text-emerald-800 px-1.5 py-0.2 rounded">Penyedia Jasa</span>
              </span>
              <span class="text-[9px] text-emerald-700/70">{{ disc.replied_at }}</span>
            </div>
            <p class="text-emerald-950 font-medium leading-relaxed text-[11px]">
              {{ disc.reply }}
            </p>
          </div>

          <!-- Form Balas (Khusus Jika Pemilik Layanan & Belum Dibalas) -->
          <div
            v-else-if="isProvider"
            class="ml-8 pt-1"
          >
            <form @submit.prevent="handleReply(disc.id)" class="flex items-center gap-1.5">
              <input
                v-model="replyTexts[disc.id]"
                type="text"
                placeholder="Tulis jawaban sebagai penyedia layanan..."
                required
                class="flex-1 px-3 py-1.5 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                :disabled="isReplying[disc.id] || !replyTexts[disc.id]?.trim()"
                class="btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black py-1.5 px-3 rounded-xl shadow-xs active:scale-95"
              >
                {{ isReplying[disc.id] ? 'Mengirim...' : 'Balas' }}
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Bottom Form Pertanyaan Baru -->
      <div class="p-3.5 bg-white border-t border-slate-200 shrink-0">
        <form @submit.prevent="handleAskQuestion" class="space-y-2">
          <label class="text-[11px] font-bold text-slate-600 block">
            Ajukan Pertanyaan ke <strong>{{ service.provider_name }}</strong>:
          </label>
          <div class="flex items-center gap-2">
            <input
              v-model="newQuestionText"
              type="text"
              placeholder="Contoh: Apakah bisa melayani olah tanah di luar Desa Sukamaju?"
              required
              class="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white"
            />
            <button
              type="submit"
              :disabled="isSubmittingQuestion || !newQuestionText.trim()"
              class="btn-farmer bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-black text-xs py-2.5 px-4 rounded-2xl shadow-sm active:scale-95 transition-all flex items-center gap-1 shrink-0"
            >
              <Loader2 v-if="isSubmittingQuestion" :size="14" class="animate-spin" />
              <Send v-else :size="14" />
              <span class="hidden sm:inline">Kirim Pertanyaan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { api, EcosystemServiceItem, ProductDiscussion } from '@/services/api';
import { useUserState } from '@/services/userState';
import { Loader2, Send } from 'lucide-vue-next';

const props = defineProps<{
  isOpen: boolean;
  service: EcosystemServiceItem | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const { currentUserId, currentPersona } = useUserState();

const isLoading = ref(false);
const isSubmittingQuestion = ref(false);
const discussions = ref<ProductDiscussion[]>([]);
const newQuestionText = ref('');
const replyTexts = ref<Record<string, string>>({});
const isReplying = ref<Record<string, boolean>>({});

const isProvider = computed(() => {
  if (!props.service) return false;
  return props.service.provider_id === currentUserId.value;
});

const fetchDiscussions = async () => {
  if (!props.service) return;
  try {
    isLoading.value = true;
    const res = await api.getProductDiscussions(props.service.id);
    discussions.value = res;
  } catch (err) {
    console.error('Error fetching discussions:', err);
  } finally {
    isLoading.value = false;
  }
};

const handleAskQuestion = async () => {
  if (!props.service || !newQuestionText.value.trim()) return;
  try {
    isSubmittingQuestion.value = true;
    const newDisc = await api.createProductDiscussion(props.service.id, {
      user_id: currentUserId.value,
      user_name: currentPersona.value.name,
      user_avatar: currentPersona.value.avatar,
      question: newQuestionText.value.trim()
    });
    discussions.value.unshift(newDisc);
    newQuestionText.value = '';
  } catch (err: any) {
    alert(err.message || 'Gagal mengirim pertanyaan');
  } finally {
    isSubmittingQuestion.value = false;
  }
};

const handleReply = async (discId: string) => {
  if (!props.service || !replyTexts.value[discId]?.trim()) return;
  try {
    isReplying.value[discId] = true;
    const updated = await api.replyProductDiscussion(props.service.id, discId, {
      reply: replyTexts.value[discId].trim(),
      replied_by: currentPersona.value.name
    });
    const idx = discussions.value.findIndex(d => d.id === discId);
    if (idx !== -1) {
      discussions.value[idx] = updated;
    }
    replyTexts.value[discId] = '';
  } catch (err: any) {
    alert(err.message || 'Gagal mengirim balasan');
  } finally {
    isReplying.value[discId] = false;
  }
};

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal && props.service) {
      newQuestionText.value = '';
      fetchDiscussions();
    }
  }
);
</script>
