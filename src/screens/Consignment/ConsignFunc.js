import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import CustomAlert from '../components/CustomAlert';

export const ConsignFunc = createContext();

export const ConsignProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [DoneMessage, setDoneMessage] = useState('');
  const [showDone, setShowDone] = useState(false);

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

  const consignmentSRPdf = async (type,Date_From,Date_To,main_loc,Consign_Code) => {
    setIsLoading(true);

    const customer_guid = '833DF49D303711EE857842010A940003';
    const user_guid = await AsyncStorage.getItem('user_guid');

    let formattedMainLoc = '';
    if (Array.isArray(main_loc)) {
        formattedMainLoc = main_loc.map(branch => `%26Branch=${branch}`).join('');
    } else {
        formattedMainLoc = `%26Branch=${main_loc}`;
    }
    let report_guid = '';
    let title_name = '';
    let file_name = '';
    if (type === 'ConsignSR')
    {
      report_guid = 'consignment_sales_report_b2b';
      title_name = 'Consignment Sales Report';
      file_name = 'Consignment_Sales_Report.pdf';
    }
    else if (type === 'ConsignSRS')
    {
      report_guid = 'consignment_sales_report_summary_b2b';
      title_name = 'Consignment Sales Report Summary';
      file_name = 'Consignment_Sales_Report_Summary.pdf';
    }

    let pdfDocConsign = `https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Get_Pdf/consignment_report?Date_From=${Date_From}&Date_To=${Date_To}&Consign_Code=${Consign_Code.value}&report_guid=${report_guid}&main_loc=${formattedMainLoc}&customer_guid=${customer_guid}&user_guid=${user_guid}`;
    navigation.navigate('DisplayConsignPdf', {file_path:pdfDocConsign,title_name:title_name,file_name:file_name});
    setIsLoading(false);

  };

  const consignSSList = async (typeName,refno,status,period_code,supcode,pdncn) => {
    setIsLoading(true);
    const customer_guid = '833DF49D303711EE857842010A940003';
    const user_guid = await AsyncStorage.getItem('user_guid');
    if (pdncn === '' ||pdncn === undefined)
    {
      pdncn = 'DEBIT';
    }

    if (status === '' || status === undefined)
    {
      status = '';
    }

    axios
      .post('https://api.xbridge.my/rest_b2b/index.php/lite_b2b/Doc_info',{ //https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Doc_info
        type:typeName,
        customer_guid:'B00CA0BE403611EBA2FC000D3AC8DFD7', //blank
        user_guid:'7FEA88F8874711EE8A5C6045BD209184',//blank
        refno,//blank
        pdncn,//blank
        period_code:'2023-05',//blank
        supcode:'AX00',//blank
        company_id:'199301015847',//''
        company_name:'CHUA KAH SENG SUPERMARKET SDN BHD',//''
        date_trans:'2023-05-31',//''
        status:'New',//''
        loc:'',//''
      })
      .then(async (response) => {
        if (response.data === '') {
          Alert.alert('No Data');
          setIsLoading(false);
        }
        else {
            navigation.navigate('ConsignSSListScreen', { ListData: response.data, typeName:typeName, status:status,period_code:period_code});
            setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  const consignListPdf = async (refno,date_trans) => {
    setIsLoading(true);
    const customer_guid = '833DF49D303711EE857842010A940003';
    const user_guid = await AsyncStorage.getItem('user_guid');

    axios
      .post('https://api.xbridge.my/rest_b2b/index.php/lite_b2b/Doc_info/consignment_sales_statement_by_supcode_list_child',{ 
        //https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Doc_info/consignment_sales_statement_by_supcode_list_child
        customer_guid:'B00CA0BE403611EBA2FC000D3AC8DFD7', //blank
        user_guid:'7FEA88F8874711EE8A5C6045BD209184',//blank
        refno:'M8823050131-AX00',//blank
        date_trans:'2023-05-31',//blank
      })
      .then(async (response) => {
        if (response.data === '') {
          Alert.alert('No Data');
          setIsLoading(false);
        }
        else {
          let report_type = 'consignment_sales_statement_child';
          let file_name = `${refno}-consignment_sales_statement_child.pdf`;
          let trans_guid = response.data.consignment_sales_statement_header[0].trans_guid;

          let pdfConsignList = `https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Get_Pdf/consignment_sales_statement_view?report_type=${report_type}&customer_guid=${customer_guid}&user_guid=${user_guid}&trans_guid=${trans_guid}`;
          navigation.navigate('ConsignSSListPdf', { HeaderData: response.data,pdfConsignList:pdfConsignList,file_name:file_name});
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  //not yet try
  const updateInvNo = async (period_code,supplier_inv_no,supplier_inv_date,supcus_code,date_trans) => {
    setIsLoading(true);
    const customer_guid = '833DF49D303711EE857842010A940003';
    const user_guid = await AsyncStorage.getItem('user_guid');

    axios //https://api.xbridge.my/rest_b2b/index.php/lite_b2b/Doc_info/header_save_inv_no_by_supcode
      .post('',{ 
        //https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Doc_info/header_save_inv_no_by_supcode
        customer_guid:'B00CA0BE403611EBA2FC000D3AC8DFD7', //blank
        user_guid:'7FEA88F8874711EE8A5C6045BD209184',//blank
        period_code,
        supplier_inv_no,
        supplier_inv_date,
        supcus_code,
        date_trans,
        company_id:'',
      })
      .then(async (response) => {
        if (response.data.status === 'false') {
          setShowAlert(true);
          setAlertMessage(response.data.message);
          setIsLoading(false);
        }
        else {
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
  const generateEInv = async (period_code,supplier_inv_no,supplier_inv_date,supcus_code,date_trans) => {
    setIsLoading(true);
    const customer_guid = '833DF49D303711EE857842010A940003';
    const user_guid = await AsyncStorage.getItem('user_guid');

    axios //https://api.xbridge.my/rest_b2b/index.php/lite_b2b/Doc_info/header_save_inv_no_by_supcode
      .post('',{ 
        //https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Doc_info/consignment_generate_e_invoices_by_supcode
        customer_guid:'B00CA0BE403611EBA2FC000D3AC8DFD7', //blank
        user_guid:'7FEA88F8874711EE8A5C6045BD209184',//blank
        period_code,
        supplier_inv_no,
        supplier_inv_date,
        supcus_code,
        date_trans,
        company_id:'',
      })
      .then(async (response) => {
        if (response.data.status === 'false') {
          setShowAlert(true);
          setAlertMessage(response.data.message);
          setIsLoading(false);
        }
        else {
          setShowDone(true);
          setDoneMessage(response.data.message);
          consignSSList('ConsignSS','','',period_code,supcus_code,'');
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });

  };

  return (
    <ConsignFunc.Provider
      value={{
        isLoading,
        consignSRFilter,
        consignmentSRPdf,
        consignSSList,
        consignListPdf,
        updateInvNo,
        generateEInv,
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
    </ConsignFunc.Provider>
  );
};

