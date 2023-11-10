import './filtrosYProductos.css';
import { productos } from '../../productos.js';
import { useState, useEffect } from 'react';
import CardProducto from '../Card Producto/cardProducto';

export default function FiltrosYProductos(props) {
  const [rubrosActivos, setRubrosActivos] = useState([]);
  const [subrubrosActivos, setSubrubrosActivos] = useState([]);
  const rubrosUnicos = [...new Set(productos.map((producto) => producto.rubro))];
  const srubrosUnicos = [...new Set(productos.map((producto) => producto.srubro))];
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 20;
  const indexUltimoItem = paginaActual * itemsPorPagina;
  const indexPrimerItem = indexUltimoItem - itemsPorPagina;
  const [jsonProductos, setJsonProductos] = useState([]);

  useEffect(() => {
    obtenerProductosFiltrados(); // Llama a la función cuando el componente se monta
  }, []);

  const obtenerProductosFiltrados = async (tipo_prod) => {
    try {
        const response = await fetch(`http://localhost:8080/api/productos`);
        if (response.ok) {
          const productosObtenidos = await response.json();
          setJsonProductos(productosObtenidos); // Guarda los productos en el estado
        } else {
            console.error('Error al obtener productos filtrados:', response.statusText);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}
  
  const paginar = (numeroDePagina) => {
    setPaginaActual(numeroDePagina);
  }

  const handleScrollClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  function toggleRubro(rubro) {
    if (rubrosActivos.includes(rubro)) {
      setRubrosActivos(rubrosActivos.filter((r) => r !== rubro));
    }
    else {
      setRubrosActivos([...rubrosActivos, rubro]);
    }
  }

  function toggleSubrubro(subrubro) {
    if (subrubrosActivos.includes(subrubro)) {
      setSubrubrosActivos(subrubrosActivos.filter((s) => s !== subrubro));
    } else {
      setSubrubrosActivos([...subrubrosActivos, subrubro]);
    }
  }

  const listaFiltrada = jsonProductos.filter((p) => {
    const rubroCumple = rubrosActivos.length === 0 || rubrosActivos.includes(p.tipo_prod);
    const subrubroCumple = subrubrosActivos.length === 0 || subrubrosActivos.includes(p.srubro);
    const buscaPorCodInt = p.cod_orig.toString().includes(busqueda);
    return rubroCumple && subrubroCumple && (busqueda === '' || buscaPorCodInt);
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
          placeholder="Buscar por código interno o detalle"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1);
          }}
        />
        <div className="filtros">
          {rubrosUnicos.map((rubro) => (
            <label className="labelRubros" key={rubro}>
              <input
                className="check"
                type="checkbox"
                checked={rubrosActivos.includes(rubro)}
                onChange={() => toggleRubro(rubro)}
                onClick={handleScrollClick}
              />
              <div className="textoRubro">
                Rubro {rubro}
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
            <div key={producto.cod_int} className="col-md-3 producto">
              <CardProducto cod_int={producto.cod_orig} rubro={producto.tipo_prod} srubro={producto.srubro}/>
            </div>
          ))}
        </div>
      </div>
      <div className="paginacion">
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
        {numerosDePagina.map((numero) => (
          <button
            key={numero}
            onClick={() => paginar(numero)}
            className={paginaActual === numero ? 'pagina-actual botonPaginacion button' : 'button botonPaginacion'}
          >
            {numero}
          </button>
        ))}
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
      </div>
    </div>
  );
}