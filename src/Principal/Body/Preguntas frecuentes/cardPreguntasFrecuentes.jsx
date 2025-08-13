import { useAuth } from '../../../contextLogin';
import { useVariables } from '../../../contextVariables';
import './cardPreguntasFrecuentes.css';
import MapFAQ from './mapFAQ';
import { useState } from 'react';
import CardEditable from './cardEditable';
import React from 'react';

export default function CardPreguntasFrecuentes(args) {

  const {
    backend,
    obtenerToken
  } = useVariables();

  const { state } = useAuth();

  const [editando, setEditando] = useState(false);

  const dominio = window.location.origin;

  const eliminarPreguntaFrecuente = async (id) => {
    try {

      const response = await fetch(`${backend}/preguntasFrecuentes/postEliminar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': obtenerToken(),
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

  const editarCard = (e) => {
    e.preventDefault();

    setEditando(true);
  }

  return (
    <>
      {!editando ?
        (<>
          <div className={`headCardPreguntasFrecuentes ${args.cardActiva == args.id && 'active'}`}>
            {(state.userInfo && (state.userInfo.tipo_usuario == 'admin' || state.userInfo.tipo_usuario == 'colaborador')) &&
              <button className="botonBorrarCard" onClick={() => eliminarPreguntaFrecuente(args.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </button>
            }
            <p onClick={() => args.cardActiva == args.id ? args.setCardActiva(null) : args.setCardActiva(args.id)}>{args.pregunta}</p>

            {(state.userInfo && (state.userInfo.tipo_usuario == 'admin' || state.userInfo.tipo_usuario == 'colaborador')) &&
              <button onClick={(e) => editarCard(e)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
              </svg></button>
            }

            <button className="botonDesplegarCard" onClick={() => args.cardActiva == args.id ? args.setCardActiva(null) : args.setCardActiva(args.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
              </svg>
            </button>
          </div>

          <div className={`bodyCardPreguntasFrecuentes ${args.cardActiva == args.id && 'active'}`}>
            {(args.respuesta == 'mapa' && !dominio.startsWith("http://localhost:3000")) ? (
              <MapFAQ />
            ) : (
              <p>
                {args.respuesta.replace(/\\n/g, '\n').split('\n').map((linea, index) => (
                  <React.Fragment key={index}>
                    {linea}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            )}
          </div>
        </>)
        :
        (<CardEditable setAgregarCardAbierto={args.setAgregarCardAbierto} obtenerPreguntasFrecuentes={args.obtenerPreguntasFrecuentes} idEdicion={args.id} editando={editando} setEditando={setEditando} pregunta={args.pregunta} respuesta={args.respuesta} />)
      }
    </>
  );
}