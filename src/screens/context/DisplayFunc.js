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
    else if (status.length <= 0)
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
        customer_guid: '833DF49D303711EE857842010A940003',
        user_guid: await AsyncStorage.getItem('user_guid'),
        refno,
        pdncn,
      })
      .then(response => {
        //console.log(response.data);
        if (response.data === '') {
          Alert.alert('No Data');
          setIsLoading(false);
        }
        else {
          if (typeName === 'PO')
          {
            navigation.navigate('DisplayPoPdf', { PdfData: response.data, typeName:typeName, refno:refno, file_path:response.data.file_path,status:status});
            setIsLoading(false);
          }
          else if (typeName === 'GRN')
          {
            navigation.navigate('DisplayGRNPdf', { PdfData: response.data, typeName:typeName, refno:refno, file_path:response.data.file_path,status:status});
            setIsLoading(false);
          }
          else if (typeName === 'GRDA')
          {
            navigation.navigate('DisplayGRDAPdf', { PdfData: response.data, typeName:typeName, refno:refno, file_path:response.data.file_path,status:status});
            setIsLoading(false);
          }
          else if (typeName === 'PRDNCN')
          {
            navigation.navigate('DisplayPRDNCNPdf', { PdfData: response.data, typeName:typeName, refno:refno, file_path:response.data.file_path,status:status});
            setIsLoading(false);
          }
          else if (typeName === 'PDNCN')
          {
            navigation.navigate('DisplayPDNCNPdf', { PdfData: response.data, typeName:typeName, refno:refno, file_path:response.data.file_path,status:status});
            setIsLoading(false);
          }
          else if (typeName === 'PCI')
          {
            navigation.navigate('DisplayPCIPdf', { PdfData: response.data, typeName:typeName, refno:refno, file_path:response.data.file_path,status:status});
            setIsLoading(false);
          }
          else if (typeName === 'DI')
          {
            navigation.navigate('DisplayDIPdf', { PdfData: response.data, typeName:typeName, refno:refno, file_path:response.data.file_path,status:status});
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
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      try {
          const {config,fs} = RNFetchBlob;
          const downloadPath = fs.dirs.DownloadDir;
          console.log(downloadPath);
          const downloadDest = `${downloadPath}/${file_name}`;
          const configOptions = Platform.select({
            /*ios: {
              fileCache: true,
              path: imagePath,
              appendExt: filename.split('.').pop(),
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
          const response = await RNFetchBlob.config(configOptions).fetch('GET', source.uri);
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
    } else {
      Alert.alert('Please Allow Access to Storage !');
    }
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

  return (
    <DisplayFunc.Provider
      value={{
        isLoading,
        displayDoc,
        filter,
        displayTrigger,
        displayPdf,
        handleDownload,
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

