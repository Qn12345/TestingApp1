import React, { useState, useContext } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text,ScrollView } from 'react-native';
import PublicHeader from '../components/PublicHeader';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/themes';
import {BasicFunc} from '../context/BasicFunc';
import Spinner from 'react-native-loading-spinner-overlay';

const UpdateUserScreen = ({ route, navigation }) => {
  const userData = route.params?.userData || {};
  const {isLoading,update} = useContext(BasicFunc);
  
  // Initialize state to store edited user data
  const [editedUserData, setEditedUserData] = useState({
    user_id: userData.user_id,
    user_name: userData.user_name,
    user_guid: userData.user_guid,
    // Add more fields as needed
  });

  return (
    <View style={styles.container}>
    <Spinner visible={isLoading} />
      <PublicHeader navigation={navigation} />
      <ScrollView style={styles.scroll}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={editedUserData.user_id}
          editable={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={editedUserData.user_name}
          onChangeText={(text) => setEditedUserData({ ...editedUserData, user_name: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>User Guid:</Text>
        <TextInput
          style={styles.input}
          value={editedUserData.user_guid}
          onChangeText={(text) => setEditedUserData({ ...editedUserData, user_guid: text })}
        />
      </View>

      {/* Buttons for Cancel and Update */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.updateButton} 
          onPress={() => {
                update(editedUserData.user_id,editedUserData.user_name,editedUserData.user_guid);
              }}>
          <Text style={styles.buttonText}>Update</Text>
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
  inputContainer: {
    marginBottom: 16,
    padding:10,
  },
  label: {
    fontSize: FONTSIZE.size_16,
    fontWeight: 'bold',
    marginBottom: 5,
    color:COLORS.Black,
  },
  input: {
    fontSize: FONTSIZE.size_14,
    borderWidth: 1,
    borderColor: COLORS.Black,
    borderRadius: 8,
    padding: 8,
    color: COLORS.Black,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:30,
  },
  cancelButton: {
    backgroundColor: COLORS.Red,
    padding: 15,
    borderRadius: 8,
  },
  updateButton: {
    backgroundColor: COLORS.Green,
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.White,
    fontWeight: 'bold',
  },
});

export default UpdateUserScreen;
