//---------------RealTimeCharts.js----------------------
import React, { useEffect, useState } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const RealTimeChart = ({ apiUrl }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const maxDataPoints = 60; // Maximum number of data points to display

  useEffect(() => {
    let isMounted = true; // flag to check if the component is mounted

    const fetchDataAndUpdateChart = async () => {
      if (!isMounted) return;
    
      try {
        const response = await fetch(apiUrl);
        const json = await response.json();
    
        // Check if the expected data structure is not present
        if (typeof json !== 'object' || json === null) {
          console.error('Unexpected response structure:', json);
          throw new Error('Data is not an object or is null');
        }
    
        let totalUsage = 0;
        // Loop over each device in the response
        for (const deviceId in json) {
          const device = json[deviceId];
          if (device && typeof device === 'object' && device.channels) {
            // Loop over each channel in the device
            for (const channelId in device.channels) {
              const channel = device.channels[channelId];
              if (channel && typeof channel === 'object' && !isNaN(channel.usage)) {
                // Accumulate total usage if it's a number
                totalUsage += Number(channel.usage);
              }
            }
          }
        }
    
        // Update chart data using the accumulated totalUsage
        const now = new Date();
        const currentTime = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        
        setChartData(prevChartData => {
          const dataLength = prevChartData.datasets[0].data.length;
          const labels = dataLength >= maxDataPoints ? prevChartData.labels.slice(1) : prevChartData.labels;
          const data = dataLength >= maxDataPoints ? prevChartData.datasets[0].data.slice(1) : prevChartData.datasets[0].data;
          
          return {
            labels: [...labels, currentTime],
            datasets: [
              {
                data: [...data, totalUsage],
              }
            ]
          };
        });
    
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(fetchDataAndUpdateChart, 1000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View>
      {chartData.labels.length > 0 ? (
        <LineChart
          data={chartData}
          width={350}
          height={280}
          yAxisLabel="kW"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 6,
            color: (opacity = 1) => `rgba(106, 201, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 0,
            borderRadius: 16,
          }}
        />
      ) : (
        <Text>Fetching Data...</Text>
      )}
    </View>
  );
};

export default RealTimeChart;