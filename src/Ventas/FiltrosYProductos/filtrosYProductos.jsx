import './filtrosYProductos.css';
import { useState, useEffect, useRef } from 'react';
import CardProducto from './Card Producto/cardProducto';
import ProductoGrande from './Card Producto/productoGrande';
import { useProductos } from '../../contextProductos';
import { useTienda } from '../../contextTienda';
import { BotonesOrdenamiento } from './Ordenamiento/botonesOrdenamiento';
import Carrito from '../Carrito/carrito';
import Favoritos from '../Favoritos/favoritos';
import Cortinas from './Cortinas/cortinas';
import Eliminados from './Eliminados/eliminados';
import Paginacion from './Paginacion/paginacion';
import Busqueda from './Filtros/Busqueda/busqueda';
import Filtros from './Filtros/filtros';
import { rubrosPerfiles, marcasPerfiles, srubrosPerfiles } from '../../rubros';
import { useCortinas } from '../../contextCortinas';
import { useAuth } from '../../contextLogin';
import Procesos from './Pocesos/procesos';

export default function FiltrosYProductos() {

  const {
    productosIndexado,
    ordenarProductos,
    productosEliminados,
    dataCargada,
    guardarDestacados
  } = useProductos();

  const {
    cortinasSelected,
    isTablet,
    isMobile,
    rubroActivo,
    coloresActivos,
    productoSeleccionado,
    setProductoSeleccionado,
    eliminadosSelected,
    srubroActivo,
    marcaActiva,
    procesosSelected
  } = useTienda();

  const { state } = useAuth();

  const { setMuestrasAbierto } = useCortinas();

  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtrosYBusquedaOpen, setFiltrosYBusquedaOpen] = useState(false);
  const [startX, setStartX] = useState(0);
  const [coloresUnicos, setColoresUnicos] = useState([]);
  const [srubrosUnicos, setSrubrosUnicos] = useState([]);

  const seleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setProductoSeleccionado(producto);
    const productoEncontrado = listaFiltrada.find(productoSeleccionado => productoSeleccionado.id === producto.id);
    setPaginaActual(Math.floor((listaFiltrada.indexOf(productoEncontrado)) / 33) + 1);
  }

  const handleCloseProductoGrande = () => {
    setProductoSeleccionado(null);
  };

  const paginar = (numeroDePagina) => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setPaginaActual(numeroDePagina);
    }, 350);
  }

  const listaPreFiltrada = Object.values(productosIndexado).filter((p) => {
    const tipoCumple =
      rubroActivo == null ||
      rubroActivo == p.rubro ||
      rubroActivo == 'Perfiles' && rubrosPerfiles.includes(p.rubro) && srubrosPerfiles.find(srubro => srubro.id == p.srubro) ||
      rubroActivo == 'Maquinas' && (p.tipo_prod == 'MAQUINAS' || p.tipo_prod == 'PUNTUAL') && p.rubro == 39 ||
      rubroActivo == 'Herramientas' && p.tipo_prod == 'ACCESORIO' && p.rubro == 39;

    const colorCumple =
      coloresActivos.length === 0 ||
      coloresActivos.includes(p.color);

    const marcaCumple =
      marcaActiva == null ||
      marcaActiva.items.includes(p.marca);

    const srubroCumple =
      srubroActivo == null ||
      srubroActivo == p.srubro;

    const eliminado =
      productosEliminados.includes(p.id);

    return tipoCumple && marcaCumple && srubroCumple && colorCumple && !eliminado;
  });

  const listaFiltrada = Object.values(listaPreFiltrada).filter((p) => {
    const buscarPorCodOrig =
      rubrosPerfiles.includes(p.rubro) && srubrosPerfiles.find(srubro => srubro.id == p.srubro) && p.cod_orig.toString().includes(busqueda);

    const buscarPorCodInt =
      p.tipo_prod != 'PERFIL' && p.cod_int.toString().includes(busqueda);

    const buscarPorDetalle =
      p.detalle.includes(busqueda);

    return (busqueda === '') || buscarPorCodOrig || buscarPorCodInt || buscarPorDetalle;
  });

  const productosOrdenados = ordenarProductos(listaFiltrada);
  const itemsPorPagina = 33;
  const indexUltimoItem = paginaActual * itemsPorPagina;
  const indexPrimerItem = indexUltimoItem - itemsPorPagina;
  const itemsActuales = productosOrdenados.slice(indexPrimerItem, indexUltimoItem);

  useEffect(() => {
    if (coloresActivos.length == 0) {
      setColoresUnicos(Array.from(new Set(
        Object.values(listaPreFiltrada)
          .filter(producto => producto.rubro != 39 && producto.rubro != 81 && producto.rubro != 85 && producto.rubro != 12)
          .map(producto => producto.color)
      )))
    }
  }, [srubroActivo])

  useEffect(() => {
    if (rubroActivo == 'Perfiles' && marcaActiva) {
      setSrubrosUnicos(Array.from(new Set(
        Object.values(listaPreFiltrada)
          .filter(producto =>
            marcaActiva.items.includes(producto.marca)
          )
          .map(producto => {
            return producto.srubro;
          })
      )))
    }
  }, [marcaActiva])


  const toggleFiltros = () => {
    setFiltrosYBusquedaOpen(!filtrosYBusquedaOpen);
  }

  const siguienteProducto = () => {
    const indiceActual = listaFiltrada.indexOf(productoSeleccionado);
    const siguienteIndice = (indiceActual + 1) % listaFiltrada.length;
    seleccionarProducto(listaFiltrada[siguienteIndice]);
  }

  const productoAnterior = () => {
    const indiceActual = listaFiltrada.indexOf(productoSeleccionado);
    const indiceAnterior = (indiceActual - 1) % listaFiltrada.length;
    const ultimoIndice = listaFiltrada[listaFiltrada.length - 1];

    if (indiceActual > 0) {
      seleccionarProducto(listaFiltrada[indiceAnterior])
    }
    else if (indiceActual == 0) {
      seleccionarProducto(ultimoIndice)
    }
  }

  useEffect(() => {
    if (isMobile) {
      const handleDocumentClick = (event) => {
        if (filtrosYBusquedaOpen && !event.target.closest('.filtrosYBusqueda') && !event.target.closest('.botonMostrarFiltrosContainer')) {
          setFiltrosYBusquedaOpen(false)
        }
      }

      const handleDocumentTouchMove = (e) => {
        const currentX = e.touches[0].clientX;
        const diffX = currentX - startX;

        if (diffX < -70) { // Verifica si el movimiento es de derecha a izquierda
          productoSeleccionado != null ? (siguienteProducto()) : (setFiltrosYBusquedaOpen(false));
          cortinasSelected && (setMuestrasAbierto(true));
        }
        else if (diffX > 70) { // Abre el menú si el movimiento es de izquierda a derecha y el menú está cerrado
          productoSeleccionado != null ? (productoAnterior()) : (setFiltrosYBusquedaOpen(true));
          cortinasSelected && (setMuestrasAbierto(false));
        }
      };

      document.addEventListener('click', handleDocumentClick);
      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchmove', handleDocumentTouchMove);

      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleDocumentTouchMove);
      };
    }

  }, [startX]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (productoSeleccionado != null) {
        if (e.keyCode === 37) {
          productoAnterior();
        }
        else if (e.keyCode === 39) {
          siguienteProducto();
        }
        else if (e.keyCode === 27) {
          handleCloseProductoGrande();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [productoSeleccionado]);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  return (
    <div className={`contenedorPrincipalFiltrosYProductos ${isTablet && 'mobile'}`}>
      <div className="decoracionTienda" />
      <div className="filtrosYProductosContainer">
        <div className="botonMostrarFiltrosContainer" style={{ display: isMobile ? 'inline' : 'none' }}>
          (<button style={filtrosYBusquedaOpen ? { transform: 'scale(0.95)' } : {}} className={`botonMostrarFiltros ${filtrosYBusquedaOpen ? 'open' : ''}`} onClick={state.userInfo ? (state.userInfo.tipo_usuario == 'admin' ? (guardarDestacados) : (toggleFiltros)) : (toggleFiltros)}>
            {state.userInfo ?
              (
                state.userInfo.tipo_usuario == 'admin' ?
                  ('Guardar destacados')
                  :
                  (<svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" fillRule="currentColor" className="bi bi-filter" viewBox="0 0 16 16">
                    <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                  </svg>)
              )
              :
              (
                <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" fillRule="currentColor" className="bi bi-filter" viewBox="0 0 16 16">
                  <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                </svg>
              )
            }

          </button>)

        </div>
        {isTablet ?
          (<>
            <Carrito />
            <Favoritos />
          </>)
          :
          (<></>)}
        <div
          className={`filtrosYBusqueda ${filtrosYBusquedaOpen ? 'open' : ''}`}
          id="filtrosYBusqueda"
          style={isTablet ? {} : { top: '8.7rem' }}
        >
          <Busqueda
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            setPaginaActual={setPaginaActual}
          />
          <Filtros
            srubrosUnicos={srubrosUnicos}
            coloresUnicos={coloresUnicos}
            setPaginaActual={setPaginaActual}
          />
        </div>
        <div className="productos" style={isMobile ? ({ width: '100%' }) : ({ width: '80%' })}>

          {cortinasSelected ?
            (<Cortinas />)
            :
            (eliminadosSelected ?
              (<Eliminados />)
              :
              (
                (<>
                  <BotonesOrdenamiento onClick={() => paginar(1)} />
                  <div className="row rowProductos">
                    {dataCargada == true ?
                      (<>
                        {itemsActuales.map((producto) => (
                          <div key={producto.id} className="col-12 col-md-6 col-lg-4 producto">
                            <CardProducto
                              producto={producto}
                              onClick={() => {
                                seleccionarProducto(producto);
                              }}
                            />
                          </div>
                        ))}
                      </>)
                      :
                      (<div className="spinner-border cargandoProductos" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>)
                    }
                  </div>
                </>)
              )
            )
          }
        </div>
      </div>

      {productoSeleccionado && (
        <ProductoGrande
          producto={productoSeleccionado}
          onClose={handleCloseProductoGrande}
          siguiente={siguienteProducto}
          anterior={productoAnterior}
        />
      )}

      {!(cortinasSelected || eliminadosSelected) &&
        (<Paginacion
          paginar={paginar}
          paginaActual={paginaActual}
          indexUltimoItem={indexUltimoItem}
          listaFiltrada={listaFiltrada}
          itemsPorPagina={itemsPorPagina}
        />)
      }
    </div>
  );
}