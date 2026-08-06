export interface OCRResult {
  success: boolean;
  text: string;
}

class OCRService {
  async extractText(imageUri: string): Promise<OCRResult> {
    return {
      success: true,
      text: "Temporary OCR disabled",
    };
  }
}

export default new OCRService();