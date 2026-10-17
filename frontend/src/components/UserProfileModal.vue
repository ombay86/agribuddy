<template>
  <BaseModal v-if="isOpen" backdrop="60-sm" animate class="duration-200">
    <div class="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-4 relative overflow-hidden">
      <!-- Close Button -->
      <button
        @click="close"
        class="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-500 p-1.5 rounded-full transition-all"
      >
        <X :size="18" />
      </button>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-10 space-y-2">
        <div class="inline-block animate-spin text-[#324d1d]">
          <Loader2 :size="28" />
        </div>
        <p class="text-xs font-bold text-slate-600">Memuat profil pengguna...</p>
      </div>

      <!-- Profile Content -->
      <div v-else-if="profile" class="space-y-4">
        <!-- Header Info -->
        <div class="text-center pt-2">
          <div class="w-20 h-20 bg-gradient-to-br from-[#99c30c]/20 to-[#99c30c]/10 rounded-full flex items-center justify-center text-4xl mx-auto border-2 border-[#99c30c]/60 shadow-inner overflow-hidden">
            <img
              v-if="profile.avatar.startsWith('/')"
              :src="profile.avatar.endsWith('/icons/petani.svg') ? farmer : profile.avatar"
              :alt="`Avatar ${profile.name}`"
              class="w-full h-full object-cover"
            />
            <template v-else>{{ profile.avatar }}</template>
          </div>
          <div class="flex items-center justify-center gap-1.5 mt-2.5">
            <h3 class="text-lg  text-slate-800">{{ profile.name }}</h3>
            <CheckCircle2 :size="16" class="text-[#324d1d] fill-[#99c30c]/20" />
          </div>
          <span class="inline-block text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#99c30c]/20 text-[#324d1d] mt-1">
            {{ profile.role_label }}
          </span>
          <p class="text-xs text-slate-500 flex items-center justify-center gap-1 mt-1">
            <MapPin :size="13" class="text-slate-400" /> {{ profile.village }}
          </p>
        </div>

        <!-- Bio Usahatani -->
        <p class="text-xs text-slate-600 bg-[#fff2d9] p-3 rounded-2xl border border-slate-100 leading-relaxed text-center">
          "{{ profile.bio }}"
        </p>

        <!-- Statistik Profil (Pengikut, Mengikuti, Postingan) -->
        <div class="grid grid-cols-3 gap-2 bg-[#99c30c]/70 p-2.5 rounded-2xl border border-[#99c30c]/30 text-center">
          <div>
            <span class="text-base  text-[#324d1d] block">{{ profile.followers_count }}</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase">Pengikut</span>
          </div>
          <div class="border-x border-[#99c30c]/60">
            <span class="text-base  text-[#324d1d] block">{{ profile.following_count }}</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase">Mengikuti</span>
          </div>
          <div>
            <span class="text-base  text-[#324d1d] block">{{ profile.posts_count }}</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase">Postingan</span>
          </div>
        </div>

        <!-- Detail Lahan & Spesialisasi Layanan Ekosistem -->
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="bg-[#fff2d9] p-2.5 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 block uppercase">Peran / Layanan</span>
            <span class="font-extrabold text-slate-700">{{ profile.commodity }}</span>
          </div>
          <div class="bg-[#fff2d9] p-2.5 rounded-xl border border-slate-100">
            <span class="text-[10px] font-bold text-slate-400 block uppercase">Status Lahan</span>
            <span class="font-extrabold text-slate-700">{{ profile.land_size_ha && profile.land_size_ha > 0 ? `${profile.land_size_ha} Ha` : (profile.category_badge || 'Warga Ekosistem') }}</span>
          </div>
        </div>

        <!-- Spesialisasi Jasa / Layanan Ekosistem -->
        <div v-if="profile.service_specialties && profile.service_specialties.length > 0" class="space-y-1">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Layanan & Keahlian:</span>
          <div class="flex flex-wrap gap-1">
            <span
              v-for="(spec, sIdx) in profile.service_specialties"
              :key="sIdx"
              class="text-[10px] font-extrabold bg-[#99c30c]/10 text-[#324d1d] border border-[#99c30c]/40 px-2 py-0.5 rounded-md"
            >
              {{ spec }}
            </span>
          </div>
        </div>

        <!-- Tombol Aksi (Ikuti & WhatsApp) -->
        <div class="pt-2 flex gap-2">
          <!-- Tombol Ikuti Interaktif -->
          <button
            @click="handleToggleFollow"
            class="flex-1 btn-farmer text-xs  py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
            :class="profile.is_followed 
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300' 
              : 'bg-[#324d1d]/90 hover:bg-[#324d1d] text-white'"
          >
            <UserCheck v-if="profile.is_followed" :size="15" />
            <UserPlus v-else :size="15" />
            <span>{{ profile.is_followed ? 'Mengikuti' : '+ Ikuti Profil' }}</span>
          </button>

          <!-- Tombol Kontak WhatsApp Langsung -->
          <a
            :href="`https://wa.me/${profile.whatsapp_number}?text=Halo%20${encodeURIComponent(profile.name)},%20saya%20terhubung%20melalui%20aplikasi%20AgriBuddy.`"
            target="_blank"
            class="btn-farmer bg-[#99c30c]/10 hover:bg-[#99c30c]/20 text-[#324d1d] border border-[#99c30c]/60 text-xs  py-2.5 px-3 rounded-xl flex items-center justify-center gap-1"
            title="Kirim Chat WhatsApp"
          >
            <MessageCircle :size="15" /> Chat WA
          </a>
        </div>

      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { api, PublicUserProfile } from '@/services/api';
import { 
  X, Loader2, CheckCircle2, MapPin, UserPlus, 
  UserCheck, MessageCircle 
} from 'lucide-vue-next';
import BaseModal from '@/components/ui/BaseModal.vue';
import farmer from '@/assets/icons/download.jpg';

const props = defineProps<{
  isOpen: boolean;
  authorName: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const profile = ref<PublicUserProfile | null>(null);
const isLoading = ref(false);

const loadProfile = async (name: string) => {
  if (!name) return;
  isLoading.value = true;
  profile.value = null;
  try {
    profile.value = await api.getPublicProfile(name);
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

watch(() => props.isOpen, (newVal) => {
  if (newVal && props.authorName) {
    loadProfile(props.authorName);
  }
});

const handleToggleFollow = async () => {
  if (!profile.value) return;
  try {
    const res = await api.toggleFollowUser(profile.value.name);
    profile.value.is_followed = res.is_followed;
    profile.value.followers_count = res.followers_count;
  } catch (err) {
    console.error(err);
  }
};

const close = () => {
  emit('close');
};
</script>
