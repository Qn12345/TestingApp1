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
import { GRNProvider } from './src/screens/GRN/GRNFunc';
import withAuth from './src/screens/withAuth';
import { TicketProvider } from './src/screens/tickets/TicketFunc';
import { ConsignProvider } from './src/screens/Consignment/ConsignFunc';

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
import OpenTicketScreen from './src/screens/tickets/OpenTicketScreen';
import ConsignmentDashboard from './src/screens/Consignment/ConsignmentDashboard';

import PoFilterScreen from './src/screens/Po/PoFilterScreen';
import GRNFilterScreen from './src/screens/GRN/GRNFilterScreen';
import GRDAFilterScreen from './src/screens/GRDA/GRDAFilterScreen';
import PRDNCNFilterScreen from './src/screens/PRDNCN/PRDNCNFilterScreen';
import PDNCNFilterScreen from './src/screens/PDNCN/PDNCNFilterScreen';
import PCIFilterScreen from './src/screens/PCI/PCIFilterScreen';
import DIFilterScreen from './src/screens/DI/DIFilterScreen';
import ConsignSRFilter from './src/screens/Consignment/ConsignSRFilter';

import DisplayPoPdf from './src/screens/Po/DisplayPoPdf';
import DisplayGRNPdf from './src/screens/GRN/DisplayGRNPdf';
import DisplayGRDAPdf from './src/screens/GRDA/DisplayGRDAPdf';
import DisplayPRDNCNPdf from './src/screens/PRDNCN/DisplayPRDNCNPdf';
import DisplayPDNCNPdf from './src/screens/PDNCN/DisplayPDNCNPdf';
import DisplayPCIPdf from './src/screens/PCI/DisplayPCIPdf';
import DisplayDIPdf from './src/screens/DI/DisplayDIPdf';
import DisplayConsignPdf from './src/screens/Consignment/DisplayConsignPdf';
import DisplayEinvPdf from './src/screens/GRN/DisplayEinvPdf';
import DisplayEcnPdf from './src/screens/GRN/DisplayEcnPdf';
import ConsignStatement from './src/screens/Consignment/ConsignStatement';
import ConsignStatementFilter from './src/screens/Consignment/ConsignStatementFilter';
import ConsignSSListScreen from './src/screens/Consignment/ConsignSSListScreen';
import ConsignSSListPdf from './src/screens/Consignment/ConsignSSListPdf';
import AccountingDocDashboard from './src/screens/AccountingDocuments/AccountingDocDashboard';
import { AccDocFuncProvider } from './src/screens/AccountingDocuments/AccDocFunc';
import PaymentVoucher from './src/screens/AccountingDocuments/PaymentVoucher';
import PVVFilter from './src/screens/AccountingDocuments/PVVFilter';
import DisplayPvvPdf from './src/screens/AccountingDocuments/DisplayPvvPdf';
import APCreditNote from './src/screens/AccountingDocuments/APCreditNote';
import BillingDashboard from './src/screens/Billing/BillingDashboard';
import { BillingFuncProvider } from './src/screens/Billing/BillingFunc';
import Invoices from './src/screens/Billing/Invoices';
import InvoiceFilter from './src/screens/Billing/InvoiceFilter';
import DisplayInvPdf from './src/screens/Billing/DisplayInvPdf';
import DisplayViewSlipPdf from './src/screens/Billing/DisplayViewSlipPdf';
import RegistrationDashboard from './src/screens/RegistredDashboard/RegistrationDashboard';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
    // <SafeAreaProvider>
    <NavigationContainer>
    <BasicProvider>
      <AuthProvider>
        <DisplayProvider>
        <PdfActionProvider>
        <GeneralProvider>
        <ContactFuncProvider>
        <TicketProvider>
        <GRNProvider>
        <ConsignProvider>
        <AccDocFuncProvider>
        <BillingFuncProvider>
          <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="SplashScreen">
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="WelcomeScreen" component={withAuth(WelcomeScreen)} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="OutletSelectionScreen" component={withAuth(OutletSelectionScreen)} />
            <Stack.Screen name="ChangePasswordScreen" component={withAuth(ChangePasswordScreen)} />
            <Stack.Screen name="OpenTicketScreen" component={withAuth(OpenTicketScreen)} />
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
            <Stack.Screen name="ConsignSRFilter" component={withAuth(ConsignSRFilter)} />
            <Stack.Screen name="ConsignStatementFilter" component={withAuth(ConsignStatementFilter)} />
            <Stack.Screen name="ConsignmentDashboard" component={withAuth(ConsignmentDashboard)} />
            <Stack.Screen name="ConsignStatement" component={withAuth(ConsignStatement)} />
            <Stack.Screen name="B2BReminderScreen" component={withAuth(B2BReminderScreen)} />
            <Stack.Screen name="B2BReminderRetailer" component={withAuth(B2BReminderRetailer)} />
            <Stack.Screen name="DisplayGRNPdf" component={withAuth(DisplayGRNPdf)} />
            <Stack.Screen name="DisplayGRDAPdf" component={withAuth(DisplayGRDAPdf)} />
            <Stack.Screen name="DisplayPRDNCNPdf" component={withAuth(DisplayPRDNCNPdf)} />
            <Stack.Screen name="DisplayPDNCNPdf" component={withAuth(DisplayPDNCNPdf)} />
            <Stack.Screen name="DisplayPCIPdf" component={withAuth(DisplayPCIPdf)} />
            <Stack.Screen name="DisplayDIPdf" component={withAuth(DisplayDIPdf)} />
            <Stack.Screen name="DisplayConsignPdf" component={withAuth(DisplayConsignPdf)} />
            <Stack.Screen name="DisplayEinvPdf" component={withAuth(DisplayEinvPdf)} />
            <Stack.Screen name="DisplayEcnPdf" component={withAuth(DisplayEcnPdf)} />
            <Stack.Screen name="ConsignSSListScreen" component={withAuth(ConsignSSListScreen)} />
            <Stack.Screen name="ConsignSSListPdf" component={withAuth(ConsignSSListPdf)} />
            <Stack.Screen name="AccountingDocDashboard" component={withAuth(AccountingDocDashboard)} />
            <Stack.Screen name="PaymentVoucher" component={withAuth(PaymentVoucher)} />
            <Stack.Screen name="PVVFilter" component={withAuth(PVVFilter)} />
            <Stack.Screen name="DisplayPvvPdf" component={withAuth(DisplayPvvPdf)} />
            <Stack.Screen name="APCreditNote" component={withAuth(APCreditNote)} />
            <Stack.Screen name="BillingDashboard" component={withAuth(BillingDashboard)} />
            <Stack.Screen name="Invoices" component={withAuth(Invoices)} />
            <Stack.Screen name="InvoiceFilter" component={withAuth(InvoiceFilter)} />
            <Stack.Screen name="DisplayInvPdf" component={withAuth(DisplayInvPdf)} />
            <Stack.Screen name="DisplayViewSlipPdf" component={withAuth(DisplayViewSlipPdf)} />
            <Stack.Screen name="RegistrationDashboard" component={withAuth(RegistrationDashboard)} />
          </Stack.Navigator>
          </BillingFuncProvider>
          </AccDocFuncProvider>
          </ConsignProvider>
          </GRNProvider>
          </TicketProvider>
          </ContactFuncProvider>
          </GeneralProvider>
          </PdfActionProvider>
        </DisplayProvider>
      </AuthProvider>
      </BasicProvider>
    </NavigationContainer>
    // </SafeAreaProvider>
  );
}

export default App;
