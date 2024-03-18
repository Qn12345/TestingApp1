import React, { useContext } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { LinearProgress } from '@rneui/themed'; // Import SearchBar
import { useRoute } from '@react-navigation/native';
import PublicHeader from '../components/PublicHeader';
import { COLORS, FONTSIZE } from '../theme/themes';
import Spinner from 'react-native-loading-spinner-overlay';
import withAuth from '../withAuth';
import { BasicFunc } from '../context/BasicFunc';
import Icons from 'react-native-vector-icons/FontAwesome';

const RegistrationDashboard = ({ }) => {
  const { isLoading } = useContext(BasicFunc);
  const route = useRoute();
  const dashboard = route.params?.resData || [];

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <PublicHeader title={'Registration Dashboard'} />
      <ScrollView>
        <View style={[styles.ListContainer,{backgroundColor:COLORS.Green}]}>
          <Icons
            name="check-square-o" // Replace with the actual icon name
            size={100} // Adjust the size of the icon as needed
            color={COLORS.White}
            style={styles.iconB}
          />
          <View style={styles.rightW}>
            <Text style={styles.text1}>REGISTERED</Text>
            <Text style={styles.text2}>{dashboard.registered} ({dashboard.percent_reg}%)</Text>
            <LinearProgress
              style={{ marginVertical: 10,width:'100%'}}
              trackColor={COLORS.TransGrey}
              color='white'
              value={dashboard.percent_reg/100}
              variant="determinate"
            />
            <Text style={styles.text3}>of Total Suppliers : {dashboard.total}</Text>
          </View>
        </View>

        <View style={[styles.ListContainer,{backgroundColor:COLORS.LightGreen}]}>
          <Icons
            name="truck" // Replace with the actual icon name
            size={100} // Adjust the size of the icon as needed
            color={COLORS.Black}
            style={styles.iconB}
          />
          <View style={styles.rightW}>
            <Text style={styles.text1b}>OUTRIGHT</Text>
            <Text style={styles.text2b}>{dashboard.outright} ({dashboard.percent_outright}%)</Text>
            <LinearProgress
              style={{ marginVertical: 10,width:'100%'}}
              trackColor={COLORS.TransGrey}
              color='white'
              value={dashboard.percent_outright/100}
              variant="determinate"
            />
            <Text style={styles.text3b}>of Total Suppliers : {dashboard.total}</Text>
          </View>
        </View>

        <View style={[styles.ListContainer,{backgroundColor:COLORS.LightGreen}]}>
          <Icons
            name="truck" // Replace with the actual icon name
            size={100} // Adjust the size of the icon as needed
            color={COLORS.Black}
            style={styles.iconB}
          />
          <View style={styles.rightW}>
            <Text style={styles.text1b}>CONSIGNMENT</Text>
            <Text style={styles.text2b}>{dashboard.consignment} ({dashboard.percent_consignment}%)</Text>
            <LinearProgress
              style={{ marginVertical: 10,width:'100%'}}
              trackColor={COLORS.TransGrey}
              color='white'
              value={dashboard.percent_consignment/100}
              variant="determinate"
            />
            <Text style={styles.text3b}>of Total Suppliers : {dashboard.total}</Text>
          </View>
        </View>

        <View style={[styles.ListContainer,{backgroundColor:COLORS.LightGreen}]}>
          <Icons
            name="truck" // Replace with the actual icon name
            size={100} // Adjust the size of the icon as needed
            color={COLORS.Black}
            style={styles.iconB}
          />
          <View style={styles.rightW}>
            <Text style={styles.text1b}>OUTRIGHT & CONSIGN</Text>
            <Text style={styles.text2b}>{dashboard.both} ({dashboard.percent_both}%)</Text>
            <LinearProgress
              style={{ marginVertical: 10,width:'100%'}}
              trackColor={COLORS.TransGrey}
              color='white'
              value={dashboard.percent_both/100}
              variant="determinate"
            />
            <Text style={styles.text3b}>of Total Suppliers : {dashboard.total}</Text>
          </View>
        </View>

        <View style={[styles.ListContainer,{backgroundColor:'#466eab'}]}>
          <Icons
            name="group" // Replace with the actual icon name
            size={100} // Adjust the size of the icon as needed
            color={COLORS.White}
            style={styles.iconB}
          />
          <View style={styles.rightW}>
            <Text style={styles.text1}>NEW</Text>
            <Text style={styles.text2}>{dashboard.new} ({dashboard.percent_new}%)</Text>
            <LinearProgress
              style={{ marginVertical: 10,width:'100%'}}
              trackColor={COLORS.TransGrey}
              color='white'
              value={dashboard.percent_new/100}
              variant="determinate"
            />
            <Text style={styles.text3}>of Total Suppliers : {dashboard.total}</Text>
          </View>
        </View>

        <View style={[styles.ListContainer,{backgroundColor:COLORS.Orange}]}>
          <Icons
            name="send" // Replace with the actual icon name
            size={100} // Adjust the size of the icon as needed
            color={COLORS.White}
            style={styles.iconB}
          />
          <View style={styles.rightW}>
            <Text style={styles.text1}>SEND</Text>
            <Text style={styles.text2}>{dashboard.send} ({dashboard.percent_send}%)</Text>
            <LinearProgress
              style={{ marginVertical: 10,width:'100%'}}
              trackColor={COLORS.TransGrey}
              color='white'
              value={dashboard.percent_send/100}
              variant="determinate"
            />
            <Text style={styles.text3}>of Total Suppliers : {dashboard.total}</Text>
          </View>
        </View>

        <View style={[styles.ListContainer,{backgroundColor:COLORS.LightBlue}]}>
          <Icons
            name="save" // Replace with the actual icon name
            size={100} // Adjust the size of the icon as needed
            color={COLORS.Black}
            style={styles.iconB}
          />
          <View style={styles.rightW}>
            <Text style={styles.text1b}>SAVE PROGRESS</Text>
            <Text style={styles.text2b}>{dashboard.save_progress} ({dashboard.percent_save_progress}%)</Text>
            <LinearProgress
              style={{ marginVertical: 10,width:'100%'}}
              trackColor={COLORS.TransGrey}
              color='white'
              value={dashboard.percent_save_progress/100}
              variant="determinate"
            />
            <Text style={styles.text3b}>of Total Suppliers : {dashboard.total}</Text>
          </View>
        </View>
        
        <View style={[styles.ListContainer,{backgroundColor:'#ed6d6d'}]}>
          <Icons
            name="hourglass-1" // Replace with the actual icon name
            size={100} // Adjust the size of the icon as needed
            color={COLORS.Black}
            style={styles.iconB}
          />
          <View style={styles.rightW}>
            <Text style={styles.text1b}>PROCESSING</Text>
            <Text style={styles.text2b}>{dashboard.processing} ({dashboard.percent_processing}%)</Text>
            <LinearProgress
              style={{ marginVertical: 10,width:'100%'}}
              trackColor={COLORS.TransGrey}
              color='white'
              value={dashboard.percent_processing/100}
              variant="determinate"
            />
            <Text style={styles.text3b}>of Total Suppliers : {dashboard.total}</Text>
          </View>
        </View>

        <View style={[styles.ListContainer,{backgroundColor:COLORS.Purple}]}>
          <Icons
            name="file-text-o" // Replace with the actual icon name
            size={100} // Adjust the size of the icon as needed
            color={COLORS.Black}
            style={styles.iconB}
          />
          <View style={styles.rightW}>
            <Text style={styles.text1b}>ADVANCE</Text>
            <Text style={styles.text2b}>{dashboard.advance} ({dashboard.percent_advance}%)</Text>
            <LinearProgress
              style={{ marginVertical: 10,width:'100%'}}
              trackColor={COLORS.TransGrey}
              color='white'
              value={dashboard.percent_advance/100}
              variant="determinate"
            />
            <Text style={styles.text3b}>of Total Suppliers : {dashboard.total}</Text>
          </View>
        </View>

        <View style={[styles.ListContainer,{backgroundColor:'#74bffc'}]}>
          <Icons
            name="archive" // Replace with the actual icon name
            size={100} // Adjust the size of the icon as needed
            color={COLORS.Black}
            style={styles.iconB}
          />
          <View style={styles.rightW}>
            <Text style={styles.text1b}>ARCHIVE</Text>
            <Text style={styles.text2b}>{dashboard.archived} ({dashboard.percent_archived}%)</Text>
            <LinearProgress
              style={{ marginVertical: 10,width:'100%'}}
              trackColor={COLORS.TransGrey}
              color='white'
              value={dashboard.percent_archived/100}
              variant="determinate"
            />
            <Text style={styles.text3b}>of Total Suppliers : {dashboard.total}</Text>
          </View>
        </View>

        <View style={[styles.ListContainer,{backgroundColor:'#78ffdd'}]}>
          <Icons
            name="exclamation" // Replace with the actual icon name
            size={100} // Adjust the size of the icon as needed
            color={COLORS.Black}
            style={styles.iconB}
          />
          <View style={styles.rightW}>
            <Text style={styles.text1b}>NO ACTION</Text>
            <Text style={styles.text2b}>{dashboard.no_action} ({dashboard.percent_no_action}%)</Text>
            <LinearProgress
              style={{ marginVertical: 10,width:'100%'}}
              trackColor={COLORS.TransGrey}
              color='white'
              value={dashboard.percent_no_action/100}
              variant="determinate"
            />
            <Text style={styles.text3b}>of Total Suppliers : {dashboard.total}</Text>
          </View>
        </View>

        <View style={[styles.ListContainer,{backgroundColor:'#ffdd78'}]}>
          <Icons
            name="hand-stop-o" // Replace with the actual icon name
            size={100} // Adjust the size of the icon as needed
            color={COLORS.Black}
            style={styles.iconB}
          />
          <View style={styles.rightW}>
            <Text style={styles.text1b}>TERMINATED</Text>
            <Text style={styles.text2b}>{dashboard.terminate} ({dashboard.percent_terminate}%)</Text>
            <LinearProgress
              style={{ marginVertical: 10,width:'100%'}}
              trackColor={COLORS.TransGrey}
              color='white'
              value={dashboard.percent_terminate/100}
              variant="determinate"
            />
            <Text style={styles.text3b}>of Total Suppliers : {dashboard.total}</Text>
          </View>
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
  ListContainer: {
    width:'95%',
    borderRadius:3,
    borderWidth:1,
    borderColor:COLORS.White,
    alignSelf:'center',
    flexDirection:'row',
    marginVertical:10,
  },
  iconB: {
    backgroundColor:COLORS.TransGrey,
    padding:10,
    width:130,
  },
  rightW: {
    padding:10,
    width:'65%',
  },
  text1: {
    fontSize:FONTSIZE.size_16,
    color:COLORS.White,
  },
  text2: {
    fontSize:FONTSIZE.size_18,
    color:COLORS.White,
    fontWeight:'bold',
  },
  text3: {
    fontSize:FONTSIZE.size_16,
    color:COLORS.White,
  },
  text1b: {
    fontSize:FONTSIZE.size_16,
    color:COLORS.Black,
  },
  text2b: {
    fontSize:FONTSIZE.size_18,
    color:COLORS.Black,
    fontWeight:'bold',
  },
  text3b: {
    fontSize:FONTSIZE.size_16,
    color:COLORS.Black,
  },
});

export default withAuth(RegistrationDashboard);
