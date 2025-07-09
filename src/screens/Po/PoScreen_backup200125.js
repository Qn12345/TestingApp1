import React, { useContext, useState, useCallback, useRef } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, RefreshControl,Modal,ScrollView } from 'react-native';
import { ListItem, SearchBar, Chip,Tab, TabView } from '@rneui/themed'; // Import SearchBar
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import PublicHeader from '../components/PublicHeader';
import { COLORS, FONTSIZE,FONTFAMILY } from '../theme/themes';
import { BasicFunc } from '../context/BasicFunc';
import Spinner from 'react-native-loading-spinner-overlay';
import { DisplayFunc } from '../context/DisplayFunc';
import withAuth from '../withAuth';

const PoScreen = ({ navigation }) => {
  const { isLoading } = useContext(BasicFunc);
  const { filter, displayPdf, displayDoc } = useContext(DisplayFunc);
  const route = useRoute();
  const poData = route.params?.DocData?.result || [];
  const filtering = route.params?.DocData?.filtering || [];
  const result_count = route.params?.DocData?.result_count_all || '';
  const typeName = route.params?.typeName || '';
  const location = route.params?.location || '';
  const ishq = route.params?.ishq || '';
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryNo, setSearchQueryNo] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedNo, setIsFocusedNo] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  //const fstatus = route.params?.DocData?.filtering.show_status || 'default';
  const fstatus = Array.isArray(route.params?.DocData?.filtering?.show_status) ? route.params.DocData.filtering.show_status : 'default';
  const refno = Array.isArray(route.params?.DocData?.filtering?.refno) ? route.params.DocData.filtering.refno : '';
  const period_code = Array.isArray(route.params?.DocData?.filtering?.period_code) ? route.params.DocData.filtering.period_code : '';
  const exp_from = Array.isArray(route.params?.DocData?.filtering?.exp_from) ? route.params.DocData.filtering.exp_from : '';
  const exp_to = Array.isArray(route.params?.DocData?.filtering?.exp_to) ? route.params.DocData.filtering.exp_to : '';
  const doc_type = ['all'];
  const limit = 100;
  const poffset = route.params?.offset || '';
  const filter_supplier = '';
  const date_from = Array.isArray(route.params?.DocData?.filtering?.date_from) ? route.params.DocData.filtering.date_from : '';
  const date_to = Array.isArray(route.params?.DocData?.filtering?.date_to) ? route.params.DocData.filtering.date_to : '';
  const flatListRef = useRef();
  const Notification = route.params?.DocData?.notification || [];
  const [isVisibleModal, setisVisibleModal] = useState(true);
  const [indexM, setIndexM] = useState(0);

  let status = fstatus.map(s => s === 'NEW' ? '' : s);
  if (JSON.stringify(fstatus) === JSON.stringify(["New", "Viewed", "Printed"])) {
    status = 'default';
  }

  const filteredpoData = poData.filter((po) =>
    po.refno.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredResult = Notification[0].result.filter(po =>
    po.Refno.toLowerCase().includes(searchQueryNo.toLowerCase())
  );

  const filteredResultC = Notification[1].result.filter(po =>
    po.Refno.toLowerCase().includes(searchQueryNo.toLowerCase())
  );

  const filteredResultExt = Notification[2].result.filter(po =>
    po.Refno.toLowerCase().includes(searchQueryNo.toLowerCase())
  );



  const handleFocusNo = () => {
    setIsFocusedNo(true);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleBlurNo = () => {
    setIsFocusedNo(false);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleSearchNo = (text) => {
    setSearchQueryNo(text);
  };

  const renderItem = ({ item, index }) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          displayPdf(typeName, item.refno, item.status);
        }}
        style={styles.item}
      >
        <ListItem.Content>
          <ListItem.Title style={styles.itemTitle}>{item.sname || 'N/A'}</ListItem.Title>
          <ListItem.Subtitle>
            <Text style={styles.blueLabel}>PO# </Text>
            <Text> {item.refno || 'N/A'} </Text>
            <Text style={styles.blueLabel}>      Outlet </Text>
            <Text> {item.loc_group || 'N/A'} </Text>
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            <Icon name="calendar" size={20} color="#439ce0" />
            <Text>  {item.doc_date || 'N/A'}</Text>
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            <Icons name="truck" size={19} color="#40bf40" />
            <Text> {item.deliver_date || 'N/A'}</Text>
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            <Icon name="calendar" size={20} color="red" />
            <Text>  {item.expiry_date || 'N/A'}</Text>
          </ListItem.Subtitle>
          <ListItem.Subtitle style={styles.status}>
            <Chip
              title={item.status || 'N/A'}
              containerStyle={{ position: 'absolute', bottom: 0, right: 0 }}
              titleStyle={{ fontSize: 14, color: 'white' }}
              buttonStyle={{ backgroundColor: item.color }}
            />
          </ListItem.Subtitle>
          <ListItem.Subtitle style={styles.totalPrice}>
            RM {item.amount}
          </ListItem.Subtitle>
        </ListItem.Content>
      </TouchableOpacity>
  );

  const renderItemNo = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      disabled
      style={[styles.item,{borderColor:COLORS.LightGrey}]}
    >
      <ListItem.Content>
        <ListItem.Subtitle>
          <Text style={styles.blueLabel}>Refno: </Text>
          <Text> {item.Refno || 'N/A'} </Text>
        </ListItem.Subtitle>
        {(item['Expiry On'] !== undefined) && (
        <ListItem.Subtitle>
          <Text style={styles.blueLabel}>Expiry On: </Text>
          <Text> {item['Expiry On']|| 'N/A'} </Text>
        </ListItem.Subtitle>)}
        {(item['Cancel By'] !== undefined) && (
        <ListItem.Subtitle>
          <Text style={styles.blueLabel}>Cancel By: </Text>
          <Text> {item['Cancel By']} </Text>
        </ListItem.Subtitle>
        )}
        {(item['Cancel At'] !== undefined) && (
        <ListItem.Subtitle>
          <Text style={styles.blueLabel}>Cancel At: </Text>
          <Text> {item['Cancel At']|| 'N/A'} </Text>
        </ListItem.Subtitle>
        )}
      </ListItem.Content>
    </TouchableOpacity>
);

  const keyExtractor = (item, index) => index.toString();

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <PublicHeader title={[typeName, ' (', result_count, ') ']} />
      <View style={styles.searchBarContainer}>
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

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            filter(typeName, location, ishq);
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

      {(Notification.length > 0) && (
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
                <Text style={styles.title}>Notification</Text>
              </View>
            </View>
              <Tab
                value={indexM}
                onChange={(e) => setIndexM(e)}
                indicatorStyle={{
                  backgroundColor: 'white',
                  height: 2,
              }}
              variant="primary"
              >
              <Tab.Item
                title="PO Expire In"
                titleStyle={{ fontSize: 14, fontWeight:'bold'  }}
              />
              <Tab.Item
                title="Cancel PO"
                titleStyle={{ fontSize: 14, fontWeight:'bold' }}
                />
              <Tab.Item
                title="Extend PO"
                titleStyle={{ fontSize: 14, fontWeight:'bold' }}
              />
            </Tab>
            <TabView value={indexM} onChange={setIndexM} animationType="spring">
              <TabView.Item style={{ backgroundColor:COLORS.White, width: '100%' }}>
                <View style={styles.detailsContainer}>
                  <View style={styles.buttonContainer}>
                  <SearchBar
                    placeholder="Search Ref No..."
                    onChangeText={handleSearchNo}
                    value={searchQueryNo}
                    style={styles.searchBar}
                    inputStyle={styles.searchBarInput}
                    inputContainerStyle={[
                      styles.searchBarInputContainer,
                      { borderColor: isFocusedNo ? COLORS.Grey : COLORS.LightBlue },
                    ]}
                    onFocus={handleFocusNo}
                    onBlur={handleBlurNo}
                    containerStyle={styles.flex1No}
                    placeholderTextColor={COLORS.LightGrey}
                  />
                  </View>
                  <View style={{marginTop:'11%'}}>
                  {(Notification[0].result.length>0) ? (
                    <FlatList
                    ref={flatListRef}
                    data={filteredResult}
                    renderItem={renderItemNo}
                    keyExtractor={keyExtractor}
                  />
                  ) : (
                    <Text style={{color:COLORS.Black}}>There is No Data at the moment</Text>
                  )}
                  </View>
                </View>
              </TabView.Item>
              <TabView.Item style={{ backgroundColor:COLORS.White, width: '100%' }}>
                <View style={styles.detailsContainer}>
                  <View style={styles.buttonContainer}>
                  <SearchBar
                    placeholder="Search Ref No..."
                    onChangeText={handleSearchNo}
                    value={searchQueryNo}
                    style={styles.searchBar}
                    inputStyle={styles.searchBarInput}
                    inputContainerStyle={[
                      styles.searchBarInputContainer,
                      { borderColor: isFocusedNo ? COLORS.Grey : COLORS.LightBlue },
                    ]}
                    onFocus={handleFocusNo}
                    onBlur={handleBlurNo}
                    containerStyle={styles.flex1No}
                    placeholderTextColor={COLORS.LightGrey}
                  />
                  </View>
                  <View style={{marginTop:'11%'}}>
                  {(Notification[1].result.length>0) ? (
                    <FlatList
                    ref={flatListRef}
                    data={filteredResultC}
                    renderItem={renderItemNo}
                    keyExtractor={keyExtractor}
                  />
                  ) : (
                    <Text style={{color:COLORS.Black}}>There is No Data at the moment</Text>
                  )}
                  </View>
                </View>
              </TabView.Item>
              <TabView.Item style={{ backgroundColor:COLORS.White, width: '100%' }}>
                <View style={styles.detailsContainer}>
                  <View style={styles.buttonContainer}>
                  <SearchBar
                    placeholder="Search Ref No..."
                    onChangeText={handleSearchNo}
                    value={searchQueryNo}
                    style={styles.searchBar}
                    inputStyle={styles.searchBarInput}
                    inputContainerStyle={[
                      styles.searchBarInputContainer,
                      { borderColor: isFocusedNo ? COLORS.Grey : COLORS.LightBlue },
                    ]}
                    onFocus={handleFocusNo}
                    onBlur={handleBlurNo}
                    containerStyle={styles.flex1No}
                    placeholderTextColor={COLORS.LightGrey}
                  />
                  </View>
                  <View style={{marginTop:'11%'}}>
                  {(Notification[2].result.length > 0) ? (
                    <FlatList
                    ref={flatListRef}
                    data={filteredResultExt}
                    renderItem={renderItemNo}
                    keyExtractor={keyExtractor}
                  />
                  ) : (
                    <View style={{padding:10,margin:10,borderRadius:5,borderColor:COLORS.LightGrey,
                                  width:'80%',height:'60%',borderWidth:1,justifyContent:'center',alignSelf:'center'}}>
                    <Text style={{color:COLORS.Black,justifyContent:'center'}}>There is No Data at the moment.</Text>
                    </View>
                  )}
                  </View>
                </View>
              </TabView.Item>
            </TabView>
          </View>
          </View>
      </Modal>
      )}

      <FlatList
        ref={flatListRef}
        data={filteredpoData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {
            let roffset = 0;
            displayDoc(location, ishq, typeName, status, refno, period_code, date_from, date_to, exp_from, exp_to, doc_type, limit, roffset, filter_supplier);
          }} />
        }
        //onEndReachedThreshold={9}
        onEndReached={() => {
          if (poData.length > 99)
          {
            console.log(limit);
            console.log(poffset);
            console.log(poData.length);
            const parsedPoffset = isNaN(parseFloat(poffset)) ? 0 : parseFloat(poffset);
            const offset = parsedPoffset + 3;
            displayDoc(location, ishq, typeName, status, refno, period_code, date_from, date_to, exp_from, exp_to, doc_type, limit, offset, filter_supplier);
          }

        }}
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
    fontWeight: 'bold',
    fontSize:FONTSIZE.size_24,
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
  flex1No:{
    flex:1,
    backgroundColor: COLORS.White,
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
detailsContainer:{
    padding:10,
  },
buttonContainerGenerate:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical:4,
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
buttonText:{
      fontSize:FONTSIZE.size_14,
      fontFamily:FONTFAMILY.poppins_extrabold,
      color: COLORS.White,
      fontWeight: 'bold',
      padding:3,
  },
});

export default withAuth(PoScreen);
