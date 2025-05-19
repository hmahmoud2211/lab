import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Appbar, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MetricCard } from '@/components/common/MetricCard';
import { ActivityItem } from '@/components/common/ActivityItem';
import { LineChart } from '@/components/charts/LineChart';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { dashboardMetrics, activities, testChartData } from '@/data/mockData';
import { useI18n } from '@/context/I18nContext';

export default function DashboardScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { isRTL } = useI18n();
  const windowWidth = Dimensions.get('window').width;
  const isTabletOrDesktop = windowWidth >= 768;

  const fabActions = [
    {
      icon: 'account-plus',
      label: t('dashboard.newPatient'),
      onPress: () => console.log('New Patient'),
    },
    {
      icon: 'flask',
      label: t('dashboard.newExperiment'),
      onPress: () => console.log('New Experiment'),
    },
    {
      icon: 'file-document',
      label: t('dashboard.generateReport'),
      onPress: () => console.log('Generate Report'),
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.Content title={t('dashboard.title')} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="bell" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Metrics Section */}
        <View style={[styles.metricsContainer, isTabletOrDesktop && styles.metricsTablet]}>
          {dashboardMetrics.map((metric) => (
            <View 
              key={metric.id} 
              style={[
                styles.metricCardWrapper,
                isTabletOrDesktop ? styles.metricCardTablet : styles.metricCardMobile
              ]}
            >
              <MetricCard metric={metric} />
            </View>
          ))}
        </View>

        {/* Chart Section */}
        <LineChart
          title={t('dashboard.testsChart')}
          data={testChartData}
        />

        {/* Recent Activity Section */}
        <View style={styles.activitySection}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium">{t('dashboard.recentActivity')}</Text>
            <Text 
              variant="bodySmall" 
              style={{ color: theme.colors.primary }}
              onPress={() => console.log('View all activity')}
            >
              {t('dashboard.viewAllActivity')}
            </Text>
          </View>

          {activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </View>
      </ScrollView>

      <FloatingActionButton actions={fabActions} />
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
  contentContainer: {
    padding: 16,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  metricsTablet: {
    flexWrap: 'nowrap',
  },
  metricCardWrapper: {
    marginHorizontal: 4,
    marginBottom: 8,
  },
  metricCardMobile: {
    width: '48%',
  },
  metricCardTablet: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  activitySection: {
    marginTop: 16,
  },
});