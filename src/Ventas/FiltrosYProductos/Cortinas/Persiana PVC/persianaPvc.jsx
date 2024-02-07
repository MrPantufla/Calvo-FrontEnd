import './persianaPvc.css';
import { useCortinas } from '../../../../contextCortinas.jsx';

export default function PersianaPvc(){

    const {
        alto, 
        setAlto, 
        ancho, 
        setAncho, 
        conMecanismo, 
        setConMecanismo, 
        alturaIndicada, 
        setAlturaIndicada,
        tipoEnrollador, 
        setTipoEnrollador
    } = useCortinas();

    return(
        <div className="contenedorPrincipalPersianaPvc">
            <form className="mecanismo">
                <label htmlFor="mecanismoSi">Si</label>
                <input type="radio"
                    id="mecanismoSi"
                    name="radioMecanismo"
                    value="mecanismoSi"
                    onChange={() => { setConMecanismo(true)}} 
                />

                <label htmlFor="mecanismoNo">No</label>
                <input type="radio"
                    id="mecanismoNo"
                    name="radioMecanismo"
                    value="mecanismoNo"
                    onChange={() => { setConMecanismo(false)}}
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
            <form className="enrollador">
                <label htmlFor="cinta">Cinta</label>
                <input type="radio"
                    id="cinta"
                    name="radioEnrollador"
                    value="cinta"
                    onChange={() => setTipoEnrollador("cinta")}
                />

                <label htmlFor="cinta">Antonetti</label>
                <input type="radio"
                    id="antonetti"
                    name="radioEnrollador"
                    value="antonetti"
                    onChange={() => setTipoEnrollador("antonetti")}
                />
            </form>}
            <button className="botonEnviarCortinaPvc botonCortinas">
                Enviar consulta
            </button>
        </div>
    );
}