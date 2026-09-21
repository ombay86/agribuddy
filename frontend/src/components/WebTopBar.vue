<template>
  <header class="bg-white border-b border-slate-200/90 px-4 md:px-8 py-3.5 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
    <!-- Left: Mobile Menu Toggle & Breadcrumbs -->
    <div class="flex items-center gap-3">
      <!-- Mobile Logo Icon -->
      <div class="md:hidden w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg shrink-0">
        🌾
      </div>

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

    <!-- Right: Quick Farmland Selector, Notifications, & Profile -->
    <div class="flex items-center gap-2.5">
      <!-- Quick Farmland Plot Switcher (Hanya jika pengguna memiliki sawah) -->
      <div v-if="farmlands.length > 0" class="hidden lg:flex items-center gap-1.5 bg-slate-100/90 hover:bg-slate-200/80 px-3 py-1.5 rounded-xl border border-slate-200 transition-all text-xs">
        <span class="text-sm">🌾</span>
        <span class="text-[11px] font-bold text-slate-500">Lahan Aktif:</span>
        <select
          v-model="selectedFarmId"
          @change="handleFarmChange"
          class="bg-transparent font-black text-slate-800 text-xs focus:outline-none cursor-pointer"
        >
          <option v-for="f in farmlands" :key="f.id" :value="f.id">
            {{ f.name }} ({{ f.land_size_ha }} Ha)
          </option>
        </select>
      </div>

      <!-- Notification Bell -->
      <div class="relative">
        <button
          @click="showNotifMenu = !showNotifMenu"
          class="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all active:scale-95"
          title="Notifikasi & Pemberitahuan"
        >
          <Bell :size="18" />
          <span
            v-if="unreadCount > 0"
            class="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-pulse"
          >
            {{ unreadCount > 9 ? '9+' : unreadCount }}
          </span>
        </button>

        <!-- Dropdown Notifications Panel -->
        <div
          v-if="showNotifMenu"
          class="absolute right-0 mt-2 w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95 duration-150 max-h-[80vh] flex flex-col"
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
              <div
                class="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 mt-0.5"
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

      <!-- Quick User Info Badge -->
      <router-link
        to="/profil"
        class="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-all"
      >
        <span class="text-lg">{{ currentPersona.avatar }}</span>
        <span class="text-xs font-black text-slate-800 hidden sm:inline">{{ currentPersona.name }}</span>
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserState } from '@/services/userState';
import { api, InAppNotification, Farmland } from '@/services/api';
import { Bell } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const { currentPersona, currentUserId } = useUserState();

const showNotifMenu = ref(false);
const notifications = ref<InAppNotification[]>([]);
const farmlands = ref<Farmland[]>([]);
const selectedFarmId = ref('');

const currentSectionName = computed(() => {
  const p = route.path;
  if (p === '/' || p === '/jejaring') return 'Jejaring Komunitas';
  if (p.startsWith('/monitoring')) return 'Monitoring Usahatani';
  if (p === '/katalog') return 'Katalog Marketplace';
  if (p === '/profil') return 'Profil Saya';
  if (p === '/dokter') return 'Dokter Tani AI';
  if (p === '/inventaris') return 'Buku Tani (Stok)';
  if (p === '/lumbung') return 'Lumbung Panen';
  return 'Dashboard';
});

const currentPageTitle = computed(() => {
  const p = route.path;
  if (p === '/' || p === '/jejaring') return 'Linimasa & Aktivitas Warga Tani';
  if (p.startsWith('/monitoring')) {
    if (route.query.tab === 'transaksi') return 'Pelacakan Pesanan & Transaksi';
    return 'Monitoring Sawah, AI & Bagi Hasil';
  }
  if (p === '/katalog') return 'Katalog Layanan & Produk Ekosistem';
  if (p === '/profil') return 'Identitas Pengguna & Layanan Saya';
  if (p === '/dokter') return 'Dokter Tani AI — Deteksi Penyakit Daun';
  if (p === '/inventaris') return 'Buku Tani — Manajemen Stok Saprotan';
  if (p === '/lumbung') return 'Lumbung Panen & Bursa Lelang';
  return 'AgriBuddy Dashboard';
});

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.is_read).length;
});

const fetchTopBarData = async () => {
  try {
    const [notifs, farms] = await Promise.all([
      api.getUserNotifications(currentUserId.value),
      api.getFarmlands(currentUserId.value).catch(() => [])
    ]);
    notifications.value = notifs;
    farmlands.value = farms;
    if (farms.length > 0 && !selectedFarmId.value) {
      selectedFarmId.value = farms[0].id;
    }
  } catch (err) {
    console.error('Error fetching topbar data:', err);
  }
};

const handleFarmChange = () => {
  // Trigger event atau navigate ke monitoring dengan query farm
  if (route.path !== '/monitoring') {
    router.push({ path: '/monitoring', query: { farm_id: selectedFarmId.value } });
  }
};

const markAllAsRead = async () => {
  try {
    await api.markAllNotificationsRead(currentUserId.value);
    notifications.value.forEach(n => (n.is_read = true));
  } catch (err) {
    console.error('Error marking all as read:', err);
  }
};

const handleNotificationClick = async (notif: InAppNotification) => {
  if (!notif.is_read) {
    try {
      await api.markNotificationRead(notif.id);
      notif.is_read = true;
    } catch (err) {
      console.error('Error marking notification read:', err);
    }
  }
  showNotifMenu.value = false;
  if (notif.type === 'ORDER_RECEIVED') {
    router.push('/katalog');
  } else if (notif.type === 'ORDER_STATUS' || notif.type === 'ORDER_DISCUSSION') {
    router.push('/monitoring?tab=transaksi');
  } else if (notif.type === 'PRODUCT_DISCUSSION') {
    router.push('/katalog');
  } else if (notif.type === 'NEW_COMMENT' || notif.type === 'NEW_FOLLOWER') {
    router.push('/');
  }
};

const getNotifBg = (type: string) => {
  switch (type) {
    case 'ORDER_RECEIVED': return 'bg-emerald-100 text-emerald-700';
    case 'ORDER_STATUS': return 'bg-blue-100 text-blue-700';
    case 'ORDER_DISCUSSION': return 'bg-indigo-100 text-indigo-700';
    case 'PRODUCT_DISCUSSION': return 'bg-amber-100 text-amber-700';
    case 'NEW_FOLLOWER': return 'bg-purple-100 text-purple-700';
    case 'NEW_COMMENT': return 'bg-teal-100 text-teal-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

const getNotifIcon = (type: string) => {
  switch (type) {
    case 'ORDER_RECEIVED': return '📦';
    case 'ORDER_STATUS': return '🚚';
    case 'ORDER_DISCUSSION': return '💬';
    case 'PRODUCT_DISCUSSION': return '❓';
    case 'NEW_FOLLOWER': return '👤';
    case 'NEW_COMMENT': return '🌾';
    default: return '🔔';
  }
};

onMounted(() => {
  fetchTopBarData();
});

watch(currentUserId, () => {
  fetchTopBarData();
});
</script>
