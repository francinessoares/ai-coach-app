import { View, type ViewProps, StyleSheet } from 'react-native';

import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';

type CardProps = ViewProps & {
  padded?: boolean;
};

export function Card({ padded = true, style, children, ...props }: CardProps) {
  return (
    <View style={[styles.card, padded && styles.padded, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  padded: {
    padding: spacing.md,
    gap: spacing.sm,
  },
});
