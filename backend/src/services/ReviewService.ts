import { ReviewResponse } from "../models/ReviewResponse.js";

import OpenAIService from "./OpenAIService.js";
import { buildProductReviewPrompt } from "../prompts/ProductReviewPrompt.js";

export interface ImageReviewRequest {
  imageBase64: string;
  mimeType: string;
  people: string[];
  healthConsiderations: string[];
}

class ReviewService {
  async reviewImage(
    request: ImageReviewRequest
  ): Promise<ReviewResponse> {
    const prompt = buildProductReviewPrompt(
      request.people,
      request.healthConsiderations
    );

    const response = await OpenAIService.reviewImage(
      prompt,
      request.imageBase64,
      request.mimeType
    );

    return JSON.parse(response) as ReviewResponse;
  }
}

export default new ReviewService();
