import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icons from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

import { themeColors } from '../theme';
export default function ConnectSteps() {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SafeAreaView style={styles.containerHeader}>
        <View style={styles.navBar}>
          
          <TouchableOpacity onPress={() => navigation.navigate('ConnectScreen')} style={styles.goBackContainer}>
          <Icons.ArrowRightIcon size="30" color="white" style={styles.iconStyle} />
          </TouchableOpacity>
          
          <View style={styles.logoContainer}>
            <Image source={require('../assets/images/logobetter.png')} style={styles.logo} />
          </View>

        </View>
      </SafeAreaView>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.stepText}>واحد</Text>
            <Text style={styles.stepText}>واحد</Text>
            <Text style={styles.stepText}>واحد</Text>
            <Text style={styles.stepText}>واحد</Text>
            <Text style={styles.stepText}>واحد</Text>
            <Text style={styles.stepText}>واحد</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Device')}>
            <Icons.PlusCircleIcon size={20} color="gray" />
            <Text style={styles.buttonText}>ربط الجهاز</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}



export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.bg,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  stepText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'right',
    color: 'white',
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
  containerHeader: {
    backgroundColor: '#143638', // Set the main background color
    width: '100%',
    height: 120,
    
    
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'flex-end', // Align items to the bottom vertically
    justifyContent: 'center', // Center items horizontally
    height: 120,
    backgroundColor: '#143638',
    paddingHorizontal: 20,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  logoContainer: {
    alignSelf: 'flex-end', // Align to the bottom
    marginBottom: 6, // Add margin from the bottom
  },
  logo: {
    width: 65,
    height: 65,
  },

  flexSpace: {
    flex: 1,
  },

  goBackContainer: {
    position: 'absolute',
    right: 20,
    bottom: 18,
  },

  iconStyle: {

  }
});