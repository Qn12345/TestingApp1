import React, { useEffect, useContext, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './context/AuthContext';

const SplashScreen = ({ navigation }) => {
  const { checkLoginStatus,logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fcm_token = await AsyncStorage.getItem('fcm_token');// replace with your actual FCM token
        const user_guid = await AsyncStorage.getItem('user_guid');

        if (user_guid !== null) {
          await checkLoginStatus(fcm_token, user_guid);
        }
        else
        {
            navigation.replace('LoginScreen');
        }
      } catch (error) {
        console.error('Error in SplashScreen useEffect:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigation, checkLoginStatus,logout]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text>Checking...</Text>
      )}
    </View>
  );
};

export default SplashScreen;
