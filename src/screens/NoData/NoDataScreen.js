import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { ListItem, SearchBar, Chip } from '@rneui/themed'; // Import SearchBar
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import PublicHeader from '../components/PublicHeader';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/themes';
import { BasicFunc } from '../context/BasicFunc';
import Spinner from 'react-native-loading-spinner-overlay';
import { DisplayFunc } from '../context/DisplayFunc';
import withAuth from '../withAuth';

const NoDataScreen = ({ navigation }) => {
  const { isLoading } = useContext(BasicFunc);
  const { filter } = useContext(DisplayFunc);
  const route = useRoute();
  const CountData = route.params?.CountData || '';
  const filtering = route.params?.DocData?.filtering || [];
  const typeName = route.params?.typeName || '';
  const location = route.params?.location || '';
  const ishq = route.params?.ishq || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <PublicHeader title={[typeName,' (',CountData,') ']} />
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

      <ScrollView style={styles.scroll}>
        <View style={styles.containerNoData}>
          <Icons name="clipboard-list" size={50} color='#bdc2c9'/>
          <Text style={styles.NoDataContent}>There is no {typeName} at the moment</Text>
          <Text style={styles.NoDataContent}>Youre on top of everything here. </Text>
        </View>
      </ScrollView>
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
  containerNoData:{
    borderWidth:1,
    borderColor:COLORS.LightGrey,
    borderRadius:10,
    padding:30,
    margin:30,
    height:220,
    alignItems:'center',
    justifyContent:'center',
  },
  NoDataContent:{
    color:COLORS.LightGrey,
    fontSize:FONTSIZE.size_18,
    fontWeight:'bold',
    paddingVertical:5,
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
});

export default withAuth(NoDataScreen);
