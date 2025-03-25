import './procesos.css';
import { useTienda } from "../../../contextTienda";
import CardProducto from "../Card Producto/cardProducto";
import { useProductos } from '../../../contextProductos';
import CardProcesos from './CardsProcesosYAcabados/cardProcesos.jsx';
import CardAcabados from './CardsProcesosYAcabados/cardAcabados.jsx';
import { useNavigate } from 'react-router-dom';
import Pinturas from './Pinturas/pinturas.jsx';

export default function Procesos(args) {

    const navigate = useNavigate();

    const {
        tipoProceso,
        setTipoProceso,
        stipoProceso,
        acabado,
        isTablet,
        isMobile,
        categoriaSeleccionadaPinturas,
        colorSeleccionado
    } = useTienda();

    const {
        productosEliminados
    } = useProductos();

    const { procesos } = useProductos();

    return (
        <div className="contenedorPrincipalProcesos">
            {tipoProceso == null ?
                (<div className="tiposProcesoContainer">
                    <div className={`tipoProceso anodizados ${!isTablet ? 'desktop' : 'tablet'}`} onClick={() => setTipoProceso('anodizados')}>
                        <h1><span className="poligono" />Anodizados</h1>
                    </div>

                    <div className={`tipoProceso pinturas ${!isTablet ? 'desktop' : 'tablet'}`} onClick={() => setTipoProceso('pinturas')}>
                        <h1><span className="poligono" />Pinturas</h1>
                    </div>
                </div>)
                :
                (<>
                    {(stipoProceso && stipoProceso.detalle.includes("M2") && tipoProceso == 'anodizados' && !acabado) && (
                        <h1 className="textoComunicateConNosotros textoProcesos">
                            <span style={{ color: 'white' }}>¡IMPORTANTE!</span> Al seleccionar acabado LIJADO, solo se listarán las chapas con un espesor de 2mm o más
                        </h1>
                    )}
                    {(tipoProceso == 'pinturas' && !stipoProceso) && (
                        <Pinturas itemsActuales={args.itemsActuales} procesos={procesos} />   
                    )}
                    {(tipoProceso && (tipoProceso == 'pinturas' ? (categoriaSeleccionadaPinturas && stipoProceso) : true)) && (
                        <div className={`row rowProductos ${((stipoProceso && stipoProceso.detalle.includes("M2") && !acabado) || (tipoProceso == 'pinturas' && !stipoProceso)) ? 'rowConTexto' : 'rowSinTexto'}`}>
                            {(stipoProceso == null && tipoProceso == 'anodizados') ?
                                <>
                                    {Object.values(procesos).map((proceso) => {
                                        if (!productosEliminados.includes(proceso.id)) {
                                            const colorCorregido = (proceso.color).replace(/\s+/g, '-');
                                            if (proceso.rubro === 88) {
                                                return (
                                                    <div key={proceso.id} className="col-12 col-md-6 col-lg-4 producto proceso colorProceso">
                                                        <CardProcesos colorCorregido={colorCorregido} proceso={proceso} />
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }
                                    })}
                                </>
                                :
                                (acabado == null && tipoProceso !== 'pinturas') ? (
                                    <>
                                        {Object.values(procesos).map((acabado) =>
                                            !productosEliminados.includes(acabado.id) ? (
                                                acabado.rubro === 89 && (
                                                    (stipoProceso && stipoProceso.detalle.slice(-2) === 'M2' && (acabado.detalle.slice(-2) === 'M2' || acabado.id === 0)) ? (
                                                        <div key={acabado.id} className="col-12 col-md-6 col-lg-6 producto proceso" style={{ paddingTop: '0.7rem ' }}>
                                                            <CardAcabados colorCorregido={acabado.color.replace(/\s+/g, '-')} acabado={acabado} />
                                                        </div>
                                                    ) : (
                                                        stipoProceso && stipoProceso.detalle.slice(-2) !== 'M2' && acabado.detalle.slice(-2) !== 'M2' && (
                                                            <div key={acabado.id} className="col-12 col-md-6 col-lg-6 producto proceso" style={{ paddingTop: '0.7rem ' }}>
                                                                <CardAcabados colorCorregido={acabado.color.replace(/\s+/g, '-')} acabado={acabado} />
                                                            </div>
                                                        )
                                                    )
                                                )
                                            ) : null
                                        )}
                                    </>
                                ) : (
                                    productosEliminados && productosEliminados.length > 0 && (
                                        Object.values(args.itemsActuales).map((producto) => (
                                            <div key={producto.id} className="col-12 col-md-6 col-lg-4 producto">
                                                <CardProducto
                                                    producto={producto}
                                                    color={colorSeleccionado}
                                                    proceso={stipoProceso?.id}
                                                    acabado={acabado ? acabado.id : 0}
                                                    onClick={() => args.seleccionarProducto(producto)}
                                                    anodizado={tipoProceso == 'anodizados'}
                                                />
                                            </div>
                                        ))
                                    )
                                )
                            }
                        </div>
                    )}
                </>)
            }
        </div>
    );
}