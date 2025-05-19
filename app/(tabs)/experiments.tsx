import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Appbar, Card, Chip, Text, useTheme, Dialog, Portal, Button, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Experiment } from '@/types';
import { experiments } from '@/data/mockData';
import { StatusBadge } from '@/components/common/StatusBadge';
import { useI18n } from '@/context/I18nContext';

export default function ExperimentsScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { isRTL } = useI18n();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const isTabletOrDesktop = windowWidth >= 768;

  const filteredExperiments = selectedStatus
    ? experiments.filter((exp) => exp.status === selectedStatus)
    : experiments;

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(selectedStatus === status ? null : status);
  };

  const handleExperimentPress = (experiment: Experiment) => {
    setSelectedExperiment(experiment);
    setDialogVisible(true);
  };

  const renderExperimentCard = ({ item }: { item: Experiment }) => (
    <Card 
      style={[styles.card, isTabletOrDesktop && styles.cardTablet]} 
      onPress={() => handleExperimentPress(item)}
    >
      <Card.Content>
        <View style={styles.cardHeader}>
          <Text variant="titleMedium">{item.name}</Text>
          <StatusBadge status={item.status} />
        </View>
        
        <View style={styles.cardBody}>
          <View style={styles.infoRow}>
            <Text variant="bodySmall" style={styles.label}>{t('experiments.patient')}</Text>
            <Text variant="bodyMedium">{item.patientName}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text variant="bodySmall" style={styles.label}>{t('experiments.type')}</Text>
            <Text variant="bodyMedium">{item.type}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text variant="bodySmall" style={styles.label}>{t('experiments.startDate')}</Text>
            <Text variant="bodyMedium">{item.startDate}</Text>
          </View>
          
          {item.endDate && (
            <View style={styles.infoRow}>
              <Text variant="bodySmall" style={styles.label}>{t('experiments.endDate')}</Text>
              <Text variant="bodyMedium">{item.endDate}</Text>
            </View>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.Content title={t('experiments.title')} />
        <Appbar.Action icon="plus" onPress={() => {}} />
      </Appbar.Header>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Chip
            selected={selectedStatus === 'pending'}
            onPress={() => handleStatusFilter('pending')}
            style={styles.filterChip}
            mode={selectedStatus === 'pending' ? 'flat' : 'outlined'}
          >
            {t('experiments.pending')}
          </Chip>
          <Chip
            selected={selectedStatus === 'in-progress'}
            onPress={() => handleStatusFilter('in-progress')}
            style={styles.filterChip}
            mode={selectedStatus === 'in-progress' ? 'flat' : 'outlined'}
          >
            {t('experiments.inProgress')}
          </Chip>
          <Chip
            selected={selectedStatus === 'completed'}
            onPress={() => handleStatusFilter('completed')}
            style={styles.filterChip}
            mode={selectedStatus === 'completed' ? 'flat' : 'outlined'}
          >
            {t('experiments.completed')}
          </Chip>
          <Chip
            selected={selectedStatus === 'failed'}
            onPress={() => handleStatusFilter('failed')}
            style={styles.filterChip}
            mode={selectedStatus === 'failed' ? 'flat' : 'outlined'}
          >
            {t('experiments.failed')}
          </Chip>
        </ScrollView>
      </View>

      <FlatList
        data={filteredExperiments}
        renderItem={renderExperimentCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        numColumns={isTabletOrDesktop ? 2 : 1}
        key={isTabletOrDesktop ? 'two-column' : 'one-column'}
      />

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>{t('experiments.experimentDetails')}</Dialog.Title>
          <Dialog.Content>
            {selectedExperiment && (
              <View>
                <Text variant="titleLarge">{selectedExperiment.name}</Text>
                <View style={styles.dialogRow}>
                  <Text variant="bodyMedium">{t('experiments.status')}:</Text>
                  <StatusBadge status={selectedExperiment.status} />
                </View>
                
                <Divider style={styles.divider} />
                
                <View style={styles.dialogRow}>
                  <Text variant="bodyMedium">{t('experiments.patient')}:</Text>
                  <Text variant="bodyMedium">{selectedExperiment.patientName}</Text>
                </View>
                
                <View style={styles.dialogRow}>
                  <Text variant="bodyMedium">{t('experiments.type')}:</Text>
                  <Text variant="bodyMedium">{selectedExperiment.type}</Text>
                </View>
                
                <View style={styles.dialogRow}>
                  <Text variant="bodyMedium">{t('experiments.startDate')}:</Text>
                  <Text variant="bodyMedium">{selectedExperiment.startDate}</Text>
                </View>
                
                <View style={styles.dialogRow}>
                  <Text variant="bodyMedium">{t('experiments.endDate')}:</Text>
                  <Text variant="bodyMedium">
                    {selectedExperiment.endDate || '-'}
                  </Text>
                </View>
                
                <Divider style={styles.divider} />
                
                <Text variant="titleSmall" style={styles.sectionTitle}>
                  {t('experiments.results')}
                </Text>
                <Text variant="bodyMedium">
                  {selectedExperiment.results || t('experiments.noResults')}
                </Text>
                
                {selectedExperiment.status !== 'completed' && selectedExperiment.status !== 'failed' && (
                  <View style={styles.actionButtonsContainer}>
                    <Button 
                      mode="outlined" 
                      onPress={() => console.log('Update status')}
                      style={styles.actionButton}
                    >
                      {t('experiments.updateStatus')}
                    </Button>
                    <Button 
                      mode="outlined" 
                      onPress={() => console.log('Add results')}
                      style={styles.actionButton}
                    >
                      {t('experiments.addResults')}
                    </Button>
                  </View>
                )}
              </View>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>{t('common.done')}</Button>
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
  listContent: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
  },
  cardTablet: {
    flex: 1,
    margin: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardBody: {
    marginTop: 8,
  },
  infoRow: {
    marginBottom: 8,
  },
  label: {
    opacity: 0.7,
    marginBottom: 2,
  },
  dialogRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  sectionTitle: {
    marginTop: 8,
    marginBottom: 8,
  },
  divider: {
    marginVertical: 12,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});

// Import the missing ScrollView component
import { ScrollView } from 'react-native';