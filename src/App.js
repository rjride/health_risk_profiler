import React, { useState } from "react";
import HealthForm from "./components/HealthForm";
import OCRUpload from "./components/OCRUpload";
import ResultDisplay from "./components/ResultDisplay";
import { sendProfile } from "./api";

function App() {
  const [result, setResult] = useState(null);

  const handleSubmit = async (data) => {
    const res = await sendProfile(data);
    setResult(res);
  };

  const handleOCR = async (parsed) => {
    const res = await sendProfile(parsed);
    setResult(res);
  };

  return (
    <div className="App">
      <h1>AI-Powered Health Risk Profiler</h1>
      <HealthForm onSubmit={handleSubmit} />
      <h3>Or Upload Medical Form:</h3>
      <OCRUpload onExtract={handleOCR} />
      <ResultDisplay result={result} />
    </div>
  );
}

export default App;
