<template>
  <div class="min-h-screen bg-slate-100 flex items-center justify-center p-4">
    <div class="w-full max-w-sm bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-5">
      <!-- Logo & Judul -->
      <div class="text-center space-y-1">
        <div class="w-16 h-16 bg-gradient-to-br from-emerald-600 to-tani-800 text-white rounded-3xl flex items-center justify-center text-3xl mx-auto shadow-md border-2 border-white">
          🌾
        </div>
        <h1 class="text-2xl font-black text-slate-800 tracking-tight pt-2">AgriBuddy</h1>
        <p class="text-xs text-emerald-800 font-bold">Ekosistem Pendamping Petani Cerdas</p>
        <p class="text-[11px] text-slate-500">Kelola lahan, pesan saprotan, & jual hasil panen</p>
      </div>

      <!-- Form Masuk Manual -->
      <div class="space-y-3 pt-2">
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1">Nomor Handphone / WhatsApp</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-xs font-bold">
              +62
            </span>
            <input
              v-model="phoneNumber"
              type="tel"
              placeholder="812 3456 7890"
              class="w-full pl-12 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1">Kode PIN Keamanan</label>
          <input
            v-model="pin"
            type="password"
            maxlength="6"
            placeholder="••••••"
            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold tracking-widest text-center focus:outline-none focus:border-emerald-500"
            @keyup.enter="handleLogin"
          />
        </div>

        <button
          @click="handleLogin"
          class="w-full btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-3 rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
        >
          <LogIn :size="16" /> Masuk ke Aplikasi
        </button>
      </div>

      <!-- Pembatas Opsi Demo -->
      <div class="relative flex py-1 items-center">
        <div class="flex-grow border-t border-slate-200"></div>
        <span class="flex-shrink mx-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
          Atau Masuk Cepat (Demo Sidang)
        </span>
        <div class="flex-grow border-t border-slate-200"></div>
      </div>

      <!-- 1-Click Quick Demo Login Personas (Warga Ekosistem) -->
      <div class="space-y-1.5 max-h-56 overflow-y-auto pr-1">
        <button
          @click="quickLogin('PETANI_MANDIRI')"
          class="w-full p-2 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100 text-left flex items-center justify-between transition-all active:scale-95"
        >
          <div class="flex items-center gap-2">
            <span class="text-lg">👨‍🌾</span>
            <div>
              <div class="text-xs font-black text-slate-800">Pak Joko</div>
              <div class="text-[10px] text-emerald-800 font-bold">Petani Mandiri (1.2 Ha)</div>
            </div>
          </div>
          <ChevronRight :size="15" class="text-emerald-700" />
        </button>

        <button
          @click="quickLogin('JASA_TRAKTOR')"
          class="w-full p-2 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100 text-left flex items-center justify-between transition-all active:scale-95"
        >
          <div class="flex items-center gap-2">
            <span class="text-lg">🚜</span>
            <div>
              <div class="text-xs font-black text-slate-800">Mas Bambang</div>
              <div class="text-[10px] text-amber-800 font-bold">Jasa Olah Tanah & Traktor</div>
            </div>
          </div>
          <ChevronRight :size="15" class="text-amber-700" />
        </button>

        <button
          @click="quickLogin('JASA_PENGAIRAN')"
          class="w-full p-2 rounded-xl border border-sky-200 bg-sky-50/70 hover:bg-sky-100 text-left flex items-center justify-between transition-all active:scale-95"
        >
          <div class="flex items-center gap-2">
            <span class="text-lg">💧</span>
            <div>
              <div class="text-xs font-black text-slate-800">Pak Slamet</div>
              <div class="text-[10px] text-sky-800 font-bold">Jasa Pompa Air & Irigasi</div>
            </div>
          </div>
          <ChevronRight :size="15" class="text-sky-700" />
        </button>

        <button
          @click="quickLogin('JASA_CANGKUL')"
          class="w-full p-2 rounded-xl border border-lime-200 bg-lime-50/70 hover:bg-lime-100 text-left flex items-center justify-between transition-all active:scale-95"
        >
          <div class="flex items-center gap-2">
            <span class="text-lg">🌾</span>
            <div>
              <div class="text-xs font-black text-slate-800">Mang Udin</div>
              <div class="text-[10px] text-lime-800 font-bold">Jasa Cangkul & Regu Tanam</div>
            </div>
          </div>
          <ChevronRight :size="15" class="text-lime-700" />
        </button>

        <button
          @click="quickLogin('KIOS_SAPROTAN')"
          class="w-full p-2 rounded-xl border border-teal-200 bg-teal-50/70 hover:bg-teal-100 text-left flex items-center justify-between transition-all active:scale-95"
        >
          <div class="flex items-center gap-2">
            <span class="text-lg">🏪</span>
            <div>
              <div class="text-xs font-black text-slate-800">Ibu Ratna</div>
              <div class="text-[10px] text-teal-800 font-bold">Kios Saprotan & Pupuk KPL</div>
            </div>
          </div>
          <ChevronRight :size="15" class="text-teal-700" />
        </button>

        <button
          @click="quickLogin('PENGGILINGAN_PADI')"
          class="w-full p-2 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-left flex items-center justify-between transition-all active:scale-95"
        >
          <div class="flex items-center gap-2">
            <span class="text-lg">🚚</span>
            <div>
              <div class="text-xs font-black text-slate-800">Bpk. Hendra Jaya</div>
              <div class="text-[10px] text-indigo-800 font-bold">Penggilingan Padi & Pengepul</div>
            </div>
          </div>
          <ChevronRight :size="15" class="text-indigo-700" />
        </button>
      </div>


      <!-- Footer Info -->
      <p class="text-[10px] text-slate-400 text-center pt-2">
        Capstone Project STSI4440 • Tugas Akhir 2026
      </p>
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

const phoneNumber = ref('08123456789');
const pin = ref('1234');

const handleLogin = () => {
  loginWithCredentials(phoneNumber.value, pin.value);
  router.push('/');
};

const quickLogin = (role: UserRole) => {
  loginWithPersona(role);
  router.push('/');
};
</script>
