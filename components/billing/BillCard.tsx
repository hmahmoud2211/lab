import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';
import { Bill } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { useI18n } from '../../context/I18nContext';
import { useTranslation } from 'react-i18next';

interface BillCardProps {
  bill: Bill;
  onPress: (bill: Bill) => void;
}

export const BillCard: React.FC<BillCardProps> = ({ bill, onPress }) => {
  const theme = useTheme();
  const { isRTL } = useI18n();
  const { t } = useTranslation();

  return (
    <Pressable onPress={() => onPress(bill)}>
      <Surface 
        style={[
          styles.container, 
          { backgroundColor: theme.colors.surface },
          isRTL && styles.rtlContainer
        ]} 
        elevation={1}
      >
        <View style={[styles.header, isRTL && styles.rtlHeader]}>
          <Text variant="titleMedium">{bill.patientName}</Text>
          <StatusBadge status={bill.status} />
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text variant="bodySmall" style={styles.label}>
              {t('billing.billDate')}
            </Text>
            <Text variant="bodyMedium">{bill.date}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text variant="bodySmall" style={styles.label}>
              {t('billing.dueDate')}
            </Text>
            <Text variant="bodyMedium">{bill.dueDate}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text variant="bodySmall" style={styles.label}>
              {t('billing.amount')}
            </Text>
            <Text variant="titleMedium" style={styles.amount}>
              ${bill.amount.toFixed(2)}
            </Text>
          </View>
        </View>
      </Surface>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  rtlContainer: {
    flexDirection: 'row-reverse',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rtlHeader: {
    flexDirection: 'row-reverse',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  detailItem: {
    minWidth: 80,
  },
  label: {
    opacity: 0.7,
    marginBottom: 4,
  },
  amount: {
    fontWeight: 'bold',
  },
});