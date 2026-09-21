import uuid
from datetime import datetime
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, HTTPException, Query
from app.models.schemas import (
    ShopProduct, SaprotanOrderCreate, UpdateOrderStatus,
    MarketListingCreate, MarketListingBid,
    CommunityPostCreate, CommunityCommentCreate
)
from app.core.database import db

router = APIRouter(prefix="/social-market", tags=["Ekosistem Sosial & Perdagangan Tertutup"])

# ==============================================================================
# 1. KIOS SAPROTAN & PEMESANAN IN-APP (Petani <-> Distributor)
# ==============================================================================

@router.get("/products", response_model=List[Dict[str, Any]])
def get_shop_products(category: Optional[str] = Query(None)):
    products = db.get_collection("shop_products")
    if category and category != "SEMUA":
        return [p for p in products if p.get("category") == category]
    return products

@router.post("/orders")
def create_saprotan_order(payload: SaprotanOrderCreate):
    products = db.get_collection("shop_products")
    product = next((p for p in products if p.get("id") == payload.product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Produk saprotan tidak ditemukan")
    
    if product.get("stock_available", 0) < payload.quantity:
        raise HTTPException(status_code=400, detail="Stok produk di kios tidak mencukupi")
    
    # Kurangi stok di kios distributor
    new_stock = product["stock_available"] - payload.quantity
    db.update("shop_products", product["id"], {"stock_available": new_stock})
    
    total_price = payload.quantity * product["price"]
    order_item = {
        "product_id": product["id"],
        "product_name": product["name"],
        "product_type": product["category"],
        "quantity": payload.quantity,
        "unit": product["unit"],
        "total_price": total_price,
        "buyer_name": payload.buyer_name,
        "seller_name": product["seller_name"],
        "payment_method": payload.payment_method,
        "status": "DIPESAN",
        "delivery_note": payload.delivery_note or "Pengambilan langsung di kios",
        "created_at": datetime.now().strftime("%d %b %Y, %H:%M WIB")
    }
    inserted = db.insert("saprotan_orders", order_item)
    return inserted

@router.get("/orders")
def get_saprotan_orders():
    return db.get_collection("saprotan_orders")

@router.patch("/orders/{order_id}/status")
def update_order_status(order_id: str, payload: UpdateOrderStatus):
    orders = db.get_collection("saprotan_orders")
    order = next((o for o in orders if o.get("id") == order_id), None)
    if not order:
        raise HTTPException(status_code=404, detail="Pesanan tidak ditemukan")
    
    updated = db.update("saprotan_orders", order_id, {"status": payload.status})
    
    # KUNCI INTEGRASI EKOSISTEM:
    # Saat pesanan berstatus "SELESAI", otomatis tambahkan barang tersebut ke Buku Tani (Inventory) Petani!
    if payload.status == "SELESAI":
        inventory_items = db.get_collection("inventory")
        existing = next((i for i in inventory_items if i.get("name") == order["product_name"]), None)
        if existing:
            new_qty = existing.get("quantity", 0) + order["quantity"]
            db.update("inventory", existing["id"], {"quantity": new_qty})
        else:
            db.insert("inventory", {
                "user_id": "usr_001",
                "name": order["product_name"],
                "type": order.get("product_type", "PUPUK"),
                "quantity": float(order["quantity"]),
                "unit": order.get("unit", "Karung"),
                "min_threshold": 2.0,
                "notes": f"Dibeli dari {order.get('seller_name')} via AgriBuddy",
                "updated_at": datetime.now().isoformat()
            })
            
    return {
        "order": updated,
        "message": f"Status pesanan diubah ke {payload.status}. Stok otomatis tersinkronisasi ke Buku Tani!" if payload.status == "SELESAI" else f"Status diubah ke {payload.status}"
    }

# ==============================================================================
# 2. BURSA PASAR PANEN (Petani <-> Agen / Penggilingan / Pasar Akhir)
# ==============================================================================

@router.get("/listings")
def get_market_listings():
    return db.get_collection("market_listings")

@router.post("/listings")
def create_market_listing(payload: MarketListingCreate):
    listing_item = {
        "seller_id": payload.seller_id or "usr_petani",
        "seller_name": payload.seller_name,
        "harvest_ref_id": payload.harvest_ref_id,
        "commodity": payload.commodity,
        "total_weight_kg": payload.total_weight_kg,
        "starting_price_per_kg": payload.starting_price_per_kg,
        "min_order_kg": payload.min_order_kg,
        "location": payload.location,
        "status": "DIBUKA",
        "notes": payload.notes,
        "created_at": datetime.now().strftime("%d %b %Y, %H:%M WIB"),
        "bids": []
    }
    inserted = db.insert("market_listings", listing_item)
    return inserted

@router.post("/listings/{listing_id}/bids")
def submit_listing_bid(listing_id: str, payload: MarketListingBid):
    listings = db.get_collection("market_listings")
    target = next((l for l in listings if l.get("id") == listing_id), None)
    if not target:
        raise HTTPException(status_code=404, detail="Listing panen tidak ditemukan")
    
    bids = target.get("bids", [])
    new_bid = {
        "id": f"bid_{uuid.uuid4().hex[:6]}",
        "listing_id": listing_id,
        "bidder_id": payload.bidder_id or "usr_agen",
        "bidder_name": payload.bidder_name,
        "bidder_role": payload.bidder_role,
        "bid_price_per_kg": payload.bid_price_per_kg,
        "bid_weight_kg": payload.bid_weight_kg,
        "notes": payload.notes,
        "status": "MENUNGGU",
        "created_at": datetime.now().strftime("%d %b %Y, %H:%M WIB")
    }
    bids.append(new_bid)
    db.update("market_listings", listing_id, {"bids": bids})
    return new_bid

@router.post("/listings/{listing_id}/accept-bid/{bid_id}")
def accept_listing_bid(listing_id: str, bid_id: str):
    listings = db.get_collection("market_listings")
    target = next((l for l in listings if l.get("id") == listing_id), None)
    if not target:
        raise HTTPException(status_code=404, detail="Listing tidak ditemukan")
    
    bids = target.get("bids", [])
    accepted_bid = None
    for b in bids:
        if b.get("id") == bid_id:
            b["status"] = "DISETUJUI"
            accepted_bid = b
        else:
            b["status"] = "DITOLAK"
            
    db.update("market_listings", listing_id, {
        "status": "TERJUAL",
        "bids": bids,
        "accepted_bid": accepted_bid
    })
    
    # KUNCI INTEGRASI EKOSISTEM:
    # Otomatis kurangi atau perbarui stok lumbung panen milik petani!
    harvests = db.get_collection("harvests")
    for h in harvests:
        if target["commodity"].lower() in h.get("commodity", "").lower():
            sisa = max(0.0, h.get("total_weight_kg", 0) - accepted_bid["bid_weight_kg"])
            status = "HABIS" if sisa == 0 else "TERJUAL_SEBAGIAN"
            db.update("harvests", h["id"], {
                "total_weight_kg": sisa,
                "status": status,
                "notes": f"Terjual {accepted_bid['bid_weight_kg']} kg ke {accepted_bid['bidder_name']} seharga Rp {accepted_bid['bid_price_per_kg']}/kg via Bursa AgriBuddy"
            })
            break
            
    return {
        "message": f"Penawaran dari {accepted_bid['bidder_name']} disetujui! Stok lumbung otomatis disesuaikan.",
        "accepted_bid": accepted_bid
    }

# ==============================================================================
# 3. FEED SOSIAL KOMUNITAS TANI (Sesama Petani & Kelompok Tani)
# ==============================================================================

@router.get("/posts")
def get_community_posts():
    return db.get_collection("community_posts")

@router.post("/posts")
def create_community_post(payload: CommunityPostCreate):
    role_labels = {
        "PETANI": "Petani",
        "KETUA_POKTAN": "Ketua Kelompok Tani",
        "PENYULUH": "Penyuluh Pertanian Lapangan",
        "DISTRIBUTOR": "Distributor Kios Saprotan"
    }
    cat_labels = {
        "TANYA_HAMA": "Hama & Penyakit",
        "INFO_POKTAN": "Info Poktan",
        "TIPS_TANI": "Tips Budidaya",
        "BERITA_HARGA": "Info Pasar"
    }
    new_post = {
        "author_id": payload.author_id or "usr_petani",
        "author_name": payload.author_name,
        "author_role": payload.author_role,
        "author_role_label": role_labels.get(payload.author_role, "Petani"),
        "title": payload.title,
        "content": payload.content,
        "category": payload.category,
        "category_label": cat_labels.get(payload.category, "Diskusi"),
        "created_at": datetime.now().strftime("%d %b %Y, %H:%M WIB"),
        "likes_count": 0,
        "comments": []
    }
    inserted = db.insert("community_posts", new_post)
    return inserted

@router.post("/posts/{post_id}/like")
def like_community_post(post_id: str):
    posts = db.get_collection("community_posts")
    target = next((p for p in posts if p.get("id") == post_id), None)
    if not target:
        raise HTTPException(status_code=404, detail="Postingan tidak ditemukan")
    
    new_likes = target.get("likes_count", 0) + 1
    updated = db.update("community_posts", post_id, {"likes_count": new_likes})
    return {"likes_count": new_likes}

@router.post("/posts/{post_id}/comments")
def add_post_comment(post_id: str, payload: CommunityCommentCreate):
    posts = db.get_collection("community_posts")
    target = next((p for p in posts if p.get("id") == post_id), None)
    if not target:
        raise HTTPException(status_code=404, detail="Postingan tidak ditemukan")
    
    comments = target.get("comments", [])
    new_comment = {
        "id": f"comm_{uuid.uuid4().hex[:6]}",
        "post_id": post_id,
        "author_id": payload.author_id or "usr_petani",
        "author_name": payload.author_name,
        "author_role": payload.author_role,
        "comment": payload.comment,
        "created_at": datetime.now().strftime("%d %b %Y, %H:%M WIB")
    }
    comments.append(new_comment)
    db.update("community_posts", post_id, {"comments": comments})

    # Memicu notifikasi in-app untuk pemilik postingan
    post_author = target.get("author_name", "")
    users = db.get_collection("users")
    author_user = next((u for u in users if u.get("full_name") == post_author), None)
    author_id = author_user["id"] if author_user else "usr_petani"

    # Hanya kirim notifikasi jika yang berkomentar bukan pemilik postingan itu sendiri
    if payload.author_name != post_author:
        db.insert("notifications", {
            "id": f"notif_{uuid.uuid4().hex[:8]}",
            "user_id": author_id,
            "title": "Komentar Baru di Diskusi! 💬",
            "message": f"{payload.author_name} mengomentari postingan Anda: \"{payload.comment[:50]}...\"",
            "type": "NEW_COMMENT",
            "reference_id": post_id,
            "is_read": False,
            "created_at": datetime.now().strftime("%d %b %Y, %H:%M WIB")
        })

    return new_comment
