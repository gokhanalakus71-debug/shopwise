import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class OpenAIService {
  async review(prompt: string): Promise<string> {
    const response = await client.responses.create({
      model: "gpt-5",
      input: prompt,
    });

    return response.output_text;
  }
}

export default new OpenAIService();