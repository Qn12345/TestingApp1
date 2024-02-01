import React, { useEffect,useContext } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './context/AuthContext';


const withAuth = WrappedComponent => {

  return props => {
    const navigation = useNavigation();
    const { checkLoginStatusAll } = useContext(AuthContext);

    useEffect(() => {
      const checkAuth = async () => {
        const fcm_token = await AsyncStorage.getItem('fcm_token');
        const user_guid = await AsyncStorage.getItem('user_guid');
        checkLoginStatusAll(fcm_token,user_guid);
      };
      checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
