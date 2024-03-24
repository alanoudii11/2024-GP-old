import React from 'react';
import { ScrollView, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const V_WeeklyChart = () => {
  // Constants and formula to calculate required voltage
  const currentCapacity = 400; // Amps
  const loadPowerKw = 100; // kW
  const powerFactor = 1; // Purely resistive load assumption
  const voltageRequired = (loadPowerKw * 1000) / (Math.sqrt(3) * currentCapacity * powerFactor); // Voltage calculation

  // Generate chart data with the calculated voltage for each day of the week
  const chartData = {
    labels: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    datasets: [{
      data: new Array(7).fill(voltageRequired) // Fill each day with the calculated voltage
    }]
  };

  const chartWidth = 350; // Width of the chart

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={true}>
      <View>
        <BarChart
          data={chartData}
          width={chartWidth}
          height={280}
          yAxisLabel=""
          yAxisSuffix=" V" // Suffix to indicate voltage
          chartConfig={{
            backgroundColor: '#f2f2f2',
            backgroundGradientFrom: '#f2f2f2',
            backgroundGradientTo: '#f2f2f2',
            decimalPlaces: 2, // Adjust decimal places as needed
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

export default V_WeeklyChart;