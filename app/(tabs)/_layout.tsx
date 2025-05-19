import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { PhoneIncoming as HomeIcon, CreditCard as CreditCardIcon, Users as UsersIcon, FlaskRound as FlaskRoundIcon, Package as PackageIcon, Settings as SettingsIcon } from 'lucide-react-native';
import { useI18n } from '@/context/I18nContext';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { isRTL } = useI18n();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.outline,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
          direction: isRTL ? 'rtl' : 'ltr',
        },
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('navigation.dashboard'),
          tabBarIcon: ({ color, size }) => <HomeIcon size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="billing"
        options={{
          title: t('navigation.billing'),
          tabBarIcon: ({ color, size }) => <CreditCardIcon size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="patients"
        options={{
          title: t('navigation.patients'),
          tabBarIcon: ({ color, size }) => <UsersIcon size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="experiments"
        options={{
          title: t('navigation.experiments'),
          tabBarIcon: ({ color, size }) => <FlaskRoundIcon size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: t('navigation.inventory'),
          tabBarIcon: ({ color, size }) => <PackageIcon size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('navigation.settings'),
          tabBarIcon: ({ color, size }) => <SettingsIcon size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
  },
});