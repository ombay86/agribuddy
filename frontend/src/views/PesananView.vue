<template>
  <div class="space-y-6">
    <!-- 1. Header Banner Monitoring Pesanan Khusus -->
    <div class="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 md:p-8 rounded-3xl shadow-md relative overflow-hidden">
      <div class="relative z-10 space-y-2 max-w-3xl">
        <div class="inline-flex items-center gap-1.5 bg-emerald-400/20 text-emerald-200 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
          <Truck :size="14" /> Sistem Logistik & Transaksi Ekosistem
        </div>
        <h2 class="text-2xl md:text-3xl font-black tracking-tight leading-tight">
          Pelacakan & Monitoring Pesanan
        </h2>
        <p class="text-xs md:text-sm text-emerald-100/90 leading-relaxed">
          Pantau status pengerjaan armada traktor, jadwal pengairan pompa, pengiriman pupuk/saprotan kios resmi, hingga komunikasi langsung dengan penyedia jasa secara real-time.
        </p>
      </div>
      <div class="absolute -right-4 -bottom-6 text-emerald-700/20 select-none pointer-events-none text-9xl md:text-[140px] font-black">
        🧾
      </div>
    </div>

    <!-- 2. KPI Ringkasan Status Pesanan Saya -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div class="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-1">
        <div class="flex items-center justify-between text-slate-500 text-xs font-bold">
          <span>Total Pesanan</span>
          <Receipt :size="16" class="text-slate-400" />
        </div>
        <div class="text-2xl font-black text-slate-800">
          {{ totalOrdersCount }}
        </div>
        <p class="text-[10px] text-slate-400 font-semibold">Semua transaksi Anda</p>
      </div>

      <div class="bg-white border border-amber-200 bg-amber-50/40 rounded-2xl p-4 shadow-xs space-y-1">
        <div class="flex items-center justify-between text-amber-700 text-xs font-bold">
          <span>Menunggu Konfirmasi</span>
          <Clock :size="16" class="text-amber-500 animate-pulse" />
        </div>
        <div class="text-2xl font-black text-amber-700">
          {{ pendingCount }}
        </div>
        <p class="text-[10px] text-amber-600/80 font-semibold">Menunggu respon penyedia</p>
      </div>

      <div class="bg-white border border-blue-200 bg-blue-50/40 rounded-2xl p-4 shadow-xs space-y-1">
        <div class="flex items-center justify-between text-blue-700 text-xs font-bold">
          <span>Sedang Berjalan</span>
          <Truck :size="16" class="text-blue-500" />
        </div>
        <div class="text-2xl font-black text-blue-700">
          {{ inProgressCount }}
        </div>
        <p class="text-[10px] text-blue-600/80 font-semibold">Armada/pekerja aktif</p>
      </div>

      <div class="bg-white border border-emerald-200 bg-emerald-50/40 rounded-2xl p-4 shadow-xs space-y-1">
        <div class="flex items-center justify-between text-emerald-700 text-xs font-bold">
          <span>Selesai Dikerjakan</span>
          <CheckCircle2 :size="16" class="text-emerald-500" />
        </div>
        <div class="text-2xl font-black text-emerald-700">
          {{ completedCount }}
        </div>
        <p class="text-[10px] text-emerald-600/80 font-semibold">Sukses terlaksana</p>
      </div>
    </div>

    <!-- 3. Navigasi Tab Kategori & Filter Status -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white border border-slate-200 p-2.5 rounded-2xl shadow-xs">
      <!-- Tabs Kategori Transaksi -->
      <div class="flex p-1 bg-slate-100 rounded-xl gap-1 text-xs font-bold overflow-x-auto">
        <button
          @click="activeCategory = 'all'"
          class="px-3 py-2 rounded-lg transition-all whitespace-nowrap active:scale-95"
          :class="activeCategory === 'all' ? 'bg-white text-emerald-800 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'"
        >
          Semua ({{ totalOrdersCount }})
        </button>
        <button
          @click="activeCategory = 'service'"
          class="px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95"
          :class="activeCategory === 'service' ? 'bg-white text-emerald-800 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'"
        >
          <Store :size="14" /> Jasa Traktor & Usahatani ({{ serviceOrders.length }})
        </button>
        <button
          @click="activeCategory = 'saprotan'"
          class="px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95"
          :class="activeCategory === 'saprotan' ? 'bg-white text-emerald-800 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'"
        >
          <Package :size="14" /> Saprotan KPL ({{ saprotanOrders.length }})
        </button>
        <button
          @click="activeCategory = 'bursa'"
          class="px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95"
          :class="activeCategory === 'bursa' ? 'bg-white text-emerald-800 shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'"
        >
          <Warehouse :size="14" /> Bursa Panen ({{ listings.length }})
        </button>
      </div>

      <!-- Filter Status Dropdown -->
      <div class="flex items-center gap-2 px-1">
        <span class="text-xs font-bold text-slate-500 whitespace-nowrap">Filter Status:</span>
        <select
          v-model="statusFilter"
          class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        >
          <option value="SEMUA">Semua Status</option>
          <option value="MENUNGGU_KONFIRMASI">⏳ Menunggu Konfirmasi</option>
          <option value="DIPROSES">🚜 Disetujui / Diproses</option>
          <option value="SEDANG_DIKIRIM">🚚 Sedang Dikirim / Menuju Lokasi</option>
          <option value="SELESAI">✅ Selesai</option>
          <option value="BATAL">❌ Dibatalkan / Stok Habis</option>
        </select>
      </div>
    </div>

    <!-- 4. Loading State -->
    <div v-if="isLoading" class="py-16 text-center space-y-3">
      <Loader2 :size="32" class="animate-spin text-emerald-600 mx-auto" />
      <p class="text-sm font-bold text-slate-500">Memuat data monitoring pesanan...</p>
    </div>

    <!-- 5. Content Canvas: Daftar Pesanan Sesuai Kategori & Filter -->
    <div v-else class="space-y-6">
      <!-- Empty State jika tidak ada data sama sekali -->
      <div
        v-if="displayedServiceOrders.length === 0 && displayedSaprotanOrders.length === 0 && displayedListings.length === 0"
        class="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3"
      >
        <div class="text-4xl">🌾</div>
        <h4 class="text-base font-black text-slate-800">Tidak ada riwayat pesanan yang cocok</h4>
        <p class="text-xs text-slate-500 max-w-md mx-auto">
          Belum ada transaksi dengan filter yang Anda pilih. Anda dapat memesan jasa olah tanah, sewa traktor, dan saprotan langsung melalui Katalog.
        </p>
        <router-link
          to="/katalog"
          class="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs active:scale-95 transition-all mt-2"
        >
          <Store :size="15" /> Buka Katalog Layanan
        </router-link>
      </div>

      <!-- ================= BAGIAN 1: PESANAN JASA & LAYANAN USAHATANI ================= -->
      <div v-if="displayedServiceOrders.length > 0 && (activeCategory === 'all' || activeCategory === 'service')" class="space-y-3">
        <div class="flex items-center justify-between px-1">
          <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Store :size="16" class="text-emerald-600" /> Pesanan Jasa & Sewa Alat Usahatani
          </h3>
          <span class="text-xs font-bold text-slate-500">
            {{ displayedServiceOrders.length }} Pesanan
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="ord in displayedServiceOrders"
            :key="ord.id"
            class="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4 hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div class="space-y-3.5">
              <!-- Top: Service Title, Provider, Status Badge -->
              <div class="flex items-start justify-between gap-3">
                <div>
                  <div class="flex items-center gap-2">
                    <h4 class="text-sm font-black text-slate-800 leading-snug">
                      {{ ord.service_title }}
                    </h4>
                    <span class="text-[9px] font-mono text-slate-400 font-bold bg-slate-100 px-1.5 py-0.5 rounded">
                      #{{ ord.id }}
                    </span>
                  </div>
                  <p class="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1.5">
                    <span>Penyedia: <strong class="text-slate-700">{{ ord.seller_name }}</strong></span>
                    <span>•</span>
                    <span>{{ ord.created_at }}</span>
                  </p>
                </div>

                <!-- Status Badge -->
                <span
                  class="text-[10px] font-black px-2.5 py-1 rounded-full shrink-0"
                  :class="getServiceOrderStatusBadge(ord.status)"
                >
                  {{ getServiceOrderStatusLabel(ord.status) }}
                </span>
              </div>

              <!-- Rincian Biaya & Metode Pembayaran -->
              <div class="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex items-center justify-between text-xs font-semibold">
                <div>
                  <span class="text-slate-500 block text-[10px]">Volume & Metode:</span>
                  <span class="text-slate-800 font-bold">
                    {{ ord.quantity }} {{ ord.unit }} • {{ ord.payment_method }}
                  </span>
                </div>
                <div class="text-right">
                  <span class="text-slate-500 block text-[10px]">Total Tagihan:</span>
                  <span class="text-emerald-700 font-black text-sm">
                    Rp {{ ord.total_price.toLocaleString('id-ID') }}
                  </span>
                </div>
              </div>

              <!-- Catatan Alamat / Petak Sawah Pembeli -->
              <div v-if="ord.delivery_notes" class="text-xs bg-slate-50/70 border border-slate-100 p-2.5 rounded-xl text-slate-600">
                <span class="text-[10px] font-bold text-slate-400 block uppercase">Catatan Lokasi Lahan:</span>
                <p class="mt-0.5 italic">"{{ ord.delivery_notes }}"</p>
              </div>

              <!-- Log Pembaruan Penjual (Live Status Update) -->
              <div
                v-if="ord.seller_notes"
                class="p-3 rounded-2xl border text-xs space-y-1"
                :class="ord.status === 'STOK_HABIS' || ord.status === 'DIBATALKAN'
                  ? 'bg-rose-50 border-rose-200 text-rose-900'
                  : 'bg-emerald-50/90 border-emerald-200 text-emerald-900'"
              >
                <div class="font-black flex items-center gap-1.5">
                  <span>📢</span>
                  <span>Update Penjual ({{ ord.seller_name }}):</span>
                </div>
                <p class="text-[11px] font-medium leading-relaxed">
                  "{{ ord.seller_notes }}"
                </p>
                <div v-if="ord.status_updated_at" class="text-[9px] opacity-75 font-semibold">
                  Diperbarui: {{ ord.status_updated_at }}
                </div>
              </div>
              <div v-else-if="ord.status === 'MENUNGGU_KONFIRMASI'" class="p-3 bg-amber-50 border border-amber-200/80 rounded-2xl text-xs text-amber-800 font-semibold flex items-center gap-2">
                <Clock :size="15" class="text-amber-600 shrink-0 animate-spin" />
                <span>Menunggu penyedia mengonfirmasi jadwal ketersediaan armada & tenaga...</span>
              </div>
            </div>

            <!-- Tombol Aksi Bawah: Chat & Batalkan -->
            <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <div>
                <button
                  v-if="ord.status === 'MENUNGGU_KONFIRMASI'"
                  @click="cancelOrder(ord)"
                  class="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-xl font-bold transition-all"
                >
                  Batalkan Pesanan
                </button>
              </div>

              <button
                @click="openOrderChat(ord)"
                class="text-xs font-black text-slate-700 bg-slate-100 hover:bg-slate-200 py-2 px-3.5 rounded-xl active:scale-95 transition-all flex items-center gap-1.5 shadow-2xs"
                title="Buka obrolan koordinasi dengan penjual"
              >
                <MessageSquare :size="14" class="text-blue-600" />
                <span>Diskusi Transaksi</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= BAGIAN 2: PESANAN SAPROTAN KIOS KPL ================= -->
      <div v-if="displayedSaprotanOrders.length > 0 && (activeCategory === 'all' || activeCategory === 'saprotan')" class="space-y-3">
        <div class="flex items-center justify-between px-1">
          <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Package :size="16" class="text-emerald-600" /> Pesanan Pupuk & Saprotan Kios Resmi
          </h3>
          <span class="text-xs font-bold text-slate-500">
            {{ displayedSaprotanOrders.length }} Pesanan
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <div
            v-for="ord in displayedSaprotanOrders"
            :key="ord.id"
            class="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2.5"
          >
            <div class="flex items-start justify-between">
              <div>
                <h4 class="text-xs font-black text-slate-800">{{ ord.product_name }}</h4>
                <p class="text-[10px] text-slate-500 font-semibold mt-0.5">
                  Kios: {{ ord.seller_name }} • {{ ord.created_at }}
                </p>
              </div>
              <span
                class="text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase"
                :class="ord.status === 'SELESAI' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'"
              >
                {{ ord.status }}
              </span>
            </div>

            <div class="flex items-center justify-between text-xs pt-1 border-t border-slate-100 font-semibold">
              <span class="text-slate-600">{{ ord.quantity }} {{ ord.unit }} • {{ ord.payment_method }}</span>
              <span class="font-black text-emerald-700">Rp {{ ord.total_price.toLocaleString('id-ID') }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= BAGIAN 3: BURSA LELANG PANEN ================= -->
      <div v-if="displayedListings.length > 0 && (activeCategory === 'all' || activeCategory === 'bursa')" class="space-y-3">
        <div class="flex items-center justify-between px-1">
          <h3 class="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Warehouse :size="16" class="text-amber-600" /> Bursa Lelang & Tawaran Panen Gabah
          </h3>
          <span class="text-xs font-bold text-slate-500">
            {{ displayedListings.length }} Bursa
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <div
            v-for="list in displayedListings"
            :key="list.id"
            class="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3"
          >
            <div class="flex items-start justify-between">
              <div>
                <span class="text-[10px] font-extrabold uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                  {{ list.status }}
                </span>
                <h4 class="text-xs font-black text-slate-800 mt-1">{{ list.commodity }}</h4>
                <p class="text-[10px] text-slate-500 font-medium">
                  {{ list.location }} • Total: {{ list.total_weight_kg.toLocaleString() }} kg
                </p>
              </div>
              <div class="text-right">
                <span class="text-[10px] text-slate-400 block font-bold">Harga Buka:</span>
                <span class="text-xs font-black text-emerald-700">Rp {{ list.starting_price_per_kg.toLocaleString() }}/kg</span>
              </div>
            </div>

            <!-- List Bids Masuk -->
            <div v-if="list.bids && list.bids.length > 0" class="bg-slate-50 rounded-xl p-2.5 space-y-1.5 border border-slate-100">
              <span class="text-[10px] font-black text-slate-500 uppercase block">
                Tawaran Masuk ({{ list.bids.length }} Mitra Pembeli):
              </span>
              <div
                v-for="bid in list.bids"
                :key="bid.id"
                class="flex items-center justify-between text-xs font-bold"
              >
                <div class="truncate pr-2">
                  <span class="text-slate-800">{{ bid.bidder_name }}</span>
                  <span class="text-[10px] text-slate-400 block">{{ bid.bid_weight_kg.toLocaleString() }} kg</span>
                </div>
                <span class="text-emerald-700 whitespace-nowrap">
                  Rp {{ bid.bid_price_per_kg.toLocaleString() }}/kg
                </span>
              </div>
            </div>
            <div v-else class="text-[11px] text-slate-400 italic bg-slate-50 p-2 rounded-xl text-center">
              Menunggu tawaran dari pengepul mitra...
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 6. Modal Obrolan Diskusi Pesanan (OrderChatModal) -->
    <OrderChatModal
      :isOpen="isOrderChatOpen"
      :order="selectedOrderForChat"
      @close="isOrderChatOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { api, ServiceOrder, SaprotanOrder, MarketListing } from '@/services/api';
import { useUserState } from '@/services/userState';
import OrderChatModal from '@/components/OrderChatModal.vue';
import { 
  Receipt, Truck, Clock, CheckCircle2, Store, Package, 
  Warehouse, MessageSquare, Loader2
} from 'lucide-vue-next';

const { currentUserId } = useUserState();

// State
const isLoading = ref(true);
const serviceOrders = ref<ServiceOrder[]>([]);
const saprotanOrders = ref<SaprotanOrder[]>([]);
const listings = ref<MarketListing[]>([]);

// Filter State
const activeCategory = ref<'all' | 'service' | 'saprotan' | 'bursa'>('all');
const statusFilter = ref<string>('SEMUA');

// Chat Modal State
const isOrderChatOpen = ref(false);
const selectedOrderForChat = ref<ServiceOrder | null>(null);

const openOrderChat = (order: ServiceOrder) => {
  selectedOrderForChat.value = order;
  isOrderChatOpen.value = true;
};

// Data Fetching
const fetchOrders = async () => {
  isLoading.value = true;
  try {
    const [svcOrders, sapOrders, lst] = await Promise.all([
      api.getBuyerOrders(currentUserId.value).catch(() => []),
      api.getSaprotanOrders().catch(() => []),
      api.getMarketListings().catch(() => [])
    ]);
    serviceOrders.value = svcOrders;
    saprotanOrders.value = sapOrders;
    listings.value = lst;
  } catch (err) {
    console.error('Error fetching orders in PesananView:', err);
  } finally {
    isLoading.value = false;
  }
};

// Cancel order action
const cancelOrder = async (order: ServiceOrder) => {
  if (!confirm(`Batalkan pesanan ${order.service_title}?`)) return;
  try {
    await api.updateServiceOrderStatus(order.id, 'DIBATALKAN', 'Dibatalkan oleh pembeli.');
    await fetchOrders();
  } catch (err: any) {
    alert(err.message || 'Gagal membatalkan pesanan');
  }
};

// KPI Metrics
const totalOrdersCount = computed(() => {
  return serviceOrders.value.length + saprotanOrders.value.length + listings.value.length;
});

const pendingCount = computed(() => {
  const svcPending = serviceOrders.value.filter(o => o.status === 'MENUNGGU_KONFIRMASI').length;
  const sapPending = saprotanOrders.value.filter(o => o.status === 'DIPESAN').length;
  return svcPending + sapPending;
});

const inProgressCount = computed(() => {
  const svcProgress = serviceOrders.value.filter(o => o.status === 'DIPROSES' || o.status === 'SEDANG_DIKIRIM').length;
  const sapProgress = saprotanOrders.value.filter(o => o.status === 'DIKONFIRMASI' || o.status === 'DIKIRIM').length;
  return svcProgress + sapProgress;
});

const completedCount = computed(() => {
  const svcDone = serviceOrders.value.filter(o => o.status === 'SELESAI').length;
  const sapDone = saprotanOrders.value.filter(o => o.status === 'SELESAI').length;
  return svcDone + sapDone;
});

// Filtered Lists
const displayedServiceOrders = computed(() => {
  if (statusFilter.value === 'SEMUA') return serviceOrders.value;
  if (statusFilter.value === 'BATAL') {
    return serviceOrders.value.filter(o => o.status === 'DIBATALKAN' || o.status === 'STOK_HABIS');
  }
  return serviceOrders.value.filter(o => o.status === statusFilter.value);
});

const displayedSaprotanOrders = computed(() => {
  if (statusFilter.value === 'SEMUA') return saprotanOrders.value;
  if (statusFilter.value === 'MENUNGGU_KONFIRMASI') {
    return saprotanOrders.value.filter(o => o.status === 'DIPESAN');
  }
  if (statusFilter.value === 'DIPROSES' || statusFilter.value === 'SEDANG_DIKIRIM') {
    return saprotanOrders.value.filter(o => o.status === 'DIKONFIRMASI' || o.status === 'DIKIRIM');
  }
  if (statusFilter.value === 'SELESAI') {
    return saprotanOrders.value.filter(o => o.status === 'SELESAI');
  }
  if (statusFilter.value === 'BATAL') {
    return saprotanOrders.value.filter(o => o.status === 'DIBATALKAN');
  }
  return saprotanOrders.value;
});

const displayedListings = computed(() => {
  if (statusFilter.value === 'SEMUA') return listings.value;
  if (statusFilter.value === 'SELESAI') {
    return listings.value.filter(l => l.status === 'TERJUAL');
  }
  return listings.value.filter(l => l.status === 'DIBUKA');
});

// Badges & Labels Helpers
const getServiceOrderStatusBadge = (status: string) => {
  switch (status) {
    case 'MENUNGGU_KONFIRMASI':
      return 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse';
    case 'DIPROSES':
      return 'bg-blue-100 text-blue-900 border border-blue-300';
    case 'SEDANG_DIKIRIM':
      return 'bg-indigo-100 text-indigo-900 border border-indigo-300 font-bold';
    case 'SELESAI':
      return 'bg-emerald-100 text-emerald-900 border border-emerald-300';
    case 'STOK_HABIS':
      return 'bg-rose-100 text-rose-900 border border-rose-300';
    case 'DIBATALKAN':
      return 'bg-slate-200 text-slate-700 border border-slate-300';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

const getServiceOrderStatusLabel = (status: string) => {
  switch (status) {
    case 'MENUNGGU_KONFIRMASI':
      return '⏳ Menunggu Konfirmasi Penjual';
    case 'DIPROSES':
      return '🚜 Diproses / Jadwal Disetujui';
    case 'SEDANG_DIKIRIM':
      return '🚚 Mulai Dikirim / Berangkat';
    case 'SELESAI':
      return '✅ Selesai Dikerjakan';
    case 'STOK_HABIS':
      return '⚠️ Penjual: Stok Habis / Penuh';
    case 'DIBATALKAN':
      return '❌ Pesanan Dibatalkan';
    default:
      return status;
  }
};

onMounted(() => {
  fetchOrders();
});

watch(currentUserId, () => {
  fetchOrders();
});
</script>
