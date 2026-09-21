<template>
  <div class="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm space-y-3">
    <!-- Header: GPS Status & Auto-Detect Button -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
      <div>
        <div class="flex items-center gap-1.5">
          <MapPin :size="16" class="text-emerald-600" />
          <h4 class="text-xs font-black text-slate-800">Koordinat & Peta Lokasi Lahan</h4>
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
        class="btn-farmer bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black py-2 px-3 rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-60"
      >
        <Navigation v-if="!isLocating" :size="13" class="animate-pulse" />
        <Loader2 v-else :size="13" class="animate-spin" />
        <span>{{ isLocating ? 'Mencari GPS...' : '📍 Deteksi GPS Saya' }}</span>
      </button>
    </div>

    <!-- Feedback Banner (GPS Terdeteksi / Status) -->
    <div
      v-if="gpsStatusMessage"
      class="p-2.5 rounded-2xl text-xs flex items-center justify-between transition-all"
      :class="isGpsSuccess 
        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
        : 'bg-amber-50 text-amber-800 border border-amber-200'"
    >
      <div class="flex items-center gap-2">
        <span class="text-sm">{{ isGpsSuccess ? '🛰️' : '⚠️' }}</span>
        <span class="font-bold text-[11px]">{{ gpsStatusMessage }}</span>
      </div>
      <button
        v-if="!isGpsSuccess"
        @click="setDefaultCoordinates"
        class="text-[10px] font-black underline hover:text-amber-900"
      >
        Gunakan Default
      </button>
    </div>

    <!-- Map Container -->
    <div class="relative w-full h-56 rounded-2xl overflow-hidden border border-slate-200 shadow-inner z-10">
      <div ref="mapContainer" class="w-full h-full"></div>

      <!-- Floating Coordinate Pill on Map -->
      <div class="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-md flex items-center justify-between text-[11px] z-[400]">
        <div class="truncate pr-2">
          <span class="font-extrabold text-slate-800">Koordinat Lahan:</span>
          <span class="font-mono text-emerald-700 font-bold ml-1">{{ currentLat.toFixed(5) }}, {{ currentLon.toFixed(5) }}</span>
        </div>
        <span class="text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md shrink-0">
          Pin Aktif
        </span>
      </div>
    </div>

    <!-- Info Alamat / Nama Petak Lahan -->
    <div class="bg-slate-50 border border-slate-100 rounded-2xl p-3 space-y-1.5 text-xs">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-extrabold uppercase text-slate-400">Deskripsi / Alamat Lahan:</span>
        <span class="text-[10px] text-emerald-700 font-bold">Klik atau geser pin di peta untuk memindahkan</span>
      </div>
      <div class="font-bold text-slate-700 flex items-start gap-1.5">
        <Locate :size="14" class="text-emerald-600 mt-0.5 shrink-0" />
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
          ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-black'
          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'"
      >
        {{ p.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { MapPin, Navigation, Loader2, Locate } from 'lucide-vue-next';
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

const presets = [
  { name: 'Petak Timur (Irigasi Dam)', lat: -7.2480, lon: 112.7535 },
  { name: 'Petak Barat (Pompa Saluran)', lat: -7.2525, lon: 112.7485 },
  { name: 'Sentra Poktan Makmur', lat: -7.2504, lon: 112.7512 }
];

// Custom crisp Agricultural Pin
const pinIcon = L.divIcon({
  html: `
    <div class="relative flex items-center justify-center">
      <div class="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center text-white text-lg shadow-lg border-2 border-white transform hover:scale-110 transition-transform">
        🌾
      </div>
      <div class="w-2 h-2 bg-emerald-900 rounded-full absolute -bottom-1"></div>
    </div>
  `,
  className: 'custom-farm-pin',
  iconSize: [36, 42],
  iconAnchor: [18, 42]
});

const initMap = () => {
  if (!mapContainer.value) return;

  map = L.map(mapContainer.value, {
    center: [currentLat.value, currentLon.value],
    zoom: 15,
    zoomControl: true
  });

  // OpenStreetMap Tile Layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
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
