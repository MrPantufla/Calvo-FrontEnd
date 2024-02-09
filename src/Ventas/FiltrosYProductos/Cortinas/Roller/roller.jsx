import './roller.css';
import { useCortinas } from '../../../../contextCortinas.jsx';
import { useEffect, useState } from 'react';

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
        descelectCaidaRoller
    } = useCortinas();

    const [errorMessage, setErrorMessage] = useState('');

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

    const enviarConsulta = () =>{
        const enterosRegex = /[0-9]/;

        if(!alto || !ancho || !conMecanismo || !alturaIndicada || !color){
            setErrorMessage("Por favor, completa todos los campos obligatorios");
        }
        else if(!enterosRegex.test(alto) || !enterosRegex.test(ancho)){
            setErrorMessage("Los campos de dimensiones solo aceptan números enteros");
        }
        else{
            //FETCH
        }
    }

    return (
        <div className="contenedorPrincipalRoller">
            <div className="errorMessageContainer">
                <p className="errorFormulario">{errorMessage}</p>
            </div>
                <div className="form-group-cortinas">
                    <p>COLOR</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${color == 'negro' ? 'checked' : ''}`} onClick={() => setColor(color !== 'negro' ? 'negro' : undefined)}>Negro</div>
                        <div className={`especificacionCortina ${color == 'blanco' ? 'checked' : ''}`} onClick={() => setColor(color !== 'blanco' ? 'blanco' : undefined)}>Blanco</div>
                        <div className={`especificacionCortina ${color == 'beige' ? 'checked' : ''}`} onClick={() => setColor(color !== 'beige' ? 'beige' : undefined)}>Beige</div>
                        <div className={`especificacionCortina ${color == 'gris' ? 'checked' : ''}`} onClick={() => setColor(color !== 'gris' ? 'gris' : undefined)}>Gris</div>
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>DIMENSIONES</p>
                    <div className="bodyFormGroupCortinas">
                        <label className="especificacionCortina textoEspecificacionCortina" htmlFor="alto">Alto</label>
                        <input type="text"
                            id="alto"
                            value={alto}
                            onChange={(e) => setAlto(e.target.value)}
                            className="campotextoEspecificacionCortina"
                        />
                        <div id="textoAlto" className="especificacionCortina milimetrosCortinas"><p>mm.</p></div>

                        <label className="especificacionCortina textoEspecificacionCortina" htmlFor="ancho">Ancho</label>
                        <input type="text"
                            id="ancho"
                            value={ancho}
                            onChange={(e) => setAncho(e.target.value)}
                            className="campotextoEspecificacionCortina"
                        />
                        <div id="textoAncho" className="especificacionCortina milimetrosCortinas"><p>mm.</p></div>
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>MEDIDA INDICADA</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${alturaIndicada == 'vano' ? 'checked' : ''}`} onClick={() => setAlturaIndicada(alturaIndicada !== 'vano' ? 'vano' : undefined)}>Vano</div>
                        <div className={`especificacionCortina ${alturaIndicada == 'abertura' ? 'checked' : ''}`} onClick={() => setAlturaIndicada(alturaIndicada !== 'abertura' ? 'abertura' : undefined)}>Abertura</div>
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>CON MECANISMO?</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoSi' ? 'checked' : ''}`} onClick={() => { setConMecanismo(conMecanismo !== 'mecanismoSi' ? 'mecanismoSi' : undefined); descelectCaidaRoller() }}>Si</div>
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoNo' ? 'checked' : ''}`} onClick={() => { setConMecanismo(conMecanismo !== 'mecanismoNo' ? 'mecanismoNo' : undefined); descelectCaidaRoller() }}>No</div>
                    </div>
                </div>

                {conMecanismo == 'mecanismoSi' &&
                    <>
                        <div className="form-group-cortinas">
                            <p>LADO DE CAIDA (opcional)</p>
                            <div className="bodyFormGroupCortinas">
                                <div className={`especificacionCortina ${caida == 'interior' ? 'checked' : ''}`} onClick={() => setCaida(caida !== 'interior' ? 'interior' : undefined)}>Interior</div>
                                <div className={`especificacionCortina ${caida == 'exterior' ? 'checked' : ''}`} onClick={() => setCaida(caida !== 'exterior' ? 'exterior' : undefined)}>Exterior</div>
                            </div>
                        </div>

                        <div className="form-group-cortinas">
                            <p>LADO DEL TIRADOR (opcional)</p>
                            <div className="bodyFormGroupCortinas">
                                <div className={`especificacionCortina ${tirador == 'izquierdo' ? 'checked' : ''}`} onClick={() => setTirador(tirador !== 'izquierdo' ? 'izquierdo' : undefined)}>Izquierdo</div>
                                <div className={`especificacionCortina ${tirador == 'derecho' ? 'checked' : ''}`} onClick={() => setTirador(tirador !== 'derecho' ? 'derecho' : undefined)}>Derecho</div>
                            </div>
                        </div>
                    </>
                }
            <div className="botonEnviarConsultaContainer">
                <button className="botonEnviarConsulta" onClick={enviarConsulta}>
                    Enviar consulta
                </button>
            </div>
        </div >
    );
}