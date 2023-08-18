import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './components/shared/usercontexts';
import Login from './components/screen/login';
import Restaurants from './components/screen/restaurants';
import RestaurantsMenus from './components/screen/restaurantsmenus';
import OrderHistory from './components/screen/orderhistory';
import AccountSelection from './components/screen/accountselections';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importez le composant d'icônes

Icon.loadFont(); // Charge les icônes

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Restaurants" component={Restaurants} />
          <Stack.Screen name="RestaurantsMenus" component={RestaurantsMenus} />
          <Stack.Screen name="OrderHistory" component={OrderHistory} />
          <Stack.Screen name="AccountSelection" component={AccountSelection} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
