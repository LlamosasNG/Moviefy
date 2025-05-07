import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import {useNavigationTheme} from './src/utils/theme';
import {FavoritesProvider} from './src/context/FavoritesContext';
import {enableScreens} from 'react-native-screens';

const App = () => {
  const theme = useNavigationTheme();
  enableScreens();
  return (
    <FavoritesProvider>
      <NavigationContainer theme={theme}>
        <AppNavigator />
      </NavigationContainer>
    </FavoritesProvider>
  );
};

export default App;
