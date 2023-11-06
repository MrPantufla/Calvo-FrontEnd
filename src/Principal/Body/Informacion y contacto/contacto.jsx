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
            <form action="submeter-formulario.php" method="post" onSubmit={handleSubmit}>
                {formError && <p className="errorFormulario">Debes seleccionar al menos una opción (Email o Teléfono).</p>}
                <div className="inputContainer">
                    <label htmlFor="nombre" className="colocar_nombre">
                        NOMBRE:
                    </label>
                    <input type="text" name="introducir_nombre" id="nombre" required placeholder="Nombre y Apellido" />
                </div>
                <div className="inputContainer">
                    <label htmlFor="email" className="colocar_email">
                        E-MAIL:
                    </label>
                    <input type="email" name="introducir_email" id="email" required={emailChecked} placeholder="Email" />
                </div>
                <div className="inputContainer">
                    <label htmlFor="telefono" className="colocar_telefono">
                        TELÉFONO:
                    </label>
                    <input type="tel" name="introducir_telefono" id="telefono" required={telefonoChecked} placeholder="Teléfono" />
                </div>
                <div className="inputContainer">
                    <label htmlFor="telefono" className="colocar_telefono">
                        LOCALIDAD:
                    </label>
                    <input name="introducir_telefono" id="localidad" required placeholder="Localidad" />
                </div>
                <div className="inputContainer inputMensaje">
                    <label htmlFor="mensaje" className="colocar_mensaje">
                        MENSAJE:
                    </label>
                    <textarea name="introducir_mensaje" className="texto_mensaje" id="mensaje" required placeholder="Escribí tu consulta"></textarea>
                </div>
                <div className="comunicacion">
                    ¿Cómo preferís que nos comuniquemos?
                    <div className="labelCheckbox">
                        <label className="label">
                            <div className="textoCheckbox">
                                Email
                            </div>
                            <input value="mail" className="checkbox" type="checkbox" id="emailCheckbox" name="opciones" checked={emailChecked} onChange={() => alternarOpcion(1)} />
                        </label>
                        <label className="label">
                            <div className="textoCheckbox">
                                Teléfono
                            </div>
                            <input value="telefono" className="checkbox" type="checkbox" id="telefonoCheckbox" name="opciones" checked={telefonoChecked} onChange={() => alternarOpcion(2)} />
                        </label>
                    </div>
                </div>
                <button type="submit" name="enviar_formulario" id="enviar" className="enviarFormulario">
                    <p>ENVIAR</p>
                </button>
            </form>
        </div>
    );
}
