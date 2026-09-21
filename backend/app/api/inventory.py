from fastapi import APIRouter, HTTPException, Header, Query
from typing import List, Dict, Any, Optional
from app.models.schemas import InventoryItemCreate, InventoryItemUpdate, InventoryQuickAdjust
from app.core.database import db

router = APIRouter(prefix="/inventory", tags=["Buku Tani - Inventaris Saprotan"])

@router.get("", response_model=List[Dict[str, Any]])
def get_inventory(
    user_id: Optional[str] = Query(None),
    x_user_id: Optional[str] = Header(None, alias="X-User-Id")
):
    target_id = user_id or x_user_id or "usr_petani"
    items = db.get_collection("inventory")
    # Tampilkan item milik user ini, atau default jika belum ada
    user_items = [i for i in items if i.get("user_id") in [target_id, "usr_001"]]
    
    # Jika akun distributor, bisa berikan stok default kios
    if not user_items and target_id == "usr_distributor":
        user_items = [
            {"id": "inv_d1", "user_id": target_id, "name": "Gudang Urea Subsidi", "type": "PUPUK", "quantity": 45, "unit": "Karung", "min_threshold": 10},
            {"id": "inv_d2", "user_id": target_id, "name": "Gudang Benih Inpari 32", "type": "BIBIT", "quantity": 20, "unit": "Kantong", "min_threshold": 5}
        ]
        
    for itm in user_items:
        qty = itm.get("quantity", 0)
        threshold = itm.get("min_threshold", 2)
        itm["is_low_stock"] = qty <= threshold
    return user_items

@router.post("", response_model=Dict[str, Any])
def add_inventory_item(
    item: InventoryItemCreate,
    user_id: Optional[str] = Query(None),
    x_user_id: Optional[str] = Header(None, alias="X-User-Id")
):
    target_id = user_id or x_user_id or "usr_petani"
    new_item = item.model_dump()
    new_item["user_id"] = target_id
    inserted = db.insert("inventory", new_item)
    inserted["is_low_stock"] = inserted["quantity"] <= inserted.get("min_threshold", 2)
    return inserted

@router.patch("/{item_id}/quick-adjust", response_model=Dict[str, Any])
def quick_adjust_quantity(item_id: str, payload: InventoryQuickAdjust):
    items = db.get_collection("inventory")
    target = next((i for i in items if i.get("id") == item_id), None)
    if not target:
        raise HTTPException(status_code=404, detail="Item inventaris tidak ditemukan")
    
    new_qty = max(0.0, round(target.get("quantity", 0) + payload.delta, 2))
    updated = db.update("inventory", item_id, {"quantity": new_qty})
    updated["is_low_stock"] = updated["quantity"] <= updated.get("min_threshold", 2)
    return updated

@router.delete("/{item_id}")
def delete_inventory_item(item_id: str):
    success = db.delete("inventory", item_id)
    if not success:
        raise HTTPException(status_code=404, detail="Item tidak ditemukan")
    return {"message": "Berhasil menghapus item"}
