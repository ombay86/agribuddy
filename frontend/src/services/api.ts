import { getActiveUserId } from './userState';

const BASE_URL = 'http://127.0.0.1:8000/api/v1';

function getAuthHeaders(extra: Record<string, string> = {}): HeadersInit {
  return {
    'X-User-Id': getActiveUserId(),
    ...extra
  };
}

export interface UserProfile {
  id: string;
  phone_number: string;
  full_name: string;
  village: string;
  commodity: string;
  land_size_ha: number;
  whatsapp_number: string;
  bio: string;
}

export interface WeatherData {
  location: string;
  temp_celsius: number;
  humidity_percent: number;
  weather_condition: string;
  rain_probability_percent: number;
  irrigation_needed: boolean;
  status_color: 'green' | 'yellow' | 'red';
  advice_title: string;
  advice_detail: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'PUPUK' | 'BIBIT' | 'OBAT';
  quantity: number;
  unit: string;
  min_threshold: number;
  notes?: string;
  is_low_stock?: boolean;
}

export interface HarvestItem {
  id: string;
  commodity: string;
  total_weight_kg: number;
  harvest_date: string;
  status: string;
  notes?: string;
}

export interface MarketPrice {
  commodity: string;
  price_per_kg: number;
  trend: 'up' | 'down' | 'stable';
  change_percent: string;
  note: string;
}

export interface DiagnosisResult {
  disease_name: string;
  english_name: string;
  confidence: number;
  severity: string;
  symptoms: string[];
  actions: string[];
  detected_at: string;
}

export interface Partner {
  id: string;
  name: string;
  category: 'KOPERASI' | 'DISTRIBUTOR_PUPUK' | 'PENGGILINGAN_PASAR';
  category_label: string;
  pic_name: string;
  phone_whatsapp: string;
  location: string;
  description: string;
  is_verified: boolean;
  accepted_commodities: string[];
  buying_price_hint?: string;
  is_connected: boolean;
}

export interface HarvestOffer {
  id: string;
  partner_name: string;
  commodity: string;
  weight_kg: number;
  offered_price_per_kg?: number;
  status: string;
  created_at: string;
  whatsapp_url: string;
}

// --- ALL-IN-ONE SOCIAL & DIRECT TRADE INTERFACES ---
export interface ShopProduct {
  id: string;
  seller_name: string;
  seller_role: string;
  name: string;
  category: 'PUPUK' | 'BIBIT' | 'OBAT';
  price: number;
  unit: string;
  stock_available: number;
  is_subsidi: boolean;
  description: string;
  image_emoji: string;
}

export interface SaprotanOrder {
  id: string;
  product_id: string;
  product_name: string;
  product_type: string;
  quantity: number;
  unit: string;
  total_price: number;
  buyer_name: string;
  seller_name: string;
  payment_method: string;
  status: 'DIPESAN' | 'DIKONFIRMASI' | 'DIKIRIM' | 'SELESAI' | 'DIBATALKAN';
  delivery_note: string;
  created_at: string;
}

export interface MarketBid {
  id: string;
  bidder_name: string;
  bidder_role: string;
  bid_price_per_kg: number;
  bid_weight_kg: number;
  notes: string;
  status: 'MENUNGGU' | 'DISETUJUI' | 'DITOLAK';
  created_at: string;
}

export interface MarketListing {
  id: string;
  seller_name: string;
  commodity: string;
  total_weight_kg: number;
  starting_price_per_kg: number;
  min_order_kg: number;
  location: string;
  status: 'DIBUKA' | 'TERJUAL' | 'DITUTUP';
  notes: string;
  created_at: string;
  bids: MarketBid[];
  accepted_bid?: MarketBid;
}

export interface CommunityComment {
  id: string;
  author_name: string;
  author_role: string;
  comment: string;
  created_at: string;
}

export interface CommunityPost {
  id: string;
  author_name: string;
  author_role: string;
  author_role_label: string;
  title: string;
  content: string;
  category: 'TANYA_HAMA' | 'INFO_POKTAN' | 'TIPS_TANI' | 'BERITA_HARGA';
  category_label: string;
  created_at: string;
  likes_count: number;
  comments: CommunityComment[];
}

export interface PublicUserProfile {
  id: string;
  name: string;
  role_label: string;
  category_badge?: string;
  service_specialties?: string[];
  avatar: string;
  village: string;
  commodity: string;
  land_size_ha?: number;
  whatsapp_number: string;
  bio: string;
  followers_count: number;
  following_count: number;
  is_followed: boolean;
  posts_count: number;
}

// --- RENCANA TANI AI & KALKULATOR MODAL SCHEMAS ---
export interface BudgetItem {
  id: string;
  phase: string;
  name: string;
  category: string;
  recommended_provider: string;
  quantity: number;
  unit: string;
  unit_price: number;
  total_price: number;
  notes: string;
}

export interface TimelinePhase {
  step_no: number;
  name: string;
  day_range: string;
  duration_days: number;
  status: 'BELUM' | 'SEDANG_BERJALAN' | 'SELESAI';
  allocated_budget: number;
  actual_cost: number;
  tasks: string[];
  ai_tips: string;
}

export interface FinancialSummary {
  total_budget: number;
  hpp_per_kg: number;
  projected_yield_kg: number;
  projected_selling_price_per_kg: number;
  projected_revenue: number;
  projected_net_profit: number;
  roi_percentage: number;
}

export interface EcosystemRecommendation {
  role_category: string;
  partner_name: string;
  action_text: string;
  phone: string;
}

export interface FarmPlan {
  plan_id: string;
  user_id: string;
  land_size_ha: number;
  commodity: string;
  soil_type: string;
  water_source: string;
  location: string;
  latitude?: number;
  longitude?: number;
  coordinates_label?: string;
  weather_condition: {
    temp_celsius: number;
    rain_probability: number;
    season: string;
    note: string;
  };
  financial_summary: FinancialSummary;
  budget_items: BudgetItem[];
  timeline_phases: TimelinePhase[];
  ecosystem_recommendations: EcosystemRecommendation[];
}

export interface EcosystemServiceItem {
  id: string;
  provider_id: string;
  provider_name: string;
  provider_badge: string;
  provider_avatar: string;
  image_url?: string;
  rating?: number;
  completed_orders_count?: number;
  promo_tag?: string;
  title: string;
  category: string;
  category_label: string;
  price: number;
  price_unit: string;
  location: string;
  phone: string;
  description: string;
  tags: string[];
  is_available: boolean;
  created_at?: string;
}

// --- MULTI-FARMLAND, KOLABORATOR & BUKU MODAL SCHEMAS ---
export interface Collaborator {
  id: string;
  name: string;
  role: string;
  share_percentage: number;
  phone?: string;
}

export interface CapitalExpense {
  id: string;
  farm_id: string;
  item_name: string;
  amount: number;
  category: string;
  source: 'MARKETPLACE' | 'MANUAL';
  order_ref_id?: string;
  date: string;
}

export interface Farmland {
  id: string;
  user_id: string;
  name: string;
  land_size_ha: number;
  commodity: string;
  soil_type: string;
  water_source: string;
  location: string;
  latitude: number;
  longitude: number;
  collaborators: Collaborator[];
  capital_expenses: CapitalExpense[];
  created_at?: string;
}

export interface ServiceCheckoutRequest {
  service_id: string;
  buyer_id: string;
  buyer_name: string;
  quantity: number;
  unit: string;
  payment_method: string;
  delivery_notes?: string;
}

export interface ServiceOrder {
  id: string;
  service_id: string;
  service_title: string;
  seller_id: string;
  seller_name: string;
  buyer_id: string;
  buyer_name: string;
  quantity: number;
  unit: string;
  unit_price: number;
  total_price: number;
  payment_method: string;
  delivery_notes?: string;
  status: 'MENUNGGU_KONFIRMASI' | 'DIPROSES' | 'SEDANG_DIKIRIM' | 'SELESAI' | 'STOK_HABIS' | 'DIBATALKAN';
  seller_notes?: string;
  created_at: string;
  status_updated_at?: string;
}

export interface InAppNotification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'ORDER_RECEIVED' | 'NEW_FOLLOWER' | 'NEW_COMMENT' | 'ORDER_STATUS' | 'ORDER_DISCUSSION' | 'PRODUCT_DISCUSSION' | 'SYSTEM';
  reference_id?: string;
  is_read: boolean;
  created_at: string;
}

export interface OrderMessage {
  id: string;
  order_id: string;
  sender_id: string;
  sender_name: string;
  sender_role: 'PEMBELI' | 'PENJUAL';
  message: string;
  created_at: string;
}

export interface ProductDiscussion {
  id: string;
  service_id: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  question: string;
  reply?: string;
  replied_by?: string;
  replied_at?: string;
  created_at: string;
}



export const api = {

  // Profil Petani Publik & Follow
  async getPublicProfile(authorName: string): Promise<PublicUserProfile> {
    const res = await fetch(`${BASE_URL}/auth/users/${encodeURIComponent(authorName)}`);
    if (!res.ok) throw new Error('Gagal memuat profil pengguna');
    return res.json();
  },

  async toggleFollowUser(authorName: string): Promise<{ is_followed: boolean; followers_count: number; message: string }> {
    const res = await fetch(`${BASE_URL}/auth/users/${encodeURIComponent(authorName)}/toggle-follow`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Gagal mengubah status mengikuti');
    return res.json();
  },
  // Profil Petani
  async getProfile(): Promise<UserProfile> {
    const res = await fetch(`${BASE_URL}/auth/profile`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Gagal memuat profil');
    return res.json();
  },

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    const res = await fetch(`${BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Gagal memperbarui profil');
    return res.json();
  },

  // Cuaca & Rekomendasi
  async getWeather(lat?: number, lon?: number, village?: string): Promise<WeatherData> {
    const params = new URLSearchParams();
    if (lat !== undefined) params.append('lat', lat.toString());
    if (lon !== undefined) params.append('lon', lon.toString());
    if (village) params.append('village', village);
    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${BASE_URL}/weather/current${query}`);
    if (!res.ok) throw new Error('Gagal memuat data cuaca');
    return res.json();
  },


  // Inventaris Saprotan
  async getInventory(): Promise<InventoryItem[]> {
    const res = await fetch(`${BASE_URL}/inventory`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Gagal memuat stok');
    return res.json();
  },

  async quickAdjustInventory(itemId: string, delta: number): Promise<InventoryItem> {
    const res = await fetch(`${BASE_URL}/inventory/${itemId}/quick-adjust`, {
      method: 'PATCH',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ delta }),
    });
    if (!res.ok) throw new Error('Gagal memperbarui stok');
    return res.json();
  },

  async addInventory(item: Partial<InventoryItem>): Promise<InventoryItem> {
    const res = await fetch(`${BASE_URL}/inventory`, {
      method: 'POST',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Gagal menambah item');
    return res.json();
  },

  async deleteInventory(itemId: string): Promise<void> {
    await fetch(`${BASE_URL}/inventory/${itemId}`, { 
      method: 'DELETE',
      headers: getAuthHeaders()
    });
  },

  // Lumbung Panen
  async getHarvests(): Promise<HarvestItem[]> {
    const res = await fetch(`${BASE_URL}/harvest`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Gagal memuat lumbung');
    return res.json();
  },

  async addHarvest(data: Partial<HarvestItem>): Promise<HarvestItem> {
    const res = await fetch(`${BASE_URL}/harvest`, {
      method: 'POST',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Gagal mencatat panen');
    return res.json();
  },

  async getMarketPrices(): Promise<MarketPrice[]> {
    const res = await fetch(`${BASE_URL}/harvest/market-prices`);
    if (!res.ok) throw new Error('Gagal memuat harga pasar');
    return res.json();
  },

  // Dokter Tani AI
  async getSampleDiagnoses(): Promise<{ key: string; title: string; hint: string }[]> {
    const res = await fetch(`${BASE_URL}/ai/samples`);
    if (!res.ok) throw new Error('Gagal memuat sampel');
    return res.json();
  },

  async diagnoseLeaf(file?: File, sampleKey?: string): Promise<DiagnosisResult> {
    const formData = new FormData();
    if (file) formData.append('file', file);
    if (sampleKey) formData.append('sample_key', sampleKey);

    const res = await fetch(`${BASE_URL}/ai/diagnose`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Gagal memproses diagnosis');
    return res.json();
  },

  // Mitra & Kontak WA
  async getPartners(category?: string): Promise<Partner[]> {
    const url = category && category !== 'SEMUA' 
      ? `${BASE_URL}/network/partners?category=${category}` 
      : `${BASE_URL}/network/partners`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Gagal memuat daftar mitra');
    return res.json();
  },

  async toggleConnectPartner(partnerId: string): Promise<{ is_connected: boolean; message: string }> {
    const res = await fetch(`${BASE_URL}/network/connect/${partnerId}`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Gagal mengubah status kemitraan');
    return res.json();
  },

  async offerHarvest(payload: {
    partner_id: string;
    commodity: string;
    weight_kg: number;
    offered_price_per_kg?: number;
    notes?: string;
  }): Promise<HarvestOffer> {
    const res = await fetch(`${BASE_URL}/network/offer-harvest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Gagal mengirim penawaran panen');
    return res.json();
  },

  async getMyOffers(): Promise<HarvestOffer[]> {
    const res = await fetch(`${BASE_URL}/network/offers`);
    if (!res.ok) throw new Error('Gagal memuat riwayat penawaran');
    return res.json();
  },

  // --- KIOS SAPROTAN (IN-APP ORDERS) ---
  async getShopProducts(category?: string): Promise<ShopProduct[]> {
    const url = category && category !== 'SEMUA'
      ? `${BASE_URL}/social-market/products?category=${category}`
      : `${BASE_URL}/social-market/products`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Gagal memuat produk kios');
    return res.json();
  },

  async createSaprotanOrder(payload: {
    product_id: string;
    quantity: number;
    buyer_name: string;
    payment_method: string;
    delivery_note?: string;
  }): Promise<SaprotanOrder> {
    const res = await fetch(`${BASE_URL}/social-market/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Gagal membuat pesanan saprotan');
    return res.json();
  },

  async getSaprotanOrders(): Promise<SaprotanOrder[]> {
    const res = await fetch(`${BASE_URL}/social-market/orders`);
    if (!res.ok) throw new Error('Gagal memuat pesanan saprotan');
    return res.json();
  },

  async updateOrderStatus(orderId: string, status: string): Promise<{ order: SaprotanOrder; message: string }> {
    const res = await fetch(`${BASE_URL}/social-market/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Gagal memperbarui status pesanan');
    return res.json();
  },

  // --- BURSA PASAR PANEN (HARVEST MARKETPLACE & BIDDING) ---
  async getMarketListings(): Promise<MarketListing[]> {
    const res = await fetch(`${BASE_URL}/social-market/listings`);
    if (!res.ok) throw new Error('Gagal memuat bursa panen');
    return res.json();
  },

  async createMarketListing(payload: {
    seller_name: string;
    commodity: string;
    total_weight_kg: number;
    starting_price_per_kg: number;
    min_order_kg?: number;
    location?: string;
    notes?: string;
  }): Promise<MarketListing> {
    const res = await fetch(`${BASE_URL}/social-market/listings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Gagal mendaftarkan panen ke bursa');
    return res.json();
  },

  async submitMarketBid(listingId: string, payload: {
    bidder_name: string;
    bidder_role: string;
    bid_price_per_kg: number;
    bid_weight_kg: number;
    notes?: string;
  }): Promise<MarketBid> {
    const res = await fetch(`${BASE_URL}/social-market/listings/${listingId}/bids`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Gagal mengajukan penawaran lelang');
    return res.json();
  },

  async acceptMarketBid(listingId: string, bidId: string): Promise<{ message: string; accepted_bid: MarketBid }> {
    const res = await fetch(`${BASE_URL}/social-market/listings/${listingId}/accept-bid/${bidId}`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Gagal menyetujui penawaran');
    return res.json();
  },

  // --- FEED SOSIAL KOMUNITAS TANI ---
  async getCommunityPosts(): Promise<CommunityPost[]> {
    const res = await fetch(`${BASE_URL}/social-market/posts`);
    if (!res.ok) throw new Error('Gagal memuat feed komunitas');
    return res.json();
  },

  async createCommunityPost(payload: {
    author_name: string;
    author_role: string;
    title: string;
    content: string;
    category: string;
  }): Promise<CommunityPost> {
    const res = await fetch(`${BASE_URL}/social-market/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Gagal membuat postingan komunitas');
    return res.json();
  },

  async likeCommunityPost(postId: string): Promise<{ likes_count: number }> {
    const res = await fetch(`${BASE_URL}/social-market/posts/${postId}/like`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Gagal menyukai postingan');
    return res.json();
  },

  async addCommunityComment(postId: string, payload: {
    author_name: string;
    author_role: string;
    comment: string;
  }): Promise<CommunityComment> {
    const res = await fetch(`${BASE_URL}/social-market/posts/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Gagal menambah komentar');
    return res.json();
  },

  // --- RENCANA TANI AI & KALKULATOR MODAL ---
  async getActiveFarmPlan(): Promise<FarmPlan> {
    const res = await fetch(`${BASE_URL}/farm-plan/active`);
    if (!res.ok) throw new Error('Gagal memuat rencana tani aktif');
    return res.json();
  },

  async calculateFarmPlan(payload: {
    land_size_ha: number;
    commodity?: string;
    soil_type?: string;
    water_source?: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    coordinates_label?: string;
  }): Promise<FarmPlan> {
    const res = await fetch(`${BASE_URL}/farm-plan/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Gagal mengalkulasi rencana tani');
    }
    return res.json();
  },

  async updateFarmPlanStep(planId: string, payload: {
    step_no: number;
    status: string;
    actual_cost?: number;
  }): Promise<FarmPlan> {
    const res = await fetch(`${BASE_URL}/farm-plan/${planId}/step`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Gagal memperbarui tahapan rencana tani');
    return res.json();
  },

  // --- KATALOG & MARKETPLACE LAYANAN ---
  async getCatalogServices(category?: string, search?: string): Promise<EcosystemServiceItem[]> {
    const params = new URLSearchParams();
    if (category && category !== 'SEMUA') params.append('category', category);
    if (search) params.append('search', search);
    const q = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${BASE_URL}/catalog/services${q}`);
    if (!res.ok) throw new Error('Gagal memuat katalog layanan');
    return res.json();
  },

  async getMyServices(): Promise<EcosystemServiceItem[]> {
    const res = await fetch(`${BASE_URL}/catalog/my-services`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Gagal memuat layanan saya');
    return res.json();
  },

  async createService(payload: {
    title: string;
    category: string;
    price: number;
    price_unit: string;
    location: string;
    description: string;
    image_url?: string;
    promo_tag?: string;
    tags?: string[];
    phone?: string;
    is_available?: boolean;
  }): Promise<EcosystemServiceItem> {
    const res = await fetch(`${BASE_URL}/catalog/services`, {
      method: 'POST',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Gagal menambahkan layanan baru');
    return res.json();
  },

  async updateService(serviceId: string, payload: Partial<EcosystemServiceItem>): Promise<EcosystemServiceItem> {
    const res = await fetch(`${BASE_URL}/catalog/services/${serviceId}`, {
      method: 'PUT',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Gagal memperbarui layanan');
    return res.json();
  },

  async deleteService(serviceId: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/catalog/services/${serviceId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Gagal menghapus layanan');
  },

  // --- MULTI-FARMLAND & KOLABORATOR & BUKU MODAL ---
  async getFarmlands(userId?: string): Promise<Farmland[]> {
    const params = new URLSearchParams();
    if (userId) params.append('user_id', userId);
    const res = await fetch(`${BASE_URL}/farmlands?${params.toString()}`);
    if (!res.ok) throw new Error('Gagal memuat daftar lahan sawah');
    return res.json();
  },

  async getFarmlandDetail(farmId: string): Promise<Farmland> {
    const res = await fetch(`${BASE_URL}/farmlands/${farmId}`);
    if (!res.ok) throw new Error('Gagal memuat detail lahan sawah');
    return res.json();
  },

  async createFarmland(data: Partial<Farmland>, userId: string = 'usr_petani'): Promise<Farmland> {
    const res = await fetch(`${BASE_URL}/farmlands?user_id=${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Gagal menambahkan lahan sawah baru');
    return res.json();
  },

  async updateFarmland(farmId: string, data: Partial<Farmland>): Promise<Farmland> {
    const res = await fetch(`${BASE_URL}/farmlands/${farmId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Gagal memperbarui data lahan sawah');
    return res.json();
  },

  async deleteFarmland(farmId: string): Promise<any> {
    const res = await fetch(`${BASE_URL}/farmlands/${farmId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Gagal menghapus lahan sawah');
    return res.json();
  },

  async addCollaborator(farmId: string, collaborator: Collaborator): Promise<Farmland> {
    const res = await fetch(`${BASE_URL}/farmlands/${farmId}/collaborators`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(collaborator),
    });
    if (!res.ok) throw new Error('Gagal menambahkan kolaborator');
    return res.json();
  },

  async removeCollaborator(farmId: string, collaboratorId: string): Promise<Farmland> {
    const res = await fetch(`${BASE_URL}/farmlands/${farmId}/collaborators/${collaboratorId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Gagal menghapus kolaborator');
    return res.json();
  },

  async recordFarmExpense(farmId: string, payload: {
    item_name: string;
    amount: number;
    category: string;
    source?: string;
    order_ref_id?: string;
  }): Promise<any> {
    const res = await fetch(`${BASE_URL}/farmlands/${farmId}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Gagal mencatat pengeluaran ke buku modal lahan');
    return res.json();
  },

  async getFarmExpenses(farmId: string): Promise<CapitalExpense[]> {
    const res = await fetch(`${BASE_URL}/farmlands/${farmId}/expenses`);
    if (!res.ok) throw new Error('Gagal memuat buku modal lahan');
    return res.json();
  },

  // --- MARKETPLACE IN-APP CHECKOUT & NOTIFIKASI SELLER ---
  async checkoutCatalogService(payload: ServiceCheckoutRequest): Promise<any> {
    const res = await fetch(`${BASE_URL}/catalog/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Gagal melakukan checkout pesanan');
    }
    return res.json();
  },

  async getUserNotifications(userId: string = 'usr_petani'): Promise<InAppNotification[]> {
    const res = await fetch(`${BASE_URL}/catalog/notifications?user_id=${userId}`);
    if (!res.ok) throw new Error('Gagal memuat notifikasi');
    return res.json();
  },

  async markNotificationRead(notifId: string): Promise<any> {
    const res = await fetch(`${BASE_URL}/catalog/notifications/${notifId}/read`, {
      method: 'PATCH',
    });
    if (!res.ok) throw new Error('Gagal menandai notifikasi dibaca');
    return res.json();
  },

  async markAllNotificationsRead(userId: string = 'usr_petani'): Promise<any> {
    const res = await fetch(`${BASE_URL}/catalog/notifications/mark-all-read?user_id=${userId}`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Gagal menandai semua notifikasi dibaca');
    return res.json();
  },

  // --- SELLER ORDER MANAGEMENT & BUYER TRACKING ---
  async getSellerOrders(sellerId: string): Promise<ServiceOrder[]> {
    const res = await fetch(`${BASE_URL}/catalog/orders/seller?seller_id=${encodeURIComponent(sellerId)}`);
    if (!res.ok) throw new Error('Gagal memuat daftar pesanan masuk penjual');
    return res.json();
  },

  async getBuyerOrders(buyerId: string): Promise<ServiceOrder[]> {
    const res = await fetch(`${BASE_URL}/catalog/orders/buyer?buyer_id=${encodeURIComponent(buyerId)}`);
    if (!res.ok) throw new Error('Gagal memuat riwayat pesanan saya');
    return res.json();
  },

  async updateServiceOrderStatus(orderId: string, status: string, sellerNotes?: string): Promise<any> {
    const res = await fetch(`${BASE_URL}/catalog/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, seller_notes: sellerNotes || '' }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Gagal memperbarui status pesanan');
    }
    return res.json();
  },

  // --- DISKUSI PESANAN / TRANSAKSI & PRODUK KATALOG ---
  async getOrderMessages(orderId: string): Promise<OrderMessage[]> {
    const res = await fetch(`${BASE_URL}/catalog/orders/${orderId}/messages`);
    if (!res.ok) throw new Error('Gagal memuat pesan diskusi pesanan');
    return res.json();
  },

  async sendOrderMessage(orderId: string, payload: { sender_id: string; sender_name: string; message: string }): Promise<OrderMessage> {
    const res = await fetch(`${BASE_URL}/catalog/orders/${orderId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Gagal mengirim pesan diskusi pesanan');
    return res.json();
  },

  async getProductDiscussions(serviceId: string): Promise<ProductDiscussion[]> {
    const res = await fetch(`${BASE_URL}/catalog/services/${serviceId}/discussions`);
    if (!res.ok) throw new Error('Gagal memuat diskusi produk');
    return res.json();
  },

  async createProductDiscussion(serviceId: string, payload: { user_id: string; user_name: string; user_avatar?: string; question: string }): Promise<ProductDiscussion> {
    const res = await fetch(`${BASE_URL}/catalog/services/${serviceId}/discussions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Gagal mengirim pertanyaan produk');
    return res.json();
  },

  async replyProductDiscussion(serviceId: string, discussionId: string, payload: { reply: string; replied_by: string }): Promise<ProductDiscussion> {
    const res = await fetch(`${BASE_URL}/catalog/services/${serviceId}/discussions/${discussionId}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Gagal membalas pertanyaan produk');
    return res.json();
  }
};


