import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import useAuth from '../hooks/useAuth';
import SettingsScreen from '../screens/SettingsScreen';
import RecommendationsScreen from '../screens/RecommendationsScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import AlertsScreen from '../screens/AlertsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createNativeStackNavigator();


export default function AppNavigation() {
  const {user} = useAuth();
  if(user){
    return (
      <NavigationContainer>
        <Stack.Navigator  initialRouteName='Home'
          screenOptions={{
            animation: 'none', // Specify the animation type here
            headerShown: false, // Hide the header for all screens
          }}>
          <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
          <Stack.Screen name="Analytics" options={{headerShown: false}} component={AnalyticsScreen} />
          <Stack.Screen name="Recommendations" options={{headerShown: false}} component={RecommendationsScreen} />
          <Stack.Screen name="Settings" options={{headerShown: false}} component={SettingsScreen} />
          <Stack.Screen name="Alerts" options={{headerShown: false}} component={AlertsScreen} />
          <Stack.Screen name="EditProfile" options={{headerShown: false}} component={EditProfileScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    )
  }else{
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
          <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
          <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
          <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  
}