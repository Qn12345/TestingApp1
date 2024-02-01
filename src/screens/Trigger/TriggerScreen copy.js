import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { ListItem,Divider,Tab } from '@rneui/themed'; // Import ListItem
import { useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { COLORS } from '../theme/themes';
import PublicHeader from '../components/PublicHeader';
import { BasicFunc } from '../context/BasicFunc';
import withAuth from '../withAuth';

const TriggerScreen = ({ navigation }) => {
  const { isLoading } = useContext(BasicFunc);
  const route = useRoute();
  const TriggerData = route.params?.TriggerData || [];
  const [expandedItem, setExpandedItem] = useState(null);

  const isDataConditionMet = (data) => {
    return data === '#f711241';
  };

  // Group TriggerData by acc_name
  const groupedTriggerData = TriggerData.reduce((acc, item) => {
    const key = item.acc_name;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <PublicHeader title={'Trigger'} />

      <ScrollView style={styles.scroll}>
        {Object.keys(groupedTriggerData).map((accName, index) => {
          const accData = groupedTriggerData[accName];
          const firstTypeNaming = accData.find(item => item.type_naming === 'JSON Running') || {};
          const secondTypeNaming = accData.find(item => item.type_naming === 'Task Agent Running') || {};

          return (
            <ListItem.Accordion
              key={index}
              content={
                <View style={styles.dataContainer}>
                  <Text style={styles.headerText}>{accName || 'N/A'}</Text>
                </View>
              }
              isExpanded={index === expandedItem}
              onPress={() => setExpandedItem(index === expandedItem ? null : index)}
              style={styles.accordionItem}
              containerStyle={[
                styles.accordionContainer,
                // Use the condition from your example to set the background color dynamically
                (isDataConditionMet(firstTypeNaming.check_po) ||
                  isDataConditionMet(firstTypeNaming.check_grn) ||
                  isDataConditionMet(firstTypeNaming.check_grda) ||
                  isDataConditionMet(firstTypeNaming.check_strb) ||
                  isDataConditionMet(firstTypeNaming.check_prdn) ||
                  isDataConditionMet(firstTypeNaming.check_prcn) ||
                  isDataConditionMet(firstTypeNaming.check_pdn) ||
                  isDataConditionMet(firstTypeNaming.check_pcn) ||
                  isDataConditionMet(firstTypeNaming.check_pci) ||
                  isDataConditionMet(firstTypeNaming.check_di) ||
                  isDataConditionMet(secondTypeNaming.check_po) ||
                  isDataConditionMet(secondTypeNaming.check_grn) ||
                  isDataConditionMet(secondTypeNaming.check_grda) ||
                  isDataConditionMet(secondTypeNaming.check_strb) ||
                  isDataConditionMet(secondTypeNaming.check_prdn) ||
                  isDataConditionMet(secondTypeNaming.check_prcn) ||
                  isDataConditionMet(secondTypeNaming.check_pdn) ||
                  isDataConditionMet(secondTypeNaming.check_pcn) ||
                  isDataConditionMet(secondTypeNaming.check_pci) ||
                  isDataConditionMet(secondTypeNaming.check_di)) && { backgroundColor: 'rgba(252, 139, 139, 0.9)' },
              ]}
            >
              <View style={styles.tableRow}>
                <View style={{ flex: 0.25 }}>
                <Text style={styles.headerText}></Text>
                <Divider width={2} color='grey'  style={{marginVertical:3}}/>
                <Text style={styles.headerText}>PO#</Text>
                <Text style={styles.headerText}>GRN#</Text>
                <Text style={styles.headerText}>GRDA#</Text>
                <Text style={styles.headerText}>STRB#</Text>
                <Text style={styles.headerText}>PRDN#</Text>
                <Text style={styles.headerText}>PRCN#</Text>
                <Text style={styles.headerText}>PDN#</Text>
                <Text style={styles.headerText}>PCN#</Text>
                <Text style={styles.headerText}>PCI#</Text>
                <Text style={styles.headerText}>DI#</Text>
                <Text style={styles.headerText}>Created At#</Text>
                </View>
                {/* Render the first 50% of the accordion for the firstTypeNaming */}
                <View style={{ flex: 0.425 }}>
                  <Text style={styles.headerTextIn}>{firstTypeNaming.type_naming || 'N/A'}</Text>
                  <Divider width={2} color='grey'  style={{marginVertical:3}}/>
                  <Text
                    style={[
                    styles.rowText,
                    isDataConditionMet(firstTypeNaming.check_po) ? { backgroundColor: 'rgba(242, 150, 153, 0.9)' } : null]}
                  >
                  {firstTypeNaming.po || '0'}
                  </Text>
                  <Text
                    style={[
                    styles.rowText,
                    isDataConditionMet(firstTypeNaming.check_grn) ? { backgroundColor: 'rgba(242, 150, 153, 0.5)' } : null]}
                  >
                  {firstTypeNaming.grn || '0'}</Text>
                  <Text
                    style={[
                    styles.rowText,
                    isDataConditionMet(firstTypeNaming.check_grda) ? { backgroundColor: 'rgba(242, 150, 153, 0.5)' } : null]}
                  >
                  {firstTypeNaming.grda || '0'}</Text>
                  <Text
                    style={[
                    styles.rowText,
                    isDataConditionMet(firstTypeNaming.check_strb) ? { backgroundColor: 'rgba(242, 150, 153, 0.5)' } : null]}
                  >
                  {firstTypeNaming.strb || '0'}</Text>
                  <Text
                    style={[
                    styles.rowText,
                    isDataConditionMet(firstTypeNaming.check_prdn) ? { backgroundColor: 'rgba(242, 150, 153, 0.5)' } : null]}
                  >
                  {firstTypeNaming.prdn || '0'}</Text>
                  <Text
                    style={[
                    styles.rowText,
                    isDataConditionMet(firstTypeNaming.check_prcn) ? { backgroundColor: 'rgba(242, 150, 153, 0.5)' } : null]}
                  >
                  {firstTypeNaming.prcn || '0'}</Text>
                  <Text
                    style={[
                    styles.rowText,
                    isDataConditionMet(firstTypeNaming.check_pdn) ? { backgroundColor: 'rgba(242, 150, 153, 0.5)' } : null]}
                  >
                  {firstTypeNaming.pdn || '0'}</Text>
                  <Text
                    style={[
                    styles.rowText,
                    isDataConditionMet(firstTypeNaming.check_pcn) ? { backgroundColor: 'rgba(242, 150, 153, 0.5)' } : null]}
                  >
                  {firstTypeNaming.pcn || '0'}</Text>
                  <Text
                    style={[
                    styles.rowText,
                    isDataConditionMet(firstTypeNaming.check_pci) ? { backgroundColor: 'rgba(242, 150, 153, 0.5)' } : null]}
                  >
                  {firstTypeNaming.pci || '0'}</Text>
                  <Text
                    style={[
                    styles.rowText,
                    isDataConditionMet(firstTypeNaming.check_di) ? { backgroundColor: 'rgba(242, 150, 153, 0.5)' } : null]}
                  >
                  {firstTypeNaming.di || '0'}</Text>
                  <Text style={styles.rowText}>{firstTypeNaming.created_at || '0'}</Text>
                </View>
                <Divider width={2} orientation="vertical" color='grey'/>
                {/* Render the second 50% of the accordion for the secondTypeNaming */}
                <View style={{ flex: 0.425}}>
                  <Text style={styles.headerTextIn}>{secondTypeNaming.type_naming || 'N/A'}</Text>
                  <Divider width={2} color='grey'  style={{marginVertical:3}}/>
                  <Text
                    style={[
                    styles.rowText,
                    isDataConditionMet(secondTypeNaming.check_po) ? { backgroundColor: 'rgba(242, 150, 153, 0.9)' } : null]}
                  >
                  {secondTypeNaming.po || '0'}
                  </Text>
                  <Text
                    style={[
                    styles.rowText,
                    isDataConditionMet(secondTypeNaming.check_grn) ? { backgroundColor: 'rgba(242, 150, 153, 0.5)' } : null]}
                  >
                  {secondTypeNaming.grn || '0'}</Text>
                  <Text
                    style={[
                    styles.rowText,
                    isDataConditionMet(secondTypeNaming.check_grda) ? { backgroundColor: 'rgba(242, 150, 153, 0.5)' } : null]}
                  >
                  {secondTypeNaming.grda || '0'}</Text>
                  <Text
                    style={[
                    styles.rowText,
                    isDataConditionMet(secondTypeNaming.check_strb) ? { backgroundColor: 'rgba(242, 150, 153, 0.5)' } : null]}
                  >
                  {secondTypeNaming.strb || '0'}</Text>
                  <Text
                    style={[
                    styles.rowText,
                    isDataConditionMet(secondTypeNaming.check_prdn) ? { backgroundColor: 'rgba(242, 150, 153, 0.5)' } : null]}
                  >
                  {secondTypeNaming.prdn || '0'}</Text>
                  <Text
                    style={[
                    styles.rowText,
                    isDataConditionMet(secondTypeNaming.check_prcn) ? { backgroundColor: 'rgba(242, 150, 153, 0.5)' } : null]}
                  >
                  {secondTypeNaming.prcn || '0'}</Text>
                  <Text
                    style={[
                    styles.rowText,
                    isDataConditionMet(secondTypeNaming.check_pdn) ? { backgroundColor: 'rgba(242, 150, 153, 0.5)' } : null]}
                  >
                  {secondTypeNaming.pdn || '0'}</Text>
                  <Text
                    style={[
                    styles.rowText,
                    isDataConditionMet(secondTypeNaming.check_pcn) ? { backgroundColor: 'rgba(242, 150, 153, 0.5)' } : null]}
                  >
                  {secondTypeNaming.pcn || '0'}</Text>
                  <Text
                    style={[
                    styles.rowText,
                    isDataConditionMet(secondTypeNaming.check_pci) ? { backgroundColor: 'rgba(242, 150, 153, 0.5)' } : null]}
                  >
                  {secondTypeNaming.pci || '0'}</Text>
                  <Text
                    style={[
                    styles.rowText,
                    isDataConditionMet(secondTypeNaming.check_di) ? { backgroundColor: 'rgba(242, 150, 153, 0.5)' } : null]}
                  >
                  {secondTypeNaming.di || '0'}</Text>
                  <Text style={styles.rowText}>{secondTypeNaming.created_at || '0'}</Text>
                </View>
              </View>
            </ListItem.Accordion>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Grey,
  },
  dataContainer: {
    alignItems: 'center',
    margin: 4,
    width: '90%',
  },
  scroll: {
    flex: 1,
  },
  accordionItem: {
    marginTop: 15,
  },
  accordionContainer: {
    backgroundColor: COLORS.LightBlue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.White,
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
    color: COLORS.Black,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.White,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.White,
    margin: 3,
    padding: 10,
  },
  headerTextIn:{
    fontWeight: 'bold',
    flex: 1,
    color: COLORS.Black,
    textAlign:'center',
  },
  rowText:{
    flex: 1,
    color: COLORS.Black,
    textAlign:'center',
  },
});

export default withAuth(TriggerScreen);
