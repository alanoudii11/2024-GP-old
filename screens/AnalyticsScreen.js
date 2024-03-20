//---------------AnalyticsScreen.js----------------------

import React, { useState } from 'react'; // Correctly import useState along with React
import { View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import * as Icons from "react-native-heroicons/solid";
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import TopNavBar from '../navigation/TopNavBar';
import BottomNavBar from '../navigation/BottomNavBar';
import RealTimeChart from '../charts/RealTimeChart';
import SelectorBar from '../components/SelectorBar'; // adjust the path as necessary

export default function AnalyticsScreen() {
  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(6); // For the time selector
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(0); // For the metric selector

  const periodOptions = ['سنة', 'شهر', 'أسبوع', 'يوم', 'ساعة', 'دقيقة', 'مباشر'];
  const displayPeriodTextMapping = {
    0: 'استهلاك الكهرباء السنوي (ك.و.س)',
    1: 'استهلاك الكهرباء الشهري (ك.و.س)',
    2: 'استهلاك الكهرباء الأسبوعي (ك.و.س)',
    3: 'استهلاك الكهرباء اليومي (ك.و.س)',
    4: 'استهلاك الكهرباء بالساعة (ك.و.س)',
    5: 'استهلاك الكهرباء بالدقيقة (ك.و.س)',
    6: 'استهلاك الكهرباء المباشر (ك.و.س)'
  };

  // Displays a chart header based on the choice chosen from the selector bar
  const getPeriodDisplayText = (index) => displayPeriodTextMapping[index];

  const unitOptions = ['فولت', 'أمبير', 'واط', 'ك.و.س']; // Adjusted metric options

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View style={styles.container}>
      <TopNavBar />
      <ScrollView style={styles.scrollViewStyle}>
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
          <Text style={styles.rightAlignedLabel}>الفترة</Text>
          <SelectorBar
            options={periodOptions}
            selectedIndex={selectedPeriodIndex}
            onSelect={setSelectedPeriodIndex}
          />
        </View>
  
        <View style={{ marginTop: 0, paddingHorizontal: 10 }}>
          <Text style={styles.rightAlignedLabel}>الوحدة</Text>
          <SelectorBar
            options={unitOptions}
            selectedIndex={selectedUnitIndex}
            onSelect={setSelectedUnitIndex}
          />
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>التكلفة</Text>
              <Text style={styles.largeInfo}>٦٤</Text>
              <Text style={styles.infoText}>ر.س</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>اليوم</Text>
              <Text style={styles.largeInfo}>٦٤</Text>
              <Text style={styles.infoText}>ك.و.س</Text>
            </View>
          </View>
        </View>
        <View style={styles.chartContainer}>
          <Text style={styles.chartHeaderText}></Text>
          {selectedPeriodIndex === 6 && (
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
    backgroundColor: '#ffffff', // Set background color to white
  },
  rightAlignedLabel: {
    alignSelf: 'flex-end', 
    fontSize: 20,
    marginBottom: 10,
  },
  dataContainer: {
    paddingBottom: 0,
  },
  safeAreaView: {
    flex: 1,
    paddingHorizontal: 20,
  },
infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 2,
},
infoBox: {
    flex: 1,
    padding: 18,
    borderRadius: 20,
    backgroundColor: '#143638', 
    margin:10,
},
infoText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
},
largeInfo: {
    color: '#fff',
    fontSize: 40,
    textAlign: 'center',
},
chartContainer: {
  flex: 1,
  paddingHorizontal: 20,
  paddingTop: 25, 
  marginTop: 0,
},
chartHeaderText: {
  fontSize: 18,
  textAlign: 'center',
  marginBottom: 10,
  marginTop: 0,
},   
});
