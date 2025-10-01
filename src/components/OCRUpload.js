import React from "react";
import Tesseract from "tesseract.js";

const OCRUpload = ({ onExtract }) => {
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const { data } = await Tesseract.recognize(file, "eng");
    const text = data.text;

    // Very simple parser for demo purposes
    const parsed = {};
    if (text.match(/Age:\s*(\d+)/i)) parsed.age = text.match(/Age:\s*(\d+)/i)[1];
    if (/Smoker:\s*yes/i.test(text)) parsed.smoking = "high";
    if (/Smoker:\s*no/i.test(text)) parsed.smoking = "none";
    if (text.match(/Exercise:\s*(\w+)/i)) parsed.exercise = text.match(/Exercise:\s*(\w+)/i)[1].toLowerCase();
    if (text.match(/Diet:\s*(.+)/i)) parsed.diet = text.match(/Diet:\s*(.+)/i)[1];

    onExtract(parsed);
  };

  return <input type="file" accept="image/*" onChange={handleImage} />;
};

export default OCRUpload;
