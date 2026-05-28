import type { CoachChatRequest, CoachChatResponse } from '@shared/types/coach';

import { api } from './api/client';

export async function sendCoachMessage(
  payload: CoachChatRequest,
): Promise<CoachChatResponse> {
  const { data } = await api.post<CoachChatResponse>('/api/chat', payload);
  return data;
}

export async function checkHealth(): Promise<{ status: string; service: string }> {
  const { data } = await api.get<{ status: string; service: string }>('/health');
  return data;
}
