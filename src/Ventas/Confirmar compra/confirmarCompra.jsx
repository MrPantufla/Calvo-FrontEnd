import './confirmarCompra.css';
import { React, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useVariables } from '../../contextVariables';
import { useFinalizarCompra } from '../../contextFinalizarCompra';
import { useAuth } from '../../contextLogin';

export default function ConfirmarCompra(args) {

    const { backend } = useVariables();

    const {
        errorMessage,
        setErrorMessage,
        setTipoEnvio,
        medioEnvio,
        metodoPago,
        metodoFacturacion,
        setCodigoSucursal,
        setNombreYApellido,
        setCp,
        setLocalidad,
        setDireccion,
        setDni
    } = useFinalizarCompra();

    const {
        setMostrarEnvios,
        setMostrarPagos,
        setMostrarFacturacion,
        setMostrarFinalizarPedido,
        setMostrarConfirmarCompra
    } = useVariables();

    const {
        state
    } = useAuth();

    const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

    const toggleOpcion = (opcion) => {
        setOpcionSeleccionada(opcion);
        opcion.set();
    }

    const obtenerDatos = async () => {
        try {
            let tokenParaEnviar = Cookies.get('jwtToken');

            if (tokenParaEnviar == undefined) {
                tokenParaEnviar = null;
            }

            const response = await fetch(`${backend}/api/extraerFinalizarCompra`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': tokenParaEnviar,
                },
            });

            if (response.ok) {
                const datos = await response.text();
                
                if(datos.sucursal != undefined){
                    setCodigoSucursal(datos.sucursal);
                }

                if(datos.nombreYApellido != undefined){
                    setNombreYApellido(datos.nombreYApellido);
                }

                if(datos.cp != undefined){
                    setCp(datos.cp);
                }

                if(datos.localidad != undefined){
                    setLocalidad(datos.localidad);
                }

                if(datos.direccion != undefined){
                    setDireccion(datos.direccion);
                }

                if(datos.dni != null && datos.dni > 0){
                    setDni(datos.dni);
                }
            }
            else{
                console.log(response)
            }
        } catch (error) {
            return false;
        }
    }

    useEffect(() => {
        obtenerDatos();

        if (state.userInfo && !state.userInfo.cliente) {
            setTipoEnvio('correo')
        }
    }, [])

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

    /*ESTO QUEDA PARA AGREGAR ENVIAR FORMULARIOS CON ENTER
    const enterConfirmarCompra = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            console.log(keyDownEnter)
            if (typeof keyDownEnter === 'function') {
                keyDownEnter();
            }
        }
    };

    useEffect(() => {
        // Agregar el event listener al montar el componente
        window.addEventListener('keydown', enterConfirmarCompra);

        // Limpiar el event listener al desmontar el componente
        return () => {
            window.removeEventListener('keydown', enterConfirmarCompra);
        };
    }, []);*/

    return (
        <div className="contenedoresConfirmarCompra">
            <div className="parteUtilizableConfirmarCompra">
                <div className="headConfirmarCompra">
                    <button onClick={() => args.atras()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="white" className="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708z" />
                        </svg>
                    </button>
                    <p>{args.titulo}</p>
                    <button onClick={() => { setMostrarEnvios(false); setMostrarPagos(false); setMostrarFacturacion(false); setMostrarFinalizarPedido(false); setMostrarConfirmarCompra(false) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="white" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>
                    </button>
                </div>
                <div className="botonesOpcionesConfirmarCompra">
                    {args.componentesArray.map((seccion, index) => {

                        return (
                            <button onClick={() => { toggleOpcion(seccion); setErrorMessage('') }} className={(medioEnvio == seccion.comparador || metodoPago == seccion.comparador || metodoFacturacion == seccion.comparador) ? 'active' : ''} key={"boton" + index}>{seccion.nombre}</button>
                        )
                    })}
                </div>

                {errorMessage !== '' && (
                    <p className="errorFinalizarCompra">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" fill="var(--colorRojo)" className="bi bi-exclamation-diamond-fill svgErrorFormulario" viewBox="0 0 16 16">
                            <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                        {errorMessage}
                    </p>
                )}

                {args.componentesArray &&
                    args.componentesArray.find(comp => (comp.comparador === medioEnvio || comp.comparador === metodoPago || comp.comparador === metodoFacturacion))?.componente
                }

                {args.componentesArray &&
                    args.componentesArray.find(comp => (comp.comparador === medioEnvio || comp.comparador === metodoPago || comp.comparador === metodoFacturacion))?.aclaraciones
                }

            </div>
        </div >
    );
}