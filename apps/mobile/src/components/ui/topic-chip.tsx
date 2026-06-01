import { Pressable, StyleSheet } from 'react-native';

import { Text } from '@ds/components/Text';
import { colors } from '@ds/tokens/colors';
import { radius } from '@ds/tokens/radius';
import { spacing } from '@ds/tokens/spacing';

type TopicChipProps = {
  label: string;
  selected?: boolean;
  variant?: 'grid' | 'full';
  onPress: () => void;
};

export function TopicChip({ label, selected, variant = 'grid', onPress }: TopicChipProps) {
  const isFull = variant === 'full';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        isFull ? styles.chipFull : styles.chipGrid,
        (pressed || selected) && styles.chipActive,
      ]}
    >
      <Text
        variant="body"
        style={[isFull && styles.labelFull, selected && styles.labelActive]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceGlass,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  chipGrid: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '45%',
    minWidth: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipFull: {
    width: '100%',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  chipActive: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(91, 140, 255, 0.12)',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 12,
    elevation: 8,
  },
  labelFull: {
    width: '100%',
    lineHeight: 22,
  },
  labelActive: {
    color: colors.primary,
  },
});
