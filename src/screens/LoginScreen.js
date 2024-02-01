import React, { useContext, useState, useEffect } from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, StyleSheet, BackHandler } from 'react-native';
import { Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from './context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { COLORS, FONTSIZE } from './theme/themes';

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isLoading, login } = useContext(AuthContext);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleBackPress = () => {
    // Handle hardware back press here
    BackHandler.exitApp();
    return true; // Return true to prevent default behavior (closing the app)
  };

  const handleLogin = () => {
    // Check if email and password are not empty
    if (!userid.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    // Clear previous error message
    setError('');

    // Call the login function
    login(userid, password);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      {/* Upper 30% - White background with logo and app name */}
      <View style={styles.upperContainer}>
        <Image source={require("./assets/TMG_LOGO.jpg")} style={styles.logo} />
        <Text style={styles.appName}>TMG B2B Portal</Text>
      </View>

      {/* Lower 70% - Dark grey background with email, password inputs, and sign-in button */}
      <View style={styles.lowerContainer}>
        <View style={styles.inputContainer}>
          <Icon name="mail-sharp" size={20} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={userid}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => setUserid(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock-closed" size={20} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ marginLeft: 10, marginRight: 10 }}>
            <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Display error message if any */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button title="Sign In" onPress={handleLogin} />

        <TouchableOpacity  onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.forgotPasswordText}>Forgot password? Click here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  upperContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 130,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 25,
    marginTop: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  lowerContainer: {
    flex: 0.6,
    backgroundColor: '#333',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    paddingHorizontal: 20,
  },
  icon: {
    marginLeft: 10,
  },
  errorText: {
    color: '#ff3014',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize:FONTSIZE.size_16,
  },
  forgotPasswordText: {
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
