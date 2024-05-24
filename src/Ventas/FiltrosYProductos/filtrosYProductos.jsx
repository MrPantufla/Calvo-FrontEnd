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
import Srubros from './Filtros/Srubros/srubros';

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
    setCortinasSelected,
    isTablet,
    isFold,
    isMobile,
    rubroActivo,
    setRubroActivo,
    coloresActivos,
    setColoresActivos,
    limpiarColoresActivos,
    productoSeleccionado,
    setProductoSeleccionado,
    busquedaYFiltrosTop,
    eliminadosSelected,
    setEliminadosSelected,
    seleccionarEliminados,
    togglearRubro,
    srubroActivo,
    togglearSrubro,
  } = useTienda();

  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 33;
  const indexUltimoItem = paginaActual * itemsPorPagina;
  const indexPrimerItem = indexUltimoItem - itemsPorPagina;
  const [filtrosYBusquedaOpen, setFiltrosYBusquedaOpen] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollDownFiltros, setScrollDownFiltros] = useState(false);
  const [listaColores, setListaColores] = useState(null);
  const filtrosRef = useRef(null);

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

  const handleScrollClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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

  const totalPaginas = Math.ceil(listaFiltrada.length / itemsPorPagina);
  const numerosDePagina = Array.from({ length: totalPaginas }, (_, index) => index + 1);
  const productosOrdenados = ordenarProductos(listaFiltrada);
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
              <label className={`labelRubros ${rubroActivo == rubro.id ? 'checked' : ''} label${rubro.nombre} desplegable`} key={rubro.nombre}>
                <div>
                  <input
                    className="check"
                    type="checkbox"
                    checked={rubroActivo == rubro.id}
                    onChange={() => {
                      togglearRubro(rubro.id);
                    }}
                    onClick={() => {
                      handleScrollClick();
                      setPaginaActual(1);
                      limpiarColoresActivos();
                      setCortinasSelected(false);
                      setEliminadosSelected(false);
                    }}
                    id={rubro.nombre + "id"}
                  />
                  <div className="textoRubro">
                    <p className="nombreRubro">{rubro.nombre}</p>
                    <p className="flechaRubro">{rubro.srubros ? (<svg xmlns="http://www.w3.org/2000/svg" width="1.7rem" height="1.7rem" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>) : (<></>)}</p>
                  </div>
                </div>
                {rubroActivo == rubro.id &&
                  <Srubros rubro={rubro} coloresUnicos={coloresUnicos} setPaginaActual={setPaginaActual} />
                }
              </label>
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

      {(cortinasSelected || eliminadosSelected) ? (<></>) : (
        <div className="paginacion">
          <button
            className="buttonPag paginaExtremo primeraPagina"
            onClick={() => paginar(1)}
            disabled={paginaActual === 1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" fillRule="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z" />
            </svg>
          </button>
          <button
            className="botonAntSig buttonPag"
            onClick={() => paginar(paginaActual - 1)}
            disabled={paginaActual === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.6rem"
              height="1.6rem"
              fill="currentColor"
              className="bi bi-arrow-right"
              viewBox="0 0 16 16"
              style={{ transform: 'rotate(180deg)' }}
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </button>
          {numerosDePagina.map((numero) => {
            const diff = Math.abs(numero - paginaActual);

            let mostrarPagina
            if (isMobile) {
              // Mostrar solo 3 botones en dispositivos móviles
              mostrarPagina =
                (paginaActual <= totalPaginas - 2 && numero >= paginaActual && numero <= paginaActual + 2) ||
                (paginaActual > totalPaginas - 2 && numero >= totalPaginas - 2);
            } else {
              // Lógica para mostrar botones según el caso actual
              mostrarPagina = totalPaginas <= 5 ||
                (paginaActual <= 3 && numero <= 5) ||
                (paginaActual >= totalPaginas - 2 && numero >= totalPaginas - 4) ||
                (diff <= 2 && totalPaginas >= 5);
            }

            return (
              mostrarPagina && (
                <button
                  key={numero}
                  onClick={() => paginar(numero)}
                  className={paginaActual === numero ? 'pagina-actual botonPaginacion buttonPag' : 'buttonPag botonPaginacion'}
                >
                  {numero}
                </button>
              )
            );
          })}

          <button
            className="botonAntSig buttonPag"
            onClick={() => paginar(paginaActual + 1)}
            disabled={indexUltimoItem >= listaFiltrada.length}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.6rem"
              height="1.6rem"
              fill="currentColor"
              className="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </button>

          <button
            className="buttonPag paginaExtremo ultimaPagina"
            onClick={() => paginar(totalPaginas)}
            disabled={paginaActual === totalPaginas}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z" />
            </svg>
          </button>
        </div>)}
    </div>
  );
}