import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@ds/components/Button';
import { Card } from '@ds/components/Card';
import { Text } from '@ds/components/Text';
import { spacing } from '@ds/tokens/spacing';

import { ScreenLayout } from '@/components/layout/screen-layout';
import { TopicChip } from '@/components/ui/topic-chip';
import { getStudyQuestionSuggestions } from '@/config/study/questions';
import type { StudyTopic } from '@/config/study';

type StudyQuestionsScreenProps = {
  topic: StudyTopic;
  focus: string;
};

export function StudyQuestionsScreen({ topic, focus }: StudyQuestionsScreenProps) {
  const router = useRouter();
  const questions = getStudyQuestionSuggestions(topic, focus);

  function openSession(questionIndex?: number) {
    router.push({
      pathname: '/study-session',
      params: {
        topic,
        focus,
        ...(questionIndex !== undefined ? { questionIndex: String(questionIndex) } : {}),
      },
    });
  }

  return (
    <ScreenLayout title="Perguntas sugeridas" subtitle={topic} showBack>
      <Card style={styles.focusCard}>
        <Text variant="caption">Subtema</Text>
        <Text variant="body" style={styles.focusText}>
          {focus}
        </Text>
      </Card>

      <Text variant="caption" style={styles.hint}>
        Toque em uma pergunta para abrir o coach
      </Text>
      <View style={styles.list}>
        {questions.map((question, index) => (
          <TopicChip
            key={question}
            label={question}
            variant="full"
            onPress={() => openSession(index)}
          />
        ))}
      </View>

      <Button
        label="Escrever minha própria pergunta"
        variant="secondary"
        onPress={() => openSession()}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  focusCard: {
    gap: spacing.xs,
  },
  focusText: {
    lineHeight: 22,
  },
  hint: {
    marginBottom: spacing.xs,
  },
  list: {
    width: '100%',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
});
