import { View, type ViewProps, StyleSheet } from 'react-native';

import { colors } from '../tokens/colors';
import { radius } from '../tokens/radius';
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
    backgroundColor: colors.surfaceGlass,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: radius.lg,
  },
  padded: {
    padding: spacing.md,
    gap: spacing.sm,
  },
});
