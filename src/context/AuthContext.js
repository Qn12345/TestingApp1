import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const navigation = useNavigation();

  const register = (name, email, password) => {
    setIsLoading(true);
    axios
      .post('http://office.panda-eco.com:18243/rest_b2b/index.php/B2b_trigger/M_login', {
        name,
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch(e => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  const login = (userid, password) => {
    setIsLoading(true);
    axios
      .post('http://office.panda-eco.com:18243/rest_b2b/index.php/B2b_trigger/M_login', {
        type: 'post',
        userid,
        password,
      })
      .then(response => {
        //console.log(response.data.status);
        if (response.data.status === 'true') {
          //console.log(response.data.message);
          let userInfo = userid;
          setUserInfo(userInfo);
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          setIsLoading(false);
  
          // Navigate to HomeScreen
          navigation.navigate('HomeScreen');
        } else {
          //console.error('Error:', response.data.message);
          // Show a dialog or handle the error case here
          Alert.alert('Login failed. Please check your credentials.');
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };
  
  const logout = () => {
    // Use the Alert component to create a custom confirmation dialog
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
           
            navigation.navigate('LoginScreen'); // Navigate to the 'Login' screen
          },
        },
      ],
      { cancelable: false } // To prevent closing the dialog by tapping outside of it
    );
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

