import './preguntasFrecuentes.css'
import CardPreguntasFrecuentes from './cardPreguntasFrecuentes';
import { useEffect, useState } from 'react';
import { useVariables } from '../../../contextVariables';
import { useAuth } from '../../../contextLogin';
import CardEditable from './cardEditable.jsx';

export default function PreguntasFrecuentes() {

  const [cardActiva, setCardActiva] = useState(null);
  const [preguntasFrecuentes, setPreguntasFrecuentes] = useState(null);
  const [agregarCardAbierto, setAgregarCardAbierto] = useState(false);

  const { backend } = useVariables();

  const { state } = useAuth();

  /*const obtenerPreguntasFrecuentes = async () => {
    try {
      const response = await fetch(`${backend}/api/preguntasFrecuentes`, {
        method: 'GET'
      });

      if (response.ok) {
        setPreguntasFrecuentes(await response.json());
        return true;
      } else {
        console.error('Error al verificar el token en el backend');
        return false;
      }
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
      return false;
    }
  };*/

  const preguntas = [
    {
      id: 1,
      pregunta: 'pregunta1',
      respuesta: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium molestias natus provident impedit debitis, sint molestiae aut voluptate excepturi inventore sapiente iusto nam et repellendus est cupiditate sequi ut pariatur!'
    },
    {
      id: 2,
      pregunta: 'pregunta2',
      respuesta: 'respuesta2'
    }
  ]

  useEffect(() => {
    //obtenerPreguntasFrecuentes();
    setPreguntasFrecuentes(preguntas);
  }, [])

  return (
    <div className="row rowPreguntasFrecuentes">
      <div className="colPar">
        {preguntasFrecuentes && preguntasFrecuentes.map((item, index) => {
          return (
            index % 2 === 0 && <CardPreguntasFrecuentes pregunta={item.pregunta} respuesta={item.respuesta} cardActiva={cardActiva} setCardActiva={setCardActiva} id={item.id} key={index} />
          );
        })}
        {(state.userInfo.tipo_usuario == 'admin' && agregarCardAbierto && preguntasFrecuentes.length % 2 == 0) &&
          <CardEditable pregunta={"xd"} respuesta={"dx"} setAgregarCardAbierto={setAgregarCardAbierto}/>
        }
      </div>
      <div className="colImpar">
        {preguntasFrecuentes && preguntasFrecuentes.map((item, index) => {
          return (
            index % 2 !== 0 && <CardPreguntasFrecuentes pregunta={item.pregunta} respuesta={item.respuesta} cardActiva={cardActiva} setCardActiva={setCardActiva} id={item.id} key={index} />
          )
        })}
        {(state.userInfo.tipo_usuario == 'admin' && agregarCardAbierto && preguntasFrecuentes.length % 2 == 1) &&
          <CardEditable pregunta={"xd"} respuesta={"dx"} setAgregarCardAbierto={setAgregarCardAbierto}/>
        }
      </div>
      {(state.userInfo.tipo_usuario == 'admin' && agregarCardAbierto == false) &&
        (<button className='botonAgregarPreguntaFrecuente' onClick={() => setAgregarCardAbierto(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
        </button>)
      }
    </div>
  );
}