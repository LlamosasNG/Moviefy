// src/context/FavoritesContext.tsx
import React, {createContext, useContext, useState, ReactNode} from 'react';
import {Show} from '../services/tvmazeAPI';

interface FavoritesContextProps {
  favorites: Show[];
  addToFavorites: (show: Show) => void;
  removeFromFavorites: (id: number) => void;
  toggleFavorite: (show: Show) => void;
  isFavorite: (showId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined,
);

export const FavoritesProvider = ({children}: {children: ReactNode}) => {
  const [favorites, setFavorites] = useState<Show[]>([]);

  const addToFavorites = (show: Show) => {
    setFavorites(prev => {
      if (prev.find(item => item.id === show.id)) {
        return prev; // ya está agregado
      }
      return [...prev, show];
    });
  };

  const removeFromFavorites = (id: number) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const toggleFavorite = (show: any) => {
    setFavorites(prev => {
      const exists = prev.find(item => item.id === show.id);
      if (exists) {
        return prev.filter(item => item.id !== show.id);
      } else {
        return [...prev, show];
      }
    });
  };

  const isFavorite = (showId: number) => {
    return favorites.some(item => item.id === showId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
  }
  return context;
};
