import './persianaAluminio.css';
import { useCortinas } from '../../../../contextCortinas';

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
        descelectEspecificacionBarrio
    } = useCortinas();

    return (
        <div className="contenedorPrincipalPersianaAluminio">
            <form className="formularioPersianaAluminio">
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
                            onChange={(e) => {setAncho(e.target.value);
                                if (e.target.value < 750) {
                                  setConCajon(undefined);
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>ALTURA INDICADA</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${alturaIndicada == 'vano' ? 'checked' : ''}`} onClick={() => setAlturaIndicada(alturaIndicada !== 'vano' ? 'vano' : undefined)}>Vano</div>
                        <div className={`especificacionCortina ${alturaIndicada == 'abertura' ? 'checked' : ''}`} onClick={() => setAlturaIndicada(alturaIndicada !== 'abertura' ? 'abertura' : undefined)}>Abertura</div>
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>CON MECANISMO?</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoSi' ? 'checked' : ''}`} onClick={() => setConMecanismo(conMecanismo !== 'mecanismoSi' ? 'mecanismoSi' : undefined)}>Si</div>
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoNo' ? 'checked' : ''}`} onClick={() => { setConMecanismo(conMecanismo !== 'mecanismoNo' ? 'mecanismoNo' : undefined); descelectMecanismoYCajonPersianaAluminio() }}>No</div>
                    </div>
                </div>

                {conMecanismo == 'mecanismoSi' &&
                    (<>
                        <div className="form-group-cortinas">
                            <p>TIPO DE MECANISMO</p>
                            <div className="bodyFormGroupCortinas">
                                <div className={`especificacionCortina ${tipoMecanismo == 'manual' ? 'checked' : ''}`} onClick={() => { setTipoMecanismo(tipoMecanismo !== 'manual' ? 'manual' : undefined); descelectControlPersianaAluminio() }}>Manual</div>
                                <div className={`especificacionCortina ${tipoMecanismo == 'motor' ? 'checked' : ''}`} onClick={() => setTipoMecanismo(tipoMecanismo !== 'motor' ? 'motor' : undefined)}>Motor</div>
                            </div>
                        </div>

                        {tipoMecanismo == 'motor' &&
                            (<>
                                <div className="form-group-cortinas">
                                    <p>CON CONTROL?</p>
                                    <div className="bodyFormGroupCortinas">
                                        <div className={`especificacionCortina ${control == 'controlSi' ? 'checked' : ''}`} onClick={() => setControl(control !== 'controlSi' ? 'controlSi' : undefined)}>Si</div>
                                        <div className={`especificacionCortina ${control == 'controlNo' ? 'checked' : ''}`} onClick={() => { setControl(control !== 'controlNo' ? 'controlNo' : undefined); setTecla('teclaSi'); }}>No</div>
                                    </div>
                                </div>

                                <div className="form-group-cortinas">
                                    <p>CON TECLA?</p>
                                    <div className="bodyFormGroupCortinas">
                                        <div className={`especificacionCortina ${tecla == 'teclaSi' ? 'checked' : ''}`} onClick={() => setTecla(tecla !== 'teclaSi' ? 'teclaSi' : undefined)}>Si</div>
                                        <div className={`especificacionCortina ${tecla == 'teclaNo' ? 'checked' : ''} ${control == 'controlNo' ? 'disabled' : ''}`} onClick={() => setTecla((tecla !== 'teclaNo' && control != 'controlNo') ? 'teclaNo' : (tecla == 'teclaSi' ? 'teclaSi' : undefined))}>No</div>
                                    </div>
                                </div>
                            </>)
                        }

                        <div className="form-group-cortinas">
                            <p>CON CAJON? </p>
                            <div className="bodyFormGroupCortinas">
                                <div className={`especificacionCortina ${conCajon === 'cajonSi' ? 'checked' : ''} ${(!ancho || ancho < 750) ? 'disabled' : ''}`} onClick={() => setConCajon((conCajon !== 'cajonSi' && ancho >= 750) ? 'cajonSi' : undefined)}>Si</div>

                                <div className={`especificacionCortina ${conCajon == 'cajonNo' ? 'checked' : ''}`} onClick={() => { setConCajon(conCajon !== 'cajonNo' ? 'cajonNo' : undefined); descelectUbicacionCajonPersianaAluminio() }}>No</div>
                            </div>
                        </div>

                        {conCajon == 'cajonSi' &&
                            (<>
                                <div className="form-group-cortinas">
                                    <p>TIPO DE CAJON</p>
                                    <div className="bodyFormGroupCortinas">
                                        <div className={`especificacionCortina ${ubicacionCajon == 'compacto' ? 'checked' : ''}`} onClick={() => { setUbicacionCajon(ubicacionCajon !== 'compacto' ? 'compacto' : undefined); descelectUbicacionExteriorCajonPersianaAluminio() }}>Compacto</div>
                                        <div className={`especificacionCortina ${ubicacionCajon == 'exterior' ? 'checked' : ''}`} onClick={() => setUbicacionCajon(ubicacionCajon !== 'exterior' ? 'exterior' : undefined)}>Exterior</div>
                                    </div>
                                </div>

                                {ubicacionCajon == 'exterior' &&
                                    (<>
                                        <div className="form-group-cortinas">
                                            <p>UBICACIÓN DE CAJON</p>
                                            <div className="bodyFormGroupCortinas">
                                                <div className={`especificacionCortina ${ubicacionExteriorCajon == 'fuera' ? 'checked' : ''}`} onClick={() => setUbicacionExteriorCajon(ubicacionExteriorCajon !== 'fuera' ? 'fuera' : undefined)}>Fuera del vano</div>
                                                <div className={`especificacionCortina ${ubicacionExteriorCajon == 'dentro' ? 'checked' : ''}`} onClick={() => setUbicacionExteriorCajon(ubicacionExteriorCajon !== 'dentro' ? 'dentro' : undefined)}>Dentrol del vano</div>
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
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${tipoTablilla == 'barrioTubular' ? 'checked' : ''}`} onClick={() => setTipoTablilla(tipoTablilla !== 'barrioTubular' ? 'barrioTubular' : undefined)}>Barrio tubular</div>
                        <div className={`especificacionCortina ${tipoTablilla == 'barrioLiviana' ? 'checked' : ''}`} onClick={() => setTipoTablilla(tipoTablilla !== 'barrioLiviana' ? 'barrioLiviana' : undefined)}>Barrio liviana</div>
                        <div className={`especificacionCortina ${tipoTablilla == 'dap55' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'dap55' ? 'dap55' : undefined); descelectEspecificacionBarrio() }}>DAP-55 con felpa</div>
                        <div className={`especificacionCortina ${tipoTablilla == 'dap44' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'dap44' ? 'dap44' : undefined); descelectEspecificacionBarrio() }} disabled={tipoMecanismo !== 'motor'}>DAP-44</div>
                        <div className={`especificacionCortina ${tipoTablilla == 'dapAbk' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'dapAbk' ? 'dapAbk' : undefined); descelectEspecificacionBarrio(); }} disabled={tipoMecanismo !== 'motor'}>DAP-ABK autoblocante</div>
                    </div>
                </div>

                {(tipoTablilla == 'barrioTubular' || tipoTablilla == 'barrioLiviana') &&
                    (<>
                        <div className="form-group-cortinas">
                            <p>DIMENSIONES</p>
                            <div className="bodyFormGroupCortinas">
                                <div className={`especificacionCortina ${especificacionBarrio == 'tubular' ? 'checked' : ''}`} onClick={() => setEspecificacionBarrio(especificacionBarrio !== 'tubular' ? 'tubular' : undefined)}>Tubular</div>
                                <div className={`especificacionCortina ${especificacionBarrio == 'simpleConFelpa' ? 'checked' : ''}`} onClick={() => setEspecificacionBarrio(especificacionBarrio !== 'simpleConFelpa' ? 'simpleConFelpa' : undefined)}>Simple con felpa</div>
                                <div className={`especificacionCortina ${especificacionBarrio == 'simpleSinFelpa' ? 'checked' : ''}`} onClick={() => setEspecificacionBarrio(especificacionBarrio !== 'simpleSinFelpa' ? 'simpleSinFelpa' : undefined)}>Simple sin felpa</div>
                            </div>
                        </div>
                    </>)
                }
            </form>
            <div className="botonEnviarConsultaContainer">
                <button className="botonEnviarConsulta">
                    Enviar consulta
                </button>
            </div>
        </div>
    );
}