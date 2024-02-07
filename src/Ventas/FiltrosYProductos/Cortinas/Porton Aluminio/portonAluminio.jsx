import './portonAluminio.css';
import { useCortinas } from '../../../../contextCortinas.jsx';

export default function PortonAluminio() {

    const {
        alto,
        setAlto,
        ancho,
        setAncho,
        conMecanismo,
        setConMecanismo,
        alturaIndicada,
        setAlturaIndicada,
        control,
        setControl,
        tecla,
        setTecla,
        tipoTablilla,
        setTipoTablilla,
    } = useCortinas();

    return (
        <div className="contenedorPrincipalPortonAluminio">
            <form className="mecanismo">
                <label htmlFor="mecanismoSi">Si</label>
                <input type="radio"
                    id="mecanismoSi"
                    name="radioMecanismo"
                    value="mecanismoSi"
                    onChange={() => { setConMecanismo(true) }}
                />

                <label htmlFor="mecanismoNo">No</label>
                <input type="radio"
                    id="mecanismoNo"
                    name="radioMecanismo"
                    value="mecanismoNo"
                    onChange={() => { setConMecanismo(false) }}
                />
            </form>
            <form className="formularioDimensiones">
                <label htmlFor="alto">Alto(milímetros)</label>
                <input type="text"
                    id="alto"
                    value={alto}
                    onChange={(e) => setAlto(e.target.value)}
                />

                <label htmlFor="ancho">Ancho(milímetros)</label>
                <input type="text"
                    id="ancho"
                    value={ancho}
                    onChange={(e) => setAncho(e.target.value)}
                />
            </form>
            <form className="alturaIndicada">
                <label htmlFor="vano">Vano</label>
                <input type="radio"
                    id="vano"
                    name="radioAlturaIndicada"
                    value="vano"
                    onChange={() => setAlturaIndicada("vano")}
                />

                <label htmlFor="abertura">Abertura</label>
                <input type="radio"
                    id="abertura"
                    name="radioAlturaIndicada"
                    value="abertura"
                    onChange={() => setAlturaIndicada("abertura")}
                />
            </form>
            {conMecanismo &&
                <>
                    <form className="control">
                        <label htmlFor="controlSi">Si</label>
                        <input type="radio"
                            id="controlSi"
                            name="radioControl"
                            value="controlSi"
                            onChange={() => setControl(true)}
                        />

                        <label htmlFor="controlNo">No</label>
                        <input type="radio"
                            id="controlNo"
                            name="radioControl"
                            value="controlNo"
                            onChange={() => setControl(false)}
                        />
                    </form>
                    {control == true ?
                        (<form className="tecla">
                            <label htmlFor="teclaSi">Si</label>
                            <input type="radio"
                                id="teclaSi"
                                name="radioTecla"
                                value="teclaSi"
                                onChange={() => setTecla(true)}
                            />

                            <label htmlFor="teclaNo">No</label>
                            <input type="radio"
                                id="teclaNo"
                                value="teclaNo"
                                onChange={() => setTecla(false)}
                            />
                        </form>)
                        :
                        (<>
                            {control == false && 
                            <form className="teclaSiosi">
                                <label htmlFor="teclaSi">Si</label>
                                <input type="radio"
                                    id="teclaSi"
                                    name="radioTecla"
                                    value="teclaSi"
                                    checked={true}
                                    onLoad={() => setTecla(true)}
                                />
                            </form>}
                        </>)
                    }
                </>
            }
            <form className="tipoTablillaPorton">
                <label htmlFor="portonDap55">DAP-55</label>
                <input type="radio"
                    id="portonDap55"
                    name="radioTipoTablillaPorton"
                    value="portonDap55"
                    onChange={() => setTipoTablilla("portonDap55")}
                />

                <label htmlFor="portonDap64">DAP-64</label>
                <input type="radio"
                    id="portonDap64"
                    name="radioTipoTablillaPorton"
                    value="portonDap64"
                    onChange={() => setTipoTablilla("portonDap64")}
                />

                <label htmlFor="portonDap79">DAP-79</label>
                <input type="radio"
                    id="portonDap79"
                    name="radioTipoTablillaPorton"
                    value="portonDap79"
                    onChange={() => setTipoTablilla("portonDap79")}
                />

                <label htmlFor="portonDap49">DAP-49</label>
                <input type="radio"
                    id="portonDap49"
                    name="radioTipoTablillaPorton"
                    value="portonDap49"
                    onChange={() => setTipoTablilla("portonDap49")}
                />
            </form>
            
            <button className="enviarPortonAluminio">
                Enviar consulta
            </button>
        </div>
    );
}