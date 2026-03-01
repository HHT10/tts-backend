import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

// 🧠 Middlewares
app.use(cors());
app.use(express.json());

// 🔓 CORS extra (por si el navegador se pone intenso)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// 🎤 ENDPOINT TTS
app.post("/hablar", async (req, res) => {
  try {
    const { texto } = req.body;

    if (!texto) {
      return res.status(400).json({ error: "Falta el texto" });
    }

    if (!process.env.ELEVENLABS_API_KEY) {
      return res.status(500).json({
        error: "API KEY de ElevenLabs no definida en variables de entorno"
      });
    }

    const response = await axios.post(
      "https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb",
      {
        text: texto,
        model_id: "eleven_multilingual_v1"
      },
      {
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
          "Accept": "audio/mpeg"
        },
        responseType: "arraybuffer"
      }
    );

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(response.data);

  } catch (error) {
    // 🔥 ERROR REAL DECODIFICADO
    if (error.response?.data) {
      const decoded = Buffer.from(error.response.data).toString("utf-8");
      console.error("🔥 ERROR REAL:", decoded);
      return res.status(500).json({
        error: "Error ElevenLabs",
        detalle: JSON.parse(decoded)
      });
    }

    console.error("🔥 ERROR DESCONOCIDO:", error.message);
    res.status(500).json({ error: "Error generando audio" });
  }
});

// 🚀 PUERTO (Render o local)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT} 🟢`);
});