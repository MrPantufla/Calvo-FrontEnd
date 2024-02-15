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
        console.log("ENVIANDO")

        if (alto === '' || ancho === '' || conMecanismo === '' || alturaIndicada === '' || color === '') {
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
                "ALTURA INDICADA: " + alturaIndicada +
                (conMecanismo == 'mecanismoNo' ?
                    "\nMECANISMO: Sin mecanismo, solo cortina\n"
                    :
                    ("\nLADO DE CAIDA: " + (caida ? caida : "A consultar") + "\n" +
                        "LADO DEL TIRADOR: " + (tirador ? tirador : 'A consultar')
                    )
                ) +
                (aclaraciones !== '' ? ("\nACLARACIONES: " + aclaraciones) : (""))
                ;

            enviarCortina(textoCortina);
        }
    }

    return (
        <div className="contenedorPrincipalRoller">
            <div className="form-group-cortinas">
                <p>COLOR</p>
                <div className="bodyFormGroupCortinas">
                    <div className={`negro especificacionCortina ${color == 'negro' ? 'checked' : ''}`} onClick={() => { setColor(color !== 'negro' ? 'negro' : ''); deleteErrorMessage() }}>Negro</div>
                    <div className={`blanco especificacionCortina ${color == 'blanco' ? 'checked' : ''}`} onClick={() => { setColor(color !== 'blanco' ? 'blanco' : ''); deleteErrorMessage() }}>Blanco</div>
                    <div className={`beige especificacionCortina ${color == 'beige' ? 'checked' : ''}`} onClick={() => { setColor(color !== 'beige' ? 'beige' : ''); deleteErrorMessage() }}>Beige</div>
                    <div className={`gris especificacionCortina ${color == 'gris' ? 'checked' : ''}`} onClick={() => { setColor(color !== 'gris' ? 'gris' : ''); deleteErrorMessage() }}>Gris</div>
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
                    <div className={`especificacionCortina ${alturaIndicada == 'vano' ? 'checked' : ''}`} onClick={() => { setAlturaIndicada(alturaIndicada !== 'vano' ? 'vano' : ''); deleteErrorMessage() }}>Vano</div>
                    <div className={`especificacionCortina ${alturaIndicada == 'abertura' ? 'checked' : ''}`} onClick={() => { setAlturaIndicada(alturaIndicada !== 'abertura' ? 'abertura' : ''); deleteErrorMessage() }}>Abertura</div>
                </div>
            </div>

            <div className="form-group-cortinas">
                <p>CON MECANISMO?</p>
                <div className="bodyFormGroupCortinas">
                    <div className={`especificacionCortina ${conMecanismo == 'mecanismoSi' ? 'checked' : ''}`} onClick={() => { setConMecanismo(conMecanismo !== 'mecanismoSi' ? 'mecanismoSi' : ''); descelectCaidaRoller(); deleteErrorMessage() }}>Si</div>
                    <div className={`especificacionCortina ${conMecanismo == 'mecanismoNo' ? 'checked' : ''}`} onClick={() => { setConMecanismo(conMecanismo !== 'mecanismoNo' ? 'mecanismoNo' : ''); descelectCaidaRoller(); deleteErrorMessage() }}>No</div>
                </div>
            </div>

            {conMecanismo == 'mecanismoSi' &&
                <>
                    <div className="form-group-cortinas">
                        <p>LADO DE CAIDA (opcional)</p>
                        <div className="bodyFormGroupCortinas">
                            <div className={`especificacionCortina ${caida == 'interior' ? 'checked' : ''}`} onClick={() => { setCaida(caida !== 'interior' ? 'interior' : ''); deleteErrorMessage() }}>Interior</div>
                            <div className={`especificacionCortina ${caida == 'exterior' ? 'checked' : ''}`} onClick={() => { setCaida(caida !== 'exterior' ? 'exterior' : ''); deleteErrorMessage() }}>Exterior</div>
                        </div>
                    </div>

                    <div className="form-group-cortinas">
                        <p>LADO DEL TIRADOR (opcional)</p>
                        <div className="bodyFormGroupCortinas">
                            <div className={`especificacionCortina ${tirador == 'izquierdo' ? 'checked' : ''}`} onClick={() => { setTirador(tirador !== 'izquierdo' ? 'izquierdo' : ''); deleteErrorMessage() }}>Izquierdo</div>
                            <div className={`especificacionCortina ${tirador == 'derecho' ? 'checked' : ''}`} onClick={() => { setTirador(tirador !== 'derecho' ? 'derecho' : ''); deleteErrorMessage() }}>Derecho</div>
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
                <button className="botonEnviarConsulta" onClick={() => { state.logueado ? enviarConsulta() : setMostrarLogin(true) }}>
                    Enviar consulta
                </button>
            </div>
        </div>
    );
}