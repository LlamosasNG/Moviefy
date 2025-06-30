import {favoritesCollection} from './firebase';

export const addFavorite = async (userId: string, movie: any) => {
  await favoritesCollection.add({
    userId,
    movieId: movie.id,
    name: movie.name,
    image: movie.image?.medium,
    summary: movie.summary,
    createdAt: new Date(),
  });
};

export const removeFavorite = async (userId: string, movieId: number) => {
  const snapshot = await favoritesCollection
    .where('userId', '==', userId)
    .where('movieId', '==', movieId)
    .get();

  snapshot.forEach(doc => {
    doc.ref.delete();
  });
};

export const getFavorites = async (userId: string) => {
  const snapshot = await favoritesCollection
    .where('userId', '==', userId)
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};
