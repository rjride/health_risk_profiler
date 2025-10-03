
import { createWorker } from 'tesseract.js';

const expectedFields = {
    name: 'string',
    age: 'number',
    smoker: 'string',
    exercise: 'string',
    diet: 'string',
  };

export async function processImage(imageBuffer) {
    console.log('processImage called');
    try {
      const worker = await createWorker('eng');
      const { data: { text, confidence } } = await worker.recognize(imageBuffer);
      await worker.terminate();
  
      const ocrConfidence = confidence / 100;
  
      const ocrParsed = {};
      const lines = text.split('\n').map(line => line.trim().toLowerCase());

      for (const line of lines) {
        for (const key in expectedFields) {
          const regex = new RegExp(`^${key}\s*[: ]\s*(.+)`, 'i');
          const match = line.match(regex);
          if (match && match[1]) {
            ocrParsed[key] = match[1].trim();
            break; // Move to the next line once a key is found
          }
        }
      }
      console.log('processImage returning:', { ocrParsed, ocrConfidence });
      return { ocrParsed, ocrConfidence };
    } catch (error) {
      console.error('OCR Error:', error);
      throw new Error('OCR processing failed.');
    }
  }

