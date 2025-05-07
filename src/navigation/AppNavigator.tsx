import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import FavoritesScreen from '../screens/FavoritesScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import AppHeader from '../components/AppHeader';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        header: () => <AppHeader />,
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Favoritos') {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2234b5',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Inicio" component={HomeStackNavigator} />
      <Tab.Screen name="Favoritos" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
