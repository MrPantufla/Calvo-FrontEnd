import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './contextLogin';

const FavoritosContext = createContext();

function useFavoritos() {
  return useContext(FavoritosContext);
}

function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);
  const auth = useAuth();

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

  const actualizarFavoritos = () => {
    // Obtén la lista de favoritos del estado local
    const listaFavoritos = favoritos;
    // Convierte la lista de favoritos a una cadena separada por espacios
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

  /*useEffect(() => {
    // Verificar si ya se ha inicializado
    if (inicializado) {
      if (auth.state.logueado) {
        actualizarFavoritos();
        console.log("se activa igual")
      }
    } else {
      // Marcar como inicializado
      setInicializado(true);
      console.log("entra en else")
    }
  }, [toggleFavorito]); REVISAR ESTO Y VER COMO METERLO*/

  return (
    <FavoritosContext.Provider value={{ actualizarFavoritos, favoritos, setFavoritos, agregarFavorito, quitarFavorito, esFavorito, toggleFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export { FavoritosContext, useFavoritos, FavoritosProvider };