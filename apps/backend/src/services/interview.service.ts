import { getGeminiModel } from '../lib/gemini';
import { INTERVIEW_EVALUATION_PROMPT } from '../prompts/interview.system';
import { interviewResultSchema } from '../schemas/interview.schema';

function extractJsonObject(text: string): string | null {
  const match = text.match(/\{[\s\S]*\}/);
  return match?.[0] ?? null;
}

export async function evaluateInterviewAnswer(
  question: string,
  answer: string,
): Promise<ReturnType<typeof interviewResultSchema.parse>> {
  const model = getGeminiModel(INTERVIEW_EVALUATION_PROMPT);

  const result = await model.generateContent(
    `Pergunta: "${question}"\n\nResposta do candidato: "${answer}"`,
  );

  const raw = result.response.text();
  const jsonText = extractJsonObject(raw);

  if (!jsonText) {
    throw new Error('A IA não retornou JSON válido para a avaliação.');
  }

  let json: unknown;
  try {
    json = JSON.parse(jsonText);
  } catch {
    throw new Error('A IA retornou JSON inválido para a avaliação.');
  }

  const parsed = interviewResultSchema.safeParse(json);

  if (!parsed.success) {
    throw new Error('Formato de avaliação inválido retornado pela IA.');
  }

  return parsed.data;
}
