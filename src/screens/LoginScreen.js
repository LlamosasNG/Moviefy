import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  Clipboard,
  ToastAndroid,
  Platform
} from 'react-native';
import { configureGoogleSignIn, signInWithGoogle } from '../services/authService';

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [logs, setLogs] = useState([]);
  const [debugMode, setDebugMode] = useState(true);

  // Función para mostrar Toast
  const showToast = message => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      console.log(message);
    }
  };

  // Configurar logging
  useEffect(() => {
    if (!debugMode) return;
    
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;

    console.log = (...args) => {
      originalConsoleLog(...args);
      const message = args.map(arg => {
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg, null, 2);
          } catch (e) {
            return String(arg);
          }
        }
        return String(arg);
      }).join(' ');

      setLogs(prevLogs => [...prevLogs, { type: 'info', message, timestamp: new Date().toISOString() }]);
    };

    console.error = (...args) => {
      originalConsoleError(...args);
      const message = args.map(arg => {
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg, null, 2);
          } catch (e) {
            return String(arg);
          }
        }
        return String(arg);
      }).join(' ');

      setLogs(prevLogs => [...prevLogs, { type: 'error', message, timestamp: new Date().toISOString() }]);
    };

    return () => {
      console.log = originalConsoleLog;
      console.error = originalConsoleError;
    };
  }, [debugMode]);

  // Configurar Google Sign-In
  useEffect(() => {
    try {
      console.log('Inicializando Google Sign-In...');
      configureGoogleSignIn();
      console.log('Google Sign-In configurado correctamente');
    } catch (e) {
      console.error('Error al configurar Google Sign-In:', e);
      setError('Error durante la configuración de Google Sign-In: ' + e.message);
    }
  }, []);

  // Manejar inicio de sesión con Google
  const handleGoogleSignIn = async () => {
    if (loading) return;
    
    setLoading(true);
    setError('');
    
    try {
      console.log('Iniciando flujo de inicio de sesión con Google');
      showToast('Iniciando sesión con Google...');
      
      const result = await signInWithGoogle();
      
      console.log('Inicio de sesión exitoso:', result.user.email);
      showToast('Inicio de sesión exitoso');
      
      // Navegar a HomeScreen después de inicio de sesión exitoso
      navigation.replace('Home');
    } catch (error) {
      console.error('Error de inicio de sesión con Google:', error);
      
      // Formatear mensaje de error para el usuario
      const errorMessage = error.message || 'Error durante el inicio de sesión con Google';
      setError(errorMessage);
      
      Alert.alert(
        'Error de autenticación',
        errorMessage,
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };
  
  const copyLogs = () => {
    const logsText = logs.map(log => 
      `[${log.timestamp}] [${log.type.toUpperCase()}] ${log.message}`
    ).join('\n');
    
    Clipboard.setString(logsText);
    showToast('Logs copiados al portapapeles');
  };

  const toggleDebugMode = () => {
    setDebugMode(!debugMode);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Moviefy</Text>
        <Text style={styles.subtitle}>Tu app de películas favorita</Text>
        
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
        
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
        
        <TouchableOpacity 
          style={styles.debugButton}
          onPress={toggleDebugMode}
        >
          <Text style={styles.debugButtonText}>
            {debugMode ? 'Ocultar Depuración' : 'Mostrar Depuración'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Debug logger */}
      {debugMode && (
        <View style={styles.loggerContainer}>
          <View style={styles.loggerHeader}>
            <Text style={styles.loggerTitle}>Logs de depuración</Text>
            <View style={styles.loggerButtons}>
              <TouchableOpacity onPress={copyLogs} style={styles.loggerButton}>
                <Text style={styles.loggerButtonText}>Copiar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={clearLogs} style={styles.loggerButton}>
                <Text style={styles.loggerButtonText}>Limpiar</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <ScrollView style={styles.logsScrollView}>
            {logs.map((log, index) => (
              <Text 
                key={index} 
                style={[
                  styles.logText, 
                  log.type === 'error' ? styles.errorLog : styles.infoLog
                ]}
              >
                {`[${log.timestamp.split('T')[1].split('.')[0]}] ${log.message}`}
              </Text>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  errorContainer: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    width: '100%',
  },
  errorText: {
    color: '#FF5252',
    textAlign: 'center',
  },
  googleButton: {
    backgroundColor: '#4285F4',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  debugButton: {
    marginTop: 20,
    padding: 8,
  },
  debugButtonText: {
    color: '#AAAAAA',
    fontSize: 14,
  },
  loggerContainer: {
    height: 250,
    backgroundColor: '#1E1E1E',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  loggerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#333',
  },
  loggerTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  loggerButtons: {
    flexDirection: 'row',
  },
  loggerButton: {
    backgroundColor: '#555',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  loggerButtonText: {
    color: 'white',
    fontSize: 12,
  },
  logsScrollView: {
    flex: 1,
  },
  logText: {
    fontSize: 11,
    padding: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  infoLog: {
    color: '#CCCCCC',
  },
  errorLog: {
    backgroundColor: 'rgba(255, 0, 0, 0.15)',
    color: '#FF8080',
  },
});

export default LoginScreen;