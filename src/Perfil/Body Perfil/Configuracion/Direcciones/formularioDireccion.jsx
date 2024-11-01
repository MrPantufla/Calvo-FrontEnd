import './formularioDireccion.css'
import { useAuth } from "../../../../contextLogin";
import { useConfiguracion } from "../../../../contextConfiguracion";
import { useVariables } from '../../../../contextVariables';
import Cookies from 'js-cookie';

export default function FormularioDireccion() {
    const { backend } = useVariables();

    const { auth,
        setDireccionConfirmada,
        calle,
        numero,
        cp,
        provincia,
        localidad,
        setCalle,
        setNumero,
        setCp,
        setLocalidad,
        setProvincia
    } = useAuth();

    const {
        cerrarDireccion,
        setErrorMessage,
        errorMessage
    } = useConfiguracion();

    const handleEnviarDireccion = () => {
        let tokenParaEnviar = Cookies.get('jwtToken');

        if (tokenParaEnviar == undefined) {
            tokenParaEnviar = null;
        }

        setDireccionConfirmada(true);
        fetch(`${backend}/direccion/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': tokenParaEnviar,
            },
            body: JSON.stringify(direccionEstructura),
        })
            .then(response => {
                if (response.ok) {
                    cerrarDireccion();
                    return null;
                } else {
                    return response.text();
                }
            })
            .then(data => {
                if (data !== null) {
                    auth.setErrorMessage(data);
                }
            })
            .catch(error => {
                console.error('Ocurrió un error al enviar los datos:', error.message);
                if (error.message.includes('409')) {
                    console.error('Conflicto al intentar enviar la dirección');
                    auth.setErrorMessage('Ocurrió un error');
                }
            });
    };

    const enviarDireccion = (event) => {
        event.preventDefault();
        const letrasRegex = /^[A-Za-zÀ-ÿ\s]+$/;
        const numerosRegex = /^[0-9]+$/;
        const letrasYNumerosRegex = /^[a-zA-Z0-9]+$/;
        if (!calle || !numero || !cp || !localidad || !provincia) {
            setErrorMessage('Por favor, completa todos los datos');
        }
        else if (!numerosRegex.test(numero)) {
            setErrorMessage('Número solo puede contener números enteros');
        }
        else if (!letrasYNumerosRegex.test(cp)) {
            setErrorMessage('CP solo puede contener letras o números')
        }
        else if (!letrasRegex.test(provincia)) {
            setErrorMessage('Provicia solo puede contener letras');
        }
        else {
            handleEnviarDireccion();
        }
    }

    const direccionEstructura = {
        calle: calle,
        numero: numero,
        cp: cp,
        localidad: localidad,
        provincia: provincia
    };

    return (
        <div className="contenedorPrincipalEditarDireccion">
            <div className="errorEditarDireccion errorFormulario">
                {errorMessage != ('') ? (<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="var(--colorRojo)" className="bi bi-exclamation-diamond-fill svgErrorFormulario" viewBox="0 0 16 16">
                    <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>) : (<></>)}{errorMessage}
            </div>
            <div className="formularioPerfil formularioAgregarDireccion">
                <form onSubmit={enviarDireccion}>
                    <div className="calleYNumero seccionesDireccion">
                        <div className="form-group-editarPerfil direccionCalleInput">
                            <label htmlFor="calle">CALLE</label>
                            <input
                                type="text"
                                id="calle"
                                value={calle}
                                onChange={(e) => setCalle(e.target.value)}
                                onFocus={() => setErrorMessage('')}
                            />
                        </div>
                        <div className="form-group-editarPerfil direccionNumeroInput">
                            <label htmlFor="numero">NÚMERO</label>
                            <input
                                type="text"
                                id="numero"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                onFocus={() => setErrorMessage('')}
                            />
                        </div>
                    </div>
                    <div className="cpYLocalidad seccionesDireccion">
                        <div className="form-group-editarPerfil direccionCpInput">
                            <label htmlFor="cp">CP</label>
                            <input
                                type="text"
                                id="cp"
                                value={cp}
                                onChange={(e) => setCp(e.target.value.toUpperCase())}
                                onFocus={() => setErrorMessage('')}
                            />
                        </div>
                        <div className="form-group-editarPerfil direccionLocalidadInput">
                            <label htmlFor="localidad">LOCALIDAD</label>
                            <input
                                type="text"
                                id="localidad"
                                value={localidad}
                                onChange={(e) => setLocalidad(e.target.value)}
                                onFocus={() => setErrorMessage('')}
                            />
                        </div>
                    </div>
                    <div className="form-group-editarPerfil seccionesDireccion direccionProvinciaInput">
                        <label htmlFor="provincia">PROVINCIA</label>
                        <input
                            type="text"
                            id="provincia"
                            value={provincia}
                            onChange={(e) => setProvincia(e.target.value)}
                            onFocus={() => setErrorMessage('')}
                        />
                    </div>
                    <div className="botonFormulariosPerfilContainer">
                        <button className="botonFormulariosPerfil" type="submit">
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}