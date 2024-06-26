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
        ladoMecanismo,
        setLadoMecanismo,
        tipoAccionador,
        setTipoAccionador,
        limpiarLadoMecanismo,
        limpiarTipoAccionador,
        limpiarLineaScreen,
        limpiarColor,
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

        if (linea == '' || (linea == 'screen' && lineaScreen == '') || color == '' || ancho == '' || alto == '' || mecanismoRoller == '' || ladoMecanismo == '' || (mecanismoRoller == 'motor' && tipoAccionador == '') || caida == '' || colorAccesorios == '') {
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
                "Tipo: ROLLER\n" +
                "Tipo roller: " + linea.toUpperCase() + "\n" +
                (linea == 'screen' ? (
                    `${"Linea: " + lineaScreen.toUpperCase() + "\n"}`
                ) : ('')) +
                "Color: " + color.toUpperCase() + "\n" +
                "Alto: " + alto + "mm\n" +
                "Ancho: " + ancho + "mm\n" +
                "Mecanismo: " + mecanismoRoller.toUpperCase() + "\n" +
                (mecanismoRoller == 'motor' ?
                    ("Accionador: " + (tipoAccionador == 'tecla' ? 'TECLA' : 'CONTROL REMOTO') + "\n" +
                    "Lado del mecanismo: " + ladoMecanismo.toUpperCase() + "\n")
                    :
                    ("Lado del tirador: " + ladoMecanismo.toUpperCase() + "\n")) +
                "Color de accesorios: " + colorAccesorios.toUpperCase() + "\n" +
                (aclaraciones !== '' ? ("\nAclaraciones: " + aclaraciones) : (""))
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
                    <button className={`especificacionCortina ${linea == 'screen' && 'checked'}`} onClick={() => { setLinea('screen'); limpiarColor(); deleteErrorMessage() }}>Screen</button>
                    <button className={`especificacionCortina ${linea == 'blackout' && 'checked'}`} onClick={() => { setLinea('blackout'); limpiarColor(); limpiarLineaScreen(); deleteErrorMessage() }}>Black out</button>
                    <button className={`especificacionCortina ${linea == 'vision' && 'checked'}`} onClick={() => { setLinea('vision'); limpiarColor(); limpiarLineaScreen(); deleteErrorMessage() }}>Stripe Vision</button>
                </div>
            </div>

            {linea == 'screen' &&
                (<div className="form-group-cortinas">
                    <p>LÍNEA</p>
                    <div className="bodyFormGroupCortinas">
                        <button className={`especificacionCortina ${lineaScreen == 'shantung' && 'checked'}`} onClick={() => { setLineaScreen('shantung'); limpiarColor(); deleteErrorMessage() }}>Shantung</button>
                        <button className={`especificacionCortina ${lineaScreen == 'paris' && 'checked'}`} onClick={() => { setLineaScreen('paris'); limpiarColor(); deleteErrorMessage() }}>París</button>
                        <button className={`especificacionCortina ${lineaScreen == 'okiata' && 'checked'}`} onClick={() => { setLineaScreen('okiata'); limpiarColor(); deleteErrorMessage() }}>Okiata</button>
                    </div>
                </div>)
            }

            {linea == 'blackout' &&
                (<div className="form-group-cortinas">
                    <p>COLOR</p>
                    <div className="bodyFormGroupCortinas coloresCortinas columnasColores">
                        <div className="coloresArriba">
                            <div className={`colorCortina ${color == 'negro' && 'colorChecked'}`}>
                                <label htmlFor="blackoutNegro">Negro</label>
                                <input id="blackoutNegro" type="button" className="blackoutNegro" onClick={() => { setColor('negro'); deleteErrorMessage() }} />
                            </div>
                            <div className={`colorCortina ${color == 'blanco' && 'colorChecked'}`}>
                                <label htmlFor="blackoutBlanco">Blanco</label>
                                <input id="blackoutBlanco" type="button" className="blackoutBlanco" onClick={() => { setColor('blanco'); deleteErrorMessage() }} />
                            </div>
                        </div>
                        <div className="coloresAbajo">
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
                (<>
                    {lineaScreen == 'shantung' ?
                        (<div className="form-group-cortinas">
                            <p>COLOR</p>
                            <div className="bodyFormGroupCortinas coloresCortinas columnasColores">
                                <div className="coloresAbajo">
                                    <div className={`colorCortina ${color == 'rosa' && 'colorChecked'}`}>
                                        <label htmlFor="shantungRosa">Rosa</label>
                                        <input id="shantungRosa" type="button" className="shantungRosa" onClick={() => { setColor('rosa'); deleteErrorMessage() }} />
                                    </div>
                                    <div className={`colorCortina ${color == 'gris' && 'colorChecked'}`}>
                                        <label htmlFor="shantungGris">Gris</label>
                                        <input id="shantungGris" type="button" className="shantungGris" onClick={() => { setColor('gris'); deleteErrorMessage() }} />
                                    </div>
                                </div>
                            </div>
                        </div>)
                        :
                        (lineaScreen == 'paris' ?
                            (<div className="form-group-cortinas">
                                <p>COLOR</p>
                                <div className="bodyFormGroupCortinas coloresCortinas columnasColores">
                                    <div className="coloresArriba">
                                        <div className={`colorCortina ${color == 'beige' && 'colorChecked'}`}>
                                            <label htmlFor="parisBeige">Beige</label>
                                            <input id="parisBeige" type="button" className="parisBeige" onClick={() => { setColor('beige'); deleteErrorMessage() }} />
                                        </div>
                                        <div className={`colorCortina ${color == 'celeste' && 'colorChecked'}`}>
                                            <label htmlFor="parisCeleste">Celeste</label>
                                            <input id="parisCeleste" type="button" className="parisCeleste" onClick={() => { setColor('celeste'); deleteErrorMessage() }} />
                                        </div>
                                        <div className={`colorCortina ${color == 'grisAgua' && 'colorChecked'}`}>
                                            <label htmlFor="parisGrisAgua">Gris Agua</label>
                                            <input id="parisGrisAgua" type="button" className="parisGrisAgua" onClick={() => { setColor('grisAgua'); deleteErrorMessage() }} />
                                        </div>

                                    </div>
                                    <div className="coloresMedio">
                                        <div className={`colorCortina ${color == 'naranja' && 'colorChecked'}`}>
                                            <label htmlFor="parisNaranja">Naranja</label>
                                            <input id="parisNaranja" type="button" className="parisNaranja" onClick={() => { setColor('naranja'); deleteErrorMessage() }} />
                                        </div>
                                        <div className={`colorCortina ${color == 'blancoTrans' && 'colorChecked'}`}>
                                            <label htmlFor="parisBlancoTrans">Blanco Trans</label>
                                            <input id="parisBlancoTrans" type="button" className="parisBlancoTrans" onClick={() => { setColor('blancoTrans'); deleteErrorMessage() }} />
                                        </div>
                                        <div className={`colorCortina ${color == 'rojo' && 'colorChecked'}`}>
                                            <label htmlFor="parisRojo">Rojo</label>
                                            <input id="parisRojo" type="button" className="parisRojo" onClick={() => { setColor('rojo'); deleteErrorMessage() }} />
                                        </div>
                                    </div>
                                    <div className="coloresAbajo">
                                        <div className={`colorCortina ${color == 'crema' && 'colorChecked'}`}>
                                            <label htmlFor="parisCrema">Crema</label>
                                            <input id="parisCrema" type="button" className="parisCrema" onClick={() => { setColor('crema'); deleteErrorMessage() }} />
                                        </div>
                                        <div className={`colorCortina ${color == 'verdeClaro' && 'colorChecked'}`}>
                                            <label htmlFor="parisVerdeClaro">Verde Claro</label>
                                            <input id="parisVerdeClaro" type="button" className="parisVerdeClaro" onClick={() => { setColor('verdeClaro'); deleteErrorMessage() }} />
                                        </div>


                                        <div className={`colorCortina ${color == 'blanco' && 'colorChecked'}`}>
                                            <label htmlFor="parisBlanco">Blanco</label>
                                            <input id="parisBlanco" type="button" className="parisBlanco" onClick={() => { setColor('blanco'); deleteErrorMessage() }} />
                                        </div>
                                    </div>
                                </div>
                            </div>)
                            :
                            (lineaScreen == 'okiata' &&
                                (<div className="form-group-cortinas">
                                    <p>COLOR</p>
                                    <div className="bodyFormGroupCortinas coloresCortinas columnasColores">
                                        <div className="coloresArriba">

                                            <div className={`colorCortina ${color == 'blanco' && 'colorChecked'}`}>
                                                <label htmlFor="okiataBlanco">Blanco</label>
                                                <input id="okiataBlanco" type="button" className="okiataBlanco" onClick={() => { setColor('blanco'); deleteErrorMessage() }} />
                                            </div>
                                            <div className={`colorCortina ${color == 'negro' && 'colorChecked'}`}>
                                                <label htmlFor="okiataNegro">Negro</label>
                                                <input id="okiataNegro" type="button" className="okiataNegro" onClick={() => { setColor('negro'); deleteErrorMessage() }} />
                                            </div>
                                            <div className={`colorCortina ${color == 'beige' && 'colorChecked'}`}>
                                                <label htmlFor="okiataBeige">Beige</label>
                                                <input id="okiataBeige" type="button" className="okiataBeige" onClick={() => { setColor('beige'); deleteErrorMessage() }} />
                                            </div>
                                        </div>
                                        <div className="coloresMedio">
                                            <div className={`colorCortina ${color == 'negroBeige' && 'colorChecked'}`}>
                                                <label htmlFor="okiataNegroBeige">Negro Beige</label>
                                                <input id="okiataNegroBeige" type="button" className="okiataNegroBeige" onClick={() => { setColor('negroBeige'); deleteErrorMessage() }} />
                                            </div>
                                            <div className={`colorCortina ${color == 'negroBronce' && 'colorChecked'}`}>
                                                <label htmlFor="okiataNegroBronce">Negro Bronce</label>
                                                <input id="okiataNegroBronce" type="button" className="okiataNegroBronce" onClick={() => { setColor('negroBronce'); deleteErrorMessage() }} />
                                            </div>
                                        </div>
                                        <div className="coloresAbajo">
                                            <div className={`colorCortina ${color == 'blancoBeige' && 'colorChecked'}`}>
                                                <label htmlFor="okiataBlancoBeige">Blanco Beige</label>
                                                <input id="okiataBlancoBeige" type="button" className="okiataBlancoBeige" onClick={() => { setColor('blancoBeige'); deleteErrorMessage() }} />
                                            </div>
                                            <div className={`colorCortina ${color == 'blancoGris' && 'colorChecked'}`}>
                                                <label htmlFor="okiataBlancoGris">Blanco Gris</label>
                                                <input id="okiataBlancoGris" type="button" className="okiataBlancoGris" onClick={() => { setColor('blancoGris'); deleteErrorMessage() }} />
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>)
                            )
                        )
                    }
                </>)
            }

            {linea == 'vision' &&
                (<div className="form-group-cortinas">
                    <p>COLOR</p>
                    <div className="bodyFormGroupCortinas coloresCortinas columnasColores">
                        <div className="coloresAbajo">
                            <div className={`colorCortina ${color == 'blanco' && 'colorChecked'}`}>
                                <label htmlFor="visionBlanco">Blanco</label>
                                <input id="visionBlanco" type="button" className="visionBlanco" onClick={() => { setColor('blanco'); deleteErrorMessage() }} />
                            </div>
                            <div className={`colorCortina ${color == 'lila' && 'colorChecked'}`}>
                                <label htmlFor="visionLila">Lila</label>
                                <input id="visionLila" type="button" className="visionLila" onClick={() => { setColor('lila'); deleteErrorMessage() }} />
                            </div>
                            <div className={`colorCortina ${color == 'negro' && 'colorChecked'}`}>
                                <label htmlFor="visionNegro">Negro</label>
                                <input id="visionNegro" type="button" className="visionNegro" onClick={() => { setColor('negro'); deleteErrorMessage() }} />
                            </div>
                        </div>
                    </div>
                </div>)
            }

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
                <p>MECANISMO</p>
                <div className="bodyFormGroupCortinas">
                    <button className={`especificacionCortina ${mecanismoRoller == 'manual' && 'checked'}`} onClick={() => { setMecanismoRoller('manual'); limpiarTipoAccionador(); deleteErrorMessage() }}>Manual</button>
                    <button className={`especificacionCortina ${mecanismoRoller == 'motor' && 'checked'}`} onClick={() => { setMecanismoRoller('motor'); limpiarLadoMecanismo(); deleteErrorMessage() }}>Motor</button>
                </div>
            </div>

            {mecanismoRoller == 'motor' &&
                (<>
                <div className="form-group-cortinas">
                    <p>LADO DEL MECANISMO</p>
                    <div className="bodyFormGroupCortinas">
                        <button className={`especificacionCortina ${ladoMecanismo == 'izquierda' && 'checked'}`} onClick={() => { setLadoMecanismo('izquierda'); deleteErrorMessage() }}>Izquierda</button>
                        <button className={`especificacionCortina ${ladoMecanismo == 'derecha' && 'checked'}`} onClick={() => { setLadoMecanismo('derecha'); deleteErrorMessage() }}>Derecha</button>
                    </div>
                </div>
                <div className="form-group-cortinas">
                    <p>ACCIONADOR</p>
                    <div className="bodyFormGroupCortinas">
                        <button className={`especificacionCortina ${tipoAccionador == 'tecla' && 'checked'}`} onClick={() => { setTipoAccionador('tecla'); deleteErrorMessage() }}>Tecla</button>
                        <button className={`especificacionCortina ${tipoAccionador == 'controlRemoto' && 'checked'}`} onClick={() => { setTipoAccionador('controlRemoto'); deleteErrorMessage() }}>Control remoto</button>
                    </div>
                </div>
                </>)
            }

            {mecanismoRoller == 'manual' &&
                (<div className="form-group-cortinas">
                    <p>LADO DEL TIRADOR</p>
                    <div className="bodyFormGroupCortinas">
                        <button className={`especificacionCortina ${ladoMecanismo == 'izquierda' && 'checked'}`} onClick={() => { setLadoMecanismo('izquierda'); deleteErrorMessage() }}>Izquierda</button>
                        <button className={`especificacionCortina ${ladoMecanismo == 'derecha' && 'checked'}`} onClick={() => { setLadoMecanismo('derecha'); deleteErrorMessage() }}>Derecha</button>
                    </div>
                </div>)
            }

            <div className="form-group-cortinas">
                <p>LADO DE CAIDA</p>
                <div className="bodyFormGroupCortinas">
                    <button className={`especificacionCortina ${caida == 'interior' && 'checked'}`} onClick={() => { setCaida('interior'); deleteErrorMessage() }}>Interior</button>
                    <button className={`especificacionCortina ${caida == 'exterior' && 'checked'}`} onClick={() => { setCaida('exterior'); deleteErrorMessage() }}>Exterior</button >
                </div>
            </div>

            <div className="form-group-cortinas">
                <p>COLOR DE ACCESORIOS</p>
                <div className="bodyFormGroupCortinas coloresCortinas columnasColores">
                    <div className="coloresArriba">
                        <div className={`colorCortina ${colorAccesorios == 'gris' && 'colorChecked'}`}>
                            <label htmlFor="accesorioGris">Gris</label>
                            <input id="accesorioGris" type="button" className="accesorioGris" onClick={() => { setColorAccesorios('gris'); deleteErrorMessage() }} />
                        </div>
                        <div className={`colorCortina ${colorAccesorios == 'beige' && 'colorChecked'}`}>
                            <label htmlFor="accesorioBeige">Beige</label>
                            <input id="accesorioBeige" type="button" className="accesorioBeige" onClick={() => { setColorAccesorios('beige'); deleteErrorMessage() }} />
                        </div>
                    </div>
                    <div className="coloresAbajo">
                        <div className={`colorCortina ${colorAccesorios == 'blanco' && 'colorChecked'}`}>
                            <label htmlFor="accesorioBlanco">Blanco</label>
                            <input id="accesorioBlanco" type="button" className="accesorioBlanco" onClick={() => { setColorAccesorios('blanco'); deleteErrorMessage() }} />
                        </div>
                        <div className={`colorCortina ${colorAccesorios == 'negro' && 'colorChecked'}`}>
                            <label htmlFor="accesorioNegro">Negro</label>
                            <input id="accesorioNegro" type="button" className="accesorioNegro" onClick={() => { setColorAccesorios('negro'); deleteErrorMessage() }} />
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