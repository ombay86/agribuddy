import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from './config/env.js';

import authRouter from './routes/auth.js';
import weatherRouter from './routes/weather.js';
import inventoryRouter from './routes/inventory.js';
import harvestRouter from './routes/harvest.js';
import aiDiagnoseRouter from './routes/aiDiagnose.js';
import networkRouter from './routes/network.js';
import socialMarketRouter from './routes/socialMarket.js';
import farmPlanRouter from './routes/farmPlan.js';
import catalogRouter from './routes/catalog.js';
import farmlandsRouter from './routes/farmlands.js';

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['*']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing API v1
const api = express.Router();
api.use('/auth', authRouter);
api.use('/weather', weatherRouter);
api.use('/inventory', inventoryRouter);
api.use('/harvest', harvestRouter);
api.use('/ai', aiDiagnoseRouter);
api.use('/network', networkRouter);
api.use('/social-market', socialMarketRouter);
api.use('/farm-plan', farmPlanRouter);
api.use('/catalog', catalogRouter);
api.use('/farmlands', farmlandsRouter);

app.use(config.apiV1Str, api);

// Root Endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    app: "AgriBuddy API",
    status: "Online",
    engine: "Node.js (Express + TypeScript)",
    version: "2.0.0",
    ai_integration: "Google Gemini 2.5 Flash Vision Multimodal",
    base_url: `http://127.0.0.1:${config.port}${config.apiV1Str}`
  });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    detail: err.message || "Terjadi kesalahan internal pada server backend"
  });
});

app.listen(config.port, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🚀 AgriBuddy Backend (Node.js) is RUNNING on port ${config.port}`);
  console.log(`📡 Base API URL: http://127.0.0.1:${config.port}${config.apiV1Str}`);
  console.log(`🤖 AI Engine: Google Gemini API Multimodal Vision`);
  console.log(`=======================================================`);
});

export default app;
