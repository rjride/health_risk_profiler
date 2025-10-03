
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
  console.error('GEMINI_API_KEY is not set in the .env file.');
  process.exit(1);
}
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function extractFactors(answers) {
  console.log('extractFactors called with:', answers);
  try {
    const prompt = `Given the following lifestyle survey answers, identify key health risk factors. Respond with a JSON array of factors. Examples: ["smoking", "poor diet", "low exercise"].
    Answers: ${JSON.stringify(answers)}`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    });
    const response = await result.response;
    const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();

    // Attempt to parse the JSON array from the LLM's response
    const factors = JSON.parse(text); // Clean markdown code block if present

    console.log('extractFactors returning:', { factors, confidence: 0.95 });
    return { factors, confidence: 0.95 }; // Assign a high confidence for LLM-generated factors
  } catch (error) {
    console.error('Error extracting factors with Gemini API:', error);
    return { factors: [], confidence: 0.5 }; // Fallback with low confidence
  }
}

export async function generateRecommendations(riskLevel, factors, name) {
  console.log('generateRecommendations called with:', { riskLevel, factors, name });
  try {
    const prompt = `Given the following risk level and health factors for ${name}, generate actionable, non-diagnostic health recommendations. Respond with a JSON array of recommendations. Examples: ["Quit smoking", "Reduce sugar intake"].
    Risk Level: ${riskLevel}
    Factors: ${JSON.stringify(factors)}`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    });
    const response = await result.response;
    const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();

    const recommendations = JSON.parse(text); // Clean markdown code block if present

    console.log('generateRecommendations returning:', { recommendations, status: 'ok' });
    return { recommendations, status: 'ok' };
  } catch (error) {
    console.error('Error generating recommendations with Gemini API:', error);
    return { recommendations: ["Consult a healthcare professional for personalized advice."], status: 'error' }; // Fallback
  }
}
