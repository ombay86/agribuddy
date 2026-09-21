<template>
  <header class="bg-gradient-to-r from-tani-700 to-tani-800 text-white px-4 pt-4 pb-5 rounded-b-3xl shadow-md space-y-3">
    <!-- Baris Atas: Logo Aplikasi & Menu Pengguna (Akun yang Sedang Login) -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-2xl">🌾</span>
        <h1 class="text-xl font-extrabold tracking-tight">AgriBuddy</h1>
        <span class="bg-emerald-500/30 text-emerald-200 text-[10px] px-2 py-0.5 rounded-full font-bold border border-emerald-400/30">
          Ekosistem
        </span>
      </div>

      <!-- Desktop Navigation Bar (Hanya tampil di layar md ke atas) -->
      <nav class="hidden md:flex items-center gap-1 bg-emerald-950/40 border border-emerald-500/30 p-1.5 rounded-2xl">
        <router-link
          to="/"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          :class="$route.path === '/' || $route.path === '/jejaring' ? 'bg-emerald-600 text-white shadow-sm font-black' : 'text-emerald-200 hover:text-white hover:bg-white/10'"
        >
          <Users :size="15" /> Jejaring
        </router-link>
        <router-link
          to="/monitoring"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          :class="$route.path.startsWith('/monitoring') || $route.path === '/rencana' || $route.path === '/inventaris' || $route.path === '/lumbung' ? 'bg-emerald-600 text-white shadow-sm font-black' : 'text-emerald-200 hover:text-white hover:bg-white/10'"
        >
          <Activity :size="15" /> Monitoring (Sawah & AI)
        </router-link>
        <router-link
          to="/katalog"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          :class="$route.path === '/katalog' ? 'bg-emerald-600 text-white shadow-sm font-black' : 'text-emerald-200 hover:text-white hover:bg-white/10'"
        >
          <Store :size="15" /> Katalog Layanan
        </router-link>
        <router-link
          to="/profil"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          :class="$route.path === '/profil' ? 'bg-emerald-600 text-white shadow-sm font-black' : 'text-emerald-200 hover:text-white hover:bg-white/10'"
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
            class="relative p-2 rounded-full bg-emerald-950/50 hover:bg-emerald-950/70 border border-emerald-500/40 text-emerald-100 transition-all active:scale-95 shadow-sm"
            title="Pemberitahuan & Interaksi"
          >
            <Bell :size="17" />
            <span
              v-if="unreadCount > 0"
              class="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-emerald-900 shadow-sm animate-pulse"
            >
              {{ unreadCount > 9 ? '9+' : unreadCount }}
            </span>
          </button>

          <!-- Dropdown Panel Notifikasi -->
          <div
            v-if="showNotifMenu"
            class="absolute right-0 mt-2 w-80 sm:w-88 bg-white text-slate-800 rounded-3xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95 duration-150 max-h-[80vh] flex flex-col"
          >
            <div class="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                <Bell :size="15" class="text-emerald-600" />
                <h4 class="text-xs font-black text-slate-800">Notifikasi & Aktivitas</h4>
              </div>
              <button
                v-if="unreadCount > 0"
                @click="markAllAsRead"
                class="text-[10px] font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-lg transition-all"
              >
                Tandai semua dibaca
              </button>
            </div>

            <!-- List Notifikasi -->
            <div class="overflow-y-auto divide-y divide-slate-100 flex-1 max-h-72">
              <div v-if="notifications.length === 0" class="py-8 text-center text-xs text-slate-400 font-semibold">
                🔔 Belum ada notifikasi baru
              </div>
              <div
                v-for="notif in notifications"
                :key="notif.id"
                @click="handleNotificationClick(notif)"
                class="p-3 hover:bg-slate-50 transition-all cursor-pointer flex items-start gap-2.5"
                :class="{ 'bg-emerald-50/40': !notif.is_read }"
              >
                <div class="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 mt-0.5"
                  :class="getNotifBg(notif.type)"
                >
                  {{ getNotifIcon(notif.type) }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between gap-1">
                    <h5 class="text-xs font-black text-slate-800 truncate" :class="{ 'font-black': !notif.is_read }">
                      {{ notif.title }}
                    </h5>
                    <span v-if="!notif.is_read" class="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                  </div>
                  <p class="text-[11px] text-slate-600 mt-0.5 leading-snug line-clamp-2">
                    {{ notif.message }}
                  </p>
                  <span class="text-[9px] text-slate-400 font-bold block mt-1">
                    {{ notif.created_at }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Menu Profil Akun Aktif -->
        <div class="relative">
          <button
            @click="showUserMenu = !showUserMenu; showNotifMenu = false"
            class="flex items-center gap-2 bg-emerald-950/50 hover:bg-emerald-950/70 border border-emerald-500/40 text-xs px-3 py-1.5 rounded-full font-bold text-emerald-100 transition-all active:scale-95 shadow-sm"
          >
            <span class="text-base">{{ currentPersona.avatar }}</span>
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
                <span class="text-xl">{{ currentPersona.avatar }}</span>
                <div>
                  <div class="font-black text-xs text-slate-800">{{ currentPersona.name }}</div>
                  <div class="text-[10px] font-extrabold text-emerald-700">{{ currentPersona.badge }}</div>
                </div>
              </div>
              <p class="text-[10px] text-slate-500 mt-1 truncate">{{ currentPersona.entityName }}</p>
            </div>

            <!-- Opsi Menu -->
            <div class="py-1">
              <router-link
                to="/profil"
                @click="showUserMenu = false"
                class="w-full text-left px-3.5 py-2 text-xs flex items-center gap-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 font-bold transition-all"
              >
                <User :size="15" class="text-emerald-600" /> Buka Profil Usahatani
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
        <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl border border-white/20 shadow-inner">
          {{ currentPersona.avatar }}
        </div>
        <div>
          <div class="text-sm font-extrabold text-white flex items-center gap-1.5">
            {{ currentPersona.name }}
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <p class="text-[11px] text-emerald-200 font-medium">
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
import { ChevronDown, User, LogOut, Bell, Users, Activity, Store } from 'lucide-vue-next';

const router = useRouter();
const { currentPersona, currentUserId, logout } = useUserState();
const showUserMenu = ref(false);
const showNotifMenu = ref(false);
const notifications = ref<InAppNotification[]>([]);

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.is_read).length;
});

const fetchNotifications = async () => {
  try {
    const list = await api.getUserNotifications(currentUserId.value);
    notifications.value = list;
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

const getNotifIcon = (type: string) => {
  switch (type) {
    case 'ORDER_RECEIVED':
      return '🛒';
    case 'NEW_FOLLOWER':
      return '👤';
    case 'NEW_COMMENT':
      return '💬';
    case 'ORDER_STATUS':
      return '✅';
    default:
      return '🔔';
  }
};

const getNotifBg = (type: string) => {
  switch (type) {
    case 'ORDER_RECEIVED':
      return 'bg-amber-100 text-amber-800';
    case 'NEW_FOLLOWER':
      return 'bg-sky-100 text-sky-800';
    case 'NEW_COMMENT':
      return 'bg-teal-100 text-teal-800';
    case 'ORDER_STATUS':
      return 'bg-emerald-100 text-emerald-800';
    default:
      return 'bg-slate-100 text-slate-800';
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
</script>

