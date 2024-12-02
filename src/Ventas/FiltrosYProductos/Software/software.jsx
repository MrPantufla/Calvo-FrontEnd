import './software.css';
import { useTienda } from '../../../contextTienda';

export default function Software() {

    const {
        isMobile,
        setImagenSoftwareSeleccionada
    } = useTienda();

    return (
        <div className="contenedorPrincipalSoftware">
            <div className="headSoftware">
                <img src="https://storage.googleapis.com/backend-calvo-415917.appspot.com/imagenesSoftware/logo.webp"/>
                <h1>WinMaker 10: La Solución Integral para Cotización de Aberturas de Aluminio</h1>
            </div>
            <p>WinMaker es la herramienta definitiva para simplificar el proceso de cotización de aberturas de aluminio. Diseñado específicamente para empresas del sector de la construcción y fabricantes de aberturas. Ofrece una solución integral que agiliza y mejora la precisión en la generación de presupuestos para proyectos de construcción.<br /></p>
            <br />
            <h2>Características Principales:</h2>
            <p>
                <span>1.    Interfaz Intuitiva:</span> Con una interfaz fácil de usar, permite a los usuarios ingresar medidas, especificaciones técnicas y detalles de materiales de manera rápida y sencilla.<br />
                <span>2.	Generación Automática de Presupuestos:</span> Con solo unos pocos clics, genera presupuestos detallados y precisos basados en la información ingresada, ahorrando tiempo y minimizando errores.<br />
                <span>3.	Personalización Flexible:</span> Adaptado a las necesidades específicas de cada proyecto, ofrece opciones de personalización para ajustarse a diferentes tipos de aberturas, materiales y accesorios.<br />
                <span>4.	Gestión de Clientes y Proyectos:</span> Con herramientas integradas de gestión de clientes y proyectos, permite un seguimiento eficiente de las cotizaciones y la comunicación con los clientes.<br />
                <span>5.	Compatibilidad con otros formatos:</span> Los presupuestos generados por WinMaker pueden exportarse fácilmente a formatos como PDF o Excel, facilitando su envío y presentación a los clientes.<br />
                <br />
            </p>

            <div className='imagenesSoftwareContainer'>
                <img src='https://storage.googleapis.com/backend-calvo-415917.appspot.com/imagenesSoftware/winmaker1.webp' onClick={() => setImagenSoftwareSeleccionada(1)} alt="imagen de winmaker"/>
                <img src='https://storage.googleapis.com/backend-calvo-415917.appspot.com/imagenesSoftware/winmaker2.webp' onClick={() => setImagenSoftwareSeleccionada(2)} alt="imagen de winmaker"/>
                <img src='https://storage.googleapis.com/backend-calvo-415917.appspot.com/imagenesSoftware/winmaker3.webp' onClick={() => setImagenSoftwareSeleccionada(3)} alt="imagen de winmaker"/>
            </div>


            <br />
            <h2>Beneficios:</h2>
            <p>
                <span>• Ahorro de Tiempo:</span> el proceso de cotización se vuelve más rápido y eficiente, permitiendo a las empresas dedicar más tiempo a actividades clave de negocio.<br />
                <span>• Precisión en la Estimación de Costos:</span> La generación automática de presupuestos garantiza una mayor precisión en la estimación de costos, reduciendo el riesgo de pérdidas financieras.<br />
                <span>• Mejora de la Productividad:</span> Al simplificar y automatizar tareas administrativas, aumenta la productividad del equipo, permitiéndoles enfocarse en otros proyectos.<br />
                <span>• Profesionalismo y Presentación de Calidad:</span> Los presupuestos tienen un aspecto profesional y detallado, lo que ayuda a transmitir una imagen de calidad y confianza ante los clientes.<br />
                <br />
                Descubrí cómo WinMaker puede transformar tu proceso de cotización ahorrando tiempo y dinero. ¡Contactanos hoy mismo para obtener más información!
            </p>

            <div className="contenedorBotonConsultarSoftware">
                <a
                    className="botonEnviarConsultaSoftware"
                    href={isMobile ?
                        ('https://wa.me/5493456475294?text=Consulta%20sobre%20WinMaker:%20')
                        :
                        ('https://web.whatsapp.com/send?phone=+5493456475294&text=Consulta%20sobre%20WinMaker:%20')
                    }
                    target='blank'
                >
                    CONSULTAR
                </a>
            </div>
        </div>
    );
}