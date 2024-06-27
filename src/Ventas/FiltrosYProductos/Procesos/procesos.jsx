import './procesos.css';
import { useTienda } from "../../../contextTienda";
import CardProducto from "../Card Producto/cardProducto";
import { useProductos } from '../../../contextProductos';
import CardProcesos from './CardsProcesosYAcabados/cardProcesos.jsx';
import CardAcabados from './CardsProcesosYAcabados/cardAcabados.jsx';

export default function Procesos(args) {
    const {
        tipoProceso,
        setTipoProceso,
        stipoProceso,
        acabado,
        setAcabado,
        sTipoProceso
    } = useTienda();

    const {
        productosEliminados
    } = useProductos();

    const { procesos } = useProductos();

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
                                                <CardProcesos colorCorregido={colorCorregido} proceso={proceso} />
                                            </div>
                                        );
                                    }
                                    else if (tipoProceso == 'pinturas' && proceso.rubro !== 88 && proceso.rubro != 89) {
                                        return (
                                            <div key={proceso.id} className="col-12 col-md-6 col-lg-4 producto proceso">
                                                <CardProcesos colorCorregido={colorCorregido} proceso={proceso} />
                                            </div>
                                        );
                                    }
                                    return null;
                                }
                            }))
                            :
                            ((acabado == null && tipoProceso != 'pinturas') ?
                                <>
                                    {Object.values(procesos).map((acabado) => {
                                        if (!productosEliminados.includes(acabado.id)) {
                                            const colorCorregido = (acabado.color).replace(/\s+/g, '-');
                                            if (acabado.rubro === 89) {
                                                if(stipoProceso && stipoProceso.detalle.slice(-2) == 'M2' && (acabado.detalle.slice(-2) == 'M2' || acabado.id == 0)){
                                                    return (
                                                        <div key={acabado.id} className="col-12 col-md-6 col-lg-6 producto proceso" style={{paddingTop: '0.7rem '}}>
                                                            <CardAcabados colorCorregido={colorCorregido} acabado={acabado} />
                                                        </div>
                                                    );
                                                }
                                                else if (stipoProceso && stipoProceso.detalle.slice(-2) != 'M2' && acabado.detalle.slice(-2) != 'M2'){
                                                    return (
                                                        <div key={acabado.id} className="col-12 col-md-6 col-lg-6 producto proceso" style={{paddingTop: '0.7rem '}}>
                                                            <CardAcabados colorCorregido={colorCorregido} acabado={acabado} />
                                                        </div>
                                                    );
                                                }
                                            }
                                            return null;
                                        }
                                    })}
                                </>
                                :
                                (Object.values(args.itemsActuales).map((producto) => (
                                    <div key={producto.id} className="col-12 col-md-6 col-lg-4 producto">
                                        <CardProducto
                                            producto={producto}
                                            color={stipoProceso.color}
                                            proceso={stipoProceso.id}
                                            acabado={acabado ? acabado.id : 0}
                                            onClick={() => {
                                                args.seleccionarProducto(producto);
                                            }}
                                        />
                                    </div>
                                )))
                            )
                        }
                    </div>
                </>)
            }
        </div>
    );
}
