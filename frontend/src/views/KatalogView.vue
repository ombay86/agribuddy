<template>
  <div class="space-y-6 pb-20 md:pb-8">
    <!-- Header Banner -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-6 md:p-8 text-white shadow-xl border border-slate-800">
      <div class="relative z-10 max-w-2xl space-y-2">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
          <span>🚜</span>
          <span>Ekosistem Kemitraan Tani</span>
        </div>
        <h1 class="text-2xl md:text-3xl font-black tracking-tight">
          Direktori Layanan & Saprotan Tani
        </h1>
        <p class="text-sm text-slate-300 leading-relaxed">
          Temukan penyedia jasa olah tanah, persewaan pompa irigasi, regu buruh tanam, kios pupuk resmi, hingga penyerapan panen di Desa Sukamaju. Hubungi langsung penyedia via WhatsApp untuk kesepakatan jadwal dan pengerjaan.
        </p>
      </div>

      <!-- Action Button: Pasang Layanan Baru -->
      <div class="mt-6 flex flex-wrap items-center gap-3">
        <button
          @click="showCreateModal = true"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/40 transition-all active:scale-95 cursor-pointer"
        >
          <Plus :size="16" />
          <span>Pasang Layanan Mandiri</span>
        </button>
      </div>
    </div>

    <!-- Search & Filter Controls -->
    <div class="space-y-4">
      <!-- Search Input -->
      <div class="relative">
        <Search :size="18" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          placeholder="Cari layanan traktor, pompa air, pupuk subsidi, regu cangkul..."
          class="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
        />
      </div>

      <!-- Category Filter Pills -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="selectCategory(cat.id)"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer"
          :class="selectedCategory === cat.id
            ? 'bg-emerald-700 text-white shadow-md'
            : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'"
        >
          <span class="mr-1.5">{{ cat.icon }}</span>
          {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- Service Catalog Grid (3 Kolom di Layar Lebar) -->
    <div v-if="loading" class="py-16 text-center">
      <div class="inline-block animate-spin text-3xl">⏳</div>
      <p class="text-sm font-bold text-slate-500 mt-2">Memuat direktori layanan ekosistem...</p>
    </div>

    <div v-else-if="services.length === 0" class="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs">
      <span class="text-4xl">🌾</span>
      <h3 class="text-base font-black text-slate-800 mt-2">Layanan Tidak Ditemukan</h3>
      <p class="text-xs text-slate-500 max-w-sm mx-auto mt-1">
        Belum ada layanan yang cocok dengan kata kunci pencarian atau kategori ini.
      </p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="service in services"
        :key="service.id"
        class="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
      >
        <div class="space-y-3">
          <!-- Card Header: Category Badge & Avatar -->
          <div class="flex items-start justify-between gap-3">
            <span class="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
              {{ service.category_label || service.category }}
            </span>
            <span class="text-2xl p-2 rounded-2xl bg-slate-50 border border-slate-100 shrink-0">
              {{ service.provider_avatar || '🌾' }}
            </span>
          </div>

          <!-- Service Title & Price -->
          <div>
            <h3 class="text-base font-black text-slate-800 leading-snug group-hover:text-emerald-700 transition-colors">
              {{ service.title }}
            </h3>
            <div class="flex items-baseline gap-1 mt-1 text-emerald-700">
              <span class="text-xs font-bold">Rp</span>
              <span class="text-lg font-black">{{ (service.price || 0).toLocaleString('id-ID') }}</span>
              <span class="text-xs font-semibold text-slate-500">{{ service.price_unit }}</span>
            </div>
          </div>

          <!-- Provider Info & Location -->
          <div class="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <span class="font-bold text-slate-800">👤 {{ service.provider_name }}</span>
            <span class="text-slate-300">•</span>
            <span class="truncate">📍 {{ service.location }}</span>
          </div>

          <!-- Description -->
          <p class="text-xs text-slate-600 leading-relaxed line-clamp-3">
            {{ service.description }}
          </p>

          <!-- Tags -->
          <div v-if="service.tags && service.tags.length > 0" class="flex flex-wrap gap-1.5 pt-1">
            <span
              v-for="(tag, idx) in service.tags"
              :key="idx"
              class="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-600"
            >
              #{{ tag }}
            </span>
          </div>
        </div>

        <!-- Direct WhatsApp Action Button -->
        <div class="pt-5 mt-4 border-t border-slate-100">
          <a
            :href="getWhatsAppUrl(service)"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 text-center cursor-pointer"
          >
            <Phone :size="15" />
            <span>Hubungi via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Modal: Pasang Layanan Baru -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
    >
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto border border-slate-100">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 class="text-base font-black text-slate-800">Pasang Layanan Mandiri</h3>
            <p class="text-xs text-slate-500">Tawarkan jasa atau sarana tani Anda ke ekosistem desa</p>
          </div>
          <button @click="showCreateModal = false" class="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100">
            <X :size="18" />
          </button>
        </div>

        <form @submit.prevent="handleCreateService" class="space-y-3.5 text-xs font-semibold">
          <div>
            <label class="block text-slate-700 mb-1 font-bold">Judul Layanan / Produk</label>
            <input
              v-model="newService.title"
              required
              placeholder="Contoh: Sewa Traktor Quick Olah Tanah 8.5 HP"
              class="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-slate-700 mb-1 font-bold">Kategori</label>
              <select
                v-model="newService.category"
                class="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="JASA_TRAKTOR">🚜 Jasa Olah Tanah</option>
                <option value="JASA_PENGAIRAN">💧 Jasa Pengairan</option>
                <option value="JASA_TENAGA_KERJA">🌾 Tenaga Kerja Tani</option>
                <option value="SAPROTAN">🏪 Pupuk & Benih</option>
                <option value="PASCA_PANEN">🚚 Jasa Pasca Panen</option>
              </select>
            </div>
            <div>
              <label class="block text-slate-700 mb-1 font-bold">Nomor WhatsApp Aktif</label>
              <input
                v-model="newService.phone"
                required
                placeholder="08123456789"
                class="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-slate-700 mb-1 font-bold">Tarif Biaya (Rp)</label>
              <input
                v-model.number="newService.price"
                type="number"
                required
                placeholder="1200000"
                class="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label class="block text-slate-700 mb-1 font-bold">Satuan Unit</label>
              <input
                v-model="newService.price_unit"
                required
                placeholder="/ Hektar atau / Hari"
                class="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-slate-700 mb-1 font-bold">Lokasi / Dusun</label>
            <input
              v-model="newService.location"
              placeholder="Desa Sukamaju Krajan"
              class="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label class="block text-slate-700 mb-1 font-bold">Deskripsi Layanan & Fasilitas</label>
            <textarea
              v-model="newService.description"
              rows="3"
              required
              placeholder="Rincian spesifikasi alat, operator berpengalaman, jaminan pekerjaan rapi..."
              class="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            ></textarea>
          </div>

          <div class="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              @click="showCreateModal = false"
              class="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100 font-bold"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black shadow-md cursor-pointer"
            >
              Terbitkan Layanan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api, EcosystemServiceItem } from '@/services/api';
import { Search, Plus, Phone, X } from 'lucide-vue-next';

const services = ref<EcosystemServiceItem[]>([]);
const loading = ref(false);
const searchQuery = ref('');
const selectedCategory = ref('SEMUA');
const showCreateModal = ref(false);

const categories = [
  { id: 'SEMUA', label: 'Semua Layanan', icon: '✨' },
  { id: 'JASA_TRAKTOR', label: 'Jasa Olah Tanah', icon: '🚜' },
  { id: 'JASA_PENGAIRAN', label: 'Pompa & Irigasi', icon: '💧' },
  { id: 'JASA_TENAGA_KERJA', label: 'Tenaga Kerja', icon: '🌾' },
  { id: 'SAPROTAN', label: 'Kios Pupuk & Benih', icon: '🏪' },
  { id: 'PASCA_PANEN', label: 'Pasca Panen', icon: '🚚' },
];

const newService = ref({
  title: '',
  category: 'JASA_TRAKTOR',
  price: 0,
  price_unit: '/ Hektar',
  location: 'Desa Sukamaju',
  phone: '08123456789',
  description: '',
  tags: ['Mitra Lokal', 'Cepat & Rapi']
});

const fetchServices = async () => {
  loading.value = true;
  try {
    services.value = await api.getCatalogServices(selectedCategory.value, searchQuery.value);
  } catch (err) {
    console.error('Error fetching catalog services:', err);
  } finally {
    loading.value = false;
  }
};

const selectCategory = (catId: string) => {
  selectedCategory.value = catId;
  fetchServices();
};

let searchTimer: any = null;
const handleSearch = () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    fetchServices();
  }, 350);
};

const getWhatsAppUrl = (service: EcosystemServiceItem) => {
  const rawPhone = (service.phone || '628123456789').replace(/\D/g, '');
  const cleanPhone = rawPhone.startsWith('0') ? '62' + rawPhone.substring(1) : rawPhone;
  const message = `Halo ${service.provider_name}, saya dari platform AgriBuddy ingin menanyakan ketersediaan layanan:\n` +
    `🌾 Layanan: ${service.title}\n` +
    `💰 Tarif: Rp ${(service.price || 0).toLocaleString('id-ID')} ${service.price_unit}\n` +
    `📍 Lokasi saya: Sawah Desa Sukamaju\n\n` +
    `Apakah ada jadwal yang tersedia untuk pengerjaan/pemesanan? Terima kasih.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

const handleCreateService = async () => {
  try {
    await api.createService(newService.value);
    showCreateModal.value = false;
    newService.value = {
      title: '',
      category: 'JASA_TRAKTOR',
      price: 0,
      price_unit: '/ Hektar',
      location: 'Desa Sukamaju',
      phone: '08123456789',
      description: '',
      tags: ['Mitra Lokal', 'Cepat & Rapi']
    };
    fetchServices();
  } catch (err: any) {
    alert('Gagal menambahkan layanan: ' + (err.message || err));
  }
};

onMounted(() => {
  fetchServices();
});
</script>
