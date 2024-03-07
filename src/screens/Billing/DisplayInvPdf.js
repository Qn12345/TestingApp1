import React, { useContext } from 'react';
import Pdf from 'react-native-pdf';
import { View, Text, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/themes';
import Spinner from 'react-native-loading-spinner-overlay';
import PublicHeader from '../components/PublicHeader';
import { DisplayFunc } from '../context/DisplayFunc';
import withAuth from '../withAuth';

const DisplayInvPdf = ({route,navigation}) => {
    const {isLoading, handleDownload} = useContext(DisplayFunc);
    const file_path = route.params?.file_path || [];
    const inv_number = route.params?.inv_number || '';
    const file_name = route.params?.file_name || '';
    const typeName = route.params?.typeName || '';

    const source = { uri: file_path };

      return (
        <View style={styles.container}>
          <Spinner visible={isLoading} />
          <PublicHeader title={`${typeName}: ${inv_number}`} />
          <View style={styles.container2}>
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
});

export default withAuth(DisplayInvPdf);
