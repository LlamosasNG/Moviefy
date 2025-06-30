import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {getFavorites} from '../services/favoriteServices';

interface Favorite {
  id: string;
  userId: string;
  movieId: number;
  name: string;
  image?: string;
  summary?: string;
}

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const userId = 'demoUser';

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favs = await getFavorites(userId);
        setFavorites(favs);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };
    fetchFavorites();
  }, []);

  const renderItem = ({item}: {item: Favorite}) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No hay favoritos aún.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#EEE',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
