import { Router } from "express";
import OCRService from "../services/OCRService.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { imageBase64, mimeType } = req.body;

    if (!imageBase64) {
      return res.status(400).json({
        success: false,
        text: "Image is required.",
      });
    }

    const result = await OCRService.extractText(
      imageBase64,
      mimeType || "image/jpeg"
    );

    res.json(result);
  } catch (error) {
    console.error("OCR error:", error);

    res.status(500).json({
      success: false,
      text: "Unable to read the ingredient list.",
    });
  }
});

export default router;
