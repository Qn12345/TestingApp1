// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddUserScreen from './src/screens/AddUserScreen';
import ViewUserScreen from './src/screens/ViewUserScreen';
import UpdateUserScreen from './src/screens/UpdateUserScreen';
import {AuthProvider} from './src/context/AuthContext';
import {BasicProvider} from './src/context/BasicFunc';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
    <BasicProvider>
      <AuthProvider>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="AddUserScreen" component={AddUserScreen} />
          <Stack.Screen name="ViewUserScreen" component={ViewUserScreen} />
          <Stack.Screen name="UpdateUserScreen" component={UpdateUserScreen} />
        </Stack.Navigator>
      </AuthProvider>
      </BasicProvider>
    </NavigationContainer>
  );
}

export default App;
