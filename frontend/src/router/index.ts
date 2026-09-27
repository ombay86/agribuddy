import { createRouter, createWebHistory } from 'vue-router'
import MonitoringView from '@/views/MonitoringView.vue'
import RencanaTaniView from '@/views/RencanaTaniView.vue'
import DokterTaniView from '@/views/DokterTaniView.vue'
import BukuTaniView from '@/views/BukuTaniView.vue'
import KatalogView from '@/views/KatalogView.vue'
import ProfilView from '@/views/ProfilView.vue'
import LoginView from '@/views/LoginView.vue'
import { useUserState } from '@/services/userState'

const routes = [
  { path: '/login', name: 'Login', component: LoginView },

  // 1. Menu Utama: Monitoring Sawah & Cuaca (Beranda Utama)
  { path: '/', name: 'Monitoring', component: MonitoringView },
  { path: '/monitoring', redirect: '/' },

  // 2. Rencana Tani AI (Smart Farm Planner & Biaya Modal)
  { path: '/rencana', name: 'RencanaTani', component: RencanaTaniView },

  // 3. AgriAI (Asisten Cerdas & Fitopatologi via Gemini)
  { path: '/dokter', name: 'AgriAI', component: DokterTaniView },

  // 4. Buku Tani (Inventaris Saprotan & Lumbung Panen)
  { path: '/buku-tani', name: 'BukuTani', component: BukuTaniView },
  { path: '/inventaris', redirect: '/buku-tani' },
  { path: '/lumbung', redirect: '/buku-tani' },

  // 5. Direktori Layanan & Mitra Ekosistem (Kontak Langsung via WhatsApp)
  { path: '/layanan', name: 'Layanan', component: KatalogView },
  { path: '/katalog', redirect: '/layanan' },

  // 6. Profil Petani Mandiri
  { path: '/profil', name: 'Profil', component: ProfilView },

  // Redirect legacy paths
  { path: '/jejaring', redirect: '/' },
  { path: '/pesanan', redirect: '/layanan' },
  { path: '/transaksi', redirect: '/layanan' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useUserState();
  if (to.path !== '/login' && !isAuthenticated.value) {
    next('/login');
  } else if (to.path === '/login' && isAuthenticated.value) {
    next('/');
  } else {
    next();
  }
});

export default router
