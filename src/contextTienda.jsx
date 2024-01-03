import React, { createContext, useContext, useState, useEffect } from 'react';

const TiendaContext = createContext();

function useTienda() {
  return useContext(TiendaContext);
}

function TiendaProvider({ children }) {
  const [tiposActivos, setTiposActivos] = useState([]);
  const [coloresActivos, setColoresActivos] = useState([]);

  return (
    <TiendaContext.Provider value={{ tiposActivos, setTiposActivos, coloresActivos, setColoresActivos }}>
      {children}
    </TiendaContext.Provider>
  );
}

export { TiendaContext, useTienda, TiendaProvider };
