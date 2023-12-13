import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './contextLogin';

const FavoritosContext = createContext();

function useFavoritos() {
  return useContext(FavoritosContext);
}

function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);
  const auth = useAuth();
  const [actualizarFavoritosPending, setActualizarFavoritosPending] = useState(false);

  useEffect(() => {
    if (actualizarFavoritosPending) {
      actualizarFavoritos();
      setActualizarFavoritosPending(false);
    }
  }, [favoritos, actualizarFavoritosPending]);

  useEffect(() => {
    if (auth.state.logueado && auth.state.userInfo.favoritos!=null) {
      const listaFavoritos = auth.state.userInfo.favoritos.trim() !== '' ? auth.state.userInfo.favoritos.split(' ').map(Number) : [];
      setFavoritos(listaFavoritos);
    }
  }, [auth.state.logueado]);

  function agregarFavorito(idArticulo) {
    if (!favoritos.includes(idArticulo)) {
      setFavoritos([...favoritos, idArticulo]);
      setActualizarFavoritosPending(true);
    }
    console.log("agregar a favoritos el elemento " + idArticulo)
    console.log("lista completa: " + favoritos)
  }

  function quitarFavorito(idArticulo) {
    setFavoritos(favoritos.filter((id) => id !== idArticulo));
    setActualizarFavoritosPending(true);
    console.log("quitar de favoritos el elemento " + idArticulo)
    console.log("lista completa: " + favoritos)
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

    fetch('http://localhost:8080/api/actualizarFavoritos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: auth.state.userInfo.email, favoritos: listaFavoritosString }),
    })
      .then(response => response.json())
      .then(data => {
        // Manejar la respuesta del servidor, si es necesario
      })
      .catch(error => {
        console.error('Error al enviar la lista de favoritos al servidor:', error);
      });
  };

  return (
    <FavoritosContext.Provider value={{ actualizarFavoritos, favoritos, setFavoritos, agregarFavorito, quitarFavorito, esFavorito, toggleFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export { FavoritosContext, useFavoritos, FavoritosProvider };
