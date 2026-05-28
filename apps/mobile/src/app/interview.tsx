import { ChatScreen } from '@/components/chat/chat-screen';

export default function InterviewScreen() {
  return (
    <ChatScreen
      title="Entrevista técnica"
      subtitle="Simule uma entrevista e receba feedback estruturado."
      placeholder="Ex.: Entrevista para dev React pleno..."
      initialPrompt="Simule uma entrevista técnica para "
    />
  );
}
