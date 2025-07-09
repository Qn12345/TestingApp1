// HomeHeader.js
import React, { useState,useContext,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation,useFocusEffect  } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Sidebar from './DrawerNavigator'; // Import your Sidebar component
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/themes';
import { Overlay } from '@rneui/themed'; // Import Overlay
import {AuthContext} from '../context/AuthContext';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const UserName = route.params?.UserName || '';
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      setIsSidebarVisible(false);
    }, [])
  );

  return (
    <SafeAreaView style={styles.header}>
      <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
        <Icon name="menu" size={23} color="white" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Hello, {UserName}</Text>
      </View>

      {/* Sidebar Modal */}
      <Overlay
        isVisible={isSidebarVisible}
        onBackdropPress={closeSidebar}
        overlayStyle={styles.overlay}
      >
        <Sidebar onClose={closeSidebar} />
      </Overlay>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    backgroundColor: COLORS.Blue,
  },
  menuButton: {
    paddingRight: 10,
  },
  titleContainer: {
    flex: 0.92,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_18,
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    alignSelf: 'flex-start',
  },
});

export default CustomHeader;
