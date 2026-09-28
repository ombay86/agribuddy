import { ref, computed } from 'vue';

export type UserRole = 
  | 'PETANI_MANDIRI' 
  | 'JASA_TRAKTOR' 
  | 'JASA_PENGAIRAN' 
  | 'JASA_CANGKUL' 
  | 'KIOS_SAPROTAN' 
  | 'PENGGILINGAN_PADI'
  | 'PETANI'
  | 'DISTRIBUTOR'
  | 'AGEN_PEMBELI';

export interface Persona {
  id: string;
  role: UserRole;
  name: string;
  username: string;
  badge: string;
  serviceCategory: string;
  entityName: string;
  location: string;
  avatar: string;
  specialties: string[];
}

export const PERSONAS: Record<string, Persona> = {
  PETANI_MANDIRI: {
    id: 'usr_petani',
    role: 'PETANI_MANDIRI',
    name: 'Pak Joko',
    username: 'pak_joko',
    badge: 'Petani Mandiri',
    serviceCategory: 'Budidaya Padi',
    entityName: 'Kelompok Tani Makmur',
    location: 'Desa Sukamaju',
    avatar: '👨‍🌾',
    specialties: ['Padi Inpari 32', 'Sistem Jajar Legowo', 'Petak Lahan 1.2 Ha']
  },
  JASA_TRAKTOR: {
    id: 'usr_traktor',
    role: 'JASA_TRAKTOR',
    name: 'Mas Bambang',
    username: 'bambang_traktor',
    badge: 'Sewa Traktor',
    serviceCategory: 'Jasa Olah Tanah',
    entityName: 'Bengkel & Traktor Quick Kubota',
    location: 'Desa Sukamaju Krajan',
    avatar: '🚜',
    specialties: ['Bajak Singkal', 'Rotavator Lahan Kering & Basah', 'Operator Handal']
  },
  JASA_PENGAIRAN: {
    id: 'usr_pengairan',
    role: 'JASA_PENGAIRAN',
    name: 'Pak Slamet',
    username: 'slamet_irigasi',
    badge: 'Jasa Pengairan',
    serviceCategory: 'Pompanisasi & Irigasi',
    entityName: 'Jasa Pompa Air Alkon 3 Inci',
    location: 'Desa Sukamaju Blok Saluran',
    avatar: '💧',
    specialties: ['Pompa Alkon 3 Inci', 'Sedot Saluran Sungai', 'Pengeboran Pantek']
  },
  JASA_CANGKUL: {
    id: 'usr_cangkul',
    role: 'JASA_CANGKUL',
    name: 'Mang Udin',
    username: 'udin_cangkul',
    badge: 'Jasa Cangkul',
    serviceCategory: 'Tenaga Kerja Tani',
    entityName: 'Regu Tanam & Cangkul Galengan',
    location: 'Desa Sukamaju Girang',
    avatar: '🌾',
    specialties: ['Cangkul Pematang', 'Regu Tanam Borongan', 'Penyiangan Rumput']
  },
  KIOS_SAPROTAN: {
    id: 'usr_distributor',
    role: 'KIOS_SAPROTAN',
    name: 'Ibu Ratna',
    username: 'ratna_kios',
    badge: 'Kios Saprotan',
    serviceCategory: 'Penyedia Pupuk & Benih',
    entityName: 'Kios Tani Subur Makmur (KPL Resmi)',
    location: 'Pasar Tradisional Sukamaju',
    avatar: '🏪',
    specialties: ['Pupuk Subsidi & Non-Subsidi', 'Benih Bersertifikat', 'Bakterisida Hayati']
  },
  PENGGILINGAN_PADI: {
    id: 'usr_agen',
    role: 'PENGGILINGAN_PADI',
    name: 'Bpk. Hendra Jaya',
    username: 'gilingan_hendra',
    badge: 'Penggilingan Padi',
    serviceCategory: 'Penyerapan Gabah & Logistik',
    entityName: 'Penggilingan Padi Sri Jaya',
    location: 'Sentra Penggilingan Km 3',
    avatar: '🚚',
    specialties: ['Timbangan Digital Terkalibrasi', 'Armada Pick-Up Jemput Lumbung', 'Beli Tunai']
  }
};

// Aliases for backwards compatibility
PERSONAS['PETANI'] = PERSONAS['PETANI_MANDIRI'];
PERSONAS['DISTRIBUTOR'] = PERSONAS['KIOS_SAPROTAN'];
PERSONAS['AGEN_PEMBELI'] = PERSONAS['PENGGILINGAN_PADI'];

const savedRole = (localStorage.getItem('agribuddy_active_role') as UserRole) || 'PETANI_MANDIRI';
const savedAuth = localStorage.getItem('agribuddy_auth');
// Default auth: Hanya bernilai true jika pengguna sudah pernah login di perangkat ini
const initialAuth = savedAuth === 'true';

const savedUserJson = localStorage.getItem('agribuddy_registered_user');
let initialRegisteredUser: any = null;
try {
  initialRegisteredUser = savedUserJson ? JSON.parse(savedUserJson) : null;
} catch {
  initialRegisteredUser = null;
}

// Bersihkan legacy shared state yang menyebabkan username dan avatar bocor ke semua akun
try {
  localStorage.removeItem('agribuddy_custom_username');
  localStorage.removeItem('agribuddy_custom_avatar');
} catch (e) {
  // ignore
}

const activeRole = ref<UserRole>(savedRole);
const registeredUser = ref<any>(initialRegisteredUser);
const isAuthenticated = ref<boolean>(initialAuth);

// State Reaktif Global untuk Avatar & Username pengguna
const userAvatars = ref<Record<string, string | null>>({});
const userUsernames = ref<Record<string, string | null>>({});

export const getActiveUserId = (): string => {
  if (registeredUser.value && registeredUser.value.id) {
    return registeredUser.value.id;
  }
  return PERSONAS[activeRole.value]?.id || 'usr_petani';
};

// Sinkronisasi data profil dari server backend secara otomatis
export const syncUserProfile = async (userId?: string) => {
  try {
    const activeUid = userId || getActiveUserId();
    const apiUrl = (import.meta as any).env?.VITE_API_URL || 'http://127.0.0.1:8000/api/v1';
    const res = await fetch(`${apiUrl}/auth/profile`, {
      headers: {
        'X-User-Id': activeUid
      }
    });
    if (res.ok) {
      const prof = await res.json();
      if (prof) {
        if (prof.avatar_url) {
          userAvatars.value = {
            ...userAvatars.value,
            [activeUid]: prof.avatar_url
          };
          localStorage.setItem(`agribuddy_avatar_${activeUid}`, prof.avatar_url);
        }
        if (prof.username) {
          userUsernames.value = {
            ...userUsernames.value,
            [activeUid]: prof.username
          };
          localStorage.setItem(`agribuddy_username_${activeUid}`, prof.username);
        }
        return prof;
      }
    }
  } catch (err) {
    console.warn('Gagal menyinkronkan profil pengguna dari server:', err);
  }
};

// Panggil sinkronisasi awal saat script dimuat di browser
if (typeof window !== 'undefined') {
  syncUserProfile();
}

export const useUserState = () => {
  const currentPersona = computed(() => {
    if (registeredUser.value) {
      const u = registeredUser.value;
      const userCustomAvatar = userAvatars.value[u.id] !== undefined 
        ? userAvatars.value[u.id] 
        : (localStorage.getItem(`agribuddy_avatar_${u.id}`) || u.avatar_url || null);
      const userCustomUsername = userUsernames.value[u.id] !== undefined
        ? userUsernames.value[u.id]
        : (localStorage.getItem(`agribuddy_username_${u.id}`) || u.username || (u.full_name ? u.full_name.toLowerCase().replace(/\s+/g, '_') : 'petani'));
      return {
        id: u.id,
        role: (u.role || 'PETANI_MANDIRI') as UserRole,
        name: u.full_name || u.name,
        username: userCustomUsername,
        badge: u.category_badge || u.role_label || 'Petani Mandiri',
        serviceCategory: u.commodity || 'Budidaya Pertanian',
        entityName: u.village || 'Desa Sukamaju',
        location: u.village || 'Desa Sukamaju',
        avatar: u.avatar || '👨‍🌾',
        specialties: [u.commodity || 'Padi Inpari 32', `${u.land_size_ha || 1} Ha`],
        customAvatar: userCustomAvatar
      };
    }
    const base = PERSONAS[activeRole.value] || PERSONAS['PETANI_MANDIRI'];
    const personaAvatar = userAvatars.value[base.id] !== undefined
      ? userAvatars.value[base.id]
      : (localStorage.getItem(`agribuddy_avatar_${base.id}`) || null);
    const personaUsername = userUsernames.value[base.id] !== undefined
      ? userUsernames.value[base.id]
      : (localStorage.getItem(`agribuddy_username_${base.id}`) || base.username);
    return {
      ...base,
      username: personaUsername,
      customAvatar: personaAvatar
    };
  });

  const currentUserId = computed(() => currentPersona.value.id);
  const customAvatar = computed(() => currentPersona.value.customAvatar);
  const customUsername = computed(() => currentPersona.value.username);
  
  const setCustomAvatar = (avatarDataUrl: string | null) => {
    const uid = currentUserId.value;
    userAvatars.value = {
      ...userAvatars.value,
      [uid]: avatarDataUrl
    };
    if (avatarDataUrl) {
      localStorage.setItem(`agribuddy_avatar_${uid}`, avatarDataUrl);
      if (registeredUser.value) {
        registeredUser.value = { ...registeredUser.value, avatar_url: avatarDataUrl };
        localStorage.setItem('agribuddy_registered_user', JSON.stringify(registeredUser.value));
      }
    } else {
      localStorage.removeItem(`agribuddy_avatar_${uid}`);
      if (registeredUser.value) {
        registeredUser.value = { ...registeredUser.value, avatar_url: undefined };
        localStorage.setItem('agribuddy_registered_user', JSON.stringify(registeredUser.value));
      }
    }
    window.dispatchEvent(new CustomEvent('agribuddy:avatar-updated', { detail: { userId: uid, avatar: avatarDataUrl } }));
  };

  const setCustomUsername = (username: string | null) => {
    const uid = currentUserId.value;
    const clean = username ? username.trim().replace(/^@/, '').toLowerCase() : null;
    userUsernames.value = {
      ...userUsernames.value,
      [uid]: clean
    };
    if (clean) {
      localStorage.setItem(`agribuddy_username_${uid}`, clean);
      if (registeredUser.value) {
        registeredUser.value = { ...registeredUser.value, username: clean };
        localStorage.setItem('agribuddy_registered_user', JSON.stringify(registeredUser.value));
      }
    } else {
      localStorage.removeItem(`agribuddy_username_${uid}`);
    }
  };

  const setRole = (role: UserRole) => {
    registeredUser.value = null;
    localStorage.removeItem('agribuddy_registered_user');
    activeRole.value = role;
    isAuthenticated.value = true;
    localStorage.setItem('agribuddy_active_role', role);
    localStorage.setItem('agribuddy_auth', 'true');
    syncUserProfile();
  };

  const loginWithPersona = (role: UserRole) => {
    registeredUser.value = null;
    localStorage.removeItem('agribuddy_registered_user');
    activeRole.value = role;
    isAuthenticated.value = true;
    localStorage.setItem('agribuddy_active_role', role);
    localStorage.setItem('agribuddy_auth', 'true');
    syncUserProfile();
  };

  const loginWithCustomUser = (userData: any) => {
    registeredUser.value = userData;
    activeRole.value = (userData.role || 'PETANI_MANDIRI') as UserRole;
    isAuthenticated.value = true;
    localStorage.setItem('agribuddy_registered_user', JSON.stringify(userData));
    localStorage.setItem('agribuddy_active_role', activeRole.value);
    localStorage.setItem('agribuddy_auth', 'true');
    if (userData.username) {
      userUsernames.value = { ...userUsernames.value, [userData.id]: userData.username };
      localStorage.setItem(`agribuddy_username_${userData.id}`, userData.username);
    }
    if (userData.avatar_url) {
      userAvatars.value = { ...userAvatars.value, [userData.id]: userData.avatar_url };
      localStorage.setItem(`agribuddy_avatar_${userData.id}`, userData.avatar_url);
    }
    // Jika akun memiliki gemini_api_key dari PostgreSQL server, otomatis sinkronkan ke perangkat ini
    if (userData.gemini_api_key) {
      localStorage.setItem(`agribuddy_gemini_key_${userData.id}`, userData.gemini_api_key);
    }
  };

  const loginWithCredentials = (phoneNumber: string, pin: string) => {
    const p = phoneNumber.toLowerCase();
    if (p.includes('traktor') || p.includes('bambang') || p.includes('9876')) {
      activeRole.value = 'JASA_TRAKTOR';
    } else if (p.includes('pengairan') || p.includes('slamet') || p.includes('8811')) {
      activeRole.value = 'JASA_PENGAIRAN';
    } else if (p.includes('cangkul') || p.includes('udin') || p.includes('3344')) {
      activeRole.value = 'JASA_CANGKUL';
    } else if (p.includes('ratna') || p.includes('571') || p.includes('kios')) {
      activeRole.value = 'KIOS_SAPROTAN';
    } else if (p.includes('hendra') || p.includes('135') || p.includes('gilingan')) {
      activeRole.value = 'PENGGILINGAN_PADI';
    } else {
      activeRole.value = 'PETANI_MANDIRI';
    }
    registeredUser.value = null;
    localStorage.removeItem('agribuddy_registered_user');
    isAuthenticated.value = true;
    localStorage.setItem('agribuddy_active_role', activeRole.value);
    localStorage.setItem('agribuddy_auth', 'true');
    syncUserProfile();
    return true;
  };

  const logout = () => {
    isAuthenticated.value = false;
    registeredUser.value = null;
    localStorage.setItem('agribuddy_auth', 'false');
    localStorage.removeItem('agribuddy_registered_user');
    localStorage.removeItem('agribuddy_custom_gemini_api_key');
  };

  return {
    activeRole,
    registeredUser,
    isAuthenticated,
    currentPersona,
    currentUserId,
    customAvatar,
    setCustomAvatar,
    customUsername,
    setCustomUsername,
    setRole,
    loginWithPersona,
    loginWithCustomUser,
    loginWithCredentials,
    logout,
    PERSONAS
  };
};
