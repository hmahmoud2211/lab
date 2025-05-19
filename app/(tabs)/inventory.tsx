import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Appbar, Card, Chip, Text, useTheme, Dialog, Portal, Button, Divider, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InventoryItem } from '@/types';
import { inventoryItems } from '@/data/mockData';
import { useI18n } from '@/context/I18nContext';
import { Package as PackageIcon } from 'lucide-react-native';

export default function InventoryScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { isRTL } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'lowStock' | 'nearExpiry'>('all');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const isTabletOrDesktop = windowWidth >= 768;

  const today = new Date();
  const oneMonthLater = new Date();
  oneMonthLater.setMonth(today.getMonth() + 1);

  const filteredItems = inventoryItems.filter(item => {
    // Apply search filter
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply category filter
    if (filter === 'lowStock') {
      return item.quantity <= item.reorderLevel;
    } else if (filter === 'nearExpiry') {
      if (!item.expiryDate) return false;
      const expiryDate = new Date(item.expiryDate);
      return expiryDate <= oneMonthLater;
    }
    
    return true;
  });

  const handleItemPress = (item: InventoryItem) => {
    setSelectedItem(item);
    setDialogVisible(true);
  };

  const isLowStock = (item: InventoryItem) => {
    return item.quantity <= item.reorderLevel;
  };

  const renderInventoryItem = ({ item }: { item: InventoryItem }) => (
    <Card 
      style={[styles.card, isTabletOrDesktop && styles.cardTablet]} 
      onPress={() => handleItemPress(item)}
    >
      <Card.Content>
        <View style={styles.cardHeader}>
          <Text variant="titleMedium">{item.name}</Text>
          {isLowStock(item) && (
            <Chip 
              mode="flat" 
              style={{ backgroundColor: theme.colors.errorContainer }}
              textStyle={{ color: theme.colors.error }}
            >
              {t('inventory.lowStock')}
            </Chip>
          )}
        </View>
        
        <View style={styles.cardBody}>
          <View style={styles.quantityContainer}>
            <View style={styles.iconContainer}>
              <PackageIcon size={24} color={theme.colors.primary} />
            </View>
            <View>
              <Text variant="displaySmall" style={styles.quantityText}>
                {item.quantity}
              </Text>
              <Text variant="bodySmall" style={styles.unitText}>
                {item.unit}
              </Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Text variant="bodySmall" style={styles.label}>{t('inventory.category')}</Text>
            <Text variant="bodyMedium">{item.category}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text variant="bodySmall" style={styles.label}>{t('inventory.location')}</Text>
            <Text variant="bodyMedium">{item.location}</Text>
          </View>
          
          {item.expiryDate && (
            <View style={styles.infoRow}>
              <Text variant="bodySmall" style={styles.label}>{t('inventory.expiryDate')}</Text>
              <Text variant="bodyMedium">{item.expiryDate}</Text>
            </View>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.Content title={t('inventory.title')} />
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

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Chip
            selected={filter === 'all'}
            onPress={() => setFilter('all')}
            style={styles.filterChip}
            mode={filter === 'all' ? 'flat' : 'outlined'}
          >
            {t('inventory.allItems')}
          </Chip>
          <Chip
            selected={filter === 'lowStock'}
            onPress={() => setFilter('lowStock')}
            style={styles.filterChip}
            mode={filter === 'lowStock' ? 'flat' : 'outlined'}
          >
            {t('inventory.lowStock')}
          </Chip>
          <Chip
            selected={filter === 'nearExpiry'}
            onPress={() => setFilter('nearExpiry')}
            style={styles.filterChip}
            mode={filter === 'nearExpiry' ? 'flat' : 'outlined'}
          >
            {t('inventory.nearExpiry')}
          </Chip>
        </ScrollView>
      </View>

      <FlatList
        data={filteredItems}
        renderItem={renderInventoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        numColumns={isTabletOrDesktop ? 2 : 1}
        key={isTabletOrDesktop ? 'two-column' : 'one-column'}
      />

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>{t('inventory.itemDetails')}</Dialog.Title>
          <Dialog.Content>
            {selectedItem && (
              <View>
                <Text variant="titleLarge">{selectedItem.name}</Text>
                <Divider style={styles.divider} />
                
                <View style={styles.dialogRow}>
                  <Text variant="bodyMedium">{t('inventory.category')}:</Text>
                  <Text variant="bodyMedium">{selectedItem.category}</Text>
                </View>
                
                <View style={styles.dialogRow}>
                  <Text variant="bodyMedium">{t('inventory.quantity')}:</Text>
                  <Text 
                    variant="bodyMedium" 
                    style={isLowStock(selectedItem) ? styles.lowStockText : undefined}
                  >
                    {selectedItem.quantity} {selectedItem.unit}
                  </Text>
                </View>
                
                <View style={styles.dialogRow}>
                  <Text variant="bodyMedium">{t('inventory.reorderLevel')}:</Text>
                  <Text variant="bodyMedium">{selectedItem.reorderLevel} {selectedItem.unit}</Text>
                </View>
                
                <View style={styles.dialogRow}>
                  <Text variant="bodyMedium">{t('inventory.location')}:</Text>
                  <Text variant="bodyMedium">{selectedItem.location}</Text>
                </View>
                
                <View style={styles.dialogRow}>
                  <Text variant="bodyMedium">{t('inventory.expiryDate')}:</Text>
                  <Text variant="bodyMedium">
                    {selectedItem.expiryDate || t('inventory.noExpiryDate')}
                  </Text>
                </View>
                
                <Divider style={styles.divider} />
                
                <View style={styles.actionButtonsContainer}>
                  <Button 
                    mode="outlined" 
                    onPress={() => console.log('Add stock')}
                    style={styles.actionButton}
                    icon="plus"
                  >
                    {t('inventory.addStock')}
                  </Button>
                  <Button 
                    mode="outlined" 
                    onPress={() => console.log('Remove stock')}
                    style={styles.actionButton}
                    icon="minus"
                  >
                    {t('inventory.removeStock')}
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
    paddingBottom: 8,
  },
  searchbar: {
    elevation: 2,
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    marginRight: 16,
  },
  quantityText: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  unitText: {
    opacity: 0.7,
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
  divider: {
    marginVertical: 12,
  },
  lowStockText: {
    color: '#D50000',
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