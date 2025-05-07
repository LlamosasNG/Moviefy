import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useTheme} from '@react-navigation/native';

const AppHeader = () => {
  const navigation = useNavigation();
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';

  const handleAccountPress = () => {
    console.log('Account icon pressed');
    // navigation.navigate('Profile') // cuando tengas la pantalla
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../public/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={handleAccountPress}>
        <Icon
          name="person-circle-outline"
          size={30}
          color={isDarkMode ? '#fff' : '#000'}
        />
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      height: 60,
      paddingHorizontal: 16,
      backgroundColor: isDarkMode ? '#121212' : '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      elevation: 4,
      shadowColor: isDarkMode ? '#000' : '#000',
      shadowOpacity: 0.2,
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 4,
    },
    logo: {
      width: 120,
      height: 120,
    },
  });

export default AppHeader;
