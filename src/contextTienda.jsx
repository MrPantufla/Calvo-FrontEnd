import React, { createContext, useContext, useState, useEffect } from 'react';

const TiendaContext = createContext();

function useTienda() {
  return useContext(TiendaContext);
}

function TiendaProvider({ children }) {
  const [tiposActivos, setTiposActivos] = useState([]);
  const [coloresActivos, setColoresActivos] = useState([]);

  const limpiarColoresActivos = () =>{
    setColoresActivos([]);
  }

  return (
    <TiendaContext.Provider value={{ limpiarColoresActivos, tiposActivos, setTiposActivos, coloresActivos, setColoresActivos }}>
      {children}
    </TiendaContext.Provider>
  );
}

export { TiendaContext, useTienda, TiendaProvider };
