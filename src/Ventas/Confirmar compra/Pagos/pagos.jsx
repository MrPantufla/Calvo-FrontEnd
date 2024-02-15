import './pagos.css';
import { useState } from 'react';
import { useTienda } from '../../../contextTienda.jsx';
import { useCarrito } from '../../../contextCarrito.jsx';

export default function Pagos() {
    const {setMostrarPagos} = useTienda();

    const {
        setDatosCorroborados,
        datosCorroborados,
        precioTotal
    } = useCarrito();

    const [cbuMacroCopiado, setCbuMacroCopiado] = useState(false);
    const [cbuEntreRiosCopiado, setCbuEntreRiosCopiado] = useState(false);

    const cerrarPagos = () => {
        setMostrarPagos(false);
        setCbuEntreRiosCopiado(false);
        setCbuMacroCopiado(false);
        setDatosCorroborados(false);
    }

    const parteUtilizableClick = (e) => {
        e.stopPropagation();
    }

    const copiarCbu = (cbu, banco) => {
        navigator.clipboard.writeText(cbu);
        if (banco == 'macro') {
            setCbuMacroCopiado(true);
        }
        else if (banco == 'entreRios') {
            setCbuEntreRiosCopiado(true);
        }
    }

    return (
        <div className="contenedorPrincipalPagos" onClick={cerrarPagos}>
            <div className="parteUtilizablePagos" onClick={parteUtilizableClick}>
                <div className="tituloPagosContainer">
                    <h1>DATOS BANCARIOS</h1>
                    <h2>EL CAMINO SRL</h2>
                </div>
                <div className="bancoMacro">
                    <h3 className="nombreBanco">BANCO MACRO</h3>
                    <div className="cbuYBoton">
                        <p>CBU: 2850370530094199669011</p>

                        <button onClick={() => copiarCbu("2850370530094199669011", "macro")}>
                            {cbuMacroCopiado ?
                                (<svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                                </svg>)
                                :
                                (<svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                                </svg>)}

                        </button>
                    </div>
                    <p className="alias">ALIAS: PERLA.BAMBU.ACTUAL</p>
                </div>
                <div className="bancoEntreRios">
                    <h3 className="nombreBanco">BANCO DE ENTRE RÍOS</h3>
                    <div className="cbuYBoton">
                        <p>CBU: 3860024901000065156943</p>
                        <button onClick={() => copiarCbu("3860024901000065156943", "entreRios")}>
                            {cbuEntreRiosCopiado ?
                                (<svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                                </svg>)
                                :
                                (<svg xmlns="http://www.w3.org/2000/svg" width="1.6rem" height="1.6rem" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                                </svg>)}
                        </button>
                    </div>
                    <p className="alias">ALIAS: CAUCHO.BRONCE.BIGOTE</p>
                </div>
                <div className="infoExtra">
                    <p className="infoBancos">Abona tu compra a cualquiera de los dos bancos y luego enviá el comprobante de pago por Whatsapp al teléfono <a href="https://web.whatsapp.com/send?phone=+5493456475429" target="blank">3456475429</a></p>
                </div>
                {datosCorroborados ? (<p className="totalAAbonar">TOTAL A ABONAR: <span>${precioTotal}</span></p>) : ('')}
            </div>
        </div>
    );
}