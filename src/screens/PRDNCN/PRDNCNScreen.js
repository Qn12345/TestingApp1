import React, { useContext, useState, useCallback, useRef } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, RefreshControl } from 'react-native';
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

const PRDNCNScreen = ({ navigation }) => {
  const { isLoading } = useContext(BasicFunc);
  const { filter,displayPdf, displayDoc } = useContext(DisplayFunc);
  const route = useRoute();
  const PRDNCNData = route.params?.DocData?.result || [];
  const filtering = route.params?.DocData?.filtering || [];
  const typeName = route.params?.typeName || '';
  const result_count = route.params?.DocData?.result_count_all || '';
  const location = route.params?.location || '';
  const ishq = route.params?.ishq || '';
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fstatus = route.params?.DocData?.filtering.show_status || 'default';
  const refno = route.params?.DocData?.filtering.refno || '';
  const period_code = route.params?.DocData?.filtering.period_code || '';
  const exp_from = route.params?.DocData?.filtering.exp_from || '';
  const exp_to = route.params?.DocData?.filtering.exp_to || '';
  const doc_type = route.params?.DocData?.filtering.show_doc_type || ['all'];
  const limit = 100;
  const poffset = route.params?.offset || '';
  const filter_supplier = '';
  const date_from = route.params?.DocData?.filtering.date_from || '';
  const date_to = route.params?.DocData?.filtering.date_to || '';
  const flatListRef = useRef();

  let status = fstatus.map(s => s === 'New' ? '' : s);
  if (JSON.stringify(fstatus) === JSON.stringify(["New", "Viewed", "Printed"])) {
    status = 'default';
  }

  const filteredPRDNCNData = PRDNCNData.filter((PRDNCN) =>
    PRDNCN.refno.toLowerCase().includes(searchQuery.toLowerCase())
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
              displayPdf(typeName, item.refno, item.status,item.doc_type);
            }}
            style={styles.item}
          >
            <ListItem.Content>
              <ListItem.Title style={styles.itemTitle}>{item.sname || 'N/A'}</ListItem.Title>
              <ListItem.Subtitle>
                <Text style={styles.blueLabel}>{typeName}# </Text>
                <Text> {item.refno || 'N/A'} </Text>
                <Text style={styles.blueLabel}>      Outlet </Text>
                <Text> {item.loc_group || 'N/A'} </Text>
              </ListItem.Subtitle>
              <ListItem.Subtitle>
                <Icon name="calendar" size={20} color="#40bf40" />
                <Text> {item.doc_date || 'N/A'}</Text>
              </ListItem.Subtitle>
              <ListItem.Subtitle>
                <Icons name="calendar-day" size={19} color="#439ce0" />
                <Text>  {item.inv_date || 'N/A'}</Text>
              </ListItem.Subtitle>
              <ListItem.Subtitle>
                <Icons name="clipboard-list" size={19} color="#439ce0" />
                <Text>  {item.invno || 'N/A'}</Text>
              </ListItem.Subtitle>
              <ListItem.Subtitle style={[styles.status]}>
              <View style={styles.DNCon}>
                <Text style={[styles.textDN ,{backgroundColor:item.doc_type_color}]}>
                  {item.doc_type  || 'N/A'}
                </Text>
                <Text style={[styles.textDN ,{backgroundColor: item.color}]}>
                  {item.status || 'N/A'}
                </Text>
              </View>
              </ListItem.Subtitle>
              <ListItem.Subtitle style={styles.totalPrice}>
                RM {item.amount}
              </ListItem.Subtitle>
            </ListItem.Content>
          </TouchableOpacity>
);

const keyExtractor = (item, index) => index.toString();

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <PublicHeader title={[typeName,' (',result_count,') ']} />
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
        />

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            filter(typeName,location,ishq);
          }}
        >
          <Icon name="filter" size={25} color={COLORS.White} />
        </TouchableOpacity>
        <View style={styles.chipsContainer}>
          {Object.entries(filtering).reduce((uniqueValues, [key, value]) => {
            if (Array.isArray(value)) {
              value.forEach(item => {
                if (item !== "" && !uniqueValues.includes(item)) {
                  uniqueValues.push(item);
                }
              });
            } else if (value !== undefined && value !== null && value !== "" && !uniqueValues.includes(value)) {
              uniqueValues.push(value);
            }
            return uniqueValues;
          }, []).map((uniqueValue, index) => (
            <Chip
              disabled
              iconContainerStyle={styles.Schip}
              containerStyle={styles.Schip}
              key={index}
              type={'solid'}
            >
              <Text style={styles.ChipWord}>{uniqueValue}</Text>
            </Chip>
          ))}
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={filteredPRDNCNData}
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
          if (PRDNCNData.length > 99)
          {
            console.log(limit);
            console.log(poffset);
            console.log(PRDNCNData.length);
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
  scroll: {
    flex: 1,
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
  textDN:{
    fontSize:FONTSIZE.size_14,
    color:COLORS.White,
    fontWeight:'bold',
    padding:5,
    paddingHorizontal:10,
  },
  DNCon:{
    flexDirection:'row',
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

export default withAuth(PRDNCNScreen);
