import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomNavbar from '../../components/shared/header';
import FooterNavbar from '../../components/shared/footer';
import { useUserContext } from '../../components/shared/usercontexts';
import { restaurants } from '../../components/screen/restaurants'; // You might not need this import

const Deliveries = () => {
  const { user } = useUserContext();
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        // Fetch courier deliveries based on user type and user type ID
        const resDeliveries = await fetch(
          `${process.env.EXPO_PUBLIC_NGROK_URL}/api/orders?type=${user.type}&id=${user.usertype_id}`
        );
        const deliveryData = await resDeliveries.json();

        // You can process the deliveryData if needed

        setDeliveries(deliveryData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchDeliveries();
  }, []);

  const handleStatusUpdate = async (delivery, newStatus) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_NGROK_URL}/api/order/${delivery.id}/status`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        const updatedDeliveries = deliveries.map((d) =>
          d.id === delivery.id ? { ...d, status: newStatus } : d
        );
        setDeliveries(updatedDeliveries);
      } else {
        console.error('Failed to update delivery status');
      }
    } catch (error) {
      console.error('Error during status update:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#851919';
      case 'in progress':
        return '#DA583B';
      case 'delivered':
        return '#609475';
      default:
        return 'transparent';
    }
  };

  return (
    <View style={styles.container}>
      <CustomNavbar />
      <View style={styles.contentContainer}>
        <Text style={styles.pageTitle}>COURIER DELIVERIES</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <FlatList
  data={deliveries}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.deliveryContainer}
      onPress={() => {
        setSelectedDelivery(item);
        setModalVisible(true);
      }}>
      <View style={styles.columnContainer}>
        <Text style={styles.columnHeader}>Order ID</Text>
        <Text style={styles.columnData}>{item.id}</Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={styles.columnHeader}>Address</Text>
        <Text style={styles.columnData}>{item.customer_address}</Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={styles.columnHeader}>Status</Text>
        <Text style={styles.columnData}>{item.status}</Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={styles.viewButton}>View</Text>
      </View>
    </TouchableOpacity>
  )}
/>
            {modalVisible && selectedDelivery && (
              <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalRestaurantName}>{selectedDelivery.restaurant_name}</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Icon name="times" size={24} color="#DA583B" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.modalInfoSection}>
                    <Text style={styles.modalDetails}>Status: {selectedDelivery.status}</Text>
                    <Text style={styles.modalDetails}>Total Cost: ${selectedDelivery.total_cost}</Text>
                    <Text style={styles.modalDetails}>Restaurant Details:</Text>
                    <Text style={styles.modalDetails}>Name: {selectedDelivery.restaurant_name}</Text>
                    <Text style={styles.modalDetails}>Address: {selectedDelivery.restaurant_address}</Text>
                    {/* Add other restaurant details if available */}
                  </View>
                  <View style={styles.modalBody}>
                    {selectedDelivery.products.map((product, index) => (
                      <View key={index} style={styles.productRow}>
                        <Text style={styles.productName}>{product.product_name}</Text>
                        <Text style={styles.productQuantity}>x{product.quantity}</Text>
                        <Text style={styles.productPrice}>${product.unit_cost}</Text>
                      </View>
                    ))}
                    <View style={styles.orderTotalSeparator} />
                    <Text style={styles.totalCost}>Total: ${selectedDelivery.total_cost}</Text>
                  </View>
                </View>
              </View>
            </Modal>
            )}
          </>
        )}
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
      contentContainer: {
        flex: 1,
        padding: 15,
      },
      pageTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
      },
      deliveryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
      },
      columnContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      columnHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      columnData: {
        fontSize: 16,
      },
      viewButton: {
        fontSize: 16,
        color: 'blue',
        textDecorationLine: 'underline',
      },
      restaurantName: {
        fontSize: 18,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
      },
      modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#222126',
        padding: 10,
      },
      modalRestaurantName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#DA583B',
      },
      orderTotalSeparator: {
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        marginVertical: 10,
    },
    modalInfoSection: {
        backgroundColor: '#222126',
        padding: 10,
    },
    modalDetails: {
        fontSize: 16,
        color: 'white',
        marginBottom: 5,
    },
    modalBody: {
        padding: 10,
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    productName: {
        fontSize: 16,
    },
    productQuantity: {
        fontSize: 16,
    },
    productPrice: {
        fontSize: 16,
    },
    totalCost: {
        fontSize: 20, 
        fontWeight: 'bold',
        textAlign: 'right',
    },
  // Add more styles as needed
});

export default Deliveries;