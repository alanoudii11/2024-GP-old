import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import * as Icons from "react-native-heroicons/solid";
import { SafeAreaView } from 'react-native-safe-area-context'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function BottomNavBar() {

    const navigation = useNavigation();

    const handlePressHome = () => {
      navigation.navigate('Home');
    };
  
    const handlePressAnalytics = () => {
      navigation.navigate('Analytics');
    };
  
    const handlePressSettings = () => {
      navigation.navigate('Settings');
    };
  
    const handlePressRecommendations = () => {
      navigation.navigate('Recommendations');
    };
    
    const handleLogout = async ()=>{
      await signOut(auth);
    }
    
    return (
        <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.container}>
        <View style={styles.navBarBottom}>
        <TouchableOpacity onPress={handlePressSettings}>
            <Image source={require('../assets/icons/settings.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressRecommendations}>
            <Image source={require('../assets/icons/recommendations.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressAnalytics}>
            <Image source={require('../assets/icons/analytics.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressHome}>
            <Image source={require('../assets/icons/home.png')} style={styles.logo} />
        </TouchableOpacity>
        </View>
        </View>
      </SafeAreaView>
    );
    }
    
    const styles = StyleSheet.create({
       container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
      },
      navBarBottom: {
        flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 82,
    paddingHorizontal: 20,
    top: 0,
    width: '100%',
      },
      logo: {
        width: 53,
        height: 53,
      },
      safeArea: {
        flex: 1,
        paddingBottom: 0, // Ensure no padding at the bottom
      }
      
    });