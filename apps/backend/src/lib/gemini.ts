import { GoogleGenerativeAI } from '@google/generative-ai';

import '../config/env';

const apiKey = process.env.GEMINI_API_KEY ?? '';

export const genAI = new GoogleGenerativeAI(apiKey);

export function getGeminiModel(systemInstruction?: string) {
  return genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL ?? 'gemini-2.5-flash',
    systemInstruction,
  });
}
