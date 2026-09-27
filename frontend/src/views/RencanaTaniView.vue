<template>
  <div class="space-y-6 pb-20 md:pb-8">
    <!-- Header Banner -->
    <div class="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-md relative overflow-hidden">
      <div class="relative z-10 space-y-2 max-w-3xl">
        <div class="inline-flex items-center gap-1.5 bg-emerald-400/20 text-emerald-200 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-400/30">
          <Sparkles :size="14" /> Modul Usahatani Cerdas
        </div>
        <h2 class="text-2xl md:text-3xl font-black tracking-tight leading-tight">
          Rencana Tanam & Kontrol Modal Usahatani
        </h2>
        <p class="text-xs md:text-sm text-emerald-100/90 leading-relaxed font-medium">
          Rancang estimasi anggaran biaya (RAB) pra-tanam secara presisi, lalu pantau eksekusi 5 fase budidaya dan kendalikan pengeluaran modal riil di lapangan.
        </p>
      </div>
      <!-- Background icon decoration -->
      <div class="absolute -right-4 -bottom-6 text-emerald-700/20 select-none pointer-events-none text-9xl md:text-[140px] font-black">
        🌾
      </div>
    </div>

    <!-- 2 TOP-LEVEL MAIN TABS: 1. Rencana Tanam & 2. Kontrol Tanam & Modal -->
    <div class="flex p-1.5 bg-slate-200/90 rounded-2xl gap-2 font-black text-xs md:text-sm shadow-2xs">
      <button
        @click="setTopTab('rencana')"
        type="button"
        class="flex-1 py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer select-none"
        :class="topTab === 'rencana' 
          ? 'bg-white text-emerald-800 shadow-sm border border-slate-200 font-black' 
          : 'text-slate-600 hover:text-slate-900 font-bold'"
      >
        <Calculator :size="17" />
        <span>1. Rencana Tanam</span>
      </button>
      <button
        @click="setTopTab('kontrol')"
        type="button"
        class="flex-1 py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer select-none"
        :class="topTab === 'kontrol' 
          ? 'bg-white text-emerald-800 shadow-sm border border-slate-200 font-black' 
          : 'text-slate-600 hover:text-slate-900 font-bold'"
      >
        <Scale :size="17" />
        <span>2. Kontrol Tanam & Modal</span>
      </button>
    </div>

    <!-- ==================== TAB 1: RENCANA TANAM (PERENCANAAN PRA-TANAM) ==================== -->
    <div v-if="topTab === 'rencana'" class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Left Column (8 cols): Form Parameter & RAB Results -->
      <div class="lg:col-span-8 space-y-6">
        <!-- Form Input Parameter Lahan & Cuaca -->
        <div class="bg-white border border-slate-200/90 rounded-3xl p-5 md:p-6 shadow-xs space-y-4">
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 class="text-sm md:text-base font-black text-slate-800 flex items-center gap-2">
              <Calculator :size="18" class="text-emerald-600" /> Parameter Lahan Pertanian
            </h3>
            <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
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
                v-for="chip in [0.25, 0.5, 0.8, 1.0, 1.2, 1.5, 2.0]"
                :key="chip"
                @click="form.land_size_ha = chip"
                type="button"
                class="px-2.5 py-1 text-xs font-bold rounded-xl border transition-all active:scale-95 cursor-pointer"
                :class="form.land_size_ha === chip 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
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
                class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 bg-white cursor-pointer"
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
                class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 bg-white cursor-pointer"
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
                class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 bg-white cursor-pointer"
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
            class="w-full btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm py-3 rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60 cursor-pointer"
          >
            <Sparkles v-if="!isLoading" :size="16" />
            <Loader2 v-else :size="16" class="animate-spin" />
            <span>{{ isLoading ? 'AI Sedang Mengalkulasi Lahan...' : 'Kalkulasi Rencana Tanam dengan AI' }}</span>
          </button>
        </div>

        <!-- Plan Output (RAB & Jasa Mitra) -->
        <div v-if="plan" class="space-y-4">
          <!-- Switcher Detail Plan -->
          <div class="flex p-1 bg-slate-200/80 rounded-2xl gap-1 text-xs font-black">
            <button
              @click="activePlanTab = 'rab'"
              type="button"
              class="flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              :class="activePlanTab === 'rab' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-600 hover:text-slate-800'"
            >
              <Coins :size="14" /> Rincian RAB ({{ plan.budget_items.length }} Item)
            </button>
            <button
              @click="activePlanTab = 'mitra'"
              type="button"
              class="flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              :class="activePlanTab === 'mitra' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-600 hover:text-slate-800'"
            >
              <Users2 :size="14" /> Jasa Mitra Ekosistem
            </button>
          </div>

          <!-- TAB SUB 1: Rincian Anggaran Biaya (RAB) -->
          <div v-if="activePlanTab === 'rab'" class="space-y-3">
            <div class="flex items-center justify-between text-xs text-slate-600 px-1 font-bold">
              <span>Alokasi Biaya Operasional per Hektar</span>
              <span class="text-emerald-700">Total Plafon: Rp {{ plan.financial_summary.total_budget.toLocaleString('id-ID') }}</span>
            </div>

            <div
              v-for="item in plan.budget_items"
              :key="item.id"
              class="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2 hover:border-emerald-300 transition-all"
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
                  class="text-[10px] font-black bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-2.5 py-1.5 rounded-lg active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <MessageSquare :size="12" /> Hubungi
                </button>
              </div>
            </div>
          </div>

          <!-- TAB SUB 2: Rekomendasi Jasa Ekosistem AgriBuddy -->
          <div v-if="activePlanTab === 'mitra'" class="space-y-3">
            <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 leading-relaxed font-medium">
              <strong class="font-black">Semua kebutuhan rencana tanam Anda tersedia di Ekosistem Sukamaju:</strong> Hubungi mitra penyedia jasa olah tanah, pengairan, kios pupuk, atau pengepul hasil panen secara langsung via WhatsApp.
            </div>

            <div
              v-for="(rec, rIdx) in plan.ecosystem_recommendations"
              :key="rIdx"
              class="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between hover:border-emerald-300 transition-all"
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
                class="btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-3 py-2 rounded-xl shadow-xs active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Phone :size="13" /> Hubungi
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column (4 cols): Multi-Lahan, Proyeksi RAB, Kolaborator, Cuaca -->
      <div class="lg:col-span-4 space-y-6">
        <!-- KELOLA PETAK SAWAH SAYA -->
        <div class="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-3.5">
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
              class="btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-1.5 px-3 rounded-xl shadow-xs active:scale-95 flex items-center gap-1 transition-all cursor-pointer"
            >
              <PlusCircle :size="13" /> Tambah Sawah
            </button>
          </div>

          <!-- List Sawah Cards Vertikal -->
          <div class="space-y-2">
            <button
              v-for="farm in farmlands"
              :key="farm.id"
              @click="selectFarmland(farm)"
              class="w-full p-3 rounded-2xl transition-all flex items-center justify-between border active:scale-98 text-left cursor-pointer"
              :class="activeFarmId === farm.id
                ? 'bg-emerald-50/70 border-emerald-500 shadow-xs ring-2 ring-emerald-400/30'
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

        <!-- Proyeksi Finansial Dashboard (RAB) -->
        <div v-if="plan" class="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-5 shadow-sm space-y-4">
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

        <!-- PANEL KOLABORATOR & BAGI HASIL -->
        <div v-if="activeFarm" class="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-3.5">
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
              class="text-xs font-black text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-xl border border-emerald-200 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
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
        <div v-if="plan" class="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/90 rounded-3xl p-5 shadow-xs space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <CloudSun :size="16" class="text-amber-600" /> Analisis Cuaca & Agronomi AI
            </span>
            <span class="text-[10px] font-extrabold bg-amber-200/80 text-amber-900 px-2.5 py-0.5 rounded-full">
              {{ plan.weather_condition.season }}
            </span>
          </div>

          <div class="flex items-center gap-2 text-[11px] text-amber-900 font-extrabold bg-amber-100/70 px-3 py-2 rounded-xl border border-amber-200/60">
            <MapPin :size="14" class="text-amber-700 shrink-0" />
            <div class="truncate">
              <span>Lokasi: <strong>{{ plan.location }}</strong></span>
              <span class="text-[10px] font-mono text-amber-800 font-bold ml-1.5">({{ plan.latitude ? plan.latitude.toFixed(4) : '-7.2504' }}, {{ plan.longitude ? plan.longitude.toFixed(4) : '112.7512' }})</span>
            </div>
          </div>

          <p class="text-xs text-amber-900 leading-relaxed font-medium">
            {{ plan.weather_condition.note }}
          </p>
          <div class="flex items-center gap-3 pt-2 text-[11px] text-amber-800 font-bold border-t border-amber-200/60">
            <span>Suhu Rata-rata: {{ plan.weather_condition.temp_celsius }}°C</span>
            <span>•</span>
            <span>Peluang Hujan: {{ plan.weather_condition.rain_probability }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== TAB 2: KONTROL TANAM & MODAL (DUAL CONTROL: PROSES & KEUANGAN) ==================== -->
    <div v-else-if="topTab === 'kontrol'" class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Left Column (8 cols): Cockpit Modal, 5 Fase Interaktif (Dual Control) -->
      <div class="lg:col-span-8 space-y-6">
        
        <!-- Header Identitas Petak yang Sedang Dikontrol -->
        <div class="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center p-2.5 shrink-0 shadow-xs border border-emerald-400/30">
              <img src="/logo/logo-white-icon.svg" class="w-full h-full object-contain" alt="Farmland" />
            </div>
            <div>
              <span class="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">Petak Sawah yang Sedang Dikontrol:</span>
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="text-base font-black text-slate-800">{{ activeFarm?.name }}</h3>
                <span class="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase border border-emerald-200">
                  {{ activeFarm?.commodity }}
                </span>
              </div>
              <p class="text-xs text-slate-500 font-semibold mt-0.5">
                📍 {{ activeFarm?.location }} • 📐 {{ activeFarm?.land_size_ha }} Ha • 💧 {{ activeFarm?.water_source }}
              </p>
            </div>
          </div>
          <!-- Farmland Switcher Dropdown -->
          <div class="shrink-0 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <label class="text-[9px] font-black uppercase text-slate-400 block px-1">Ganti Petak Sawah:</label>
            <select
              v-model="activeFarmId"
              @change="onActiveFarmChanged"
              class="bg-transparent text-slate-800 text-xs font-black px-1 py-1 focus:outline-none cursor-pointer"
            >
              <option v-for="f in farmlands" :key="f.id" :value="f.id">
                {{ f.name }} ({{ f.land_size_ha }} Ha)
              </option>
            </select>
          </div>
        </div>

        <!-- Financial & Progress Cockpit (Neraca Kendali Modal & Siklus Budidaya) -->
        <div class="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-6 shadow-sm space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-800/80 pb-3">
            <div class="flex items-center gap-2">
              <Scale :size="18" class="text-emerald-400" />
              <h4 class="text-sm font-black text-white">Neraca Kendali Modal & Siklus Budidaya</h4>
            </div>
            <button
              @click="openAddExpenseModal()"
              class="text-xs font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3.5 py-1.5 rounded-xl active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-2xs"
            >
              <PlusCircle :size="14" />
              <span>+ Catat Pengeluaran Baru</span>
            </button>
          </div>

          <!-- 3 Metrics Columns -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 space-y-1">
              <span class="text-[10px] font-bold text-emerald-200 uppercase tracking-wider block">Plafon Anggaran RAB AI</span>
              <span class="text-lg md:text-xl font-black text-white block">Rp {{ totalBudgetFormatted }}</span>
              <span class="text-[10px] text-emerald-300 font-semibold block">Dasar hitung {{ activeFarm?.land_size_ha }} Ha</span>
            </div>
            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 space-y-1">
              <span class="text-[10px] font-bold text-emerald-200 uppercase tracking-wider block">Total Modal Terpakai</span>
              <span class="text-lg md:text-xl font-black text-emerald-300 block">Rp {{ totalSpentFormatted }}</span>
              <span class="text-[10px] text-emerald-200 font-semibold block">{{ activeFarm?.capital_expenses?.length || 0 }} Transaksi di database</span>
            </div>
            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 space-y-1">
              <span class="text-[10px] font-bold text-emerald-200 uppercase tracking-wider block">Sisa Modal Tersedia</span>
              <span class="text-lg md:text-xl font-black text-amber-300 block">Rp {{ remainingBudgetFormatted }}</span>
              <span class="text-[10px] text-slate-300 font-semibold block">{{ budgetSpentPercent }}% serapan anggaran</span>
            </div>
          </div>

          <!-- Progress Bar Serapan Modal -->
          <div class="space-y-1.5 pt-1">
            <div class="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-white/10">
              <div
                class="h-full rounded-full transition-all duration-700"
                :class="budgetSpentPercent > 90 ? 'bg-amber-400' : 'bg-emerald-400'"
                :style="{ width: `${budgetSpentPercent}%` }"
              ></div>
            </div>
            <div class="flex justify-between text-[10px] font-semibold text-emerald-200">
              <span>Status Arus Kas: <strong :class="budgetSpentPercent > 90 ? 'text-amber-300' : 'text-emerald-300'">{{ budgetStatusLabel }}</strong></span>
              <span>Progres Siklus: {{ completedPhasesCount }} dari 5 Fase Selesai</span>
            </div>
          </div>
        </div>

        <!-- SELURUH 5 FASE BUDIDAYA (DUAL CONTROL: PROSES DI KIRI, MODAL DI KANAN) -->
        <div class="space-y-4">
          <div class="flex items-center justify-between px-1">
            <div>
              <h3 class="text-sm font-black text-slate-800 flex items-center gap-2">
                <CalendarCheck :size="16" class="text-emerald-600" />
                Lembar Kendali 5 Fase Budidaya Lapangan
              </h3>
              <p class="text-[11px] text-slate-500">Kendalikan aksi lapangan harian dan realisasi pengeluaran modal di setiap tahap</p>
            </div>
            <span class="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {{ progressPercentage }}% Tuntas
            </span>
          </div>

          <!-- Loop 5 Phases -->
          <div
            v-for="phase in (plan?.timeline_phases || [])"
            :key="phase.step_no"
            class="bg-white border rounded-3xl p-5 shadow-xs space-y-4 transition-all"
            :class="phase.status === 'SELESAI' 
              ? 'border-emerald-300 bg-emerald-50/15' 
              : phase.status === 'SEDANG_BERJALAN' 
                ? 'border-amber-300 ring-2 ring-amber-100 shadow-sm' 
                : 'border-slate-200'"
          >
            <!-- Phase Header -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div class="flex items-center gap-3">
                <span
                  class="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0"
                  :class="phase.status === 'SELESAI' 
                    ? 'bg-emerald-600 text-white' 
                    : phase.status === 'SEDANG_BERJALAN' 
                      ? 'bg-amber-500 text-white animate-pulse' 
                      : 'bg-slate-200 text-slate-600'"
                >
                  {{ phase.status === 'SELESAI' ? '✓' : phase.step_no }}
                </span>
                <div>
                  <h4 class="text-sm font-black text-slate-800">{{ phase.name }}</h4>
                  <div class="text-[10px] font-bold text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <Clock :size="11" /> {{ phase.day_range }} • Durasi {{ phase.duration_days }} hari
                  </div>
                </div>
              </div>

              <!-- Status Dropdown Selector -->
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold text-slate-400">Status Fase:</span>
                <select
                  v-model="phase.status"
                  @change="saveStepUpdate(phase)"
                  class="text-xs font-black px-3 py-1.5 rounded-xl border focus:outline-none transition-all cursor-pointer"
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
            </div>

            <!-- DUAL CONTROL GRID: PROSES (KIRI) vs MODAL (KANAN) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              
              <!-- KOLOM KIRI: KONTROL PROSES & CHECKLIST -->
              <div class="space-y-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                <div class="flex items-center justify-between pb-1 border-b border-slate-200/60">
                  <span class="text-xs font-black text-slate-700 flex items-center gap-1.5">
                    <CheckSquare :size="14" class="text-emerald-600" /> Kontrol Proses Lapangan
                  </span>
                  <span class="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                    {{ getPhaseDoneTasksCount(phase.step_no) }} / {{ phase.tasks.length }} Selesai
                  </span>
                </div>

                <!-- Checklist Items -->
                <div class="space-y-2">
                  <div
                    v-for="(task, tIdx) in phase.tasks"
                    :key="tIdx"
                    @click="togglePhaseTask(phase.step_no, tIdx)"
                    class="p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 select-none"
                    :class="isPhaseTaskDone(phase.step_no, tIdx) 
                      ? 'bg-emerald-50/80 border-emerald-200 text-slate-500 line-through' 
                      : 'bg-white hover:border-emerald-300 border-slate-200 text-slate-800 shadow-2xs'"
                  >
                    <div
                      class="w-4 h-4 rounded-md border mt-0.5 flex items-center justify-center shrink-0 transition-colors"
                      :class="isPhaseTaskDone(phase.step_no, tIdx) ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'"
                    >
                      <Check v-if="isPhaseTaskDone(phase.step_no, tIdx)" :size="10" />
                    </div>
                    <span class="text-xs font-semibold leading-tight flex-1">{{ task }}</span>
                  </div>
                </div>

                <!-- Tips Cerdas AI Agronomis -->
                <div class="bg-amber-50/80 border border-amber-200/70 rounded-xl p-2.5 text-[11px] text-amber-950 flex items-start gap-2 mt-2 leading-relaxed">
                  <Sparkles :size="14" class="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong class="font-extrabold text-amber-900">Tips AI: </strong>
                    <span>{{ phase.ai_tips }}</span>
                  </div>
                </div>
              </div>

              <!-- KOLOM KANAN: KONTROL MODAL & REALISASI KEUANGAN -->
              <div class="space-y-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                <div class="flex items-center justify-between pb-1 border-b border-slate-200/60">
                  <span class="text-xs font-black text-slate-700 flex items-center gap-1.5">
                    <Receipt :size="14" class="text-emerald-600" /> Kontrol Modal Fase Ini
                  </span>
                  <button
                    @click="openAddExpenseModal(getPhaseCategory(phase.step_no), `Biaya ${phase.name}`)"
                    class="text-[10px] font-black text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-0.5 rounded-full transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <PlusCircle :size="11" /> Catat Biaya
                  </button>
                </div>

                <!-- Plafon vs Realisasi Aktual -->
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div class="p-2.5 rounded-xl bg-white border border-slate-200">
                    <span class="text-[9px] font-bold text-slate-400 uppercase block">Plafon RAB AI</span>
                    <span class="font-black text-slate-800 text-sm">Rp {{ phase.allocated_budget.toLocaleString('id-ID') }}</span>
                  </div>
                  <div class="p-2.5 rounded-xl bg-white border border-slate-200">
                    <span class="text-[9px] font-bold text-slate-400 uppercase block">Realisasi Aktual</span>
                    <span class="font-black text-emerald-700 text-sm">Rp {{ getActualCostForPhase(phase).toLocaleString('id-ID') }}</span>
                  </div>
                </div>

                <!-- Transaksi Riil Tercatat untuk Fase Ini -->
                <div class="space-y-1.5 pt-1">
                  <span class="text-[10px] font-extrabold uppercase text-slate-400 block">Riwayat Transaksi Fase:</span>
                  <div v-if="getExpensesForPhase(phase.step_no).length > 0" class="space-y-1 max-h-32 overflow-y-auto pr-1">
                    <div
                      v-for="exp in getExpensesForPhase(phase.step_no)"
                      :key="exp.id"
                      class="flex items-center justify-between text-[11px] p-2 rounded-xl bg-white border border-slate-100"
                    >
                      <div class="truncate pr-2">
                        <p class="font-bold text-slate-800 truncate">{{ exp.item_name }}</p>
                        <p class="text-[9px] text-slate-400">{{ exp.date }}</p>
                      </div>
                      <span class="font-black text-slate-800 shrink-0">Rp {{ (exp.amount || 0).toLocaleString('id-ID') }}</span>
                    </div>
                  </div>
                  <div v-else class="text-center py-2.5 bg-white rounded-xl border border-dashed border-slate-200 text-[10px] text-slate-400">
                    Belum ada transaksi khusus fase ini.
                  </div>
                </div>

                <!-- Rekomendasi Jasa Ekosistem untuk Fase ini -->
                <div v-if="getPhasePartner(phase.step_no)" class="pt-1">
                  <div class="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60 flex items-center justify-between text-xs">
                    <div class="truncate pr-2">
                      <span class="text-[9px] font-extrabold text-emerald-800 uppercase block">Mitra Terkait Fase:</span>
                      <p class="font-black text-slate-800 text-[11px] truncate">{{ getPhasePartner(phase.step_no).name }}</p>
                    </div>
                    <button
                      @click="openWhatsApp(getPhasePartner(phase.step_no).phone, getPhasePartner(phase.step_no).name)"
                      class="text-[10px] font-black bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-lg shrink-0 flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                    >
                      <Phone :size="11" /> Hubungi
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>

      <!-- Right Column (4 cols): Multi-Lahan, Buku Modal Riwayat Lengkap, Kolaborator -->
      <div class="lg:col-span-4 space-y-6">
        <!-- KELOLA PETAK SAWAH SAYA -->
        <div class="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-3.5">
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
              class="btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-1.5 px-3 rounded-xl shadow-xs active:scale-95 flex items-center gap-1 transition-all cursor-pointer"
            >
              <PlusCircle :size="13" /> Tambah Sawah
            </button>
          </div>

          <!-- List Sawah Cards Vertikal -->
          <div class="space-y-2">
            <button
              v-for="farm in farmlands"
              :key="farm.id"
              @click="selectFarmland(farm)"
              class="w-full p-3 rounded-2xl transition-all flex items-center justify-between border active:scale-98 text-left cursor-pointer"
              :class="activeFarmId === farm.id
                ? 'bg-emerald-50/70 border-emerald-500 shadow-xs ring-2 ring-emerald-400/30'
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

        <!-- BUKU MODAL LAHAN (RIWAYAT TRANSAKSI LENGKAP DARI DATABASE) -->
        <div class="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-3.5">
          <div class="flex items-center justify-between pb-1 border-b border-slate-100">
            <div>
              <div class="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                <Receipt :size="12" /> Buku Kas Lahan
              </div>
              <h3 class="text-xs font-black text-slate-800 mt-1">
                Riwayat Modal: {{ activeFarm?.name }}
              </h3>
            </div>
            <button
              @click="openAddExpenseModal()"
              class="text-xs font-black text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-xl border border-emerald-200 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
            >
              <PlusCircle :size="12" /> Catat
            </button>
          </div>

          <div v-if="!activeFarm?.capital_expenses || activeFarm.capital_expenses.length === 0" class="text-center py-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-1">
            <span class="text-2xl">📒</span>
            <p class="text-xs font-bold text-slate-700">Belum Ada Transaksi Tercatat</p>
            <p class="text-[10px] text-slate-400">Pengeluaran lapangan atau belanja katalog akan tampil di sini.</p>
          </div>

          <div v-else class="space-y-2 max-h-80 overflow-y-auto pr-1">
            <div
              v-for="exp in activeFarm.capital_expenses"
              :key="exp.id"
              class="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 shadow-2xs space-y-1 hover:border-emerald-300 transition-all"
            >
              <div class="flex items-start justify-between gap-2">
                <div class="truncate">
                  <div class="flex items-center gap-1.5">
                    <span class="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-md"
                      :class="exp.source === 'MARKETPLACE' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-200 text-slate-700'"
                    >
                      {{ exp.source === 'MARKETPLACE' ? '🛒 Katalog' : '📝 Manual' }}
                    </span>
                    <span class="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-md">
                      {{ exp.category }}
                    </span>
                  </div>
                  <h4 class="text-xs font-bold text-slate-800 mt-1 truncate">{{ exp.item_name }}</h4>
                </div>
                <div class="text-right shrink-0">
                  <span class="text-xs font-black text-emerald-700">
                    Rp {{ (exp.amount || 0).toLocaleString('id-ID') }}
                  </span>
                  <span class="text-[9px] text-slate-400 block">{{ exp.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- PANEL KOLABORATOR & BAGI HASIL -->
        <div v-if="activeFarm" class="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-3.5">
          <div class="flex items-center justify-between pb-1 border-b border-slate-100">
            <div>
              <div class="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                <Users2 :size="12" /> Kemitraan Usahatani
              </div>
              <h3 class="text-xs font-black text-slate-800 mt-1">
                Pengelola Lahan
              </h3>
            </div>
            <button
              @click="openManageCollabModal"
              class="text-xs font-black text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-xl border border-emerald-200 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
            >
              <UserPlus :size="12" /> Kelola
            </button>
          </div>

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
              </div>
              <div class="text-right">
                <span class="text-xs font-black text-slate-800">{{ collab.share_percentage }}%</span>
                <span class="text-[8px] text-slate-400 font-bold block">Bagi Hasil</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- MODAL 1: TAMBAH SAWAH BARU -->
    <div v-if="isAddFarmModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div class="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto relative">
        <button
          @click="isAddFarmModalOpen = false"
          class="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-500 p-1.5 rounded-full transition-all cursor-pointer"
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
              class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 bg-white cursor-pointer"
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
              class="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="isSubmittingFarm"
              class="flex-1 btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 rounded-xl shadow-md active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-60 cursor-pointer"
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
          class="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-500 p-1.5 rounded-full transition-all cursor-pointer"
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
        <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
          <div
            v-for="collab in activeFarm.collaborators"
            :key="collab.id"
            class="p-2.5 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs"
          >
            <div>
              <p class="font-bold text-slate-800">{{ collab.name }}</p>
              <p class="text-[10px] text-slate-500">{{ collab.role }}</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-lg">{{ collab.share_percentage }}%</span>
              <button
                v-if="activeFarm.collaborators.length > 1"
                @click="handleRemoveCollaborator(collab.id)"
                class="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                title="Hapus kolaborator"
              >
                <Trash2 :size="13" />
              </button>
            </div>
          </div>
        </div>

        <form @submit.prevent="handleAddCollaborator" class="space-y-2.5 pt-2 border-t border-slate-100">
          <span class="text-[10px] font-bold text-slate-400 uppercase block">+ Tambah Mitra / Penggarap</span>
          <div>
            <input
              v-model="newCollabForm.name"
              type="text"
              required
              placeholder="Nama Lengkap Mitra"
              class="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <input
              v-model="newCollabForm.role"
              type="text"
              required
              placeholder="Peran (misal: Penggarap)"
              class="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
            />
            <div class="relative">
              <input
                v-model.number="newCollabForm.share_percentage"
                type="number"
                min="1"
                max="100"
                required
                class="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
              />
              <span class="absolute inset-y-0 right-0 pr-3 flex items-center text-xs font-bold text-slate-400">%</span>
            </div>
          </div>

          <button
            type="submit"
            :disabled="isSubmittingCollab"
            class="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer disabled:opacity-60"
          >
            <Loader2 v-if="isSubmittingCollab" :size="13" class="animate-spin" />
            <span v-else>+ Tambah Kolaborator</span>
          </button>
        </form>
      </div>
    </div>

    <!-- MODAL 3: CATAT MODAL MANUAL -->
    <div v-if="isAddExpenseModalOpen && activeFarm" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div class="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto relative">
        <button
          @click="isAddExpenseModalOpen = false"
          class="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-500 p-1.5 rounded-full transition-all cursor-pointer"
        >
          ✕
        </button>

        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
            📝 Buku Modal Lapangan
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
              class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 bg-white cursor-pointer"
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
              class="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="isSubmittingExpense"
              class="flex-1 btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 rounded-xl shadow-md active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-60 cursor-pointer"
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
import { useRoute, useRouter } from 'vue-router';
import { api, FarmPlan, TimelinePhase, Farmland, Collaborator, CapitalExpense } from '@/services/api';
import { useUserState } from '@/services/userState';
import FarmlandMapPicker from '@/components/FarmlandMapPicker.vue';
import { 
  Sparkles, Calculator, CloudSun, Coins, CalendarCheck, 
  Users2, MessageSquare, Clock, Phone, Loader2, MapPin,
  Layers, UserPlus, PlusCircle, Receipt, Trash2, Check,
  Scale, CheckSquare
} from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const { currentUserId, currentPersona } = useUserState();

// Top-Level Tab State
const topTab = ref<'rencana' | 'kontrol'>('rencana');
const activePlanTab = ref<'rab' | 'mitra'>('rab');

const setTopTab = (tab: 'rencana' | 'kontrol') => {
  topTab.value = tab;
  router.replace({ query: { ...route.query, tab } });
};

const isLoading = ref(false);
const plan = ref<FarmPlan | null>(null);

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

// --- DUAL CONTROL (TAB 2: KONTROL TANAM & MODAL) LOGIC ---
const checkedTasks = ref<Record<string, boolean>>({});

const getTaskKey = (stepNo: number, taskIdx: number) => {
  return `${activeFarmId.value}_${stepNo}_${taskIdx}`;
};

const isPhaseTaskDone = (stepNo: number, taskIdx: number) => {
  const key = getTaskKey(stepNo, taskIdx);
  if (checkedTasks.value[key] !== undefined) {
    return checkedTasks.value[key];
  }
  const phase = plan.value?.timeline_phases.find(p => p.step_no === stepNo);
  return phase?.status === 'SELESAI';
};

const togglePhaseTask = (stepNo: number, taskIdx: number) => {
  const key = getTaskKey(stepNo, taskIdx);
  checkedTasks.value[key] = !isPhaseTaskDone(stepNo, taskIdx);
  saveCheckedTasks();
};

const getPhaseDoneTasksCount = (stepNo: number) => {
  const phase = plan.value?.timeline_phases.find(p => p.step_no === stepNo);
  if (!phase || !phase.tasks) return 0;
  return phase.tasks.filter((_, idx) => isPhaseTaskDone(stepNo, idx)).length;
};

const loadCheckedTasks = () => {
  try {
    const raw = localStorage.getItem(`agribuddy_phase_tasks_${activeFarmId.value}`);
    if (raw) {
      checkedTasks.value = JSON.parse(raw);
    }
  } catch (e) {
    // ignore
  }
};

const saveCheckedTasks = () => {
  try {
    localStorage.setItem(`agribuddy_phase_tasks_${activeFarmId.value}`, JSON.stringify(checkedTasks.value));
  } catch (e) {
    // ignore
  }
};

// Financial Cockpit for Tab 2
const totalBudgetFormatted = computed(() => {
  const b = plan.value?.financial_summary?.total_budget || Math.round((activeFarm.value?.land_size_ha || 1) * 6400000);
  return b.toLocaleString('id-ID');
});

const totalSpentValue = computed(() => {
  return activeFarm.value?.capital_expenses?.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0) || 0;
});

const totalSpentFormatted = computed(() => totalSpentValue.value.toLocaleString('id-ID'));

const remainingBudgetFormatted = computed(() => {
  const b = plan.value?.financial_summary?.total_budget || Math.round((activeFarm.value?.land_size_ha || 1) * 6400000);
  return Math.max(0, b - totalSpentValue.value).toLocaleString('id-ID');
});

const budgetSpentPercent = computed(() => {
  const b = plan.value?.financial_summary?.total_budget || Math.round((activeFarm.value?.land_size_ha || 1) * 6400000);
  if (b <= 0) return 0;
  return Math.min(100, Math.round((totalSpentValue.value / b) * 100));
});

const budgetStatusLabel = computed(() => {
  if (budgetSpentPercent.value <= 80) return 'Aman (Terkendali Sesuai Rencana)';
  if (budgetSpentPercent.value <= 100) return 'Waspada (Mendekati Plafon Anggaran)';
  return 'Over-Budget (Melebihi Plafon Rencana)';
});

// Phase Expense Mapping
const getExpensesForPhase = (stepNo: number) => {
  if (!activeFarm.value?.capital_expenses) return [];
  const exps = activeFarm.value.capital_expenses;
  switch (stepNo) {
    case 1:
      return exps.filter(e => e.category === 'OLAH_TANAH');
    case 2:
      return exps.filter(e => e.category === 'BENIH_BIBIT' || (e.category === 'TENAGA_KERJA' && e.item_name.toLowerCase().includes('tanam')));
    case 3:
      return exps.filter(e => e.category === 'PUPUK_NUTRISI' || e.category === 'PENGAIRAN');
    case 4:
      return exps.filter(e => e.category === 'OBAT_HAMA' || e.category === 'PESTISIDA');
    case 5:
      return exps.filter(e => e.category === 'LAINNYA' || e.category === 'PANEN');
    default:
      return [];
  }
};

const getActualCostForPhase = (phase: TimelinePhase) => {
  const exps = getExpensesForPhase(phase.step_no);
  const sum = exps.reduce((acc, e) => acc + (Number(e.amount) || 0), 0);
  return sum > 0 ? sum : (phase.actual_cost || 0);
};

const getPhaseCategory = (stepNo: number) => {
  switch (stepNo) {
    case 1: return 'OLAH_TANAH';
    case 2: return 'BENIH_BIBIT';
    case 3: return 'PUPUK_NUTRISI';
    case 4: return 'OBAT_HAMA';
    case 5: return 'LAINNYA';
    default: return 'OLAH_TANAH';
  }
};

const getPhasePartner = (stepNo: number) => {
  switch (stepNo) {
    case 1: return { name: 'Mas Bambang (Sewa Traktor Kubota)', phone: '081298765432' };
    case 2: return { name: 'Mang Udin (Regu Tanam Padi Legowo)', phone: '087811223344' };
    case 3: return { name: 'Ibu Ratna (Kios Pupuk Subsidi Resmi)', phone: '085712345678' };
    case 4: return { name: 'Ibu Ratna (Kios KPL Pestisida & Obat)', phone: '085712345678' };
    case 5: return { name: 'Bpk. Hendra Jaya (Pengepul Gabah GKP)', phone: '081356789012' };
    default: return null;
  }
};

// --- DATA FETCHING & ACTIONS ---
const loadFarmlands = async () => {
  try {
    const list = await api.getFarmlands(currentUserId.value);
    farmlands.value = list;
    if (list.length > 0) {
      const queryFarmId = (route.query.farm_id as string) || localStorage.getItem('agribuddy_active_farm_id');
      const target = list.find(f => f.id === queryFarmId) || list[0];
      activeFarmId.value = target.id;
      applyFarmToForm(target);
      loadCheckedTasks();
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
  localStorage.setItem('agribuddy_active_farm_id', farm.id);
  applyFarmToForm(farm);
  loadCheckedTasks();
};

const onActiveFarmChanged = () => {
  const farm = farmlands.value.find(f => f.id === activeFarmId.value);
  if (farm) {
    selectFarmland(farm);
  }
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
    selectFarmland(created);
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

const openAddExpenseModal = (category: string = 'OLAH_TANAH', defaultItem: string = '') => {
  manualExpenseForm.value = {
    item_name: defaultItem,
    amount: 150000,
    category: category
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

const contactProvider = (providerName: string) => {
  const url = `https://wa.me/628123456789?text=${encodeURIComponent(`Halo ${providerName}, saya tertarik bermitra untuk saprotan/jasa sesuai rencana tanam AgriBuddy.`)}`;
  window.open(url, '_blank');
};

watch(currentUserId, () => {
  loadFarmlands();
});

onMounted(async () => {
  if (route.query.tab === 'kontrol' || route.query.tab === 'ceklis') {
    topTab.value = 'kontrol';
  }
  await loadFarmlands();
  if (farmlands.value.length === 0) {
    await runCalculation();
  }
});
</script>
