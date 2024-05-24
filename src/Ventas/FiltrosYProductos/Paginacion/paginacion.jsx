import './paginacion.css';
import { useTienda } from "../../../contextTienda";

export default function Paginacion(args) {

  const { isMobile } = useTienda();

  const totalPaginas = Math.ceil(args.listaFiltrada.length / args.itemsPorPagina);
  const numerosDePagina = Array.from({ length: totalPaginas }, (_, index) => index + 1);

  return (
    <div className="paginacion">
      <button
        className="buttonPag paginaExtremo primeraPagina"
        onClick={() => args.paginar(1)}
        disabled={args.paginaActual === 1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" fillRule="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z" />
        </svg>
      </button>
      <button
        className="botonAntSig buttonPag"
        onClick={() => args.paginar(args.paginaActual - 1)}
        disabled={args.paginaActual === 1}
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
        const diff = Math.abs(numero - args.paginaActual);

        let mostrarPagina
        if (isMobile) {
          // Mostrar solo 3 botones en dispositivos móviles
          mostrarPagina =
            (args.paginaActual <=totalPaginas - 2 && numero >= args.paginaActual && numero <= args.paginaActual + 2) ||
            (args.paginaActual > totalPaginas - 2 && numero >= totalPaginas - 2);
        } else {
          // Lógica para mostrar botones según el caso actual
          mostrarPagina = totalPaginas <= 5 ||
            (args.paginaActual <= 3 && numero <= 5) ||
            (args.paginaActual >= totalPaginas - 2 && numero >= totalPaginas - 4) ||
            (diff <= 2 && totalPaginas >= 5);
        }

        return (
          mostrarPagina && (
            <button
              key={numero}
              onClick={() => args.paginar(numero)}
              className={args.paginaActual === numero ? 'pagina-actual botonPaginacion buttonPag' : 'buttonPag botonPaginacion'}
            >
              {numero}
            </button>
          )
        );
      })}

      <button
        className="botonAntSig buttonPag"
        onClick={() => args.paginar(args.paginaActual + 1)}
        disabled={args.indexUltimoItem >= args.listaFiltrada.length}
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
        onClick={() => args.paginar(totalPaginas)}
        disabled={args.paginaActual === totalPaginas}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z" />
        </svg>
      </button>
    </div>
  );
}