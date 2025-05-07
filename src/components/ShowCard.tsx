import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Show} from '../services/tvmazeAPI';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {useFavorites} from '../context/FavoritesContext';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface ShowCardProps {
  show: Show;
  onPress: () => void;
}

const ShowCard: React.FC<ShowCardProps> = ({show, onPress}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const {addToFavorites, isFavorite, toggleFavorite} = useFavorites();
  const favorite = isFavorite(show.id);

  return (
    <TouchableOpacity
      style={[styles.card, {backgroundColor: isDarkMode ? '#1e1e1e' : '#fff'}]}
      onPress={() => navigation.navigate('Details', {show})}
      activeOpacity={0.8}>
      {show.image ? (
        <Image
          source={{uri: show.image.medium}}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={{color: '#999'}}>No Image</Text>
        </View>
      )}
      <View style={styles.infoContainer}>
        <Text
          style={[styles.title, {color: isDarkMode ? '#fff' : '#000'}]}
          numberOfLines={2}
          ellipsizeMode="tail">
          {show.name}
        </Text>
        <TouchableOpacity onPress={() => toggleFavorite(show)}>
          <Icon
            name={favorite ? 'heart' : 'heart-outline'}
            size={24}
            color={favorite ? 'red' : 'gray'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  placeholder: {
    width: '100%',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  icon: {
    marginLeft: 8,
  },
});

export default ShowCard;
