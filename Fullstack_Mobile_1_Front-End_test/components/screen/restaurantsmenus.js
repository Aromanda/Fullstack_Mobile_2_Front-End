import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import CustomNavbar from '../../components/shared/header';
import FooterNavbar from '../../components/shared/footer';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../../components/shared/usercontexts';

const RestaurantsMenus = ({ route }) => {
  const { user } = useUserContext();
  const { restaurant_id } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [createOrderEnabled, setCreateOrderEnabled] = useState(false);
  const [processingOrder, setProcessingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const navigation = useNavigation(); 

  const confirmOrder = async () => {
    setProcessingOrder(true);
    try {
      const orderDetails = {
        restaurant_id: restaurant.id,
        customer_id: user.customer_id,
        products: Object.keys(quantities).map(id => ({
          id,
          quantity: quantities[id]
        }))
      };
      console.log(orderDetails);
      console.log("orderDetails");
      const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
      });
  
      const data = await response.json();
      console.log(data);
      console.log("data");
      if (response.ok) {
        setOrderSuccess(true);
      } else {
        setOrderSuccess(false);
      }
    } catch (error) {
      console.error('Error confirming order:', error);
      setOrderSuccess(false);
    }
      setProcessingOrder(false);
  };

  const navigateToRestaurants = () => {
    navigation.navigate('Restaurants'); // Navigate back to the Restaurants component
  };

  const increment = (itemId) => {
    if (quantities[itemId] === undefined) {
      setQuantities({ ...quantities, [itemId]: 1 });
    } else {
      setQuantities({ ...quantities, [itemId]: quantities[itemId] + 1 });
    }
  };

  const decrement = (itemId) => {
    if (quantities[itemId] === undefined || quantities[itemId] <= 0) {
      return;
    }
    setQuantities({ ...quantities, [itemId]: quantities[itemId] - 1 });
  };

  useEffect(() => {
    const isCreateOrderEnabled = Object.values(quantities).some((quantity) => quantity > 0);
    setCreateOrderEnabled(isCreateOrderEnabled);
  }, [quantities]);

  useEffect(() => {
    const url = `${process.env.EXPO_PUBLIC_NGROK_URL}/api/restaurants`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const foundRestaurant = data.find((rest) => rest.id === restaurant_id.id);
        setRestaurant(foundRestaurant);
      })
      .catch((error) => {
        console.error('Error fetching restaurant details:', error);
      });

    const productsUrl = `${process.env.EXPO_PUBLIC_NGROK_URL}/api/products?restaurant=${restaurant_id.id}`;
    fetch(productsUrl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });

    setQuantities({}); // Reset quantities when changing restaurant
  }, [restaurant_id]);

  const renderStars = (rating) => {
    const filledStars = '★'.repeat(Math.floor(rating));
    const emptyStars = '☆'.repeat(5 - Math.floor(rating));
  
    const stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<Text key={`filled-${i}`} style={styles.star}>★</Text>);
    }
    for (let i = 0; i < 5 - Math.floor(rating); i++) {
      stars.push(<Text key={`empty-${i}`} style={styles.star}>☆</Text>);
    }
  
    return <View style={styles.ratingContainer}>{stars}</View>;
  };  

  const defaultImage = require('../../assets/Images/RestaurantMenu.jpg');

  const formatCurrency = (amount) => {
    // Utilisez la méthode toLocaleString pour formater le montant comme devise
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <Image source={defaultImage} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.productTitle}>{item.name}</Text>
        <Text style={styles.price}>{formatCurrency(item.cost)}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => decrement(item.id)}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text>{quantities[item.id] || 0}</Text>
        <TouchableOpacity style={styles.button} onPress={() => increment(item.id)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomNavbar />
      <View style={styles.contentContainer}>
        <Text style={styles.menuTitle}>RESTAURANTS MENU</Text>
        {restaurant && (
          <View style={styles.restaurantInfoContainer}>
            {/* Restaurant information */}
            <View style={styles.restaurantInfo}>
              <Text>{restaurant.name}</Text>
              <Text style={styles.info}>Price: ${restaurant.price_range}</Text>
              <View style={styles.ratingContainer}>
                <Text>Rating: </Text>
                {renderStars(restaurant.rating)} 
              </View>
            </View>
            {processingOrder ? (
              <ActivityIndicator size="small" color="#DA583B" />
            ) : (
              <TouchableOpacity
                style={[styles.createOrderButton, !createOrderEnabled && styles.disabledButton]}
                disabled={!createOrderEnabled}
                onPress={confirmOrder}
              >
                {/* Create Order button */}
                <Text style={styles.createOrderButtonText}>
                  {orderSuccess
                    ? "Command received ✓"
                    : "Confirm order"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            style={styles.productList} // Add a style to control FlatList width
          />
        )}
      </View>
    </View>
  );  
};  

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%', // Occupy the full available width
    paddingTop: 10,
  },
  restaurantInfo: {
    flex: 1, // Take available space
  },
  restaurantInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items in a row with space between
    alignItems: 'center', // Align items vertically
    marginBottom: 10,
    paddingHorizontal: 20, // Add horizontal padding for spacing
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  restaurantTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#DA583B',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  createOrderButton: {
    backgroundColor: '#DA583B',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  createOrderButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 18, // Adjust the font size as needed
  },
  backButton: {
    backgroundColor: '#DA583B',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    alignSelf: 'center', // Align the button to the center horizontally
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  productList: {
    width: '100%', // Set the width of the FlatList
  },
});

export default RestaurantsMenus;
