// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddUserScreen from './src/screens/AddUserScreen';
import ViewUserScreen from './src/screens/ViewUserScreen';
import UpdateUserScreen from './src/screens/UpdateUserScreen';
import {AuthProvider} from './src/screens/context/AuthContext';
import {BasicProvider} from './src/screens/context/BasicFunc';
import FilterScreen from './src/screens/FilterScreen';
import PoScreen from './src/screens/Po/PoScreen';
import GRDAScreen from './src/screens/GRDA/GRDAScreen';
import TriggerScreen from './src/screens/Trigger/TriggerScreen';
import DisplayPoPdf from './src/screens/Po/DisplayPoPdf';
import { DisplayProvider } from './src/screens/context/DisplayFunc';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
    <BasicProvider>
      <AuthProvider>
        <DisplayProvider>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="AddUserScreen" component={AddUserScreen} />
            <Stack.Screen name="ViewUserScreen" component={ViewUserScreen} />
            <Stack.Screen name="PoScreen" component={PoScreen} />
            <Stack.Screen name="DisplayPoPdf" component={DisplayPoPdf} />
            <Stack.Screen name="GRDAScreen" component={GRDAScreen} />
            <Stack.Screen name="UpdateUserScreen" component={UpdateUserScreen} />
            <Stack.Screen name="TriggerScreen" component={TriggerScreen} />
            <Stack.Screen name="FilterScreen" component={FilterScreen} />
          </Stack.Navigator>
        </DisplayProvider>
      </AuthProvider>
      </BasicProvider>
    </NavigationContainer>
  );
}

export default App;
