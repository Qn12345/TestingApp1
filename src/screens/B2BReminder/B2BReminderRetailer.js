import React, { useContext, useState, useRef } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text,Modal,TextInput,ScrollView } from 'react-native';
import { Divider,ListItem,Overlay} from '@rneui/themed'; // Import SearchBar
import { useRoute } from '@react-navigation/native';
import PublicHeader from '../components/PublicHeader';
import { COLORS, FONTSIZE,FONTFAMILY } from '../theme/themes';
import { BasicFunc } from '../context/BasicFunc';
import Spinner from 'react-native-loading-spinner-overlay';
import withAuth from '../withAuth';
import { GeneralFunc } from '../context/GeneralFunc';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import ConfirmationModal from '../components/ConfirmationModal';

const B2BReminderRetailer = ({ navigation }) => {
  const { isLoading } = useContext(BasicFunc);
  const { b2b_reminder_byRetailer_Update,b2b_reminder_byRetailer_Delete } = useContext(GeneralFunc);
  const route = useRoute();
  const ReminderDataRetailer = route.params?.ReminderDataRetailer?.result || [];
  const ReminderDataType = route.params?.ReminderDataRetailer?.type_list || [];
  const flatListRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmationVisibleReminder, setIsConfirmationVisibleReminder] = useState(false);
  const [isConfirmationVisibleReminderDelete, setIsConfirmationVisibleReminderDelete] = useState(false);
  const [isVisibleEdit, setIsVisibleEdit] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [isUpdateButtonDisabled, setIsUpdateButtonDisabled] = useState(true);

  const generateTypeOptions = () => {
    const options = []; // Initial value is set to null
    // Assuming OutletData is an array of objects with branch_name and branch_code properties
    ReminderDataType.forEach((type) => {
      options.push({
        label: type.reason,
        value: type.code,
      });
    });

    return options;
  };

  const renderItem = ({ item, index }) => (
    <>
      <TouchableOpacity
        key={index}
        onPress={() => {
          setIsVisible(true);
        }}
        style={styles.item}
      >
        <View>
          <Text style={styles.itemTitle}>{item.supplier_name || 'N/A'}</Text>
          <View style={styles.chips}>
              <View style={styles.chipsLeft}><Text style={styles.chipsLabel}>{item.reminder_type || 'N/A'}</Text></View>
              <View style={styles.chipsRight}><Text style={styles.chipsLabel}>{item.acc_name || 'N/A'}</Text></View>
            </View>
          <View style={styles.infoContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Code: </Text>
              <Text style={styles.label}>Debtor Code: </Text>
              <Text style={styles.label}>Registration Invoice Date: </Text>
              <Text style={styles.label}>Registration & Add ON Amt: </Text>
              <Text style={styles.label}>Subscription One OFF Amt: </Text>
              <Text style={styles.label}>Training Amt: </Text>
              <Text style={styles.label}>AdHoc Service Amt: </Text>
              <Text style={styles.label}>Overdue Registration Fee: </Text>
              <Text style={styles.label}>Overdue Subscription: </Text>
              <Text style={styles.label}>Total Overdue: </Text>
              <Text style={styles.label}>Overdue Invoice Count: </Text>
              <Text style={styles.label}>Overdue Invoice Date From: </Text>
              <Text style={styles.label}>Overdue Invoice Date To: </Text>
              <Text style={styles.label}>Overdue Invoice Due Date: </Text>
              <Text style={styles.label}>Last Subscriptions Invoice Count: </Text>
              <Text style={styles.label}>Last Invoice Date: </Text>
              <Text style={styles.label}>Last Invoice Due Date: </Text>
              <Text style={styles.label}>Last Invoice Amt: </Text>
              <Text style={styles.label}>Invoice Number Extended: </Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.details}>{item.Code || 'N/A'}</Text>
              <Text style={styles.details}>{item.DebtorCode || 'N/A'}</Text>
              <Text style={styles.details}>{item.Registration_Invoice_Date || 'N/A'}</Text>
              <Text style={styles.details}>{item.Registration_AddON_Invoice_Amt || 'N/A'}</Text>
              <Text style={styles.details}>{item.Subscription_OneOFF_Invoice_Amt || 'N/A'}</Text>
              <Text style={styles.details}>{item.Training_Invoice_Amt || 'N/A'}</Text>
              <Text style={styles.details}>{item.Ad_Hoc_Service_Invoice_Amt || 'N/A'}</Text>
              <Text style={styles.details}>{item.Overdue_Registration_Fees || 'N/A'}</Text>
              <Text style={styles.details}>{item.Overdue_Subscriptions_Invoice_Amt || 'N/A'}</Text> 
              <Text style={styles.details}>{item.Total_Overdue || 'N/A'}</Text>
              <Text style={styles.details}>{item.Overdue_Invoices_Count || 'N/A'}</Text> 
              <Text style={styles.details}>{item.Overdue_Invoice_Date_From || 'N/A'}</Text>
              <Text style={styles.details}>{item.Overdue_Invoice_Date_To || 'N/A'}</Text>
              <Text style={styles.details}>{item.Overdue_Invoice_Due_Date || 'N/A'}</Text>
              <Text style={styles.details}>{item.Last_Subscriptions_Invoice_Count || 'N/A'}</Text>
              <Text style={styles.details}>{item.Last_Invoice_Date || 'N/A'}</Text>
              <Text style={styles.details}>{item.Last_Due_Date || 'N/A'}</Text>
              <Text style={styles.details}>{item.Last_Invoice_Amt || 'N/A'}</Text>
              <Text style={styles.details}>{item.invoice_number || 'N/A'}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <Overlay
        isVisible={isVisible}
        onBackdropPress={setIsVisible}
        overlayStyle={styles.overlay}
      >
      <View style={styles.bottomS}>
        <TouchableOpacity style={styles.Edit}
          onPress={() => { setIsVisible(false);
                           setIsVisibleEdit(true);
                          }}>
          <Icons name="pen" size={23} color='grey' style={{paddingRight:20,}}/>
          <Text style={{color:COLORS.Black,fontSize:FONTSIZE.size_16}}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Delete} onPress={() => {setIsConfirmationVisibleReminderDelete(true);}}>
          <Icons name="trash" size={23} color='grey'style={{paddingRight:20,}} />
          <Text style={{color:COLORS.Black,fontSize:FONTSIZE.size_16}}>Delete</Text>
        </TouchableOpacity>
      </View>
      </Overlay>

      <Modal visible={isVisibleEdit} transparent animationType="slide">
      <ScrollView style={{flex:1}}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.Title}>Edit Reminder</Text>
          <Divider width={1} color='grey' style={{ margin: 10 }} />
          <View>
            <Text style={styles.label}>Supplier Name</Text>
            <TextInput
              style={styles.input}
              value={item.supplier_name}
              editable={false}
            />
            <Text style={styles.label}>Reg No</Text>
            <TextInput
              style={styles.input}
              value={item.reg_no}
              editable={false}
              placeholderTextColor={COLORS.DarkGrey}
            />
            <Text style={styles.label}>Overdue Registration Fee</Text>
            <TextInput
              style={styles.input}
              value={item.Overdue_Registration_Fees}
              editable={false}
              placeholderTextColor={COLORS.DarkGrey}
            />
            <Text style={styles.label}>Overdue Subscription</Text>
            <TextInput
              style={styles.input}
              value={item.Overdue_Subscriptions_Invoice_Amt}
              editable={false}
              placeholderTextColor={COLORS.DarkGrey}
            />
            <Text style={styles.label}>Total Overdue</Text>
            <TextInput
              style={styles.input}
              value={item.Total_Overdue}
              editable={false}
              placeholderTextColor={COLORS.DarkGrey}
            />
            <Text style={styles.label}>Last Invoice Amount</Text>
            <TextInput
              style={styles.input}
              value={item.Last_Invoice_Amt}
              editable={false}
              placeholderTextColor={COLORS.DarkGrey}
            />
            <Text style={styles.label}>Registration Date</Text>
            <TextInput
              style={styles.input}
              value={item.Registration_Invoice_Date}
              editable={false}
              placeholderTextColor={COLORS.DarkGrey}
            />
            <Text style={styles.label}>Reminder Type</Text>
            <Dropdown
              style={styles.chooseType}
              selectedTextStyle={{color:COLORS.Black}}
              labelField="label"
              valueField="value"
              placeholder={'Choose your type'}
              data={generateTypeOptions()}
              value={selectedType}
              onChange={(value) => {
                                    setSelectedType(value);
                                    setIsUpdateButtonDisabled(!value); // Enable the button if a type is selected
                                  }}
            />
          </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => {
                                                  if (!isUpdateButtonDisabled) {
                                                    setIsConfirmationVisibleReminder(true);
                                                  }
                                                }}
                 style={[styles.confirmButton,
                         isUpdateButtonDisabled && { backgroundColor: COLORS.Grey, opacity: 0.5 },
                        ]}
                                                disabled={isUpdateButtonDisabled}
                >
                <Icons name="check" size={23} color='white'style={{paddingRight:10,}} />
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{setIsVisibleEdit(false); }} style={styles.cancelButton}>
                <Icon name="close" size={23} color='white'style={{paddingRight:10,}} />
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
      </ScrollView>
      </Modal>

      <ConfirmationModal
        isVisible={isConfirmationVisibleReminder}
        message={`Are you sure you want to Update?`}
        onConfirm={() => {b2b_reminder_byRetailer_Update(item.supplier_guid,item.customer_guid,item.DebtorCode,selectedType.value,item.table_name);}}
        onCancel={() => {setIsConfirmationVisibleReminder(false);}}
      />

      <ConfirmationModal
        isVisible={isConfirmationVisibleReminderDelete}
        message={`Are you sure you want to Delete?`}
        onConfirm={() => {b2b_reminder_byRetailer_Delete(item.supplier_guid,item.supplier_name,item.DebtorCode);}}
        onCancel={() => {setIsConfirmationVisibleReminderDelete(false);}}
      />

      </>
  );

  const keyExtractor = (item, index) => index.toString();

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <PublicHeader title={'B2B Reminder By Retaielr'} />
      <FlatList
        ref={flatListRef}
        data={ReminderDataRetailer}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Grey,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.White,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.White,
    margin: 10,
    padding: 10,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize:FONTSIZE.size_18,
    color:COLORS.Black,
  },
  chips:{
    flexDirection:'row',
    alignItems:'center',
  },
  chipsLabel:{
    fontSize:FONTSIZE.size_14,
    fontWeight:'bold',
    color:COLORS.White,
  },
  chipsLeft:{
    backgroundColor:COLORS.Blue,
    paddingVertical:4,
    paddingHorizontal:10,
    borderTopLeftRadius:20,
    borderBottomLeftRadius:20,
  },
  chipsRight:{
    backgroundColor:COLORS.Green,
    paddingVertical:4,
    paddingHorizontal:10,
    borderTopRightRadius:20,
    borderBottomRightRadius:20,
  },
  infoContainer:{
    flexDirection:'row',
  },
  labelContainer:{
    paddingVertical:8,
    paddingRight:5,
  },
  detailsContainer:{
    paddingVertical:8,
  },
  label: {
    fontSize:FONTSIZE.size_14,
    color:COLORS.Black,
  },
  details: {
    fontSize:FONTSIZE.size_14,
    color:COLORS.Black,
  },
  bottomS:{
    paddingVertical:20,
  },
  Edit:{
    flexDirection:'row',
    alignItems:'center',
    margin:15,
  },
  Delete:{
    flexDirection:'row',
    alignItems:'center',
    margin:15,
  },
  overlay:{
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: COLORS.White,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop:30,
  },
  modalContent: {
    backgroundColor: COLORS.White,
    padding: 20,
    borderRadius: 10,
    width:'95%',
  },
  Title: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
    color:COLORS.Black,
    fontWeight:'bold',
    textAlign:'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop:20,
  },
  confirmButton: {
    backgroundColor: COLORS.Green,
    padding: 10,
    borderRadius: 8,
    width:'30%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  cancelButton: {
    backgroundColor: COLORS.Red,
    padding: 10,
    borderRadius: 8,
    width:'30%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  buttonText: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_extrabold,
    color: COLORS.White,
    fontWeight:'bold',
  },
  input:{
    borderWidth:1,
    borderRadius:10,
    backgroundColor:'#dedee0',
    borderColor:COLORS.LightGrey,
    height:50,
    width:'100%',
    marginVertical:5,
    color:'#73737a',
    paddingLeft:10,
  },
  chooseType:{
    borderWidth:1,
    borderRadius:10,
    backgroundColor:COLORS.White,
    borderColor:COLORS.LightGrey,
    height:50,
    width:'100%',
    marginVertical:5,
    color:COLORS.Black,
    paddingLeft:10,
  },
});

export default withAuth(B2BReminderRetailer);
