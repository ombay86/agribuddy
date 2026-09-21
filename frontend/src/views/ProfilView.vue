<template>
  <div class="p-4 space-y-4 pb-28">
    <!-- Header Modul Profil -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <router-link to="/jejaring" class="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200">
          <ArrowLeft :size="18" />
        </router-link>
        <h2 class="text-xl font-extrabold text-slate-800 tracking-tight">
          Profil Usahatani
        </h2>
      </div>
      <span class="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full flex items-center gap-1">
        <CheckCircle2 :size="12" /> Petani Terdaftar
      </span>
    </div>

    <!-- Kartu Identitas Petani / Pengguna -->
    <div class="bg-gradient-to-br from-emerald-800 to-tani-900 text-white p-5 rounded-3xl shadow-md text-center relative overflow-hidden">
      <div class="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-4xl mx-auto border-2 border-white/30 shadow-inner">
        {{ currentPersona.avatar }}
      </div>
      <h3 class="text-lg font-black mt-3">{{ profile.full_name }}</h3>
      <span class="inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-700/60 text-emerald-200 border border-emerald-500/30 mt-1">
        {{ currentPersona.badge }}
      </span>
      <p class="text-xs text-emerald-200 mt-1">{{ profile.village }}</p>
      
      <div class="mt-4 pt-4 border-t border-white/15 grid grid-cols-2 gap-2 text-center text-xs">
        <div class="bg-white/10 p-2.5 rounded-2xl">
          <span class="text-emerald-300 block text-[10px] font-bold uppercase">Luas Lahan</span>
          <span class="font-black text-sm">{{ profile.land_size_ha }} Hektar</span>
        </div>
        <div class="bg-white/10 p-2.5 rounded-2xl">
          <span class="text-emerald-300 block text-[10px] font-bold uppercase">Komoditas Fokus</span>
          <span class="font-black text-sm">{{ profile.commodity }}</span>
        </div>
      </div>
    </div>

    <!-- Form Pengaturan Profil Usahatani -->
    <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
      <h4 class="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
        <UserCheck :size="15" class="text-emerald-600" /> Kelola Informasi Petani
      </h4>

      <div class="space-y-3">
        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1">Nama Lengkap Petani</label>
          <input
            v-model="profile.full_name"
            type="text"
            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">No. WhatsApp</label>
            <input
              v-model="profile.whatsapp_number"
              type="text"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">Luas Lahan (Ha)</label>
            <input
              v-model.number="profile.land_size_ha"
              type="number"
              step="0.1"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1">Desa & Kecamatan Lahan</label>
          <input
            v-model="profile.village"
            type="text"
            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1">Komoditas Unggulan</label>
          <input
            v-model="profile.commodity"
            type="text"
            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1">Keterangan / Kelompok Tani</label>
          <textarea
            v-model="profile.bio"
            rows="2"
            class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-emerald-500"
          ></textarea>
        </div>
      </div>

      <button
        @click="saveProfile"
        :disabled="isSaving"
        class="w-full btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md"
      >
        <Save :size="16" /> {{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan Profil' }}
      </button>
    </div>

    <!-- Section: Layanan & Produk yang Saya Tawarkan -->
    <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
      <div class="flex items-center justify-between">
        <h4 class="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
          <Store :size="15" class="text-emerald-600" /> Layanan Saya di Ekosistem
        </h4>
        <router-link
          to="/katalog"
          class="text-[11px] font-extrabold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl flex items-center gap-1"
        >
          <PlusCircle :size="13" /> Pasang Baru
        </router-link>
      </div>

      <p class="text-xs text-slate-500">
        Kelola daftar layanan usahatani, sewa alat, atau produk yang Anda tawarkan ke warga ekosistem.
      </p>

      <div v-if="myServices.length === 0" class="p-4 bg-slate-50 rounded-2xl text-center text-xs text-slate-400 font-semibold border border-dashed border-slate-200">
        Anda belum memasang layanan atau produk di katalog.
      </div>

      <div v-else class="space-y-2">
        <div
          v-for="serv in myServices"
          :key="serv.id"
          class="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-2"
        >
          <div class="truncate">
            <h5 class="text-xs font-black text-slate-800">{{ serv.title }}</h5>
            <span class="text-[10px] font-bold text-emerald-700">Rp {{ serv.price.toLocaleString('id-ID') }} {{ serv.price_unit }}</span>
          </div>
          <router-link
            to="/katalog"
            class="text-[10px] font-bold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shrink-0 hover:bg-slate-100"
          >
            Kelola di Katalog →
          </router-link>
        </div>
      </div>
    </div>

    <!-- Tombol Keluar / Ganti Akun -->
    <button
      @click="handleLogout"
      class="w-full btn-farmer bg-slate-100 hover:bg-rose-50 text-rose-600 border border-slate-200 font-bold text-xs py-3 rounded-2xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
    >
      <LogOut :size="15" /> Keluar / Ganti Akun (Layar Masuk)
    </button>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserState } from '@/services/userState';
import { api, UserProfile, EcosystemServiceItem } from '@/services/api';
import { ArrowLeft, CheckCircle2, UserCheck, Save, LogOut, Store, PlusCircle } from 'lucide-vue-next';

const router = useRouter();
const { logout, currentPersona } = useUserState();

const profile = ref<UserProfile>({
  id: 'usr_001',
  phone_number: '08123456789',
  full_name: 'Pak Joko',
  village: 'Desa Sukamaju, Jawa Timur',
  commodity: 'Padi Inpari 32',
  land_size_ha: 1.2,
  whatsapp_number: '08123456789',
  bio: 'Petani Padi Binaan Kelompok Tani Makmur'
});

const myServices = ref<EcosystemServiceItem[]>([]);
const isSaving = ref(false);

const loadProfile = async () => {
  try {
    const [prof, serv] = await Promise.all([
      api.getProfile(),
      api.getMyServices()
    ]);
    profile.value = prof;
    myServices.value = serv;
  } catch (err) {
    console.error(err);
  }
};

const saveProfile = async () => {
  isSaving.value = true;
  try {
    profile.value = await api.updateProfile(profile.value);
    alert('Profil usahatani berhasil diperbarui!');
  } catch (err) {
    alert('Gagal menyimpan profil');
    console.error(err);
  } finally {
    isSaving.value = false;
  }
};

const handleLogout = () => {
  logout();
  router.push('/login');
};

onMounted(loadProfile);
</script>

