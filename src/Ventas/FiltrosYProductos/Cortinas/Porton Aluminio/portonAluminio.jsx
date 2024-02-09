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

        if(!alto || !ancho || !conMecanismo || !alturaIndicada || !tipoTablilla){
            setErrorMessage("Por favor, completa todos los campos");
        }
        else if(conMecanismo === 'mecanismoSi'){
            if(!control || !tecla){
                setErrorMessage("Por favor, completa todos los campos");
            }
        }
        else if(!enterosRegex.test(alto) || !enterosRegex.test(ancho)){
            setErrorMessage("Los campos de dimensiones solo aceptan números enteros");
        }
        else{
            //FETCH
        }
    }

    return (
        <div className="contenedorPrincipalPortonAluminio">
            <div className="errorMessageContainer">
                <p className="errorFormulario">{errorMessage}</p>
            </div>
            <form className="formularioPortonAluminio">
                <div className="form-group-cortinas">
                    <p>DIMENSIONES</p>
                    <div className="bodyFormGroupCortinas">
                        <label className="especificacionCortina textoEspecificacionCortina" htmlFor="alto">Alto:</label>
                        <input type="text"
                            id="alto"
                            value={alto}
                            onChange={(e) => setAlto(e.target.value)}
                            className="campotextoEspecificacionCortina"
                        />
                        <div id="textoAlto" className="especificacionCortina milimetrosCortinas"><p>mm.</p></div>

                        <label className="especificacionCortina textoEspecificacionCortina" htmlFor="ancho">Ancho:</label>
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
                        <div className={`especificacionCortina ${alturaIndicada == 'vano' ? 'checked' : ''}`} onClick={() => setAlturaIndicada(alturaIndicada !== 'vano' ? 'vano' : '')}>Vano</div>
                        <div className={`especificacionCortina ${alturaIndicada == 'abertura' ? 'checked' : ''}`} onClick={() => setAlturaIndicada(alturaIndicada !== 'abertura' ? 'abertura' : '')}>Abertura</div>
                    </div>
                </div>

                <div className="form-group-cortinas">
                    <p>CON MECANISMO?</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoSi' ? 'checked' : ''}`} onClick={() => { setConMecanismo(conMecanismo !== 'mecanismoSi' ? 'mecanismoSi' : '') }}>Si</div>
                        <div className={`especificacionCortina ${conMecanismo == 'mecanismoNo' ? 'checked' : ''}`} onClick={() => { setConMecanismo(conMecanismo !== 'mecanismoNo' ? 'mecanismoNo' : ''); descelectControlYTeclaPortonAluminio() }}>No</div>
                    </div>
                </div>

                {conMecanismo == 'mecanismoSi' &&
                    <>
                        <div className="form-group-cortinas">
                            <p>CON CONTROL?</p>
                            <div className="bodyFormGroupCortinas">
                                <div className={`especificacionCortina ${control == 'controlSi' ? 'checked' : ''}`} onClick={() => setControl(control !== 'controlSi' ? 'controlSi' : undefined)}>Si</div>
                                <div className={`especificacionCortina ${control == 'controlNo' ? 'checked' : ''}`} onClick={() => { setControl(control !== 'controlNo' ? 'controlNo' : undefined); setTecla('teclaSi'); }}>No</div>
                            </div>
                        </div>

                        <div className="form-group-cortinas">
                            <p>CON TECLA?</p>
                            <div className="bodyFormGroupCortinas">
                                <div className={`especificacionCortina ${tecla == 'teclaSi' ? 'checked' : ''}`} onClick={() => setTecla(tecla !== 'teclaSi' ? 'teclaSi' : undefined)}>Si</div>
                                <div className={`especificacionCortina ${tecla == 'teclaNo' ? 'checked' : ''} ${control == 'controlNo' ? 'disabled' : ''}`} onClick={() => setTecla((tecla !== 'teclaNo' && control != 'controlNo') ? 'teclaNo' : (tecla == 'teclaSi' ? 'teclaSi' : undefined))}>No</div>
                            </div>
                        </div>
                    </>
                }
                <div className="form-group-cortinas">
                    <p>TIPO DE TABLILLA</p>
                    <div className="bodyFormGroupCortinas">
                        <div className={`especificacionCortina ${tipoTablilla == 'portonDap55' ? 'checked' : ''}`} onClick={() => setTipoTablilla(tipoTablilla !== 'portonDap55' ? 'portonDap55' : undefined)}>DAP-55</div>
                        <div className={`especificacionCortina ${tipoTablilla == 'portonDap64' ? 'checked' : ''}`} onClick={() => setTipoTablilla(tipoTablilla !== 'portonDap64' ? 'portonDap64' : undefined)}>DAP-64</div>
                        <div className={`especificacionCortina ${tipoTablilla == 'portonDap79' ? 'checked' : ''}`} onClick={() => setTipoTablilla(tipoTablilla !== 'portonDap79' ? 'portonDap79' : undefined)}>DAP-79 ciego</div>
                        <div className={`especificacionCortina ${tipoTablilla == 'portonDap49' ? 'checked' : ''}`} onClick={() => setTipoTablilla(tipoTablilla !== 'portonDap49' ? 'portonDap49' : undefined)}>DAP-49 microperforada</div>
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