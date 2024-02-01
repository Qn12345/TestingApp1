import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

export const BasicFunc = createContext();

export const BasicProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  //display count dashboard number
  const dashboard = async (location,ishq) => {
    setIsLoading(true);
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Dashboard', {
        user_guid: await AsyncStorage.getItem('user_guid'),
        customer_guid: '833DF49D303711EE857842010A940003',
        location,
        ishq,
      })
      .then(response => {
        //console.log();
        if (response.data.dashboard === '') {
          //console.error('Error:', response.data.message);
          Alert.alert('No Data');
          setIsLoading(false);
        } else {
          AsyncStorage.setItem('location', location);
          AsyncStorage.setItem('ishq', ishq);
          AsyncStorage.setItem('super_admin',response.data.user_group_name[0].user_group_guid);
          const dashDataArray = Object.values(response.data.dashboard);
          navigation.navigate('HomeScreen', {dashboardData:dashDataArray, dateFrom:response.data.date_from, dateTo:response.data.date_to, UserName:response.data.user_name,location:location,ishq:ishq,user_group:response.data.user_group_name[0].user_group_guid});
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };


  return (
    <BasicFunc.Provider
      value={{
        isLoading,
        dashboard,
      }}>
      {children}
    </BasicFunc.Provider>
  );
};

