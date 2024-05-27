import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCarrito } from './contextCarrito';
import { useFavoritos } from './contextFavoritos';
import { useProductos } from './contextProductos';

const TiendaContext = createContext();

function useTienda() {
  return useContext(TiendaContext);
}

function TiendaProvider({ children }) {
  const [rubroActivo, setRubroActivo] = useState(null);
  const [srubroActivo, setSrubroActivo] = useState(null);
  const [coloresActivos, setColoresActivos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 820);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isFold, setIsFold] = useState(window.innerWidth <= 280);
  const [mostrarPagos, setMostrarPagos] = useState(false);
  const [cortinasSelected, setCortinasSelected] = useState(false);
  const [eliminadosSelected, setEliminadosSelected] = useState(false);

  const {
    setOrdenamientoActivo
  } = useProductos();

  const {
    setCarritoAbierto,
  } = useCarrito();

  const {
    setFavoritosAbierto
  } = useFavoritos();

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

  const salirDeTienda = () => {
    togglearRubro(null);
    togglearSrubro(null);
    setColoresActivos([]);
    setCarritoAbierto(false);
    setFavoritosAbierto(false);
    setOrdenamientoActivo('');
  }

  const seleccionarEliminados = () => {
    setCortinasSelected(false);

    if (!eliminadosSelected) {
      setRubroActivo([]);
      setEliminadosSelected(true);
    }
    else {
      setEliminadosSelected(false);
      setRubroActivo(null);
    }
  }

  const limpiarColoresActivos = () => {
    setColoresActivos([]);
  }

  const seleccionarCortinas = () => {
    setEliminadosSelected(false);

    if (!cortinasSelected) {
      setRubroActivo([]);
      setCortinasSelected(true);
    }
    else {
      setCortinasSelected(false);
      setRubroActivo(null);
    }
  }

  const togglearRubro = (rubro) => {
    setCortinasSelected(false);
    setEliminadosSelected(false);
    if (rubroActivo == rubro) {
      setRubroActivo(null);
    }
    else {
      setRubroActivo(rubro);
    }
    setSrubroActivo(null);
  }

  const togglearSrubro = (srubro) => {
    if (srubroActivo == srubro) {
      setSrubroActivo(null)
    }
    else {
      setSrubroActivo(srubro)
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
      rubroActivo,
      setRubroActivo,
      coloresActivos,
      setColoresActivos,
      eliminadosSelected,
      setEliminadosSelected,
      seleccionarEliminados,
      togglearRubro,
      srubroActivo,
      togglearSrubro,
      salirDeTienda
    }}>
      {children}
    </TiendaContext.Provider>
  );
}

export { TiendaContext, useTienda, TiendaProvider };
