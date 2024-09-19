import './cardPreguntasFrecuentes.css';

export default function CardPreguntasFrecuentes(args){

  

  return(
    <>
      <div className="headCardPreguntasFrecuentes">
        <p>{args.pregunta}</p>
        <button onClick={() => toggleCard()}></button>
      </div> 

      <div className="bodyCardPreguntasFrecuentes">
        <p>{args.respuesta}</p>
      </div>
    </>
  );
}