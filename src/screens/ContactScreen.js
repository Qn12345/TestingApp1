// Import necessary components and libraries
import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView, Text,TouchableOpacity,Linking } from 'react-native';
import { Divider } from '@rneui/themed';
import Spinner from 'react-native-loading-spinner-overlay';
import { COLORS, FONTSIZE } from './theme/themes';
import PublicHeader from './components/PublicHeader';
import { BasicFunc } from './context/BasicFunc';
import { ContactFunc } from './context/ContactFunc';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { makeMutable } from 'react-native-reanimated';
import withAuth from './withAuth';

const ContactScreen = ({ navigation }) => {
  const { isLoading } = useContext(BasicFunc);
  const { makePhoneCall,makeWhatsapp,makeEmail } = useContext(ContactFunc);



  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <PublicHeader title={'Contact Us'} />
      <ScrollView style={styles.scroll}>
      <View style={styles.informationContainer}>
        <View style={styles.ContentContainer}>
          <Icon name="information-circle-outline" size={30}color='black' />
          <Text style={styles.infoword}>Information</Text>
        </View>
        <Divider width={1.5} color={COLORS.LightGrey} style={{marginVertical:10 }} />

        <View style={styles.Content1}>
          <Text style={styles.Title}>Office Hour Support(excluding Public Hodiday)</Text>
          <View style={styles.infomation}>
            <AntDesign name="clockcircleo" size={20}color='black' />
            <Text style={styles.details}>Monday to Friday 9:00am to 6:00pm</Text>
          </View>
        </View>

        <View style={styles.Content1}>
          <Text style={styles.Title}>Office</Text>
          <View style={styles.infomation}>
            <AntDesign name="phone" size={20}color='black' />
            <Text style={styles.details2}>Call: </Text>
            <View style={styles.infomationBlue}>
              <TouchableOpacity onPress={() => makePhoneCall('+062336260')}>
                <Text style={styles.bluedetails}>+062336260</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.Content1}>
          <Text style={styles.Title}>Registration</Text>
          <View style={styles.infomation}>
            <AntDesign name="phone" size={20}color='black' />
            <Text style={styles.details2}>Call: </Text>
            <View style={styles.infomationBlue}>
              <TouchableOpacity onPress={() => makePhoneCall('+062336221')}>
                <Text style={styles.bluedetails}>+062336221</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.infomation}>
            <AntDesign name="phone" size={20}color='black' />
            <Text style={styles.details2}>Call: </Text>
            <View style={styles.infomationBlue}>
              <TouchableOpacity onPress={() => makePhoneCall('+60177159340')}>
                <Text style={styles.bluedetails}>+60177159340</Text>
              </TouchableOpacity>
              <Text style={styles.details2}>/</Text>
              <TouchableOpacity onPress={() => makePhoneCall('+60172153088')}>
                <Text style={styles.bluedetails}>+60172153088</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.infomation}>
            <Icon name="logo-whatsapp" size={20}color='black' />
            <Text style={styles.details2}>Whatsapp:</Text>
            <View style={styles.infomationBlue}>
              <TouchableOpacity onPress={() => makeWhatsapp('+60177159340')}>
                <Text style={styles.bluedetails}>+60177159340</Text>
              </TouchableOpacity>
              <Text style={styles.details2}>/</Text>
              <TouchableOpacity onPress={() => makeWhatsapp('+60172153088')}>
                <Text style={styles.bluedetails}>+60172153088</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.infomation}>
            <AntDesign name="mail" size={20}color='black' />
            <Text style={styles.details2}>Email: </Text>
            <View style={styles.infomationBlue}>
              <TouchableOpacity onPress={() => makeEmail('register@xbridge.my')}>
                <Text style={styles.bluedetails}>register@xbridge.my</Text>
              </TouchableOpacity>
          </View>
          </View>
        </View>

        <View style={styles.Content1}>
          <Text style={styles.Title}>Helpdesk</Text>
          <View style={styles.infomation}>
            <AntDesign name="phone" size={20}color='black' />
            <Text style={styles.details2}>Call: </Text>
            <View style={styles.infomationBlue}>
              <TouchableOpacity onPress={() => makePhoneCall('+062336211')}>
                <Text style={styles.bluedetails}>+062336211</Text>
              </TouchableOpacity>
              <Text style={styles.details2}>/</Text>
              <TouchableOpacity onPress={() => makePhoneCall('+062336212')}>
                <Text style={styles.bluedetails}>+062336212</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.infomation}>
            <AntDesign name="phone" size={20}color='black' />
            <Text style={styles.details2}>Call: </Text>
            <View style={styles.infomationBlue}>
              <TouchableOpacity onPress={() => makePhoneCall('+60177451185')}>
                <Text style={styles.bluedetails}>+60177451185</Text>
              </TouchableOpacity>
              <Text style={styles.details2}>/</Text>
              <TouchableOpacity onPress={() => makePhoneCall('+60122395988')}>
                <Text style={styles.bluedetails}>+60122395988</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.infomation}>
            <Icon name="logo-whatsapp" size={20}color='black' />
            <Text style={styles.details2}>Whatsapp:</Text>
            <View style={styles.infomationBlue}>
              <TouchableOpacity onPress={() => makeWhatsapp('+60177451185')}>
                <Text style={styles.bluedetails}>+60177451185</Text>
              </TouchableOpacity>
              <Text style={styles.details2}>/</Text>
              <TouchableOpacity onPress={() => makeWhatsapp('+60122395988')}>
                <Text style={styles.bluedetails}>+60122395988</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.infomation}>
            <AntDesign name="mail" size={20}color='black' />
            <Text style={styles.details2}>Email: </Text>
            <View style={styles.infomationBlue}>
              <TouchableOpacity onPress={() => makeEmail('support@xbridge.my')}>
                <Text style={styles.bluedetails}>support@xbridge.my</Text>
              </TouchableOpacity>
          </View>
          </View>
        </View>

        <View style={styles.Content1}>
          <Text style={styles.Title}>Billing & Payment</Text>
          <View style={styles.infomation}>
            <AntDesign name="phone" size={20}color='black' />
            <Text style={styles.details2}>Call: </Text>
            <View style={styles.infomationBlue}>
              <TouchableOpacity onPress={() => makePhoneCall('+062336231')}>
                <Text style={styles.bluedetails}>+062336231</Text>
              </TouchableOpacity>
              <Text style={styles.details2}>/</Text>
              <TouchableOpacity onPress={() => makePhoneCall('+062336233')}>
                <Text style={styles.bluedetails}>+062336233</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.infomation}>
            <AntDesign name="phone" size={20}color='black' />
            <Text style={styles.details2}>Call: </Text>
            <View style={styles.infomationBlue}>
              <TouchableOpacity onPress={() => makePhoneCall('+60177043288')}>
                <Text style={styles.bluedetails}>+60177043288</Text>
              </TouchableOpacity>
              <Text style={styles.details2}>/</Text>
              <TouchableOpacity onPress={() => makePhoneCall('+60176695988')}>
                <Text style={styles.bluedetails}>+60176695988</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.infomation}>
            <Icon name="logo-whatsapp" size={20}color='black' />
            <Text style={styles.details2}>Whatsapp:</Text>
            <View style={styles.infomationBlue}>
              <TouchableOpacity onPress={() => makeWhatsapp('+60177043288')}>
                <Text style={styles.bluedetails}>+60177043288</Text>
              </TouchableOpacity>
              <Text style={styles.details2}>/</Text>
              <TouchableOpacity onPress={() => makeWhatsapp('+60176695988')}>
                <Text style={styles.bluedetails}>+60176695988</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.infomation}>
            <AntDesign name="mail" size={20}color='black' />
            <Text style={styles.details2}>Email: </Text>
            <View style={styles.infomationBlue}>
              <TouchableOpacity onPress={() => makeEmail('billing@xbridge.my')}>
                <Text style={styles.bluedetails}>billing@xbridge.my</Text>
              </TouchableOpacity>
          </View>
          </View>
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
  informationContainer:{
    borderWidth:1,
    borderColor:COLORS.WhiteRGBA15,
    margin:10,
    padding:10,
    elevation: 2,
    shadowColor: COLORS.Black,
    paddingVertical:15,
  },
  ContentContainer:{
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
  },
  infoword: {
    fontSize:22,
    color: 'black',
    fontWeight: 'bold',
  },
  Title: {
    color:COLORS.Black,
    fontWeight:'bold',
    fontSize:FONTSIZE.size_14,
  },
  Content1: {
    paddingVertical:8,
  },
  infomation:{
    flexDirection:'row',
    alignItems:'center',
    paddingVertical:5,
  },
  infomationBlue:{
    flexDirection:'row',
    paddingVertical:5,
    position:'absolute',
    left:95,
  },
  details:{
    color:COLORS.Black,
    paddingLeft:8,
  },
  details2:{
    color:COLORS.Black,
    paddingLeft:8,
    paddingVertical:10,
  },
  bluedetails:{
    color:COLORS.Blue,
    paddingLeft:8,
    paddingVertical:10,
    fontWeight:'bold',
    fontSize:FONTSIZE.size_14,
  },
});

export default withAuth(ContactScreen);
