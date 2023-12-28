import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

export const BasicFunc = createContext();

export const BasicProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const navigation = useNavigation();

  const viewUser = () => {
    setIsLoading(true);
    axios
      .get('http://office.panda-eco.com:18243/rest_b2b/index.php/B2b_trigger/Display')
      .then(response => {
        //console.log(response.data.status);
        if (response.data.status === 'false') {
          //console.error('Error:', response.data.message);
          // Show a dialog or handle the error case here
          Alert.alert(response.data.message);
          setIsLoading(false);
        } else {
            navigation.navigate('ViewUserScreen', { userData: response.data });
            setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  const update = (user_id,user_name,user_guid) => {
    setIsLoading(true);
    axios
      .post('http://office.panda-eco.com:18243/rest_b2b/index.php/B2b_trigger/Update',{
        type: 'post',
        user_id,
        user_name,
        user_guid,
      })
      .then(response => {
        //console.log(response.data.status);
        if (response.data.status === 'false') {
          //console.error('Error:', response.data.message);
          // Show a dialog or handle the error case here
          Alert.alert(response.data.message);
          setIsLoading(false);
        } else {
          Alert.alert('Update Successfully');
          viewUser();
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  const addUser = (user_id,user_name,user_guid) => {
    setIsLoading(true);
    axios
      .post('http://office.panda-eco.com:18243/rest_b2b/index.php/B2b_trigger/Add',{
        type: 'post',
        user_id,
        user_name,
        user_guid,
      })
      .then(response => {
        //console.log(response.data.status);
        if (response.data.status === 'false') {
          //console.error('Error:', response.data.message);
          // Show a dialog or handle the error case here
          Alert.alert(response.data.message);
          setIsLoading(false);
        } else {
            Alert.alert('Added Successfully');
            viewUser();
            setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  const deleteUser = (user_id,user_name,user_guid) => {
    setIsLoading(true);
    axios
      .post('http://office.panda-eco.com:18243/rest_b2b/index.php/B2b_trigger/Delete',{
        type: 'post',
        user_id,
      })
      .then(response => {
        //console.log(response.data.status);
        if (response.data.status === 'false') {
          //console.error('Error:', response.data.message);
          // Show a dialog or handle the error case here
          Alert.alert(response.data.message);
          setIsLoading(false);
        } else {
          Alert.alert('Delete Successfully');
          viewUser();
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
        userInfo,
        viewUser,
        update,
        addUser,
        deleteUser,
      }}>
      {children}
    </BasicFunc.Provider>
  );
};

