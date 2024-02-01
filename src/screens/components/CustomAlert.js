import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTSIZE } from '../theme/themes';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomAlert = ({visible, message, onClose,icon,Ccolor  }) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={() => onClose()}
    >
      <View style={styles.alertContainer}>
        <View style={styles.alertBox}>
          <Text style={styles.alertMessage}>{message}</Text>
          <Icon name={icon} size={100} color={Ccolor} />
          <TouchableOpacity onPress={() => onClose()} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  alertContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    backgroundColor: COLORS.White,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    justifyContent:'center',
    alignItems:'center',
  },
  alertMessage: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.Black,
    fontWeight:'bold',
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: COLORS.LightBlue,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    width:'30%',
  },
  closeButtonText: {
    color: COLORS.White,
    fontWeight: 'bold',
  },
});
