import Contacto from './contacto.jsx';
import Informacion from './informacion.jsx';
import './informacionYContacto.css';

export default function InformacionYContacto() {
    return (
        <div className="contenedorPrincipalInfoYContacto">
            <div className="containerInfoYContactoAux">
                <div className="containerInfoYContactoAux2">
                    <div className="row containerInfoYContacto">
                        <div className="col-12">
                            <div className="decoracion" >
                                Enviá tu consulta
                            </div>
                        </div>
                        <div className="col-6 divInformacion divsInfoYContacto">
                            <Informacion />
                        </div>
                        <div className="col-6 divContacto divsInfoYContacto">
                            <Contacto />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}