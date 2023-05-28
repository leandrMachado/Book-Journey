require("dotenv").config();

const express = require("express");
const serve_static = require("serve-static");
const path = require("path");

const PORT = process.env.PORT || 3000;
const public_directory =
  process.env.PUBLICDIRECTORY || path.join(__dirname, "./public");
const app = express();

app.use(express.static(public_directory));

app.use(serve_static(public_directory, { index: ["index.html", "index.htm"] }));

app.listen(PORT, () => {
  console.log(`[Server] listening on port ${PORT}`);
});
