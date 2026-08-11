const API_URL = "http://10.0.2.2:3000";

export interface ReviewRequest {
  ingredients: string;
  people: string[];
  healthConsiderations: string[];
}

export interface ReviewResponse {
  verdict: "RECOMMENDED" | "MIXED" | "NOT RECOMMENDED";
  summary: string[];
}

class ReviewService {
  async review(
    request: ReviewRequest
  ): Promise<ReviewResponse> {
    const response = await fetch(`${API_URL}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Review request failed.");
    }

    const data = await response.json();

    return {
      verdict: String(data.verdict)
        .trim()
        .toUpperCase() as ReviewResponse["verdict"],

      summary: Array.isArray(data.summary)
        ? data.summary.map((item: unknown) =>
            String(item).trim()
          )
        : [],
    };
  }
}

export default new ReviewService();