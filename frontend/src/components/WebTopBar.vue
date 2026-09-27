<template>
  <header class="bg-white border-b border-slate-200/90 px-4 md:px-8 py-3.5 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
    <!-- Left: Contextual Title & Breadcrumbs -->
    <div class="flex items-center gap-3">
      <!-- Mobile Logo Icon -->
      <router-link to="/" class="md:hidden w-9 h-9 rounded-xl bg-emerald-50 text-white flex items-center justify-center p-1 shrink-0 border border-emerald-200 shadow-2xs" title="AgriBuddy">
        <img src="/logo/logo-color-icon.svg" alt="AgriBuddy Logo" class="w-full h-full object-contain" />
      </router-link>

      <!-- Contextual Title & Breadcrumbs -->
      <div>
        <div class="hidden sm:flex items-center gap-1 text-[11px] font-bold text-slate-400">
          <span>AgriBuddy</span>
          <span>/</span>
          <span class="text-emerald-700 capitalize">{{ currentSectionName }}</span>
        </div>
        <h2 class="text-sm md:text-base font-black text-slate-800 tracking-tight leading-tight">
          {{ currentPageTitle }}
        </h2>
      </div>
    </div>

    <!-- Right: Notifications & User Profile -->
    <div class="flex items-center gap-2.5">
      <!-- Notification Bell -->
      <div class="relative">
        <button
          @click="isNotifOpen = !isNotifOpen"
          type="button"
          class="relative w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200/80 flex items-center justify-center text-slate-600 transition-all cursor-pointer active:scale-95"
          title="Notifikasi Kolaborasi & Usahatani"
        >
          <Bell :size="17" />
          <span
            v-if="pendingInvitesCount > 0"
            class="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center animate-pulse"
          >
            {{ pendingInvitesCount }}
          </span>
        </button>

        <!-- Notification Popover -->
        <div
          v-if="isNotifOpen"
          class="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-3xl shadow-xl z-50 p-4 space-y-3 animate-in fade-in"
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
        <span class="text-lg">{{ currentPersona.avatar || '👨‍🌾' }}</span>
        <div class="text-left hidden sm:block">
          <p class="text-xs font-black text-slate-800 leading-tight">{{ currentPersona.name }}</p>
          <p class="text-[10px] font-semibold text-emerald-700">{{ currentPersona.badge }}</p>
        </div>
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserState } from '@/services/userState';
import { api, CollabNotification } from '@/services/api';
import { Bell, Loader2 } from 'lucide-vue-next';

const route = useRoute();
const { currentUserId, currentPersona } = useUserState();

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
  // Poll notifikasi setiap 8 detik
  pollInterval = setInterval(loadNotifications, 8000);
});

onUnmounted(() => {
  if (pollInterval) clearInterval(pollInterval);
});

const currentSectionName = computed(() => {
  const p = route.path;
  if (p === '/' || p.startsWith('/monitoring')) return 'Monitoring Usahatani';
  if (p === '/rencana') {
    return (route.query.tab === 'kontrol' || route.query.tab === 'ceklis')
      ? 'Kontrol Tanam & Modal'
      : 'Rencana Tanam';
  }
  if (p === '/dokter') return 'Dokter Tani AI';
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
  if (p === '/dokter') return 'Dokter Tani AI — Deteksi Penyakit Daun Padi';
  if (p === '/buku-tani' || p === '/inventaris' || p === '/lumbung') return 'Buku Tani — Manajemen Stok & Lumbung Panen';
  if (p === '/layanan' || p === '/katalog') return 'Direktori Layanan Mekanisasi & Saprotan Tani';
  if (p === '/profil') return 'Identitas Petani & Pengaturan Usahatani';
  return 'AgriBuddy Smart Farming';
});
</script>
