import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import React from 'react'
import * as Icons from "react-native-heroicons/solid";
import { SafeAreaView } from 'react-native-safe-area-context'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import TopNavBar2 from '../navigation/TopNavBar2';
import BottomNavBar from '../navigation/BottomNavBar';
import { useNavigation } from '@react-navigation/native'
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useEffect, useState } from 'react';


export default function EditProfileScreen() {
    const navigation = useNavigation();
    
    
    const handleLogout = async ()=>{
    await signOut(auth);
  }

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username:'',
    email: '',
    phoneNumber:'',
    city:'',
    birthdate:'',
    // Add more fields as needed
  });

  useEffect(() => {
    
    // Fetch user data from Firestore
    const fetchUserData = async () => {
      try {
        const usersRef = collection(db, 'users');
        const querySnapshot = await getDocs(query(usersRef, where('uid', '==', auth.currentUser.uid)));

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUserData(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error, e.g., show an error message
      }
    };

    fetchUserData();

  }, []);

  const handleUpdateProfile = async () => {
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        city:userData.city,
        birthdate: userData.birthdate
        // Add more fields as needed
      });
      Alert.alert('تم تحديث الملف الشخصي', 'تم تحديث معلوماتك بنجاح.');
      // Optionally, navigate back to the profile screen or any other screen
    } catch (error) {
      console.error('Error updating user data:', error);
      // Handle error, e.g., show an error message
    }
  };


return (
    <View style={{ flex: 1 }}>
    {/* top nav bar */}
    
    <TopNavBar2 />
    
  <ScrollView style={{ flex: 1 }}>

  {/* Your edit profile screen content */}
  <View style={{ flex: 1}}>
    
  <View style={styles.greetingContainer}>
      <Text style={styles.greetingText}>ملفي الشخصي</Text>
      <Text style={styles.descriptionText}> بيانات الملف الشخصي</Text>
  </View>

  <View style={styles.infocontainer}>
      <Text style={styles.label}>الاسم الأول</Text>
      <TextInput
        style={styles.input}
        placeholder={userData.firstName}
        onChangeText={value => setUserData(prevState => ({ ...prevState, firstName: value }))}
      />
      <Text style={styles.label}>الاسم الأخير</Text>
      <TextInput
        style={styles.input}
        placeholder={userData.lastName}
        onChangeText={value => setUserData(prevState => ({ ...prevState, lastName: value }))}
      />
      <Text style={styles.label}>اسم المستخدم</Text>
      <TextInput
        style={styles.input}
        placeholder={userData.username}
        onChangeText={value => setUserData(prevState => ({ ...prevState, username: value }))}
      />
      <Text style={styles.label}>البريد الالكتروني</Text>
      <TextInput
        style={styles.input}
        placeholder={userData.email}
        onChangeText={value => setUserData(prevState => ({ ...prevState, email: value }))}
      />

<Text style={styles.label}>رقم الجوال </Text>
      <TextInput
        style={styles.input}
        placeholder={userData.phoneNumber}
        onChangeText={value => setUserData(prevState => ({ ...prevState, phoneNumber: value }))}
      />

<Text style={styles.label}>المدينة  </Text>
      <TextInput
        style={styles.input}
        placeholder={userData.city}
        onChangeText={value => setUserData(prevState => ({ ...prevState, city: value }))}
      />

<Text style={styles.label}>تاريخ الميلاد  </Text>
      <TextInput
        style={styles.input}
        placeholder={userData.birthdate}
        onChangeText={value => setUserData(prevState => ({ ...prevState, birthdate: value }))}
      />

      <TouchableOpacity onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>تحديث الملف الشخصي</Text>
      </TouchableOpacity>
    </View>

      
  </View>

  </ScrollView>

    <BottomNavBar/>

  </View>
  );
}

const styles = StyleSheet.create({
  infocontainer: {
    flex: 1,
    paddingHorizontal: 20,

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

  label: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
        textAlign: 'right',
        marginTop:20,

  },
  input: {
    //hight 40ishh
    paddingVertical: 12,
    color: '#555',
    backgroundColor: '#D3D9D9',
    borderRadius: 8,
    marginBottom: 10,
    textAlign: 'right',
    paddingHorizontal: 20,
  },
  /*button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 5,
  },*/
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline', // Underline the text,
    color: '#82C8FF',
    paddingVertical: 35,
  },

});



