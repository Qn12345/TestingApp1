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

const PoFilterScreen = () => {
  const { isLoading } = useContext(BasicFunc);
  const {displayDoc} = useContext(DisplayFunc);
  const route = useRoute();
  const FilterDataStatus = route.params?.FilterData?.status || [];
  const FilterDataPeriod = route.params?.FilterData?.period_code || [];
  const location = route.params?.location || '';
  const ishq = route.params?.ishq || '';
  const [RefNo, setPo] = useState('');
  const [isPoFocused, setIsPoFocused] = useState(false);
  const [poStatus, setpoStatus] = useState([]);
  const [poFromDate, setpoFromDate] = useState('');
  const [poToDate, setpoToDate] = useState('');
  const [poEFromDate, setpoEFromDate] = useState('');
  const [poEToDate, setpoEToDate] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [datePickerFor, setDatePickerFor] = useState('');
  const [isPoDatePickerVisible, setPoDatePickerVisibility] = useState(false);
  const [isPoEDatePickerVisible, setPoEDatePickerVisibility] = useState(false);
  const [selectedPeriodCode, setSelectedPeriodCode] = useState('');
  const typePo = 'PO';
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

  const showDatePicker = (input, pickerFor) => {
    setCurrentInput(input);
    setDatePickerFor(pickerFor);
    if (pickerFor === 'po') {
      setPoDatePickerVisibility(true);
    } else if (pickerFor === 'poE') {
      setPoEDatePickerVisibility(true);
    }
  };

  const hideDatePicker = () => {
    setPoDatePickerVisibility(false);
    setPoEDatePickerVisibility(false);
  };

  const handleConfirmpo = (date) => {
    hideDatePicker();
    if (currentInput === 'from' && datePickerFor === 'po') {
      setpoFromDate(date.toISOString().split('T')[0]);
    } else if (currentInput === 'to' && datePickerFor === 'po') {
      setpoToDate(date.toISOString().split('T')[0]);
    }
  };
  
  const handleConfirmpoE = (date) => {
    hideDatePicker();
    if (currentInput === 'from' && datePickerFor === 'poE') {
      setpoEFromDate(date.toISOString().split('T')[0]);
    } else if (currentInput === 'to' && datePickerFor === 'poE') {
      setpoEToDate(date.toISOString().split('T')[0]);
    }
  };

  const togglestatusChip = (status) => {
    setpoStatus((prevpoStatus) => {
      const isSelected = prevpoStatus.includes(status.code);
      if (isSelected) {
        return prevpoStatus.filter((selectedStatus) => selectedStatus !== status.code);
      } else {
        return [...prevpoStatus, status.code];
      }
    });
  };

  // Function to handle reset and apply actions
  const handleReset = () => {
    setPo('');
    setIsPoFocused(false);
    setpoStatus([]);
    setpoFromDate(null);
    setpoToDate(null);
    setpoEFromDate(null);
    setpoEToDate(null);
    setSelectedPeriodCode(null);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <PublicHeader title={'Search Filter'} />
      {/* Main content */}
      <ScrollView style={styles.scroll}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>PO#</Text>
          <TextInput
            style={[
              styles.input,
              {marginTop:5},
              { borderColor: isPoFocused ? COLORS.LightGrey : COLORS.LightBlue },
            ]}
            value={RefNo}
            onChangeText={(text) => setPo(text)}
            onFocus={() => setIsPoFocused(true)}
            onBlur={() => setIsPoFocused(false)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Po Status:</Text>
          <View style={styles.chipsContainer}>
            {statuss.map((status) => (
                <Chip
                containerStyle={styles.Schip}
                key={status.code}
                type={poStatus.includes(status.code) ? 'solid' : 'outline'}
                onPress={() => togglestatusChip(status)}>
                <Text style={styles.ChipWord}>{status.reason}</Text>
                </Chip>
            ))}
            </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>PO Date Range</Text>
          <View style={styles.dateRangeContainer}>
            <TouchableOpacity onPress={() => showDatePicker('from', 'po')} style={styles.datePickerInputO}>
            <TextInput
              style={styles.datePickerInput}
              value={poFromDate ? poFromDate : ''}
              editable={false}
              placeholder='Date From'
            />
            </TouchableOpacity>
            <Icon
              name="remove-outline"
              size={30}
              color={'black'}
              style={{ marginTop: 15 }}
            />
            <TouchableOpacity onPress={() => showDatePicker('to', 'po')} style={styles.datePickerInputO}>
            <TextInput
              style={styles.datePickerInput}
              value={poToDate ? poToDate : ''}
              editable={false}
              placeholder='Date To'
            />
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isPoDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmpo}
            onCancel={hideDatePicker}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>PO Expired Date Range</Text>
          <View style={styles.dateRangeContainer}>
            <TouchableOpacity onPress={() => showDatePicker('from', 'poE')} style={styles.datePickerInputO}>
            <TextInput
              style={styles.datePickerInput}
              value={poEFromDate ? poEFromDate : ''}
              editable={false}
              placeholder='Date From'
            />
            </TouchableOpacity>
            <Icon
              name="remove-outline"
              size={30}
              color={'black'}
              style={{ marginTop: 15 }}
            />
            <TouchableOpacity onPress={() => showDatePicker('to', 'poE')} style={styles.datePickerInputO}>
            <TextInput
              style={styles.datePickerInput}
              value={poEToDate ? poEToDate : ''}
              editable={false}
              placeholder='Date To'
            />
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isPoEDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmpoE}
            onCancel={hideDatePicker}
          />
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
                                   typePo,
                                   poStatus,
                                   RefNo,
                                   selectedPeriodCode ? selectedPeriodCode.value : null,
                                   poFromDate,
                                   poToDate,
                                   poEFromDate,
                                   poEToDate,
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

export default withAuth(PoFilterScreen);
