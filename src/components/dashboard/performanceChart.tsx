import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { useTheme } from '@/src/constants/themeContext';

const PerformanceBySection = () => {
  const { theme } = useTheme();
  const barData = [
    { value: 30, label: 'Quant.\nReas.' },
    { value: 60, label: 'Verb.\nReas.' },
    { value: 50, label: 'Data\nInsight' },
  ];

  const chartWidth = Dimensions.get('window').width - 120;
  const barCount = barData.length;
  const spacing = chartWidth / ((barCount * 2) - 1);
  const totalSpacing = spacing * (barCount - 1);
  const barWidth = (chartWidth - totalSpacing) / barCount;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor2,
      borderRadius: 10,
      padding: 20,
      justifyContent: "space-between",
      flexDirection: "column",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    title: {
      color: theme.textColor1,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    chartContainer: {
      alignItems: 'center',
      width: "100%"
    },
    yAxisText: {
      color: theme.graphLabel,
      fontSize: 12,
    },
    xAxisText: {
      color: theme.graphLabel,
      fontSize: 12,
      marginTop: 4,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PERFORMANCE BY SECTION</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={barData.map(x => ({ ...x, frontColor: theme.primeColor }))}
          width={Dimensions.get('window').width - 120}
          height={150}
          barWidth={barWidth}
          spacing={spacing}
          initialSpacing={0}
          endSpacing={0}
          barBorderTopLeftRadius={5}
          barBorderTopRightRadius={5}
          noOfSections={4}
          maxValue={Math.max(...(barData.map(x => x.value))) + 20}
          yAxisThickness={0}
          xAxisThickness={1}
          yAxisTextStyle={styles.yAxisText}
          xAxisLabelTextStyle={styles.xAxisText}
          xAxisColor={theme.graphLines}
          yAxisLabelWidth={30}
          backgroundColor={theme.backgroundColor2}
          rulesType="solid"
          rulesColor={theme.graphLines}
          yAxisAtTop
        />
      </View>
    </View>
  );
};

export default PerformanceBySection;