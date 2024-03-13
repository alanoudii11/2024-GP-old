import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import TopNavBar from '../navigation/TopNavBar';
import BottomNavBar from '../navigation/BottomNavBar';
import { themeColors } from '../theme';


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
                    {/*<Text>السبت ٢٤ فبراير ٢٠٢٤ ٣:٣٤ م </Text>*/}
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
      paddingHorizontal: 20, // Add horizontal padding
    
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
    textAlign: 'center'

  },
  /*infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 4,
      paddingVertical: 2,
  },*/
  infoBox: {
      flex: 1,
      padding: 3,
      borderRadius: 20,
      backgroundColor: 'rgba(192, 192, 192, 0.4)', // Neutral-300 with opacity 40%
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

//<Text className="text-lg">Home Page - </Text>
        //<TouchableOpacity onPress={handleLogout} className="p-1 bg-red-400 rounded-lg">
          //<Text className="text-white text-lg font-bold">تسجيل الخروج</Text>
        //</TouchableOpacity>