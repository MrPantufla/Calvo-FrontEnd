import './preguntasFrecuentes.css'
import CardPreguntasFrecuentes from './cardPreguntasFrecuentes';
import { useState } from 'react';

export default function PreguntasFrecuentes() {

  const [cardActiva, setCardActiva] = useState(null);

  const preguntasFrecuentes = [
    {
      pregunta: "XD",
      respuesta: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa repellendus nostrum maxime tempora, debitis voluptatibus magni repudiandae et qui quod! Recusandae vero corporis quo a vel dolore eveniet amet iure."
    },
    {
      pregunta: "LOREM?",
      respuesta: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa repellendus nostrum maxime tempora, debitis voluptatibus magni repudiandae et qui quod! Recusandae vero corporis quo a vel dolore eveniet amet iure."
    },
    {
      pregunta: "ASDASDSA",
      respuesta: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui aperiam doloribus laboriosam excepturi dolor officia placeat, neque nostrum dolorum, labore nesciunt quidem laborum soluta dicta porro ullam repellendus deleniti ad!"
    },
    {
      pregunta: "PREGUNTA",
      respuesta: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa repellendus nostrum maxime tempora, debitis voluptatibus magni repudiandae et qui quod! Recusandae vero corporis quo a vel dolore eveniet amet iure."
    },
    {
      pregunta: "OTRA PREGUNTA",
      respuesta: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa repellendus nostrum maxime tempora, debitis voluptatibus magni repudiandae et qui quod! Recusandae vero corporis quo a vel dolore eveniet amet iure."
    }
  ]

  return (
    <div className="row rowPreguntasFrecuentes">
        <div className="colPar">
          {preguntasFrecuentes.map((item, index) => {
            return (
              index % 2 === 0 && <CardPreguntasFrecuentes pregunta={item.pregunta} respuesta={item.respuesta} cardActiva={cardActiva} setCardActiva={setCardActiva} id={index} key={index} />
            );
          })}
        </div>
        <div className="colImpar">
          {preguntasFrecuentes.map((item, index) => {
            return (
              index % 2 !== 0 && <CardPreguntasFrecuentes pregunta={item.pregunta} respuesta={item.respuesta} cardActiva={cardActiva} setCardActiva={setCardActiva} id={index} key={index} />
            )
          })}
        </div>
    </div>
  );
}