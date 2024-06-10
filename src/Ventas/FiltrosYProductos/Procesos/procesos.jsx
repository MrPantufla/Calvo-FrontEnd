import './procesos.css';
import { useTienda } from "../../../contextTienda";
import CardProducto from "../Card Producto/cardProducto";
import { useProductos } from '../../../contextProductos';
import { useEffect } from 'react';
import { marcasPerfiles } from '../../../rubros';

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

    useEffect(() => {
        console.log(stipoProceso)
    }, [stipoProceso])

    const {
        productosIndexado
    } = useProductos();

    const { procesosRenderizar } = useProductos();

    return (
        <div className="contenedorPrincipalProcesos">
            {tipoProceso == null ?
                (<div className="tiposProcesoContainer">
                    <div className="tipoProceso" onClick={() => { setTipoProceso('anodizados'); console.log(procesosRenderizar) }}>
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
                            (tipoProceso == 'anodizados' ?
                                (Object.values(procesosRenderizar).map((proceso) => {
                                    if (proceso.rubro === 88) {
                                        return (
                                            <div key={proceso.id} className="col-12 col-md-6 col-lg-4 producto proceso">
                                                <div className="cardProceso" onClick={() => setStipoProceso(proceso)}>
                                                    <h1>{proceso.detalle}</h1>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }))
                                :
                                (Object.values(procesosRenderizar).map((proceso) => {
                                    if (proceso.rubro !== 88) {
                                        return (
                                            <div key={proceso.id} className="col-12 col-md-6 col-lg-4 producto proceso" onClick={() => setStipoProceso(proceso)}>
                                                <div className="cardProceso">
                                                    <h1>{proceso.detalle}</h1>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }))
                            )
                            :
                            (Object.values(args.itemsActuales).map((producto) => (
                                <div key={producto.id} className="col-12 col-md-6 col-lg-4 producto">
                                    <CardProducto
                                        producto={producto}
                                        color={stipoProceso.color}
                                        anodizado={stipoProceso == 'anodizado' && true}
                                        onClick={() => {
                                            seleccionarProducto(producto);
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