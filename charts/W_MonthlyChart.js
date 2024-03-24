import React from 'react';
import { ScrollView, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const W_MonthlyChart = () => {
  // Converted data values from kWh to watts by multiplying by 1,000
  const chartData = {
    labels: ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١٠', '١١', '١٢', '١٣', '١٤', '١٥', '١٦', '١٧', '١٨', '١٩', '٢٠', '٢١', '٢٢', '٢٣', '٢٤', '٢٥', '٢٦', '٢٧', '٢٨', '٢٩', '٣٠', '٣١'],
    datasets: [{
      data: [22, 50, 33, 22, 35, 18, 11, 5, 14, 6, 12, 14, 22, 48, 33, 22, 35, 18, 11, 5, 7, 6, 12, 14, 24, null, null, null, null, null, null].map(value => value !== null ? value * 1000 : null) 
    }]
  };

  const chartWidth = chartData.labels.length * 40; 

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={true}>
      <View>
        <BarChart
          data={chartData}
          width={chartWidth} // Adjusted width for scrolling
          height={280}
          yAxisLabel=""
          yAxisSuffix=" واط" // Changed to Watts
          chartConfig={{
            backgroundColor: '#f2f2f2',
            backgroundGradientFrom: '#f2f2f2',
            backgroundGradientTo: '#f2f2f2',
            decimalPlaces: 0, // Adjusted for whole numbers since dealing with watts
            color: (opacity = 1) => `rgba(0, 163, 255, ${opacity})`, // Line/bar color
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
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

export default W_MonthlyChart;