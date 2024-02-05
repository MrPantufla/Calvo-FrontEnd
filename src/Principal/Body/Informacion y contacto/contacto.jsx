import './contacto.css';
import { useState } from 'react';

export default function Contacto() {
    const [nombreYApellido, setNombreYApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [provincia, setProvincia] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [opcion, setOpcion] = useState('');
    const [emailChecked, setEmailChecked] = useState(false);
    const [telefonoChecked, setTelefonoChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formularioEnviado, setFormularioEnviado] = useState(false);
    

    function alternarOpcion(opcionCheck) {
        if (opcionCheck === 1) {
            setOpcion('email');
            setEmailChecked(!emailChecked);
            setTelefonoChecked(false);
        } else if (opcionCheck === 2) {
            setOpcion('telefono');
            setTelefonoChecked(!telefonoChecked);
            setEmailChecked(false);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (nombreYApellido == ('') || email == ('') || telefono == ('') || localidad == ('') || mensaje == ('')) {
            setErrorMessage("Debes completar todos los campos obligatorios")
        }
        else if (!emailChecked && !telefonoChecked) {
            setErrorMessage("Debes seleccionar al menos una opción (Email o Teléfono)")
        }
        else if (!/^\d+$/.test(telefono)) {
            setErrorMessage("El campo 'teléfono' solo acepta números enteros")
        }
        else if (!/^[A-Za-z\s]+$/.test(nombreYApellido)) {
            setErrorMessage("Nombre y Apellido solo puede contener letras")
        }
        else if (!/^[A-Za-z\s]+$/.test(localidad)) {
            setErrorMessage("Localidad solo puede contene letras")
        }
        else {
            enviarFormulario();
            setNombreYApellido('');
            setEmail('');
            setTelefono('');
            setLocalidad('');
            setMensaje('');
            setFormularioEnviado(true);
        }
    }

    const enviarFormulario = () => {
        fetch('http://localhost:8080/api/procesarFormulario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formulario),
        })
            .then(response => {
                if (response.ok) {
                    console.log('Envío de formulario exitoso');
                    return null;
                } else {
                    return response.text();
                }
            })
            .then(data => {
                if (data !== null) {
                    console.log('Respuesta (texto): ', data);
                }
            })
            .catch(error => {
                console.error('Ocurrió un error al enviar los datos:', error.message);
                if (error.message.includes('409')) {
                    console.error('Conflicto al intentar registrar el usuario. El correo electrónico ya está en uso.');
                }
            });
    }

    const formulario = {
        nombreYApellido: nombreYApellido,
        email: email,
        telefono: telefono,
        localidad: localidad,
        mensaje: mensaje,
        opcion: opcion,
        provincia: provincia
    };

    return (
        <div className="contenedorPrincipalFormulario" id="contacto">
            <form method="post" onSubmit={handleSubmit}>
                <div className="errorFormulario errorContacto">
                    {errorMessage != ('') ? (<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="var(--colorRojo)" className="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                        <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>) : (<></>)}{errorMessage}
                </div>
                <div className="inputContainer">
                    <label htmlFor="nombreYApellido" className="colocar_nombre">
                        NOMBRE Y APELLIDO*
                    </label>
                    <input
                        type="text"
                        name="nombreYApellido"
                        id="nombreYApellido"
                        onFocus={() => setErrorMessage('')}
                        onChange={(e) => setNombreYApellido(e.target.value)}
                        disabled={formularioEnviado}
                    />
                </div>
                <div className="inputContainer">
                    <label htmlFor="emailFormulario" className="colocar_email">
                        E-MAIL{emailChecked ? ("*") : ("")}
                    </label>
                    <input
                        type="email"
                        name="emailFormulario"
                        id="emailFormulario"
                        onFocus={() => setErrorMessage('')}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={formularioEnviado}
                    />
                </div>
                <div className="inputContainer">
                    <label htmlFor="telefono" className="colocar_telefono">
                        TELÉFONO{telefonoChecked ? ("*") : ("")}
                    </label>
                    <input
                        type="tel"
                        name="telefono"
                        id="telefono"
                        onFocus={() => setErrorMessage('')}
                        onChange={(e) => setTelefono(e.target.value)}
                        disabled={formularioEnviado}
                    />
                </div>
                <div className="inputContainer">
                    <label htmlFor="localidad" className="colocar_localidad">
                        LOCALIDAD*
                    </label>
                    <input
                        name="localidad"
                        id="localidad"
                        onFocus={() => setErrorMessage('')}
                        onChange={(e) => setLocalidad(e.target.value)}
                        disabled={formularioEnviado}
                    />
                </div>
                <div className="inputContainer">
                    <label htmlFor="telefono" className="colocar_telefono">
                        PROVINCIA*
                    </label>
                    <input
                        name="provincia"
                        id="provincia"
                        onFocus={() => setErrorMessage('')}
                        onChange={(e) => setProvincia(e.target.value)}
                        disabled={formularioEnviado}
                    />
                </div>
                <div className="inputContainer inputMensaje">
                    <label htmlFor="mensaje" className="colocar_mensaje">
                        MENSAJE*
                    </label>
                    <textarea
                        name="mensaje"
                        className="texto_mensaje"
                        id="mensaje"
                        onFocus={() => setErrorMessage('')}
                        onChange={(e) => setMensaje(e.target.value)}
                        disabled={formularioEnviado}
                    />
                </div>
                <div className="comunicacion">
                    <div>
                        <p className="textoComunicacion">¿Cómo preferís que nos comuniquemos?</p>
                    </div>
                    <div className="labelCheckbox">
                        <div className="checkboxRowReverse">
                            <label className="label">
                                <div className="textoCheckbox">
                                    Email
                                </div>
                                <input value="Mail" className="checkbox" type="radio" id="emailCheckbox" name="opcionCheck" checked={emailChecked} onChange={() => alternarOpcion(1)} disabled={formularioEnviado} />
                            </label>
                        </div>
                        <div className="checkboxRowReverse">
                            <label className="label">
                                <div className="textoCheckbox">
                                    Teléfono
                                </div>
                                <input value="Telefono" className="checkbox" type="radio" id="telefonoCheckbox" name="opcionCheck" checked={telefonoChecked} onChange={() => alternarOpcion(2)} disabled={formularioEnviado} />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="enviar_formularioContainer">
                    <button type="submit" name="enviar_formulario" id="enviar" className={`enviarFormulario ${formularioEnviado ? 'enviado' : ''}`} disabled={formularioEnviado}>
                        <p>{formularioEnviado ? ("Formulario enviado") : ("Enviar")}</p>
                    </button>
                </div>
            </form>
        </div>
    );
}
