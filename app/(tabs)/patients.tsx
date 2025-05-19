import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Appbar, Card, Searchbar, Avatar, Text, Button, Dialog, Portal, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Patient } from '@/types';
import { patients } from '@/data/mockData';
import { useI18n } from '@/context/I18nContext';

export default function PatientsScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { isRTL } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const isTabletOrDesktop = windowWidth >= 768;

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePatientPress = (patient: Patient) => {
    setSelectedPatient(patient);
    setDialogVisible(true);
  };

  const renderPatientCard = ({ item }: { item: Patient }) => (
    <Card 
      style={[styles.card, isTabletOrDesktop && styles.cardTablet]} 
      onPress={() => handlePatientPress(item)}
    >
      <Card.Content style={styles.cardContent}>
        <Avatar.Text 
          size={50} 
          label={item.name.split(' ').map(n => n[0]).join('')}
          style={{ backgroundColor: theme.colors.primary }}
        />
        <View style={styles.patientInfo}>
          <Text variant="titleMedium">{item.name}</Text>
          <View style={styles.patientDetails}>
            <View style={styles.detailItem}>
              <Text variant="bodySmall" style={styles.label}>{t('patients.age')}</Text>
              <Text variant="bodyMedium">{item.age}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text variant="bodySmall" style={styles.label}>{t('patients.gender')}</Text>
              <Text variant="bodyMedium">{item.gender}</Text>
            </View>
          </View>
          <View style={styles.patientDetails}>
            <View style={styles.detailItem}>
              <Text variant="bodySmall" style={styles.label}>{t('patients.lastVisit')}</Text>
              <Text variant="bodyMedium">{item.lastVisit}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text variant="bodySmall" style={styles.label}>{t('patients.upcomingAppointment')}</Text>
              <Text variant="bodyMedium">
                {item.upcomingAppointment || t('patients.noUpcomingAppointment')}
              </Text>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.Content title={t('patients.title')} />
        <Appbar.Action icon="plus" onPress={() => {}} />
      </Appbar.Header>

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder={t('common.search')}
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      <FlatList
        data={filteredPatients}
        renderItem={renderPatientCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        numColumns={isTabletOrDesktop ? 2 : 1}
        key={isTabletOrDesktop ? 'two-column' : 'one-column'}
      />

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>{t('patients.patientDetails')}</Dialog.Title>
          <Dialog.Content>
            {selectedPatient && (
              <View>
                <Text variant="titleLarge">{selectedPatient.name}</Text>
                <View style={styles.dialogRow}>
                  <Text variant="bodyMedium">{t('patients.age')}:</Text>
                  <Text variant="bodyMedium">{selectedPatient.age}</Text>
                </View>
                <View style={styles.dialogRow}>
                  <Text variant="bodyMedium">{t('patients.gender')}:</Text>
                  <Text variant="bodyMedium">{selectedPatient.gender}</Text>
                </View>
                <View style={styles.dialogRow}>
                  <Text variant="bodyMedium">{t('patients.contactNumber')}:</Text>
                  <Text variant="bodyMedium">{selectedPatient.contactNumber}</Text>
                </View>
                <View style={styles.dialogRow}>
                  <Text variant="bodyMedium">{t('patients.email')}:</Text>
                  <Text variant="bodyMedium">{selectedPatient.email}</Text>
                </View>
                
                <Text variant="titleSmall" style={styles.sectionTitle}>
                  {t('patients.medicalHistory')}
                </Text>
                {selectedPatient.medicalHistory.map((condition, index) => (
                  <Text key={index} variant="bodyMedium" style={styles.condition}>
                    • {condition}
                  </Text>
                ))}
                
                <View style={styles.actionButtonsContainer}>
                  <Button 
                    mode="outlined" 
                    onPress={() => console.log('View tests')}
                    style={styles.actionButton}
                  >
                    {t('patients.viewTests')}
                  </Button>
                  <Button 
                    mode="outlined" 
                    onPress={() => console.log('View bills')}
                    style={styles.actionButton}
                  >
                    {t('patients.viewBills')}
                  </Button>
                </View>
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
  searchContainer: {
    padding: 16,
  },
  searchbar: {
    elevation: 2,
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
  cardContent: {
    flexDirection: 'row',
  },
  patientInfo: {
    marginLeft: 16,
    flex: 1,
  },
  patientDetails: {
    flexDirection: 'row',
    marginTop: 8,
  },
  detailItem: {
    marginRight: 24,
  },
  label: {
    opacity: 0.7,
  },
  dialogRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  condition: {
    marginBottom: 4,
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