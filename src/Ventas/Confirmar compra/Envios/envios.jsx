import { useState } from "react";
import { useVariables } from "../../../contextVariables";
import './envios.css';
import Domicilio from "./Domicilio/domicilio";

export default function Envios() {

    const {
        setMostrarEnvios,
        setMostrarPagosTarjeta
    } = useVariables();

    const [aptoParaCerrar, setAptoParaCerrar] = useState(false);
    const [tipoEnvio, setTipoEnvio] = useState(null);

    const handleParteUtilizableClick = (event) => {
        setAptoParaCerrar(false);
        event.stopPropagation();
    }

    const cerrarEnvios = () => {
        if (aptoParaCerrar == true) {
            setMostrarEnvios(false);
        }
    }

    const toggleTipoEnvio = (tipo) => {
        setTipoEnvio(tipo);
    }

    //----------------------------------- Lo de abajo es lo provisorio
    const errorMessage = 'Mensaje de error';

    //ConfirmarEnvio es algo que debe ejecutarse despues de corroborar los datos
    const confirmarEnvio = () => {
        setMostrarEnvios(false);
        setMostrarPagosTarjeta(true);
    }
    //-----------------------------------

    return (
        <div className="contenedorPrincipalEnvios" onClick={cerrarEnvios} onMouseDown={() => setAptoParaCerrar(true)}>
            <div className="parteUtilizableEnvios" onMouseDown={handleParteUtilizableClick} onMouseUp={handleParteUtilizableClick}>
                <div className="headEnvios">
                    <p>ENVÍO</p>
                </div>
                <div className="botonesEnvios">
                    <button onClick={() => toggleTipoEnvio('domicilio')} className={tipoEnvio == 'domicilio' && 'active'}>Envío a domicilio</button>
                    <button onClick={() => toggleTipoEnvio('sucursal')} className={tipoEnvio == 'sucursal' && 'active'}>Envío a sucursal</button>
                    <button onClick={() => toggleTipoEnvio('retira')} className={tipoEnvio == 'retira' && 'active'}>Retira por su cuenta</button>
                </div>
                <div className="bodyFormulariosEnvios">
                    {tipoEnvio == 'domicilio' ? (<Domicilio />)
                        :
                        tipoEnvio == 'sucursal' && ('')
                    }
                    <div className="contenedorConfirmarEnvio">
                        {tipoEnvio && <button className="confirmarEnvio" onClick={confirmarEnvio}>Confirmar</button>}
                    </div>
                    {(tipoEnvio == 'domicilio' || tipoEnvio == 'sucursal') &&
                        <p className="aclaracionesEnvios">
                            -Los envíos se realizan por medio del servicio de Correro Argentino<br />
                            -Podrás realizar un seguimiento del estado de tu envío en la sección <a href='/misCompras' target="blank">Mis compras</a>
                        </p>
                    }
                </div>
            </div>
        </div>
    )
}