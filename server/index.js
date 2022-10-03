const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8080;

app.get("/video", (req, res) => {
  res.sendFile(path.join(__dirname, "assest", "sample.mp4"));
});

app.listen(PORT, () => console.log("app litening ..."));
