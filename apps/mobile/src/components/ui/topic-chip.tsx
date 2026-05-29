import { Pressable, StyleSheet } from 'react-native';

import { Text } from '@ds/components/Text';
import { colors } from '@ds/tokens/colors';
import { radius } from '@ds/tokens/radius';
import { spacing } from '@ds/tokens/spacing';

type TopicChipProps = {
  label: string;
  selected?: boolean;
  onPress: () => void;
};

export function TopicChip({ label, selected, onPress }: TopicChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.chip, (pressed || selected) && styles.chipActive]}
    >
      <Text variant="body" style={selected ? styles.labelActive : undefined}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceGlass,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
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
  labelActive: {
    color: colors.primary,
  },
});
