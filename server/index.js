const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());

app.get("/video", (req, res) => {
  // const filePath = path.join(__dirname, "assest", "sample.mp4");
  const filePath = "assest/sample.mp4";
  const stat = fs.statSync(filePath);
  const size = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
    const c = end - start;
    const chunkSize = c + 1;

    const header = {
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    };

    const fileStream = fs.createReadStream(filePath, { start, end });
    res.writeHead(204, header);
    fileStream.pipe(res);
  } else {
    const header = {
      "Content-Length": size,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, header);

    fs.createReadStream(filePath).pipe(res);
  }

  // console.log(stat);

  // res.sendFile(path.join(__dirname, "assest", "sample.mp4"));
});

app.listen(PORT, () => console.log("app litening ..."));
