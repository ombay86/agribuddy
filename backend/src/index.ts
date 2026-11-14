import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import { db } from './database/db.js';

import authRouter from './routes/auth.js';
import weatherRouter from './routes/weather.js';
import inventoryRouter from './routes/inventory.js';
import harvestRouter from './routes/harvest.js';
import aiDiagnoseRouter from './routes/aiDiagnose.js';
import networkRouter from './routes/network.js';
import farmPlanRouter from './routes/farmPlan.js';
import catalogRouter from './routes/catalog.js';
import farmlandsRouter from './routes/farmlands.js';
import notificationsRouter from './routes/notifications.js';

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['*']
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Routing API v1
const api = express.Router();
api.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    isPostgresActive: (db as any).isPostgresActive,
    farmlandsCount: db.getCollection("farmlands").length,
    usersCount: db.getCollection("users").length,
    inventoryCount: db.getCollection("inventory").length
  });
});
api.use('/auth', authRouter);
api.use('/weather', weatherRouter);
api.use('/inventory', inventoryRouter);
api.use('/harvest', harvestRouter);
api.use('/ai', aiDiagnoseRouter);
api.use('/network', networkRouter);
api.use('/farm-plan', farmPlanRouter);
api.use('/catalog', catalogRouter);
api.use('/farmlands', farmlandsRouter);
api.use('/notifications', notificationsRouter);
api.use('/catalog/notifications', notificationsRouter);

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

let isInitialized = false;
async function ensureDbInit() {
  if (!isInitialized) {
    await db.initPostgres();
    isInitialized = true;
  }
}

// Middleware untuk memastikan koneksi database aktif di lingkungan serverless Vercel
app.use(async (req, res, next) => {
  try {
    await ensureDbInit();
    next();
  } catch (err) {
    next(err);
  }
});

async function bootstrap() {
  await ensureDbInit();

  app.listen(config.port, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`AgriBuddy Backend (Node.js) is RUNNING on port ${config.port}`);
    console.log(`Base API URL: http://127.0.0.1:${config.port}${config.apiV1Str}`);
    console.log(`AI Engine: Google Gemini API Multimodal Vision`);
    console.log(`=======================================================`);
  });
}

if (!process.env.VERCEL) {
  bootstrap();
}

export default app;
