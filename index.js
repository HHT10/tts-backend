import express from "express";
import axios from "axios";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.options("*", (req, res) => {
  res.sendStatus(200);
});

app.post("/hablar", async (req, res) => {
  // aquí va ElevenLabs
});

app.listen(3000, () => {
  console.log("Servidor escuchando 🟢");
});