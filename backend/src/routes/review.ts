import { Router } from "express";
import ReviewService from "../services/ReviewService.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const {
      imageBase64,
      mimeType,
      people,
      healthConsiderations,
    } = req.body;

    if (!imageBase64) {
      return res.status(400).json({
        error: "Image is required.",
      });
    }

    const result = await ReviewService.reviewImage({
      imageBase64,
      mimeType: mimeType || "image/jpeg",
      people: Array.isArray(people) ? people : [],
      healthConsiderations: Array.isArray(
        healthConsiderations
      )
        ? healthConsiderations
        : [],
    });

    res.json(result);
  } catch (error) {
    console.error("Review error:", error);

    res.status(500).json({
      error: "Unable to review the product.",
    });
  }
});

export default router;
