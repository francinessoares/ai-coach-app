import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from 'react-native';

import type { CoachMessage } from '@shared/types/coach';
import { createId } from '@shared/utils/id';
import { Button } from '@ds/components/Button';
import { Card } from '@ds/components/Card';
import { Text } from '@ds/components/Text';
import { colors } from '@ds/tokens/colors';
import { radius } from '@ds/tokens/radius';
import { spacing } from '@ds/tokens/spacing';

import { ScreenLayout } from '@/components/layout/screen-layout';
import { ThinkingIndicator } from '@/components/ui/thinking-indicator';
import { useCoachChat } from '@/hooks/use-coach-chat';

type ChatScreenProps = {
  title: string;
  subtitle: string;
  placeholder: string;
  initialPrompt?: string;
  showBack?: boolean;
};

export function ChatScreen({
  title,
  subtitle,
  placeholder,
  initialPrompt,
  showBack = true,
}: ChatScreenProps) {
  const [input, setInput] = useState(initialPrompt ?? '');
  const [messages, setMessages] = useState<CoachMessage[]>([]);
  const { mutateAsync, isPending, error } = useCoachChat();

  async function handleSend() {
    const content = input.trim();
    if (!content || isPending) return;

    const userMessage: CoachMessage = {
      id: createId('msg'),
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');

    try {
      const response = await mutateAsync({
        messages: nextMessages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      });

      setMessages((current) => [...current, response.message]);
    } catch {}
  }

  const footer = (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
      style={styles.footer}
    >
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        value={input}
        onChangeText={setInput}
        multiline
        editable={!isPending}
      />
      <Button label="Enviar" onPress={handleSend} loading={isPending} />
    </KeyboardAvoidingView>
  );

  return (
    <ScreenLayout title={title} subtitle={subtitle} footer={footer} showBack={showBack}>
      {messages.length === 0 ? (
        <Card>
          <Text variant="body">Envie uma mensagem para começar.</Text>
        </Card>
      ) : (
        messages.map((message) => (
          <Card key={message.id} style={message.role === 'user' ? styles.userCard : undefined}>
            <Text variant="caption">{message.role === 'user' ? 'Você' : 'Coach'}</Text>
            <Text variant="body">{message.content}</Text>
          </Card>
        ))
      )}

      {isPending ? <ThinkingIndicator /> : null}

      {error ? (
        <Card style={styles.errorCard}>
          <Text variant="body">{error.message}</Text>
        </Card>
      ) : null}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  footer: {
    gap: spacing.sm,
  },
  input: {
    minHeight: 48,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surfaceGlass,
  },
  userCard: {
    borderColor: colors.primary,
  },
  errorCard: {
    borderColor: colors.error,
  },
});
