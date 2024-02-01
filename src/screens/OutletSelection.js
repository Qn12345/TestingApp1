// Import necessary components and libraries
import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image,TouchableOpacity } from 'react-native';
import { Divider } from '@rneui/themed';
import { useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { COLORS, FONTSIZE } from './theme/themes';
import PublicHeader from './components/PublicHeader';
import { BasicFunc } from './context/BasicFunc';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import withAuth from './withAuth';

const OutletSelectionScreen = ({ navigation }) => {
  const { isLoading,dashboard } = useContext(BasicFunc);
  const route = useRoute();
  const OutletData = route.params?.OutletData || [];
  const [selectedOutlet, setSelectedOutlet] = useState(null);

  const generateOutletOptions = () => {
    const options = []; // Initial value is set to null
    // Assuming OutletData is an array of objects with branch_name and branch_code properties
    OutletData.forEach((outlet) => {
      options.push({
        label: outlet.branch_name,
        value: {outletBranchCode:outlet.branch_code, ishq:outlet.is_hq},
      });
    });

    return options;
  };

  const isButtonDisabled = selectedOutlet === null;

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <PublicHeader title={'Outlet Selection'} />
      <ScrollView style={styles.scroll}>
        <View style={styles.ContentContainer}>
          <Image source={require("./assets/TMG_LOGO.jpg")} style={styles.logo} />
          <Text style={styles.appName}>TMG B2B Portal</Text>
        </View>
        <Divider width={1} color='grey' style={{ margin: 10 }} />
        <Dropdown
          style={styles.chooseOutlet}
          placeholderStyle={styles.chooseOutletWord}
          selectedTextStyle={styles.chooseOutletWord}
          labelField="label"
          valueField="value"
          placeholder={'Choose your outlet'}
          data={generateOutletOptions()}
          value={selectedOutlet}
          containerStyle={styles.containerOutlet}
          onChange={(value) => setSelectedOutlet(value)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.NextButton,
              { backgroundColor: isButtonDisabled ? COLORS.LightGrey : COLORS.Blue },
            ]}
            onPress={() => {
              // Handle button click logic here
              if (!isButtonDisabled) {
                let location=selectedOutlet.value.outletBranchCode;
                let ishq=selectedOutlet.value.ishq;
                dashboard(location, ishq);
              }
            }}
            disabled={isButtonDisabled}
          >
            <Icon name="arrow-forward" size={25} color="white" style={{ marginRight: 5 }} />
            <Text style={styles.buttonTextA}>Next</Text>
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
  ContentContainer:{
    alignItems:'center',
    justifyContent:'center',
    marginTop:50,
  },
  buttonContainer:{
    alignItems:'center',
    justifyContent:'center',
    marginTop:30,
  },
  logo: {
    width: 200,
    height: 130,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 25,
    marginTop: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  chooseOutlet: {
    padding: 10,
    marginHorizontal:10,
    marginTop:10,
    borderColor:COLORS.LightGrey,
    borderWidth:2,
    borderRadius:10,
  },
  containerOutlet:{
    borderColor:COLORS.LightGrey,
    borderWidth:1,
    borderRadius:10,
    padding:5,
  },
  chooseOutletWord:{
    color:COLORS.Black,
    padding:5,
  },
  NextButton:{
    backgroundColor:COLORS.LightGrey,
    width:'94%',
    height:50,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    borderRadius:10,
  },
  buttonTextA:{
    color:COLORS.White,
    fontWeight:'bold',
    fontSize:FONTSIZE.size_20,
  },
});

export default withAuth(OutletSelectionScreen);
