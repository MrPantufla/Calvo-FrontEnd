import './persianaPvc.css';
import { useCortinas } from '../../../../contextCortinas.jsx';

export default function PersianaPvc(){

    const {
        alto, 
        setAlto, 
        ancho, 
        setAncho, 
        conMecanismo, 
        setConMecanismo, 
        alturaIndicada, 
        setAlturaIndicada,
        tipoEnrollador, 
        setTipoEnrollador
    } = useCortinas();

    return(
        <div className="contenedorPrincipalPersianaPvc">
            
        </div>
    );
}