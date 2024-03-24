import React from 'react';
import { ScrollView, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const Kwh_YearlyChart = () => {
  const chartData = {
    labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [{
      data: [500, 743, 1500, 1286, 876, 940, 867, 790, 877, 1023, 1100, 980] 
    }]
  };

  // Adjust the chartWidth to accommodate all labels properly. 
  // This could be dynamic based on the number of labels and desired spacing.
  const chartWidth = 12 * 50; 

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={true}>
      <View>
        <BarChart
          data={chartData}
          width={chartWidth} // Use a dynamic or fixed width larger than the screen to enable scrolling
          height={280}
          yAxisLabel=""
          yAxisSuffix=" ك.و.س"
          chartConfig={{
            backgroundColor: '#f2f2f2',
            backgroundGradientFrom: '#f2f2f2',
            backgroundGradientTo: '#f2f2f2',
            decimalPlaces: 2,
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

export default Kwh_YearlyChart;