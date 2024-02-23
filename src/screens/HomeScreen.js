import React, {useContext,useState} from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';
import CustomHeader from './components/HomeHeader';
import { COLORS, FONTFAMILY, FONTSIZE } from './theme/themes';
import { Divider} from '@rneui/themed';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {DisplayFunc} from './context/DisplayFunc';
import { useRoute } from '@react-navigation/native';
import withAuth from './withAuth';
import { TicketFunc } from './tickets/TicketFunc';

const HomeScreen = ({ navigation }) => {
  const {isLoading,displayDoc,displayTrigger} = useContext(DisplayFunc);
  const {getOpenTicketInfo} = useContext(TicketFunc);
  const route = useRoute();
  const dashboardData = route.params?.dashboardData || [];
  const dateFrom = route.params?.dateFrom || '';
  const dateTo = route.params?.dateTo || '';
  const location = route.params?.location || '';
  const user_group = route.params?.user_group || '';
  const ishq = route.params?.ishq || '';
  const typePo = dashboardData[0].type;
  const typeGRN = dashboardData[1].type;
  const typeGRDA = dashboardData[2].type;
  const typePRDNCN = dashboardData[3].type;
  const typePDNCN = dashboardData[4].type;
  const typePCI = dashboardData[5].type;
  const typeDI = dashboardData[6].type;
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

  const groupeddashboardData = dashboardData.reduce((type, item) => {
    const key = item.type;
    if (!type[key]) {
      type[key] = [];
    }
    type[key].push(item);
    return type;
  }, {});

  return (
    <View style={styles.container}>
    <Spinner visible={isLoading} />
      <CustomHeader />
      <ScrollView style={styles.scroll}>
      <View>
        {/* Your HomeScreen content */}
        <Text style={styles.content}>Date View from <Text style={{fontWeight:'bold'}}> {dateFrom} </Text> to <Text style={{fontWeight:'bold'}}> {dateTo} </Text></Text>
        <Divider width={2} />

        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
        {( dashboardData !== undefined || dashboardData !== null) && (
        <>
          <TouchableOpacity
            style={[styles.button,{ backgroundColor: COLORS.LightBlue }]}
            onPress={() =>
                      {
                        displayDoc(location,ishq,typePo,status,refno,period_code,date_from,date_to,exp_from,exp_to,doc_type,limit,offset,filter_supplier);
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
                <Text style={styles.buttonTextAmt}>{groupeddashboardData.PO[0].count_doc}</Text>
                <Text style={styles.buttonText}>Purchase Order</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button,{ backgroundColor: COLORS.Green }]}
            onPress={() => { displayDoc(location,ishq,typeGRN,status,refno,period_code,date_from,date_to,exp_from,exp_to,doc_type,limit,offset,filter_supplier); }}
          >
            <View style={styles.buttonContent}>
              <Icon
                name="checkbox" // Replace with the actual icon name
                size={120} // Adjust the size of the icon as needed
                color={COLORS.TransGrey}
                style={styles.icon}
              />
              <View style={styles.NumWord}>
                <Text style={styles.buttonTextAmt}>{groupeddashboardData.GRN[0].count_doc}</Text>
                <Text style={styles.buttonText}>Goods Received Note</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button,{ backgroundColor: COLORS.Orange }]}
            onPress={() => {displayDoc(location,ishq,typeGRDA,status,refno,period_code,date_from,date_to,exp_from,exp_to,doc_type,limit,offset,filter_supplier);}}
          >
            <View style={styles.buttonContent}>
              <Icon
                name="close-circle" // Replace with the actual icon name
                size={120} // Adjust the size of the icon as needed
                color={COLORS.TransGrey}
                style={styles.icon}
              />
              <View style={styles.NumWord}>
                <Text style={styles.buttonTextAmt}>{groupeddashboardData.GRDA[0].count_doc}</Text>
                <Text style={styles.buttonText}>GR Difference Advice</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button,{ backgroundColor: COLORS.Red }]}
            onPress={() => {displayDoc(location,ishq,typePRDNCN,status,refno,period_code,date_from,date_to,exp_from,exp_to,doc_type,limit,offset,filter_supplier); }}
          >
            <View style={styles.buttonContent}>
              <Icons
                name="assignment-return" // Replace with the actual icon name
                size={120} // Adjust the size of the icon as needed
                color={COLORS.TransGrey}
                style={styles.icon}
              />
              <View style={styles.NumWord}>
                <Text style={styles.buttonTextAmt}>{groupeddashboardData.PRDNCN[0].count_doc}</Text>
                <Text style={styles.buttonText}>Purchase Return DN/CN</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button,{ backgroundColor: COLORS.DarkBlue}]}
            onPress={() => {displayDoc(location,ishq,typePDNCN,status,refno,period_code,date_from,date_to,exp_from,exp_to,doc_type,limit,offset,filter_supplier); }}
          >
            <View style={styles.buttonContent}>
              <Icons
                name="assignment-returned" // Replace with the actual icon name
                size={120} // Adjust the size of the icon as needed
                color={COLORS.TransGrey}
                style={styles.icon}
              />
              <View style={styles.NumWord}>
                <Text style={styles.buttonTextAmt}>{groupeddashboardData.PDNCN[0].count_doc}</Text>
                <Text style={styles.buttonText}>Purchase DN/CN</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button,{ backgroundColor: COLORS.DarkGreen }]}
            onPress={() => { displayDoc(location,ishq,typePCI,status,refno,period_code,date_from,date_to,exp_from,exp_to,doc_type,limit,offset,filter_supplier); }}
          >
            <View style={styles.buttonContent}>
              <Icons
                name="assignment" // Replace with the actual icon name
                size={120} // Adjust the size of the icon as needed
                color={COLORS.TransGrey}
                style={styles.icon}
              />
              <View style={styles.NumWord}>
                <Text style={styles.buttonTextAmt}>{groupeddashboardData.PCI[0].count_doc}</Text>
                <Text style={styles.buttonText}>Promotion Claim Tax Invoice</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button,{ backgroundColor: COLORS.Brown }]}
            onPress={() => { displayDoc(location,ishq,typeDI,status,refno,period_code,date_from,date_to,exp_from,exp_to,doc_type,limit,offset,filter_supplier); }}
          >
            <View style={styles.buttonContent}>
              <Icons
                name="assignment" // Replace with the actual icon name
                size={120} // Adjust the size of the icon as needed
                color={COLORS.TransGrey}
                style={styles.icon}
              />
              <View style={styles.NumWord}>
                <Text style={styles.buttonTextAmt}>{groupeddashboardData.DI[0].count_doc}</Text>
                <Text style={styles.buttonText}>Display Incentive Tax Invoice</Text>
              </View>
            </View>
          </TouchableOpacity>
          </>
          )}

        {( user_group === '3379ECDBDB0711E7B504A81E8453CCF0') && (
          <TouchableOpacity
            style={[styles.button,{ backgroundColor: COLORS.Purple }]}
            onPress={() => { displayTrigger();}}//module_group=super_admin 
          >
            <View style={styles.buttonContent}>
              <Icons
                name="assignment" // Replace with the actual icon name
                size={120} // Adjust the size of the icon as needed
                color={COLORS.TransGrey}
                style={styles.icon}
              />
              <View style={styles.NumWord}>
                <Text style={styles.buttonTextAmt}>  </Text>
                <Text style={styles.buttonText}>Trigger</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        </View>
      </View>
      </ScrollView>
      
      <TouchableOpacity onPress={() => { getOpenTicketInfo(); }}>
        <View style={{backgroundColor:COLORS.LightBlue,
              width:70,position:'absolute',right:20,bottom:20,
              borderRadius:100,borderWidth:1,borderColor:COLORS.LightBlue,
              padding:20,}}>
        <Icon name="pencil" size={28} color={COLORS.White}/>
        </View>
      </TouchableOpacity>
      
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

export default withAuth(HomeScreen);
