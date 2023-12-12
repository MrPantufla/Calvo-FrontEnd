import React, { createContext, useContext, useState } from 'react';

const FavoritosContext = createContext();

function useFavoritos() {
  return useContext(FavoritosContext);
}

function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);

  function agregarFavorito(idArticulo) {
    if (!favoritos.includes(idArticulo)) {
      setFavoritos([...favoritos, idArticulo]);
    }
  }

  function quitarFavorito(idArticulo) {
    setFavoritos(favoritos.filter((id) => id !== idArticulo));
  }

  function toggleFavorito(idArticulo){
    esFavorito(idArticulo) ? (quitarFavorito(idArticulo)) : (agregarFavorito(idArticulo));
  }

  function esFavorito(idArticulo) {
    return favoritos.includes(idArticulo);
  }

  return (
    <FavoritosContext.Provider value={{ favoritos, agregarFavorito, quitarFavorito, esFavorito, toggleFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export { FavoritosContext, useFavoritos, FavoritosProvider };