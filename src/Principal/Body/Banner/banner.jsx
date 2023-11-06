import './banner.css';

export default function Banner(args){
    return(
        <div className="contenedorPrincipalNuestrosProductos">
            <div id={args.id} className="contenedorh1">
                <h1 className="textoNuestrosProductos">{args.texto}</h1>
            </div>
        </div>
    );
}