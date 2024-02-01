import React, { useContext, useState, useRef } from 'react';
import Pdf from 'react-native-pdf';
import { View, Text, StyleSheet, TouchableOpacity ,Modal,FlatList,TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/themes';
import Spinner from 'react-native-loading-spinner-overlay';
import PublicHeader from '../components/PublicHeader';
import {DisplayFunc} from '../context/DisplayFunc';
import withAuth from '../withAuth';
import { Tab, TabView,Overlay,Divider} from '@rneui/themed';

const DisplayGRNPdf = ({route,navigation}) => {
    const {isLoading, handleDownload} = useContext(DisplayFunc);
    //const { refNo } = route.params;
    const refNo = route.params?.refno || '';
    const typeName = route.params?.typeName || '';
    const file_path = route.params?.file_path || '';
    const file_name = route.params?.PdfData.file_name || '';
    const file_nameGRDA = route.params?.PdfData.grda_filename || '';
    const status = route.params?.status || '';
    const [index, setIndex] = React.useState(0);
    const [indexM, setIndexM] = React.useState(0);
    const [indexMGRDA, setIndexMGRDA] = React.useState(0);
    const [isVisibleModal, setisVisibleModal] = useState(false);
    const [isVisibleModalNetUnit, setisVisibleModalNetUnit] = useState(false);
    const GRDA_FName = file_nameGRDA.split("/").pop();
    const flatListRef = useRef();
    const itemList = route.params?.PdfData.rb_child || [];
    const keyExtractor = (item, index) => index.toString();

    const source = {uri:'https://www.africau.edu/images/default/sample.pdf'};
    const sourceGRDA = {uri:'https://www.africau.edu/images/default/sample.pdf'};
    //const source = { uri: `https://tunasmanja.xbridge.my/index.php/B2b_gr/gr_report?refno=${refNo}`};
    //const sourceGRDA = { uri: `https://tunasmanja.xbridge.my/index.php/B2b_gr/grda_report?refno=${refNo}`};

    const renderItem = ({ item, index }) => (
      <TouchableOpacity
              key={index}
              style={styles.item}
              disabled
            >
              <View style={styles.ItemdetailsContainer}>
                <View><Text style={styles.itemTitle}>{item.description || 'N/A'}</Text></View>
                <View style={{flexDirection:'row',}}>
                  <Text style={styles.blueLabel}>Itemcode# /Barcode </Text>
                  <Text style={styles.label}>{item.itemcode || 'N/A'} / {item.barcode || 'N/A'}</Text>
                </View>

                <View style={styles.middle}>
                  <Text style={styles.label}>PS / Ctn Qty: </Text>
                  <Text style={styles.label}>{item.ps || 'N/A'}</Text>
                </View>

                <View style={[styles.last,{flexDirection:'row', alignContent:'center'}]}>
                  <Text style={styles.label}>Net Unit Price: </Text>
                  <TouchableOpacity style={{position:'absolute',left:'26%'}} onPress={() => {
                      setisVisibleModalNetUnit(true);
                    }}>
                    <Icon name="information-circle-outline" size={20} color='black'/>
                  </TouchableOpacity>
                  <Text style={{color:'black', fontSize:FONTSIZE.size_14, fontWeight:'bold'}}>RM {parseFloat(item.netunitprice).toFixed(2) || 'N/A'}</Text>
                </View>

                <View style={styles.middle}>
                  <Text style={styles.label}>Received Quantity: </Text>
                  <Text style={styles.label}>{item.qty || 'N/A'} EA</Text>
                </View>

                <View style={styles.middle}>
                  <Text style={styles.label}>Invoice Quantity: </Text>
                  <Text style={styles.label}>{item.inv_qty || 'N/A'} EA</Text>
                </View>

                <View style={styles.last}>
                  <Text style={styles.label}>Invoice Unit Cost: </Text>
                  <Text style={{color:'black', fontSize:FONTSIZE.size_14, fontWeight:'bold'}}>RM {parseFloat(item.inv_unitprice).toFixed(2) || 'N/A'}</Text>
                </View>

                <View style={styles.last}>
                  <Text style={styles.label}>Total Amount Excl Tax: </Text>
                  <Text style={{color:'black', fontSize:FONTSIZE.size_14, fontWeight:'bold'}}>RM {parseFloat(item.totalprice).toFixed(2) || 'N/A'}</Text>
                </View>

                <View style={styles.last}>
                  <Text style={styles.label}>Tax: </Text>
                  <Text>{item.gst_tax_amount || 'N/A'}</Text>

                </View>
                  <Divider width={1.5} color={COLORS.LightGrey} style={{marginVertical:3,width:'100%'}}/>
                <View style={styles.last}>
                  <Text style={styles.label}>Total Amount Incl Tax: </Text>
                  <Text style={{color:'black', fontSize:FONTSIZE.size_14, fontWeight:'bold'}}>RM {parseFloat(item.totalprice).toFixed(2) || 'N/A'}</Text>
                </View>
                <Overlay
                isVisible={isVisibleModalNetUnit}
                onBackdropPress={setisVisibleModalNetUnit}
              >
              <View style={styles.NetUnitContent}>
                  <Text style={{color:'black', fontSize:FONTSIZE.size_18, fontWeight:'bold',textAlign:'center'}}>Net Unit Price Info</Text>
                  <Divider width={1} color='grey' style={{ marginVertical: 10 }} />
                  <View style={styles.last}>
                    <Text style={styles.label}>Unit Price Before Disc: </Text>
                    <Text style={styles.label}>RM {parseFloat(item.unitprice).toFixed(2) || 'N/A'}</Text>
                  </View>
                  <View style={styles.last}>
                    <Text style={styles.label}>Item Discount Amount: </Text>
                    <Text style={styles.label}>RM {parseFloat(item.discamt).toFixed(2) || 'N/A'}</Text>
                  </View>
                  <View style={styles.last}>
                    <Text style={styles.label}>Total Bill Disc Prorated Disc: </Text>
                    <Text style={styles.label}>RM {parseFloat(item.unit_disc_prorate).toFixed(2) || 'N/A'}</Text>
                  </View>
                  <Divider width={1} color='grey' style={{ marginVertical: 10 }} />
                  <View style={styles.last}>
                    <Text style={styles.label}>Unit Price After Disc: </Text>
                    <Text style={styles.label}>RM {parseFloat(item.netunitprice).toFixed(2) || 'N/A'}</Text>
                  </View>
              </View>
              </Overlay>
              </View>

            </TouchableOpacity>

    );

      return (
        <View style={styles.container}>
          <Spinner visible={isLoading} />
          <PublicHeader title={`${typeName}: ${refNo}`} />
          {(file_nameGRDA !== '') ? (
            <>
            <Tab
              value={index}
              onChange={(e) => setIndex(e)}
              indicatorStyle={{
                backgroundColor: 'white',
                height: 3,
              }}
              variant="primary"
            >
              <Tab.Item
                title="GRN"
                titleStyle={{ fontSize: 14, fontWeight:'bold'  }}
              />
              <Tab.Item
                title="GRDA"
                titleStyle={{ fontSize: 14, fontWeight:'bold' }}
              />
            </Tab>
            <TabView value={index} onChange={setIndex} animationType="spring">
              <TabView.Item style={{ backgroundColor:COLORS.LightGrey, width: '100%' }}>
              <>
              <View style={styles.container2}>
                {(status === 'NEW' || status === 'Viewed' || status === 'Printed' || status === '') && (
                  <>
                    <TouchableOpacity style={[styles.TopBtn,{backgroundColor:COLORS.Blue}]} onPress={() => { setisVisibleModal(true);}}>
                      <Icon name="pencil" size={25} color={COLORS.White} />
                      <Text style={styles.buttonText}>Generate E-Invoice</Text>
                    </TouchableOpacity>
                  </>
                )}

                {(status === 'Invoice Generated' || status === 'Confirmed') && (
                  <>
                  <TouchableOpacity style={[styles.TopBtn,{backgroundColor:COLORS.Blue}]} onPress={() => { }}>
                      <Icon name="information-circle" size={25} color={COLORS.White} />
                      <Text style={styles.buttonText}>Info</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.TopBtn,{backgroundColor:COLORS.Green}]} onPress={() => { }}>
                      <Icon name="folder" size={25} color={COLORS.White} />
                      <Text style={styles.buttonText}>View E-Invoice</Text>
                    </TouchableOpacity>
                  </>
                )}

                <TouchableOpacity style={styles.DownloadBtn} onPress={() => { handleDownload(source, file_name); }}>
                  <Icon name="download" size={25} color={COLORS.White} />
                </TouchableOpacity>
              </View>
              <Pdf
                trustAllCerts={false}
                source={source}
                onLoadComplete={(numberOfPages, filePath) => {
                  console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                  console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                  console.log(error);
                }}
                onPressLink={(uri) => {
                  console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf} />
              </>
              </TabView.Item>

              <TabView.Item style={{ backgroundColor:COLORS.LightGrey, width: '100%' }}>
                <>
                <View style={styles.container2}>
                  {(status === 'NEW' || status === 'Viewed' || status === 'Printed' || status === '') && (
                    <>
                      <TouchableOpacity style={[styles.TopBtn,{backgroundColor:COLORS.Blue}]} onPress={() => { }}>
                        <Icon name="pencil" size={25} color={COLORS.White} />
                        <Text style={styles.buttonText}>Generate E-Invoice</Text>
                      </TouchableOpacity>
                    </>
                  )}

                  {(status === 'Invoice Generated' || status === 'Confirmed') && (
                    <>
                    <TouchableOpacity style={[styles.TopBtn,{backgroundColor:COLORS.Blue}]} onPress={() => { }}>
                        <Icon name="information-circle" size={25} color={COLORS.White} />
                        <Text style={styles.buttonText}>Info</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={[styles.TopBtn,{backgroundColor:COLORS.Green}]} onPress={() => { }}>
                        <Icon name="folder" size={25} color={COLORS.White} />
                        <Text style={styles.buttonText}>View E-Invoice</Text>
                      </TouchableOpacity>
                    </>
                  )}

                  <TouchableOpacity style={styles.DownloadBtn} onPress={() => { handleDownload(source, file_nameGRDA); }}>
                    <Icon name="download" size={25} color={COLORS.White} />
                  </TouchableOpacity>
                </View>
                <Pdf
                  trustAllCerts={false}
                  source={sourceGRDA}
                  onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                  }}
                  onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                  }}
                  onError={(error) => {
                    console.log(error);
                  }}
                  onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                  }}
                  style={styles.pdf} />
                </>
              </TabView.Item>
            </TabView>
            </>
          ) :

          (
          <>
          <View style={styles.container2}>
            {(status === 'NEW' || status === 'Viewed' || status === 'Printed' || status === '') && (
              <>
                <TouchableOpacity style={[styles.TopBtn,{backgroundColor:COLORS.Blue}]} onPress={() => { setisVisibleModal(true); }}>
                  <Icon name="pencil" size={25} color={COLORS.White} />
                  <Text style={styles.buttonText}>Generate E-Invoice</Text>
                </TouchableOpacity>
              </>
            )}

            {(status === 'Invoice Generated' || status === 'Confirmed') && (
              <>
              <TouchableOpacity style={[styles.TopBtn,{backgroundColor:COLORS.Blue}]} onPress={() => { }}>
                  <Icon name="information-circle" size={25} color={COLORS.White} />
                  <Text style={styles.buttonText}>Info</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.TopBtn,{backgroundColor:COLORS.Green}]} onPress={() => { }}>
                  <Icon name="folder" size={25} color={COLORS.White} />
                  <Text style={styles.buttonText}>View E-Invoice</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity style={styles.DownloadBtn} onPress={() => { handleDownload(source, file_name); }}>
              <Icon name="download" size={25} color={COLORS.White} />
            </TouchableOpacity>
          </View>
          <Pdf
            trustAllCerts={false}
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf} />
          </>
          )}

          <Modal visible={isVisibleModal} transparent animationType="slide">
          <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => {
                    setisVisibleModal(false);
                    }}
                    style={styles.backbutton}>
                <Icon name="arrow-down" size={23} color="white" />
              </TouchableOpacity>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Generate E-Invoice</Text>
              </View>
            </View>
              <Tab
                value={indexM}
                onChange={(e) => setIndexM(e)}
                indicatorStyle={{
                  backgroundColor: 'white',
                  height: 3,
              }}
              variant="primary"
              >
              <Tab.Item
                title="Item Detail"
                titleStyle={{ fontSize: 14, fontWeight:'bold'  }}
              />
              <Tab.Item
                title="Generate E Invoice"
                titleStyle={{ fontSize: 14, fontWeight:'bold' }}
              />
            </Tab>
            <TabView value={indexM} onChange={setIndexM} animationType="spring">
              <TabView.Item style={{ backgroundColor:COLORS.White, width: '100%' }}>
                <View style={styles.detailsContainer}>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={()=>{ }} style={styles.cancelButton}>
                      <Icon name="arrow-forward" size={23} color='white'style={{paddingRight:10,}} />
                      <Text style={styles.buttonText}>To Generate E-Invoice</Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    ref={flatListRef}
                    data={itemList}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                  />
                </View>
              </TabView.Item>

              <TabView.Item style={{ backgroundColor:COLORS.White, width: '100%' }}>
              
              </TabView.Item>
            </TabView>
          </View>
          </View>
          </Modal>

          
        </View>
      );
    };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:COLORS.LightGrey,
    },
    container2: {
        backgroundColor:COLORS.Grey,
        height:60,
        flexDirection: 'row',
        padding:5,
        alignItems: 'center',
    },
    pdf: {
        flex:1,
    },
    TopBtn:{
        padding: 5,
        margin:5,
        borderRadius: 8,
        height:40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    DownloadBtn:{
        backgroundColor: COLORS.LightGrey,
        padding: 5,
        borderRadius: 8,
        width:40,
        height:40,
        position:'absolute',
        right:0,
        margin:5,
        alignItems: 'center',
    },
    buttonText:{
        fontSize:FONTSIZE.size_14,
        fontFamily:FONTFAMILY.poppins_extrabold,
        color: COLORS.White,
        fontWeight: 'bold',
        padding:3,
    },
    header: { //header
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
      fontWeight:'bold',
    },
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      paddingTop:30,
      flex:1,
    },
    modalContent: {
      backgroundColor: COLORS.White,
      width:'100%',
      height:'100%',
      paddingBottom:35,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom:3,
    },
    confirmButton: {
      backgroundColor: COLORS.Green,
      padding: 10,
      borderRadius: 8,
      width:'30%',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
    },
    cancelButton: {
      backgroundColor: COLORS.Blue,
      padding: 10,
      borderRadius: 8,
      width:'100%',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
    },
    input:{
      borderWidth:1,
      borderRadius:10,
      backgroundColor:'#dedee0',
      borderColor:COLORS.LightGrey,
      height:50,
      width:'100%',
      marginVertical:5,
      color:'#73737a',
      paddingLeft:10,
    },
    label: {
      fontSize:FONTSIZE.size_14,
      color:COLORS.Black,
    },
    detailsContainer:{
      padding:10,
    },
    item: {
      borderWidth:1,
      borderColor:COLORS.WhiteRGBA15,
      elevation: 2,
      shadowColor: COLORS.Black,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: COLORS.White,
      borderRadius: 10,
      margin: 10,
      padding: 10,
    },
    itemTitle: {
      fontWeight: 'bold',
      fontSize:FONTSIZE.size_14,
      color:COLORS.Black,
    },
    blueLabel:{
      color:COLORS.Blue,
      fontSize:FONTSIZE.size_14,
    },
    ItemdetailsContainer:{
      width:'100%',
    },
    middle:{
      flexDirection:'row',
      justifyContent:'space-between',
      width:'50%',
    },
    last:{
      flexDirection:'row',
      justifyContent:'space-between',
      width:'100%',
    },
    NetUnitContent:{
      backgroundColor: COLORS.White,
      width:'80%',
      padding:8,
    },
});

export default withAuth(DisplayGRNPdf);


