import { createRouter, createWebHistory } from 'vue-router'
import JejaringView from '@/views/JejaringView.vue'
import MonitoringView from '@/views/MonitoringView.vue'
import KatalogView from '@/views/KatalogView.vue'
import ProfilView from '@/views/ProfilView.vue'
import LoginView from '@/views/LoginView.vue'
import DokterTaniView from '@/views/DokterTaniView.vue'
import RencanaTaniView from '@/views/RencanaTaniView.vue'
import BukuTaniView from '@/views/BukuTaniView.vue'
import LumbungView from '@/views/LumbungView.vue'
import PesananView from '@/views/PesananView.vue'

const routes = [
  { path: '/login', name: 'Login', component: LoginView },
  // 1. Menu Utama: Jejaring (Aktivitas Orang Lain)
  { path: '/', name: 'Jejaring', component: JejaringView },
  { path: '/jejaring', redirect: '/' },

  // 2. Menu Kedua: Monitoring (Pantau Sawah & AI)
  { path: '/monitoring', name: 'Monitoring', component: MonitoringView },

  // 3. Menu Ketiga: Katalog (Marketplace Layanan & Produk)
  { path: '/katalog', name: 'Katalog', component: KatalogView },

  // 4. Menu Keempat: Pesanan & Transaksi (Monitoring Pesanan Khusus)
  { path: '/pesanan', name: 'Pesanan', component: PesananView },
  { path: '/transaksi', redirect: '/pesanan' },

  // 5. Menu Kelima: Profil (Saya & Kelola Layanan)
  { path: '/profil', name: 'Profil', component: ProfilView },

  // Direct shortcuts & compatibility
  { path: '/dokter', name: 'DokterTani', component: DokterTaniView },
  { path: '/rencana', name: 'RencanaTani', component: RencanaTaniView },
  { path: '/inventaris', name: 'BukuTani', component: BukuTaniView },
  { path: '/lumbung', name: 'Lumbung', component: LumbungView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
