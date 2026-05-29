import { z } from 'zod';

export const interviewEvaluateRequestSchema = z.object({
  question: z.string().trim().min(1, 'question is required').max(2000),
  answer: z.string().trim().min(1, 'answer is required').max(8000),
});

export const interviewResultSchema = z.object({
  scores: z.object({
    clarity: z.number().min(0).max(10),
    depth: z.number().min(0).max(10),
    communication: z.number().min(0).max(10),
  }),
  feedback: z.string().min(1),
  improvements: z.array(z.string().min(1)).min(1).max(6),
});

export type InterviewEvaluateRequestInput = z.infer<typeof interviewEvaluateRequestSchema>;

export type InterviewResultOutput = z.infer<typeof interviewResultSchema>;
