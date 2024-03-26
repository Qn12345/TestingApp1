import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import CustomAlert from '../components/CustomAlert';

export const AccDocFunc = createContext();

export const AccDocFuncProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const consignSRFilter = async (type) => {
    setIsLoading(true);
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Doc_info/consignment_sales_report_info', {
        user_guid: await AsyncStorage.getItem('user_guid'),
        customer_guid: '833DF49D303711EE857842010A940003',
      })
      .then(response => {
        if (response.data.code === '') {
          Alert.alert('No Data');
          setIsLoading(false);
        } else {
            navigation.navigate('ConsignSRFilter', {locationConsign:response.data.location, codeConsign:response.data.code, last_month_first_date:response.data.last_month_first_date, last_month_last_date:response.data.last_month_last_date,type:type});
            setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  const pvvPdf = async (refno,code,supcode,prefix) => {
    setIsLoading(true);
    console.log(prefix);

    const customer_guid = '833DF49D303711EE857842010A940003';
    const user_guid = await AsyncStorage.getItem('user_guid');

    let file_name = '';

    file_name = `${refno}.pdf`;

    let pdfDocConsign = `https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Get_Pdf/readfile_cloud?refno=${refno}&code=${code}&supcode=${supcode}&customer_guid=${customer_guid}&user_guid=${user_guid}&prefix=${prefix}`;
    navigation.navigate('DisplayPvvPdf', {file_path:pdfDocConsign,file_name:file_name,refno:refno,typeName:code});console.log(pdfDocConsign);
    setIsLoading(false);

  };

  return (
    <AccDocFunc.Provider
      value={{
        isLoading,
        consignSRFilter,
        pvvPdf,
      }}>
      {children}
    </AccDocFunc.Provider>
  );
};

