import React, {useContext} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/themes';


const PublicHeader = ({title}) => {
  const navigation = useNavigation(); // Initialize the navigation object

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => {
            navigation.goBack();
            }}
             style={styles.backbutton}>
        <Icon name="arrow-back" size={23} color="white" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
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
  backbutton: {
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

export default PublicHeader;
