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
        formato,
        setFormato,
        medidaIndicada,
        setMedidaIndicada,
        profundidadGuia,
        setProfundidadGuia,
        tipoMotor,
        setTipoMotor,
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
        limpiarTipoMotor,
        formularioEnviado,
        limpiarPortonAluminio
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

        if (tipoTablilla == '' || alto == "" || ancho == "" || medidaIndicada === "" || profundidadGuia == '' || formato == "" || (formato == 'completo' && (tipoMotor == '' || (tipoMotor == 'mecanico' && tipoAccionador == '')))) {
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
                "TIPO: PORTON ALUMINIO\n" +
                "TIPO DE TABLILLA: " + tipoTablilla + "\n" +
                "ALTO: " + alto + "mm\n" +
                "ANCHO: " + ancho + "mm\n" +
                "REFERENCIA DE MEDIDA: " + (medidaIndicada == 'ras' ? 'Ras de guía' : 'Fondo de guía') + "\n" +
                "PROFUNDIDAD DE GUÍA: " + profundidadGuia + "\n" +
                "FORMATO: " + (formato == 'completo' ? 'Completo' : 'Paño solo') + "\n" +
                (formato == 'completo' ? ("TIPO DE MOTOR: " + (tipoMotor == 'mecanico' ? 'Mecánico' : 'Con ayuda manual') + "\n") : '') +
                (tipoMotor == 'mecanico' ? ("TIPO DE ACCIONADOR: " + (tipoAccionador == 'tecla' ? 'Tecla' : 'Control remoto') + "\n") : '') +
                (aclaraciones !== '' ? ("\nACLARACIONES: " + aclaraciones) : (""))
                ;

            enviarCortina(textoCortina);
            limpiarPortonAluminio();
        }
    }

    return (
        <div className="contenedorPrincipalPortonAluminio">
            <div className="form-group-cortinas">
                <p>TIPO DE TABLILLA</p>
                <div className="bodyFormGroupCortinas">
                    <div className={`especificacionCortina ${tipoTablilla == 'DAP-55' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'DAP-55' ? 'DAP-55' : ''); deleteErrorMessage() }}>DAP-55 con felpa</div>
                    <div className={`especificacionCortina ${tipoTablilla == 'DAP-64' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'DAP-64' ? 'DAP-64' : ''); deleteErrorMessage() }}>DAP-64 ciega</div>
                    <div className={`especificacionCortina ${tipoTablilla == 'DAP-79' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'DAP-79' ? 'DAP-79' : ''); deleteErrorMessage() }}>DAP-79 ciega</div>
                </div>
            </div>

            <div className="form-group-cortinas">
                <p>DIMENSIONES</p>
                <div className="bodyFormGroupCortinas">
                    <label className="especificacionCortina textoEspecificacionCortina" htmlFor="ancho">Ancho:</label>
                    <input type="text"
                        id="ancho"
                        value={ancho}
                        onChange={(e) => { setAncho(e.target.value); deleteErrorMessage() }}
                        className="campotextoEspecificacionCortina"
                    />
                    <div id="textoAncho" className="especificacionCortina milimetrosCortinas"><p>mm.</p></div>

                    <label className="especificacionCortina textoEspecificacionCortina" htmlFor="alto">Alto:</label>
                    <input type="text"
                        id="alto"
                        value={alto}
                        onChange={(e) => { setAlto(e.target.value); deleteErrorMessage() }}
                        className="campotextoEspecificacionCortina"
                    />
                    <div id="textoAlto" className="especificacionCortina milimetrosCortinas"><p>mm.</p></div>
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
                    <label className="especificacionCortina textoEspecificacionCortina" htmlFor="profundidadGuia">Profundidad de guía</label>
                    <input type="text"
                        id="profundidadGuia"
                        value={profundidadGuia}
                        onChange={(e) => { setProfundidadGuia(e.target.value); deleteErrorMessage() }}
                        className="campotextoEspecificacionCortina"
                    />
                    <div id="textoAncho" className="especificacionCortina milimetrosCortinas"><p>mm.</p></div>
                </div>
            </div>

            <div className="form-group-cortinas">
                <p>FORMATO</p>
                <div className="bodyFormGroupCortinas">
                    <div className={`especificacionCortina ${formato == 'completo' ? 'checked' : ''}`} onClick={() => { setFormato('completo'); deleteErrorMessage() }}>Completo</div>
                    <div className={`especificacionCortina ${formato == 'pañoSolo' ? 'checked' : ''}`} onClick={() => { setFormato('pañoSolo'); limpiarTipoMotor(); deleteErrorMessage() }}>Paño solo</div>
                </div>
            </div>

            {formato == 'completo' &&
                <div className="form-group-cortinas">
                    <p>TIPO DE MOTOR</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${tipoMotor == 'mecanico' && 'checked'}`} onClick={() => { setTipoMotor('mecanico'); deleteErrorMessage() }}>Mecánico</div>
                        <div className={`especificacionCortina ${tipoMotor == 'conAyudaManual' && 'checked'}`} onClick={() => { setTipoMotor('conAyudaManual'); limpiarTipoAccionador(); deleteErrorMessage() }}>Con ayuda manual</div>
                    </div>
                </div>
            }

            {tipoMotor == 'mecanico' &&
                <div className="form-group-cortinas">
                    <p>TIPO DE ACCIONADOR</p>
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