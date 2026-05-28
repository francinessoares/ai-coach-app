import type { CoachChatRequest } from '@shared/types/coach';

import { getGeminiModel } from '../lib/gemini';
import { COACH_SYSTEM_PROMPT } from '../prompts/coach.system';

function toGeminiHistory(messages: CoachChatRequest['messages']) {
  return messages.slice(0, -1).map((message) => ({
    role: message.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: message.content }],
  })) as { role: 'user' | 'model'; parts: { text: string }[] }[];
}

export async function createCoachCompletion(body: CoachChatRequest): Promise<string> {
  const model = getGeminiModel(COACH_SYSTEM_PROMPT);
  const lastMessage = body.messages[body.messages.length - 1];

  if (!lastMessage) {
    throw new Error('messages is required');
  }

  if (body.messages.length === 1) {
    const result = await model.generateContent(lastMessage.content);
    return result.response.text();
  }

  const chat = model.startChat({
    history: toGeminiHistory(body.messages),
  });

  const result = await chat.sendMessage(lastMessage.content);
  return result.response.text();
}
