import './procesos.css';
import { useTienda } from "../../../contextTienda";
import CardProducto from "../Card Producto/cardProducto";
import { useProductos } from '../../../contextProductos';
import { useEffect } from 'react';
import { marcasPerfiles } from '../../../rubros';
import { useAuth } from '../../../contextLogin';

export default function Procesos(args) {
    const {
        tipoProceso,
        setTipoProceso,
        stipoProceso,
        setStipoProceso,
        toggleRubro,
        seleccionarProducto,
        setColorProceso,
        togglearProceso
    } = useTienda();

    const {
        productosIndexado,
        eliminarProducto,
        productosEliminados
    } = useProductos();

    const { state } = useAuth();

    const { procesos } = useProductos();

    const eliminarProceso = (e, id) => {
        e.stopPropagation();
        eliminarProducto(id);
    }

    return (
        <div className="contenedorPrincipalProcesos">
            {tipoProceso == null ?
                (<div className="tiposProcesoContainer">
                    <div className="tipoProceso" onClick={() => setTipoProceso('anodizados')}>
                        <h1>ANODIZADOS</h1>
                    </div>

                    <div className="tipoProceso" onClick={() => setTipoProceso('pinturas')}>
                        <h1>PINTURAS</h1>
                    </div>
                </div>)
                :
                (<>
                    <div className="row rowProductos">
                        {stipoProceso == null ?
                            (Object.values(procesos).map((proceso) => {
                                if (!productosEliminados.includes(proceso.id)) {
                                    const colorCorregido = (proceso.color).replace(/\s+/g, '-');
                                    if (tipoProceso == 'anodizados' && proceso.rubro === 88) {
                                        return (
                                            <div key={proceso.id} className="col-12 col-md-6 col-lg-4 producto proceso">
                                                <div className="cardProceso" onClick={() => setStipoProceso(proceso)} style={{ backgroundColor: `var(--${colorCorregido})` }}>
                                                    {state.userInfo && state.userInfo.tipo_usuario === 'admin' &&
                                                        <button className="eliminarElemento" onClick={(e) => eliminarProceso(e, proceso.id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                            </svg>
                                                        </button>
                                                    }

                                                    <h1>{proceso.detalle}</h1>
                                                </div>
                                            </div>
                                        );
                                    }
                                    else if (tipoProceso == 'pinturas' && proceso.rubro !== 88) {
                                        return (
                                            <div key={proceso.id} className="col-12 col-md-6 col-lg-4 producto proceso">
                                                <div className="cardProceso" onClick={() => setStipoProceso(proceso)} style={{ backgroundColor: `var(--${colorCorregido})` }}>
                                                    {state.userInfo && state.userInfo.tipo_usuario === 'admin' &&
                                                        <button className="eliminarElemento" onClick={(e) => eliminarProceso(e, proceso.id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                            </svg>
                                                        </button>
                                                    }

                                                    <h1>{proceso.detalle}</h1>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }
                            }))
                            :
                            (Object.values(args.itemsActuales).map((producto) => (
                                <div key={producto.id} className="col-12 col-md-6 col-lg-4 producto">
                                    <CardProducto
                                        producto={producto}
                                        color={stipoProceso.color}
                                        proceso={stipoProceso.id}
                                        onClick={() => {
                                            args.seleccionarProducto(producto);
                                        }}
                                    />
                                </div>
                            )))
                        }
                    </div>
                </>)
            }
        </div>
    );
}
