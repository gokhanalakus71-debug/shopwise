import { ReviewRequest } from "../models/ReviewRequest.js";
import { ReviewResponse } from "../models/ReviewResponse.js";

class ReviewService {
  async review(
    request: ReviewRequest
  ): Promise<ReviewResponse> {
    console.log("Reviewing product...");
    console.log(request);

    return {
      verdict: "RECOMMENDED",
      summary: [
        "No high-risk ingredients detected",
        "Suitable for selected profile",
      ],
    };
  }
}

export default new ReviewService();