import express from "express";
import cors from "cors";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const app = express();

// ─────────────────────────────
// Middlewares
// ─────────────────────────────
app.use(cors());
app.use(express.json());

// ─────────────────────────────
// ElevenLabs client
// ─────────────────────────────
const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

// ─────────────────────────────
// Endpoint TTS
// ─────────────────────────────
app.post("/hablar", async (req, res) => {
  try {
    const { texto } = req.body;

    if (!texto) {
      return res.status(400).json({ error: "Texto requerido" });
    }

    const audioStream = await elevenlabs.textToSpeech.convert(
      "JBFqnCBsd6RMkjVDRZzb", // voice_id
      {
        text: texto,
        modelId: "eleven_multilingual_v2",
        outputFormat: "mp3_44100_128",
      }
    );

    res.setHeader("Content-Type", "audio/mpeg");

    // Stream del audio (correcto para backend)
    for await (const chunk of audioStream) {
      res.write(chunk);
    }
    res.end();

  } catch (error) {
    console.error("🔥 ERROR REAL:", error?.response?.data || error);
    res.status(500).json({ error: "Error generando audio" });
  }
});

// ─────────────────────────────
// Puerto (Render)
// ─────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🟢 Servidor escuchando en puerto ${PORT}`);
});