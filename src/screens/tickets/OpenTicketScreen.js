// Import necessary components and libraries
import React, { useContext, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput,TouchableOpacity,Platform, KeyboardAvoidingView, SafeAreaView,Linking } from 'react-native';
import { Divider,Overlay, Badge } from '@rneui/themed';
import { useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { COLORS, FONTSIZE,FONTFAMILY } from '../theme/themes';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import withAuth from '../withAuth';
import { BasicFunc } from '../context/BasicFunc';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { TicketFunc } from './TicketFunc';
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";
import {launchImageLibrary} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';

const OpenTicketScreen = ({ navigation }) => {
  const { isLoading } = useContext(BasicFunc);
  const {getOpenTicketSubTopic} = useContext(TicketFunc);
  const route = useRoute();
  const TicketTopic = route.params?.ticketTopicData || [];
  const TicketSupplier = route.params?.ticketSupplierData || [];
  const SubTopic = route.params?.SubticketTopicData || [];
  const [selectedOptionTopic, setselectedOptionTopic] = useState(null);
  const [selectedOptionSubTopic, setselectedOptionSubTopic] = useState(null);
  const [selectedOptionSupplier, setselectedOptionSupplier] = useState(null);
  const [MessageDetail, setMessageDetail] = useState(null);
  const [isVisibleModal, setisVisibleModal] = useState(false);
  const [isVisibleModalURL, setisVisibleModalURL] = useState(false);
  const [isVisibleAttachFile, setisVisibleAttachFile] = useState(false);
  const [UrlText, onChangeUrlText] = React.useState('');
  const [Url, onChangeUrl] = React.useState('');
  const [visibleWarning,setVisibleWarning] = useState('');
  const [fileResponse, setFileResponse] = useState([]);

  const generateTopicOptions = () => {
    const optionsTopic = []; // Initial value is set to null
    // Assuming OutletData is an array of objects with branch_name and branch_code properties
    TicketTopic.forEach((topic) => {
        optionsTopic.push({
        label: topic.name,
        value: topic.t_topic_guid,
      });
    });

    return optionsTopic;
  };

  const generateSubTopicOptions = () => {
    const optionsSubTopic = []; // Initial value is set to null
    // Assuming OutletData is an array of objects with branch_name and branch_code properties
    SubTopic.forEach((subtopic) => {
        optionsSubTopic.push({
        label: subtopic.name,
        value: subtopic.t_sub_topic_guid,
      });
    });

    return optionsSubTopic;
  };

  const generateSupplierOptions = () => {
    const optionsSupplier = []; // Initial value is set to null
    // Assuming OutletData is an array of objects with branch_name and branch_code properties
    TicketSupplier.forEach((supplier) => {
        optionsSupplier.push({
          label: supplier.supplier_name,
          value: supplier.supplier_guid,
        });
      });

    return optionsSupplier;
  };

  const isButtonDisabled = (selectedOptionTopic && selectedOptionSupplier && selectedOptionSubTopic) === null;
  const isButtonDisabledMessage = (selectedOptionTopic && selectedOptionSupplier && selectedOptionSubTopic && MessageDetail) === null;

  const richText = React.useRef();
  const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>;

  const onPressAddImage = useCallback(() => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 2000,
            maxWidth: 2000,
          };
      
          launchImageLibrary(options, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('Image picker error: ', response.error);
            } else {
              //console.log(response.assets?.[0]?.uri);
              //console.log(response.assets?.[0]?.type);
                RNFetchBlob.fs.readFile(response.assets?.[0]?.uri, 'base64')
                .then((data) => {
                    richText.current?.insertImage(`data:${response.assets?.[0]?.type};base64,${data}`);
                });
            }
          });
  }, []);

  const onInsertLink = useCallback(() => {
    setisVisibleModalURL(true);
  }, []);

  const onLinkDone = useCallback((title, url) => {
    if (title && url) {
      richText.current?.insertLink(title, url);
      onChangeUrl('');
      onChangeUrlText('');
      setisVisibleModalURL(false);
    }
    else if (title === ''|| title === undefined){
      richText.current?.insertLink(url, url);
      onChangeUrl('');
      onChangeUrlText('');
      setisVisibleModalURL(false);
    };
  }, []);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
      });
      setFileResponse(prevFiles => [...prevFiles, ...response]);
    } catch (err) {
      console.warn(err);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteFile = (index) => {
    setFileResponse(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
                navigation.goBack();
                }}
                style={styles.backbutton}>
            <Icon name="close" size={25} color="white" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Open Ticket</Text>
        </View>
        <TouchableOpacity onPress={() => {
                setisVisibleAttachFile(true);
                }}
                style={{margin:5}}>
            <Icon name="attach" size={30} color="white" />
            {(fileResponse.length > 0) && (
                <Badge
                status="warning"
                value={fileResponse.length}
                containerStyle={{ position: 'absolute', top: -2, left: 15 }}
            />
            )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
                //navigation.goBack();
                }}
                style={{margin:5}}>
            <Fontisto name="preview" size={23} color="white" />
        </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
            <ProgressSteps>
                <ProgressStep nextBtnTextStyle={styles.NextButton} previousBtnTextStyle={styles.NextButton} nextBtnDisabled={isButtonDisabled}>
                    <View>
                    <ScrollView style={styles.scroll}>
                        <View style={styles.CreateTicket}>
                            <Icon name="ticket" size={25} color="black" />
                            <Text style={styles.titleCreate}>Create Ticket</Text>
                            <TouchableOpacity onPress={() => { setisVisibleModal(true); }}>
                                <Icon name="information-circle-outline" size={25} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomContainer}>
                            <Text style={{ color:'black' }}>Retail <Text style={{ color:'red' }}>*</Text></Text>
                            <TextInput
                            style={styles.retail}
                            value={'TUNAS MANJA SDN BHD'}
                            editable={false}
                            />

                            <Text style={{ color:'black' }}>Supplier <Text style={{ color:'red' }}>*</Text></Text>
                            <Dropdown
                            style={styles.chooseOption}
                            placeholderStyle={styles.chooseOptionWord}
                            selectedTextStyle={styles.chooseOptionWord}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select an Supplier'}
                            data={generateSupplierOptions()}
                            value={selectedOptionSupplier}
                            containerStyle={styles.containerOutlet}
                            onChange={(value) => setselectedOptionSupplier(value)}
                            itemTextStyle={{color:COLORS.Black}}
                            />

                            <Text style={{ color:'black' }}>Category <Text style={{ color:'red' }}>*</Text></Text>
                            <Dropdown
                            style={styles.chooseOption}
                            placeholderStyle={styles.chooseOptionWord}
                            selectedTextStyle={styles.chooseOptionWord}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select an Category'}
                            data={generateTopicOptions()}
                            value={selectedOptionTopic}
                            containerStyle={styles.containerOutlet}
                            onChange={(value) => {setselectedOptionTopic(value); getOpenTicketSubTopic(value.value);}}
                            itemTextStyle={{color:COLORS.Black}}
                            />

                            <Text style={{ color:'black' }}>Sub Category <Text style={{ color:'red' }}>*</Text></Text>
                            <Dropdown
                            style={styles.chooseOption}
                            placeholderStyle={styles.chooseOptionWord}
                            selectedTextStyle={styles.chooseOptionWord}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select an Sub Category'}
                            data={generateSubTopicOptions()}
                            value={selectedOptionSubTopic}
                            containerStyle={styles.containerOutlet}
                            onChange={(value) => setselectedOptionSubTopic(value)}
                            itemTextStyle={{color:COLORS.Black}}
                            />
                        </View>
                    </ScrollView>
                    </View>
                </ProgressStep>
                <ProgressStep nextBtnTextStyle={styles.NextButton} previousBtnTextStyle={styles.NextButton} nextBtnDisabled={isButtonDisabledMessage}>
                    <View style={{ alignItems: 'center'}}>
                    <SafeAreaView style={{width:'100%',padding:10,}}>
                    <ScrollView>
                        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}	style={{ flex: 1}}>
                        <Text style={{ color:'black' }}>Message: <Text style={{ color:'red' }}>*</Text></Text>
                        <Divider width={1} style={{paddingVertical:10}}/>
                        <RichEditor
                            initialHeight={180}
                            ref={richText}
                            onLink={url => {
                                Linking.openURL(url);
                            }}
                            onChange={ descriptionText => {
                                setMessageDetail(descriptionText);
                            }}
                        />
                        </KeyboardAvoidingView>
                    </ScrollView>

                    <RichToolbar
                        selectedIconTint={'#2095F2'}
                        disabledIconTint={'#bfbfbf'}
                        editor={richText}
                        onPressAddImage={onPressAddImage}
                        onInsertLink={onInsertLink}
                        actions={[ actions.setBold, actions.setItalic,
                                   actions.setUnderline, actions.heading1,
                                   actions.insertBulletsList,
		                           actions.insertOrderedList,
                                   actions.insertLink,
                                   actions.alignLeft,
                                   actions.alignCenter,
                                   actions.alignRight,
		                           actions.insertImage]}
                        iconMap={{ [actions.heading1]: handleHead }}
                    />
                    </SafeAreaView>
                    <Overlay
                        isVisible={isVisibleModalURL}
                        onBackdropPress={() => setisVisibleModalURL(false)}
                        >
                        <View style={[styles.InformationDetails,{width:'90%'}]}>
                                <Text style={{color:COLORS.Black,fontSize:FONTSIZE.size_18,padding:5,fontWeight:'bold'}}>
                                    Insert Link
                                </Text>
                                <Text style={{color:COLORS.Black,fontSize:FONTSIZE.size_16,padding:5}}>
                                    Text to Display
                                </Text>
                                <TextInput
                                style={styles.URLText}
                                onChangeText={onChangeUrlText}
                                value={UrlText}
                                placeholder="Text"
                                placeholderTextColor={COLORS.LightGrey}
                                editable={true}
                                />
                                <Text style={{color:COLORS.Black,fontSize:FONTSIZE.size_16,padding:5}}>
                                    URL
                                </Text>
                                <TextInput
                                style={styles.URLText}
                                onChangeText={onChangeUrl}
                                value={Url}
                                placeholder="URL"
                                placeholderTextColor={COLORS.LightGrey}
                                editable={true}
                                />
                                {visibleWarning ? <Text style={{color:COLORS.Red,fontSize:14}}>{visibleWarning}</Text> : null}
                                <View style={{flexDirection:'row',justifyContent:'space-between',padding:10,alignItems:'center',marginVertical:10,}}>
                                <TouchableOpacity style={{width:60}} onPress={() => setisVisibleModalURL(false)} >
                                    <Text style={{color:COLORS.Grey,fontWeight:'bold'}}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{width:50}} onPress={() => {if(!Url.trim()){setVisibleWarning('Please enter URL.'); return;} setVisibleWarning(''); onLinkDone(UrlText,Url);}} >
                                    <Text style={{color:COLORS.Grey,fontWeight:'bold'}}>OK</Text>
                                </TouchableOpacity>
                                </View>
                        </View>
                    </Overlay>
                    </View>
                </ProgressStep>
            </ProgressSteps>
        </View>
        <Overlay
          isVisible={isVisibleModal}
          onBackdropPress={() => setisVisibleModal(false)}
          >
          <View style={styles.InformationDetails}>
                <Text style={{color:COLORS.Black,fontSize:FONTSIZE.size_18,padding:5}}>
                    In order for us to serve you better, there is where you can directly contact us about the issue you had faced.
                </Text>
                <Text style={{color:COLORS.Black,fontSize:FONTSIZE.size_18,padding:5}}>
                    If you can't find any category that is related to your issue, kindly let us know.
                    Thanks for cooperation.
                </Text>
                <Text style={{color:COLORS.Black,fontSize:FONTSIZE.size_18,padding:5}}>
                    Thanks for cooperation.
                </Text>
                <TouchableOpacity onPress={() => setisVisibleModal(false)} >
                    <View style={{width:'100%',backgroundColor:COLORS.Red, flexDirection:'row',
                            justifyContent:'center',borderRadius:10,padding:10,alignItems:'center',marginVertical:10,}}>
                    <Icon name="close" size={25} color="white" />
                    <Text style={{color:COLORS.White,fontWeight:'bold'}}>CLOSE</Text>
                    </View>
                    
                </TouchableOpacity>
          </View>
        </Overlay>
        <Overlay
          isVisible={isVisibleAttachFile}
          overlayStyle={styles.overlay}
          animationType='slide'
          >
          <View>
            <View style={styles.header}>
            <TouchableOpacity onPress={() => {
                    setisVisibleAttachFile(false);
                    }}
                    style={styles.backbutton}>
                <Icon name="arrow-down" size={25} color="white" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Attached Files</Text>
            </View>
            </View>
            <View style={styles.AttachFileModalContainer}>
            <ScrollView>
                {(fileResponse.length <= 0 ) ? (
                    <View style={styles.NoData}>
                        <Icon name="clipboard-outline" size={100} color='#bec1c4' />
                        <Text style={{color:'#999c9e',fontWeight:'bold',paddingVertical:20,fontSize:FONTSIZE.size_20}}>There is no attached files for this ticket. </Text>
                    </View>
                ) :
                    (fileResponse.map((file, index) => (
                        <React.Fragment key={index}>
                            <View style={styles.listContainer}>
                                <Icon name="folder-outline" size={25} color='#999c9e' />
                                <View style={{width:'70%'}}><Text style={{color:'black'}}>{file?.name}</Text></View>
                                <TouchableOpacity onPress={() => handleDeleteFile(index)}>
                                    <Icon name="trash" size={25} color='#999c9e' />
                                </TouchableOpacity>
                            </View>
                            <Divider key={`divider-${index}`} width={1} color='grey' style={{ marginVertical: 5 }} />
                        </React.Fragment>
                    ))
                )}
                
            </ScrollView>
            <TouchableOpacity onPress={() => { handleDocumentSelection(); }}>
                <View style={{backgroundColor:COLORS.LightGrey,
                    width:70,position:'absolute',right:30,bottom:80,
                    borderRadius:100,borderWidth:1,borderColor:COLORS.LightGrey,
                    padding:20,}}>
                <Icon name="add" size={28} color={COLORS.White}/>
                </View>
            </TouchableOpacity>
            </View>
          </View>
        </Overlay>
    </View>
  );
};


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    backgroundColor: COLORS.Blue, // Set the background color to blue
  },
  backbutton: {
    paddingRight: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: 'white', // Set text color to white
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  scroll: {
    flex: 1,
  },
  CreateTicket:{
    flexDirection:'row',
    alignItems:'center',
    marginVertical:20,
    marginLeft:10,
  },
  titleCreate: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    paddingRight:10,
  },
  chooseOption: {
    padding: 10,
    marginVertical:10,
    marginTop:10,
    borderColor:COLORS.LightGrey,
    borderWidth:2,
    borderRadius:10,
    color:COLORS.Black,
  },
  retail: {
    padding: 10,
    marginVertical:10,
    marginTop:10,
    borderColor:'#d4d4d9',
    borderWidth:2,
    borderRadius:10,
    color:'#8d8d91',
    backgroundColor:'#d4d4d9',
  },
  URLText: {
    padding: 10,
    marginVertical:10,
    marginTop:10,
    borderColor:'#d4d4d9',
    borderWidth:2,
    borderRadius:10,
    color:COLORS.Black,
    backgroundColor:COLORS.White,
    width:300,
  },
  containerOutlet:{
    borderColor:COLORS.LightGrey,
    borderWidth:1,
    borderRadius:10,
    padding:5,
    color:COLORS.Black,
  },
  chooseOptionWord:{
    color:COLORS.Black,
    padding:5,
  },
  NextButton:{
    fontWeight:'bold',
    fontSize:FONTSIZE.size_20,
  },
  bottomContainer:{
    padding:10,
  },
  InformationDetails:{
    padding:8,
    width:'80%',
  },
  AttachFileModalContainer:{
    backgroundColor:COLORS.White,
    height:'93%',
  },
  overlay:{
    width:'100%',
    height:'100%',
    padding:-10,
    position:'absolute',
    top:20,
  },
  NoData:{
    alignItems:'center',
    justifyContent:'center',
    marginTop:100,
  },
  listContainer:{
    flexDirection:'row',
    alignContent:'space-between',
    justifyContent:'space-between',
    padding:5,
    height:45,

  },
});

export default withAuth(OpenTicketScreen);
