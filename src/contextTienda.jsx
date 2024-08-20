import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCarrito } from './contextCarrito';
import { useFavoritos } from './contextFavoritos';
import { useProductos } from './contextProductos';
import { useLocation, useNavigate } from 'react-router-dom';
import { useVariables } from './contextVariables';

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
  const [softwareSelected, setSoftwareSelected] = useState(false);
  const [procesosSelected, setProcesosSelected] = useState(false);
  const [tipoProceso, setTipoProceso] = useState(null);
  const [stipoProceso, setStipoProceso] = useState(null);
  const [acabado, setAcabado] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [rubros, setRubros] = useState([]);
  const [imagenSoftwareSeleccionada, setImagenSoftwareSeleccionada] = useState(null);
  
  const {
    setOrdenamientoActivo,
    procesos,
    setProcesos,
    marcas,
    ordenamientoActivo,
    ordenarProductos,
    productosIndexado
  } = useProductos();

  const {
    setCarritoAbierto,
  } = useCarrito();

  const {
    setFavoritosAbierto
  } = useFavoritos();

  const {
    backend
  } = useVariables();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 820);
      setIsMobile(window.innerWidth <= 767);
      setIsFold(window.innerWidth <= 280);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    obtenerRubros();
  }, [])

  // Actualizar estados de los filtros basado en los parámetros de la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const rubro = params.get('rubro');
    const marca = params.get('marca');
    const srubro = params.get('srubro');
    const colores = params.getAll('colores');
    const ordenamiento = params.getAll('ordenamiento');

    if (rubro) {
      if (rubro !== 'Procesos' && rubro !== 'Eliminados' && rubro !== 'Cortinas' && rubro !== 'Software') {
        setRubroActivo(rubros.find(rubroObjeto => rubroObjeto.id === rubro));
      } else {
        if (rubro == 'Cortinas') {
          setCortinasSelected(true);
        } else if (rubro == 'Procesos') {
          setProcesosSelected(true);
        } else if (rubro == 'Software') {
          setSoftwareSelected(true);
        } else if (rubro == 'Eliminados') {
          setEliminadosSelected(true);
        }
      }
    }

    if (marca) {
      setMarcaActiva(marcas.find(marcaPerfil => marcaPerfil.nombre == marca));
    }

    if (srubro && rubro) {
      const rubroEncontrado = rubros.find(rubroActual => rubroActual.id == rubro);
      if (rubroEncontrado && rubroEncontrado.srubros.length > 0) {
        setSrubroActivo(rubroEncontrado.srubros.find(busquedaSrubro => busquedaSrubro.id == srubro));
      }
    }

    setOrdenamientoActivo(ordenamiento)

    setColoresActivos(colores);
  }, [marcas, rubros, setProcesos]);
  
  // Actualizar la URL cuando los filtros cambian
  useEffect(() => {
    if (marcas.length > 0 && rubros.length > 0) {
      const params = new URLSearchParams();

      if (rubroActivo) {
        params.set('rubro', rubroActivo.id);
      }
      else if (procesosSelected && Object.keys(procesos).length > 0) {
        params.set('rubro', 'Procesos');
      }
      if (cortinasSelected) {
        params.set('rubro', 'Cortinas')
      }
      else if (eliminadosSelected) {
        params.set('rubro', 'Eliminados')
      }
      else if(softwareSelected){
        params.set('rubro', 'Software')
      }

      if (marcaActiva) params.set('marca', marcaActiva.nombre)

      if (srubroActivo) params.set('srubro', srubroActivo.id);

      if(ordenamientoActivo != 'destacados') params.set('ordenamiento', ordenamientoActivo)

      coloresActivos.forEach(color => params.append('colores', color));
      navigate({ search: params.toString() });
    }
  }, [marcaActiva, rubroActivo, srubroActivo, coloresActivos, procesosSelected, cortinasSelected, eliminadosSelected, tipoProceso, stipoProceso, procesos, ordenamientoActivo,navigate]);

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
    setSoftwareSelected(false);

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
    setSoftwareSelected(false);

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
    setSoftwareSelected(false);

    if (!procesosSelected) {
      setRubroActivo(null);
      setSrubroActivo(null);
      setMarcaActiva(null);
      setProcesosSelected(true);
    }
    else {
      setProcesosSelected(false);
      setRubroActivo(null);
    }
  }

  const seleccionarSoftware = () =>{
    setEliminadosSelected(false);
    setCortinasSelected(false);
    setProcesosSelected(false);
    setTipoProceso(null);
    setStipoProceso(null);
    setAcabado(null);

    if(!softwareSelected){
      setRubroActivo([]);
      setSoftwareSelected(true);
    }
    else{
      setRubroActivo(null);
      setSoftwareSelected(false);
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
    setSoftwareSelected(false);

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

  const obtenerRubros = async () => {
    const response = await fetch(`${backend}/api/rubros`);

    if (response.ok) {
      const rubros = await response.json();
      setRubros(rubros);
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
      setMenuAbierto,
      obtenerRubros,
      marcas,
      rubros,
      softwareSelected,
      seleccionarSoftware,
      imagenSoftwareSeleccionada,
      setImagenSoftwareSeleccionada
    }}>
      {children}
    </TiendaContext.Provider>
  );
}

export { TiendaContext, useTienda, TiendaProvider };
