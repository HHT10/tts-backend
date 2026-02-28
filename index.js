import express from "express";
import axios from "axios";

const app = express();

app.use(express.json());

// 🔓 CORS FORZADO (manual, infalible)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// 🎤 ENDPOINT
app.post("/hablar", async (req, res) => {
  try {
    const { texto } = req.body;

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
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generando audio");
  }
});

// 🚀 PUERTO (Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor escuchando 🟢");
});