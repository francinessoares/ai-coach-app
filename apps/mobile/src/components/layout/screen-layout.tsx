import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@ds/components/Text';
import { colors } from '@ds/tokens/colors';
import { spacing } from '@ds/tokens/spacing';

import { BackButton } from '@/components/layout/back-button';

type ScreenLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  showBack?: boolean;
  onBack?: () => void;
};

export function ScreenLayout({
  title,
  subtitle,
  children,
  footer,
  showBack = false,
  onBack,
}: ScreenLayoutProps) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <View style={styles.header}>
          {showBack ? <BackButton onPress={onBack} /> : null}
          <Text variant="title">{title}</Text>
          {subtitle ? <Text variant="caption">{subtitle}</Text> : null}
        </View>

        <ScrollView
          style={styles.middle}
          contentContainerStyle={styles.middleContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>

        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    gap: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  middle: {
    flex: 1,
  },
  middleContent: {
    padding: spacing.md,
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  footer: {
    padding: spacing.md,
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    backgroundColor: colors.background,
  },
});
