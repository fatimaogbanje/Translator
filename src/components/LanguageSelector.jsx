import React from 'react';

function LanguageSelector({ sourceLanguage, setSourceLanguage, targetLanguage, setTargetLanguage, model, setModel }) {
  return (
    <div className="language-selector">
      <div>
        <label>Source Language: </label>
        <select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="ig">Igbo</option>
          <option value="yo">Yoruba</option>
          <option value="ha">Hausa</option>
          
        </select>
      </div>
      <div>
        <label>Target Language: </label>
        <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
          <option value="fr">French</option>
          <option value="ig">Igbo</option>
          <option value="yo">Yoruba</option>
          <option value="ha">Hausa</option>
          
        </select>
      </div>
      <div>
        <label>AI Model: </label>
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="defaultModel">Default Model</option>
          <option value="advancedModel">Advanced Model</option>
          
        </select>
      </div>
    </div>
  );
}

export default LanguageSelector;
