import React, {useContext} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomHeader from '../components/HomeHeader';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/themes';
import { Divider,Button } from '@rneui/themed';
import {BasicFunc} from '../context/BasicFunc';
import Spinner from 'react-native-loading-spinner-overlay';

const HomeScreen = ({ navigation }) => {
  const {isLoading,viewUser,addUser} = useContext(BasicFunc);

  return (
    <View style={styles.container}>
    <Spinner visible={isLoading} />
      <CustomHeader navigation={navigation} />
      <ScrollView style={styles.scroll}>
      <View>
        {/* Your HomeScreen content */}
        <Text style={styles.content}>Click on the logo to select a customer</Text>
        <Divider width={2} />

        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
          <Button
            title="View"
            titleStyle={styles.buttonText}
            buttonStyle={styles.button}
            onPress={() => {viewUser();}}
          />
          <Button
            title="Add"
            titleStyle={styles.buttonText}
            buttonStyle={styles.button}
            onPress={() => {navigation.navigate('AddUserScreen');}}
          />
          <Button
            title="xxxx"
            titleStyle={styles.buttonText}
            buttonStyle={styles.button}
          />
          
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
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.Black,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow items to wrap to the next line
    justifyContent: 'space-between', // Distribute items evenly with space between
    marginTop: 20,
  },
  button: {
    width: 185, // Set the width to allow for two columns with a small gap
    height: 150,
    backgroundColor: COLORS.Blue,
    borderRadius: 10,
    borderColor:COLORS.DarkBlue,
    borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10, // Adjust the margin as needed
  },
  buttonText: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.poppins_extrabold,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
