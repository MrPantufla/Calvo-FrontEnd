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
import Paginacion from './Paginacion/paginacion';
import Busqueda from './Filtros/Busqueda/busqueda';
import Filtros from './Filtros/filtros';
import { useCortinas } from '../../contextCortinas';
import Procesos from './Procesos/procesos';
import { useNavigate, useLocation } from 'react-router-dom';
import Software from './Software/software';
import ImagenGrandeSoftware from './Software/imagenGrandeSoftware';
import { useCarrito } from '../../contextCarrito';

export default function FiltrosYProductos() {

  const {
    productosIndexado,
    ordenarProductos,
    productosEliminados,
    dataCargada,
    procesos,
    marcasUnicas,
    productosDeProcesosEliminados
  } = useProductos();

  const {
    extraerProducto,
    extraerProceso
  } = useCarrito();

  const {
    cortinasSelected,
    isMobile,
    rubroActivo,
    coloresActivos,
    productoSeleccionado,
    setProductoSeleccionado,
    eliminadosSelected,
    eliminadosDeProcesosSelected,
    srubroActivo,
    marcaActiva,
    procesosSelected,
    stipoProceso,
    tipoProceso,
    acabado,
    setMenuAbierto,
    marcas,
    rubros,
    softwareSelected,
    imagenSoftwareSeleccionada
  } = useTienda();

  const {
    setMuestrasAbierto,
    muestrasAbierto
  } = useCortinas();

  const navigate = useNavigate();

  const location = useLocation();

  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtrosYBusquedaOpen, setFiltrosYBusquedaOpen] = useState(false);
  const [startX, setStartX] = useState(0);

  const seleccionarProducto = (producto) => {
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

  let rubrosPerfiles;
  let srubrosPerfiles;

  if (Object.keys(rubros).length > 0) {
    rubrosPerfiles = rubros.find(rubro => rubro.id == 'Perfiles').num;
    srubrosPerfiles = rubros.find(rubro => rubro.id == 'Perfiles').srubros;
  }

  const listaFiltrada = [...Object.values(productosIndexado), ...Object.values(procesos)].filter((p) => {
    const tipoCumple =
      rubroActivo == null && p.tipo_prod != 'PROCESOS' && !procesosSelected ||
      (rubroActivo && (
        rubroActivo.id == 'Perfiles' && (marcasUnicas.has(p.marca)) || (marcaActiva && marcaActiva.items.includes(p.marca)) ||
        rubroActivo.id == 'Maquinas' && (p.tipo_prod == 'MAQUINAS' || p.tipo_prod == 'PUNTUAL') && p.rubro == 39 ||
        rubroActivo.id == 'Herramientas' && p.tipo_prod == 'ACCESORIO' && p.rubro == 39 ||
        rubroActivo.id == 'Accesorios' && p.rubro == 8 ||
        rubroActivo.id == 'Automatismos' && p.rubro == 12 ||
        rubroActivo.id == 'Chapas' && p.rubro == 85 ||
        rubroActivo.id == 'Paneles' && p.rubro == 43 ||
        rubroActivo.id == 'Policarbonatos' && p.rubro == 31 ||
        rubroActivo.id == 'Poliestirenos' && p.rubro == 4 ||
        rubroActivo.id == 'PuertasPlacas' && p.rubro == 81 ||
        rubroActivo.id == 'TejidosMosquiteros' && p.rubro == 10
      )) ||
      procesosSelected && stipoProceso && !stipoProceso.detalle.includes('M2') && marcasUnicas.has(p.marca) && p.color == 'Natural' && p.cod_orig.slice(-1) != 'E' ||
      procesosSelected && stipoProceso && stipoProceso.detalle.includes('M2') && p.rubro == 85;

    const colorCumple =
      coloresActivos.length === 0 ||
      coloresActivos.includes(p.color);

    const marcaCumple =
      marcaActiva == null ||
      (marcaActiva && marcaActiva.items.includes(p.marca));

    const srubroCumple =
      srubroActivo == null ||
      (srubroActivo && srubroActivo.id == p.srubro);

    const buscarPorCodOrig =
      rubrosPerfiles && rubrosPerfiles.includes(p.rubro) && srubrosPerfiles.find(srubro => srubro.id == p.srubro) && p.cod_orig.toString().includes(busqueda);

    const buscarPorCodInt =
      p.tipo_prod != 'PERFIL' && p.cod_int.toString().includes(busqueda);

    const buscarPorDetalle =
      p.detalle.includes(busqueda);

    const eliminado =
      productosEliminados.includes(p.id);

    const productoDeProcesoEliminado =
      stipoProceso && productosDeProcesosEliminados.some(prod => prod.includes(p.id + "(" + stipoProceso.id));

    if (eliminadosSelected) {
      return eliminado;
    }
    else {
      return tipoCumple && marcaCumple && srubroCumple && colorCumple && !eliminado && (procesosSelected ? !productoDeProcesoEliminado : true) && ((busqueda === '') || (buscarPorCodOrig || buscarPorCodInt || buscarPorDetalle));
    }
  });

  let productosOrdenados = ordenarProductos(listaFiltrada);

  const itemsPorPagina = 33;
  const indexUltimoItem = paginaActual * itemsPorPagina;
  const indexPrimerItem = indexUltimoItem - itemsPorPagina;
  const itemsActuales = productosOrdenados.slice(indexPrimerItem, indexUltimoItem);

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
        if (filtrosYBusquedaOpen && !event.target.closest('.filtrosYBusqueda') && !event.target.closest('.botonMostrarFiltrosContainer') && !event.target.closest('.labelSrubro')) {
          setFiltrosYBusquedaOpen(false)
        }
      }

      const handleDocumentTouchMove = (e) => {
        const currentX = e.touches[0].clientX;
        const diffX = currentX - startX;

        if (diffX < -100) { // Verifica si el movimiento es de derecha a izquierda
          productoSeleccionado != null ? (siguienteProducto()) : (!muestrasAbierto && setFiltrosYBusquedaOpen(false));
          (cortinasSelected && !filtrosYBusquedaOpen) && (setMuestrasAbierto(true));
        }
        else if (diffX > 100) { // Abre el menú si el movimiento es de izquierda a derecha y el menú está cerrado

          if (productoSeleccionado != null) {
            productoAnterior()
          }
          else {
            if (!muestrasAbierto) {
              setFiltrosYBusquedaOpen(true);
              setMenuAbierto(false);
            }
          }
          (cortinasSelected && !filtrosYBusquedaOpen) && (setMuestrasAbierto(false));
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

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get('pagina') !== paginaActual.toString()) {
      params.set('pagina', paginaActual);
      navigate({ search: params.toString() });
    }
  }, [paginar, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const pagina = params.get('pagina');

    if (pagina) {
      setPaginaActual(pagina);
    }
  }, [])

  return (
    <div className={`contenedorPrincipalFiltrosYProductos ${isMobile && 'mobile'} ${procesosSelected && 'procesos'}`}>
      <div className="decoracionTienda" />
      <div className="filtrosYProductosContainer" style={{ minHeight: (procesosSelected && !isMobile) && 'calc(100vh - 12rem)' }}>
        {isMobile &&
          (<>
            <Carrito />
            <Favoritos />
          </>)
        }
        <div
          className={`filtrosYBusqueda ${filtrosYBusquedaOpen && 'open'}`}
          id="filtrosYBusqueda"
          style={isMobile ? {} : { top: '8.7rem' }}
        >
          <Busqueda
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            setPaginaActual={setPaginaActual}
          />

          <Filtros
            setPaginaActual={setPaginaActual}
          />

          {isMobile &&
            <button className={`botonFiltros ${filtrosYBusquedaOpen && 'abierto'}`} onClick={() => setFiltrosYBusquedaOpen(!filtrosYBusquedaOpen)} aria-label='abrirOCerrarFiltros'>
              <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
              </svg>
            </button>
          }
        </div>
        <div className="productos" style={isMobile ? ({ width: '100%' }) : ({ width: '80%' })}>
          {cortinasSelected ?
            (<Cortinas />)
            :
            (<>
              {!(softwareSelected || (procesosSelected && (!stipoProceso || !acabado))) && <BotonesOrdenamiento onClick={() => paginar(1)} />}
              {(rubroActivo && (rubroActivo.id == 'Paneles' || rubroActivo.id == 'PuertasPlacas')) && (
                <h1 className="textoComunicateConNostros textoPaneles">
                  <span style={{ color: 'white' }}>¡IMPORTANTE!</span> 
                  Para realizar encargos de modelos y medidas que no se encuentren listados,
                  <a
                    style={{ color: 'rgb(0, 60, 255)', cursor: 'pointer', textDecoration: 'underline' }}
                    href={isMobile ?
                      (`https://wa.me/5493456475294`)
                      :
                      (`https://web.whatsapp.com/send?phone=+5493456475294`)
                    }
                    target='blank'
                  >
                    comunicate con nosotros
                  </a>
                </h1>
              )}
              {(rubroActivo && (rubroActivo.id == 'Maquinas')) && (
                <h1 className="textoComunicateConNostros textoPaneles"><span style={{ color: 'white' }}>¡IMPORTANTE!</span> Por modelos o repuestos que no se encuentren listados, <a target='blank' href={isMobile ? (`https://wa.me/5493456475294`) : (`https://web.whatsapp.com/send?phone=+5493456475294`)} style={{ color: 'rgb(0, 60, 255)', cursor: 'pointer', textDecoration: 'underline' }}>comunicate con nosotros</a></h1>
              )}
              {procesosSelected ?
                <Procesos seleccionarProducto={seleccionarProducto} itemsActuales={itemsActuales} />
                :
                softwareSelected ?
                  (<Software />)
                  :
                  (<div className="row rowProductos">
                    {dataCargada == true ?
                      (<>
                        {!eliminadosDeProcesosSelected && itemsActuales.map((producto) => (
                          <div key={producto.id} className="col-12 col-md-6 col-lg-4 producto">
                            <CardProducto
                              producto={producto}
                              onClick={() => {
                                !isMobile && seleccionarProducto(producto);
                              }}
                            />
                          </div>
                        ))}
                        {eliminadosDeProcesosSelected && productosDeProcesosEliminados.map((p) => (
                          <div key={extraerProducto(p) + "-" + extraerProceso(p)} className="col-12 col-md-6 col-lg-4 producto">
                            <CardProducto
                              producto={productosIndexado[extraerProducto(p)]}
                              onClick={() => {
                                !isMobile && seleccionarProducto(p);
                              }}
                              proceso={extraerProceso(p)}
                            />
                          </div>
                        ))}
                      </>)
                      :
                      (<div className="spinner-border cargandoProductos" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>)
                    }
                  </div>)
              }
            </>)
          }
        </div>
      </div>

      {imagenSoftwareSeleccionada &&
        <ImagenGrandeSoftware />
      }

      {productoSeleccionado && (
        <ProductoGrande
          producto={productoSeleccionado}
          onClose={handleCloseProductoGrande}
          siguiente={siguienteProducto}
          anterior={productoAnterior}
        />
      )}

      {!(cortinasSelected || softwareSelected || (procesosSelected && (!tipoProceso || !stipoProceso || ((stipoProceso && stipoProceso.detalle.includes("ANODIZADO")) && !acabado)))) &&
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