import './confirmacionCodigo.css';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contextLogin';

export default function ConfirmacionCodigo() {
  const [codigoConfirmacion, setCodigoConfirmacion] = useState('');
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');
  const [error, setError] = useState('');
  const { state: userData, updateEmailConfirmationStatus } = useAuth();
  const [isResendButtonEnabled, setResendButtonEnabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const auth = useAuth();
  let timer; // Declare timer here

  useEffect(() => {
    // Cleanup the timer when the component is unmounted
    return () => clearInterval(timer);
  }, [timer]);

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
        const data = await response.json();
        setError(data.error || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error al enviar el código:', error);
      setError('Código de confirmación incorrecto');
    }
  };

  const reenviarCodigo = () => {
    if (!isResendButtonEnabled) {
      setResendButtonEnabled(false);
      console.log('Reenvío de código bloqueado. Espera un momento.');
      return;
    }

    fetch('http://localhost:8080/api/reenviarCodigo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: auth.state.userInfo.email,
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          console.log('Envío de datos exitoso');
          setResendButtonEnabled(false);

          // Set the time remaining to 5 minutes
          setTimeLeft(5 * 60);

          // Start a timer to update the remaining time every second
          timer = setInterval(() => {
            setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
          }, 1000);

          // Reset the timer after 5 minutes
          setTimeout(() => {
            clearInterval(timer);
            setResendButtonEnabled(true);
            setTimeLeft(0);
          }, 5 * 60 * 1000);

          return null;
        } else {
          return response.text();
        }
      })
      .then(data => {
        if (data !== null) {
          console.log('Respuesta (texto): ', data);
          // Handle the response as needed
        }
      })
      .catch(error => {
        console.error('Ocurrió un error al enviar los datos:', error.message);
        if (error.message.includes('409')) {
          console.error('Conflicto al intentar registrar el usuario. El correo electrónico ya está en uso.');
          setError('El correo electrónico ya está en uso.');
        } else {
          setError('Error al reenviar el código');
        }
      });
  };

  return (
    <div className="contenedorPrincipalConfirmacionCodigo">
      <form>
        <p>El código de confirmación de 6 dígitos fue enviado a {userData.userInfo.email}, revisa tu casilla de correos y tu casilla de spam</p>
        {error && <div className="error-message">{error}</div>}
        {mensajeRespuesta && <div className="success-message">{mensajeRespuesta}</div>}
        <div className="form-group inputContainerCodigo">
          <label htmlFor="codigo" required />
          <input
            type="text"
            id="codigo"
            value={codigoConfirmacion}
            onChange={(e) => setCodigoConfirmacion(e.target.value)}
            placeholder='Código de confirmación'
          />
        </div>
        <div className="botonContainerCodigo">
          <button type="button" onClick={enviarCodigo}>
            Confirmar
          </button>
          <button type="button" onClick={reenviarCodigo} disabled={!isResendButtonEnabled}>
            Reenviar código
          </button>
          {timeLeft > 0 && (
            <div className="contadorTiempoRestante">
              Tiempo restante: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}