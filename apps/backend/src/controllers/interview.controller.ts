import type { Request, Response } from 'express';

import type { InterviewResult } from '@shared/types/interview';

import { interviewEvaluateRequestSchema } from '../schemas/interview.schema';
import { evaluateInterviewAnswer } from '../services/interview.service';

export async function postInterviewEvaluate(req: Request, res: Response): Promise<void> {
  if (!process.env.GEMINI_API_KEY) {
    res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
    return;
  }

  const parsed = interviewEvaluateRequestSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: 'Invalid request body',
      details: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const result: InterviewResult = await evaluateInterviewAnswer(
      parsed.data.question,
      parsed.data.answer,
    );

    res.json(result);
  } catch (error) {
    console.error('[interview]', error);
    const message = error instanceof Error ? error.message : 'Failed to evaluate interview answer';
    res.status(500).json({ error: message });
  }
}
