import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useFavorites} from '../context/FavoritesContext';
import ShowCard from '../components/ShowCard';

const FavoritesScreen = () => {
  const {favorites} = useFavorites();

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No tienes favoritos aún.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ShowCard show={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#888',
  },
});

export default FavoritesScreen;
