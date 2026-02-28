app.post("/hablar", async (req, res) => {
  try {
    const texto = req.body.texto;

    const response = await axios.post(
      "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM",
      {
        text: texto,
        model_id: "eleven_monolingual_v1"
      },
      {
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer"
      }
    );

    res.set({
      "Content-Type": "audio/mpeg"
    });

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generando audio");
  }
});