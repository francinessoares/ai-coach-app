import './config/env';

import cors from 'cors';
import express from 'express';

import { getGeminiModel } from './lib/gemini';
import { routes } from './routes';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/ai-test', async (_req, res) => {
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
    console.error(error);
    const message = error instanceof Error ? error.message : 'Erro na IA';
    res.status(500).json({ error: 'Erro na IA', detail: message });
  }
});

app.use(routes);

const port = Number(process.env.PORT ?? 3001);

app.listen(port, () => {
  console.log(`AI Coach API listening on http://localhost:${port}`);
});
