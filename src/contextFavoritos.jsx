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
    if (auth.state.logueado && auth.state.userInfo.favoritos != null) {
      const listaFavoritos = auth.state.userInfo.favoritos.trim() !== '' ? auth.state.userInfo.favoritos.split(' ').map(Number) : [];
      setFavoritos(listaFavoritos);
    }
  }, [auth.state.logueado]);

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

    fetch('http://localhost:8080/api/actualizarFavoritos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/text',
      },
      credentials: 'include',
      body:  listaFavoritosString || ' ',
    })
      .then(response => {
        if (response.ok) {
          // Procesar la respuesta exitosa
          console.log('Envío de favoritos exitoso');
        } else {
          // Procesar la respuesta de error
          console.error('Error en el envío de favoritos:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error al enviar la lista de favoritos al servidor:', error);
      });
    }

    return (
      <FavoritosContext.Provider value={{ actualizarFavoritos, favoritos, setFavoritos, agregarFavorito, quitarFavorito, esFavorito, toggleFavorito }}>
        {children}
      </FavoritosContext.Provider>
    );
  }

  export { FavoritosContext, useFavoritos, FavoritosProvider };
