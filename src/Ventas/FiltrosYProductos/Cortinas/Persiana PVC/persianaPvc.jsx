import './persianaPvc.css';
import { useCortinas } from '../../../../contextCortinas.jsx';

export default function PersianaPvc() {

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
        setTipoEnrollador,
        descelectEnrolladorPersianaPvc,
        limpiarPersianaPvc,
    } = useCortinas();

    return (
        <div className="contenedorPrincipalPersianaPvc">
            <form className="formularioPersianaPvc">
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
                        <div className={`especificacionCortina ${alturaIndicada == 'vano' ? 'checked' : ''}`} onClick={() => setAlturaIndicada("vano")}>Vano</div>
                        <div className={`especificacionCortina ${alturaIndicada == 'abertura' ? 'checked' : ''}`} onClick={() => setAlturaIndicada("abertura")}>Abertura</div>
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>CON MECANISMO?</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoSi' ? 'checked' : ''}`} onClick={() => setConMecanismo('mecanismoSi')}>Si</div>
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoNo' ? 'checked' : ''}`} onClick={() => { setConMecanismo('mecanismoNo'); descelectEnrolladorPersianaPvc() }}>No</div>
                    </div>
                </div>

                {conMecanismo == 'mecanismoSi' &&
                    <div className="form-group-cortinas">
                        <p>TIPO DE MECANISMO</p>
                        <div className="bodyFormGroupCortinas">
                            <div className={`especificacionCortina ${tipoEnrollador == 'cinta' ? 'checked' : ''}`} onClick={() => setTipoEnrollador("cinta")}>Cinta</div>
                            <div className={`especificacionCortina ${tipoEnrollador == 'antonetti' ? 'checked' : ''}`} onClick={() => setTipoEnrollador("antonetti")}>Antonetti</div>
                        </div>
                    </div>}
            </form>
            <div className="botonEnviarConsultaContainer">
                <button className="botonEnviarConsulta">
                    Enviar consulta
                </button>
            </div>
        </div>
    );
}