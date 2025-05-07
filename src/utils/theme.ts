// utils/theme.ts
import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme, Theme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

// Paleta de colores personalizada (opcional)
const LightColors = {
  primary: '#6200ee',
  background: '#ffffff',
  card: '#f5f5f5',
  text: '#000000',
  border: '#cccccc',
  notification: '#ff80ab',
};

const DarkColors = {
  primary: '#bb86fc',
  background: '#121212',
  card: '#1e1e1e',
  text: '#ffffff',
  border: '#272727',
  notification: '#ff80ab',
};

// Extendemos los temas de React Navigation
export const MyLightTheme: Theme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...LightColors,
  },
};

export const MyDarkTheme: Theme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...DarkColors,
  },
};

// Hook que devuelve el tema actual
export const useNavigationTheme = () => {
  const scheme = useColorScheme();
  return scheme === 'dark' ? MyDarkTheme : MyLightTheme;
};
