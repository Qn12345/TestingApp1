import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useContext, useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from '../components/CustomAlert';
import { DisplayFunc } from '../context/DisplayFunc';

export const GRNFunc = createContext();

export const GRNProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [DoneMessage, setDoneMessage] = useState('');
  const [showDone, setShowDone] = useState(false);
  const {displayPdf} = useContext(DisplayFunc);

  const update_einvno = async (einvno,einvdate,e_gr_refno) => {
    setIsLoading(true);
    //einvno = 'A08221101005test';
    //einvdate = '2024-02-08';
    //e_gr_refno = 'ASTGR22110004';
    //console.log(einvno);
    //console.log(einvdate);
    //console.log(e_gr_refno);
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Doc_info/grmain_proposed', {
        einvno,
        einvdate,
        e_gr_refno,
        user_guid: await AsyncStorage.getItem('user_guid'), //'DB287ED8998B11EEB2B4B2C55218ACED'
        customer_guid: '833DF49D303711EE857842010A940003',//13EE932D98EB11EAB05B000D3AA2838A
      })
      .then(response => {
        //console.log();
        if (response.data.status === 'false') {
          setShowAlert(true);
          setAlertMessage(response.data.message);
          setIsLoading(false);
        } else {
          setShowDone(true);
          setDoneMessage(response.data.message);
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  const update_ecn = async (refno,type,ext_sup_cn_no) => {
    setIsLoading(true);
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Doc_info/grmain_dncn_proposed', {
        refno,
        type,
        ext_sup_cn_no,
        user_guid: await AsyncStorage.getItem('user_guid'), //
        customer_guid: '833DF49D303711EE857842010A940003', //
      })
      .then(response => {
        //console.log();
        if (response.data.status === 'false') {
          setShowAlert(true);
          setAlertMessage(response.data.message);
          setIsLoading(false);
        } else {
          setShowDone(true);
          setDoneMessage(response.data.message);
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  const generate_ecn_einv = async (einvno,einvdate,e_gr_refno) => {
    setIsLoading(true);
    axios //https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Doc_info/generate_all_doc_type
      .post('http://office.panda-eco.com:18243/rest_b2b/index.php/lite_b2b/Doc_info/generate_all_doc_type', {
        einvno,
        einvdate,
        e_gr_refno,
        user_guid: 'DB287ED8998B11EEB2B4B2C55218ACE', //'DB287ED8998B11EEB2B4B2C55218ACE
        customer_guid: '13EE932D98EB11EAB05B000D3AA2838A', //13EE932D98EB11EAB05B000D3AA2838A
      })
      .then(response => {
        //console.log();
        if (response.data.status === 'false') {
          setShowAlert(true);
          setAlertMessage(response.data.message);

          setIsLoading(false);
        } else {
          setShowDone(true);
          setDoneMessage(response.data.message);
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };


  return (
    <GRNFunc.Provider
      value={{
        isLoading,
        update_einvno,
        update_ecn,
        generate_ecn_einv,
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
    </GRNFunc.Provider>
  );
};

