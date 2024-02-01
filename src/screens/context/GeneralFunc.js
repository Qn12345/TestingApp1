import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useContext, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { AuthContext } from './AuthContext';
import CustomAlert from '../components/CustomAlert';

export const GeneralFunc = createContext();

export const GeneralProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [DoneMessage, setDoneMessage] = useState('');
  const [showDone, setShowDone] = useState(false);

  const change_password = async (prev_pass,new_pass,confirm_password) => {
    setIsLoading(true);
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/User_account/change_password', {
        user_guid: await AsyncStorage.getItem('user_guid'),
        prev_pass,
        new_pass,
        confirm_password,
      })
      .then(response => {
        //console.log(response.data.get_pending_document);
        if (response.data.status === false) {
          //console.error('Error:', response.data.message);
          Alert.alert(response.data.message);
          setIsLoading(false);
        } else {
          Alert.alert(response.data.message);
          logout();
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  const b2b_reminder = async () =>{
    setIsLoading(true);
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Reminder/reminder_list')
      .then(response => {
        if (response.data.result === undefined || response.data.result === null) {
          Alert.alert('No Data !!!');
          setIsLoading(false);
        } else {
          navigation.navigate('B2BReminderScreen', { ReminderData: response.data });
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  const b2b_reminder_byRetailer = async (DebtorCode) =>{
    setIsLoading(true);
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Reminder/reminder_list_by_retailer',{
        DebtorCode,
      })
      .then(response => {
        if (response.data.result === undefined || response.data.result === null) {
          //console.error('Error:', response.data.message);
          Alert.alert('No Data !!!');
          setIsLoading(false);
        } else {
          navigation.navigate('B2BReminderRetailer', { ReminderDataRetailer: response.data });
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  const b2b_reminder_byRetailer_Update = async (supplier_guid,customer_guid,DebtorCode,value,table_name) =>{
    setIsLoading(true);
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Reminder/b2b_reminder_update',{
        user_guid: await AsyncStorage.getItem('user_guid'),
        supplier_guid,
        customer_guid,
        DebtorCode,
        Variance:value,
        table_name,
      })
      .then(response => {
        if (response.data.status === 'false') {
          //console.error('Error:', response.data.message);
          setShowAlert(true);
          setAlertMessage(response.data.message);
          setIsLoading(false);
        } else {
          setShowDone(true);
          setDoneMessage(response.data.message);
          b2b_reminder();
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  const b2b_reminder_byRetailer_Delete = async (supplier_guid,supplier_name,DebtorCode) =>{
    setIsLoading(true);

    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Reminder/b2b_reminder_delete',{
        user_guid: await AsyncStorage.getItem('user_guid'),
        supplier_guid,
        supplier_name,
        DebtorCode,
      })
      .then(response => {
        if (response.data.status === 'false') {
          //console.error('Error:', response.data.message);
          setShowAlert(true);
          setAlertMessage(response.data.message);
          setIsLoading(false);
        } else {
          setShowDone(true);
          setDoneMessage(response.data.message);
          b2b_reminder();
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };


  return (
    <GeneralFunc.Provider
      value={{
        isLoading,
        change_password,
        b2b_reminder,
        b2b_reminder_byRetailer,
        b2b_reminder_byRetailer_Update,
        b2b_reminder_byRetailer_Delete,
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
        visible={showDone}
        message={DoneMessage}
        onClose={() => setShowDone(false)}
        icon="checkmark"
        Ccolor="green"
      />
    </GeneralFunc.Provider>
  );
};

