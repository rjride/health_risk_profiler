import React, { useState } from "react";

const HealthForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    smoker: "no",
    exercise: "never",
    diet: "balanced",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Health Risk Profiler</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input name="name" className="form-control" value={formData.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Age:</label>
            <input name="age" className="form-control" value={formData.age} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Smoker:</label>
            <select name="smoker" className="form-select" value={formData.smoker} onChange={handleChange}>
              <option value="no">No</option>
              <option value="occasionally">Occasionally</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Exercise:</label>
            <select name="exercise" className="form-select" value={formData.exercise} onChange={handleChange}>
              <option value="never">Never</option>
              <option value="sometimes">Sometimes</option>
              <option value="daily">Daily</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Diet:</label>
            <select name="diet" className="form-select" value={formData.diet} onChange={handleChange}>
              <option value="balanced">Balanced</option>
              <option value="high sugar">High Sugar</option>
              <option value="high fat">High Fat</option>
              <option value="junk">Mostly Junk</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Analyze</button>
        </form>
      </div>
    </div>
  );
};

export default HealthForm;