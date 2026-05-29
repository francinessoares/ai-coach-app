import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Button } from '@ds/components/Button';
import { Card } from '@ds/components/Card';
import { Text } from '@ds/components/Text';
import { colors } from '@ds/tokens/colors';
import { spacing } from '@ds/tokens/spacing';

import { ProgressBar } from '@/components/home/progress-bar';
import { ScreenLayout } from '@/components/layout/screen-layout';
import { userConfig } from '@/config/user';

export function HomeScreen() {
  const router = useRouter();

  return (
    <ScreenLayout
      title={`Olá, ${userConfig.name} 👋`}
      subtitle={`Seu foco hoje: ${userConfig.focus}`}
    >
      <Pressable onPress={() => router.push('/coach')}>
        <Card style={styles.featuredCard}>
          <Text variant="body" style={styles.featuredEmoji}>
            💡
          </Text>
          <Text variant="body" style={styles.featuredQuote}>
            &quot;Você está pronta para evoluir hoje?&quot;
          </Text>
          <Text variant="caption" style={styles.featuredCta}>
            → Continue seu treino
          </Text>
        </Card>
      </Pressable>

      <Button label="▶ Iniciar sessão" onPress={() => router.push('/coach')} />

      <View style={styles.quickActions}>
        <Pressable style={styles.quickAction} onPress={() => router.push('/study')}>
          <Card padded style={styles.quickActionCard}>
            <Text variant="body" style={styles.quickActionEmoji}>
              📚
            </Text>
            <Text variant="body">Estudo</Text>
          </Card>
        </Pressable>

        <Pressable style={styles.quickAction} onPress={() => router.push('/interview')}>
          <Card padded style={styles.quickActionCard}>
            <Text variant="body" style={styles.quickActionEmoji}>
              🎤
            </Text>
            <Text variant="body">Entrevista</Text>
          </Card>
        </Pressable>
      </View>

      <View style={styles.progressSection}>
        <Text variant="caption">Progresso</Text>
        <ProgressBar value={userConfig.progress} />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  featuredCard: {
    borderColor: colors.primary,
    gap: spacing.sm,
  },
  featuredEmoji: {
    fontSize: 28,
  },
  featuredQuote: {
    fontSize: 18,
    fontWeight: '600',
  },
  featuredCta: {
    color: colors.primary,
  },
  quickActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  quickAction: {
    flex: 1,
  },
  quickActionCard: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  quickActionEmoji: {
    fontSize: 24,
  },
  progressSection: {
    gap: spacing.sm,
  },
});
