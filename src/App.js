import React, { useState } from "react";
import HealthForm from "./components/HealthForm";
import OCRUpload from "./components/OCRUpload";
import ResultDisplay from "./components/ResultDisplay";
import api from "./api/api";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [incompleteProfile, setIncompleteProfile] = useState(false);

  const handleAnalysis = async (data) => {
    setLoading(true);
    setError(null);
    setIncompleteProfile(false);
    try {
      const res = await api.post("/profile/analyze", data);
      if (res.data.status === 'incomplete_profile') {
        setIncompleteProfile(true);
        setResult(null);
      } else {
        setResult(res.data);
      }
    } catch (err) {
      console.error("Error during analysis:", err);
      setError("An error occurred during analysis. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">AI-Powered Health Risk Profiler</a>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <HealthForm onSubmit={handleAnalysis} />
            <hr />
            <OCRUpload onExtract={handleAnalysis} />
          </div>
          <div className="col-md-6">
            {loading && (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {incompleteProfile && (
              <div className="alert alert-warning" role="alert">
                Analysis could not be completed due to insufficient information from the document.
              </div>
            )}
            {result && <ResultDisplay result={result} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;