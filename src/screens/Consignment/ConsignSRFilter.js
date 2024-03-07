import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/themes';
import Spinner from 'react-native-loading-spinner-overlay';
import { BasicFunc } from '../context/BasicFunc';
import { Chip,CheckBox } from '@rneui/themed';
import PublicHeader from '../components/PublicHeader';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import withAuth from '../withAuth';
import CustomAlert from '../components/CustomAlert';
import { ConsignFunc } from './ConsignFunc';

const ConsignSRFilter = () => {
  const { isLoading } = useContext(BasicFunc);
  const {consignmentSRPdf} = useContext(ConsignFunc);
  const route = useRoute();
  const locationConsign = route.params?.locationConsign || [];
  const codeConsign = route.params?.codeConsign || [];
  const last_month_first_date = route.params?.last_month_first_date || '';
  const last_month_last_date = route.params?.last_month_last_date || '';
  const type = route.params?.type || '';
  const [locationChip, setlocationChip] = useState([]);
  const [Fdate, setFdate] = useState(last_month_first_date);
  const [Tdate, setTdate] = useState(last_month_last_date);
  const [currentInput, setCurrentInput] = useState('');
  const [datePickerFor, setDatePickerFor] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedCode, setselectedCode] = useState('');
  const [showAlertBlank, setShowAlertBlank] = useState(false);
  const [alertMessageBlank, setAlertMessageBlank] = useState('');
  const [checked, setChecked] = React.useState(false);
  const toggleCheckbox = () => {
    setChecked(!checked);
    if (!checked) {
      // If "All" checkbox is checked, select all chips
      const allLocationCodes = LocationD.map(location => location.code).flat();
      setlocationChip(allLocationCodes);
    } else {
      // If "All" checkbox is unchecked, deselect all chips
      setlocationChip([]);
    }
  };

  // Function to generate period code options
  const generateCodeOptions = () => {
    const options = [];
    codeConsign.forEach((code) => {
      options.push({
        label: `${code.Code}-${code.Name}`,
        value: code.Code,
      });
    });

    return options;
  };

  const LocationD = locationConsign.map((location) => ({
    code: location.branch_code,
    reason: location.branch_name,
    is_hq: location.is_hq,
  }));


  const showDatePicker = (input, pickerFor) => {
    setCurrentInput(input);
    setDatePickerFor(pickerFor);
    if (pickerFor === 'consign') {
      setDatePickerVisibility(true);
    }
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmConsign = (date) => {
    hideDatePicker();
    if (currentInput === 'from' && datePickerFor === 'consign') {
      setFdate(date.toISOString().split('T')[0]);
    } else if (currentInput === 'to' && datePickerFor === 'consign') {
      setTdate(date.toISOString().split('T')[0]);
    }
  };

  const togglestatusChip = (location) => {
    setlocationChip((prevlocationChip) => {
      const isSelected = prevlocationChip.includes(location.code);
      if (isSelected) {
        return prevlocationChip.filter((selectedLocation) => selectedLocation !== location.code);
      } else {
        return [...prevlocationChip, location.code];
      }
    });
  };

  // Function to handle reset and apply actions
  const handleReset = () => {
    setlocationChip([]);
    setFdate(last_month_first_date);
    setTdate(last_month_last_date);
    setselectedCode(null);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <PublicHeader title={'Filter Consignment'} />
      {/* Main content */}
      <ScrollView style={styles.scroll}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Consignment Sales Report Date Range</Text>
          <View style={styles.dateRangeContainer}>
            <TouchableOpacity onPress={() => showDatePicker('from', 'consign')} style={styles.datePickerInputO}>
            <TextInput
              style={styles.datePickerInput}
              value={Fdate ? Fdate : ''}
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
            <TouchableOpacity onPress={() => showDatePicker('to', 'consign')} style={styles.datePickerInputO}>
            <TextInput
              style={styles.datePickerInput}
              value={Tdate ? Tdate : ''}
              editable={false}
              placeholder='Date To'
              placeholderTextColor={COLORS.LightGrey}
            />
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmConsign}
            onCancel={hideDatePicker}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Code</Text>
          <Dropdown
            style={styles.DropOut}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.placeholderStyle}
            labelField="label"
            valueField="value"
            placeholder={'Select an Code'}
            data={generateCodeOptions()}
            value={selectedCode}
            containerStyle={styles.dropdownContainer}
            dropdownPosition={-4} // Adjust as needed
            onChange={(value) => setselectedCode(value)}
            itemTextStyle={{color:COLORS.Black}}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location</Text>
          <View row align="right" spacing={4}>
            <CheckBox title="All"
              checked={checked}
              onPress={toggleCheckbox}
             />
          </View>
          <View style={styles.chipsContainer}>
            {LocationD.map((location,index) => (
              <React.Fragment key={index}>
                <Chip
                containerStyle={styles.Schip}
                key={location.code}
                type={locationChip.includes(location.code) ? 'solid' : 'outline'}
                onPress={() => togglestatusChip(location)}>
                <Text style={styles.ChipWord}>{location.reason}</Text>
                </Chip>
                </React.Fragment>
            ))}
            </View>
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
                        if (selectedCode === '')
                        {
                          setAlertMessageBlank('Please Select an Code');
                          setShowAlertBlank(true);
                        }
                        else if (locationChip.length <= 0)
                        {
                          setAlertMessageBlank('Please Choose a Location');
                          setShowAlertBlank(true);
                        }
                        else
                        {
                          consignmentSRPdf(type,Fdate,Tdate,locationChip,selectedCode);
                        }
                        
                      }
                    }
            >
            <Icon name="checkmark-sharp" size={20} color="white" style={{ marginRight: 5 }} />
            <Text style={styles.buttonTextA}>Apply</Text>
          </TouchableOpacity>
        </View>
        <CustomAlert
            visible={showAlertBlank}
            message={alertMessageBlank}
            onClose={() => setShowAlertBlank(false)}
            icon="warning"
            Ccolor="red"
          />
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
    paddingBottom:10,
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

export default withAuth(ConsignSRFilter);
