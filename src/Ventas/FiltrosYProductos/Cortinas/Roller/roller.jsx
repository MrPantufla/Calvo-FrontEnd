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
        setTirador
    } = useCortinas();

    return (
        <div className="contenedorPrincipalRoller">
            <form>
                <input type="radio" id="negro" name="radioColor" value="negro" checked={() => setColor('negro')} />
                <label for="negro">Negro</label>

                <input type="radio" id="blanco" name="radioColor" value="blanco" checked={() => setColor('blanco')} />
                <label for="blanco">Blanco</label>

                <input type="radio" id="beige" name="radioColor" value="beige" checked={() => setColor('beige')} />
                <label for="beige">Beige</label>

                <input type="radio" id="gris" name="radioColor" value="gris" checked={() => setColor('gris')} />
                <label for="gris">Gris</label>
            </form>
        </div>
    );
}