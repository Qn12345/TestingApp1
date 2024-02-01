// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PushNotification from 'react-native-push-notification';

import {AuthProvider} from './src/screens/context/AuthContext';
import {BasicProvider} from './src/screens/context/BasicFunc';
import { DisplayProvider } from './src/screens/context/DisplayFunc';
import { PdfActionProvider } from './src/screens/context/PdfAction';
import { GeneralProvider } from './src/screens/context/GeneralFunc';
import { ContactFuncProvider } from './src/screens/context/ContactFunc';
import withAuth from './src/screens/withAuth';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import OutletSelectionScreen from './src/screens/OutletSelection';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import ContactScreen from './src/screens/ContactScreen';
import SplashScreen from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import PoScreen from './src/screens/Po/PoScreen';
import NoDataScreen from './src/screens/NoData/NoDataScreen';
import GRNScreen from './src/screens/GRN/GRNScreen';
import GRDAScreen from './src/screens/GRDA/GRDAScreen';
import PCIScreen from './src/screens/PCI/PCIScreen';
import DIScreen from './src/screens/DI/DIScreen';
import PRDNCNScreen from './src/screens/PRDNCN/PRDNCNScreen';
import PDNCNScreen from './src/screens/PDNCN/PDNCNScreen';
import TriggerScreen from './src/screens/Trigger/TriggerScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import B2BReminderScreen from './src/screens/B2BReminder/B2BReminderScreen';
import B2BReminderRetailer from './src/screens/B2BReminder/B2BReminderRetailer';

import PoFilterScreen from './src/screens/Po/PoFilterScreen';
import GRNFilterScreen from './src/screens/GRN/GRNFilterScreen';
import GRDAFilterScreen from './src/screens/GRDA/GRDAFilterScreen';
import PRDNCNFilterScreen from './src/screens/PRDNCN/PRDNCNFilterScreen';
import PDNCNFilterScreen from './src/screens/PDNCN/PDNCNFilterScreen';
import PCIFilterScreen from './src/screens/PCI/PCIFilterScreen';
import DIFilterScreen from './src/screens/DI/DIFilterScreen';

import DisplayPoPdf from './src/screens/Po/DisplayPoPdf';
import DisplayGRNPdf from './src/screens/GRN/DisplayGRNPdf';
import DisplayGRDAPdf from './src/screens/GRDA/DisplayGRDAPdf';
import DisplayPRDNCNPdf from './src/screens/PRDNCN/DisplayPRDNCNPdf';
import DisplayPDNCNPdf from './src/screens/PDNCN/DisplayPDNCNPdf';
import DisplayPCIPdf from './src/screens/PCI/DisplayPCIPdf';
import DisplayDIPdf from './src/screens/DI/DisplayDIPdf';

PushNotification.createChannel(
  {
    channelId: 'tmgb2b', // Choose a unique channel ID
    channelName: 'Default Channel',
    channelDescription: 'A default notification channel',
  },
);


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
    <BasicProvider>
      <AuthProvider>
        <DisplayProvider>
        <PdfActionProvider>
        <GeneralProvider>
        <ContactFuncProvider>
          <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="SplashScreen">
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="WelcomeScreen" component={withAuth(WelcomeScreen)} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="OutletSelectionScreen" component={withAuth(OutletSelectionScreen)} />
            <Stack.Screen name="ChangePasswordScreen" component={withAuth(ChangePasswordScreen)} />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
            <Stack.Screen name="ContactScreen" component={withAuth(ContactScreen)} />
            <Stack.Screen name="HomeScreen" component={withAuth(HomeScreen)} />
            <Stack.Screen name="NoDataScreen" component={withAuth(NoDataScreen)} />
            <Stack.Screen name="PoScreen" component={withAuth(PoScreen)} />
            <Stack.Screen name="GRNScreen" component={withAuth(GRNScreen)} />
            <Stack.Screen name="PCIScreen" component={withAuth(PCIScreen)} />
            <Stack.Screen name="DIScreen" component={withAuth(DIScreen)} />
            <Stack.Screen name="DisplayPoPdf" component={withAuth(DisplayPoPdf)} />
            <Stack.Screen name="GRDAScreen" component={withAuth(GRDAScreen)} />
            <Stack.Screen name="PRDNCNScreen" component={withAuth(PRDNCNScreen)} />
            <Stack.Screen name="PDNCNScreen" component={withAuth(PDNCNScreen)} />
            <Stack.Screen name="TriggerScreen" component={withAuth(TriggerScreen)} />
            <Stack.Screen name="PoFilterScreen" component={withAuth(PoFilterScreen)} />
            <Stack.Screen name="GRNFilterScreen" component={withAuth(GRNFilterScreen)} />
            <Stack.Screen name="GRDAFilterScreen" component={withAuth(GRDAFilterScreen)} />
            <Stack.Screen name="PRDNCNFilterScreen" component={withAuth(PRDNCNFilterScreen)} />
            <Stack.Screen name="PDNCNFilterScreen" component={withAuth(PDNCNFilterScreen)} />
            <Stack.Screen name="PCIFilterScreen" component={withAuth(PCIFilterScreen)} />
            <Stack.Screen name="DIFilterScreen" component={withAuth(DIFilterScreen)} />
            <Stack.Screen name="B2BReminderScreen" component={withAuth(B2BReminderScreen)} />
            <Stack.Screen name="B2BReminderRetailer" component={withAuth(B2BReminderRetailer)} />
            <Stack.Screen name="DisplayGRNPdf" component={withAuth(DisplayGRNPdf)} />
            <Stack.Screen name="DisplayGRDAPdf" component={withAuth(DisplayGRDAPdf)} />
            <Stack.Screen name="DisplayPRDNCNPdf" component={withAuth(DisplayPRDNCNPdf)} />
            <Stack.Screen name="DisplayPDNCNPdf" component={withAuth(DisplayPDNCNPdf)} />
            <Stack.Screen name="DisplayPCIPdf" component={withAuth(DisplayPCIPdf)} />
            <Stack.Screen name="DisplayDIPdf" component={withAuth(DisplayDIPdf)} />
          </Stack.Navigator>
          </ContactFuncProvider>
          </GeneralProvider>
          </PdfActionProvider>
        </DisplayProvider>
      </AuthProvider>
      </BasicProvider>
    </NavigationContainer>
  );
}

export default App;
