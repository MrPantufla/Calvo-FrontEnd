import './cortinas.css';
import { useCortinas } from '../../../contextCortinas';
import Roller from './Roller/roller';
import PersianaPvc from './Persiana PVC/persianaPvc';
import PortonAluminio from './Porton Aluminio/portonAluminio';
import PersianaAluminio from './Persiana Aluminio/persianaAluminio';
import Muestras from './Muestras/muestras';
import { useTienda } from '../../../contextTienda';

export default function Cortinas() {

    const {
        tipo,
        setTipo,
        limpiarFormularios,
        errorMessage,
        muestrasAbierto,
        setMuestrasAbierto
    } = useCortinas();

    const {
        isFold,
        isMobile,
    } = useTienda();

    const styleDesktop = {

    };

    const styleMobile = {

    };

    return (
        <div className="contenedorPrincipalCortinas">
            <div className="parteFormulariosCortinas" style={isFold ? styleMobile : (isMobile ? styleMobile : styleDesktop)}>
                <div className="decoracionCortinasContainer">
                    <div className="decoracion decoracionCortinas" >
                        Consulta tu presupuesto
                    </div>
                </div>

                <div>
                    <div className="form-group-cortinas">
                        <p>TIPO</p>
                        <div className="bodyFormGroupCortinas rowTiposContainer">
                            <div className="divFold1">
                                <div className={`especificacionCortina ${tipo == 'roller' ? 'checked' : ''}`} onClick={() => { limpiarFormularios(); setTipo('roller') }}>Roller</div>
                                <div className={`especificacionCortina ${tipo == 'persianaPvc' ? 'checked' : ''}`} onClick={() => { limpiarFormularios(); setTipo('persianaPvc') }}>Persiana PVC</div>
                            </div>
                            <div className="divFold2">
                                <div className={`especificacionCortina ${tipo == 'portonAluminio' ? 'checked' : ''}`} onClick={() => { limpiarFormularios(); setTipo('portonAluminio') }}>Porton de aluminio</div>
                                <div className={`especificacionCortina ${tipo == 'persianaAluminio' ? 'checked' : ''}`} onClick={() => { limpiarFormularios(); setTipo('persianaAluminio') }}>Persiana de aluminio</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="errorMessageContainer">
                    <p className="errorFormulario">
                        {errorMessage !== '' && (<svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" fill="var(--colorRojo)" className="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                            <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>)}{errorMessage}
                    </p>
                </div>
                <div className="formularioCortinasContainer">
                    {tipo == 'roller' && <Roller />}
                    {tipo == 'persianaPvc' && <PersianaPvc />}
                    {tipo == 'portonAluminio' && <PortonAluminio />}
                    {tipo == 'persianaAluminio' && <PersianaAluminio />}
                </div>
            </div>
            <div className="parteMuestrasCortinas" style={isFold ? styleMobile : (isMobile ? styleMobile : styleDesktop)}>
                <Muestras />
            </div>
            <div className="botonMostrarMuestrasContainer">
                <button
                    style={{
                        transform: muestrasAbierto ? 'scale(0.95)' : 'none',
                        display: isMobile ? 'block' : 'none'
                    }}
                    className={`botonMostrarMuestras ${muestrasAbierto ? 'open' : ''}`}
                    onClick={() => setMuestrasAbierto(!muestrasAbierto)}
                >                    
                    IMÁGENES DE REFERENCIA
                </button>
            </div>
        </div>
    );
}