
const expectedFields = {
  name: 'string',
  age: 'number',
  smoker: 'string',
  exercise: 'string',
  diet: 'string',
};

export function parseSurveyData(data) {
  const answers = {};
  const missingFields = [];
  let foundFieldsCount = 0;

  for (const field in expectedFields) {
    let value = data[field];

    if (value !== undefined && value !== null && value !== '') {
      // Type conversion
      if (expectedFields[field] === 'number') {
        value = parseInt(value, 10);
        if (isNaN(value)) {
          value = undefined; // Mark as invalid if not a number
        }
      }
      
      if (value !== undefined) {
        answers[field] = value;
        foundFieldsCount++;
      } else {
        missingFields.push(field);
      }
    } else {
      missingFields.push(field);
    }
  }

  const totalFields = Object.keys(expectedFields).length;
  const confidence = totalFields > 0 ? (foundFieldsCount / totalFields) : 0;

  return { answers, missingFields, confidence };
}

export function classifyRisk(factors) {
  let score = 0;
  const rationale = [];

  if (factors.includes('smoking')) {
    score += 40;
    rationale.push('smoking');
  }
  if (factors.includes('poor diet')) {
    score += 25;
    rationale.push('high sugar diet'); // More specific rationale
  }
  if (factors.includes('low exercise')) {
    score += 15;
    rationale.push('low activity'); // More specific rationale
  }

  let risk_level = 'low';
  if (score >= 70) {
    risk_level = 'high';
  } else if (score >= 40) {
    risk_level = 'medium';
  }

  return { risk_level, score, rationale };
}
