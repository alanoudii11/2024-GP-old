import { View, Text, TouchableOpacity, FlatList,ScrollView } from 'react-native';
import { StyleSheet } from "react-native";
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopNavBar2 from '../navigation/TopNavBar2';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import * as Icons from 'react-native-heroicons/outline';

export default function AlertsScreen() {
  const [alertsData, setAlertsData] = useState([
    { id: '1', title: 'تم اكتشاف استخدام غير معتاد للبطارية. يرجى التحقق من التطبيقات التي قد تكون تستهلك البطارية بشكل غير متوقع'},
    { id: '2', title: ' تحذير من درجات الحرارة المنخفضة. يُرجى الانتباه إلى درجات الحرارة المنخفضة المتوقعة واتخاذ التدابير الوقائية اللازمة.'},
    { id: '3', title: 'تنبيه 3' },
  ]);

  const navigation = useNavigation();

  const handleReject = (itemId) => {
  
    setAlertsData(alertsData.filter(item => item.id !== itemId));
  };

  const renderItem = ({ item }) => (
    <View style={styles.alertItem}>
      <View style={styles.contentContainer}>
        <Text style={styles.alertTitle}>{item.title}</Text>
        <Icons.ExclamationCircleIcon size={24} style={styles.icon} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.rejectButton} onPress={() => handleReject(item.id)}>
          <Text style={styles.rejectButtonText}>رفض</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptButton}>
          <Text style={styles.acceptButtonText}>قبول</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TopNavBar2 />
      
      <View style={styles.sugg}>
        <Text style={styles.descriptionText}>التنبيهات:</Text>
      </View><ScrollView contentContainerStyle={styles.scrollContent}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={alertsData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView></ScrollView>
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
    padding: 10,
    marginRight: 20, 
  },
   descriptionText: {
    fontSize: 20,
    color: 'white', 
    textAlign: 'right',
    marginRight: 10,
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
    fontWeight: '500',
    textAlign: 'right',
    //padding: 7,
    marginLeft: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15, 
    
  },
  rejectButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: themeColors.lightb,
    marginRight: 25,
  },
  rejectButtonText: {
    color: themeColors.textLight,
  },
  acceptButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: themeColors.lightb,
  },
  acceptButtonText: {
    color: themeColors.textLight,
  },
});
