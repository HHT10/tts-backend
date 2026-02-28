const express = require("express");

const app = express();
app.use(express.json()); // 👈 para entender texto

app.post("/hablar", (req, res) => {
  const texto = req.body.texto;
  console.log("Me dijeron:", texto);

  res.send("Recibí esto: " + texto);
});

app.listen(3000, () => {
  console.log("Servidor escuchando 🟢");
});