import { View, Text, TouchableOpacity } from 'react-native'
import { StyleSheet, Image } from "react-native"
import React from 'react'
import * as Icons from "react-native-heroicons/solid";
import { SafeAreaView } from 'react-native-safe-area-context'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import TopNavBar from '../navigation/TopNavBar';
import BottomNavBar from '../navigation/BottomNavBar';


export default function AnalyticsScreen() {
    const handleLogout = async ()=>{
      await signOut(auth);
    }
    
    return (
      <View style={{ flex: 1 }}>
      {/* top nav bar */}
      
      <TopNavBar />
      
    {/* Your analytics screen content */}
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Analytics screen...</Text>
        </View>
  
        <BottomNavBar/>
  
    </View>
    );
  }