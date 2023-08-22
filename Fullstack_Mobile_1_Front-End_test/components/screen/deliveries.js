import React from 'react';
import { View, Text } from 'react-native';
import CustomNavbar from '../../components/shared/header';
import FooterNavbar from '../../components/shared/footer';

const Deliveries = () => {
  // Fetch and display courier deliveries
  return (
    <View style={{ flex: 1 }}>
      <CustomNavbar />
      <View>
        <Text>Courier Deliveries</Text>
        {/* Display courier deliveries */}
      </View>
      <FooterNavbar />
    </View>
  );
};

export default Deliveries;
