import React from 'react';
import { ScrollView, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const V_MonthlyChart = () => {
  const currentCapacity = 400; // Amps
  const loadPowerKw = 100; // kW
  const powerFactor = 1; // Purely resistive load assumption
  const voltageRequired = (loadPowerKw * 1000) / (Math.sqrt(3) * currentCapacity * powerFactor); // Calculate voltage

  // Assuming the same voltage requirement applies for each month
  const chartData = {
    labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [{
      data: new Array(12).fill(voltageRequired) // Fill the array with the calculated voltage for each month
    }]
  };

  const chartWidth = 12 * 50; // Adjust as necessary for visualization

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={true}>
      <View>
        <BarChart
          data={chartData}
          width={chartWidth}
          height={280}
          yAxisLabel=""
          yAxisSuffix=" V" // Displaying in Volts
          chartConfig={{
            backgroundColor: '#f2f2f2',
            backgroundGradientFrom: '#f2f2f2',
            backgroundGradientTo: '#f2f2f2',
            decimalPlaces: 2, // Adjust for precision
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

export default V_MonthlyChart;