from fastapi import APIRouter, HTTPException, Query
from typing import Dict, Any, Optional
from app.models.schemas import FarmPlanRequest, FarmPlanStepUpdate
from app.services.planner_service import planner_service
from app.core.database import db

router = APIRouter(prefix="/farm-plan", tags=["Rencana Tani & Kalkulator Modal AI"])

@router.post("/calculate", response_model=Dict[str, Any])
def calculate_farm_plan(payload: FarmPlanRequest, user_id: str = "usr_001"):
    """
    Kalkulasi Rencana Anggaran Biaya (RAB), proyeksi panen, 
    analisis laba kotor/bersih, dan timeline monitoring cerdas berbasis AI.
    """
    if payload.land_size_ha <= 0:
        raise HTTPException(status_code=400, detail="Luas lahan harus lebih besar dari 0 Ha.")
    
    plan = planner_service.calculate_plan(
        land_size_ha=payload.land_size_ha,
        commodity=payload.commodity or "Padi Sawah Inpari 32",
        soil_type=payload.soil_type or "Lempung Berliat (Subur)",
        water_source=payload.water_source or "Irigasi Teknis Bendungan",
        location=payload.location or "Sukamaju, Jawa Timur",
        latitude=payload.latitude if payload.latitude is not None else -7.2504,
        longitude=payload.longitude if payload.longitude is not None else 112.7512,
        coordinates_label=payload.coordinates_label or f"{payload.latitude or -7.2504:.4f}, {payload.longitude or 112.7512:.4f}",
        user_id=user_id
    )


    # Simpan atau timpa active plan di database
    db_plans = db.get_collection("farm_plans")
    existing = next((p for p in db_plans if p.get("user_id") == user_id), None)
    
    if existing:
        db.update("farm_plans", existing["id"], plan)
    else:
        db.insert("farm_plans", plan)

    return plan

@router.get("/active", response_model=Dict[str, Any])
def get_active_farm_plan(user_id: str = "usr_001"):
    """
    Mengambil rencana tani aktif petani saat ini beserta progres aktualnya.
    Jika belum ada rencana tersimpan, otomatis buatkan rencana default 1.0 Ha.
    """
    db_plans = db.get_collection("farm_plans")
    plan = next((p for p in db_plans if p.get("user_id") == user_id), None)
    
    if not plan:
        # Generate default plan 1.0 Ha untuk petani
        plan = planner_service.calculate_plan(
            land_size_ha=1.0,
            commodity="Padi Sawah Inpari 32",
            soil_type="Lempung Berliat (Subur)",
            water_source="Irigasi Teknis Bendungan",
            location="Sukamaju, Jawa Timur",
            user_id=user_id
        )
        db.insert("farm_plans", plan)
        
    return plan

@router.patch("/{plan_id}/step", response_model=Dict[str, Any])
def update_plan_step(plan_id: str, payload: FarmPlanStepUpdate):
    """
    Memperbarui status tahapan monitoring (BELUM, SEDANG_BERJALAN, SELESAI) 
    dan mencatat pengeluaran biaya aktual riil oleh petani.
    """
    db_plans = db.get_collection("farm_plans")
    plan = next((p for p in db_plans if p.get("plan_id") == plan_id or p.get("id") == plan_id), None)
    
    if not plan:
        raise HTTPException(status_code=404, detail="Rencana tani tidak ditemukan.")

    timeline = plan.get("timeline_phases", [])
    found = False
    for step in timeline:
        if step.get("step_no") == payload.step_no:
            step["status"] = payload.status
            if payload.actual_cost is not None:
                step["actual_cost"] = payload.actual_cost
            found = True
            break

    if not found:
        raise HTTPException(status_code=404, detail=f"Langkah nomor {payload.step_no} tidak ditemukan.")

    db.update("farm_plans", plan["id"], {"timeline_phases": timeline})
    return plan
