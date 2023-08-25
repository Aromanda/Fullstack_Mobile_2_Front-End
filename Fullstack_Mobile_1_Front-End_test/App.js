import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './components/shared/usercontexts';
import Login from './components/screen/login';
import Restaurants from './components/screen/restaurants';
import RestaurantsMenus from './components/screen/restaurantsmenus';
import OrderHistory from './components/screen/orderhistory';
import AccountSelection from './components/screen/accountselections';
import Deliveries from './components/screen/deliveries';
import Account from './components/screen/account';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importez le composant d'icônes
import FooterNavbar from './components/shared/footer';

Icon.loadFont(); // Charge les icônes

const Stack = createStackNavigator();

const App = () => {
  const [isUserType,setIsUserType] = useState("");
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} initialParams={{setIsUserType}} />
          <Stack.Screen name="Restaurants" component={Restaurants} />
          <Stack.Screen name="RestaurantsMenus" component={RestaurantsMenus} />
          <Stack.Screen name="OrderHistory" component={OrderHistory} initialParams={{ isUserType }} />
          <Stack.Screen name="AccountSelection" component={AccountSelection} />
          <Stack.Screen name="Deliveries" component={Deliveries} initialParams={{ isUserType }} />
          <Stack.Screen name="Account" component={Account} />
        </Stack.Navigator>
        <FooterNavbar isUserType={isUserType}/> 
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
