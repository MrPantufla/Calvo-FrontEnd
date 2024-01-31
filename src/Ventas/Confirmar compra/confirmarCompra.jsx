import './confirmarCompra.css';
import { useDireccion } from '../../contextDireccion';
import FormularioDireccion from '../../Perfil/Body Perfil/Configuracion/Direcciones/formularioDireccion';
import CorroborarDatos from './Corroborar datos/corroborarDatos';
import { useNavigate } from 'react-router-dom';
import { useConfiguracion } from '../../contextConfiguracion';
import { useState } from 'react';
import { useCarrito } from '../../contextCarrito';
import ErrorDirecion from './Error direccion/errorDireccion';

export default function ConfirmarCompra() {
    const direccion = useDireccion();
    const navigate = useNavigate();
    const configuracion = useConfiguracion();
    const carrito = useCarrito();

    const irAIngresarDireccion = () =>{
        configuracion.abrirDireccion();
        navigate('/perfil');
    }

    const handleParteUtilizableClick = (event) => {
        event.stopPropagation();
    }

    const cerrarConfirmarCompra = () =>{
        carrito.setConfirmarCompraAbierto(false)
        console.log(carrito.confirmarCompraAbierto)
    }

    return (
        <div className="contenedorPrincipalConfirmarCompra" onClick={cerrarConfirmarCompra}>
            <div className="parteUtilizableConfirmarCompra" onClick={handleParteUtilizableClick}>
                    {direccion.calle=='' || direccion.numero=='' || direccion.cp=='' || direccion.localidad=='' || direccion.provincia=='' ? 
                    (
                        <ErrorDirecion/>
                    ) 
                    : 
                    (<CorroborarDatos />)}
            </div>
        </div>
    );
}