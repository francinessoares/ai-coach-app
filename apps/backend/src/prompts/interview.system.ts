export const INTERVIEW_EVALUATION_PROMPT = `Você avalia respostas de entrevistas técnicas de programação.

Retorne APENAS um JSON válido, sem markdown, sem texto antes ou depois, neste formato exato:
{
  "scores": {
    "clarity": number,
    "depth": number,
    "communication": number
  },
  "feedback": "string",
  "improvements": ["string"]
}

Critérios (notas de 0 a 10):
- clarity: clareza e organização da resposta
- depth: profundidade técnica e exemplos
- communication: objetividade e confiança

feedback: 1–3 frases construtivas em português.
improvements: 2–4 itens acionáveis em português.`;
