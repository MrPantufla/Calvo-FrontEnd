import './quienesSomos.css';
import imagenQuienesSomos from '../../../Imagenes/imagenDeposito.png';
import imagenQuienesSomos2 from '../../../Imagenes/imagenDeposito2.png';
import CAquienesSomos from '../../../Imagenes/CAquienesSomos.png';

export default function QuienesSomos() {

    const message = "Fundada en 1994, somos una empresa con amplia trayectoria que se ha destacado siempre por su enfoque en el servicio al cliente. \nEntre nuestros valores destacan la honestidad, confianza, responsabilidad y compromiso que ofrecemos tanto dentro del ámbito laboral como con nuestros proveedores y clientes. \n Nos encargamos de la comercialización y distribución de insumos para la carpintería de aluminio y contamos con más de 400 clientes a lo largo de las provincias de Entre Ríos, Corrientes y Misiones, a los que con un sistema de transporte propio, les somos garantía de una calidad de servicio y productos sobresaliente.";

    return (
        <div className="contenedorPrincipalQuienesSomos">
            <div className="fondoContainer">
                <div className="logoQuienesSomosContainer">
                    <img className="logoQuienesSomos" src={CAquienesSomos} />
                </div>
                <div className="imagenQuienesSomosContainer">
                    <img className="imagenQuienesSomos" src={imagenQuienesSomos} />
                </div>
            </div>
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
        </div>
    );
}