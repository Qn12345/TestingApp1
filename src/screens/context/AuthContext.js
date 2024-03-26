import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert,Platform,PermissionsAndroid  } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import CustomAlert from '../components/CustomAlert';
import {} from 'react-native';
import { COLORS } from '../theme/themes';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading] = useState(false);
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlertSend, setShowAlertSend] = useState(false);
  const [alertMessageSend, setAlertMessageSend] = useState('');
  const platform = Platform.OS;//get platform
  const [platformVersion, setplatformVersion] = useState('');

  // api used:
  //http://office.panda-eco.com:18243/rest_b2b/index.php/tmg_b2b/Login
  //http://office.panda-eco.com:18243/rest_b2b/index.php/tmg_b2b/Login/app_first_check
  //http://office.panda-eco.com:18243/rest_b2b/index.php/tmg_b2b/Login/logout
  //http://office.panda-eco.com:18243/rest_b2b/index.php/tmg_b2b/Login/customer_branch

  const login = async (userid, password) => {
    setIsLoading(true);
    await messaging().deleteToken();
    const fcm_token = await messaging().getToken();
    console.log('login');
    console.log(fcm_token);
    if (platform === 'ios')
    {
      setplatformVersion(Platform.osVersion);// get version
    }
    else{
      setplatformVersion(Platform.Version);// get version
    };
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Login', {
        type: 'app',
        userid,
        password,
        fcm_token,
        platform,
        version:platformVersion,
      })
      .then(response => {
        //console.log(response.data.status);
        if (response.data.status === true) {
          let user_guid = response.data.user_guid;
          //let userToken = response.data.token;
          AsyncStorage.setItem('user_guid', user_guid);
          AsyncStorage.setItem('fcm_token', fcm_token);
          //AsyncStorage.setItem('userToken', userToken);
          AsyncStorage.setItem('isLoggedIn', 'true');
          getOutlet();
          setIsLoading(false);
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

  const checkLoginStatus = async (fcm_token,user_guid) => {
   //console.log(fcm_token);
   axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Login/app_first_check', {
        type: 'post',
        fcm_token,
        user_guid,
      })
      .then(response => {
        //console.log(response.data.status);
        if (response.data.status === true) {
          //let user_guid = response.data.user_guid;
          //console.log(user_guid);
          AsyncStorage.setItem('user_guid', user_guid);
          AsyncStorage.setItem('fcm_token', fcm_token);
          AsyncStorage.setItem('isLoggedIn', 'true');
          getOutlet();
          setIsLoading(false);
          //getOutlet();
        } else {
          //Alert.alert('Login failed. Please check your credentials.');
          //setIsLoading(false);
          navigation.navigate('LoginScreen');
        }
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const checkLoginStatusAll = async (fcm_token,user_guid) => {
    axios
       .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Login/app_first_check', {
         type: 'post',
         fcm_token,
         user_guid,
       })
       .then(response => {
         if (response.data.status === true) {
           AsyncStorage.setItem('user_guid', user_guid);
           AsyncStorage.setItem('fcm_token', fcm_token);
           AsyncStorage.setItem('isLoggedIn', 'true');
           setIsLoading(false);
         } else {
          showAlertBox("Session Expired ! Please Login Again.");
          navigation.navigate('LoginScreen');
         }
       })
       .catch(e => {
         console.log(`login error ${e}`);
         setIsLoading(false);
       });
   };

  const logout = async () => {
    setIsLoading(true);
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Login/logout', {
            user_guid: await AsyncStorage.getItem('user_guid'),
            fcm_token: await AsyncStorage.getItem('fcm_token'),
           })
      .then(response => {
        if (response.data.status === true) {
          AsyncStorage.removeItem('isLoggedIn');
          AsyncStorage.removeItem('user_guid');
          AsyncStorage.removeItem('fcm_token');
          AsyncStorage.removeItem('super_admin');
          setIsLoading(false);
          checkLoginStatus('','');
          //navigation.navigate('LoginScreen');
        } else {
          //console.error('Error:', response.data.message);
          // Show a dialog or handle the error case here
          Alert.alert('Error!!!');
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const getOutlet = async () => {
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Login/customer_branch', {
        user_guid: await AsyncStorage.getItem('user_guid'),
        customer_guid: '833DF49D303711EE857842010A940003',
      })
      .then(response => {
        if (response.data.force_logout === '0'){
          if (response.data.get_branch === '') {
            //console.error('Error:', response.data.message);
            Alert.alert('No Data');
            setIsLoading(false);
          } else {
            const branchDataArray = Object.values(response.data.get_branch);
            setIsLoading(false);
            navigation.navigate('WelcomeScreen',{OutletData:branchDataArray,
                      UserName:response.data.user_name,
                      overdue:response.data.reminder_overdue_payment,
                      force_logout:response.data.force_logout});
          }
        }
        else if (response.data.force_logout === '1'){
          navigation.navigate('WelcomeScreen',{overdue:response.data.reminder_overdue_payment,
            force_logout:response.data.force_logout});
        }

      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  const getOutletD = async () => {
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Login/customer_branch', {
        user_guid: await AsyncStorage.getItem('user_guid'),
        customer_guid: '833DF49D303711EE857842010A940003',
      })
      .then(response => {
          if (response.data.get_branch === '') {
            //console.error('Error:', response.data.message);
            Alert.alert('No Data');
            setIsLoading(false);
          } else {
            const branchDataArray = Object.values(response.data.get_branch);
            navigation.navigate('OutletSelectionScreen', {OutletData:branchDataArray, UserName:response.data.user_name});
            setIsLoading(false);
          }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  const showAlertBox = async (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const showAlertBoxSend = async (message) => {
    setAlertMessageSend(message);
    setShowAlertSend(true);
  };


  const forgotPassword = async (email) => {
    setIsLoading(true);
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Login/forgot_password', {
        email,
      })
      .then(response => {
        if (response.data.status === false) {
          setIsLoading(false);
          showAlertBox(response.data.message);
        } else {
          showAlertBoxSend("Check your MailBox. ");
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };


  return (
    <AuthContext.Provider
      value={{
        isLoading,
        splashLoading,
        login,
        logout,
        checkLoginStatus,
        getOutlet,
        forgotPassword,
        showAlertBox,
        showAlertBoxSend,
        checkLoginStatusAll,
        getOutletD,
      }}>
      {children}
      <CustomAlert
        visible={showAlert}
        message={alertMessage}
        onClose={() => setShowAlert(false)}
        icon="warning"
        Ccolor="red"
      />
      <CustomAlert
        visible={showAlertSend}
        message={alertMessageSend}
        onClose={() => setShowAlertSend(false)}
        icon="mail-unread"
        Ccolor="green"
      />
    </AuthContext.Provider>
  );
};

