import axios from 'axios';
import React, {createContext, useState,useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert,View,PermissionsAndroid,Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import RNFetchBlob from 'rn-fetch-blob';
import CustomAlert from '../components/CustomAlert';

export const DisplayFunc = createContext();

export const DisplayProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const showAlertBoxDownload = async (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };
  //display list doc
  const displayDoc  = async (location,ishq,type,status,refno,period_code,date_from,date_to,exp_from,exp_to,doc_type,limit,offset,filter_supplier) => {
    setIsLoading(true);

    if (refno !== '')
    {
      status = '';
    }
    else if (status.length <= 0 || status === undefined)
    {
      status = 'default';
    }

    if (doc_type.length <= 0)
    {
      doc_type = ["all"];
    }
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Doc_list',{ //https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Doc_list
        location, //http://office.panda-eco.com:18243/rest_b2b/index.php/lite_b2b/Doc_list
        ishq,
        customer_guid: '833DF49D303711EE857842010A940003',//833DF49D303711EE857842010A940003 //13EE932D98EB11EAB05B000D3AA2838A
        user_guid: await AsyncStorage.getItem('user_guid'), //await AsyncStorage.getItem('user_guid') //DB287ED8998B11EEB2B4B2C55218ACED
        type,
        status,
        refno,
        period_code,
        date_from,
        date_to,
        exp_from,
        exp_to,
        doc_type,
        limit,
        offset,
        filter_supplier,
      })
      .then(response => {
        //console.log(response.data);
        if (response.data.result_count === 0) {

          navigation.navigate('NoDataScreen', {CountData: '0', DocData: response.data, typeName:type, location:location, ishq:ishq, offset:offset});
          setIsLoading(false);
        }
        else {
          if (type === 'PO')
          {
            navigation.navigate('PoScreen', { DocData: response.data, typeName:type, location:location, ishq:ishq, offset:offset});
            setIsLoading(false);
          }
          else if (type === 'GRN')
          {
            navigation.navigate('GRNScreen', { DocData: response.data, typeName:type, location:location, ishq:ishq, offset:offset});
            setIsLoading(false);
          }
          else if (type === 'GRDA')
          {
            navigation.navigate('GRDAScreen', { DocData: response.data, typeName:type, location:location, ishq:ishq , offset:offset});
            setIsLoading(false);
          }
          else if (type === 'PRDNCN')
          {
            navigation.navigate('PRDNCNScreen', { DocData: response.data, typeName:type, location:location, ishq:ishq , offset:offset});
            setIsLoading(false);
          }
          else if (type === 'PDNCN')
          {
            navigation.navigate('PDNCNScreen', { DocData: response.data, typeName:type, location:location, ishq:ishq, offset:offset });
            setIsLoading(false);
          }
          else if (type === 'PCI')
          {
            navigation.navigate('PCIScreen', { DocData: response.data, typeName:type, location:location, ishq:ishq, offset:offset });
            setIsLoading(false);
          }
          else if (type === 'DI')
          {
            navigation.navigate('DIScreen', { DocData: response.data, typeName:type, location:location, ishq:ishq, offset:offset });
            setIsLoading(false);
          }
          else if (type === 'ConsignSS')
          {
            navigation.navigate('ConsignStatement', { DocData: response.data, typeName:type, location:location, ishq:ishq, offset:offset, titleName:'Consignment Sales Statement',filter_supplier:filter_supplier});
            setIsLoading(false);
          }
          else if (type === 'PVV')
          {
            navigation.navigate('PaymentVoucher', { DocData: response.data, typeName:type, location:location, ishq:ishq, offset:offset, titleName:'Payment Voucher',filter_supplier:filter_supplier});
            setIsLoading(false);
          }
          else if (type === 'PIN')
          {
            //navigation.navigate('ConsignStatement', { DocData: response.data, typeName:type, location:location, ishq:ishq, offset:offset, titleName:'Consignment Sales Statement',filter_supplier:filter_supplier});
            setIsLoading(false);
          }
          else if (type === 'PVI')
          {
            navigation.navigate('APCreditNote', { DocData: response.data, typeName:type, location:location, ishq:ishq, offset:offset, titleName:'AP Credit Note',filter_supplier:filter_supplier});
            setIsLoading(false);
          }
          else if (type === 'PDN')
          {
            navigation.navigate('APCreditNote', { DocData: response.data, typeName:type, location:location, ishq:ishq, offset:offset, titleName:'AP Debit Note',filter_supplier:filter_supplier});
            setIsLoading(false);
          }
          else if (type === 'SIN')
          {
            //navigation.navigate('ConsignStatement', { DocData: response.data, typeName:type, location:location, ishq:ishq, offset:offset, titleName:'Consignment Sales Statement',filter_supplier:filter_supplier});
            setIsLoading(false);
          }
          else if (type === 'SVI')
          {
            //navigation.navigate('ConsignStatement', { DocData: response.data, typeName:type, location:location, ishq:ishq, offset:offset, titleName:'Consignment Sales Statement',filter_supplier:filter_supplier});
            setIsLoading(false);
          }
          else if (type === 'SDN')
          {
            //navigation.navigate('ConsignStatement', { DocData: response.data, typeName:type, location:location, ishq:ishq, offset:offset, titleName:'Consignment Sales Statement',filter_supplier:filter_supplier});
            setIsLoading(false);
          }
          else if (type === 'Consignment')
          {
            //not yet release for now
            subConsignDashboard(location,ishq,type);
            setIsLoading(false);
          }
          else if (type === 'Accounting_Documents')
          {
            //not yet release for now
            subAccountingDashboard(location,ishq,type);
            setIsLoading(false);
          }
          else if (type === 'B2B_monthly_billing_invoices')
          {
            //not yet release for now
            subBillingDashboard(location,ishq,type);
            setIsLoading(false);
          }
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  //display filter screen
  const filter = async (typeName,location,ishq) => {
    setIsLoading(true);
    //console.log(type);
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Doc_list/filter',{
        customer_guid: '833DF49D303711EE857842010A940003',
        user_guid: await AsyncStorage.getItem('user_guid'),
        type:typeName,
      })
      .then(response => {
        //console.log(response.data.result_count);
        if (response.data.status === '') {
          Alert.alert('No Data');
          setIsLoading(false);
        }
        else {
          if (typeName === 'PO')
          {
            navigation.navigate('PoFilterScreen', { FilterData: response.data, typeName:typeName, location:location, ishq:ishq });
            setIsLoading(false);
          }
          else if (typeName === 'GRN')
          {
            navigation.navigate('GRNFilterScreen', { FilterData: response.data, typeName:typeName, location:location, ishq:ishq  });
            setIsLoading(false);
          }
          else if (typeName === 'GRDA')
          {
            navigation.navigate('GRDAFilterScreen', { FilterData: response.data, typeName:typeName, location:location, ishq:ishq  });
            setIsLoading(false);
          }
          else if (typeName === 'PRDNCN')
          {
            navigation.navigate('PRDNCNFilterScreen', { FilterData: response.data, typeName:typeName, location:location, ishq:ishq  });
            setIsLoading(false);
          }
          else if (typeName === 'PDNCN')
          {
            navigation.navigate('PDNCNFilterScreen', { FilterData: response.data, typeName:typeName, location:location, ishq:ishq  });
            setIsLoading(false);
          }
          else if (typeName === 'PCI')
          {
            navigation.navigate('PCIFilterScreen', { FilterData: response.data, typeName:typeName, location:location, ishq:ishq  });
            setIsLoading(false);
          }
          else if (typeName === 'DI')
          {
            navigation.navigate('DIFilterScreen', { FilterData: response.data, typeName:typeName, location:location, ishq:ishq  });
            setIsLoading(false);
          }
          else if (typeName === 'ConsignSS')
          {
            navigation.navigate('ConsignStatementFilter', { FilterData: response.data, typeName:typeName, location:location, ishq:ishq});
            setIsLoading(false);
          }
          else if (typeName === 'PVV')
          {
            navigation.navigate('PVVFilter', { FilterData: response.data, typeName:typeName, location:location, ishq:ishq});
            setIsLoading(false);
          }
          else if (typeName === 'PIN')
          {
            //navigation.navigate('ConsignStatement', { DocData: response.data, typeName:type, location:location, ishq:ishq, offset:offset, titleName:'Consignment Sales Statement',filter_supplier:filter_supplier});
            setIsLoading(false);
          }
          else if (typeName === 'PVI')
          {
            navigation.navigate('PVVFilter', { FilterData: response.data, typeName:typeName, location:location, ishq:ishq});
            setIsLoading(false);
          }
          else if (typeName === 'PDN')
          {
            navigation.navigate('PVVFilter', { FilterData: response.data, typeName:typeName, location:location, ishq:ishq});
            setIsLoading(false);
          }
          else if (typeName === 'SIN')
          {
            //navigation.navigate('ConsignStatement', { DocData: response.data, typeName:type, location:location, ishq:ishq, offset:offset, titleName:'Consignment Sales Statement',filter_supplier:filter_supplier});
            setIsLoading(false);
          }
          else if (typeName === 'SVI')
          {
            //navigation.navigate('ConsignStatement', { DocData: response.data, typeName:type, location:location, ishq:ishq, offset:offset, titleName:'Consignment Sales Statement',filter_supplier:filter_supplier});
            setIsLoading(false);
          }
          else if (typeName === 'SDN')
          {
            //navigation.navigate('ConsignStatement', { DocData: response.data, typeName:type, location:location, ishq:ishq, offset:offset, titleName:'Consignment Sales Statement',filter_supplier:filter_supplier});
            setIsLoading(false);
          }
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  //display pdf document
  const displayPdf = async (typeName,refno,status,pdncn) => {
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
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Doc_info',{
        type:typeName,
        customer_guid,
        user_guid,
        refno,
        pdncn,
      })
      .then(async (response) => {
        //console.log(response.data);
        if (response.data === '') {
          Alert.alert('No Data');
          setIsLoading(false);
        }
        else {
          if (typeName === 'PO')
          {
            let pdfDoc = `https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Get_Pdf/po_report?refno=${refno}&customer_guid=${customer_guid}&user_guid=${user_guid}`;
            navigation.navigate('DisplayPoPdf', { PdfData: response.data, typeName:typeName, refno:refno, file_path:pdfDoc,status:status });
            setIsLoading(false);
          }
          else if (typeName === 'GRN')
          {
            let pdfDoc = `https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Get_Pdf/gr_report?refno=${refno}&customer_guid=${customer_guid}&user_guid=${user_guid}`;
 
            if(response.data.grda_filename !== '' || response.data.grda_header !== null)
            {
              let pdfDocGrda = `https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Get_Pdf/grda_report?refno=${refno}&customer_guid=${customer_guid}&user_guid=${user_guid}`;
              navigation.navigate('DisplayGRNPdf', { PdfData: response.data, typeName:typeName, refno:refno, file_path:pdfDoc,status:status, file_path_grda:pdfDocGrda});
              setIsLoading(false);
            }
            else
            {
              navigation.navigate('DisplayGRNPdf', { PdfData: response.data, typeName:typeName, refno:refno, file_path:pdfDoc,status:status});
              setIsLoading(false);
            }
          }
          else if (typeName === 'GRDA')
          {
            let pdfDoc = `https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Get_Pdf/grda_report?refno=${refno}&customer_guid=${customer_guid}&user_guid=${user_guid}`;
            navigation.navigate('DisplayGRDAPdf', { PdfData: response.data, typeName:typeName, refno:refno, file_path:pdfDoc,status:status});
            setIsLoading(false);
          }
          else if (typeName === 'PRDNCN')
          {
            let pdfDoc = `https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Get_Pdf/prdncn_report?refno=${refno}&customer_guid=${customer_guid}&user_guid=${user_guid}&pdncn=${pdncn}`;
            navigation.navigate('DisplayPRDNCNPdf', { PdfData: response.data, typeName:typeName, refno:refno, file_path:pdfDoc,status:status});
            setIsLoading(false);
          }
          else if (typeName === 'PDNCN')
          {
            let pdfDoc = `https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Get_Pdf/pdncn_report?refno=${refno}&customer_guid=${customer_guid}&user_guid=${user_guid}`;
            navigation.navigate('DisplayPDNCNPdf', { PdfData: response.data, typeName:typeName, refno:refno, file_path:pdfDoc,status:status});
            setIsLoading(false);
          }
          else if (typeName === 'PCI')
          {
            let pdfDoc = `https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Get_Pdf/pci_report?refno=${refno}&customer_guid=${customer_guid}&user_guid=${user_guid}`;
            navigation.navigate('DisplayPCIPdf', { PdfData: response.data, typeName:typeName, refno:refno, file_path:pdfDoc,status:status});
            setIsLoading(false);
          }
          else if (typeName === 'DI')
          {
            let pdfDoc = `https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Get_Pdf/di_report?refno=${refno}&customer_guid=${customer_guid}&user_guid=${user_guid}`;
            navigation.navigate('DisplayDIPdf', { PdfData: response.data, typeName:typeName, refno:refno, file_path:pdfDoc,status:status});
            setIsLoading(false);
          }
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  //download pdf document
  const handleDownload = async (source,file_name) => {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'TMG B2B Storage Permission',
        message:
          'TMG B2B needs access to your storage ' +
          'so you can download documents.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },);
    //if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      try {
          const {config,fs} = RNFetchBlob;
          const downloadPath = fs.dirs.DownloadDir;
          console.log(downloadPath);
          const downloadDest = `${downloadPath}/${file_name}`;
          const configOptions = Platform.select({
            /*ios: {
              fileCache: true,
              path: downloadDest,
              appendExt: file_name.split('.').pop(),
            },*/
            android: {
              fileCache: true,
              path: downloadDest,
              appendExt: file_name.split('.').pop(),
              addAndroidDownloads: {
                // Related to the Android only
                useDownloadManager: true,
                notification: true,
                path: downloadDest,
                description: 'File',
              },
            },
          });
          const response = await RNFetchBlob.config(configOptions).fetch('GET', source);
          showAlertBoxDownload('Document Downloaded');
        } catch (error) {
        console.error('Error during download:', error);
        // Display an error notification with channel ID
        PushNotification.localNotification({
            channelId: 'tmgb2b', // Specify the channel ID here
            title: 'Download Error',
            message: 'An error occurred during file download.',
        });
        }
    //} else {
    //  Alert.alert('Please Allow Access to Storage !');
    //}
};

  const displayTrigger = () => {
    setIsLoading(true);
    axios
      .get('https://api.xbridge.my/rest_b2b/index.php/lite_b2b/Pending_document')
      .then(response => {
        //console.log(response.data.get_pending_document);
        if (response.data.get_pending_document === '') {
          //console.error('Error:', response.data.message);
          Alert.alert('No Data');
          setIsLoading(false);
        } else {
          const triggerDataArray = Object.values(response.data.get_pending_document);
          navigation.navigate('TriggerScreen', { TriggerData: triggerDataArray });
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  const subConsignDashboard = async(location,ishq,sub_dashboard_type) => {
    setIsLoading(true);
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Dashboard/sub_dashboard',{
        sub_dashboard_type,
        location,
        ishq,
        customer_guid: '833DF49D303711EE857842010A940003',
        user_guid: await AsyncStorage.getItem('user_guid'),
      })
      .then(response => {
        if (response.data.dashboard === '') {
          Alert.alert('No Data');
          setIsLoading(false);
        } else {
          navigation.navigate('ConsignmentDashboard', {dashboardConsignData:response.data.dashboard, dateFrom:response.data.date_from, dateTo:response.data.date_to});
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  const subAccountingDashboard = async(location,ishq,sub_dashboard_type) => {
    setIsLoading(true);
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Dashboard/sub_dashboard_accounting_document',{
        sub_dashboard_type,
        location,
        ishq,
        customer_guid: '833DF49D303711EE857842010A940003',
        user_guid: await AsyncStorage.getItem('user_guid'),
      })
      .then(response => {
        if (response.data.dashboard === '') {
          Alert.alert('No Data');
          setIsLoading(false);
        } else {
          navigation.navigate('AccountingDocDashboard', {dashboardAccData:response.data.dashboard, dateFrom:response.data.date_from, dateTo:response.data.date_to});
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  const subBillingDashboard = async(location,ishq,sub_dashboard_type) => {
    setIsLoading(true);
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Dashboard/sub_dashboard_b2b_monthly_billing_invoices',{
        sub_dashboard_type,
        location,
        ishq,
        customer_guid: '833DF49D303711EE857842010A940003',
        user_guid: await AsyncStorage.getItem('user_guid'),
      })
      .then(response => {
        if (response.data.dashboard === '') {
          Alert.alert('No Data');
          setIsLoading(false);
        } else {
          navigation.navigate('BillingDashboard', {dashboardAccData:response.data.dashboard, dateFrom:response.data.date_from, dateTo:response.data.date_to});
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  return (
    <DisplayFunc.Provider
      value={{
        isLoading,
        displayDoc,
        filter,
        displayTrigger,
        displayPdf,
        handleDownload,
        subConsignDashboard,
        subAccountingDashboard,
        subBillingDashboard,
      }}>
      {children}
      <CustomAlert
        visible={showAlert}
        message={alertMessage}
        onClose={() => setShowAlert(false)}
        icon="checkmark"
        Ccolor="#7bfc03"
      />
    </DisplayFunc.Provider>
  );
};

