import React, { useContext, useState, useRef,useCallback } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, RefreshControl,TextInput } from 'react-native';
import { ListItem, SearchBar, Chip,Overlay,Divider } from '@rneui/themed'; // Import SearchBar
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import PublicHeader from '../components/PublicHeader';
import { COLORS, FONTSIZE } from '../theme/themes';
import { BasicFunc } from '../context/BasicFunc';
import Spinner from 'react-native-loading-spinner-overlay';
import withAuth from '../withAuth';
import { BillingFunc } from './BillingFunc';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const Invoices = ({ navigation }) => {
  const { isLoading } = useContext(BasicFunc);
  const {InvoiceList,filterBilling,InvPdf,viewSlip,uploadSlip} = useContext(BillingFunc);
  const route = useRoute();
  const PVData = route.params?.DocData?.result || [];
  const filtering = route.params?.DocData?.filtering || ['All'];
  const result_count = route.params?.DocData?.total_result || '';
  const typeName = route.params?.typeName || '';
  const titleName = route.params?.titleName || '';
  const location = route.params?.location || '';
  const ishq = route.params?.ishq || '';
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const doc_type = ['All'];
  const period_code = route.params?.period_code || '';
  const supplier_guid = route.params?.supplier_guid || '';
  const flatListRef = useRef();
  const [isVisible, setIsVisible] = useState(null);
  const [isVisibleUpload, setIsVisibleUpload] = useState(null);
  const [fileResponse, setFileResponse] = useState([]);
  const [remarkInput, onRemarkInput] = useState('');
  const user_group = route.params?.user_group || '';

  const filteredPVData = PVData.filter((pv) =>
    pv.supplier_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pv.inv_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pv.amount.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        //presentationStyle: 'fullScreen',
        //allowMultiSelection: false,
        type: [DocumentPicker.types.allFiles],
      });
      setFileResponse(response);
    } catch (err) {
      //console.warn(err);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({ item, index }) => (
    <>
    <TouchableOpacity
            key={index}
            onPress={() => {
              InvPdf(item.inv_guid,item.inv_no,typeName);
            }}
            style={styles.item}
          >
            <ListItem.Content>
            <ListItem.Title style={styles.itemTitle}>{item.supplier_name}</ListItem.Title>
              <ListItem.Subtitle>
                <Text style={styles.blueLabel}>Refno </Text>
                <Text> {item.inv_no} </Text>
              </ListItem.Subtitle>
              <ListItem.Subtitle>
                <Text style={styles.blueLabel}>Year-Month </Text>
                <Text> {item.period_code} </Text>
              </ListItem.Subtitle>
              <ListItem.Subtitle  style={{paddingTop:15}}>
                <Icons name="calendar-check" size={20} color="#439ce0"/>
                <Text> {item.created_at}</Text>
              </ListItem.Subtitle>
              <ListItem.Subtitle style={[styles.status]}>
                <View style={styles.DNCon}>
                  {item.status !== '' && (
                    <Text style={[styles.textDN ,{backgroundColor:item.status_color}]}>
                      {item.status}
                    </Text>
                  )}
                  {(user_group === '3379ECDBDB0711E7B504A81E8453CCF0' && item.slip_status !== '' || item.upload_button === '0') && (
                    <Text style={[styles.textDN ,{backgroundColor: item.slip_status_color}]}>
                      {item.slip_status}
                    </Text>
                  )}
                </View>
              </ListItem.Subtitle>
              <ListItem.Subtitle style={styles.totalPrice}>
                RM {item.amount}
              </ListItem.Subtitle>
              <ListItem.Subtitle style={styles.inclTax}>
                Incl. Tax
              </ListItem.Subtitle>
              <ListItem.Subtitle style={styles.moreInfo}>
              {item.upload_button === '1' && (
                <TouchableOpacity onPress={()=>{
                  setIsVisibleUpload(index);
                }}>
                  <Icons name="file-upload" size={20} color="black"/>
                </TouchableOpacity>
              )}
              {(item.slip_status === 'Uploaded' || item.slip_status === 'Processed' || item.upload_button === '0') && (
                <TouchableOpacity onPress={()=>{
                  setIsVisible(index);
                }}>
                  <Icons name="ellipsis-v" size={20} color="black"/>
                </TouchableOpacity>
              )}
              </ListItem.Subtitle>
            </ListItem.Content>
          </TouchableOpacity>
          <Overlay
            isVisible={isVisible === index}
            onBackdropPress={() => setIsVisible(null)}
            overlayStyle={styles.overlay}
          >
          <View style={styles.bottomS}>
            <TouchableOpacity style={styles.Edit}
              onPress={() => { setIsVisible(false);
                               viewSlip(item.biller_guid,item.inv_no,typeName);
                              }}>
              <Icons name="pen" size={23} color='grey' style={{paddingRight:20,}}/>
              <Text style={{color:COLORS.Black,fontSize:FONTSIZE.size_16}}>View Slip</Text>
            </TouchableOpacity>
          </View>
          </Overlay>

          <Overlay
            isVisible={isVisibleUpload === index}
            onBackdropPress={() => setIsVisibleUpload(null)}
            >
            <View style={styles.remarkContainer}>
              <Text style={{color:'black', fontSize:FONTSIZE.size_18, fontWeight:'bold',textAlign:'center'}}>Upload Bank Remmittance</Text>
              <Divider width={1} color='grey' style={{ marginVertical: 10 }} />
              <View style={styles.last}>
                <Text style={styles.label}>File: </Text>
                <TouchableOpacity style={{borderColor:COLORS.LightGrey,borderRadius:5,borderWidth:1,padding:5}}
                                  onPress={()=>{handleDocumentSelection();}}>
                  <Text style={{color:'black'}}>Choose File</Text>
                </TouchableOpacity>
                { fileResponse.length > 0 && (
                  <Text style={{color:COLORS.Black}}>  {fileResponse[0].name}</Text>
                )}
              </View>
              <View style={{
                            justifyContent:'flex-start',
                            alignContent:'center',
                            width:'100%',
                            paddingVertical:10,
                            }}>
                <Text style={styles.label}>Remark: </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => onRemarkInput(text)}
                  value={remarkInput}
                  placeholder="Remark"
                  placeholderTextColor={COLORS.LightGrey}
                  multiline
                  numberOfLines={5}
                />
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{width:60,height:40,backgroundColor:COLORS.LightGrey,alignSelf:'flex-start',padding:5,margin:10,justifyContent:'center',borderWidth:1,borderRadius:5,borderColor:COLORS.LightGrey,alignContent:'center'}}>
                  <TouchableOpacity onPress={()=>{setIsVisibleUpload(null); onRemarkInput(''); setFileResponse([]);}}>
                    <Text style={{color:'white',fontWeight:'bold',justifyContent:'center'}}> Close</Text>
                  </TouchableOpacity>
                </View>

                <View style={{width:60,height:40,backgroundColor:COLORS.Green,alignSelf:'flex-end',padding:5,margin:10,justifyContent:'center',borderWidth:1,borderRadius:5,borderColor:COLORS.Green,alignContent:'center'}}>
                  <TouchableOpacity onPress={()=>{setIsVisibleUpload(null); uploadSlip(item.biller_guid,item.inv_no,remarkInput,fileResponse);}}>
                    <Text style={{color:'white',fontWeight:'bold',justifyContent:'center'}}> Upload</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Overlay>
      </>
  );

  const keyExtractor = (item, index) => index.toString();

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <PublicHeader title={[titleName,' (',result_count,') ']} />
      <View style={styles.searchBarContainer}>
        {/* SearchBar component */}
        <SearchBar
          placeholder="Search Ref No..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchBarInput}
          inputContainerStyle={[
            styles.searchBarInputContainer,
            { borderColor: isFocused ? COLORS.Grey : COLORS.LightBlue },
          ]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          containerStyle={styles.flex1}
          placeholderTextColor={COLORS.LightGrey}
        />
        {/* Filter button */}
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            filterBilling(typeName,location,ishq);
          }}
        >
          <Icon name="filter" size={25} color={COLORS.White} />
        </TouchableOpacity>

        <View style={styles.chipsContainer}>
          {Object.entries(filtering).map(([key, value], index) => (
            Array.isArray(value) ? (
              value.length > 0 && value[0] !== "" && (
                value.map((item, i) => (
                  <Chip
                    disabled
                    iconContainerStyle={styles.Schip}
                    containerStyle={styles.Schip}
                    key={i}
                    type={'solid'}
                  >
                    <Text style={styles.ChipWord}>{item}</Text>
                  </Chip>
                ))
              )
            ) : (
              (value !== undefined && value !== null && value !== "") && (
                <Chip
                  disabled
                  iconContainerStyle={styles.Schip}
                  containerStyle={styles.Schip}
                  key={index}
                  type={'solid'}
                >
                  <Text style={styles.ChipWord}>{value}</Text>
                </Chip>
              )
            )
          ))}
        </View>

      </View>

      <FlatList
        ref={flatListRef}
        data={filteredPVData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {
            InvoiceList(typeName,filtering,period_code,doc_type,supplier_guid,location,ishq);
          }} />
        }
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
  },
  blueLabel:{
    color:COLORS.Blue,
  },
  status:{
    position:'absolute',
    right:0,
    bottom:0,
  },
  totalPrice:{
    position:'absolute',
    right:0,
    top:20,
    fontWeight: 'bold',
    fontSize:FONTSIZE.size_24,
  },
  inclTax:{
    position:'absolute',
    right:0,
    top:45,
    fontWeight: 'bold',
    fontSize:FONTSIZE.size_16,
  },
  moreInfo:{
    position:'absolute',
    right:1,
    top:0,
  },
  searchBar: {
    backgroundColor: COLORS.White, // Set background color to white
    height: 60,
  },
  searchBarInputContainer:{
    backgroundColor: COLORS.White,
    borderRadius: 10,
    borderWidth: 2,
    borderBottomWidth: 2,
    height: 50,
    width:'100%',
  },
  searchBarInput: {
    color: COLORS.Black, // Set text color to black
  },
  searchBarContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: COLORS.Grey,
    width:'100%',
    padding:5,
  },
  filterButton: {
    padding: 10,
  },
  flex1:{
    flex:1,
    backgroundColor: COLORS.Grey,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width:'100%',
    marginTop: 2,
  },
  Schip: {
    borderWidth: 1,
    borderColor: COLORS.Black,
    color:COLORS.White,
    backgroundColor:COLORS.White,
  },
  ChipWord: {
    color: COLORS.Black,
    fontSize: FONTSIZE.size_14,
  },
  NextButtonContainer: {
    padding: 5,
    backgroundColor:COLORS.LightGrey,
    margin:10,
    marginBottom:30,
    alignSelf:'flex-end',
    width:'25%',
    alignItems:'center',
  },
  Next:{
    color:COLORS.White,
    fontSize:FONTSIZE.size_18,
    fontWeight:'bold',
  },
  DNCon:{
    flexDirection:'row',
  },
  textDN:{
    fontSize:FONTSIZE.size_14,
    color:COLORS.White,
    fontWeight:'bold',
    padding:3,
    paddingHorizontal:10,
  },
  overlay:{
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: COLORS.White,
  },
  bottomS:{
    paddingVertical:20,
  },
  Edit:{
    flexDirection:'row',
    alignItems:'center',
    margin:15,
  },
  remarkContainer:{
    backgroundColor: COLORS.White,
    width:350,
    padding:8,
  },
  last:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignContent:'center',
    width:'100%',
    paddingVertical:10,
    alignItems:'center',
  },
  label: {
    fontSize:FONTSIZE.size_16,
    color:COLORS.Black,
    fontWeight:'bold',
  },
  input: {
    height: 'auto',
    width:'95%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:3,
    borderColor:COLORS.LightGrey,
    color:COLORS.Black,
  },
});

export default withAuth(Invoices);
