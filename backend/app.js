import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1> Image Processing App </h1>");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
