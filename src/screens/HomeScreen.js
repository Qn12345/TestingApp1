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
  const {isLoading,displayDoc,displayTrigger,subConsignDashboard,subAccountingDashboard,subBillingDashboard} = useContext(DisplayFunc);
  const {getOpenTicketInfo} = useContext(TicketFunc);
  const route = useRoute();
  const dashboardData = route.params?.dashboardData || [];
  const dateFrom = route.params?.dateFrom || '';
  const dateTo = route.params?.dateTo || '';
  const location = route.params?.location || '';
  const user_group = route.params?.user_group || '';
  const ishq = route.params?.ishq || '';
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
  const getIconName = (type) => {
    switch (type) {
      case 'PO':
        return 'clipboard';
      case 'GRN':
        return 'checkbox';
      case 'GRDA':
        return 'close-circle';
      case 'PRDNCN':
        return 'arrow-back-circle';
      case 'PDNCN':
        return 'arrow-down-circle';
      case 'PCI':
        return 'clipboard';
      case 'DI':
        return 'clipboard';
      default:
        return 'clipboard';
    }
  };

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
          dashboardData.map((acc, index) => (
          <React.Fragment key={index}>
          <TouchableOpacity
            style={[styles.button,{ backgroundColor: `${acc.background_color}` }]}
            onPress={async () =>
                      {
                          displayDoc(location,ishq,acc.type,status,refno,period_code,date_from,date_to,exp_from,exp_to,doc_type,limit,offset,filter_supplier);
                      }
                    }
          >
            <View style={styles.buttonContent}>
              <Icon
                name={getIconName(acc.type)}
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
          ))
          )}

        {( user_group === '3379ECDBDB0711E7B504A81E8453CCF0') && (
          <>
          <TouchableOpacity
            style={[styles.button,{ backgroundColor: COLORS.Blue }]}
            onPress={() => //move to upper part if consignment release
                      {
                        subConsignDashboard(location,ishq,'Consignment');
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
                <Text style={styles.buttonTextAmt}> </Text>
                <Text style={styles.buttonText}>Consignment</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button,{ backgroundColor: COLORS.DarkGreen }]}
            onPress={() => //move to upper part if consignment release
                      {
                        subAccountingDashboard(location,ishq,'Accounting_Documents');
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
                <Text style={styles.buttonTextAmt}> </Text>
                <Text style={styles.buttonText}>Accounting Documents</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button,{ backgroundColor: COLORS.DarkGreen }]}
            onPress={() => //move to upper part if consignment release
                      {
                        subBillingDashboard(location,ishq,'B2B_monthly_billing_invoices');
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
                <Text style={styles.buttonTextAmt}> </Text>
                <Text style={styles.buttonText}>B2B Monthly Billing Invoices</Text>
              </View>
            </View>
          </TouchableOpacity>

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
          </>
          
        )}
        </View>
      </View>
      </ScrollView>
      {/*
      <TouchableOpacity onPress={() => { getOpenTicketInfo(); }}>
        <View style={{backgroundColor:COLORS.LightBlue,
              width:70,position:'absolute',right:20,bottom:20,
              borderRadius:100,borderWidth:1,borderColor:COLORS.LightBlue,
              padding:20,}}>
        <Icon name="pencil" size={28} color={COLORS.White}/>
        </View>
      </TouchableOpacity>
      */}
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
