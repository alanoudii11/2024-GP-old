import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Icons from "react-native-heroicons/solid";
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../config/firebase'


export default function ConnectSteps() {
    const navigation = useNavigation();
    return (
      <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>
      <SafeAreaView  className="flex">
      <View className="flex-row justify-end">
        <TouchableOpacity 
                onPress={()=> navigation.goBack()}
                className="bg-[#82C8FF] p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            >
                <Icons.ArrowRightIcon size="20" color="white" />
            </TouchableOpacity>
        </View>
        <View  className="flex-row justify-center">
          <Image source={require('../assets/images/logoimg.png')} 
          style={{width: 50, height: 50}} />
        </View>
        
    
      </SafeAreaView>
      
      <View 
        
        className="flex-1  px-8 pt-8 ">
          <View className="form space-y-10">
          <View className='items-end flex-col space-y-4 '>
          <Text className="text-xl font-bold mb-6 text-end text-white">واحد</Text> 
          <Text className="text-xl font-bold mb-6 text-end text-white">واحد</Text> 
          <Text className="text-xl font-bold mb-6 text-end text-white">واحد</Text> 
          <Text className="text-xl font-bold mb-6 text-end text-white">واحد</Text> 
          <Text className="text-xl font-bold mb-6 text-end text-white">واحد</Text> 
          <Text className="text-xl font-bold mb-6 text-end text-white">واحد</Text> 
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
  
  
  
  
  
  
  
  