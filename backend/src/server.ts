import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import reviewRouter from "./routes/review.js";
import ocrRouter from "./routes/ocr.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    application: "ShopWise API",
    status: "Running"
  });
});

app.use("/review", reviewRouter);
app.use("/ocr", ocrRouter);
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`🚀 ShopWise API running on port ${PORT}`);
});