import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator, 
  Image,
  StatusBar,
  Alert
} from 'react-native';
import { signOut, getCurrentUser } from '../services/authService';

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get current user on component mount
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    } else {
      // If no user is found, redirect to login
      navigation.replace('Login');
    }
  }, [navigation]);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      console.log('Successfully signed out');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      <Text style={styles.title}>¡Bienvenido a Moviefy!</Text>
      
      <View style={styles.userCard}>
        {user.photoURL ? (
          <Image 
            source={{ uri: user.photoURL }} 
            style={styles.userPhoto} 
            resizeMode="cover"
          />
        ) : (
          <View style={styles.userPhotoPlaceholder}>
            <Text style={styles.userInitials}>
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>
        )}
        
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.displayName || 'Usuario'}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Detalles de la cuenta</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>ID de usuario:</Text>
          <Text style={styles.infoValue}>{user.uid}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email verificado:</Text>
          <Text style={styles.infoValue}>
            {user.emailVerified ? 'Sí' : 'No'}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Método de inicio:</Text>
          <Text style={styles.infoValue}>
            {user.providerData?.[0]?.providerId || 'Desconocido'}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Creado en:</Text>
          <Text style={styles.infoValue}>
            {user.metadata?.creationTime 
              ? new Date(user.metadata.creationTime).toLocaleDateString() 
              : 'Desconocido'}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.signOutButton} 
        onPress={handleSignOut}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E50914',
    marginTop: 40,
    marginBottom: 30,
    textAlign: 'center',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userPhotoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E50914',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInitials: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userInfo: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#BBBBBB',
  },
  infoContainer: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  infoLabel: {
    width: 120,
    fontSize: 14,
    color: '#999999',
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
  },
  signOutButton: {
    backgroundColor: '#E50914',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;