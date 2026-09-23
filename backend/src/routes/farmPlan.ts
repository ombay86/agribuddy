import { Router, Request, Response } from 'express';
import { plannerService } from '../services/plannerService.js';
import { db } from '../database/db.js';

const router = Router();

// POST /calculate
router.post('/calculate', (req: Request, res: Response) => {
  const payload = req.body;
  const userId = (req.query.user_id as string) || "usr_petani";

  if (!payload.land_size_ha || payload.land_size_ha <= 0) {
    return res.status(400).json({ detail: "Luas lahan harus lebih besar dari 0 Ha." });
  }

  const plan = plannerService.calculatePlan({
    land_size_ha: payload.land_size_ha,
    commodity: payload.commodity,
    soil_type: payload.soil_type,
    water_source: payload.water_source,
    location: payload.location,
    latitude: payload.latitude,
    longitude: payload.longitude,
    coordinates_label: payload.coordinates_label,
    user_id: userId
  });

  const dbPlans = db.getCollection("farm_plans");
  const existing = dbPlans.find((p: any) => p.user_id === userId);

  if (existing) {
    db.update("farm_plans", existing.id, plan);
  } else {
    db.insert("farm_plans", plan);
  }

  res.json(plan);
});

// GET /active
router.get('/active', (req: Request, res: Response) => {
  const userId = (req.query.user_id as string) || "usr_petani";
  const dbPlans = db.getCollection("farm_plans");
  let plan = dbPlans.find((p: any) => p.user_id === userId);

  if (!plan) {
    plan = plannerService.calculatePlan({
      land_size_ha: 1.0,
      commodity: "Padi Sawah Inpari 32",
      soil_type: "Lempung Berliat (Subur)",
      water_source: "Irigasi Teknis Bendungan",
      location: "Sukamaju, Jawa Timur",
      user_id: userId
    });
    db.insert("farm_plans", plan);
  }

  res.json(plan);
});

// PATCH /:planId/step
router.patch('/:planId/step', (req: Request, res: Response) => {
  const { planId } = req.params;
  const { step_no, status, actual_cost } = req.body;

  const dbPlans = db.getCollection("farm_plans");
  const plan = dbPlans.find((p: any) => p.plan_id === planId || p.id === planId);

  if (!plan) {
    return res.status(404).json({ detail: "Rencana tani tidak ditemukan." });
  }

  const timeline = plan.timeline_phases || [];
  let found = false;

  for (const step of timeline) {
    if (step.step_no === step_no) {
      step.status = status;
      if (actual_cost !== undefined) {
        step.actual_cost = actual_cost;
      }
      found = true;
      break;
    }
  }

  if (!found) {
    return res.status(404).json({ detail: `Langkah nomor ${step_no} tidak ditemukan.` });
  }

  db.update("farm_plans", plan.id, { timeline_phases: timeline });
  res.json(plan);
});

export default router;
