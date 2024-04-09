import './persianaPvc.css';
import { useCortinas } from '../../../../contextCortinas.jsx';
import { useEffect } from 'react';
import { useAuth } from '../../../../contextLogin.jsx';

export default function PersianaPvc() {

    const {
        alto,
        setAlto,
        ancho,
        setAncho,
        medidaIndicada,
        setMedidaIndicada,
        profundidadGuia,
        setProfundidadGuia,
        formato,
        setFormato,
        mecanismo,
        setMecanismo,
        tipoAccionador,
        setTipoAccionador,
        setErrorMessage,
        deleteErrorMessage,
        enviarCortina,
        aclaraciones,
        setAclaraciones,
        limpiarTipoAccionador,
        limpiarMecanismo,
        limpiarPersianaPvc,
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

        if (alto == "" || ancho == "" || medidaIndicada == "" || profundidadGuia == '' || formato == '' || (formato == 'completo' && (mecanismo == '' || (mecanismo != '' && tipoAccionador == '')))) {
            setErrorMessage("Por favor, completa todos los campos obligatorios");
            window.scrollTo(0, 0);
        }
        else if (!enterosRegex.test(alto) || !enterosRegex.test(ancho) || !enterosRegex.test(profundidadGuia)) {
            setErrorMessage("Los campos de dimensiones solo aceptan números enteros positivos");
            window.scrollTo(0, 0);
        }
        else {
            deleteErrorMessage();

            const textoCortina =
                "TIPO: Persiana PVC\n" +
                "ANCHO: " + ancho + "mm\n" +
                "ALTO: " + alto + "mm\n" +
                "REFERENCIA DE MEDIDA: " + (medidaIndicada == 'ras' ? 'Ras de guía' : 'Fondo de guía') + "\n" +
                "FORMATO: " + (formato == 'completo' ? ('Completo') : ('Paño solo')) + "\n" +
                (formato == 'completo' ? (
                    "MECANISMO: " + mecanismo.charAt(0).toUpperCase() + mecanismo.slice(1).toLowerCase() + "\n" +
                    "ACCIONADOR: " + (tipoAccionador == 'controlRemoto' ? ('Control remoto') : (tipoAccionador == 'elevaManivela' ? ('Eleva manivela') : (tipoAccionador.charAt(0).toUpperCase() + tipoAccionador.slice(1).toLowerCase()))) + "\n"
                ) : '') +
                (aclaraciones !== '' ? ("\nACLARACIONES: " + aclaraciones) : (""))
                ;

            enviarCortina(textoCortina);
            limpiarPersianaPvc();
        }
    }

    return (
        <div className="contenedorPrincipalPersianaPvc">
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
                <div className="form-group-cortinas">
                    <p>MECANISMO</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${mecanismo == 'manual' && 'checked'}`} onClick={() => { setMecanismo('manual'); limpiarTipoAccionador(); deleteErrorMessage() }}>Manual</div>
                        <div className={`especificacionCortina ${mecanismo == 'motor' && 'checked'}`} onClick={() => { setMecanismo('motor'); limpiarTipoAccionador(); deleteErrorMessage() }}>Motor</div>
                    </div>
                </div>
            }

            {mecanismo == 'manual' &&
                <div className="form-group-cortinas">
                    <p>ACCIONADOR</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${tipoAccionador == 'enrollador' && 'checked'}`} onClick={() => { setTipoAccionador('enrollador'); deleteErrorMessage() }}>Enrollador</div>
                        <div className={`especificacionCortina ${tipoAccionador == 'elevaManivela' && 'checked'}`} onClick={() => { setTipoAccionador('elevaManivela'); deleteErrorMessage() }}>Eleva manivela</div>
                    </div>
                </div>
            }

            {mecanismo == 'motor' &&
                <div className="form-group-cortinas">
                    <p>ACCIONADOR</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${tipoAccionador == 'tecla' && 'checked'}`} onClick={() => { setTipoAccionador('tecla'); deleteErrorMessage() }}>Tecla</div>
                        <div className={`especificacionCortina ${tipoAccionador == 'controlRemoto' && 'checked'}`} onClick={() => { setTipoAccionador('controlRemoto'); deleteErrorMessage() }}>Control remoto</div>
                    </div>
                </div>
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