
export const fetchTranslation = async (text, sourceLang, targetLang, model) => {
  const API_KEY = ''; 

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify({
        
      
        contents: [
          {
            role: 'user',
            parts: [
              {
                text
              }
            ]
          }
        ],
        systemInstruction: {
          role: 'user',
          parts: [
            {
              text: `Translate the following text from ${sourceLang} into ${targetLang}.\n\nText: ${text}\n\nPlease provide the translation.\n\n`
            }
          ]
        },
        generationConfig: {
          temperature: 1,
          topK: 64,
          topP: 0.95,
          maxOutputTokens: 8192,
          responseMimeType: 'text/plain'
        }
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      
      return data.candidates[0].content.parts[0].text; 
    } else {
      throw new Error('Translation failed.');
    }
  } catch (error) {
    console.error('Error fetching translation:', error);
    return 'Error: Unable to translate text.';
  }
};
