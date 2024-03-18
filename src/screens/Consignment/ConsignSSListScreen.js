import React, { useContext, useState,useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView,FlatList,Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/themes';
import Spinner from 'react-native-loading-spinner-overlay';
import { BasicFunc } from '../context/BasicFunc';
import { Chip,ListItem } from '@rneui/themed';
import PublicHeader from '../components/PublicHeader';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useRoute } from '@react-navigation/native';
import withAuth from '../withAuth';
import CustomAlert from '../components/CustomAlert';
import { ConsignFunc } from './ConsignFunc';
import ConfirmationModal from '../components/ConfirmationModal';

const ConsignSSListScreen = () => {
  const { isLoading } = useContext(BasicFunc);
  const {consignListPdf,updateInvNo,generateEInv,viewConsignEinv} = useContext(ConsignFunc);
  const route = useRoute();
  const ListData = route.params?.ListData || [];
  const typeName = route.params?.typeName || '';
  const period_code = route.params?.period_code || '';
  const status = route.params?.status || '';
  const [showAlertBlank, setShowAlertBlank] = useState(false);
  const [isConfirmationVisibleReminder, setIsConfirmationVisibleReminder] = useState(false);
  const [alertMessageBlank, setAlertMessageBlank] = useState('');
  const flatListRef = useRef();
  const keyExtractor = (item, index) => index.toString();
  const [isVisibleModal, setisVisibleModal] = useState(false);
  const [sInvDate, setsInvDate] = useState(ListData.consignment_sales_statement_header[0].sup_doc_date);
  const [datePickerFor, setDatePickerFor] = useState('');
  const [issInvDatePickerVisible, setsInvDatePickerVisibility] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [Asup_doc_no, setASup_doc_no] = useState(ListData.consignment_sales_statement_header[0].sup_doc_no);

  const showDatePicker = (input, pickerFor) => {
    setCurrentInput(input);
    setDatePickerFor(pickerFor);
    if (pickerFor === 'sInv') {
      setsInvDatePickerVisibility(true);
    }
  };

  const hideDatePicker = () => {
    setsInvDatePickerVisibility(false);
  };

  const handleConfirmpo = (date) => {
    hideDatePicker();
    if (currentInput === 'from' && datePickerFor === 'sInv') {
      setsInvDate(date.toISOString().split('T')[0]);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      style={styles.item}
      onPress={()=>{{consignListPdf(item.refno,item.date_trans);}}}
    >
      <ListItem.Content>
          <ListItem.Title style={styles.itemTitle}>{item.supcus_name || 'N/A'}</ListItem.Title>
          <ListItem.Subtitle>
              <Text style={{color:'black'}}>{item.refno || 'N/A'} </Text>
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            <View style={{alignContent:'center',flexDirection:'row',paddingVertical:1}}>
              <Icon name="storefront" size={20} color="#439ce0" />
              <Text style={{color:'black'}}> {item.acc_name}</Text>
            </View>
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            <View style={{alignContent:'center',flexDirection:'row',paddingVertical:1}}>
              <Text style={styles.blueLabel}>Code </Text>
              <Text style={{color:'black'}}> {item.supcus_code || 'N/A'} </Text>
              <Text style={styles.blueLabel}>      Outlet </Text>
              <Text style={{color:'black'}}> {item.locgroup || 'N/A'} </Text>
            </View>
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            <View style={{alignContent:'center',flexDirection:'row',paddingVertical:1}}>
              <Icon name="calendar" size={20} color="#40bf40" />
              <Text style={{color:'black'}}> {item.date_from || 'N/A'}</Text>
            </View>
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            <View style={{alignContent:'center',flexDirection:'row',paddingVertical:1}}>
              <Icons name="calendar" size={20} color="#439ce0" />
              <Text style={{color:'black'}}>  {item.date_to || 'N/A'}</Text>
            </View>
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            <View style={{alignContent:'center',flexDirection:'row',paddingVertical:1}}>
              <Icon name="document-text" size={20} color="#439ce0" />
              <Text style={{color:'black'}}>  {item.sup_doc_no}</Text>
            </View>
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            <View style={{alignContent:'center',flexDirection:'row',paddingVertical:1}}>
              <Icons name="calendar-check" size={20} color="#439ce0" />
              <Text style={{color:'black'}}>  {item.sup_doc_date}</Text>
            </View>
          </ListItem.Subtitle>
          <ListItem.Subtitle style={styles.statusDesign}>
            <Chip
              title={item.status || 'N/A'}
              containerStyle={{ position: 'absolute', bottom: 0, right: 0 }}
              titleStyle={{ fontSize: 14, color: 'white' }}
              buttonStyle={{ backgroundColor: item.status === 'New' ? "#439ce0" : "red" }}
            />
          </ListItem.Subtitle>
          <ListItem.Subtitle style={styles.totalPrice}>
            RM {item.total_inc_tax}
          </ListItem.Subtitle>
        </ListItem.Content>

    </TouchableOpacity>

  );

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <PublicHeader title={'Consignment Sales Statement'} />
      {/* Main content */}
      <View>
        <View style={{flexDirection:'row',alignItems:'center',padding:5}}>
          <Text style={{ color:'black' }}>Total Amount:</Text>
          <TextInput
            style={styles.inputTitle}
            value={parseFloat(ListData.consignment_sales_statement_header[0].total).toFixed(2)}
            editable={false}
          />
        </View>

        <View style={styles.buttonContainerGenerate}>
          {status==='New' && (
            <TouchableOpacity onPress={() => {setisVisibleModal(true);}} style={[styles.cancelButton,{backgroundColor:COLORS.Green}]}>
              <Icon name="pencil" size={23} color='white'style={{paddingRight:10,}} />
              <Text style={styles.buttonText}>Generate E Invoice</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.buttonContainerGenerate}>
        {ListData.show_e_invoice === "1" && (
          <TouchableOpacity onPress={() => { viewConsignEinv(Asup_doc_no,ListData.consignment_sales_statement_header[0].supcus_code,''); }} style={[styles.cancelButton,{backgroundColor:COLORS.Blue}]}>
            <Icon name="folder" size={23} color='white'style={{paddingRight:10,}} />
            <Text style={styles.buttonText}>View E Invoice</Text>
          </TouchableOpacity>
          )}
        </View>
      </View>
        <FlatList
          ref={flatListRef}
          data={ListData.consignment_sales_statement_footer}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
        <CustomAlert
            visible={showAlertBlank}
            message={alertMessageBlank}
            onClose={() => setShowAlertBlank(false)}
            icon="warning"
            Ccolor="red"
          />
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
                      value={ListData.consignment_sales_statement_header[0].refno}
                      editable={false}
                    />
                    <Text style={{ color:'black' }}>Date Trans</Text>
                    <TextInput
                      style={styles.input}
                      value={ListData.consignment_sales_statement_header[0].date_trans}
                      editable={false}
                    />
                    <Text style={{ color:'black' }}>Outlet</Text>
                    <TextInput
                      style={styles.input}
                      value={ListData.consignment_sales_statement_header[0].locgroup}
                      editable={false}
                    />
                    <Text style={{ color:'black' }}>Code</Text>
                    <TextInput
                      style={styles.input}
                      value={ListData.consignment_sales_statement_header[0].supcus_code}
                      editable={false}
                    />
                    <Text style={{ color:'black' }}>Name</Text>
                    <TextInput
                      style={styles.input}
                      value={ListData.consignment_sales_statement_header[0].supcus_name}
                      editable={false}
                    />
                    <Text style={{ color:'black' }}>Date From</Text>
                    <TextInput
                      style={styles.input}
                      value={ListData.consignment_sales_statement_header[0].date_from}
                      editable={false}
                    />
                    <Text style={{ color:'black' }}>Date To</Text>
                    <TextInput
                      style={styles.input}
                      value={ListData.consignment_sales_statement_header[0].date_to}
                      editable={false}
                    />
                    <Text style={{ color:'black' }}>Total Amount</Text>
                    <TextInput
                      style={styles.input}
                      value={parseFloat(ListData.consignment_sales_statement_header[0].total_inc_tax).toFixed(2)}
                      editable={false}
                    />
                    <Text style={{ color:'black' }}>Supplier Invoice No</Text>
                    <TextInput
                      style={styles.inputBlueBoxEdit}
                      value={Asup_doc_no}
                      onChangeText={(text) => setASup_doc_no(text)}
                    />
                    <Text style={{ color:'black' }}>Supplier Invoice Date</Text>
                    <TouchableOpacity onPress={() => showDatePicker('from', 'sInv')} style={styles.inputBlueBoxEdit}>
                    <TextInput
                      style={{color:COLORS.Black,paddingLeft:8}}
                      value={sInvDate ? sInvDate : ''}
                      placeholder='yyyy-mm-dd'
                      editable={false}
                      placeholderTextColor={COLORS.LightGrey}
                    />
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={issInvDatePickerVisible}
                      mode="date"
                      onConfirm={handleConfirmpo}
                      onCancel={hideDatePicker}
                    />
                    <View style={{flexDirection:'row',justifyContent:'space-around',padding:5}}>
                      <TouchableOpacity onPress={() => {
                         if (Asup_doc_no === null || Asup_doc_no === '')
                          {
                            setAlertMessageBlank('Supplier Invoice No cannot be Blank!');
                            setShowAlertBlank(true);
                          }
                          else if (sInvDate === null || sInvDate === '')
                          {
                            setAlertMessageBlank('Supplier Invoice Date cannot be Blank!');
                            setShowAlertBlank(true);
                          }
                          else
                          {
                            updateInvNo(period_code,Asup_doc_no,sInvDate,ListData.consignment_sales_statement_header[0].supcus_code,ListData.consignment_sales_statement_header[0].date_trans);
                          }

                        }
                       }
                        style={[styles.cancelButton,{backgroundColor:COLORS.Green,width:'25%'}]}>
                        <Icon name="save" size={23} color='white'style={{paddingRight:10,}} />
                        <Text style={styles.buttonText}>Save</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => { if (Asup_doc_no === null || Asup_doc_no === '')
                          {
                            setAlertMessageBlank('Supplier Invoice No cannot be Blank!');
                            setShowAlertBlank(true);
                          }
                          else if (sInvDate === null || sInvDate === '')
                          {
                            setAlertMessageBlank('Supplier Invoice Date cannot be Blank!');
                            setShowAlertBlank(true);
                          }
                          else
                          {
                            setIsConfirmationVisibleReminder(true);
                          }}}
                          style={[styles.cancelButton,{backgroundColor:Asup_doc_no === null || Asup_doc_no === '' || sInvDate === null || sInvDate === '' ? COLORS.LightGrey : COLORS.LightBlue
                          ,width:'50%'}]}>
                        <Icon name="sync" size={23} color='white'style={{paddingRight:10,}} />
                        <Text style={styles.buttonText}>Generate E Invoice</Text>
                      </TouchableOpacity>
                    </View>
                    </View>
                  </View>
                </ScrollView>
          </View>
          </View>
          </Modal>

          <ConfirmationModal
            isVisible={isConfirmationVisibleReminder}
            message={`Are you sure you want to Generate E Invoice?`}
            onConfirm={() => {generateEInv(period_code,Asup_doc_no,sInvDate,ListData.consignment_sales_statement_header[0].supcus_code,ListData.consignment_sales_statement_header[0].date_trans);
              setIsConfirmationVisibleReminder(false);}}
            onCancel={() => {setIsConfirmationVisibleReminder(false);}}
          />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Set background color to white
  },
  scroll: {
    flex: 1,
  },
  label: {
    fontSize: FONTSIZE.size_16,
    fontWeight: 'bold',
    color: COLORS.Black,
    paddingTop: 15,
  },
  inputTitle:{
    borderWidth:1,
    borderRadius:10,
    backgroundColor:'#dedee0',
    borderColor:COLORS.LightGrey,
    height:50,
    width:'75%',
    color:'#5a5d63',
    margin:5,
    padding:5,
    paddingRight:20,
    textAlign:'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    paddingBottom:10,
  },
  buttonText: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: COLORS.Blue,
    padding: 10,
    borderRadius: 8,
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  buttonContainerGenerate:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical:4,
    padding:10,
  },
  item: {
    borderWidth:1,
    borderColor:COLORS.WhiteRGBA15,
    elevation: 2,
    shadowColor: COLORS.Black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.White,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize:FONTSIZE.size_16,
    color:COLORS.Black,
  },
  blueLabel:{
    color:COLORS.Blue,
  },
  statusDesign:{
    position:'absolute',
    right:0,
    bottom:0,
  },
  totalPrice:{
    position:'absolute',
    right:1,
    fontWeight: 'bold',
    fontSize:FONTSIZE.size_24,
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
  inputBlueBoxEdit:{
    borderWidth:1,
    borderRadius:10,
    backgroundColor: COLORS.White,
    borderColor:COLORS.Blue,
    height:50,
    width:'100%',
    marginVertical:5,
    color:COLORS.Black,
    paddingLeft:10,
  },
  datePickerInput: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.Black,
  },
  datePickerInputO: {
    borderWidth: 1,
    borderColor: COLORS.LightBlue,
    borderRadius: 10,
    padding:2,
    marginTop: 5,
    width: '44%',
  },
});

export default withAuth(ConsignSSListScreen);
