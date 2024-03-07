import React, { useContext,useState } from 'react';
import Pdf from 'react-native-pdf';
import { View, Image, StyleSheet, TouchableOpacity,Alert, ScrollView,Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/themes';
import Spinner from 'react-native-loading-spinner-overlay';
import PublicHeader from '../components/PublicHeader';
import { DisplayFunc } from '../context/DisplayFunc';
import withAuth from '../withAuth';
import {Overlay,Divider} from '@rneui/themed';
import ConfirmationModal from '../components/ConfirmationModal';
import { BillingFunc } from './BillingFunc';

const DisplayViewSlipPdf = ({route,navigation}) => {
    const {isLoading, handleDownload} = useContext(DisplayFunc);
    const {confirmSlip,deleteSlip} = useContext(BillingFunc);
    const file_path = route.params?.file_path || [];
    const file_name = route.params?.file_name || '';
    const typeName = route.params?.typeName || '';
    const remark = route.params?.remark || '';
    const slip_status = route.params?.slip_status || '';
    const supplier_guid = route.params?.supplier_guid || '';
    const invoice_no = route.params?.invoice_no || '';
    const [isVisible,setIsVisible] = useState(false);
    const [isConfirmationVisibleReminder, setIsConfirmationVisibleReminder] = useState(false);
    const [isConfirmationVisibleDelete, setIsConfirmationVisibleDelete] = useState(false);

    const source = { uri: file_path };

      return (
        <View style={styles.container}>
          <Spinner visible={isLoading} />
          <PublicHeader title={'Invoice Remittance'} />
          <View style={styles.container2}>
          {( slip_status === 'Uploaded') && (
              <>
                <TouchableOpacity style={styles.confirmBtn} onPress={() => { setIsConfirmationVisibleReminder(true); }}>
                  <Icon name="checkmark" size={25} color={COLORS.White} />
                  <Text style={styles.buttonTextx}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => { setIsConfirmationVisibleDelete(true); }}>
                  <Icon name="trash" size={25} color={COLORS.White} />
                  <Text style={styles.buttonTextx}>Delete</Text>
                </TouchableOpacity>
              </>
            )}

            {( slip_status === 'Processed') && (
              <>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => { setIsConfirmationVisibleDelete(true); }}>
                  <Icon name="trash" size={25} color={COLORS.White} />
                  <Text style={styles.buttonTextx}>Delete</Text>
                </TouchableOpacity>
              </>
            )}

            {( remark !== '') && (
              <>
                <TouchableOpacity style={styles.RemarkBtn} onPress={() => { setIsVisible(true); }}>
                  <Icon name="information-circle-outline" size={25} color={COLORS.White} />
                  <Text style={styles.buttonTextx}>Remark</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity style={styles.DownloadBtn} onPress={() => { handleDownload(file_path, file_name); }}>
              <Icon name="download" size={25} color={COLORS.White} />
            </TouchableOpacity>
          </View>
          {(file_path.includes("jpg") || file_path.includes("png") || file_path.includes("jpeg")) ? (
            <ScrollView>
              <Image
              style={styles.tinyLogo}
              source={{
                uri: file_path,
              }}
              />
            </ScrollView>
          ) : (
            <Pdf
            trustAllCerts={false}
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
              Alert.alert('Fail to Load PDF. Please Try to Open Again or Call Support.');
              console.log(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf} />
          )}

          <Overlay
            isVisible={isVisible}
            onBackdropPress={() => setIsVisible(false)}
            >
            <View style={styles.remarkContainer}>
              <Text style={{color:'black', fontSize:FONTSIZE.size_18, fontWeight:'bold',textAlign:'center'}}>Remark</Text>
              <Divider width={1} color='grey' style={{ marginVertical: 10 }} />
              <View style={styles.last}>
                <Text style={styles.label}>{remark}</Text>
              </View>
              <View style={{width:60,height:40,backgroundColor:COLORS.LightGrey,alignSelf:'flex-end',padding:5,margin:10,justifyContent:'center',borderWidth:1,borderRadius:5,borderColor:COLORS.LightGrey,alignContent:'center'}}>
              <TouchableOpacity onPress={()=>{setIsVisible(false);}}>
                <Text style={{color:'white',fontWeight:'bold',justifyContent:'center'}}>Close</Text>
              </TouchableOpacity>
              </View>
            </View>
          </Overlay>

          <ConfirmationModal
            isVisible={isConfirmationVisibleReminder}
            message={'Are you sure you want to Confirm the slip?'}
            onConfirm={() => {deleteSlip(supplier_guid,invoice_no); setIsConfirmationVisibleReminder(false);}}
            onCancel={() => {setIsConfirmationVisibleReminder(false);}}
          />

          <ConfirmationModal
            isVisible={isConfirmationVisibleDelete}
            message={'Are you sure you want to Delete the slip?'}
            onConfirm={() => {confirmSlip(supplier_guid,invoice_no); setIsConfirmationVisibleDelete(false);}}
            onCancel={() => {setIsConfirmationVisibleDelete(false);}}
          />

        </View>
      );
    };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:COLORS.LightGrey,
    },
    container2: {
        backgroundColor:COLORS.Grey,
        height:60,
        flexDirection: 'row',
        padding:5,
        alignItems: 'center',
    },
    pdf: {
        flex:1,
    },
    DownloadBtn:{
        backgroundColor: COLORS.LightGrey,
        padding: 5,
        borderRadius: 8,
        width:40,
        height:40,
        position:'absolute',
        right:0,
        margin:5,
        alignItems: 'center',
    },
    tinyLogo: {
      width: 300,
      height: 600,
      alignSelf:'center',
      justifyContent:'center',
      marginTop:'10%',
    },
    RemarkBtn:{
      backgroundColor: COLORS.Green,
      padding: 5,
      margin:5,
      borderRadius: 8,
      width:90,
      height:40,
      flexDirection: 'row',
      alignItems: 'center',
  },
  confirmBtn:{
    backgroundColor: COLORS.Blue,
    padding: 5,
    margin:5,
    borderRadius: 8,
    width:90,
    height:40,
    flexDirection: 'row',
    alignItems: 'center',
},
deleteBtn:{
  backgroundColor: COLORS.Red,
  padding: 5,
  margin:5,
  borderRadius: 8,
  width:90,
  height:40,
  flexDirection: 'row',
  alignItems: 'center',
},
  buttonTextx:{
    fontSize:FONTSIZE.size_14,
    fontFamily:FONTFAMILY.poppins_extrabold,
    color: COLORS.White,
    fontWeight: 'bold',
    padding:3,
},
remarkContainer:{
  backgroundColor: COLORS.White,
  width:'85%',
  padding:8,
},
last:{
  flexDirection:'row',
  justifyContent:'space-between',
  width:'100%',
},
label: {
  fontSize:FONTSIZE.size_16,
  color:COLORS.Black,
},
});

export default withAuth(DisplayViewSlipPdf);
