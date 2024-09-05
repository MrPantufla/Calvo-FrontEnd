import { useAuth } from '../../../../contextLogin';
import { useProductos } from '../../../../contextProductos';
import { useTienda } from '../../../../contextTienda';
import './cardProcesos.css';

export default function CardProcesos(args) {
    const { state } = useAuth();

    const { setStipoProceso } = useTienda();

    const { eliminarProducto } = useProductos();

    const eliminarProceso = (e, id) => {
        e.stopPropagation();
        eliminarProducto(id, false);
    }

    let detalleArreglado = args.proceso.detalle;
    if (detalleArreglado.slice(-2) == 'M2') {
        detalleArreglado = detalleArreglado.substring(0, detalleArreglado.length - 2) + 'CHAPAS';
    }

    const usarBlanco = (args.colorCorregido == 'Negro' ||
        args.colorCorregido == 'Azul' ||
        args.colorCorregido == 'Marron-osc' ||
        args.colorCorregido == 'Bronce-osc' ||
        args.colorCorregido == 'Simil-madera' ||
        args.colorCorregido == 'Platil' ||
        args.colorCorregido == 'Peltre' ||
        args.colorCorregido == 'Fume' ||
        args.colorCorregido == 'Rojo' ||
        args.colorCorregido == 'Gris-azulado' ||
        args.colorCorregido == 'Bronce-medio'
    );

    return (
        <div className="cardProceso" onClick={() => setStipoProceso(args.proceso)} style={{ backgroundColor: `var(--${args.colorCorregido})` }}>
            {state.userInfo && state.userInfo.tipo_usuario === 'admin' &&
                <button className="eliminarElemento" onClick={(e) => eliminarProceso(e, args.proceso.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                </button>
            }

            <h1 style={usarBlanco ? { color: 'white' } : {}}>{detalleArreglado}</h1>
        </div>
    );
}