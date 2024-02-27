var express = require("express");
const app = express();
var gtts = require("node-gtts")("en");
const cors = require("cors");
app.use(cors());

app.get("/speech", async function (req, res) {
  let text = req.query.text;
  try {
    res.set({ "Content-Type": "audio/mpeg" });
    gtts
      .stream(text)
      .pipe(res)
      .on("error", (error) => {
        console.error("Error:", error);
        res.status(500).json({ error: "Error getting response." });
      });
  } catch (error) {
    res.status(500).json({ error: "Error getting response." });
  }
});

app.listen(5001, function () {
  console.log("server stated at 5001");
});
