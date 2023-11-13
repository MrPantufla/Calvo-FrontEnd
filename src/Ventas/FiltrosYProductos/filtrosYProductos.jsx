import './filtrosYProductos.css';
import { productos } from '../../productos.js';//Este es el json anterior
import { useState, useEffect } from 'react';
import CardProducto from '../Card Producto/cardProducto';

export default function FiltrosYProductos(props) {
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 20;
  const indexUltimoItem = paginaActual * itemsPorPagina;
  const indexPrimerItem = indexUltimoItem - itemsPorPagina;
  const [jsonProductos, setJsonProductos] = useState([]);
  const srubrosUnicos = [...new Set(jsonProductos.map((producto) => producto.srubro))];
  const tiposUnicos = [...new Set(jsonProductos.map((producto) => producto.tipo_prod))];
  const [tiposActivos, setTiposActivos] = useState([]);
  const [subrubrosActivos, setSubrubrosActivos] = useState([]);


  useEffect(() => {
    obtenerProductosFiltrados();
  }, []);

  const obtenerProductosFiltrados = async (tipo_prod) => {
    try {
        const response = await fetch(`http://localhost:8080/api/productos`);
        if (response.ok) {
          const productosObtenidos = await response.json();
          setJsonProductos(productosObtenidos);
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

  function toggleTipo(tipo_prod) {
    if (tiposActivos.includes(tipo_prod)) {
      setTiposActivos(tiposActivos.filter((r) => r !== tipo_prod));
    }
    else {
      setTiposActivos([...tiposActivos, tipo_prod]);
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
    const tipoCumple = tiposActivos.length === 0 || tiposActivos.includes(p.tipo_prod);
    const subrubroCumple = subrubrosActivos.length === 0 || subrubrosActivos.includes(p.srubro);
    const buscarPorCodInt = p.cod_orig.toString().includes(busqueda);
    const buscarPorDetalle= p.detalle.includes(busqueda);
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
          placeholder="Buscar por código interno o detalle"
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
                onClick={handleScrollClick}
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
              <CardProducto cod_int={producto.cod_orig} tipo_prod={producto.tipo_prod} srubro={producto.srubro} detalle={producto.detalle}/>
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