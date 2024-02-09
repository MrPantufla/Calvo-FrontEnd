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

    return (
        <div className="contenedorPrincipalRoller">
                <div className="form-group-cortinas">
                    <p>COLOR</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${color == 'negro' ? 'checked' : ''}`} onClick={() => setColor('negro')}>Negro</div>
                        <div className={`especificacionCortina ${color == 'blanco' ? 'checked' : ''}`} onClick={() => setColor('blanco')}>Blanco</div>
                        <div className={`especificacionCortina ${color == 'beige' ? 'checked' : ''}`} onClick={() => setColor('beige')}>Beige</div>
                        <div className={`especificacionCortina ${color == 'gris' ? 'checked' : ''}`} onClick={() => setColor('gris')}>Gris</div>
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
                        <div className={`especificacionCortina ${alturaIndicada == 'vano' ? 'checked' : ''}`} onClick={() => setAlturaIndicada('vano')}>Vano</div>
                        <div className={`especificacionCortina ${alturaIndicada == 'abertura' ? 'checked' : ''}`} onClick={() => setAlturaIndicada('abertura')}>Abertura</div>
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>CON MECANISMO?</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoSi' ? 'checked' : ''}`} onClick={() => { setConMecanismo('mecanismoSi'); descelectCaidaRoller() }}>Si</div>
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoNo' ? 'checked' : ''}`} onClick={() => { setConMecanismo('mecanismoNo'); descelectCaidaRoller() }}>No</div>
                    </div>
                </div>

                {conMecanismo == 'mecanismoSi' &&
                    <>
                        <div className="form-group-cortinas">
                            <p>LADO DE CAIDA</p>
                            <div className="bodyFormGroupCortinas">
                                <div className={`especificacionCortina ${caida == 'interior' ? 'checked' : ''}`} onClick={() => setCaida("interior")}>Interior</div>
                                <div className={`especificacionCortina ${caida == 'exterior' ? 'checked' : ''}`} onClick={() => setCaida("exterior")}>Exterior</div>
                            </div>
                        </div>

                        <div className="form-group-cortinas">
                            <p>LADO DEL TIRADOR</p>
                            <div className="bodyFormGroupCortinas">
                                <div className={`especificacionCortina ${tirador == 'izquierdo' ? 'checked' : ''}`} onClick={() => setTirador("izquierdo")}>Izquierdo</div>
                                <div className={`especificacionCortina ${tirador == 'derecho' ? 'checked' : ''}`} onClick={() => setTirador("derecho")}>Derecho</div>
                            </div>
                        </div>
                    </>
                }
            <div className="botonEnviarConsultaContainer">
                <button className="botonEnviarConsulta">
                    Enviar consulta
                </button>
            </div>
        </div >
    );
}