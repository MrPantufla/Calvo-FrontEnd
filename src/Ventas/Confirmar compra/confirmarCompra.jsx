import './confirmarCompra.css';
import { React, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useVariables } from '../../contextVariables';
import { useFinalizarCompra } from '../../contextFinalizarCompra';

export default function ConfirmarCompra(args) {

    const { backend } = useVariables();

    const { setCodigoSucursal } = useFinalizarCompra();

    const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

    const toggleOpcion = (opcion) => {
        setOpcionSeleccionada(opcion);
        opcion.set();
    }

    const obtenerSucursal = async () => {
        try {
            let tokenParaEnviar = Cookies.get('jwtToken');

            if (tokenParaEnviar == undefined) {
                tokenParaEnviar = null;
            }

            const response = await fetch(`${backend}/api/extraerSucursal`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': tokenParaEnviar,
                },
            });

            if (response.ok) {
                const sucursal = await response.text();
                setCodigoSucursal(sucursal);
            }
        } catch (error) {
            return false;
        }
    }

    useEffect(() => {
        obtenerSucursal();
    }, [])

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
                </div>
                <div className="botonesOpcionesConfirmarCompra">
                    {args.componentesArray.map((seccion, index) => {

                        return (
                            <button onClick={() => toggleOpcion(seccion)} className={opcionSeleccionada && opcionSeleccionada.nombre == seccion.nombre ? 'active' : ''} key={"boton" + index}>{seccion.nombre}</button>
                        )
                    })}
                </div>
                <div className="mensajeErrorConfirmarCompra">
                    {args.errorMessage !== '' && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" fill="var(--colorRojo)" className="bi bi-exclamation-diamond-fill svgErrorFormulario" viewBox="0 0 16 16">
                            <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                    )}
                    {args.errorMessage}
                </div>

                {args.componentesArray && opcionSeleccionada &&
                    args.componentesArray.find(comp => comp.nombre === opcionSeleccionada.nombre)?.componente
                }

                {args.componentesArray && opcionSeleccionada &&
                    args.componentesArray.find(comp => comp.nombre === opcionSeleccionada.nombre)?.aclaraciones
                }

            </div>
        </div >
    );
}