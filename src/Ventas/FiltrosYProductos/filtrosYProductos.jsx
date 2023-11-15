import './filtrosYProductos.css';
import { useState, useEffect } from 'react';
import CardProducto from '../Card Producto/cardProducto';
import ProductoGrande from './productoGrande';

export default function FiltrosYProductos(props) {
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 20;
  const indexUltimoItem = paginaActual * itemsPorPagina;
  const indexPrimerItem = indexUltimoItem - itemsPorPagina;
  const srubrosUnicos = [...new Set(props.json.map((producto) => producto.srubro))];
  const tiposUnicos = [...new Set(props.json.map((producto) => producto.tipo_prod))];
  const [tiposActivos, setTiposActivos] = useState([]);
  const [subrubrosActivos, setSubrubrosActivos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const handleClickProducto = (producto) => {
    setProductoSeleccionado(producto);
  };

  const handleCloseProductoGrande = () => {
    setProductoSeleccionado(null);
  };

  const paginar = (numeroDePagina) => {
    setPaginaActual(numeroDePagina);
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

  function toggleSubrubro(subrubro) {
    setSubrubrosActivos(prevSubrubrosActivos => {
      if (prevSubrubrosActivos.includes(subrubro)) {
        return prevSubrubrosActivos.filter((s) => s !== subrubro);
      } else {
        return [...prevSubrubrosActivos, subrubro];
      }
    });
  }

  const listaFiltrada = props.json.filter((p) => {
    const tipoCumple = tiposActivos.length === 0 || tiposActivos.includes(p.tipo_prod);
    const subrubroCumple = subrubrosActivos.length === 0 || subrubrosActivos.includes(p.srubro);
    const buscarPorCodInt = p.cod_orig.toString().includes(busqueda);
    const buscarPorDetalle = p.detalle.includes(busqueda);
    return tipoCumple && subrubroCumple && (busqueda === '' || buscarPorCodInt || buscarPorDetalle);
  });

  const itemsActuales = listaFiltrada.slice(indexPrimerItem, indexUltimoItem);

  const totalPaginas = Math.ceil(listaFiltrada.length / itemsPorPagina);
  const numerosDePagina = Array.from({ length: totalPaginas }, (_, index) => index + 1);

  return (
    <div className="contenedorPrincipalFiltrosYProductos">
      <div className="filtrosYBusqueda">
        <input
          className="busqueda"
          type="text"
          placeholder="Buscar por código o nombre"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1);
          }}
        />
        <div className="filtros">
          {tiposUnicos.map((tipo_prod) => (
            <label className="labelRubros" key={tipo_prod}>
              <input
                className="check"
                type="checkbox"
                checked={tiposActivos.includes(tipo_prod)}
                onChange={() => toggleTipo(tipo_prod)}
                onClick={() => {
                  handleScrollClick();
                  setPaginaActual(1);
                }}
              />
              <div className="textoRubro">
                {tipo_prod}
              </div>
            </label>
          ))}

          {srubrosUnicos.map((subrubro) => (
            <label className="labelSubrubros" key={subrubro}>
              <input
                className="check"
                type="checkbox"
                checked={subrubrosActivos.includes(subrubro)}
                onChange={() => toggleSubrubro(subrubro)}
                onClick={handleScrollClick}
                disabled={tiposActivos.length==0}
              />
              <div className="textoSubrubro">
                Subrubro {subrubro}
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="productos">
        <div className="row">
          {itemsActuales.map((producto) => (
            <div key={producto.id} className="col-md-3 producto">
              <CardProducto
                cod_orig={producto.cod_orig}
                tipo_prod={producto.tipo_prod}
                srubro={producto.srubro}
                detalle={producto.detalle}
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
          cod_orig={productoSeleccionado.cod_orig}
          detalle={productoSeleccionado.detalle}
          onClose={handleCloseProductoGrande}
        />
      )}

      <div className="paginacion">
        <button
          className="button paginaExtremo primeraPagina"
          onClick={() => paginar(1)}
          disabled={paginaActual === 1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z" />
          </svg>
        </button>
        <button
          className="botonAntSig button"
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
                className={paginaActual === numero ? 'pagina-actual botonPaginacion button' : 'button botonPaginacion'}
              >
                {numero}
              </button>
            )
          );
        })}

        <button
          className="botonAntSig button"
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
          className="button paginaExtremo ultimaPagina"
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