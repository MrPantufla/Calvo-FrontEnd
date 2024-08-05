import './quienesSomos.css';
import imagenQuienesSomos from '../../../Imagenes/imagenDeposito.webp';
import CAquienesSomos from '../../../Imagenes/CAquienesSomos.webp';

export default function QuienesSomos() {

    const message = "Somos una empresa familiar, fundada en 1994 en Chajarí, Entre Ríos. Nos hemos consolidado como un referente en la distribución de perfiles y todos los  insumos necesarios para la fabricación de aberturas de aluminio.  A lo largo de nuestra extensa trayectoria, nos hemos destacado por nuestro enfoque en el servicio al cliente y la comercializacion de productos de calidad.\nNuestros valores esenciales, como la honestidad, confianza, responsabilidad y compromiso, se reflejan en cada aspecto de nuestras operaciones, tanto internamente como en nuestras relaciones con proveedores y clientes. \nAtendemos a más de 400 clientes en las provincias de Entre Ríos, Corrientes y Misiones, asegurando una entrega eficiente y confiable mediante nuestro propio sistema de transporte.\nCon entusiasmo y optimismo, aspiramos a acompañar y crecer junto a nuestros clientes y proveedores, fortaleciendo nuestras relaciones y perfeccionando continuamente nuestros servicios.";

    return (
        <div className="contenedorPrincipalQuienesSomos">
            <div className="textoQuienesSomos">
                <div className="tituloYPoligono">
                    <div className="poligono" />
                    <h2>QUIÉNES SOMOS</h2>
                </div>
                <div className="parrafoQuienesSomos">
                    {message.split('\n').map((line, index) => (
                        <div key={index}>{line}</div>
                    ))}
                </div>
            </div>
            <div className="fondoContainer">
                <img className="imagenQuienesSomos" src={imagenQuienesSomos} />
            </div>
        </div>
    );
}