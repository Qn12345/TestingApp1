import React, {useContext} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/themes';
import {AuthContext} from '../context/AuthContext';


const CustomHeader = () => {
  const navigation = useNavigation(); // Initialize the navigation object
  const {logout} = useContext(AuthContext);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => {
              logout();
             }}
             style={styles.logoutButton}>
        <Icon name="arrow-back" size={23} color="white" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Home</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    backgroundColor: COLORS.Blue, // Set the background color to blue
  },
  logoutButton: {
    paddingRight: 10,
  },
  titleContainer: {
    flex: 0.92,
    alignItems: 'center',
  },
  title: {
    color: 'white', // Set text color to white
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
  },
});

export default CustomHeader;
