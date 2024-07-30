import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCarrito } from './contextCarrito';
import { useFavoritos } from './contextFavoritos';
import { useProductos } from './contextProductos';
import { useLocation, useNavigate } from 'react-router-dom';
import { marcasPerfiles, srubrosPerfiles } from './rubros';

const TiendaContext = createContext();

function useTienda() {
  return useContext(TiendaContext);
}

function TiendaProvider({ children }) {
  const [rubroActivo, setRubroActivo] = useState(null);
  const [marcaActiva, setMarcaActiva] = useState(null);
  const [srubroActivo, setSrubroActivo] = useState(null);
  const [coloresActivos, setColoresActivos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 820);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isFold, setIsFold] = useState(window.innerWidth <= 280);
  const [mostrarPagos, setMostrarPagos] = useState(false);
  const [cortinasSelected, setCortinasSelected] = useState(false);
  const [eliminadosSelected, setEliminadosSelected] = useState(false);
  const [procesosSelected, setProcesosSelected] = useState(false);
  const [tipoProceso, setTipoProceso] = useState(null);
  const [stipoProceso, setStipoProceso] = useState(null);
  const [acabado, setAcabado] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const {
    setOrdenamientoActivo
  } = useProductos();

  const {
    setCarritoAbierto,
  } = useCarrito();

  const {
    setFavoritosAbierto
  } = useFavoritos();

  const location = useLocation();
  const navigate = useNavigate();

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

  // Actualizar estados de los filtros basado en los parámetros de la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const rubro = params.get('rubro');
    const marca = params.get('marca');
    const srubro = params.get('srubro');
    const colores = params.getAll('colores');

    if (rubro) {
      if (rubro != 'Procesos' && rubro != 'Eliminados' && rubro != 'Cortinas') {
        setRubroActivo(rubro);
      }
      else {
        if (rubro == 'Cortinas') {
          setCortinasSelected(true);
        }
        else if (rubro == 'Procesos') {
          setProcesosSelected(true);
        }
        else if (rubro == 'Eliminados') {
          setEliminadosSelected(true);
        }
      }
    }

    if (marca) setMarcaActiva(marcasPerfiles.find(marcaPerfil => marcaPerfil.nombre == marca));

    if (srubro) setSrubroActivo(srubro);
    setColoresActivos(colores);
  }, []);

  // Actualizar la URL cuando los filtros cambian
  useEffect(() => {
    const params = new URLSearchParams();
    if (rubroActivo) {
      params.set('rubro', rubroActivo);
    }

    if (procesosSelected) {
      params.set('rubro', 'Procesos');
    }
    else if (cortinasSelected) {
      params.set('rubro', 'Cortinas')
    }
    else if (eliminadosSelected) {
      params.set('rubro', 'Eliminados')
    }

    if (marcaActiva) params.set('marca', marcaActiva.nombre)

    if (srubroActivo) params.set('srubro', srubroActivo);
    coloresActivos.forEach(color => params.append('colores', color));
    navigate({ search: params.toString() });
  }, [rubroActivo, srubroActivo, coloresActivos, navigate]);

  const salirDeTienda = () => {
    togglearRubro(null);
    togglearSrubro(null);
    togglearMarca(null);
    togglearSrubro(null);
    setTipoProceso(null);
    setStipoProceso(null);
    setAcabado(null);
    setColoresActivos([]);
    setCarritoAbierto(false);
    setFavoritosAbierto(false);
    setOrdenamientoActivo('');
  }

  const seleccionarEliminados = () => {
    setCortinasSelected(false);
    setProcesosSelected(false);
    setTipoProceso(null);
    setStipoProceso(null);
    setAcabado(null);

    if (!eliminadosSelected) {
      setRubroActivo([]);
      setEliminadosSelected(true);
    }
    else {
      setEliminadosSelected(false);
      setRubroActivo(null);
    }
  }

  const seleccionarCortinas = () => {
    setEliminadosSelected(false);
    setProcesosSelected(false);
    setTipoProceso(null);
    setStipoProceso(null);
    setAcabado(null);

    if (!cortinasSelected) {
      setRubroActivo([]);
      setCortinasSelected(true);
    }
    else {
      setCortinasSelected(false);
      setRubroActivo(null);
    }
  }

  const seleccionarProcesos = () => {
    setEliminadosSelected(false);
    setCortinasSelected(false);
    setTipoProceso(null);
    setStipoProceso(null);
    setAcabado(null);

    if (!procesosSelected) {
      setRubroActivo([]);
      setProcesosSelected(true);
    }
    else {
      setProcesosSelected(false);
      setRubroActivo(null);
    }
  }

  const togglearRubro = (rubro) => {
    setCortinasSelected(false);
    setEliminadosSelected(false);
    setProcesosSelected(false);
    setSrubroActivo(null);
    setMarcaActiva(null);
    setTipoProceso(null);
    setStipoProceso(null);
    setAcabado(null);

    if (rubroActivo == rubro) {
      setRubroActivo(null);
    }
    else {
      setRubroActivo(rubro);
    }
  }

  const togglearMarca = (marca) => {
    if (marcaActiva == marca) {
      setMarcaActiva(null);
    }
    else {
      setMarcaActiva(marca);
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
      salirDeTienda,
      marcaActiva,
      togglearMarca,
      procesosSelected,
      seleccionarProcesos,
      setTipoProceso,
      tipoProceso,
      stipoProceso,
      setStipoProceso,
      acabado,
      setAcabado,
      menuAbierto,
      setMenuAbierto
    }}>
      {children}
    </TiendaContext.Provider>
  );
}

export { TiendaContext, useTienda, TiendaProvider };
