import { useAuth } from '../../../contextLogin';
import { useVariables } from '../../../contextVariables';
import './cardEditable.css';
import { useState, useRef } from 'react';

export default function CardEditable(args) {

  const {
    backend,
    setAgregarCardAbierto,
    obtenerToken
  } = useVariables();

  const [cardAbierta, setCardAbierta] = useState(true);
  const [pregunta, setPregunta] = useState(args.pregunta ? args.pregunta : '');
  const [respuesta, setRespuesta] = useState(args.respuesta ? args.respuesta : '');

  const cancelarAgregar = () => {
    args.editando ? (args.setEditando(false)) : (args.setAgregarCardAbierto(false));
  }

  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setRespuesta(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Resetea la altura para calcular la altura correcta
      textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta la altura al contenido
    }
  };

  const guardarPreguntaFrecuente = async () => {
    try {

      const bodyCard = { pregunta: pregunta, respuesta: respuesta }

      const response = await fetch(`${backend}/preguntasFrecuentes/postAgregar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': obtenerToken(),
        },
        body: JSON.stringify(bodyCard),
      });

      if (response.ok) {
        args.obtenerPreguntasFrecuentes();
        setAgregarCardAbierto(false);
        return true;
      }
    } catch (error) {
      console.error('Error al encontrar al usuario:', error);
    }
  }

  const editarPreguntaFrecuente = async () => {
    try {

      const bodyCard = { id: args.idEdicion, pregunta: pregunta, respuesta: respuesta }

      const response = await fetch(`${backend}/preguntasFrecuentes/postEditar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': obtenerToken(),
        },
        body: JSON.stringify(bodyCard),
      });

      if (response.ok) {
        args.obtenerPreguntasFrecuentes();
        setAgregarCardAbierto(false);
        args.setEditando(false);
        return true;
      }
    } catch (error) {
      console.error('Error al encontrar al usuario:', error);
      setAgregarCardAbierto(false);
      args.setEditando(false);
    }
  }

  const tabInput = () => {
    return (event) => {
      if (event.key == 'Tab') {
        event.preventDefault()
        const nextInput = textareaRef.current;
        nextInput.focus();
      }
    }
  }

  return (
    <>
      <div className={`headCardPreguntasFrecuentes ${cardAbierta && 'active'}`}>
        <button className="botonBorrarCard" onClick={() => cancelarAgregar()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </button>

        <input
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          onKeyDown={tabInput()}
        />

        <button className="botonGuardarCard" onClick={() => (args.idEdicion ? editarPreguntaFrecuente() : guardarPreguntaFrecuente())}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
        </button>

        <button className="botonDesplegarCard" onClick={() => setCardAbierta(!cardAbierta)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
          </svg>
        </button>
      </div>

      <div className={`bodyCardPreguntasFrecuentes ${cardAbierta && 'active'}`}>
        <textarea
          ref={textareaRef}
          value={respuesta}
          onChange={(e) => handleChange(e)}
          style={{ width: '100%', minHeight: '50px', resize: 'none' }}
        />
      </div>
    </>
  );
}