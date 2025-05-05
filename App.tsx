 import React, { useEffect } from 'react';
import { StatusBar, LogBox } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import auth from '@react-native-firebase/auth';
import { configureGoogleSignIn } from './src/services/authService';

// Ignorar advertencias específicas
LogBox.ignoreLogs([
  'RCTBridge required dispatch_sync to load RNGoogleSignin',
  'Setting a timer for a long period of time',
  'Non-serializable values were found in the navigation state',
  'Accessing the "state" property of the "route" object is not supported'
]);

function App(): React.JSX.Element {
  // Inicializar configuración de Firebase Auth
  useEffect(() => {
    try {
      console.log('Inicializando configuración de autenticación...');
      configureGoogleSignIn();
    } catch (error) {
      console.error('Error al configurar Google Sign-In:', error);
    }
  }, []);

  // Listener de cambios de estado de autenticación
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('Usuario autenticado:', user.email);
      } else {
        console.log('Usuario no autenticado');
      }
    });
    
    // Limpiar suscriptor al desmontar
    return subscriber;
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <AppNavigator />
    </>
  );
}

export default App;
