import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

const TAB_ICONS: Record<
  string,
  { active: IoniconName; inactive: IoniconName }
> = {
  index: { active: 'home', inactive: 'home-outline' },
  study: { active: 'book', inactive: 'book-outline' },
  interview: { active: 'mic', inactive: 'mic-outline' },
};

type TabBarIconProps = {
  name: keyof typeof TAB_ICONS | string;
  color: string;
  focused: boolean;
  size?: number;
};

export function TabBarIcon({ name, color, focused, size = 24 }: TabBarIconProps) {
  const icons = TAB_ICONS[name] ?? TAB_ICONS.index;
  const iconName = focused ? icons.active : icons.inactive;

  return <Ionicons name={iconName} size={size} color={color} />;
}
