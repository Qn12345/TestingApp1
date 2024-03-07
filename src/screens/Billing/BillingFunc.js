import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import CustomAlert from '../components/CustomAlert';
import FormData from 'form-data';

export const BillingFunc = createContext();

export const BillingFuncProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [DoneMessage, setDoneMessage] = useState('');
  const [showDone, setShowDone] = useState(false);

  const InvoiceList = async (type,status,period_code,doc_type,supplier_guid,location,ishq) => {
    setIsLoading(true);
    if (status.length <= 0)
    {
      status = ['All'];
    }
    if (period_code === undefined)
    {
      period_code = '';
    }
    if (supplier_guid === undefined)
    {
      supplier_guid = '';
    }
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Monthly_billing_invoices_list', {
        user_guid: await AsyncStorage.getItem('user_guid'),
        customer_guid: '833DF49D303711EE857842010A940003',
        type,
        status,
        period_code,
        doc_type,
        supplier_guid,
      })
      .then(response => {
        if (response.data === '') {
          Alert.alert('No Data');
          setIsLoading(false);
        } else {
            navigation.navigate('Invoices', { DocData: response.data, typeName:type, titleName:'Invoices',location:location,ishq:ishq,supplier_guid:supplier_guid,period_code:period_code});
            setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  const InvPdf = async (inv_guid,inv_number,typeName) => {
    setIsLoading(true);

    const customer_guid = '833DF49D303711EE857842010A940003';
    const user_guid = await AsyncStorage.getItem('user_guid');

    let file_name = '';
    file_name = `${inv_number}.pdf`;

    let pdfDocConsign = `https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Get_Pdf/view_report_reg?inv_guid=${inv_guid}&inv_number=${inv_number}&customer_guid=${customer_guid}&user_guid=${user_guid}`;
    navigation.navigate('DisplayInvPdf', {file_path:pdfDocConsign,file_name:file_name,inv_guid:inv_guid,inv_number:inv_number,typeName:typeName});
    setIsLoading(false);

  };

  const viewSlip = async (supplier_guid,invoice_no,typeName) => {
    setIsLoading(true);
    axios
    .get(`https://apitmg.xbridge.my/rest_b2b/index.php/Invoice_remittance/view_invoice_remittance_document?supplier_guid=${supplier_guid}&invoice_no=${invoice_no}`)
    .then(response => {
      if (response.data.status === 'true')
      {
        navigation.navigate('DisplayViewSlipPdf', {file_path:response.data.file_path,file_name:invoice_no,typeName:typeName,remark:response.data.remark,slip_status:response.data.slip_status,supplier_guid:supplier_guid,invoice_no:invoice_no});
        setIsLoading(false);
      }
      else if (response.data.status === 'false')
      {
        setShowAlert(true);
        setAlertMessage(response.data.message);
        setIsLoading(false);
      }

    });
  };

  const filterBilling = async (typeName,location,ishq) => {
    setIsLoading(true);
    //console.log(type);
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Monthly_billing_invoices_list/filter',{
        customer_guid: '833DF49D303711EE857842010A940003',
        user_guid: await AsyncStorage.getItem('user_guid'),
        type:typeName,
      })
      .then(response => {
        //console.log(response.data.result_count);
        if (response.data === '') {
          Alert.alert('No Data');
          setIsLoading(false);
        }
        else {
          if (typeName === 'INV')
          {
            navigation.navigate('InvoiceFilter', { FilterData: response.data, typeName:typeName, location:location, ishq:ishq});
            setIsLoading(false);
          }
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  //not yet try
  const confirmSlip = async (supplier_guid,invoice_no) => {
    setIsLoading(true);
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/Invoice_remittance/update_status_invoice_remittance',{
        supplier_guid,
        invoice_no,
        user_guid: await AsyncStorage.getItem('user_guid'),
      })
      .then(response => {
        //console.log(response.data.result_count);
        if (response.data.status === 'false') {
          setShowAlert(true);
          setAlertMessage(response.data.message);
          setIsLoading(false);
        }
        else if (response.data.status === 'true'){
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

  //not yet try
  const deleteSlip = async (supplier_guid,invoice_no) => {
    setIsLoading(true);
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/Invoice_remittance/delete_invoice_remittance_document',{
        supplier_guid,
        invoice_no,
        user_guid: await AsyncStorage.getItem('user_guid'),
      })
      .then(async response => {
        //console.log(response.data.result_count);
        if (response.data.status === 'false') {
          setShowAlert(true);
          setAlertMessage(response.data.message);
          setIsLoading(false);
        }
        else if (response.data.status === 'true'){
          setShowDone(true);
          setDoneMessage(response.data.message);
          let type = 'INV';
          let status = ['All'];
          let period_code = '';
          let doc_type = ['All'];
          let location = await AsyncStorage.getItem('location');
          let ishq = await AsyncStorage.getItem('ishq');
          InvoiceList(type,status,period_code,doc_type,supplier_guid,location,ishq);
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  //not yet try
  const uploadSlip = async (supplier_guid,invoice_no,remark,fileResponse) => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append('file', {
      uri: fileResponse[0].uri,
      name: fileResponse[0].name,
      type: fileResponse[0].type,
    });

    axios //https://apitmg.xbridge.my/rest_b2b/index.php/Invoice_remittance
      .post('',{
        supplier_guid,
        invoice_no,
        user_guid: await AsyncStorage.getItem('user_guid'),
        remark,
        formData,
      })
      .then(async response => {
        //console.log(response.data.result_count);
        if (response.data.status === 'false') {
          setShowAlert(true);
          setAlertMessage(response.data.message);
          setIsLoading(false);
        }
        else if (response.data.status === 'true'){
          setShowDone(true);
          setDoneMessage(response.data.message);
          let type = 'INV';
          let status = ['All'];
          let period_code = '';
          let doc_type = ['All'];
          let location = await AsyncStorage.getItem('location');
          let ishq = await AsyncStorage.getItem('ishq');
          InvoiceList(type,status,period_code,doc_type,supplier_guid,location,ishq);
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  return (
    <BillingFunc.Provider
      value={{
        isLoading,
        InvoiceList,
        InvPdf,
        filterBilling,
        viewSlip,
        confirmSlip,
        deleteSlip,
        uploadSlip,
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
    </BillingFunc.Provider>
  );
};

