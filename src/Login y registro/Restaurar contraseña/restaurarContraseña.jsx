import './restaurarContraseña.css';
import { useState } from 'react';
import { useVariables } from '../../contextVariables';
import { useAuth } from '../../contextLogin';

export default function RestaurarContraseña() {
    const { backend } = useVariables();

    const { state } = useAuth();

    const [emailAceptado, setEmailAceptado] = useState(false);
    const [codigoAceptado, setCodigoAceptado] = useState(false);
    const [email, setEmail] = useState('');
    const [codigo, setCodigo] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [nuevaContraseña, setNuevaContraseña] = useState('');
    const [repetirContraseña, setRepetirContraseña] = useState('');
    const [contraseñaCambiada, setContraseñaCambiada] = useState(false);

    const enviarEmail = async () => {
        const response = await fetch(`${backend}/restaurarContrasena/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(email),
            credentials: 'include',
        });

        if (response.ok) {
            setEmailAceptado(true);
            setErrorMessage('');
            return null;
        } else {
            const data = await response.text();
            setErrorMessage(data);
        }
    }

    const verificarEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(email)) {
            enviarEmail();
        }
        else {
            setErrorMessage("Ingresa una dirección de correo válida")
        }
    }

    const verificarContraseñaYCodigo = () => {
        if (!nuevaContraseña || !repetirContraseña || !codigo) {
            setErrorMessage('Por favor, completa todos los campos')
            return
        }
        else if (nuevaContraseña !== repetirContraseña) {
            setErrorMessage('Las contraseñas no coinciden')
        }
        else {
            cambiarContraseña();
        }
    }

    const cambiarContraseña = async () => {
        const response = await fetch(`${backend}/restaurarContrasena/postCambiar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nuevaContraseña, email, codigo }),
            credentials: 'include',
        });

        if (response.ok) {
            setErrorMessage('');
            setContraseñaCambiada(true);
            return null;
        } else {
            const data = await response.text();
            setErrorMessage(data);
        }
    }

    const handleKeyDownEmail = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            verificarEmail();
        }
    };

    const handleKeyDownContraseña = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            verificarContraseñaYCodigo();
        }
    };

    return (
        <div className="contenedorPrincipalRestaurarContraseña">
            <div className="tituloRestaurarContraseñaContainer">
                <h1>RESTAURAR CONTRASEÑA</h1>
            </div>
            <p className="errorFormulario">
                {errorMessage != ('') ?
                    (<>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" fill="var(--colorRojo)" className="bi bi-exclamation-diamond-fill svgErrorFormulario" viewBox="0 0 16 16">
                            <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                        {errorMessage}
                    </>)
                    :
                    (<></>)}
            </p>
            {!contraseñaCambiada ?
                (!emailAceptado ?
                    (<div className="ingresarEmailRestaurarContraseña">
                        <form className="formularioRestaurarContraseña">
                            <label htmlFor="email">Ingresa tu Email</label>
                            <input
                                className="emailRestaurarContraseña"
                                type="text"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value.trim());
                                }}
                                onFocus={() => setErrorMessage('')}
                                onKeyDown={(e) => handleKeyDownEmail(e)}
                                autoCapitalize='off'
                            />
                        </form>
                        <div className="botonAceptarContainer">
                            <button className="botonAceptar" onClick={verificarEmail}>
                                Aceptar
                            </button>
                        </div>
                    </div>)
                    :
                    (<>
                        <p className="envioEmail">{`Te enviamos un código de confirmación a ${email}`}</p>
                        <div className="ingresarCodigoRestaurarContraseña">
                            <form className="formularioRestaurarContraseña">
                                <label htmlFor="codigo">Código de confirmación</label>
                                <input
                                    className="codigoRestaurarContraseña"
                                    type="text"
                                    value={codigo} 
                                    onChange={(e) => {
                                        setCodigo(e.target.value);
                                    }}
                                    onFocus={() => setErrorMessage('')}
                                    onKeyDown={(e) => handleKeyDownContraseña(e)}
                                    inputMode='numeric'
                                />
                            </form>
                        </div>
                        <div className="cambioDeContraseña">
                            <div className="formularioRestaurarContraseña">
                                <label htmlFor="nuevaContraseña" id="nuevaContraseña">Nueva contraseña</label>
                                <input
                                    type="password"
                                    id="nuevaContraseña"
                                    value={nuevaContraseña}
                                    onChange={(e) => setNuevaContraseña(e.target.value)}
                                    onFocus={() => setErrorMessage('')}
                                    onKeyDown={(e) => handleKeyDownContraseña(e)}
                                    autoCapitalize='off'
                                />
                            </div>
                            <div className="formularioRestaurarContraseña">
                                <label htmlFor="repetirContraseña" id="repetirContraseña" >Repetir contraseña</label>
                                <input
                                    type="password"
                                    id="repetirContraseña"
                                    value={repetirContraseña}
                                    onChange={(e) => setRepetirContraseña(e.target.value)}
                                    onFocus={() => setErrorMessage('')}
                                    onKeyDown={(e) => handleKeyDownContraseña(e)}
                                    autoCapitalize='off'
                                />
                            </div>
                            <div className="botonAceptarContainer" onClick={verificarContraseñaYCodigo}>
                                <button className="botonAceptar">
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </>)
                )
                :
                (<div className="cambioExitoso">
                    <h2>Contraseña cambiada con éxito!</h2>
                </div>)}
        </div>
    );
}