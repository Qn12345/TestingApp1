import React, {useContext,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet,BackHandler,Alert  } from 'react-native';
import { useNavigation,useIsFocused  } from '@react-navigation/native'; // Import the useNavigation hook
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/themes';
import {AuthContext} from '../context/AuthContext';


const LogoutHeader = ({title}) => {
  const navigation = useNavigation(); // Initialize the navigation object
  const {logout} = useContext(AuthContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isFocused) {

         Alert.alert(
            'Logout',
            'Are you sure you want to log out?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Logout',
                onPress: async () => {
                    logout();
                },
              },
            ],
            { cancelable: false } // To prevent closing the dialog by tapping outside of it
          );
        // Handle other actions or navigate to a specific screen if needed
        return true; // Prevent default behavior (closing the app)
      }
      return false; // Allow default behavior (navigate back)
    });

    // Cleanup the event listener when the component unmounts
    return () => backHandler.remove();
  }, [isFocused,logout]);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => {
            Alert.alert(
            'Logout',
            'Are you sure you want to log out?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Logout',
                onPress: async () => {
                    logout();
                },
              },
            ],
            { cancelable: false } // To prevent closing the dialog by tapping outside of it
          );
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

export default LogoutHeader;
