
import { GoogleGenAI } from "@google/genai";
import { UserType } from '../types.ts';

if (!process.env.API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateCommunicationMessage = async (userType: UserType, messageType: string, channel: 'Email' | 'SMS' | 'Push' | 'WhatsApp', customPrompt?: string): Promise<string> => {
  try {
    const prompt = `
      You are a professional B2B communication assistant for "Qawafel CRM", a marketplace connecting vendors with retailers.
      Your task is to generate a concise, professional, and friendly message.

      Channel: ${channel}
      Recipient Type: ${userType}
      Message Goal: ${messageType}
      ${customPrompt ? `Additional Instructions: ${customPrompt}` : ''}
      
      The tone should be supportive and business-oriented.
      
      ${channel === 'Email' ? `Start the message with a greeting like "Dear [Name]," and end with a professional closing like "Best regards,\nThe Qawafel Team". Keep the body to 2-3 short paragraphs. Do not include a subject line.` : ''}
      ${channel === 'SMS' ? `The message must be very short, under 160 characters. Do not use greetings or closings.` : ''}
      ${channel === 'Push' ? `The message must be a short, actionable notification. Do not use greetings or closings.` : ''}
      ${channel === 'WhatsApp' ? `The message should be friendly and conversational, suitable for WhatsApp. Emojis are allowed. Do not use formal greetings or closings.` : ''}
    `;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating message:", error);
    return "Failed to generate message. Please check the console for details.";
  }
};