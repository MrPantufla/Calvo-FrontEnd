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
        <p>El código de confirmación de 6 dígitos fue enviado a {userData.userInfo.email}, revisa tu casilla de correos y tu casilla de spam</p>
        <div className="form-group">
          <label htmlFor="codigo" required/>
          <input
            type="text"
            id="codigo"
            value={codigoConfirmacion}
            onChange={(e) => setCodigoConfirmacion(e.target.value)}
            placeholder='Código de confirmación'
          />
        </div>
        <button type="button" onClick={enviarCodigo}>
          Confirmar
        </button>
      </form>
    </div>
  );
}