import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { LineChart as RNLineChart } from 'react-native-chart-kit';
import { ChartData } from '../../types';

interface LineChartProps {
  title: string;
  data: ChartData;
}

export const LineChart: React.FC<LineChartProps> = ({ title, data }) => {
  const theme = useTheme();
  const screenWidth = Dimensions.get('window').width - 32; // with 16px padding on each side

  const chartConfig = {
    backgroundColor: theme.colors.surface,
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(3, 102, 214, ${opacity})`,
    labelColor: (opacity = 1) => theme.colors.onSurface + opacity.toString().substring(1),
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: theme.colors.primary,
    },
  };

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.title}>
        {title}
      </Text>
      <RNLineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        fromZero
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  chart: {
    borderRadius: 8,
  },
});