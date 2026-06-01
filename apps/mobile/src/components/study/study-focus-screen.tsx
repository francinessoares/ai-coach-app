import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Text } from '@ds/components/Text';
import { spacing } from '@ds/tokens/spacing';

import { ScreenLayout } from '@/components/layout/screen-layout';
import { TopicChip } from '@/components/ui/topic-chip';
import { getStudySuggestions, type StudyTopic } from '@/config/study';

type StudyFocusScreenProps = {
  topic: StudyTopic;
};

export function StudyFocusScreen({ topic }: StudyFocusScreenProps) {
  const router = useRouter();
  const suggestions = getStudySuggestions(topic);

  return (
    <ScreenLayout
      title={topic}
      subtitle="Escolha um subtema para estudar com o coach"
      showBack
    >
      <Text variant="caption" style={styles.hint}>
        Sugestões para começar
      </Text>
      <View style={styles.list}>
        {suggestions.map((focus) => (
          <TopicChip
            key={focus}
            label={focus}
            variant="full"
            onPress={() =>
              router.push({
                pathname: '/study-questions',
                params: { topic, focus },
              })
            }
          />
        ))}
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  hint: {
    marginBottom: spacing.xs,
  },
  list: {
    width: '100%',
    gap: spacing.sm,
  },
});
