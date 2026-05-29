import { useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { Text } from '@ds/components/Text';
import { colors } from '@ds/tokens/colors';
import { spacing } from '@ds/tokens/spacing';

type BackButtonProps = {
  label?: string;
  onPress?: () => void;
};

export function BackButton({ label = 'Voltar', onPress }: BackButtonProps) {
  const router = useRouter();

  function handlePress() {
    if (onPress) {
      onPress();
      return;
    }
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace('/');
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }: { pressed: boolean }) => [styles.button, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text variant="body" style={styles.label}>
        ← {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    marginBottom: spacing.xs,
    paddingVertical: spacing.xs,
    paddingRight: spacing.sm,
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    color: colors.primary,
    fontWeight: '600',
  },
});
