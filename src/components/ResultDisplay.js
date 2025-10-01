import React from "react";

const ResultDisplay = ({ result }) => {
  if (!result) return null;

  if (result.status === "incomplete_profile") {
    return <div className="error">❌ {result.reason}</div>;
  }

  return (
    <div className="result">
      <h3>Risk Level: {result.risk_level}</h3>
      <p>Score: {result.score}</p>
      <p><b>Reasons:</b> {result.reasons?.join(", ")}</p>
      <p><b>Recommendations:</b></p>
      <ul>
        {result.recommendations?.map((rec, i) => <li key={i}>{rec}</li>)}
      </ul>
      <p><b>Summary:</b> {result.summary}</p>
    </div>
  );
};

export default ResultDisplay;
