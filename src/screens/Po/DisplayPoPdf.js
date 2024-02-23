import React, { useContext, useState,useEffect } from 'react';
import Pdf from 'react-native-pdf';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/themes';
import Spinner from 'react-native-loading-spinner-overlay';
import PublicHeader from '../components/PublicHeader';
import { DisplayFunc } from '../context/DisplayFunc';
import { PdfAction } from '../context/PdfAction';
import ConfirmationModal from '../components/ConfirmationModal';
import { Dropdown } from 'react-native-element-dropdown';
import withAuth from '../withAuth';

const DisplayPoPdf = ({route,navigation}) => {
    const {isLoading, handleDownload} = useContext(DisplayFunc);
    const {isConfirmationVisible,isConfirmationVisibleReject,handleCM,handleCancel,handleConfirm} = useContext(PdfAction);
    const refNo = route.params?.refno || '';
    const typeName = route.params?.typeName || '';
    const file_path = route.params?.file_path || [];
    const file_name = route.params?.PdfData.file_name || '';
    const accept_button = route.params?.PdfData.accept_button || '';
    const reject_button = route.params?.PdfData.reject_button || '';
    const PdfData_set_code = route.params?.PdfData.set_code || [];
    const [rejectionReason, setRejectionReason] = useState('');
    const [isReasonModalVisible, setReasonModalVisible] = useState(false);

    const generateReason = () => {
      const reasons = []; // Initial value is set to null
      PdfData_set_code.forEach((set_code) => {
        reasons.push({
          label: set_code.reason,
          value: set_code.setting_guid,
        });
      });

      return reasons;
    };

    const source = { uri: file_path };

      return (
        <View style={styles.container}>
          <Spinner visible={isLoading} />
          <PublicHeader title={`${typeName}: ${refNo}`} />
          <View style={styles.container2}> 
            {( accept_button === true) && (
              <>
                <TouchableOpacity style={styles.AcceptBtn} onPress={() => { handleCM('Accept'); }}>
                  <Icon name="checkmark" size={25} color={COLORS.White} />
                  <Text style={styles.buttonTextx}>Accept</Text>
                </TouchableOpacity>
              </>
            )}
            {(reject_button === true) && (
              <>
                <TouchableOpacity style={styles.RejectBtn} onPress={() => { setReasonModalVisible(true); }}>
                  <Icon name="close" size={25} color={COLORS.White} />
                  <Text style={styles.buttonTextx}>Reject</Text>
                </TouchableOpacity>
              </>
            )}
            <ConfirmationModal
              isVisible={isConfirmationVisible}
              message={`Are you sure you want to Accept ${refNo}?`}
              onConfirm={() => { handleConfirm(typeName,refNo,'Accept'); }}
              onCancel={() => { handleCancel('Accept'); }}
            />

            <Modal
              animationType="slide"
              transparent={true}
              visible={isReasonModalVisible}
              onRequestClose={() => { setReasonModalVisible(false); }}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Select Reason to Reject</Text>
                  <Dropdown
                    style={styles.chooseReason}
                    placeholderStyle={styles.chooseReasonWord}
                    selectedTextStyle={styles.chooseReasonWord}
                    itemTextStyle={{color:COLORS.Black}}
                    labelField="label"
                    valueField="value"
                    placeholder={'Choose your reason'}
                    data={generateReason()}
                    value={rejectionReason}
                    containerStyle={styles.containerReason}
                    onChange={(value) => setRejectionReason(value)}
                  />
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.confirmButton} onPress={() => { setReasonModalVisible(false); handleCM('Reject'); }}>
                      <Text style={styles.buttonText}>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => { setReasonModalVisible(false); }}>
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <ConfirmationModal
              isVisible={isConfirmationVisibleReject}
              message={`Are you sure you want to Reject ${refNo}?`}
              onConfirm={() => { let reason = rejectionReason.value; handleConfirm(typeName,refNo,'Reject',reason ); }}
              onCancel={() => { handleCancel('Reject'); }}
            />

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
    AcceptBtn:{
        backgroundColor: COLORS.Green,
        padding: 5,
        margin:5,
        borderRadius: 8,
        width:90,
        height:40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    RejectBtn:{
        backgroundColor: COLORS.Red,
        padding: 5,
        margin:5,
        borderRadius: 8,
        width:90,
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
    buttonTextx:{
        fontSize:FONTSIZE.size_14,
        fontFamily:FONTFAMILY.poppins_extrabold,
        color: COLORS.White,
        fontWeight: 'bold',
        padding:3,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: COLORS.White,
      padding: 20,
      borderRadius: 10,
    },
    message: {
      fontSize: FONTSIZE.size_16,
      fontFamily: FONTFAMILY.poppins_regular,
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop:10,
    },
    confirmButton: {
      backgroundColor: COLORS.Green,
      padding: 10,
      borderRadius: 8,
      flex: 1,
      marginRight: 5,
    },
    cancelButton: {
      backgroundColor: COLORS.Red,
      padding: 10,
      borderRadius: 8,
      flex: 1,
      marginLeft: 5,
    },
    buttonText: {
      fontSize: FONTSIZE.size_14,
      fontFamily: FONTFAMILY.poppins_extrabold,
      color: COLORS.White,
      textAlign: 'center',
    },
    modalTitle:{
      fontSize: FONTSIZE.size_14,
      fontFamily: FONTFAMILY.poppins_extrabold,
      color: COLORS.Black,
      textAlign: 'center',
    },
    chooseReason: {
      padding: 10,
      marginHorizontal:10,
      marginTop:10,
      borderColor:COLORS.LightGrey,
      borderWidth:2,
      borderRadius:10,
      width:300,
      color:COLORS.Black,
    },
    containerReason:{
      borderColor:COLORS.LightGrey,
      borderWidth:1,
      borderRadius:10,
      padding:5,
    },
    chooseReasonWord:{
      color:COLORS.Black,
      padding:5,
    },
});

export default withAuth(DisplayPoPdf);
