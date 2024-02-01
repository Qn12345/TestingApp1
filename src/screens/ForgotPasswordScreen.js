// Import necessary components and libraries
import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image,TouchableOpacity,TextInput, Alert } from 'react-native';
import { Divider } from '@rneui/themed';
import Spinner from 'react-native-loading-spinner-overlay';
import { COLORS, FONTSIZE } from './theme/themes';
import PublicHeader from './components/PublicHeader';
import { BasicFunc } from './context/BasicFunc';
import { AuthContext } from './context/AuthContext';
import CustomAlert from './components/CustomAlert';

const ForgotPasswordScreen = ({ navigation }) => {
  const { isLoading } = useContext(BasicFunc);
  const { forgotPassword } = useContext(AuthContext);
  const [isCurrentFocused, setIsCurrentFocused] = useState(false);
  const [Email, setEmail] = useState('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const showAlertBox = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <PublicHeader title={'Change Password'} />
      <ScrollView style={styles.scroll}>
        <View style={styles.ContentContainer}>
          <Image source={require("./assets/TMG_LOGO.jpg")} style={styles.logo} />
          <Text style={styles.appName}>TMG B2B Portal</Text>
        </View>
        <Divider width={1} color='grey' style={{ margin: 10 }} />
        <Text style={styles.TitleC}>Forgot Password?</Text>
        <View style={styles.ContainerBottom}>
          <Text style={styles.label}>Please type in your email address.</Text>
          <Text style={styles.label}>Well send you a link to reset the password.</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: isCurrentFocused ? COLORS.LightGrey : COLORS.LightBlue },
            ]}
            value={Email}
            onChangeText={(text) => setEmail(text)}
            onFocus={() => setIsCurrentFocused(true)}
            onBlur={() => setIsCurrentFocused(false)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.ChangeButton,
            ]}
            onPress={() => {
              if (!Email.trim()) {
                showAlertBox('Please fill in your Email ! ');
                return;
              }
              else if (!emailRegex.test(Email)){
                showAlertBox('Please fill in a correct Email ! ');
                return;
              }

              forgotPassword(Email);
            }}
          >
            <Text style={styles.buttonText}>Send Email</Text>
          </TouchableOpacity>
          <CustomAlert
            visible={showAlert}
            message={alertMessage}
            onClose={() => setShowAlert(false)}
            icon="warning"
            Ccolor="red"
          />
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
  ContentContainer:{
    alignItems:'center',
    justifyContent:'center',
    marginTop:50,
  },
  buttonContainer:{
    alignItems:'center',
    justifyContent:'center',
    marginTop:30,
  },
  logo: {
    width: 200,
    height: 130,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 25,
    marginTop: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  TitleC: {
    color:COLORS.Black,
    fontWeight:'bold',
    fontSize:FONTSIZE.size_20,
    paddingLeft:10,
  },
  ContainerBottom:{
    paddingHorizontal:10,
  },
  label:{
    color:COLORS.Black,
    fontSize:FONTSIZE.size_16,
    padding:3,
  },
  input:{
    borderColor:COLORS.LightGrey,
    borderWidth:1.5,
    borderRadius:10,
    padding:10,
    marginVertical:5,
  },
  ChangeButton:{
    backgroundColor:COLORS.LightBlue,
    width:'94%',
    height:50,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    borderRadius:10,
  },
  buttonText:{
    color:COLORS.White,
    fontWeight:'bold',
    fontSize:FONTSIZE.size_18,
  },
});

export default ForgotPasswordScreen;
