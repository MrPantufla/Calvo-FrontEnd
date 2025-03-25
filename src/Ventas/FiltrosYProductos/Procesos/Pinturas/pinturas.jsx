import { useProductos } from '../../../../contextProductos';
import { useTienda } from '../../../../contextTienda';
import './pinturas.css'

export default function Pinturas(args) {

    const {
        categoriaSeleccionadaPinturas,
        setCategoriaSeleccionadaPinturas,
        setStipoProceso,
        stipoProceso,
        tipoProceso,
        setColorSeleccionado,
        colorSeleccionado,
        isMobile,
        setAcabado,
        acabado
    } = useTienda();

    const { 
        procesos 
    } = useProductos();

    const coloresArray = [
        ["AZUL CLARO", "azulClaro", 4879],
        ["BEIGE CLARO", "beigeClaro", 4879],
        ["BLANCO", "blanco", 4876],
        ["BRONCE ANTIGUO", "bronceAntiguo", 4879],
        ["BRONCE COLONIAL", "bronceColonial", 7095],
        ["CEDRO", "cedro", 4879],
        ["COBRE", "cobre", 4879],
        ["GRIS AZULADO", "grisAzulado", 4879],
        ["GRIS CLARO", "grisClaro", 4879],
        ["GRIS METALIZADO", "grisMetalizado", 4879],
        ["GRIS SEMI MATE", "grisSemiMate", 4879],
        ["MARFIL CLARO", "marfilClaro", 4879],
        ["MARRON", "marron", 4879],
        ["MARRON AFRICANO", "marronAfricano", 4879],
        ["NEGRO", "negro", 6681],
        ["SIMIL ANOD NATURAL", "similAnodNatural", 4879],
        ["VERDE INGLÉS", "verdeIngles", 4879],
        ["VERDE OSCURO", "verdeOscuro", 4879]
    ];

    const similMaderaArray = [
        ["CEDRO C7", "cedroC7", 7467],
        ["CEDRO C8", "cedroC8", 7467],
        ["CEDRO F", "cedroF", 4882],
        ["CEREZO G7", "cerezoG7", 7467],
        ["MARMOL CARRARA 111", "marmolCarrara111", 7467],
        ["NOGAL B7", "nogalB7", 7467],
        ["NOGAL D", "nogalD", 4882],
        ["NOGAL OSCURO H", "nogalOscuroH", 4882],
        ["ROBLE CLARO E", "robleClaroE", 4882],
        ["ROBLE CLARO E7", "robleClaroE7", 7467],
        ["ROBLE MEDIO B", "robleMedioB", 4882],
        ["ROBLE OSCURO G", "robleOscuroG", 4882]
    ];

    const microtexturadaArray = [
        ["NEGRO MICROTEXTURADO", "negroMicrotexturado", 5596],
        ["GRIS OSCURO MICROTEXTURADO", "grisOscuroMicrotexturado", 77785],
        ["MARRON OSCURO MICROTEXTURADO", "marronOscuroMicrotexturado", 77789],
        ["MARRON CLARO MICROTEXTURADO", "marronClaroMicrotexturado", 77791]
    ]

    const coloresChapasArray = [
        ["AZUL CLARO 1 CARA", "azulClaro", 6358],
        ["AZUL CLARO 2 CARAS", "azulClaro", 6359],
        ["BEIGE CLARO 1 CARA", "beigeClaro", 6358],
        ["BEIGE CLARO 2 CARAS", "beigeClaro", 6359],
        ["BLANCO 1 CARA", "blanco", 6358],
        ["BLANCO 2 CARAS", "blanco", 6359],
        ["BRONCE ANTIGUO 1 CARA", "bronceAntiguo", 6358],
        ["BRONCE ANTIGUO 2 CARAS", "bronceAntiguo", 6359],
        ["BRONCE COLONIAL 1 CARA", "bronceColonial", 6358],
        ["BRONCE COLONIAL 2 CARAS", "bronceColonial", 6359],
        ["CEDRO 1 CARA", "cedro", 6358],
        ["CEDRO 2 CARAS", "cedro", 6359],
        ["COBRE 1 CARA", "cobre", 6358],
        ["COBRE 2 CARAS", "cobre", 6359],
        ["GRIS AZULADO 1 CARA", "grisAzulado", 6358],
        ["GRIS AZULADO 2 CARAS", "grisAzulado", 6359],
        ["GRIS CLARO 1 CARA", "grisClaro", 6358],
        ["GRIS CLARO 2 CARAS", "grisClaro", 6359],
        ["GRIS METALIZADO 1 CARA", "grisMetalizado", 6358],
        ["GRIS METALIZADO 2 CARAS", "grisMetalizado", 6359],
        ["GRIS SEMI MATE 1 CARA", "grisSemiMate", 6358],
        ["GRIS SEMI MATE 2 CARAS", "grisSemiMate", 6359],
        ["MARFIL CLARO 1 CARA", "marfilClaro", 6358],
        ["MARFIL CLARO 2 CARAS", "marfilClaro", 6359],
        ["MARRON 1 CARA", "marron", 6358],
        ["MARRON 2 CARAS", "marron", 6359],
        ["MARRON AFRICANO 1 CARA", "marronAfricano", 6358],
        ["MARRON AFRICANO 2 CARAS", "marronAfricano", 6359],
        ["NEGRO 1 CARA", "negro", 6358],
        ["NEGRO 2 CARAS", "negro", 6359],
        ["SIMIL ANOD NATURAL 1 CARA", "similAnodNatural", 6358],
        ["SIMIL ANOD NATURAL 2 CARAS", "similAnodNatural", 6359],
        ["VERDE INGLÉS 1 CARA", "verdeIngles", 6358],
        ["VERDE INGLÉS 2 CARAS", "verdeIngles", 6359],
        ["VERDE OSCURO 1 CARA", "verdeOscuro", 6358],
        ["VERDE OSCURO 2 CARAS", "verdeOscuro", 6359]
    ]

    const similMaderaChapasArray = [
        ["CEDRO C7", "cedroC7", 6964],
        ["CEDRO C8", "cedroC8", 6964],
        ["CEDRO F", "cedroF", 6964],
        ["CEREZO G7", "cerezoG7", 6964],
        ["MARMOL CARRARA 111", "marmolCarrara111", 6964],
        ["NOGAL B7", "nogalB7", 6964],
        ["NOGAL D", "nogalD", 6964],
        ["NOGAL OSCURO H", "nogalOscuroH", 6964],
        ["ROBLE CLARO E", "robleClaroE", 6964],
        ["ROBLE CLARO E7", "robleClaroE7", 6964],
        ["ROBLE MEDIO B", "robleMedioB", 6964],
        ["ROBLE OSCURO G", "robleOscuroG", 6964]
    ]

    const microtexturadaChapasArray = [
        ["NEGRO MICROTEXTURADO", "negroMicrotexturado", 77793],
        ["GRIS OSCURO MICROTEXTURADO", "grisOscuroMicrotexturado", 77778],
        ["MARRON OSCURO MICROTEXTURADO", "marronOscuroMicrotexturado", 77795],
        ["MARRON CLARO MICROTEXTURADO", "marronClaroMicrotexturado", 77796]
    ]

    const mensajeColores = () => {
        return (
            <h1 className="textoComunicateConNosotros textoProcesos">
                <span style={{ color: 'white' }}>¡IMPORTANTE!</span> Para realizar encargos de colores que no se listan a continuacin,{' '}
                <a href={isMobile ?
                    (`https://wa.me/5493456475294`)
                    :
                    (`https://web.whatsapp.com/send?phone=+5493456475294`)
                }
                    target='blank'
                    style={{ color: 'rgb(0, 60, 255)', cursor: 'pointer', textDecoration: 'underline' }}>
                    comunicate con nosotros
                </a>
            </h1>
        )
    }

    const mensajeSimilMaderaYMicrotexturadaChapas = () => {
        return (
            <h1 className="textoComunicateConNosotros textoProcesos">
                Las pinturas listadas corresponden a la pintura para 1 cara
            </h1>
        )
    }

    const categorias = [
        ["COLORES", "perfilColor", coloresArray, mensajeColores],
        ["SIMIL MADERA", "perfilSimilMadera", similMaderaArray, ""],
        ["PINTURA MICROTEXTURADA", "perfilMicrotexturado", microtexturadaArray, ""],
        ["COLORES CHAPAS", "chapaColor", coloresChapasArray, mensajeColores],
        ["SIMIL MADERA CHAPAS", "chapaSimilMadera", similMaderaChapasArray, mensajeSimilMaderaYMicrotexturadaChapas],
        ["PINTURA MICROTEXTURADA CHAPAS", "chapaMicrotexturado", microtexturadaChapasArray, mensajeSimilMaderaYMicrotexturadaChapas],
    ];

    const renderCategoriaSeleccionada = () => {
        const categoria = categorias.find((categoria) => categoria[0] == categoriaSeleccionadaPinturas);

        return (
            <>
                {categoria[3] && typeof categoria[3] === 'function' && categoria[3]()}
                {categoria[2]?.map(([nombre, imagen, id]) => (
                    <div className="col-12 col-md-6 col-lg-4 producto proceso colorProceso" key={nombre}>
                        <div
                            className="cardProceso cardColor"
                            style={{ backgroundImage: `url(https://storage.googleapis.com/backend-calvo-415917.appspot.com/coloresYSimilMadera/${imagen}.webp)` }}
                            onClick={() => { setStipoProceso(args.procesos[id]); setColorSeleccionado(nombre); setAcabado(Object.values(procesos).find((p) => p.detalle == ("PINTURA " + nombre)))}}
                        >
                            <h1>{nombre}</h1>
                        </div>
                    </div>
                ))}
            </>
        );
    };

    

    return (
        !stipoProceso && (
            <div className="contenedorPrincipalPinturas row rowProductos">
                {categoriaSeleccionadaPinturas == null ?
                    (categorias.map(([categoria, imagen, array], index) => (
                        <div className="col-12 col-md-6 col-lg-4 producto proceso colorProceso" key={index}>
                            <div
                                className='cardProceso cardCategoriaPintura'
                                onClick={() => setCategoriaSeleccionadaPinturas(categoria)}
                                style={{ backgroundImage: `url(https://storage.googleapis.com/backend-calvo-415917.appspot.com/coloresYSimilMadera/${imagen}.webp)` }}
                            >
                                <h1>{categoria}</h1>
                            </div>
                        </div>
                    )))
                    :
                    renderCategoriaSeleccionada()
                }
            </div>
        )
    );
}
