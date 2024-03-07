import React, {useContext,useState} from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity, Alert } from 'react-native';
import PublicHeader from '../components/PublicHeader';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/themes';
import { Divider} from '@rneui/themed';
import Spinner from 'react-native-loading-spinner-overlay';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {DisplayFunc} from '../context/DisplayFunc';
import { useRoute } from '@react-navigation/native';
import withAuth from '../withAuth';
import { ConsignFunc } from './AccDocFunc';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountingDocDashboard = ({ navigation }) => {
  const {isLoading,displayDoc} = useContext(DisplayFunc);
  //const {consignSRFilter} = useContext(ConsignFunc);
  const route = useRoute();
  const dashboardAccData = route.params?.dashboardAccData || [];
  const dateFrom = route.params?.dateFrom || '';
  const dateTo = route.params?.dateTo || '';
  const status = 'default';
  const refno = '';
  const period_code = '';
  const exp_from = '';
  const exp_to = '';
  const doc_type = ['all'];
  const limit = 100;
  const offset = 0;
  const filter_supplier = '';
  const date_from = '';//dateFrom;
  const date_to = '';//dateTo;

  return (
    <View style={styles.container}>
    <Spinner visible={isLoading} />
      <PublicHeader title={'Accounting Documents Dashboard'}/>
      <ScrollView style={styles.scroll}>
      <View>
        {/* Your ConsignmentDashboard content */}
        <Text style={styles.content}>Date View from <Text style={{fontWeight:'bold'}}> {dateFrom} </Text> to <Text style={{fontWeight:'bold'}}> {dateTo} </Text></Text>
        <Divider width={2} />

        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
        {( dashboardAccData !== undefined || dashboardAccData !== null) && (
          dashboardAccData.map((acc, index) => (
          <React.Fragment key={index}>
          <TouchableOpacity
            style={[styles.button,{ backgroundColor: `${acc.background_color}` }]}
            onPress={async () =>
                      {
                          const location = await AsyncStorage.getItem('location');
                          const ishq = await  AsyncStorage.getItem('ishq');
                          displayDoc(location,ishq,acc.type,status,refno,period_code,date_from,date_to,exp_from,exp_to,doc_type,limit,offset,filter_supplier);
                      }
                    }
          >
            <View style={styles.buttonContent}>
              <Icons
                name="assignment" // Replace with the actual icon name
                size={120} // Adjust the size of the icon as needed
                color={COLORS.TransGrey}
                style={styles.icon}
              />
              <View style={styles.NumWord}>
                <Text style={styles.buttonTextAmt}>{acc.count_doc}</Text>
                <Text style={styles.buttonText}>{acc.display_name}</Text>
              </View>
            </View>
          </TouchableOpacity>
          </React.Fragment>
          )))}
        </View>
      </View>
      </ScrollView>
      
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  scroll: {
    flex: 1,
  },
  content: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.Black,
    padding: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow items to wrap to the next line
    marginTop: 10,
    justifyContent:'center',
  },
  button: {
    width: 160,
    height: 170,
    borderRadius: 10,
    borderColor: COLORS.Black,
    borderWidth: 1,
    margin: 8,
  },
  buttonContent: {
    flexDirection:'row',
    width:'90%',
  },
  icon: {
    position: 'absolute', // Position the icon absolutely within the button
    paddingLeft:45,
    marginTop:25,
  },
  buttonText: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_extrabold,
    fontWeight: 'bold',
  },
  buttonTextAmt:{
    color: COLORS.White,
    fontSize: 30,
    fontFamily: FONTFAMILY.poppins_extrabold,
    fontWeight: 'bold',
  },
  NumWord:{
    paddingTop:55,
    paddingLeft:10,
  },
});

export default withAuth(AccountingDocDashboard);
