export type CoachRole = 'user' | 'assistant' | 'system';

export type CoachMessage = {
  id: string;
  role: CoachRole;
  content: string;
  createdAt: string;
};

export type CoachChatRequest = {
  messages: Pick<CoachMessage, 'role' | 'content'>[];
};

export type CoachChatResponse = {
  message: CoachMessage;
};
