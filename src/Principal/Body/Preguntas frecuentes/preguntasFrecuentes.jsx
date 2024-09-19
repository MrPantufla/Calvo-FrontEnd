import './preguntasFrecuentes.css'
import CardPreguntasFrecuentes from './cardPreguntasFrecuentes';

export default function PreguntasFrecuentes(){

  const preguntasFrecuentes = [
    {
      pregunta: "",
      respuesta: ""
    }
  ]
  
  return(
    <div contenedorPrincipalPreguntasFrecuentes>
      <div className="row rowPreguntasFrecuentes">
        {preguntasFrecuentes.map((item) =>{
          return(
            <div className="col-12 col-md-6">
              <CardPreguntasFrecuentes pregunta={item.pregunta} respuesta={item.respuesta}/>
            </div>
          )  
        })}
      </div>
    </div>
  );
}