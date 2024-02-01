import React, { useContext, useState } from 'react';
import Pdf from 'react-native-pdf';
import { View, Text, StyleSheet, TouchableOpacity,Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/themes';
import Spinner from 'react-native-loading-spinner-overlay';
import PublicHeader from '../components/PublicHeader';
import {DisplayFunc} from '../context/DisplayFunc';
import withAuth from '../withAuth';
import { Tab, TabView} from '@rneui/themed';

const DisplayGRNPdf = ({route,navigation}) => {
    const {isLoading, handleDownload} = useContext(DisplayFunc);
    //const { refNo } = route.params;
    const refNo = route.params?.refno || '';
    const typeName = route.params?.typeName || '';
    const file_path = route.params?.file_path || '';
    const file_name = route.params?.PdfData.file_name || '';
    const status = route.params?.status || '';

    // Find the index of "PANDA HYPERMARKET -"
    const startIndex = file_path.indexOf("http://office.panda-eco.com:18243/panda_b2b/uploads/panda_folder/");

    // Extract the substring after "PANDA HYPERMARKET -"
    const result = file_path.slice(startIndex + "http://office.panda-eco.com:18243/panda_b2b/uploads/panda_folder/".length);

    const source = { uri: `https://tunasmanja.xbridge.my/index.php/B2b_gr/gr_report?refno=${refNo}`};
    const sourceGRDA = { uri: `https://tunasmanja.xbridge.my/index.php/B2b_gr/grda_report?refno=${refNo}`};

      return (
        <View style={styles.container}>
          <Spinner visible={isLoading} />
          <PublicHeader title={`${typeName}: ${refNo}`} />
          
          <View style={styles.container2}>
            {/*
            {(status === 'NEW' || status === 'Viewed' || status === 'Printed') && (
              <>
                <TouchableOpacity style={[styles.TopBtn,{backgroundColor:COLORS.Blue}]} onPress={() => { }}>
                  <Icon name="pencil" size={25} color={COLORS.White} />
                  <Text style={styles.buttonText}>Generate E-Invoice</Text>
                </TouchableOpacity>
              </>
            )}

            {(status === 'Invoice Generated' || status === 'Confirmed') && (
              <>
              <TouchableOpacity style={[styles.TopBtn,{backgroundColor:COLORS.Blue}]} onPress={() => { }}>
                  <Icon name="information-circle" size={25} color={COLORS.White} />
                  <Text style={styles.buttonText}>Info</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.TopBtn,{backgroundColor:COLORS.Green}]} onPress={() => { }}>
                  <Icon name="folder" size={25} color={COLORS.White} />
                  <Text style={styles.buttonText}>View E-Invoice</Text>
                </TouchableOpacity>
              </>
            )}
          */}

            <TouchableOpacity style={styles.DownloadBtn} onPress={() => { handleDownload(source, file_name); }}>
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
              console.log(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf} />
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
    TopBtn:{
        padding: 5,
        margin:5,
        borderRadius: 8,
        height:40,
        flexDirection: 'row',
        alignItems: 'center',
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
    buttonText:{
        fontSize:FONTSIZE.size_14,
        fontFamily:FONTFAMILY.poppins_extrabold,
        color: COLORS.White,
        fontWeight: 'bold',
        padding:3,
    },
});

export default withAuth(DisplayGRNPdf);


