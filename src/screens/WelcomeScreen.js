import React, { useEffect, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONTSIZE } from './theme/themes';
import { AuthContext } from './context/AuthContext';
import LogoutHeader from './components/LogoutHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import withAuth from './withAuth';
import { useFocusEffect, useRoute } from '@react-navigation/native'; // Import useFocusEffect
import HTML from 'react-native-render-html';
import { Overlay } from '@rneui/themed';

const WelcomeScreen = ({ navigation }) => {
  const { getOutlet } = useContext(AuthContext);
  const route = useRoute();
  const OutletData = route.params?.OutletData || [];
  const OverDue = route.params?.overdue || '';
  const force_logout = route.params?.force_logout || '';
  const source = { html: OverDue };
  const [visible, setVisible] = useState(true);
  const htmlStyles = {
    body: { color: COLORS.Black },
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  // Use useFocusEffect to trigger the overlay visibility when returning to the screen
  useFocusEffect(
    React.useCallback(() => {
      // Set visible to true when returning to the screen
      setVisible(true);
      return () => {
        // Clean up function to hide the overlay when leaving the screen
        setVisible(false);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <LogoutHeader title={''} />
      <View style={{ height: '80%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: COLORS.Grey }}> Welcome Back</Text>
        {(OverDue.includes('Blocked')) && (
          <View style={styles.ModelView}>
            <Overlay style={styles.overlay} isVisible={visible}>
              <View style={styles.ModalContainer}>
              <ScrollView style={{marginBottom:-34}}>
              <View style={{alignItems:'center'}}>
                  <Icon name="warning" size={50} color="red"/>
                </View>
                <HTML
                  contentWidth={1}
                  source={source}
                  tagsStyles={htmlStyles}
                />
                <View style={{paddingBottom:10}}><Text> </Text></View>
                </ScrollView>
              </View>
            </Overlay>
          </View>
        )}

        {(OverDue.includes('Warning')) && (
          <View style={styles.ModelView}>
            <Overlay style={styles.overlay} isVisible={visible}>
              <View style={styles.ModalContainer}>
              <ScrollView style={{marginBottom:-34}}>
                <View style={{alignItems:'center'}}>
                  <Icon name="notifications" size={50} color="#31e04f"/>
                </View>
                <HTML
                  contentWidth={1}
                  source={source}
                  tagsStyles={htmlStyles}
                />
                <View style={styles.okButtonContainer}>
                  <TouchableOpacity style={styles.okButton} onPress={toggleOverlay}>
                    <Text style={styles.buttonTextA}>OK</Text>
                  </TouchableOpacity>
                </View>
                </ScrollView>
              </View>
            </Overlay>
          </View>
        )}

        {(OverDue.includes('Gentle Reminder')) && (
          <View style={styles.ModelView}>
            <Overlay style={styles.overlay} isVisible={visible}>
              <View style={styles.ModalContainer}>
              <ScrollView style={{marginBottom:-34}}>
                <View style={{alignItems:'center'}}>
                  <Icon name="notifications" size={50} color="#31e04f"/>
                </View>
                <HTML
                  contentWidth={1}
                  source={source}
                  tagsStyles={htmlStyles}
                />
                <View style={styles.okButtonContainer}>
                  <TouchableOpacity style={styles.okButton} onPress={toggleOverlay}>
                    <Text style={styles.buttonTextA}>OK</Text>
                  </TouchableOpacity>
                </View>
                </ScrollView>
              </View>
            </Overlay>
          </View>
        )}

        {(OverDue.includes('Payment Date Extensions')) && (
          <View style={styles.ModelView}>
            <Overlay style={styles.overlay} isVisible={visible}>
              <View style={styles.ModalContainer}>
              <ScrollView style={{marginBottom:-34}}>
                <View style={{alignItems:'center'}}>
                  <Icon name="notifications" size={50} color="#31e04f"/>
                </View>
                <HTML
                  contentWidth={1}
                  source={source}
                  tagsStyles={htmlStyles}
                />
                <View style={styles.okButtonContainer}>
                  <TouchableOpacity style={styles.okButton} onPress={toggleOverlay}>
                    <Text style={styles.buttonTextA}>OK</Text>
                  </TouchableOpacity>
                </View>
                </ScrollView>
              </View>
            </Overlay>
          </View>
        )}
      </View>

      {(force_logout === '0') && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.NextButton]}
            onPress={() => {
              // Handle button click logic here
              navigation.navigate('OutletSelectionScreen', { OutletData });
            }}
          >
            <Icon name="arrow-forward" size={25} color="white" style={{ marginRight: 5 }} />
            <Text style={styles.buttonTextA}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  NextButton: {
    backgroundColor: COLORS.LightBlue,
    width: '94%',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonTextA: {
    color: COLORS.White,
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_20,
  },
  ModelView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalContainer: {
    width: '85%',
    height:'90%',
  },
  overlay: {
    flex: 1,
  },
  okButton:{
    backgroundColor:COLORS.Green,
    paddingVertical:5,
    paddingBottom:10,
    paddingHorizontal:40,
    borderRadius:5,
  },
  okButtonContainer:{
    alignItems:'center',
    justifyContent: 'center',
  },
});

export default withAuth(WelcomeScreen);
