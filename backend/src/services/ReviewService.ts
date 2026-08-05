import { ReviewRequest } from "../models/ReviewRequest.js";
import { ReviewResponse } from "../models/ReviewResponse.js";

import OpenAIService from "./OpenAIService.js";
import { buildProductReviewPrompt } from "../prompts/ProductReviewPrompt.js";

class ReviewService {
  async review(
    request: ReviewRequest
  ): Promise<ReviewResponse> {

    const prompt = buildProductReviewPrompt(
      request.ingredients,
      request.people,
      request.healthConsiderations
    );

    const response = await OpenAIService.review(prompt);

    return JSON.parse(response) as ReviewResponse;
  }
}

export default new ReviewService();