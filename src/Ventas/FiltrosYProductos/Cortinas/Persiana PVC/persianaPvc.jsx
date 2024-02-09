import './persianaPvc.css';
import { useCortinas } from '../../../../contextCortinas.jsx';
import { useEffect, useState } from 'react';

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

    const [errorMessage, setErrorMessage] = useState('');

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

    const enviarConsulta = () =>{
        const enterosRegex = /[0-9]/;

        if(!alto || !ancho || !conMecanismo || !tipoEnrollador){
            setErrorMessage("Por favor, completa todos los campos obligatorios");
        }
        else{
            //FETCH
        }
    }

    return (
        <div className="contenedorPrincipalPersianaPvc">
            <div className="errorMessageContainer">
                <p className="errorFormulario">{errorMessage}</p>
            </div>
            <form className="formularioPersianaPvc">
                <div className="form-group-cortinas">
                    <p>DIMENSIONES</p>
                    <div className="bodyFormGroupCortinas">
                        <label className="especificacionCortina textoEspecificacionCortina" htmlFor="alto">Alto</label>
                        <input type="text"
                            id="alto"
                            value={alto}
                            onChange={(e) => setAlto(e.target.value)}
                            className="campotextoEspecificacionCortina"
                        />
                        <div id="textoAlto" className="especificacionCortina milimetrosCortinas"><p>mm.</p></div>

                        <label className="especificacionCortina textoEspecificacionCortina" htmlFor="ancho">Ancho</label>
                        <input type="text"
                            id="ancho"
                            value={ancho}
                            onChange={(e) => setAncho(e.target.value)}
                            className="campotextoEspecificacionCortina"
                        />
                        <div id="textoAncho" className="especificacionCortina milimetrosCortinas"><p>mm.</p></div>
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>MEDIDA INDICADA</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${alturaIndicada == 'vano' ? 'checked' : ''}`} onClick={() => setAlturaIndicada(alturaIndicada !== 'vano' ? 'vano' : undefined)}>Vano</div>
                        <div className={`especificacionCortina ${alturaIndicada == 'abertura' ? 'checked' : ''}`} onClick={() => setAlturaIndicada(alturaIndicada !== 'abertura' ? 'abertura' : undefined)}>Abertura</div>
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>CON MECANISMO?</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoSi' ? 'checked' : ''}`} onClick={() => setConMecanismo(conMecanismo !== 'mecanismoSi' ? 'mecanismoSi' : undefined)}>Si</div>
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoNo' ? 'checked' : ''}`} onClick={() => { setConMecanismo(conMecanismo !== 'mecanismoNo' ? 'mecanismoNo' : undefined); descelectEnrolladorPersianaPvc() }}>No</div>
                    </div>
                </div>

                {conMecanismo == 'mecanismoSi' &&
                    <div className="form-group-cortinas">
                        <p>TIPO DE MECANISMO</p>
                        <div className="bodyFormGroupCortinas">
                            <div className={`especificacionCortina ${tipoEnrollador == 'cinta' ? 'checked' : ''}`} onClick={() => setTipoEnrollador(tipoEnrollador !== 'cinta' ? 'cinta' : undefined)}>Cinta</div>
                            <div className={`especificacionCortina ${tipoEnrollador == 'antonetti' ? 'checked' : ''}`} onClick={() => setTipoEnrollador(tipoEnrollador !== 'antonetti' ? 'antonetti' : undefined)}>Antonetti</div>
                        </div>
                    </div>}
            </form>
            <div className="botonEnviarConsultaContainer">
                <button className="botonEnviarConsulta" onClick={enviarConsulta}>
                    Enviar consulta
                </button>
            </div>
        </div>
    );
}