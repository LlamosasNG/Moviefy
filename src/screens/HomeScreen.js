import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { signOut, getCurrentUser } from '../services/authService';

const HomeScreen = ({ navigation }) => {
  const user = getCurrentUser();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigation.replace('Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a MovieFy!</Text>
      
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.userText}>Usuario: {user.displayName}</Text>
          <Text style={styles.userText}>Email: {user.email}</Text>
        </View>
      )}
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E50914',
    marginBottom: 30,
  },
  userInfo: {
    backgroundColor: '#1F1F1F',
    borderRadius: 8,
    padding: 20,
    width: '100%',
    marginBottom: 30,
  },
  userText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: '#E50914',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;