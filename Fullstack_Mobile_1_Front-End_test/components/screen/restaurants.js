import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import CustomNavbar from '../../components/shared/header';
import FooterNavbar from '../../components/shared/footer';
// import RestaurantsMenus from '../../components/screen/restaurantsmenus';

const images = [
  require('../../assets/Images/Restaurants/cuisineGreek.jpg'),
  require('../../assets/Images/Restaurants/cuisineJapanese.jpg'),
  require('../../assets/Images/Restaurants/cuisinePasta.jpg'),
  require('../../assets/Images/Restaurants/cuisinePizza.jpg'),
  require('../../assets/Images/Restaurants/cuisineSoutheast.jpg'),
  require('../../assets/Images/Restaurants/cuisineViet.jpg'),
  require('../../assets/Images/Restaurants/cuisinePizza.jpg'),
  require('../../assets/Images/Restaurants/cuisineSoutheast.jpg'),
];

const Restaurants = () => {
    const navigation = useNavigation();
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
  
    useEffect(() => {
      const url = `${process.env.EXPO_PUBLIC_NGROK_URL}/api/restaurants`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setRestaurants(data);
          setFilteredRestaurants(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching restaurants:', error);
          setLoading(false);
        });
    }, []);
  
    useEffect(() => {
      const filterRestaurants = () => {
        let result = restaurants;
        if (selectedRating) {
          result = result.filter((restaurant) => restaurant.rating === parseInt(selectedRating));
        }
        if (selectedPrice) {
          result = result.filter((restaurant) => restaurant.price_range === parseInt(selectedPrice));
        }
        setFilteredRestaurants(result);
      };
      filterRestaurants();
    }, [selectedRating, selectedPrice, restaurants]);
  
    const navigateToRestaurantsMenus = (restaurant_id) => navigation.navigate('RestaurantsMenus', { restaurant_id });

    const renderRestaurant = ({ item, index }) => (
      <TouchableOpacity onPress={() => navigateToRestaurantsMenus(item)}>
        <View style={styles.card}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.name} {`(${ '$'.repeat(item.price_range) })`}</Text>
            <Text style={styles.rating}>{'★'.repeat(item.rating)}</Text>
          </View>
          <Image source={images[index % images.length]} style={styles.image} />
        </View>
      </TouchableOpacity>
    );
  
    return (
        <View style={{ flex: 1 }}>
            <CustomNavbar />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>NEARBY RESTAURANTS</Text>
                <View style={styles.pickerWrapper}>
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.labelText}>Rating:</Text>
                        <Picker
                            selectedValue={selectedRating}
                            onValueChange={(value) => setSelectedRating(value)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select" value={null} />
                            <Picker.Item label="★" value="1" />
                            <Picker.Item label="★★" value="2" />
                            <Picker.Item label="★★★" value="3" />
                            <Picker.Item label="★★★★" value="4" />
                            <Picker.Item label="★★★★★" value="5" />
                        </Picker>
                    </View>
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.labelText}>Price:</Text>
                        <Picker
                            selectedValue={selectedPrice}
                            onValueChange={(value) => setSelectedPrice(value)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select" value={null} />
                            <Picker.Item label="$" value="1" />
                            <Picker.Item label="$$" value="2" />
                            <Picker.Item label="$$$" value="3" />
                            <Picker.Item label="$$$$" value="4" />
                            <Picker.Item label="$$$$$" value="5" />
                        </Picker>
                    </View>
                </View>
                <Text style={styles.subHeaderText}>RESTAURANTS</Text>
            </View>
            <FlatList
                data={filteredRestaurants}
                renderItem={renderRestaurant}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={{ padding: 10 }}
            />
        </View>
    );
    };
    

// StyleSheet for RestaurantsMenu
const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 20;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    width: cardWidth - 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    justifyContent: 'flex-start',
  },
  image: {
    width: cardWidth - 20,
    height: 60,
    marginBottom: 5,
    borderRadius: 4,
  },
  textContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
  },
  rating: {
    color: 'black',
  },
  headerContainer: {
    padding: 15,
},
headerText: {
    fontSize: 19,
},
subHeaderText: {
    fontSize: 20,
},
pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 100,
},
labelText: {
    fontSize: 22,
    marginRight: 5,
},
picker: {
    width: 120,
    height: 50,
    color: 'white',
},
dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
},
});

export default Restaurants;