import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme, Surface } from 'react-native-paper';
import { Activity } from '../../types';
import { Clock as ClockIcon, User as UserIcon, FlaskRound as FlaskRoundIcon, CreditCard as CreditCardIcon, Package as PackageIcon } from 'lucide-react-native';
import { StatusBadge } from './StatusBadge';
import { Colors } from '../../constants/theme';

interface ActivityItemProps {
  activity: Activity;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const theme = useTheme();
  
  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMillis = now.getTime() - activityTime.getTime();
    
    const diffInMinutes = Math.floor(diffInMillis / (1000 * 60));
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hr ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };
  
  const getIcon = () => {
    switch (activity.type) {
      case 'patient':
        return <UserIcon size={20} color={Colors.primary.main} />;
      case 'experiment':
        return <FlaskRoundIcon size={20} color={Colors.secondary.main} />;
      case 'billing':
        return <CreditCardIcon size={20} color={Colors.warning.main} />;
      case 'inventory':
        return <PackageIcon size={20} color={Colors.accent.main} />;
      default:
        return <UserIcon size={20} color={Colors.primary.main} />;
    }
  };

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.surface }]} elevation={1}>
      <View style={styles.iconContainer}>{getIcon()}</View>
      <View style={styles.contentContainer}>
        <Text variant="bodyMedium" style={styles.description}>
          {activity.description}
        </Text>
        <View style={styles.detailsContainer}>
          <View style={styles.timeContainer}>
            <ClockIcon size={14} color={theme.colors.outline} />
            <Text variant="bodySmall" style={styles.timestamp}>
              {getTimeAgo(activity.timestamp)}
            </Text>
          </View>
          {activity.status && (
            <StatusBadge status={activity.status as any} />
          )}
        </View>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  description: {
    marginBottom: 6,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    marginLeft: 4,
    opacity: 0.7,
  },
});