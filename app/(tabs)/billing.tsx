import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Appbar, Button, Dialog, Portal, Text, useTheme, Divider, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BillCard } from '@/components/billing/BillCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Bill } from '@/types';
import { bills } from '@/data/mockData';
import { useI18n } from '@/context/I18nContext';

export default function BillingScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { isRTL } = useI18n();
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid' | 'overdue'>('all');
  const windowWidth = Dimensions.get('window').width;
  const isTabletOrDesktop = windowWidth >= 768;

  const filteredBills = bills.filter(bill => {
    if (filter === 'all') return true;
    return bill.status === filter;
  });

  const handleBillPress = (bill: Bill) => {
    setSelectedBill(bill);
    setDialogVisible(true);
  };

  const handleMarkAsPaid = () => {
    // In a real app, this would update the backend
    console.log(`Marked bill ${selectedBill?.id} as paid`);
    setDialogVisible(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.Content title={t('billing.title')} />
        <Appbar.Action icon="plus" onPress={() => {}} />
      </Appbar.Header>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Chip
            selected={filter === 'all'}
            onPress={() => setFilter('all')}
            style={styles.filterChip}
            mode={filter === 'all' ? 'flat' : 'outlined'}
          >
            {t('billing.allBills')}
          </Chip>
          <Chip
            selected={filter === 'pending'}
            onPress={() => setFilter('pending')}
            style={styles.filterChip}
            mode={filter === 'pending' ? 'flat' : 'outlined'}
          >
            {t('billing.pendingBills')}
          </Chip>
          <Chip
            selected={filter === 'paid'}
            onPress={() => setFilter('paid')}
            style={styles.filterChip}
            mode={filter === 'paid' ? 'flat' : 'outlined'}
          >
            {t('billing.paidBills')}
          </Chip>
          <Chip
            selected={filter === 'overdue'}
            onPress={() => setFilter('overdue')}
            style={styles.filterChip}
            mode={filter === 'overdue' ? 'flat' : 'outlined'}
          >
            {t('billing.overdueBills')}
          </Chip>
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          isTabletOrDesktop && styles.contentContainerTablet
        ]}
      >
        {filteredBills.map((bill) => (
          <View 
            key={bill.id} 
            style={isTabletOrDesktop ? styles.billCardTablet : styles.billCardMobile}
          >
            <BillCard bill={bill} onPress={handleBillPress} />
          </View>
        ))}
      </ScrollView>

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>{t('billing.billDetails')}</Dialog.Title>
          <Dialog.Content>
            {selectedBill && (
              <View>
                <View style={styles.dialogRow}>
                  <Text variant="bodyMedium">{t('billing.patientName')}:</Text>
                  <Text variant="bodyMedium">{selectedBill.patientName}</Text>
                </View>
                <View style={styles.dialogRow}>
                  <Text variant="bodyMedium">{t('billing.status')}:</Text>
                  <StatusBadge status={selectedBill.status} />
                </View>
                <View style={styles.dialogRow}>
                  <Text variant="bodyMedium">{t('billing.billDate')}:</Text>
                  <Text variant="bodyMedium">{selectedBill.date}</Text>
                </View>
                <View style={styles.dialogRow}>
                  <Text variant="bodyMedium">{t('billing.dueDate')}:</Text>
                  <Text variant="bodyMedium">{selectedBill.dueDate}</Text>
                </View>
                <Divider style={styles.divider} />
                <Text variant="titleSmall" style={styles.itemsTitle}>
                  {t('billing.items')}
                </Text>
                
                {selectedBill.items.map((item) => (
                  <View key={item.id} style={styles.billItem}>
                    <Text variant="bodyMedium">{item.description}</Text>
                    <View style={styles.billItemDetails}>
                      <Text variant="bodySmall">
                        {item.quantity} x ${item.unitPrice.toFixed(2)}
                      </Text>
                      <Text variant="bodyMedium">${item.total.toFixed(2)}</Text>
                    </View>
                  </View>
                ))}
                
                <Divider style={styles.divider} />
                <View style={styles.totalRow}>
                  <Text variant="titleMedium">{t('billing.total')}</Text>
                  <Text variant="titleMedium">${selectedBill.amount.toFixed(2)}</Text>
                </View>
              </View>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>{t('common.cancel')}</Button>
            {selectedBill?.status !== 'paid' && (
              <Button onPress={handleMarkAsPaid}>{t('billing.markAsPaid')}</Button>
            )}
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
  filterContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  filterChip: {
    marginRight: 8,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  contentContainerTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  billCardMobile: {
    width: '100%',
  },
  billCardTablet: {
    width: '48%',
  },
  dialogRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 12,
  },
  itemsTitle: {
    marginBottom: 8,
  },
  billItem: {
    marginBottom: 8,
  },
  billItemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
});