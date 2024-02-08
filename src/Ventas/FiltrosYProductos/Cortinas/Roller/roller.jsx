import './roller.css';
import { useCortinas } from '../../../../contextCortinas.jsx';

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

    const labels = document.querySelectorAll('.bodyFormGroupCortinas label');

    labels.forEach(label => {
        const inputId = label.getAttribute('for');
        const input = document.getElementById(inputId);

        if (input) {
            if (input.checked) {
                label.classList.add('checked');
            }
        }

        if (input) {
            input.addEventListener('change', function () {
                if (this.checked) {
                    labels.forEach(otherLabel => otherLabel.classList.remove('checked'));
                    label.classList.add('checked');
                } else {
                    label.classList.remove('checked');
                }
            });
        }
    });

    return (
        <div className="contenedorPrincipalRoller">
            <form className="formularioRoller">
                <div className="form-group-cortinas">
                    <p>COLOR</p>
                    <div className="bodyFormGroupCortinas">
                        <label htmlFor="negro">Negro</label>
                        <input type="radio" id="negro" name="radioColor" value="negro" onChange={() => setColor('negro')}/>

                        <label htmlFor="blanco">Blanco</label>
                        <input type="radio" id="blanco" name="radioColor" value="blanco" onChange={() => setColor('blanco')} />

                        <label htmlFor="beige">Beige</label>
                        <input type="radio" id="beige" name="radioColor" value="beige" onChange={() => setColor('beige')} />

                        <label htmlFor="gris">Gris</label>
                        <input type="radio" id="gris" name="radioColor" value="gris" onChange={() => setColor('gris')} />
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>DIMENSIONES</p>
                    <div className="bodyFormGroupCortinas">
                        <label htmlFor="alto">Alto</label>
                        <input type="text"
                            id="alto"
                            value={alto}
                            onChange={(e) => setAlto(e.target.value)}
                        />

                        <label htmlFor="ancho">Ancho</label>
                        <input type="text"
                            id="ancho"
                            value={ancho}
                            onChange={(e) => setAncho(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>MEDIDA INDICADA</p>
                    <div className="bodyFormGroupCortinas">
                        <label htmlFor="vano">Vano</label>
                        <input type="radio"
                            id="vano"
                            name="radioAlturaIndicada"
                            value="vano"
                            checked={alturaIndicada == 'vano'}
                            onChange={() => setAlturaIndicada('vano')}
                        />

                        <label htmlFor="abertura">Abertura</label>
                        <input type="radio"
                            id="abertura"
                            name="radioAlturaIndicada"
                            value="abertura"
                            checked={alturaIndicada == 'abertura'}
                            onChange={() => setAlturaIndicada("abertura")}
                        />
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>CON MECANISMO?</p>
                    <div className="bodyFormGroupCortinas">
                        <label htmlFor="mecanismoSi">Si</label>
                        <input type="radio"
                            id="mecanismoSi"
                            name="radioMecanismo"
                            value="mecanismoSi"
                            checked={conMecanismo == 'mecanismoSi'}
                            onChange={() => { setConMecanismo('mecanismoSi'); descelectCaidaRoller() }}
                        />

                        <label htmlFor="mecanismoNo">No</label>
                        <input type="radio"
                            id="mecanismoNo"
                            name="radioMecanismo"
                            value="mecanismoNo"
                            checked={conMecanismo == 'mecanismoNo'}
                            onChange={() => { setConMecanismo('mecanismoNo'); descelectCaidaRoller() }}
                        />
                    </div>
                </div>

                {conMecanismo &&
                    <>
                        <div className="form-group-cortinas">
                            <p>LADO DE CAIDA</p>
                            <div className="bodyFormGroupCortinas">
                                <label htmlFor="interior">Interior</label>
                                <input type="radio"
                                    id="interior"
                                    name="radioCaida"
                                    value="interior"
                                    checked={caida == 'interior'}
                                    onChange={() => setCaida("interior")}
                                />

                                <label htmlFor="exterior">Exterior</label>
                                <input type="radio"
                                    id="exterior"
                                    name="radioCaida"
                                    value="exterior"
                                    checked={caida == 'exterior'}
                                    onChange={() => setCaida("exterior")}
                                />
                            </div>
                        </div>

                        <div className="form-group-cortinas">
                            <p>LADO DEL TIRADOR</p>
                            <div className="bodyFormGroupCortinas">
                                <label htmlFor="izquierdo">Izquierdo</label>
                                <input type="radio"
                                    id="izquierdo"
                                    name="radioTirador"
                                    value="izquierdo"
                                    checked={tirador == 'izquierdo'}
                                    onChange={() => setTirador("izquierdo")}
                                />

                                <label htmlFor="derecho">Derecho</label>
                                <input type="radio"
                                    id="derecho"
                                    name="radioTirador"
                                    value="derecho"
                                    checked={tirador == 'derecho'}
                                    onChange={() => setTirador("derecho")}
                                />
                            </div>
                        </div>
                    </>
                }
            </form>
            <div className="botonEnviarConsultaContainer">
                <button className="botonEnviarConsulta">
                    Enviar consulta
                </button>
            </div>
        </div >
    );
}