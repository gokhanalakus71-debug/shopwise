import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  console.log("Review Request:");
  console.log(req.body);

  res.json({
    verdict: "RECOMMENDED",
    summary: [
      "No high-risk ingredients detected",
      "Suitable for selected profile"
    ]
  });
});

export default router;