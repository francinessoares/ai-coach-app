import { ChatScreen } from '@/components/chat/chat-screen';

export default function StudyScreen() {
  return (
    <ChatScreen
      title="Plano de estudos"
      subtitle="Monte um plano estruturado para um tema de programação."
      placeholder="Ex.: React hooks, TypeScript generics, SQL..."
      initialPrompt="Quero um plano de estudos de 7 dias sobre "
    />
  );
}
