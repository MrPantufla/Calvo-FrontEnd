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
        errorMessage,
        setErrorMessage,
        deleteErrorMessage,
        enviarCortina
    } = useCortinas();

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
        const enterosRegex = /^[1-9]\d*$/;

        if (!alto || !ancho || !alturaIndicada || !conMecanismo) {
            setErrorMessage("Por favor, completa todos los campos obligatorios");
            window.scrollTo(0, 0);
        }
        else if (!enterosRegex.test(alto) || !enterosRegex.test(ancho)) {
            setErrorMessage("Los campos de dimensiones solo aceptan números enteros positivos");
            window.scrollTo(0, 0);
        }
        else if (conMecanismo === 'mecanismoSi' && !tipoEnrollador) {
            setErrorMessage("Por favor, completa todos los campos obligatorios");
            window.scrollTo(0, 0);
        }
        else {
            deleteErrorMessage();
            //FETCH
        }
    }

    return (
        <div className="contenedorPrincipalPersianaPvc">
            <div className="errorMessageContainer">
                <p className="errorFormulario">
                    {errorMessage !== '' && (<svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" fill="var(--colorRojo)" className="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                        <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>)}{errorMessage}
                </p>
            </div>
            <form className="formularioPersianaPvc">
                <div className="form-group-cortinas">
                    <p>DIMENSIONES</p>
                    <div className="bodyFormGroupCortinas">
                        <label className="especificacionCortina textoEspecificacionCortina" htmlFor="alto">Alto</label>
                        <input type="text"
                            id="alto"
                            value={alto}
                            onChange={(e) => { setAlto(e.target.value); deleteErrorMessage() }}
                            className="campotextoEspecificacionCortina"
                        />
                        <div id="textoAlto" className="especificacionCortina milimetrosCortinas"><p>mm.</p></div>

                        <label className="especificacionCortina textoEspecificacionCortina" htmlFor="ancho">Ancho</label>
                        <input type="text"
                            id="ancho"
                            value={ancho}
                            onChange={(e) => { setAncho(e.target.value); deleteErrorMessage() }}
                            className="campotextoEspecificacionCortina"
                        />
                        <div id="textoAncho" className="especificacionCortina milimetrosCortinas"><p>mm.</p></div>
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>MEDIDA INDICADA</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${alturaIndicada == 'vano' ? 'checked' : ''}`} onClick={() => { setAlturaIndicada(alturaIndicada !== 'vano' ? 'vano' : undefined); deleteErrorMessage() }}>Vano</div>
                        <div className={`especificacionCortina ${alturaIndicada == 'abertura' ? 'checked' : ''}`} onClick={() => { setAlturaIndicada(alturaIndicada !== 'abertura' ? 'abertura' : undefined); deleteErrorMessage() }}>Abertura</div>
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>CON MECANISMO?</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoSi' ? 'checked' : ''}`} onClick={() => { setConMecanismo(conMecanismo !== 'mecanismoSi' ? 'mecanismoSi' : undefined); deleteErrorMessage() }}>Si</div>
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoNo' ? 'checked' : ''}`} onClick={() => { setConMecanismo(conMecanismo !== 'mecanismoNo' ? 'mecanismoNo' : undefined); descelectEnrolladorPersianaPvc(); deleteErrorMessage() }}>No</div>
                    </div>
                </div>

                {conMecanismo == 'mecanismoSi' &&
                    <div className="form-group-cortinas">
                        <p>TIPO DE MECANISMO</p>
                        <div className="bodyFormGroupCortinas">
                            <div className={`especificacionCortina ${tipoEnrollador == 'cinta' ? 'checked' : ''}`} onClick={() => { setTipoEnrollador(tipoEnrollador !== 'cinta' ? 'cinta' : undefined); deleteErrorMessage() }}>Cinta</div>
                            <div className={`especificacionCortina ${tipoEnrollador == 'antonetti' ? 'checked' : ''}`} onClick={() => { setTipoEnrollador(tipoEnrollador !== 'antonetti' ? 'antonetti' : undefined); deleteErrorMessage() }}>Antonetti</div>
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