import uuid
from datetime import datetime
from typing import List, Dict, Any, Optional
from fastapi import APIRouter, HTTPException, Query
from app.models.schemas import (
    Farmland, FarmlandCreate, FarmlandUpdate, 
    Collaborator, CapitalExpense, CapitalExpenseCreate
)
from app.core.database import db

router = APIRouter(prefix="/farmlands", tags=["Multi-Lahan Sawah & Kolaborator Usahatani"])

@router.get("", response_model=List[Dict[str, Any]])
def get_farmlands(user_id: Optional[str] = Query(None)):
    """
    Mengambil daftar seluruh lahan sawah yang dikelola pengguna.
    """
    farms = db.get_collection("farmlands")
    if user_id:
        return [f for f in farms if f.get("user_id") == user_id]
    return farms

@router.get("/{farm_id}", response_model=Dict[str, Any])
def get_farmland_detail(farm_id: str):
    """
    Mengambil detail satu petak sawah beserta kolaborator dan buku modalnya.
    """
    farms = db.get_collection("farmlands")
    farm = next((f for f in farms if f.get("id") == farm_id), None)
    if not farm:
        raise HTTPException(status_code=404, detail="Data lahan sawah tidak ditemukan")
    return farm

@router.post("", response_model=Dict[str, Any])
def create_farmland(payload: FarmlandCreate, user_id: str = "usr_petani"):
    """
    Menambahkan petak lahan sawah baru ke dalam usahatani.
    """
    if payload.land_size_ha <= 0:
        raise HTTPException(status_code=400, detail="Luas lahan harus lebih besar dari 0 Ha.")
    
    users = db.get_collection("users")
    user = next((u for u in users if u.get("id") == user_id), None)
    owner_name = user.get("full_name", "Petani") if user else "Petani"

    # Jika belum ada kolaborator yang diset, defaultkan pemilik lahan dengan porsi 100%
    collaborators = []
    if payload.collaborators:
        collaborators = [c.dict() for c in payload.collaborators]
    else:
        collaborators = [
            {
                "id": f"collab_{uuid.uuid4().hex[:6]}",
                "name": owner_name,
                "role": "Pemilik Lahan & Pengelola Utama",
                "share_percentage": 100.0,
                "phone": user.get("phone_number", "") if user else ""
            }
        ]

    new_farm = {
        "id": f"farm_{uuid.uuid4().hex[:6]}",
        "user_id": user_id,
        "name": payload.name,
        "land_size_ha": payload.land_size_ha,
        "commodity": payload.commodity or "Padi Sawah Inpari 32",
        "soil_type": payload.soil_type or "Lempung Berliat (Subur)",
        "water_source": payload.water_source or "Irigasi Teknis Bendungan",
        "location": payload.location or "Desa Sukamaju, Jawa Timur",
        "latitude": payload.latitude or -7.2504,
        "longitude": payload.longitude or 112.7512,
        "collaborators": collaborators,
        "capital_expenses": [],
        "created_at": datetime.now().isoformat()
    }

    inserted = db.insert("farmlands", new_farm)
    return inserted

@router.put("/{farm_id}", response_model=Dict[str, Any])
def update_farmland(farm_id: str, payload: FarmlandUpdate):
    """
    Memperbarui parameter sawah atau susunan kolaborator bagi hasil.
    """
    farms = db.get_collection("farmlands")
    farm = next((f for f in farms if f.get("id") == farm_id), None)
    if not farm:
        raise HTTPException(status_code=404, detail="Lahan tidak ditemukan")

    updates = {}
    if payload.name is not None:
        updates["name"] = payload.name
    if payload.land_size_ha is not None:
        if payload.land_size_ha <= 0:
            raise HTTPException(status_code=400, detail="Luas lahan harus lebih besar dari 0 Ha.")
        updates["land_size_ha"] = payload.land_size_ha
    if payload.commodity is not None:
        updates["commodity"] = payload.commodity
    if payload.soil_type is not None:
        updates["soil_type"] = payload.soil_type
    if payload.water_source is not None:
        updates["water_source"] = payload.water_source
    if payload.location is not None:
        updates["location"] = payload.location
    if payload.latitude is not None:
        updates["latitude"] = payload.latitude
    if payload.longitude is not None:
        updates["longitude"] = payload.longitude
    if payload.collaborators is not None:
        updates["collaborators"] = [c.dict() for c in payload.collaborators]

    updated = db.update("farmlands", farm_id, updates)
    return updated

@router.delete("/{farm_id}")
def delete_farmland(farm_id: str):
    """
    Menghapus petak lahan sawah dari daftar usahatani.
    """
    success = db.delete("farmlands", farm_id)
    if not success:
        raise HTTPException(status_code=404, detail="Lahan tidak ditemukan")
    return {"message": "Lahan sawah berhasil dihapus", "farm_id": farm_id}

@router.post("/{farm_id}/collaborators", response_model=Dict[str, Any])
def add_collaborator(farm_id: str, collaborator: Collaborator):
    """
    Menambahkan kolaborator baru pada lahan beserta proporsi bagi hasil panen.
    """
    farms = db.get_collection("farmlands")
    farm = next((f for f in farms if f.get("id") == farm_id), None)
    if not farm:
        raise HTTPException(status_code=404, detail="Lahan tidak ditemukan")

    collabs = farm.get("collaborators", [])
    new_c = collaborator.dict()
    if not new_c.get("id"):
        new_c["id"] = f"collab_{uuid.uuid4().hex[:6]}"
    
    collabs.append(new_c)
    updated = db.update("farmlands", farm_id, {"collaborators": collabs})
    return updated

@router.delete("/{farm_id}/collaborators/{collaborator_id}", response_model=Dict[str, Any])
def remove_collaborator(farm_id: str, collaborator_id: str):
    """
    Menghapus kolaborator dari pengelolaan lahan.
    """
    farms = db.get_collection("farmlands")
    farm = next((f for f in farms if f.get("id") == farm_id), None)
    if not farm:
        raise HTTPException(status_code=404, detail="Lahan tidak ditemukan")

    collabs = [c for c in farm.get("collaborators", []) if c.get("id") != collaborator_id]
    updated = db.update("farmlands", farm_id, {"collaborators": collabs})
    return updated

@router.post("/{farm_id}/expenses", response_model=Dict[str, Any])
def record_capital_expense(farm_id: str, payload: CapitalExpenseCreate):
    """
    Mencatat pengeluaran belanja (dari checkout marketplace maupun manual) 
    ke dalam Buku Modal usahatani lahan sawah terkait.
    """
    farms = db.get_collection("farmlands")
    farm = next((f for f in farms if f.get("id") == farm_id), None)
    if not farm:
        raise HTTPException(status_code=404, detail="Lahan tidak ditemukan")

    expense_item = {
        "id": f"exp_{uuid.uuid4().hex[:6]}",
        "farm_id": farm_id,
        "item_name": payload.item_name,
        "amount": payload.amount,
        "category": payload.category,
        "source": payload.source or "MARKETPLACE",
        "order_ref_id": payload.order_ref_id,
        "date": datetime.now().strftime("%d %b %Y, %H:%M WIB")
    }

    expenses = farm.get("capital_expenses", [])
    expenses.insert(0, expense_item) # Taruh terbaru di awal
    db.update("farmlands", farm_id, {"capital_expenses": expenses})

    return {
        "message": f"Biaya Rp {payload.amount:,.0f} berhasil dicatat ke Buku Modal {farm.get('name')}",
        "expense": expense_item,
        "farm_id": farm_id,
        "total_expenses": sum(e.get("amount", 0) for e in expenses)
    }

@router.get("/{farm_id}/expenses", response_model=List[Dict[str, Any]])
def get_capital_expenses(farm_id: str):
    """
    Melihat riwayat buku modal usahatani pada lahan sawah terkait.
    """
    farms = db.get_collection("farmlands")
    farm = next((f for f in farms if f.get("id") == farm_id), None)
    if not farm:
        raise HTTPException(status_code=404, detail="Lahan tidak ditemukan")
    return farm.get("capital_expenses", [])
