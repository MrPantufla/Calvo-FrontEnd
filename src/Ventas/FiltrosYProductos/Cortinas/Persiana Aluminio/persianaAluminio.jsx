import './persianaAluminio.css';
import { useCortinas } from '../../../../contextCortinas';
import { useEffect } from 'react';
import { useAuth } from '../../../../contextLogin.jsx';

export default function PersianaAluminio() {

    const {
        tipoTablilla,
        alto,
        ancho,
        medidaIndicada,
        profundidadGuia,
        formato,
        cajon,
        tipoCajon,
        setTipoCajon,
        anchoCajon,
        altoCajon,
        profundidadCajon,
        medidaIndicadaCajon,
        ubicacionCajon,
        mecanismo,
        tipoAccionador,
        ladoMecanismo,
        aclaraciones,

        setAlto,
        setAncho,
        setFormato,
        setMedidaIndicada,
        setProfundidadGuia,
        setMecanismo,
        setTipoAccionador,
        setTipoTablilla,
        setErrorMessage,
        setCajon,
        setAnchoCajon,
        setAltoCajon,
        setProfundidadCajon,
        setMedidaIndicadaCajon,
        setUbicacionCajon,
        setLadoMecanismo,
        setAclaraciones,

        limpiarTipoAccionador,
        limpiarPersianaAluminio,
        formularioEnviado,
        limpiarMecanismoPersianaAluminio,
        limpiarTipoCajon,
        limpiarCajon,
        deleteErrorMessage,
        enviarCortina,
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

        if (tipoTablilla == '' || alto == '' || ancho == '' || formato == '' || medidaIndicada == '' || profundidadGuia == '' || formato == '' || (formato == 'completo' && (mecanismo == '' || (mecanismo != '' && tipoAccionador == '')))) {
            setErrorMessage("Por favor, completa todos los campos obligatorios");
            window.scrollTo(0, 0);
        }
        else if (!enterosRegex.test(alto) || !enterosRegex.test(ancho) || !enterosRegex.test(profundidadGuia)) {
            setErrorMessage("Los campos de dimensiones solo aceptan números enteros");
            window.scrollTo(0, 0);
        }
        else if (tipoTablilla == 'barrioTubular' && (ancho > 3200 || alto > 2200)) {
            setErrorMessage("Las medidas máximas para tablillas Barrio Tubular son de 3200x2200mm")
        }
        else if (tipoTablilla == 'barrioLiviana' && (ancho > 2500 || alto > 2200)) {
            setErrorMessage("Las medidas máximas para tablillas Barrio Liviana son de 2500x2200mm");
        }
        else {
            deleteErrorMessage();

            const textoCortina =
                "Tipo: PERSIANA ALUMINIO\n" +
                "Tipo de tablilla: " + (tipoTablilla == 'barrioTubular' ? ('BARRIO TUBULAR') : (tipoTablilla == 'barrioLiviana' ? ('BARRIO LIVINA CON FELPA') : (tipoTablilla.toUpperCase()))) + "\n" +
                "Ancho: " + ancho + "mm\n" +
                "Alto: " + alto + "mm\n" +
                "Referencia de medida: " + (medidaIndicada == 'ras' ? 'RAS DE GUÍA' : 'FONDO DE GUÍA') + "\n" +
                "Profundidad de guía: " + profundidadGuia + "mm.\n" +
                "Formato: " + formato.toUpperCase() + "\n" +
                (formato == 'completo' ?
                    ('Con cajón: ' + cajon.slice(5).toUpperCase() + "\n" +
                        (cajon == 'cajonSi' ?
                            ('Tipo de cajón: ' + tipoCajon.toUpperCase() + "\n") +
                            (tipoCajon == 'exterior' ? ('Ubicación cajón exterior: ' + ubicacionCajon.toUpperCase() + " DEL VANO\n") : (''))
                            :
                            (''))
                    )
                    :
                    ('')) +
                'Tipo de mecanismo: ' + mecanismo.toUpperCase() + "\n" +
                'Accionador: ' + (tipoAccionador == 'elevaManivela' ? 'ELEVA MANIVELA' : (tipoAccionador == 'controlRemoto' ? ('CONTROL REMOTO') : (tipoAccionador.toUpperCase()))) + "\n" +

                'Lado del mecanismo: ' + ladoMecanismo.toUpperCase() + "\n" +
                (aclaraciones !== '' ? ("\nAclaraciones: " + aclaraciones) : (""));

            enviarCortina(textoCortina);
            limpiarPersianaAluminio();
        }
    }

    return (
        <div className="contenedorPrincipalPersianaAluminio">
            <div className="form-group-cortinas">
                <p>TIPO DE TABLILLA</p>
                <div className="bodyFormGroupCortinas divTablillas">
                    <div className="tablillasArriba">
                        <button className={`especificacionCortina ${tipoTablilla == 'DAP-ABK' && 'checked'}`} onClick={() => { setTipoTablilla('DAP-ABK'); setMecanismo('motor'); deleteErrorMessage() }}>DAP-ABK autoblocante</button>
                        <button className={`especificacionCortina ${tipoTablilla == 'DAP-44' && 'checked'}`} onClick={() => { setTipoTablilla('DAP-44'); setMecanismo('motor'); deleteErrorMessage() }}>DAP-44</button>
                        <button className={`especificacionCortina ${tipoTablilla == 'DAP-45' && 'checked'}`} onClick={() => { setTipoTablilla('DAP-45'); deleteErrorMessage() }}>DAP-45</button >
                    </div>
                    <div className="tablillasMedio">
                        <button className={`especificacionCortina ${tipoTablilla == 'DAP-49' && 'checked'}`} onClick={() => { setTipoTablilla('DAP-49'); setMecanismo('motor'); deleteErrorMessage() }}>DAP-49 microperforada</button>
                        <button className={`especificacionCortina ${tipoTablilla == 'DAP-55' && 'checked'}`} onClick={() => { setTipoTablilla('DAP-55'); setCajon('cajonNo'); limpiarCajon(); deleteErrorMessage() }}>DAP-55 con felpa</button>
                    </div>
                    <div className="tablillasAbajo">
                        <button className={`especificacionCortina ${tipoTablilla == 'barrioTubular' && 'checked'}`} onClick={() => { setTipoTablilla('barrioTubular'); setCajon('cajonNo'); limpiarCajon(); deleteErrorMessage() }}>Barrio tubular</button>
                        <button className={`especificacionCortina ${tipoTablilla == 'barrioLiviana' && 'checked'}`} onClick={() => { setTipoTablilla('barrioLiviana'); setCajon('cajonNo'); limpiarCajon(); deleteErrorMessage() }}>Barrio liviana con felpa</button >

                    </div>
                </div>
            </div>
            <div className="form-group-cortinas">
                <p>DIMENSIONES</p>
                <div className="bodyFormGroupCortinas">
                    <label className={`especificacionCortina textoEspecificacionCortina ${ancho != '' && 'conValue'}`} htmlFor="ancho">Ancho</label>
                    <input type="number"
                        id="ancho"
                        value={ancho}
                        onChange={(e) => { setAncho(e.target.value); deleteErrorMessage() }}
                        className={`campotextoEspecificacionCortina ${ancho != '' && 'conValue'}`}
                        autoComplete='off'
                    />
                    <div id="textoAncho" className={`especificacionCortina milimetrosCortinas ${ancho != '' && 'conValue'}`}><p>mm.</p></div>

                    <label className={`especificacionCortina textoEspecificacionCortina ${alto != '' && 'conValue'}`} htmlFor="alto">Alto</label>
                    <input type="number"
                        id="alto"
                        value={alto}
                        onChange={(e) => { setAlto(e.target.value); deleteErrorMessage() }}
                        className={`campotextoEspecificacionCortina ${alto != '' && 'conValue'}`}
                        autoComplete='off'
                    />
                    <div id="textoAlto" className={`especificacionCortina milimetrosCortinas ${alto != '' && 'conValue'}`}><p>mm.</p></div>
                </div>
            </div>

            <div className="form-group-cortinas">
                <p>{`REFERENCIA DE MEDIDA (desde donde se tomó)`}</p>
                <div className="bodyFormGroupCortinas">
                    <button className={`especificacionCortina ${medidaIndicada == 'ras' && 'checked'}`} onClick={() => { setMedidaIndicada('ras'); deleteErrorMessage() }}>Ras de guía</button>
                    <button className={`especificacionCortina ${medidaIndicada == 'fondo' && 'checked'}`} onClick={() => { setMedidaIndicada('fondo'); deleteErrorMessage() }}>Fondo de guía</button>
                </div>
            </div>

            <div className="form-group-cortinas">
                <p>INDICAR PROFUNDIDAD DE GUÍA</p>
                <div className="bodyFormGroupCortinas">
                    <label className={`especificacionCortina textoEspecificacionCortina ${profundidadGuia != '' && 'conValue'}`} htmlFor="profundidadGuia">Profundidad de guía</label>
                    <input type="number"
                        id="profundidadGuia"
                        value={profundidadGuia}
                        onChange={(e) => { setProfundidadGuia(e.target.value); deleteErrorMessage() }}
                        className={`campotextoEspecificacionCortina ${profundidadGuia != '' && 'conValue'}`}
                        autoComplete='off'
                    />
                    <div id="textoAlto" className={`especificacionCortina milimetrosCortinas ${profundidadGuia != '' && 'conValue'}`}><p>mm.</p></div>
                </div>
            </div>

            <div className="form-group-cortinas">
                <p>FORMATO</p>
                <div className="bodyFormGroupCortinas">
                    <button className={`especificacionCortina ${formato == 'completo' && 'checked'}`} onClick={() => { setFormato('completo'); deleteErrorMessage() }}>Completo</button>
                    <button className={`especificacionCortina ${formato == 'pañoSolo' && 'checked'}`} onClick={() => { setFormato('pañoSolo'); limpiarMecanismoPersianaAluminio(); deleteErrorMessage() }}>Paño solo</button>
                </div>
            </div>

            {formato == 'completo' &&
                <>
                    {
                        <div className="form-group-cortinas">
                            <p>CON CAJON (Depende del tipo de tablillas)</p>
                            <div className="bodyFormGroupCortinas">
                                <button className={`especificacionCortina ${cajon == 'cajonSi' && 'checked'} ${(tipoTablilla != 'DAP-ABK' && tipoTablilla != 'DAP-44' && tipoTablilla != 'DAP-45' && tipoTablilla != 'DAP-49') && 'especificacionCortinaDisabled'}`} onClick={() => { setCajon('cajonSi'); deleteErrorMessage() }} disabled={!(tipoTablilla == 'DAP-ABK' || tipoTablilla == 'DAP-44' || tipoTablilla == 'DAP-45' || tipoTablilla == 'DAP-49')}>Si</button>
                                <button className={`especificacionCortina ${cajon == 'cajonNo' && 'checked'}`} onClick={() => { setCajon('cajonNo'); limpiarCajon(); deleteErrorMessage(); console.log(cajon) }}>No</button>
                            </div>
                        </div>
                    }

                    {cajon == 'cajonSi' &&
                        <>
                            <div className="form-group-cortinas">
                                <p>TIPO DE CAJON</p>
                                <div className="bodyFormGroupCortinas">
                                    <button className={`especificacionCortina ${tipoCajon == 'compacto' && 'checked'}`} onClick={() => { setTipoCajon('compacto'); limpiarTipoCajon(); deleteErrorMessage() }}>Compacto</button>
                                    <button className={`especificacionCortina ${tipoCajon == 'exterior' && 'checked'}`} onClick={() => { setTipoCajon('exterior'); limpiarTipoCajon(); deleteErrorMessage() }}>Exterior</button>
                                </div>
                            </div>


                            {tipoCajon == 'compacto' &&
                                <>
                                    {/*<div className="form-group-cortinas">
                                        <p>DIMENSIONES PARA CAJON COMPACTO</p>
                                        <div className="bodyFormGroupCortinas">
                                            <label className={`especificacionCortina textoEspecificacionCortina ${anchoCajon != '' && 'conValue'}`} htmlFor="anchoCajon">Ancho</label>
                                            <input type="number"
                                                id="anchoCajon"
                                                value={anchoCajon}
                                                onChange={(e) => { setAnchoCajon(e.target.value); deleteErrorMessage() }}
                                                className={`campotextoEspecificacionCortina ${anchoCajon != '' && 'conValue'}`}
                                                autoComplete='off'
                                            />
                                            <div id="textoAnchoCajon" className={`especificacionCortina milimetrosCortinas ${anchoCajon != '' && 'conValue'}`}><p>mm.</p></div>
                                        </div>
                                    </div>

                                    <div className="form-group-cortinas">
                                        <p>REFERENCIA DE MEDIDA</p>
                                        <div className="bodyFormGroupCortinas">
                                            <button className={`especificacionCortina ${medidaIndicadaCajon == 'ras' && 'checked'}`} onClick={() => { setMedidaIndicadaCajon('ras'); deleteErrorMessage() }}>Ras de guía</button>
                                            <button className={`especificacionCortina ${medidaIndicadaCajon == 'fondo' && 'checked'}`} onClick={() => { setMedidaIndicadaCajon('fondo'); deleteErrorMessage() }}>Fondo de guía</button>
                                        </div>
                                    </div>*/}
                                </>
                            }

                            {tipoCajon == 'exterior' &&
                                <>
                                    {/*<div className="form-group-cortinas">
                                        <p>DIMENSIONES PARA CAJON EXTERIOR</p>
                                        <div className="bodyFormGroupCortinas dimensionesArriba">
                                            <label className={`especificacionCortina textoEspecificacionCortina ${anchoCajon != '' && 'conValue'}`} htmlFor="anchoCajon">Ancho</label>
                                            <input type="number"
                                                id="anchoCajon"
                                                value={anchoCajon}
                                                onChange={(e) => { setAnchoCajon(e.target.value); deleteErrorMessage() }}
                                                className={`campotextoEspecificacionCortina ${anchoCajon != '' && 'conValue'}`}
                                                autoComplete='off'
                                            />
                                            <div id="textoAnchoCajon" className={`especificacionCortina milimetrosCortinas ${anchoCajon != '' && 'conValue'}`}><p>mm.</p></div>

                                            <label className={`especificacionCortina textoEspecificacionCortina ${altoCajon != '' && 'conValue'}`} htmlFor="altoCajon">Alto</label>
                                            <input type="number"
                                                id="altoCajon"
                                                value={altoCajon}
                                                onChange={(e) => { setAltoCajon(e.target.value); deleteErrorMessage() }}
                                                className={`campotextoEspecificacionCortina ${altoCajon != '' && 'conValue'}`}
                                                autoComplete='off'
                                            />
                                            <div id="textoAltoCajon" className={`especificacionCortina milimetrosCortinas ${altoCajon != '' && 'conValue'}`}><p>mm.</p></div>
                                        </div>

                                        <div className="bodyFormGroupCortinas">
                                            <label className={`especificacionCortina textoEspecificacionCortina ${profundidadCajon != '' && 'conValue'}`} htmlFor="profundidadCajon">Profundidad</label>
                                            <input type="number"
                                                id="profundidadCajon"
                                                value={profundidadCajon}
                                                onChange={(e) => { setProfundidadCajon(e.target.value); deleteErrorMessage() }}
                                                className={`campotextoEspecificacionCortina ${profundidadCajon != '' && 'conValue'}`}
                                                autoComplete='off'
                                            />
                                            <div id="textoProfundidadCajon" className={`especificacionCortina milimetrosCortinas ${profundidadCajon != '' && 'conValue'}`}><p>mm.</p></div>
                                        </div>
                                    </div>

                                    <div className="form-group-cortinas">
                                        <p>REFERENCIA DE MEDIDA DE ANCHO</p>
                                        <div className="bodyFormGroupCortinas">
                                            <button className={`especificacionCortina ${medidaIndicadaCajon == 'ras' && 'checked'}`} onClick={() => { setMedidaIndicadaCajon('ras'); deleteErrorMessage() }}>Ras de guía</button>
                                            <button className={`especificacionCortina ${medidaIndicadaCajon == 'fondo' && 'checked'}`} onClick={() => { setMedidaIndicadaCajon('fondo'); deleteErrorMessage() }}>Fondo de guía</button>
                                        </div>
                                    </div>*/}

                                    <div className="form-group-cortinas">
                                        <p>UBICACIÓN CAJÓN EXTERIOR</p>
                                        <div className="bodyFormGroupCortinas">
                                            <button className={`especificacionCortina ${ubicacionCajon == 'dentroDelVano' && 'checked'}`} onClick={() => { setUbicacionCajon('dentroDelVano'); deleteErrorMessage() }}>Dentro del vano</button>
                                            <button className={`especificacionCortina ${ubicacionCajon == 'fueraDelVano' && 'checked'}`} onClick={() => { setUbicacionCajon('fueraDelVano'); deleteErrorMessage() }}>Fuera del vano</button>
                                        </div>
                                    </div>
                                </>
                            }
                        </>
                    }

                    <div className="form-group-cortinas">
                        <p>TIPO DE MECANISMO</p>
                        <div className="bodyFormGroupCortinas">
                            <button className={`especificacionCortina ${mecanismo == 'manual' && 'checked'} ${(tipoTablilla == 'DAP-44' || tipoTablilla == 'DAP-ABK' || tipoTablilla == 'DAP-49') && 'especificacionCortinaDisabled'}`} onClick={() => { setMecanismo('manual'); limpiarTipoAccionador(); deleteErrorMessage() }} disabled={tipoTablilla == 'DAP-44' || tipoTablilla == 'DAP-ABK' || tipoTablilla == 'DAP-49'}>Manual</button>
                            <button className={`especificacionCortina ${mecanismo == 'motor' && 'checked'}`} onClick={() => { setMecanismo('motor'); limpiarTipoAccionador(); deleteErrorMessage() }}>Motor</button>
                        </div>
                    </div>

                    {mecanismo == 'motor' &&
                        (<div className="form-group-cortinas">
                            <p>ACCIONADOR</p>
                            <div className="bodyFormGroupCortinas">
                                <button className={`especificacionCortina ${tipoAccionador == 'tecla' && 'checked'}`} onClick={() => { setTipoAccionador('tecla'); deleteErrorMessage() }}>Tecla</button>
                                <button className={`especificacionCortina ${tipoAccionador == 'controlRemoto' && 'checked'}`} onClick={() => { setTipoAccionador('controlRemoto'); deleteErrorMessage() }}>Control remoto</button>
                            </div>
                        </div>)
                    }

                    {mecanismo == 'manual' &&
                        (<div className="form-group-cortinas">
                            <p>ACCIONADOR (Se aplicarán reductores según tabla)</p>
                            <div className="bodyFormGroupCortinas">
                                <button className={`especificacionCortina ${tipoAccionador == 'enrollador' && 'checked'}`} onClick={() => { setTipoAccionador('enrollador'); deleteErrorMessage() }}>Enrollador</button>
                                <button className={`especificacionCortina ${tipoAccionador == 'elevaManivela' && 'checked'}`} onClick={() => { setTipoAccionador('elevaManivela'); deleteErrorMessage() }}>Eleva manivela</button>
                            </div>
                        </div>)
                    }

                    <div className="form-group-cortinas">
                        <p>LADO DEL MECANISMO (Vista interna)</p>
                        <div className="bodyFormGroupCortinas">
                            <button className={`especificacionCortina ${ladoMecanismo == 'izquierda' && 'checked'}`} onClick={() => { setLadoMecanismo('izquierda'); deleteErrorMessage() }}>Izquierda</button>
                            <button className={`especificacionCortina ${ladoMecanismo == 'derecha' && 'checked'}`} onClick={() => { setLadoMecanismo('derecha'); deleteErrorMessage() }}>Derecha</button>
                        </div>
                    </div>
                </>
            }

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
                <button disabled={formularioEnviado} className={`botonEnviarConsulta ${formularioEnviado && 'enviarCortinaDisabled'}`} onClick={() => { state.logueado ? enviarConsulta() : setMostrarLogin(true) }}>
                    {`${formularioEnviado ? ('Formulario enviado') : ('Enviar consulta')}`}
                </button>
            </div>
        </div>
    );
}