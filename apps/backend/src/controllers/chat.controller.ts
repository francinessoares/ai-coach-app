import type { Request, Response } from 'express';

import type { CoachChatRequest, CoachChatResponse } from '@shared/types/coach';
import { createId } from '@shared/utils/id';

import { createCoachCompletion } from '../services/gemini.service';

export async function postChat(req: Request, res: Response): Promise<void> {
  if (!process.env.GEMINI_API_KEY) {
    res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
    return;
  }

  const body = req.body as CoachChatRequest;

  if (!body?.messages?.length) {
    res.status(400).json({ error: 'messages is required' });
    return;
  }

  try {
    const content = await createCoachCompletion(body);

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
