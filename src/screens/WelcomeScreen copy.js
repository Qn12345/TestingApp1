import React, { useEffect, useContext,useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet  } from 'react-native';
import { COLORS, FONTSIZE } from './theme/themes';
import { AuthContext } from './context/AuthContext';
import LogoutHeader from './components/LogoutHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import withAuth from './withAuth';
import { useRoute } from '@react-navigation/native';
import HTML from 'react-native-render-html';
import { Overlay } from '@rneui/themed';

const WelcomeScreen = ({ navigation }) => {
  const { getOutlet } = useContext(AuthContext);
  const route = useRoute();
  const OutletData = route.params?.OutletData || [];
  const OverDue = route.params?.overdue || '';
  const force_logout = route.params?.force_logout || '';
  const source = {html: OverDue};
  const [visible, setVisible] = useState(true);
  const htmlStyles = {
    b: {lineHeight: 25 },
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <LogoutHeader title={''} />
      <View style={{ height: '80%', justifyContent: 'center', alignItems: 'center' }}>
        <Text> Welcome Using TMG Apps</Text>
        {( OverDue.includes('BLOCKED!!!')) && (
          <View style={styles.ModelView}>
            <Overlay style={styles.overlay} isVisible={visible}>
              <View style={styles.ModalContainer}>
                <Text style={[styles.modaltitle,{color:COLORS.Red}]}>Account BLOCKED !</Text>
                <HTML
                  contentWidth={1}
                  source={source}
                  tagsStyles={htmlStyles}
                />
              </View>
            </Overlay>
          </View>
        )}

        {( OverDue.includes('LAST REMINDER')) && (
          <View style={styles.ModelView}>
            <Overlay style={styles.overlay} isVisible={visible} onBackdropPress={toggleOverlay}>
              <View style={styles.ModalContainer}>
                <Text style={[styles.modaltitle,{color:COLORS.Red}]}>LAST REMINDER !</Text>
                <HTML
                  contentWidth={1}
                  source={source}
                  tagsStyles={htmlStyles}
                />
              </View>
            </Overlay>
          </View>
        )}

        {( OverDue.includes('Gentle REMINDER')) && (
          <View style={styles.ModelView}>
            <Overlay style={styles.overlay} isVisible={visible} onBackdropPress={toggleOverlay}>
              <View style={styles.ModalContainer}>
                <Text style={[styles.modaltitle,{color:COLORS.DarkGreen}]}>Gentle REMINDER</Text>
                <HTML
                  contentWidth={1}
                  source={source}
                  tagsStyles={htmlStyles}
                />
              </View>
            </Overlay>
          </View>
        )}
      </View>

      {( force_logout === '0') && (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.NextButton]}
          onPress={() => {
            // Handle button click logic here
            navigation.navigate('OutletSelectionScreen',{OutletData});
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
  ModalContainer:{
    width:'90%',
    padding: 10,
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
  },
  modaltitle:{
    fontSize:FONTSIZE.size_16,
    paddingBottom:10,
    fontWeight:'bold',
  },
});

export default withAuth(WelcomeScreen);
