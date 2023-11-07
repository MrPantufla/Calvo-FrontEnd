import Contacto from './contacto.jsx';
import Informacion from './informacion.jsx';
import './informacionYContacto.css';

export default function InformacionYContacto() {
    let mobile = (window.innerWidth < 768);
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
                        {mobile ? <col-12><div className="decoracion extraDecoracion">Información de contacto</div></col-12> : mobile=false}
                        <div className="col-11 col-sm-6 divContacto divsInfoYContacto">
                            {mobile ? <Informacion/> : <Contacto/>}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}