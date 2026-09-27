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
    const customApiKey = req.headers['x-gemini-api-key'] as string | undefined;

    let result;
    if (sampleKey && DISEASE_KNOWLEDGE_BASE[sampleKey]) {
      result = geminiService.getSampleDiagnosis(sampleKey);
    } else if (file) {
      result = await geminiService.diagnoseLeafImage(
        file.buffer,
        file.mimetype,
        file.originalname,
        customApiKey
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

// ==================== AGRI-AI CONVERSATIONAL CHAT ====================

// POST /chat
router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { session_id, message, image_base64, history = [] } = req.body;
    const sessions = db.getCollection("ai_chat_sessions");

    const now = new Date();
    const timeStr = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' WIB';

    let currentSessionId = session_id;
    let session = sessions.find((s: any) => s.id === currentSessionId);

    const titleCandidate = (message || 'Konsultasi Tanaman')
      .replace(/\n+/g, ' ')
      .trim()
      .substring(0, 36);

    if (!session) {
      currentSessionId = `session_${Date.now()}`;
      session = db.insert("ai_chat_sessions", {
        id: currentSessionId,
        title: titleCandidate + (titleCandidate.length >= 36 ? '...' : ''),
        created_at: timeStr,
        updated_at: timeStr,
        messages: []
      });
    }

    // Panggil engine percakapan Agri AI (Gemini / Agronomy Fallback)
    const customApiKey = req.headers['x-gemini-api-key'] as string | undefined;
    const result = await geminiService.chatAgriAI(
      history,
      message,
      image_base64,
      'image/jpeg',
      customApiKey
    );

    // Simpan pesan User ke sesi
    const userMsg = {
      id: `msg_${Date.now()}_u`,
      role: 'user',
      content: message,
      image: image_base64 || null,
      timestamp: timeStr
    };

    // Simpan balasan AgriAI ke sesi
    const modelMsg = {
      id: `msg_${Date.now()}_m`,
      role: 'model',
      content: result.reply,
      detected_diagnosis: result.detectedDiagnosis || null,
      timestamp: timeStr
    };

    const updatedMessages = [...(session.messages || []), userMsg, modelMsg];
    const updatedSession = db.update("ai_chat_sessions", currentSessionId, {
      messages: updatedMessages,
      updated_at: timeStr
    });

    res.json({
      session_id: currentSessionId,
      reply: result.reply,
      detected_diagnosis: result.detectedDiagnosis || null,
      session: updatedSession
    });
  } catch (err: any) {
    console.error('Error in /ai/chat:', err);
    res.status(500).json({ detail: "Gagal memproses percakapan AgriAI: " + (err.message || err) });
  }
});

// GET /chat-sessions
router.get('/chat-sessions', (req: Request, res: Response) => {
  const sessions = db.getCollection("ai_chat_sessions");
  // Urutkan dari sesi terbaru
  const sorted = [...sessions].reverse().map((s: any) => ({
    id: s.id,
    title: s.title || "Konsultasi Pertanian",
    created_at: s.created_at,
    updated_at: s.updated_at,
    message_count: (s.messages || []).length
  }));
  res.json(sorted);
});

// GET /chat-sessions/:id
router.get('/chat-sessions/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const sessions = db.getCollection("ai_chat_sessions");
  const session = sessions.find((s: any) => s.id === id);
  if (!session) {
    return res.status(404).json({ detail: "Sesi percakapan tidak ditemukan" });
  }
  res.json(session);
});

// DELETE /chat-sessions/:id
router.delete('/chat-sessions/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const success = db.delete("ai_chat_sessions", id);
  if (!success) {
    return res.status(404).json({ detail: "Sesi percakapan tidak ditemukan" });
  }
  res.json({ message: "Sesi percakapan berhasil dihapus" });
});

export default router;
