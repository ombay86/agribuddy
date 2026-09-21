<template>
  <div class="p-4 space-y-4 pb-28">
    <!-- Header Monitoring Utama -->
    <div class="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 rounded-3xl shadow-md relative overflow-hidden">
      <div class="relative z-10 space-y-1.5">
        <div class="inline-flex items-center gap-1.5 bg-emerald-400/20 text-emerald-200 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          <Activity :size="13" /> Pusat Kendali Pertanian
        </div>
        <h2 class="text-xl font-black tracking-tight leading-tight">
          Monitoring Usahatani Terpadu
        </h2>
        <p class="text-xs text-emerald-100/90 leading-relaxed">
          Pantau kondisi sawah, cuaca GPS, siklus budidaya, ketersediaan stok saprotan, hasil lumbung, dan transaksi Anda.
        </p>
      </div>
      <div class="absolute -right-4 -bottom-6 text-emerald-700/20 select-none pointer-events-none text-9xl font-black">
        📊
      </div>
    </div>

    <!-- Navigation Tabs Monitoring (Sawah, Stok, Lumbung, Transaksi) -->
    <div class="flex p-1 bg-slate-200/80 rounded-2xl gap-1 text-xs font-black">
      <button
        @click="activeSection = 'sawah'"
        class="flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1 active:scale-95"
        :class="activeSection === 'sawah' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'"
      >
        <Sprout :size="14" /> Sawah & AI
      </button>
      <button
        @click="activeSection = 'stok'"
        class="flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1 active:scale-95"
        :class="activeSection === 'stok' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'"
      >
        <Package :size="14" /> Stok Buku
      </button>
      <button
        @click="activeSection = 'lumbung'"
        class="flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1 active:scale-95"
        :class="activeSection === 'lumbung' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'"
      >
        <Warehouse :size="14" /> Lumbung
      </button>
      <button
        @click="activeSection = 'transaksi'"
        class="flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1 active:scale-95"
        :class="activeSection === 'transaksi' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'"
      >
        <Receipt :size="14" /> Transaksi
      </button>
    </div>

    <!-- SECTION 1: PANTAU SAWAH & RENCANA TANI AI -->
    <div v-if="activeSection === 'sawah'" class="space-y-4">
      <!-- Cuaca & Rekomendasi GPS -->
      <div v-if="weather" class="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-3xl p-5 shadow-sm space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
            Cuaca Lahan Real-Time
          </span>
          <div class="flex items-center gap-2">
            <button
              @click="detectGPSWeather"
              :disabled="isLocatingWeather"
              type="button"
              class="text-[10px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-0.5 rounded-lg active:scale-95 transition-all flex items-center gap-1 shadow-xs"
              title="Deteksi lokasi GPS otomatis"
            >
              <Navigation :size="11" class="animate-pulse" />
              <span>{{ isLocatingWeather ? 'GPS...' : '📍 GPS' }}</span>
            </button>
            <span class="text-xs font-medium text-slate-500 flex items-center gap-1">
              <MapPin :size="13" /> {{ weather.location }}
            </span>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <div class="text-3xl font-black text-slate-800 tracking-tight">
              {{ weather.temp_celsius }}°<span class="text-xl font-bold text-slate-600">C</span>
            </div>
            <p class="text-xs font-semibold text-slate-700 mt-0.5">{{ weather.weather_condition }}</p>
          </div>
          <div class="text-right space-y-1 text-xs text-slate-600 font-medium">
            <div class="flex items-center justify-end gap-1.5">
              <Droplets :size="14" class="text-sky-500" />
              <span>Lembab: <strong>{{ weather.humidity_percent }}%</strong></span>
            </div>
            <div class="flex items-center justify-end gap-1.5">
              <CloudRain :size="14" class="text-indigo-500" />
              <span>Peluang Hujan: <strong>{{ weather.rain_probability_percent }}%</strong></span>
            </div>
          </div>
        </div>

        <!-- Anjuran Pengairan Sawah -->
        <div
          class="p-3.5 rounded-2xl border flex items-start gap-3"
          :class="weather.irrigation_needed 
            ? 'bg-emerald-600 text-white border-emerald-700' 
            : 'bg-amber-500 text-white border-amber-600'"
        >
          <div class="p-1.5 bg-white/20 rounded-xl mt-0.5">
            <CheckCircle2 v-if="weather.irrigation_needed" :size="20" />
            <AlertTriangle v-else :size="20" />
          </div>
          <div>
            <h4 class="font-extrabold text-sm leading-snug">{{ weather.advice_title }}</h4>
            <p class="text-[11px] text-white/90 mt-0.5 leading-relaxed">
              {{ weather.advice_detail }}
            </p>
          </div>
        </div>
      </div>

      <!-- Quick Action: Dokter Tani AI Periksa Daun -->
      <router-link
        to="/dokter"
        class="bg-gradient-to-r from-teal-700 to-emerald-800 text-white p-4 rounded-3xl shadow-sm flex items-center justify-between hover:shadow-md transition-all block active:scale-98"
      >
        <div class="space-y-0.5 pr-2">
          <div class="inline-flex items-center gap-1 text-[10px] font-extrabold bg-emerald-400/20 text-emerald-200 px-2 py-0.5 rounded-full">
            <Sparkles :size="11" /> Dokter Tani AI
          </div>
          <h4 class="text-xs font-black">Daun Padi Menguning atau Berbintik?</h4>
          <p class="text-[11px] text-emerald-100">Ambil foto daun untuk diagnosis kresek, blas, dan dosis obat seketika.</p>
        </div>
        <div class="w-10 h-10 rounded-2xl bg-white text-emerald-800 flex items-center justify-center shrink-0 font-black text-lg">
          🔍
        </div>
      </router-link>

      <!-- Rencana Tani AI Embedded Module -->
      <RencanaTaniView />
    </div>

    <!-- SECTION 2: BUKU TANI (STOK BARANG) -->
    <div v-if="activeSection === 'stok'" class="space-y-3">
      <BukuTaniView />
    </div>

    <!-- SECTION 3: LUMBUNG PANEN & PASAR -->
    <div v-if="activeSection === 'lumbung'" class="space-y-3">
      <LumbungView />
    </div>

    <!-- SECTION 4: TRANSAKSI & PESANAN -->
    <div v-if="activeSection === 'transaksi'" class="space-y-4">
      <div class="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
        <span>Pelacakan Pesanan & Bursa Panen</span>
        <span class="text-emerald-700 font-extrabold">{{ orders.length + listings.length + serviceOrders.length }} Transaksi Aktif</span>
      </div>

      <!-- Pesanan Jasa & Layanan Pertanian (Katalog Ekosistem) -->
      <div class="space-y-2.5">
        <div class="flex items-center justify-between">
          <h4 class="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Store :size="14" class="text-emerald-600" /> Pesanan Jasa & Saprotan Ekosistem
          </h4>
          <span class="text-[11px] font-bold text-slate-500">
            {{ serviceOrders.length }} Pesanan
          </span>
        </div>

        <div v-if="serviceOrders.length === 0" class="bg-white border rounded-2xl p-6 text-center text-xs text-slate-400 font-semibold space-y-1">
          <div class="text-2xl">🚜</div>
          <p>Belum ada pemesanan jasa traktor, irigasi, atau buruh dari katalog.</p>
          <router-link to="/katalog" class="text-emerald-700 font-black inline-block mt-1 underline">
            Jelajahi Katalog Layanan →
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="ord in serviceOrders"
            :key="ord.id"
            class="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-3 hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div class="space-y-3">
              <!-- Header Order Jasa -->
              <div class="flex items-start justify-between gap-2">
                <div>
                  <div class="flex items-center gap-1.5">
                    <h5 class="text-xs font-black text-slate-800">{{ ord.service_title }}</h5>
                    <span class="text-[9px] font-bold text-slate-400">#{{ ord.id }}</span>
                  </div>
                  <p class="text-[10px] text-slate-500 font-semibold mt-0.5">
                    Penyedia: <strong>{{ ord.seller_name }}</strong> • {{ ord.created_at }}
                  </p>
                </div>
                <!-- Status Badge Realtime -->
                <span
                  class="text-[10px] font-black px-2.5 py-1 rounded-full shrink-0"
                  :class="getServiceOrderStatusBadge(ord.status)"
                >
                  {{ getServiceOrderStatusLabel(ord.status) }}
                </span>
              </div>

              <!-- Rincian Biaya & Pembayaran -->
              <div class="flex items-center justify-between text-xs p-2.5 bg-slate-50 rounded-2xl border border-slate-100 font-semibold">
                <span class="text-slate-600">{{ ord.quantity }} {{ ord.unit }} • {{ ord.payment_method }}</span>
                <span class="font-black text-emerald-700">Rp {{ ord.total_price.toLocaleString('id-ID') }}</span>
              </div>

              <!-- Catatan Lokasi Pembeli jika ada -->
              <div v-if="ord.delivery_notes" class="text-[11px] text-slate-500 italic bg-slate-50/50 px-2.5 py-1 rounded-lg">
                "{{ ord.delivery_notes }}"
              </div>

              <!-- Kotak Catatan Konfirmasi dari Penjual (Live Tracking) -->
              <div
                v-if="ord.seller_notes"
                class="p-3 rounded-2xl border text-xs space-y-1"
                :class="ord.status === 'STOK_HABIS' || ord.status === 'DIBATALKAN'
                  ? 'bg-rose-50 border-rose-200 text-rose-900'
                  : 'bg-emerald-50/80 border-emerald-200 text-emerald-900'"
              >
                <div class="font-black flex items-center gap-1.5">
                  <span>📢</span>
                  <span>Konfirmasi Penjual ({{ ord.seller_name }}):</span>
                </div>
                <p class="font-medium text-[11px] leading-relaxed">
                  "{{ ord.seller_notes }}"
                </p>
                <div v-if="ord.status_updated_at" class="text-[9px] opacity-75 font-semibold">
                  Diperbarui: {{ ord.status_updated_at }}
                </div>
              </div>
              <div v-else-if="ord.status === 'MENUNGGU_KONFIRMASI'" class="p-2.5 bg-amber-50 border border-amber-200/70 rounded-xl text-[11px] text-amber-800 font-semibold flex items-center gap-1.5">
                <span>⏳</span>
                <span>Menunggu penjual mengonfirmasi kesiapan armada/jadwal pengerjaan...</span>
              </div>
            </div>

            <!-- Tombol Aksi: Diskusi Transaksi dengan Penjual -->
            <div class="pt-2 border-t border-slate-100 flex items-center justify-end">
              <button
                @click="openOrderChat(ord)"
                class="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 py-2 px-3 rounded-xl active:scale-95 transition-all flex items-center gap-1.5 shadow-2xs"
                title="Obrolan Langsung dengan Penjual"
              >
                <MessageSquare :size="13" class="text-blue-600" /> Diskusi Transaksi
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pesanan Saprotan (Kios KPL) -->
      <div class="space-y-2 pt-2">
        <h4 class="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Package :size="14" class="text-emerald-600" /> Pesanan Saprotan KPL
        </h4>

        <div v-if="orders.length === 0" class="bg-white border rounded-2xl p-6 text-center text-xs text-slate-400 font-semibold">
          Belum ada riwayat pesanan saprotan.
        </div>

        <div
          v-for="ord in orders"
          :key="ord.id"
          class="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm space-y-2"
        >
          <div class="flex items-start justify-between">
            <div>
              <h5 class="text-xs font-black text-slate-800">{{ ord.product_name }}</h5>
              <p class="text-[10px] text-slate-500 font-semibold">Dari: {{ ord.seller_name }} • {{ ord.created_at }}</p>
            </div>
            <span
              class="text-[10px] font-black px-2 py-0.5 rounded-full uppercase"
              :class="ord.status === 'SELESAI' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'"
            >
              {{ ord.status }}
            </span>
          </div>

          <div class="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <span class="text-slate-500 font-semibold">{{ ord.quantity }} {{ ord.unit }} • {{ ord.payment_method }}</span>
            <span class="font-black text-emerald-700">Rp {{ ord.total_price.toLocaleString('id-ID') }}</span>
          </div>
        </div>
      </div>

      <!-- Listing Bursa Panen & Tawaran Masuk -->
      <div class="space-y-2 pt-2">
        <h4 class="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Warehouse :size="14" class="text-amber-600" /> Bursa Lelang Hasil Panen Sawah
        </h4>

        <div v-if="listings.length === 0" class="bg-white border rounded-2xl p-6 text-center text-xs text-slate-400 font-semibold">
          Belum ada gabah yang didaftarkan ke bursa pasar.
        </div>

        <div
          v-for="list in listings"
          :key="list.id"
          class="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm space-y-2.5"
        >
          <div class="flex items-start justify-between">
            <div>
              <span class="text-[10px] font-extrabold uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                {{ list.status }}
              </span>
              <h5 class="text-xs font-black text-slate-800 mt-1">{{ list.commodity }}</h5>
              <p class="text-[10px] text-slate-500">{{ list.location }} • Total: {{ list.total_weight_kg.toLocaleString() }} kg</p>
            </div>
            <div class="text-right">
              <span class="text-[10px] text-slate-400 block font-bold">Harga Buka:</span>
              <span class="text-xs font-black text-emerald-700">Rp {{ list.starting_price_per_kg.toLocaleString() }}/kg</span>
            </div>
          </div>

          <!-- Tawaran Masuk dari Pembeli/Pengepul -->
          <div v-if="list.bids && list.bids.length > 0" class="bg-slate-50 rounded-xl p-2.5 space-y-1.5 border border-slate-100">
            <span class="text-[10px] font-black text-slate-500 uppercase block">Tawaran Masuk ({{ list.bids.length }} Pengepul):</span>
            <div
              v-for="bid in list.bids"
              :key="bid.id"
              class="flex items-center justify-between text-xs font-bold"
            >
              <div class="truncate pr-2">
                <span class="text-slate-800">{{ bid.bidder_name }}</span>
                <span class="text-[10px] text-slate-400 block">{{ bid.notes }}</span>
              </div>
              <span class="text-emerald-700 font-black shrink-0">Rp {{ bid.bid_price_per_kg.toLocaleString() }}/kg</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Obrolan Diskusi Pesanan (Chat Transaksi) -->
    <OrderChatModal
      :isOpen="isOrderChatOpen"
      :order="selectedOrderForChat"
      @close="isOrderChatOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { api, WeatherData, SaprotanOrder, MarketListing, ServiceOrder } from '@/services/api';
import { useUserState } from '@/services/userState';
import OrderChatModal from '@/components/OrderChatModal.vue';
import RencanaTaniView from '@/views/RencanaTaniView.vue';
import BukuTaniView from '@/views/BukuTaniView.vue';
import LumbungView from '@/views/LumbungView.vue';
import { 
  Activity, Sprout, Package, Warehouse, Receipt, 
  MapPin, Navigation, Droplets, CloudRain, CheckCircle2, 
  AlertTriangle, Sparkles, Store, MessageSquare
} from 'lucide-vue-next';

const { currentUserId } = useUserState();

// --- CHAT DISKUSI PESANAN STATE ---
const isOrderChatOpen = ref(false);
const selectedOrderForChat = ref<ServiceOrder | null>(null);

const openOrderChat = (order: ServiceOrder) => {
  selectedOrderForChat.value = order;
  isOrderChatOpen.value = true;
};

const activeSection = ref<'sawah' | 'stok' | 'lumbung' | 'transaksi'>('sawah');

const weather = ref<WeatherData | null>(null);
const isLocatingWeather = ref(false);
const orders = ref<SaprotanOrder[]>([]);
const listings = ref<MarketListing[]>([]);
const serviceOrders = ref<ServiceOrder[]>([]);

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

const fetchMonitoringData = async () => {
  try {
    const [w, ord, lst, svcOrders] = await Promise.all([
      api.getWeather(),
      api.getSaprotanOrders(),
      api.getMarketListings(),
      api.getBuyerOrders(currentUserId.value)
    ]);
    weather.value = w;
    orders.value = ord;
    listings.value = lst;
    serviceOrders.value = svcOrders;
  } catch (err) {
    console.error('Error fetching monitoring data:', err);
  }
};

const detectGPSWeather = () => {
  if (!navigator.geolocation) return;
  isLocatingWeather.value = true;
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const w = await api.getWeather(latitude, longitude, 'Lokasi GPS Sawah');
        weather.value = w;
      } catch (err) {
        console.error('Error fetching GPS weather:', err);
      } finally {
        isLocatingWeather.value = false;
      }
    },
    (err) => {
      console.warn('GPS location access denied:', err);
      isLocatingWeather.value = false;
    },
    { enableHighAccuracy: true, timeout: 8000 }
  );
};

onMounted(() => {
  fetchMonitoringData();
});

watch(currentUserId, () => {
  fetchMonitoringData();
});
</script>
