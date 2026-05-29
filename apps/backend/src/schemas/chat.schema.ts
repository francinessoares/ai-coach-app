import { z } from 'zod';

export const coachMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().trim().min(1, 'content is required').max(8000),
});

export const coachChatRequestSchema = z.object({
  messages: z.array(coachMessageSchema).min(1, 'messages is required').max(50),
});

export type CoachChatRequestInput = z.infer<typeof coachChatRequestSchema>;
