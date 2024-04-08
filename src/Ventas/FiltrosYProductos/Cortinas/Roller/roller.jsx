import './roller.css';
import { useCortinas } from '../../../../contextCortinas.jsx';
import { useEffect } from 'react';
import { useAuth } from '../../../../contextLogin.jsx';

export default function Roller() {
    const {
        alto,
        setAlto,
        tipoRoller,
        setTipoRoller,
        tipoScreen,
        setTipoScreen,
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
        descelectCaidaRoller,
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
        teclaRoller,
        setTeclaRoller,
        controlRemotoRoller,
        setControlRemotoRoller
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
                        "LADO DEL TIRADOR: " + (ladoTirador ? ladoTirador : 'A consultar')
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
                <p>TIPO DE CORTINA</p>
                <div className="bodyFormGroupCortinas">
                    <div className={`especificacionCortina ${tipoRoller == 'screen' && 'checked'}`} onClick={() => setTipoRoller('screen')}>Screen</div>
                    <div className={`especificacionCortina ${tipoRoller == 'blackout' && 'checked'}`} onClick={() => setTipoRoller('blackout')}>Black out</div>
                    <div className={`especificacionCortina ${tipoRoller == 'vision' && 'checked'}`} onClick={() => setTipoRoller('vision')}>Vision</div>
                </div>
            </div>

            {tipoRoller == 'screen' &&
                (<div className="form-group-cortinas">
                    <p>LÍNEA</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${tipoScreen == 'shantung' && 'checked'}`} onClick={() => { setTipoScreen('shantung'); deleteErrorMessage() }}>Shantung</div>
                        <div className={`especificacionCortina ${tipoScreen == 'paris' && 'checked'}`} onClick={() => { setTipoScreen('paris'); deleteErrorMessage() }}>París</div>
                        <div className={`especificacionCortina ${tipoScreen == 'okiata' && 'checked'}`} onClick={() => { setTipoScreen('okiata'); deleteErrorMessage() }}>Okiata</div>
                    </div>
                </div>)
            }

            {tipoRoller == 'blackout' &&
                (<div className="form-group-cortinas">
                    <p>COLOR</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`negro especificacionCortina ${color == 'negro' && 'checked'}`} onClick={() => { setColor(color !== 'negro' ? 'negro' : ''); deleteErrorMessage() }}>Negro</div>
                        <div className={`blanco especificacionCortina ${color == 'blanco' && 'checked'}`} onClick={() => { setColor(color !== 'blanco' ? 'blanco' : ''); deleteErrorMessage() }}>Blanco</div>
                        <div className={`beige especificacionCortina ${color == 'beige' && 'checked'}`} onClick={() => { setColor(color !== 'beige' ? 'beige' : ''); deleteErrorMessage() }}>Beige</div>
                        <div className={`gris especificacionCortina ${color == 'gris' && 'checked'}`} onClick={() => { setColor(color !== 'gris' ? 'gris' : ''); deleteErrorMessage() }}>Gris</div>
                    </div>
                </div>)
            }

            {tipoRoller == 'screen' &&
                (<div className="form-group-cortinas">
                    {tipoScreen == 'shantung' ?
                        (<>
                            <p>COLOR</p>
                            <div className="bodyFormGroupCortinas coloresCortinas">
                                <div className={`especificacionCortina shantungRosa ${color == 'rosa' && 'colorChecked'}`} onClick={() => setColor('rosa')}>Rosa</div>
                                <div className={`especificacionCortina shantungGris ${color == 'gris' && 'colorChecked'}`} onClick={() => setColor('gris')}>Gris</div>
                            </div>
                        </>)
                        :
                        (tipoScreen == 'paris' ?
                            (<>
                                <p>COLOR</p>
                                <div className="bodyFormGroupCortinas coloresCortinas">
                                    <div className="coloresArriba">
                                        <div className={`especificacionCortina parisBeige ${color == 'beige' && 'colorChecked'}`} onClick={() => setColor('beige')}>Beige</div>
                                        <div className={`especificacionCortina parisCeleste ${color == 'celeste' && 'colorChecked'}`} onClick={() => setColor('celeste')}>Celeste</div>
                                        <div className={`especificacionCortina parisGrisAgua ${color == 'grisAgua' && 'colorChecked'}`} onClick={() => setColor('grisAgua')}>Gris Agua</div>
                                        <div className={`especificacionCortina parisVerdeClaro ${color == 'verdeClaro' && 'colorChecked'}`} onClick={() => setColor('verdeClaro')}>Verde Claro</div>
                                        <div className={`especificacionCortina parisBlancoTrans ${color == 'blancoTrans' && 'colorChecked'}`} onClick={() => setColor('blancoTrans')}>Blanco Trans</div>
                                    </div>
                                    <div className="coloresAbajo">
                                        <div className={`especificacionCortina parisBlanco ${color == 'blanco' && 'colorChecked'}`} onClick={() => setColor('blanco')}>Blanco</div>
                                        <div className={`especificacionCortina parisCrema ${color == 'crema' && 'colorChecked'}`} onClick={() => setColor('crema')}>Crema</div>
                                        <div className={`especificacionCortina parisNaranja ${color == 'naranja' && 'colorChecked'}`} onClick={() => setColor('naranja')}>Naranja</div>
                                        <div className={`especificacionCortina parisRojo ${color == 'rojo' && 'colorChecked'}`} onClick={() => setColor('rojo')}>Rojo</div>
                                    </div>
                                </div>
                            </>)
                            :
                            (tipoScreen == 'okiata' &&
                                (<>
                                    <p>COLOR</p>
                                    <div className="bodyFormGroupCortinas coloresCortinas">
                                        <div className="coloresArriba">
                                            <div className={`especificacionCortina okiataNegroBeige ${color == 'negroBeige' && 'colorChecked'}`} onClick={() => setColor('negroBeige')}>Negro Beige</div>
                                            <div className={`especificacionCortina okiataBlanco ${color == 'blanco' && 'colorChecked'}`} onClick={() => setColor('blanco')}>Blanco</div>
                                            <div className={`especificacionCortina okiataNegro ${color == 'negro' && 'colorChecked'}`} onClick={() => setColor('negro')}>Negro</div>
                                            <div className={`especificacionCortina okiataBeige ${color == 'beige' && 'colorChecked'}`} onClick={() => setColor('beige')} melon>Beige</div>
                                        </div>
                                        <div className="coloresAbajo">
                                        <div className={`especificacionCortina okiataBlancoBeige ${color == 'blancoBeige' && 'colorChecked'}`} onClick={() => setColor('blancoBeige')}>Blanco Beige</div>
                                            <div className={`especificacionCortina okiataBlancoGris ${color == 'blancoGris' && 'colorChecked'}`} onClick={() => setColor('blancoGris')}>Blanco Gris</div>
                                            <div className={`especificacionCortina okiataNegroBronce ${color == 'negroBronce' && 'colorChecked'}`} onClick={() => setColor('negroBronce')}>Negro Bronce</div>
                                        </div>
                                    </div>
                                </>)
                            )
                        )
                    }
                </div>)
            }

            {tipoRoller == 'vision' &&
                (<div className="form-group-cortinas">
                    <p>COLOR</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${color == 'blanco' && 'checked'}`} onClick={() => setColor('blanco')}>Blanco</div>
                        <div className={`especificacionCortina ${color == 'lila' && 'checked'}`} onClick={() => setColor('lila')}>Lila</div>
                        <div className={`especificacionCortina ${color == 'negro' && 'checked'}`} onClick={() => setColor('negro')}>negro</div>
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
                    <div className={`especificacionCortina ${mecanismoRoller == 'manual' && 'checked'}`} onClick={() => setMecanismoRoller('manual')}>Manual</div>
                    <div className={`especificacionCortina ${mecanismoRoller == 'motor' && 'checked'}`} onClick={() => setMecanismoRoller('motor')}>Motor</div>
                </div>
            </div>

            {mecanismoRoller == 'motor' &&
                (<div className="form-group-cortinas">
                    <p>ACCIONADOR</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${teclaRoller == true && 'checked'}`} onClick={() => setTeclaRoller(!teclaRoller)}>Tecla</div>
                        <div className={`especificacionCortina ${controlRemotoRoller == true && 'checked'}`} onClick={() => setControlRemotoRoller(!controlRemotoRoller)}>Control remoto</div>
                    </div>
                </div>)
            }

            <div className="form-group-cortinas">
                <p>COLOR DE ACCESORIOS</p>
                <div className="bodyFormGroupCortinas">
                    <div className={`especificacionCortina ${colorAccesorios == 'gris' && 'checked'}`} onClick={() => { setColorAccesorios('gris'); deleteErrorMessage() }}>Gris</div>
                    <div className={`especificacionCortina ${colorAccesorios == 'beige' && 'checked'}`} onClick={() => { setColorAccesorios('beige'); deleteErrorMessage() }}>Beige</div>
                    <div className={`especificacionCortina ${colorAccesorios == 'blanco' && 'checked'}`} onClick={() => { setColorAccesorios('blanco'); deleteErrorMessage() }}>Blanco</div>
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
                <button className="botonEnviarConsulta" onClick={() => { state.logueado ? enviarConsulta() : setMostrarLogin(true) }}>
                    Enviar consulta
                </button>
            </div>
        </div>
    );
}