 const path = require("path");
 const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const app = express();
app.use(express.json());
const genAI = new GoogleGenerativeAI("");
app.use(express.static(__dirname + "/.."));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.post("/chat", async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(req.body.message);

    const response = await result.response.text();

    res.json({
      reply: response,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});