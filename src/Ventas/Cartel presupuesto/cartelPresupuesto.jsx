import './cartelPresupuesto.css';
import { useState } from 'react';
import { useVariables } from '../../contextVariables';

export default function CartelPresupuesto() {
    const [aptoParaCerrar, setAptoParaCerrar] = useState(false);

    const { setMostrarCartelPresupuesto } = useVariables();

    const handleCloseCartel = () => {
        if(aptoParaCerrar == true){
            setMostrarCartelPresupuesto(false)
        }
    }

    const noCerrar = (event) =>{
        setAptoParaCerrar(false);
        event.stopPropagation();
    }

    return (
        <div className="contenedorPrincipalCartelPresupuesto" onMouseDown={() => setAptoParaCerrar(true)} onClick={handleCloseCartel}>
            <div className="parteUtilizableCartelPresupuesto" onMouseDown={noCerrar} onMouseUp={noCerrar}>
                <p>Muy pronto vas a poder generar tus presupuestos y descargarlos en formato pdf con un solo click!</p>
                <button className="botonAceptar" onClick={()=> setMostrarCartelPresupuesto(false)}>Aceptar</button>
            </div>
        </div>
    );
}