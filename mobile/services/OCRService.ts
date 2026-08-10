import { File } from "expo-file-system";

export interface OCRResult {
  success: boolean;
  text: string;
}

const API_URL = "http://10.0.2.2:3000";

class OCRService {
  async extractText(imageUri: string): Promise<OCRResult> {
    try {
      const file = new File(imageUri);
      const base64 = await file.base64();

      const response = await fetch(`${API_URL}/ocr`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageBase64: base64,
          mimeType: "image/jpeg",
        }),
      });

      if (!response.ok) {
        throw new Error(`OCR request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("OCRService error:", error);

      return {
        success: false,
        text: "Unable to read the ingredient list.",
      };
    }
  }
}

export default new OCRService();
