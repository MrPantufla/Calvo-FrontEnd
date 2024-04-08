import './roller.css';
import { useCortinas } from '../../../../contextCortinas.jsx';
import { useEffect } from 'react';
import { useAuth } from '../../../../contextLogin.jsx';

export default function Roller() {
    const {
        alto,
        setAlto,
        linea,
        setLinea,
        lineaScreen,
        setLineaScreen,
        ancho,
        setAncho,
        alturaIndicada,
        setAlturaIndicada,
        color,
        setColor,
        caida,
        setCaida,
        setErrorMessage,
        deleteErrorMessage,
        enviarCortina,
        aclaraciones,
        setAclaraciones,
        mecanismoRoller,
        setMecanismoRoller,
        colorAccesorios,
        setColorAccesorios,
        ladoTirador,
        setLadoTirador,
        profundidadGuia,
        setProfundidadGuia,
        accionadorMotorRoller,
        setAccionadorMotorRoller,
        limpiarLadoTirador,
        limpiarAccionadorMotorRoller,
        limpiarLineaScreen,
        limpiarRoller,
        formularioEnviado,
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

        if (linea == '' || (linea == 'screen' && lineaScreen == '') || color == '' || ancho == '' || alto == '' || alturaIndicada == '' || profundidadGuia == '' || mecanismoRoller == '' || (mecanismoRoller == 'manual' && ladoTirador == '') || (mecanismoRoller == 'motor' && accionadorMotorRoller == '') || caida == '' || colorAccesorios == '') {
            /*console.log("linea: " + linea)
            console.log("lineaScreen: " + lineaScreen)
            console.log("color: " + color)
            console.log("ancho: " + ancho)
            console.log("alto: " + alto)
            console.log("alturaIndicada: " + alturaIndicada)
            console.log("profundidadIndicada: " + profundidadGuia)
            console.log("mecanismoRoller: " + mecanismoRoller)
            console.log("ladoTirador: " + ladoTirador)
            console.log("accionadorMotorRoller: " + accionadorMotorRoller)
            console.log("ladoTirador: " + ladoTirador)
            console.log("caida: " + caida)
            console.log("colorAccesorios: " + colorAccesorios)*/
            setErrorMessage("Por favor, completa todos los campos");
            window.scrollTo(0, 0);
        }
        else if (!enterosRegex.test(alto) || !enterosRegex.test(ancho) || !enterosRegex.test(profundidadGuia)) {
            setErrorMessage("Los campos de dimensiones solo aceptan números enteros positivos");
            window.scrollTo(0, 0);
        }
        else {
            deleteErrorMessage();

            const textoCortina =
                "TIPO: ROLLER\n" +
                "TIPO ROLLER: " + linea.charAt(0).toUpperCase() + linea.slice(1).toLowerCase() + "\n" +
                (linea == 'screen' && (
                    `${"LINEA: " + lineaScreen.charAt(0).toUpperCase() + lineaScreen.slice(1).toLowerCase() + "\n"}`
                )) +
                "COLOR: " + color.charAt(0).toUpperCase() + color.slice(1).toLowerCase() + "\n" +
                "ALTO: " + alto + "mm\n" +
                "ANCHO: " + ancho + "mm\n" +
                "ALTURA INDICADA: " + alturaIndicada + "\n" +
                "PROFUNDIDAD DE GUÍA: " + profundidadGuia.charAt(0).toUpperCase() + profundidadGuia.slice(1).toLowerCase() + "\n" +
                "MECANISMO: " + mecanismoRoller.charAt(0).toUpperCase() + mecanismoRoller.slice(1).toLowerCase() + "\n" +
                (mecanismoRoller == 'motor' ? 
                ("ACCIONADOR MECANISMO: " + accionadorMotorRoller.charAt(0).toUpperCase() + accionadorMotorRoller.slice(1).toLowerCase() + "\n") 
                : 
                ("LADO DEL TIRADOR: " + ladoTirador.charAt(0).toUpperCase() + ladoTirador.slice(1).toLowerCase() + "\n")) +
                "COLOR DE ACCESORIOS: " + colorAccesorios.charAt(0).toUpperCase() + colorAccesorios.slice(1).toLowerCase() + "\n" +
                (aclaraciones !== '' ? ("\nACLARACIONES: " + aclaraciones) : (""))
                ;

            enviarCortina(textoCortina);
            limpiarRoller();
        }
    }

    return (
        <div className="contenedorPrincipalRoller">
            <div className="form-group-cortinas">
                <p>TIPO DE CORTINA</p>
                <div className="bodyFormGroupCortinas">
                    <div className={`especificacionCortina ${linea == 'screen' && 'checked'}`} onClick={() => {setLinea('screen'); deleteErrorMessage()}}>Screen</div>
                    <div className={`especificacionCortina ${linea == 'blackout' && 'checked'}`} onClick={() => {setLinea('blackout'); limpiarLineaScreen(); deleteErrorMessage()}}>Black out</div>
                    <div className={`especificacionCortina ${linea == 'vision' && 'checked'}`} onClick={() => {setLinea('vision'); limpiarLineaScreen(); deleteErrorMessage()}}>Stripe Vision</div>
                </div>
            </div>

            {linea == 'screen' &&
                (<div className="form-group-cortinas">
                    <p>LÍNEA</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${lineaScreen == 'shantung' && 'checked'}`} onClick={() => { setLineaScreen('shantung'); deleteErrorMessage() }}>Shantung</div>
                        <div className={`especificacionCortina ${lineaScreen == 'paris' && 'checked'}`} onClick={() => { setLineaScreen('paris'); deleteErrorMessage() }}>París</div>
                        <div className={`especificacionCortina ${lineaScreen == 'okiata' && 'checked'}`} onClick={() => { setLineaScreen('okiata'); deleteErrorMessage() }}>Okiata</div>
                    </div>
                </div>)
            }

            {linea == 'blackout' &&
                (<div className="form-group-cortinas">
                    <p>COLOR</p>
                    <div className="bodyFormGroupCortinas coloresCortinas columnasColores">
                        <div className="coloresAbajo">
                            <div className={`colorCortina ${color == 'negro' && 'colorChecked'}`}>
                                <label htmlFor="blackoutNegro">Negro</label>
                                <input id="blackoutNegro" type="button" className="blackoutNegro" onClick={() => { setColor('negro'); deleteErrorMessage() }} />
                            </div>
                            <div className={`colorCortina ${color == 'blanco' && 'colorChecked'}`}>
                                <label htmlFor="blackoutBlanco">Blanco</label>
                                <input id="blackoutBlanco" type="button" className="blackoutBlanco" onClick={() => { setColor('blanco'); deleteErrorMessage() }} />
                            </div>
                            <div className={`colorCortina ${color == 'beige' && 'colorChecked'}`}>
                                <label htmlFor="blackoutBeige">Beige</label>
                                <input id="blackoutBeige" type="button" className="blackoutBeige" onClick={() => { setColor('beige'); deleteErrorMessage() }} />
                            </div>
                            <div className={`colorCortina ${color == 'gris' && 'colorChecked'}`}>
                                <label htmlFor="blackoutGris">Gris</label>
                                <input id="blackoutGris" type="button" className="blackoutGris" onClick={() => { setColor('gris'); deleteErrorMessage() }} />
                            </div>
                        </div>
                    </div>
                </div>)
            }

            {linea == 'screen' &&
                (<div className="form-group-cortinas">
                    {lineaScreen == 'shantung' ?
                        (<>
                            <p>COLOR</p>
                            <div className="bodyFormGroupCortinas coloresCortinas columnasColores">
                                <div className="coloresAbajo">
                                    <div className={`colorCortina ${color == 'rosa' && 'colorChecked'}`}>
                                        <label htmlFor="shantungRosa">Rosa</label>
                                        <input id="shantungRosa" type="button" className="shantungRosa" onClick={() => {setColor('rosa'); deleteErrorMessage()}} />
                                    </div>
                                    <div className={`colorCortina ${color == 'gris' && 'colorChecked'}`}>
                                        <label htmlFor="shantungGris">Gris</label>
                                        <input id="shantungGris" type="button" className="shantungGris" onClick={() => {setColor('gris'); deleteErrorMessage()}} />
                                    </div>
                                </div>
                            </div>
                        </>)
                        :
                        (lineaScreen == 'paris' ?
                            (<>
                                <p>COLOR</p>
                                <div className="bodyFormGroupCortinas coloresCortinas columnasColores">
                                    <div className="coloresArriba">
                                        <div className={`colorCortina ${color == 'beige' && 'colorChecked'}`}>
                                            <label htmlFor="parisBeige">Beige</label>
                                            <input id="parisBeige" type="button" className="parisBeige" onClick={() => {setColor('beige'); deleteErrorMessage()}} />
                                        </div>
                                        <div className={`colorCortina ${color == 'celeste' && 'colorChecked'}`}>
                                            <label htmlFor="parisCeleste">Celeste</label>
                                            <input id="parisCeleste" type="button" className="parisCeleste" onClick={() => {setColor('celeste'); deleteErrorMessage()}} />
                                        </div>
                                        <div className={`colorCortina ${color == 'grisAgua' && 'colorChecked'}`}>
                                            <label htmlFor="parisGrisAgua">Gris Agua</label>
                                            <input id="parisGrisAgua" type="button" className="parisGrisAgua" onClick={() => {setColor('grisAgua'); deleteErrorMessage()}} />
                                        </div>

                                    </div>
                                    <div className="coloresMedio">
                                        <div className={`colorCortina ${color == 'verdeClaro' && 'colorChecked'}`}>
                                            <label htmlFor="parisVerdeClaro">Verde Claro</label>
                                            <input id="parisVerdeClaro" type="button" className="parisVerdeClaro" onClick={() => {setColor('verdeClaro'); deleteErrorMessage()}} />
                                        </div>
                                        <div className={`colorCortina ${color == 'blancoTrans' && 'colorChecked'}`}>
                                            <label htmlFor="parisBlancoTrans">Blanco Trans</label>
                                            <input id="parisBlancoTrans" type="button" className="parisBlancoTrans" onClick={() => {setColor('blancoTrans'); deleteErrorMessage()}} />
                                        </div>
                                        <div className={`colorCortina ${color == 'blanco' && 'colorChecked'}`}>
                                            <label htmlFor="parisBlanco">Blanco</label>
                                            <input id="parisBlanco" type="button" className="parisBlanco" onClick={() => {setColor('blanco'); deleteErrorMessage()}} />
                                        </div>
                                    </div>
                                    <div className="coloresAbajo">
                                        <div className={`colorCortina ${color == 'crema' && 'colorChecked'}`}>
                                            <label htmlFor="parisCrema">Crema</label>
                                            <input id="parisCrema" type="button" className="parisCrema" onClick={() => {setColor('crema'); deleteErrorMessage()}} />
                                        </div>
                                        <div className={`colorCortina ${color == 'naranja' && 'colorChecked'}`}>
                                            <label htmlFor="parisNaranja">Naranja</label>
                                            <input id="parisNaranja" type="button" className="parisNaranja" onClick={() => {setColor('naranja'); deleteErrorMessage()}} />
                                        </div>
                                        <div className={`colorCortina ${color == 'rojo' && 'colorChecked'}`}>
                                            <label htmlFor="parisRojo">Rojo</label>
                                            <input id="parisRojo" type="button" className="parisRojo" onClick={() => {setColor('rojo'); deleteErrorMessage()}} />
                                        </div>
                                    </div>
                                </div>
                            </>)
                            :
                            (lineaScreen == 'okiata' &&
                                (<>
                                    <p>COLOR</p>
                                    <div className="bodyFormGroupCortinas coloresCortinas columnasColores">
                                        <div className="coloresArriba">
                                            <div className={`colorCortina ${color == 'negroBeige' && 'colorChecked'}`}>
                                                <label htmlFor="okiataNegroBeige">Negro Beige</label>
                                                <input id="okiataNegroBeige" type="button" className="okiataNegroBeige" onClick={() => {setColor('negroBeige'); deleteErrorMessage()}} />
                                            </div>
                                            <div className={`colorCortina ${color == 'blanco' && 'colorChecked'}`}>
                                                <label htmlFor="okiataBlanco">Blanco</label>
                                                <input id="okiataBlanco" type="button" className="okiataBlanco" onClick={() => {setColor('blanco'); deleteErrorMessage()}} />
                                            </div>
                                            <div className={`colorCortina ${color == 'negro' && 'colorChecked'}`}>
                                                <label htmlFor="okiataNegro">Negro</label>
                                                <input id="okiataNegro" type="button" className="okiataNegro" onClick={() => {setColor('negro'); deleteErrorMessage()}} />
                                            </div>
                                            <div className={`colorCortina ${color == 'beige' && 'colorChecked'}`}>
                                                <label htmlFor="okiataBeige">Beige</label>
                                                <input id="okiataBeige" type="button" className="okiataBeige" onClick={() => {setColor('beige'); deleteErrorMessage()}} />
                                            </div>
                                        </div>
                                        <div className="coloresAbajo">
                                            <div className={`colorCortina ${color == 'blancoBeige' && 'colorChecked'}`}>
                                                <label htmlFor="okiataBlancoBeige">Blanco Beige</label>
                                                <input id="okiataBlancoBeige" type="button" className="okiataBlancoBeige" onClick={() => {setColor('blancoBeige'); deleteErrorMessage()}} />
                                            </div>
                                            <div className={`colorCortina ${color == 'blancoGris' && 'colorChecked'}`}>
                                                <label htmlFor="okiataBlancoGris">Blanco Gris</label>
                                                <input id="okiataBlancoGris" type="button" className="okiataBlancoGris" onClick={() => {setColor('blancoGris'); deleteErrorMessage()}} />
                                            </div>
                                            <div className={`colorCortina ${color == 'negroBronce' && 'colorChecked'}`}>
                                                <label htmlFor="okiataNegroBronce">Negro Bronce</label>
                                                <input id="okiataNegroBronce" type="button" className="okiataNegroBronce" onClick={() => {setColor('negroBronce'); deleteErrorMessage()}} />
                                            </div>
                                        </div>
                                    </div>
                                </>)
                            )
                        )
                    }
                </div>)
            }

            {linea == 'vision' &&
                (<div className="form-group-cortinas">
                    <p>COLOR</p>
                    <div className="bodyFormGroupCortinas coloresCortinas columnasColores">
                        <div className="coloresAbajo">
                            <div className={`colorCortina ${color == 'blanco' && 'colorChecked'}`}>
                                <label htmlFor="visionBlanco">Blanco</label>
                                <input id="visionBlanco" type="button" className="visionBlanco" onClick={() => {setColor('blanco'); deleteErrorMessage()}} />
                            </div>
                            <div className={`colorCortina ${color == 'lila' && 'colorChecked'}`}>
                                <label htmlFor="visionLila">Lila</label>
                                <input id="visionLila" type="button" className="visionLila" onClick={() => {setColor('lila'); deleteErrorMessage()}} />
                            </div>
                            <div className={`colorCortina ${color == 'negro' && 'colorChecked'}`}>
                                <label htmlFor="visionNegro">Negro</label>
                                <input id="visionNegro" type="button" className="visionNegro" onClick={() => {setColor('negro'); deleteErrorMessage()}} />
                            </div>
                        </div>
                    </div>
                </div>)
            }

            <div className="form-group-cortinas">
                <p>DIMENSIONES</p>
                <div className="bodyFormGroupCortinas">
                    <label className="especificacionCortina textoEspecificacionCortina" htmlFor="ancho">Ancho</label>
                    <input type="text"
                        id="ancho"
                        value={ancho}
                        onChange={(e) => { setAncho(e.target.value); deleteErrorMessage() }}
                        className="campotextoEspecificacionCortina"
                    />
                    <div id="textoAncho" className="especificacionCortina milimetrosCortinas"><p>mm.</p></div>

                    <label className="especificacionCortina textoEspecificacionCortina" htmlFor="alto">Alto</label>
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
                <p>MEDIDA INDICADA</p>
                <div className="bodyFormGroupCortinas">
                    <div className={`especificacionCortina ${alturaIndicada == 'ras' ? 'checked' : ''}`} onClick={() => { setAlturaIndicada('ras'); deleteErrorMessage() }}>Ras de guía</div>
                    <div className={`especificacionCortina ${alturaIndicada == 'fondo' ? 'checked' : ''}`} onClick={() => { setAlturaIndicada('fondo'); deleteErrorMessage() }}>Fondo de guía</div>
                    <label htmlFor="profundidadGuia" className="especificacionCortina textoEspecificacionCortina">Profundidad de guía</label>
                    <input
                        id="profundidadGuia"
                        value={profundidadGuia}
                        onChange={(e) => { setProfundidadGuia(e.target.value); deleteErrorMessage() }}
                        className="campotextoEspecificacionCortina"
                    />
                    <div id="textoAncho" className="especificacionCortina milimetrosCortinas"><p>mm.</p></div>
                </div>
            </div>

            <div className="form-group-cortinas">
                <p>MECANISMO</p>
                <div className="bodyFormGroupCortinas">
                    <div className={`especificacionCortina ${mecanismoRoller == 'manual' && 'checked'}`} onClick={() => {setMecanismoRoller('manual'); limpiarAccionadorMotorRoller(); deleteErrorMessage()}}>Manual</div>
                    <div className={`especificacionCortina ${mecanismoRoller == 'motor' && 'checked'}`} onClick={() => {setMecanismoRoller('motor'); limpiarLadoTirador(); deleteErrorMessage()}}>Motor</div>
                </div>
            </div>

            {mecanismoRoller == 'motor' &&
                (<div className="form-group-cortinas">
                    <p>ACCIONADOR</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${accionadorMotorRoller == 'tecla' && 'checked'}`} onClick={() => {setAccionadorMotorRoller('tecla'); deleteErrorMessage()}}>Tecla</div>
                        <div className={`especificacionCortina ${accionadorMotorRoller == 'controlRemoto' && 'checked'}`} onClick={() => {setAccionadorMotorRoller('controlRemoto'); deleteErrorMessage()}}>Control remoto</div>
                    </div>
                </div>)
            }

            {mecanismoRoller == 'manual' &&
                (<div className="form-group-cortinas">
                    <p>LADO DEL TIRADOR</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${ladoTirador == 'izquierda' && 'checked'}`} onClick={() => { setLadoTirador('izquierda'); deleteErrorMessage() }}>Izquierda</div>
                        <div className={`especificacionCortina ${ladoTirador == 'derecha' && 'checked'}`} onClick={() => { setLadoTirador('derecha'); deleteErrorMessage() }}>Derecha</div>
                    </div>
                </div>)
            }

            <div className="form-group-cortinas">
                <p>LADO DE CAIDA</p>
                <div className="bodyFormGroupCortinas">
                    <div className={`especificacionCortina ${caida == 'interior' && 'checked'}`} onClick={() => { setCaida('interior'); deleteErrorMessage()}}>Interior</div>
                    <div className={`especificacionCortina ${caida == 'exterior' && 'checked'}`} onClick={() => { setCaida('exterior'); deleteErrorMessage()}}>Exterior</div>
                </div>
            </div>

            <div className="form-group-cortinas">
                <p>COLOR DE ACCESORIOS</p>
                <div className="bodyFormGroupCortinas coloresCortinas columnasColores">
                    <div className="coloresAbajo">
                        <div className={`colorCortina ${colorAccesorios == 'gris' && 'colorChecked'}`}>
                            <label htmlFor="accesorioGris">Gris</label>
                            <input id="accesorioGris" type="button" className="accesorioGris" onClick={() => { setColorAccesorios('gris'); deleteErrorMessage() }}/>
                        </div>
                        <div className={`colorCortina ${colorAccesorios == 'beige' && 'colorChecked'}`}>
                            <label htmlFor="accesorioBeige">Beige</label>
                            <input id="accesorioBeige" type="button" className="accesorioBeige" onClick={() => { setColorAccesorios('beige'); deleteErrorMessage() }}/>
                        </div>
                        <div className={`colorCortina ${colorAccesorios == 'blanco' && 'colorChecked'}`}>
                            <label htmlFor="accesorioBlanco">Blanco</label>
                            <input id="accesorioBlanco" type="button" className="accesorioBlanco" onClick={() => { setColorAccesorios('blanco'); deleteErrorMessage() }}/>
                        </div>
                    </div>
                </div>
            </div>

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