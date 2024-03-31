import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Plant_Detail from './stack/Plant_Detail';
import Home_Plant from './tabs/Home_Plant';
import Plant_Admin from './tabs/Plant_Admin';
import Plant_Bell from './tabs/Plant_Bell';
import Plant_Search from './tabs/Plant_Search';
import Category from './stack/Category';
import FocusExample from './screens/FocusExample';
import Register_plant from './screens/Register_plant';
import Plant_Card from './stack/Plant_Card';
import store from '../API_Redux/store';
import { Provider } from 'react-redux';
//import store from './src/API_Redux/store';
// Hàm trả về component TabBarIcon
const TabBarIcon = ({ focused, iconName }) => {
  return (
    <View>
      <Icon name={ iconName } size={ focused ? 24 : 20 } color={ focused ? '#D17842' : 'black' } />
      {/* Circle dưới icon */ }
      { focused && <View style={ { marginLeft: 4, width: 14, height: 14, backgroundColor: 'red', borderRadius: 7, marginTop: 4, } } /> }
    </View>
  );
};

// Cấu hình options cho mỗi tab
const tabScreenOptions = ({ route }) => {
  return {
    tabBarLabel: () => null, // Tắt hiển thị label
    headerShown: false,
    tabBarStyle: {
      // backgroundColor: '#0C0F14'
    },
    tabBarIcon: ({ focused }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home'; // Tên icon khi được chọn và không được chọn
      } else if (route.name === 'Cart') {
        iconName = focused ? 'shopping-cart' : 'shopping-cart'; // Tên icon khi được chọn và không được chọn
      } else if (route.name === 'Favorite') {
        iconName = focused ? 'heart' : 'heart'; // Tên icon khi được chọn và không được chọn
      } else if (route.name === 'Notification') {
        iconName = focused ? 'bell' : 'bell'; // Tên icon khi được chọn và không được chọn
      }

      // Trả về component TabBarIcon với tên icon tương ứng
      return <TabBarIcon focused={ focused } iconName={ iconName } />;
    },
  };
};

const Tab = createBottomTabNavigator();
const MainTabNavigation = () => {

  return (
    <Tab.Navigator screenOptions={ tabScreenOptions }>
      <Tab.Screen name="Home" component={ Home_Plant } />
      <Tab.Screen name="Cart" component={ Plant_Admin } />
      <Tab.Screen name="Favorite" component={ Plant_Bell } />
      <Tab.Screen name="Notification" component={ Plant_Search } />
    </Tab.Navigator>
  )
}
// stacks
const Stack = createNativeStackNavigator();
const PlantStackNavigation = () => {
  return (
    <Provider store={store}>
    <Stack.Navigator screenOptions={ { headerShown: false } }>
      <Stack.Screen name="register" component={ Register_plant } />
      <Stack.Screen name="login" component={ FocusExample } />
      <Stack.Screen name="MainTabNavigation" component={ MainTabNavigation } />
      <Stack.Screen name="Detail" component={ Plant_Detail } />
      <Stack.Screen name="category" component={ Category } />
      <Stack.Screen name="cart" component={Plant_Card}/>
    </Stack.Navigator>
    </Provider>
  )
}

export default PlantStackNavigation;
