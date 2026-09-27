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
// Default auth: false jika pernah logout ('false'), true jika baru pertama kali atau sudah login
const initialAuth = savedAuth === 'false' ? false : true;

const savedUserJson = localStorage.getItem('agribuddy_registered_user');
let initialRegisteredUser: any = null;
try {
  initialRegisteredUser = savedUserJson ? JSON.parse(savedUserJson) : null;
} catch {
  initialRegisteredUser = null;
}

const activeRole = ref<UserRole>(savedRole);
const registeredUser = ref<any>(initialRegisteredUser);
const isAuthenticated = ref<boolean>(initialAuth);
const customAvatar = ref<string | null>(localStorage.getItem('agribuddy_custom_avatar'));
const customUsername = ref<string | null>(localStorage.getItem('agribuddy_custom_username'));

export const getActiveUserId = (): string => {
  if (registeredUser.value && registeredUser.value.id) {
    return registeredUser.value.id;
  }
  return PERSONAS[activeRole.value]?.id || 'usr_petani';
};

export const useUserState = () => {
  const currentPersona = computed(() => {
    if (registeredUser.value) {
      return {
        id: registeredUser.value.id,
        role: (registeredUser.value.role || 'PETANI_MANDIRI') as UserRole,
        name: registeredUser.value.full_name || registeredUser.value.name,
        username: customUsername.value || registeredUser.value.username || 'user',
        badge: registeredUser.value.category_badge || registeredUser.value.role_label || 'Petani Mandiri',
        serviceCategory: registeredUser.value.commodity || 'Budidaya Pertanian',
        entityName: registeredUser.value.village || 'Desa Sukamaju',
        location: registeredUser.value.village || 'Desa Sukamaju',
        avatar: registeredUser.value.avatar || '👨‍🌾',
        specialties: [registeredUser.value.commodity || 'Padi Inpari 32', `${registeredUser.value.land_size_ha || 1} Ha`],
        customAvatar: customAvatar.value || registeredUser.value.avatar_url
      };
    }
    const base = PERSONAS[activeRole.value] || PERSONAS['PETANI_MANDIRI'];
    return {
      ...base,
      username: customUsername.value || base.username || 'pak_joko',
      customAvatar: customAvatar.value
    };
  });
  const currentUserId = computed(() => currentPersona.value.id);
  
  const setCustomAvatar = (avatarDataUrl: string | null) => {
    customAvatar.value = avatarDataUrl;
    if (avatarDataUrl) {
      localStorage.setItem('agribuddy_custom_avatar', avatarDataUrl);
    } else {
      localStorage.removeItem('agribuddy_custom_avatar');
    }
  };

  const setCustomUsername = (username: string | null) => {
    customUsername.value = username;
    if (username) {
      localStorage.setItem('agribuddy_custom_username', username);
    } else {
      localStorage.removeItem('agribuddy_custom_username');
    }
  };

  const setRole = (role: UserRole) => {
    activeRole.value = role;
    isAuthenticated.value = true;
    localStorage.setItem('agribuddy_active_role', role);
    localStorage.setItem('agribuddy_auth', 'true');
  };

  const loginWithPersona = (role: UserRole) => {
    registeredUser.value = null;
    localStorage.removeItem('agribuddy_registered_user');
    activeRole.value = role;
    isAuthenticated.value = true;
    localStorage.setItem('agribuddy_active_role', role);
    localStorage.setItem('agribuddy_auth', 'true');
  };

  const loginWithCustomUser = (userData: any) => {
    registeredUser.value = userData;
    activeRole.value = (userData.role || 'PETANI_MANDIRI') as UserRole;
    isAuthenticated.value = true;
    localStorage.setItem('agribuddy_registered_user', JSON.stringify(userData));
    localStorage.setItem('agribuddy_active_role', activeRole.value);
    localStorage.setItem('agribuddy_auth', 'true');
    if (userData.username) {
      setCustomUsername(userData.username);
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
