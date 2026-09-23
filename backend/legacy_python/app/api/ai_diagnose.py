from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional, Dict, Any, List
from app.models.schemas import DiagnosisResponse
from app.services.ai_service import analyze_leaf_image, DISEASE_KNOWLEDGE_BASE
from app.core.database import db

router = APIRouter(prefix="/ai", tags=["Dokter Tani - AI Diagnosis Daun"])

@router.post("/diagnose", response_model=DiagnosisResponse)
async def diagnose_leaf(
    file: Optional[UploadFile] = File(None),
    sample_key: Optional[str] = Form(None)
):
    """
    Mendiagnosis penyakit daun padi via unggahan foto citra daun atau preset contoh uji.
    """
    if sample_key and sample_key in DISEASE_KNOWLEDGE_BASE:
        from datetime import datetime
        import random
        data = DISEASE_KNOWLEDGE_BASE[sample_key]
        result = {
            "disease_name": data["name"],
            "english_name": data["english"],
            "confidence": round(random.uniform(0.92, 0.96), 2),
            "severity": data["severity"],
            "symptoms": data["symptoms"],
            "actions": data["actions"],
            "detected_at": datetime.now().strftime("%d %b %Y, %H:%M WIB")
        }
    elif file:
        content = await file.read()
        result = analyze_leaf_image(content, filename=file.filename or "")
    else:
        raise HTTPException(status_code=400, detail="Silakan unggah foto daun atau pilih sampel foto")
        
    # Simpan ke riwayat diagnosis di database
    db.insert("diagnoses", {
        "disease_name": result["disease_name"],
        "confidence": result["confidence"],
        "severity": result["severity"],
        "detected_at": result["detected_at"]
    })
    
    return result

@router.get("/samples")
def get_sample_options():
    """
    Daftar sampel daun sakit untuk kemudahan demo cepat tanpa perlu menyiapkan foto eksternal.
    """
    return [
        {
            "key": "bacterial_blight",
            "title": "Sampel 1: Daun Menguning Kering di Ujung",
            "hint": "Ciri khas Hawar Daun Bakteri (Kresek)"
        },
        {
            "key": "leaf_blast",
            "title": "Sampel 2: Bercak Belah Ketupat Abu-abu",
            "hint": "Ciri khas Jamur Blas Daun (Pyricularia)"
        },
        {
            "key": "brown_spot",
            "title": "Sampel 3: Bercak Coklat Bulat Merata",
            "hint": "Ciri khas Penyakit Bercak Coklat"
        },
        {
            "key": "healthy",
            "title": "Sampel 4: Daun Hijau Segar",
            "hint": "Daun Padi Sehat Tanpa Gejala Penyakit"
        }
    ]

@router.get("/history")
def get_diagnosis_history():
    return db.get_collection("diagnoses")
