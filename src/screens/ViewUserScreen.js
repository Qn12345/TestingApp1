import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ListItem } from '@rneui/themed';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import PublicHeader from '../components/PublicHeader';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/themes';
import { BasicFunc } from '../context/BasicFunc';
import Spinner from 'react-native-loading-spinner-overlay';

const ViewUserScreen = ({ navigation }) => {
  const { isLoading, deleteUser } = useContext(BasicFunc);
  const route = useRoute();
  const userData = route.params?.userData || [];

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <PublicHeader navigation={navigation} />
      <ScrollView style={styles.scroll}>
        {userData.map((userData, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate('UpdateUserScreen', {userData});
            }}
            style={styles.item}
          >
            <ListItem.Content>
              <ListItem.Title style={styles.itemTitle}>User Data:</ListItem.Title>
              <ListItem.Subtitle>Email: {userData.user_id}</ListItem.Subtitle>
              <ListItem.Subtitle>Name: {userData.user_name}</ListItem.Subtitle>
              <ListItem.Subtitle>User Guid: {userData.user_guid}</ListItem.Subtitle>
            </ListItem.Content>

            {/* Delete button */}
            <TouchableOpacity style={styles.deleteButton} onPress={() => {deleteUser(userData.user_id);}}>
              <Icon name="trash" size={20} color={COLORS.Red} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Grey,
  },
  scroll: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.White,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.White,
    margin: 10,
    padding: 10,
  },
  itemTitle: {
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.LightBlue,
    backgroundColor: COLORS.LightBlue,
  },
});

export default ViewUserScreen;
