import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
  StyleSheet,
  Text,
} from 'react-native';

import { colors } from '../tokens/colors';
import { radius } from '../tokens/radius';
import { spacing } from '../tokens/spacing';
import { typography } from '../tokens/typography';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

type ButtonProps = PressableProps & {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
};

const variantStyles = StyleSheet.create({
  base: {
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  labelPrimary: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.textOnPrimary,
  },
  labelSecondary: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.text,
  },
  labelOutline: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.primary,
  },
});

export function Button({
  label,
  variant = 'primary',
  loading = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const labelStyle =
    variant === 'primary'
      ? variantStyles.labelPrimary
      : variant === 'outline'
        ? variantStyles.labelOutline
        : variantStyles.labelSecondary;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        variantStyles.base,
        variantStyles[variant],
        pressed && !isDisabled && variantStyles.pressed,
        isDisabled && variantStyles.disabled,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.textOnPrimary : colors.primary} />
      ) : (
        <Text style={labelStyle}>{label}</Text>
      )}
    </Pressable>
  );
}
