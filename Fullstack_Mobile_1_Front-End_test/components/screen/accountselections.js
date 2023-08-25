import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserContext, UserContext } from '../shared/usercontexts';

const AccountSelection = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);

  const handleAccountSelection = (accountType) => {
    if (accountType === 'customer') {
      setUser({
        type: "customer",
        usertype_id: user.customer_id
      }); 
      navigation.navigate('Restaurants', { userType: 'customer' });
    } else if (accountType === 'courier') {
      setUser({
        type: "courier",
        usertype_id: user.courier_id
      });
      navigation.navigate('Deliveries', { userType: 'courier' });
    }
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
