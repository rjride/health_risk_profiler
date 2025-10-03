import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import { extractFactors, generateRecommendations } from './services/geminiService.js';
import { classifyRisk, parseSurveyData } from './services/riskService.js';
import { processImage } from './services/ocrService.js';

const app = express();
const PORT = process.env.PORT || 5000;
const upload = multer();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

app.post('/api/profile/analyze', upload.single('image'), async (req, res) => {
  console.log('Received request to /api/profile/analyze');
  let inputData = req.body;
  let ocrConfidence = 1.0;

  if (req.file) {
    try {
      console.log('Starting OCR processing');
      const { ocrParsed, ocrConfidence: ocrConf } = await processImage(req.file.buffer);
      inputData = ocrParsed;
      ocrConfidence = ocrConf;
      console.log('OCR processing finished');
    } catch (error) {
      console.error('OCR Error:', error);
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }

  console.log('Parsing survey data');
  const { answers, missingFields, confidence } = parseSurveyData(inputData);
  console.log('Survey data parsed', { answers, missingFields, confidence });

  const totalFields = Object.keys(answers).length + missingFields.length;
  if (missingFields.length / totalFields > 0.5) {
    console.log('Incomplete profile, >50% fields missing');
    return res.status(200).json({ status: 'incomplete_profile', reason: '>50% fields missing' });
  }

  console.log('Extracting factors with Gemini');
  const { factors, confidence: factorsConfidence } = await extractFactors(answers);
  console.log('Factors extracted', { factors, factorsConfidence });

  console.log('Classifying risk');
  const { risk_level, score, rationale } = classifyRisk(factors);
  console.log('Risk classified', { risk_level, score, rationale });

  console.log('Generating recommendations with Gemini');
  const { recommendations, status } = await generateRecommendations(risk_level, factors, answers.name);
  console.log('Recommendations generated', { recommendations, status });

  const response = {
    answers,
    missing_fields: missingFields,
    confidence: parseFloat((confidence * ocrConfidence * factorsConfidence).toFixed(2)),
    risk_level,
    factors,
    recommendations,
    status,
    score,
    rationale,
  };

  console.log('Sending response:', response);
  res.status(200).json(response);
});

app.get('/', (req, res) => {
  res.send('Hello from Backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});