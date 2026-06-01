import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { TabBarIcon } from '@/components/layout/tab-bar-icon';
import { colors } from '@ds/tokens/colors';

function tabIcon(name: string) {
  return ({
    color,
    focused,
  }: {
    color: string;
    focused: boolean;
  }) => <TabBarIcon name={name} color={color} focused={focused} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopColor: colors.borderSubtle,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{ title: 'Home', tabBarIcon: tabIcon('index') }}
        />
        <Tabs.Screen
          name="study"
          options={{ title: 'Estudo', tabBarIcon: tabIcon('study') }}
        />
        <Tabs.Screen
          name="interview"
          options={{ title: 'Entrevista', tabBarIcon: tabIcon('interview') }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
