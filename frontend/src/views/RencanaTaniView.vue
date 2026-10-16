<template>
  <PageLayout variant="responsive">
    <!-- ==================== TAB 1: RENCANA TANAM (PERENCANAAN LAHAN BARU - WIZARD STEPPER) ==================== -->
    <div v-if="topTab === 'rencana'" class="space-y-4 sm:space-y-6">
      <!-- Sub-mode Switcher: Rancang Lahan Baru vs Daftar Rencana Tersimpan (Responsive Grid on Mobile) -->
      <div class="flex justify-center w-full px-1">
        <div
          class="grid grid-cols-2 p-1 bg-slate-100/90 rounded-2xl gap-1 border border-slate-200/80 shadow-2xs w-full max-w-sm sm:max-w-md sm:flex sm:w-auto sm:gap-1.5"
        >
          <button
            @click="rencanaSubMode = 'wizard'"
            type="button"
            class="py-2 px-2 sm:px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none text-center"
            :class="
              rencanaSubMode === 'wizard'
                ? 'bg-white text-[#324d1d] shadow-2xs  border border-slate-200/60'
                : 'text-slate-500 hover:text-slate-800 font-semibold'
            "
          >
            <span class="truncate leading-none font-bold">Rancang Baru</span>
          </button>
          <button
            @click="rencanaSubMode = 'saved'"
            type="button"
            class="py-2 px-2 sm:px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none text-center"
            :class="
              rencanaSubMode === 'saved'
                ? 'bg-white text-[#324d1d] shadow-2xs  border border-slate-200/60'
                : 'text-slate-500 hover:text-slate-800 font-semibold'
            "
          >
            <span class="truncate leading-none font-bold">Tersimpan</span>
            <span
              class="text-[10px] px-1.5 py-0.5 rounded-full leading-none shrink-0"
              :class="
                rencanaSubMode === 'saved'
                  ? 'bg-[#99c30c]/20 text-[#324d1d]'
                  : 'bg-slate-200 text-slate-700'
              "
            >
              {{ draftFarmlands.length }}
            </span>
          </button>
        </div>
      </div>

      <!-- ==================== SUB-VIEW: WIZARD STEPPER ==================== -->
      <div v-if="rencanaSubMode === 'wizard'" class="space-y-4 sm:space-y-6">
        <!-- Stepper / Timeline Header -->
        <div
          class="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 shadow-xs max-w-6xl mx-auto"
        >
          <div
            class="flex items-center justify-between relative px-2 sm:px-4 md:px-8"
          >
            <!-- Connecting Line -->
            <div
              class="absolute left-8 right-8 sm:left-12 sm:right-12 top-4 sm:top-5 h-1 bg-slate-200 z-0"
            >
              <div
                class="h-full bg-[#324d1d]/90 transition-all duration-300"
                :style="{
                  width:
                    wizardStep === 1 ? '0%' : wizardStep === 2 ? '50%' : '100%',
                }"
              ></div>
            </div>

            <!-- Step 1: Lokasi & Parameter -->
            <button
              @click="wizardStep = 1"
              type="button"
              class="relative z-10 flex flex-col items-center gap-1 cursor-pointer group"
            >
              <div
                class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-all shadow-2xs"
                :class="
                  wizardStep === 1
                    ? 'bg-[#324d1d]/90 text-white ring-4 ring-[#99c30c]/20 scale-105'
                    : wizardStep > 1
                      ? 'bg-[#324d1d] text-white'
                      : 'bg-white border-2 border-slate-300 text-slate-500'
                "
              >
                <span v-if="wizardStep > 1">✓</span>
                <MapPin v-else :size="14" />
              </div>
              <span
                class="text-[10px] sm:text-[11px] font-bold transition-colors text-center line-clamp-1"
                :class="wizardStep >= 1 ? 'text-[#324d1d]' : 'text-slate-400'"
              >
                1. Lokasi & Lahan
              </span>
            </button>

            <!-- Step 2: RAB AI -->
            <button
              @click="plan ? (wizardStep = 2) : null"
              :disabled="!plan"
              type="button"
              class="relative z-10 flex flex-col items-center gap-1 transition-all"
              :class="
                plan ? 'cursor-pointer group' : 'cursor-not-allowed opacity-50'
              "
            >
              <div
                class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-all shadow-2xs"
                :class="
                  wizardStep === 2
                    ? 'bg-[#324d1d]/90 text-white ring-4 ring-[#99c30c]/20 scale-105'
                    : wizardStep > 2
                      ? 'bg-[#324d1d] text-white'
                      : 'bg-white border-2 border-slate-300 text-slate-500'
                "
              >
                <span v-if="wizardStep > 2">✓</span>
                <Coins v-else :size="14" />
              </div>
              <span
                class="text-[10px] sm:text-[11px] font-bold transition-colors text-center line-clamp-1"
                :class="wizardStep >= 2 ? 'text-[#324d1d]' : 'text-slate-400'"
              >
                2. Estimasi RAB
              </span>
            </button>

            <!-- Step 3: Proyeksi & Mulai -->
            <button
              @click="plan ? (wizardStep = 3) : null"
              :disabled="!plan"
              type="button"
              class="relative z-10 flex flex-col items-center gap-1 transition-all"
              :class="
                plan ? 'cursor-pointer group' : 'cursor-not-allowed opacity-50'
              "
            >
              <div
                class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-all shadow-2xs"
                :class="
                  wizardStep === 3
                    ? 'bg-[#324d1d]/90 text-white ring-4 ring-[#99c30c]/20 scale-105'
                    : 'bg-white border-2 border-slate-300 text-slate-500'
                "
              >
                <Sparkles :size="14" />
              </div>
              <span
                class="text-[10px] sm:text-[11px] font-bold transition-colors text-center line-clamp-1"
                :class="wizardStep === 3 ? 'text-[#324d1d]' : 'text-slate-400'"
              >
                3. Finansial & Mitra
              </span>
            </button>
          </div>
        </div>

        <!-- ==================== WIZARD STEP 1: FORM PARAMETER & LOKASI DI ATAS ==================== -->
        <div
          v-if="wizardStep === 1"
          class="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs space-y-4 max-w-6xl mx-auto"
        >
          <SectionHeader>
            <div>
              <span
                class="text-[10px] font-bold uppercase tracking-wider text-[#324d1d] bg-[#99c30c]/10 px-2 py-0.5 rounded-full"
              >
                Langkah 1: Perencanaan Pra-Tanam
              </span>
              <h3
                class="text-sm md:text-base text-slate-800 mt-1 flex items-center gap-2 text-bold"
              >
                Rencana Petak Lahan Baru
              </h3>
            </div>
          </SectionHeader>

          <!-- 1. FIELD NAMA LAHAN -->
          <div class="space-y-1">
            <label
              class="text-xs font-bold text-slate-700 flex justify-between"
            >
              <span>Nama Rencana / Petak Lahan:</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Contoh: Sawah Blok Cempaka 1, Lahan Sukamaju Baru"
              class="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-semibold text-xs text-slate-800 focus:outline-none focus:border-[#99c30c] bg-[#fff2d9]/50"
            />
          </div>

          <!-- 2. LOKASI SAYA & DETEKSI OTOMATIS AI (TUNGGAL & PROPORSIONAL) -->
          <div
            class="bg-[#fff2d9]/80 border border-slate-200/90 rounded-2xl p-3.5 space-y-3"
          >
            <div
              class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
            >
              <div>
                <div
                  class="flex items-center gap-1.5 text-xs font-bold text-slate-800"
                >
                  <span>Titik Lokasi & Deteksi Cerdas Lahan</span>
                </div>
                <p class="text-[11px] text-slate-500 mt-0.5">
                  Gunakan lokasi saat ini agar sistem otomatis menentukan
                  komoditas, jenis tanah, & sumber air.
                </p>
              </div>

              <!-- Single, proportional GPS Button (No redundancy) -->
              <button
                @click="detectMyLocationAndAutoFillAI"
                :disabled="isDetectingLocation"
                type="button"
                class="bg-[#324d1d]/90 hover:bg-[#324d1d] text-white text-xs font-bold py-1.5 px-3 rounded-lg active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-2xs shrink-0 cursor-pointer disabled:opacity-60"
              >
                <Navigation
                  v-if="!isDetectingLocation"
                  :size="12"
                  class="animate-pulse"
                />
                <Loader2 v-else :size="12" class="animate-spin" />
                <span>{{
                  isDetectingLocation
                    ? "Menganalisis..."
                    : "Gunakan Lokasi Saya"
                }}</span>
              </button>
            </div>

            <!-- Banner Notifikasi Rekomendasi AI -->
            <div
              v-if="aiLocationRecommendationNote"
              class="p-2.5 bg-[#99c30c]/10 border border-[#99c30c]/40 rounded-xl text-xs text-[#324d1d] flex items-start gap-2 animate-in fade-in"
            >
              <div class="text-[11px]">
                <span>{{ aiLocationRecommendationNote }}</span>
              </div>
            </div>

            <!-- Komponen Peta Interaktif (Embedded tanpa header & button dobel) -->
            <div class="pt-0.5">
              <FarmlandMapPicker
                :initialLat="form.latitude"
                :initialLon="form.longitude"
                :initialLabel="form.location"
                :embedded="true"
                :showHeader="false"
                @update:coordinates="onCoordinatesUpdated"
              />
            </div>
          </div>

          <!-- 3. LUAS LAHAN INPUT & QUICK CHIPS -->
          <div class="space-y-1.5">
            <label
              class="text-xs font-bold text-slate-700 flex justify-between"
            >
              <span>Luas Lahan yang Direncanakan:</span>
              <span class="text-[#324d1d] font-extrabold"
                >{{ form.land_size_ha }} Hektar ({{
                  (form.land_size_ha * 10000).toLocaleString()
                }}
                m²)</span
              >
            </label>
            <div class="relative">
              <input
                v-model.number="form.land_size_ha"
                type="number"
                step="0.1"
                min="0.05"
                max="20"
                class="w-full px-4 py-2.5 rounded-2xl border border-slate-300 font-bold text-base text-slate-800 focus:outline-none focus:border-[#99c30c]"
              />
              <span
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-slate-400"
              >
                Hektar
              </span>
            </div>
            <!-- Quick Chips -->
            <div class="flex items-center gap-1.5 pt-1 flex-wrap">
              <button
                v-for="chip in [0.25, 0.5, 0.8, 1.0, 1.2, 1.5, 2.0]"
                :key="chip"
                @click="form.land_size_ha = chip"
                type="button"
                class="px-2.5 py-1 text-xs font-bold rounded-xl border transition-all active:scale-95 cursor-pointer"
                :class="
                  form.land_size_ha === chip
                    ? 'bg-[#324d1d]/90 text-white border-[#324d1d] shadow-xs'
                    : 'bg-[#fff2d9] text-slate-600 border-slate-200 hover:bg-slate-100'
                "
              >
                {{ chip }} Ha
              </button>
            </div>
          </div>

          <!-- 4. KOMODITAS, TANAH, AIR HASIL REKOMENDASI -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <!-- Komoditas -->
            <div>
              <FormLabel> Komoditas Tanam </FormLabel>
              <select
                v-model="form.commodity"
                class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#99c30c] bg-white cursor-pointer"
              >
                <option value="Padi Sawah Inpari 32">
                  Padi Sawah (Inpari 32 Bersertifikat)
                </option>
                <option value="Padi Ciherang">Padi Ciherang Unggul</option>
                <option value="Jagung Hibrida Bisi-18">
                  Jagung Hibrida Bisi-18
                </option>
                <option value="Kedelai Anjasmoro">Kedelai Anjasmoro</option>
              </select>
            </div>

            <!-- Kondisi Tanah -->
            <div>
              <FormLabel> Kondisi Tanah Lahan </FormLabel>
              <select
                v-model="form.soil_type"
                class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#99c30c] bg-white cursor-pointer"
              >
                <option value="Lempung Berliat (Subur)">
                  Lempung Berliat (Subur & Gembur)
                </option>
                <option value="Lempung Berpasir">
                  Lempung Berpasir (Perlu Organik)
                </option>
                <option value="Aluvial Sawah Teknis">
                  Aluvial Sawah Irigasi Teknis
                </option>
                <option value="Tanah Masam / Gambut">
                  Tanah Masam (Perlu Dolomit)
                </option>
              </select>
            </div>

            <!-- Sumber Air -->
            <div>
              <FormLabel> Ketersediaan / Sumber Air </FormLabel>
              <select
                v-model="form.water_source"
                class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#99c30c] bg-white cursor-pointer"
              >
                <option value="Irigasi Teknis Bendungan">
                  Irigasi Teknis Bendungan (P3A)
                </option>
                <option value="Sumur Pompa Diesel / Bor">
                  Sumur Pompa Diesel / Bor (Alkon)
                </option>
                <option value="Sawah Tadah Hujan">Sawah Tadah Hujan</option>
              </select>
            </div>
          </div>

          <!-- 5. TOMBOL SUBMIT AI & MAJU KE STEP 2 -->
          <div
            class="pt-3 border-t border-slate-100 flex items-center justify-end"
          >
            <button
              @click="runCalculation"
              :disabled="isLoading"
              class="w-full sm:w-auto bg-[#324d1d]/90 hover:bg-[#324d1d] text-white font-bold text-xs py-2 px-4 rounded-xl shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 disabled:opacity-60 cursor-pointer"
            >
              <Sparkle v-if="!isLoading" :size="14" />
              <Loader2 v-else :size="14" class="animate-spin" />
              <span>{{
                isLoading
                  ? "Sedang mengalkulasi..."
                  : "Kalkulasi Sekarang (Lanjut ke RAB)"
              }}</span>
            </button>
          </div>
        </div>

        <!-- ==================== WIZARD STEP 2: RINCIAN RAB AI ==================== -->
        <div
          v-else-if="wizardStep === 2 && plan"
          class="space-y-6 max-w-6xl mx-auto"
        >
          <!-- Banner Ringkasan Identitas Lahan -->
          <div
            class="bg-gradient-to-r from-[#324d1d] to-[#324d1d] text-white p-5 rounded-3xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div class="space-y-1">
              <span class="text-[10px] uppercase tracking-wider text-[#99c30c]"
                >Rencana Terkalkulasi</span
              >
              <h3 class="text-lg text-bold">
                {{ form.name || "Sawah Blok Baru" }}
              </h3>
              <p class="text-xs text-slate-300">
                {{ plan.land_size_ha }} Ha • {{ plan.commodity }} •
                {{ plan.location }}
              </p>
            </div>
            <div
              class="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-right self-start sm:self-auto"
            >
              <span class="text-[10px] text-[#99c30c] font-bold uppercase block"
                >Total Plafon RAB</span
              >
              <span class="text-xl text-[#fff] font-bold"
                >Rp
                {{
                  plan.financial_summary.total_budget.toLocaleString("id-ID")
                }}</span
              >
            </div>
          </div>

          <!-- Rincian Item Anggaran RAB -->
          <SectionCard>
            <div
              class="flex items-center justify-between pb-3 border-b border-slate-100"
            >
              <div>
                <h4
                  class="text-sm md:text-base text-slate-800 flex items-center gap-2 font-bold"
                >
                  Rincian Anggaran Biaya Usahatani (RAB)
                </h4>
                <p class="text-xs text-slate-500">
                  Estimasi saprotan, traktor, bibit, pupuk, dan tenaga kerja per
                  fase budidaya
                </p>
              </div>
              <span
                class="text-xs text-[#324d1d] bg-[#99c30c]/10 px-3 py-1 rounded-full border border-[#99c30c]/40"
              >
                {{ plan.budget_items.length }} Item Biaya
              </span>
            </div>

            <!-- List Item RAB -->
            <div class="space-y-3">
              <div
                v-for="item in plan.budget_items"
                :key="item.id"
                class="bg-[#fff2d9]/70 border border-slate-200 rounded-2xl p-4 space-y-2 hover:border-[#324d1d] transition-all"
              >
                <div class="flex items-start justify-between">
                  <div>
                    <span
                      class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider"
                      :class="getCategoryBadgeClass(item.category)"
                    >
                      {{ item.phase }}
                    </span>
                    <h4 class="text-sm font-extrabold text-slate-800 mt-1">
                      {{ item.name }}
                    </h4>
                  </div>
                  <div class="text-right">
                    <span class="text-sm text-[#324d1d] font-bold">
                      Rp {{ item.total_price.toLocaleString("id-ID") }}
                    </span>
                    <div class="text-[10px] text-slate-500 font-semibold">
                      {{ item.quantity }} {{ item.unit }} @ Rp
                      {{ item.unit_price.toLocaleString("id-ID") }}
                    </div>
                  </div>
                </div>

                <p class="text-xs text-slate-600 leading-snug">
                  {{ item.notes }}
                </p>

                <!-- Rekomendasi Mitra Penyedia -->
                <div
                  class="bg-white border border-slate-100 rounded-xl p-2.5 flex items-center justify-between mt-2 shadow-2xs"
                >
                  <div class="flex items-center gap-2">
                    <div>
                      <div class="text-[10px] text-slate-500 font-bold">
                        Rekomendasi Mitra:
                      </div>
                      <div class="text-xs text-slate-800">
                        {{ item.recommended_provider }}
                      </div>
                    </div>
                  </div>
                  <button
                    @click="contactProvider(item.recommended_provider)"
                    class="text-[10px] bg-[#99c30c]/20 hover:bg-[#99c30c]/30 text-[#324d1d] px-2.5 py-1.5 rounded-lg active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <MessageSquare :size="12" /> Hubungi
                  </button>
                </div>
              </div>
            </div>

            <!-- Stepper Navigation Buttons (Back & Next) -->
            <div
              class="pt-4 border-t border-slate-100 flex items-center justify-between gap-3"
            >
              <button
                @click="wizardStep = 1"
                type="button"
                class="py-1.5 px-3 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-[#fff2d9] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Ubah Parameter</span>
              </button>

              <button
                @click="wizardStep = 3"
                type="button"
                class="bg-[#324d1d]/90 hover:bg-[#324d1d] text-white text-xs font-bold py-1.5 px-3.5 rounded-lg shadow-2xs active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Lanjut ke Analisis Finansial & Mitra</span>
              </button>
            </div>
          </SectionCard>
        </div>

        <!-- ==================== WIZARD STEP 3: PROYEKSI FINANSIAL & MULAI GARAP ==================== -->
        <div
          v-else-if="wizardStep === 3 && plan"
          class="space-y-6 max-w-6xl mx-auto"
        >
          <!-- Proyeksi Kelayakan Finansial -->
          <div
            class="bg-gradient-to-br from-[#324d1d] via-[#324d1d] to-[#324d1d] text-white rounded-3xl p-6 shadow-md space-y-4"
          >
            <div
              class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3"
            >
              <div>
                <span
                  class="text-[10px] uppercase tracking-wider text-[#99c30c]"
                  >Proyeksi Kelayakan Finansial</span
                >
                <h3 class="text-base font-bold">
                  {{ form.name || "Sawah Blok Baru" }} ({{ plan.land_size_ha }}
                  Ha)
                </h3>
              </div>
              <div
                class="bg-[#99c30c]/20 border border-[#99c30c]/40 px-3.5 py-1.5 rounded-2xl text-right self-start sm:self-auto"
              >
                <span
                  class="text-[10px] text-[#99c30c] font-extrabold uppercase block"
                  >Estimasi ROI</span
                >
                <span class="text-base text-[#fff] font-bold"
                  >+{{ plan.financial_summary.roi_percentage }}%</span
                >
              </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div
                class="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10"
              >
                <span class="text-[10px] text-slate-300 font-bold block"
                  >Total Modal (RAB)</span
                >
                <div class="text-sm text-white mt-0.5 font-bold">
                  Rp
                  {{
                    plan.financial_summary.total_budget.toLocaleString("id-ID")
                  }}
                </div>
                <span
                  class="text-[9px] text-[#99c30c] font-semibold block mt-0.5 font-bold"
                >
                  HPP: Rp
                  {{
                    plan.financial_summary.hpp_per_kg.toLocaleString("id-ID")
                  }}/kg
                </span>
              </div>

              <div
                class="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10"
              >
                <span class="text-[10px] text-slate-300 font-bold block"
                  >Estimasi Panen</span
                >
                <div class="text-xs text-white mt-0.5 font-bold">
                  {{
                    plan.financial_summary.projected_yield_kg.toLocaleString(
                      "id-ID",
                    )
                  }}
                  <span class="text-[10px] text-slate-300">kg GKP</span>
                </div>
                <span
                  class="text-[9px] text-[#fed701] font-semibold block mt-0.5 font-bold"
                >
                  Rp
                  {{
                    plan.financial_summary.projected_selling_price_per_kg.toLocaleString(
                      "id-ID",
                    )
                  }}/kg
                </span>
              </div>

              <div
                class="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10"
              >
                <span class="text-[10px] text-slate-300 font-bold block"
                  >Omzet Bruto</span
                >
                <div class="text-xs text-white mt-0.5 font-bold">
                  Rp
                  {{
                    plan.financial_summary.projected_revenue.toLocaleString(
                      "id-ID",
                    )
                  }}
                </div>
                <span
                  class="text-[9px] text-slate-300 font-semibold block mt-0.5"
                >
                  Bursa lumbung
                </span>
              </div>

              <div
                class="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/10"
              >
                <span class="text-[10px] text-slate-300 font-bold block"
                  >Proyeksi Laba Bersih</span
                >
                <div class="text-sm text-[#fff] mt-0.5 font-bold">
                  Rp
                  {{
                    plan.financial_summary.projected_net_profit.toLocaleString(
                      "id-ID",
                    )
                  }}
                </div>
                <span
                  class="text-[9px] text-slate-300 font-semibold block mt-0.5"
                >
                  Setelah modal
                </span>
              </div>
            </div>
          </div>

          <!-- Analisis Cuaca & Agronomi AI -->
          <div
            class="bg-[#fed701]/10 border border-[#fed701]/90 rounded-3xl p-5 shadow-xs space-y-3"
          >
            <div class="flex items-center justify-between">
              <span
                class="text-xs uppercase tracking-wider text-[#324d1d] flex items-center gap-1.5 text-bold"
              >
                Analisis Cuaca & Agronomi AI
              </span>
              <span
                class="text-[10px] font-extrabold bg-[#fed701]/80 text-[#324d1d] px-2.5 py-0.5 rounded-full"
              >
                {{ plan.weather_condition.season }}
              </span>
            </div>

            <p class="text-xs text-[#324d1d] leading-relaxed font-medium">
              {{ plan.weather_condition.note }}
            </p>

            <div
              class="flex items-center gap-4 pt-2 text-xs text-[#324d1d] font-bold border-t border-[#fed701]/60 flex-wrap"
            >
              <span
                >Suhu Rata-rata:
                <strong
                  >{{ plan.weather_condition.temp_celsius }}°C</strong
                ></span
              >
              <span>•</span>
              <span
                >Peluang Hujan:
                <strong
                  >{{ plan.weather_condition.rain_probability }}%</strong
                ></span
              >
              <span>•</span>
              <span
                >Lokasi: <strong>{{ plan.location }}</strong></span
              >
            </div>
          </div>

          <!-- Rekomendasi Jasa Ekosistem AgriBuddy -->
          <div
            class="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3"
          >
            <SectionHeader>
              <div>
                <h4
                  class="text-xs md:text-sm text-slate-800 flex items-center gap-1.5 font-bold"
                >
                  Jasa Mitra Ekosistem Terhubung
                </h4>
                <p class="text-[11px] text-slate-500">
                  Penyedia traktor, bibit, pupuk, dan alsintan Desa Sukamaju
                </p>
              </div>
            </SectionHeader>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div
                v-for="(rec, rIdx) in plan.ecosystem_recommendations"
                :key="rIdx"
                class="bg-[#fff2d9] border border-slate-200 rounded-2xl p-3 flex items-center justify-between hover:border-[#324d1d] transition-all"
              >
                <div class="flex items-center gap-2.5">
                  <div
                    class="w-11 h-11 rounded-xl bg-[#99c30c]/20 text-[#324d1d] flex items-center justify-center text-base shrink-0"
                  >
                    <img
                      :src="getRoleIcon(rec.role_category)"
                      :alt="`Ikon ${rec.role_category}`"
                      class="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <span
                      class="text-[9px] uppercase text-[#324d1d] bg-[#99c30c]/10 px-1.5 py-0.5 rounded font-bold"
                    >
                      {{ rec.role_category }}
                    </span>
                    <h5 class="text-xs text-slate-800 mt-0.5 font-bold">
                      {{ rec.partner_name }}
                    </h5>
                    <p class="text-[10px] text-slate-500 font-semibold">
                      {{ rec.action_text }}
                    </p>
                  </div>
                </div>
                <button
                  @click="openWhatsApp(rec.phone, rec.partner_name)"
                  class="bg-[#324d1d]/90 hover:bg-[#324d1d] text-white text-[11px] px-2.5 py-1.5 rounded-xl shadow-2xs active:scale-95 transition-all flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Phone :size="12" /> Hubungi
                </button>
              </div>
            </div>
          </div>

          <!-- Action Stepper Final (Back & Simpan Draft / Simpan Garap) -->
          <div
            class="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <button
              @click="wizardStep = 2"
              type="button"
              class="py-1.5 px-3.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-[#fff2d9] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Kembali ke Rincian RAB</span>
            </button>

            <div class="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <!-- Tombol 1: Simpan Rencana Saja (Draft) -->
              <button
                @click="savePlanAsDraft"
                :disabled="isSavingDraft || isSavingToActive"
                type="button"
                class="py-2 px-3.5 rounded-xl border border-[#324d1d] text-[#324d1d] hover:bg-[#99c30c]/10 text-xs font-bold shadow-2xs active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                <Loader2 v-if="isSavingDraft" :size="14" class="animate-spin" />
                <span>{{
                  isSavingDraft ? "Menyimpan..." : " Simpan Sebagai Rencana"
                }}</span>
              </button>

              <!-- Tombol 2: Simpan & Mulai Garap (Aktif) -->
              <button
                @click="savePlanToActiveFarmland"
                :disabled="isSavingToActive || isSavingDraft"
                type="button"
                class="bg-[#324d1d]/90 hover:bg-[#324d1d] text-white text-xs font-bold py-2 px-4 rounded-xl shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                <Loader2
                  v-if="isSavingToActive"
                  :size="14"
                  class="animate-spin"
                />
                <span v-else></span>
                <span>{{
                  isSavingToActive ? "Menyimpan..." : "Simpan & Mulai Garap"
                }}</span>
              </button>
            </div>
          </div>
        </div>
        <!-- End of v-if="rencanaSubMode === 'wizard'" -->
      </div>

      <!-- ==================== SUB-VIEW: DAFTAR RENCANA TERSIMPAN (DRAFT) ==================== -->
      <div
        v-else-if="rencanaSubMode === 'saved'"
        class="space-y-4 max-w-4xl mx-auto"
      >
        <!-- Header Rencana Tersimpan -->
        <div
          class="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div>
            <div
              class="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#324d1d] bg-[#99c30c]/10 px-2.5 py-0.5 rounded-full font-bold"
            >
              Draft Usahatani
            </div>
            <h3 class="text-base text-slate-800 mt-1 flex items-center gap-2 font-bold">
              Daftar Rencana Tanam Tersimpan
            </h3>
            <p class="text-xs text-slate-500 mt-0.5">
              Kelola rencana yang telah dihitung anggarannya. Anda dapat
              mengolah parameter atau langsung mengeksekusinya ke pengerjaan
              lahan aktif.
            </p>
          </div>
          <button
            @click="createNewPlanDraft"
            type="button"
            class="bg-[#324d1d]/90 hover:bg-[#324d1d] text-white text-xs py-2 px-3.5 rounded-xl shadow-xs active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shrink-0 font-bold"
          >
            <span>Rancang Lahan Baru</span>
          </button>
        </div>

        <!-- Empty State -->
        <div
          v-if="draftFarmlands.length === 0"
          class="bg-white border border-dashed border-slate-300 rounded-3xl p-10 text-center space-y-3"
        >
          <div class="space-y-1">
            <h4 class="text-sm text-slate-800 font-bold">Belum Ada Rencana Tersimpan</h4>
            <p class="text-xs text-slate-500 max-w-md mx-auto">
              Pada tahap kalkulasi, tekan "Simpan Sebagai Rencana" untuk
              menyimpan rencana usahatani. Draft rencana akan muncul disini dan
              siap diolah kapan saja.
            </p>
          </div>
        </div>

        <!-- Cards List Drafts -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="draft in draftFarmlands"
            :key="draft.id"
            class="bg-white border border-slate-200/90 hover:border-[#324d1d] rounded-3xl p-5 shadow-xs transition-all flex flex-col justify-between space-y-4"
          >
            <!-- Card Top: Info -->
            <div class="space-y-3">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <span
                    class="text-[9px] uppercase text-[#324d1d] bg-[#fed701]/20 px-2 py-0.5 rounded-full border border-[#fed701]/40 tracking-wider font-bold"
                  >
                    Draft Rencana
                  </span>
                  <h4 class="text-base text-slate-800 mt-1.5 leading-snug font-bold">
                    {{ draft.name }}
                  </h4>
                  <p class="text-xs text-slate-500 font-medium mt-0.5">
                    {{ draft.location }}
                  </p>
                </div>
              </div>

              <!-- Parameter Chips -->
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div
                  class="bg-[#fff2d9] p-2 rounded-xl border border-slate-100"
                >
                  <span class="text-[10px] text-slate-400 font-bold block"
                    >Komoditas</span
                  >
                  <span class="font-extrabold text-slate-700 truncate block">{{
                    draft.commodity
                  }}</span>
                </div>
                <div
                  class="bg-[#fff2d9] p-2 rounded-xl border border-slate-100"
                >
                  <span class="text-[10px] text-slate-400 font-bold block"
                    >Luas Lahan</span
                  >
                  <span class="font-extrabold text-slate-700 block"
                    >{{ draft.land_size_ha }} Ha ({{
                      (draft.land_size_ha * 10000).toLocaleString("id-ID")
                    }}
                    m²)</span
                  >
                </div>
              </div>

              <!-- Estimasi Anggaran RAB -->
              <div
                class="bg-[#99c30c]/70 border border-[#99c30c]/90 rounded-2xl p-2.5 flex items-center justify-between text-xs"
              >
                <div
                  class="flex items-center gap-1.5 text-[#324d1d] font-bold text-[11px]"
                >
                  <Coins :size="14" class="text-[#324d1d]" />
                  <span>Estimasi Plafon RAB:</span>
                </div>
                <span class="text-[#324d1d] text-xs font-bold">
                  Rp
                  {{
                    Math.round(
                      (draft.land_size_ha || 1) * 6400000,
                    ).toLocaleString("id-ID")
                  }}
                </span>
              </div>
            </div>

            <!-- Card Bottom: Action Buttons -->
            <div
              class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2"
            >
              <div class="flex items-center gap-1.5">
                <button
                  @click="editDraftFarm(draft)"
                  type="button"
                  title="Edit parameter rencana ini"
                  class="py-1.5 px-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-[#fff2d9] text-xs font-bold transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                >
                  <span>Edit</span>
                </button>
                <button
                  @click="deleteDraftFarm(draft)"
                  type="button"
                  title="Hapus draft rencana ini"
                  class="py-1.5 px-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                >
                  <span>Hapus</span>
                </button>
              </div>

              <button
                @click="activateDraftFarm(draft)"
                type="button"
                class="bg-[#324d1d]/90 hover:bg-[#324d1d] font-bold text-white text-xs py-1.5 px-3 rounded-xl shadow-xs active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Mulai Garap</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== TAB 2: KONTROL TANAM & MODAL (DUAL CONTROL: PROSES & KEUANGAN) ==================== -->
    <div v-else-if="topTab === 'kontrol'">
      <!-- LOADING SKELETON: Tampil saat farmlands sedang dimuat -->
      <div
        v-if="isFarmLoading"
        class="space-y-4 animate-pulse max-w-4xl mx-auto py-8"
      >
        <div class="bg-[#324d1d]/30 rounded-3xl h-52 w-full"></div>
        <div class="bg-slate-200 rounded-3xl h-32 w-full"></div>
        <div class="bg-slate-100 rounded-3xl h-40 w-full"></div>
        <div class="flex justify-center pt-2">
          <div
            class="flex items-center gap-2 text-slate-400 text-sm font-semibold"
          >
            <Loader2 :size="16" class="animate-spin" />
            <span>Memuat data lahan...</span>
          </div>
        </div>
      </div>

      <!-- EMPTY STATE JIKA BELUM ADA LAHAN AKTIF -->
      <div
        v-else-if="activeFarmlands.length === 0"
        class="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xs max-w-xl mx-auto my-6"
      >
        <div class="space-y-1.5">
          <h3 class="text-lg text-slate-800 font-bold">
            Kamu belum membuat lahan untuk diolah.
          </h3>
          <p class="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
            Rancang rencana tanam baru atau aktifkan draf petak sawah untuk
            mulai mengontrol proses dan modal usahatani.
          </p>
        </div>
        <div class="pt-2">
          <button
            @click="
              setTopTab('rencana');
              rencanaSubMode = 'wizard';
            "
            class="inline-flex font-bold items-center gap-2 px-5 py-2.5 rounded-xl bg-[#324d1d]/90 hover:bg-[#324d1d] text-white text-xs shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <span>Buat Sekarang</span>
          </button>
        </div>
      </div>

      <!-- Konten utama jika ada lahan aktif -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- Left Column (8 cols): Cockpit Modal, 5 Fase Interaktif (Dual Control) -->
        <div class="lg:col-span-8 space-y-6">
          <!-- Financial & Progress Cockpit (Neraca Kendali Modal & Siklus Budidaya) -->
          <div
            class="bg-gradient-to-br from-[#324d1d] to-[#324d1d] text-white rounded-3xl p-6 shadow-sm space-y-4"
          >
            <div
              class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#324d1d]/80 pb-3"
            >
              <div class="flex items-center gap-2">
                <h1 class="text-white text-bold">
                  Neraca Kendali Modal & Siklus Budidaya
                </h1>
              </div>
              <button
                @click="openAddExpenseModal()"
                class="text-xs bg-[#99c30c] font-bold hover:bg-[#99c30c]/80 text-black px-3.5 py-1.5 rounded-xl active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow-2xs"
              >
                <PlusCircle :size="13" /><span class="hover:text-[#fff]">  Tambah Pengeluaran Baru</span>
              </button>
            </div>

            <!-- 3 Metrics Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                class="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 space-y-1"
              >
                <span
                  class="text-[10px] font-bold text-[#fff2d9] uppercase tracking-wider block"
                  >Plafon Anggaran RAB AI</span
                >
                <span class="text-lg md:text-xl text-white block font-bold"
                  >Rp {{ totalBudgetFormatted }}</span
                >
                <span class="text-[10px] text-[#99c30c] font-semibold block"
                  >Dasar hitung {{ activeFarm?.land_size_ha }} Ha</span
                >
              </div>
              <div
                class="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 space-y-1"
              >
                <span
                  class="text-[10px] font-bold text-[#fff2d9] uppercase tracking-wider block"
                  >Total Modal Terpakai</span
                >
                <span class="text-lg md:text-xl text-[#99c30c] block font-bold"
                  >Rp {{ totalSpentFormatted }}</span
                >
                <span class="text-[10px] text-[#fff2d9] font-semibold block"
                  >{{ activeFarm?.capital_expenses?.length || 0 }} Transaksi di
                  database</span
                >
              </div>
              <div
                class="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 space-y-1"
              >
                <span
                  class="text-[10px] font-bold text-[#fff2d9] uppercase tracking-wider block"
                  >Sisa Modal Tersedia</span
                >
                <span class="text-lg md:text-xl text-[#fed701] block font-bold"
                  >Rp {{ remainingBudgetFormatted }}</span
                >
                <span class="text-[10px] text-slate-300 font-semibold block"
                  >{{ budgetSpentPercent }}% serapan anggaran</span
                >
              </div>
            </div>

            <!-- Progress Bar Serapan Modal -->
            <div class="space-y-1.5 pt-1">
              <div
                class="w-full bg-[#324d1d] h-2.5 rounded-full overflow-hidden border border-white/10"
              >
                <div
                  class="h-full rounded-full transition-all duration-700"
                  :class="
                    budgetSpentPercent > 90 ? 'bg-[#fed701]' : 'bg-[#99c30c]'
                  "
                  :style="{ width: `${budgetSpentPercent}%` }"
                ></div>
              </div>
              <div
                class="flex justify-between text-[10px] font-semibold text-[#fff2d9]"
              >
                <span
                  >Status Arus Kas:
                  <strong
                    :class="
                      budgetSpentPercent > 90
                        ? 'text-[#fed701]'
                        : 'text-[#99c30c]'
                    "
                    >{{ budgetStatusLabel }}</strong
                  ></span
                >
                <span
                  >Progres Siklus: {{ completedPhasesCount }} dari 5 Fase
                  Selesai</span
                >
              </div>
            </div>
          </div>

          <!-- TAB SWITCHER: FASE & KAS -->
          <div
            class="bg-white border border-slate-200/90 rounded-3xl shadow-xs overflow-hidden"
          >
            <!-- Tab Pills -->
            <div class="flex border-b border-slate-100 bg-[#fff2d9]/60">
              <button
                @click="leftPanelTab = 'fase'"
                type="button"
                class="flex-1 py-3 px-4 text-xs flex font-bold items-center justify-center gap-1.5 transition-all cursor-pointer"
                :class="
                  leftPanelTab === 'fase'
                    ? 'text-[#324d1d] border-b-2 border-[#99c30c] bg-white'
                    : 'text-slate-500 hover:text-slate-700'
                "
              >
                Fase Budidaya
              </button>
              <button
                @click="leftPanelTab = 'kas'"
                type="button"
                class="flex-1 py-3 px-4 text-xs flex font-bold items-center justify-center gap-1.5 transition-all cursor-pointer"
                :class="
                  leftPanelTab === 'kas'
                    ? 'text-[#324d1d] border-b-2 border-[#99c30c] bg-white'
                    : 'text-slate-500 hover:text-slate-700'
                "
              >
                Arus Kas
              </button>
            </div>

            <!-- ========== TAB: FASE BUDIDAYA ========== -->
            <div v-if="leftPanelTab === 'fase'" class="p-5 space-y-4">
              <div class="flex items-center justify-between px-1">
                <div>
                  <h3 class="text-sm text-slate-800 flex items-center gap-2 font-bold">
                    Lembar Kendali 5 Fase Budidaya Lapangan
                  </h3>
                  <p class="text-[11px] text-slate-500">
                    Kendalikan aksi lapangan harian dan realisasi pengeluaran
                    modal di setiap tahap
                  </p>
                </div>
                <span
                  class="text-xs text-[#324d1d] font-bold bg-[#99c30c]/10 px-3 py-1 rounded-full border border-[#99c30c]/40"
                >
                  {{ progressPercentage }}% Tuntas
                </span>
              </div>

              <!-- Loop 5 Phases -->
              <div
                v-for="phase in activeFarm?.timeline_phases ||
                activeFarmPlan?.timeline_phases ||
                plan?.timeline_phases ||
                []"
                :key="phase.step_no"
                class="bg-white border font-bold rounded-3xl shadow-xs transition-all overflow-hidden"
                :class="
                  phase.status === 'SELESAI'
                    ? 'border-[#99c30c]/60 bg-[#99c30c]/15'
                    : phase.status === 'SEDANG_BERJALAN'
                      ? 'border-[#fed701]/60 ring-2 ring-[#fed701]/20 shadow-sm'
                      : 'border-slate-200'
                "
              >
                <!-- Phase Header Toggle -->
                <button
                  @click="togglePhaseExpand(phase.step_no)"
                  type="button"
                  class="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 text-left cursor-pointer hover:bg-[#fff2d9]/60 transition-colors"
                >
                  <div class="flex items-center gap-3">
                    <span
                      class="w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0"
                      :class="
                        phase.status === 'SELESAI'
                          ? 'bg-[#324d1d]/90 text-white'
                          : phase.status === 'SEDANG_BERJALAN'
                            ? 'bg-[#fed701] text-[#324d1d] animate-pulse'
                            : 'bg-slate-200 text-slate-600'
                      "
                    >
                      {{ phase.status === "SELESAI" ? "✓" : phase.step_no }}
                    </span>
                    <div class="text-left">
                      <h4 class="text-sm text-slate-800">
                        {{ phase.name }}
                      </h4>
                      <div
                        class="text-[10px] font-bold text-slate-500 flex items-center gap-1.5 mt-0.5"
                      >
                        {{ phase.day_range }} • Durasi
                        {{ phase.duration_days }} hari
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-2.5 shrink-0">
                    <div class="flex items-center gap-1.5" @click.stop>
                      <select
                        v-model="phase.status"
                        @change="saveStepUpdate(phase)"
                        class="text-xs px-3 py-1.5 rounded-xl border focus:outline-none transition-all cursor-pointer"
                        :class="
                          phase.status === 'SELESAI'
                            ? 'bg-[#99c30c]/20 text-[#324d1d] border-[#99c30c]/60'
                            : phase.status === 'SEDANG_BERJALAN'
                              ? 'bg-[#fed701]/20 text-[#324d1d] border-[#fed701]/60'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                        "
                      >
                        <option value="BELUM">Belum Mulai</option>
                        <option value="SEDANG_BERJALAN">Sedang Berjalan</option>
                        <option value="SELESAI">Selesai</option>
                      </select>
                    </div>
                    <div
                      class="w-7 h-7 rounded-xl flex items-center justify-center transition-all shrink-0"
                      :class="
                        isPhaseExpanded(phase.step_no)
                          ? 'bg-[#99c30c]/20 text-[#324d1d] rotate-180'
                          : 'bg-slate-100 text-slate-500'
                      "
                    >
                      <ChevronDown :size="15" />
                    </div>
                  </div>
                </button>

                <!-- Phase Body -->
                <div
                  v-if="isPhaseExpanded(phase.step_no)"
                  class="px-5 pb-5 space-y-4 border-t border-slate-100"
                >
                  <div
                    class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start pt-4"
                  >
                    <!-- KOLOM KIRI: KONTROL PROSES -->
                    <div
                      class="space-y-3 bg-[#fff2d9]/80 p-4 rounded-2xl border border-slate-100"
                      :class="
                        phase.status === 'SELESAI'
                          ? 'bg-[#99c30c]/20 border-[#99c30c]/30'
                          : ''
                      "
                    >
                      <div
                        class="flex items-center justify-between pb-1 border-b border-slate-200/60"
                      >
                        <span
                          class="text-xs text-slate-700 flex items-center gap-1.5"
                        >
                          Kontrol Proses Lapangan
                        </span>
                        <span
                          v-if="phase.status === 'SELESAI'"
                          class="text-[10px] text-[#324d1d] bg-[#99c30c]/20 px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#99c30c]/40"
                        >
                          Selesai & Terkunci
                        </span>
                        <span
                          v-else
                          class="text-[10px] font-bold text-[#324d1d] bg-[#99c30c]/70 px-2 py-0.5 rounded-full"
                        >
                          {{ getPhaseDoneTasksCount(phase.step_no) }} /
                          {{ getPhaseTasks(phase).length }} Selesai
                        </span>
                      </div>
                      <div class="space-y-2">
                        <div
                          v-for="(task, tIdx) in getPhaseTasks(phase)"
                          :key="tIdx"
                          @click="
                            phase.status !== 'SELESAI' &&
                            togglePhaseTask(phase.step_no, tIdx)
                          "
                          class="p-2.5 rounded-xl border transition-all select-none flex items-start gap-2.5"
                          :class="[
                            phase.status === 'SELESAI'
                              ? 'cursor-not-allowed opacity-85'
                              : 'cursor-pointer',
                            isPhaseTaskDone(phase.step_no, tIdx)
                              ? 'bg-[#99c30c]/80 border-[#99c30c]/40 text-slate-500 line-through'
                              : 'bg-white hover:border-[#99c30c]/60 border-slate-200 text-slate-800 shadow-2xs',
                          ]"
                        >
                          <div
                            class="w-4 h-4 rounded-md border mt-0.5 flex items-center justify-center shrink-0 transition-colors"
                            :class="
                              isPhaseTaskDone(phase.step_no, tIdx)
                                ? 'bg-[#324d1d]/90 border-[#324d1d] text-white'
                                : 'border-slate-300 bg-white'
                            "
                          >
                            <Check
                              v-if="isPhaseTaskDone(phase.step_no, tIdx)"
                              :size="10"
                            />
                          </div>
                          <span
                            class="text-xs font-semibold leading-tight flex-1"
                            >{{ task }}</span
                          >
                        </div>
                      </div>
                      <div
                        class="bg-[#fed701]/80 border border-[#fed701]/70 rounded-xl p-2.5 text-[11px] text-[#324d1d] flex items-start gap-2 mt-2 leading-relaxed"
                      >
                        <div>
                          <strong class="font-extrabold text-[#324d1d]"
                            >Tips:
                          </strong>
                          <span>{{ phase.ai_tips }}</span>
                        </div>
                      </div>
                    </div>

                    <!-- KOLOM KANAN: KONTROL MODAL -->
                    <div
                      class="space-y-3 bg-[#fff2d9]/80 p-4 rounded-2xl border border-slate-100"
                      :class="
                        phase.status === 'SELESAI'
                          ? 'bg-[#99c30c]/20 border-[#99c30c]/30'
                          : ''
                      "
                    >
                      <div
                        class="flex items-center justify-between pb-1 border-b border-slate-200/60"
                      >
                        <span
                          class="text-xs text-slate-700 flex items-center gap-1.5"
                        >
                          Kontrol Modal Fase Ini
                        </span>
                        <button
                          :disabled="phase.status === 'SELESAI'"
                          @click="
                            openAddExpenseModal(
                              getPhaseCategory(phase.step_no),
                              `Biaya ${phase.name}`,
                            )
                          "
                          class="text-[10px] px-2.5 py-0.5 rounded-full transition-all flex items-center gap-1"
                          :class="
                            phase.status === 'SELESAI'
                              ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                              : 'text-[#324d1d] bg-[#99c30c]/20 hover:bg-[#99c30c]/30 cursor-pointer active:scale-95'
                          "
                        >
                          <span v-if="phase.status === 'SELESAI'"
                            >Biaya Ditutup</span
                          >
                          <template v-else> Catat Biaya </template>
                        </button>
                      </div>
                      <div class="grid grid-cols-2 gap-2 text-xs">
                        <div
                          class="p-2.5 rounded-xl bg-white border border-slate-200"
                        >
                          <span
                            class="text-[9px] font-bold text-slate-400 uppercase block"
                            >Plafon RAB AI</span
                          >
                          <span class="text-slate-800 text-sm"
                            >Rp
                            {{
                              getPhaseAllocatedBudget(phase).toLocaleString(
                                "id-ID",
                              )
                            }}</span
                          >
                        </div>
                        <div
                          class="p-2.5 rounded-xl bg-white border border-slate-200"
                        >
                          <span
                            class="text-[9px] font-bold text-slate-400 uppercase block"
                            >Realisasi Aktual</span
                          >
                          <span class="text-[#324d1d] text-sm"
                            >Rp
                            {{
                              getActualCostForPhase(phase).toLocaleString(
                                "id-ID",
                              )
                            }}</span
                          >
                        </div>
                      </div>
                      <div class="space-y-1.5 pt-1">
                        <span
                          class="text-[10px] font-extrabold uppercase text-slate-400 block"
                          >Riwayat Transaksi Fase:</span
                        >
                        <div
                          v-if="getExpensesForPhase(phase.step_no).length > 0"
                          class="space-y-1 max-h-32 overflow-y-auto pr-1"
                        >
                          <div
                            v-for="exp in getExpensesForPhase(phase.step_no)"
                            :key="exp.id"
                            class="flex items-center justify-between text-[11px] p-2 rounded-xl bg-white border border-slate-100"
                          >
                            <div class="truncate pr-2">
                              <p class="font-bold text-slate-800 truncate">
                                {{ exp.item_name }}
                              </p>
                              <p class="text-[9px] text-slate-400">
                                {{ exp.date }}
                              </p>
                            </div>
                            <span class="text-slate-800 shrink-0"
                              >Rp
                              {{
                                (exp.amount || 0).toLocaleString("id-ID")
                              }}</span
                            >
                          </div>
                        </div>
                        <div
                          v-else
                          class="text-center py-2.5 bg-white rounded-xl border border-dashed border-slate-200 text-[10px] text-slate-400"
                        >
                          Belum ada transaksi khusus fase ini.
                        </div>
                      </div>
                      <div v-if="getPhasePartner(phase.step_no)" class="pt-1">
                        <div
                          class="p-2.5 rounded-xl bg-[#99c30c]/70 border border-[#99c30c]/60 flex items-center justify-between text-xs"
                        >
                          <div class="truncate pr-2">
                            <span
                              class="text-[9px] font-extrabold text-[#324d1d] uppercase block"
                              >Mitra Terkait Fase:</span
                            >
                            <p class="text-slate-800 text-[11px] truncate">
                              {{ getPhasePartner(phase.step_no).name }}
                            </p>
                          </div>
                          <button
                            @click="
                              openWhatsApp(
                                getPhasePartner(phase.step_no).phone,
                                getPhasePartner(phase.step_no).name,
                              )
                            "
                            class="text-[10px] bg-[#324d1d]/90 hover:bg-[#324d1d] text-white px-2.5 py-1 rounded-lg shrink-0 flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
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

            <!-- ========== TAB: ARUS KAS ========== -->
            <div v-else-if="leftPanelTab === 'kas'" class="p-5 space-y-5">
              <!-- Realisasi per Fase (Budget vs Aktual) -->
              <div class="space-y-2">
                <h4 class="text-sm text-slate-700 font-bold">Realisasi Modal per Fase</h4>
                <div
                  v-for="phase in activeFarm?.timeline_phases ||
                  activeFarmPlan?.timeline_phases ||
                  plan?.timeline_phases ||
                  []"
                  :key="'kas-' + phase.step_no"
                  class="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-2 font-bold"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <span
                        class="w-6 h-6 rounded-lg text-[10px] flex items-center justify-center shrink-0"
                        :class="
                          phase.status === 'SELESAI'
                            ? 'bg-[#324d1d]/90 text-white'
                            : phase.status === 'SEDANG_BERJALAN'
                              ? 'bg-[#fed701] text-[#324d1d]'
                              : 'bg-slate-200 text-slate-600'
                        "
                      >
                        {{ phase.status === "SELESAI" ? "✓" : phase.step_no }}
                      </span>
                      <span class="text-xs text-slate-800">{{
                        phase.name
                      }}</span>
                    </div>
                    <span
                      class="text-[10px] px-2 py-0.5 rounded-full"
                      :class="
                        phase.status === 'SELESAI'
                          ? 'bg-[#99c30c]/20 text-[#324d1d]'
                          : phase.status === 'SEDANG_BERJALAN'
                            ? 'bg-[#fed701]/20 text-[#324d1d]'
                            : 'bg-slate-100 text-slate-600'
                      "
                    >
                      {{
                        phase.status === "SELESAI"
                          ? "Selesai"
                          : phase.status === "SEDANG_BERJALAN"
                            ? "Berjalan"
                            : "Belum"
                      }}
                    </span>
                  </div>
                  <div class="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span class="text-[9px] text-slate-400 font-bold block"
                        >Plafon RAB</span
                      >
                      <span class="text-slate-700"
                        >Rp
                        {{
                          getPhaseAllocatedBudget(phase).toLocaleString("id-ID")
                        }}</span
                      >
                    </div>
                    <div>
                      <span class="text-[9px] text-slate-400 font-bold block"
                        >Realisasi</span
                      >
                      <span
                        class=""
                        :class="
                          getActualCostForPhase(phase) >
                          getPhaseAllocatedBudget(phase)
                            ? 'text-rose-600'
                            : 'text-[#324d1d]'
                        "
                      >
                        Rp
                        {{
                          getActualCostForPhase(phase).toLocaleString("id-ID")
                        }}
                      </span>
                    </div>
                  </div>
                  <div
                    class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"
                  >
                    <div
                      class="h-full rounded-full transition-all"
                      :class="
                        getActualCostForPhase(phase) >
                        getPhaseAllocatedBudget(phase)
                          ? 'bg-rose-400'
                          : 'bg-[#99c30c]'
                      "
                      :style="{
                        width: `${Math.min(100, getPhaseAllocatedBudget(phase) > 0 ? (getActualCostForPhase(phase) / getPhaseAllocatedBudget(phase)) * 100 : 0)}%`,
                      }"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Riwayat Semua Transaksi -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <h4 class="text-xs text-slate-700 font-bold">
                    Riwayat Transaksi Lengkap
                  </h4>
                  <span class="text-[10px] text-slate-400"
                    >{{ activeFarm?.capital_expenses?.length || 0 }} entri</span
                  >
                </div>

                <div
                  v-if="
                    !activeFarm?.capital_expenses ||
                    activeFarm?.capital_expenses?.length === 0
                  "
                  class="text-center py-8 bg-[#fff2d9] rounded-2xl border border-dashed border-slate-200 space-y-1"
                >
                  <p class="text-xs font-bold text-slate-700">
                    Belum Ada Transaksi
                  </p>
                  <p class="text-[10px] text-slate-400">
                    Catat pengeluaran lapangan menggunakan tombol di atas.
                  </p>
                </div>

                <div v-else class="space-y-2">
                  <div
                    v-for="exp in activeFarm?.capital_expenses || []"
                    :key="exp.id"
                    class="bg-[#fff2d9] border border-slate-200/80 rounded-2xl p-3 hover:border-[#324d1d] transition-all"
                  >
                    <div class="flex items-start justify-between gap-2">
                      <div class="truncate">
                        <div class="flex items-center gap-1.5 mb-1">
                          <span
                            class="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md"
                            :class="
                              exp.source === 'MARKETPLACE'
                                ? 'bg-[#fe8b02]/20 text-[#324d1d]'
                                : 'bg-slate-200 text-slate-700'
                            "
                          >
                            {{
                              exp.source === "MARKETPLACE"
                                ? "Katalog"
                                : "Manual"
                            }}
                          </span>
                          <span
                            class="text-[9px] font-bold text-[#324d1d] bg-[#99c30c]/10 px-1.5 py-0.5 rounded-md"
                            >{{ exp.category }}</span
                          >
                        </div>
                        <h4 class="text-xs text-slate-800 truncate">
                          {{ exp.item_name }}
                        </h4>
                      </div>
                      <div class="text-right shrink-0">
                        <span class="text-xs text-[#324d1d] font-bold"
                          >Rp
                          {{ (exp.amount || 0).toLocaleString("id-ID") }}</span
                        >
                        <span class="text-[9px] text-slate-400 block">{{
                          exp.date
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column (4 cols) -->
        <div class="lg:col-span-4 space-y-6">
          <!-- PANEL KELOLA LAHAN (Selector, Edit, Mulai dari Tengah, Hapus) -->
          <div
            class="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-3.5"
          >
            <div
              class="flex items-center justify-between pb-1 border-b border-slate-100"
            >
              <div>
                <h3 class="text-sm text-slate-800 mt-1 font-bold ">Petak Sawah Aktif</h3>
              </div>
              <button
                @click="openAddFarmModal"
                type="button"
                class="text-xs font-bold text-[#324d1d] bg-[#99c30c]/10 hover:bg-[#99c30c]/20 px-2.5 py-1.5 rounded-xl border border-[#99c30c]/40 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                title="Tambah Petak Sawah Baru"
              >
                Tambah
              </button>
            </div>

            <!-- Dropdown Pilihan Sawah -->
            <div>
              <select
                v-model="activeFarmId"
                @change="onActiveFarmChanged"
                class="w-full text-xs font-bold text-slate-800 bg-[#fff2d9] border border-slate-200 rounded-2xl px-3 py-2.5 focus:outline-none focus:border-[#99c30c] cursor-pointer shadow-2xs"
              >
                <option v-for="f in activeFarmlands" :key="f.id" :value="f.id">
                  {{ f.name }} — {{ f.land_size_ha }} Ha · {{ f.commodity }}
                </option>
              </select>
            </div>

            <!-- Quick Specs & Action Buttons -->
            <div v-if="activeFarm" class="space-y-2.5 pt-1">
              <div
                class="p-3 bg-[#fff2d9] rounded-2xl border border-slate-100 space-y-1 text-xs"
              >
                <div class="flex items-center justify-between text-slate-600">
                  <span class="text-[11px] text-slate-400 font-bold"
                    >Luas & Komoditas</span
                  >
                  <span class="text-slate-800"
                    >{{ activeFarm.land_size_ha }} Ha •
                    {{ activeFarm.commodity }}</span
                  >
                </div>
                <div class="flex items-center justify-between text-slate-600">
                  <span class="text-[11px] text-slate-400 font-bold"
                    >Lokasi Petak</span
                  >
                  <span
                    class="font-semibold text-slate-700 truncate max-w-[180px]"
                    >{{ activeFarm.location }}</span
                  >
                </div>
                <div class="flex items-center justify-between text-slate-600">
                  <span class="text-[11px] text-slate-400 font-bold"
                    >Tanggal Tanam</span
                  >
                  <span class="font-semibold text-slate-700">{{
                    activeFarm.planting_date || "-"
                  }}</span>
                </div>
              </div>

              <!-- Tombol Kelola: Edit, Fast-Track (Mulai dari Tengah), Hapus -->
              <div class="grid grid-cols-3 gap-1.5 pt-1">
                <button
                  @click="openEditFarmModal"
                  type="button"
                  class="py-2 px-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95"
                  title="Edit data petak sawah"
                >
                  <span>Edit</span>
                </button>

                <button
                  @click="openFastTrackModal"
                  type="button"
                  class="py-2 px-1.5 rounded-xl bg-[#fed701]/10 hover:bg-[#fed701]/20 text-[#324d1d] border border-[#fed701]/40 text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95"
                  title="Sesuaikan fase berjalan untuk lahan konvensional yang sudah mulai"
                >
                  <span>Set Fase</span>
                </button>

                <button
                  @click="handleDeleteFarm"
                  type="button"
                  class="py-2 px-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95"
                  title="Hapus lahan ini"
                >
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          </div>

          <!-- PANEL KEMITRAAN -->
          <div
            v-if="activeFarm"
            class="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-3.5"
          >
            <div
              class="flex items-center justify-between pb-1 border-b border-slate-100"
            >
              <div>
                <h3 class="text-sm text-slate-800 mt-1 font-bold">Pengelola Lahan</h3>
              </div>
              <button
                @click="openManageCollabModal"
                class="text-xs font-bold text-[#324d1d] bg-[#99c30c]/10 hover:bg-[#99c30c]/20 px-2.5 py-1.5 rounded-xl border border-[#99c30c]/40 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
              >
                Kelola
              </button>
            </div>

            <div class="space-y-2 pt-1">
              <!-- Kartu Pemilik Lahan (Porsi Utama) -->
              <div
                class="p-2.5 rounded-2xl border border-[#99c30c]/60 bg-[#99c30c]/60 flex items-start justify-between gap-2 shadow-2xs"
              >
                <div class="space-y-0.5">
                  <div class="flex items-center gap-1.5">
                    <h4 class="text-xs text-slate-800 font-bold">
                      {{ currentPersona.name || "Pemilik Lahan" }}
                    </h4>
                    <span
                      class="text-[9px] bg-[#99c30c]/30 text-[#324d1d] px-1.5 py-0.2 rounded-md font-bold"
                      >Pemilik</span
                    >
                  </div>
                  <p class="text-[10px] font-semibold text-slate-500">
                    Pemegang Hak & Sisa Porsi Bagi Hasil
                  </p>
                </div>
                <div class="text-right shrink-0">
                  <span
                    class="text-xs text-[#324d1d] bg-[#99c30c]/20 px-2 py-0.5 rounded-lg font-bold"
                    >{{ ownerSharePercentage }}%</span
                  >
                </div>
              </div>

              <!-- List Kolaborator -->
              <div
                v-for="(collab, cIdx) in activeFarm.collaborators || []"
                :key="collab.id"
                class="p-2.5 rounded-2xl border flex items-start justify-between gap-2"
                :class="getCollabCardClass(cIdx)"
              >
                <div class="space-y-0.5">
                  <div class="flex items-center gap-1.5">
                    <span
                      class="w-2.5 h-2.5 rounded-full shrink-0"
                      :class="getCollabColorDot(cIdx)"
                    ></span>
                    <h4 class="text-xs text-slate-800 font-bold">
                      {{ collab.name }}
                    </h4>
                    <span
                      v-if="collab.status === 'PENDING'"
                      class="text-[8px] bg-[#fed701]/20 font-bold text-[#324d1d] px-1.5 py-0.2 rounded-md border border-[#fed701]/40"
                    >
                      Menunggu
                    </span>
                  </div>
                  <p class="text-[10px] font-semibold text-slate-500">
                    {{ collab.role }}
                  </p>
                </div>
                <div class="text-right shrink-0">
                  <span class="text-xs text-slate-800 font-bold"
                    >{{ collab.share_percentage }}%</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL EDIT LAHAN -->
    <ModalDialog
      v-if="isEditFarmModalOpen && activeFarm"
      @close="isEditFarmModalOpen = false"
    >
      <div class="space-y-1">
        <div
          class="inline-flex items-center gap-1.5 bg-[#99c30c]/20 text-[#324d1d] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase"
        >
          Kelola Petak Sawah
        </div>
        <h3 class="text-base text-slate-800 font-bold">Edit Data Petak Lahan</h3>
      </div>

      <form @submit.prevent="handleUpdateFarmland" class="space-y-3 pt-1">
        <div>
          <FormLabel>Nama / Identitas Petak Lahan</FormLabel>
          <input
            v-model="editFarmForm.name"
            type="text"
            required
            class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#99c30c]"
          />
        </div>

        <div>
          <FormLabel>Luas Lahan (Hektar)</FormLabel>
          <input
            v-model.number="editFarmForm.land_size_ha"
            type="number"
            step="0.05"
            min="0.05"
            required
            class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#99c30c]"
          />
        </div>

        <div>
          <FormLabel>Komoditas yang Ditanam</FormLabel>
          <select
            v-model="editFarmForm.commodity"
            class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#99c30c] bg-white cursor-pointer"
          >
            <option value="Padi Sawah Inpari 32">
              Padi Sawah (Inpari 32 Bersertifikat)
            </option>
            <option value="Padi Ciherang">Padi Ciherang Unggul</option>
            <option value="Padi Mekongga">Padi Mekongga</option>
            <option value="Jagung Hibrida Bisi-18">
              Jagung Hibrida Bisi-18
            </option>
            <option value="Kedelai Anjasmoro">Kedelai Anjasmoro</option>
          </select>
        </div>

        <div>
          <FormLabel>Lokasi Lahan</FormLabel>
          <input
            v-model="editFarmForm.location"
            type="text"
            required
            class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-[#99c30c]"
          />
        </div>

        <div>
          <FormLabel>Tanggal Mulai Tanam (Dasar Hitung HST)</FormLabel>
          <input
            v-model="editFarmForm.planting_date"
            type="date"
            class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-[#99c30c] bg-white"
          />
        </div>

        <div class="pt-2 flex items-center gap-2">
          <button
            type="button"
            @click="isEditFarmModalOpen = false"
            class="flex-1 py-2 px-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-[#fff2d9] active:scale-95 transition-all cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="isSubmittingEditFarm"
            class="flex-1 bg-[#324d1d]/90 hover:bg-[#324d1d] text-white text-xs font-bold py-2 px-3 rounded-xl shadow-2xs active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-60 cursor-pointer"
          >
            <Loader2
              v-if="isSubmittingEditFarm"
              :size="14"
              class="animate-spin"
            />
            <span>{{
              isSubmittingEditFarm ? "Menyimpan..." : "Simpan Perubahan"
            }}</span>
          </button>
        </div>
      </form>
    </ModalDialog>

    <!-- MODAL FAST-TRACK: MULAI DARI TENGAH (SESUAIKAN FASE BERJALAN) -->
    <ModalDialog
      v-if="isFastTrackModalOpen && activeFarm"
      @close="isFastTrackModalOpen = false"
    >
      <div class="space-y-1">
        <div
          class="inline-flex items-center gap-1.5 bg-[#fed701]/20 text-[#324d1d] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase"
        >
          Fitur Petani Konvensional
        </div>
        <h3 class="text-base text-slate-800">
          Mulai dari Fase Lapangan Saat Ini
        </h3>
        <p class="text-xs text-slate-500 leading-relaxed">
          Jika lahan padi sudah berjalan dan ingin langsung memantau dari fase
          tertentu, pilih fase aktif di bawah. Fase sebelumnya akan otomatis
          <strong>Selesai</strong>.
        </p>
      </div>

      <form @submit.prevent="handleFastTrackSubmit" class="space-y-3.5 pt-1">
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1.5"
            >Pilih Fase yang Sedang Berjalan:</label
          >
          <div class="space-y-2">
            <label
              v-for="st in [
                {
                  no: 1,
                  name: 'Fase 1: Olah Tanah & Bajak Garu',
                  range: 'H-14 s/d H-1',
                },
                {
                  no: 2,
                  name: 'Fase 2: Tanam Padi & Persemaian',
                  range: 'HST 1 - 15',
                },
                {
                  no: 3,
                  name: 'Fase 3: Pemupukan & Perawatan Vegetatif',
                  range: 'HST 16 - 45',
                },
                {
                  no: 4,
                  name: 'Fase 4: Proteksi Hama & Generatif',
                  range: 'HST 46 - 80',
                },
                {
                  no: 5,
                  name: 'Fase 5: Pengeringan & Panen Raya',
                  range: 'HST 81 - 115',
                },
              ]"
              :key="st.no"
              class="flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all text-xs"
              :class="
                fastTrackStepNo === st.no
                  ? 'border-[#99c30c] bg-[#99c30c]/80 ring-2 ring-[#99c30c]/30'
                  : 'border-slate-200 hover:border-slate-300 bg-[#fff2d9]/50'
              "
            >
              <div class="flex items-center gap-2.5">
                <input
                  type="radio"
                  :value="st.no"
                  v-model="fastTrackStepNo"
                  @change="onFastTrackPhaseChanged"
                  class="text-[#324d1d] focus:ring-[#99c30c]"
                />
                <div>
                  <p class="font-extrabold text-slate-800">{{ st.name }}</p>
                  <p class="text-[10px] text-slate-500 font-semibold">
                    {{ st.range }}
                  </p>
                </div>
              </div>
              <span
                v-if="fastTrackStepNo === st.no"
                class="text-[9px] uppercase bg-[#99c30c]/30 text-[#324d1d] px-2 py-0.5 rounded-full"
              >
                Dipilih
              </span>
            </label>
          </div>
        </div>

        <div>
          <FormLabel>Estimasi Tanggal Tanam</FormLabel>
          <input
            v-model="fastTrackPlantingDate"
            type="date"
            required
            class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-[#99c30c] bg-white"
          />
          <p class="text-[10px] text-slate-400 mt-1">
            Tanggal tanam disesuaikan otomatis dengan estimasi umur tanaman
            (HST).
          </p>
        </div>

        <div class="pt-2 flex items-center gap-2">
          <button
            type="button"
            @click="isFastTrackModalOpen = false"
            class="flex-1 py-2 px-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-[#fff2d9] active:scale-95 transition-all cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="isSubmittingFastTrack"
            class="flex-1 bg-[#324d1d]/90 hover:bg-[#324d1d] text-white text-xs font-bold py-2 px-3 rounded-xl shadow-2xs active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-60 cursor-pointer"
          >
            <Loader2
              v-if="isSubmittingFastTrack"
              :size="14"
              class="animate-spin"
            />
            <span>{{
              isSubmittingFastTrack ? "Menyesuaikan..." : "Terapkan Fase"
            }}</span>
          </button>
        </div>
      </form>
    </ModalDialog>

    <!-- MODAL 1: TAMBAH SAWAH BARU -->
    <ModalDialog v-if="isAddFarmModalOpen" @close="isAddFarmModalOpen = false">
      <div class="space-y-1">
        <div
          class="inline-flex items-center gap-1.5 bg-[#99c30c]/20 text-[#324d1d] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase"
        >
          Petak Sawah Baru
        </div>
        <h3 class="text-base text-slate-800 font-bold">Tambah Lahan yang Dikerjakan</h3>
      </div>

      <form @submit.prevent="handleCreateFarmland" class="space-y-3 pt-1">
        <div>
          <FormLabel>Nama / Identitas Petak Lahan</FormLabel>
          <input
            v-model="newFarmForm.name"
            type="text"
            required
            placeholder="Contoh: Sawah Blok Legok, Sawah Petak Selokan"
            class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-[#99c30c]"
          />
        </div>

        <div>
          <FormLabel>Luas Lahan (Hektar)</FormLabel>
          <input
            v-model.number="newFarmForm.land_size_ha"
            type="number"
            step="0.05"
            min="0.05"
            required
            class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#99c30c]"
          />
        </div>

        <div>
          <FormLabel>Komoditas yang Ditanam</FormLabel>
          <select
            v-model="newFarmForm.commodity"
            class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#99c30c] bg-white cursor-pointer"
          >
            <option value="Padi Sawah Inpari 32">
              Padi Sawah (Inpari 32 Bersertifikat)
            </option>
            <option value="Padi Ciherang">Padi Ciherang Unggul</option>
            <option value="Jagung Hibrida Bisi-18">
              Jagung Hibrida Bisi-18
            </option>
            <option value="Kedelai Anjasmoro">Kedelai Anjasmoro</option>
          </select>
        </div>

        <div>
          <FormLabel>Lokasi Lahan</FormLabel>
          <input
            v-model="newFarmForm.location"
            type="text"
            required
            placeholder="Contoh: Desa Sukamaju Blok Timur"
            class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-[#99c30c]"
          />
        </div>

        <div class="pt-2 flex items-center gap-2">
          <button
            type="button"
            @click="isAddFarmModalOpen = false"
            class="flex-1 py-2 px-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-[#fff2d9] active:scale-95 transition-all cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="isSubmittingFarm"
            class="flex-1 bg-[#324d1d]/90 hover:bg-[#324d1d] text-white text-xs font-bold py-2 px-3 rounded-xl shadow-2xs active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-60 cursor-pointer"
          >
            <Loader2 v-if="isSubmittingFarm" :size="14" class="animate-spin" />
            <span>{{
              isSubmittingFarm ? "Menyimpan..." : "Simpan Lahan"
            }}</span>
          </button>
        </div>
      </form>
    </ModalDialog>

    <!-- MODAL 2: KELOLA KOLABORATOR & BAGI HASIL -->
    <ModalDialog
      v-if="isManageCollabModalOpen && activeFarm"
      @close="isManageCollabModalOpen = false"
    >
      <div class="space-y-1">
        <div
          class="inline-flex items-center gap-1.5 bg-[#99c30c]/20 text-[#324d1d] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase"
        >
          Kemitraan Usahatani
        </div>
        <h3 class="text-base text-slate-800 font-bold">
          Kelola Kolaborator & Bagi Hasil
        </h3>
        <p class="text-xs text-slate-500">
          Atur pihak yang mengelola lahan beserta persentase bagi hasil panen.
        </p>
      </div>

      <!-- Daftar Kolaborator Saat Ini -->
      <div class="space-y-2 max-h-56 overflow-y-auto pr-1">
        <!-- Kartu Pemilik Lahan (Porsi Utama Auto-Balance) -->
        <div
          class="p-2.5 rounded-2xl border border-[#99c30c]/60 bg-[#99c30c]/70 flex items-center justify-between text-xs"
        >
          <div class="flex items-center gap-2">
            <div>
              <div class="flex items-center gap-1.5">
                <p class="text-slate-800 font-bold">
                  {{ currentPersona.name || "Pemilik Lahan" }}
                </p>
              </div>
              <p class="text-[10px] text-slate-500 font-semibold">
                Pemilik Lahan
              </p>
            </div>
          </div>
          <div class="text-right">
            <span
              class="text-[#324d1d] bg-[#99c30c]/80 px-2 py-0.5 rounded-lg text-xs font-bold"
              >{{ ownerSharePercentage }}%</span
            >
          </div>
        </div>

        <!-- Kolaborator Lainnya -->
        <div
          v-for="collab in activeFarm?.collaborators || []"
          :key="collab.id"
          class="p-2.5 rounded-2xl border border-slate-200 bg-[#fff2d9] flex items-center justify-between text-xs"
        >
          <div>
            <div class="flex items-center gap-1.5">
              <p class="font-bold text-slate-800">{{ collab.name }}</p>
              <span
                class="text-[9px] px-1.5 py-0.2 rounded-md"
                :class="
                  collab.status === 'PENDING'
                    ? 'bg-[#fed701]/20 text-[#324d1d] border border-[#fed701]/40'
                    : 'bg-[#99c30c]/20 text-[#324d1d]'
                "
              >
                {{
                  collab.status === "PENDING" ? "Menunggu Persetujuan" : "Aktif"
                }}
              </span>
            </div>
            <p class="text-[10px] text-slate-500 font-bold">
              {{ collab.role }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <span
              class="text-slate-800 bg-white border border-slate-200 px-2 py-0.5 rounded-lg font-bold"
              >{{ collab.share_percentage }}%</span
            >
            <button
              @click="handleRemoveCollaborator(collab.id)"
              class="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
              title="Hapus kolaborator"
            >
              <Trash2 :size="13" />
            </button>
          </div>
        </div>
      </div>

      <form
        @submit.prevent="handleAddCollaborator"
        class="space-y-2.5 pt-2 border-t border-slate-100"
      >
        <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider block"
          >Tag & Undang Mitra Baru</span
        >

        <!-- Typeahead / Pilih Mitra Berdasarkan Pencarian Teks (Select by Typing) -->
        <div class="relative">
          <label
            class="text-[12px] font-bold text-slate-500 block mb-1"
          >
            Cari & Pilih Pengguna AgriBuddy
          </label>

          <!-- State 1: Mitra Telah Dipilih -->
          <div
            v-if="selectedUserToTag"
            class="flex items-center justify-between p-2.5 rounded-xl border border-[#99c30c]/60 bg-[#99c30c]/80 shadow-2xs"
          >
            <div class="flex items-center gap-2">
              <img :src="farmer" alt="Petani" class="w-6 h-6 object-contain" />
              <div>
                <div class="text-xs text-slate-800 flex items-center gap-1.5 font-bold">
                  <span>{{
                    selectedUserToTag.name || selectedUserToTag.full_name
                  }}</span>
                  <span
                    class="text-[10px] text-[#324d1d] font-bold bg-[#99c30c]/20 px-1.5 py-0.2 rounded-md"
                  >
                    @{{ selectedUserToTag.username }}
                  </span>
                </div>
                <div class="text-[10px] text-slate-500 font-semibold">
                  {{
                    selectedUserToTag.badge ||
                    selectedUserToTag.category_badge ||
                    selectedUserToTag.role_label
                  }}
                  •
                  {{ selectedUserToTag.location || selectedUserToTag.village }}
                </div>
              </div>
            </div>
            <button
              type="button"
              @click="clearSelectedUser"
              class="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-white transition-all cursor-pointer"
              title="Ganti Mitra"
            >
              <X :size="14" />
            </button>
          </div>

          <!-- State 2: Kolom Pencarian Teks Dinamis -->
          <div v-else class="relative">
            <div class="relative flex items-center">
              <span
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"
              >
                <Search :size="14" />
              </span>
              <input
                v-model="searchCollabQuery"
                type="text"
                placeholder="Ketik untuk mencari mitra (@pak_joko, bambang, slamet...)"
                class="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-[#99c30c] focus:ring-2 focus:ring-[#99c30c]/20 bg-white"
                @focus="isCollabDropdownOpen = true"
                @input="handleCollabSearchInput"
              />
              <button
                v-if="searchCollabQuery"
                type="button"
                @click="
                  searchCollabQuery = '';
                  isCollabDropdownOpen = false;
                "
                class="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X :size="13" />
              </button>
            </div>

            <!-- Hasil Pencarian Teks (Dropdown Popover) -->
            <div
              v-if="isCollabDropdownOpen"
              class="absolute left-0 right-0 mt-1 max-h-52 overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-1 space-y-0.5"
            >
              <div
                v-if="filteredUsersToTag.length === 0"
                class="p-3 text-center text-xs text-slate-400 font-medium"
              >
                Tidak ditemukan kata kunci "<span
                  class="font-bold text-slate-600"
                  >{{ searchCollabQuery }}</span
                >".
              </div>
              <button
                v-for="u in filteredUsersToTag"
                :key="u.id"
                type="button"
                @click="selectUserToTag(u)"
                class="w-full p-2 rounded-xl hover:bg-[#99c30c]/10 text-left flex items-center justify-between transition-all group cursor-pointer"
              >
                <div class="flex items-center gap-2">
                  <img
                    :src="farmer"
                    alt="Petani"
                    class="w-6 h-6 object-contain group-hover:scale-110 transition-transform"
                  />
                  <div>
                    <div
                      class="text-xs font-bold text-slate-800 flex items-center gap-1.5"
                    >
                      <span>{{ u.name || u.full_name }}</span>
                      <span
                        class="text-[10px] text-[#324d1d] font-bold bg-[#99c30c]/70 px-1 py-0.2 rounded"
                      >
                        @{{ u.username }}
                      </span>
                    </div>
                    <div class="text-[10px] text-slate-500 line-clamp-1">
                      {{ u.badge || u.category_badge || u.role_label }} •
                      {{ u.location || u.village }}
                    </div>
                  </div>
                </div>
                <span
                  class="text-[10px] font-bold text-[#324d1d] opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Pilih
                </span>
              </button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label
              class="text-[10px] font-bold text-slate-500 uppercase block mb-1"
              >Peran</label
            >
            <input
              v-model="newCollabForm.role"
              type="text"
              required
              placeholder="Peran (misal: Penggarap)"
              class="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-[#99c30c]"
            />
          </div>
          <div>
            <label
              class="text-[10px] font-bold text-slate-500 uppercase block mb-1"
            >
              Porsi Bagi Hasil (Maks {{ ownerSharePercentage }}%)
            </label>
            <div class="relative">
              <input
                v-model.number="newCollabForm.share_percentage"
                type="number"
                min="1"
                :max="ownerSharePercentage"
                required
                class="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#99c30c]"
              />
              <span
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-xs font-bold text-slate-400"
                >%</span
              >
            </div>
          </div>
        </div>

        <!-- Info Simulasi Proporsional Porsi Pemilik -->
        <div
          class="p-2.5 rounded-xl bg-[#fff2d9] border border-slate-200 text-[11px] space-y-1"
        >
          <div class="flex justify-between font-bold">
            <span class="text-slate-500">Porsi Pemilik Saat Ini:</span>
            <span class="text-slate-800">{{ ownerSharePercentage }}%</span>
          </div>
          <div class="flex justify-between font-bold">
            <span class="text-[#324d1d]">Porsi Pemilik Setelah Ditambah:</span>
            <span
              :class="
                ownerSharePercentage - (newCollabForm.share_percentage || 0) < 0
                  ? 'text-rose-600'
                  : 'text-[#324d1d]'
              "
            >
              {{
                Math.max(
                  0,
                  ownerSharePercentage - (newCollabForm.share_percentage || 0),
                )
              }}%
            </span>
          </div>
        </div>

        <button
          type="submit"
          :disabled="isSubmittingCollab || ownerSharePercentage <= 0"
          class="w-full bg-[#324d1d]/90 hover:bg-[#324d1d] text-white text-xs font-bold py-2 px-3 rounded-xl shadow-2xs active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer disabled:opacity-60"
        >
          <Loader2 v-if="isSubmittingCollab" :size="13" class="animate-spin" />
          <span v-else>Kirim Undangan Kolaborasi</span>
        </button>
      </form>
    </ModalDialog>

    <!-- MODAL 3: CATAT MODAL MANUAL -->
    <ModalDialog
      v-if="isAddExpenseModalOpen && activeFarm"
      @close="isAddExpenseModalOpen = false"
    >
      <div class="space-y-1">
        <div
          class="inline-flex items-center gap-1.5 bg-[#99c30c]/20 text-[#324d1d] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase"
        >
          Buku Modal Lapangan
        </div>
        <h3 class="text-base text-slate-800 font-bold">Catat Pengeluaran Usahatani</h3>
      </div>

      <form @submit.prevent="handleCreateManualExpense" class="space-y-3 pt-1">
        <div>
          <FormLabel>Nama Pengeluaran / Barang</FormLabel>
          <input
            v-model="manualExpenseForm.item_name"
            type="text"
            required
            placeholder="Contoh: Beli Bambu Ajir, Solar Pompa, Upah Makan Buruh"
            class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-[#99c30c]"
          />
        </div>

        <div>
          <FormLabel>Nominal Biaya (Rp)</FormLabel>
          <input
            v-model.number="manualExpenseForm.amount"
            type="number"
            step="1000"
            min="1000"
            required
            class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#99c30c]"
          />
        </div>

        <div>
          <FormLabel>Alokasi ke Fase / Pos Modal</FormLabel>
          <select
            v-model="manualExpenseForm.category"
            class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#99c30c] bg-white cursor-pointer"
          >
            <option value="OLAH_TANAH">
              Fase 1: Olah Tanah & Persemaian (Traktor, Bajak Singkal)
            </option>
            <option value="BENIH_BIBIT">
              Fase 2: Penanaman Bibit (Benih Bersertifikat, Dapog)
            </option>
            <option value="PUPUK_NUTRISI">
              Fase 3: Fase Vegetatif (Pupuk Urea, NPK, Organik)
            </option>
            <option value="OBAT_HAMA">
              Fase 4: Fase Generatif & Bunting (Insektisida, Fungisida)
            </option>
            <option value="PENGAIRAN">
              Operasional Pompa & Pengairan Irigasi Darurat
            </option>
            <option value="TENAGA_KERJA">
              Upah Tenaga Kerja Borongan / Buruh Tani
            </option>
            <option value="LAINNYA">
              Fase 5: Pematangan Bulir & Panen Raya (Logistik, Karung)
            </option>
          </select>
        </div>

        <div class="pt-2 flex items-center gap-2">
          <button
            type="button"
            @click="isAddExpenseModalOpen = false"
            class="flex-1 py-2 px-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-[#fff2d9] active:scale-95 transition-all cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="isSubmittingExpense"
            class="flex-1 bg-[#324d1d]/90 hover:bg-[#324d1d] text-white text-xs font-bold py-2 px-3 rounded-xl shadow-2xs active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-60 cursor-pointer"
          >
            <Loader2
              v-if="isSubmittingExpense"
              :size="14"
              class="animate-spin"
            />
            <Check v-else :size="14" />
            <span>{{
              isSubmittingExpense ? "Menyimpan..." : "Simpan ke Modal"
            }}</span>
          </button>
        </div>
      </form>
    </ModalDialog>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  api,
  FarmPlan,
  TimelinePhase,
  Farmland,
  Collaborator,
  CapitalExpense,
} from "@/services/api";
import { useUserState, PERSONAS } from "@/services/userState";
import FarmlandMapPicker from "@/components/FarmlandMapPicker.vue";
import {
  showConfirm,
  showSuccess,
  showSuccessHtml,
  showError,
  showWarning,
} from "@/utils/swal";
import {
  Sparkles,
  Calculator,
  CloudSun,
  Coins,
  CalendarCheck,
  Users2,
  MessageSquare,
  Clock,
  Phone,
  Loader2,
  MapPin,
  Layers,
  UserPlus,
  PlusCircle,
  Receipt,
  Trash2,
  Check,
  Scale,
  CheckSquare,
  Navigation,
  FolderKanban,
  Bookmark,
  Play,
  Pencil,
  Search,
  X,
  ChevronDown,
} from "lucide-vue-next";
import FormLabel from "@/components/ui/FormLabel.vue";
import ModalDialog from "@/components/ui/ModalDialog.vue";
import PageLayout from "@/components/layout/PageLayout.vue";
import SectionCard from "@/components/ui/SectionCard.vue";
import SectionHeader from "@/components/ui/SectionHeader.vue";

const route = useRoute();
const router = useRouter();
const { currentUserId, currentPersona } = useUserState();

// Top-Level Tab State (Synced with Sidebar Subgroup & Query Param)
const topTab = ref<"rencana" | "kontrol">("rencana");
const activePlanTab = ref<"rab" | "mitra">("rab");

const setTopTab = (tab: "rencana" | "kontrol") => {
  topTab.value = tab;
  router.replace({ query: { ...route.query, tab } });
};

watch(
  () => route.query.tab,
  (newTab) => {
    if (newTab === "kontrol" || newTab === "ceklis") {
      topTab.value = "kontrol";
    } else {
      topTab.value = "rencana";
    }
  },
  { immediate: true },
);

// --- WIZARD STEPPER & SUB-MODE STATE (TAB 1: RENCANA TANAM) ---
const rencanaSubMode = ref<"wizard" | "saved">("wizard");
const wizardStep = ref<1 | 2 | 3>(1);
const isLoading = ref(false);
const isDetectingLocation = ref(false);
const aiLocationRecommendationNote = ref("");
const isSavingToActive = ref(false);
const isSavingDraft = ref(false);

const plan = ref<FarmPlan | null>(null);

const form = ref({
  name: "Sawah Blok Cempaka 1",
  land_size_ha: 1.0,
  commodity: "Padi Sawah Inpari 32",
  soil_type: "Lempung Berliat (Subur)",
  water_source: "Irigasi Teknis Bendungan",
  location: "Desa Sukamaju, Jawa Timur",
  latitude: -7.2504,
  longitude: 112.7512,
  coordinates_label: "-7.2504, 112.7512 (Desa Sukamaju)",
});

const onCoordinatesUpdated = (data: {
  lat: number;
  lon: number;
  label: string;
}) => {
  form.value.latitude = data.lat;
  form.value.longitude = data.lon;
  form.value.location = data.label;
  form.value.coordinates_label = `${data.lat.toFixed(4)}, ${data.lon.toFixed(4)}`;
};

// Deteksi GPS & Rekomendasi Cerdas AI untuk Komoditas, Tanah, & Air
const detectMyLocationAndAutoFillAI = () => {
  if (!navigator.geolocation) {
    alert("Browser Anda tidak mendukung geolokasi GPS.");
    return;
  }
  isDetectingLocation.value = true;
  aiLocationRecommendationNote.value = "";

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      form.value.latitude = lat;
      form.value.longitude = lon;
      form.value.coordinates_label = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;

      // Ambil nama wilayah/desa via reverse geocode
      try {
        const resp = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
        );
        const data = await resp.json();
        if (data && data.address) {
          const village =
            data.address.village ||
            data.address.suburb ||
            data.address.town ||
            data.address.city_district ||
            "Desa Sukamaju";
          const regency =
            data.address.county || data.address.city || "Kabupaten";
          form.value.location = `${village}, ${regency}`;
        }
      } catch (e) {
        form.value.location = `Titik Koordinat (${lat.toFixed(4)}, ${lon.toFixed(4)})`;
      }

      // AI Recommendation Engine: Memilihkan Komoditas, Tanah, & Sumber Air
      if (lat < -7.3) {
        form.value.commodity = "Padi Sawah Inpari 32";
        form.value.soil_type = "Aluvial Sawah Teknis";
        form.value.water_source = "Irigasi Teknis Bendungan";
        aiLocationRecommendationNote.value =
          "AI menganalisis lokasi Anda: Komoditas Padi Sawah Inpari 32, Tanah Aluvial Sawah Teknis, & Irigasi Teknis Bendungan otomatis dipilihkan.";
      } else {
        form.value.commodity = "Padi Sawah Inpari 32";
        form.value.soil_type = "Lempung Berliat (Subur)";
        form.value.water_source = "Irigasi Teknis Bendungan";
        aiLocationRecommendationNote.value =
          "AI mendeteksi agroekosistem lokasi Anda: Padi Sawah Inpari 32, Tanah Lempung Berliat, & Irigasi Teknis Bendungan otomatis dipilihkan.";
      }
      isDetectingLocation.value = false;
    },
    (err) => {
      // Fallback default Sukamaju jika GPS denied/timeout
      form.value.latitude = -7.2504;
      form.value.longitude = 112.7512;
      form.value.location = "Desa Sukamaju, Jawa Timur";
      form.value.commodity = "Padi Sawah Inpari 32";
      form.value.soil_type = "Lempung Berliat (Subur)";
      form.value.water_source = "Irigasi Teknis Bendungan";
      aiLocationRecommendationNote.value =
        "Lokasi default Sukamaju: AI memilihkan Padi Sawah Inpari 32, Tanah Lempung Berliat, & Irigasi Teknis Bendungan.";
      isDetectingLocation.value = false;
    },
    { timeout: 7000 },
  );
};

// Jalankan kalkulasi RAB AI dan maju ke Step 2
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
      coordinates_label: form.value.coordinates_label,
    });
    plan.value = res;
    wizardStep.value = 2; // Otomatis berpindah ke Step 2 (RAB)
  } catch (err: any) {
    alert(err.message || "Gagal menghitung rencana tani");
  } finally {
    isLoading.value = false;
  }
};

// Simpan rencana sebagai draft usahatani
const savePlanAsDraft = async () => {
  try {
    isSavingDraft.value = true;
    const nameToSave =
      form.value.name.trim() || `Draft Rencana (${form.value.commodity})`;
    await api.createFarmland(
      {
        name: nameToSave,
        status: "DRAFT",
        land_size_ha: form.value.land_size_ha,
        commodity: form.value.commodity,
        location: form.value.location,
        latitude: form.value.latitude,
        longitude: form.value.longitude,
        soil_type: form.value.soil_type,
        water_source: form.value.water_source,
      },
      currentUserId.value,
    );

    await loadFarmlands();
    rencanaSubMode.value = "saved";
  } catch (err: any) {
    alert(err.message || "Gagal menyimpan draft rencana");
  } finally {
    isSavingDraft.value = false;
  }
};

// Reset form dan buka rancangan baru
const createNewPlanDraft = () => {
  form.value = {
    name: "Sawah Blok Baru",
    land_size_ha: 1.0,
    commodity: "Padi Sawah Inpari 32",
    soil_type: "Lempung Berliat (Subur)",
    water_source: "Irigasi Teknis Bendungan",
    location: currentPersona.value.location || "Desa Sukamaju, Jawa Timur",
    latitude: -7.2504,
    longitude: 112.7512,
    coordinates_label: "-7.2504, 112.7512 (Desa Sukamaju)",
  };
  wizardStep.value = 1;
  rencanaSubMode.value = "wizard";
  runCalculation();
};

// Edit draft rencana: isi form dan buka wizard di Step 1
const editDraftFarm = async (draft: Farmland) => {
  form.value = {
    name: draft.name,
    land_size_ha: draft.land_size_ha,
    commodity: draft.commodity,
    soil_type: draft.soil_type || "Lempung Berliat (Subur)",
    water_source: draft.water_source || "Irigasi Teknis Bendungan",
    location: draft.location,
    latitude: draft.latitude || -7.2504,
    longitude: draft.longitude || 112.7512,
    coordinates_label: `${draft.latitude ? draft.latitude.toFixed(4) : "-7.2504"}, ${draft.longitude ? draft.longitude.toFixed(4) : "112.7512"} (${draft.location})`,
  };
  wizardStep.value = 1;
  rencanaSubMode.value = "wizard";
  await runCalculation();
};

// Eksekusi / aktivasi draft menjadi lahan garap aktif
const activateDraftFarm = async (draft: Farmland) => {
  const confirmed = await showConfirm({
    title: `Mulai Garap ${draft.name}?`,
    text: "Status akan berubah menjadi aktif dan lahan akan masuk ke modul Kontrol Tanam & Modal Usahatani.",
    confirmButtonText: "Ya",
    cancelButtonText: "Nanti",
    isDanger: false,
    icon: "question",
  });
  if (!confirmed) return;

  try {
    const updated = await api.updateFarmland(draft.id, { status: "ACTIVE" });
    await loadFarmlands();
    await selectFarmland(updated);
    setTopTab("kontrol");
    showSuccess(
      "Lahan Diaktifkan",
      `Petak sawah "${draft.name}" berhasil diaktifkan.`,
    );
  } catch (err: any) {
    showError(
      "Gagal Mengaktifkan",
      err.message || "Gagal mengaktifkan lahan garap",
    );
  }
};

// Hapus draft rencana
const deleteDraftFarm = async (draft: Farmland) => {
  const confirmed = await showConfirm({
    title: `Hapus Draft ${draft.name}?`,
    text: "Draft rencana usahatani ini akan dihapus permanen.",
    confirmButtonText: "Hapus",
    cancelButtonText: "Batal",
    isDanger: true,
  });
  if (!confirmed) return;

  try {
    await api.deleteFarmland(draft.id);
    await loadFarmlands();
    showSuccess(
      "Draft Berhasil Dihapus"
    );
  } catch (err: any) {
    showError(
      "Gagal Menghapus Draft",
      err.message || "Gagal menghapus draft",
    );
  }
};

// Simpan rencana ke lahan aktif & pindah ke Tab Kontrol Tanam & Modal
const savePlanToActiveFarmland = async () => {
  try {
    isSavingToActive.value = true;
    const nameToSave =
      form.value.name.trim() || `Sawah Blok Baru (${form.value.commodity})`;
    const created = await api.createFarmland(
      {
        name: nameToSave,
        status: "ACTIVE",
        land_size_ha: form.value.land_size_ha,
        commodity: form.value.commodity,
        location: form.value.location,
        latitude: form.value.latitude,
        longitude: form.value.longitude,
        soil_type: form.value.soil_type,
        water_source: form.value.water_source,
      },
      currentUserId.value,
    );

    const escapeHtml = (value: string) =>
      value.replace(
        /[&<>"']/g,
        (char) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          })[char]!,
      );

    await loadFarmlands();
    await selectFarmland(created);
    setTopTab("kontrol");
    wizardStep.value = 1; // reset stepper
    showSuccessHtml(
      "Rencana Siap!",
      `Petak <strong>${escapeHtml(nameToSave)}</strong> berhasil didaftarkan.`,
    );
  } catch (err: any) {
    showError(
      "Gagal Menyimpan",
      err.message || "Gagal menyimpan rencana ke lahan aktif",
    );
  } finally {
    isSavingToActive.value = false;
  }
};

// --- MULTI-FARMLAND & DUAL CONTROL (TAB 2: KONTROL TANAM & MODAL) ---
const farmlands = ref<Farmland[]>([]);
const activeFarmId = ref<string>("");
const activeFarmPlan = ref<FarmPlan | null>(null);
const leftPanelTab = ref<"fase" | "kas">("fase");
const rightPanelTab = ref<"kemitraan" | "bukukas">("kemitraan");

const draftFarmlands = computed(() => {
  return farmlands.value.filter((f) => f.status === "DRAFT");
});

const activeFarmlands = computed(() => {
  return farmlands.value.filter((f) => f.status !== "DRAFT");
});

const activeFarm = computed(() => {
  return (
    activeFarmlands.value.find((f) => f.id === activeFarmId.value) ||
    activeFarmlands.value[0] ||
    null
  );
});

// --- EXPAND/COLLAPSE PER FASE CARD (default: SELESAI → collapsed, lainnya → expanded) ---
const expandedPhases = ref<Set<number>>(new Set());

const initPhaseExpansion = (phases: { step_no: number; status: string }[]) => {
  expandedPhases.value = new Set(
    phases.filter((p) => p.status !== "SELESAI").map((p) => p.step_no),
  );
};

const togglePhaseExpand = (stepNo: number) => {
  if (expandedPhases.value.has(stepNo)) {
    expandedPhases.value.delete(stepNo);
  } else {
    expandedPhases.value.add(stepNo);
  }
  // Force reactivity on Set
  expandedPhases.value = new Set(expandedPhases.value);
};

const isPhaseExpanded = (stepNo: number) => expandedPhases.value.has(stepNo);

// Load Plan khusus untuk sawah aktif di Tab 2
const loadActiveFarmPlan = async (farm: Farmland) => {
  try {
    if (farm.timeline_phases && farm.timeline_phases.length > 0) {
      initPhaseExpansion(farm.timeline_phases);
    }
    const res = await api.calculateFarmPlan({
      land_size_ha: farm.land_size_ha,
      commodity: farm.commodity,
      soil_type: farm.soil_type,
      water_source: farm.water_source,
      location: farm.location,
      latitude: farm.latitude,
      longitude: farm.longitude,
      coordinates_label: `${farm.latitude ? farm.latitude.toFixed(4) : "-7.2504"}, ${farm.longitude ? farm.longitude.toFixed(4) : "112.7512"} (${farm.location})`,
    });
    if (farm.timeline_phases && farm.timeline_phases.length > 0) {
      res.timeline_phases = farm.timeline_phases;
    }
    activeFarmPlan.value = res;
    // Init expand/collapse: SELESAI → collapsed, lainnya → expanded
    if (res?.timeline_phases) {
      initPhaseExpansion(res.timeline_phases);
    }
  } catch (e) {
    console.error("Error loading active farm plan:", e);
  }
};

// Modals State
const isAddFarmModalOpen = ref(false);
const isSubmittingFarm = ref(false);
const newFarmForm = ref({
  name: "",
  land_size_ha: 0.8,
  commodity: "Padi Sawah Inpari 32",
  location: "Desa Sukamaju Krajan",
});

const isManageCollabModalOpen = ref(false);
const isSubmittingCollab = ref(false);
const newCollabForm = ref({
  user_id: "",
  name: "",
  role: "Penggarap & Perawatan Lahan",
  share_percentage: 30,
  phone: "",
});

const isAddExpenseModalOpen = ref(false);
const isSubmittingExpense = ref(false);
const manualExpenseForm = ref({
  item_name: "",
  amount: 250000,
  category: "OLAH_TANAH",
});

const completedPhasesCount = computed(() => {
  const currentPhases =
    activeFarm.value?.timeline_phases ||
    activeFarmPlan.value?.timeline_phases ||
    plan.value?.timeline_phases;
  if (!currentPhases) return 0;
  return currentPhases.filter((p) => p.status === "SELESAI").length;
});

const progressPercentage = computed(() => {
  const currentPhases =
    activeFarm.value?.timeline_phases ||
    activeFarmPlan.value?.timeline_phases ||
    plan.value?.timeline_phases;
  if (!currentPhases || currentPhases.length === 0) return 0;
  return Math.round((completedPhasesCount.value / currentPhases.length) * 100);
});

// Checklist State & Storage
const checkedTasks = ref<Record<string, boolean>>({});

const getTaskKey = (stepNo: number, taskIdx: number) => {
  return `${activeFarmId.value}_${stepNo}_${taskIdx}`;
};

const isPhaseTaskDone = (stepNo: number, taskIdx: number) => {
  const key = getTaskKey(stepNo, taskIdx);
  if (checkedTasks.value[key] !== undefined) {
    return checkedTasks.value[key];
  }
  const currentPhases =
    activeFarm.value?.timeline_phases ||
    activeFarmPlan.value?.timeline_phases ||
    plan.value?.timeline_phases;
  const phase = currentPhases?.find((p) => p.step_no === stepNo);
  return phase?.status === "SELESAI";
};

const togglePhaseTask = (stepNo: number, taskIdx: number) => {
  const key = getTaskKey(stepNo, taskIdx);
  checkedTasks.value[key] = !isPhaseTaskDone(stepNo, taskIdx);
  saveCheckedTasks();
};

const getPhaseDoneTasksCount = (stepNo: number) => {
  const currentPhases =
    activeFarm.value?.timeline_phases ||
    activeFarmPlan.value?.timeline_phases ||
    plan.value?.timeline_phases;
  const phase = currentPhases?.find((p) => p.step_no === stepNo);
  if (!phase || !phase.tasks) return 0;
  return phase.tasks.filter((_, idx) => isPhaseTaskDone(stepNo, idx)).length;
};

const loadCheckedTasks = () => {
  try {
    const raw = localStorage.getItem(
      `agribuddy_phase_tasks_${activeFarmId.value}`,
    );
    if (raw) {
      checkedTasks.value = JSON.parse(raw);
    }
  } catch (e) {
    // ignore
  }
};

const saveCheckedTasks = () => {
  try {
    localStorage.setItem(
      `agribuddy_phase_tasks_${activeFarmId.value}`,
      JSON.stringify(checkedTasks.value),
    );
  } catch (e) {
    // ignore
  }
};

// Financial Cockpit for Tab 2
const totalBudgetFormatted = computed(() => {
  const b =
    activeFarm.value?.total_budget ||
    (activeFarmPlan.value || plan.value)?.financial_summary?.total_budget ||
    Math.round((activeFarm.value?.land_size_ha || 0.8) * 6400000);
  return b.toLocaleString("id-ID");
});

const totalSpentValue = computed(() => {
  return (
    activeFarm.value?.capital_expenses?.reduce(
      (acc, curr) => acc + (Number(curr.amount) || 0),
      0,
    ) || 0
  );
});

const totalSpentFormatted = computed(() =>
  totalSpentValue.value.toLocaleString("id-ID"),
);

const remainingBudgetFormatted = computed(() => {
  const b =
    activeFarm.value?.total_budget ||
    (activeFarmPlan.value || plan.value)?.financial_summary?.total_budget ||
    Math.round((activeFarm.value?.land_size_ha || 0.8) * 6400000);
  return Math.max(0, b - totalSpentValue.value).toLocaleString("id-ID");
});

const budgetSpentPercent = computed(() => {
  const b =
    activeFarm.value?.total_budget ||
    (activeFarmPlan.value || plan.value)?.financial_summary?.total_budget ||
    Math.round((activeFarm.value?.land_size_ha || 0.8) * 6400000);
  if (b <= 0) return 0;
  return Math.min(100, Math.round((totalSpentValue.value / b) * 100));
});

const budgetStatusLabel = computed(() => {
  if (budgetSpentPercent.value <= 80) return "Aman (Terkendali Sesuai Rencana)";
  if (budgetSpentPercent.value <= 100)
    return "Waspada (Mendekati Plafon Anggaran)";
  return "Over-Budget (Melebihi Plafon Rencana)";
});

// Phase Expense Mapping
const getExpensesForPhase = (stepNo: number) => {
  if (!activeFarm.value?.capital_expenses) return [];
  const exps = activeFarm.value.capital_expenses;
  switch (stepNo) {
    case 1:
      return exps.filter((e) => e.category === "OLAH_TANAH");
    case 2:
      return exps.filter(
        (e) =>
          e.category === "BENIH_BIBIT" ||
          (e.category === "TENAGA_KERJA" &&
            e.item_name.toLowerCase().includes("tanam")),
      );
    case 3:
      return exps.filter(
        (e) => e.category === "PUPUK_NUTRISI" || e.category === "PENGAIRAN",
      );
    case 4:
      return exps.filter(
        (e) => e.category === "OBAT_HAMA" || e.category === "PESTISIDA",
      );
    case 5:
      return exps.filter(
        (e) => e.category === "LAINNYA" || e.category === "PANEN",
      );
    default:
      return [];
  }
};

const getPhaseAllocatedBudget = (phase: any) => {
  return Number(phase?.allocated_budget ?? phase?.target_cost ?? 0);
};

const getPhaseTasks = (phase: any): string[] => {
  if (Array.isArray(phase?.tasks) && phase.tasks.length > 0) return phase.tasks;
  return [
    "Pemeriksaan dan pencatatan kondisi tanaman di petak sawah",
    "Pengaturan kecukupan air irigasi sesuai fase tumbuh",
    "Pencegahan dan pemantauan organisme pengganggu tanaman (OPT)",
  ];
};

const getActualCostForPhase = (phase: TimelinePhase) => {
  const exps = getExpensesForPhase(phase.step_no);
  const sum = exps.reduce((acc, e) => acc + (Number(e.amount) || 0), 0);
  return sum > 0 ? sum : phase.actual_cost || 0;
};

const getPhaseCategory = (stepNo: number) => {
  switch (stepNo) {
    case 1:
      return "OLAH_TANAH";
    case 2:
      return "BENIH_BIBIT";
    case 3:
      return "PUPUK_NUTRISI";
    case 4:
      return "OBAT_HAMA";
    case 5:
      return "LAINNYA";
    default:
      return "OLAH_TANAH";
  }
};

const getPhasePartner = (stepNo: number) => {
  switch (stepNo) {
    case 1:
      return {
        name: "Mas Bambang (Sewa Traktor Kubota)",
        phone: "081298765432",
      };
    case 2:
      return {
        name: "Mang Udin (Regu Tanam Padi Legowo)",
        phone: "087811223344",
      };
    case 3:
      return {
        name: "Ibu Ratna (Kios Pupuk Subsidi Resmi)",
        phone: "085712345678",
      };
    case 4:
      return {
        name: "Ibu Ratna (Kios KPL Pestisida & Obat)",
        phone: "085712345678",
      };
    case 5:
      return {
        name: "Bpk. Hendra Jaya (Pengepul Gabah GKP)",
        phone: "081356789012",
      };
    default:
      return null;
  }
};

// --- DATA FETCHING & ACTIONS ---
const isFarmLoading = ref(false);
const loadFarmlands = async () => {
  isFarmLoading.value = true;
  try {
    const list = await api.getFarmlands(currentUserId.value);
    farmlands.value = list;
    const activeList = list.filter((f) => f.status !== "DRAFT");
    if (activeList.length > 0) {
      const savedFarmId =
        localStorage.getItem(`agribuddy_active_farm_${currentUserId.value}`) ||
        localStorage.getItem("agribuddy_active_farm_id");
      const queryFarmId = (route.query.farm_id as string) || savedFarmId;
      const target =
        activeList.find((f) => f.id === queryFarmId) || activeList[0];
      activeFarmId.value = target.id;
      await loadActiveFarmPlan(target);
      loadCheckedTasks();
    } else {
      activeFarmId.value = "";
      activeFarmPlan.value = null;
      localStorage.removeItem(`agribuddy_active_farm_${currentUserId.value}`);
      localStorage.removeItem("agribuddy_active_farm_id");
    }
  } catch (err) {
    console.error("Error loading farmlands:", err);
  } finally {
    isFarmLoading.value = false;
  }
};

const selectFarmland = async (farm: Farmland) => {
  activeFarmId.value = farm.id;
  localStorage.setItem(`agribuddy_active_farm_${currentUserId.value}`, farm.id);
  localStorage.setItem("agribuddy_active_farm_id", farm.id);
  await loadActiveFarmPlan(farm);
  loadCheckedTasks();
};

const onActiveFarmChanged = () => {
  const farm = activeFarmlands.value.find((f) => f.id === activeFarmId.value);
  if (farm) {
    selectFarmland(farm);
  }
};

const openAddFarmModal = () => {
  newFarmForm.value = {
    name: `Sawah Petak Baru (${currentPersona.value.name})`,
    land_size_ha: 0.75,
    commodity: "Padi Sawah Inpari 32",
    location: currentPersona.value.location || "Desa Sukamaju",
  };
  isAddFarmModalOpen.value = true;
};

const handleCreateFarmland = async () => {
  try {
    isSubmittingFarm.value = true;
    const created = await api.createFarmland(
      {
        name: newFarmForm.value.name,
        land_size_ha: newFarmForm.value.land_size_ha,
        commodity: newFarmForm.value.commodity,
        location: newFarmForm.value.location,
        latitude: form.value.latitude,
        longitude: form.value.longitude,
        soil_type: form.value.soil_type,
        water_source: form.value.water_source,
      },
      currentUserId.value,
    );

    isAddFarmModalOpen.value = false;
    await loadFarmlands();
    selectFarmland(created);
  } catch (err: any) {
    alert(err.message || "Gagal menambahkan petak sawah");
  } finally {
    isSubmittingFarm.value = false;
  }
};

// --- FITUR KELOLA LAHAN (EDIT, HAPUS, MULAI DARI TENGAH) ---
const isEditFarmModalOpen = ref(false);
const isSubmittingEditFarm = ref(false);
const editFarmForm = ref({
  name: "",
  land_size_ha: 0.8,
  commodity: "Padi Sawah Inpari 32",
  location: "",
  planting_date: "",
});

const openEditFarmModal = () => {
  if (!activeFarm.value) return;
  editFarmForm.value = {
    name: activeFarm.value.name,
    land_size_ha: activeFarm.value.land_size_ha,
    commodity: activeFarm.value.commodity,
    location: activeFarm.value.location,
    planting_date:
      activeFarm.value.planting_date || new Date().toISOString().split("T")[0],
  };
  isEditFarmModalOpen.value = true;
};

const handleUpdateFarmland = async () => {
  if (!activeFarm.value) return;
  try {
    isSubmittingEditFarm.value = true;
    const updated = await api.updateFarmland(activeFarm.value.id, {
      name: editFarmForm.value.name,
      land_size_ha: editFarmForm.value.land_size_ha,
      commodity: editFarmForm.value.commodity,
      location: editFarmForm.value.location,
      planting_date: editFarmForm.value.planting_date,
      total_budget: Math.round(editFarmForm.value.land_size_ha * 6400000),
    });
    isEditFarmModalOpen.value = false;
    await loadFarmlands();
    if (updated) {
      selectFarmland(updated);
    }
    window.dispatchEvent(new CustomEvent("agribuddy:refresh-farmlands"));
    showSuccess(
      "Perubahan Tersimpan",
      `Data lahan "${editFarmForm.value.name}" berhasil diperbarui.`,
    );
  } catch (err: any) {
    showError(
      "Gagal Memperbarui",
      err.message || "Gagal memperbarui data lahan",
    );
  } finally {
    isSubmittingEditFarm.value = false;
  }
};

const handleDeleteFarm = async () => {
  if (!activeFarm.value) return;
  const farmName = activeFarm.value.name;
  const targetFarmId = activeFarm.value.id;
  const confirmed = await showConfirm({
    title: `Hapus Lahan ${farmName}?`,
    text: "Semua data pada lahan ini akan dihapus permanen.",
    confirmButtonText: "Hapus",
    cancelButtonText: "Batal",
    isDanger: true,
  });
  if (!confirmed) return;

  try {
    await api.deleteFarmland(targetFarmId);
    localStorage.removeItem(`agribuddy_active_farm_${currentUserId.value}`);
    localStorage.removeItem("agribuddy_active_farm_id");
    await loadFarmlands();
    window.dispatchEvent(new CustomEvent("agribuddy:refresh-farmlands"));
    showSuccess("Berhasil Dihapus");
  } catch (err: any) {
    showError("Gagal Menghapus", err.message || "Gagal menghapus lahan");
  }
};

// State Fast-Track (Mulai dari Tengah untuk Petani Konvensional)
const isFastTrackModalOpen = ref(false);
const isSubmittingFastTrack = ref(false);
const fastTrackStepNo = ref(2);
const fastTrackPlantingDate = ref("");

const openFastTrackModal = () => {
  if (!activeFarm.value) return;
  const currentPhases = activeFarm.value.timeline_phases || [];
  const running = currentPhases.find((p) => p.status === "SEDANG_BERJALAN");
  fastTrackStepNo.value = running ? running.step_no : 2;
  fastTrackPlantingDate.value =
    activeFarm.value.planting_date || new Date().toISOString().split("T")[0];
  isFastTrackModalOpen.value = true;
};

const onFastTrackPhaseChanged = () => {
  const now = new Date();
  let daysAgo = 0;
  if (fastTrackStepNo.value === 2) daysAgo = 5;
  else if (fastTrackStepNo.value === 3) daysAgo = 25;
  else if (fastTrackStepNo.value === 4) daysAgo = 55;
  else if (fastTrackStepNo.value === 5) daysAgo = 90;

  const estimatedDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  fastTrackPlantingDate.value = estimatedDate.toISOString().split("T")[0];
};

const handleFastTrackSubmit = async () => {
  if (!activeFarm.value) return;
  try {
    isSubmittingFastTrack.value = true;
    const res = await api.setActiveFarmlandPhase(
      activeFarm.value.id,
      fastTrackStepNo.value,
      fastTrackPlantingDate.value,
    );
    isFastTrackModalOpen.value = false;
    await loadFarmlands();
    window.dispatchEvent(new CustomEvent("agribuddy:refresh-farmlands"));
    showSuccess(
      "Fase Lapangan Diterapkan",
      res.message || "Status siklus budidaya berhasil disesuaikan!",
    );
  } catch (err: any) {
    showError(
      "Gagal Mengatur Fase",
      err.message || "Gagal mengatur fase berjalan",
    );
  } finally {
    isSubmittingFastTrack.value = false;
  }
};

const ownerSharePercentage = computed(() => {
  if (!activeFarm.value) return 100;
  const collabs = activeFarm.value.collaborators || [];
  const totalCollabsShare = collabs
    .filter((c) => c.status !== "REJECTED")
    .reduce((sum, c) => sum + (Number(c.share_percentage) || 0), 0);
  return Math.max(0, 100 - totalCollabsShare);
});

// Collaborator Typeahead / Select-by-typing State
const searchCollabQuery = ref("");
const isCollabDropdownOpen = ref(false);
const selectedUserToTag = ref<any | null>(null);
const dynamicUsersList = ref<any[]>([]);

const fetchSearchableUsers = async (query = "") => {
  try {
    const list = await api.searchUsers(query);
    dynamicUsersList.value = list || [];
  } catch {
    dynamicUsersList.value = [];
  }
};

const filteredUsersToTag = computed(() => {
  const query = searchCollabQuery.value.trim().toLowerCase().replace(/^@/, "");

  // Gabungkan static PERSONAS dan dynamic users dari API secara unik
  const map = new Map<string, any>();
  for (const p of Object.values(PERSONAS)) {
    if (p.id !== currentUserId.value) {
      map.set(p.id, p);
    }
  }
  for (const u of dynamicUsersList.value) {
    if (u.id !== currentUserId.value) {
      map.set(u.id, u);
    }
  }

  const all = Array.from(map.values());
  if (!query) return all;

  return all.filter((u) => {
    const name = (u.name || u.full_name || "").toLowerCase();
    const uname = (u.username || "").toLowerCase();
    const badge = (
      u.badge ||
      u.category_badge ||
      u.role_label ||
      ""
    ).toLowerCase();
    const loc = (u.location || u.village || "").toLowerCase();
    return (
      name.includes(query) ||
      uname.includes(query) ||
      badge.includes(query) ||
      loc.includes(query)
    );
  });
});

const handleCollabSearchInput = () => {
  isCollabDropdownOpen.value = true;
  if (searchCollabQuery.value.length >= 2) {
    fetchSearchableUsers(searchCollabQuery.value);
  }
};

const selectUserToTag = (user: any) => {
  selectedUserToTag.value = user;
  newCollabForm.value.user_id = user.id;
  newCollabForm.value.name = user.name || user.full_name;
  newCollabForm.value.role =
    user.badge ||
    user.category_badge ||
    user.serviceCategory ||
    user.role_label ||
    "Penggarap & Perawatan Lahan";
  if (user.whatsapp_number || user.phone_number) {
    newCollabForm.value.phone = user.whatsapp_number || user.phone_number;
  }
  isCollabDropdownOpen.value = false;
};

import {
  PlusCircle
} from 'lucide-vue-next';

const clearSelectedUser = () => {
  selectedUserToTag.value = null;
  newCollabForm.value.user_id = "";
  newCollabForm.value.name = "";
  searchCollabQuery.value = "";
  isCollabDropdownOpen.value = false;
};

const openManageCollabModal = () => {
  const maxAvailable = ownerSharePercentage.value;
  selectedUserToTag.value = null;
  searchCollabQuery.value = "";
  isCollabDropdownOpen.value = false;
  fetchSearchableUsers();
  newCollabForm.value = {
    user_id: "",
    name: "",
    role: "Penggarap & Perawatan Lahan",
    share_percentage: Math.min(20, maxAvailable),
    phone: "",
  };
  isManageCollabModalOpen.value = true;
};

const handleAddCollaborator = async () => {
  if (!activeFarm.value) return;
  if (!newCollabForm.value.name || !newCollabForm.value.name.trim()) {
    showWarning(
      "Pilih Pengguna Mitra",
      "Silakan cari dan pilih pengguna mitra terlebih dahulu.",
    );
    return;
  }
  if (newCollabForm.value.share_percentage > ownerSharePercentage.value) {
    showWarning(
      "Melebihi Sisa Porsi",
      `Persentase tidak boleh melebihi sisa porsi pemilik (${ownerSharePercentage.value}%).`,
    );
    return;
  }
  if (newCollabForm.value.share_percentage <= 0) {
    showWarning(
      "Persentase Tidak Valid",
      "Persentase bagi hasil harus lebih besar dari 0%.",
    );
    return;
  }
  try {
    isSubmittingCollab.value = true;
    const updated = await api.addCollaborator(activeFarm.value.id, {
      id: "",
      user_id: newCollabForm.value.user_id || undefined,
      name: newCollabForm.value.name,
      role: newCollabForm.value.role,
      share_percentage: newCollabForm.value.share_percentage,
      phone: newCollabForm.value.phone,
      status: newCollabForm.value.user_id ? "PENDING" : "ACTIVE",
    });

    const fIdx = farmlands.value.findIndex(
      (f) => f.id === activeFarm.value?.id,
    );
    if (fIdx !== -1) farmlands.value[fIdx] = updated;

    selectedUserToTag.value = null;
    searchCollabQuery.value = "";
    isCollabDropdownOpen.value = false;
    newCollabForm.value = {
      user_id: "",
      name: "",
      role: "Penggarap & Perawatan Lahan",
      share_percentage: Math.min(20, ownerSharePercentage.value),
      phone: "",
    };
    showSuccess(
      "Kolaborator Ditambahkan",
      "Undangan kolaborasi usahatani berhasil dikirim!",
    );
  } catch (err: any) {
    showError(
      "Gagal Menambahkan",
      err.message || "Gagal menambahkan kolaborator",
    );
  } finally {
    isSubmittingCollab.value = false;
  }
};

const handleRemoveCollaborator = async (collabId: string) => {
  if (!activeFarm.value) return;
  const confirmed = await showConfirm({
    title: "Hapus Kolaborator?",
    text: "Mitra ini tidak akan lagi terdaftar sebagai pengelola lahan ini.",
    confirmButtonText: "Hapus",
    cancelButtonText: "Batal",
    isDanger: true,
  });
  if (!confirmed) return;

  try {
    const updated = await api.removeCollaborator(activeFarm.value.id, collabId);
    const fIdx = farmlands.value.findIndex(
      (f) => f.id === activeFarm.value?.id,
    );
    if (fIdx !== -1) farmlands.value[fIdx] = updated;
    showSuccess(
      "Kolaborator Berhasil Dihapus"
    );
  } catch (err: any) {
    showError("Gagal Menghapus", err.message || "Gagal menghapus kolaborator");
  }
};

const openAddExpenseModal = (
  category: string = "OLAH_TANAH",
  defaultItem: string = "",
) => {
  manualExpenseForm.value = {
    item_name: defaultItem,
    amount: 150000,
    category: category,
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
      source: "MANUAL",
    });

    await loadFarmlands();
    isAddExpenseModalOpen.value = false;
    showSuccess(
      "Pengeluaran Dicatat",
      `Transaksi "${manualExpenseForm.value.item_name}" berhasil dicatat ke buku kas modal.`,
    );
  } catch (err: any) {
    showError(
      "Gagal Mencatat",
      err.message || "Gagal mencatat pengeluaran modal",
    );
  } finally {
    isSubmittingExpense.value = false;
  }
};

const saveStepUpdate = async (phase: TimelinePhase) => {
  if (activeFarm.value) {
    try {
      const updated = await api.updateFarmlandPhase(
        activeFarm.value.id,
        phase.step_no,
        phase.status,
        phase.actual_cost,
      );
      if (updated && updated.timeline_phases) {
        activeFarm.value.timeline_phases = updated.timeline_phases;
      }
      window.dispatchEvent(new CustomEvent("agribuddy:refresh-farmlands"));
    } catch (err) {
      console.error("Error updating farmland phase in database:", err);
    }
  }
  const currentP = activeFarmPlan.value || plan.value;
  if (currentP) {
    try {
      await api.updateFarmPlanStep(currentP.plan_id, {
        step_no: phase.step_no,
        status: phase.status,
        actual_cost: phase.actual_cost,
      });
    } catch {
      // ignore
    }
  }
};

const getCategoryBadgeClass = (category: string) => {
  switch (category) {
    case "JASA_TRAKTOR":
      return "bg-[#fed701]/20 text-[#324d1d]";
    case "JASA_PENGAIRAN":
      return "bg-[#99c30c]/20 text-[#324d1d]";
    case "JASA_CANGKUL":
    case "JASA_BURUH":
      return "bg-[#99c30c]/20 text-[#324d1d]";
    case "PUPUK":
    case "SAPROTAN":
      return "bg-[#99c30c]/20 text-[#324d1d]";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

const getRoleIcon = (role: string): string => {
  if (role.includes("Traktor") || role.includes("Olah Tanah")) return tractor;
  if (role.includes("Pengairan")) return wateringcan;
  if (role.includes("Saprotan") || role.includes("Pupuk")) return seedbag;
  if (role.includes("Penggilingan") || role.includes("Penyerapan Hasil Panen"))
    return wheelbarrow;
  return farmer;
};

const getCollabColorBg = (idx: number) => {
  const colors = [
    "bg-[#324d1d]/90",
    "bg-[#fed701]",
    "bg-[#99c30c]",
    "bg-[#fe8b02]",
    "bg-[#324d1d]/60",
  ];
  return colors[idx % colors.length];
};

const getCollabColorDot = (idx: number) => {
  const dots = [
    "bg-[#99c30c]",
    "bg-[#fed701]",
    "bg-[#99c30c]",
    "bg-[#fe8b02]",
    "bg-[#324d1d]/60",
  ];
  return dots[idx % dots.length];
};

const getCollabCardClass = (idx: number) => {
  const classes = [
    "border-[#99c30c]/40 bg-[#99c30c]/20",
    "border-[#fed701]/40 bg-[#fed701]/20",
    "border-[#99c30c]/40 bg-[#99c30c]/20",
    "border-[#fe8b02]/40 bg-[#fe8b02]/20",
  ];
  return classes[idx % classes.length];
};

const openWhatsApp = (phone: string, name: string) => {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Halo ${name}, saya tertarik menggunakan jasa Anda dari rencana tani di AgriBuddy.`)}`;
  window.open(url, "_blank");
};

const contactProvider = (providerName: string) => {
  const url = `https://wa.me/628123456789?text=${encodeURIComponent(`Halo ${providerName}, saya tertarik bermitra untuk saprotan/jasa sesuai rencana tanam AgriBuddy.`)}`;
  window.open(url, "_blank");
};

watch(currentUserId, () => {
  loadFarmlands();
});

onMounted(async () => {
  if (route.query.tab === "kontrol" || route.query.tab === "ceklis") {
    topTab.value = "kontrol";
  }
  await loadFarmlands();
  // Pre-calculate initial plan for Tab 1 if not yet calculated
  if (!plan.value) {
    try {
      const res = await api.calculateFarmPlan({
        land_size_ha: form.value.land_size_ha,
        commodity: form.value.commodity,
        soil_type: form.value.soil_type,
        water_source: form.value.water_source,
        location: form.value.location,
        latitude: form.value.latitude,
        longitude: form.value.longitude,
        coordinates_label: form.value.coordinates_label,
      });
      plan.value = res;
    } catch (e) {
      console.error("Initial plan precalc error:", e);
    }
  }
  window.addEventListener("agribuddy:refresh-farmlands", loadFarmlands);
  // Listen ke event navigasi tab dari WebTopBar Row 2 (mobile)
  const onRencanaTabEvent = (e: Event) => {
    const tab = (e as CustomEvent).detail?.tab;
    if (tab === "kontrol" || tab === "ceklis") setTopTab("kontrol");
    else setTopTab("rencana");
  };
  window.addEventListener("agribuddy:rencana-tab", onRencanaTabEvent);
  (window as any).__cleanupRencanaTabListener = () =>
    window.removeEventListener("agribuddy:rencana-tab", onRencanaTabEvent);
});

onUnmounted(() => {
  window.removeEventListener("agribuddy:refresh-farmlands", loadFarmlands);
  if ((window as any).__cleanupRencanaTabListener) {
    (window as any).__cleanupRencanaTabListener();
  }
});

import farmer from "@/assets/icons/petani.svg";
import seedbag from "@/assets/icons/pupuk.svg";
import tractor from "@/assets/icons/traktor.svg";
import wateringcan from "@/assets/icons/pancuran.svg";
import shovel from "@/assets/icons/skop.svg";
import pitchfork from "@/assets/icons/garpu.svg";
import wheelbarrow from "@/assets/icons/arko.svg";
</script>
