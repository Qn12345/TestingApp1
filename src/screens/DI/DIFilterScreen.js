import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/themes';
import Spinner from 'react-native-loading-spinner-overlay';
import { BasicFunc } from '../context/BasicFunc';
import { Chip } from '@rneui/themed';
import PublicHeader from '../components/PublicHeader';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import {DisplayFunc} from '../context/DisplayFunc';
import withAuth from '../withAuth';

const DIFilterScreen = () => {
  const { isLoading } = useContext(BasicFunc);
  const {displayDoc} = useContext(DisplayFunc);
  const route = useRoute();
  const FilterDataStatus = route.params?.FilterData?.status || [];
  const FilterDataPeriod = route.params?.FilterData?.period_code || [];
  const location = route.params?.location || '';
  const ishq = route.params?.ishq || '';
  const [RefNo, setDI] = useState('');
  const [isDIFocused, setIsDIFocused] = useState(false);
  const [DIStatus, setDIStatus] = useState([]);
  const [DIFromDate, setDIFromDate] = useState('');
  const [DIToDate, setDIToDate] = useState('');
  const [DIEFromDate, setDIEFromDate] = useState('');
  const [DIEToDate, setDIEToDate] = useState('');
  const [selectedPeriodCode, setSelectedPeriodCode] = useState('');
  const typeDI = 'DI';
  const doc_type = ['all'];
  const limit = 100;
  const offset = 0;
  const filter_supplier = '';

  // Function to generate period code options
  const generatePeriodCodeOptions = () => {
    const options = [];
    FilterDataPeriod.forEach((period_code) => {
      options.push({
        label: period_code.period_code,
        value: period_code.period_code,
      });
    });

    return options;
  };

  const statuss = FilterDataStatus.map((status) => ({
    code: status.code,
    reason: status.reason,
  }));

  const togglestatusChip = (status) => {
    setDIStatus((prevDIStatus) => {
      const isSelected = prevDIStatus.includes(status.code);
      if (isSelected) {
        return prevDIStatus.filter((selectedStatus) => selectedStatus !== status.code);
      } else {
        return [...prevDIStatus, status.code];
      }
    });
  };

  // Function to handle reset and apply actions
  const handleReset = () => {
    setDI('');
    setIsDIFocused(false);
    setDIStatus([]);
    setDIFromDate(null);
    setDIToDate(null);
    setDIEFromDate(null);
    setDIEToDate(null);
    setSelectedPeriodCode(null);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <PublicHeader title={'Search Filter'} />
      {/* Main content */}
      <ScrollView style={styles.scroll}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>INV#</Text>
          <TextInput
            style={[
              styles.input,
              {marginTop:5},
              { borderColor: isDIFocused ? COLORS.LightGrey : COLORS.LightBlue },
            ]}
            value={RefNo}
            onChangeText={(text) => setDI(text)}
            onFocus={() => setIsDIFocused(true)}
            onBlur={() => setIsDIFocused(false)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>INV Status:</Text>
          <View style={styles.chipsContainer}>
            {statuss.map((status) => (
                <Chip
                containerStyle={styles.Schip}
                key={status.code}
                type={DIStatus.includes(status.code) ? 'solid' : 'outline'}
                onPress={() => togglestatusChip(status)}>
                <Text style={styles.ChipWord}>{status.reason}</Text>
                </Chip>
            ))}
            </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Period Code</Text>
          <Dropdown
            style={styles.DropOut}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.placeholderStyle}
            labelField="label"
            valueField="value"
            placeholder={'Choose your period code'}
            data={generatePeriodCodeOptions()}
            value={selectedPeriodCode}
            containerStyle={styles.dropdownContainer}
            dropdownPosition={-4} // Adjust as needed
            onChange={(value) => setSelectedPeriodCode(value)}
            itemTextStyle={{color:COLORS.Black}}
          />
        </View>

        {/* Buttons for Reset and Apply */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <FontAwesomeIcon name="undo" size={20} color={COLORS.Black} style={{ marginRight: 5 }} />
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton}
            onPress={() =>
                      {
                        displayDoc(location,
                                   ishq,
                                   typeDI,
                                   DIStatus,
                                   RefNo,
                                   selectedPeriodCode ? selectedPeriodCode.value : null,
                                   DIFromDate,
                                   DIToDate,
                                   DIEFromDate,
                                   DIEToDate,
                                   doc_type,
                                   limit,
                                   offset,
                                   filter_supplier);
                      }
                    }
            >
            <Icon name="checkmark-sharp" size={20} color="white" style={{ marginRight: 5 }} />
            <Text style={styles.buttonTextA}>Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Set background color to white
  },
  scroll: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 10,
  },
  label: {
    fontSize: FONTSIZE.size_16,
    fontWeight: 'bold',
    color: COLORS.Black,
    paddingTop: 15,
  },
  input: {
    fontSize: FONTSIZE.size_14,
    borderWidth: 1,
    borderColor: COLORS.LightBlue,
    borderRadius: 10,
    padding: 10,
    color: COLORS.Black,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    fontSize: FONTSIZE.size_14,
  },
  Schip: {
    borderWidth: 2,
    borderColor: COLORS.LightGrey,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  ChipWord: {
    color: COLORS.Black,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  datePickerInput: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.Black,
  },
  datePickerInputO: {
    borderWidth: 1,
    borderColor: COLORS.LightBlue,
    borderRadius: 10,
    padding:2,
    marginTop: 5,
    width: '44%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  resetButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: COLORS.LightGrey,
    marginRight: 50,
  },
  applyButton: {
    backgroundColor: COLORS.Blue, // Change to your preferred blue color
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: COLORS.Black,
    fontSize: FONTSIZE.size_16,
    fontWeight: 'bold',
  },
  buttonTextA: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
    fontWeight: 'bold',
  },
  DropOut: {
    borderWidth: 1,
    borderColor: COLORS.LightGrey,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: COLORS.LightBlue,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    fontSize: FONTSIZE.size_14,
  },
  placeholderStyle: {
    color: COLORS.Black,
  },
});

export default withAuth(DIFilterScreen);
