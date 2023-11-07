import Contacto from './contacto.jsx';
import Informacion from './informacion.jsx';
import './informacionYContacto.css';

export default function InformacionYContacto() {
    const mobile = (window.innerWidth < 768);
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
                        <div className="col-11 col-sm-6 divInformacion divsInfoYContacto">
                            {mobile ? <Contacto/> : <Informacion/>}
                        </div>
                        <div className="col-11 col-sm-6 divContacto divsInfoYContacto">
                            {mobile ? 
                                (<div>
                                    <div className="col-12">
                                        <div className="decoracion2" >
                                            Información de contacto
                                        </div>
                                        <Informacion/>
                                    </div>
                                </div>)
                                :
                                <Contacto/>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}