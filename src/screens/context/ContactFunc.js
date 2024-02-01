import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert  } from 'react-native';
import {Linking} from 'react-native';

export const ContactFunc = createContext();

export const ContactFuncProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading] = useState(false);
  const navigation = useNavigation();

  const makePhoneCall = async (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.error("Phone call not supported");
        }
      })
      .catch((error) => console.error("Error opening phone call:", error));
  };

  const makeWhatsapp = async (phoneNumber) => {
    const url = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Please install WhatsApp.");
        }
      })
      .catch((error) => console.error("Error opening phone call:", error));
  };

  const makeEmail = async (email) => {
    const url = `mailto:${email}`;
    Linking.openURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Please install WhatsApp.");
        }
      })
      .catch((error) => console.error("Error opening phone call:", error));
  };

  return (
    <ContactFunc.Provider
      value={{
        isLoading,
        splashLoading,
        makePhoneCall,
        makeWhatsapp,
        makeEmail,
      }}>
      {children}
    </ContactFunc.Provider>
  );
};

