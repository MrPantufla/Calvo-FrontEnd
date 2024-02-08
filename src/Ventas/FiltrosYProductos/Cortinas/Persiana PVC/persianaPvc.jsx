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
                        <label htmlFor="vano" className={alturaIndicada === 'vano' ? 'selected' : 'xd'}>Vano</label>
                        <input type="radio"
                            id="vano"
                            name="radioAlturaIndicada"
                            checked={alturaIndicada == 'vano'}
                            onChange={() => setAlturaIndicada("vano")}
                        />

                        <label htmlFor="abertura" className={alturaIndicada == 'abertura' ? 'selected' : ''}>Abertura</label>
                        <input type="radio"
                            id="abertura"
                            name="radioAlturaIndicada"
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
                            checked={conMecanismo == 'mecanismoSi'}
                            onChange={() => setConMecanismo('mecanismoSi')}
                        />

                        <label htmlFor="mecanismoNo">No</label>
                        <input type="radio"
                            id="mecanismoNo"
                            name="radioMecanismo"
                            checked={conMecanismo == 'mecanismoNo'}
                            onChange={() => { setConMecanismo('mecanismoNo'); descelectEnrolladorPersianaPvc() }}
                        />
                    </div>
                </div>

                {conMecanismo &&
                    <div className="form-group-cortinas">
                        <p>TIPO DE MECANISMO</p>
                        <div className="bodyFormGroupCortinas">
                            <label htmlFor="cinta">Cinta</label>
                            <input type="radio"
                                id="cinta"
                                name="radioEnrollador"
                                checked={tipoEnrollador == 'cinta'}
                                onChange={() => setTipoEnrollador("cinta")}
                            />

                            <label htmlFor="antonetti">Antonetti</label>
                            <input type="radio"
                                id="antonetti"
                                name="radioEnrollador"
                                checked={tipoEnrollador == 'antonetti'}
                                onChange={() => setTipoEnrollador("antonetti")}
                            />
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