import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@ds/components/Button';
import { Card } from '@ds/components/Card';
import { Text } from '@ds/components/Text';
import { colors } from '@ds/tokens/colors';
import { spacing } from '@ds/tokens/spacing';

import { ScreenLayout } from '@/components/layout/screen-layout';
import { TopicChip } from '@/components/ui/topic-chip';
import { currentStudy, studyTopics } from '@/config/study';

function openStudyFocus(router: ReturnType<typeof useRouter>, topic: string) {
  router.push({
    pathname: '/study-focus',
    params: { topic },
  });
}

function openStudySession(
  router: ReturnType<typeof useRouter>,
  params: { topic: string; focus?: string; day?: string },
) {
  router.push({
    pathname: '/study-session',
    params,
  });
}

export function StudyScreen() {
  const router = useRouter();

  return (
    <ScreenLayout title="Estudo" subtitle="Escolha um tema para estudar com o coach">
      <View style={styles.grid}>
        {studyTopics.map((topic) => (
          <TopicChip
            key={topic}
            label={topic}
            onPress={() => openStudyFocus(router, topic)}
          />
        ))}
      </View>

      <Button
        label="Continuar estudo atual"
        variant="secondary"
        onPress={() =>
          openStudySession(router, {
            topic: currentStudy.title,
            day: String(currentStudy.day),
          })
        }
      />

      <Card style={styles.currentStudy}>
        <Text variant="caption">Em andamento</Text>
        <Text variant="body" style={styles.currentStudyTitle}>
          {currentStudy.title} - Dia {currentStudy.day}
        </Text>
      </Card>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  currentStudy: {
    gap: spacing.xs,
    borderColor: colors.primary,
  },
  currentStudyTitle: {
    fontWeight: '600',
  },
});
