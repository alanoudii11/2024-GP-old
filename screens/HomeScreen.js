import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import TopNavBar from '../navigation/TopNavBar';
import BottomNavBar from '../navigation/BottomNavBar';
import { themeColors } from '../theme';
import * as Icons from "react-native-heroicons/solid";
import RealTimeBarChart from '../navigation/RealTimeBarChart'
export default function HomeScreen() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year 
      + ' ' + hours + ':' + min + ':' + sec
    );
  }, []);

// the date does't appear
  return (
    <View style={{ flex: 1 }}>
    <TopNavBar />
  <View style={styles.container}>
  <SafeAreaView style={[styles.safeAreaView, { flex: 1, backgroundColor: themeColors.bg }]}>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateStyle}>{currentDate}</Text>
                </View>
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
            </SafeAreaView>
            <SafeAreaView style={styles.safeAreaView}>
            
              <RealTimeBarChart/>
            </SafeAreaView>
            
      </View>

      <BottomNavBar/>

  </View>
  
  );
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
     
  },
  safeAreaView: {
      flex: 1,
      paddingHorizontal: 20,
    
  },
  dateContainer: {
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10,
      marginTop: 9,
      marginBottom: 9,
      borderRadius: 32,
      backgroundColor: 'rgba(192, 192, 192, 0.4)', // Neutral-300 with opacity 40%
      maxWidth: 346,
  },
  dateStyle:{
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,

  },
  infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 4,
      paddingVertical: 2,
      
  },
  infoBox: {
      flex: 1,
      padding: 7,
      borderRadius: 20,
      backgroundColor: 'rgba(192, 192, 192, 0.4)', // Neutral-300 with opacity 40%
      margin:10,
  },
  infoText: {
      color: '#fff',
      fontSize: 20,
      textAlign: 'center',
  },
  largeInfo: {
      fontSize: 40,
      textAlign: 'center',
  },

  
});
