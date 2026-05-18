import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/uploadRouter.js"

const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  const title = "Image Processing App";
  const desc = "This app will be crazy";


  res.send({title, desc});
});

app.use("/upload", uploadRoutes)

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
