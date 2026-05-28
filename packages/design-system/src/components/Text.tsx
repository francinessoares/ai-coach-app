import { Text as RNText, type TextProps as RNTextProps, StyleSheet } from 'react-native';

import { colors } from '../tokens/colors';
import { typography } from '../tokens/typography';

type TextVariant = 'body' | 'title' | 'caption';

type TextProps = RNTextProps & {
  variant?: TextVariant;
};

const variantStyles = StyleSheet.create({
  body: {
    fontSize: typography.fontSize.md,
    lineHeight: typography.lineHeight.normal,
    color: colors.text,
  },
  title: {
    fontSize: typography.fontSize.xl,
    lineHeight: typography.lineHeight.relaxed,
    fontWeight: '700',
    color: colors.text,
  },
  caption: {
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.tight,
    color: colors.textMuted,
  },
});

export function Text({ variant = 'body', style, ...props }: TextProps) {
  return <RNText style={[variantStyles[variant], style]} {...props} />;
}
