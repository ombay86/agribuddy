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

const activeRole = ref<UserRole>(savedRole);
const isAuthenticated = ref<boolean>(initialAuth);

export const getActiveUserId = (): string => {
  return PERSONAS[activeRole.value]?.id || 'usr_petani';
};

export const useUserState = () => {
  const currentPersona = computed(() => PERSONAS[activeRole.value] || PERSONAS['PETANI_MANDIRI']);
  const currentUserId = computed(() => currentPersona.value.id);
  
  const setRole = (role: UserRole) => {
    activeRole.value = role;
    isAuthenticated.value = true;
    localStorage.setItem('agribuddy_active_role', role);
    localStorage.setItem('agribuddy_auth', 'true');
  };

  const loginWithPersona = (role: UserRole) => {
    activeRole.value = role;
    isAuthenticated.value = true;
    localStorage.setItem('agribuddy_active_role', role);
    localStorage.setItem('agribuddy_auth', 'true');
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
    isAuthenticated.value = true;
    localStorage.setItem('agribuddy_active_role', activeRole.value);
    localStorage.setItem('agribuddy_auth', 'true');
    return true;
  };

  const logout = () => {
    isAuthenticated.value = false;
    localStorage.setItem('agribuddy_auth', 'false');
  };

  return {
    activeRole,
    isAuthenticated,
    currentPersona,
    currentUserId,
    setRole,
    loginWithPersona,
    loginWithCredentials,
    logout,
    PERSONAS
  };
};
