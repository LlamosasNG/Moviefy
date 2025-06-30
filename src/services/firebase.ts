import firestore from '@react-native-firebase/firestore';

export const favoritesCollection = firestore().collection('favorites');
