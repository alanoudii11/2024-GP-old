import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const Gauge = ({ value }) => {
  const gaugeWidth = 200;
  const gaugeHeight = 100;
  const gaugeStrokeColor = value > 50 ? "red" : "green"; // Set stroke color dynamically
  const getPath = () => {
    const x = gaugeWidth / 2;
    const y = gaugeHeight / 2;
    const radius = gaugeHeight / 2;

    // Background circle path
    const backgroundCircle = `M${x},${y} m${-radius},0 a${radius},${radius} 0 1,0 ${radius * 2},0 a${radius},${radius} 0 1,0 ${-radius * 2},0`;

    // Gauge line path
    
    const largeArcFlag = value > 50 ? 1 : 0;
    const centerX = x - (gaugeWidth * value) / 100;
    const endPointX = x - radius;
    const sweepFlag = 1;
    const gaugePath = `M${x},${y}
            L${centerX},${y}
            A${radius},${radius},0,${largeArcFlag},${sweepFlag},${endPointX},${y}
            Z`;

    return `${backgroundCircle} ${gaugePath}`;
  };

  return (
    <View style={styles.container}>
      <Svg width={gaugeWidth} height={gaugeHeight}>
        <Path d={getPath()} fill="#ccc" />
        {/* Set background circle color to gray */}
        <Path d={getPath()} fill="transparent" stroke={gaugeStrokeColor} strokeWidth={2} />
        {/* Set gauge line stroke color dynamically */}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Gauge;

