import './cortinas.css';
import { useCortinas } from '../../../contextCortinas';
import Roller from './Roller/roller';
import PersianaPvc from './Persiana PVC/persianaPvc';
import PortonAluminio from './Porton Aluminio/portonAluminio';
import PersianaAluminio from './Persiana Aluminio/persianaAluminio';

export default function Cortinas() {

    const { tipo, setTipo, limpiarFormularios } = useCortinas();

    return (
        <div className="contenedorPrincipalCortinas">
            <div className="parteUtilizableCortinas">
                <div className="decoracionCortinasContainer">
                    <div className="decoracion" >
                        Consulta tu presupuesto
                    </div>
                </div>
                <div className="formularioCortinasContainer">
                    <div>
                        <div className="form-group-cortinas">
                            <p>TIPO</p>
                            <div className="bodyFormGroupCortinas">
                                <div className={`especificacionCortina ${tipo == 'roller' ? 'checked' : ''}`} onClick={() => { limpiarFormularios(); setTipo(tipo !== 'roller' ? 'roller' : undefined) }}>Roller</div>
                                <div className={`especificacionCortina ${tipo == 'persianaPvc' ? 'checked' : ''}`} onClick={() => { limpiarFormularios(); setTipo(tipo !== 'persianaPvc' ? 'persianaPvc' : undefined) }}>Persiana PVC</div>
                                <div className={`especificacionCortina ${tipo == 'portonAluminio' ? 'checked' : ''}`} onClick={() => { limpiarFormularios(); setTipo(tipo !== 'portonAluminio' ? 'portonAluminio' : undefined) }}>Porton de aluminio</div>
                                <div className={`especificacionCortina ${tipo == 'persianaAluminio' ? 'checked' : ''}`} onClick={() => { limpiarFormularios(); setTipo(tipo !== 'persianaAluminio' ? 'persianaAluminio' : undefined) }}>Persiana de aluminio</div>
                            </div>
                        </div>
                    </div>
                    {tipo == 'roller' && <Roller />}
                    {tipo == 'persianaPvc' && <PersianaPvc />}
                    {tipo == 'portonAluminio' && <PortonAluminio />}
                    {tipo == 'persianaAluminio' && <PersianaAluminio />}
                </div>
            </div>
        </div>
    );
}