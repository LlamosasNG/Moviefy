import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Configura Google Sign-In
// Reemplaza WEB_CLIENT_ID con el ID de cliente web de tu proyecto Firebase
export const configureGoogleSignIn = () => {
console.log('Configurando Google Sign-In');
  GoogleSignin.configure({
    webClientId: '', // Obtén esto de la configuración de Firebase
    offlineAccess: true,
});
};

// Iniciar sesión con Google
export const signInWithGoogle = async () => {
  try {
    // Asegúrate de que el usuario no esté ya conectado
    await GoogleSignin.signOut();
    
    // Comprobar si el dispositivo tiene Google Play Services
    await GoogleSignin.hasPlayServices();
    
    // Obtener información del usuario
    const userInfo = await GoogleSignin.signIn();
    
    // Verifica que idToken no sea undefined
    if (!userInfo || !userInfo.idToken) {
      throw new Error('No se pudo obtener el ID token de Google');
    }
    
    // Crear credencial para Firebase Auth
    const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
    
    // Iniciar sesión en Firebase con la credencial
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.error('Error completo en signInWithGoogle:', JSON.stringify(error));
    
    if (error.code) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          throw new Error('El inicio de sesión fue cancelado');
        case statusCodes.IN_PROGRESS:
          throw new Error('Operación en progreso');
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          throw new Error('Play Services no está disponible o actualizado');
        default:
          throw new Error(`Error de autenticación: ${error.message}`);
      }
    } else {
      // Si error.code es undefined, lanza un mensaje genérico
      throw new Error('Error en la autenticación de Google');
    }
  }
};

// Cerrar sesión
export const signOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    return auth().signOut();
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw new Error('Error al cerrar sesión');
  }
};

// Obtener usuario actual
export const getCurrentUser = () => {
  return auth().currentUser;
};
