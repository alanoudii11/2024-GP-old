import { View, Text, ScrollView, FlatList } from 'react-native';
import { StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from 'react';
import { themeColors } from '../theme';
import TopNavBar from '../navigation/TopNavBar';
import BottomNavBar from '../navigation/BottomNavBar';
import { useNavigation } from '@react-navigation/native';
import * as Icons from 'react-native-heroicons/outline';


import { auth} from '../config/firebase'
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function RecommendationsScreen() {



  const navigation = useNavigation();
  const [recommendations, setTips] = useState([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const tipsRef = collection(db, 'recommendations');
        const querySnapshot = await getDocs(tipsRef);
        const tipData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          tip: doc.data().tip
        }));
        setTips(tipData);
      } catch (error) {
        console.error('Error fetching tips:', error);
      }
    };



    fetchTips(); // Fetch tips  regardless of condition

      }, []);



  return (
    <View style={styles.container}>

      <TopNavBar />

      <ScrollView style={{ flex: 1 }}>

      <View style={styles.tipsSection}>
      <Text style={styles.header}>اقتراحات</Text>
 {recommendations.map(item => (
            <View key={item.id} style={styles.tipItem}>
              <View style={styles.contentContainer}>
                <Text style={styles.tipTitle}>{item.tip}</Text>
                <Image source={require('../assets/icons/recommendations.png')} style={[styles.recommendationIcon, { tintColor: 'yellow' }]} />
              </View>
            </View>
          ))}
      </View>
      </ScrollView>
      <BottomNavBar/>
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: themeColors.bg, // Set background color
  },
  tipsSection:
  {
    margin: 20,
  },
  header: {
    fontSize: 20, // Adjust font size
    fontWeight: 'bold',
    color: '#143638',
    textAlign: 'right', // Align text to the right
    marginBottom: 20,
  },
  tipItem: {
    backgroundColor: themeColors.bg, 
    padding: 20,
    marginBottom: 10,
    borderRadius: 15, // Adjust border radius
    //textAlign: 'right', // Align text to the right
    
  },
  tipTitle: {
    fontSize: 16, // Adjust font size
    textAlign: 'right', // Align text to the right
    color: '#FFFFFF',
   // marginRight: 10,
   //backgroundColor: 'blue', // Set background color
   flex: 1, // Allow the title to expand and fill available space
  },
  contentContainer: {
    //alignItems: 'center',
    //backgroundColor: 'pink', // Set background color
    flexDirection: 'row',

  },
  recommendationIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,

    
  },
});
