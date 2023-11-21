import './confirmacionCodigo.css';

import { useState } from 'react';
import { useAuth } from '../../contextLogin';

export default function ConfirmacionCodigo() {
  const [codigoConfirmacion, setCodigoConfirmacion] = useState('');
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');
  const { state: userData, updateEmailConfirmationStatus } = useAuth();

  const enviarCodigo = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/confirmacionCodigo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codigoConfirmacion,
          email: userData.userInfo.email,
        }),
      });

      if (response.ok) {
        const data = await response.text();
        setMensajeRespuesta(data.message);
        updateEmailConfirmationStatus();
        
      } else {
        const data = await response.text();
        setMensajeRespuesta(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error al enviar el código:', error);
      setMensajeRespuesta('Error al enviar el código');
    }
  };


  return (
    <div className="contenedorPrincipalConfirmacionCodigo">
      <form>
        <p>El código de confirmación fue enviado a {userData.email}</p>
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