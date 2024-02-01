import React, { useContext, useState, useRef } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, RefreshControl } from 'react-native';
import { ListItem, SearchBar, Chip } from '@rneui/themed'; // Import SearchBar
import { useRoute } from '@react-navigation/native';
import PublicHeader from '../components/PublicHeader';
import { COLORS, FONTSIZE } from '../theme/themes';
import { BasicFunc } from '../context/BasicFunc';
import Spinner from 'react-native-loading-spinner-overlay';
import withAuth from '../withAuth';
import { GeneralFunc } from '../context/GeneralFunc';

const B2BReminderScreen = ({ navigation }) => {
  const { isLoading } = useContext(BasicFunc);
  const { b2b_reminder, b2b_reminder_byRetailer} = useContext(GeneralFunc);
  const route = useRoute();
  const ReminderData = route.params?.ReminderData?.result || [];
  const result_count = ReminderData.length;
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef();

  const filteredReminderData = ReminderData.filter((data) =>
    data.supplier_name.toLowerCase().includes(searchQuery.toLowerCase())
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
          b2b_reminder_byRetailer(item.DebtorCode);
        }}
        style={styles.item}
      >
        <View>
          <Text style={styles.itemTitle}>{item.supplier_name || 'N/A'}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Code: </Text>
              <Text style={styles.label}>Debtor Code: </Text>
              <Text style={styles.label}>Registration Invoice Date: </Text>
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
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.details}>{item.Code || 'N/A'}</Text>
              <Text style={styles.details}>{item.DebtorCode || 'N/A'}</Text>
              <Text style={styles.details}>{item.Registration_Invoice_Date || 'N/A'}</Text>
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
            </View>
          </View>
        </View>
      </TouchableOpacity>
  );

  const keyExtractor = (item, index) => index.toString();

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <PublicHeader title={['B2B Reminder', ' (', result_count, ') ']} />
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
        />
      </View>
      <FlatList
        ref={flatListRef}
        data={filteredReminderData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {
            b2b_reminder();
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
    fontSize:FONTSIZE.size_18,
    color:COLORS.Black,
  },
  infoContainer:{
    flexDirection:'row',
  },
  labelContainer:{
    paddingVertical:5,
    paddingRight:5,
  },
  detailsContainer:{
    paddingVertical:5,
  },
  label: {
    fontSize:FONTSIZE.size_14,
    color:COLORS.Black,
  },
  details: {
    fontSize:FONTSIZE.size_14,
    color:COLORS.Black,
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
  flex1:{
    flex:1,
    backgroundColor: COLORS.Grey,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
}); 

export default withAuth(B2BReminderScreen);
