//---------------HomeScreen.js---------------

import { View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import TopNavBar from '../navigation/TopNavBar';
import BottomNavBar from '../navigation/BottomNavBar';
import { themeColors } from '../theme';
import * as Icons from "react-native-heroicons/solid";
import RealTimeChart from '../charts/RealTimeChart'; 
import SelectorBar from '../components/SelectorBar'; 

export default function HomeScreen() {
  const [currentDate, setCurrentDate] = useState('');
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(4); //default selector bar choice is مباشر
  const options = ['سنة','شهر','أسبوع','يوم', 'مباشر'];
  const displayTextMapping = {
    0: 'استهلاك الكهرباء السنوي (كيلو واط/ساعة)',
    1: 'استهلاك الكهرباء الشهري (كيلو واط/ساعة)',
    2: 'استهلاك الكهرباء الأسبوعي (كيلو واط/ساعة)',
    3: 'استهلاك الكهرباء اليومي (كيلو واط/ساعة)',
    4: 'استهلاك الكهرباء المباشر (كيلو واط/ساعة)'
  };

  // Displays a chart header based on the choice chosen from the selector bar
  const getDisplayText = (index) => displayTextMapping[index];

  useEffect(() => {
    const updateDateAndTime = () => {
      const now = new Date();
      const date = now.getDate();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();
      const hours = now.getHours();
      const min = now.getMinutes().toString().padStart(2, '0'); 
      const sec = now.getSeconds().toString().padStart(2, '0'); 
      setCurrentDate(
        `${date}/${month}/${year} ${hours}:${min}:${sec}`
      );
    };

    updateDateAndTime();
    const timeIntervalId = setInterval(updateDateAndTime, 1000); // Updates time every second. 1000ms = 1s

    return () => clearInterval(timeIntervalId);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TopNavBar />
      <ScrollView style={styles.scrollViewStyle}>
      <View style={styles.upperContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateStyle}>{currentDate}</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>التكلفة</Text>
              <Text style={styles.largeInfo}>٦٤</Text>
              <Text style={styles.infoText}>ريال سعودي</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>اليوم</Text>
              <Text style={styles.largeInfo}>٦٤</Text>
              <Text style={styles.infoText}>كيلو واط / ساعة</Text>
            </View>
          </View>
        </View>
        <View style={styles.lowerContainer}>
          <SelectorBar
            options={options}
            selectedIndex={selectedOptionIndex}
            onSelect={(index) => {
              setSelectedOptionIndex(index);
            }}
          />
          <Text style={styles.chartHeaderText}>
            {getDisplayText(selectedOptionIndex)}
          </Text>
          {selectedOptionIndex === 4 && (
            <RealTimeChart apiUrl="http://127.0.0.1:5000/api/getRecentUsage" />
          )}
        </View>
      </ScrollView>
      <BottomNavBar />
    </View>
  );
          }
const styles = StyleSheet.create({
  upperContainer: {
    backgroundColor: '#143638',
    paddingBottom: 15,
  },
  lowerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 25, 
    marginTop: 0,
  },
  container: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dateContainer: {
    alignItems: 'center',
    paddingHorizontal: 90,
    paddingVertical: 10,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: 'rgba(192, 192, 192, 0.4)', 
    borderRadius: 32,
    maxWidth: 346,
    alignSelf: 'center',
  },
  dateStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
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
    backgroundColor: 'rgba(192, 192, 192, 0.4)', 
    margin:10,
},
infoText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
},
largeInfo: {
    fontSize: 36,
    textAlign: 'center',
}, 
chartHeaderText: {
  fontSize: 16,
  textAlign: 'center',
  marginBottom: 10,
  marginTop: 0,
}, 
});
