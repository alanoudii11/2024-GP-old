import { View, Text, TouchableOpacity, Image, TextInput, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Icons from "react-native-heroicons/solid";
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../config/firebase'
import TopNavBar from '../navigation/TopNavBar';
import BottomNavBar from '../navigation/BottomNavBar';

// add username
export default function ConnectScreen() {
    const navigation = useNavigation();
    return (
      <View style={{ flex: 1 }} >
  <TopNavBar/>
  <SafeAreaView style={styles.container}>
  
      <View style={styles.formContainer}>
        <View style={styles.texts}>
          <Text style={styles.headerText}>مرحبا!</Text>
          <Text style={styles.subHeaderText}>
            قم بربط الجهاز للوصول لجميع خدمات مرشد والبدء بادارة بيتك
          </Text>
        </View>
        <TouchableOpacity
       style={styles.button}
          onPress={() => navigation.navigate('ConnectSteps')}>
          <Icons.PlusCircleIcon size={20} color="gray" />
          <Text style={styles.buttonText}>ربط الجهاز</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  <BottomNavBar />
  </View>
  );
  
            
  };

  
  export const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    formContainer: {
      flex: 1,
      backgroundColor: 'white',
      padding:20,
      
      
      
      paddingBottom: 100,
    },
    texts: {
      flex: 1,
      backgroundColor: 'white',
      paddingHorizontal: 8,
      paddingTop: 8,
      justifyContent: 'center',
      paddingBottom: 64,
    },
    headerText: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 6,
      textAlign: 'center',
    },
    subHeaderText: {
      fontSize: 20,
      marginBottom: 20,
      textAlign: 'center',
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: themeColors.lightb,
  
    },
    buttonText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'gray',
    },
   
  });