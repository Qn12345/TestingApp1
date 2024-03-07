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

const PVVFilter = () => {
  const { isLoading } = useContext(BasicFunc);
  const {displayDoc} = useContext(DisplayFunc);
  const route = useRoute();
  const FilterDataStatus = route.params?.FilterData?.status || [];
  const location = route.params?.location || '';
  const typeName = route.params?.typeName || '';
  const ishq = route.params?.ishq || '';
  const [pvvStatus, setpvvStatus] = useState([]);
  const [pvvFromDate, setpvvFromDate] = useState('');
  const [pvvToDate, setpvvToDate] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [datePickerFor, setDatePickerFor] = useState('');
  const [ispvvDatePickerVisible, setpvvDatePickerVisibility] = useState(false);
  const doc_type = ['all'];
  const limit = 100;
  const offset = 0;
  const filter_supplier = route.params?.FilterData?.filter_supplier || [];
  const exp_from = '';
  const exp_to = '';
  const period_code = '';
  const [isPoFocused, setIsPoFocused] = useState(false);
  const [RefNo, setPo] = useState('');

  const statuss = FilterDataStatus.map((status) => ({
    code: status.code,
    reason: status.reason,
  }));

  const showDatePicker = (input, pickerFor) => {
    setCurrentInput(input);
    setDatePickerFor(pickerFor);
    if (pickerFor === 'pvv') {
      setpvvDatePickerVisibility(true);
    }
  };

  const hideDatePicker = () => {
    setpvvDatePickerVisibility(false);
  };

  const handleConfirmpvv = (date) => {
    hideDatePicker();
    if (currentInput === 'from' && datePickerFor === 'pvv') {
      setpvvFromDate(date.toISOString().split('T')[0]);
    } else if (currentInput === 'to' && datePickerFor === 'pvv') {
      setpvvToDate(date.toISOString().split('T')[0]);
    }
  };

  const togglestatusChip = (status) => {
    setpvvStatus((prevpvvStatus) => {
      const isSelected = prevpvvStatus.includes(status.code);
      if (isSelected) {
        return prevpvvStatus.filter((selectedStatus) => selectedStatus !== status.code);
      } else {
        return [...prevpvvStatus, status.code];
      }
    });
  };

  // Function to handle reset and apply actions
  const handleReset = () => {
    setPo('');
    setpvvStatus([]);
    setpvvFromDate(null);
    setpvvToDate(null);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <PublicHeader title={'Search Filter'} />
      {/* Main content */}
      <ScrollView style={styles.scroll}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Refno</Text>
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
          <Text style={styles.label}>Status</Text>
          <View style={styles.chipsContainer}>
            {statuss.map((status) => (
                <Chip
                containerStyle={styles.Schip}
                key={status.code}
                type={pvvStatus.includes(status.code) ? 'solid' : 'outline'}
                onPress={() => togglestatusChip(status)}>
                <Text style={styles.ChipWord}>{status.reason}</Text>
                </Chip>
            ))}
            </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Document Generation Time</Text>
          <View style={styles.dateRangeContainer}>
            <TouchableOpacity onPress={() => showDatePicker('from', 'pvv')} style={styles.datePickerInputO}>
            <TextInput
              style={styles.datePickerInput}
              value={pvvFromDate ? pvvFromDate : ''}
              editable={false}
              placeholder='Date From'
              placeholderTextColor={COLORS.LightGrey}
            />
            </TouchableOpacity>
            <Icon
              name="remove-outline"
              size={30}
              color={'black'}
              style={{ marginTop: 15 }}
            />
            <TouchableOpacity onPress={() => showDatePicker('to', 'pvv')} style={styles.datePickerInputO}>
            <TextInput
              style={styles.datePickerInput}
              value={pvvToDate ? pvvToDate : ''}
              editable={false}
              placeholder='Date To'
              placeholderTextColor={COLORS.LightGrey}
            />
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={ispvvDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmpvv}
            onCancel={hideDatePicker}
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
                                   typeName,
                                   pvvStatus,
                                   RefNo,
                                   period_code,
                                   pvvFromDate,
                                   pvvToDate,
                                   exp_from,exp_to,
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

export default withAuth(PVVFilter);
