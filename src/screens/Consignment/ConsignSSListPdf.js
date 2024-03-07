import React, { useContext,useState } from 'react';
import Pdf from 'react-native-pdf';
import { View, Text, StyleSheet, TouchableOpacity,Alert,Modal,ScrollView,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/themes';
import Spinner from 'react-native-loading-spinner-overlay';
import PublicHeader from '../components/PublicHeader';
import { DisplayFunc } from '../context/DisplayFunc';
import withAuth from '../withAuth';

const ConsignSSListPdf = ({route,navigation}) => {
    const {isLoading, handleDownload} = useContext(DisplayFunc);
    const HeaderData = route.params?.HeaderData.consignment_sales_statement_header || [];
    const file_name = route.params?.file_name || '';
    const file_path = route.params?.pdfConsignList || '';
    const [isVisibleModal, setisVisibleModal] = useState(false);

    const source = { uri: file_path };

      return (
        <View style={styles.container}>
          <Spinner visible={isLoading} />
          <PublicHeader title={'Consignment Preview'} />
          <View style={styles.container2}>
            <TouchableOpacity style={[styles.TopBtn,{backgroundColor:COLORS.Blue}]} onPress={() => {setisVisibleModal(true); }}>
              <Icon name="information-circle" size={25} color={COLORS.White} />
              <Text style={styles.buttonText}>Info</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.DownloadBtn} onPress={() => { handleDownload(file_path, file_name); }}>
              <Icon name="download" size={25} color={COLORS.White} />
            </TouchableOpacity>
          </View>
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

          <Modal visible={isVisibleModal} transparent animationType="slide">
          <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => {
                    setisVisibleModal(false);
                    }}
                    style={styles.backbutton}>
                <Icon name="arrow-down" size={23} color="white" />
              </TouchableOpacity>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Generate E Invoice</Text>
              </View>
            </View>
            <ScrollView>
                  <View style={styles.GInvForm}>
                    <View style={styles.GInvLeft}>
                    <Text style={{ color:'black' }}>Refno</Text>
                    <TextInput
                      style={styles.input}
                      value={HeaderData[0].refno}
                      editable={false}
                    />
                    <Text style={{ color:'black' }}>Date Trans</Text>
                    <TextInput
                      style={styles.input}
                      value={HeaderData[0].date_trans}
                      editable={false}
                    />
                    <Text style={{ color:'black' }}>Outlet</Text>
                    <TextInput
                      style={styles.input}
                      value={HeaderData[0].locgroup}
                      editable={false}
                    />
                    <Text style={{ color:'black' }}>Code</Text>
                    <TextInput
                      style={styles.input}
                      value={HeaderData[0].supcus_code}
                      editable={false}
                    />
                    <Text style={{ color:'black' }}>Name</Text>
                    <TextInput
                      style={styles.input}
                      value={HeaderData[0].supcus_name}
                      editable={false}
                    />
                    <Text style={{ color:'black' }}>Date From</Text>
                    <TextInput
                      style={styles.input}
                      value={HeaderData[0].date_from}
                      editable={false}
                    />
                    <Text style={{ color:'black' }}>Date To</Text>
                    <TextInput
                      style={styles.input}
                      value={HeaderData[0].date_to}
                      editable={false}
                    />
                    <Text style={{ color:'black' }}>Total Amount</Text>
                    <TextInput
                      style={styles.input}
                      value={parseFloat(HeaderData[0].total_inc_tax).toFixed(2)}
                      editable={false}
                    />
                    <Text style={{ color:'black' }}>Supplier Invoice No</Text>
                    <TextInput
                      style={styles.input}
                      value={HeaderData[0].sup_doc_no}
                      editable={false}
                    />
                    <Text style={{ color:'black' }}>Supplier Invoice Date</Text>
                    <TextInput
                      style={styles.input}
                      value={HeaderData[0].sup_doc_date}
                      editable={false}
                    />
                    </View>
                  </View>
                </ScrollView>
          </View>
          </View>
          </Modal>
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
    TopBtn:{
      padding: 5,
      margin:5,
      borderRadius: 8,
      height:40,
      flexDirection: 'row',
      alignItems: 'center',
  },
  buttonText:{
    fontSize:FONTSIZE.size_14,
    fontFamily:FONTFAMILY.poppins_extrabold,
    color: COLORS.White,
    fontWeight: 'bold',
    padding:3,
},
modalContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  paddingTop:30,
  flex:1,
},
modalContent: {
  backgroundColor: COLORS.White,
  width:'100%',
  height:'100%',
  paddingBottom:35,
},
header: { //header
  flexDirection: 'row',
  alignItems: 'center',
  padding: 13,
  backgroundColor: COLORS.Blue, // Set the background color to blue
},
backbutton: {
  paddingRight: 10,
},
titleContainer: {
  flex: 1,
  alignItems: 'center',
},
title: {
  color: 'white', // Set text color to white
  fontFamily: FONTFAMILY.poppins_semibold,
  fontSize: FONTSIZE.size_18,
  fontWeight:'bold',
},
GInvForm:{
  padding:8,
  flexDirection: 'row',
  flexWrap: 'wrap',
},
GInvLeft:{
  padding:3,
  width:'100%',
},
input:{
  borderWidth:1,
  borderRadius:10,
  backgroundColor:'#dedee0',
  borderColor:COLORS.LightGrey,
  height:50,
  width:'100%',
  marginVertical:5,
  color:'#5a5d63',
  paddingLeft:10,
},
});

export default withAuth(ConsignSSListPdf);
