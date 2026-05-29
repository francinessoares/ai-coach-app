import { useLocalSearchParams } from 'expo-router';

import { ChatScreen } from '@/components/chat/chat-screen';

export default function StudySessionRoute() {
  const { topic, day } = useLocalSearchParams<{ topic?: string; day?: string }>();

  return (
    <ChatScreen
      title={topic ?? 'Study Session'}
      subtitle={day ? `Dia ${day}` : 'Continue seu plano de estudos'}
      placeholder="Continue estudando..."
      initialPrompt={`Estou no ${topic ?? 'plano'} dia ${day ?? '1'}. Me ajude a continuar: `}
    />
  );
}
