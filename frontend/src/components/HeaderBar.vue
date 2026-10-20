<template>
  <header class="bg-gradient-to-r from-[#324d1d] to-[#324d1d] text-white px-4 pt-4 pb-5 rounded-b-3xl shadow-md space-y-3">
    <!-- Baris Atas: Logo Aplikasi & Menu Pengguna (Akun yang Sedang Login) -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-xl bg-white/10 p-0.5 flex items-center justify-center border border-white/20 shadow-xs">
          <img src="/logo/logo-color-icon.svg" alt="AgriBuddy Logo" class="w-full h-full object-contain" />
        </div>
        <h1 class="text-xl font-extrabold tracking-tight">AgriBuddy</h1>
        <span class="bg-[#99c30c]/30 text-[#fff2d9] text-[10px] px-2 py-0.5 rounded-full font-bold border border-[#99c30c]/30">
          v2.0
        </span>
      </div>

      <!-- Desktop Navigation Bar (Hanya tampil di layar md ke atas) -->
      <nav class="hidden md:flex items-center gap-1 bg-[#324d1d]/40 border border-[#99c30c]/30 p-1.5 rounded-2xl">
        <router-link
          to="/"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          :class="$route.path === '/' || $route.path === '/jejaring' ? 'bg-[#324d1d]/90 text-white shadow-sm ' : 'text-[#fff2d9] hover:text-white hover:bg-white/10'"
        >
          <Users :size="15" /> Jejaring
        </router-link>
        <router-link
          to="/monitoring"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          :class="$route.path.startsWith('/monitoring') || $route.path === '/rencana' || $route.path === '/inventaris' || $route.path === '/lumbung' ? 'bg-[#324d1d]/90 text-white shadow-sm ' : 'text-[#fff2d9] hover:text-white hover:bg-white/10'"
        >
          <Activity :size="15" /> Monitoring (Sawah & AI)
        </router-link>
        <router-link
          to="/katalog"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          :class="$route.path === '/katalog' ? 'bg-[#324d1d]/90 text-white shadow-sm ' : 'text-[#fff2d9] hover:text-white hover:bg-white/10'"
        >
          <Store :size="15" /> Katalog Layanan
        </router-link>
        <router-link
          to="/profil"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          :class="$route.path === '/profil' ? 'bg-[#324d1d]/90 text-white shadow-sm ' : 'text-[#fff2d9] hover:text-white hover:bg-white/10'"
        >
          <User :size="15" /> Profil Saya
        </router-link>
      </nav>

      <!-- Menu Profil Akun Aktif & Notifikasi -->
      <div class="flex items-center gap-2">
        <!-- Tombol Lonceng Notifikasi Interaktif -->
        <div class="relative">
          <button
            @click="toggleNotificationMenu"
            class="relative p-2 rounded-full bg-[#324d1d]/50 hover:bg-[#324d1d]/70 border border-[#99c30c]/40 text-[#fff2d9] transition-all active:scale-95 shadow-sm"
            title="Pemberitahuan & Interaksi"
          >
            <Bell :size="17" />
            <span
              v-if="unreadCount > 0"
              class="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px]  w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#324d1d] shadow-sm animate-pulse"
            >
              {{ unreadCount > 9 ? '9+' : unreadCount }}
            </span>
          </button>

          <!-- Dropdown Panel Notifikasi -->
          <div
            v-if="showNotifMenu"
            class="absolute right-0 mt-2 w-80 sm:w-88 bg-white text-slate-800 rounded-3xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95 duration-150 max-h-[80vh] flex flex-col"
          >
            <div class="px-4 pb-2.5 border-b border-slate-100 flex items-center justify-between">
              <h4 class="text-xs font-bold text-slate-800">Notifikasi</h4>
              <button
                @click="fetchNotifications"
                type="button"
                class="text-[11px] font-semibold text-[#324d1d] hover:underline cursor-pointer"
              >
                Segarkan
              </button>
            </div>

            <!-- List Notifikasi -->
            <div class="overflow-y-auto p-3 space-y-2.5 flex-1 max-h-80">
              <div v-if="notifications.length === 0" class="py-8 text-center text-xs text-slate-400 font-semibold">
                Belum ada notifikasi baru
              </div>
              <div
                v-for="notif in notifications"
                :key="notif.id"
                @click="handleNotificationClick(notif)"
                class="p-3.5 rounded-2xl bg-[#fff2d9] border border-amber-200/50 shadow-2xs space-y-1.5 transition-all cursor-pointer hover:border-amber-300"
              >
                <div class="flex items-center gap-2">
                  <span
                    class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#99c30c]/25 text-[#324d1d] shrink-0"
                  >
                    {{ notif.type === 'COLLAB_INVITE' ? 'UNDANGAN' : 'INFO' }}
                  </span>
                  <h5 class="text-xs sm:text-sm font-bold text-slate-800 truncate">
                    {{ notif.title }}
                  </h5>
                </div>
                <p class="text-xs text-slate-600 leading-snug">
                  {{ notif.message }}
                </p>

                <!-- Tombol Respon jika Status PENDING (Collab Invite) -->
                <div v-if="notif.status === 'PENDING'" class="flex items-center gap-2 pt-2 border-t border-amber-200/60 mt-1.5">
                  <button
                    @click.stop="handleRespondInvite(notif.id, 'ACCEPT')"
                    :disabled="isResponding === notif.id"
                    class="flex-1 bg-[#324d1d]/90 hover:bg-[#324d1d] text-white font-bold text-xs py-1.5 px-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer disabled:opacity-60"
                  >
                    <Loader2 v-if="isResponding === notif.id" :size="12" class="animate-spin" />
                    <span v-else class="flex items-center gap-1"><Check :size="12" /> Terima ({{ notif.share_percentage }}%)</span>
                  </button>
                  <button
                    @click.stop="handleRespondInvite(notif.id, 'REJECT')"
                    :disabled="isResponding === notif.id"
                    class="py-1.5 px-3 rounded-xl border border-slate-300 text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 font-bold text-xs transition-all active:scale-95 cursor-pointer disabled:opacity-60"
                  >
                    Tolak
                  </button>
                </div>
                <div v-else-if="notif.status === 'RESOLVED_ACCEPTED'" class="text-[10px] font-bold text-[#324d1d] flex items-center gap-1 pt-1">
                  <span>Anda telah menerima undangan ini</span>
                </div>
                <div v-else-if="notif.status === 'RESOLVED_REJECTED'" class="text-[10px] font-bold text-slate-400 flex items-center gap-1 pt-1">
                  <span>Undangan ini telah ditolak</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Menu Profil Akun Aktif -->
        <div class="relative">
          <button
            @click="showUserMenu = !showUserMenu; showNotifMenu = false"
            class="flex items-center gap-2 bg-[#324d1d]/50 hover:bg-[#324d1d]/70 border border-[#99c30c]/40 text-xs px-3 py-1.5 rounded-full font-bold text-[#fff2d9] transition-all active:scale-95 shadow-sm"
          >
            <div class="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-white/10 shrink-0">
              <img :src="petani" alt="Avatar petani" class="w-full h-full object-cover" />
            </div>
            <span class="max-w-[100px] truncate">{{ currentPersona.name }}</span>
            <ChevronDown :size="14" class="transition-transform" :class="{ 'rotate-180': showUserMenu }" />
          </button>

          <!-- Dropdown Menu Pengguna -->
          <div
            v-if="showUserMenu"
            class="absolute right-0 mt-2 w-56 bg-white text-slate-800 rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
          >
            <!-- Info Ringkas Akun yang Login -->
            <div class="px-3.5 py-2 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full overflow-hidden border border-[#99c30c] shadow-2xs flex items-center justify-center bg-[#99c30c]/10 shrink-0">
                  <img :src="petani" alt="Avatar petani" class="w-full h-full object-cover" />
                </div>
                <div>
                  <div class=" text-xs text-slate-800">{{ currentPersona.name }}</div>
                  <div class="text-[10px] font-extrabold text-[#324d1d]">{{ currentPersona.badge }}</div>
                </div>
              </div>
              <p class="text-[10px] text-slate-500 mt-1 truncate">{{ currentPersona.entityName }}</p>
            </div>

            <!-- Opsi Menu -->
            <div class="py-1">
              <router-link
                to="/profil"
                @click="showUserMenu = false"
                class="w-full text-left px-3.5 py-2 text-xs flex items-center gap-2 text-slate-700 hover:bg-[#99c30c]/10 hover:text-[#324d1d] font-bold transition-all"
              >
                <User :size="15" class="text-[#324d1d]" /> Buka Profil Usahatani
              </router-link>

              <button
                @click="handleLogout"
                class="w-full text-left px-3.5 py-2 text-xs flex items-center gap-2 text-rose-600 hover:bg-rose-50 font-bold transition-all"
              >
                <LogOut :size="15" class="text-rose-500" /> Keluar / Ganti Akun
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Baris Bawah: Kartu Status Akun yang Sedang Aktif -->
    <div class="flex items-center justify-between bg-white/10 backdrop-blur-sm p-2.5 rounded-2xl border border-white/15">
      <router-link to="/profil" class="flex items-center gap-2.5 hover:opacity-95 transition-all text-left">
        <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center border border-white/20 shadow-inner overflow-hidden">
          <img :src="petani" alt="Avatar petani" class="w-full h-full object-cover" />
        </div>
        <div>
          <div class="text-sm font-extrabold text-white flex items-center gap-1.5">
            {{ currentPersona.name }}
            <span class="inline-block w-2 h-2 rounded-full bg-[#99c30c] animate-pulse"></span>
          </div>
          <p class="text-[11px] text-[#fff2d9] font-medium">
            {{ currentPersona.badge }} • {{ currentPersona.location }}
          </p>
        </div>
      </router-link>

      <button
        @click="handleLogout"
        class="text-xs font-bold text-rose-200 hover:text-white px-2.5 py-1 rounded-lg hover:bg-white/10 transition-all flex items-center gap-1"
        title="Ganti Profil / Logout"
      >
        <LogOut :size="13" /> Keluar
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserState } from '@/services/userState';
import { api, InAppNotification } from '@/services/api';
import { ChevronDown, User, LogOut, Bell, Check, Loader2 } from 'lucide-vue-next';

const router = useRouter();
const { currentPersona, currentUserId, logout } = useUserState();
const showUserMenu = ref(false);
const showNotifMenu = ref(false);
const isResponding = ref<string | null>(null);

const handleRespondInvite = async (notifId: string, action: 'ACCEPT' | 'REJECT') => {
  try {
    isResponding.value = notifId;
    const res = await api.respondCollabNotification(notifId, action);
    alert(res.message);
    await fetchNotifications();
    window.dispatchEvent(new CustomEvent('agribuddy:refresh-farmlands'));
  } catch (err: any) {
    alert(err.message || 'Gagal memproses respon kolaborasi');
  } finally {
    isResponding.value = null;
  }
};
const notifications = ref<InAppNotification[]>([]);

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.is_read).length;
});

const fetchNotifications = async () => {
  try {
    const [userRes, collabRes] = await Promise.allSettled([
      api.getUserNotifications(currentUserId.value),
      api.getCollabNotifications(currentUserId.value)
    ]);
    const listA = userRes.status === 'fulfilled' ? userRes.value : [];
    const listB = collabRes.status === 'fulfilled' ? collabRes.value : [];

    const mappedCollab = listB.map((c: any) => ({
      id: c.id,
      title: c.title,
      message: c.message,
      type: c.type || 'COLLAB_INVITE',
      status: c.status,
      share_percentage: c.share_percentage,
      is_read: c.is_read || false,
      created_at: c.created_at || ''
    }));

    const map = new Map<string, any>();
    for (const item of [...mappedCollab, ...listA]) {
      if (!map.has(item.id)) {
        map.set(item.id, item);
      }
    }
    notifications.value = Array.from(map.values());
  } catch (err) {
    console.error('Error fetching notifications:', err);
  }
};

const toggleNotificationMenu = () => {
  showNotifMenu.value = !showNotifMenu.value;
  if (showNotifMenu.value) {
    showUserMenu.value = false;
    fetchNotifications();
  }
};

const handleNotificationClick = async (notif: InAppNotification) => {
  if (!notif.is_read) {
    try {
      await api.markNotificationRead(notif.id);
      notif.is_read = true;
    } catch (err) {
      console.error(err);
    }
  }
};

const markAllAsRead = async () => {
  try {
    await api.markAllNotificationsRead(currentUserId.value);
    notifications.value.forEach(n => (n.is_read = true));
  } catch (err) {
    console.error(err);
  }
};


watch(currentUserId, () => {
  fetchNotifications();
});

onMounted(() => {
  fetchNotifications();
});

const handleLogout = () => {
  showUserMenu.value = false;
  showNotifMenu.value = false;
  logout();
  router.push('/login');
};

import petani from '@/assets/icons/download.jpg';
</script>
