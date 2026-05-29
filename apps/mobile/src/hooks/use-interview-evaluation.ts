import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import type { InterviewEvaluateRequest, InterviewResult } from '@shared/types/interview';

import { evaluateInterview } from '@/services/interview.service';

async function evaluateWithFriendlyError(
  input: InterviewEvaluateRequest,
): Promise<InterviewResult> {
  try {
    return await evaluateInterview(input);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response?.data as { error?: string } | undefined)?.error ??
        'Não foi possível avaliar sua resposta. Verifique se o backend está rodando.';
      throw new Error(message);
    }

    throw new Error('Não foi possível avaliar sua resposta. Verifique se o backend está rodando.');
  }
}

export function useInterviewEvaluation() {
  return useMutation<InterviewResult, Error, InterviewEvaluateRequest>({
    mutationFn: evaluateWithFriendlyError,
  });
}
