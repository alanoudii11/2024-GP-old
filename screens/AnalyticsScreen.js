import React, { useState } from "react"; // Correctly import useState along with React
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,

} from "react-native";
import * as Icons from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import TopNavBar from "../navigation/TopNavBar";
import BottomNavBar from "../navigation/BottomNavBar";
import RealTimeChart from "../charts/RealTimeChart";
import SelectorBar from "../components/SelectorBar"; // adjust the path as necessary
import ProgressBar from "../components/CustomProgressBar";
import Gauge from "../components/Gauge";


export default function AnalyticsScreen() {
  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(6); // For the time selector
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(3); // For the metric selector
  const [unitValue, setUnitValue] = useState(73);
  const periodOptions = ["شهر","أسبوع","يوم","ساعة","دقيقة","مباشر",];
  
  const displayPeriodTextMapping = {
    // Should remove Monthly as the UI and remove the live as well. it's an Analytics screen not a real dashboard.
    0: "استهلاك الكهرباء الشهري (كيلو واط/ساعة)",
    1: "استهلاك الكهرباء الأسبوعي (كيلو واط/ساعة)",
    2: "استهلاك الكهرباء اليومي (كيلو واط/ساعة)",
    3: "استهلاك الكهرباء بالساعة (كيلو واط/ساعة)",
    4: "استهلاك الكهرباء بالدقيقة (كيلو واط/ساعة)",
    5: "استهلاك الكهرباء المباشر (كيلو واط/ساعة)",
  };

  // Displays a chart header based on the choice chosen from the selector bar
  const getPeriodDisplayText = (index) => displayPeriodTextMapping[index];

  const unitOptions = ["فولت", "أمبير", "واط", "كيلو واط/ساعة"]; // Adjusted metric options

  const handleLogout = async () => {
    await signOut(auth);
  };
  //KWH conversions
  function convertKwhToAmpere(kwh, voltage, powerFactor) {
    return Math.round((kwh * 1000) / (voltage * powerFactor));
  }
  function convertKwhToVoltage(kwh, current, powerFactor) {
    return Math.round((kwh * 1000) / (current * powerFactor));
  }
  function convertKwhToCarbon(kwh, carbonIntensity) {
    return Math.ceil(kwh * carbonIntensity);
  }
  //ampere conversions
  function convertAmpToKwh(ampere, voltage, powerFactor) {
    return Math.round((ampere * voltage * powerFactor) / 1000);
  }
  function convertAmpToVoltage(ampere, resistance) {
    return Math.round(ampere * resistance);
  }
  function convertAmpToCarbon(
    ampere,
    voltage,
    powerFactor,
    hoursUsed,
    carbonIntensity
  ) {
    const kW = (ampere * voltage * powerFactor) / 1000; // Convert to kW
    return Math.round(kW * hoursUsed * carbonIntensity);
  }
  //voltage conversions
  function convertVoltToAmpere(voltage, resistanceOrPowerFactor) {
    return Math.round(voltage / resistanceOrPowerFactor);
  }
  function convertVoltToCarbon(
    voltage,
    current,
    powerFactor,
    hoursUsed,
    carbonIntensity
  ) {
    const kW = (voltage * current * powerFactor) / 1000; // Convert to kW
    return Math.round(kW * hoursUsed * carbonIntensity);
  }
  //carbon conversions
  function convertCarbonToKwh(carbonEmissions, carbonIntensity) {
    return Math.round(carbonEmissions / carbonIntensity);
  }

  const calculateUnitValue = (baseValue, unitIndex) => {
    const prevOption = unitOptions[selectedUnitIndex];
    // console.log(prevOption== "ك.و.س");
    switch (unitOptions[unitIndex]) {
      case "كربون":
  const unitOptions = ["فولت", "أمبير", "واط", "كيلو واط/ساعة"]; // Adjusted metric options
        return prevOption == "كيلو واط/ساعة"
          ? convertKwhToCarbon(baseValue, 0.5)
          : prevOption == "أمبير"
          ? convertAmpToCarbon(baseValue, 220, 0.8, 2, 0.5)
          : prevOption == "فولت"
          ? convertVoltToCarbon(baseValue, 10, 0.8, 1, 0.5)
          : baseValue; // Example calculation for carbon
      case "فولت":
        return prevOption == "كيلو واط/ساعة"
          ? convertKwhToVoltage(baseValue, 20, 0.8)
          : prevOption == "أمبير"
          ? convertAmpToVoltage(baseValue, 5)
          : baseValue; // Example calculation for voltage
      case "أمبير":
        return prevOption == "كيلو واط/ساعة"
          ? convertKwhToAmpere(baseValue, 220, 0.8)
          : prevOption == "فولت"
          ? convertVoltToAmpere(baseValue, 5)
          : baseValue; // Example calculation for ampere
      case "كيلو واط/ساعة":
        return prevOption == "أمبير"
          ? convertAmpToKwh(baseValue, 220, 0.8)
          : prevOption == "كربون"
          ? convertCarbonToKwh(baseValue, 5)
          : baseValue; // Example calculation for kWh
      default:
        return baseValue;
    }
  };
 
  return (
    <View style={styles.container}>
      <TopNavBar />
      <ScrollView style={styles.scrollViewStyle}>
      <Text style={styles.goalText}>تابع تقدمك نحو هدفك!</Text>
      <View style={styles.goalContainer}>
          <Text style={styles.goalDescription}>
           هدفك هو تقليل فاتورتك إلى 900 ريال سعودي, مما يوفر 100 ريال سعودي مقارنة بفاتورة الشهر الماضي التي بلغت 1000 ريال سعودي.
          </Text>
          <ProgressBar current={500} target={900} style={{ width: 300 }} />


        </View>
        <View style={styles.dataContainer2}>
        <View style={styles.ContainerText}>
        <Text style={styles.conDescription}>
        نظرة على إستهلاك هذا الشهر:
          </Text>
          <Text style={styles.conDescription2}>
        للفترة: الأحد, 1 مارس حتى الإثنين 25 مارس 2024
          </Text>
          </View>
 <View style={styles.dataContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>التكلفة</Text>
              <Text style={styles.largeInfo}>58</Text>
              <Text style={styles.infoText}>ريال سعودي</Text>
            </View>
            <View style={styles.infoBox}>
            <Gauge value={25} />
            </View>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>استهلاك الشهر</Text>
              <Text style={styles.largeInfo}>20</Text>
              <Text style={styles.infoText}>كيلو واط/ساعة</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>استهلاك اليوم</Text>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.largeInfo}>{unitValue}</Text>
              <Text style={styles.infoText}>
                {unitOptions[selectedUnitIndex]}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>استهلاك الشهر</Text>
              <Text style={styles.largeInfo}>20</Text>
              <Text style={styles.infoText}>كيلو واط/ساعة</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>استهلاك اليوم</Text>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.largeInfo}>{unitValue}</Text>
              <Text style={styles.infoText}>
                {unitOptions[selectedUnitIndex]}
              </Text>
            </View>
          </View>
        </View></View>
        <View style={{ marginTop: 20}}>
          <Text style={styles.rightAlignedLabel}>الفترة</Text>
          <SelectorBar
            options={periodOptions}
            selectedIndex={selectedPeriodIndex}
            onSelect={setSelectedPeriodIndex}
          />
        </View>

        <View style={{ marginTop: 0,}}>
          <Text style={styles.rightAlignedLabel}>الوحدة</Text>
          <SelectorBar
            options={unitOptions}
            selectedIndex={selectedUnitIndex}
            onSelect={(index) => {
              setSelectedUnitIndex(index);
              setUnitValue(calculateUnitValue(unitValue, index));
            }}
          />
        </View>
       
        <View style={styles.chartContainer}>
          <Text style={styles.chartHeaderText}></Text>
          {selectedPeriodIndex === 5 && (
            <RealTimeChart apiUrl="http://127.0.0.1:5000/api/getRecentUsage" />
          )}
        </View>
      </ScrollView>
      <BottomNavBar />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#ffffff", no need
  },
  rightAlignedLabel: {
    alignSelf: "flex-end",
    fontSize: 16,
    marginBottom: 10,
    paddingHorizontal: 20,
    fontWeight: 'bold',


  },
  dataContainer: {
    paddingBottom: 0,

  },ContainerText:{
   
    marginHorizontal:25,
  },
  conDescription:{
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
    textAlign: 'right',
    fontWeight: '600',
    
  },
  conDescription2:{
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
    textAlign: 'right',
    fontWeight: '400',

  },
  dataContainer2: {// كله ماله داعي شوي
    //backgroundColor: 'rgba(192, 192, 192, 0.4)',
   marginHorizontal: "auto",
    borderRadius: 20,
    //padding: 20,
   marginTop:10,
   
  },
  safeAreaView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 2,
    
  },
  infoBox: {
    flex: 1,
    padding: 18,
    borderRadius: 20,
    backgroundColor: "#143638",
    margin: 10,
  },
  infoText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },infoText1:{
    color: "#fff",
    fontSize: 16,
    textAlign: "right",
  },
  largeInfo: {
    color: "#fff",
    fontSize: 36,
    textAlign: "center",
  },
  chartContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 25,
    marginTop: 0,
  },
  chartHeaderText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 0,
  },
  scrollViewStyle:{
    
  },goalText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 20,
    textAlign: 'right',
    marginHorizontal: 20,
  },
  goalContainer: {
    backgroundColor: 'rgba(192, 192, 192, 0.4)',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  goalDescription: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
    textAlign: 'right',
  },
  
  
});
