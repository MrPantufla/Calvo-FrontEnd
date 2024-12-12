import './confirmacionCodigo.css';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contextLogin';
import { useVariables } from '../../contextVariables';
import Cookies from 'js-cookie';

export default function ConfirmacionCodigo() {
  const { state: userData, updateEmailConfirmationStatus } = useAuth();

  const { backend } = useVariables();

  const {
    setMostrarErrorCodigoConfirmacion,
    setMostrarLogin,
    state
  } = useAuth();

  const {
    setMostrarCartelCliente
  } = useVariables();

  let timer;

  const [codigoConfirmacion, setCodigoConfirmacion] = useState('');
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');
  const [error, setError] = useState('');
  const [isResendButtonEnabled, setResendButtonEnabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [advertencia, setAdvertencia] = useState('');

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  const enviarCodigo = async () => {
    try {
      let tokenParaEnviar = Cookies.get('jwtToken');

      if (tokenParaEnviar == undefined) {
        tokenParaEnviar = null;
      }

      const response = await fetch(`${backend}/confirmacionCodigo/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': tokenParaEnviar,
        },
        body: JSON.stringify({
          codigoConfirmacion,
          email: userData.userInfo.email,
        }),
      });

      if (response.ok) {
        const data = await response.text();
        setMostrarLogin(false);
        { state.userInfo && (state.userInfo.cliente == false && setMostrarCartelCliente(true)) };
        setMensajeRespuesta(data.message);
        updateEmailConfirmationStatus();
      } else {
        const data = await response.json();
        setError(data.error || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error al enviar el código:', error);
      setMostrarErrorCodigoConfirmacion(true)
      setError('Código de confirmación incorrecto');
    }
  };

  const reenviarCodigo = () => {

    let tokenParaEnviar = Cookies.get('jwtToken');

    if (tokenParaEnviar == undefined) {
      tokenParaEnviar = null;
    }

    fetch(`${backend}/registro/postCodigo`, {
      method: 'POST',
      headers: {
        'Authorization': tokenParaEnviar
      },
      body: userData.userInfo.email
    })
      .then(response => {
        if (response.ok) {
          setAdvertencia("Código reenviado con éxito!")
          setResendButtonEnabled(false);

          setTimeLeft(5 * 60);

          timer = setInterval(() => {
            setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
          }, 1000);

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

  const enterPress = (e) =>{
    if(e.keyCode === 13){
      e.preventDefault();
      enviarCodigo();
    }
  }

  return (
    <div className="contenedorPrincipalConfirmacionCodigo">
      <div className="parteUtilizableConfirmacionCodigo">
        <div className="tituloConfirmacionCodigo">
          <h2>VERIFICA TU EMAIL PARA ACCEDER A TU PERFIL Y RALIZAR PEDIDOS</h2>
        </div>
        <div className="textoConfirmacionCodigo">
          <p>Un código de confirmación de 6 dígitos fue enviado a <span>{userData.userInfo.email}</span>. Por favor, revisa tu casilla de correos y tu casilla de spam.
            <br />No compartas este código con nadie</p>
        </div>
        <form className="formConfirmacionCodigo">
          <div className="errorConfirmacionCodigoContainer">
            {error !== '' ?
              (<div className="error-message errorFormulario"><svg xmlns="http://www.w3.org/2000/svg" width="1.3rem" height="1.3rem" fill="var(--colorRojo)" className="bi bi-exclamation-diamond-fill svgErrorFormulario" viewBox="0 0 16 16">
                <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg> {error}</div>)
              :
              (<div className="errorFormulario">
                {advertencia}
              </div>)}
          </div>
          {mensajeRespuesta && <div className="success-message">{mensajeRespuesta}</div>}
          <div className="form-group inputContainerCodigo">
            <label htmlFor="codigo" required />
            <input
              type="text"
              id="codigo"
              value={codigoConfirmacion}
              onChange={(e) => {
                setCodigoConfirmacion(e.target.value);
              }}
              onFocus={() => {
                setError('');
                setAdvertencia('');
              }}
              placeholder='Código de confirmación'
              onKeyDown={(e) => enterPress(e)}
              inputMode='numeric'
            />
          </div>
          <div className="botonContainerCodigo">
            <button type="button" onClick={enviarCodigo}>
              Confirmar
            </button>
            <button type="button" onClick={reenviarCodigo} disabled={!isResendButtonEnabled}>
              {timeLeft > 0 ? (<p>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>) : (<p>Reenviar código</p>)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}