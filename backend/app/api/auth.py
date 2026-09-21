from fastapi import APIRouter, HTTPException, Header, Query
from typing import Dict, Any, List, Optional
from app.models.schemas import UserLogin, UserProfile, UserProfileUpdate, PublicUserProfile
from app.core.database import db

router = APIRouter(prefix="/auth", tags=["Autentikasi & Profil Petani"])

# Static Directory Profil Komunitas Ekosistem AgriBuddy
PUBLIC_PROFILES_DATA: Dict[str, Dict[str, Any]] = {
    "Pak Joko": {
        "id": "usr_001",
        "name": "Pak Joko",
        "role_label": "Petani Mandiri (Sukamaju)",
        "category_badge": "Petani Mandiri",
        "service_specialties": ["Budidaya Padi Inpari 32", "Sistem Jajar Legowo", "Petak Lahan 1.2 Ha"],
        "avatar": "👨‍🌾",
        "village": "Desa Sukamaju, Jawa Timur",
        "commodity": "Padi Inpari 32",
        "land_size_ha": 1.2,
        "whatsapp_number": "628123456789",
        "bio": "Petani padi binaan Poktan Makmur sejak 2012. Fokus pada budidaya ramah lingkungan, pemupukan berimbang, dan pencatatan digital.",
        "followers_count": 34,
        "following_count": 18,
        "is_followed": False,
        "posts_count": 6
    },
    "Mas Bambang": {
        "id": "usr_traktor",
        "name": "Mas Bambang",
        "role_label": "Jasa Olah Tanah & Traktor Quick",
        "category_badge": "Sewa Traktor",
        "service_specialties": ["Bajak Singkal", "Rotavator Lahan Kering & Basah", "Operator Handal"],
        "avatar": "🚜",
        "village": "Desa Sukamaju Krajan",
        "commodity": "Jasa Mekanisasi Olah Tanah",
        "land_size_ha": 0.0,
        "whatsapp_number": "6281298765432",
        "bio": "Menyediakan sewa traktor roda dua Quick Kubota 8.5 HP lengkap dengan operator ahli untuk olah tanah gembur siap tanam.",
        "followers_count": 92,
        "following_count": 14,
        "is_followed": True,
        "posts_count": 11
    },
    "Pak Slamet": {
        "id": "usr_pengairan",
        "name": "Pak Slamet",
        "role_label": "Jasa Pompa Air & Irigasi",
        "category_badge": "Jasa Pengairan",
        "service_specialties": ["Pompa Alkon 3 Inci", "Sedot Air Sungai / Embung", "Pengeboran Sumur Pantek"],
        "avatar": "💧",
        "village": "Desa Sukamaju Blok Saluran",
        "commodity": "Jasa Pompanisasi & Pengairan",
        "land_size_ha": 0.0,
        "whatsapp_number": "6285799988811",
        "bio": "Siap antar unit mesin pompa diesel alkon 3 inci ke pematang sawah untuk pengairan darurat musim kemarau.",
        "followers_count": 58,
        "following_count": 9,
        "is_followed": False,
        "posts_count": 7
    },
    "Mang Udin": {
        "id": "usr_cangkul",
        "name": "Mang Udin",
        "role_label": "Jasa Cangkul & Regu Tanam",
        "category_badge": "Jasa Cangkul & Tanam",
        "service_specialties": ["Cangkul Pematang Galengan", "Regu Tanam Borongan", "Penyiangan Gulma Landak"],
        "avatar": "🌾",
        "village": "Desa Sukamaju Girang",
        "commodity": "Jasa Tenaga Kerja Tani",
        "land_size_ha": 0.0,
        "whatsapp_number": "6287811223344",
        "bio": "Koordinator regu buruh tani terampil untuk perbaikan pematang sawah, penanaman sistem tegel atau jajar legowo, dan penyiangan rumput.",
        "followers_count": 45,
        "following_count": 11,
        "is_followed": False,
        "posts_count": 5
    },
    "Ibu Ratna": {
        "id": "usr_003",
        "name": "Ibu Ratna",
        "role_label": "Kios Saprotan & Pupuk Resmi KPL",
        "category_badge": "Kios Saprotan",
        "service_specialties": ["Pupuk Subsidi & Non-Subsidi", "Benih Padi Bersertifikat", "Pestisida & Obat Hama"],
        "avatar": "🏪",
        "village": "Pasar Tradisional Sukamaju Kios B-04",
        "commodity": "Saprotan Pupuk & Benih",
        "land_size_ha": 0.0,
        "whatsapp_number": "6285712345678",
        "bio": "Penyalur resmi pupuk bersubsidi (Urea & NPK) serta benih resmi Balitbangtan. Siap melayani pesan antar dan bayar panen (Yarnen).",
        "followers_count": 128,
        "following_count": 19,
        "is_followed": True,
        "posts_count": 14
    },
    "Kios Tani Subur Makmur": {
        "id": "usr_003_alt",
        "name": "Kios Tani Subur Makmur",
        "role_label": "Kios Saprotan & Pupuk Resmi KPL",
        "category_badge": "Kios Saprotan",
        "service_specialties": ["Pupuk Subsidi", "Benih Inpari 32", "Bakterisida Hayati"],
        "avatar": "🏪",
        "village": "Pasar Tradisional Sukamaju Kios B-04",
        "commodity": "Saprotan Pupuk & Benih",
        "land_size_ha": 0.0,
        "whatsapp_number": "6285712345678",
        "bio": "Kios Resmi Penyalur Lengkap Saprotan desa Sukamaju mitra petani binaan.",
        "followers_count": 128,
        "following_count": 19,
        "is_followed": True,
        "posts_count": 14
    },
    "Bpk. Hendra Jaya": {
        "id": "usr_004",
        "name": "Bpk. Hendra Jaya",
        "role_label": "Penggilingan Padi & Pengepul GKP",
        "category_badge": "Penggilingan Padi",
        "service_specialties": ["Timbangan Digital Terkalibrasi", "Armada Pick-Up Jemput Lumbung", "Beli Gabah Tunai"],
        "avatar": "🚚",
        "village": "Kawasan Sentra Penggilingan Km 3",
        "commodity": "Penampung Gabah Kering Panen",
        "land_size_ha": 0.0,
        "whatsapp_number": "6281356789012",
        "bio": "Mitra penyerapan gabah petani lokal dengan timbangan digital terkalibrasi, harga transparan sesuai mutu, dan armada jemput langsung.",
        "followers_count": 86,
        "following_count": 12,
        "is_followed": False,
        "posts_count": 8
    }
}

FOLLOWED_USERS: set = set(["usr_traktor", "usr_003", "usr_003_alt"])


@router.post("/login", response_model=UserProfile)
def login(payload: UserLogin):
    users = db.get_collection("users")
    user = next((u for u in users if u.get("phone_number") == payload.phone_number), None)
    
    if not user:
        new_user = {
            "phone_number": payload.phone_number,
            "full_name": "Pak Joko",
            "village": "Desa Sukamaju, Jawa Timur",
            "commodity": "Padi Inpari 32",
            "land_size_ha": 1.2,
            "whatsapp_number": payload.phone_number,
            "bio": "Petani Padi Binaan Kelompok Tani Makmur"
        }
        user = db.insert("users", new_user)
        
    return UserProfile(
        id=user["id"],
        phone_number=user["phone_number"],
        full_name=user["full_name"],
        village=user["village"],
        commodity=user["commodity"],
        land_size_ha=user.get("land_size_ha", 1.2),
        whatsapp_number=user.get("whatsapp_number", user["phone_number"]),
        bio=user.get("bio", "Petani Padi Binaan Kelompok Tani Makmur")
    )

@router.get("/profile", response_model=UserProfile)
def get_profile(
    user_id: Optional[str] = None,
    x_user_id: Optional[str] = Header(None, alias="X-User-Id")
):
    target_id = user_id or x_user_id or "usr_petani"
    users = db.get_collection("users")
    user = next((u for u in users if u.get("id") == target_id), None)
    
    # Fallback jika belum ketemu by id, coba cari by phone
    if not user:
        user = next((u for u in users if u.get("phone_number") == target_id), None)
    if not user and users:
        user = users[0]
        
    if user:
        return UserProfile(
            id=user["id"],
            phone_number=user.get("phone_number", "08123456789"),
            full_name=user.get("full_name", "Pak Joko"),
            village=user.get("village", "Desa Sukamaju"),
            commodity=user.get("commodity", "Padi Inpari 32"),
            land_size_ha=user.get("land_size_ha", 1.2),
            whatsapp_number=user.get("whatsapp_number", user.get("phone_number", "08123456789")),
            bio=user.get("bio", "")
        )
    raise HTTPException(status_code=404, detail="Profil tidak ditemukan")

@router.put("/profile", response_model=UserProfile)
def update_profile(
    payload: UserProfileUpdate,
    user_id: Optional[str] = None,
    x_user_id: Optional[str] = Header(None, alias="X-User-Id")
):
    target_id = user_id or x_user_id or "usr_petani"
    users = db.get_collection("users")
    user = next((u for u in users if u.get("id") == target_id), None)
    if not user and users:
        user = users[0]
    if not user:
        raise HTTPException(status_code=404, detail="Profil tidak ditemukan")
    
    target_user_id = user["id"]
    updates = {k: v for k, v in payload.model_dump().items() if v is not None}
    updated = db.update("users", target_user_id, updates)
    return UserProfile(
        id=updated["id"],
        phone_number=updated.get("phone_number", "08123456789"),
        full_name=updated.get("full_name", ""),
        village=updated.get("village", ""),
        commodity=updated.get("commodity", ""),
        land_size_ha=updated.get("land_size_ha", 1.2),
        whatsapp_number=updated.get("whatsapp_number", updated.get("phone_number", "")),
        bio=updated.get("bio", "")
    )

# --- PUBLIC PROFILE & FOLLOW SYSTEM ---

@router.get("/users/{author_name}", response_model=PublicUserProfile)
def get_public_profile(author_name: str):
    # Match exact or partial name
    profile_data = None
    for name, data in PUBLIC_PROFILES_DATA.items():
        if author_name.lower() in name.lower() or name.lower() in author_name.lower():
            profile_data = dict(data)
            break
            
    if not profile_data:
        profile_data = {
            "id": f"usr_{hash(author_name) % 10000}",
            "name": author_name,
            "role_label": "Petani Anggota Poktan",
            "avatar": "👨‍🌾",
            "village": "Desa Sukamaju, Jawa Timur",
            "commodity": "Padi Inpari 32",
            "land_size_ha": 1.0,
            "whatsapp_number": "628123456789",
            "bio": f"Petani aktif di ekosistem AgriBuddy.",
            "followers_count": 28,
            "following_count": 14,
            "is_followed": False,
            "posts_count": 3
        }

    is_fol = profile_data["id"] in FOLLOWED_USERS
    profile_data["is_followed"] = is_fol
    return PublicUserProfile(**profile_data)

@router.post("/users/{author_name}/toggle-follow")
def toggle_follow_user(author_name: str):
    profile = get_public_profile(author_name)
    user_id = profile.id
    
    if user_id in FOLLOWED_USERS:
        FOLLOWED_USERS.remove(user_id)
        is_now_following = False
        new_count = max(0, profile.followers_count - 1)
    else:
        FOLLOWED_USERS.add(user_id)
        is_now_following = True
        new_count = profile.followers_count + 1
        
        # Memicu notifikasi in-app untuk pengguna yang difollow
        import uuid
        from datetime import datetime
        db.insert("notifications", {
            "id": f"notif_{uuid.uuid4().hex[:8]}",
            "user_id": user_id,
            "title": "Pengikut Baru! 👤",
            "message": f"Seorang warga ekosistem mulai mengikuti profil usahatani Anda.",
            "type": "NEW_FOLLOWER",
            "reference_id": user_id,
            "is_read": False,
            "created_at": datetime.now().strftime("%d %b %Y, %H:%M WIB")
        })

    # Update in dictionary if exists
    for name, data in PUBLIC_PROFILES_DATA.items():
        if data["id"] == user_id:
            data["followers_count"] = new_count
            break

    return {
        "user_id": user_id,
        "is_followed": is_now_following,
        "followers_count": new_count,
        "message": f"Sekarang Anda mengikuti {author_name}" if is_now_following else f"Berhenti mengikuti {author_name}"
    }

