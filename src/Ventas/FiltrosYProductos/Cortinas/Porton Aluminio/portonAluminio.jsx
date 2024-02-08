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
        descelectControlYTeclaPortonAluminio,
        limpiarPortonAluminio,
    } = useCortinas();

    return (
        <div className="contenedorPrincipalPortonAluminio">
            <form className="formularioPortonAluminio">
                <div className="form-group-cortinas">
                    <p>DIMENSIONES</p>
                    <div className="bodyFormGroupCortinas">
                        <label htmlFor="alto">Alto</label>
                        <input type="text"
                            id="alto"
                            value={alto}
                            onChange={(e) => setAlto(e.target.value)}
                        />

                        <label htmlFor="ancho">Ancho</label>
                        <input type="text"
                            id="ancho"
                            value={ancho}
                            onChange={(e) => setAncho(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>MEDIDA INDICADA</p>
                    <div className="bodyFormGroupCortinas">
                        <label htmlFor="vano">Vano</label>
                        <input type="radio"
                            id="vano"
                            name="radioAlturaIndicada"
                            checked={alturaIndicada == 'vano'}
                            onChange={() => setAlturaIndicada("vano")}
                        />

                        <label htmlFor="abertura">Abertura</label>
                        <input type="radio"
                            id="abertura"
                            name="radioAlturaIndicada"
                            checked={alturaIndicada == 'abertura'}
                            onChange={() => setAlturaIndicada("abertura")}
                        />
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>CON MECANISMO?</p>
                    <div className="bodyFormGroupCortinas">
                        <label htmlFor="mecanismoSi">Si</label>
                        <input type="radio"
                            id="mecanismoSi"
                            name="radioMecanismo"
                            checked={conMecanismo == 'mecanismoSi'}
                            onChange={() => { setConMecanismo('mecanismoSi') }}
                        />

                        <label htmlFor="mecanismoNo">No</label>
                        <input type="radio"
                            id="mecanismoNo"
                            name="radioMecanismo"
                            checked={conMecanismo == 'mecanismoNo'}
                            onChange={() => { setConMecanismo('mecanismoNo'); descelectControlYTeclaPortonAluminio() }}
                        />
                    </div>
                </div>

                {conMecanismo &&
                    <>
                        <div className="form-group-cortinas">
                            <p>CON CONTROL?</p>
                            <div className="bodyFormGroupCortinas">
                                <label htmlFor="controlSi">Si</label>
                                <input type="radio"
                                    id="controlSi"
                                    name="radioControl"
                                    checked={control == 'controlSi'}
                                    onChange={() => setControl('controlSi')}
                                />

                                <label htmlFor="controlNo">No</label>
                                <input type="radio"
                                    id="controlNo"
                                    name="radioControl"
                                    checked={control == 'controlNo'}
                                    onChange={() => { setControl('controlNo'); setTecla('teclaNo'); }}
                                />
                            </div>
                        </div>

                        <div className="form-group-cortinas">
                            <p>CON TECLA?</p>
                            <div className="bodyFormGroupCortinas">
                                <label htmlFor="teclaSi">Si</label>
                                <input type="radio"
                                    id="teclaSi"
                                    name="radioTecla"
                                    checked={tecla == 'teclaSi'}
                                    onChange={() => setTecla('teclaSi')}
                                />

                                <label htmlFor="teclaNo">No</label>
                                <input type="radio"
                                    id="teclaNo"
                                    name="radioTecla"
                                    disabled={control == 'controlNo'}
                                    checked={tecla == 'teclaNo'}
                                    onChange={() => setTecla('teclaNo')}
                                />
                            </div>
                        </div>
                    </>
                }
                <div className="form-group-cortinas">
                    <p>TIPO DE TABLILLA</p>
                    <div className="bodyFormGroupCortinas">
                        <label htmlFor="portonDap55">DAP-55</label>
                        <input type="radio"
                            id="portonDap55"
                            name="radioTipoTablillaPorton"
                            checked={tipoTablilla == 'portonDap55'}
                            onChange={() => setTipoTablilla("portonDap55")}
                        />

                        <label htmlFor="portonDap64">DAP-64</label>
                        <input type="radio"
                            id="portonDap64"
                            name="radioTipoTablillaPorton"
                            checked={tipoTablilla == 'portonDap64'}
                            onChange={() => setTipoTablilla("portonDap64")}
                        />

                        <label htmlFor="portonDap79">DAP-79 ciego</label>
                        <input type="radio"
                            id="portonDap79"
                            name="radioTipoTablillaPorton"
                            checked={tipoTablilla == 'portonDap79'}
                            onChange={() => setTipoTablilla("portonDap79")}
                        />

                        <label htmlFor="portonDap49">DAP-49 microperforada</label>
                        <input type="radio"
                            id="portonDap49"
                            name="radioTipoTablillaPorton"
                            checked={tipoTablilla == 'portonDap49'}
                            onChange={() => setTipoTablilla("portonDap49")}
                        />
                    </div>
                </div>
            </form>
            <div className="botonEnviarConsultaContainer">
                <button className="botonEnviarConsulta">
                    Enviar consulta
                </button>
            </div>
        </div>
    );
}