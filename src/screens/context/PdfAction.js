import axios from 'axios';
import React, {createContext, useState,useContext} from 'react';
import { useNavigation,StackActions  } from '@react-navigation/native';
import { Alert,View,Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DisplayFunc} from '../context/DisplayFunc';

export const PdfAction = createContext();
export const PdfActionProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {displayDoc} = useContext(DisplayFunc);
  const navigation = useNavigation();
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [isConfirmationVisibleReject, setConfirmationVisibleReject] = useState(false);
  const status = 'default';
  const period_code = '';
  const exp_from = '';
  const exp_to = '';
  const doc_type = ['all'];
  const limit = 100;
  const offset = 0;
  const filter_supplier = '';
  const date_from = '';//dateFrom;
  const date_to = '';//dateTo;

  const handleCM = async (choose) => {
    if (choose === 'Accept')
    {
        setConfirmationVisible(true);
    }
    else if (choose === 'Reject')
    {
        setConfirmationVisibleReject(true);
    }
  };

  const handleConfirm = async (typeName, refno, choose, setting_guid) => {
    if (choose === 'Accept')
    {
        await accept(typeName, refno);
        // Close the confirmation modal
        setConfirmationVisible(false);
    }
    else if (choose === 'Reject')
    {
        await rejectPo(typeName, refno, setting_guid);
        setConfirmationVisibleReject(false);
    }
  };

  const handleCancel = async (choose) => {
    if (choose === 'Accept')
    {
        setConfirmationVisible(false);
    }
    else if (choose === 'Reject')
    {
        setConfirmationVisibleReject(false);
    }
  };

  //display pdf document
  const accept = async (typeName,refno) => {
    setIsLoading(true);
    let location = await AsyncStorage.getItem('location');
    let ishq = await AsyncStorage.getItem('ishq');
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Doc_info/accept',{
        type:typeName,
        customer_guid: '833DF49D303711EE857842010A940003',
        user_guid: await AsyncStorage.getItem('user_guid'),
        refno,
      })
      .then(response => {
        //console.log(response.data);
        if (response.data.status === false) {
          Alert.alert(response.data.message);
          setIsLoading(false);
        }
        else {
          if (typeName === 'PO')
          {
            Alert.alert(response.data.message);
            refno = '';
            displayDoc(location,ishq,typeName,status,refno,period_code,date_from,date_to,exp_from,exp_to,doc_type,limit,offset,filter_supplier);
            setIsLoading(false);
          }
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  const rejectPo = async (typeName,refno,setting_guid) => {
    setIsLoading(true);
    let location = await AsyncStorage.getItem('location');
    let ishq = await AsyncStorage.getItem('ishq');
    axios  //http://office.panda-eco.com:18243/rest_b2b/index.php/lite_b2b/Doc_info
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Doc_info/reject',{
        type:typeName,
        customer_guid: '833DF49D303711EE857842010A940003',
        user_guid: await AsyncStorage.getItem('user_guid'),
        setting_guid,
        refno,
      })
      .then(response => {
        //console.log(response.data);
        if (response.data.status === false) {
          Alert.alert(response.data.message);
          setIsLoading(false);
        }
        else {
          if (typeName === 'PO')
          {
            Alert.alert(response.data.title,response.data.message);
            refno = '';
            displayDoc(location,ishq,typeName,status,refno,period_code,date_from,date_to,exp_from,exp_to,doc_type,limit,offset,filter_supplier);
            setIsLoading(false);
          }
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };


  return (
    <PdfAction.Provider
      value={{
        isLoading,
        isConfirmationVisible,
        isConfirmationVisibleReject,
        handleCM,
        handleCancel,
        handleConfirm,
        accept,
        rejectPo,
      }}>
      {children}
    </PdfAction.Provider>
  );
};

