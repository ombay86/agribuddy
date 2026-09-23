import urllib.parse
from datetime import datetime
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, HTTPException, Query
from app.models.schemas import PartnerProfile, HarvestOfferCreate, HarvestOfferResponse
from app.core.database import db

router = APIRouter(prefix="/network", tags=["Jejaring Sosial & Distribusi Pertanian"])

@router.get("/partners", response_model=List[Dict[str, Any]])
def get_partners(category: Optional[str] = Query(None, description="Filter: KOPERASI, DISTRIBUTOR_PUPUK, PENGGILINGAN_PASAR")):
    partners = db.get_collection("partners")
    if category and category != "SEMUA":
        return [p for p in partners if p.get("category") == category]
    return partners

@router.post("/connect/{partner_id}")
def toggle_partner_connection(partner_id: str):
    partners = db.get_collection("partners")
    partner = next((p for p in partners if p.get("id") == partner_id), None)
    if not partner:
        raise HTTPException(status_code=404, detail="Mitra tidak ditemukan")
    
    new_status = not partner.get("is_connected", False)
    updated = db.update("partners", partner_id, {"is_connected": new_status})
    return {
        "partner_id": partner_id,
        "is_connected": new_status,
        "message": "Berhasil terhubung dengan mitra" if new_status else "Koneksi kemitraan dilepas"
    }

@router.post("/offer-harvest", response_model=HarvestOfferResponse)
def create_harvest_offer(payload: HarvestOfferCreate):
    partners = db.get_collection("partners")
    partner = next((p for p in partners if p.get("id") == payload.partner_id), None)
    if not partner:
        raise HTTPException(status_code=404, detail="Mitra tujuan tidak ditemukan")
    
    # Generate WhatsApp Deep-Link dengan pesan profesional ramah petani
    price_text = f"Rp {payload.offered_price_per_kg:,.0f}/kg" if payload.offered_price_per_kg else "Harga negosiasi terbaik"
    wa_message = (
        f"Halo {partner['name']},\n"
        f"Saya Pak Joko (Petani Binaan AgriBuddy - Desa Sukamaju).\n"
        f"Saya memiliki stok hasil panen di lumbung:\n"
        f"- Komoditas: {payload.commodity}\n"
        f"- Kuantitas: {payload.weight_kg:,.0f} Kg\n"
        f"- Harapan Harga: {price_text}\n"
        f"- Catatan: {payload.notes or 'Siap angkut'}\n\n"
        f"Apakah pihak {partner['name']} berminat untuk penyerapan komoditas ini? Terima kasih."
    )
    encoded_message = urllib.parse.quote(wa_message)
    wa_url = f"https://wa.me/{partner['phone_whatsapp']}?text={encoded_message}"
    
    new_offer = {
        "partner_id": payload.partner_id,
        "partner_name": partner["name"],
        "commodity": payload.commodity,
        "weight_kg": payload.weight_kg,
        "offered_price_per_kg": payload.offered_price_per_kg,
        "status": "DITAWARKAN",
        "created_at": datetime.now().strftime("%d %b %Y, %H:%M WIB"),
        "whatsapp_url": wa_url,
        "notes": payload.notes
    }
    inserted = db.insert("offers", new_offer)
    return HarvestOfferResponse(
        id=inserted["id"],
        partner_name=inserted["partner_name"],
        commodity=inserted["commodity"],
        weight_kg=inserted["weight_kg"],
        offered_price_per_kg=inserted.get("offered_price_per_kg"),
        status=inserted["status"],
        created_at=inserted["created_at"],
        whatsapp_url=inserted["whatsapp_url"]
    )

@router.get("/offers", response_model=List[Dict[str, Any]])
def get_my_offers():
    return db.get_collection("offers")
