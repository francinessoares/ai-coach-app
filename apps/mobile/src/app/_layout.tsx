import { Stack } from 'expo-router';

import { QueryProvider } from '@/providers/query-provider';
import { colors } from '@ds/tokens/colors';

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="coach"
          options={{
            gestureEnabled: true,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="study-session"
          options={{
            gestureEnabled: true,
            animation: 'slide_from_right',
          }}
        />
      </Stack>
    </QueryProvider>
  );
}
