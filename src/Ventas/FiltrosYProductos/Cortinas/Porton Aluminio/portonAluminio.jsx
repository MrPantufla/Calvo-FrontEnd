import './portonAluminio.css';
import { useCortinas } from '../../../../contextCortinas.jsx';
import { useEffect, useState } from 'react';

export default function PortonAluminio() {

    const {
        alto,
        setAlto,
        ancho,
        setAncho,
        conMecanismo,
        setConMecanismo,
        alturaIndicada,
        setAlturaIndicada,
        control,
        setControl,
        tecla,
        setTecla,
        tipoTablilla,
        setTipoTablilla,
        descelectControlYTeclaPortonAluminio,
        limpiarPortonAluminio,
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

        if (!alto || !ancho || !conMecanismo || !alturaIndicada || !tipoTablilla) {
            setErrorMessage("Por favor, completa todos los campos");
            window.scrollTo(0, 0);
        }
        else if (conMecanismo === 'mecanismoSi' && (!control || !tecla)) {
            setErrorMessage("Por favor, completa todos los campos");
            window.scrollTo(0, 0);
        }
        else if (!enterosRegex.test(alto) || !enterosRegex.test(ancho)) {
            setErrorMessage("Los campos de dimensiones solo aceptan números enteros");
            window.scrollTo(0, 0);
        }
        else {
            deleteErrorMessage();

            const textoCortina =`TIPO: PORTON ALUMINIO
            ALTO: ${alto}mm 
            ANCHO: ${ancho}mm
            ALTURA INDICADA: ${alturaIndicada}
            MECANISMO: ${conMecanismo == 'mecanismoNo' ? 
                'Sin mecanismo, solo cortina' 
                : 
                `CONTROL: ${control ? 'Si' : 'No'}
            TECLA: ${tecla ? 'Si' : 'No'}`}
            TIPO DE TABLILLA: ${tipoTablilla}
            `;

            enviarCortina(textoCortina);
        }
    }

    return (
        <div className="contenedorPrincipalPortonAluminio">
            <div className="errorMessageContainer">
                <p className="errorFormulario">
                    {errorMessage !== '' && (<svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" fill="var(--colorRojo)" className="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                        <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>)}{errorMessage}
                </p>
            </div>
            <form className="formularioPortonAluminio">
                <div className="form-group-cortinas">
                    <p>DIMENSIONES</p>
                    <div className="bodyFormGroupCortinas">
                        <label className="especificacionCortina textoEspecificacionCortina" htmlFor="alto">Alto:</label>
                        <input type="text"
                            id="alto"
                            value={alto}
                            onChange={(e) => { setAlto(e.target.value); deleteErrorMessage() }}
                            className="campotextoEspecificacionCortina"
                        />
                        <div id="textoAlto" className="especificacionCortina milimetrosCortinas"><p>mm.</p></div>

                        <label className="especificacionCortina textoEspecificacionCortina" htmlFor="ancho">Ancho:</label>
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
                        <div className={`especificacionCortina ${alturaIndicada == 'vano' ? 'checked' : ''}`} onClick={() => { setAlturaIndicada(alturaIndicada !== 'vano' ? 'vano' : ''); deleteErrorMessage() }}>Vano</div>
                        <div className={`especificacionCortina ${alturaIndicada == 'abertura' ? 'checked' : ''}`} onClick={() => { setAlturaIndicada(alturaIndicada !== 'abertura' ? 'abertura' : ''); deleteErrorMessage() }}>Abertura</div>
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>CON MECANISMO?</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoSi' ? 'checked' : ''}`} onClick={() => { setConMecanismo(conMecanismo !== 'mecanismoSi' ? 'mecanismoSi' : ''); deleteErrorMessage() }}>Si</div>
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoNo' ? 'checked' : ''}`} onClick={() => { setConMecanismo(conMecanismo !== 'mecanismoNo' ? 'mecanismoNo' : ''); descelectControlYTeclaPortonAluminio(); deleteErrorMessage() }}>No</div>
                    </div>
                </div>

                {conMecanismo == 'mecanismoSi' &&
                    <>
                        <div className="form-group-cortinas">
                            <p>CON CONTROL?</p>
                            <div className="bodyFormGroupCortinas">
                                <div className={`especificacionCortina ${control == 'controlSi' ? 'checked' : ''}`} onClick={() => { setControl(control !== 'controlSi' ? 'controlSi' : undefined); deleteErrorMessage() }}>Si</div>
                                <div className={`especificacionCortina ${control == 'controlNo' ? 'checked' : ''}`} onClick={() => { setControl(control !== 'controlNo' ? 'controlNo' : undefined); (tecla === 'teclaNo' && control !== 'controlNo') && (setTecla(undefined)) ;deleteErrorMessage() }}>No</div>
                            </div>
                        </div>

                        <div className="form-group-cortinas">
                            <p>CON TECLA?</p>
                            <div className="bodyFormGroupCortinas">
                                <div className={`especificacionCortina ${tecla == 'teclaSi' ? 'checked' : ''}`} onClick={() => { setTecla(tecla !== 'teclaSi' ? 'teclaSi' : undefined); deleteErrorMessage() }}>Si</div>
                                <div className={`especificacionCortina ${tecla == 'teclaNo' ? 'checked' : ''} ${control == 'controlNo' ? 'disabled' : ''}`} onClick={() => { setTecla((tecla !== 'teclaNo' && control != 'controlNo') ? 'teclaNo' : (tecla == 'teclaSi' ? 'teclaSi' : undefined)); deleteErrorMessage() }}>No</div>
                            </div>
                        </div>
                    </>
                }
                <div className="form-group-cortinas">
                    <p>TIPO DE TABLILLA</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${tipoTablilla == 'portonDap55' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'portonDap55' ? 'portonDap55' : undefined); deleteErrorMessage() }}>DAP-55</div>
                        <div className={`especificacionCortina ${tipoTablilla == 'portonDap64' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'portonDap64' ? 'portonDap64' : undefined); deleteErrorMessage() }}>DAP-64</div>
                        <div className={`especificacionCortina ${tipoTablilla == 'portonDap79' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'portonDap79' ? 'portonDap79' : undefined); deleteErrorMessage() }}>DAP-79 ciego</div>
                        <div className={`especificacionCortina ${tipoTablilla == 'portonDap49' ? 'checked' : ''}`} onClick={() => { setTipoTablilla(tipoTablilla !== 'portonDap49' ? 'portonDap49' : undefined); deleteErrorMessage() }}>DAP-49 microperforada</div>
                    </div>
                </div>
            </form>
            <div className="botonEnviarConsultaContainer">
                <button className="botonEnviarConsulta" onClick={enviarConsulta}>
                    Enviar consulta
                </button>
            </div>
        </div>
    );
}