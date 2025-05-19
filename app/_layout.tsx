import React from 'react';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@/context/ThemeContext';
import { I18nProvider } from '@/context/I18nContext';
import { SettingsProvider } from '@/context/SettingsContext';
import '../i18n';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <I18nProvider>
          <ThemeProvider>
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
            </Stack>
          </ThemeProvider>
        </I18nProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}