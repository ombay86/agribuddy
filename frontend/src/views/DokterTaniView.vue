<template>
  <div class="flex flex-1 h-full min-h-0 overflow-hidden bg-slate-50 relative">
    <!-- BACKDROP DRAWER RIWAYAT DI MOBILE -->
    <div
      v-if="isHistoryOpen"
      @click="isHistoryOpen = false"
      class="fixed inset-0 z-30 bg-slate-900/60 backdrop-blur-xs md:hidden"
    ></div>

    <!-- PANEL KIRI: RIWAYAT PERCAKAPAN (COLLAPSIBLE SIDEBAR / DRAWER) -->
    <aside
      class="fixed md:static inset-y-0 left-0 z-40 bg-white border-r border-slate-200/90 flex flex-col transition-all duration-300 shadow-xl md:shadow-none"
      :class="isHistoryOpen ? 'w-72 sm:w-80 translate-x-0' : '-translate-x-full md:translate-x-0 md:w-0 md:overflow-hidden md:border-none'"
    >
      <!-- Header Riwayat -->
      <div class="p-4 border-b border-slate-100 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <History :size="16" />
          </div>
          <div>
            <h3 class="text-xs font-black text-slate-800">Riwayat Obrolan</h3>
            <p class="text-[10px] text-slate-400 font-medium">Sesi konsultasi tersimpan</p>
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

      <!-- Tombol Buat Obrolan Baru -->
      <div class="p-3">
        <button
          @click="startNewChat"
          class="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Plus :size="15" />
          <span>Obrolan Baru</span>
        </button>
      </div>

      <!-- Daftar Sesi Chat -->
      <div class="flex-1 min-h-0 overflow-y-auto px-2 space-y-1 py-1 custom-chat-scrollbar">
        <div
          v-if="chatSessions.length === 0"
          class="p-6 text-center text-xs text-slate-400 font-medium space-y-1"
        >
          <span class="text-2xl">💬</span>
          <p>Belum ada riwayat obrolan</p>
          <p class="text-[10px]">Mulai tanya untuk menyimpan sesi</p>
        </div>

        <div
          v-for="s in chatSessions"
          :key="s.id"
          @click="switchSession(s.id)"
          class="group relative p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2"
          :class="activeSessionId === s.id
            ? 'bg-emerald-50/80 border-emerald-300 shadow-2xs'
            : 'bg-white hover:bg-slate-50 border-transparent hover:border-slate-200'"
        >
          <div class="truncate flex-1 pr-1">
            <h4
              class="text-xs font-bold truncate leading-snug"
              :class="activeSessionId === s.id ? 'text-emerald-950 font-black' : 'text-slate-700'"
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
            <Trash2 :size="12" />
          </button>
        </div>
      </div>

      <!-- Info Footer -->
      <div class="p-3 border-t border-slate-100 bg-slate-50 text-[10px] text-slate-400 flex items-center justify-between">
        <span>Powered by Gemini Vision</span>
        <span class="font-bold text-emerald-700">Agri AI v2.0</span>
      </div>
    </aside>

    <!-- PANEL UTAMA: CHAT LLM AREA -->
    <main class="flex-1 flex flex-col h-full bg-slate-50 relative overflow-hidden">
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
              class="bg-emerald-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center"
            >
              {{ chatSessions.length }}
            </span>
          </button>

          <!-- Identitas Asisten AI -->
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-tani-900 text-white flex items-center justify-center shadow-xs">
              <Sparkles :size="16" />
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <h2 class="text-sm font-black text-slate-800 tracking-tight leading-none">Agri AI</h2>
                <span class="text-[9px] font-black uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-md">
                  Sahabat Petani
                </span>
              </div>
              <p class="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Asisten Cerdas Agronomi & Fitopatologi</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Tombol Aksi Kanan: API Key & Obrolan Baru -->
        <div class="flex items-center gap-2">
          <!-- Tombol Setting API Key Gemini -->
          <button
            @click="openKeyModal"
            class="p-2 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-2xs"
            :class="hasCustomApiKey ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'"
            :title="hasCustomApiKey ? 'API Key Gemini Pribadi Aktif' : 'Atur API Key Gemini Pribadi'"
          >
            <Key :size="14" :class="hasCustomApiKey ? 'text-amber-600' : 'text-slate-500'" />
            <span class="hidden sm:inline">{{ hasCustomApiKey ? 'Key Aktif' : 'API Key' }}</span>
            <span v-if="hasCustomApiKey" class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          </button>

          <!-- Tombol Aksi Cepat: Obrolan Baru -->
          <button
            @click="startNewChat"
            class="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-2xs"
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
        <!-- State 1: Percakapan Masih Kosong (Welcome Screen & Suggestion Prompts) -->
        <div
          v-if="messages.length === 0"
          class="max-w-xl mx-auto py-8 sm:py-12 text-center space-y-6 animate-in fade-in duration-300"
        >
          <div class="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-500 to-tani-900 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/20">
            <Sparkles :size="32" />
          </div>

          <div class="space-y-1.5">
            <h3 class="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              Halo {{ currentPersona.name }}! Ada yang bisa Agri AI bantu?
            </h3>
            <p class="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Konsultasikan penyakit daun padi, rekomendasi dosis pupuk berimbang, hama wereng, atau kirim foto daun untuk dianalisis langsung.
            </p>
          </div>

          <!-- Prompt Suggestions Chips -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left pt-2">
            <button
              v-for="(p, idx) in promptSuggestions"
              :key="idx"
              @click="applyPromptSuggestion(p)"
              class="p-3.5 bg-white border border-slate-200/90 hover:border-emerald-500 rounded-2xl shadow-2xs hover:shadow-sm transition-all active:scale-98 cursor-pointer group flex items-start gap-2.5"
            >
              <span class="text-lg shrink-0 mt-0.5">{{ p.icon }}</span>
              <div>
                <h5 class="text-xs font-bold text-slate-800 group-hover:text-emerald-700 leading-snug">
                  {{ p.title }}
                </h5>
                <p class="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                  {{ p.subtitle }}
                </p>
              </div>
            </button>
          </div>

          <!-- Visual Guide: Cara Mendapatkan Google Gemini API Key -->
          <div class="mt-4 p-4 sm:p-5 bg-gradient-to-br from-amber-50/70 via-white to-emerald-50/60 border border-amber-200/90 rounded-3xl text-left shadow-xs space-y-3">
            <div class="flex items-start justify-between gap-2">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black shadow-xs text-sm">
                  <Key :size="16" />
                </div>
                <div>
                  <h4 class="text-xs sm:text-sm font-black text-slate-800">
                    Panduan Cepat: Pasang Google Gemini API Key Pribadi
                  </h4>
                  <p class="text-[10px] sm:text-[11px] text-slate-500">
                    Dapatkan kuota AI gratis tanpa batas antrean dari Google AI Studio (Model BYOK)
                  </p>
                </div>
              </div>
              <span
                class="text-[9px] font-black uppercase px-2 py-0.5 rounded-full shrink-0"
                :class="hasCustomApiKey ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'"
              >
                {{ hasCustomApiKey ? 'Key Aktif ✅' : 'Opsional 💡' }}
              </span>
            </div>

            <!-- 3 Langkah Visual -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <!-- Step 1 -->
              <div class="bg-white/90 border border-slate-200/80 rounded-2xl p-2.5 space-y-1 shadow-2xs">
                <div class="flex items-center gap-1.5 text-amber-800 font-black text-[11px]">
                  <span class="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-black">1</span>
                  <span>Buka AI Studio</span>
                </div>
                <p class="text-[10px] text-slate-500 leading-tight">
                  Login ke Google AI Studio dengan akun Google Anda.
                </p>
              </div>

              <!-- Step 2 -->
              <div class="bg-white/90 border border-slate-200/80 rounded-2xl p-2.5 space-y-1 shadow-2xs">
                <div class="flex items-center gap-1.5 text-emerald-800 font-black text-[11px]">
                  <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-black">2</span>
                  <span>Create API Key</span>
                </div>
                <p class="text-[10px] text-slate-500 leading-tight">
                  Klik tombol <strong>"Create API key"</strong> dan salin kodenya.
                </p>
              </div>

              <!-- Step 3 -->
              <div class="bg-white/90 border border-slate-200/80 rounded-2xl p-2.5 space-y-1 shadow-2xs">
                <div class="flex items-center gap-1.5 text-sky-800 font-black text-[11px]">
                  <span class="w-5 h-5 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-[10px] font-black">3</span>
                  <span>Tempel di Sini</span>
                </div>
                <p class="text-[10px] text-slate-500 leading-tight">
                  Klik tombol di bawah dan simpan kunci ke profil Anda.
                </p>
              </div>
            </div>

            <!-- Tombol Aksi Cepat -->
            <div class="flex flex-wrap items-center gap-2 pt-0.5">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] px-3.5 py-1.5 rounded-xl transition-all shadow-xs active:scale-95"
              >
                <span>🌐 Buka Google AI Studio</span>
                <ExternalLink :size="12" />
              </a>
              <button
                type="button"
                @click="openKeyModal"
                class="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-3.5 py-1.5 rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <Key :size="12" />
                <span>{{ hasCustomApiKey ? 'Ubah / Periksa API Key' : '🔑 Masukkan Kunci Sekarang' }}</span>
              </button>
            </div>
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
                class="w-8 h-8 rounded-full overflow-hidden border border-emerald-400 shadow-2xs flex items-center justify-center bg-emerald-600 text-white text-xs font-black"
              >
                <img
                  v-if="customAvatar"
                  :src="customAvatar"
                  alt="User"
                  class="w-full h-full object-cover"
                />
                <span v-else>{{ currentPersona.avatar || '👨‍🌾' }}</span>
              </div>
              <div
                v-else
                class="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-xs text-xs font-bold"
              >
                <Sparkles :size="15" />
              </div>
            </div>

            <!-- Bubble Pesan -->
            <div
              class="rounded-3xl p-4 text-xs space-y-2 shadow-xs leading-relaxed"
              :class="msg.role === 'user'
                ? 'bg-emerald-700 text-white rounded-tr-xs'
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
                class="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-2.5 text-slate-800"
              >
                <div class="flex items-start justify-between gap-2 border-b border-emerald-200/80 pb-2">
                  <div>
                    <span
                      class="text-[9px] font-black uppercase px-2 py-0.5 rounded-full inline-block"
                      :class="msg.detected_diagnosis.severity === 'Aman' ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-100 text-rose-800 border border-rose-200'"
                    >
                      Tingkat Risiko: {{ msg.detected_diagnosis.severity }}
                    </span>
                    <h4 class="text-sm font-black text-emerald-950 mt-1 leading-snug">
                      {{ msg.detected_diagnosis.disease_name }}
                    </h4>
                    <p class="text-[10px] italic text-slate-500 font-semibold">
                      {{ msg.detected_diagnosis.english_name }}
                    </p>
                  </div>
                  <div class="text-right shrink-0">
                    <span class="text-base font-black text-emerald-700">
                      {{ Math.round(msg.detected_diagnosis.confidence * 100) }}%
                    </span>
                    <span class="text-[8px] font-bold text-slate-400 block">Akurasi</span>
                  </div>
                </div>

                <!-- Gejala -->
                <div class="space-y-1">
                  <span class="text-[10px] font-black text-slate-600 uppercase flex items-center gap-1">
                    <AlertTriangle :size="12" class="text-amber-500" /> Gejala Visual:
                  </span>
                  <ul class="text-[11px] text-slate-600 space-y-0.5 pl-3 list-disc">
                    <li v-for="(sym, sIdx) in msg.detected_diagnosis.symptoms" :key="sIdx">
                      {{ sym }}
                    </li>
                  </ul>
                </div>

                <!-- Rekomendasi Solusi -->
                <div class="space-y-1 pt-1 border-t border-emerald-200/60">
                  <span class="text-[10px] font-black text-emerald-900 uppercase flex items-center gap-1">
                    <CheckCircle2 :size="12" class="text-emerald-600" /> Langkah Pengendalian:
                  </span>
                  <ul class="text-[11px] text-slate-700 space-y-1 pl-1">
                    <li
                      v-for="(act, aIdx) in msg.detected_diagnosis.actions"
                      :key="aIdx"
                      class="flex items-start gap-1.5"
                    >
                      <span class="w-3.5 h-3.5 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {{ aIdx + 1 }}
                      </span>
                      <span>{{ act }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Teks Pesan -->
              <div class="whitespace-pre-line leading-relaxed text-xs">
                {{ msg.content }}
              </div>

              <span
                class="text-[9px] block text-right font-medium"
                :class="msg.role === 'user' ? 'text-emerald-200' : 'text-slate-400'"
              >
                {{ msg.timestamp }}
              </span>
            </div>
          </div>

          <!-- Loading Indicator saat AI Berpikir -->
          <div v-if="isLoading" class="flex gap-3 max-w-lg mr-auto animate-in fade-in">
            <div class="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-xs text-xs font-bold shrink-0 mt-1">
              <Sparkles :size="15" />
            </div>
            <div class="bg-white border border-slate-200 rounded-3xl rounded-tl-xs p-4 shadow-xs flex items-center gap-2">
              <Loader2 :size="16" class="animate-spin text-emerald-600" />
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
            class="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-2xl w-fit shadow-xs animate-in fade-in"
          >
            <div class="w-9 h-9 rounded-xl overflow-hidden border border-emerald-300 shrink-0">
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
            class="relative flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/60 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/40 focus-within:border-emerald-500 border border-slate-300 rounded-3xl p-1.5 transition-all shadow-inner"
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
              class="w-9 h-9 rounded-full bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 flex items-center justify-center transition-all shadow-2xs border border-slate-200 shrink-0 cursor-pointer"
              title="Unggah Foto Daun / Tanaman"
            >
              <Camera :size="16" />
            </button>

            <!-- Input Teks Chat -->
            <input
              v-model="inputQuery"
              type="text"
              placeholder="Tanya seputar tanaman padi, pupuk, atau lampirkan foto daun..."
              class="flex-1 bg-transparent px-2.5 py-1.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 font-medium focus:outline-none"
              :disabled="isLoading"
            />

            <!-- Tombol Kirim -->
            <button
              type="submit"
              :disabled="isLoading || (!inputQuery.trim() && !attachedImageBase64)"
              class="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white flex items-center justify-center shadow-sm transition-all active:scale-95 shrink-0 cursor-pointer"
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

    <!-- MODAL POPUP PENGATURAN API KEY GEMINI -->
    <div
      v-if="isKeyModalOpen"
      class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
    >
      <div class="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Key :size="18" />
            </div>
            <div>
              <h4 class="text-sm font-black text-slate-800">Pengaturan Gemini API Key</h4>
              <p class="text-[10px] text-slate-400">Model Bring-Your-Own-Key (BYOK)</p>
            </div>
          </div>
          <button
            @click="isKeyModalOpen = false"
            class="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
          >
            <X :size="18" />
          </button>
        </div>

        <div class="space-y-3.5">
          <!-- Petunjuk Visual 3 Langkah -->
          <div class="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-slate-800 text-[11px]">3 Langkah Mudah Dapatkan API Key:</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold hover:underline text-[11px]"
              >
                <span>Buka Google AI Studio</span>
                <ExternalLink :size="11" />
              </a>
            </div>

            <ol class="space-y-1.5 text-[11px] text-slate-600 font-medium">
              <li class="flex items-start gap-1.5">
                <span class="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                <span>Buka <strong class="text-slate-800">aistudio.google.com/app/apikey</strong> lalu login akun Google.</span>
              </li>
              <li class="flex items-start gap-1.5">
                <span class="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                <span>Klik tombol biru <strong class="text-slate-800">"Create API key"</strong> dan salin kodenya.</span>
              </li>
              <li class="flex items-start gap-1.5">
                <span class="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                <span>Tempelkan pada kolom di bawah ini lalu klik <strong class="text-slate-800">Simpan Kunci</strong>.</span>
              </li>
            </ol>

            <p class="text-[10px] text-slate-400 border-t border-slate-200/80 pt-1.5 leading-relaxed">
              🔒 <em>Kunci Anda hanya tersimpan lokal di browser ini khusus untuk profil <strong>{{ currentPersona.name }}</strong>.</em>
            </p>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Google Gemini API Key:</span>
              <span v-if="hasCustomApiKey" class="text-[10px] text-amber-700 font-bold bg-amber-100 px-2 py-0.2 rounded-full">
                Kunci Pribadi Aktif
              </span>
              <span v-else class="text-[10px] text-slate-400">
                Memakai Default Server
              </span>
            </label>
            <div class="relative">
              <input
                :type="showApiKey ? 'text' : 'password'"
                v-model="tempApiKey"
                placeholder="AIzaSy..."
                class="w-full bg-slate-50 border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 font-mono pr-10"
              />
              <button
                type="button"
                @click="showApiKey = !showApiKey"
                class="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                title="Lihat / Sembunyikan Kunci"
              >
                <EyeOff v-if="showApiKey" :size="14" />
                <Eye v-else :size="14" />
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
          <button
            v-if="hasCustomApiKey"
            type="button"
            @click="handleClearKey"
            class="px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all cursor-pointer"
          >
            Hapus Kunci
          </button>
          <div v-else></div>

          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="isKeyModalOpen = false"
              class="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              @click="handleSaveKey"
              class="px-4 py-2 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              Simpan Kunci
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed, watch } from 'vue';
import { useUserState } from '@/services/userState';
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

const { currentPersona, customAvatar } = useUserState();

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

const handleSaveKey = () => {
  setCustomGeminiApiKey(tempApiKey.value, currentPersona.value.id);
  isKeyModalOpen.value = false;
  alert(tempApiKey.value.trim() 
    ? `✅ API Key Gemini pribadi berhasil disimpan khusus untuk akun ${currentPersona.value.name}!` 
    : 'ℹ️ Menggunakan default API Key server.');
};

const handleClearKey = () => {
  clearCustomGeminiApiKey(currentPersona.value.id);
  tempApiKey.value = '';
  isKeyModalOpen.value = false;
  alert(`🗑️ API Key pribadi akun ${currentPersona.value.name} telah dihapus. Sistem akan menggunakan default server.`);
};

// Pantau perubahan akun agar sesi dan key langsung menyesuaikan
watch(() => currentPersona.value.id, (newId) => {
  tempApiKey.value = getCustomGeminiApiKey(newId);
  loadSessions();
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
    icon: '🌾',
    title: 'Daun Menguning & Kering di Ujung',
    subtitle: 'Deteksi Hawar Daun Bakteri (Kresek)'
  },
  {
    icon: '🐛',
    title: 'Pengendalian Hama Wereng Coklat',
    subtitle: 'Waktu semprot & bahan aktif insektisida'
  },
  {
    icon: '🧪',
    title: 'Takaran Pupuk Fase Bunting (40 HST)',
    subtitle: 'Rekomendasi NPK, Urea, dan KCl'
  },
  {
    icon: '🔍',
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

const loadSessions = async () => {
  try {
    const list = await api.getChatSessions();
    chatSessions.value = list;
    if (list.length > 0) {
      // Buka sesi terakhir jika ada
      await switchSession(list[0].id);
    } else {
      // Pengguna baru / belum memiliki riwayat obrolan: tampilkan layar awal bersih
      startNewChat();
    }
  } catch (err) {
    console.error('Gagal memuat sesi chat:', err);
    startNewChat();
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

    // Segarkan daftar sesi riwayat
    await loadSessions();
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

onMounted(() => {
  loadSessions();
});
</script>
