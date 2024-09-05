import './cardMuestra.css';

export default function CardMuestra(args){
    return(
        <div className="contenedorPrincipalCardMuestra">
            <p>{args.titulo}</p>
            <img src={args.muestra}/>
        </div>
    );
}