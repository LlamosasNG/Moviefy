import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { configureGoogleSignIn, signInWithGoogle } from '../services/authService';

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Configurar Google Sign-In al cargar el componente
    try {
      console.log('Configurando Google Sign-In...');
      configureGoogleSignIn();
    } catch (e) {
      console.error('Error al configurar Google Sign-In:', e);
      setError('Error de configuración: ' + e.message);
    }
  }, []);

  const handleGoogleSignIn = async () => {
    if (loading) return;
    
    setLoading(true);
    setError('');
    
    try {
      console.log('Iniciando login con Google...');
      const result = await signInWithGoogle();
      console.log('Login exitoso:', result.user.email);
      
      // Navegar a la pantalla Home si todo está bien
      navigation.replace('Home');
    } catch (error) {
      console.error('Error en handleGoogleSignIn:', error);
      setError(error.message || 'Error al iniciar sesión con Google');
      
      Alert.alert(
        'Error de autenticación',
        error.message || 'Error al iniciar sesión con Google',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MovieFy</Text>
      <Text style={styles.subtitle}>Tu app de películas favorita</Text>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <TouchableOpacity 
        style={styles.googleButton}
        onPress={handleGoogleSignIn}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.buttonText}>Continuar con Google</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#E50914',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 40,
  },
  googleButton: {
    backgroundColor: '#4285F4',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#FF5252',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default LoginScreen;