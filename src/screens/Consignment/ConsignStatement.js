import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, RefreshControl,Animated,Easing } from 'react-native';
import { ListItem, SearchBar, Chip } from '@rneui/themed'; // Import SearchBar
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import PublicHeader from '../components/PublicHeader';
import { COLORS, FONTSIZE } from '../theme/themes';
import { BasicFunc } from '../context/BasicFunc';
import Spinner from 'react-native-loading-spinner-overlay';
import { DisplayFunc } from '../context/DisplayFunc';
import withAuth from '../withAuth';
import { ConsignFunc } from './ConsignFunc';

const ConsignStatement = ({ navigation }) => {
  const { isLoading } = useContext(BasicFunc);
  const { filter, displayDoc } = useContext(DisplayFunc);
  const {consignSSList} = useContext(ConsignFunc);
  const route = useRoute();
  const ConsignSSData = route.params?.DocData?.result || [];
  const filtering = route.params?.DocData?.filtering || [];
  const result_count = route.params?.DocData?.result_count_all || '';
  const typeName = route.params?.typeName || '';
  const titleName = route.params?.titleName || '';
  const location = route.params?.location || '';
  const ishq = route.params?.ishq || '';
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fstatus = route.params?.DocData?.filtering.show_status || 'default';
  const refno = '';
  const period_code = route.params?.DocData?.filtering.period_code || '';
  const exp_from = route.params?.DocData?.filtering.exp_from || '';
  const exp_to = route.params?.DocData?.filtering.exp_to || '';
  const doc_type = ['all'];
  const limit = 100;
  const poffset = route.params?.offset || '';
  const filter_supplier = route.params?.filter_supplier || '';
  const date_from = route.params?.DocData?.filtering.date_from || '';
  const date_to = route.params?.DocData?.filtering.date_to || '';
  const flatListRef = useRef();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const toggleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const blinkAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(toggleAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(toggleAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    );
    
    blinkAnimation.start();

    return () => {
      blinkAnimation.stop();
    };
  }, [toggleAnim]);

  useEffect(() => {
    const fadeIn = Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    );
    const fadeOut = Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    );

    const sequence = Animated.sequence([fadeIn, fadeOut]);

    Animated.loop(sequence).start();
  }, [fadeAnim]);


  let status = fstatus.map(s =>( s === 'New' || s === 'NEW') ? 'default' : s);
  if (JSON.stringify(fstatus) === JSON.stringify(["New"])) {
    status = 'default';
  }

  const filteredConsignSSData = ConsignSSData.filter((consign) =>
    consign.sname.toLowerCase().includes(searchQuery.toLowerCase())
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

  const renderItem = ({ item, index }) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          let pdncn = '';
          consignSSList(typeName,refno,item.status,item.period_code,item.scode,pdncn);
        }}
        style={styles.item}
      >
        <ListItem.Content>
          <ListItem.Title style={styles.itemTitle}>{item.sname || 'N/A'}</ListItem.Title>
          {(item.status === 'New') && (
            <Animated.View
            style={{
              opacity: fadeAnim,
              height: 20,
              width: 20,
              borderRadius: 10,
              backgroundColor: 'red',
              position:'absolute',
              right:5,
              top:5
            }}
          />
          )}
          
          <ListItem.Subtitle>
            <View style={{alignContent:'center',flexDirection:'row',paddingVertical:1}}>
              <Icon name="storefront" size={20} color="#439ce0" />
              <Text style={{color:'black'}}> TUNAS MANJA SDN BHD</Text>
            </View>
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            <View style={{alignContent:'center',flexDirection:'row',paddingVertical:1}}>
              <Text style={styles.blueLabel}>Code </Text>
              <Text style={{color:'black'}}> {item.scode || 'N/A'} </Text>
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
              <Icon name="checkmark-circle-outline" size={20} color="#439ce0" />
              {item.status === 'New' ? (
                <Animated.Text style={{ color: toggleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['black', 'red'],
                  })}}> {item.e_inv_create_time === '' ? ('To Generate Invoice') : (`${item.e_inv_create_time} Generated`)} </Animated.Text>
              ) : (
                <Text style={{color:'red'}}> {item.e_inv_create_time} Generated</Text>
              )}
            </View>
          </ListItem.Subtitle>
          <ListItem.Subtitle style={styles.status}>
            <Chip
              title={item.status || 'N/A'}
              containerStyle={{ position: 'absolute', bottom: 0, right: 0 }}
              titleStyle={{ fontSize: 14, color: 'white' }}
              buttonStyle={{ backgroundColor: item.color }}
            />
          </ListItem.Subtitle>
        </ListItem.Content>
      </TouchableOpacity>
  );

  const keyExtractor = (item, index) => index.toString();

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <PublicHeader title={[titleName, ' (', result_count, ') ']} />
      <View style={styles.searchBarContainer}>
        <SearchBar
          placeholder="Search Company Name..."
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
          { (filter_supplier !== '') && (
            <Chip
              disabled
              iconContainerStyle={styles.Schip}
              containerStyle={styles.Schip}
              type={'solid'}
            >
              <Text style={styles.ChipWord}>{filter_supplier}</Text>
            </Chip>
          )}
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={filteredConsignSSData}
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
          if (ConsignSSData.length > 99)
          {
            console.log(limit);
            console.log(poffset);
            console.log(ConsignSSData.length);
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
});

export default withAuth(ConsignStatement);
