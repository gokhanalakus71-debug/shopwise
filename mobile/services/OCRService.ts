import { recognizeText } from "@infinitered/react-native-mlkit-text-recognition";

export interface OCRResult {
  success: boolean;
  text: string;
}

class OCRService {
  async extractText(imageUri: string): Promise<OCRResult> {
    try {
      const result = await recognizeText(imageUri);

      return {
        success: true,
        text: result.text,
      };
    } catch (error) {
      console.error("OCR Error:", error);

      return {
        success: false,
        text: "",
      };
    }
  }
}

export default new OCRService();