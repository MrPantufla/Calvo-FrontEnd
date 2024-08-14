import { useCarrito } from '../../../contextCarrito';
import './facturacion.css';
import { useState } from 'react';
import { useVariables } from '../../../contextVariables';

export function Facturacion() {
    const {
        confirmarCompra,
        limpiarCarrito,
        setCarritoAbierto,
        elementos
    } = useCarrito();

    const [tipoFacturacion, setTipoFacturacion] = useState('');
    const [cuit, setCuit] = useState('');
    const [nombreYApellido, setNombreYApellido] = useState('');
    const [cp, setCp] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [dni, setDni] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [aptoParaCerrar, setAptoParaCerrar] = useState(false);

    const { setMostrarFacturacion } = useVariables();

    const toggleTipoFacturacion = (tipo) => {
        setTipoFacturacion(tipo);

        setErrorMessage('');
    }

    const handleCloseCartel = () => {
        if (aptoParaCerrar == true) {
            setMostrarFacturacion(false);
        }
    }

    const noCerrar = (event) => {
        setAptoParaCerrar(false);
        event.stopPropagation();
    }

    const realizarPedido = (datosPedido) => {
        confirmarCompra(datosPedido);
        limpiarCarrito();
        setCarritoAbierto(false);
        setMostrarFacturacion(false);
    }

    const corroborarFormato = (e) => {
        e.preventDefault();

        const numerosRegex = /^[0-9]+$/;

        if (tipoFacturacion == 'responsableInscripto') {
            if (!cuit) {
                setErrorMessage('Por favor, completa todos los campos')
                return;
            }
            else if (!numerosRegex.test(cuit)) {
                setErrorMessage('CUIT solo puede contener números')
                return;
            }
            if (cuit.length != 11) {
                setErrorMessage('CUIT debe contener 11 caracteres')
                return;
            }
        }
        else if (tipoFacturacion == 'consumidorFinal') {
            if (!nombreYApellido || !cp || !direccion || !dni) {
                setErrorMessage('Por favor, completa todos los campos')
                return;
            }
            else if (!numerosRegex.test(cp)) {
                setErrorMessage('CP solo puede contener números')
                return;
            }
            else if (!numerosRegex.test(dni)) {
                setErrorMessage('DNI solo puede contener números')
                return;
            }
            else if (dni.length > 9) {
                setErrorMessage('DNI demasiado largo')
                return;
            }
        }

        realizarPedido(datosPedido);
    }

    let datosPedido = '';

    if (tipoFacturacion == 'sinFacturar') {
        datosPedido = 'Sin factura';
    }
    else if (tipoFacturacion == 'responsableInscripto') {
        datosPedido = 'Facturar a ' + cuit;
    }
    else {
        datosPedido = 'Facturar a ' + nombreYApellido + ', CP: ' + cp + ', DIRECCION: ' + direccion + ", DNI: " + dni;
    }
    
    const tieneProceso = elementos.some(elemento => elemento.id.includes("("));

    return (
        <div className="contenedorGeneralFacturacion" onMouseDown={() => setAptoParaCerrar(true)} onClick={handleCloseCartel}>
            <div className="parteUtilizableFacturacion" onMouseDown={noCerrar} onMouseUp={noCerrar}>
                <div className="headFacturacion">
                    <p>CONDICIÓN DE FACTURACIÓN</p>
                </div>
                <div className="botonesTipoFacturacion">
                    <button onClick={() => toggleTipoFacturacion('sinFacturar')} className={tipoFacturacion == 'sinFacturar' ? 'active' : ''}>Sin facturar</button>
                    <button onClick={() => toggleTipoFacturacion('consumidorFinal')} className={tipoFacturacion == 'consumidorFinal' ? 'active' : ''}>Consumidor final</button>
                    <button onClick={() => toggleTipoFacturacion('responsableInscripto')} className={tipoFacturacion == 'responsableInscripto' ? 'active' : ''}>Inscripto</button>
                </div>
                <div className="mensajeError" style={{ display: (tipoFacturacion == '' || tipoFacturacion == 'sinFacturar') && 'none' }}>
                    {errorMessage !== '' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" fill="var(--colorRojo)" className="bi bi-exclamation-diamond-fill svgErrorFormulario" viewBox="0 0 16 16">
                            <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                    )}
                    {errorMessage}
                </div>
                {tipoFacturacion !== '' &&
                    (<form className="formularioFacturacion">
                        {tipoFacturacion == 'responsableInscripto' ?
                            (<div className="form-group-responsableInscripto">
                                <label htmlFor="ingresarCuit">CUIT</label>
                                <input id="ingresarCuit"
                                    value={cuit}
                                    onChange={(e) => setCuit(e.target.value)}
                                    onFocus={() => setErrorMessage('')}
                                />
                            </div>)
                            :
                            (<>
                                {tipoFacturacion == 'consumidorFinal' &&
                                    (<>
                                        <div className="form-group-consumidorFinal">
                                            <label htmlFor="nombreYApellido">NOMBRE Y APELLIDO</label>
                                            <input id="nombreYApellido"
                                                value={nombreYApellido}
                                                onChange={(e) => setNombreYApellido(e.target.value)}
                                                onFocus={() => setErrorMessage('')}
                                            />
                                        </div>

                                        <div className="form-group-consumidorFinal">
                                            <label htmlFor="cp">CP</label>
                                            <input id="cp"
                                                value={cp}
                                                onChange={(e) => setCp(e.target.value)}
                                                onFocus={() => setErrorMessage('')}
                                            />
                                        </div>

                                        <div className="form-group-consumidorFinal">
                                            <label htmlFor="localidad">LOCALIDAD</label>
                                            <input id="localidad"
                                                value={localidad}
                                                onChange={(e) => setCp(e.target.value)}
                                                onFocus={() => setErrorMessage('')}
                                            />
                                        </div>

                                        <div className="form-group-consumidorFinal">
                                            <label htmlFor="direccionFacturacion">DIRECCIÓN FISCAL</label>
                                            <input id="direccionFacturacion"
                                                value={direccion}
                                                onChange={(e) => setDireccion(e.target.value)}
                                                onFocus={() => setErrorMessage('')}
                                            />
                                        </div>

                                        <div className="form-group-consumidorFinal">
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
                                onClick={(e) => { corroborarFormato(e) }}
                            >
                                Realizar pedido
                            </button>
                        </div>
                    </form>
                    )
                }
                <p className="terminosYCondicionesFacturacion">
                    Recordatorio de términos y condiciones:<br/>
                    -El precio listado de los perfiles es aproximado en base al peso estimativo de los mismos.<br/>
                    -Los productos están sujetos a disponibilidad.<br/>
                    -Los precios pueden variar sin previo aviso.<br/>
                    {tieneProceso && '-Para concretar un pedido de perfiles con procesos, se debe abonar una seña del 50% del valor estimativo del mismo. Una persona de ventas se comunicará para concretar dicha transacción.'}
                </p>
            </div>
        </div>
    );
}