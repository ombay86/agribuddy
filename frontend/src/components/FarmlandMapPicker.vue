<template>
  <div :class="embedded ? 'space-y-3' : 'bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-3'">
    <!-- Header: GPS Status & Auto-Detect Button (Hidden if embedded or showHeader is false) -->
    <div v-if="showHeader && !embedded" class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
      <div>
        <div class="flex items-center gap-1.5">
          <MapPin :size="16" class="text-[#324d1d]" />
          <h4 class="text-xs  text-slate-800">Koordinat & Peta Lokasi Lahan</h4>
        </div>
        <p class="text-[11px] text-slate-500 mt-0.5">
          Tentukan titik petak sawah yang akan diolah untuk akurasi cuaca & logistik
        </p>
      </div>

      <!-- Tombol Deteksi GPS Otomatis -->
      <button
        @click="detectGPSLocation"
        :disabled="isLocating"
        type="button"
        class="bg-[#324d1d]/90 hover:bg-[#324d1d] text-white text-xs font-bold py-1.5 px-3 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-2xs disabled:opacity-60 cursor-pointer"
      >
        <Navigation v-if="!isLocating" :size="13" class="animate-pulse" />
        <Loader2 v-else :size="13" class="animate-spin" />
        <span>{{ isLocating ? 'Mencari...' : 'Deteksi GPS Saya' }}</span>
      </button>
    </div>

    <!-- Feedback Banner (GPS Terdeteksi / Status) -->
    <div
      v-if="gpsStatusMessage"
      class="p-2.5 rounded-2xl text-xs flex items-center justify-between transition-all"
      :class="isGpsSuccess 
        ? 'bg-[#99c30c]/10 text-[#324d1d] border border-[#99c30c]/40' 
        : 'bg-[#fed701]/10 text-[#324d1d] border border-[#fed701]/40'"
    >
      <div class="flex items-center gap-2">
        <span class="font-bold text-[11px]">{{ gpsStatusMessage }}</span>
      </div>
      <button
        v-if="!isGpsSuccess"
        @click="setDefaultCoordinates"
        class="text-[10px]  underline hover:text-[#324d1d]"
      >
        Gunakan Default
      </button>
    </div>

    <!-- Field Ketik Alamat / Cari Lokasi Peta Langsung -->
    <div class="relative">
      <div class="relative flex items-center">
        <Search :size="14" class="absolute left-3 text-slate-400 pointer-events-none" />
        <input
          v-model="searchAddressQuery"
          @keydown.enter.prevent="searchAddressAndGo"
          type="text"
          placeholder="Ketik alamat / desa / kota lalu tekan Enter untuk arahkan titik..."
          class="w-full pl-9 pr-24 py-2 rounded-xl border border-slate-300 font-semibold text-xs text-slate-800 focus:outline-none focus:border-[#99c30c] bg-white shadow-2xs"
        />
        <button
          @click="searchAddressAndGo"
          :disabled="isSearchingAddress || !searchAddressQuery.trim()"
          type="button"
          class="absolute right-1 px-2.5 py-1 rounded-lg bg-[#324d1d] hover:bg-[#324d1d]/90 text-white text-[10px] font-bold active:scale-95 transition-all flex items-center gap-1 shadow-2xs cursor-pointer disabled:opacity-50"
        >
          <Loader2 v-if="isSearchingAddress" :size="11" class="animate-spin" />
          <span v-else>Cari Alamat</span>
        </button>
      </div>
    </div>

    <!-- Map Container -->
    <div class="relative w-full h-56 rounded-2xl overflow-hidden border border-slate-200 shadow-inner z-10">
      <div ref="mapContainer" class="w-full h-full"></div>

      <!-- Layer Toggle (Peta / Citra Satelit Lahan) -->
      <div class="absolute top-2 right-2 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-slate-200/80 shadow-md flex items-center gap-1 z-[400] text-[10px] font-bold">
        <button
          type="button"
          @click="setMapType('street')"
          :class="mapType === 'street' ? 'bg-[#324d1d]/90 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-100'"
          class="px-2 py-0.5 rounded-lg transition-all cursor-pointer"
        >
          Peta
        </button>
        <button
          type="button"
          @click="setMapType('satellite')"
          :class="mapType === 'satellite' ? 'bg-[#324d1d]/90 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-100'"
          class="px-2 py-0.5 rounded-lg transition-all cursor-pointer"
        >
          Satelit
        </button>
      </div>

      <!-- Floating Coordinate Pill on Map -->
      <div class="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-md flex items-center justify-between text-[11px] z-[400]">
        <div class="truncate pr-2">
          <span class="font-extrabold text-slate-800">Koordinat Lahan:</span>
          <span class="font-mono text-[#324d1d] font-bold ml-1">{{ currentLat.toFixed(5) }}, {{ currentLon.toFixed(5) }}</span>
        </div>
        <span class="text-[9px]  uppercase tracking-wider bg-[#99c30c]/20 text-[#324d1d] px-1.5 py-0.5 rounded-md shrink-0">
          Pin Aktif
        </span>
      </div>
    </div>

    <!-- Info Alamat / Nama Petak Lahan -->
    <div class="bg-[#fff2d9] border border-slate-100 rounded-2xl p-3 space-y-1.5 text-xs">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-extrabold uppercase text-slate-400">Deskripsi / Alamat Lahan:</span>
        <span class="text-[10px] text-[#324d1d] font-bold">Klik atau geser pin di peta untuk memindahkan</span>
      </div>
      <div class="font-bold text-slate-700 flex items-start gap-1.5">
        <Locate :size="14" class="text-[#324d1d] mt-0.5 shrink-0" />
        <span>{{ addressLabel || 'Memuat alamat lokasi...' }}</span>
      </div>
    </div>

    <!-- Quick Farmland Presets (Desa Sukamaju) -->
    <div class="flex flex-wrap items-center gap-1.5 pt-1">
      <span class="text-[10px] font-extrabold uppercase text-slate-400 mr-1">Petak Cepat:</span>
      <button
        v-for="p in presets"
        :key="p.name"
        @click="selectPreset(p.lat, p.lon, p.name)"
        type="button"
        class="text-[10px] font-bold px-2 py-1 rounded-xl border transition-all active:scale-95"
        :class="Math.abs(currentLat - p.lat) < 0.001 && Math.abs(currentLon - p.lon) < 0.001
          ? 'bg-[#99c30c]/20 text-[#324d1d] border-[#99c30c]/60 '
          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'"
      >
        {{ p.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { MapPin, Navigation, Loader2, Locate, Search } from 'lucide-vue-next';
import L from 'leaflet';

const props = defineProps({
  initialLat: {
    type: Number,
    default: -7.2504
  },
  initialLon: {
    type: Number,
    default: 112.7512
  },
  initialLabel: {
    type: String,
    default: 'Desa Sukamaju, Jawa Timur'
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  embedded: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits<{
  (e: 'update:coordinates', data: { lat: number; lon: number; label: string }): void;
}>();

const mapContainer = ref<HTMLElement | null>(null);
let map: L.Map | null = null;
let marker: L.Marker | null = null;

const currentLat = ref(props.initialLat);
const currentLon = ref(props.initialLon);
const addressLabel = ref(props.initialLabel);
const isLocating = ref(false);
const gpsStatusMessage = ref('');
const isGpsSuccess = ref(true);

const searchAddressQuery = ref('');
const isSearchingAddress = ref(false);

const presets = [
  { name: 'Petak Timur (Irigasi Dam)', lat: -7.2480, lon: 112.7535 },
  { name: 'Petak Barat (Pompa Saluran)', lat: -7.2525, lon: 112.7485 },
  { name: 'Sentra Poktan Makmur', lat: -7.2504, lon: 112.7512 }
];

// Custom crisp Agricultural Pin
const pinIcon = L.divIcon({
  html: `
    <div class="relative flex items-center justify-center">
      <div class="w-9 h-9 bg-[#fe8b02] rounded-full flex items-center justify-center text-white text-lg shadow-lg border-2 border-white transform hover:scale-110 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
          <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="w-2 h-2 bg-[#324d1d] rounded-full absolute -bottom-1"></div>
    </div>
  `,
  className: 'custom-farm-pin',
  iconSize: [36, 42],
  iconAnchor: [18, 42]
});

const mapType = ref<'street' | 'satellite'>('street');
let tileLayer: L.TileLayer | null = null;

const streetTileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const satelliteTileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

const setMapType = (type: 'street' | 'satellite') => {
  mapType.value = type;
  if (!map) return;
  if (tileLayer) {
    map.removeLayer(tileLayer);
  }
  if (type === 'satellite') {
    tileLayer = L.tileLayer(satelliteTileUrl, {
      maxZoom: 19,
      attribution: '© Esri Satellite, Earthstar Geographics'
    }).addTo(map);
  } else {
    tileLayer = L.tileLayer(streetTileUrl, {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  }
};

const initMap = () => {
  if (!mapContainer.value) return;

  map = L.map(mapContainer.value, {
    center: [currentLat.value, currentLon.value],
    zoom: 15,
    zoomControl: true
  });

  // OpenStreetMap Tile Layer (Standar)
  tileLayer = L.tileLayer(streetTileUrl, {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Marker Draggable
  marker = L.marker([currentLat.value, currentLon.value], {
    icon: pinIcon,
    draggable: true
  }).addTo(map);

  // Event: Drag Marker
  marker.on('dragend', () => {
    if (!marker) return;
    const pos = marker.getLatLng();
    setNewPosition(pos.lat, pos.lng);
  });

  // Event: Click on Map
  map.on('click', (e: L.LeafletMouseEvent) => {
    setNewPosition(e.latlng.lat, e.latlng.lng);
  });

  setTimeout(() => {
    map?.invalidateSize();
  }, 300);
};

const setNewPosition = (lat: number, lon: number, customLabel?: string) => {
  currentLat.value = lat;
  currentLon.value = lon;

  if (marker) {
    marker.setLatLng([lat, lon]);
  }
  if (map) {
    map.panTo([lat, lon]);
  }

  if (customLabel) {
    addressLabel.value = customLabel;
    emitCoordinates();
  } else {
    reverseGeocode(lat, lon);
  }
};

const emitCoordinates = () => {
  emit('update:coordinates', {
    lat: currentLat.value,
    lon: currentLon.value,
    label: addressLabel.value
  });
};

const selectPreset = (lat: number, lon: number, name: string) => {
  setNewPosition(lat, lon, `${name}, Sukamaju`);
  gpsStatusMessage.value = `Petak lahan dipilih: ${name}`;
  isGpsSuccess.value = true;
};

const setDefaultCoordinates = () => {
  setNewPosition(-7.2504, 112.7512, 'Desa Sukamaju, Jawa Timur');
  gpsStatusMessage.value = 'Menggunakan koordinat default Desa Sukamaju';
  isGpsSuccess.value = true;
};

// Search Address & Pan/Zoom to Location
const searchAddressAndGo = async () => {
  const query = searchAddressQuery.value.trim();
  if (!query) return;

  isSearchingAddress.value = true;
  gpsStatusMessage.value = `Mencari lokasi: "${query}"...`;
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`, {
      headers: {
        'Accept-Language': 'id'
      }
    });
    if (res.ok) {
      const results = await res.json();
      if (results && results.length > 0) {
        const item = results[0];
        const lat = parseFloat(item.lat);
        const lon = parseFloat(item.lon);
        const shortName = item.display_name.split(',').slice(0, 3).join(',').trim();

        currentLat.value = lat;
        currentLon.value = lon;
        addressLabel.value = shortName;

        if (marker) {
          marker.setLatLng([lat, lon]);
        }
        if (map) {
          map.setView([lat, lon], 16);
        }
        emitCoordinates();
        gpsStatusMessage.value = `Lokasi ditemukan: ${shortName}`;
        isGpsSuccess.value = true;
      } else {
        gpsStatusMessage.value = `Lokasi "${query}" tidak ditemukan. Coba kata kunci lain.`;
        isGpsSuccess.value = false;
      }
    } else {
      gpsStatusMessage.value = 'Gagal menghubungi server pencarian alamat.';
      isGpsSuccess.value = false;
    }
  } catch (err) {
    gpsStatusMessage.value = 'Terjadi kesalahan saat mencari alamat.';
    isGpsSuccess.value = false;
  } finally {
    isSearchingAddress.value = false;
  }
};

// Auto Geolocation via HTML5 GPS
const detectGPSLocation = () => {
  if (!navigator.geolocation) {
    gpsStatusMessage.value = 'Browser Anda tidak mendukung deteksi GPS.';
    isGpsSuccess.value = false;
    return;
  }

  isLocating.value = true;
  gpsStatusMessage.value = 'Menghubungkan ke satelit GPS perangkat...';

  navigator.geolocation.getCurrentPosition(
    (position) => {
      isLocating.value = false;
      const { latitude, longitude, accuracy } = position.coords;
      gpsStatusMessage.value = `GPS Berhasil! Akurasi ±${Math.round(accuracy)} meter`;
      isGpsSuccess.value = true;
      setNewPosition(latitude, longitude);
    },
    (error) => {
      isLocating.value = false;
      isGpsSuccess.value = false;
      if (error.code === error.PERMISSION_DENIED) {
        gpsStatusMessage.value = 'Izin akses lokasi GPS ditolak oleh pengguna.';
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        gpsStatusMessage.value = 'Sinyal lokasi GPS perangkat tidak tersedia.';
      } else {
        gpsStatusMessage.value = 'Gagal mendeteksi lokasi GPS (Timeout).';
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
};

// Reverse Geocode using OpenStreetMap Nominatim with Fallback
const reverseGeocode = async (lat: number, lon: number) => {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=16&addressdetails=1`, {
      headers: {
        'Accept-Language': 'id'
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.display_name) {
        const parts = data.display_name.split(',');
        const shortName = parts.slice(0, 3).join(',').trim();
        addressLabel.value = shortName;
        emitCoordinates();
        return;
      }
    }
  } catch (err) {
    // Fallback jika offline / rate limit nominatim
  }
  addressLabel.value = `Petak Lahan (${lat.toFixed(4)}, ${lon.toFixed(4)}), Sukamaju`;
  emitCoordinates();
};

onMounted(() => {
  nextTick(() => {
    initMap();
    // Otomatis minta GPS saat komponen dimount
    detectGPSLocation();
  });
});

onUnmounted(() => {
  if (map) {
    map.remove();
    map = null;
  }
});
</script>

<style scoped>
:deep(.custom-farm-pin) {
  background: transparent;
  border: none;
}
</style>
