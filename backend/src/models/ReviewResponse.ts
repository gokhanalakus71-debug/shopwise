export interface ReviewResponse {
  verdict:
    | "RECOMMENDED"
    | "MIXED"
    | "NOT RECOMMENDED";

  productName: string;

  overallAssessment: string;

  summary: string[];

  ingredientsOfInterest: {
    ingredient: string;
    reason: string;
  }[];

  profileConsiderations: {
    profile: string;
    assessment: string;
  }[];

  healthConsiderations: {
    consideration: string;
    assessment: string;
  }[];

  recommendation: string;
}