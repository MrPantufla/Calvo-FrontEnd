import './roller.css';
import { useCortinas } from '../../../../contextCortinas.jsx';
import { useEffect } from 'react';
import { useAuth } from '../../../../contextLogin.jsx';

export default function Roller() {
    const {
        alto,
        setAlto,
        ancho,
        setAncho,
        conMecanismo,
        setConMecanismo,
        alturaIndicada,
        setAlturaIndicada,
        color,
        setColor,
        caida,
        setCaida,
        tirador,
        setTirador,
        descelectCaidaRoller,
        errorMessage,
        setErrorMessage,
        deleteErrorMessage,
        enviarCortina
    } = useCortinas();

    const auth = useAuth();

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

        if (!alto || !ancho || !conMecanismo || !alturaIndicada || !color) {
            setErrorMessage("Por favor, completa todos los campos obligatorios");
            window.scrollTo(0, 0);
        }
        else if (!enterosRegex.test(alto) || !enterosRegex.test(ancho)) {
            setErrorMessage("Los campos de dimensiones solo aceptan números enteros positivos");
            window.scrollTo(0, 0);
        }
        else {
            deleteErrorMessage();

            const textoCortina = 
                "TIPO: ROLLER\n" +
                "COLOR: " + color + "\n" +
                "ALTO: " + alto + "mm\n" +
                "ANCHO: " + ancho + "mm\n" +
                "ALTURA INDICADA: " + alturaIndicada + "\n" +
                (conMecanismo == 'mecanismoNo' ?
                    "MECANISMO: Sin mecanismo, solo cortina\n"
                    :
                    ("LADO DE CAIDA: " + (caida ? caida : "A consultar") + "\n" +
                        "LADO DEL TIRADOR: " + (tirador ? tirador : 'A consultar')
                    )
                )
            ;

            enviarCortina(textoCortina);
        }
    }

    return (
        <div className="contenedorPrincipalRoller">
            <div className="errorMessageContainer">
                <p className="errorFormulario">
                    {errorMessage !== '' && (<svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" fill="var(--colorRojo)" className="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                        <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>)}{errorMessage}
                </p>
            </div>
            <div className="form-group-cortinas">
                <p>COLOR</p>
                <div className="bodyFormGroupCortinas">
                    <div className={`especificacionCortina ${color == 'negro' ? 'checked' : ''}`} onClick={() => { setColor(color !== 'negro' ? 'negro' : undefined); deleteErrorMessage() }}>Negro</div>
                    <div className={`especificacionCortina ${color == 'blanco' ? 'checked' : ''}`} onClick={() => { setColor(color !== 'blanco' ? 'blanco' : undefined); deleteErrorMessage() }}>Blanco</div>
                    <div className={`especificacionCortina ${color == 'beige' ? 'checked' : ''}`} onClick={() => { setColor(color !== 'beige' ? 'beige' : undefined); deleteErrorMessage() }}>Beige</div>
                    <div className={`especificacionCortina ${color == 'gris' ? 'checked' : ''}`} onClick={() => { setColor(color !== 'gris' ? 'gris' : undefined); deleteErrorMessage() }}>Gris</div>
                </div>
            </div>

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
                    <div className={`especificacionCortina ${alturaIndicada == 'vano' ? 'checked' : ''}`} onClick={() => { setAlturaIndicada(alturaIndicada !== 'vano' ? 'vano' : undefined); deleteErrorMessage() }}>Vano</div>
                    <div className={`especificacionCortina ${alturaIndicada == 'abertura' ? 'checked' : ''}`} onClick={() => { setAlturaIndicada(alturaIndicada !== 'abertura' ? 'abertura' : undefined); deleteErrorMessage() }}>Abertura</div>
                </div>
            </div>

            <div className="form-group-cortinas">
                <p>CON MECANISMO?</p>
                <div className="bodyFormGroupCortinas">
                    <div className={`especificacionCortina ${conMecanismo == 'mecanismoSi' ? 'checked' : ''}`} onClick={() => { setConMecanismo(conMecanismo !== 'mecanismoSi' ? 'mecanismoSi' : undefined); descelectCaidaRoller(); deleteErrorMessage() }}>Si</div>
                    <div className={`especificacionCortina ${conMecanismo == 'mecanismoNo' ? 'checked' : ''}`} onClick={() => { setConMecanismo(conMecanismo !== 'mecanismoNo' ? 'mecanismoNo' : undefined); descelectCaidaRoller(); deleteErrorMessage() }}>No</div>
                </div>
            </div>

            {conMecanismo == 'mecanismoSi' &&
                <>
                    <div className="form-group-cortinas">
                        <p>LADO DE CAIDA (opcional)</p>
                        <div className="bodyFormGroupCortinas">
                            <div className={`especificacionCortina ${caida == 'interior' ? 'checked' : ''}`} onClick={() => { setCaida(caida !== 'interior' ? 'interior' : undefined); deleteErrorMessage() }}>Interior</div>
                            <div className={`especificacionCortina ${caida == 'exterior' ? 'checked' : ''}`} onClick={() => { setCaida(caida !== 'exterior' ? 'exterior' : undefined); deleteErrorMessage() }}>Exterior</div>
                        </div>
                    </div>

                    <div className="form-group-cortinas">
                        <p>LADO DEL TIRADOR (opcional)</p>
                        <div className="bodyFormGroupCortinas">
                            <div className={`especificacionCortina ${tirador == 'izquierdo' ? 'checked' : ''}`} onClick={() => { setTirador(tirador !== 'izquierdo' ? 'izquierdo' : undefined); deleteErrorMessage() }}>Izquierdo</div>
                            <div className={`especificacionCortina ${tirador == 'derecho' ? 'checked' : ''}`} onClick={() => { setTirador(tirador !== 'derecho' ? 'derecho' : undefined); deleteErrorMessage() }}>Derecho</div>
                        </div>
                    </div>
                </>
            }
            <div className="botonEnviarConsultaContainer">
                <button className="botonEnviarConsulta" onClick={() => auth.state.logueado ? enviarConsulta : auth.setMostrarLogin(true)}>
                    Enviar consulta
                </button>
            </div>
        </div>
    );
}