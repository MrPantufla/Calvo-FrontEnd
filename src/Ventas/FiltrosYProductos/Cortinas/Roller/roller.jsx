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
            <form className="color">
                <label htmlFor="negro">Negro</label>
                <input type="radio" id="negro" name="radioColor" value="negro" onChange={() => setColor('negro')} />

                <label htmlFor="blanco">Blanco</label>
                <input type="radio" id="blanco" name="radioColor" value="blanco" onChange={() => setColor('blanco')} />

                <label htmlFor="beige">Beige</label>
                <input type="radio" id="beige" name="radioColor" value="beige" onChange={() => setColor('beige')} />

                <label htmlFor="gris">Gris</label>
                <input type="radio" id="gris" name="radioColor" value="gris" onChange={() => setColor('gris')} />
            </form>
            <form className="mecanismo">
                <label htmlFor="mecanismoSi">Si</label>
                <input type="radio"
                    id="mecanismoSi"
                    name="radioMecanismo"
                    value="mecanismoSi"
                    onChange={() => { setConMecanismo(true); descelectCaidaRoller() }}
                />

                <label htmlFor="mecanismoNo">No</label>
                <input type="radio"
                    id="mecanismoNo"
                    name="radioMecanismo"
                    value="mecanismoNo"
                    onChange={() => { setConMecanismo(false); descelectCaidaRoller() }}
                />
            </form>

            <form className="formularioDimensiones">
                <label htmlFor="alto">Alto(milímetros)</label>
                <input type="text"
                    id="alto"
                    value={alto}
                    onChange={(e) => setAlto(e.target.value)}
                />

                <label htmlFor="ancho">Ancho(milímetros)</label>
                <input type="text"
                    id="ancho"
                    value={ancho}
                    onChange={(e) => setAncho(e.target.value)}
                />
            </form>
            <form className="alturaIndicada">
                <label htmlFor="vano">Vano</label>
                <input type="radio"
                    id="vano"
                    name="radioAlturaIndicada"
                    value="vano"
                    onChange={() => setAlturaIndicada("vano")}
                />

                <label htmlFor="abertura">Abertura</label>
                <input type="radio"
                    id="abertura"
                    name="radioAlturaIndicada"
                    value="abertura"
                    onChange={() => setAlturaIndicada("abertura")}
                />
            </form>
            {conMecanismo &&
                <>
                    <form className="caida">
                        <label htmlFor="interor">Interior</label>
                        <input type="radio"
                            id="interior"
                            name="radioCaida"
                            value="interior"
                            onChange={() => setCaida("interior")}
                        />

                        <label htmlFor="exterior">Exterior</label>
                        <input type="radio"
                            id="exterior"
                            name="radioCaida"
                            value="exterior"
                            onChange={() => setAlturaIndicada("exterior")}
                        />
                    </form>

                    <form className="tirador">
                        <label htmlFor="izquierdo">Izquierdo</label>
                        <input type="radio"
                            id="izquierdo"
                            name="radioTirador"
                            value="izquierdo"
                            onChange={() => setTirador("izquierdo")}
                        />

                        <label htmlFor="derecho">Derecho</label>
                        <input type="radio"
                            id="derecho"
                            name="radioTirador"
                            value="derecho"
                            onChange={() => setTirador("derecho")}
                        />
                    </form>
                </>
            }
            <button className="botonEnviarRoller botonCortinas">Enviar consulta</button>
        </div >
    );
}