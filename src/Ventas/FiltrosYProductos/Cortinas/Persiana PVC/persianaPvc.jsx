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
        conMecanismo,
        setConMecanismo,
        alturaIndicada,
        setAlturaIndicada,
        tipoEnrollador,
        setTipoEnrollador,
        descelectEnrolladorPersianaPvc,
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

        if (alto === "" || ancho === "" || alturaIndicada === "" || conMecanismo === "") {
            setErrorMessage("Por favor, completa todos los campos obligatorios");
            window.scrollTo(0, 0);
        }
        else if (!enterosRegex.test(alto) || !enterosRegex.test(ancho)) {
            setErrorMessage("Los campos de dimensiones solo aceptan números enteros positivos");
            window.scrollTo(0, 0);
        }
        else if (conMecanismo === 'mecanismoSi' && tipoEnrollador === "" ) {
            setErrorMessage("Por favor, completa todos los campos obligatorios");
            window.scrollTo(0, 0);
        }
        else {
            deleteErrorMessage();

            const textoCortina = 
                "TIPO: PERSIANA PVC\n" +
                "ALTO: " + alto + "mm\n" +
                "ANCHO: " + ancho + "mm\n" +
                "ALTURA INDICADA: " + alturaIndicada + "\n" +
                (conMecanismo == 'mecanismoNo' ?
                    "MECANISMO: Sin mecanismo, solo cortina"
                    :
                    "TIPO DE MECANISMO: " + (tipoEnrollador ? tipoEnrollador : 'A consultar')
                )
            ;

            enviarCortina(textoCortina);
        }
    }

    return (
        <div className="contenedorPrincipalPersianaPvc">
            <form className="formularioPersianaPvc">
                <div className="form-group-cortinas">
                    <p>DIMENSIONES</p>
                    <div className="bodyFormGroupCortinas">
                        <label className="especificacionCortina textoEspecificacionCortina" htmlFor="alto">Alto</label>
                        <input type="text"
                            id="alto"
                            value={alto}
                            onChange={(e) => { setAlto(e.target.value); deleteErrorMessage() }}
                            className="campotextoEspecificacionCortina"
                        />
                        <div id="textoAlto" className="especificacionCortina milimetrosCortinas"><p>mm.</p></div>

                        <label className="especificacionCortina textoEspecificacionCortina" htmlFor="ancho">Ancho</label>
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
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoNo' ? 'checked' : ''}`} onClick={() => { setConMecanismo(conMecanismo !== 'mecanismoNo' ? 'mecanismoNo' : ''); descelectEnrolladorPersianaPvc(); deleteErrorMessage() }}>No</div>
                    </div>
                </div>

                {conMecanismo == 'mecanismoSi' &&
                    <div className="form-group-cortinas">
                        <p>TIPO DE MECANISMO</p>
                        <div className="bodyFormGroupCortinas">
                            <div className={`especificacionCortina ${tipoEnrollador == 'cinta' ? 'checked' : ''}`} onClick={() => { setTipoEnrollador(tipoEnrollador !== 'cinta' ? 'cinta' : ''); deleteErrorMessage() }}>Cinta</div>
                            <div className={`especificacionCortina ${tipoEnrollador == 'antonetti' ? 'checked' : ''}`} onClick={() => { setTipoEnrollador(tipoEnrollador !== 'antonetti' ? 'antonetti' : ''); deleteErrorMessage() }}>Antonetti</div>
                        </div>
                    </div>}
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