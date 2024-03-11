import React, { createContext, useContext, useState, useEffect } from 'react';

const TiendaContext = createContext();

function useTienda() {
  return useContext(TiendaContext);
}

function TiendaProvider({ children }) {
  const [tipoActivo, setTipoActivo] = useState(null);
  const [coloresActivos, setColoresActivos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 820);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isFold, setIsFold] = useState(window.innerWidth <= 280);
  const [mostrarPagos, setMostrarPagos] = useState(false);
  const [cortinasSelected, setCortinasSelected] = useState(false);
  const [eliminadosSelected, setEliminadosSelected] = useState(false);
  const [busquedaYFiltrosTop, setBusquedaYFiltrosTop] = useState(10.6);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxBusquedaYFiltrosTop = 10.6;
      const minBusquedaYFiltrosTop = 8.6;
      const alturaHeader = 150;

      let newTop =
        maxBusquedaYFiltrosTop -
        (maxBusquedaYFiltrosTop - minBusquedaYFiltrosTop) * (scrollPosition / alturaHeader);

      newTop = Math.max(minBusquedaYFiltrosTop, newTop);
      setBusquedaYFiltrosTop(newTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 820);
      setIsMobile(window.innerWidth < 767);
      setIsFold(window.innerWidth <= 280);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const seleccionarEliminados = () =>{
    setTipoActivo([]);
    setCortinasSelected(false);
    setEliminadosSelected(!eliminadosSelected);
  }

  const limpiarColoresActivos = () => {
    setColoresActivos([]);
  }

  const seleccionarCortinas = () => {
    setTipoActivo([]);
    setEliminadosSelected(false);
    setCortinasSelected(!cortinasSelected);
  }

  const togglearTipo = (tipo) =>{
    if(tipoActivo == tipo){
      setTipoActivo(null);
    }
    else{
      setTipoActivo(tipo);
    }
  }

  return (
    <TiendaContext.Provider value={{
      seleccionarCortinas,
      cortinasSelected,
      setCortinasSelected,
      mostrarPagos,
      setMostrarPagos,
      isTablet,
      isFold,
      isMobile,
      productoSeleccionado,
      setProductoSeleccionado,
      limpiarColoresActivos,
      tipoActivo, 
      setTipoActivo,
      coloresActivos,
      setColoresActivos,
      busquedaYFiltrosTop,
      setBusquedaYFiltrosTop,
      eliminadosSelected,
      setEliminadosSelected,
      seleccionarEliminados,
      togglearTipo
    }}>
      {children}
    </TiendaContext.Provider>
  );
}

export { TiendaContext, useTienda, TiendaProvider };
