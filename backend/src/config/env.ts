import dotenv from 'dotenv';
import path from 'path';

// Muat file .env dari root folder backend
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const config = {
  port: parseInt(process.env.PORT || '8000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  apiV1Str: process.env.API_V1_STR || '/api/v1',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
};
