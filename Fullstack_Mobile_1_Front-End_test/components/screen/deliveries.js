import React from 'react';
import { View, Text, StyleSheet } from 'react-native'; // Import StyleSheet
import CustomNavbar from '../../components/shared/header';
import FooterNavbar from '../../components/shared/footer';

const Deliveries = () => {
  // Fetch and display courier deliveries
  return (
    <View style={styles.container}>
      <CustomNavbar />
      <View style={styles.content}>
        <Text>Courier Deliveries</Text>
        {/* Display courier deliveries */}
      </View>
      <FooterNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    content: {
        flex: 1,
        padding: 15,
    },
});
export default Deliveries;
