import React, { createContext, useContext, useState, useEffect } from 'react';

const TiendaContext = createContext();

function useTienda() {
  return useContext(TiendaContext);
}

function TiendaProvider({ children }) {
  const [tiposActivos, setTiposActivos] = useState([]);
  const [coloresActivos, setColoresActivos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 820);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isFold, setIsFold] = useState(window.innerWidth <= 280);
  const [mostrarPagos, setMostrarPagos] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 820);
      setIsMobile(window.innerWidth < 768);
      setIsFold(window.innerWidth <= 280);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const limpiarColoresActivos = () => {
    setColoresActivos([]);
  }

  return (
    <TiendaContext.Provider value={{mostrarPagos, setMostrarPagos ,isTablet, isFold, isMobile, productoSeleccionado, setProductoSeleccionado, limpiarColoresActivos, tiposActivos, setTiposActivos, coloresActivos, setColoresActivos }}>
      {children}
    </TiendaContext.Provider>
  );
}

export { TiendaContext, useTienda, TiendaProvider };
