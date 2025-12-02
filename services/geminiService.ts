import { GoogleGenAI } from "@google/genai";

// Initialize the client
// In a real deployed app, this runs on the server. 
// For this tutorial's interactive demo, we run it client-side but warn the user.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash-image';
    
    // According to guidelines: call generateContent to generate images with nano banana series models
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        }
      },
    });

    // Iterate through parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          return `data:image/png;base64,${base64EncodeString}`;
        }
      }
    }
    
    throw new Error("No image data returned from Gemini.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
