<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#324d1d] via-[#99c30c] to-[#324d1d] flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden select-none"
  >
    <!-- Ambient Background Glow Decor -->
    <div
      class="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"
    ></div>
    <div
      class="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-600/5 rounded-full blur-[140px] pointer-events-none"
    ></div>

    <!-- Main Login Card Container: Dual Panel (Hero Branding + Auth Form) -->
    <div
      class="w-full max-w-5xl bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl sm:rounded-[36px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10 animate-in fade-in zoom-in-95 duration-200"
    >
      <!-- ==================== LEFT HERO PANEL (DESKTOP) ==================== -->
      <div
        class="lg:col-span-5 bg-[#324d1d] text-white p-6 sm:p-8 lg:p-10 flex flex-col relative overflow-hidden"
      >
        <!-- Subtle Pattern Background -->
        <div class="absolute inset-0 pointer-events-none select-none opacity-5">
          <img
            src="/logo/logo-white-icon.svg"
            alt="watermark"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Top Header & Logo -->
        <div class="space-y-1 relative z-10">
          <div class="flex items-center gap-3.5">
            <div
              class="w-14 h-14 rounded-2xl bg-white p-20.5 shadow-lg border border-white/40 flex items-center justify-center shrink-0"
            >
              <img
                src="/logo/logo-color-icon.svg"
                alt="AgriBuddy Logo"
                class="w-full h-full object-contain"
              />
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <h1 class="text-xl sm:text-2xl tracking-tight text-white">
                  AgriBuddy
                </h1>
              </div>
              <p class="text-xs text-emerald-200 font-bold">
                Sahabat Petani Cerdas
              </p>
            </div>
          </div>

          <div class="space-y-2 pt-4">
            <h2 class="text-xl sm:text-2xl text-white leading-snug font-bold">
              Smart Farming & Agribisnis Usahatani Desa
            </h2>
            <p class="text-xs text-emerald-100/80 leading-relaxed">
              Satu ekosistem untuk membantu petani mengelola usaha tani dengan
              lebih mudah.
            </p>
          </div>
        </div>

        <!-- Middle Feature Bullets -->
        <div class="space-y-2 py-9 relative z-10">
          <div
            class="flex items-start gap-3 text-xs bg-[#99c30c]/75 backdrop-blur-md p-3 rounded-2xl border border-white/10"
          >
            <div>
              <strong class="text-white block"
                >Marketplace Jasa & Alat Tani</strong
              >
            </div>
          </div>

          <div
            class="flex items-start gap-3 text-xs bg-[#99c30c]/75 backdrop-blur-md p-3 rounded-2xl border border-white/10"
          >
            <div>
              <strong class="text-white block"
                >Monitoring Sawah & Agronomi AI</strong
              >
            </div>
          </div>

          <div
            class="flex items-start gap-3 text-xs bg-[#99c30c]/75 backdrop-blur-md p-3 rounded-2xl border border-white/10"
          >
            <div>
              <strong class="text-white block"
                >Kios KPL & Bursa Lelang Panen</strong
              >
            </div>
          </div>
        </div>

        <!-- Bottom Footer Branding -->
        <div
          class="pt-3 border-t border-white/15 text-[11px] text-white/50 flex items-center justify-between relative z-10"
        >
          <span>STSI4440 Capstone Project</span
          ><span
            class="font-mono text-[10px] bg-white/10 px-2 py-0.5 rounded-full"
            >Kelompok B</span
          >
        </div>
      </div>

      <!-- ==================== RIGHT LOGIN FORM PANEL ==================== -->
      <div
        class="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white space-y-6"
      >
        <div>
          <!-- Mobile Brand Banner (Hanya di layar mobile < lg) -->
          <div
            class="flex lg:hidden items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/90 rounded-2xl mb-4 shadow-2xs"
          >
            <div
              class="w-10 h-10 rounded-xl bg-white p-1 border border-emerald-200 shadow-2xs flex items-center justify-center shrink-0"
            >
              <img
                src="/logo/logo-color-icon.svg"
                alt="AgriBuddy Logo"
                class="w-full h-full object-contain"
              />
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="text-base text-slate-800">AgriBuddy</span>
              </div>
              <p class="text-[10px] text-emerald-700 font-semibold">
                Sahabat Petani Cerdas
              </p>
            </div>
          </div>

          <!-- Header Form -->
          <div
            class="flex items-center justify-between border-b border-slate-100 pb-4"
          >
            <div>
              <h3 class="text-lg sm:text-xl text-slate-800 font-bold">
                Masuk ke Akun Anda
              </h3>
              <p class="text-xs text-slate-500 mt-0.5">
                Silakan pilih demo atau masukkan nomor handphone Anda.
              </p>
            </div>
          </div>

          <!-- Tab Opsi: Masuk Cepat Demo vs Masuk Manual vs Buat Akun Baru -->
          <div class="flex p-1 bg-slate-100 rounded-2xl gap-1 mt-4 text-xs">
            <button
              @click="authTab = 'demo'"
              class="flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              :class="
                authTab === 'demo'
                  ? 'bg-[#324d1d] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              "
            >
              <span class="font-bold">Demo</span>
              <span
                class="text-[9px] bg-amber-500 text-slate-900 px-1.5 py-0.2 rounded-full uppercase"
                >Cepat</span
              >
            </button>
            <button
              @click="authTab = 'manual'"
              class="flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              :class="
                authTab === 'manual'
                  ? 'bg-[#324d1d] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              "
            >
              <span class="font-bold">Masuk</span>
            </button>
            <button
              @click="authTab = 'register'"
              class="flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              :class="
                authTab === 'register'
                  ? 'bg-[#324d1d] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              "
            >
              <span class="font-bold">Buat Akun</span>
            </button>
          </div>

          <!-- Alert Error Notification -->
          <div
            v-if="errorMessage"
            class="mt-3 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in"
          >
            <span class="flex-1 leading-snug">{{ errorMessage }}</span>
          </div>

          <!-- OPSI 1: 1-CLICK QUICK DEMO PERSONAS (DEMO SIDANG) -->
          <div v-if="authTab === 'demo'" class="space-y-3 pt-3">
            <div class="flex items-center justify-between px-1">
              <span class="text-[11px] uppercase tracking-wider text-slate-400">
                Pilih Peran Warga:
              </span>
            </div>

            <div
              class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[320px] overflow-y-auto pr-1"
            >
              <!-- 1. Pak Joko -->
              <button
                @click="quickLogin('PETANI_MANDIRI')"
                class="p-3 rounded-2xl border border-[#324d1d] bg-[#fed701]/15 border-[#fed701] hover:bg-[#fed701]/30 text-left transition-all active:scale-95 group shadow-2xs cursor-pointer"
              >
                <div class="flex items-center gap-3 w-full">
                  <!-- ICON -->
                  <div
                    class="w-12 h-12 shrink-0 flex items-center justify-center"
                  >
                    <img
                      :src="farmer"
                      alt="Petani"
                      class="w-14 h-14 object-contain"
                    />
                  </div>

                  <!-- TEXT -->
                  <div class="min-w-0 flex-1 text-left">
                    <div
                      class="text-[14px] text-amber-800 font-bold leading-tight truncate"
                    >
                      Petani Mandiri
                    </div>

                    <div
                      class="text-[10px] text-slate-800 mt-1 leading-tight truncate"
                    >
                      Padi Inpari 32
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    size="16"
                    class="lucide lucide-chevron-right-icon text-slate-500 group-hover:translate-x-1 transition-transform"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </button>

              <!-- 2. Mas Bambang -->
              <button
                @click="quickLogin('JASA_TRAKTOR')"
                class="p-3 rounded-2xl border border-[#324d1d] bg-[#fed701]/15 border-[#fed701] hover:bg-[#fed701]/40 text-left transition-all active:scale-95 group shadow-2xs cursor-pointer"
              >
                <div class="flex items-center gap-3 w-full">
                  <div
                    class="w-12 h-12 shrink-0 flex items-center justify-center"
                  >
                    <img
                      :src="tractor"
                      alt="Traktor"
                      class="w-14 h-14 object-contain"
                    />
                  </div>

                  <div class="min-w-0 flex-1 text-left">
                    <div
                      class="text-[14px] text-amber-800 font-bold leading-tight truncate"
                    >
                      Sewa Traktor
                    </div>

                    <div
                      class="text-[10px] text-slate-800 mt-1 leading-tight truncate"
                    >
                      Jasa Bajak & Rotavator
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    size="16"
                    class="lucide lucide-chevron-right-icon text-slate-500 group-hover:translate-x-1 transition-transform"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </button>

              <!-- 3. Pak Slamet -->
              <button
                @click="quickLogin('JASA_PENGAIRAN')"
                class="p-3 rounded-2xl border border-[#324d1d] bg-[#fed701]/15 border-[#fed701] hover:bg-[#fed701]/40 text-left transition-all active:scale-95 group shadow-2xs cursor-pointer"
              >
                <div class="flex items-center gap-3 w-full">
                  <div
                    class="w-10 h-10 shrink-0 flex items-center justify-center"
                  >
                    <img
                      :src="wateringcan"
                      alt="Irigasi"
                      class="w-12 h-12 object-contain"
                    />
                  </div>

                  <div class="min-w-0 flex-1 text-left">
                    <div
                      class="text-[14px] text-amber-800 font-bold leading-tight truncate"
                    >
                      Jasa Pompa Irigasi
                    </div>

                    <div
                      class="text-[10px] text-slate-800 mt-1 leading-tight truncate"
                    >
                      Alkon 3 Inci & Sedot Sungai
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    size="16"
                    class="lucide lucide-chevron-right-icon text-slate-500 group-hover:translate-x-1 transition-transform"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </button>

              <!-- 4. Mang Udin -->
              <button
                @click="quickLogin('JASA_CANGKUL')"
                class="p-3 rounded-2xl border border-[#324d1d] bg-[#fed701]/15 border-[#fed701] hover:bg-[#fed701]/30 text-left transition-all active:scale-95 group shadow-2xs cursor-pointer"
              >
                <div class="flex items-center gap-3 w-full">
                  <div
                    class="w-10 h-10 shrink-0 flex items-center justify-center"
                  >
                    <img
                      :src="shovel"
                      alt="Buruh Tanam"
                      class="w-12 h-12 object-contain"
                    />
                  </div>

                  <div class="min-w-0 flex-1 text-left">
                    <div
                      class="text-[14px] text-amber-800 font-bold leading-tight truncate"
                    >
                      Regu Buruh Tanam
                    </div>

                    <div
                      class="text-[10px] text-slate-800 mt-1 leading-tight truncate"
                    >
                      Cangkul Galengan & Matun
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    size="16"
                    class="lucide lucide-chevron-right-icon text-slate-500 group-hover:translate-x-1 transition-transform"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </button>

              <!-- 5. Ibu Ratna -->
              <button
                @click="quickLogin('KIOS_SAPROTAN')"
                class="p-3 rounded-2xl border border-[#324d1d] bg-[#fed701]/15 border-[#fed701] hover:bg-[#fed701]/30 text-left transition-all active:scale-95 group shadow-2xs cursor-pointer"
              >
                <div class="flex items-center gap-3 w-full">
                  <div
                    class="w-10 h-10 shrink-0 flex items-center justify-center"
                  >
                    <img
                      :src="seedbag"
                      alt="Kios Saprotan"
                      class="w-12 h-12 object-contain"
                    />
                  </div>

                  <div class="min-w-0 flex-1 text-left">
                    <div
                      class="text-[14px] text-amber-800 font-bold leading-tight truncate"
                    >
                      Kios Saprotan KPL
                    </div>

                    <div
                      class="text-[10px] text-slate-800 mt-1 leading-tight truncate"
                    >
                      Pupuk Subsidi & Obat Hama
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    size="16"
                    class="lucide lucide-chevron-right-icon text-slate-500 group-hover:translate-x-1 transition-transform"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </button>

              <!-- 6. Bpk. Hendra Jaya -->
              <button
                @click="quickLogin('PENGGILINGAN_PADI')"
                class="p-3 rounded-2xl border border-[#324d1d] bg-[#fed701]/15 border-[#fed701] hover:bg-[#fed701]/30 text-left transition-all active:scale-95 group shadow-2xs cursor-pointer"
              >
                <div class="flex items-center gap-3 w-full">
                  <div
                    class="w-10 h-10 shrink-0 flex items-center justify-center"
                  >
                    <img
                      :src="pitchfork"
                      alt="Penggilingan Padi"
                      class="w-12 h-12 object-contain"
                    />
                  </div>

                  <div class="min-w-0 flex-1 text-left">
                    <div
                      class="text-[14px] text-amber-800 font-bold leading-tight truncate"
                    >
                      Penggilingan & Pengepul
                    </div>

                    <div
                      class="text-[10px] text-slate-800 mt-1 leading-tight truncate"
                    >
                      Bursa Lelang & Pembeli Gabah
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    size="16"
                    class="lucide lucide-chevron-right-icon text-slate-500 group-hover:translate-x-1 transition-transform"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </button>
            </div>

            <div class="pt-2 text-center">
              <button
                @click="authTab = 'register'"
                class="text-xs font-bold text-slate-500 hover:underline cursor-pointer mt-5"
              >
                Ingin mencoba dengan akun pribadi?
                <strong>Daftar di sini</strong>
              </button>
            </div>
          </div>

          <!-- OPSI 2: FORM MASUK MANUAL (NO HP / USERNAME & PIN) -->
          <div v-else-if="authTab === 'manual'" class="space-y-4 pt-3">
            <div>
              <FormLabel>Nomor Handphone / Username Akun</FormLabel>
              <input
                v-model="loginIdentifier"
                type="text"
                placeholder="Contoh: 08123456789 atau @nama_anda"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                @keyup.enter="handleLogin"
              />
            </div>

            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="text-xs font-bold text-slate-700"
                  >Kode PIN Keamanan</label
                >
                <span class="text-[10px] text-slate-800">Default: 1234</span>
              </div>
              <input
                v-model="pin"
                type="password"
                maxlength="8"
                placeholder="••••"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold tracking-widest text-center focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                @keyup.enter="handleLogin"
              />
            </div>

            <button
              @click="handleLogin"
              :disabled="isLoading"
              class="w-full bg-[#324d1d]/90 hover:bg-[#324d1d] disabled:opacity-60 text-white text-xs py-3 rounded-2xl shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Loader2 v-if="isLoading" :size="16" class="animate-spin" />
              <span>Masuk</span>
            </button>

            <div class="text-center pt-1">
              <button
                @click="authTab = 'register'"
                class="text-xs font-bold text-slate-500 hover:underline cursor-pointer"
              >
                Belum punya akun? <strong>Buat akun</strong>
              </button>
            </div>
          </div>

          <!-- OPSI 3: FORM BUAT AKUN BARU (REGISTRASI PENGUJI / PENGGUNA) -->
          <div
            v-else-if="authTab === 'register'"
            class="space-y-3 pt-2 max-h-[380px] overflow-y-auto pr-1"
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Nama Lengkap -->
              <div>
                <FormLabel>
                  Nama Lengkap <span class="text-rose-500">*</span>
                </FormLabel>
                <input
                  v-model="regFullName"
                  type="text"
                  placeholder="Contoh: Dr. Budi Santoso"
                  class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <!-- Username Unik -->
              <div>
                <FormLabel>
                  Username Unik <span class="text-rose-500">*</span>
                </FormLabel>
                <div class="relative">
                  <span
                    class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-xs font-bold"
                    >@</span
                  >
                  <input
                    v-model="regUsername"
                    type="text"
                    placeholder="budi_santoso"
                    class="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- No Handphone / WhatsApp -->
              <div>
                <FormLabel>
                  Nomor HP / WhatsApp <span class="text-rose-500">*</span>
                </FormLabel>
                <input
                  v-model="regPhone"
                  type="tel"
                  placeholder="081234567890"
                  class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <!-- PIN Keamanan -->
              <div>
                <FormLabel>
                  Kode PIN Masuk <span class="text-rose-500">*</span>
                </FormLabel>
                <input
                  v-model="regPin"
                  type="password"
                  maxlength="6"
                  placeholder="1234"
                  class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold tracking-widest text-center focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <!-- Peran di Ekosistem Usahatani -->
            <div>
              <FormLabel>
                Peran Anda di Ekosistem <span class="text-rose-500">*</span>
              </FormLabel>
              <select
                v-model="regRole"
                class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
              >
                <option value="PETANI_MANDIRI">
                  Petani Mandiri (Pemilik/Penggarap Sawah)
                </option>
                <option value="JASA_TRAKTOR">
                  Penyedia Jasa Traktor & Olah Tanah
                </option>
                <option value="JASA_PENGAIRAN">
                  Penyedia Jasa Pompa & Irigasi
                </option>
                <option value="JASA_CANGKUL">Regu Buruh Tanam & Cangkul</option>
                <option value="KIOS_SAPROTAN">
                  Kios Saprotan KPL (Pupuk & Obat)
                </option>
                <option value="PENGGILINGAN_PADI">
                  Penggilingan & Pengepul Gabah
                </option>
              </select>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Desa / Lokasi -->
              <div>
                <FormLabel>Desa / Domisili</FormLabel>
                <input
                  v-model="regVillage"
                  type="text"
                  placeholder="Desa Sukamaju, Jawa Timur"
                  class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <!-- Komoditas Utama -->
              <div>
                <FormLabel>Komoditas Utama</FormLabel>
                <input
                  v-model="regCommodity"
                  type="text"
                  placeholder="Padi Inpari 32 / Jagung"
                  class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              @click="handleRegister"
              :disabled="isLoading"
              class="w-full mt-2 bg-[#324d1d]/90 hover:bg-[#324d1d] disabled:opacity-60 text-white text-xs py-3 rounded-2xl shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Loader2 v-if="isLoading" :size="16" class="animate-spin" />
              <span v-else>Daftar</span>
            </button>

            <div class="text-center pt-1">
              <button
                @click="authTab = 'manual'"
                class="text-xs font-bold text-slate-500 hover:underline cursor-pointer"
              >
                Sudah memiliki akun? <strong>Masuk</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserState, UserRole } from "@/services/userState";
import { api } from "@/services/api";
import { ChevronRight, Loader2 } from "lucide-vue-next";

import farmer from "@/assets/icons/petani.svg";
import seedbag from "@/assets/icons/pupuk.svg";
import tractor from "@/assets/icons/traktor.svg";
import wateringcan from "@/assets/icons/pancuran.svg";
import shovel from "@/assets/icons/skop.svg";
import pitchfork from "@/assets/icons/garpu.svg";
import FormLabel from "@/components/ui/FormLabel.vue";

const router = useRouter();
const { loginWithPersona, loginWithCustomUser } = useUserState();

const authTab = ref<"demo" | "manual" | "register">("demo");
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);

// Form Login Manual
const loginIdentifier = ref("08123456789");
const pin = ref("1234");

// Form Registrasi Baru
const regFullName = ref("");
const regUsername = ref("");
const regPhone = ref("");
const regPin = ref("1234");
const regRole = ref("PETANI_MANDIRI");
const regVillage = ref("Desa Sukamaju, Jawa Timur");
const regCommodity = ref("Padi Inpari 32");
const regLandSize = ref(1.0);

const handleLogin = async () => {
  errorMessage.value = null;
  const idStr = loginIdentifier.value.trim();
  if (!idStr) {
    errorMessage.value = "Silakan masukkan nomor handphone atau username Anda.";
    return;
  }

  try {
    isLoading.value = true;
    const isPhone = /^[0-9+]+$/.test(idStr);
    const payload = isPhone
      ? { phone_number: idStr, pin: pin.value }
      : { username: idStr.replace(/^@/, ""), pin: pin.value };

    const res = await api.login(payload);
    const user = res.user || res;

    // Login dan simpan sesi pengguna
    loginWithCustomUser(user);
    router.replace("/");
  } catch (err: any) {
    errorMessage.value =
      err.message || "Gagal masuk. Periksa kembali data login Anda.";
  } finally {
    isLoading.value = false;
  }
};

const handleRegister = async () => {
  errorMessage.value = null;
  if (!regFullName.value.trim()) {
    errorMessage.value = "Nama lengkap wajib diisi.";
    return;
  }
  if (!regPhone.value.trim()) {
    errorMessage.value = "Nomor handphone / WhatsApp wajib diisi.";
    return;
  }

  try {
    isLoading.value = true;
    const res = await api.register({
      full_name: regFullName.value.trim(),
      username: regUsername.value.trim() || undefined,
      phone_number: regPhone.value.trim(),
      pin: regPin.value || "1234",
      role: regRole.value,
      village: regVillage.value.trim(),
      commodity: regCommodity.value.trim(),
      land_size_ha: Number(regLandSize.value) || 1.0,
    });

    // Otomatis login dengan akun yang baru didaftarkan
    loginWithCustomUser(res.user);
    alert(
      `Selamat datang di AgriBuddy, ${res.user.full_name}! Akun Anda telah berhasil dibuat.`,
    );
    router.replace("/");
  } catch (err: any) {
    errorMessage.value =
      err.message || "Gagal membuat akun baru. Silakan coba lagi.";
  } finally {
    isLoading.value = false;
  }
};

const quickLogin = (role: UserRole) => {
  errorMessage.value = null;
  loginWithPersona(role);
  router.replace("/");
};
</script>
