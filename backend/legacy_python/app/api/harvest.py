from fastapi import APIRouter, HTTPException, Header, Query
from typing import List, Dict, Any, Optional
from app.models.schemas import HarvestCreate
from app.core.database import db

router = APIRouter(prefix="/harvest", tags=["Lumbung Tani - Hasil Panen & Pasar"])

# Data Tren Harga Pasar Lokal Komoditas Pangan
MARKET_PRICES = [
    {
        "commodity": "Gabah Kering Panen (GKP)",
        "price_per_kg": 6800,
        "trend": "up",
        "change_percent": "+3.5%",
        "note": "Permintaan penggilingan tinggi minggu ini"
    },
    {
        "commodity": "Gabah Kering Giling (GKG)",
        "price_per_kg": 7600,
        "trend": "stable",
        "change_percent": "0.0%",
        "note": "Harga stabil di pasar induk daerah"
    },
    {
        "commodity": "Beras Medium",
        "price_per_kg": 13500,
        "trend": "up",
        "change_percent": "+1.8%",
        "note": "Stok pasar menipis menjelang musim tanam"
    }
]

@router.get("", response_model=List[Dict[str, Any]])
def get_harvests(
    user_id: Optional[str] = Query(None),
    x_user_id: Optional[str] = Header(None, alias="X-User-Id")
):
    target_id = user_id or x_user_id or "usr_petani"
    all_harvests = db.get_collection("harvests")
    
    # Filter sesuai user yang login
    user_harvests = [h for h in all_harvests if h.get("user_id") in [target_id, "usr_001"]]
    
    # Berikan data awal spesifik jika akun agen
    if not user_harvests and target_id == "usr_agen":
        user_harvests = [
            {
                "id": "hrv_a1",
                "user_id": target_id,
                "commodity": "Gabah Siap Giling (Silo Penggilingan)",
                "total_weight_kg": 3500,
                "harvest_date": "2026-08-25",
                "status": "TERSIMPAN",
                "notes": "Stok cadangan operasional penggilingan padi"
            }
        ]
    return user_harvests

@router.post("", response_model=Dict[str, Any])
def add_harvest(
    payload: HarvestCreate,
    user_id: Optional[str] = Query(None),
    x_user_id: Optional[str] = Header(None, alias="X-User-Id")
):
    target_id = user_id or x_user_id or "usr_petani"
    new_record = payload.model_dump()
    new_record["user_id"] = target_id
    inserted = db.insert("harvests", new_record)
    return inserted

@router.get("/market-prices")
def get_market_prices():
    return MARKET_PRICES

@router.delete("/{harvest_id}")
def delete_harvest(harvest_id: str):
    success = db.delete("harvests", harvest_id)
    if not success:
        raise HTTPException(status_code=404, detail="Data panen tidak ditemukan")
    return {"message": "Berhasil menghapus data panen"}
