import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { StyleSheet } from "react-native";
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopNavBar2 from '../navigation/TopNavBar2';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import * as Icons from 'react-native-heroicons/outline';

export default function AlertsScreen() {
  const [alertsData, setAlertsData] = useState([
    { id: '1', title: 'تم اكتشاف استخدام غير معتاد للبطارية. يرجى التحقق من التطبيقات التي قد تكون تستهلك البطارية بشكل غير متوقع', date: getRandomDate(), time: getRandomTime() },
    { id: '2', title: ' تحذير من درجات الحرارة المنخفضة. يُرجى الانتباه إلى درجات الحرارة المنخفضة المتوقعة واتخاذ التدابير الوقائية اللازمة.', date: getRandomDate(), time: getRandomTime() },
    { id: '3', title: 'اتصل بفني كهربائي متخصص لإصلاح أي مشاكل كهربائية في منزلك.', date: getRandomDate(), time: getRandomTime() },
  ]);

  const navigation = useNavigation();

  const handleReject = (itemId) => {
    setAlertsData(alertsData.filter(item => item.id !== itemId));
  };

  /*
  ############## Today's Date and time for each Alert message ##############


  const renderItem = ({ item }) => (
  <View style={styles.alertItem}>
    <View style={styles.contentContainer}>
      <Text style={styles.alertTitle}>{item.title}</Text>
      <Icons.ExclamationCircleIcon size={24} style={styles.icon} />
    </View>
    <View style={styles.dateTimeContainer}>
      <Text style={styles.dateTimeText}>{getCurrentDate()}</Text>
      <Text style={styles.dateTimeText}>{getCurrentTime()}</Text>
    </View>
    <View style={styles.buttonContainer}>
    </View>
  </View>
);

const getCurrentDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const getCurrentTime = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

  */



// Generate random date and time and frizz it.

  const renderItem = ({ item }) => (
    <View style={styles.alertItem}>
      <View style={styles.contentContainer}>
        <Text style={styles.alertTitle}>{item.title}</Text>
        <Icons.ExclamationCircleIcon size={24} style={styles.icon} />
      </View>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateTimeText}>{item.date}</Text>
        <Text style={styles.dateTimeText}>{item.time}</Text>
      </View>
      <View style={styles.buttonContainer}>
      </View>
    </View>
  );

  function getRandomDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  
  function getRandomTime() {
    const date = new Date();
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    const second = ('0' + date.getSeconds()).slice(-2);
    return `${hour}:${minute}:${second}`;
  }

  return (
    <View style={styles.container}>
      <TopNavBar2 />
      
      <View style={styles.sugg}>
        <Text style={styles.descriptionText}>التنبيهات</Text>
      </View>

        <SafeAreaView style={styles.container}>
          <FlatList
            data={alertsData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.bg,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, 
    
  },
  sugg: {
    alignItems: 'flex-end', 
    marginTop: 20,
    marginHorizontal: 20,
  },
  descriptionText: {
    fontSize: 20,
    color: 'white', 
    textAlign: 'right',
    //marginRight: 10,
    fontWeight: 'bold',
  },
  alertItem: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    flexDirection: 'column', 
    justifyContent: 'space-between',
    textAlign: 'right', 
  },
  contentContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  icon: {
    marginLeft: 10, 
    color:'red',
  },
  alertTitle: {
    flex: 1,
    fontSize: 16,
    //fontWeight: '500',
    textAlign: 'right',
    //marginLeft: 20,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTimeText: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'right',
    marginTop: 5,
    marginRight: 20,
  },
});
