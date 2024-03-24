import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const V_DailyChart = () => {
  const [chartData, setChartData] = useState({
    labels: ["100kW"],
    datasets: [{ data: [] }],
  });

  // Assuming a 3-phase system with a 400A MCCB, calculating for a 100kW load
  // For simplicity, assuming a power factor (cos(phi)) of 1 and using the root 3 for 3-phase power calculation
  const currentCapacity = 400; // Amps
  const loadPowerKw = 100; // kW
  const powerFactor = 1; // Purely resistive load assumption
  const voltageRequired = (loadPowerKw * 1000) / (Math.sqrt(3) * currentCapacity * powerFactor);

  // Update chart data for demonstration
  useState(() => {
    setChartData(prevData => ({
      ...prevData,
      datasets: [{ data: [voltageRequired] }],
    }));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Voltage Requirement for 100kW Load</Text>
      <LineChart
        data={chartData}
        width={300}
        height={220}
        yAxisLabel="V"
        chartConfig={styles.chartConfig}
        bezier
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartConfig: {
    backgroundColor: '#eeeeee',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  },
});

export default V_DailyChart;
