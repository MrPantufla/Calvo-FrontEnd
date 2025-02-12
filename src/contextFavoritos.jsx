import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './contextLogin';
import { useVariables } from './contextVariables';

const FavoritosContext = createContext();

function useFavoritos() {
  return useContext(FavoritosContext);
}

function FavoritosProvider({ children }) {
  const {
    backend,
    obtenerToken
  } = useVariables();

  const { state } = useAuth();

  const [favoritos, setFavoritos] = useState([]);
  const [actualizarFavoritosPending, setActualizarFavoritosPending] = useState(false);
  const [favoritosAbierto, setFavoritosAbierto] = useState(false);

  useEffect(() => {
    if (actualizarFavoritosPending) {
      actualizarFavoritos();
      setActualizarFavoritosPending(false);
    }
  }, [favoritos, actualizarFavoritosPending]);

  useEffect(() => {
    if (state.logueado && state.userInfo.favoritos != null) {
      const listaFavoritos = state.userInfo.favoritos.trim() !== '' ? state.userInfo.favoritos.split(' ').map(Number) : [];
      setFavoritos(listaFavoritos);
    }
  }, [state.logueado]);

  function agregarFavorito(idArticulo) {
    if (!favoritos.includes(idArticulo)) {
      setFavoritos([...favoritos, idArticulo]);
      setActualizarFavoritosPending(true);
    }
  }

  function quitarFavorito(idArticulo) {
    setFavoritos(favoritos.filter((id) => id !== idArticulo));
    setActualizarFavoritosPending(true);
  }

  function toggleFavorito(idArticulo) {
    if (esFavorito(idArticulo)) {
      quitarFavorito(idArticulo);
    } else {
      agregarFavorito(idArticulo);
    }
  }

  function esFavorito(idArticulo) {
    return favoritos.includes(idArticulo);
  }

  const actualizarFavoritos = () => {
    const listaFavoritos = [...favoritos];
    const listaFavoritosString = listaFavoritos.join(' ');

    fetch(`${backend}/favoritos/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/text',
        'Authorization': obtenerToken(),
      },
      body: listaFavoritosString || ' ',
    })
      .catch(error => {
        console.error('Error al enviar la lista de favoritos al servidor:', error);
      });
  }

  return (
    <FavoritosContext.Provider value={{
      favoritosAbierto,
      setFavoritosAbierto,
      actualizarFavoritos,
      favoritos,
      setFavoritos,
      agregarFavorito,
      quitarFavorito,
      esFavorito,
      toggleFavorito
    }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export { FavoritosContext, useFavoritos, FavoritosProvider };
