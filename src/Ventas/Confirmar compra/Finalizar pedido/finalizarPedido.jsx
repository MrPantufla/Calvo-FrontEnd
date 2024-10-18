import { useVariables } from '../../../contextVariables';
import { useCarrito } from '../../../contextCarrito';
import './finalizarPedido.css';
import { useFinalizarCompra } from '../../../contextFinalizarCompra';
import { useAuth } from '../../../contextLogin';
import { useState, useEffect } from 'react';

export default function FinalizarPedido() {

    const {
        setMostrarEnvios,
        setMostrarPagos,
        setMostrarFacturacion,
        setMostrarFinalizarPedido,
        setMostrarConfirmarCompra
    } = useVariables();

    const {
        precioTotal
    } = useCarrito();

    const {
        medioEnvio,
        tipoEnvio,
        codigoSucursal,
        metodoPago
    } = useFinalizarCompra();

    const {
        calle,
        numero,
        cp: cpEnvio,
        provincia,
        localidad: localidadEnvio
    } = useAuth();

    const {
        elementos,
        confirmarCompra,
        limpiarCarrito,
        setCarritoAbierto
    } = useCarrito();

    const [errorMessage, setErrorMessage] = useState('');

    const renderEnvio = () => {
        switch (medioEnvio) {
            case 'domicilio': {
                if (tipoEnvio == 'correo') {
                    return (
                        <>
                            <p><span>DIRECCIÓN DE ENVÍO</span></p>
                            <p>{calle + " " + numero + " - " + cpEnvio + " - " + localidadEnvio + ", " + provincia}</p>
                            <p><span>TRANSPORTE</span></p>
                            <p>Correo Argentino</p>
                        </>
                    );
                }
                else {
                    return (
                        <>
                            <p><span>DIRECCIÓN DE ENVÍO</span></p>
                            <p>{calle + " " + numero + " - " + localidadEnvio + ", " + provincia + " (CP " + cpEnvio + ")"}</p>
                            <p><span>TRANSPORTE</span></p>
                            <p>Transporte Calvo</p>
                        </>
                    );
                }
            }
            case 'sucursal':
                return (
                    <>
                        <p><span>ENVÍO</span></p>
                        <p>Sucursal de Correo Argentino: {codigoSucursal}</p>
                    </>
                );
            case 'retira':
                return (
                    <>
                        <p><span>ENTREGA</span></p>
                        <p>Retira en el local</p>
                    </>
                )
        }
    }

    const confirmar = (e/*, datosPedido*/) => {
        e.preventDefault();
        //Si se acepta el pago =
        confirmarCompra('');
        limpiarCarrito();
        setCarritoAbierto(false);
        setMostrarFinalizarPedido(false);
    }

    const escConfirmarCompra = (e) => {
        if (e.key === 'Escape') {
            setMostrarConfirmarCompra(false);
            setMostrarEnvios(false);
            setMostrarPagos(false);
            setMostrarFacturacion(false);
            setMostrarFinalizarPedido(false);
        }
    };

    useEffect(() => {
        // Agregar el event listener al montar el componente
        window.addEventListener('keydown', escConfirmarCompra);

        // Limpiar el event listener al desmontar el componente
        return () => {
            window.removeEventListener('keydown', escConfirmarCompra);
        };
    }, []);

    return (
        <div className="contenedoresConfirmarCompra">
            <div className="parteUtilizableConfirmarCompra">
                <div className="headConfirmarCompra">
                    <button onClick={() => { setMostrarFinalizarPedido(false); setMostrarFacturacion(true) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="white" className="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708z" />
                        </svg>
                    </button>
                    <p>FINALIZAR PEDIDO</p>
                    <button onClick={() => { setMostrarEnvios(false); setMostrarPagos(false); setMostrarFacturacion(false); setMostrarFinalizarPedido(false); setMostrarConfirmarCompra(false) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="white" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>
                    </button>
                </div>

                {errorMessage !== '' && (
                    <p className="errorFinalizarCompra">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" fill="var(--colorRojo)" className="bi bi-exclamation-diamond-fill svgErrorFormulario" viewBox="0 0 16 16">
                            <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                        {errorMessage}
                        {/*TIENE QUE HABER UN BOTON PARA EDITAR LA TARJETA SI LA API DEL BANCO LA RECHAZA*/}
                    </p>
                )}

                <div className="bodyConfirmarCompra">
                    <div className="envioFinalizarPedido">
                        {renderEnvio()}
                    </div>

                    <div className="pagoFinalizarPedido">
                        <p><span>MÉTODO DE PAGO</span></p>
                        <p>
                            {metodoPago == 'tarjeta' ?
                                ('Tarjeta de crédito/débito')
                                :
                                ('Efectivo')}
                        </p>
                    </div>

                    <div className="productosFinalizarPedido">
                        <p>{elementos.length} {elementos.length > 1 ? 'PRODUCTOS' : 'PRODUCTO'}</p>
                        <p><span>Total: </span>${parseInt(precioTotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                    </div>
                </div>

                <div className="contenedorConfirmarBoton">
                    <button onClick={(e) => confirmar(e)} className="confirmarBoton">Realizar pedido</button>
                </div>
            </div>
        </div>
    );
}