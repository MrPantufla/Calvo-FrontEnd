import './persianaAluminio.css';
import { useCortinas } from '../../../../contextCortinas';
import { useEffect, useState } from 'react';

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
        errorMessage,
        setErrorMessage,
        deleteErrorMessage,
        enviarCortina
    } = useCortinas();

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
        const enterosRegex = /^[1-9]\d*$/;

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
        else if(conCajon == 'cajonSi' && tipoMecanismo == 'motor' && ancho < 750){
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
            //FETCH
            deleteErrorMessage();
        }
    }

    return (
        <div className="contenedorPrincipalPersianaAluminio">
            <div className="errorMessageContainer">
                <p className="errorFormulario">
                    {errorMessage !== '' && (<svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" fill="var(--colorRojo)" className="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                        <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>)}{errorMessage}
                </p>
            </div>
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
                                if (e.target.value < 750) {
                                    setConCajon(undefined);
                                };
                                ; deleteErrorMessage()
                            }}
                            className="campotextoEspecificacionCortina"
                        />
                        <div id="textoAncho" className="especificacionCortina milimetrosCortinas"><p>mm.</p></div>
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>ALTURA INDICADA</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${alturaIndicada == 'vano' ? 'checked' : ''}`} onClick={() => { setAlturaIndicada(alturaIndicada !== 'vano' ? 'vano' : undefined); deleteErrorMessage() }}>Vano</div>
                        <div className={`especificacionCortina ${alturaIndicada == 'abertura' ? 'checked' : ''}`} onClick={() => { setAlturaIndicada(alturaIndicada !== 'abertura' ? 'abertura' : undefined); deleteErrorMessage() }}>Abertura</div>
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>CON MECANISMO?</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoSi' ? 'checked' : ''}`} onClick={() => { setConMecanismo(conMecanismo !== 'mecanismoSi' ? 'mecanismoSi' : undefined); deleteErrorMessage() }}>Si</div>
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoNo' ? 'checked' : ''}`} onClick={() => { setConMecanismo(conMecanismo !== 'mecanismoNo' ? 'mecanismoNo' : undefined); descelectMecanismoYCajonPersianaAluminio(); deleteErrorMessage() }}>No</div>
                    </div>
                </div>

                {conMecanismo == 'mecanismoSi' &&
                    (<>
                        <div className="form-group-cortinas">
                            <p>TIPO DE MECANISMO</p>
                            <div className="bodyFormGroupCortinas">
                                <div className={`especificacionCortina ${tipoMecanismo == 'manual' ? 'checked' : ''}`} onClick={() => { setTipoMecanismo(tipoMecanismo !== 'manual' ? 'manual' : undefined); descelectControlPersianaAluminio(); deleteErrorMessage() }}>Manual</div>
                                <div className={`especificacionCortina ${tipoMecanismo == 'motor' ? 'checked' : ''}`} onClick={() => { setTipoMecanismo(tipoMecanismo !== 'motor' ? 'motor' : undefined); deleteErrorMessage() }}>Motor</div>
                            </div>
                        </div>

                        {tipoMecanismo == 'motor' &&
                            (<>
                                <div className="form-group-cortinas">
                                    <p>CON CONTROL?</p>
                                    <div className="bodyFormGroupCortinas">
                                        <div className={`especificacionCortina ${control == 'controlSi' ? 'checked' : ''}`} onClick={() => { setControl(control !== 'controlSi' ? 'controlSi' : undefined); deleteErrorMessage() }}>Si</div>
                                        <div className={`especificacionCortina ${control == 'controlNo' ? 'checked' : ''}`} onClick={() => { setControl(control !== 'controlNo' ? 'controlNo' : undefined); (tecla === 'teclaNo' && control !== 'controlNo') && (setTecla(undefined)); deleteErrorMessage() }}>No</div>
                                    </div>
                                </div>

                                <div className="form-group-cortinas">
                                    <p>CON TECLA?</p>
                                    <div className="bodyFormGroupCortinas">
                                        <div className={`especificacionCortina ${tecla == 'teclaSi' ? 'checked' : ''}`} onClick={() => { setTecla(tecla !== 'teclaSi' ? 'teclaSi' : undefined); deleteErrorMessage() }}>Si</div>
                                        <div className={`especificacionCortina ${tecla == 'teclaNo' ? 'checked' : ''} ${control == 'controlNo' ? 'disabled' : ''}`} onClick={() => { setTecla((tecla !== 'teclaNo' && control != 'controlNo') ? 'teclaNo' : (tecla == 'teclaSi' ? 'teclaSi' : undefined)); deleteErrorMessage() }}>No</div>
                                    </div>
                                </div>
                            </>)
                        }

                        <div className="form-group-cortinas">
                            <p>CON CAJON? </p>
                            <div className="bodyFormGroupCortinas">
                                <div className={`especificacionCortina ${conCajon === 'cajonSi' ? 'checked' : ''}`} onClick={() => { setConCajon((conCajon !== 'cajonSi') ? 'cajonSi' : undefined); deleteErrorMessage() }}>Si</div>

                                <div className={`especificacionCortina ${conCajon == 'cajonNo' ? 'checked' : ''}`} onClick={() => { setConCajon(conCajon !== 'cajonNo' ? 'cajonNo' : undefined); descelectUbicacionCajonPersianaAluminio(); deleteErrorMessage() }}>No</div>
                            </div>
                        </div>

                        {conCajon == 'cajonSi' &&
                            (<>
                                <div className="form-group-cortinas">
                                    <p>TIPO DE CAJON</p>
                                    <div className="bodyFormGroupCortinas">
                                        <div className={`especificacionCortina ${ubicacionCajon == 'compacto' ? 'checked' : ''}`} onClick={() => { setUbicacionCajon(ubicacionCajon !== 'compacto' ? 'compacto' : undefined); descelectUbicacionExteriorCajonPersianaAluminio(); deleteErrorMessage() }}>Compacto</div>
                                        <div className={`especificacionCortina ${ubicacionCajon == 'exterior' ? 'checked' : ''}`} onClick={() => { setUbicacionCajon(ubicacionCajon !== 'exterior' ? 'exterior' : undefined); deleteErrorMessage() }}>Exterior</div>
                                    </div>
                                </div>

                                {ubicacionCajon == 'exterior' &&
                                    (<>
                                        <div className="form-group-cortinas">
                                            <p>UBICACIÓN DE CAJON</p>
                                            <div className="bodyFormGroupCortinas">
                                                <div className={`especificacionCortina ${ubicacionExteriorCajon == 'fuera' ? 'checked' : ''}`} onClick={() => { setUbicacionExteriorCajon(ubicacionExteriorCajon !== 'fuera' ? 'fuera' : undefined); deleteErrorMessage() }}>Fuera del vano</div>
                                                <div className={`especificacionCortina ${ubicacionExteriorCajon == 'dentro' ? 'checked' : ''}`} onClick={() => { setUbicacionExteriorCajon(ubicacionExteriorCajon !== 'dentro' ? 'dentro' : undefined); deleteErrorMessage() }}>Dentrol del vano</div>
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
                            <div className={`especificacionCortina ${tipoTablilla == 'barrioTubular' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'barrioTubular' ? 'barrioTubular' : undefined); deleteErrorMessage() }}>Barrio tubular</div>
                            <div className={`especificacionCortina ${tipoTablilla == 'barrioLiviana' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'barrioLiviana' ? 'barrioLiviana' : undefined); deleteErrorMessage() }}>Barrio liviana</div>
                        </div>
                        <div className="tablillasDap">
                            <div className={`especificacionCortina ${tipoTablilla == 'dap55' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'dap55' ? 'dap55' : undefined); descelectEspecificacionBarrio(); deleteErrorMessage() }}>DAP-55 con felpa</div>
                            <div className={`especificacionCortina ${tipoTablilla == 'dap44' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'dap44' ? 'dap44' : undefined); descelectEspecificacionBarrio(); deleteErrorMessage() }} disabled={tipoMecanismo !== 'motor'}>DAP-44</div>
                            <div className={`especificacionCortina ${tipoTablilla == 'dapAbk' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'dapAbk' ? 'dapAbk' : undefined); descelectEspecificacionBarrio();; deleteErrorMessage() }} disabled={tipoMecanismo !== 'motor'}>DAP-ABK autoblocante</div>
                        </div>
                    </div>
                </div>

                {(tipoTablilla == 'barrioTubular' || tipoTablilla == 'barrioLiviana') &&
                    (<>
                        <div className="form-group-cortinas">
                            <p>TIPO DE TABLILLA BARRIO</p>
                            <div className="bodyFormGroupCortinas">
                                <div className={`especificacionCortina ${especificacionBarrio == 'tubular' ? 'checked' : ''}`} onClick={() => { setEspecificacionBarrio(especificacionBarrio !== 'tubular' ? 'tubular' : undefined); deleteErrorMessage() }}>Tubular</div>
                                <div className={`especificacionCortina ${especificacionBarrio == 'simpleConFelpa' ? 'checked' : ''}`} onClick={() => { setEspecificacionBarrio(especificacionBarrio !== 'simpleConFelpa' ? 'simpleConFelpa' : undefined); deleteErrorMessage() }}>Simple con felpa</div>
                                <div className={`especificacionCortina ${especificacionBarrio == 'simpleSinFelpa' ? 'checked' : ''}`} onClick={() => { setEspecificacionBarrio(especificacionBarrio !== 'simpleSinFelpa' ? 'simpleSinFelpa' : undefined); deleteErrorMessage() }}>Simple sin felpa</div>
                            </div>
                        </div>
                    </>)
                }
            </form>
            <div className="botonEnviarConsultaContainer">
                <button className="botonEnviarConsulta" onClick={enviarConsulta}>
                    Enviar consulta
                </button>
            </div>
        </div>
    );
}