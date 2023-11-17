import './confirmacionCodigo.css';

import { useState } from 'react';

export default function ConfirmacionCodigo() {
    const [codigoConfirmacion, setCodigoConfirmacion] = useState('');

    const enviarCodigo = () => {
        fetch('http://localhost:8080/api/confirmacionCodigo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ codigoConfirmacion }),
          credentials: 'include',
        })
          .then(response => response.text())
          .then(data => {
            console.log('Respuesta: ', data);
            // Aquí puedes manejar la respuesta del backend, por ejemplo, mostrar un mensaje al usuario
          })
          .catch(error => {
            console.error('Ocurrió un error al enviar el código:', error);
          });
      };
      

    return (
        <div className="contenedorPrincipalConfirmacionCodigo">
            <form>
                <div className="form-group">
                    <label htmlFor="codigo" required></label>
                    <input
                        type="text"
                        id="codigo"
                        value={codigoConfirmacion}
                        onChange={(e) => setCodigoConfirmacion(e.target.value)}
                    />
                </div>
                <button type="button" onClick={enviarCodigo}>
                    Enviar código
                </button>
            </form>
        </div>
    );
}