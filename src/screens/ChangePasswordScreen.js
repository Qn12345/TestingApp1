// Import necessary components and libraries
import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image,TouchableOpacity,TextInput, Alert } from 'react-native';
import { Divider } from '@rneui/themed';
import Spinner from 'react-native-loading-spinner-overlay';
import { COLORS, FONTSIZE } from './theme/themes';
import PublicHeader from './components/PublicHeader';
import { BasicFunc } from './context/BasicFunc';
import { GeneralFunc } from './context/GeneralFunc';
import withAuth from './withAuth';
import Icon from 'react-native-vector-icons/Ionicons';

const ChangePasswordScreen = ({ navigation }) => {
  const { isLoading } = useContext(BasicFunc);
  const { change_password } = useContext(GeneralFunc);
  const [isCurrentFocused, setIsCurrentFocused] = useState(false);
  const [isNewFocused, setIsNewFocused] = useState(false);
  const [isConfirmFocused, setIsConfirmFocused] = useState(false);
  const [CurrentPassword, setCurrentPassword] = useState('');
  const [NewPassword, setNewPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
        <Text style={styles.TitleC}>Change Password</Text>
        <View style={styles.ContainerBottom}>
          <Text style={styles.label}>Current Password</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: isCurrentFocused ? COLORS.LightGrey : COLORS.LightBlue },
            ]}
            value={CurrentPassword}
            onChangeText={(text) => setCurrentPassword(text)}
            onFocus={() => setIsCurrentFocused(true)}
            onBlur={() => setIsCurrentFocused(false)}
            secureTextEntry={!showPassword}
          />
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: isNewFocused ? COLORS.LightGrey : COLORS.LightBlue },
            ]}
            value={NewPassword}
            onChangeText={(text) => setNewPassword(text)}
            onFocus={() => setIsNewFocused(true)}
            onBlur={() => setIsNewFocused(false)}
            secureTextEntry={!showPassword}
          />
          <Text style={styles.label}>Retype New Password</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: isConfirmFocused ? COLORS.LightGrey : COLORS.LightBlue },
            ]}
            value={ConfirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            onFocus={() => setIsConfirmFocused(true)}
            onBlur={() => setIsConfirmFocused(false)}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ padding:10,alignSelf:'flex-end'}}>
            <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.ChangeButton,
            ]}
            onPress={() => {
              if (!CurrentPassword.trim() || !NewPassword.trim() || !ConfirmPassword.trim()) {
                Alert.alert("Please fill in All Details!")
                return;
              }
              change_password(CurrentPassword,NewPassword,ConfirmPassword);
            }}
          >
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
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
    color:COLORS.Black,
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

export default withAuth(ChangePasswordScreen);
