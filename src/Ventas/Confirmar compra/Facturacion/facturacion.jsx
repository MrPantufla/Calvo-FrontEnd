import { useCarrito } from '../../../contextCarrito';
import './facturacion.css';
import { useState } from 'react';
import { useTienda } from '../../../contextTienda';

export function Facturacion() {
    const {
        confirmarCompra,
        limpiarCarrito,
        setConfirmarCompraAbierto,
        setDatosCorroborados
    } = useCarrito();

    const { setMostrarPagos } = useTienda();

    const [tipoFacturacion, setTipoFacturacion] = useState('');
    const [cuit, setCuit] = useState('');
    const [nombreYApellido, setNombreYApellido] = useState('');
    const [cp, setCp] = useState('');
    const [direccion, setDireccion] = useState('');
    const [dni, setDni] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAtras = () => {
        setTipoFacturacion('');
        setInstanciaPedido('envio');
    }

    const { setInstanciaPedido } = useCarrito();

    const toggleConsumidorFinal = () => {
        if (tipoFacturacion == 'consumidorFinal') {
            setTipoFacturacion('');
        }
        else {
            setTipoFacturacion('consumidorFinal')
        }
    }

    const toggleReponsableInscripto = () => {
        if (tipoFacturacion == 'responsableInscripto') {
            setTipoFacturacion('');
        }
        else {
            setTipoFacturacion('responsableInscripto')
        }
    }

    return (
        <div className="contenedorGeneralFacturacion">
            <div className="headFacturacion">
                <button className="atrasFacturacion" onClick={handleAtras}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5" />
                    </svg>
                </button>
                <p>CONDICIÓN DE FACTURACIÓN</p>
            </div>
            <div className="botonesTipoFacturacion">
                <button onClick={toggleConsumidorFinal} className={tipoFacturacion == 'consumidorFinal' && 'active'}>Consumidor final</button>
                <button onClick={toggleReponsableInscripto} className={tipoFacturacion == 'responsableInscripto' && 'active'}>Responsable inscripto</button>
            </div>
            {tipoFacturacion !== '' &&
                (<form className="formularioFacturacion">
                    {tipoFacturacion == 'consumidorFinal' ?
                        (<div className="form-group-consumidorFinal">
                            <label htmlFor="ingresarCuit">CUIT</label>
                            <input id="ingresarCuit"
                                value={cuit}
                                onChange={(e) => setCuit(e.target.value)}
                                onFocus={() => setErrorMessage('')}
                            />
                        </div>)
                        :
                        (<>
                            {tipoFacturacion == 'responsableInscripto' &&
                                (<>
                                    <div className="form-group-responsableInscripto">
                                        <label htmlFor="nombreYApellido">NOMBRE Y APELLIDO</label>
                                        <input id="nombreYApellido"
                                            value={nombreYApellido}
                                            onChange={(e) => setNombreYApellido(e.target.value)}
                                            onFocus={() => setErrorMessage('')}
                                        />
                                    </div>

                                    <div className="form-group-responsableInscripto">
                                        <label htmlFor="cp">CP</label>
                                        <input id="cp"
                                            value={cp}
                                            onChange={(e) => setCp(e.target.value)}
                                            onFocus={() => setErrorMessage('')}
                                        />
                                    </div>

                                    <div className="form-group-responsableInscripto">
                                        <label htmlFor="direccionFacturacion">DIRECCIÓN DE FACTURACIÓN</label>
                                        <input id="direccionFacturacion"
                                            value={direccion}
                                            onChange={(e) => setDireccion(e.target.value)}
                                            onFocus={() => setErrorMessage('')}
                                        />
                                    </div>

                                    <div className="form-group-responsableInscripto">
                                        <label htmlFor="dni">DNI</label>
                                        <input id="dni"
                                            value={dni}
                                            onChange={(e) => setDni(e.target.value)}
                                            onFocus={() => setErrorMessage('')}
                                        />
                                    </div>
                                </>
                                )
                            }
                        </>)
                    }

                    <div className="botonRealizarPedidoContainer">
                        <button
                            className="enviarFormulario botonRealizarPedido"
                            onClick={() => { confirmarCompra(); limpiarCarrito(); setConfirmarCompraAbierto(false); setMostrarPagos(true); setDatosCorroborados(true) }}
                        >
                            Realizar pedido
                        </button>
                    </div>
                </form>
                )
            }
        </div>
    );
}