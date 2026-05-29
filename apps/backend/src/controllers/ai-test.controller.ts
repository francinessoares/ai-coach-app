import type { Request, Response } from 'express';

import { getGeminiModel } from '../lib/gemini';

export async function postAiTest(_req: Request, res: Response): Promise<void> {
  if (!process.env.GEMINI_API_KEY) {
    res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
    return;
  }

  try {
    const model = getGeminiModel();
    const result = await model.generateContent(
      'Explique React em 1 frase simples para iniciantes',
    );

    res.json({
      result: result.response.text(),
    });
  } catch (error) {
    console.error('[ai-test]', error);
    const message = error instanceof Error ? error.message : 'Erro na IA';
    res.status(500).json({ error: 'Erro na IA', detail: message });
  }
}
