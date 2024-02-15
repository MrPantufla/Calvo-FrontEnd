import './persianaAluminio.css';
import { useCortinas } from '../../../../contextCortinas';
import { useEffect } from 'react';
import { useAuth } from '../../../../contextLogin.jsx';

export default function PersianaAluminio() {

    const {
        alto,
        setAlto,
        ancho,
        setAncho,
        conMecanismo,
        setConMecanismo,
        alturaIndicada,
        setAlturaIndicada,
        conCajon,
        setConCajon,
        ubicacionCajon,
        setUbicacionCajon,
        ubicacionExteriorCajon,
        setUbicacionExteriorCajon,
        tipoMecanismo,
        setTipoMecanismo,
        control,
        setControl,
        tecla,
        setTecla,
        tipoTablilla,
        setTipoTablilla,
        especificacionBarrio,
        setEspecificacionBarrio,
        descelectMecanismoYCajonPersianaAluminio,
        descelectControlPersianaAluminio,
        descelectUbicacionCajonPersianaAluminio,
        descelectUbicacionExteriorCajonPersianaAluminio,
        descelectEspecificacionBarrio,
        setErrorMessage,
        deleteErrorMessage,
        enviarCortina,
        aclaraciones,
        setAclaraciones
    } = useCortinas();

    const {
        state,
        setMostrarLogin
    } = useAuth();

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

        if (!alto || !ancho || !conMecanismo || !alturaIndicada || !tipoTablilla) {
            setErrorMessage("Por favor, completa todos los campos obligatorios");
            window.scrollTo(0, 0);
        }
        else if (!enterosRegex.test(alto) || !enterosRegex.test(ancho)) {
            setErrorMessage("Los campos de dimensiones solo aceptan números enteros");
            window.scrollTo(0, 0);
        }
        else if (conMecanismo == 'mecanismoSi' && (!tipoMecanismo || !conCajon)) {
            setErrorMessage("Por favor, completa todos los campos obligatorios");
            window.scrollTo(0, 0);
        }
        else if (tipoMecanismo == 'motor' && (!control || !tecla)) {
            setErrorMessage("Por favor, completa todos los campos obligatorios");
            window.scrollTo(0, 0);
        }
        else if (conCajon == 'cajonSi' && tipoMecanismo == 'motor' && ancho < 750) {
            setErrorMessage("El ancho mínimo para cajones con motor es de 750mm");
            window.scrollTo(0, 0);
        }
        else if (conCajon == 'cajonSi' && !ubicacionCajon) {
            setErrorMessage("Por favor, completa todos los campos obligatorios");
            window.scrollTo(0, 0);
        }
        else if (ubicacionCajon == 'exterior' && !ubicacionExteriorCajon) {
            setErrorMessage("Por favor, completa todos los campos obligatorios");
            window.scrollTo(0, 0);
        }
        else if ((tipoTablilla == 'barrioTubular' || tipoTablilla == 'barrioLiviana') && !especificacionBarrio) {
            setErrorMessage("Por favor, completa todos los campos obligatorios");
            window.scrollTo(0, 0);
        }
        else {
            deleteErrorMessage();

            const textoCortina =
                "TIPO: PERSIANA ALUMINIO\n" +
                "ALTO: " + alto + "mm\n" +
                "ANCHO: " + ancho + "mm\n" +
                "ALTURA INDICADA: " + alturaIndicada + "\n" +
                (conMecanismo == "mecanismoNo" ?
                    "MECANISMO: Sin mecanismo, solo cortina\n" :
                    ("TIPO DE MECANISMO: " + tipoMecanismo + "\n" +
                        (tipoMecanismo === "motor" ?
                            ("CONTROL: " + (control == "controlSi" ? "Si" : "No") + "\n" +
                                "TECLA: " + (tecla == 'teclaSi' ? "Si" : "No") + "\n") :
                            ""
                        )
                    )
                ) +
                "CAJON: " + (conCajon == "cajonSi" ?
                    ("Si\n" +
                        "TIPO DE CAJON: " + ubicacionCajon + "\n" +
                        (ubicacionCajon === 'exterior' ?
                            ("UBICACION EXTERIOR: " + ubicacionExteriorCajon + "\n") :
                            ""
                        )
                    ) :
                    "No\n"
                ) +
                "TIPO DE TABLILLA: " + tipoTablilla +
                (tipoTablilla == 'barrioTubular' || tipoTablilla == 'barrioLiviana' ?
                    "\nTIPO DE TABLILLA BARRIO: " + especificacionBarrio :
                    ""
                );


            enviarCortina(textoCortina);
        }
    }

    return (
        <div className="contenedorPrincipalPersianaAluminio">
            <form className="formularioPersianaAluminio">
                <div className="form-group-cortinas">
                    <p>DIMENSIONES</p>
                    <div className="bodyFormGroupCortinas">
                        <label className="especificacionCortina textoEspecificacionCortina" htmlFor="alto">Alto</label>
                        <input type="text"
                            id="alto"
                            value={alto}
                            onChange={(e) => { setAlto(e.target.value); setErrorMessage(''); deleteErrorMessage() }}
                            className="campotextoEspecificacionCortina"
                        />
                        <div id="textoAlto" className="especificacionCortina milimetrosCortinas"><p>mm.</p></div>

                        <label className="especificacionCortina textoEspecificacionCortina" htmlFor="ancho">Ancho</label>
                        <input type="text"
                            id="ancho"
                            value={ancho}
                            onChange={(e) => {
                                setAncho(e.target.value);
                                deleteErrorMessage()
                            }}
                            className="campotextoEspecificacionCortina"
                        />
                        <div id="textoAncho" className="especificacionCortina milimetrosCortinas"><p>mm.</p></div>
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>ALTURA INDICADA</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${alturaIndicada == 'vano' ? 'checked' : ''}`} onClick={() => { setAlturaIndicada(alturaIndicada !== 'vano' ? 'vano' : ''); deleteErrorMessage() }}>Vano</div>
                        <div className={`especificacionCortina ${alturaIndicada == 'abertura' ? 'checked' : ''}`} onClick={() => { setAlturaIndicada(alturaIndicada !== 'abertura' ? 'abertura' : ''); deleteErrorMessage() }}>Abertura</div>
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>CON MECANISMO?</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoSi' ? 'checked' : ''}`} onClick={() => { setConMecanismo(conMecanismo !== 'mecanismoSi' ? 'mecanismoSi' : ''); deleteErrorMessage() }}>Si</div>
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoNo' ? 'checked' : ''}`} onClick={() => { setConMecanismo(conMecanismo !== 'mecanismoNo' ? 'mecanismoNo' : ''); descelectMecanismoYCajonPersianaAluminio(); deleteErrorMessage() }}>No</div>
                    </div>
                </div>

                {conMecanismo == 'mecanismoSi' &&
                    (<>
                        <div className="form-group-cortinas">
                            <p>TIPO DE MECANISMO</p>
                            <div className="bodyFormGroupCortinas">
                                <div className={`especificacionCortina ${tipoMecanismo == 'manual' ? 'checked' : ''}`} onClick={() => { setTipoMecanismo(tipoMecanismo !== 'manual' ? 'manual' : ''); descelectControlPersianaAluminio(); deleteErrorMessage() }}>Manual</div>
                                <div className={`especificacionCortina ${tipoMecanismo == 'motor' ? 'checked' : ''}`} onClick={() => { setTipoMecanismo(tipoMecanismo !== 'motor' ? 'motor' : ''); deleteErrorMessage() }}>Motor</div>
                            </div>
                        </div>

                        {tipoMecanismo == 'motor' &&
                            (<>
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
                            </>)
                        }

                        <div className="form-group-cortinas">
                            <p>CON CAJON? </p>
                            <div className="bodyFormGroupCortinas">
                                <div className={`especificacionCortina ${conCajon === 'cajonSi' ? 'checked' : ''}`} onClick={() => { setConCajon((conCajon !== 'cajonSi') ? 'cajonSi' : ''); deleteErrorMessage() }}>Si</div>

                                <div className={`especificacionCortina ${conCajon == 'cajonNo' ? 'checked' : ''}`} onClick={() => { setConCajon(conCajon !== 'cajonNo' ? 'cajonNo' : ''); descelectUbicacionCajonPersianaAluminio(); deleteErrorMessage() }}>No</div>
                            </div>
                        </div>

                        {conCajon == 'cajonSi' &&
                            (<>
                                <div className="form-group-cortinas">
                                    <p>TIPO DE CAJON</p>
                                    <div className="bodyFormGroupCortinas">
                                        <div className={`especificacionCortina ${ubicacionCajon == 'compacto' ? 'checked' : ''}`} onClick={() => { setUbicacionCajon(ubicacionCajon !== 'compacto' ? 'compacto' : ''); descelectUbicacionExteriorCajonPersianaAluminio(); deleteErrorMessage() }}>Compacto</div>
                                        <div className={`especificacionCortina ${ubicacionCajon == 'exterior' ? 'checked' : ''}`} onClick={() => { setUbicacionCajon(ubicacionCajon !== 'exterior' ? 'exterior' : ''); deleteErrorMessage() }}>Exterior</div>
                                    </div>
                                </div>

                                {ubicacionCajon == 'exterior' &&
                                    (<>
                                        <div className="form-group-cortinas">
                                            <p>UBICACIÓN DE CAJON</p>
                                            <div className="bodyFormGroupCortinas">
                                                <div className={`especificacionCortina ${ubicacionExteriorCajon == 'fuera' ? 'checked' : ''}`} onClick={() => { setUbicacionExteriorCajon(ubicacionExteriorCajon !== 'fuera' ? 'fuera' : ''); deleteErrorMessage() }}>Fuera del vano</div>
                                                <div className={`especificacionCortina ${ubicacionExteriorCajon == 'dentro' ? 'checked' : ''}`} onClick={() => { setUbicacionExteriorCajon(ubicacionExteriorCajon !== 'dentro' ? 'dentro' : ''); deleteErrorMessage() }}>Dentrol del vano</div>
                                            </div>
                                        </div>
                                    </>)
                                }
                            </>)
                        }
                    </>)
                }
                <div className="form-group-cortinas">
                    <p>TIPO DE TABLILLA</p>
                    <div className="bodyFormGroupCortinas divTablillas">
                        <div className="tablillasBarrio">
                            <div className={`especificacionCortina ${tipoTablilla == 'barrioTubular' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'barrioTubular' ? 'barrioTubular' : ''); deleteErrorMessage() }}>Barrio tubular</div>
                            <div className={`especificacionCortina ${tipoTablilla == 'barrioLiviana' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'barrioLiviana' ? 'barrioLiviana' : ''); deleteErrorMessage() }}>Barrio liviana</div>
                        </div>
                        <div className="tablillasDap">
                            <div className={`especificacionCortina ${tipoTablilla == 'DAP-55conFelpa' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'DAP-55conFelpa' ? 'DAP-55conFelpa' : ''); descelectEspecificacionBarrio(); deleteErrorMessage() }}>DAP-55 con felpa</div>
                            <div className={`especificacionCortina ${tipoTablilla == 'DAP-44' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'DAP-44' ? 'DAP-44' : ''); descelectEspecificacionBarrio(); deleteErrorMessage() }} disabled={tipoMecanismo !== 'motor'}>DAP-44</div>
                        </div>
                        <div className="autoblocante">
                            <div className={`especificacionCortina ${tipoTablilla == 'DAP-ABKautoblocante' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'DAP-ABKautoblocante' ? 'DAP-ABKautoblocante' : ''); descelectEspecificacionBarrio();; deleteErrorMessage() }} disabled={tipoMecanismo !== 'motor'}>DAP-ABK autoblocante</div>
                        </div>
                    </div>
                </div>

                {(tipoTablilla == 'barrioTubular' || tipoTablilla == 'barrioLiviana') &&
                    (<>
                        <div className="form-group-cortinas">
                            <p>TIPO DE TABLILLA BARRIO</p>
                            <div className="bodyFormGroupCortinas">
                                <div className={`especificacionCortina ${especificacionBarrio == 'tubular' ? 'checked' : ''}`} onClick={() => { setEspecificacionBarrio(especificacionBarrio !== 'tubular' ? 'tubular' : ''); deleteErrorMessage() }}>Tubular</div>
                                <div className={`especificacionCortina ${especificacionBarrio == 'simpleConFelpa' ? 'checked' : ''}`} onClick={() => { setEspecificacionBarrio(especificacionBarrio !== 'simpleConFelpa' ? 'simpleConFelpa' : ''); deleteErrorMessage() }}>Simple con felpa</div>
                                <div className={`especificacionCortina ${especificacionBarrio == 'simpleSinFelpa' ? 'checked' : ''}`} onClick={() => { setEspecificacionBarrio(especificacionBarrio !== 'simpleSinFelpa' ? 'simpleSinFelpa' : ''); deleteErrorMessage() }}>Simple sin felpa</div>
                            </div>
                        </div>
                    </>)
                }
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
                <button className="botonEnviarConsulta" onClick={() => state.logueado ? enviarConsulta() : setMostrarLogin(true)}>
                    Enviar consulta
                </button>
            </div>
        </div>
    );
}