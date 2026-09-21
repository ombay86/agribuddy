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
        <div class="absolute -right-8 -bottom-10 text-white/5 select-none pointer-events-none text-9xl font-black">
          🌾
        </div>

        <!-- Top Header & Logo -->
        <div class="space-y-4 relative z-10">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center text-2xl shadow-md">
              🌾
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
              <p class="text-xs text-emerald-200 font-bold">Ekosistem Tani Cerdas</p>
            </div>
          </div>

          <div class="space-y-2 pt-2">
            <h2 class="text-xl sm:text-2xl font-black text-white leading-snug">
              Platform Kolaborasi & Agribisnis Usahatani Desa
            </h2>
            <p class="text-xs text-emerald-100/80 leading-relaxed font-medium">
              Satu ekosistem terpadu yang mempertemukan petani mandiri, penyedia sewa traktor, jasa pengairan, kios saprotan resmi, hingga bursa panen gabah.
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

          <!-- Tab Opsi: Masuk Cepat Demo Persona vs Nomor HP/PIN -->
          <div class="flex p-1 bg-slate-100 rounded-2xl gap-1 mt-4 text-xs font-black">
            <button
              @click="authTab = 'demo'"
              class="flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
              :class="authTab === 'demo' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'"
            >
              <span>⚡ Masuk Cepat Persona</span>
              <span class="text-[9px] bg-amber-500 text-slate-900 px-1.5 py-0.2 rounded-full uppercase">Demo</span>
            </button>
            <button
              @click="authTab = 'manual'"
              class="flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
              :class="authTab === 'manual' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'"
            >
              <span>📱 Nomor HP & PIN</span>
            </button>
          </div>

          <!-- OPSI 1: 1-CLICK QUICK DEMO PERSONAS (DEMO SIDANG) -->
          <div v-if="authTab === 'demo'" class="space-y-3 pt-4">
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
                class="p-3 rounded-2xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100 hover:border-emerald-300 text-left flex items-center justify-between transition-all active:scale-95 group shadow-2xs"
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
                class="p-3 rounded-2xl border border-amber-200 bg-amber-50/50 hover:bg-amber-100 hover:border-amber-300 text-left flex items-center justify-between transition-all active:scale-95 group shadow-2xs"
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
                class="p-3 rounded-2xl border border-sky-200 bg-sky-50/50 hover:bg-sky-100 hover:border-sky-300 text-left flex items-center justify-between transition-all active:scale-95 group shadow-2xs"
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
                class="p-3 rounded-2xl border border-lime-200 bg-lime-50/50 hover:bg-lime-100 hover:border-lime-300 text-left flex items-center justify-between transition-all active:scale-95 group shadow-2xs"
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
                class="p-3 rounded-2xl border border-teal-200 bg-teal-50/50 hover:bg-teal-100 hover:border-teal-300 text-left flex items-center justify-between transition-all active:scale-95 group shadow-2xs"
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
                class="p-3 rounded-2xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100 hover:border-indigo-300 text-left flex items-center justify-between transition-all active:scale-95 group shadow-2xs"
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
          </div>

          <!-- OPSI 2: FORM MANUAL NO HANDPHONE & PIN -->
          <div v-else class="space-y-4 pt-4">
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Nomor Handphone / WhatsApp</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-xs font-bold">
                  +62
                </span>
                <input
                  v-model="phoneNumber"
                  type="tel"
                  placeholder="812 3456 7890"
                  class="w-full pl-12 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="text-xs font-bold text-slate-700">Kode PIN Keamanan (6 Digit)</label>
                <span class="text-[10px] text-emerald-700 font-bold">Default: 1234</span>
              </div>
              <input
                v-model="pin"
                type="password"
                maxlength="6"
                placeholder="••••"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold tracking-widest text-center focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                @keyup.enter="handleLogin"
              />
            </div>

            <button
              @click="handleLogin"
              class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-3 rounded-2xl shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <LogIn :size="16" />
              <span>Masuk ke Dashboard AgriBuddy</span>
            </button>
          </div>
        </div>

        <!-- Privacy & System Info -->
        <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>🔒 Akses Terenkripsi & Terverifikasi</span>
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
import { LogIn, ChevronRight } from 'lucide-vue-next';

const router = useRouter();
const { loginWithPersona, loginWithCredentials } = useUserState();

const authTab = ref<'demo' | 'manual'>('demo');
const phoneNumber = ref('08123456789');
const pin = ref('1234');

const handleLogin = () => {
  loginWithCredentials(phoneNumber.value, pin.value);
  router.replace('/');
};

const quickLogin = (role: UserRole) => {
  loginWithPersona(role);
  router.replace('/');
};
</script>
