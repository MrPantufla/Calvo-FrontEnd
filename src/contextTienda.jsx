import React, { createContext, useContext, useState, useEffect } from 'react';

const TiendaContext = createContext();

function useTienda() {
  return useContext(TiendaContext);
}

function TiendaProvider({ children }) {
  const [tiposActivos, setTiposActivos] = useState([]);
  const [coloresActivos, setColoresActivos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isFold, setIsFold] = useState(window.innerWidth <= 280);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsFold(window.innerWidth <= 280);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const limpiarColoresActivos = () =>{
    setColoresActivos([]);
  }

  return (
    <TiendaContext.Provider value={{isFold ,isMobile, productoSeleccionado, setProductoSeleccionado, limpiarColoresActivos, tiposActivos, setTiposActivos, coloresActivos, setColoresActivos }}>
      {children}
    </TiendaContext.Provider>
  );
}

export { TiendaContext, useTienda, TiendaProvider };
