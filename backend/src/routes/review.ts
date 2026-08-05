import { Router } from "express";
import ReviewService from "../services/ReviewService.js";

const router = Router();

router.post("/", async (req, res) => {
  const result = await ReviewService.review(req.body);

  res.json(result);
});

export default router;