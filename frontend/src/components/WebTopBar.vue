<template>
  <header class="bg-white border-b border-slate-200/90 px-3 sm:px-6 md:px-8 py-2.5 sm:py-3.5 sticky top-0 z-30 flex items-center justify-between gap-2 shadow-2xs">
    <!-- Left: Contextual Title & Breadcrumbs -->
    <div class="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
      <!-- Mobile Logo Icon -->
      <router-link to="/" class="md:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-50 text-white flex items-center justify-center p-1 shrink-0 border border-emerald-200 shadow-2xs" title="AgriBuddy">
        <img src="/logo/logo-color-icon.svg" alt="AgriBuddy Logo" class="w-full h-full object-contain" />
      </router-link>

      <!-- Contextual Title & Breadcrumbs -->
      <div class="min-w-0 flex-1">
        <div class="hidden sm:flex items-center gap-1 text-[11px] font-bold text-slate-400">
          <span>AgriBuddy</span>
          <span>/</span>
          <span class="text-emerald-700 capitalize">{{ currentSectionName }}</span>
        </div>
        <h2 class="text-xs sm:text-sm md:text-base font-black text-slate-800 tracking-tight leading-tight truncate">
          <span class="sm:hidden">{{ mobilePageTitle }}</span>
          <span class="hidden sm:inline">{{ currentPageTitle }}</span>
        </h2>
      </div>
    </div>

    <!-- Right: Notifications & User Profile -->
    <div class="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
      <!-- Dropdown Selector Petak Sawah (Khusus Halaman Dashboard & Selalu Sticky) -->
      <div
        v-if="isDashboardPage && globalFarmlands.length > 0"
        class="flex items-center gap-1 sm:gap-1.5 bg-slate-100 hover:bg-slate-200/90 border border-slate-200/90 rounded-2xl px-2 sm:px-2.5 py-1 sm:py-1.5 transition-all shadow-2xs shrink-0"
        title="Pilih petak sawah yang sedang dipantau di dashboard"
      >
        <span class="text-xs sm:text-sm shrink-0">🌾</span>
        <div class="flex flex-col text-left pr-0.5">
          <span class="hidden sm:inline text-[9px] font-black uppercase text-emerald-800 leading-none">Petak Sawah:</span>
          <select
            v-model="activeFarmId"
            @change="setActiveFarmId(activeFarmId)"
            class="bg-transparent text-[11px] sm:text-xs font-black text-slate-800 focus:outline-none cursor-pointer pr-1 py-0.5 truncate max-w-[85px] sm:max-w-[210px]"
          >
            <option v-for="f in globalFarmlands" :key="f.id" :value="f.id">
              {{ f.name }} ({{ f.land_size_ha }} Ha)
            </option>
          </select>
        </div>
      </div>

      <!-- Notification Bell -->
      <div class="relative shrink-0">
        <button
          @click="isNotifOpen = !isNotifOpen"
          type="button"
          class="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200/80 flex items-center justify-center text-slate-600 transition-all cursor-pointer active:scale-95"
          title="Notifikasi Kolaborasi & Usahatani"
        >
          <Bell :size="16" />
          <span
            v-if="pendingInvitesCount > 0"
            class="absolute -top-1 -right-1 min-w-3.5 h-3.5 sm:min-w-4 sm:h-4 px-1 rounded-full bg-rose-500 text-white text-[8px] sm:text-[9px] font-black flex items-center justify-center animate-pulse"
          >
            {{ pendingInvitesCount }}
          </span>
        </button>

        <!-- Notification Popover -->
        <div
          v-if="isNotifOpen"
          class="fixed inset-x-3 top-14 sm:absolute sm:inset-x-auto sm:right-0 sm:top-auto sm:mt-2 w-auto sm:w-96 bg-white border border-slate-200 rounded-3xl shadow-xl z-50 p-4 space-y-3 animate-in fade-in"
        >
          <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-1.5">
              <span class="text-sm">🔔</span>
              <h4 class="text-xs font-black text-slate-800">Notifikasi Kolaborasi</h4>
            </div>
            <button
              @click="loadNotifications"
              class="text-[10px] font-bold text-emerald-700 hover:underline cursor-pointer"
            >
              Segarkan
            </button>
          </div>

          <!-- List Notifikasi -->
          <div v-if="notifications.length === 0" class="text-center py-6 space-y-1">
            <span class="text-2xl">📭</span>
            <p class="text-xs font-bold text-slate-700">Belum Ada Notifikasi</p>
            <p class="text-[10px] text-slate-400">Undangan kolaborasi lahan akan muncul di sini.</p>
          </div>

          <div v-else class="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            <div
              v-for="notif in notifications"
              :key="notif.id"
              class="p-3 rounded-2xl border text-xs space-y-2 transition-all"
              :class="notif.status === 'PENDING' 
                ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-200' 
                : 'bg-slate-50 border-slate-200'"
            >
              <div class="flex items-start justify-between gap-2">
                <div>
                  <div class="flex items-center gap-1.5">
                    <span class="text-[10px] font-black uppercase px-1.5 py-0.2 rounded-md"
                      :class="notif.type === 'COLLAB_INVITE' ? 'bg-amber-200 text-amber-900' : 'bg-emerald-100 text-emerald-800'"
                    >
                      {{ notif.type === 'COLLAB_INVITE' ? 'Undangan' : 'Info' }}
                    </span>
                    <h5 class="text-xs font-black text-slate-800">{{ notif.title }}</h5>
                  </div>
                  <p class="text-[11px] text-slate-600 mt-1 leading-snug">{{ notif.message }}</p>
                </div>
              </div>

              <!-- Tombol Respon jika Status PENDING -->
              <div v-if="notif.status === 'PENDING'" class="flex items-center gap-2 pt-1 border-t border-amber-200/60">
                <button
                  @click="handleRespondInvite(notif.id, 'ACCEPT')"
                  :disabled="isResponding === notif.id"
                  class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] py-1.5 px-2 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer disabled:opacity-60"
                >
                  <Loader2 v-if="isResponding === notif.id" :size="12" class="animate-spin" />
                  <span v-else>✓ Terima ({{ notif.share_percentage }}%)</span>
                </button>
                <button
                  @click="handleRespondInvite(notif.id, 'REJECT')"
                  :disabled="isResponding === notif.id"
                  class="py-1.5 px-3 rounded-xl border border-slate-300 text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 font-bold text-[11px] transition-all active:scale-95 cursor-pointer disabled:opacity-60"
                >
                  Tolak
                </button>
              </div>

              <!-- Status Info jika sudah resolved -->
              <div v-else-if="notif.status === 'RESOLVED_ACCEPTED'" class="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                <span>✓ Anda telah menerima undangan ini</span>
              </div>
              <div v-else-if="notif.status === 'RESOLVED_REJECTED'" class="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                <span>✕ Undangan ini telah ditolak</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick User Info Badge -->
      <router-link
        to="/profil"
        class="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-all"
        title="Lihat Profil Usahatani"
      >
        <img
          v-if="customAvatar"
          :src="customAvatar"
          alt="Avatar"
          class="w-7 h-7 rounded-full object-cover border border-emerald-500 shadow-2xs"
        />
        <span v-else class="text-lg">{{ currentPersona.avatar || '👨‍🌾' }}</span>
        <div class="text-left hidden sm:block">
          <p class="text-xs font-black text-slate-800 leading-tight">{{ currentPersona.name }}</p>
          <p class="text-[10px] font-semibold text-emerald-700">@{{ currentPersona.username }} • {{ currentPersona.badge }}</p>
        </div>
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserState } from '@/services/userState';
import { useFarmlandState } from '@/composables/useFarmlandState';
import { api, CollabNotification } from '@/services/api';
import { Bell, Loader2 } from 'lucide-vue-next';

const route = useRoute();
const { currentUserId, currentPersona, customAvatar } = useUserState();
const { globalFarmlands, activeFarmId, loadGlobalFarmlands, setActiveFarmId } = useFarmlandState();

const isDashboardPage = computed(() => {
  return route.path === '/' || route.path === '/monitoring';
});

const isNotifOpen = ref(false);
const notifications = ref<CollabNotification[]>([]);
const isResponding = ref<string | null>(null);

const pendingInvitesCount = computed(() => {
  return notifications.value.filter(n => n.status === 'PENDING').length;
});

const loadNotifications = async () => {
  try {
    const list = await api.getCollabNotifications(currentUserId.value);
    notifications.value = list;
  } catch (e) {
    console.error('Error loading notifications:', e);
  }
};

const handleRespondInvite = async (notifId: string, action: 'ACCEPT' | 'REJECT') => {
  try {
    isResponding.value = notifId;
    const res = await api.respondCollabNotification(notifId, action);
    alert(res.message);
    await loadNotifications();
    // Dispatch custom event agar view lahan yang sedang terbuka otomatis me-reload data
    window.dispatchEvent(new CustomEvent('agribuddy:refresh-farmlands'));
  } catch (err: any) {
    alert(err.message || 'Gagal memproses respon kolaborasi');
  } finally {
    isResponding.value = null;
  }
};

let pollInterval: any = null;

onMounted(() => {
  loadNotifications();
  loadGlobalFarmlands(currentUserId.value);
  // Poll notifikasi setiap 8 detik
  pollInterval = setInterval(loadNotifications, 8000);
  window.addEventListener('agribuddy:refresh-farmlands', onRefreshFarmlands);
});

watch(currentUserId, (newId) => {
  if (newId) {
    loadGlobalFarmlands(newId);
  }
});

const onRefreshFarmlands = () => {
  loadGlobalFarmlands(currentUserId.value);
};

onUnmounted(() => {
  if (pollInterval) clearInterval(pollInterval);
  window.removeEventListener('agribuddy:refresh-farmlands', onRefreshFarmlands);
});

const currentSectionName = computed(() => {
  const p = route.path;
  if (p === '/' || p.startsWith('/monitoring')) return 'Monitoring Usahatani';
  if (p === '/rencana') {
    return (route.query.tab === 'kontrol' || route.query.tab === 'ceklis')
      ? 'Kontrol Tanam & Modal'
      : 'Rencana Tanam';
  }
  if (p === '/dokter') return 'Agri AI';
  if (p === '/buku-tani' || p === '/inventaris' || p === '/lumbung') return 'Buku Tani';
  if (p === '/layanan' || p === '/katalog') return 'Direktori Layanan';
  if (p === '/profil') return 'Profil Usahatani';
  return 'Dashboard';
});

const currentPageTitle = computed(() => {
  const p = route.path;
  if (p === '/' || p.startsWith('/monitoring')) return 'Monitoring Sawah, Cuaca & Irigasi Cerdas';
  if (p === '/rencana') {
    return (route.query.tab === 'kontrol' || route.query.tab === 'ceklis')
      ? 'Kontrol Tanam & Modal Usahatani'
      : 'Rencana Tanam & Estimasi Anggaran (RAB)';
  }
  if (p === '/dokter') return 'Agri AI — Asisten Agronomi & Fitopatologi Cerdas';
  if (p === '/buku-tani' || p === '/inventaris' || p === '/lumbung') return 'Buku Tani — Manajemen Stok & Lumbung Panen';
  if (p === '/layanan' || p === '/katalog') return 'Direktori Layanan Mekanisasi & Saprotan Tani';
  if (p === '/profil') return 'Identitas Petani & Pengaturan Usahatani';
  return 'AgriBuddy Smart Farming';
});

const mobilePageTitle = computed(() => {
  const p = route.path;
  if (p === '/' || p.startsWith('/monitoring')) return 'Monitoring Sawah';
  if (p === '/rencana') {
    return (route.query.tab === 'kontrol' || route.query.tab === 'ceklis')
      ? 'Kontrol Tanam'
      : 'Rencana Tanam';
  }
  if (p === '/dokter') return 'Agri AI';
  if (p === '/buku-tani' || p === '/inventaris' || p === '/lumbung') return 'Buku Tani';
  if (p === '/layanan' || p === '/katalog') return 'Direktori Layanan';
  if (p === '/profil') return 'Profil Saya';
  return 'AgriBuddy';
});
</script>
