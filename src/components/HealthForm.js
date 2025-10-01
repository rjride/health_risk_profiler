import React, { useState } from "react";

const HealthForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    smoking: "",
    exercise: "",
    diet: "",
    sleep: "",
    stress: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} required />

      <label>Smoking:</label>
      <select name="smoking" value={form.smoking} onChange={handleChange}>
        <option value="">--Select--</option>
        <option value="none">None</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <label>Exercise:</label>
      <select name="exercise" value={form.exercise} onChange={handleChange}>
        <option value="">--Select--</option>
        <option value="never">Never</option>
        <option value="sometimes">Sometimes</option>
        <option value="daily">Daily</option>
      </select>

      <label>Diet:</label>
      <select name="diet" value={form.diet} onChange={handleChange}>
        <option value="">--Select--</option>
        <option value="healthy">Healthy</option>
        <option value="moderate">Moderate</option>
        <option value="high sugar">High sugar</option>
      </select>

      <label>Sleep:</label>
      <select name="sleep" value={form.sleep} onChange={handleChange}>
        <option value="">--Select--</option>
        <option value="poor">Poor</option>
        <option value="average">Average</option>
        <option value="good">Good</option>
      </select>

      <label>Stress:</label>
      <select name="stress" value={form.stress} onChange={handleChange}>
        <option value="">--Select--</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">Analyze</button>
    </form>
  );
};

export default HealthForm;
