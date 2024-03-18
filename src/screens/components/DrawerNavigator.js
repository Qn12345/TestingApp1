// Sidebar.js
import React, {useContext,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView,Alert } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import IconFoundation from 'react-native-vector-icons/Foundation';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/themes';
import { Divider,ListItem} from '@rneui/themed';
import {AuthContext} from '../context/AuthContext';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GeneralFunc } from '../context/GeneralFunc';

const Sidebar = ({ onClose }) => {
  const {getOutletD, logout} = useContext(AuthContext);
  const [expanded, setExpanded] = React.useState(null);
  const [expandedPolicy, setExpandedPolicy] = React.useState(null);
  const route = useRoute();
  const location = route.params?.location || '';
  const navigation = useNavigation();
  const [superAdmin, setSuperAdmin] = React.useState(null);
  const {b2b_reminder,rdash} = useContext(GeneralFunc);

  const handleChangePassword = () => {
    // Handle change password click
  };

  useEffect(() => {
    const getSuperAdmin = async () => {
      const result  = await AsyncStorage.getItem('super_admin');
      setSuperAdmin(result);
      return result;
    };

    getSuperAdmin();
  }, []);

  return (
    <View style={styles.container}>
    <ScrollView style={styles.scroll}>
        <View style={styles.containerUp}>
          <Icons name="user-circle" size={60} color='grey'/>
        </View>
      <Divider width={2} />
      <View style={styles.containerDown}>
        <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('ChangePasswordScreen'); }}>
          <IconFoundation name="key" size={20} color='grey' />
          <Text style={styles.itemText}>Change Password</Text>
        </TouchableOpacity>
{/*
        <TouchableOpacity style={styles.item} onPress={handleChangePassword}>
          <IconIonicons name="notifications-outline" size={20} color='grey' />
          <Text style={styles.itemText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={handleChangePassword}>
          <IconMaterialIcons name="announcement" size={20} color='grey' />
          <Text style={styles.itemText}>Announcement</Text>
        </TouchableOpacity>
*/}
        <TouchableOpacity style={styles.item} disabled onPress={handleChangePassword}>
          <IconIonicons name="location-sharp" size={20} color='grey' />
          <Text style={styles.itemText}>Tunas Manja Group</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => { getOutletD();}}>
          <IconMaterialIcons name="account-balance" size={20} color='grey' />
          <Text style={styles.itemText}>{location}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('ContactScreen'); }}>
          <Icons name="phone" size={20}color='grey' />
          <Text style={styles.itemText}>Contact Us</Text>
        </TouchableOpacity>

        {( superAdmin  === '3379ECDBDB0711E7B504A81E8453CCF0') && (
        <ListItem.Accordion
          content={
            <View style={styles.itemList}>
              <Icons name="user" size={20} color='grey' />
              <Text style={styles.itemText}>Admin Setup</Text>
            </View>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
        {/*
          <ListItem>
            <ListItem.Content>
              <View style={styles.itemList}>
                <Icons name="user" size={20} color='grey' />
                <Text style={styles.itemText}>Dashboard</Text>
              </View>
            </ListItem.Content>
          </ListItem>
          <ListItem>
            <ListItem.Content>
              <View style={styles.itemList}>
                <Icons name="user" size={20} color='grey' />
                <Text style={styles.itemText}>Module Setup</Text>
              </View>
            </ListItem.Content>
          </ListItem>
          <ListItem>
            <ListItem.Content>
              <View style={styles.itemList}>
                <Icons name="user" size={20} color='grey' />
                <Text style={styles.itemText}>Supplier Setup</Text>
              </View>
            </ListItem.Content>
          </ListItem>
          <ListItem>
            <ListItem.Content>
              <View style={styles.itemList}>
                <Icons name="user" size={20} color='grey' />
                <Text style={styles.itemText}>Troubleshoot Document</Text>
              </View>
            </ListItem.Content>
          </ListItem>
          */}
          <ListItem onPress={() => {
            b2b_reminder();
          }}>
            <ListItem.Content>
              <View style={styles.itemList}>
                <Icons name="wrench" size={20} color='grey' />
                <Text style={styles.itemText}>B2B Reminder</Text>
              </View>
            </ListItem.Content>
          </ListItem>
          <ListItem onPress={() => {
            rdash();
          }}>
            <ListItem.Content>
              <View style={styles.itemList}>
                <Icons name="bar-chart" size={20} color='grey' />
                <Text style={styles.itemText}>Registration Dashboard</Text>
              </View>
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
    )}
        <TouchableOpacity style={styles.item}  onPress={() => {
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
         >
          <Icons name="power-off" size={20} color='grey' />
          <Text style={styles.itemText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
      <Text style={{color:'grey'}}>Version 1.1.4</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250,
    backgroundColor: COLORS.White,
    paddingTop: 20,
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  containerUp: {
    width: 240,
    height: 130, //18
    backgroundColor: COLORS.White,
    alignItems: 'center',
    paddingTop:30,
  },
  containerDown: {
    height: '100%',
    paddingTop:20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingLeft:5,
  },
  itemList: {
    flexDirection: 'row',
    alignItems: 'center',
    left:-9,
  },
  itemText: {
    marginLeft: 10,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.Black,
  },
  closeButton: {
    paddingBottom:40,
    width:50,
  },
  closeButtonText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.Blue,
    textAlign: 'center',
  },
});

export default Sidebar;
