import React, { createContext, useContext, useState, useEffect } from 'react';

const TiendaContext = createContext();

function useTienda() {
  return useContext(TiendaContext);
}

function TiendaProvider({ children }) {
  const [tiposActivos, setTiposActivos] = useState([]);

    return (
      <TiendaContext.Provider value={{ tiposActivos, setTiposActivos }}>
        {children}
      </TiendaContext.Provider>
    );
  }

  export { TiendaContext, useTienda, TiendaProvider };
