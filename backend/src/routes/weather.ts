import { Router, Request, Response } from 'express';
import { getWeatherAndRecommendation } from '../services/weatherService.js';

const router = Router();

router.get('/current', (req: Request, res: Response) => {
  const lat = req.query.lat ? parseFloat(req.query.lat as string) : -7.25;
  const lon = req.query.lon ? parseFloat(req.query.lon as string) : 112.75;
  const village = (req.query.village as string) || "Desa Sukamaju";

  const data = getWeatherAndRecommendation(lat, lon, village);
  res.json(data);
});

export default router;
