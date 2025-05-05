import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import auth from '@react-native-firebase/auth';

function App(): React.JSX.Element {
  // Inicializar Firebase Auth
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      console.log('Usuario actual:', user);
    });
    
    // Limpiar el suscriptor al desmontar
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