import './portonAluminio.css';
import { useCortinas } from '../../../../contextCortinas.jsx';
import { useEffect } from 'react';
import { useAuth } from '../../../../contextLogin.jsx';

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
        setErrorMessage,
        deleteErrorMessage,
        enviarCortina,
        aclaraciones,
        setAclaraciones
    } = useCortinas();

    const auth = useAuth();

    useEffect(() => {
        const textoAltoElement = document.getElementById('textoAlto');
        if (textoAltoElement) {
            textoAltoElement.addEventListener('click', () => {
                const altoElement = document.getElementById('alto');
                if (altoElement) {
                    altoElement.focus();
                }
            });
        }

        const textoAnchoElement = document.getElementById('textoAncho');
        if (textoAnchoElement) {
            textoAnchoElement.addEventListener('click', () => {
                const anchoElement = document.getElementById('ancho');
                if (anchoElement) {
                    anchoElement.focus();
                }
            });
        }
    }, []);

    const enviarConsulta = () => {
        const enterosRegex = /^[0-9]\d*$/;

        if (alto === "" || ancho === "" || conMecanismo === "" || alturaIndicada === "" || tipoTablilla === "") {
            setErrorMessage("Por favor, completa todos los campos obligatorios");
            window.scrollTo(0, 0);
        }
        else if (conMecanismo === 'mecanismoSi' && (control === "" || tecla === "")) {
            setErrorMessage("Por favor, completa todos los campos obligatorios");
            window.scrollTo(0, 0);
        }
        else if (!enterosRegex.test(alto) || !enterosRegex.test(ancho)) {
            setErrorMessage("Los campos de dimensiones solo aceptan números enteros");
            window.scrollTo(0, 0);
        }
        else {
            deleteErrorMessage();

            const textoCortina =
                "TIPO: PORTON ALUMINIO\n" +
                "ALTO: " + alto + "mm\n" +
                "ANCHO: " + ancho + "mm\n" +
                "ALTURA INDICADA: " + alturaIndicada + "\n" +
                "MECANISMO: " + (conMecanismo == 'mecanismoNo' ?
                    "Sin mecanismo, solo cortina"
                    :
                    "CONTROL: " + (control ? "Si" : "No")
                    + "\n" +
                    "TECLA: " + (tecla ? "Si" : "No")) + "\n" +
                "TIPO DE TABLILLA: " + tipoTablilla
                ;

            enviarCortina(textoCortina);
        }
    }

    return (
        <div className="contenedorPrincipalPortonAluminio">
            <form className="formularioPortonAluminio">
                <div className="form-group-cortinas">
                    <p>DIMENSIONES</p>
                    <div className="bodyFormGroupCortinas">
                        <label className="especificacionCortina textoEspecificacionCortina" htmlFor="alto">Alto:</label>
                        <input type="text"
                            id="alto"
                            value={alto}
                            onChange={(e) => { setAlto(e.target.value); deleteErrorMessage() }}
                            className="campotextoEspecificacionCortina"
                        />
                        <div id="textoAlto" className="especificacionCortina milimetrosCortinas"><p>mm.</p></div>

                        <label className="especificacionCortina textoEspecificacionCortina" htmlFor="ancho">Ancho:</label>
                        <input type="text"
                            id="ancho"
                            value={ancho}
                            onChange={(e) => { setAncho(e.target.value); deleteErrorMessage() }}
                            className="campotextoEspecificacionCortina"
                        />
                        <div id="textoAncho" className="especificacionCortina milimetrosCortinas"><p>mm.</p></div>
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>MEDIDA INDICADA</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${alturaIndicada == 'vano' ? 'checked' : ''}`} onClick={() => { setAlturaIndicada(alturaIndicada !== 'vano' ? 'vano' : ''); deleteErrorMessage() }}>Vano</div>
                        <div className={`especificacionCortina ${alturaIndicada == 'abertura' ? 'checked' : ''}`} onClick={() => { setAlturaIndicada(alturaIndicada !== 'abertura' ? 'abertura' : ''); deleteErrorMessage() }}>Abertura</div>
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>CON MECANISMO?</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoSi' ? 'checked' : ''}`} onClick={() => { setConMecanismo(conMecanismo !== 'mecanismoSi' ? 'mecanismoSi' : ''); deleteErrorMessage() }}>Si</div>
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoNo' ? 'checked' : ''}`} onClick={() => { setConMecanismo(conMecanismo !== 'mecanismoNo' ? 'mecanismoNo' : ''); descelectControlYTeclaPortonAluminio(); deleteErrorMessage() }}>No</div>
                    </div>
                </div>

                {conMecanismo == 'mecanismoSi' &&
                    <>
                        <div className="form-group-cortinas">
                            <p>CON CONTROL?</p>
                            <div className="bodyFormGroupCortinas">
                                <div className={`especificacionCortina ${control == 'controlSi' ? 'checked' : ''}`} onClick={() => { setControl(control !== 'controlSi' ? 'controlSi' : ''); deleteErrorMessage() }}>Si</div>
                                <div className={`especificacionCortina ${control == 'controlNo' ? 'checked' : ''}`} onClick={() => { setControl(control !== 'controlNo' ? 'controlNo' : ''); (tecla === 'teclaNo' && control !== 'controlNo') && (setTecla('')); deleteErrorMessage() }}>No</div>
                            </div>
                        </div>

                        <div className="form-group-cortinas">
                            <p>CON TECLA?</p>
                            <div className="bodyFormGroupCortinas">
                                <div className={`especificacionCortina ${tecla == 'teclaSi' ? 'checked' : ''}`} onClick={() => { setTecla(tecla !== 'teclaSi' ? 'teclaSi' : ''); deleteErrorMessage() }}>Si</div>
                                <div className={`especificacionCortina ${tecla == 'teclaNo' ? 'checked' : ''} ${control == 'controlNo' ? 'disabled' : ''}`} onClick={() => { setTecla((tecla !== 'teclaNo' && control != 'controlNo') ? 'teclaNo' : (tecla == 'teclaSi' ? 'teclaSi' : '')); deleteErrorMessage() }}>No</div>
                            </div>
                        </div>
                    </>
                }
                <div className="form-group-cortinas">
                    <p>TIPO DE TABLILLA</p>
                    <div className="bodyFormGroupCortinas divTablillas">
                        <div className="dapPortonAluminio1">
                            <div className={`especificacionCortina ${tipoTablilla == 'DAP-55' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'DAP-55' ? 'DAP-55' : ''); deleteErrorMessage() }}>DAP-55 con felpa</div>
                            <div className={`especificacionCortina ${tipoTablilla == 'DAP-64' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'DAP-64' ? 'DAP-64' : ''); deleteErrorMessage() }}>DAP-64 ciega</div>
                        </div>
                        <div className="dapPortonAluminio2">
                            <div className={`especificacionCortina ${tipoTablilla == 'DAP-79' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'DAP-79' ? 'DAP-79' : ''); deleteErrorMessage() }}>DAP-79 ciega</div>
                            <div className={`especificacionCortina ${tipoTablilla == 'DAP-49' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'DAP-49' ? 'DAP-49' : ''); deleteErrorMessage() }}>DAP-49 microperforada</div>
                        </div>
                    </div>
                </div>
            </form>

            <div className="form-group-cortinas">
                <p>ACLARACIONES O CONSULTAS ADICIONALES (opcional)</p>
                <textarea type="text"
                    id="aclaraciones"
                    value={aclaraciones}
                    onChange={(e) => { setAclaraciones(e.target.value); deleteErrorMessage() }}
                    className="campotextoAclaraciones"
                />
            </div>

            <div className="botonEnviarConsultaContainer">
                <button className="botonEnviarConsulta" onClick={() => auth.state.logueado ? enviarConsulta() : auth.setMostrarLogin(true)}>
                    Enviar consulta
                </button>
            </div>
        </div>
    );
}