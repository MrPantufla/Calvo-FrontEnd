import './cortinas.css';
import { useCortinas } from '../../../contextCortinas';

export default function Cortinas() {
    return (
        <div className="contenedorPrincipalCortinas">
            <form>
                <input type="radio" id="roller" name="radioTipo" value="roller" checked={() => setTipo('roller')} />
                <label for="roller">Roller</label>

                <input type="radio" id="persianaPvc" name="radioTipo" value="persianaPvc" checked={() => setTipo('persianaPvc')} />
                <label for="persianaPvc">Persiana PVC</label>

                <input type="radio" id="portonAluminio" name="radioTipo" value="portonAluminio" checked={() => setTipo('portonAluminio')} />
                <label for="portonAluminio">Porton de aluminio</label>

                <input type="radio" id="persianaAluminio" name="radioTipo" value="persianaAluminio" checked={() => setTipo('persianaAluminio')} />
                <label for="persianaAluminio">Persiana de aluminio</label>
            </form>
            
            {/*<form className="formularioCortinas">
                <div className="form-group-cortinas">
                    <label htmlFor="altura">Alto(milímetros)</label>
                    <input type="text"
                        id="altura"
                        value={altura}
                        onChange={(e) => setAltura(e.target.value)}
                        onFocus={() => auth.setErrorMessage('')}
                    />
                    <label htmlFor="altura">Ancho(milímetros)</label>
                    <input type="text"
                        id="altura"
                        value={altura}
                        onChange={(e) => setAltura(e.target.value)}
                        onFocus={() => auth.setErrorMessage('')}
                    />
                </div>
            </form>*/}
        </div>
    );
}