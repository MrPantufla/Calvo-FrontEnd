import Contacto from './contacto.jsx';
import Informacion from './informacion.jsx';
import './informacionYContacto.css';

export default function InformacionYContacto(){
    return(
        <div className="contenedorPrincipalInfoYContacto">
            <div className="row">
                <div className="col-6 divInformacion">
                    <Informacion/>
                </div>
                <div className="col-6 divContacto">
                    <Contacto/>
                </div>
            </div>
        </div>
    );
}