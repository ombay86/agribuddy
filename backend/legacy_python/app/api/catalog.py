import uuid
from fastapi import APIRouter, HTTPException, Header, Query
from typing import List, Dict, Any, Optional
from datetime import datetime
from app.models.schemas import (
    EcosystemServiceItem, ServiceItemCreate, ServiceItemUpdate,
    ServiceCheckoutRequest, InAppNotification, UpdateServiceOrderStatus,
    OrderMessage, CreateOrderMessage, ProductDiscussion, CreateProductDiscussion, ReplyProductDiscussion
)
from app.core.database import db

router = APIRouter(prefix="/catalog", tags=["Katalog & Marketplace Layanan Ekosistem"])

CATEGORY_LABELS = {
    "JASA_TRAKTOR": "Jasa Olah Tanah",
    "JASA_PENGAIRAN": "Jasa Pengairan",
    "JASA_TENAGA_KERJA": "Tenaga Kerja Tani",
    "SAPROTAN": "Pupuk & Benih",
    "HASIL_PANEN": "Penyerapan Panen",
    "PASCA_PANEN": "Jasa Pasca Panen"
}

@router.get("/services", response_model=List[EcosystemServiceItem])
def get_services(
    category: Optional[str] = Query(None, description="Filter kategori layanan"),
    search: Optional[str] = Query(None, description="Pencarian nama atau deskripsi")
):
    """
    Mengambil katalog layanan & produk yang ditawarkan oleh warga ekosistem AgriBuddy.
    """
    services = db.get_collection("ecosystem_services")
    results = []

    for s in services:
        if category and category != "SEMUA" and s.get("category") != category:
            continue
        if search:
            q = search.lower()
            title_match = q in s.get("title", "").lower()
            desc_match = q in s.get("description", "").lower()
            prov_match = q in s.get("provider_name", "").lower()
            tag_match = any(q in t.lower() for t in s.get("tags", []))
            if not (title_match or desc_match or prov_match or tag_match):
                continue
        results.append(EcosystemServiceItem(**s))

    return results

@router.get("/my-services", response_model=List[EcosystemServiceItem])
def get_my_services(
    user_id: Optional[str] = None,
    x_user_id: Optional[str] = Header(None, alias="X-User-Id")
):
    """
    Mengambil daftar layanan/jasa yang dibuat dan dikelola oleh pengguna yang sedang aktif/login.
    """
    active_user_id = user_id or x_user_id or "usr_petani"
    services = db.get_collection("ecosystem_services")
    user_services = [s for s in services if s.get("provider_id") == active_user_id]
    return [EcosystemServiceItem(**s) for s in user_services]

@router.post("/services", response_model=EcosystemServiceItem)
def create_service(
    payload: ServiceItemCreate,
    user_id: Optional[str] = None,
    x_user_id: Optional[str] = Header(None, alias="X-User-Id")
):
    """
    Menambahkan / memposting layanan atau produk baru ke dalam katalog ekosistem.
    """
    active_user_id = user_id or x_user_id or "usr_petani"
    users = db.get_collection("users")
    user = next((u for u in users if u.get("id") == active_user_id), None)

    provider_name = user.get("full_name", "Warga Ekosistem") if user else "Pengguna AgriBuddy"
    provider_badge = user.get("category_badge", user.get("role_label", "Penyedia Jasa")) if user else "Penyedia Jasa"
    provider_phone = payload.phone or (user.get("whatsapp_number") or user.get("phone_number") if user else "08123456789")

    # Icon avatar default sesuai kategori
    avatar_map = {
        "JASA_TRAKTOR": "🚜",
        "JASA_PENGAIRAN": "💧",
        "JASA_TENAGA_KERJA": "🌾",
        "SAPROTAN": "🏪",
        "HASIL_PANEN": "📦",
        "PASCA_PANEN": "🚚"
    }
    avatar = avatar_map.get(payload.category, "🌾")

    item_data = {
        "provider_id": active_user_id,
        "provider_name": provider_name,
        "provider_badge": provider_badge,
        "provider_avatar": avatar,
        "image_url": payload.image_url,
        "rating": 5.0,
        "completed_orders_count": 0,
        "title": payload.title,
        "category": payload.category,
        "category_label": CATEGORY_LABELS.get(payload.category, "Layanan Ekosistem"),
        "price": payload.price,
        "price_unit": payload.price_unit,
        "location": payload.location or (user.get("village") if user else "Desa Sukamaju"),
        "phone": provider_phone,
        "description": payload.description,
        "tags": payload.tags or [],
        "is_available": payload.is_available if payload.is_available is not None else True,
        "created_at": datetime.now().isoformat()
    }

    inserted = db.insert("ecosystem_services", item_data)
    return EcosystemServiceItem(**inserted)

@router.put("/services/{service_id}", response_model=EcosystemServiceItem)
def update_service(
    service_id: str,
    payload: ServiceItemUpdate,
    x_user_id: Optional[str] = Header(None, alias="X-User-Id")
):
    """
    Mengubah rincian layanan yang dimiliki pengguna.
    """
    services = db.get_collection("ecosystem_services")
    service = next((s for s in services if s.get("id") == service_id), None)
    if not service:
        raise HTTPException(status_code=404, detail="Layanan tidak ditemukan.")

    updates = {k: v for k, v in payload.model_dump().items() if v is not None}
    if "category" in updates:
        updates["category_label"] = CATEGORY_LABELS.get(updates["category"], "Layanan Ekosistem")

    updated = db.update("ecosystem_services", service["id"], updates)
    return EcosystemServiceItem(**updated)

@router.delete("/services/{service_id}")
def delete_service(
    service_id: str,
    x_user_id: Optional[str] = Header(None, alias="X-User-Id")
):
    """
    Menghapus postingan layanan dari katalog.
    """
    success = db.delete("ecosystem_services", service_id)
    if not success:
        raise HTTPException(status_code=404, detail="Layanan tidak ditemukan.")
    return {"status": "success", "message": "Layanan berhasil dihapus dari katalog."}

# ==============================================================================
# IN-APP CHECKOUT & NOTIFIKASI SELLER
# ==============================================================================

@router.post("/checkout", response_model=Dict[str, Any])
def checkout_service(payload: ServiceCheckoutRequest):
    """
    Melakukan checkout langsung in-app untuk memesan layanan/produk dari katalog.
    Menciptakan data order dan memicu notifikasi instan ke akun penjual (seller).
    """
    services = db.get_collection("ecosystem_services")
    service = next((s for s in services if s.get("id") == payload.service_id), None)
    if not service:
        raise HTTPException(status_code=404, detail="Layanan atau produk tidak ditemukan")

    unit_price = float(service.get("price", 0))
    total_price = float(payload.quantity) * unit_price
    order_id = f"ord_{uuid.uuid4().hex[:8]}"
    timestamp = datetime.now().strftime("%d %b %Y, %H:%M WIB")

    order_item = {
        "id": order_id,
        "service_id": service["id"],
        "service_title": service["title"],
        "seller_id": service["provider_id"],
        "seller_name": service["provider_name"],
        "buyer_id": payload.buyer_id,
        "buyer_name": payload.buyer_name,
        "quantity": payload.quantity,
        "unit": payload.unit or service.get("price_unit", ""),
        "unit_price": unit_price,
        "total_price": total_price,
        "payment_method": payload.payment_method,
        "delivery_notes": payload.delivery_notes or "",
        "status": "MENUNGGU_KONFIRMASI",
        "created_at": timestamp
    }
    db.insert("service_orders", order_item)

    # Trigger notifikasi instan untuk Seller (Penyedia Jasa)
    seller_notif = {
        "id": f"notif_{uuid.uuid4().hex[:8]}",
        "user_id": service["provider_id"],
        "title": "Pesanan Jasa Baru Masuk! 🛒",
        "message": f"{payload.buyer_name} memesan {service['title']} ({payload.quantity} {payload.unit or service.get('price_unit', '')}) senilai Rp {total_price:,.0f}.",
        "type": "ORDER_RECEIVED",
        "reference_id": order_id,
        "is_read": False,
        "created_at": timestamp
    }
    db.insert("notifications", seller_notif)

    # Trigger notifikasi konfirmasi untuk Buyer (Pembeli)
    buyer_notif = {
        "id": f"notif_{uuid.uuid4().hex[:8]}",
        "user_id": payload.buyer_id,
        "title": "Pesanan Terkirim ke Mitra ✅",
        "message": f"Pesanan {service['title']} telah diteruskan ke {service['provider_name']}. Menunggu konfirmasi pengerjaan.",
        "type": "ORDER_STATUS",
        "reference_id": order_id,
        "is_read": False,
        "created_at": timestamp
    }
    db.insert("notifications", buyer_notif)

    return {
        "status": "success",
        "message": "Pesanan berhasil dibuat",
        "order": order_item,
        "seller_notified": service["provider_name"]
    }

@router.get("/notifications", response_model=List[Dict[str, Any]])
def get_user_notifications(user_id: str = Query("usr_petani")):
    """
    Mengambil daftar seluruh notifikasi pengguna (pesanan, follower baru, komentar feed).
    """
    notifs = db.get_collection("notifications")
    user_notifs = [n for n in notifs if n.get("user_id") == user_id]
    user_notifs.sort(key=lambda x: x.get("created_at", ""), reverse=True)
    return user_notifs

@router.patch("/notifications/{notif_id}/read", response_model=Dict[str, Any])
def mark_notification_read(notif_id: str):
    """
    Menandai notifikasi telah dibaca.
    """
    updated = db.update("notifications", notif_id, {"is_read": True})
    if not updated:
        raise HTTPException(status_code=404, detail="Notifikasi tidak ditemukan")
    return updated

@router.post("/notifications/mark-all-read")
def mark_all_notifications_read(user_id: str = Query("usr_petani")):
    """
    Menandai seluruh notifikasi pengguna telah dibaca.
    """
    notifs = db.get_collection("notifications")
    for n in notifs:
        if n.get("user_id") == user_id and not n.get("is_read"):
            db.update("notifications", n["id"], {"is_read": True})
    return {"message": "Semua notifikasi telah ditandai dibaca"}

# ==============================================================================
# MANAJEMEN PESANAN SELLER & PEMANTAUAN STATUS PEMBELI
# ==============================================================================

@router.get("/orders/seller", response_model=List[Dict[str, Any]])
def get_seller_orders(seller_id: str = Query(...)):
    """
    Mengambil daftar pesanan masuk dari pembeli untuk layanan/jasa yang dijual oleh seller ini.
    """
    orders = db.get_collection("service_orders")
    seller_orders = [o for o in orders if o.get("seller_id") == seller_id]
    seller_orders.sort(key=lambda x: x.get("created_at", ""), reverse=True)
    return seller_orders

@router.get("/orders/buyer", response_model=List[Dict[str, Any]])
def get_buyer_orders(buyer_id: str = Query(...)):
    """
    Mengambil daftar pesanan yang dilakukan oleh pembeli ini untuk dipantau status pengerjaannya.
    """
    orders = db.get_collection("service_orders")
    buyer_orders = [o for o in orders if o.get("buyer_id") == buyer_id]
    buyer_orders.sort(key=lambda x: x.get("created_at", ""), reverse=True)
    return buyer_orders

@router.patch("/orders/{order_id}/status", response_model=Dict[str, Any])
def update_order_status(order_id: str, payload: UpdateServiceOrderStatus):
    """
    Seller mengonfirmasi pesanan masuk: apakah mulai dikirim / dikerjakan,
    stok habis, selesai, atau dibatalkan, beserta catatan langsung untuk pembeli.
    Memicu notifikasi status real-time ke akun pembeli.
    """
    orders = db.get_collection("service_orders")
    order = next((o for o in orders if o.get("id") == order_id), None)
    if not order:
        raise HTTPException(status_code=404, detail="Pesanan tidak ditemukan")

    updates = {
        "status": payload.status,
        "seller_notes": payload.seller_notes or "",
        "status_updated_at": datetime.now().strftime("%d %b %Y, %H:%M WIB")
    }
    updated = db.update("service_orders", order_id, updates)

    # Menentukan teks dan emoji notifikasi untuk Pembeli berdasarkan konfirmasi Seller
    notif_config = {
        "DIPROSES": ("Pesanan Sedang Diproses 🚜", "Pesanan Anda sedang dipersiapkan dan dijadwalkan oleh penyedia."),
        "SEDANG_DIKIRIM": ("Pesanan Mulai Dikirim / Berangkat 🚚", "Barang atau armada pengerjaan sedang menuju ke lokasi lahan Anda."),
        "SELESAI": ("Pesanan Telah Tuntas & Selesai ✅", "Penyedia telah menyelesaikan layanan/pengiriman pesanan Anda."),
        "STOK_HABIS": ("Pemberitahuan: Stok Habis / Jadwal Penuh ⚠️", "Penyedia mengabarkan bahwa stok barang atau slot jadwal pengerjaan sedang tidak tersedia."),
        "DIBATALKAN": ("Pesanan Dibatalkan ❌", "Pesanan Anda tidak dapat diproses oleh penyedia.")
    }

    title, default_msg = notif_config.get(payload.status, ("Status Pesanan Diperbarui 📦", "Status pesanan Anda telah diperbarui oleh penjual."))
    note_suffix = f" Catatan penjual: \"{payload.seller_notes}\"" if payload.seller_notes else f" {default_msg}"
    custom_msg = f"{order.get('seller_name', 'Penjual')} mengonfirmasi pesanan {order.get('service_title', '')}: [{payload.status}].{note_suffix}"

    buyer_notif = {
        "id": f"notif_{uuid.uuid4().hex[:8]}",
        "user_id": order.get("buyer_id", "usr_petani"),
        "title": title,
        "message": custom_msg,
        "type": "ORDER_STATUS",
        "reference_id": order_id,
        "is_read": False,
        "created_at": datetime.now().strftime("%d %b %Y, %H:%M WIB")
    }
    db.insert("notifications", buyer_notif)

    return {
        "status": "success",
        "message": f"Status pesanan berhasil diubah menjadi {payload.status}",
        "order": updated
    }


# ==========================================
# 9. DISKUSI PESANAN / TRANSAKSI & PRODUK
# ==========================================

@router.get("/orders/{order_id}/messages", response_model=List[OrderMessage])
def get_order_messages(order_id: str):
    """
    Mengambil seluruh riwayat percakapan / obrolan diskusi pada pesanan tertentu.
    """
    all_msgs = db.get_collection("order_messages")
    return [m for m in all_msgs if m.get("order_id") == order_id]


@router.post("/orders/{order_id}/messages", response_model=OrderMessage)
def send_order_message(order_id: str, payload: CreateOrderMessage):
    """
    Mengirim pesan obrolan baru di dalam transaksi pesanan.
    Otomatis mengirimkan notifikasi ke pihak lawan (pembeli/penjual).
    """
    orders = db.get_collection("service_orders")
    order = next((o for o in orders if o.get("id") == order_id), None)
    if not order:
        raise HTTPException(status_code=404, detail="Pesanan tidak ditemukan")

    is_buyer = (payload.sender_id == order.get("buyer_id"))
    sender_role = "PEMBELI" if is_buyer else "PENJUAL"
    recipient_id = order.get("seller_id") if is_buyer else order.get("buyer_id")

    msg_obj = {
        "id": f"msg_{uuid.uuid4().hex[:8]}",
        "order_id": order_id,
        "sender_id": payload.sender_id,
        "sender_name": payload.sender_name,
        "sender_role": sender_role,
        "message": payload.message,
        "created_at": datetime.now().strftime("%d %b %Y, %H:%M WIB")
    }
    db.insert("order_messages", msg_obj)

    # Kirim notifikasi ke lawan transaksi
    if recipient_id:
        notif = {
            "id": f"notif_{uuid.uuid4().hex[:8]}",
            "user_id": recipient_id,
            "title": "Pesan Diskusi Pesanan 💬",
            "message": f"{payload.sender_name}: \"{payload.message[:60]}...\"",
            "type": "ORDER_DISCUSSION",
            "reference_id": order_id,
            "is_read": False,
            "created_at": datetime.now().strftime("%d %b %Y, %H:%M WIB")
        }
        db.insert("notifications", notif)

    return msg_obj


@router.get("/services/{service_id}/discussions", response_model=List[ProductDiscussion])
def get_service_discussions(service_id: str):
    """
    Mengambil tanya jawab publik / diskusi terkait layanan atau produk katalog.
    """
    all_disc = db.get_collection("product_discussions")
    return [d for d in all_disc if d.get("service_id") == service_id]


@router.post("/services/{service_id}/discussions", response_model=ProductDiscussion)
def create_service_discussion(service_id: str, payload: CreateProductDiscussion):
    """
    Mengajukan pertanyaan publik pada layanan atau produk di katalog.
    """
    services = db.get_collection("ecosystem_services")
    service = next((s for s in services if s.get("id") == service_id), None)
    if not service:
        raise HTTPException(status_code=404, detail="Layanan tidak ditemukan")

    disc_obj = {
        "id": f"disc_{uuid.uuid4().hex[:8]}",
        "service_id": service_id,
        "user_id": payload.user_id,
        "user_name": payload.user_name,
        "user_avatar": payload.user_avatar or "🌾",
        "question": payload.question,
        "reply": None,
        "replied_by": None,
        "replied_at": None,
        "created_at": datetime.now().strftime("%d %b %Y, %H:%M WIB")
    }
    db.insert("product_discussions", disc_obj)

    # Beritahu penyedia layanan jika bukan dia sendiri yang bertanya
    provider_id = service.get("provider_id")
    if provider_id and provider_id != payload.user_id:
        notif = {
            "id": f"notif_{uuid.uuid4().hex[:8]}",
            "user_id": provider_id,
            "title": "Pertanyaan Baru di Produk Anda! ❓",
            "message": f"{payload.user_name} bertanya di \"{service.get('title', '')}\": \"{payload.question[:60]}...\"",
            "type": "PRODUCT_DISCUSSION",
            "reference_id": service_id,
            "is_read": False,
            "created_at": datetime.now().strftime("%d %b %Y, %H:%M WIB")
        }
        db.insert("notifications", notif)

    return disc_obj


@router.post("/services/{service_id}/discussions/{discussion_id}/reply", response_model=ProductDiscussion)
def reply_service_discussion(service_id: str, discussion_id: str, payload: ReplyProductDiscussion):
    """
    Penyedia layanan menjawab pertanyaan diskusi publik.
    """
    services = db.get_collection("ecosystem_services")
    service = next((s for s in services if s.get("id") == service_id), None)

    discussions = db.get_collection("product_discussions")
    disc = next((d for d in discussions if d.get("id") == discussion_id), None)
    if not disc:
        raise HTTPException(status_code=404, detail="Diskusi tidak ditemukan")

    updates = {
        "reply": payload.reply,
        "replied_by": payload.replied_by,
        "replied_at": datetime.now().strftime("%d %b %Y, %H:%M WIB")
    }
    updated = db.update("product_discussions", discussion_id, updates)

    # Beritahu penanya bahwa ada jawaban
    asker_id = disc.get("user_id")
    if asker_id:
        svc_title = service.get("title", "") if service else "Layanan"
        notif = {
            "id": f"notif_{uuid.uuid4().hex[:8]}",
            "user_id": asker_id,
            "title": "Jawaban Diskusi Produk 💡",
            "message": f"{payload.replied_by} menjawab pertanyaan Anda di \"{svc_title}\": \"{payload.reply[:60]}...\"",
            "type": "PRODUCT_DISCUSSION",
            "reference_id": service_id,
            "is_read": False,
            "created_at": datetime.now().strftime("%d %b %Y, %H:%M WIB")
        }
        db.insert("notifications", notif)

    return updated



