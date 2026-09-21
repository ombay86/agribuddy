<template>
  <div class="p-4 space-y-4 pb-24">
    <!-- Header Modul -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
          <Sparkles class="text-emerald-600" :size="24" /> Dokter Tani AI
        </h2>
        <p class="text-xs text-slate-500 mt-0.5">Deteksi dini penyakit daun padi & solusi takaran obat</p>
      </div>
      <span class="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200">
        AI Vision Active
      </span>
    </div>

    <!-- Area Unggah / Ambil Foto -->
    <div class="bg-white border-2 border-dashed border-emerald-300 rounded-3xl p-6 text-center shadow-sm relative overflow-hidden">
      <!-- Input File Tersembunyi -->
      <input
        type="file"
        ref="fileInput"
        accept="image/*"
        class="hidden"
        @change="handleFileUpload"
      />

      <div v-if="!selectedImagePreview" class="space-y-4">
        <div class="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner border border-emerald-200">
          <Camera :size="36" />
        </div>
        <div>
          <h3 class="font-extrabold text-base text-slate-800">Foto Daun Tanaman Padi</h3>
          <p class="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Arahkan kamera dekat pada daun yang memiliki bercak atau menguning.
          </p>
        </div>
        <button
          @click="triggerFileInput"
          class="btn-farmer bg-emerald-600 text-white hover:bg-emerald-700 mx-auto w-full max-w-xs shadow-md"
        >
          <Upload :size="18" /> Pilih Foto dari Perangkat
        </button>
      </div>

      <!-- Pratinjau Foto yang Dipilih -->
      <div v-else class="space-y-4">
        <div class="relative w-full max-w-xs mx-auto h-52 rounded-2xl overflow-hidden shadow-md border border-slate-200">
          <img :src="selectedImagePreview" class="w-full h-full object-cover" alt="Pratinjau Daun" />
          <button
            @click="resetSelection"
            class="absolute top-2 right-2 bg-slate-900/70 text-white p-2 rounded-full hover:bg-slate-900 transition-all"
            title="Hapus / Ganti Foto"
          >
            <X :size="16" />
          </button>
        </div>

        <button
          v-if="!isAnalyzing"
          @click="runDiagnosis(currentFile)"
          class="btn-farmer bg-emerald-600 text-white hover:bg-emerald-700 mx-auto w-full max-w-xs shadow-md"
        >
          <Sparkles :size="18" /> Mulai Analisis AI Sekarang
        </button>
      </div>

      <!-- Loading State saat AI Berpikir -->
      <div v-if="isAnalyzing" class="mt-4 p-4 bg-emerald-50/90 rounded-2xl border border-emerald-200 text-center">
        <div class="inline-block animate-spin text-emerald-600 mb-2">
          <Loader2 :size="28" />
        </div>
        <p class="text-xs font-bold text-emerald-800">Sedang Menganalisis Citra Daun...</p>
        <p class="text-[11px] text-emerald-600 mt-0.5">Mengekstraksi pola warna & lesi penyakit</p>
      </div>
    </div>

    <!-- Opsi Uji Coba Cepat (Preset Sampel Penyakit) -->
    <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200">
      <div class="flex items-center justify-between mb-2">
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <CheckCircle :size="14" class="text-emerald-600" /> Uji Coba Cepat (Demo Sampel)
        </h4>
        <span class="text-[11px] text-slate-500 font-medium">Klik untuk simulasi</span>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="sample in samples"
          :key="sample.key"
          @click="selectSample(sample.key)"
          class="p-2.5 bg-white border border-slate-200 hover:border-emerald-500 rounded-xl text-left transition-all active:scale-95 shadow-sm"
        >
          <div class="text-xs font-extrabold text-slate-800 truncate">{{ sample.title }}</div>
          <div class="text-[10px] text-slate-500 mt-0.5 truncate">{{ sample.hint }}</div>
        </button>
      </div>
    </div>

    <!-- Hasil Diagnosis AI Card -->
    <div v-if="diagnosisResult" class="bg-white border-2 border-emerald-500 rounded-3xl p-5 shadow-lg space-y-4 animate-in fade-in duration-300">
      <div class="flex items-start justify-between">
        <div>
          <span class="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
            :class="diagnosisResult.severity === 'Aman' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'"
          >
            Tingkat Risiko: {{ diagnosisResult.severity }}
          </span>
          <h3 class="text-lg font-black text-slate-800 mt-1.5 leading-snug">
            {{ diagnosisResult.disease_name }}
          </h3>
          <p class="text-xs italic text-slate-500 font-medium">
            {{ diagnosisResult.english_name }}
          </p>
        </div>
        <div class="text-right">
          <div class="text-2xl font-black text-emerald-600">
            {{ Math.round(diagnosisResult.confidence * 100) }}%
          </div>
          <span class="text-[10px] font-semibold text-slate-400">Tingkat Akurasi</span>
        </div>
      </div>

      <!-- Gejala / Ciri-Ciri -->
      <div class="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
        <h5 class="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
          <AlertTriangle :size="14" class="text-amber-500" /> Gejala yang Terdeteksi:
        </h5>
        <ul class="space-y-1.5">
          <li
            v-for="(symptom, idx) in diagnosisResult.symptoms"
            :key="idx"
            class="text-xs text-slate-600 flex items-start gap-2"
          >
            <span class="text-amber-500 font-bold">•</span>
            <span>{{ symptom }}</span>
          </li>
        </ul>
      </div>

      <!-- Solusi & Tindakan Petani -->
      <div class="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200">
        <h5 class="text-xs font-extrabold text-emerald-900 mb-2 flex items-center gap-1.5">
          <CheckCircle2 :size="15" class="text-emerald-600" /> Anjuran Tindakan & Takaran Obat:
        </h5>
        <ul class="space-y-2">
          <li
            v-for="(action, idx) in diagnosisResult.actions"
            :key="idx"
            class="text-xs text-slate-700 flex items-start gap-2"
          >
            <span class="bg-emerald-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              {{ idx + 1 }}
            </span>
            <span class="font-medium leading-relaxed">{{ action }}</span>
          </li>
        </ul>
      </div>

      <p class="text-[10px] text-slate-400 text-right">
        Waktu Deteksi: {{ diagnosisResult.detected_at }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api, DiagnosisResult } from '@/services/api';
import { 
  Sparkles, Camera, Upload, X, Loader2, CheckCircle, 
  CheckCircle2, AlertTriangle 
} from 'lucide-vue-next';

const fileInput = ref<HTMLInputElement | null>(null);
const selectedImagePreview = ref<string | null>(null);
const currentFile = ref<File | undefined>(undefined);
const isAnalyzing = ref(false);
const diagnosisResult = ref<DiagnosisResult | null>(null);
const samples = ref<{ key: string; title: string; hint: string }[]>([]);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    currentFile.value = file;
    selectedImagePreview.value = URL.createObjectURL(file);
    diagnosisResult.value = null;
  }
};

const resetSelection = () => {
  selectedImagePreview.value = null;
  currentFile.value = undefined;
  diagnosisResult.value = null;
  if (fileInput.value) fileInput.value.value = '';
};

const runDiagnosis = async (file?: File, sampleKey?: string) => {
  isAnalyzing.value = true;
  diagnosisResult.value = null;
  try {
    const result = await api.diagnoseLeaf(file, sampleKey);
    diagnosisResult.value = result;
  } catch (err) {
    alert('Gagal mendiagnosis foto daun. Pastikan server backend menyala.');
    console.error(err);
  } finally {
    isAnalyzing.value = false;
  }
};

const selectSample = async (sampleKey: string) => {
  selectedImagePreview.value = null;
  currentFile.value = undefined;
  await runDiagnosis(undefined, sampleKey);
};

onMounted(async () => {
  try {
    samples.value = await api.getSampleDiagnoses();
  } catch (e) {
    console.error('Error fetching sample diagnoses:', e);
  }
});
</script>
