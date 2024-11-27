import { useEffect, useState } from "react";
import { useTienda } from "../../../../contextTienda";
import './busqueda.css';

export default function Busqueda(args) {
  const { isMobile, filtrosYBusquedaOpen } = useTienda();
  const [tempBusqueda, setTempBusqueda] = useState(args.busqueda); // Estado temporal para la búsqueda

  useEffect(() => {
    // Creamos un timeout de 0.5s (500 ms)
    const timer = setTimeout(() => {
      args.setBusqueda(tempBusqueda.toUpperCase());
      args.setPaginaActual(1);
    }, 500);

    // Limpiamos el timeout anterior si hay una nueva pulsación de tecla
    return () => clearTimeout(timer);
  }, [tempBusqueda]); // Ejecuta el efecto cada vez que tempBusqueda cambie

  return (
    <div className="busquedaEIcono">
      <input
        className="busqueda"
        type="text"
        placeholder="Buscar por código o nombre"
        value={tempBusqueda}
        onChange={(e) => setTempBusqueda(e.target.value.toUpperCase())} // Cambiamos el valor temporal de búsqueda
        style={isMobile && !filtrosYBusquedaOpen ? { padding: '0' } : {}}>
      </input>
      <div className="lupaContainer">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </div>
    </div>
  );
}