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

const GRNFilterScreen = () => {
  const { isLoading } = useContext(BasicFunc);
  const {displayDoc} = useContext(DisplayFunc);
  const route = useRoute();
  const FilterDataStatus = route.params?.FilterData?.status || [];
  const FilterDataPeriod = route.params?.FilterData?.period_code || [];
  const location = route.params?.location || '';
  const ishq = route.params?.ishq || '';
  const [RefNo, setGRN] = useState('');
  const [isGRNFocused, setIsGRNFocused] = useState(false);
  const [GRNStatus, setGRNStatus] = useState([]);
  const [GRNFromDate, setGRNFromDate] = useState('');
  const [GRNToDate, setGRNToDate] = useState('');
  const [GRNEFromDate, setGRNEFromDate] = useState('');
  const [GRNEToDate, setGRNEToDate] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [datePickerFor, setDatePickerFor] = useState('');
  const [isGRNDatePickerVisible, setGRNDatePickerVisibility] = useState(false);
  const [isGRNEDatePickerVisible, setGRNEDatePickerVisibility] = useState(false);
  const [selectedPeriodCode, setSelectedPeriodCode] = useState('');
  const typeGRN = 'GRN';
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
    if (pickerFor === 'GRN') {
      setGRNDatePickerVisibility(true);
    } else if (pickerFor === 'GRNE') {
      setGRNEDatePickerVisibility(true);
    }
  };

  const hideDatePicker = () => {
    setGRNDatePickerVisibility(false);
    setGRNEDatePickerVisibility(false);
  };

  const handleConfirmGRN = (date) => {
    hideDatePicker();
    if (currentInput === 'from' && datePickerFor === 'GRN') {
      setGRNFromDate(date.toISOString().split('T')[0]);
    } else if (currentInput === 'to' && datePickerFor === 'GRN') {
      setGRNToDate(date.toISOString().split('T')[0]);
    }
  };
  
  const handleConfirmGRNE = (date) => {
    hideDatePicker();
    if (currentInput === 'from' && datePickerFor === 'GRNE') {
      setGRNEFromDate(date.toISOString().split('T')[0]);
    } else if (currentInput === 'to' && datePickerFor === 'GRNE') {
      setGRNEToDate(date.toISOString().split('T')[0]);
    }
  };

  const togglestatusChip = (status) => {
    setGRNStatus((prevGRNStatus) => {
      const isSelected = prevGRNStatus.includes(status.code);
      if (isSelected) {
        return prevGRNStatus.filter((selectedStatus) => selectedStatus !== status.code);
      } else {
        return [...prevGRNStatus, status.code];
      }
    });
  };

  // Function to handle reset and apply actions
  const handleReset = () => {
    setGRN('');
    setIsGRNFocused(false);
    setGRNStatus([]);
    setGRNFromDate(null);
    setGRNToDate(null);
    setGRNEFromDate(null);
    setGRNEToDate(null);
    setSelectedPeriodCode(null);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <PublicHeader title={'Search Filter'} />
      {/* Main content */}
      <ScrollView style={styles.scroll}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>GRN#</Text>
          <TextInput
            style={[
              styles.input,
              {marginTop:5},
              { borderColor: isGRNFocused ? COLORS.LightGrey : COLORS.LightBlue },
            ]}
            value={RefNo}
            onChangeText={(text) => setGRN(text)}
            onFocus={() => setIsGRNFocused(true)}
            onBlur={() => setIsGRNFocused(false)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>GRN Status:</Text>
          <View style={styles.chipsContainer}>
            {statuss.map((status) => (
                <Chip
                containerStyle={styles.Schip}
                key={status.code}
                type={GRNStatus.includes(status.code) ? 'solid' : 'outline'}
                onPress={() => togglestatusChip(status)}>
                <Text style={styles.ChipWord}>{status.reason}</Text>
                </Chip>
            ))}
            </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>GRN Date Range</Text>
          <View style={styles.dateRangeContainer}>
            <TouchableOpacity onPress={() => showDatePicker('from', 'GRN')} style={styles.datePickerInputO}>
            <TextInput
              style={styles.datePickerInput}
              value={GRNFromDate ? GRNFromDate : ''}
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
            <TouchableOpacity onPress={() => showDatePicker('to', 'GRN')} style={styles.datePickerInputO}>
            <TextInput
              style={styles.datePickerInput}
              value={GRNToDate ? GRNToDate : ''}
              editable={false}
              placeholder='Date To'
            />
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isGRNDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmGRN}
            onCancel={hideDatePicker}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Doc Date Range</Text>
          <View style={styles.dateRangeContainer}>
            <TouchableOpacity onPress={() => showDatePicker('from', 'GRNE')} style={styles.datePickerInputO}>
            <TextInput
              style={styles.datePickerInput}
              value={GRNEFromDate ? GRNEFromDate : ''}
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
            <TouchableOpacity onPress={() => showDatePicker('to', 'GRNE')} style={styles.datePickerInputO}>
            <TextInput
              style={styles.datePickerInput}
              value={GRNEToDate ? GRNEToDate : ''}
              editable={false}
              placeholder='Date To'
            />
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isGRNEDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmGRNE}
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
                                   typeGRN,
                                   GRNStatus,
                                   RefNo,
                                   selectedPeriodCode ? selectedPeriodCode.value : null,
                                   GRNFromDate,
                                   GRNToDate,
                                   GRNEFromDate,
                                   GRNEToDate,
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

export default withAuth(GRNFilterScreen);
