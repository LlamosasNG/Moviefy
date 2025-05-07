import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ScrollView, Text, View, Image, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const DetailScreen = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const { show } = route.params;
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundColor = isDarkMode ? '#121212' : '#fff';
  const textColor = isDarkMode ? '#fff' : '#000';
  const subtitleColor = isDarkMode ? '#ccc' : '#555';

  const cleanSummary = show.summary ? show.summary.replace(/<[^>]+>/g, '') : 'No description available.';

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      {show.image ? (
        <Image source={{ uri: show.image.original }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={{ color: '#999' }}>No Image</Text>
        </View>
      )}
      <View style={styles.content}>
        <Text style={[styles.title, { color: textColor }]}>{show.name}</Text>

        {show.genres.length > 0 && (
          <View style={styles.genresContainer}>
            {show.genres.map((genre:string) => (
              <Text key={genre} style={[styles.genre, { backgroundColor: isDarkMode ? '#333' : '#eee', color: subtitleColor }]}>
                {genre}
              </Text>
            ))}
          </View>
        )}

        <Text style={[styles.sectionTitle, { color: subtitleColor }]}>Summary</Text>
        <Text style={[styles.description, { color: textColor }]}>{cleanSummary}</Text>

        <TouchableOpacity style={[styles.favoriteButton, { backgroundColor: isDarkMode ? '#333' : '#ddd' }]}>
          <Icon name="heart-outline" size={24} color={isDarkMode ? '#fff' : '#000'} />
          <Text style={[styles.favoriteText, { color: textColor }]}>Añadir a favoritos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { width: '100%', height: 250 },
  placeholder: { width: '100%', height: 250, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ccc' },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  genresContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  genre: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginRight: 8, marginBottom: 8, fontSize: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 16, marginBottom: 8 },
  description: { fontSize: 14, lineHeight: 20 },
  favoriteButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 8, marginTop: 20 },
  favoriteText: { marginLeft: 8, fontSize: 16 },
});

export default DetailScreen;
