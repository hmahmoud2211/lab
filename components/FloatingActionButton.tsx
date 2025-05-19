import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, Portal, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

interface FABAction {
  icon: string;
  label: string;
  onPress: () => void;
}

interface FloatingActionButtonProps {
  actions: FABAction[];
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ actions }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const { t } = useTranslation();

  const onStateChange = ({ open }: { open: boolean }) => setOpen(open);

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? 'close' : 'plus'}
        color={theme.colors.surface}
        fabStyle={{ backgroundColor: theme.colors.primary }}
        actions={actions.map(action => ({
          icon: action.icon,
          label: action.label,
          onPress: action.onPress,
          color: theme.colors.primary,
        }))}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // Close the FAB group
          }
        }}
      />
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});