import { Router } from "express";

import ReviewService from "../services/ReviewService.js";
import MembershipService from "../services/MembershipService.js";
import ReviewUsageService from "../services/ReviewUsageService.js";
import {
  AuthenticatedRequest,
  requireAuth,
} from "../middleware/firebaseAuth.js";

const router = Router();

router.post(
  "/",
  requireAuth,
  async (
    req: AuthenticatedRequest,
    res
  ) => {
    try {
      const uid = req.user?.uid;

      if (!uid) {
        return res.status(401).json({
          error: "Authentication required.",
        });
      }

      const premium =
        await MembershipService.isPremium(uid);

      if (!premium) {
        const consumed =
          await ReviewUsageService.consumeFreeReview(
            uid
          );

        if (!consumed) {
          return res.status(403).json({
            error:
              "FREE_REVIEW_LIMIT_REACHED",
            message:
              "You've used your 5 free product reviews. Upgrade to ShopWise Premium to continue.",
          });
        }
      }

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

      const result =
        await ReviewService.reviewImage({
          imageBase64,
          mimeType:
            mimeType || "image/jpeg",
          people: Array.isArray(people)
            ? people
            : [],
          healthConsiderations:
            Array.isArray(
              healthConsiderations
            )
              ? healthConsiderations
              : [],
        });

      res.json(result);
    } catch (error) {
      console.error(
        "Review error:",
        error
      );

      res.status(500).json({
        error:
          "Unable to review the product.",
      });
    }
  }
);

export default router;
