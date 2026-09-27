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
      <!-- Avatar Section with Camera & File Upload -->
      <div class="relative w-24 h-24 mx-auto mb-3">
        <div class="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-4xl mx-auto border-2 border-white/40 shadow-inner overflow-hidden">
          <img
            v-if="customAvatar || profile.avatar_url"
            :src="customAvatar || profile.avatar_url"
            alt="Foto Profil"
            class="w-full h-full object-cover"
          />
          <span v-else>{{ currentPersona.avatar || '👨‍🌾' }}</span>
        </div>

        <!-- Floating Action Buttons -->
        <div class="absolute -bottom-2 inset-x-0 flex items-center justify-center gap-1.5 z-10 pointer-events-none">
          <button
            type="button"
            @click="openCamera"
            class="pointer-events-auto w-[26px] h-[26px] min-w-[26px] min-h-[26px] max-w-[26px] max-h-[26px] rounded-full aspect-square shrink-0 p-0 flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white shadow-md border-[1.5px] border-white transition-all active:scale-90 cursor-pointer"
            title="Ambil Foto Kamera Langsung"
          >
            <Camera :size="12" />
          </button>
          <button
            type="button"
            @click="fileInputRef?.click()"
            class="pointer-events-auto w-[26px] h-[26px] min-w-[26px] min-h-[26px] max-w-[26px] max-h-[26px] rounded-full aspect-square shrink-0 p-0 flex items-center justify-center bg-white hover:bg-slate-100 text-emerald-800 shadow-md border-[1.5px] border-white transition-all active:scale-90 cursor-pointer"
            title="Unggah Foto dari File / Galeri"
          >
            <Upload :size="12" />
          </button>
          <button
            v-if="customAvatar || profile.avatar_url"
            type="button"
            @click="removeAvatar"
            class="pointer-events-auto w-[26px] h-[26px] min-w-[26px] min-h-[26px] max-w-[26px] max-h-[26px] rounded-full aspect-square shrink-0 p-0 flex items-center justify-center bg-rose-600 hover:bg-rose-500 text-white shadow-md border-[1.5px] border-white transition-all active:scale-90 cursor-pointer"
            title="Hapus Foto Profil"
          >
            <Trash2 :size="11" />
          </button>
        </div>

        <!-- Hidden File Inputs -->
        <input
          ref="cameraInputRef"
          type="file"
          accept="image/*"
          capture="user"
          class="hidden"
          @change="handleFileChange"
        />
        <input
          ref="fileInputRef"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleFileChange"
        />
      </div>
      <h3 class="text-lg font-black mt-3">{{ profile.full_name }}</h3>
      <div class="flex items-center justify-center gap-1.5 mt-1">
        <span class="text-xs font-black text-emerald-200 bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20">
          @{{ profile.username || currentPersona.username || 'petani' }}
        </span>
        <span class="inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-700/60 text-emerald-200 border border-emerald-500/30">
          {{ currentPersona.badge }}
        </span>
      </div>
      <p class="text-xs text-emerald-200 mt-1.5 flex items-center justify-center gap-1">
        <span>📍</span> {{ profile.village }}
      </p>
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
            placeholder="Nama lengkap petani..."
            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500 font-medium"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1 flex items-center justify-between">
              <span>Username (@)</span>
              <span class="text-[10px] text-emerald-600 font-semibold">Unik & Pencarian</span>
            </label>
            <div class="relative flex items-center">
              <span class="absolute left-3.5 text-slate-400 font-black text-sm select-none">@</span>
              <input
                v-model="profile.username"
                @input="handleUsernameInput"
                type="text"
                placeholder="username_petani"
                class="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <p class="text-[10px] text-slate-400 mt-1">Digunakan untuk tag @kolaborator & pencarian profil</p>
          </div>

          <div>
            <label class="text-xs font-bold text-slate-700 block mb-1">No. WhatsApp</label>
            <input
              v-model="profile.whatsapp_number"
              type="text"
              placeholder="08123456789"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>
        </div>

        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1">Desa & Kecamatan Domisili</label>
          <input
            v-model="profile.village"
            type="text"
            placeholder="Desa & Kecamatan..."
            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-500 font-medium"
          />
        </div>

        <div>
          <label class="text-xs font-bold text-slate-700 block mb-1">Keterangan / Kelompok Tani</label>
          <textarea
            v-model="profile.bio"
            rows="2"
            placeholder="Keterangan atau kelompok tani..."
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

    <!-- Kartu Branding Resmi AgriBuddy -->
    <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col items-center text-center space-y-2.5">
      <img src="/logo/logo-color-rect.svg" alt="AgriBuddy - Sahabat Petani" class="h-12 w-auto object-contain" />
      <p class="text-xs text-slate-500 font-medium max-w-sm leading-relaxed">
        Platform Smart Farming Decision Support System (DSS) untuk pendampingan usahatani mandiri, AI fitopatologi, dan ketertelusuran lumbung desa.
      </p>
      <div class="flex items-center gap-2 pt-1 text-[11px] font-bold text-slate-400">
        <span>STSI4440 Capstone Project</span>
        <span>•</span>
        <span class="text-emerald-700 font-extrabold">v2.0.4</span>
      </div>
    </div>

    <!-- Tombol Keluar / Ganti Akun -->
    <button
      @click="handleLogout"
      class="w-full btn-farmer bg-slate-100 hover:bg-rose-50 text-rose-600 border border-slate-200 font-bold text-xs py-3 rounded-2xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
    >
      <LogOut :size="15" /> Keluar / Ganti Akun (Layar Masuk)
    </button>

    <!-- Modal Live Kamera Web / Desktop -->
    <div
      v-if="isCameraModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in"
    >
      <div class="bg-white rounded-3xl max-w-sm sm:max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
        <!-- Modal Header -->
        <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Camera :size="16" />
            </div>
            <div>
              <h3 class="text-sm font-black text-slate-800">Ambil Foto Profil Langsung</h3>
              <p class="text-[10px] text-slate-400 font-medium">Kamera Web / Perangkat Aktif</p>
            </div>
          </div>
          <button
            @click="closeCameraModal"
            class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-all cursor-pointer"
            title="Tutup Kamera"
          >
            <X :size="16" />
          </button>
        </div>

        <!-- Video Viewport / Preview -->
        <div class="p-5 flex flex-col items-center">
          <div class="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-emerald-500 shadow-inner bg-slate-950 flex items-center justify-center">
            <!-- Video Live Stream -->
            <video
              v-show="!capturedSnapshot"
              ref="videoRef"
              autoplay
              playsinline
              muted
              class="w-full h-full object-cover transform -scale-x-100"
            ></video>

            <!-- Frozen Captured Snapshot Preview -->
            <img
              v-if="capturedSnapshot"
              :src="capturedSnapshot"
              alt="Pratinjau Foto"
              class="w-full h-full object-cover"
            />

            <!-- Error Message State -->
            <div
              v-if="cameraError"
              class="absolute inset-0 bg-slate-900/95 text-white p-5 flex flex-col items-center justify-center text-center gap-2"
            >
              <span class="text-2xl">📷⚠️</span>
              <p class="text-xs font-bold text-rose-300">{{ cameraError }}</p>
              <button
                type="button"
                @click="fileInputRef?.click(); closeCameraModal();"
                class="mt-2 text-xs bg-white text-slate-800 font-bold px-3 py-1.5 rounded-xl hover:bg-slate-100 cursor-pointer shadow-sm"
              >
                Pilih Foto dari Galeri / File
              </button>
            </div>
          </div>

          <!-- Petunjuk -->
          <p class="text-[11px] text-slate-500 font-medium mt-3 text-center">
            {{ capturedSnapshot ? 'Foto berhasil diambil! Gunakan foto ini atau jepret ulang.' : 'Pastikan wajah berada di dalam lingkaran dengan pencahayaan cukup.' }}
          </p>
        </div>

        <!-- Modal Footer Controls -->
        <div class="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-3">
          <!-- State 1: Live Stream (Ambil Foto) -->
          <template v-if="!capturedSnapshot">
            <button
              type="button"
              @click="closeCameraModal"
              class="px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              @click="takeSnapshot"
              :disabled="!!cameraError || !isCameraReady"
              class="flex-1 max-w-[200px] py-2.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Camera :size="15" /> Jepret Foto
            </button>
          </template>

          <!-- State 2: Snapshot Preview (Konfirmasi / Ulangi) -->
          <template v-else>
            <button
              type="button"
              @click="retakeSnapshot"
              class="px-4 py-2.5 rounded-2xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw :size="13" /> Foto Ulang
            </button>
            <button
              type="button"
              @click="applySnapshot"
              class="flex-1 max-w-[200px] py-2.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Check :size="15" /> Gunakan Foto Ini
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useUserState } from '@/services/userState';
import { api, UserProfile, EcosystemServiceItem } from '@/services/api';
import {
  ArrowLeft,
  CheckCircle2,
  UserCheck,
  Save,
  LogOut,
  Store,
  PlusCircle,
  Camera,
  Upload,
  Trash2,
  X,
  RefreshCw,
  Check
} from 'lucide-vue-next';

const router = useRouter();
const {
  logout,
  currentPersona,
  customAvatar,
  setCustomAvatar,
  customUsername,
  setCustomUsername
} = useUserState();

const cameraInputRef = ref<HTMLInputElement | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);

// Live Camera WebRTC State
const isCameraModalOpen = ref(false);
const isCameraReady = ref(false);
const cameraError = ref<string | null>(null);
const capturedSnapshot = ref<string | null>(null);
const videoRef = ref<HTMLVideoElement | null>(null);
let mediaStream: MediaStream | null = null;

const openCamera = async () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    cameraInputRef.value?.click();
    return;
  }

  isCameraModalOpen.value = true;
  capturedSnapshot.value = null;
  cameraError.value = null;
  isCameraReady.value = false;

  await nextTick();

  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 640 },
        height: { ideal: 640 },
        facingMode: 'user'
      },
      audio: false
    });

    if (videoRef.value) {
      videoRef.value.srcObject = mediaStream;
      videoRef.value.onloadedmetadata = () => {
        videoRef.value?.play();
        isCameraReady.value = true;
      };
    }
  } catch (err: any) {
    console.error('Kamera tidak dapat diakses:', err);
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      cameraError.value = 'Izin akses kamera belum diberikan. Izinkan akses kamera pada pengaturan browser.';
    } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
      cameraError.value = 'Kamera tidak terdeteksi pada perangkat ini.';
    } else {
      cameraError.value = 'Gagal menyalakan kamera: ' + (err.message || 'Perangkat sedang sibuk.');
    }
  }
};

const closeCameraModal = () => {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
  }
  if (videoRef.value) {
    videoRef.value.srcObject = null;
  }
  isCameraModalOpen.value = false;
  capturedSnapshot.value = null;
  cameraError.value = null;
  isCameraReady.value = false;
};

const takeSnapshot = () => {
  if (!videoRef.value) return;
  const video = videoRef.value;
  const canvas = document.createElement('canvas');
  const size = Math.min(video.videoWidth, video.videoHeight) || 400;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Mirror horizontal agar sesuai tampilan selfie/cermin
  ctx.translate(size, 0);
  ctx.scale(-1, 1);

  const sx = (video.videoWidth - size) / 2;
  const sy = (video.videoHeight - size) / 2;
  ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size);

  capturedSnapshot.value = canvas.toDataURL('image/jpeg', 0.85);
};

const retakeSnapshot = () => {
  capturedSnapshot.value = null;
};

const applySnapshot = () => {
  if (!capturedSnapshot.value) return;
  setCustomAvatar(capturedSnapshot.value);
  profile.value.avatar_url = capturedSnapshot.value;
  closeCameraModal();
};

const profile = ref<UserProfile>({
  id: 'usr_001',
  phone_number: '08123456789',
  full_name: 'Pak Joko',
  username: 'pak_joko',
  village: 'Desa Sukamaju, Jawa Timur',
  whatsapp_number: '08123456789',
  bio: 'Petani Padi Binaan Kelompok Tani Makmur'
});

const myServices = ref<EcosystemServiceItem[]>([]);
const isSaving = ref(false);

const handleUsernameInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  // Format username: tanpa spasi, huruf kecil, hanya alfanumerik, underscore, dan titik
  const sanitized = target.value.toLowerCase().replace(/^@+/, '').replace(/[^a-z0-9_.]/g, '');
  profile.value.username = sanitized;
  setCustomUsername(sanitized);
};

// Helper untuk kompresi foto lokal agar ringan (<60KB) dan hemat penyimpanan browser
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;
  const file = target.files[0];
  try {
    const compressedBase64 = await compressImage(file);
    setCustomAvatar(compressedBase64);
    profile.value.avatar_url = compressedBase64;
  } catch (err) {
    console.error('Gagal memproses foto profil:', err);
    alert('Format foto tidak didukung atau terjadi kesalahan.');
  } finally {
    target.value = '';
  }
};

const removeAvatar = () => {
  setCustomAvatar(null);
  profile.value.avatar_url = undefined;
};

const loadProfile = async () => {
  try {
    const [prof, serv] = await Promise.all([
      api.getProfile(),
      api.getMyServices()
    ]);
    profile.value = prof;
    myServices.value = serv;

    // Pastikan username profil menampilkan username unik persona/user aktif
    if (!profile.value.username) {
      profile.value.username = currentPersona.value.username;
    }

    // Sinkronisasi avatar jika tersedia
    if (customAvatar.value && !profile.value.avatar_url) {
      profile.value.avatar_url = customAvatar.value;
    } else if (profile.value.avatar_url && !customAvatar.value) {
      setCustomAvatar(profile.value.avatar_url);
    }
  } catch (err) {
    console.error(err);
  }
};

const saveProfile = async () => {
  isSaving.value = true;
  try {
    if (customAvatar.value) {
      profile.value.avatar_url = customAvatar.value;
    }
    const updated = await api.updateProfile(profile.value);
    profile.value = updated;
    if (updated.username) {
      setCustomUsername(updated.username);
    }
    if (updated.avatar_url) {
      setCustomAvatar(updated.avatar_url);
    }
    alert('Profil usahatani berhasil diperbarui!');
  } catch (err: any) {
    alert(err?.response?.data?.detail || err?.message || 'Gagal menyimpan profil');
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
onUnmounted(closeCameraModal);
</script>

