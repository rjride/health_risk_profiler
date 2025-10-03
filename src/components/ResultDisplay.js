import React from "react";

const ResultDisplay = ({ result }) => {
  if (!result) {
    return null;
  }

  const getRiskLevelClass = (level) => {
    switch (level) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">AI Health Report</h3>
        <p>
          <b>Risk Level:</b>{' '}
          <span className={`badge bg-${getRiskLevelClass(result.risk_level)}`}>
            {result.risk_level}
          </span>
        </p>
        <p>
          <b>Score:</b>{' '}
          <span className="badge bg-info">{result.score}</span>
        </p>

        {result.missing_fields?.length > 0 && (
          <div>
            <h4>Missing Fields</h4>
            <ul className="list-group">
              {result.missing_fields.map((f, i) => <li key={i} className="list-group-item">{f}</li>)}
            </ul>
          </div>
        )}

        {result.risk_factors?.length > 0 && (
          <div className="mt-3">
            <h4>Risk Factors</h4>
            <ul className="list-group">
              {result.risk_factors.map((f, i) => <li key={i} className="list-group-item">{f}</li>)}
            </ul>
          </div>
        )}

        {result.recommendations?.length > 0 && (
          <div className="mt-3">
            <h4>Recommendations</h4>
            <ul className="list-group">
              {result.recommendations.map((r, i) => <li key={i} className="list-group-item">{r}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;