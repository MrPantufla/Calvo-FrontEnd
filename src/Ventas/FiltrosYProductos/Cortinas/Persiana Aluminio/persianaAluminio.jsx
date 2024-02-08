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

    const labels = document.querySelectorAll('.bodyFormGroupCortinas label');

    labels.forEach(label => {
        const inputId = label.getAttribute('for');
        const input = document.getElementById(inputId);

        if (input) {
            if (input.checked) {
                label.classList.add('checked');
            }
        }

        if (input) {
            input.addEventListener('change', function () {
                if (this.checked) {
                    labels.forEach(otherLabel => otherLabel.classList.remove('checked'));
                    label.classList.add('checked');
                } else {
                    label.classList.remove('checked');
                }
            });
        }
    });

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
                            onChange={(e) => setAncho(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>ALTURA INDICADA</p>
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
                            checked={conMecanismo == true}
                            onChange={() => setConMecanismo(true)}
                        />

                        <label htmlFor="mecanismoNo">No</label>
                        <input type="radio"
                            id="mecanismoNo"
                            name="radioMecanismo"
                            checked={conMecanismo == false}
                            onChange={() => { setConMecanismo(false); descelectMecanismoYCajonPersianaAluminio() }}
                        />
                    </div>
                </div>

                {conMecanismo &&
                    (<>
                        <div className="form-group-cortinas">
                            <p>TIPO DE MECANISMO</p>
                            <div className="bodyFormGroupCortinas">
                                <label htmlFor="manual">Manual</label>
                                <input type="radio"
                                    id="manual"
                                    name="radioTipoMecanismo"
                                    checked={tipoMecanismo == 'manual'}
                                    onChange={() => { setTipoMecanismo('manual'); descelectControlPersianaAluminio() }}
                                />

                                <label htmlFor="motor">Motor</label>
                                <input type="radio"
                                    id="motor"
                                    name="radioTipoMecanismo"
                                    checked={tipoMecanismo == 'motor'}
                                    onChange={() => setTipoMecanismo('motor')}
                                />
                            </div>
                        </div>

                        {tipoMecanismo == 'motor' &&
                            (<>
                                <div className="form-group-cortinas">
                                    <p>CON CONTROL?</p>
                                    <div className="bodyFormGroupCortinas">
                                        <label htmlFor="controlSi">Si</label>
                                        <input type="radio"
                                            id="controlSi"
                                            name="radioControl"
                                            checked={control == true}
                                            onChange={() => setControl(true)}
                                        />

                                        <label htmlFor="controlNo">No</label>
                                        <input type="radio"
                                            id="controlNo"
                                            name="radioControl"
                                            checked={control == false}
                                            onChange={() => { setControl(false); setTecla(true); }}
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
                                            checked={tecla == true}
                                            onChange={() => setTecla(true)}
                                        />

                                        <label htmlFor="teclaNo">No</label>
                                        <input type="radio"
                                            id="teclaNo"
                                            name="radioTecla"
                                            disabled={control == false}
                                            checked={tecla == false}
                                            onChange={() => setTecla(false)}
                                        />
                                    </div>
                                </div>
                            </>)
                        }

                        <div className="form-group-cortinas">
                            <p>CON CAJON?</p>
                            <div className="bodyFormGroupCortinas">
                                <label htmlFor="cajonSi">Si</label>
                                <input type="radio"
                                    id="cajonSi"
                                    name="radioCajon"
                                    checked={conCajon == true}
                                    disabled={ancho < 750 || ancho == undefined}
                                    onChange={() => setConCajon(true)}
                                />

                                <label htmlFor="cajonNo">No</label>
                                <input type="radio"
                                    id="cajonNo"
                                    name="radioCajon"
                                    checked={conCajon == false}
                                    onChange={() => { setConCajon(false); descelectUbicacionCajonPersianaAluminio() }}
                                />
                            </div>
                        </div>

                        {conCajon == true &&
                            (<>
                                <div className="form-group-cortinas">
                                    <p>TIPO DE CAJON</p>
                                    <div className="bodyFormGroupCortinas">
                                        <label htmlFor="compacto">Compacto</label>
                                        <input type="radio"
                                            id="compacto"
                                            name="radioUbicacionCajon"
                                            checked={ubicacionCajon == 'compacto'}
                                            onChange={() => { setUbicacionCajon('compacto'); descelectUbicacionExteriorCajonPersianaAluminio() }}
                                        />

                                        <label htmlFor="exterior">Exterior</label>
                                        <input type="radio"
                                            id="exterior"
                                            name="radioUbicacionCajon"
                                            checked={ubicacionCajon == 'exterior'}
                                            onChange={() => setUbicacionCajon('exterior')}
                                        />
                                    </div>
                                </div>

                                {ubicacionCajon == 'exterior' &&
                                    (<>
                                        <div className="form-group-cortinas">
                                            <p>UBICACIÓN DE CAJON</p>
                                            <div className="bodyFormGroupCortinas">
                                                <label htmlFor="fuera">Fuera del vano</label>
                                                <input type="radio"
                                                    id="fuera"
                                                    name="radioUbicacionExteriorCajon"
                                                    checked={ubicacionExteriorCajon == 'fuera'}
                                                    onChange={() => setUbicacionExteriorCajon('fuera')}
                                                />

                                                <label htmlFor="dentro">Dentrol del vano</label>
                                                <input type="radio"
                                                    id="dentro"
                                                    name="radioUbicacionExteriorCajon"
                                                    checked={ubicacionExteriorCajon == 'dentro'}
                                                    onChange={() => setUbicacionExteriorCajon('dentro')}
                                                />
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
                        <label htmlFor="barrioTubular">Barrio tubular</label>
                        <input type="radio"
                            id="barrioTubular"
                            name="radioTipoTablilla"
                            checked={tipoTablilla == 'barrioTubular'}
                            onChange={() => setTipoTablilla('barrioTubular')}
                        />

                        <label htmlFor="barrioLiviana">Barrio liviana</label>
                        <input type="radio"
                            id="barrioLiviana"
                            name="radioTipoTablilla"
                            checked={tipoTablilla == 'barrioLiviana'}
                            onChange={() => setTipoTablilla('barrioLiviana')}
                        />

                        <label htmlFor="dap55">DAP-55 con felpa</label>
                        <input type="radio"
                            id="dap55"
                            name="radioTipoTablilla"
                            checked={tipoTablilla == 'dap55'}
                            onChange={() => { setTipoTablilla('dap55'); descelectEspecificacionBarrio() }}
                        />

                        <label htmlFor="dap44">DAP-44</label>
                        <input type="radio"
                            id="dap44"
                            name="radioTipoTablilla"
                            checked={tipoTablilla == 'dap44'}
                            onChange={() => { setTipoTablilla('dap44'); descelectEspecificacionBarrio() }}
                            disabled={!tipoMecanismo == 'motor'}
                        />

                        <label htmlFor="dapAbk">DAP-ABK autoblocante</label>
                        <input type="radio"
                            id="dapAbk"
                            name="radioTipoTablilla"
                            checked={tipoTablilla == 'dapAbk'}
                            onChange={() => { setTipoTablilla('dapAbk'); descelectEspecificacionBarrio() }}
                            disabled={!tipoMecanismo == 'motor'}
                        />
                    </div>
                </div>

                {(tipoTablilla == 'barrioTubular' || tipoTablilla == 'barrioLiviana') &&
                    (<>
                        <div className="form-group-cortinas">
                            <p>DIMENSIONES</p>
                            <div className="bodyFormGroupCortinas">
                                <label htmlFor="tubular">Tubular</label>
                                <input type="radio"
                                    id="tubular"
                                    name="radioEspecificacionBarrio"
                                    checked={especificacionBarrio == 'tubular'}
                                    onChange={() => setEspecificacionBarrio('tubular')}
                                />

                                <label htmlFor="simpleConFelpa">Simple con felpa</label>
                                <input type="radio"
                                    id="simpleConFelpa"
                                    name="radioEspecificacionBarrio"
                                    checked={especificacionBarrio == 'simpleConFelpa'}
                                    onChange={() => setEspecificacionBarrio('simpleConFelpa')}
                                />

                                <label htmlFor="simpleSinFelpa">Simple sin felpa</label>
                                <input type="radio"
                                    id="simpleSinFelpa"
                                    name="radioEspecificacionBarrio"
                                    checked={especificacionBarrio == 'simpleSinFelpa'}
                                    onChange={() => setEspecificacionBarrio('simpleSinFelpa')}
                                />
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