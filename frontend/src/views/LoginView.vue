<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950 flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden select-none">
    <!-- Ambient Background Glow Decor -->
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-600/5 rounded-full blur-[140px] pointer-events-none"></div>

    <!-- Main Login Card Container: Dual Panel (Hero Branding + Auth Form) -->
    <div class="w-full max-w-5xl bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl sm:rounded-[36px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10 animate-in fade-in zoom-in-95 duration-200">
      
      <!-- ==================== LEFT HERO PANEL (DESKTOP) ==================== -->
      <div class="lg:col-span-5 bg-gradient-to-br from-emerald-800 to-teal-900 text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
        <!-- Subtle Pattern Background -->
        <div class="absolute -right-12 -bottom-12 w-64 h-64 select-none pointer-events-none opacity-10">
          <img src="/logo/logo-white-icon.svg" alt="watermark" class="w-full h-full object-contain" />
        </div>

        <!-- Top Header & Logo -->
        <div class="space-y-4 relative z-10">
          <div class="flex items-center gap-3.5">
            <div class="w-14 h-14 rounded-2xl bg-white p-1.5 shadow-lg border border-white/40 flex items-center justify-center shrink-0">
              <img src="/logo/logo-color-icon.svg" alt="AgriBuddy Logo" class="w-full h-full object-contain" />
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <h1 class="text-xl sm:text-2xl font-black tracking-tight text-white">
                  AgriBuddy
                </h1>
                <span class="text-[9px] font-black bg-emerald-400 text-slate-900 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  v2.0
                </span>
              </div>
              <p class="text-xs text-emerald-200 font-bold">Sahabat Petani Cerdas</p>
            </div>
          </div>

          <div class="space-y-2 pt-2">
            <h2 class="text-xl sm:text-2xl font-black text-white leading-snug">
              Platform Smart Farming & Agribisnis Usahatani Desa
            </h2>
            <p class="text-xs text-emerald-100/80 leading-relaxed font-medium">
              Satu ekosistem terpadu yang mendampingi petani mandiri dengan telemetri sawah, perencanaan modal AI, dokter tanaman vision, hingga keterlacakan lumbung panen.
            </p>
          </div>
        </div>

        <!-- Middle Feature Bullets -->
        <div class="space-y-3 py-6 relative z-10">
          <div class="flex items-start gap-3 text-xs bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <span class="text-base shrink-0">🚜</span>
            <div>
              <strong class="text-white block font-black">Marketplace Jasa & Alat Tani</strong>
              <span class="text-emerald-100/80 text-[11px]">Sewa traktor bajak, rotavator, pompa diesel, dan regu buruh tanam.</span>
            </div>
          </div>

          <div class="flex items-start gap-3 text-xs bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <span class="text-base shrink-0">🌱</span>
            <div>
              <strong class="text-white block font-black">Monitoring Sawah & Agronomi AI</strong>
              <span class="text-emerald-100/80 text-[11px]">Sensor cuaca GPS real-time, kalkulator modal pupuk, & deteksi penyakit daun.</span>
            </div>
          </div>

          <div class="flex items-start gap-3 text-xs bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <span class="text-base shrink-0">📦</span>
            <div>
              <strong class="text-white block font-black">Kios KPL & Bursa Lelang Panen</strong>
              <span class="text-emerald-100/80 text-[11px]">Stok pupuk bersubsidi resmi dan penjualan gabah langsung ke pengepul.</span>
            </div>
          </div>
        </div>

        <!-- Bottom Footer Branding -->
        <div class="pt-3 border-t border-white/15 text-[11px] text-emerald-200/80 flex items-center justify-between relative z-10">
          <span>STSI4440 Capstone Project</span>
          <span class="font-mono text-[10px] bg-white/10 px-2 py-0.5 rounded-full">Tugas Akhir 2026</span>
        </div>
      </div>

      <!-- ==================== RIGHT LOGIN FORM PANEL ==================== -->
      <div class="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white space-y-6">
        <div>
          <!-- Mobile Brand Banner (Hanya di layar mobile < lg) -->
          <div class="flex lg:hidden items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/90 rounded-2xl mb-4 shadow-2xs">
            <div class="w-10 h-10 rounded-xl bg-white p-1 border border-emerald-200 shadow-2xs flex items-center justify-center shrink-0">
              <img src="/logo/logo-color-icon.svg" alt="AgriBuddy Logo" class="w-full h-full object-contain" />
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="text-base font-black text-slate-800">AgriBuddy</span>
                <span class="text-[9px] font-black bg-emerald-600 text-white px-1.5 py-0.2 rounded-full uppercase">v2.0</span>
              </div>
              <p class="text-[10px] text-emerald-700 font-bold">Sahabat Petani Cerdas</p>
            </div>
          </div>

          <!-- Header Form -->
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 class="text-lg sm:text-xl font-black text-slate-800">
                Masuk ke Akun Anda
              </h3>
              <p class="text-xs text-slate-500 font-semibold mt-0.5">
                Silakan pilih persona demo atau masukkan nomor handphone Anda.
              </p>
            </div>
            <div class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-sm border border-emerald-200">
              🔑
            </div>
          </div>

          <!-- Tab Opsi: Masuk Cepat Demo vs Masuk Manual vs Buat Akun Baru -->
          <div class="flex p-1 bg-slate-100 rounded-2xl gap-1 mt-4 text-xs font-black">
            <button
              @click="authTab = 'demo'"
              class="flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              :class="authTab === 'demo' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'"
            >
              <span>⚡ Demo</span>
              <span class="text-[9px] bg-amber-500 text-slate-900 px-1.5 py-0.2 rounded-full uppercase">Cepat</span>
            </button>
            <button
              @click="authTab = 'manual'"
              class="flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              :class="authTab === 'manual' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'"
            >
              <span>🔑 Masuk</span>
            </button>
            <button
              @click="authTab = 'register'"
              class="flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              :class="authTab === 'register' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'"
            >
              <span>✨ Buat Akun</span>
            </button>
          </div>

          <!-- Alert Error Notification -->
          <div
            v-if="errorMessage"
            class="mt-3 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in"
          >
            <span>⚠️</span>
            <span class="flex-1 leading-snug">{{ errorMessage }}</span>
          </div>

          <!-- OPSI 1: 1-CLICK QUICK DEMO PERSONAS (DEMO SIDANG) -->
          <div v-if="authTab === 'demo'" class="space-y-3 pt-3">
            <div class="flex items-center justify-between px-1">
              <span class="text-[11px] font-black uppercase tracking-wider text-slate-400">
                Pilih Peran Warga Ekosistem:
              </span>
              <span class="text-[10px] text-emerald-700 font-bold">1-Klik Langsung Masuk</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[320px] overflow-y-auto pr-1">
              <!-- 1. Pak Joko -->
              <button
                @click="quickLogin('PETANI_MANDIRI')"
                class="p-3 rounded-2xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100 hover:border-emerald-300 text-left flex items-center justify-between transition-all active:scale-95 group shadow-2xs cursor-pointer"
              >
                <div class="flex items-center gap-2.5">
                  <span class="text-2xl group-hover:scale-110 transition-transform">👨‍🌾</span>
                  <div>
                    <div class="text-xs font-black text-slate-800 flex items-center gap-1">
                      <span>Pak Joko</span>
                      <span class="text-[9px] font-extrabold bg-emerald-200 text-emerald-900 px-1.5 rounded">Utama</span>
                    </div>
                    <div class="text-[10px] text-emerald-800 font-bold">Petani Mandiri (1.2 Ha)</div>
                    <div class="text-[9px] text-slate-400">Padi Inpari 32 • Sukamaju</div>
                  </div>
                </div>
                <ChevronRight :size="16" class="text-emerald-600 group-hover:translate-x-1 transition-transform" />
              </button>

              <!-- 2. Mas Bambang -->
              <button
                @click="quickLogin('JASA_TRAKTOR')"
                class="p-3 rounded-2xl border border-amber-200 bg-amber-50/50 hover:bg-amber-100 hover:border-amber-300 text-left flex items-center justify-between transition-all active:scale-95 group shadow-2xs cursor-pointer"
              >
                <div class="flex items-center gap-2.5">
                  <span class="text-2xl group-hover:scale-110 transition-transform">🚜</span>
                  <div>
                    <div class="text-xs font-black text-slate-800">Mas Bambang</div>
                    <div class="text-[10px] text-amber-800 font-bold">Sewa Traktor Kubota</div>
                    <div class="text-[9px] text-slate-400">Jasa Bajak & Rotavator</div>
                  </div>
                </div>
                <ChevronRight :size="16" class="text-amber-600 group-hover:translate-x-1 transition-transform" />
              </button>

              <!-- 3. Pak Slamet -->
              <button
                @click="quickLogin('JASA_PENGAIRAN')"
                class="p-3 rounded-2xl border border-sky-200 bg-sky-50/50 hover:bg-sky-100 hover:border-sky-300 text-left flex items-center justify-between transition-all active:scale-95 group shadow-2xs cursor-pointer"
              >
                <div class="flex items-center gap-2.5">
                  <span class="text-2xl group-hover:scale-110 transition-transform">💧</span>
                  <div>
                    <div class="text-xs font-black text-slate-800">Pak Slamet</div>
                    <div class="text-[10px] text-sky-800 font-bold">Jasa Pompa Irigasi</div>
                    <div class="text-[9px] text-slate-400">Alkon 3 Inci & Sedot Sungai</div>
                  </div>
                </div>
                <ChevronRight :size="16" class="text-sky-600 group-hover:translate-x-1 transition-transform" />
              </button>

              <!-- 4. Mang Udin -->
              <button
                @click="quickLogin('JASA_CANGKUL')"
                class="p-3 rounded-2xl border border-lime-200 bg-lime-50/50 hover:bg-lime-100 hover:border-lime-300 text-left flex items-center justify-between transition-all active:scale-95 group shadow-2xs cursor-pointer"
              >
                <div class="flex items-center gap-2.5">
                  <span class="text-2xl group-hover:scale-110 transition-transform">🌾</span>
                  <div>
                    <div class="text-xs font-black text-slate-800">Mang Udin</div>
                    <div class="text-[10px] text-lime-800 font-bold">Regu Buruh Tanam</div>
                    <div class="text-[9px] text-slate-400">Cangkul Galengan & Matun</div>
                  </div>
                </div>
                <ChevronRight :size="16" class="text-lime-600 group-hover:translate-x-1 transition-transform" />
              </button>

              <!-- 5. Ibu Ratna -->
              <button
                @click="quickLogin('KIOS_SAPROTAN')"
                class="p-3 rounded-2xl border border-teal-200 bg-teal-50/50 hover:bg-teal-100 hover:border-teal-300 text-left flex items-center justify-between transition-all active:scale-95 group shadow-2xs cursor-pointer"
              >
                <div class="flex items-center gap-2.5">
                  <span class="text-2xl group-hover:scale-110 transition-transform">🏪</span>
                  <div>
                    <div class="text-xs font-black text-slate-800">Ibu Ratna</div>
                    <div class="text-[10px] text-teal-800 font-bold">Kios Saprotan KPL</div>
                    <div class="text-[9px] text-slate-400">Pupuk Subsidi & Obat Hama</div>
                  </div>
                </div>
                <ChevronRight :size="16" class="text-teal-600 group-hover:translate-x-1 transition-transform" />
              </button>

              <!-- 6. Bpk. Hendra Jaya -->
              <button
                @click="quickLogin('PENGGILINGAN_PADI')"
                class="p-3 rounded-2xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100 hover:border-indigo-300 text-left flex items-center justify-between transition-all active:scale-95 group shadow-2xs cursor-pointer"
              >
                <div class="flex items-center gap-2.5">
                  <span class="text-2xl group-hover:scale-110 transition-transform">🚚</span>
                  <div>
                    <div class="text-xs font-black text-slate-800">Bpk. Hendra Jaya</div>
                    <div class="text-[10px] text-indigo-800 font-bold">Penggilingan & Pengepul</div>
                    <div class="text-[9px] text-slate-400">Bursa Lelang & Pembeli Gabah</div>
                  </div>
                </div>
                <ChevronRight :size="16" class="text-indigo-600 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div class="pt-2 text-center">
              <button
                @click="authTab = 'register'"
                class="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                Ingin mencoba dengan akun & profil pribadi? <strong>Daftar di sini &rarr;</strong>
              </button>
            </div>
          </div>

          <!-- OPSI 2: FORM MASUK MANUAL (NO HP / USERNAME & PIN) -->
          <div v-else-if="authTab === 'manual'" class="space-y-4 pt-3">
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Nomor Handphone / Username Akun</label>
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
                <label class="text-xs font-bold text-slate-700">Kode PIN Keamanan</label>
                <span class="text-[10px] text-slate-400">Default: 1234</span>
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
              class="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-black text-xs py-3 rounded-2xl shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Loader2 v-if="isLoading" :size="16" class="animate-spin" />
              <img v-else src="/logo/logo-white-icon.svg" alt="icon" class="w-4 h-4 object-contain" />
              <span>Masuk ke Dashboard AgriBuddy</span>
            </button>

            <div class="text-center pt-1">
              <button
                @click="authTab = 'register'"
                class="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                Belum memiliki akun terdaftar? <strong>Buat akun baru sekarang &rarr;</strong>
              </button>
            </div>
          </div>

          <!-- OPSI 3: FORM BUAT AKUN BARU (REGISTRASI PENGUJI / PENGGUNA) -->
          <div v-else-if="authTab === 'register'" class="space-y-3 pt-2 max-h-[380px] overflow-y-auto pr-1">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Nama Lengkap -->
              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">
                  Nama Lengkap <span class="text-rose-500">*</span>
                </label>
                <input
                  v-model="regFullName"
                  type="text"
                  placeholder="Contoh: Dr. Budi Santoso"
                  class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <!-- Username Unik -->
              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">
                  Username Unik <span class="text-rose-500">*</span>
                </label>
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-xs font-bold">@</span>
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
                <label class="text-xs font-bold text-slate-700 block mb-1">
                  Nomor HP / WhatsApp <span class="text-rose-500">*</span>
                </label>
                <input
                  v-model="regPhone"
                  type="tel"
                  placeholder="081234567890"
                  class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <!-- PIN Keamanan -->
              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">
                  Kode PIN Masuk <span class="text-rose-500">*</span>
                </label>
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
              <label class="text-xs font-bold text-slate-700 block mb-1">
                Peran Anda di Ekosistem <span class="text-rose-500">*</span>
              </label>
              <select
                v-model="regRole"
                class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
              >
                <option value="PETANI_MANDIRI">👨‍🌾 Petani Mandiri (Pemilik/Penggarap Sawah)</option>
                <option value="JASA_TRAKTOR">🚜 Penyedia Jasa Traktor & Olah Tanah</option>
                <option value="JASA_PENGAIRAN">💧 Penyedia Jasa Pompa & Irigasi</option>
                <option value="JASA_CANGKUL">🌾 Regu Buruh Tanam & Cangkul</option>
                <option value="KIOS_SAPROTAN">🏪 Kios Saprotan KPL (Pupuk & Obat)</option>
                <option value="PENGGILINGAN_PADI">🚚 Penggilingan & Pengepul Gabah</option>
              </select>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Desa / Lokasi -->
              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">Desa / Domisili</label>
                <input
                  v-model="regVillage"
                  type="text"
                  placeholder="Desa Sukamaju, Jawa Timur"
                  class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <!-- Komoditas Utama -->
              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">Komoditas Utama</label>
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
              class="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-black text-xs py-3 rounded-2xl shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Loader2 v-if="isLoading" :size="16" class="animate-spin" />
              <span v-else>✨ Daftarkan Akun & Masuk Sekarang</span>
            </button>

            <div class="text-center pt-1">
              <button
                @click="authTab = 'manual'"
                class="text-xs font-bold text-slate-500 hover:text-emerald-700 hover:underline cursor-pointer"
              >
                Sudah memiliki akun? <strong>Masuk di sini</strong>
              </button>
            </div>
          </div>
        </div>

        <!-- Privacy & System Info -->
        <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>🔒 Penyimpanan Terpusat PostgreSQL</span>
          <span>Versi Sistem: 2.0.4-Prod</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserState, UserRole } from '@/services/userState';
import { api } from '@/services/api';
import { ChevronRight, Loader2 } from 'lucide-vue-next';

const router = useRouter();
const { loginWithPersona, loginWithCustomUser } = useUserState();

const authTab = ref<'demo' | 'manual' | 'register'>('demo');
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);

// Form Login Manual
const loginIdentifier = ref('08123456789');
const pin = ref('1234');

// Form Registrasi Baru
const regFullName = ref('');
const regUsername = ref('');
const regPhone = ref('');
const regPin = ref('1234');
const regRole = ref('PETANI_MANDIRI');
const regVillage = ref('Desa Sukamaju, Jawa Timur');
const regCommodity = ref('Padi Inpari 32');
const regLandSize = ref(1.0);

const handleLogin = async () => {
  errorMessage.value = null;
  const idStr = loginIdentifier.value.trim();
  if (!idStr) {
    errorMessage.value = 'Silakan masukkan nomor handphone atau username Anda.';
    return;
  }

  try {
    isLoading.value = true;
    const isPhone = /^[0-9+]+$/.test(idStr);
    const payload = isPhone
      ? { phone_number: idStr, pin: pin.value }
      : { username: idStr.replace(/^@/, ''), pin: pin.value };

    const res = await api.login(payload);
    const user = res.user || res;

    // Login dan simpan sesi pengguna
    loginWithCustomUser(user);
    router.replace('/');
  } catch (err: any) {
    errorMessage.value = err.message || 'Gagal masuk. Periksa kembali data login Anda.';
  } finally {
    isLoading.value = false;
  }
};

const handleRegister = async () => {
  errorMessage.value = null;
  if (!regFullName.value.trim()) {
    errorMessage.value = 'Nama lengkap wajib diisi.';
    return;
  }
  if (!regPhone.value.trim()) {
    errorMessage.value = 'Nomor handphone / WhatsApp wajib diisi.';
    return;
  }

  try {
    isLoading.value = true;
    const res = await api.register({
      full_name: regFullName.value.trim(),
      username: regUsername.value.trim() || undefined,
      phone_number: regPhone.value.trim(),
      pin: regPin.value || '1234',
      role: regRole.value,
      village: regVillage.value.trim(),
      commodity: regCommodity.value.trim(),
      land_size_ha: Number(regLandSize.value) || 1.0
    });

    // Otomatis login dengan akun yang baru didaftarkan
    loginWithCustomUser(res.user);
    alert(`🎉 Selamat datang di AgriBuddy, ${res.user.full_name}! Akun Anda telah berhasil dibuat.`);
    router.replace('/');
  } catch (err: any) {
    errorMessage.value = err.message || 'Gagal membuat akun baru. Silakan coba lagi.';
  } finally {
    isLoading.value = false;
  }
};

const quickLogin = (role: UserRole) => {
  errorMessage.value = null;
  loginWithPersona(role);
  router.replace('/');
};
</script>
