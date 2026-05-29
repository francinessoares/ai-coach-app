import type { Request, Response } from 'express';

import type { CoachChatResponse } from '@shared/types/coach';
import { createId } from '@shared/utils/id';

import { coachChatRequestSchema } from '../schemas/chat.schema';
import { createCoachCompletion } from '../services/gemini.service';

export async function postChat(req: Request, res: Response): Promise<void> {
  if (!process.env.GEMINI_API_KEY) {
    res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
    return;
  }

  const parsed = coachChatRequestSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: 'Invalid request body',
      details: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const content = await createCoachCompletion(parsed.data);

    const response: CoachChatResponse = {
      message: {
        id: createId('msg'),
        role: 'assistant',
        content,
        createdAt: new Date().toISOString(),
      },
    };

    res.json(response);
  } catch (error) {
    console.error('[chat]', error);
    const message = error instanceof Error ? error.message : 'Failed to generate coach response';
    res.status(500).json({ error: 'Failed to generate coach response', detail: message });
  }
}
