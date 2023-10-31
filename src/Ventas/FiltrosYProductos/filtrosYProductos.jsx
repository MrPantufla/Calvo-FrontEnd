import './filtrosYProductos.css';
import { productos } from '../../productos.js';
import { useState } from 'react';
import CardProducto from '../Card Producto/cardProducto';

export default function FiltrosYProductos(props) {
  const [rubrosActivos, setRubrosActivos] = useState([]);
  const [subrubrosActivos, setSubrubrosActivos] = useState([]);
  const rubrosUnicos = [...new Set(productos.map((producto) => producto.rubro))];
  const srubrosUnicos = [...new Set(productos.map((producto) => producto.srubro))];
  const [busqueda, setBusqueda] = useState('');

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

  const listaFiltrada = productos.filter((p) => {
    const rubroCumple = rubrosActivos.length === 0 || rubrosActivos.includes(p.rubro);
    const subrubroCumple = subrubrosActivos.length === 0 || subrubrosActivos.includes(p.srubro);
    const buscaPorCodInt = p.cod_int.toString().includes(busqueda);
    const buscaPorDetalle = p.detalle.toLowerCase().includes(busqueda.toLowerCase());
    return rubroCumple && subrubroCumple && (busqueda === '' || buscaPorCodInt || buscaPorDetalle);
  });

  return (
    <div className="contenedorPrincipalFiltrosYProductos">
      <div className="filtrosYBusqueda">
        <input
          className="busqueda"
          type="text"
          placeholder="Buscar por código interno o detalle"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <div className="filtros">
          {rubrosUnicos.map((rubro) => (
            <label className="labelRubros" key={rubro}>
              <input
                className="check"
                type="checkbox"
                checked={rubrosActivos.includes(rubro)}
                onChange={() => toggleRubro(rubro)}
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
          {listaFiltrada.map((producto) => (
            <div key={producto.cod_int} className="col-md-3">
              <CardProducto cod_int={producto.cod_int} rubro={producto.rubro} srubro={producto.srubro} detalle={producto.detalle} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}