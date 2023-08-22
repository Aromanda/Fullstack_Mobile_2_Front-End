import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomNavbar from '../../components/shared/header';
import FooterNavbar from '../../components/shared/footer';
import { useUserContext } from '../../components/shared/usercontexts';
import { restaurants } from '../../components/screen/restaurants';

const OrderHistory = () => {
    const { user } = useUserContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("=========================");
                // const resRestaurants = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/restaurants`);
                // const restaurants = await resRestaurants.json();
                console.log("user type:", user.type);
                console.log("user id:", user.usertype_id);  
                const resOrders = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/orders?type=${user.type}&id=${user.usertype_id}`);
                const orderData = await resOrders.json();
                console.log("orderData");
                console.log(orderData);
                const ordersWithNames = orderData.map((order) => {
                    const restaurant = restaurants.find((r) => r.id === order.restaurant_id);
                    return {
                        ...order,
                        restaurantName: restaurant ? restaurant.name : 'Unknown Restaurant',
                    };
                });
                setOrders(ordersWithNames);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <CustomNavbar />
            <View style={styles.contentContainer}>
            <Text style={styles.pageTitle}>MY ORDERS</Text>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    <FlatList
                        data={orders}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.orderContainer} onPress={() => {
                                setSelectedOrder(item);
                                setModalVisible(true);
                            }}>
                                <Text style={styles.restaurantName}>{item.restaurant_name}</Text>
                                <Text>{item.status}</Text>
                                <Text>{item.date}</Text>
                                <Icon name="search-plus" size={20} color="#000" />
                            </TouchableOpacity>
                        )}
                    />
                    {modalVisible && (
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}>
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <View style={styles.modalHeader}>
                                        <Text style={styles.modalRestaurantName}>{selectedOrder?.restaurant_name}</Text>
                                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                                            <Icon name="times" size={24} color="#DA583B" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.modalInfoSection}>
                                        <Text style={styles.modalDetails}>Date: {selectedOrder?.date}</Text>
                                        <Text style={styles.modalDetails}>Status: {selectedOrder?.status}</Text>
                                        <Text style={styles.modalDetails}>Courier: {selectedOrder?.courier_name}</Text>
                                    </View>
                                    <View style={styles.modalBody}>
                                        {selectedOrder?.products.map((product, index) => (
                                            <View key={index} style={styles.productRow}>
                                                <Text style={styles.productName}>{product.product_name}</Text>
                                                <Text style={styles.productQuantity}>x{product.quantity}</Text>
                                                <Text style={styles.productPrice}>${product.unit_cost}</Text>
                                            </View>
                                        ))}
                                        <View style={styles.orderTotalSeparator} />
                                        <Text style={styles.totalCost}>Total: ${selectedOrder?.total_cost}</Text>
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
    orderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    restaurantName: {
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
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
    orderTotalSeparator: {
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        marginVertical: 10,
    },
    totalCost: {
        fontSize: 20, 
        fontWeight: 'bold',
        textAlign: 'right',
    },
});
export default OrderHistory;