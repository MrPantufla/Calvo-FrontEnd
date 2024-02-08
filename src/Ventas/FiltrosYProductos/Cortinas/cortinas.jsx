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
                <form>
                    <div className="form-group-cortinas">
                        <p>TIPO</p>
                        <div className="bodyFormGroupCortinas">
                            <label htmlFor="roller">Roller</label>
                            <input type="radio" id="roller" name="radioTipo" value="roller" onChange={() => { setTipo('roller'); limpiarFormularios() }} />

                            <label htmlFor="persianaPvc">Persiana PVC</label>
                            <input type="radio" id="persianaPvc" name="radioTipo" value="persianaPvc" onChange={() => { setTipo('persianaPvc'); limpiarFormularios() }} />

                            <label htmlFor="portonAluminio">Porton de aluminio</label>
                            <input type="radio" id="portonAluminio" name="radioTipo" value="portonAluminio" onChange={() => { setTipo('portonAluminio'); limpiarFormularios() }} />

                            <label htmlFor="persianaAluminio">Persiana de aluminio</label>
                            <input type="radio" id="persianaAluminio" name="radioTipo" value="persianaAluminio" onChange={() => { setTipo('persianaAluminio'); limpiarFormularios() }} />
                        </div>
                    </div>
                </form>
                {tipo == 'roller' && <Roller />}
                {tipo == 'persianaPvc' && <PersianaPvc />}
                {tipo == 'portonAluminio' && <PortonAluminio />}
                {tipo == 'persianaAluminio' && <PersianaAluminio />}
            </div>
        </div>
    );
}