import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface OCRResult {
  success: boolean;
  text: string;
}

class OCRService {
  async extractText(
    imageBase64: string,
    mimeType: string = "image/jpeg"
  ): Promise<OCRResult> {
    const response = await client.responses.create({
      model: "gpt-5",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text:
                "Read the ingredient list in this product image. " +
                "Extract only ingredients and amounts that you can actually read. " +
                "Do not guess, infer, or invent any ingredient. " +
                "Ignore marketing text, product claims, instructions, and other non-ingredient text. " +
                "If the ingredient list cannot be read reliably, return exactly: INGREDIENTS UNREADABLE.",
            },
            {
              type: "input_image",
              image_url: `data:${mimeType};base64,${imageBase64}`,
              detail: "auto",
            },
          ],
        },
      ],
    });

    const text = response.output_text.trim();

    if (!text || text === "INGREDIENTS UNREADABLE") {
      return {
        success: false,
        text: "INGREDIENTS UNREADABLE",
      };
    }

    return {
      success: true,
      text,
    };
  }
}

export default new OCRService();
