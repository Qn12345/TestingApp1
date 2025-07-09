import React, { useRef, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONTSIZE } from './theme/themes';
import { AuthContext } from './context/AuthContext';
import LogoutHeader from './components/LogoutHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useRoute } from '@react-navigation/native'; // Import useFocusEffect
import HTML from 'react-native-render-html';
import { Overlay } from '@rneui/themed';
import { Divider, color } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';

const WelcomeScreen = ({ navigation }) => {
  const { getOutlet } = useContext(AuthContext);
  const route = useRoute();
  const OutletData = route.params?.OutletData || [];
  const annoucement = route.params?.annoucement || [];
  const OverDue = route.params?.overdue || '';
  const force_logout = route.params?.force_logout || '';
  const source = { html: OverDue };
  const [visible, setVisible] = useState(true);
  const htmlStyles = {
    body: { color: COLORS.Black },
  };
  const keyExtractor = (item, index) => index.toString();
  const flatListRef = useRef();

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

  const renderersProps = {
    img: {
      enableExperimentalPercentWidth: true
    }
  };  

  const announcementData = ({ item, index }) => (
    <View style={{width:'95%',borderColor:COLORS.LightGrey,backgroundColor:'#e1e3e6',borderRadius:10,padding:15,margin:10}}>
        <Text style={{color:'black',fontSize:FONTSIZE.size_16,fontWeight:'bold'}}>{item.title}</Text>
        <Text style={{color:'black',fontSize:FONTSIZE.size_14}}>{item.publish_at}</Text>
        <Divider width={1} color='grey' style={{ marginVertical: 10 }} />
      <HTML
        contentWidth={350}
        source={{ html: item.content }}
        tagsStyles={htmlStyles}
        renderersProps={renderersProps}
      />
      <View style={{paddingBottom:10}}><Text> </Text></View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LogoutHeader title={'Announcement'} />
      <View style={{ height: '80%', justifyContent: 'center', alignItems: 'center' }}>
      {(annoucement.length <= 0 || annoucement === null) ? (
        <Text style={{ color: COLORS.Grey }}> Welcome Back</Text>
      ) : (
        <View>
        <FlatList
          ref={flatListRef}
          data={annoucement}
          renderItem={announcementData}
          keyExtractor={keyExtractor}
        />
        </View>
      )}
        {(OverDue.includes('BLOCKED')) && (
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

        {(OverDue.includes('LAST REMINDER')) && (
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

        {(OverDue.includes('Gentle REMINDER')) && (
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
    </SafeAreaView>
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

export default WelcomeScreen;
