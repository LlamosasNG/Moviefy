import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';

// Configuración de Google Sign-In
export const configureGoogleSignIn = () => {
  console.log('Configurando Google Sign-In');
  
  // IMPORTANTE: Asegúrate de que este webClientId sea el correcto
  // Debe ser el client_id con client_type: 3 de tu google-services.json
  const webClientId = 'id de google';
  
  GoogleSignin.configure({
    webClientId: webClientId,
    offlineAccess: true, // Necesario para obtener el ID token
    scopes: ['profile', 'email'], // Permisos básicos
    forceCodeForRefreshToken: true, // Forzar la obtención de un token de actualización
  });
  
  console.log('Google Sign-In configurado con webClientId:', webClientId);
};

// Método de inicio de sesión con Google
export const signInWithGoogle = async () => {
  try {
    console.log('Iniciando proceso de inicio de sesión con Google');
    
    // Verificar disponibilidad de Google Play Services
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    console.log('Google Play Services verificados correctamente');
    
    // Asegurarse de que no hay sesión activa previamente
    try {
      await GoogleSignin.signOut();
      console.log('Sesión previa cerrada');
    } catch (signOutError) {
      console.log('No había sesión previa o hubo un error al cerrarla:', signOutError);
    }
    
    // Iniciar sesión con Google
    console.log('Solicitando inicio de sesión a Google...');
    const userInfo = await GoogleSignin.signIn();
    console.log('Respuesta de Google Sign-In:', userInfo);
    
    // Verificar si se recibió el token de ID
    if (!userInfo || !userInfo.idToken) {
      console.error('No se recibió el ID token. Intentando obtenerlo directamente...');
      
      // Intento alternativo para obtener tokens
      try {
        const tokens = await GoogleSignin.getTokens();
        console.log('Tokens obtenidos directamente:', tokens);
        
        if (tokens && tokens.idToken) {
          console.log('ID token obtenido con éxito mediante getTokens()');
          return await processGoogleCredential(tokens.idToken);
        } else {
          throw new Error('No se pudo obtener el ID token ni siquiera con getTokens()');
        }
      } catch (tokenError) {
        console.error('Error al obtener tokens directamente:', tokenError);
        throw new Error('No se pudo obtener el ID token: ' + tokenError.message);
      }
    }
    
    console.log('ID token obtenido con éxito. Procesando...');
    return await processGoogleCredential(userInfo.idToken);
  } catch (error) {
    console.error('Error en signInWithGoogle:', error);
    // Proporcionar un mensaje de error más específico según el tipo de error
    if (error.code === 'SIGN_IN_CANCELLED') {
      throw new Error('Inicio de sesión cancelado por el usuario');
    } else if (error.code === 'SIGN_IN_REQUIRED') {
      throw new Error('No hay usuario con sesión iniciada actualmente');
    } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
      throw new Error('Google Play Services no está disponible o está desactualizado');
    } else {
      throw error;
    }
  }
};

// Procesar credencial de Google con Firebase Auth
const processGoogleCredential = async (idToken) => {
  try {
    console.log('Procesando credencial de Google con Firebase');
    
    // Crear credencial de Firebase con el token de ID de Google
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
    // Iniciar sesión en Firebase con la credencial de Google
    const userCredential = await auth().signInWithCredential(googleCredential);
    console.log('Autenticación exitosa en Firebase');
    
    return userCredential;
  } catch (error) {
    console.error('Error de autenticación en Firebase:', error);
    throw new Error('Error al autenticar con Firebase: ' + error.message);
  }
};

// Cerrar sesión
export const signOut = async () => {
  try {
    console.log('Cerrando sesión');
    
    // Revocar acceso (importante para limpiar tokens)
    try {
      await GoogleSignin.revokeAccess();
      console.log('Acceso revocado');
    } catch (revokeError) {
      console.warn('Error al revocar acceso:', revokeError);
    }
    
    // Cerrar sesión en Google
    await GoogleSignin.signOut();
    console.log('Sesión de Google cerrada');
    
    // Cerrar sesión en Firebase
    await auth().signOut();
    console.log('Sesión de Firebase cerrada');
    
    return true;
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};

// Obtener usuario actual
export const getCurrentUser = () => {
  return auth().currentUser;
};