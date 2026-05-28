import OpenAI from 'openai';

import type { CoachChatRequest } from '@shared/types/coach';

import { COACH_SYSTEM_PROMPT } from '../prompts/coach.system';

type ChatCompletionInput = {
  apiKey: string;
  model: string;
  body: CoachChatRequest;
};

export async function createCoachCompletion({
  apiKey,
  model,
  body,
}: ChatCompletionInput): Promise<string> {
  const openai = new OpenAI({ apiKey });

  const completion = await openai.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: COACH_SYSTEM_PROMPT },
      ...body.messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    ],
  });

  return completion.choices[0]?.message?.content ?? '';
}
