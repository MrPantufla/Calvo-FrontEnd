import './portonAluminio.css';
import { useCortinas } from '../../../../contextCortinas.jsx';

export default function PortonAluminio(){

    const {
        alto, 
        setAlto, 
        ancho, 
        setAncho, 
        conMecanismo, 
        setConMecanismo, 
        alturaIndicada, 
        setAlturaIndicada,
        control, 
        setControl,
        tecla, 
        setTecla,
        tipoTablilla, 
        setTipoTablilla,
    } = useCortinas();

    return(
        <div className="contenedorPrincipalPortonAluminio">

        </div>
    );
}