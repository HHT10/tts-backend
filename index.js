import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(express.json());

// 🎤 ENDPOINT
app.post("/hablar", async (req, res) => {
  try {
    const { texto } = req.body;

    // 🧪 Validación
    if (!texto) {
      return res.status(400).json({ error: "No llegó texto" });
    }

    if (!process.env.ELEVENLABS_API_KEY) {
      return res.status(500).json({ error: "API Key no configurada" });
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
    console.error("🔥 ERROR REAL:", error.response?.data || error.message);
    res.status(500).send("Error generando audio");
  }
});

// 🚀 PUERTO
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor escuchando 🟢");
});