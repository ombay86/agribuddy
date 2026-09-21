<template>
  <div class="space-y-6">
    <!-- Header Banner -->
    <div class="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 md:p-8 rounded-3xl shadow-md relative overflow-hidden">
      <div class="relative z-10 space-y-2 max-w-3xl">
        <div class="inline-flex items-center gap-1.5 bg-emerald-400/20 text-emerald-200 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
          <Sparkles :size="14" /> Rencana Tani AI & Modal
        </div>
        <h2 class="text-2xl md:text-3xl font-black tracking-tight leading-tight">
          Kalkulator Modal & Monitoring Siklus Tanam
        </h2>
        <p class="text-xs md:text-sm text-emerald-100/90 leading-relaxed">
          Cukup tentukan petak sawah dan luas lahan, AI akan mengalkulasi modal operasional (RAB), jadwal siklus budidaya, serta proyeksi bagi hasil kemitraan secara otomatis.
        </p>
      </div>
      <!-- Background icon decoration -->
      <div class="absolute -right-4 -bottom-6 text-emerald-700/30 select-none pointer-events-none text-9xl md:text-[140px] font-black">
        🌾
      </div>
    </div>

    <!-- RESPONSIVE 2-COLUMN DESKTOP GRID (8 COLS vs 4 COLS) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- ==================== KOLOM KIRI (8 COLS): Form Parameter & Tab Modules ==================== -->
      <div class="lg:col-span-8 space-y-6">
        <!-- Form Input Parameter Lahan & Cuaca -->
        <div class="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm space-y-4">
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 class="text-sm md:text-base font-black text-slate-800 flex items-center gap-2">
              <Calculator :size="18" class="text-emerald-600" /> Parameter Lahan Pertanian
            </h3>
            <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              AI Auto-Adjust
            </span>
          </div>

          <!-- Luas Lahan Input & Quick Chips -->
          <div class="space-y-1.5">
            <label class="text-xs font-bold text-slate-700 flex justify-between">
              <span>Luas Lahan yang Direncanakan:</span>
              <span class="text-emerald-800 font-extrabold">{{ form.land_size_ha }} Hektar ({{ (form.land_size_ha * 10000).toLocaleString() }} m²)</span>
            </label>
            <div class="relative">
              <input
                v-model.number="form.land_size_ha"
                type="number"
                step="0.1"
                min="0.05"
                max="20"
                class="w-full px-4 py-2.5 rounded-2xl border border-slate-300 font-bold text-base text-slate-800 focus:outline-none focus:border-emerald-500"
              />
              <span class="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-slate-400">
                Hektar
              </span>
            </div>
            <!-- Quick Chips -->
            <div class="flex items-center gap-1.5 pt-1">
              <button
                v-for="chip in [0.25, 0.5, 1.0, 1.5, 2.0]"
                :key="chip"
                @click="form.land_size_ha = chip"
                type="button"
                class="px-2.5 py-1 text-xs font-bold rounded-xl border transition-all active:scale-95"
                :class="form.land_size_ha === chip 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'"
              >
                {{ chip }} Ha
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <!-- Komoditas -->
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Komoditas Tanam</label>
              <select
                v-model="form.commodity"
                class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 bg-white"
              >
                <option value="Padi Sawah Inpari 32">Padi Sawah (Inpari 32 Bersertifikat)</option>
                <option value="Padi Ciherang">Padi Ciherang Unggul</option>
                <option value="Jagung Hibrida Bisi-18">Jagung Hibrida Bisi-18</option>
                <option value="Kedelai Anjasmoro">Kedelai Anjasmoro</option>
              </select>
            </div>

            <!-- Kondisi Tanah -->
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Kondisi Tanah Lahan</label>
              <select
                v-model="form.soil_type"
                class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 bg-white"
              >
                <option value="Lempung Berliat (Subur)">Lempung Berliat (Subur & Gembur)</option>
                <option value="Lempung Berpasir">Lempung Berpasir (Perlu Tambah Organik)</option>
                <option value="Aluvial Sawah Teknis">Aluvial Sawah Irigasi Teknis</option>
                <option value="Tanah Masam / Gambut">Tanah Masam (Perlu Pengapuran Dolomit)</option>
              </select>
            </div>

            <!-- Sumber Air -->
            <div class="sm:col-span-2">
              <label class="text-xs font-bold text-slate-700 block mb-1">Ketersediaan / Sumber Air</label>
              <select
                v-model="form.water_source"
                class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 bg-white"
              >
                <option value="Irigasi Teknis Bendungan">Irigasi Teknis Bendungan (Saluran Tersier P3A)</option>
                <option value="Sumur Pompa Diesel / Bor">Sumur Pompa Diesel / Bor (Alkon 3 Inci)</option>
                <option value="Sawah Tadah Hujan">Sawah Tadah Hujan (Tergantung Musim Hujan)</option>
              </select>
            </div>
          </div>

          <!-- Komponen Peta Interaktif & Deteksi GPS Lahan -->
          <FarmlandMapPicker
            :initialLat="form.latitude"
            :initialLon="form.longitude"
            :initialLabel="form.location"
            @update:coordinates="onCoordinatesUpdated"
          />

          <!-- Submit AI Calculation -->
          <button
            @click="runCalculation"
            :disabled="isLoading"
            class="w-full btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm py-3 rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
          >
            <Sparkles v-if="!isLoading" :size="16" />
            <Loader2 v-else :size="16" class="animate-spin" />
            <span>{{ isLoading ? 'AI Sedang Mengalkulasi Lahan...' : 'Kalkulasi Rencana Tani dengan AI' }}</span>
          </button>
        </div>

        <!-- Tab Section: RAB vs Monitoring vs Ekosistem vs Buku Modal -->
        <div v-if="plan" class="space-y-4">
          <!-- Tabs Switcher (4 Tabs) -->
          <div class="flex p-1 bg-slate-200/80 rounded-2xl gap-1 overflow-x-auto no-scrollbar text-xs font-black">
            <button
              @click="activeTab = 'rab'"
              class="flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
              :class="activeTab === 'rab' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'"
            >
              <Coins :size="14" /> Rincian RAB
            </button>
            <button
              @click="activeTab = 'monitoring'"
              class="flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
              :class="activeTab === 'monitoring' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'"
            >
              <CalendarCheck :size="14" /> Monitoring Fase
            </button>
            <button
              @click="activeTab = 'modal_lahan'"
              class="flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
              :class="activeTab === 'modal_lahan' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'"
            >
              <Receipt :size="14" /> Buku Modal Lahan
            </button>
            <button
              @click="activeTab = 'mitra'"
              class="flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
              :class="activeTab === 'mitra' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'"
            >
              <Users2 :size="14" /> Jasa Mitra
            </button>
          </div>

          <!-- TAB 1: Rincian Anggaran Biaya (RAB) -->
          <div v-if="activeTab === 'rab'" class="space-y-3">
            <div class="flex items-center justify-between text-xs text-slate-600 px-1 font-bold">
              <span>Komponen Biaya Operasional ({{ plan.budget_items.length }} Item)</span>
              <span class="text-emerald-700">Total: Rp {{ plan.financial_summary.total_budget.toLocaleString('id-ID') }}</span>
            </div>

            <div
              v-for="item in plan.budget_items"
              :key="item.id"
              class="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-2 hover:border-emerald-300 transition-all"
            >
              <div class="flex items-start justify-between">
                <div>
                  <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider"
                    :class="getCategoryBadgeClass(item.category)"
                  >
                    {{ item.phase }}
                  </span>
                  <h4 class="text-sm font-extrabold text-slate-800 mt-1">{{ item.name }}</h4>
                </div>
                <div class="text-right">
                  <span class="text-sm font-black text-emerald-700">
                    Rp {{ item.total_price.toLocaleString('id-ID') }}
                  </span>
                  <div class="text-[10px] text-slate-500 font-semibold">
                    {{ item.quantity }} {{ item.unit }} @ Rp {{ item.unit_price.toLocaleString('id-ID') }}
                  </div>
                </div>
              </div>

              <p class="text-xs text-slate-600 leading-snug">{{ item.notes }}</p>

              <!-- Rekomendasi Penyedia Jasa di Ekosistem Sukamaju -->
              <div class="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center justify-between mt-2">
                <div class="flex items-center gap-2">
                  <span class="text-sm">🤝</span>
                  <div>
                    <div class="text-[10px] text-slate-500 font-bold">Rekomendasi Warga Ekosistem:</div>
                    <div class="text-xs font-black text-slate-800">{{ item.recommended_provider }}</div>
                  </div>
                </div>
                <button
                  @click="contactProvider(item.recommended_provider)"
                  class="text-[10px] font-black bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-2.5 py-1.5 rounded-lg active:scale-95 transition-all flex items-center gap-1"
                >
                  <MessageSquare :size="12" /> Hubungi
                </button>
              </div>
            </div>
          </div>

          <!-- TAB 2: Monitoring Siklus Tanam & Catatan Aktual -->
          <div v-if="activeTab === 'monitoring'" class="space-y-4">
            <!-- Progress Bar Summary -->
            <div class="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-2">
              <div class="flex items-center justify-between text-xs font-black">
                <span class="text-slate-700">Progres Siklus Tanam:</span>
                <span class="text-emerald-700">{{ completedPhasesCount }} dari {{ plan.timeline_phases.length }} Fase Selesai ({{ progressPercentage }}%)</span>
              </div>
              <div class="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  class="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  :style="{ width: `${progressPercentage}%` }"
                ></div>
              </div>
              <div class="flex items-center justify-between text-[10px] text-slate-500 pt-1 font-semibold">
                <span>Persemaian (H-15)</span>
                <span>Primordia (H+40)</span>
                <span>Panen Raya (H+115)</span>
              </div>
            </div>

            <!-- Phased Steps Interactive List -->
            <div class="space-y-3">
              <div
                v-for="phase in plan.timeline_phases"
                :key="phase.step_no"
                class="bg-white border rounded-2xl p-4 shadow-sm space-y-3 transition-all"
                :class="phase.status === 'SELESAI' 
                  ? 'border-emerald-300 bg-emerald-50/20' 
                  : phase.status === 'SEDANG_BERJALAN' 
                    ? 'border-amber-300 ring-1 ring-amber-200' 
                    : 'border-slate-200'"
              >
                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-2">
                    <span
                      class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                      :class="phase.status === 'SELESAI' 
                        ? 'bg-emerald-600 text-white' 
                        : phase.status === 'SEDANG_BERJALAN' 
                          ? 'bg-amber-500 text-white animate-pulse' 
                          : 'bg-slate-200 text-slate-600'"
                    >
                      {{ phase.status === 'SELESAI' ? '✓' : phase.step_no }}
                    </span>
                    <div>
                      <h4 class="text-xs font-black text-slate-800">{{ phase.name }}</h4>
                      <div class="text-[10px] font-bold text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Clock :size="11" /> {{ phase.day_range }} • Durasi {{ phase.duration_days }} hari
                      </div>
                    </div>
                  </div>

                  <!-- Status Dropdown / Toggle -->
                  <select
                    v-model="phase.status"
                    @change="saveStepUpdate(phase)"
                    class="text-[11px] font-black px-2.5 py-1 rounded-xl border focus:outline-none transition-all"
                    :class="phase.status === 'SELESAI' 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : phase.status === 'SEDANG_BERJALAN' 
                        ? 'bg-amber-100 text-amber-800 border-amber-300' 
                        : 'bg-slate-100 text-slate-600 border-slate-200'"
                  >
                    <option value="BELUM">Belum Mulai</option>
                    <option value="SEDANG_BERJALAN">Sedang Berjalan</option>
                    <option value="SELESAI">Selesai ✓</option>
                  </select>
                </div>

                <!-- Task Checklist -->
                <div class="space-y-1.5 pl-9">
                  <div
                    v-for="(task, tIdx) in phase.tasks"
                    :key="tIdx"
                    class="text-xs text-slate-700 flex items-start gap-2"
                  >
                    <span class="text-emerald-700 font-bold mt-0.5">•</span>
                    <span>{{ task }}</span>
                  </div>
                </div>

                <!-- AI Tip for the Phase -->
                <div class="bg-amber-50/70 border border-amber-200/70 rounded-xl p-2.5 text-xs text-amber-900 flex items-start gap-2">
                  <Sparkles :size="14" class="text-amber-600 shrink-0 mt-0.5" />
                  <span><strong class="font-black">Tips AI Agronomis:</strong> {{ phase.ai_tips }}</span>
                </div>

                <!-- Realisasi Biaya Aktual vs Anggaran Rencana -->
                <div class="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div class="text-[11px]">
                    <span class="text-slate-500 font-bold">Anggaran Rencana: </span>
                    <span class="font-black text-slate-800">Rp {{ phase.allocated_budget.toLocaleString('id-ID') }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-[11px] font-bold text-slate-600">Realisasi Aktual:</span>
                    <div class="relative w-32">
                      <span class="absolute inset-y-0 left-0 pl-2 flex items-center text-[10px] font-bold text-slate-400">Rp</span>
                      <input
                        v-model.number="phase.actual_cost"
                        @blur="saveStepUpdate(phase)"
                        type="number"
                        placeholder="0"
                        class="w-full pl-7 pr-2 py-1 text-xs font-black rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500 text-right"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 3: Rekomendasi Jasa Ekosistem AgriBuddy -->
          <div v-if="activeTab === 'mitra'" class="space-y-3">
            <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 leading-relaxed font-medium">
              <strong class="font-black">Semua kebutuhan rencana tanam Anda tersedia di Ekosistem Sukamaju:</strong> Hubungi mitra penyedia jasa olah tanah, pengairan, kios pupuk, atau pengepul hasil panen secara langsung.
            </div>

            <div
              v-for="(rec, rIdx) in plan.ecosystem_recommendations"
              :key="rIdx"
              class="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between hover:border-emerald-300 transition-all"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-lg">
                  {{ getRoleEmoji(rec.role_category) }}
                </div>
                <div>
                  <span class="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {{ rec.role_category }}
                  </span>
                  <h4 class="text-xs font-black text-slate-800 mt-0.5">{{ rec.partner_name }}</h4>
                  <p class="text-[11px] text-slate-500 font-semibold">{{ rec.action_text }}</p>
                </div>
              </div>
              <button
                @click="openWhatsApp(rec.phone, rec.partner_name)"
                class="btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-3 py-2 rounded-xl shadow-sm active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Phone :size="13" /> Hubungi
              </button>
            </div>
          </div>

          <!-- TAB 4: BUKU MODAL USAHATANI LAHAN -->
          <div v-if="activeTab === 'modal_lahan'" class="space-y-3">
            <div class="bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-5 rounded-3xl shadow-sm space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-extrabold uppercase text-emerald-300">Realisasi Modal Lahan</span>
                <button
                  @click="openAddExpenseModal"
                  class="text-xs font-black bg-emerald-500/30 hover:bg-emerald-500/50 text-emerald-200 px-3 py-1.5 rounded-xl border border-emerald-400/40 active:scale-95 transition-all flex items-center gap-1"
                >
                  <PlusCircle :size="13" /> Catat Modal Manual
                </button>
              </div>
              <div class="flex items-baseline justify-between">
                <div>
                  <div class="text-2xl md:text-3xl font-black text-white">
                    Rp {{ (activeFarm?.capital_expenses?.reduce((acc, e) => acc + e.amount, 0) || 0).toLocaleString('id-ID') }}
                  </div>
                  <p class="text-[11px] text-emerald-200 mt-0.5">
                    Total modal terpakai di {{ activeFarm?.name }}
                  </p>
                </div>
                <div class="text-right text-xs text-slate-300">
                  <span class="block text-[10px] text-slate-400">Anggaran RAB AI</span>
                  <span class="font-bold text-white">Rp {{ plan?.financial_summary?.total_budget?.toLocaleString('id-ID') }}</span>
                </div>
              </div>
            </div>

            <!-- List Transaksi / Belanja Buku Modal -->
            <div v-if="!activeFarm?.capital_expenses || activeFarm.capital_expenses.length === 0" class="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-2">
              <div class="text-3xl">📒</div>
              <h4 class="text-xs font-black text-slate-800">Belum Ada Catatan Modal di Lahan Ini</h4>
              <p class="text-[11px] text-slate-500 max-w-xs mx-auto">
                Transaksi checkout dari Katalog atau pengeluaran operasional dapat dicatat ke sini.
              </p>
            </div>

            <div v-else class="space-y-2">
              <div
                v-for="exp in activeFarm.capital_expenses"
                :key="exp.id"
                class="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm space-y-1.5 hover:border-emerald-300 transition-all"
              >
                <div class="flex items-start justify-between">
                  <div>
                    <div class="flex items-center gap-1.5">
                      <span class="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full"
                        :class="exp.source === 'MARKETPLACE' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-700'"
                      >
                        {{ exp.source === 'MARKETPLACE' ? '🛒 Checkout Katalog' : '📝 Manual' }}
                      </span>
                      <span class="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {{ exp.category }}
                      </span>
                    </div>
                    <h4 class="text-xs font-black text-slate-800 mt-1">{{ exp.item_name }}</h4>
                  </div>
                  <div class="text-right">
                    <span class="text-xs font-black text-emerald-700">
                      Rp {{ exp.amount.toLocaleString('id-ID') }}
                    </span>
                    <span class="text-[9px] text-slate-400 font-semibold block">{{ exp.date }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== KOLOM KANAN (4 COLS): Multi-Lahan, Finansial, Kolaborator, Cuaca ==================== -->
      <div class="lg:col-span-4 space-y-6">
        <!-- KELOLA PETAK SAWAH SAYA (MULTI-LAHAN SWITCHER) -->
        <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3.5">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Multi-Lahan Usahatani
              </span>
              <h3 class="text-sm font-black text-slate-800 mt-1 flex items-center gap-1.5">
                <Layers :size="16" class="text-emerald-600" /> Sawah yang Dikerjakan
              </h3>
            </div>
            <button
              @click="openAddFarmModal"
              class="btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-1.5 px-3 rounded-xl shadow-sm active:scale-95 flex items-center gap-1 transition-all"
            >
              <PlusCircle :size="13" /> Tambah Sawah
            </button>
          </div>

          <!-- List Sawah Cards Vertikal (Di Desktop) -->
          <div class="space-y-2">
            <button
              v-for="farm in farmlands"
              :key="farm.id"
              @click="selectFarmland(farm)"
              class="w-full p-3 rounded-2xl transition-all flex items-center justify-between border active:scale-98 text-left"
              :class="activeFarmId === farm.id
                ? 'bg-emerald-50/70 border-emerald-500 shadow-sm ring-2 ring-emerald-400/30'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'"
            >
              <div class="flex items-center gap-2.5">
                <span class="text-2xl p-1 bg-white rounded-xl shadow-2xs border border-slate-200/60">🌾</span>
                <div>
                  <div class="font-extrabold text-xs text-slate-800 leading-snug">{{ farm.name }}</div>
                  <div class="text-[10px] text-slate-500 font-semibold mt-0.5">{{ farm.land_size_ha }} Ha • {{ farm.commodity }}</div>
                </div>
              </div>
              <span v-if="activeFarmId === farm.id" class="text-[10px] font-black text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                Aktif
              </span>
            </button>
          </div>
        </div>

        <!-- Proyeksi Finansial Dashboard -->
        <div v-if="plan" class="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-5 shadow-lg space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-[10px] font-black uppercase tracking-wider text-emerald-400">Proyeksi Finansial Tani</span>
              <h3 class="text-sm font-extrabold">Luas Lahan: {{ plan.land_size_ha }} Ha</h3>
            </div>
            <div class="bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 rounded-2xl text-right">
              <span class="text-[9px] text-emerald-300 font-extrabold uppercase block">Estimasi ROI</span>
              <span class="text-sm font-black text-emerald-400">+{{ plan.financial_summary.roi_percentage }}%</span>
            </div>
          </div>

          <!-- Financial Metrics Grid -->
          <div class="grid grid-cols-2 gap-2.5 pt-1">
            <div class="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
              <span class="text-[10px] text-slate-300 font-bold block">Total Modal (RAB)</span>
              <div class="text-sm font-black text-white mt-0.5">
                Rp {{ plan.financial_summary.total_budget.toLocaleString('id-ID') }}
              </div>
              <span class="text-[9px] text-emerald-300 font-semibold block mt-0.5">
                HPP: Rp {{ plan.financial_summary.hpp_per_kg.toLocaleString('id-ID') }}/kg
              </span>
            </div>

            <div class="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
              <span class="text-[10px] text-slate-300 font-bold block">Proyeksi Laba Bersih</span>
              <div class="text-sm font-black text-emerald-400 mt-0.5">
                Rp {{ plan.financial_summary.projected_net_profit.toLocaleString('id-ID') }}
              </div>
              <span class="text-[9px] text-slate-300 font-semibold block mt-0.5">
                Setelah dipotong modal
              </span>
            </div>

            <div class="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
              <span class="text-[10px] text-slate-300 font-bold block">Estimasi Hasil Panen</span>
              <div class="text-xs font-black text-white mt-0.5">
                {{ plan.financial_summary.projected_yield_kg.toLocaleString('id-ID') }} <span class="text-[10px] text-slate-300">kg GKP</span>
              </div>
              <span class="text-[9px] text-amber-300 font-semibold block mt-0.5">
                Rp {{ plan.financial_summary.projected_selling_price_per_kg.toLocaleString('id-ID') }}/kg
              </span>
            </div>

            <div class="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
              <span class="text-[10px] text-slate-300 font-bold block">Omzet Bruto</span>
              <div class="text-xs font-black text-white mt-0.5">
                Rp {{ plan.financial_summary.projected_revenue.toLocaleString('id-ID') }}
              </div>
              <span class="text-[9px] text-slate-300 font-semibold block mt-0.5">
                Bursa lumbung
              </span>
            </div>
          </div>
        </div>

        <!-- PANEL KOLABORATOR & BAGI HASIL USAHATANI -->
        <div v-if="activeFarm" class="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3.5">
          <div class="flex items-center justify-between pb-1 border-b border-slate-100">
            <div>
              <div class="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                <Users2 :size="12" /> Kemitraan & Bagi Hasil
              </div>
              <h3 class="text-xs font-black text-slate-800 mt-1">
                Pengelola & Kolaborator Lahan
              </h3>
            </div>
            <button
              @click="openManageCollabModal"
              class="text-xs font-black text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-xl border border-emerald-200 active:scale-95 transition-all flex items-center gap-1"
            >
              <UserPlus :size="12" /> Kelola
            </button>
          </div>

          <p class="text-[11px] text-slate-500 leading-relaxed">
            Sawah <strong>{{ activeFarm.name }}</strong> dikelola bersama mitra tani:
          </p>

          <!-- Multi-Segment Visual Progress Bar -->
          <div class="space-y-1">
            <div class="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
              <div
                v-for="(collab, cIdx) in activeFarm.collaborators"
                :key="collab.id"
                :style="{ width: `${collab.share_percentage}%` }"
                :class="getCollabColorBg(cIdx)"
                class="h-full transition-all flex items-center justify-center text-[9px] font-black text-white"
                :title="`${collab.name}: ${collab.share_percentage}%`"
              >
                <span v-if="collab.share_percentage >= 15">{{ collab.share_percentage }}%</span>
              </div>
            </div>
          </div>

          <!-- List Kolaborator Cards -->
          <div class="space-y-2 pt-1">
            <div
              v-for="(collab, cIdx) in activeFarm.collaborators"
              :key="collab.id"
              class="p-2.5 rounded-2xl border flex items-start justify-between gap-2"
              :class="getCollabCardClass(cIdx)"
            >
              <div class="space-y-0.5">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full shrink-0" :class="getCollabColorDot(cIdx)"></span>
                  <h4 class="text-xs font-black text-slate-800">{{ collab.name }}</h4>
                </div>
                <p class="text-[10px] font-semibold text-slate-500">{{ collab.role }}</p>
                <div v-if="plan" class="text-[10px] font-bold text-emerald-800 pt-0.5">
                  Est: Rp {{ Math.round((collab.share_percentage / 100) * plan.financial_summary.projected_net_profit).toLocaleString('id-ID') }}
                </div>
              </div>
              <div class="text-right">
                <span class="text-xs font-black text-slate-800">{{ collab.share_percentage }}%</span>
                <span class="text-[8px] text-slate-400 font-bold block">Bagi Hasil</span>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Agronomic & Weather Adjustment Card -->
        <div v-if="plan" class="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-4.5 shadow-sm space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <CloudSun :size="14" /> Analisis Cuaca & Agronomi AI
            </span>
            <span class="text-[10px] font-extrabold bg-amber-200/80 text-amber-900 px-2.5 py-0.5 rounded-full">
              {{ plan.weather_condition.season }}
            </span>
          </div>

          <!-- Koordinat GPS Lahan Aktif -->
          <div class="flex items-center gap-2 text-[11px] text-amber-900 font-extrabold bg-amber-100/70 p-2 rounded-xl border border-amber-200/60">
            <MapPin :size="13" class="text-amber-700 shrink-0" />
            <div class="truncate">
              <span>Lokasi: <strong>{{ plan.location }}</strong></span>
              <span class="text-[10px] font-mono text-amber-800 font-bold ml-1.5">({{ plan.latitude ? plan.latitude.toFixed(4) : '-7.2504' }}, {{ plan.longitude ? plan.longitude.toFixed(4) : '112.7512' }})</span>
            </div>
          </div>

          <p class="text-xs text-amber-900 leading-relaxed font-medium">
            {{ plan.weather_condition.note }}
          </p>
          <div class="flex items-center gap-3 pt-1 text-[11px] text-amber-800 font-bold border-t border-amber-200/60">
            <span>Suhu Rata-rata: {{ plan.weather_condition.temp_celsius }}°C</span>
            <span>•</span>
            <span>Peluang Hujan: {{ plan.weather_condition.rain_probability }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL 1: TAMBAH SAWAH BARU -->
    <div v-if="isAddFarmModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div class="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto relative">
        <button
          @click="isAddFarmModalOpen = false"
          class="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-500 p-1.5 rounded-full transition-all"
        >
          ✕
        </button>

        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
            🌾 Petak Sawah Baru
          </div>
          <h3 class="text-base font-black text-slate-800">
            Tambah Lahan yang Dikerjakan
          </h3>
          <p class="text-xs text-slate-500">
            Daftarkan lahan lain untuk memantau siklus budidaya dan modal usahatani secara mandiri.
          </p>
        </div>

        <form @submit.prevent="handleCreateFarmland" class="space-y-3 pt-1">
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Nama / Identitas Petak Lahan</label>
            <input
              v-model="newFarmForm.name"
              type="text"
              required
              placeholder="Contoh: Sawah Blok Legok, Sawah Petak Selokan"
              class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Luas Lahan (Hektar)</label>
            <input
              v-model.number="newFarmForm.land_size_ha"
              type="number"
              step="0.05"
              min="0.05"
              required
              class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Komoditas yang Ditanam</label>
            <select
              v-model="newFarmForm.commodity"
              class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 bg-white"
            >
              <option value="Padi Sawah Inpari 32">Padi Sawah (Inpari 32 Bersertifikat)</option>
              <option value="Padi Ciherang">Padi Ciherang Unggul</option>
              <option value="Jagung Hibrida Bisi-18">Jagung Hibrida Bisi-18</option>
              <option value="Kedelai Anjasmoro">Kedelai Anjasmoro</option>
            </select>
          </div>

          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Lokasi Lahan</label>
            <input
              v-model="newFarmForm.location"
              type="text"
              required
              placeholder="Contoh: Desa Sukamaju Blok Timur"
              class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div class="pt-2 flex items-center gap-2">
            <button
              type="button"
              @click="isAddFarmModalOpen = false"
              class="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="isSubmittingFarm"
              class="flex-1 btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 rounded-xl shadow-md active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-60"
            >
              <Loader2 v-if="isSubmittingFarm" :size="15" class="animate-spin" />
              <Check v-else :size="15" />
              <span>{{ isSubmittingFarm ? 'Menyimpan...' : 'Simpan Lahan' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL 2: KELOLA KOLABORATOR & BAGI HASIL -->
    <div v-if="isManageCollabModalOpen && activeFarm" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div class="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto relative">
        <button
          @click="isManageCollabModalOpen = false"
          class="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-500 p-1.5 rounded-full transition-all"
        >
          ✕
        </button>

        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
            👥 Kemitraan Usahatani
          </div>
          <h3 class="text-base font-black text-slate-800">
            Kelola Kolaborator & Bagi Hasil
          </h3>
          <p class="text-xs text-slate-500">
            Atur pihak yang mengelola sawah <strong>{{ activeFarm.name }}</strong> beserta persentase bagi hasil panen.
          </p>
        </div>

        <!-- Daftar Kolaborator Saat Ini -->
        <div class="space-y-2">
          <div class="text-xs font-black text-slate-700">Daftar Kolaborator Aktif:</div>
          <div
            v-for="(collab, idx) in activeFarm.collaborators"
            :key="collab.id"
            class="p-3 rounded-2xl border border-slate-200 flex items-center justify-between gap-2 bg-slate-50/60"
          >
            <div>
              <div class="font-extrabold text-xs text-slate-800">{{ collab.name }}</div>
              <div class="text-[10px] text-slate-500 font-semibold">{{ collab.role }} • {{ collab.phone || 'No HP -' }}</div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-lg">
                {{ collab.share_percentage }}%
              </span>
              <button
                v-if="activeFarm.collaborators.length > 1"
                @click="handleRemoveCollaborator(collab.id)"
                class="text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg transition-all"
                title="Hapus Kolaborator"
              >
                <Trash2 :size="13" />
              </button>
            </div>
          </div>
        </div>

        <!-- Form Tambah Kolaborator Baru -->
        <div class="border-t border-slate-100 pt-3 space-y-2.5">
          <div class="text-xs font-black text-slate-800 flex items-center gap-1">
            <UserPlus :size="14" class="text-emerald-600" /> Tambah Kolaborator Baru
          </div>

          <form @submit.prevent="handleAddCollaborator" class="space-y-2">
            <div>
              <label class="text-[11px] font-bold text-slate-600 block mb-0.5">Nama Rekan / Penggarap</label>
              <input
                v-model="newCollabForm.name"
                type="text"
                required
                placeholder="Contoh: Mang Udin, Pak Slamet"
                class="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="text-[11px] font-bold text-slate-600 block mb-0.5">Peran / Tugas</label>
                <input
                  v-model="newCollabForm.role"
                  type="text"
                  required
                  placeholder="Contoh: Penggarap, Olah Tanah"
                  class="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label class="text-[11px] font-bold text-slate-600 block mb-0.5">Persentase Hasil (%)</label>
                <input
                  v-model.number="newCollabForm.share_percentage"
                  type="number"
                  step="1"
                  min="1"
                  max="100"
                  required
                  class="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label class="text-[11px] font-bold text-slate-600 block mb-0.5">No. WhatsApp (Opsional)</label>
              <input
                v-model="newCollabForm.phone"
                type="text"
                placeholder="08xxxxxxxxxx"
                class="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              :disabled="isSubmittingCollab"
              class="w-full btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2 rounded-xl shadow-sm active:scale-95 flex items-center justify-center gap-1.5 mt-2"
            >
              <Loader2 v-if="isSubmittingCollab" :size="13" class="animate-spin" />
              <UserPlus v-else :size="13" />
              <span>{{ isSubmittingCollab ? 'Menyimpan...' : 'Tambahkan ke Lahan' }}</span>
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- MODAL 3: CATAT MODAL MANUAL -->
    <div v-if="isAddExpenseModalOpen && activeFarm" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div class="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto relative">
        <button
          @click="isAddExpenseModalOpen = false"
          class="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-500 p-1.5 rounded-full transition-all"
        >
          ✕
        </button>

        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
            📝 Buku Modal Manual
          </div>
          <h3 class="text-base font-black text-slate-800">
            Catat Pengeluaran Usahatani
          </h3>
          <p class="text-xs text-slate-500">
            Catat pengeluaran tunai di lapangan ke dalam buku modal <strong>{{ activeFarm.name }}</strong>.
          </p>
        </div>

        <form @submit.prevent="handleCreateManualExpense" class="space-y-3 pt-1">
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Nama Pengeluaran / Barang</label>
            <input
              v-model="manualExpenseForm.item_name"
              type="text"
              required
              placeholder="Contoh: Beli Bambu Ajir, Solar Pompa, Upah Makan Buruh"
              class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Nominal Biaya (Rp)</label>
            <input
              v-model.number="manualExpenseForm.amount"
              type="number"
              step="1000"
              min="1000"
              required
              class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Kategori Pos Modal</label>
            <select
              v-model="manualExpenseForm.category"
              class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 bg-white"
            >
              <option value="OLAH_TANAH">🚜 Olah Tanah & Lahan</option>
              <option value="PENGAIRAN">💧 Operasional Pompa & Pengairan</option>
              <option value="BENIH_BIBIT">🌱 Benih / Bibit Semai</option>
              <option value="PUPUK_NUTRISI">🌿 Pupuk Organik & Kimia</option>
              <option value="TENAGA_KERJA">👥 Upah Tenaga Tanam / Buruh</option>
              <option value="OBAT_HAMA">🛡️ Perlindungan Hama / Pestisida</option>
              <option value="LAINNYA">📦 Operasional Panen / Lainnya</option>
            </select>
          </div>

          <div class="pt-2 flex items-center gap-2">
            <button
              type="button"
              @click="isAddExpenseModalOpen = false"
              class="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="isSubmittingExpense"
              class="flex-1 btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 rounded-xl shadow-md active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-60"
            >
              <Loader2 v-if="isSubmittingExpense" :size="15" class="animate-spin" />
              <Check v-else :size="15" />
              <span>{{ isSubmittingExpense ? 'Menyimpan...' : 'Simpan ke Modal' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { api, FarmPlan, TimelinePhase, Farmland, Collaborator, CapitalExpense } from '@/services/api';
import { useUserState } from '@/services/userState';
import FarmlandMapPicker from '@/components/FarmlandMapPicker.vue';
import { 
  Sparkles, Calculator, CloudSun, Coins, CalendarCheck, 
  Users2, MessageSquare, Clock, Phone, Loader2, MapPin,
  Layers, UserPlus, PlusCircle, Receipt, Trash2, Check 
} from 'lucide-vue-next';

const { currentUserId, currentPersona } = useUserState();

const isLoading = ref(false);
const plan = ref<FarmPlan | null>(null);
const activeTab = ref<'rab' | 'monitoring' | 'modal_lahan' | 'mitra'>('rab');

// --- MULTI-FARMLAND STATE ---
const farmlands = ref<Farmland[]>([]);
const activeFarmId = ref<string>('');

const activeFarm = computed(() => {
  return farmlands.value.find(f => f.id === activeFarmId.value) || farmlands.value[0] || null;
});

// Modals State
const isAddFarmModalOpen = ref(false);
const isSubmittingFarm = ref(false);
const newFarmForm = ref({
  name: '',
  land_size_ha: 0.8,
  commodity: 'Padi Sawah Inpari 32',
  location: 'Desa Sukamaju Krajan'
});

const isManageCollabModalOpen = ref(false);
const isSubmittingCollab = ref(false);
const newCollabForm = ref({
  name: '',
  role: 'Penggarap & Perawatan Lahan',
  share_percentage: 30,
  phone: ''
});

const isAddExpenseModalOpen = ref(false);
const isSubmittingExpense = ref(false);
const manualExpenseForm = ref({
  item_name: '',
  amount: 250000,
  category: 'OLAH_TANAH'
});

const form = ref({
  land_size_ha: 1.0,
  commodity: 'Padi Sawah Inpari 32',
  soil_type: 'Lempung Berliat (Subur)',
  water_source: 'Irigasi Teknis Bendungan',
  location: 'Desa Sukamaju, Jawa Timur',
  latitude: -7.2504,
  longitude: 112.7512,
  coordinates_label: '-7.2504, 112.7512 (Desa Sukamaju)'
});

const onCoordinatesUpdated = (data: { lat: number; lon: number; label: string }) => {
  form.value.latitude = data.lat;
  form.value.longitude = data.lon;
  form.value.location = data.label;
  form.value.coordinates_label = `${data.lat.toFixed(4)}, ${data.lon.toFixed(4)}`;
};

const completedPhasesCount = computed(() => {
  if (!plan.value) return 0;
  return plan.value.timeline_phases.filter(p => p.status === 'SELESAI').length;
});

const progressPercentage = computed(() => {
  if (!plan.value || plan.value.timeline_phases.length === 0) return 0;
  return Math.round((completedPhasesCount.value / plan.value.timeline_phases.length) * 100);
});

// Load Lahan Multi-Sawah Pengguna
const loadFarmlands = async () => {
  try {
    const list = await api.getFarmlands(currentUserId.value);
    farmlands.value = list;
    if (list.length > 0) {
      const target = list.find(f => f.id === activeFarmId.value) || list[0];
      activeFarmId.value = target.id;
      applyFarmToForm(target);
    }
  } catch (err) {
    console.error('Error loading farmlands:', err);
  }
};

const applyFarmToForm = (farm: Farmland) => {
  form.value.land_size_ha = farm.land_size_ha;
  form.value.commodity = farm.commodity;
  form.value.soil_type = farm.soil_type;
  form.value.water_source = farm.water_source;
  form.value.location = farm.location;
  if (farm.latitude) form.value.latitude = farm.latitude;
  if (farm.longitude) form.value.longitude = farm.longitude;
  form.value.coordinates_label = `${farm.latitude ? farm.latitude.toFixed(4) : '-7.2504'}, ${farm.longitude ? farm.longitude.toFixed(4) : '112.7512'} (${farm.location})`;
  runCalculation();
};

const selectFarmland = (farm: Farmland) => {
  activeFarmId.value = farm.id;
  applyFarmToForm(farm);
};

const openAddFarmModal = () => {
  newFarmForm.value = {
    name: `Sawah Petak Baru (${currentPersona.value.name})`,
    land_size_ha: 0.75,
    commodity: 'Padi Sawah Inpari 32',
    location: currentPersona.value.location || 'Desa Sukamaju'
  };
  isAddFarmModalOpen.value = true;
};

const handleCreateFarmland = async () => {
  try {
    isSubmittingFarm.value = true;
    const created = await api.createFarmland({
      name: newFarmForm.value.name,
      land_size_ha: newFarmForm.value.land_size_ha,
      commodity: newFarmForm.value.commodity,
      location: newFarmForm.value.location,
      latitude: form.value.latitude,
      longitude: form.value.longitude,
      soil_type: form.value.soil_type,
      water_source: form.value.water_source
    }, currentUserId.value);

    isAddFarmModalOpen.value = false;
    await loadFarmlands();
    activeFarmId.value = created.id;
    applyFarmToForm(created);
  } catch (err: any) {
    alert(err.message || 'Gagal menambahkan petak sawah');
  } finally {
    isSubmittingFarm.value = false;
  }
};

const openManageCollabModal = () => {
  newCollabForm.value = {
    name: '',
    role: 'Penggarap & Perawatan Lahan',
    share_percentage: 25,
    phone: ''
  };
  isManageCollabModalOpen.value = true;
};

const handleAddCollaborator = async () => {
  if (!activeFarm.value) return;
  try {
    isSubmittingCollab.value = true;
    const updated = await api.addCollaborator(activeFarm.value.id, {
      id: '',
      name: newCollabForm.value.name,
      role: newCollabForm.value.role,
      share_percentage: newCollabForm.value.share_percentage,
      phone: newCollabForm.value.phone
    });

    const fIdx = farmlands.value.findIndex(f => f.id === activeFarm.value?.id);
    if (fIdx !== -1) farmlands.value[fIdx] = updated;

    newCollabForm.value.name = '';
    newCollabForm.value.phone = '';
  } catch (err: any) {
    alert(err.message || 'Gagal menambahkan kolaborator');
  } finally {
    isSubmittingCollab.value = false;
  }
};

const handleRemoveCollaborator = async (collabId: string) => {
  if (!activeFarm.value) return;
  if (!confirm('Hapus kolaborator ini dari usahatani?')) return;
  try {
    const updated = await api.removeCollaborator(activeFarm.value.id, collabId);
    const fIdx = farmlands.value.findIndex(f => f.id === activeFarm.value?.id);
    if (fIdx !== -1) farmlands.value[fIdx] = updated;
  } catch (err: any) {
    alert(err.message || 'Gagal menghapus kolaborator');
  }
};

const openAddExpenseModal = () => {
  manualExpenseForm.value = {
    item_name: '',
    amount: 150000,
    category: 'OLAH_TANAH'
  };
  isAddExpenseModalOpen.value = true;
};

const handleCreateManualExpense = async () => {
  if (!activeFarm.value) return;
  try {
    isSubmittingExpense.value = true;
    await api.recordFarmExpense(activeFarm.value.id, {
      item_name: manualExpenseForm.value.item_name,
      amount: manualExpenseForm.value.amount,
      category: manualExpenseForm.value.category,
      source: 'MANUAL'
    });

    // Refresh daftar lahan untuk memuat riwayat buku modal terbaru
    await loadFarmlands();
    isAddExpenseModalOpen.value = false;
  } catch (err: any) {
    alert(err.message || 'Gagal mencatat pengeluaran modal');
  } finally {
    isSubmittingExpense.value = false;
  }
};

const runCalculation = async () => {
  try {
    isLoading.value = true;
    const res = await api.calculateFarmPlan({
      land_size_ha: form.value.land_size_ha,
      commodity: form.value.commodity,
      soil_type: form.value.soil_type,
      water_source: form.value.water_source,
      location: form.value.location,
      latitude: form.value.latitude,
      longitude: form.value.longitude,
      coordinates_label: form.value.coordinates_label
    });
    plan.value = res;
  } catch (err: any) {
    alert(err.message || 'Gagal menghitung rencana tani');
  } finally {
    isLoading.value = false;
  }
};

const saveStepUpdate = async (phase: TimelinePhase) => {
  if (!plan.value) return;
  try {
    await api.updateFarmPlanStep(plan.value.plan_id, {
      step_no: phase.step_no,
      status: phase.status,
      actual_cost: phase.actual_cost
    });
  } catch (err) {
    console.error('Error saving step update:', err);
  }
};

const getCategoryBadgeClass = (category: string) => {
  switch (category) {
    case 'JASA_TRAKTOR':
      return 'bg-amber-100 text-amber-800';
    case 'JASA_PENGAIRAN':
      return 'bg-sky-100 text-sky-800';
    case 'JASA_CANGKUL':
    case 'JASA_BURUH':
      return 'bg-lime-100 text-lime-800';
    case 'PUPUK':
    case 'SAPROTAN':
      return 'bg-teal-100 text-teal-800';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

const getRoleEmoji = (role: string) => {
  if (role.includes('Traktor')) return '🚜';
  if (role.includes('Pengairan')) return '💧';
  if (role.includes('Saprotan')) return '🏪';
  if (role.includes('Penggilingan')) return '🚚';
  return '🌾';
};

const getCollabColorBg = (idx: number) => {
  const colors = ['bg-emerald-600', 'bg-amber-500', 'bg-teal-500', 'bg-indigo-500', 'bg-sky-500'];
  return colors[idx % colors.length];
};

const getCollabColorDot = (idx: number) => {
  const dots = ['bg-emerald-500', 'bg-amber-500', 'bg-teal-500', 'bg-indigo-500', 'bg-sky-500'];
  return dots[idx % dots.length];
};

const getCollabCardClass = (idx: number) => {
  const classes = [
    'border-emerald-200 bg-emerald-50/20',
    'border-amber-200 bg-amber-50/20',
    'border-teal-200 bg-teal-50/20',
    'border-indigo-200 bg-indigo-50/20'
  ];
  return classes[idx % classes.length];
};

const openWhatsApp = (phone: string, name: string) => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Halo ${name}, saya tertarik menggunakan jasa Anda dari rencana tani di AgriBuddy.`)}`;
  window.open(url, '_blank');
};

watch(currentUserId, () => {
  loadFarmlands();
});

onMounted(async () => {
  await loadFarmlands();
  if (farmlands.value.length === 0) {
    await runCalculation();
  }
});
</script>
