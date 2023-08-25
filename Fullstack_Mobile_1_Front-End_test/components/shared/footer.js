import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const FooterNavbar = ({ isUserType }) => {
  const navigation = useNavigation();
  console.log(isUserType);
  return (
    <View style={styles.footerNavbar}>
      {isUserType === 'customer' && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate('Restaurants')}>
          <FontAwesome5 name="hamburger" size={20} color="#000" />
          <Text style={styles.iconText}>Restaurant</Text>
        </TouchableOpacity>
      )}
      {isUserType === 'customer' && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate('OrderHistory')}>
          <FontAwesome5 name="history" size={20} color="#000" />
          <Text style={styles.iconText}>Order History</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Account')}>
        <FontAwesome5 name="user" size={20} color="#000" />
        <Text style={styles.iconText}>Account</Text>
      </TouchableOpacity>
      {isUserType === 'courier' && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate('Deliveries')}>
          <FontAwesome5 name="truck" size={20} color="#000" />
          <Text style={styles.iconText}>Deliveries</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footerNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default FooterNavbar;
