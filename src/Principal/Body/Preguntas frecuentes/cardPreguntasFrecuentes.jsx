import { useAuth } from '../../../contextLogin';
import { useVariables } from '../../../contextVariables';
import './cardPreguntasFrecuentes.css';
import Cookies from 'js-cookie';

export default function CardPreguntasFrecuentes(args) {

  const { backend } = useVariables();

  const { state } = useAuth();
  
  const eliminarPreguntaFrecuente = async (id) => {
    try {
      let tokenParaEnviar = Cookies.get('jwtToken');

      if (tokenParaEnviar == undefined) {
        tokenParaEnviar = null;
      }

      const response = await fetch(`${backend}/api/eliminarPreguntaFrecuente`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': tokenParaEnviar,
        },
        body: id,
      });

      if (response.ok) {
        args.obtenerPreguntasFrecuentes();
        return true;
      } else {
        console.error('Error al eliminar la pregunta');
        return false;
      }
    } catch (error) {
      console.error('Error al eliminar la pregunta:', error);
      return false;
    }
  }

  return (
    <>
      <div className={`headCardPreguntasFrecuentes ${args.cardActiva == args.id && 'active'}`}>
        {(state.userInfo && state.userInfo.tipo_usuario == 'admin') &&
          <button className="botonBorrarCard" onClick={() => eliminarPreguntaFrecuente(args.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        }
        <p onClick={() => args.cardActiva == args.id ? args.setCardActiva(null) : args.setCardActiva(args.id)}>{args.pregunta}</p>

        <button className="botonDesplegarCard" onClick={() => args.cardActiva == args.id ? args.setCardActiva(null) : args.setCardActiva(args.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
          </svg>
        </button>
      </div>

      <div className={`bodyCardPreguntasFrecuentes ${args.cardActiva == args.id && 'active'}`}>
        <p>{args.respuesta}</p>
      </div>
    </>
  );
}