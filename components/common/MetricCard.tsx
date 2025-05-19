import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';
import { ArrowUp as ArrowUpIcon, ArrowDown as ArrowDownIcon, Users, FlaskRound, ClipboardCheck, CreditCard } from 'lucide-react-native';
import { DashboardMetric } from '../../types';

interface MetricCardProps {
  metric: DashboardMetric;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const theme = useTheme();
  
  const getIcon = () => {
    switch (metric.icon) {
      case 'users':
        return <Users size={24} color={metric.color} />;
      case 'flask-round':
        return <FlaskRound size={24} color={metric.color} />;
      case 'clipboard-check':
        return <ClipboardCheck size={24} color={metric.color} />;
      case 'credit-card':
        return <CreditCard size={24} color={metric.color} />;
      default:
        return <Users size={24} color={metric.color} />;
    }
  };

  return (
    <Surface style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={1}>
      <View style={styles.iconContainer}>{getIcon()}</View>
      <Text variant="titleLarge" style={styles.value}>
        {metric.value.toLocaleString()}
      </Text>
      <Text variant="bodyMedium" style={styles.title}>
        {metric.title}
      </Text>
      <View style={styles.changeContainer}>
        {metric.change > 0 ? (
          <ArrowUpIcon size={14} color="#00C853" />
        ) : (
          <ArrowDownIcon size={14} color="#D50000" />
        )}
        <Text
          variant="bodySmall"
          style={[
            styles.changeText,
            { color: metric.change > 0 ? '#00C853' : '#D50000' },
          ]}
        >
          {Math.abs(metric.change)}%
        </Text>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flex: 1,
    minWidth: 150,
    marginHorizontal: 4,
  },
  iconContainer: {
    marginBottom: 12,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    marginBottom: 8,
    opacity: 0.8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    marginLeft: 4,
    fontWeight: '500',
  },
});