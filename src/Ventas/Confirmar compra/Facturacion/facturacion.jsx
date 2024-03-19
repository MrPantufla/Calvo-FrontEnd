import './facturacion.css';
import { useState } from 'react';

export function Facturacion() {
    const [tipoFacturacion, setTipoFacturacion] = useState('');

    const handleAtras = () =>{
        setTipoFacturacion('');
    }

    return (
        <div className="contenedorGeneralFacturacion">
            <div className="parteUtilizableFacturacion">
                <div className="headFacturacion">
                    <button className="atrasFacturacion"></button>
                    <p>CONDICIÓN DE FACTURACIÓN</p>
                </div>
                <div className="botonesTipoFacturacion">
                    <button>Consumidor final</button>
                    <button>Régimen tributario</button>
                </div>
            </div>
        </div>
    );
}