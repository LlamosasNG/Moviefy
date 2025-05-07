// src/screens/HomeScreen.tsx
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  useColorScheme,
  View,
  TextInput,
} from 'react-native';
import ShowCard from '../components/ShowCard';
import {fetchShows, Show} from '../services/tvmazeAPI';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';

const HomeScreen = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const isDarkMode = useColorScheme() === 'dark';
  const [filteredShows, setFilteredShows] = useState<Show[]>([]);
  const [searchText, setSearchText] = useState('');

  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

  const handlePress = (show: any) => {
    navigation.navigate('Details', {show});
  };

  const handleSearch = (text: string) => {
    setSearchText(text);

    const normalizedText = text.toLowerCase().trim();

    if (normalizedText === '') {
      setFilteredShows(shows);
      return;
    }

    const filtered = shows.filter(show =>
      show.name?.toLowerCase().includes(normalizedText),
    );
    setFilteredShows(filtered);
  };

  useEffect(() => {
    const loadShows = async () => {
      try {
        const data = await fetchShows();
        setShows(data);
        setFilteredShows(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los shows:', error);
      }
    };
    loadShows();
  }, []);

  const renderItem = ({item}: {item: Show}) => (
    <ShowCard
      show={item}
      onPress={() => {
        handlePress(item);
      }}
    />
  );

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{flex: 1, justifyContent: 'center'}}
      />
    );
  }

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#000' : '#fff'},
      ]}>
      <TextInput
        placeholder="Buscar series..."
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
        value={searchText}
        onChangeText={handleSearch}
        style={[
          styles.searchInput,
          {
            backgroundColor: isDarkMode ? '#222' : '#f0f0f0',
            color: isDarkMode ? '#fff' : '#000',
            borderColor: isDarkMode ? '#444' : '#ccc',
          },
        ]}
      />
      <FlatList
        data={shows}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 8,
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 180,
  },
  placeholder: {
    width: '100%',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  title: {
    padding: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderColor: '#ccc',
    color: 'gray',
  },
});

export default HomeScreen;
