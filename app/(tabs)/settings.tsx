import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Appbar, List, Switch, RadioButton, Button, Divider, useTheme, Text, Dialog, Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme as useAppTheme } from '@/context/ThemeContext';
import { useI18n } from '@/context/I18nContext';
import { useSettings } from '@/context/SettingsContext';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { theme: appTheme, setTheme } = useAppTheme();
  const { language, changeLanguage, isRTL } = useI18n();
  const { settings, updateSettings } = useSettings();
  const [resetDialogVisible, setResetDialogVisible] = useState(false);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    updateSettings({ theme: newTheme === 'system' ? 'light' : newTheme });
  };

  const handleLanguageChange = (newLanguage: 'en' | 'ar') => {
    changeLanguage(newLanguage);
    updateSettings({ language: newLanguage });
  };

  const handleUnitChange = (units: 'metric' | 'imperial') => {
    updateSettings({ units });
  };

  const toggleNotifications = () => {
    updateSettings({ notifications: !settings.notifications });
  };

  const handleResetData = () => {
    setResetDialogVisible(false);
    // In a real app, this would clear all cached data
    console.log('Data reset initiated');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.Content title={t('settings.title')} />
      </Appbar.Header>

      <ScrollView style={styles.scrollView}>
        <List.Section>
          <List.Subheader>{t('settings.appearance')}</List.Subheader>
          
          <List.Item
            title={t('settings.theme')}
            description={
              appTheme === 'light'
                ? t('settings.light')
                : appTheme === 'dark'
                ? t('settings.dark')
                : t('settings.system')
            }
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            onPress={() => {}}
          />
          <View style={[styles.radioGroup, { backgroundColor: theme.colors.surfaceVariant }]}>
            <RadioButton.Group
              onValueChange={value => handleThemeChange(value as 'light' | 'dark' | 'system')}
              value={appTheme}
            >
              <RadioButton.Item
                label={t('settings.light')}
                value="light"
                labelStyle={styles.radioLabel}
              />
              <RadioButton.Item
                label={t('settings.dark')}
                value="dark"
                labelStyle={styles.radioLabel}
              />
              <RadioButton.Item
                label={t('settings.system')}
                value="system"
                labelStyle={styles.radioLabel}
              />
            </RadioButton.Group>
          </View>
          
          <List.Item
            title={t('settings.language')}
            description={language === 'en' ? t('settings.english') : t('settings.arabic')}
            left={props => <List.Icon {...props} icon="translate" />}
            onPress={() => {}}
          />
          <View style={[styles.radioGroup, { backgroundColor: theme.colors.surfaceVariant }]}>
            <RadioButton.Group
              onValueChange={value => handleLanguageChange(value as 'en' | 'ar')}
              value={language}
            >
              <RadioButton.Item
                label={t('settings.english')}
                value="en"
                labelStyle={styles.radioLabel}
              />
              <RadioButton.Item
                label={t('settings.arabic')}
                value="ar"
                labelStyle={styles.radioLabel}
              />
            </RadioButton.Group>
          </View>
          
          <Divider style={styles.divider} />
          
          <List.Item
            title={t('settings.units')}
            description={settings.units === 'metric' ? t('settings.metric') : t('settings.imperial')}
            left={props => <List.Icon {...props} icon="ruler" />}
            onPress={() => {}}
          />
          <View style={[styles.radioGroup, { backgroundColor: theme.colors.surfaceVariant }]}>
            <RadioButton.Group
              onValueChange={value => handleUnitChange(value as 'metric' | 'imperial')}
              value={settings.units}
            >
              <RadioButton.Item
                label={t('settings.metric')}
                value="metric"
                labelStyle={styles.radioLabel}
              />
              <RadioButton.Item
                label={t('settings.imperial')}
                value="imperial"
                labelStyle={styles.radioLabel}
              />
            </RadioButton.Group>
          </View>
          
          <List.Item
            title={t('settings.notifications')}
            description={settings.notifications ? t('settings.enable') : t('settings.disable')}
            left={props => <List.Icon {...props} icon="bell" />}
            right={() => (
              <Switch
                value={settings.notifications}
                onValueChange={toggleNotifications}
                color={theme.colors.primary}
              />
            )}
            onPress={toggleNotifications}
          />
          
          <Divider style={styles.divider} />
          
          <List.Subheader>{t('settings.account')}</List.Subheader>
          
          <List.Item
            title={t('settings.profile')}
            left={props => <List.Icon {...props} icon="account" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
          
          <List.Item
            title={t('settings.security')}
            left={props => <List.Icon {...props} icon="shield-account" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
          
          <Divider style={styles.divider} />
          
          <List.Subheader>{t('settings.about')}</List.Subheader>
          
          <List.Item
            title={t('settings.version')}
            description="1.0.0"
            left={props => <List.Icon {...props} icon="information" />}
          />
          
          <View style={styles.buttonContainer}>
            <Button 
              mode="outlined" 
              onPress={() => setResetDialogVisible(true)}
              style={styles.button}
              icon="refresh"
            >
              {t('settings.resetData')}
            </Button>
            
            <Button 
              mode="outlined" 
              onPress={() => console.log('Refresh data')}
              style={styles.button}
              icon="sync"
            >
              {t('settings.refreshData')}
            </Button>
          </View>
        </List.Section>
      </ScrollView>

      <Portal>
        <Dialog
          visible={resetDialogVisible}
          onDismiss={() => setResetDialogVisible(false)}
        >
          <Dialog.Title>{t('settings.resetData')}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{t('settings.resetConfirm')}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setResetDialogVisible(false)}>{t('common.no')}</Button>
            <Button onPress={handleResetData}>{t('common.yes')}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  radioGroup: {
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  radioLabel: {
    textAlign: 'left',
  },
  divider: {
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});