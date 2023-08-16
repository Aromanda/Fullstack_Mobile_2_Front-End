import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CustomNavbar = () => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/users/sign_out`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <View style={styles.navbar}>
      <Image source={require('../../assets/Images/AppLogoV1.png')} style={styles.logo} resizeMode="contain" />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  logo: {
    width: width - 160,
    height: 50,
    marginLeft: -10,
  },
  logoutButton: {
    padding: 10,
    backgroundColor: '#DA583B',
    borderRadius: 10,
  },
  logoutText: {
    color: '#fff',
  },
});
export default CustomNavbar;