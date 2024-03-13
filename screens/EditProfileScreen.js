import { View, Text, TouchableOpacity } from 'react-native'
import { StyleSheet, Image } from "react-native"
import React from 'react'
import * as Icons from "react-native-heroicons/solid";
import { SafeAreaView } from 'react-native-safe-area-context'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import TopNavBar from '../navigation/TopNavBar';
import BottomNavBar from '../navigation/BottomNavBar';
import { useNavigation } from '@react-navigation/native'


export default function EditProfileScreen() {
    const navigation = useNavigation();
    
    
    const handleLogout = async ()=>{
    await signOut(auth);
  }

return (
    <View style={{ flex: 1 }}>
    {/* top nav bar */}
    
    <TopNavBar />
    
  {/* Your edit profile screen content */}
  <View style={{ flex: 1}}>
    
  <View style={styles.greetingContainer}>
      <Text style={styles.greetingText}>معلوماتي الشخصية</Text>
      <Text style={styles.descriptionText}> تعديل بيانات الحساب</Text>
  </View>
      
  </View>

    <BottomNavBar/>

  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  greetingContainer: {
    alignItems: 'flex-end', // Align to the right
    paddingTop: 20,
    paddingHorizontal: 20, // Add horizontal padding
  },
  
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#143638',
  },
  
  descriptionText: {
    fontSize: 16,
    color: '#143638', // Adjust color as needed
    marginTop: 20,
  
  },
});



