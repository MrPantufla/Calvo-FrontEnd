import './filtrosYProductos.css';
import { useState, useEffect } from 'react';
import CardProducto from '../Card Producto/cardProducto';
import ProductoGrande from '../Card Producto/productoGrande';
import { useProductos } from '../../contextProductos';
import { useTienda } from '../../contextTienda';

export default function FiltrosYProductos() {
  const productos = useProductos();
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 21;
  const indexUltimoItem = paginaActual * itemsPorPagina;
  const indexPrimerItem = indexUltimoItem - itemsPorPagina;
  const tiposUnicos = [...new Set(Object.values(productos.productosIndexado).map((producto) => producto.tipo_prod))];
  const [subrubrosActivos, setSubrubrosActivos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [ordenamientoActivo, setOrdenamientoActivo] = useState('null');
  const {tiposActivos, setTiposActivos} = useTienda();

  const handleClickProducto = (producto) => {
    setProductoSeleccionado(producto);
  };

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

  function toggleTipo(tipo_prod) {
    setTiposActivos(prevTiposActivos => {
      if (prevTiposActivos.includes(tipo_prod)) {
        return prevTiposActivos.filter((r) => r !== tipo_prod);
      } else {
        return [...prevTiposActivos, tipo_prod];
      }
    });
  }

  const listaFiltrada = Object.values(productos.productosIndexado).filter((p) => {
    const tipoCumple = tiposActivos.length === 0 || tiposActivos.includes(p.tipo_prod);
    const subrubroCumple = subrubrosActivos.length === 0 || subrubrosActivos.includes(p.srubro);
    const buscarPorCodInt = p.cod_orig.toString().includes(busqueda);
    const buscarPorDetalle = p.detalle.includes(busqueda);
    return tipoCumple && subrubroCumple && (busqueda === '' || buscarPorCodInt || buscarPorDetalle);
  });

  const ordenarPorPrecioAsc = (productos) => {
    return productos.sort((prodA, prodB) => prodA.precio - prodB.precio);
  }

  const ordenarPorPrecioDesc = (productos) => {
    return productos.sort((prodA, prodB) => prodB.precio - prodA.precio);
  }

  const ordenarPorKgAsc = (productos) => {
    return productos.sort((prodA, prodB) => prodA.kg - prodB.kg);
  }

  const ordenarPorKgDesc = (productos) => {
    const nuevosProductos = productos.sort((prodA, prodB) => prodB.kg - prodA.kg);
    return nuevosProductos;
  }

  const ordenarPorDetalleAsc = (prodA, prodB) => {
    if (!prodA || !prodB || !prodA.detalle || !prodB.detalle) {
      console.error("Producto o propiedad indefinida:", prodA, prodB); // Agrega esta línea
      return 0;
    }
    return prodA.detalle.localeCompare(prodB.detalle);
  }

  const ordenarPorDetalleDesc = (prodA, prodB) => {
    if (!prodA || !prodB || !prodA.detalle || !prodB.detalle) {
      console.error("Producto o propiedad indefinida:", prodA, prodB); // Agrega esta línea
      return 0;
    }
    return prodB.detalle.localeCompare(prodA.detalle);
  }

  const ordenarProductos = (productos) => {
    switch (ordenamientoActivo) {
      case 'precioAsc':
        return ordenarPorPrecioAsc(productos);
      case 'precioDesc':
        return ordenarPorPrecioDesc(productos);
      case 'kgAsc':
        return ordenarPorKgAsc(productos);
      case 'kgDesc':
        return ordenarPorKgDesc(productos);
      case 'detalleAsc':
        return ordenarPorDetalleAsc(productos);
      case 'detalleDesc':
        return ordenarPorDetalleDesc(productos);
      default:
        return productos;
    }
  }

  const productosOrdenados = ordenarProductos(listaFiltrada);

  const totalPaginas = Math.ceil(listaFiltrada.length / itemsPorPagina);
  const numerosDePagina = Array.from({ length: totalPaginas }, (_, index) => index + 1);
  const itemsActuales = productosOrdenados.slice(indexPrimerItem, indexUltimoItem);

  const toggleOrdenar = (prop) => {
    if (prop == ordenamientoActivo) {
      setOrdenamientoActivo(null);
    }
    else {
      setOrdenamientoActivo(prop);
    }
  }

  return (
    <div className="contenedorPrincipalFiltrosYProductos">
      <div className="decoracionTienda" />
      <div className="filtrosYBusqueda">
        <div className="busquedaEIcono">
          <input
            className="busqueda"
            type="text"
            placeholder="Buscar por código o nombre"
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPaginaActual(1);
            }}
          >
          </input>
          <div className="lupaContainer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </div>
        </div>
        <div className="filtros">
          {tiposUnicos.map((tipo_prod) => (
            <label className={`labelRubros ${tiposActivos.includes(tipo_prod) ? 'checked' : ''}`} key={tipo_prod}>
              <input
                className="check"
                type="checkbox"
                checked={tiposActivos.includes(tipo_prod)}
                onChange={() => toggleTipo(tipo_prod)}
                onClick={() => {
                  handleScrollClick();
                  setPaginaActual(1);
                }}
                id={tipo_prod + "Id"}
              />
              <div className="textoRubro">
                {tipo_prod}
              </div>
            </label>
          ))}
          <div className="ordenarPor">
            <div className="headOrdenarPor">
              ORDENAR POR
            </div>
            <div className="bodyOrdenarPor">
              <div className="ordenamiento" onClick={() => toggleOrdenar("precioAsc")}>
                <p>Menor precio</p>
              </div>

              <div className="ordenamiento" onClick={() => toggleOrdenar("precioDesc")}>
                <p>Mayor precio</p>
              </div>

              <div className="ordenamiento" onClick={() => toggleOrdenar("kgAsc")}>
                <p>Menor peso</p>
              </div>

              <div className="ordenamiento" onClick={() => toggleOrdenar("kgDesc")}>
                <p>Mayor peso</p>
              </div>
            </div>
          </div>


            {/*srubrosUnicos.map((subrubro) => (
            <label className="labelSubrubros" key={subrubro}>
              <input
                className="check"
                type="checkbox"
                checked={subrubrosActivos.includes(subrubro)}
                onChange={() => toggleSubrubro(subrubro)}
                onClick={handleScrollClick}
                disabled={tiposActivos.length == 0}
                id={subrubro + "Id"}
              />
              <div className="textoSubrubro">
                Subrubro {subrubro}
              </div>
            </label>
          ))*/}
          </div>
        </div>

        <div className="productos">
          <div className="row">
            {itemsActuales.map((producto) => (
              <div key={producto.id} className="col-12 col-md-4 producto">
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
                  onClick={() => {
                    handleClickProducto(producto);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {productoSeleccionado && (
          <ProductoGrande
            id={productoSeleccionado.id}
            cod_orig={productoSeleccionado.cod_orig}
            detalle={productoSeleccionado.detalle}
            onClose={handleCloseProductoGrande}
            precio={productoSeleccionado.precio}
            color={productoSeleccionado.color}
          />
        )}

        <div className="paginacion">
          <button
            className="buttonPag paginaExtremo primeraPagina"
            onClick={() => paginar(1)}
            disabled={paginaActual === 1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
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
              width="16"
              height="16"
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

            const mostrarPagina = totalPaginas <= 5 || (paginaActual <= 3 && numero <= 5) || (paginaActual >= totalPaginas - 2 && numero >= totalPaginas - 4) || (diff <= 2 && totalPaginas >= 5);
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
              width="16"
              height="16"
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z" />
            </svg>
          </button>
        </div>
      </div>
      );
}