import { StyleSheet, View } from 'react-native';

import type { InterviewResult } from '@shared/types/interview';
import { Button } from '@ds/components/Button';
import { Card } from '@ds/components/Card';
import { Text } from '@ds/components/Text';
import { spacing } from '@ds/tokens/spacing';

type InterviewResultViewProps = {
  result: InterviewResult;
  onRetry: () => void;
  onNextQuestion: () => void;
};

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.scoreRow}>
      <Text variant="body">📊 {label}</Text>
      <Text variant="body" style={styles.scoreValue}>
        {value.toFixed(1)}
      </Text>
    </View>
  );
}

export function InterviewResultView({ result, onRetry, onNextQuestion }: InterviewResultViewProps) {
  return (
    <View style={styles.container}>
      <Text variant="caption">Resultado da entrevista</Text>

      <Card style={styles.scoresCard}>
        <ScoreRow label="Clareza:" value={result.scores.clarity} />
        <ScoreRow label="Técnica:" value={result.scores.depth} />
        <ScoreRow label="Comunicação:" value={result.scores.communication} />
      </Card>

      <Card>
        <Text variant="body">💡 Feedback:</Text>
        <Text variant="caption">&quot;{result.feedback}&quot;</Text>
      </Card>

      <Card>
        <Text variant="body">🚀 Melhorias:</Text>
        {result.improvements.map((item) => (
          <Text key={item} variant="caption">
            • {item}
          </Text>
        ))}
      </Card>

      <View style={styles.actions}>
        <Button label="Tentar novamente" variant="outline" onPress={onRetry} />
        <Button label="Próxima pergunta" onPress={onNextQuestion} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  scoresCard: {
    gap: spacing.sm,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreValue: {
    fontWeight: '700',
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
});
