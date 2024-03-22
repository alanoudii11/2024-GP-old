//need to add password rules like signup

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebase'; // Assuming your firebase config is correctly imported
import TopNavBar2 from '../navigation/TopNavBar2';
import BottomNavBar from '../navigation/BottomNavBar';
import { themeColors } from '../theme';
import { EmailAuthProvider, updatePassword, reauthenticateWithCredential } from "firebase/auth"; // Import necessary Firebase auth methods

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("خطأ", "كلمة المرور الجديدة وتأكيد كلمة المرور لا تتطابقان");
      return;
    }

    try {
      const user = auth.currentUser;
      
      // Re-authenticate the user
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Change the password
      await updatePassword(user, newPassword);

      Alert.alert("نجاح", "تم تغيير كلمة المرور بنجاح");
      navigation.goBack(); // Navigate back to previous screen
    } catch (error) {
      console.error("خطأ في تغيير كلمة المرور:", error);
      Alert.alert("خطأ", "فشل تغيير كلمة المرور. يرجى المحاولة مرة أخرى.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TopNavBar2 />

    <View style={styles.container}>
      <View style={styles.greetingContainer}>
      <Text style={styles.greetingText}>تغيير كلمة المرور</Text>
      <Text style={styles.descriptionText}>قم بإدخال البيانات التالية</Text>
  </View>
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="كلمة المرور الحالية"
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="كلمة المرور الجديدة"
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="تأكيد كلمة المرور الجديدة"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
          <Text style={styles.buttonText}>تغيير كلمة المرور</Text>
        </TouchableOpacity>
      </View>
      
    </View>
    <BottomNavBar/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    marginTop: 50,
    paddingHorizontal: 20,

  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 100,
  },
  input: {
    paddingVertical: 12,
    color: 'black',//new info color
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
    textAlign: 'right',
    paddingHorizontal: 20,
    borderWidth: 1, // Add border width
    borderColor: '#143638', // Add border color
  },
  button: {
    backgroundColor: themeColors.lightb,
    padding: 13,
    borderRadius: 8,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
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

export default ChangePasswordScreen;
