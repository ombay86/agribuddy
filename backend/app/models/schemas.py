from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

# Auth & Profile Schemas
class UserLogin(BaseModel):
    phone_number: str
    pin: str

class UserProfile(BaseModel):
    id: str
    phone_number: str
    full_name: str
    village: str
    commodity: str
    land_size_ha: Optional[float] = 1.2
    whatsapp_number: Optional[str] = "08123456789"
    bio: Optional[str] = "Petani Padi Binaan Kelompok Tani Makmur"

class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    village: Optional[str] = None
    commodity: Optional[str] = None
    land_size_ha: Optional[float] = None
    whatsapp_number: Optional[str] = None
    bio: Optional[str] = None

class PublicUserProfile(BaseModel):
    id: str
    name: str
    role_label: str
    category_badge: Optional[str] = "Warga Ekosistem"
    service_specialties: Optional[List[str]] = []
    avatar: str
    village: str
    commodity: str
    land_size_ha: Optional[float] = 1.0
    whatsapp_number: str
    bio: str
    followers_count: int
    following_count: int
    is_followed: bool = False
    posts_count: int = 0



# Inventory Schemas
class InventoryItemCreate(BaseModel):
    name: str
    type: str = "PUPUK" # "PUPUK" | "BIBIT" | "OBAT"
    quantity: float
    unit: str = "Karung"
    min_threshold: float = 2.0
    notes: Optional[str] = ""

class InventoryItemUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    quantity: Optional[float] = None
    unit: Optional[str] = None
    min_threshold: Optional[float] = None
    notes: Optional[str] = None

class InventoryQuickAdjust(BaseModel):
    delta: float # e.g. +1 or -1

# Harvest Schemas
class HarvestCreate(BaseModel):
    commodity: str
    total_weight_kg: float
    harvest_date: str
    status: str = "TERSIMPAN" # "TERSIMPAN" | "TERJUAL_SEBAGIAN" | "HABIS"
    notes: Optional[str] = ""

# AI Diagnosis Schemas
class DiagnosisResponse(BaseModel):
    disease_name: str
    confidence: float
    severity: str
    symptoms: List[str]
    actions: List[str]
    detected_at: str

# Weather Schemas
class WeatherRecommendation(BaseModel):
    location: str
    temp_celsius: float
    humidity_percent: int
    weather_condition: str
    rain_probability_percent: int
    irrigation_needed: bool
    status_color: str # "green" | "yellow" | "red"
    advice_title: str
    advice_detail: str

# Social Networking & Distribution Schemas
class PartnerProfile(BaseModel):
    id: str
    name: str
    category: str # "KOPERASI" | "DISTRIBUTOR_PUPUK" | "PENGGILINGAN_PASAR"
    category_label: str
    pic_name: str
    phone_whatsapp: str
    location: str
    description: str
    is_verified: bool = True
    accepted_commodities: List[str] = []
    buying_price_hint: Optional[str] = None
    is_connected: bool = False

class HarvestOfferCreate(BaseModel):
    partner_id: str
    commodity: str
    weight_kg: float
    offered_price_per_kg: Optional[float] = None
    notes: Optional[str] = ""

class HarvestOfferResponse(BaseModel):
    id: str
    partner_name: str
    commodity: str
    weight_kg: float
    offered_price_per_kg: Optional[float]
    status: str
    created_at: str
    whatsapp_url: str

# --- ALL-IN-ONE SOCIAL & DIRECT TRADE SCHEMAS ---

# 1. Kios Saprotan (Distributor Products & Orders)
class ShopProduct(BaseModel):
    id: str
    seller_name: str
    seller_role: str = "DISTRIBUTOR"
    name: str
    category: str # "PUPUK" | "BIBIT" | "OBAT"
    price: float
    unit: str
    stock_available: int
    is_subsidi: bool = False
    description: str
    image_emoji: str = "📦"

class SaprotanOrderCreate(BaseModel):
    product_id: str
    quantity: int
    buyer_name: str = "Pak Joko (Petani)"
    payment_method: str = "COD / Bayar Saat Ambil" # "COD" | "YARNEN (Bayar Panen)" | "TRANSFER"
    delivery_note: Optional[str] = ""

class UpdateOrderStatus(BaseModel):
    status: str # "DIKONFIRMASI" | "DIKIRIM" | "SELESAI" | "DIBATALKAN"

# 2. Bursa Pasar Komoditas (Harvest Marketplace & Bidding)
class MarketListingCreate(BaseModel):
    seller_name: str = "Pak Joko (Petani)"
    commodity: str
    total_weight_kg: float
    starting_price_per_kg: float
    min_order_kg: float = 500
    location: str = "Lumbung Desa Sukamaju"
    harvest_ref_id: Optional[str] = None # Jika berasal dari stok lumbung
    notes: Optional[str] = ""

class MarketListingBid(BaseModel):
    bidder_name: str # e.g. "Penggilingan Sri Jaya" or "KUD Sukamaju"
    bidder_role: str # "PENGGILINGAN" | "AGEN" | "KOPERASI"
    bid_price_per_kg: float
    bid_weight_kg: float
    notes: Optional[str] = ""

# 3. Feed Sosial Komunitas Tani
class CommunityPostCreate(BaseModel):
    author_name: str
    author_role: str = "PETANI" # "PETANI" | "KETUA_POKTAN" | "PENYULUH"
    title: str
    content: str
    category: str # "TANYA_HAMA" | "INFO_POKTAN" | "TIPS_TANI" | "BERITA_HARGA"
    image_tag: Optional[str] = None

class CommunityCommentCreate(BaseModel):
    author_name: str
    author_role: str
    comment: str

# 4. Rencana Tani AI (Smart Farm Planner & Cost Calculator)
class FarmPlanRequest(BaseModel):
    land_size_ha: float
    commodity: Optional[str] = "Padi Sawah Inpari 32"
    soil_type: Optional[str] = "Lempung Berliat (Subur)"
    water_source: Optional[str] = "Irigasi Teknis Bendungan"
    location: Optional[str] = "Sukamaju, Jawa Timur"
    latitude: Optional[float] = -7.2504
    longitude: Optional[float] = 112.7512
    coordinates_label: Optional[str] = "-7.2504, 112.7512 (Desa Sukamaju)"

class FarmPlanStepUpdate(BaseModel):
    step_no: int
    status: str # "BELUM" | "SEDANG_BERJALAN" | "SELESAI"
    actual_cost: Optional[int] = None

# 5. Katalog & Marketplace Layanan Ekosistem
class EcosystemServiceItem(BaseModel):
    id: str
    provider_id: str
    provider_name: str
    provider_badge: str
    provider_avatar: str = "🌾"
    title: str
    category: str  # JASA_TRAKTOR | JASA_PENGAIRAN | JASA_TENAGA_KERJA | SAPROTAN | HASIL_PANEN | PASCA_PANEN
    category_label: str
    price: float
    price_unit: str  # e.g. "/ Hektar", "/ Hari", "/ Karung"
    location: str
    phone: str
    description: str
    tags: List[str] = []
    is_available: bool = True
    created_at: Optional[str] = None

class ServiceItemCreate(BaseModel):
    title: str
    category: str
    price: float
    price_unit: str
    location: str
    description: str
    tags: Optional[List[str]] = []
    phone: Optional[str] = None
    is_available: Optional[bool] = True

class ServiceItemUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    price_unit: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[List[str]] = None
    phone: Optional[str] = None
    is_available: Optional[bool] = None

# 6. Multi-Farmland, Kolaborator & Buku Modal Lahan
class Collaborator(BaseModel):
    id: str
    name: str
    role: str # "Pemilik Lahan" | "Penggarap Utama" | "Tenaga Kerja Cangkul" | "Penyedia Modal"
    share_percentage: float # e.g. 60.0
    phone: Optional[str] = ""

class CapitalExpense(BaseModel):
    id: str
    farm_id: str
    item_name: str
    amount: float
    category: str # "OLAH_TANAH" | "BENIH_BIBIT" | "PUPUK_NUTRISI" | "PENGAIRAN" | "TENAGA_KERJA" | "OBAT_HAMA" | "LAINNYA"
    source: str = "MARKETPLACE" # "MARKETPLACE" | "MANUAL"
    order_ref_id: Optional[str] = None
    date: str

class Farmland(BaseModel):
    id: str
    user_id: str
    name: str
    land_size_ha: float
    commodity: str = "Padi Sawah Inpari 32"
    soil_type: str = "Lempung Berliat (Subur)"
    water_source: str = "Irigasi Teknis Bendungan"
    location: str = "Desa Sukamaju, Jawa Timur"
    latitude: float = -7.2504
    longitude: float = 112.7512
    collaborators: List[Collaborator] = []
    capital_expenses: List[CapitalExpense] = []
    created_at: Optional[str] = None

class FarmlandCreate(BaseModel):
    name: str
    land_size_ha: float
    commodity: Optional[str] = "Padi Sawah Inpari 32"
    soil_type: Optional[str] = "Lempung Berliat (Subur)"
    water_source: Optional[str] = "Irigasi Teknis Bendungan"
    location: Optional[str] = "Desa Sukamaju, Jawa Timur"
    latitude: Optional[float] = -7.2504
    longitude: Optional[float] = 112.7512
    collaborators: Optional[List[Collaborator]] = []

class FarmlandUpdate(BaseModel):
    name: Optional[str] = None
    land_size_ha: Optional[float] = None
    commodity: Optional[str] = None
    soil_type: Optional[str] = None
    water_source: Optional[str] = None
    location: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    collaborators: Optional[List[Collaborator]] = None

class CapitalExpenseCreate(BaseModel):
    item_name: str
    amount: float
    category: str
    source: Optional[str] = "MANUAL"
    order_ref_id: Optional[str] = None

# 7. Marketplace In-App Checkout & Unified Notifications
class ServiceCheckoutRequest(BaseModel):
    service_id: str
    buyer_id: str
    buyer_name: str
    quantity: float
    unit: str
    payment_method: str = "COD / Bayar Saat Pengerjaan" # "COD" | "YARNEN (Bayar Panen)" | "TRANSFER"
    delivery_notes: Optional[str] = ""

class InAppNotification(BaseModel):
    id: str
    user_id: str # recipient user id
    title: str
    message: str
    type: str # "ORDER_RECEIVED" | "NEW_FOLLOWER" | "NEW_COMMENT" | "ORDER_STATUS" | "SYSTEM"
    reference_id: Optional[str] = None
    is_read: bool = False
    created_at: str

class UpdateServiceOrderStatus(BaseModel):
    status: str # "DIPROSES" | "SEDANG_DIKIRIM" | "SELESAI" | "STOK_HABIS" | "DIBATALKAN"
    seller_notes: Optional[str] = ""

# 8. Fitur Diskusi Pesanan & Diskusi Produk / Layanan
class OrderMessage(BaseModel):
    id: str
    order_id: str
    sender_id: str
    sender_name: str
    sender_role: str # "PEMBELI" | "PENJUAL"
    message: str
    created_at: str

class CreateOrderMessage(BaseModel):
    sender_id: str
    sender_name: str
    message: str

class ProductDiscussion(BaseModel):
    id: str
    service_id: str
    user_id: str
    user_name: str
    user_avatar: str = "🌾"
    question: str
    reply: Optional[str] = None
    replied_by: Optional[str] = None
    replied_at: Optional[str] = None
    created_at: str

class CreateProductDiscussion(BaseModel):
    user_id: str
    user_name: str
    user_avatar: Optional[str] = "🌾"
    question: str

class ReplyProductDiscussion(BaseModel):
    reply: str
    replied_by: str






