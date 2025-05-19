import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Colors } from '../../constants/theme';

interface StatusBadgeProps {
  status: 'paid' | 'pending' | 'overdue' | 'completed' | 'in-progress' | 'failed';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case 'paid':
      case 'completed':
        return {
          backgroundColor: Colors.success.light,
          color: Colors.success.dark,
        };
      case 'pending':
      case 'in-progress':
        return {
          backgroundColor: Colors.warning.light,
          color: Colors.warning.dark,
        };
      case 'overdue':
      case 'failed':
        return {
          backgroundColor: Colors.error.light,
          color: Colors.error.dark,
        };
      default:
        return {
          backgroundColor: Colors.light.background,
          color: Colors.light.text,
        };
    }
  };

  const displayText = status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
  const colorStyle = getColor();

  return (
    <Text
      style={[
        styles.badge,
        {
          backgroundColor: colorStyle.backgroundColor,
          color: colorStyle.color,
        },
      ]}
    >
      {displayText}
    </Text>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    overflow: 'hidden',
  },
});