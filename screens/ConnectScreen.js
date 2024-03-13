import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Icons from "react-native-heroicons/solid";
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../config/firebase'

// add username and error header spacing css
export default function ConnectScreen() {
    const navigation = useNavigation();
    return (
      <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>
      <SafeAreaView  className="flex-row justify-center items-center px-4 py-2 space-x-24">
      <View className="flex-row justify-start">
        <TouchableOpacity 
            >
                <Icons.BellIcon size="20" color="white" />
            </TouchableOpacity>
        </View>
        <View  className="flex-row justify-center">
          <Image source={require('../assets/images/logoimg.png')} 
          style={{width: 50, height: 50}} />
        </View>
        <View className="flex-row justify-end">
        <TouchableOpacity 
                onPress={()=> navigation.goBack()}
                className="bg-[#82C8FF] p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            >
                <Icons.ArrowRightIcon size="20" color="white" />
            </TouchableOpacity>
        </View>
    
      </SafeAreaView>
      
      <View 
        
        className="flex-1 bg-white px-8 pt-8 justify-center">
          <View className="form space-y-2">
          <View className='items-center '>
          <Text className="text-xl font-bold mb-6 text-center">مرحبا!</Text> 
          <Text className="text-base mb-6 text-center"> قم بربط الجهاز للوصول لجميع خدمات مرشد والبدء بادارة بيتك</Text>
            </View>
        
            <TouchableOpacity 
              className="py-3 rounded-xl justify-center items-center flex-row"
              onPress={() => navigation.navigate('Device')}
                style={{ backgroundColor: themeColors.lightb }}>
              <Icons.PlusCircleIcon size="20" color="gray" />
                <Text 
                    className="text-xl font-bold text-center text-gray-700"
                >
                   ربط الجهاز
                </Text>
                
             </TouchableOpacity>
            
          </View>
      </View>
    </View>
      
    );
  
            
  };

  
