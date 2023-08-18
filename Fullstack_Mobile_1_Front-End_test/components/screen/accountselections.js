import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const AccountSelection = ({ navigation }) => {
  const handleAccountSelection = (accountType) => {
    navigation.navigate(accountType === 'customer' ? 'Restaurants' : 'CourierScreen');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Images/AppLogoV2.png')} style={styles.logo} />
      <Text style={styles.title}>Select Account</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAccountSelection('customer')}
      >
        <Text style={styles.buttonText}>Customer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAccountSelection('courier')}
      >
        <Text style={styles.buttonText}>Courier</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    width: 250,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AccountSelection;
