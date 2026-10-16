<template>
  <PageLayout variant="fullscreen">
    <!-- BACKDROP DRAWER RIWAYAT DI MOBILE -->
    <div
      v-if="isHistoryOpen"
      @click="isHistoryOpen = false"
      class="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs md:hidden"
    ></div>

    <!-- PANEL KIRI: RIWAYAT PERCAKAPAN (COLLAPSIBLE SIDEBAR / DRAWER) -->
    <aside
      class="fixed md:static inset-y-0 left-0 z-40 bg-white border-r border-slate-200/90 flex flex-col transition-all duration-300 shadow-xl md:shadow-none"
      :class="isHistoryOpen ? 'w-72 sm:w-80 translate-x-0' : '-translate-x-full md:translate-x-0 md:w-0 md:overflow-hidden md:border-none'"
    >
      <!-- Header Riwayat -->
      <div class="p-4 border-b border-slate-100 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-[#99c30c]/20 text-[#324d1d] flex items-center justify-center font-bold">
            <History :size="16" />
          </div>
          <div>
            <h3 class="text-sm font-bold text-slate-800">Riwayat Obrolan</h3>
            <p class="text-[11px] text-slate-400 font-medium">Sesi konsultasi tersimpan</p>
          </div>
        </div>
        <button
          @click="isHistoryOpen = false"
          class="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-all cursor-pointer"
          title="Tutup Riwayat"
        >
          <X :size="14" />
        </button>
      </div>

      <!-- Daftar Sesi Chat -->
      <div class="flex-1 min-h-0 overflow-y-auto px-2 space-y-1 py-1 custom-chat-scrollbar">
        <div
          v-if="chatSessions.length === 0"
          class="p-6 text-center text-xs text-slate-400 font-medium space-y-1"
        >
          <p>Belum ada riwayat obrolan</p>
        </div>

        <div
          v-for="s in chatSessions"
          :key="s.id"
          @click="switchSession(s.id)"
          class="group relative p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2"
          :class="activeSessionId === s.id
            ? 'bg-[#99c30c]/80 border-[#99c30c]/60 shadow-2xs'
            : 'bg-white hover:bg-[#fff2d9] border-transparent hover:border-slate-200'"
        >
          <div class="truncate flex-1 pr-1">
            <h4
              class="text-sm font-bold truncate leading-snug"
              :class="activeSessionId === s.id ? 'text-[#324d1d]' : 'text-slate-700'"
            >
              {{ s.title }}
            </h4>
            <span class="text-[10px] text-slate-400 block mt-0.5">{{ s.updated_at }}</span>
          </div>

          <button
            @click.stop="deleteSession(s.id)"
            class="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer shrink-0"
            title="Hapus Sesi"
          >
            <Trash2 :size="17" />
          </button>
        </div>
      </div>

      <!-- Info Footer -->
      <div class="p-3 border-t border-slate-100 bg-[#fff2d9] text-[10px] text-slate-400 flex items-center justify-between">
        <span>Powered by Gemini Vision</span>
        <span class="font-bold text-[#324d1d]">Agri AI</span>
      </div>
    </aside>

    <!-- PANEL UTAMA: CHAT LLM AREA -->
    <main class="flex-1 flex flex-col h-full bg-[#fff2d9] relative overflow-hidden">
      <!-- Top Navigation Bar Chat -->
      <header class="bg-white border-b border-slate-200/80 px-4 py-3 flex items-center justify-between shrink-0 shadow-2xs z-10">
        <div class="flex items-center gap-3">
          <!-- Tombol Toggle Riwayat Sidebar -->
          <button
            @click="isHistoryOpen = !isHistoryOpen"
            class="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition-all cursor-pointer text-xs font-bold"
            title="Buka / Tutup Riwayat Obrolan"
          >
            <PanelLeft :size="16" />
            <span class="hidden sm:inline text-xs">Riwayat</span>
            <span
              v-if="chatSessions.length > 0"
              class="bg-[#324d1d]/90 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center"
            >
              {{ chatSessions.length }}
            </span>
          </button>
        </div>

        <!-- Tombol Aksi Kanan: API Key & Obrolan Baru -->
        <div class="flex items-center gap-2">

          <!-- Tombol Aksi Cepat: Obrolan Baru -->
          <button
            @click="startNewChat"
            class="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#99c30c]/10 hover:bg-[#99c30c]/20 text-[#324d1d] border border-[#99c30c]/40 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-2xs"
            title="Mulai Percakapan Baru"
          >
            <Plus :size="14" />
            <span class="hidden sm:inline">Obrolan Baru</span>
          </button>
        </div>
      </header>

      <!-- Area Percakapan (Scrollable Message List) -->
      <div
        ref="chatContainerRef"
        class="flex-1 min-h-0 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 custom-chat-scrollbar"
      >
        <!-- State 1: Percakapan Masih Kosong (Welcome Screen, 2 Pertanyaan Populer, & Panduan Cepat API Key) -->
        <div
          v-if="messages.length === 0"
          class="max-w-xl mx-auto py-2 sm:py-4 text-center space-y-3 animate-in fade-in duration-300"
        >
          <!-- Compact Greeting Banner -->
          <div class="flex items-center justify-center gap-3 text-left bg-[#99c30c]/80 border border-[#99c30c]/70 p-3 rounded-2xl shadow-2xs">
            <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#99c30c] to-[#324d1d] text-[#fed701] flex items-center justify-center shrink-0 shadow-md shadow-[#324d1d]/10">
              <Sparkles :size="20" />
            </div>
            <div class="min-w-0">
              <h3 class="text-xs sm:text-sm text-slate-800 leading-snug font-bold">
                Halo {{ currentPersona.name }}! Ada yang bisa Agri AI bantu?
              </h3>
              <p class="text-[10px] sm:text-[11px] line-clamp-1">
                Tanya penyakit daun padi, dosis pupuk berimbang, hama wereng, atau kirim foto daun.
              </p>
            </div>
          </div>

          <!-- 2 Contoh Pertanyaan Populer (1 Baris Ringkas) -->
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="(p, idx) in promptSuggestions.slice(0, 2)"
              :key="idx"
              @click="applyPromptSuggestion(p)"
              class="p-2 sm:p-2.5 bg-white border border-slate-200/90 hover:border-[#99c30c] rounded-xl shadow-2xs hover:shadow-xs transition-all active:scale-98 cursor-pointer group flex items-center justify-center text-center"
            >
              <div class="min-w-0 w-full">
                <h5 class="text-[11px] font-bold text-slate-800 group-hover:text-[#324d1d] leading-tight truncate">
                  {{ p.title }}
                </h5>
                <p class="text-[9px] text-slate-400 truncate">
                  {{ p.subtitle }}
                </p>
              </div>
            </button>
          </div>
        </div>

        <!-- State 2: Riwayat Pesan Aktif -->
        <template v-else>
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="flex gap-3 max-w-2xl"
            :class="msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'"
          >
            <!-- Avatar -->
            <div class="shrink-0 mt-1">
              <div
                v-if="msg.role === 'user'"
                class="w-8 h-8 rounded-full overflow-hidden border border-[#99c30c] shadow-2xs flex items-center justify-center bg-[#324d1d]/90 text-white text-xs"
              >
                <img
                  v-if="currentPersona.customAvatar"
                  :src="currentPersona.customAvatar"
                  alt="User"
                  class="w-full h-full object-cover"
                />
                <img v-else :src="currentPersona.avatar || farmer" alt="Avatar petani" class="w-full h-full object-cover" />
              </div>
              <div
                v-else
                class="w-8 h-8 rounded-full bg-[#324d1d] text-white flex items-center justify-center shadow-xs text-xs font-bold"
              >
                <Sparkles :size="15" />
              </div>
            </div>

            <!-- Bubble Pesan -->
            <div
              class="rounded-3xl p-4 text-xs space-y-2 shadow-xs leading-relaxed"
              :class="msg.role === 'user'
                ? 'bg-[#324d1d] text-white rounded-tr-xs'
                : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs'"
            >
              <!-- Lampiran Foto jika dikirim oleh User -->
              <div
                v-if="msg.image"
                class="rounded-2xl overflow-hidden border border-white/20 max-w-xs shadow-inner"
              >
                <img :src="msg.image" alt="Lampiran Foto" class="w-full h-auto max-h-56 object-cover" />
              </div>

              <!-- Kartu Diagnosis jika Dihasilkan oleh AgriAI -->
              <div
                v-if="msg.detected_diagnosis"
                class="p-3.5 bg-[#99c30c]/10 border border-[#99c30c]/60 rounded-2xl space-y-2.5 text-slate-800"
              >
                <div class="flex items-start justify-between gap-2 border-b border-[#99c30c]/80 pb-2">
                  <div>
                    <span
                      class="text-[9px] uppercase px-2 py-0.5 rounded-full inline-block"
                      :class="msg.detected_diagnosis.severity === 'Aman' ? 'bg-[#99c30c]/30 text-[#324d1d]' : 'bg-rose-100 text-rose-800 border border-rose-200'"
                    >
                      Tingkat Risiko: {{ msg.detected_diagnosis.severity }}
                    </span>
                    <h4 class="text-sm text-[#324d1d] mt-1 leading-snug">
                      {{ msg.detected_diagnosis.disease_name }}
                    </h4>
                    <p class="text-[10px] italic text-slate-500 font-semibold">
                      {{ msg.detected_diagnosis.english_name }}
                    </p>
                  </div>
                  <div class="text-right shrink-0">
                    <span class="text-base text-[#324d1d]">
                      {{ Math.round(msg.detected_diagnosis.confidence * 100) }}%
                    </span>
                    <span class="text-[8px] font-bold text-slate-400 block">Akurasi</span>
                  </div>
                </div>

                <!-- Gejala -->
                <div class="space-y-1">
                  <span class="text-[10px] text-slate-600 uppercase flex items-center gap-1">
                    <AlertTriangle :size="12" class="text-[#fe8b02]" /> Gejala Visual:
                  </span>
                  <ul class="text-[11px] text-slate-600 space-y-0.5 pl-3 list-disc">
                    <li v-for="(sym, sIdx) in msg.detected_diagnosis.symptoms" :key="sIdx">
                      {{ sym }}
                    </li>
                  </ul>
                </div>

                <!-- Rekomendasi Solusi -->
                <div class="space-y-1 pt-1 border-t border-[#99c30c]/60">
                  <span class="text-[10px] text-[#324d1d] uppercase flex items-center gap-1">
                    <CheckCircle2 :size="12" class="text-[#324d1d]" /> Langkah Pengendalian:
                  </span>
                  <ul class="text-[11px] text-slate-700 space-y-1 pl-1">
                    <li
                      v-for="(act, aIdx) in msg.detected_diagnosis.actions"
                      :key="aIdx"
                      class="flex items-start gap-1.5"
                    >
                      <span class="w-3.5 h-3.5 rounded-full bg-[#324d1d]/90 text-white text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {{ aIdx + 1 }}
                      </span>
                      <span>{{ act }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Teks Pesan AI (Formatted Markdown) -->
              <div
                v-if="msg.role === 'model'"
                class="chat-markdown text-xs text-slate-800 leading-relaxed"
                v-html="renderMarkdown(msg.content)"
              ></div>

              <!-- Teks Pesan Pengguna -->
              <div
                v-else
                class="whitespace-pre-line leading-relaxed text-xs text-white"
              >
                {{ msg.content }}
              </div>

              <span
                class="text-[9px] block text-right font-medium"
                :class="msg.role === 'user' ? 'text-[#fff2d9]' : 'text-slate-400'"
              >
                {{ msg.timestamp }}
              </span>
            </div>
          </div>

          <!-- Loading Indicator saat AI Berpikir -->
          <div v-if="isLoading" class="flex gap-3 max-w-lg mr-auto animate-in fade-in">
            <div class="w-8 h-8 rounded-full bg-[#324d1d] text-white flex items-center justify-center shadow-xs text-xs font-bold shrink-0 mt-1">
              <Sparkles :size="15" />
            </div>
            <div class="bg-white border border-slate-200 rounded-3xl rounded-tl-xs p-4 shadow-xs flex items-center gap-2">
              <Loader2 :size="16" class="animate-spin text-[#324d1d]" />
              <span class="text-xs text-slate-500 font-medium">Agri AI sedang menganalisis & menyusun solusi...</span>
            </div>
          </div>
        </template>
      </div>

      <!-- STICKY BOTTOM CHAT INPUT BAR -->
      <footer class="p-3 sm:p-4 bg-white border-t border-slate-200/90 shrink-0 pb-16 md:pb-4">
        <div class="max-w-3xl mx-auto space-y-2">
          <!-- Pratinjau Lampiran Gambar sebelum dikirim -->
          <div
            v-if="attachedImagePreview"
            class="flex items-center gap-2 bg-[#99c30c]/10 border border-[#99c30c]/40 px-3 py-1.5 rounded-2xl w-fit shadow-xs animate-in fade-in"
          >
            <div class="w-9 h-9 rounded-xl overflow-hidden border border-[#99c30c]/60 shrink-0">
              <img :src="attachedImagePreview" alt="Lampiran" class="w-full h-full object-cover" />
            </div>
            <div class="text-[11px]">
              <span class="font-bold text-slate-800 block leading-tight">Foto Daun Terlampir</span>
              <span class="text-[9px] text-slate-500">Akan dianalisis oleh AI</span>
            </div>
            <button
              @click="removeAttachedImage"
              class="w-6 h-6 rounded-full bg-slate-200 hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center text-slate-600 transition-all cursor-pointer ml-1"
              title="Hapus Lampiran"
            >
              <X :size="12" />
            </button>
          </div>

          <!-- Input Bar Container -->
          <form
            @submit.prevent="sendMessage"
            class="relative flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/60 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#99c30c]/50 focus-within:border-[#324d1d] border-2 border-[#324d1d]/70 rounded-3xl p-1.5 transition-all shadow-inner"
          >
            <!-- Hidden File Input -->
            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleImageSelected"
            />

            <!-- Tombol Lampirkan Foto / Kamera -->
            <button
              type="button"
              @click="fileInputRef?.click()"
              class="w-9 h-9 rounded-full bg-white hover:bg-[#99c30c]/10 text-slate-600 hover:text-[#324d1d] flex items-center justify-center transition-all shadow-2xs border border-slate-200 shrink-0 cursor-pointer"
              title="Unggah Foto Daun / Tanaman"
            >
              <Camera :size="16" />
            </button>

            <!-- Input Teks Chat -->
            <input
              v-model="inputQuery"
              type="text"
              placeholder="Tanya seputar tanaman padi, pupuk, atau lampirkan foto daun..."
              class="flex-1 bg-transparent px-2.5 py-1.5 text-xs sm:text-sm text-[#324d1d] placeholder:text-[#324d1d]/70 font-medium focus:outline-none"
              :disabled="isLoading"
            />

            <!-- Tombol Kirim -->
            <button
              type="submit"
              :disabled="isLoading || (!inputQuery.trim() && !attachedImageBase64)"
              class="w-9 h-9 rounded-full bg-[#324d1d]/90 hover:bg-[#324d1d] disabled:opacity-40 disabled:hover:bg-[#324d1d]/90 text-white flex items-center justify-center shadow-sm transition-all active:scale-95 shrink-0 cursor-pointer"
              title="Kirim Pesan"
            >
              <Send :size="15" />
            </button>
          </form>

          <p class="text-[10px] text-slate-400 text-center font-medium">
            Agri AI dapat memberikan saran agronomi dan fitopatologi presisi berbasis kecerdasan buatan.
          </p>
        </div>
      </footer>
    </main>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserState } from '@/services/userState';
import farmer from '@/assets/icons/petani.svg';
import { 
  api, 
  AIChatMessage, 
  AIChatSession,
  getCustomGeminiApiKey,
  setCustomGeminiApiKey,
  clearCustomGeminiApiKey
} from '@/services/api';
import { 
  Sparkles, Camera, Send, X, Loader2, Plus, 
  Trash2, History, PanelLeft, CheckCircle2, AlertTriangle,
  Key, Eye, EyeOff, ExternalLink
} from 'lucide-vue-next';
import { marked } from 'marked';
import BaseModal from '@/components/ui/BaseModal.vue';
import PageLayout from '@/components/layout/PageLayout.vue';

// Konfigurasi parser Markdown untuk render respons AI
marked.setOptions({
  gfm: true,
  breaks: true,
});

const renderMarkdown = (content: string): string => {
  if (!content) return '';
  return marked.parse(content) as string;
};

const { currentPersona } = useUserState();

// State API Key Management (BYOK) - Terisolasi ketat per profil pengguna
const isKeyModalOpen = ref(false);
const showApiKey = ref(false);
const tempApiKey = ref('');

const hasCustomApiKey = computed(() => {
  return Boolean(getCustomGeminiApiKey(currentPersona.value.id));
});

const openKeyModal = () => {
  tempApiKey.value = getCustomGeminiApiKey(currentPersona.value.id);
  showApiKey.value = false;
  isKeyModalOpen.value = true;
};

const handleSaveKey = async () => {
  const trimmed = tempApiKey.value.trim();
  setCustomGeminiApiKey(trimmed, currentPersona.value.id);
  isKeyModalOpen.value = false;

  // Sinkronkan ke cloud database (PostgreSQL) agar tersimpan di profil akun secara lintas perangkat
  try {
    await api.updateProfile({ gemini_api_key: trimmed });
    const savedUserJson = localStorage.getItem('agribuddy_registered_user');
    if (savedUserJson) {
      const parsed = JSON.parse(savedUserJson);
      parsed.gemini_api_key = trimmed;
      localStorage.setItem('agribuddy_registered_user', JSON.stringify(parsed));
    }
  } catch (err) {
    console.warn('Gagal sinkronisasi API Key ke profil server:', err);
  }

  alert(trimmed 
    ? `✅ API Key Gemini berhasil disimpan dan disinkronkan ke akun ${currentPersona.value.name}! Kunci ini akan otomatis aktif meskipun Anda login dari perangkat lain.` 
    : 'ℹ️ Menggunakan default API Key server.');
};

const handleClearKey = async () => {
  clearCustomGeminiApiKey(currentPersona.value.id);
  tempApiKey.value = '';
  isKeyModalOpen.value = false;

  // Hapus dari cloud database (PostgreSQL)
  try {
    await api.updateProfile({ gemini_api_key: '' });
    const savedUserJson = localStorage.getItem('agribuddy_registered_user');
    if (savedUserJson) {
      const parsed = JSON.parse(savedUserJson);
      delete parsed.gemini_api_key;
      localStorage.setItem('agribuddy_registered_user', JSON.stringify(parsed));
    }
  } catch (err) {
    console.warn('Gagal menghapus API Key dari profil server:', err);
  }

  alert(`🗑️ API Key pribadi akun ${currentPersona.value.name} telah dihapus. Sistem akan menggunakan default server.`);
};

const route = useRoute();

// Pantau perubahan akun agar sesi dan key langsung menyesuaikan
watch(() => currentPersona.value.id, (newId) => {
  tempApiKey.value = getCustomGeminiApiKey(newId);
  startNewChat();
  loadSessions(false);
});

// Pantau route: selalu default ke chat baru saat masuk atau kembali ke /dokter
watch(() => route.path, (newPath) => {
  if (newPath === '/dokter') {
    startNewChat();
    loadSessions(false);
  }
});

// State Riwayat Sesi Chat
const isHistoryOpen = ref(false);
const chatSessions = ref<AIChatSession[]>([]);
const activeSessionId = ref<string | null>(null);

// State Obrolan Aktif
const messages = ref<AIChatMessage[]>([]);
const inputQuery = ref('');
const isLoading = ref(false);
const chatContainerRef = ref<HTMLDivElement | null>(null);

// Lampiran Gambar
const fileInputRef = ref<HTMLInputElement | null>(null);
const attachedImagePreview = ref<string | null>(null);
const attachedImageBase64 = ref<string | null>(null);

// Preset Contoh Pertanyaan Populer
const promptSuggestions = [
  {
    title: 'Daun Menguning & Kering di Ujung',
    subtitle: 'Deteksi Hawar Daun Bakteri (Kresek)'
  },
  {
    title: 'Pengendalian Hama Wereng Coklat',
    subtitle: 'Waktu semprot & bahan aktif insektisida'
  },
  {
    title: 'Takaran Pupuk Fase Bunting (40 HST)',
    subtitle: 'Rekomendasi NPK, Urea, dan KCl'
  },
  {
    title: 'Bercak Belah Ketupat Abu-Abu',
    subtitle: 'Ciri jamur blas daun Pyricularia'
  }
];

const scrollToBottom = async () => {
  await nextTick();
  if (chatContainerRef.value) {
    chatContainerRef.value.scrollTop = chatContainerRef.value.scrollHeight;
  }
};

const loadSessions = async (autoSwitch: boolean = false) => {
  try {
    const list = await api.getChatSessions();
    chatSessions.value = list;
    if (autoSwitch && list.length > 0) {
      // Hanya buka sesi tertentu jika autoSwitch eksplisit true
      await switchSession(list[0].id);
    }
  } catch (err) {
    console.error('Gagal memuat sesi chat:', err);
  }
};

const switchSession = async (sessionId: string) => {
  activeSessionId.value = sessionId;
  try {
    const fullSession = await api.getChatSession(sessionId);
    messages.value = fullSession.messages || [];
    scrollToBottom();
    // Di mobile, otomatis tutup drawer saat sesi dipilih
    if (window.innerWidth < 768) {
      isHistoryOpen.value = false;
    }
  } catch (err) {
    console.error('Gagal membuka sesi:', err);
  }
};

const startNewChat = () => {
  activeSessionId.value = null;
  messages.value = [];
  inputQuery.value = '';
  attachedImagePreview.value = null;
  attachedImageBase64.value = null;
  if (window.innerWidth < 768) {
    isHistoryOpen.value = false;
  }
};

const deleteSession = async (sessionId: string) => {
  if (!confirm('Hapus sesi obrolan ini dari riwayat?')) return;
  try {
    await api.deleteChatSession(sessionId);
    chatSessions.value = chatSessions.value.filter(s => s.id !== sessionId);
    if (activeSessionId.value === sessionId) {
      startNewChat();
    }
  } catch (err) {
    console.error('Gagal menghapus sesi:', err);
  }
};

const applyPromptSuggestion = (p: { title: string }) => {
  inputQuery.value = p.title;
  sendMessage();
};

const handleImageSelected = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    attachedImagePreview.value = URL.createObjectURL(file);

    // Konversi ke Base64
    const reader = new FileReader();
    reader.onload = (e) => {
      attachedImageBase64.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const removeAttachedImage = () => {
  attachedImagePreview.value = null;
  attachedImageBase64.value = null;
  if (fileInputRef.value) fileInputRef.value.value = '';
};

const sendMessage = async () => {
  const text = inputQuery.value.trim();
  const image = attachedImageBase64.value;

  if (!text && !image) return;

  const now = new Date();
  const timeStr = now.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }) + ' WIB';

  // Tambah pesan pengguna ke tampilan seketika
  const userMessage: AIChatMessage = {
    id: `temp_${Date.now()}`,
    role: 'user',
    content: text || 'Analisis foto tanaman terlampir',
    image: attachedImagePreview.value,
    timestamp: timeStr
  };
  messages.value.push(userMessage);

  // Reset form input
  inputQuery.value = '';
  const currentImageToSend = image;
  removeAttachedImage();
  scrollToBottom();

  isLoading.value = true;

  try {
    // Siapkan riwayat ringkas untuk konteks LLM
    const historyPayload = messages.value
      .slice(0, -1)
      .slice(-6)
      .map(m => ({
        role: m.role,
        content: m.content
      }));

    const response = await api.chatWithAgriAI({
      session_id: activeSessionId.value || undefined,
      message: userMessage.content,
      image_base64: currentImageToSend || undefined,
      history: historyPayload
    });

    activeSessionId.value = response.session_id;

    // Tambahkan balasan model
    const aiMessage: AIChatMessage = {
      id: `ai_${Date.now()}`,
      role: 'model',
      content: response.reply,
      detected_diagnosis: response.detected_diagnosis,
      timestamp: timeStr
    };
    messages.value.push(aiMessage);

    // Segarkan daftar sesi riwayat tanpa beralih sesi
    await loadSessions(false);
  } catch (err: any) {
    messages.value.push({
      id: `err_${Date.now()}`,
      role: 'model',
      content: 'Maaf Pak Tani, terjadi kendala saat menghubungkan ke server Agri AI. Pastikan koneksi dan server aktif.',
      timestamp: timeStr
    });
  } finally {
    isLoading.value = false;
    scrollToBottom();
  }
};

onMounted(async () => {
  // Selalu default ke chat baru saat pertama kali halaman Agri AI dibuka
  startNewChat();
  await loadSessions(false);
});
</script>

<style scoped>
:deep(.chat-markdown) {
  line-height: 1.65;
  font-size: 0.8125rem;
  color: #1e293b;
}

:deep(.chat-markdown p) {
  margin-bottom: 0.65rem;
}

:deep(.chat-markdown p:last-child) {
  margin-bottom: 0;
}

:deep(.chat-markdown strong) {
  font-weight: 700;
  color: #000;
}

:deep(.chat-markdown em) {
  font-style: italic;
  color: #334155;
}

:deep(.chat-markdown ul) {
  list-style-type: disc;
  padding-left: 1.25rem;
  margin-top: 0.35rem;
  margin-bottom: 0.65rem;
}

:deep(.chat-markdown ol) {
  list-style-type: decimal;
  padding-left: 1.25rem;
  margin-top: 0.35rem;
  margin-bottom: 0.65rem;
}

:deep(.chat-markdown li) {
  margin-bottom: 0.35rem;
  padding-left: 0.15rem;
}

:deep(.chat-markdown li:last-child) {
  margin-bottom: 0;
}

:deep(.chat-markdown h1),
:deep(.chat-markdown h2),
:deep(.chat-markdown h3),
:deep(.chat-markdown h4) {
  font-weight: 800;
  color: #324d1d;
  margin-top: 0.85rem;
  margin-bottom: 0.35rem;
  line-height: 1.3;
}

:deep(.chat-markdown h1) { font-size: 1.05rem; }
:deep(.chat-markdown h2) { font-size: 0.95rem; }
:deep(.chat-markdown h3) { font-size: 0.875rem; }
:deep(.chat-markdown h4) { font-size: 0.8125rem; }

:deep(.chat-markdown a) {
  color: #324d1d;
  text-decoration: underline;
  font-weight: 600;
  transition: color 0.15s;
}

:deep(.chat-markdown a:hover) {
  color: #324d1d;
}

:deep(.chat-markdown code) {
  background-color: #f1f5f9;
  color: #324d1d;
  padding: 0.15rem 0.35rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-family: monospace;
  border: 1px solid #e2e8f0;
}

:deep(.chat-markdown pre) {
  background-color: #324d1d;
  color: #f8fafc;
  padding: 0.75rem;
  border-radius: 0.75rem;
  overflow-x: auto;
  margin: 0.5rem 0;
}

:deep(.chat-markdown pre code) {
  background: transparent;
  color: inherit;
  padding: 0;
  border: none;
}

:deep(.chat-markdown blockquote) {
  border-left: 3px solid #99c30c;
  padding-left: 0.75rem;
  margin: 0.5rem 0;
  font-style: italic;
  color: #475569;
  background: rgba(153, 195, 12, 0.1);
  border-radius: 0 0.375rem 0.375rem 0;
}

:deep(.chat-markdown hr) {
  border: none;
  border-top: 1px solid #e2e8f0;
  margin: 0.75rem 0;
}

:deep(.chat-markdown table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0.5rem 0;
  font-size: 0.75rem;
}

:deep(.chat-markdown th),
:deep(.chat-markdown td) {
  border: 1px solid #cbd5e1;
  padding: 0.4rem 0.6rem;
  text-align: left;
}

:deep(.chat-markdown th) {
  background-color: #fff2d9;
  font-weight: 700;
}
</style>
