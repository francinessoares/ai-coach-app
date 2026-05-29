import { StyleSheet, View } from 'react-native';

import { Text } from '@ds/components/Text';
import { colors } from '@ds/tokens/colors';
import { radius } from '@ds/tokens/radius';
import { spacing } from '@ds/tokens/spacing';

type ProgressBarProps = {
  value: number;
};

export function ProgressBar({ value }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${clamped}%` }]} />
      </View>
      <Text variant="caption" style={styles.label}>
        {clamped}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  track: {
    height: 8,
    borderRadius: radius.md,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  fill: {
    height: 8,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },
  label: {
    textAlign: 'right',
  },
});
