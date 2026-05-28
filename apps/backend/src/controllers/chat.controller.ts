import type { Request, Response } from 'express';

import type { CoachChatRequest, CoachChatResponse } from '@shared/types/coach';
import { createId } from '@shared/utils/id';

import { createCoachCompletion } from '../services/openai.service';

const model = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';

export async function postChat(req: Request, res: Response): Promise<void> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    res.status(500).json({ error: 'OPENAI_API_KEY is not configured' });
    return;
  }

  const body = req.body as CoachChatRequest;

  if (!body?.messages?.length) {
    res.status(400).json({ error: 'messages is required' });
    return;
  }

  try {
    const content = await createCoachCompletion({ apiKey, model, body });

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
    res.status(500).json({ error: 'Failed to generate coach response' });
  }
}
