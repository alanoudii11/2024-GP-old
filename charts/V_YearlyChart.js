import React from 'react';
import { ScrollView, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const V_YearlyChart = () => {
  // Given constants for calculation
  const currentCapacity = 400; // Amps
  const loadPowerKw = 100; // kW
  const powerFactor = 1; // Purely resistive load assumption
  
  // Calculate the required voltage using the provided formula
  const voltageRequired = (loadPowerKw * 1000) / (Math.sqrt(3) * currentCapacity * powerFactor);

  // Assuming the voltage requirement is constant across all months for visualization purposes
  const chartData = {
    labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [{
      data: Array(12).fill(voltageRequired) // Fill each month with the calculated voltage
    }]
  };

  const chartWidth = 12 * 50; // Adjust the chart width to accommodate all labels properly

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={true}>
      <View>
        <BarChart
          data={chartData}
          width={chartWidth}
          height={280}
          yAxisLabel=""
          yAxisSuffix=" V" // Suffix to denote voltage
          chartConfig={{
            backgroundColor: '#f2f2f2',
            backgroundGradientFrom: '#f2f2f2',
            backgroundGradientTo: '#f2f2f2',
            decimalPlaces: 2, // Adjust as necessary, though voltage typically doesn't need decimals
            color: (opacity = 1) => `rgba(0, 163, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            barPercentage: 0.5,
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
          fromZero
        />
      </View>
    </ScrollView>
  );
};

export default V_YearlyChart;