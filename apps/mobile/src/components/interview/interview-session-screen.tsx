import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import type { InterviewResult } from '@shared/types/interview';
import { Button } from '@ds/components/Button';
import { Card } from '@ds/components/Card';
import { Text } from '@ds/components/Text';
import { colors } from '@ds/tokens/colors';
import { radius } from '@ds/tokens/radius';
import { spacing } from '@ds/tokens/spacing';

import { ScreenLayout } from '@/components/layout/screen-layout';
import { InterviewResultView } from '@/components/interview/interview-result-view';
import { ThinkingIndicator } from '@/components/ui/thinking-indicator';
import { defaultInterviewQuestion, interviewQuestions } from '@/config/interview';
import { useInterviewEvaluation } from '@/hooks/use-interview-evaluation';

type Step = 'question' | 'thinking' | 'result';

export function InterviewSessionScreen() {
  const [step, setStep] = useState<Step>('question');
  const [question, setQuestion] = useState(defaultInterviewQuestion);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<InterviewResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { mutateAsync, isPending } = useInterviewEvaluation();

  async function handleSubmit() {
    const trimmed = answer.trim();
    if (!trimmed || isPending) return;

    setSubmitError(null);
    setStep('thinking');

    try {
      const evaluation = await mutateAsync({ question, answer: trimmed });
      setResult(evaluation);
      setStep('result');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Erro ao avaliar resposta.');
      setStep('question');
    }
  }

  function handleRetry() {
    setAnswer('');
    setResult(null);
    setStep('question');
  }

  function handleNextQuestion() {
    const currentIndex = interviewQuestions.findIndex((item) => item === question);
    const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % interviewQuestions.length : 0;
    setQuestion(interviewQuestions[nextIndex] ?? defaultInterviewQuestion);
    setAnswer('');
    setResult(null);
    setStep('question');
  }

  const footer =
    step === 'question' ? (
      <Button label="Enviar resposta" onPress={handleSubmit} loading={isPending} />
    ) : undefined;

  return (
    <ScreenLayout title="Modo entrevista" subtitle="Simulação ativa" footer={footer}>
      {step === 'thinking' ? <ThinkingIndicator /> : null}

      {step === 'question' ? (
        <View style={styles.container}>
          <Card style={styles.aiCard}>
            <Text variant="caption">IA:</Text>
            <Text variant="body" style={styles.question}>
              &quot;{question}&quot;
            </Text>
          </Card>

          <View style={styles.divider} />

          <TextInput
            style={styles.input}
            placeholder="sua resposta aqui..."
            placeholderTextColor={colors.textMuted}
            value={answer}
            onChangeText={setAnswer}
            multiline
            textAlignVertical="top"
          />

          <View style={styles.divider} />

          {submitError ? (
            <Card style={styles.errorCard}>
              <Text variant="body">{submitError}</Text>
            </Card>
          ) : null}
        </View>
      ) : null}

      {step === 'result' && result ? (
        <InterviewResultView
          result={result}
          onRetry={handleRetry}
          onNextQuestion={handleNextQuestion}
        />
      ) : null}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  aiCard: {
    gap: spacing.sm,
    borderColor: colors.primary,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
  },
  errorCard: {
    borderColor: colors.error,
  },
  input: {
    minHeight: 140,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.surfaceGlass,
    color: colors.text,
    fontSize: 16,
  },
});
