import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { CoachMessage } from '@shared/types/coach';
import { createId } from '@shared/utils/id';
import { Button } from '@ds/components/Button';
import { Card } from '@ds/components/Card';
import { Text } from '@ds/components/Text';
import { colors } from '@ds/tokens/colors';
import { spacing } from '@ds/tokens/spacing';

import { useCoachChat } from '@/hooks/use-coach-chat';

type ChatScreenProps = {
  title: string;
  subtitle: string;
  placeholder: string;
  initialPrompt?: string;
};

export function ChatScreen({ title, subtitle, placeholder, initialPrompt }: ChatScreenProps) {
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
    } catch {
      // erro exibido pelo estado `error` da mutation
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.header}>
          <Text variant="title">{title}</Text>
          <Text variant="caption">{subtitle}</Text>
        </View>

        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.messages}
          keyboardShouldPersistTaps="handled"
        >
          {messages.length === 0 ? (
            <Card>
              <Text variant="body">Envie uma mensagem para começar.</Text>
            </Card>
          ) : (
            messages.map((message) => (
              <Card
                key={message.id}
                style={message.role === 'user' ? styles.userCard : styles.assistantCard}
              >
                <Text variant="caption">{message.role === 'user' ? 'Você' : 'Coach'}</Text>
                <Text variant="body">{message.content}</Text>
              </Card>
            ))
          )}

          {isPending ? (
            <View style={styles.loading}>
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : null}

          {error ? (
            <Card style={styles.errorCard}>
              <Text variant="body">{error.message}</Text>
            </Card>
          ) : null}
        </ScrollView>

        <View style={styles.footer}>
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
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.xs,
  },
  messages: {
    padding: spacing.md,
    gap: spacing.sm,
    paddingBottom: spacing.xl,
  },
  footer: {
    padding: spacing.md,
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  input: {
    minHeight: 48,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  userCard: {
    borderColor: colors.primary,
  },
  assistantCard: {
    backgroundColor: colors.surface,
  },
  loading: {
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  errorCard: {
    borderColor: colors.error,
  },
});
