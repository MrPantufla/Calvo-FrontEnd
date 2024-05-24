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
import { useAuth } from '../../contextLogin';
import Eliminados from './Eliminados/eliminados';
import { rubros } from '../../rubros';
import Paginacion from './Paginacion/paginacion';
import Rubros from './Filtros/Rubros/rubros';

export default function FiltrosYProductos() {

  const { state } = useAuth();

  const {
    productosIndexado,
    ordenarProductos,
    productosEliminados,
    dataCargada
  } = useProductos();

  const {
    seleccionarCortinas,
    cortinasSelected,
    isTablet,
    isMobile,
    rubroActivo,
    coloresActivos,
    productoSeleccionado,
    setProductoSeleccionado,
    eliminadosSelected,
    seleccionarEliminados,
    srubroActivo,
  } = useTienda();

  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtrosYBusquedaOpen, setFiltrosYBusquedaOpen] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollDownFiltros, setScrollDownFiltros] = useState(false);
  const [listaColores, setListaColores] = useState(null);

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

  const listaFiltrada = Object.values(productosIndexado).filter((p) => {
    const tipoCumple = rubroActivo == null || rubroActivo == p.rubro || rubroActivo == 'Perfiles' && p.tipo_prod == 'PERFIL' || (rubroActivo == 'Maquinas' && p.tipo_prod == 'MAQUINAS' && p.rubro == 39) || (rubroActivo == 'Herramientas' && p.tipo_prod == 'ACCESORIO' && p.rubro == 39);
    const colorCumple = coloresActivos.length === 0 || coloresActivos.includes(p.color);
    const srubroCumple = srubroActivo == null || srubroActivo == p.srubro;
    const buscarPorCodInt = p.cod_orig.toString().includes(busqueda);
    const buscarPorDetalle = p.detalle.includes(busqueda);
    const eliminado = productosEliminados.includes(p.id);
    return tipoCumple && srubroCumple && (busqueda === '' || buscarPorCodInt || buscarPorDetalle) && colorCumple && !eliminado;
  });

  const productosOrdenados = ordenarProductos(listaFiltrada);
  const itemsPorPagina = 33;
  const indexUltimoItem = paginaActual * itemsPorPagina;
  const indexPrimerItem = indexUltimoItem - itemsPorPagina;
  const itemsActuales = productosOrdenados.slice(indexPrimerItem, indexUltimoItem);

  let coloresUnicos;
  if (listaColores !== null) {
    coloresUnicos = Array.from(new Set(
      Object.values(listaColores)
        .filter(producto => producto.rubro != 39 && producto.rubro != 81 && producto.rubro != 85 && producto.rubro != 12)
        .map(producto => producto.color)
    ));
  }

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
          productoSeleccionado != null ? (siguienteProducto()) : (setFiltrosYBusquedaOpen(false))
        }
        else if (diffX > 70) { // Abre el menú si el movimiento es de izquierda a derecha y el menú está cerrado
          productoSeleccionado != null ? (productoAnterior()) : (setFiltrosYBusquedaOpen(true))
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

  useEffect(() => {
    if (!isMobile) {
      const elemento = document.getElementById('filtros');

      const handleScroll = () => {
        let atEnd;
        if (elemento.scrollTop == 0) {
          atEnd = elemento.scrollTop + elemento.clientHeight >= elemento.scrollHeight;
        }
        else {
          atEnd = elemento.scrollTop + elemento.clientHeight >= elemento.scrollHeight;
        }

        setScrollDownFiltros(!atEnd);
      };

      handleScroll(); // Para verificar el estado inicial

      elemento.addEventListener('scroll', handleScroll);

      return () => {
        elemento.removeEventListener('scroll', handleScroll);
      };
    }
  }, [rubroActivo]);

  useEffect(() => {
    setListaColores(listaFiltrada)
  }, [srubroActivo])

  const scrollearFiltros = () => {
    const elemento = document.getElementById('filtros');
    elemento.scrollBy({
      top: 200,
      behavior: 'smooth'
    });
  }

  return (
    <div className={`contenedorPrincipalFiltrosYProductos ${isTablet && 'mobile'}`}>
      <div className="decoracionTienda" />
      <div className="filtrosYProductosContainer">
        <div className="botonMostrarFiltrosContainer" style={{ display: isMobile ? 'inline' : 'none' }}>
          <button style={filtrosYBusquedaOpen ? { transform: 'scale(0.95)' } : {}} className={`botonMostrarFiltros ${filtrosYBusquedaOpen ? 'open' : ''}`} onClick={toggleFiltros}>FILTROS</button>
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
          style={!isTablet ? { top: `8.7rem` } : {}}
        >
          <div className="busquedaEIcono">
            <input
              className="busqueda"
              type="text"
              placeholder="Buscar por código o nombre"
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value.toUpperCase());
                setPaginaActual(1);
              }}
              style={isMobile && !filtrosYBusquedaOpen ? { padding: '0' } : {}}>
            </input>
            <div className="lupaContainer">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </div>
          </div>
          <div className='filtros' id='filtros'>
            {rubros.map((rubro) => (
              <Rubros rubro={rubro} setPaginaActual={setPaginaActual} coloresUnicos={coloresUnicos} key={rubro.id}/>
            ))}
            <div className={`labelRubros ${cortinasSelected ? 'checked' : ''} textoLabelRubros ${(state.userInfo && state.userInfo.tipo_usuario !== 'admin') && 'ultimoLabel'}`} onClick={() => seleccionarCortinas()}>CORTINAS</div>
            {state.userInfo && (state.userInfo.tipo_usuario == 'admin' && (<div className={`labelRubros ${eliminadosSelected ? 'checked' : ''} textoLabelRubros ultimoLabel`} onClick={() => seleccionarEliminados()}>ELIMINADOS</div>))}
          </div>
          {!isMobile ?
            (
              <div className={`scrollerFiltros ${scrollDownFiltros ? 'enabled' : 'disabled'}`} onClick={scrollearFiltros}>
                <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" className="bi bi-arrow-down-short" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4" />
                </svg>
              </div>
            )
            :
            ('')
          }
        </div>
        <div className="productos" style={isMobile ? ({ width: '100%' }) : ({ width: '80%' })}>

          {cortinasSelected ?
            (<Cortinas />)
            :
            (eliminadosSelected ?
              (<Eliminados />)
              :
              (<>
                <BotonesOrdenamiento onClick={() => paginar(1)} />
                <div className="row rowProductos">
                  {dataCargada == true ?
                    (<>
                      {itemsActuales.map((producto) => (
                        <div key={producto.id} className="col-12 col-md-6 col-lg-4 producto">
                          <CardProducto
                            id={producto.id}
                            cod_orig={producto.cod_orig}
                            tipo_prod={producto.tipo_prod}
                            srubro={producto.srubro}
                            detalle={producto.detalle}
                            precio={producto.precio}
                            color={producto.color}
                            kg={producto.kg}
                            key={producto.id}
                            cod_int={producto.cod_int}
                            onClick={() => {
                              seleccionarProducto(producto);
                            }}
                            pesos={producto.pesos}
                            dolar={producto.dolar}
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
          }
        </div>
      </div>

      {productoSeleccionado && (
        <ProductoGrande
          id={productoSeleccionado.id}
          cod_orig={productoSeleccionado.cod_orig}
          detalle={productoSeleccionado.detalle}
          onClose={handleCloseProductoGrande}
          tipo_prod={productoSeleccionado.tipo_prod}
          precio={productoSeleccionado.precio}
          color={productoSeleccionado.color}
          kg={productoSeleccionado.kg}
          cod_int={productoSeleccionado.cod_int}
          siguiente={siguienteProducto}
          anterior={productoAnterior}
        />
      )}

      {(cortinasSelected || eliminadosSelected) ? (<></>)
        :
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