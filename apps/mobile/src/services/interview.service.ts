import type { InterviewEvaluateRequest, InterviewResult } from '@shared/types/interview';

import { api } from './api/client';

export async function evaluateInterview(
  payload: InterviewEvaluateRequest,
): Promise<InterviewResult> {
  const { data } = await api.post<InterviewResult>('/api/interview/evaluate', payload);
  return data;
}
