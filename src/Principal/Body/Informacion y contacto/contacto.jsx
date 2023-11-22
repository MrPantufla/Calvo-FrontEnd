import './contacto.css';
import { useState } from 'react';

export default function Contacto() {
    const [emailChecked, setEmailChecked] = useState(false);
    const [telefonoChecked, setTelefonoChecked] = useState(false);
    const [formError, setFormError] = useState(false);

    function alternarOpcion(opcion) {
        if (opcion === 1) {
            setEmailChecked(!emailChecked);
            setTelefonoChecked(false);
        } else if (opcion === 2) {
            setTelefonoChecked(!telefonoChecked);
            setEmailChecked(false);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!emailChecked && !telefonoChecked) {
            setFormError(true);
        } else {
            setFormError(false);
            event.target.submit();
        }
    }

    return (
        <div className="contenedorPrincipalFormulario">
            <form action="http://localhost:8080/procesarFormulario" method="post" onSubmit={handleSubmit}>
                {formError && <p className="errorFormulario">Debes seleccionar al menos una opción (Email o Teléfono).</p>}
                <div className="inputContainer">
                    <label htmlFor="nombreYApellido" className="colocar_nombre">
                        NOMBRE Y APELLIDO:
                    </label>
                    <input type="text" name="nombreYApellido" id="nombreYApellido" required placeholder="Nombre y Apellido" />
                </div>
                <div className="inputContainer">
                    <label htmlFor="emailFormulario" className="colocar_email">
                        E-MAIL:
                    </label>
                    <input type="email" name="emailFormulario" id="emailFormulario" required={emailChecked} placeholder="Email" />
                </div>
                <div className="inputContainer">
                    <label htmlFor="telefono" className="colocar_telefono">
                        TELÉFONO:
                    </label>
                    <input type="tel" name="telefono" id="telefono" required={telefonoChecked} placeholder="Teléfono" />
                </div>
                <div className="inputContainer">
                    <label htmlFor="telefono" className="colocar_telefono">
                        LOCALIDAD:
                    </label>
                    <input name="localidad" id="localidad" required placeholder="Localidad" />
                </div>
                <div className="inputContainer inputMensaje">
                    <label htmlFor="mensaje" className="colocar_mensaje">
                        MENSAJE:
                    </label>
                    <textarea name="mensaje" className="texto_mensaje" id="mensaje" required placeholder="Escribí tu consulta"></textarea>
                </div>
                <div className="comunicacion">
                    <div className="textoComunicacion">
                        ¿Cómo preferís que nos comuniquemos?
                    </div>
                    <div className="labelCheckbox">
                        <div className="checkboxRowReverse">
                            <label className="label">
                                <div className="textoCheckbox">
                                    Email
                                </div>
                                <input value="Mail" className="checkbox" type="radio" id="emailCheckbox" name="opcion" checked={emailChecked} onChange={() => alternarOpcion(1)} />
                            </label>
                        </div>
                        <div className="checkboxRowReverse">
                            <label className="label">
                                <div className="textoCheckbox">
                                    Teléfono
                                </div>
                                <input value="Telefono" className="checkbox" type="radio" id="telefonoCheckbox" name="opcion" checked={telefonoChecked} onChange={() => alternarOpcion(2)} />
                            </label>
                        </div>
                    </div>
                </div>
                <button type="submit" name="enviar_formulario" id="enviar" className="enviarFormulario">
                    <p>ENVIAR</p>
                </button>
            </form>
        </div>
    );
}
