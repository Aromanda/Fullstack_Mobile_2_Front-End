import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { UserContext } from '../shared/usercontexts'
import { useRoute } from '@react-navigation/native';

const Login = ({ navigation }) => {
  // const [email, setEmail] = useState('erica.ger@gmail.com');
  const [email, setEmail] = useState('erica.ger@customer.com'); // juste customer
  // const [email, setEmail] = useState('erica.ger@courier.com'); // juste courier
  const [password, setPassword] = useState('password');
  const { setUser } = useContext(UserContext);
  const route = useRoute();
  const {setIsUserType} = route.params;
  const handleLogin = () => {
    console.log("email", email, "password", password);
    fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then( async (data) => {
        if (data.success) {
          Alert.alert('Login Successful!', 'You are now logged in.');
          console.log(data);
          await setUser({
            type: data.customer_id && data.courier_id ? "" : data.customer_id ? "customer" : "courier",
            user_id: data.user_id,
            customer_id: data.customer_id,
            courier_id: data.courier_id,
            usertype_id: data.customer_id && data.courier_id ? "" : data.customer_id ? data.customer_id : data.courier_id
          }); 
          if (data.customer_id && data.courier_id) {
            navigation.navigate('AccountSelection'); // Navigate to AccountSelection
          } else if (data.customer_id) {
            setIsUserType("customer");
            navigation.navigate('Restaurants'); // Navigate to RestaurantsMenu screen
          } else {
            setIsUserType("courier");
            navigation.navigate('Deliveries'); // Navigate to Deliveries
          }
        } else {
          Alert.alert('Login Failed!', 'Please check your credentials and try again.');
        }
      })
      .catch((error) => {
        Alert.alert('Login Failed!', 'An error occurred during login.');
        console.error('Login failed:', error);
      });
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Image source={require('../../assets/Images/AppLogoV2.png')} style={styles.logo} />
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to begin</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  input: {
    width: 250,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 30,
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    width: 250,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Login;