import { useTienda } from "../../../../contextTienda";
import './busqueda.css';

export default function Busqueda(args){

    const { isMobile, 
        filtrosYBusquedaOpen
    } = useTienda();

    return(
        <div className="busquedaEIcono">
            <input
              className="busqueda"
              type="text"
              placeholder="Buscar por código o nombre"
              value={args.busqueda}
              onChange={(e) => {
                args.setBusqueda(e.target.value.toUpperCase());
                args.setPaginaActual(1);
              }}
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