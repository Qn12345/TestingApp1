import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

export const TicketFunc = createContext();

export const TicketProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  //display count dashboard number
  const getOpenTicketInfo = async () => {
    setIsLoading(true);
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Ticket/get_open_ticket_info', {
        user_guid: await AsyncStorage.getItem('user_guid'),
        customer_guid: '833DF49D303711EE857842010A940003',
      })
      .then(response => {
        //console.log();
        if (response.data.ticket_topic === '') {
          //console.error('Error:', response.data.message);
          Alert.alert('No Data');
          setIsLoading(false);
        } else {
          const ticketTopic = response.data.ticket_topic;
          const ticketSupplier = response.data.ticket_supplier;
          navigation.navigate('OpenTicketScreen', {ticketTopicData:ticketTopic,ticketSupplierData:ticketSupplier});
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };

  const getOpenTicketSubTopic = async (topic_guid) => {
    setIsLoading(true);
    axios
      .post('https://apitmg.xbridge.my/rest_b2b/index.php/tmg_b2b/Ticket/get_subtopic', {
        topic_guid,
      })
      .then(response => {
        //console.log();
        if (response.data.ticket_sub_topic === '') {
          //console.error('Error:', response.data.message);
          Alert.alert('No Data');
          setIsLoading(false);
        } else {
          const SubticketTopic = response.data.ticket_sub_topic;
          navigation.setParams({SubticketTopicData:SubticketTopic});
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log('Error:', e);
        setIsLoading(false);
      });
  };


  return (
    <TicketFunc.Provider
      value={{
        isLoading,
        getOpenTicketInfo,
        getOpenTicketSubTopic,
      }}>
      {children}
    </TicketFunc.Provider>
  );
};

