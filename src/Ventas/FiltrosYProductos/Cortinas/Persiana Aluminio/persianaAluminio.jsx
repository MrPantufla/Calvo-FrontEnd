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
        formato,
        setFormato,
        medidaIndicada,
        setMedidaIndicada,
        profundidadGuia,
        setProfundidadGuia,
        mecanismo,
        setMecanismo,
        tipoAccionador,
        setTipoAccionador,
        tipoTablilla,
        setTipoTablilla,
        setErrorMessage,
        deleteErrorMessage,
        enviarCortina,
        aclaraciones,
        setAclaraciones,
        limpiarTipoAccionador,
        limpiarMecanismo,
        limpiarPersianaAluminio,
        formularioEnviado
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
                "TIPO: PERSIANA ALUMINIO\n" +
                "TIPO DE TABLILLA: " + (tipoTablilla == 'barrioTubular' ? ('Barrio tubular') : (tipoTablilla == 'barrioLiviana' ? ('Barrio liviana con felpa') : (tipoTablilla))) + "\n" +
                "ANCHO: " + ancho + "mm\n" +
                "ALTO: " + alto + "mm\n" +
                "REFERENCIA DE MEDIDA: " + (medidaIndicada == 'ras' ? 'Ras de guía' : 'Fondo de guía') + "\n" +
                "FORMATO: " + formato.charAt(0).toUpperCase() + formato.slice(1).toLowerCase() + "\n" +
                (formato == 'completo' ? ('TIPO DE MECANISMO: ' + mecanismo.charAt(0).toUpperCase() + mecanismo.slice(1).toLowerCase() + "\n" +
                    'ACCIONADOR: ' + (tipoAccionador == 'elevaManivela' ? 'Eleva Manivela' : (tipoAccionador == 'controlRemoto' ? ('Control Remoto') : (tipoAccionador.charAt(0).toUpperCase() + tipoAccionador.slice(1).toLowerCase()))) + "\n")
                    : ('')) +
                (aclaraciones !== '' ? ("\nACLARACIONES: " + aclaraciones) : (""))
                ;

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
                        <div className={`especificacionCortina ${tipoTablilla == 'DAP-ABK' && 'checked'}`} onClick={() => { setTipoTablilla('DAP-ABK'); deleteErrorMessage() }}>DAP-ABK autoblocante</div>
                        <div className={`especificacionCortina ${tipoTablilla == 'DAP-44' && 'checked'}`} onClick={() => { setTipoTablilla('DAP-44'); deleteErrorMessage() }}>DAP-44</div>
                        <div className={`especificacionCortina ${tipoTablilla == 'DAP-45' && 'checked'}`} onClick={() => { setTipoTablilla('DAP-45'); deleteErrorMessage() }}>DAP-45</div>
                    </div>
                    <div className="tablillasMedio">
                        <div className={`especificacionCortina ${tipoTablilla == 'DAP-49' && 'checked'}`} onClick={() => { setTipoTablilla('DAP-49'); deleteErrorMessage() }}>DAP-49 microperforada</div>
                        <div className={`especificacionCortina ${tipoTablilla == 'DAP-55' && 'checked'}`} onClick={() => { setTipoTablilla('DAP-55'); deleteErrorMessage() }}>DAP-55 con felpa</div>
                    </div>
                    <div className="tablillasAbajo">
                        <div className={`especificacionCortina ${tipoTablilla == 'barrioTubular' && 'checked'}`} onClick={() => { setTipoTablilla('barrioTubular'); deleteErrorMessage() }}>Barrio tubular</div>
                        <div className={`especificacionCortina ${tipoTablilla == 'barrioLiviana' && 'checked'}`} onClick={() => { setTipoTablilla('barrioLiviana'); deleteErrorMessage() }}>Barrio liviana con felpa</div>

                    </div>
                </div>
            </div>
            <div className="form-group-cortinas">
                <p>DIMENSIONES</p>
                <div className="bodyFormGroupCortinas">
                    <label className={`especificacionCortina textoEspecificacionCortina ${ancho != '' && 'conValue'}`} htmlFor="ancho">Ancho</label>
                    <input type="text"
                        id="ancho"
                        value={ancho}
                        onChange={(e) => { setAncho(e.target.value); deleteErrorMessage() }}
                        className={`campotextoEspecificacionCortina ${ancho != '' && 'conValue'}`}
                    />
                    <div id="textoAncho" className={`especificacionCortina milimetrosCortinas ${ancho != '' && 'conValue'}`}><p>mm.</p></div>

                    <label className={`especificacionCortina textoEspecificacionCortina ${alto != '' && 'conValue'}`} htmlFor="alto">Alto</label>
                    <input type="text"
                        id="alto"
                        value={alto}
                        onChange={(e) => { setAlto(e.target.value); deleteErrorMessage() }}
                        className={`campotextoEspecificacionCortina ${alto != '' && 'conValue'}`}
                    />
                    <div id="textoAlto" className={`especificacionCortina milimetrosCortinas ${alto != '' && 'conValue'}`}><p>mm.</p></div>
                </div>
            </div>

            <div className="form-group-cortinas">
                <p>REFERENCIA DE MEDIDA</p>
                <div className="bodyFormGroupCortinas">
                    <div className={`especificacionCortina ${medidaIndicada == 'ras' && 'checked'}`} onClick={() => { setMedidaIndicada('ras'); deleteErrorMessage() }}>Ras de guía</div>
                    <div className={`especificacionCortina ${medidaIndicada == 'fondo' && 'checked'}`} onClick={() => { setMedidaIndicada('fondo'); deleteErrorMessage() }}>Fondo de guía</div>
                </div>
            </div>

            <div className="form-group-cortinas">
                <p>INDICAR PROFUNDIDAD DE GUÍA</p>
                <div className="bodyFormGroupCortinas">
                    <label className={`especificacionCortina textoEspecificacionCortina ${profundidadGuia != '' && 'conValue'}`} htmlFor="profundidadGuia">Profundidad de guía</label>
                    <input type="text"
                        id="profundidadGuia"
                        value={profundidadGuia}
                        onChange={(e) => { setProfundidadGuia(e.target.value); deleteErrorMessage() }}
                        className={`campotextoEspecificacionCortina ${profundidadGuia != '' && 'conValue'}`}
                    />
                    <div id="textoAlto" className={`especificacionCortina milimetrosCortinas ${profundidadGuia != '' && 'conValue'}`}><p>mm.</p></div>
                </div>
            </div>

            <div className="form-group-cortinas">
                <p>FORMATO</p>
                <div className="bodyFormGroupCortinas">
                    <div className={`especificacionCortina ${formato == 'completo' && 'checked'}`} onClick={() => { setFormato('completo'); deleteErrorMessage() }}>Completo</div>
                    <div className={`especificacionCortina ${formato == 'pañoSolo' && 'checked'}`} onClick={() => { setFormato('pañoSolo'); limpiarMecanismo(); deleteErrorMessage() }}>Paño solo</div>
                </div>
            </div>

            {formato == 'completo' &&
                (<>
                    <div className="form-group-cortinas">
                        <p>TIPO DE MECANISMO</p>
                        <div className="bodyFormGroupCortinas">
                            <div className={`especificacionCortina ${mecanismo == 'manual' && 'checked'}`} onClick={() => { setMecanismo('manual'); limpiarTipoAccionador(); deleteErrorMessage() }}>Manual</div>
                            <div className={`especificacionCortina ${mecanismo == 'motor' && 'checked'}`} onClick={() => { setMecanismo('motor'); limpiarTipoAccionador(); deleteErrorMessage() }}>Motor</div>
                        </div>
                    </div>

                    {mecanismo == 'motor' &&
                        (<div className="form-group-cortinas">
                            <p>ACCIONADOR</p>
                            <div className="bodyFormGroupCortinas">
                                <div className={`especificacionCortina ${tipoAccionador == 'tecla' && 'checked'}`} onClick={() => { setTipoAccionador('tecla'); deleteErrorMessage() }}>Tecla</div>
                                <div className={`especificacionCortina ${tipoAccionador == 'controlRemoto' && 'checked'}`} onClick={() => { setTipoAccionador('controlRemoto'); deleteErrorMessage() }}>Control remoto</div>
                            </div>
                        </div>)
                    }

                    {mecanismo == 'manual' &&
                        (<div className="form-group-cortinas">
                            <p>ACCIONADOR (Se aplicarán reductores según tabla)</p>
                            <div className="bodyFormGroupCortinas">
                                <div className={`especificacionCortina ${tipoAccionador == 'enrollador' && 'checked'}`} onClick={() => { setTipoAccionador('enrollador'); deleteErrorMessage() }}>Enrollador</div>
                                <div className={`especificacionCortina ${tipoAccionador == 'elevaManivela' && 'checked'}`} onClick={() => { setTipoAccionador('elevaManivela'); deleteErrorMessage() }}>Eleva manivela</div>
                            </div>
                        </div>)
                    }
                </>)
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