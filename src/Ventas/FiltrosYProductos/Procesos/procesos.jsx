import './procesos.css';
import { useTienda } from "../../../contextTienda";
import CardProducto from "../Card Producto/cardProducto";
import { useProductos } from '../../../contextProductos';
import CardProcesos from './CardsProcesosYAcabados/cardProcesos.jsx';
import CardAcabados from './CardsProcesosYAcabados/cardAcabados.jsx';
import { useNavigate } from 'react-router-dom';

export default function Procesos(args) {

    const navigate = useNavigate();

    const {
        tipoProceso,
        setTipoProceso,
        stipoProceso,
        setStipoProceso,
        acabado,
        setAcabado,
        isTablet,
        isMobile
    } = useTienda();

    const {
        productosEliminados
    } = useProductos();

    const { procesos } = useProductos();

    const atras = () => {
        if (acabado != null && tipoProceso == 'anodizados') {
            setAcabado(null);
        }
        else if (stipoProceso != null) {
            setStipoProceso(null);
        }
        else if (tipoProceso != null) {
            setTipoProceso(null);
        }
    }

    return (
        <div className="contenedorPrincipalProcesos">
            {tipoProceso && <button className="atras" onClick={() => atras()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708z" />
                </svg>
            </button>}
            {tipoProceso == null ?
                (<div className="tiposProcesoContainer">
                    <div className={`tipoProceso anodizados ${!isTablet ? 'desktop' : 'tablet'}`} onClick={() => setTipoProceso('anodizados')}>
                        <h1>ANODIZADOS</h1>
                    </div>

                    <div className={`tipoProceso pinturas ${!isTablet ? 'desktop' : 'tablet'}`} onClick={() => setTipoProceso('pinturas')}>
                        <h1>PINTURAS</h1>
                    </div>
                </div>)
                :
                (<div className="row rowProductos">
                    {stipoProceso == null ?
                        <>
                            {tipoProceso == 'pinturas' && (
                                <h1 className="textoComunicateConNosotros textoProcesos">
                                    <span style={{ color: 'white' }}>¡IMPORTANTE!</span> Para realizar encargos de colores que no se listan a continuación, 
                                    <a href={isMobile ?
                                        (`https://wa.me/5493456475294`)
                                        :
                                        (`https://web.whatsapp.com/send?phone=+5493456475294`)
                                    }
                                        target='blank'
                                        style={{ color: 'rgb(0, 60, 255)', cursor: 'pointer', textDecoration: 'underline' }}>
                                        comunicate con nosotros
                                    </a>
                                </h1>
                            )}
                            {Object.values(procesos).map((proceso) => {
                                if (!productosEliminados.includes(proceso.id)) {
                                    const colorCorregido = (proceso.color).replace(/\s+/g, '-');
                                    if (tipoProceso == 'anodizados' && proceso.rubro === 88) {
                                        return (
                                            <div key={proceso.id} className="col-12 col-md-6 col-lg-4 producto proceso">
                                                <CardProcesos colorCorregido={colorCorregido} proceso={proceso} />
                                            </div>
                                        );
                                    } else if (tipoProceso == 'pinturas' && proceso.rubro !== 88 && proceso.rubro != 89) {
                                        return (
                                            <div key={proceso.id} className="col-12 col-md-6 col-lg-4 producto proceso">
                                                <CardProcesos colorCorregido={colorCorregido} proceso={proceso} />
                                            </div>
                                        );
                                    }
                                    return null;
                                }
                            })}
                        </>
                        :
                        ((acabado == null && tipoProceso != 'pinturas') ?
                            <>
                                {Object.values(procesos).map((acabado) => {
                                    if (!productosEliminados.includes(acabado.id)) {
                                        const colorCorregido = (acabado.color).replace(/\s+/g, '-');
                                        if (acabado.rubro === 89) {
                                            if (stipoProceso && stipoProceso.detalle.slice(-2) == 'M2' && (acabado.detalle.slice(-2) == 'M2' || acabado.id == 0)) {
                                                return (
                                                    <div key={acabado.id} className="col-12 col-md-6 col-lg-6 producto proceso" style={{ paddingTop: '0.7rem ' }}>
                                                        <CardAcabados colorCorregido={colorCorregido} acabado={acabado} />
                                                    </div>
                                                );
                                            }
                                            else if (stipoProceso && stipoProceso.detalle.slice(-2) != 'M2' && acabado.detalle.slice(-2) != 'M2') {
                                                return (
                                                    <div key={acabado.id} className="col-12 col-md-6 col-lg-6 producto proceso" style={{ paddingTop: '0.7rem ' }}>
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
                            (productosEliminados && productosEliminados.length > 0 && (Object.values(args.itemsActuales).map((producto) => (
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
                            ))))
                        )
                    }
                </div>)
            }
        </div>
    );
}