import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import type { CoachChatRequest, CoachChatResponse } from '@shared/types/coach';

import { sendCoachMessage } from '@/services/coach.service';

async function sendWithFriendlyError(payload: CoachChatRequest): Promise<CoachChatResponse> {
  try {
    return await sendCoachMessage(payload);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response?.data as { error?: string } | undefined)?.error ??
        'Não foi possível falar com o coach. Verifique se o backend está rodando.';
      throw new Error(message);
    }

    throw new Error('Não foi possível falar com o coach. Verifique se o backend está rodando.');
  }
}

export function useCoachChat() {
  return useMutation<CoachChatResponse, Error, CoachChatRequest>({
    mutationFn: sendWithFriendlyError,
  });
}
