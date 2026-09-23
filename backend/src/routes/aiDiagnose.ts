import { Router, Request, Response } from 'express';
import multer from 'multer';
import { geminiService, DISEASE_KNOWLEDGE_BASE } from '../services/geminiService.js';
import { db } from '../database/db.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// POST /diagnose
router.post('/diagnose', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const sampleKey = req.body.sample_key;

    let result;
    if (sampleKey && DISEASE_KNOWLEDGE_BASE[sampleKey]) {
      result = geminiService.getSampleDiagnosis(sampleKey);
    } else if (file) {
      result = await geminiService.diagnoseLeafImage(
        file.buffer,
        file.mimetype,
        file.originalname
      );
    } else {
      return res.status(400).json({ detail: "Silakan unggah foto daun atau pilih sampel foto" });
    }

    // Simpan ke riwayat diagnosa
    db.insert("diagnoses", {
      disease_name: result.disease_name,
      english_name: result.english_name,
      confidence: result.confidence,
      severity: result.severity,
      detected_at: result.detected_at,
      ai_provider: result.ai_provider
    });

    res.json(result);
  } catch (err: any) {
    console.error('Error in /ai/diagnose:', err);
    res.status(500).json({ detail: "Gagal memproses diagnosis daun: " + (err.message || err) });
  }
});

// GET /samples
router.get('/samples', (req: Request, res: Response) => {
  res.json([
    {
      key: "bacterial_blight",
      title: "Sampel 1: Daun Menguning Kering di Ujung",
      hint: "Ciri khas Hawar Daun Bakteri (Kresek)"
    },
    {
      key: "leaf_blast",
      title: "Sampel 2: Bercak Belah Ketupat Abu-abu",
      hint: "Ciri khas Jamur Blas Daun (Pyricularia)"
    },
    {
      key: "brown_spot",
      title: "Sampel 3: Bercak Coklat Bulat Merata",
      hint: "Ciri khas Penyakit Bercak Coklat"
    },
    {
      key: "healthy",
      title: "Sampel 4: Daun Hijau Segar",
      hint: "Daun Padi Sehat Tanpa Gejala Penyakit"
    }
  ]);
});

// GET /history
router.get('/history', (req: Request, res: Response) => {
  const diagnoses = db.getCollection("diagnoses");
  res.json(diagnoses);
});

export default router;
