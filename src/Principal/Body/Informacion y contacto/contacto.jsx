import './contacto.css';
import { useState } from 'react';

export default function Contacto() {
    const [nombreYApellido, setNombreYApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [localidad, setLocalidad]= useState('');
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

        if(nombreYApellido==('') || email ==('') || telefono ==('') || localidad ==('') || mensaje == ('') ){
            setErrorMessage("Debes completar todos los campos obligatorios")
        }
        else if (!emailChecked && !telefonoChecked) {
            setErrorMessage("Debes seleccionar al menos una opción (Email o Teléfono)")
        }
        else if (!/^\d+$/.test(telefono)) {
            setErrorMessage("El campo 'teléfono' solo acepta números")
        }
        else {
            setNombreYApellido('');
            setEmail('');
            setTelefono('');
            setLocalidad('');
            setMensaje('');
            enviarFormulario();
            setFormularioEnviado(true);
        }
    }
    
    const enviarFormulario = () =>{
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
        opcion: opcion
    };

    return (
        <div className="contenedorPrincipalFormulario">
            <form method="post" onSubmit={handleSubmit}>
                <p className="errorFormulario">{errorMessage}</p>
                <div className="inputContainer">
                    <label htmlFor="nombreYApellido" className="colocar_nombre">
                        NOMBRE Y APELLIDO*
                    </label>
                    <input 
                        type="text" 
                        name="nombreYApellido" 
                        id="nombreYApellido" 
                        placeholder="Nombre y Apellido" 
                        onFocus={()=>setErrorMessage('')}
                        onChange={(e) => setNombreYApellido(e.target.value)}
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
                        placeholder="Email" 
                        onFocus={()=>setErrorMessage('')}
                        onChange={(e) => setEmail(e.target.value)}
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
                        placeholder="Teléfono" 
                        onFocus={()=>setErrorMessage('')}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </div>
                <div className="inputContainer">
                    <label htmlFor="telefono" className="colocar_telefono">
                        LOCALIDAD*
                    </label>
                    <input 
                        name="localidad" 
                        id="localidad" 
                        placeholder="Localidad" 
                        onFocus={()=>setErrorMessage('')}
                        onChange={(e) => setLocalidad(e.target.value)}
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
                        placeholder="Escribí tu consulta" 
                        onFocus={()=>setErrorMessage('')}
                        onChange={(e) => setMensaje(e.target.value)}
                    />
                </div>
                <div className="comunicacion">
                    <div className="textoComunicacion">
                        ¿Cómo preferís que nos comuniquemos?*
                    </div>
                    <div className="labelCheckbox">
                        <div className="checkboxRowReverse">
                            <label className="label">
                                <div className="textoCheckbox">
                                    Email
                                </div>
                                <input value="Mail" className="checkbox" type="radio" id="emailCheckbox" name="opcionCheck" checked={emailChecked} onChange={() => alternarOpcion(1)} />
                            </label>
                        </div>
                        <div className="checkboxRowReverse">
                            <label className="label">
                                <div className="textoCheckbox">
                                    Teléfono
                                </div>
                                <input value="Telefono" className="checkbox" type="radio" id="telefonoCheckbox" name="opcionCheck" checked={telefonoChecked} onChange={() => alternarOpcion(2)} />
                            </label>
                        </div>
                    </div>
                </div>
                <button type="submit" name="enviar_formulario" id="enviar" className="enviarFormulario" disabled={formularioEnviado}>
                    <p>ENVIAR</p>
                </button>
            </form>
        </div>
    );
}
