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
        else if (tipoTablilla == 'DAP-55' && (ancho > 4000 || alto > 4000)) {
            setErrorMessage("Las medidas maximas para portones con tablillas DAP-55 son 4000x4000mm")
            window.scrollTo(0, 0);
        }
        else if (tipoTablilla == 'DAP-64' && (ancho > 4500 || alto > 4000)) {
            setErrorMessage("Las medidas maximas para portones con tablillas DAP-64 son 4500x4000mm")
            window.scrollTo(0, 0);
        }
        else if (tipoTablilla == 'DAP-79' && (ancho > 6000)) {
            setErrorMessage("El ancho máximo para portones con tablillas DAP-79 es 6000mm")
            window.scrollTo(0, 0);
        }
        else if (tipoTablilla == 'DAP-79' && ((ancho * alto) > 20000000)) {
            setErrorMessage("La superficie de portones con tablillas DAP-79 no puede superar los 20 metros cuadrados")
        }
        else {
            deleteErrorMessage();

            const textoCortina =
                "Tipo: PORTON ALUMINIO\n" +
                "Tipo de tablilla: " + tipoTablilla + "\n" +
                "Alto: " + alto + "mm\n" +
                "Ancho: " + ancho + "mm\n" +
                "Referencia de medida: " + (medidaIndicada == 'ras' ? 'RAS DE GUÍA' : 'FONDO DE GUÍA') + "\n" +
                "Profundidad de guía: " + profundidadGuia + "mm\n" +
                "Formato: " + (formato == 'completo' ? 'COMPLETO' : 'PAÑO SOLO') + "\n" +
                (formato == 'completo' ? ("Tipo de motor: " + (tipoMotor == 'mecanico' ? 'MECÁNICO' : 'CON AYUDA MANUAL') + "\n") : '') +
                (tipoMotor == 'mecanico' ? ("Accionador: " + (tipoAccionador == 'tecla' ? 'TECLA' : 'CONTROL REMOTO') + "\n") : '') +
                (aclaraciones !== '' ? ("\nAclaraciones: " + aclaraciones) : (""))
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
                    <button className={`especificacionCortina ${tipoTablilla == 'DAP-55' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'DAP-55' ? 'DAP-55' : ''); deleteErrorMessage() }}>DAP-55 con felpa</button>
                    <button className={`especificacionCortina ${tipoTablilla == 'DAP-64' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'DAP-64' ? 'DAP-64' : ''); deleteErrorMessage() }}>DAP-64 ciega</button>
                    <button className={`especificacionCortina ${tipoTablilla == 'DAP-79' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'DAP-79' ? 'DAP-79' : ''); deleteErrorMessage() }}>DAP-79 ciega</button>
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
                    <button className={`especificacionCortina ${formato == 'completo' ? 'checked' : ''}`} onClick={() => { setFormato('completo'); deleteErrorMessage() }}>Completo</button>
                    <button className={`especificacionCortina ${formato == 'pañoSolo' ? 'checked' : ''}`} onClick={() => { setFormato('pañoSolo'); limpiarTipoMotor(); deleteErrorMessage() }}>Paño solo</button>
                </div>
            </div>

            {formato == 'completo' &&
                <div className="form-group-cortinas">
                    <p>TIPO DE MOTOR</p>
                    <div className="bodyFormGroupCortinas">
                        <button className={`especificacionCortina ${tipoMotor == 'mecanico' && 'checked'}`} onClick={() => { setTipoMotor('mecanico'); deleteErrorMessage() }}>Mecánico</button>
                        <button className={`especificacionCortina ${tipoMotor == 'conAyudaManual' && 'checked'}`} onClick={() => { setTipoMotor('conAyudaManual'); limpiarTipoAccionador(); deleteErrorMessage() }}>Con ayuda manual</button>
                    </div>
                </div>
            }

            {tipoMotor == 'mecanico' &&
                <div className="form-group-cortinas">
                    <p>ACCIONADOR</p>
                    <div className="bodyFormGroupCortinas">
                        <button className={`especificacionCortina ${tipoAccionador == 'tecla' && 'checked'}`} onClick={() => { setTipoAccionador('tecla'); deleteErrorMessage() }}>Tecla</button>
                        <button className={`especificacionCortina ${tipoAccionador == 'controlRemoto' && 'checked'}`} onClick={() => { setTipoAccionador('controlRemoto'); deleteErrorMessage() }}>Control remoto</button   >
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