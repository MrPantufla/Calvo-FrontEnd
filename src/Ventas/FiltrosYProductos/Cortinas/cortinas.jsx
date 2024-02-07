import './cortinas.css';
import { useCortinas } from '../../../contextCortinas';
import Roller from './Roller/roller';
import PersianaPvc from './Persiana PVC/persianaPvc';
import PortonAluminio from './Porton Aluminio/portonAluminio';

export default function Cortinas() {

    const { tipo, setTipo, limpiarRoller } = useCortinas();

    return (
        <div className="contenedorPrincipalCortinas">
            <form>
                <label htmlFor="roller">Roller</label>
                <input type="radio" id="roller" name="radioTipo" value="roller" onChange={() => {setTipo('roller'); limpiarRoller()}} />

                <label htmlFor="persianaPvc">Persiana PVC</label>
                <input type="radio" id="persianaPvc" name="radioTipo" value="persianaPvc" onChange={() => setTipo('persianaPvc')} />

                <label htmlFor="portonAluminio">Porton de aluminio</label>
                <input type="radio" id="portonAluminio" name="radioTipo" value="portonAluminio" onChange={() => setTipo('portonAluminio')} />

                <label htmlFor="persianaAluminio">Persiana de aluminio</label>
                <input type="radio" id="persianaAluminio" name="radioTipo" value="persianaAluminio" onChange={() => setTipo('persianaAluminio')} />
            </form>
            {tipo == 'roller' && <Roller/>}
            {tipo == 'persianaPvc' && <PersianaPvc/>}
            {tipo == 'portonAluminio' && <PortonAluminio/>}
        </div>
    );
}