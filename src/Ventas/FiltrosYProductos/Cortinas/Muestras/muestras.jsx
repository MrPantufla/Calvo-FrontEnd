import './muestras.css';
import { useCortinas } from '../../../../contextCortinas';
import CardMuestra from './Card muestra/cardMuestra';
import { useTienda } from '../../../../contextTienda';

export default function Muestras() {
    const {
        tipo,
        linea,
        muestrasAbierto
    } = useCortinas();

    const {
        busquedaYFiltrosTop,
        isMobile
    } = useTienda();

    console.log(linea)

    return (
        <div className={`contenedorPrincipalMuestras ${muestrasAbierto ? 'open' : ''}`} style={isMobile == false ? ({ top: `${busquedaYFiltrosTop}rem` }) : {}}>
            <div className="tituloMuestra">
                <p>
                    {tipo === 'roller' ?
                        ('ROLLER')
                        :
                        (tipo === 'persianaPvc' ?
                            ('PERSIANA PVC')
                            :
                            (tipo === 'portonAluminio' ?
                                ('PORTON DE ALUMINIO')
                                :
                                (tipo === 'persianaAluminio' ?
                                    ('PERSIANA DE ALUMINIO')
                                    :
                                    ('')
                                )
                            )
                        )
                    }
                </p>
            </div>
            {tipo == 'roller' ?
                (<>
                    {linea == 'screen' &&
                        <>
                            <CardMuestra titulo='SHANTUNG' muestra='https://storage.googleapis.com/backend-calvo-415917.appspot.com/muestrasCortinas/roller/shantung.webp' />
                            <CardMuestra titulo='PARIS' muestra='https://storage.googleapis.com/backend-calvo-415917.appspot.com/muestrasCortinas/roller/paris.webp' />
                            <CardMuestra titulo='OKIATA' muestra='https://storage.googleapis.com/backend-calvo-415917.appspot.com/muestrasCortinas/roller/okiata.webp' />
                        </>
                    }
                    {linea == 'blackout' &&
                        <>
                            <CardMuestra titulo='BLACK OUT' muestra='https://storage.googleapis.com/backend-calvo-415917.appspot.com/muestrasCortinas/roller/blackout.webp' />
                        </>
                    }
                    {linea == 'vision' &&
                        <>
                            <CardMuestra titulo='STRIPE VISION' muestra='https://storage.googleapis.com/backend-calvo-415917.appspot.com/muestrasCortinas/roller/stripevision.webp' />
                        </>
                    }
                    <CardMuestra titulo='COMO TOMAR MEDIDAS' muestra='https://storage.googleapis.com/backend-calvo-415917.appspot.com/muestrasCortinas/roller/tomarMedidas.webp' />
                    <CardMuestra titulo='LADO DEL MECANISMO' muestra='https://storage.googleapis.com/backend-calvo-415917.appspot.com/muestrasCortinas/roller/ladoDelMecanismo.webp' />
                    <CardMuestra titulo='CAIDA INTERIOR' muestra='https://storage.googleapis.com/backend-calvo-415917.appspot.com/muestrasCortinas/roller/caidaInterior.webp' />
                    <CardMuestra titulo='CAIDA EXTERIOR' muestra='https://storage.googleapis.com/backend-calvo-415917.appspot.com/muestrasCortinas/roller/caidaExterior.webp' />
                </>)
                :
                (tipo == 'persianaAluminio' ?
                    (<>
                        <CardMuestra titulo='DAP-ABK AUTOBLOCANTE' muestra='https://storage.googleapis.com/backend-calvo-415917.appspot.com/muestrasCortinas/persianaAluminio/dapABK.webp' />
                        <CardMuestra titulo='DAP-44' muestra='https://storage.googleapis.com/backend-calvo-415917.appspot.com/muestrasCortinas/persianaAluminio/dap44.webp' />
                        <CardMuestra titulo='DAP-45' muestra='https://storage.googleapis.com/backend-calvo-415917.appspot.com/muestrasCortinas/persianaAluminio/dap45.webp' />
                        <CardMuestra titulo='DAP-49 MICROPERFORADA' muestra='https://storage.googleapis.com/backend-calvo-415917.appspot.com/muestrasCortinas/persianaAluminio/dap49.webp' />
                        <CardMuestra titulo='DAP-55 CON FELPA' muestra='https://storage.googleapis.com/backend-calvo-415917.appspot.com/muestrasCortinas/persianaAluminio/dap55.webp' />
                        <CardMuestra titulo='BARRIO TUBULAR' muestra='https://storage.googleapis.com/backend-calvo-415917.appspot.com/muestrasCortinas/persianaAluminio/dapBarrio.webp' />
                        <CardMuestra titulo='BARRIO LIVIANA CON FELPA' muestra='https://storage.googleapis.com/backend-calvo-415917.appspot.com/muestrasCortinas/persianaAluminio/dapBarrioFelpa.webp' />
                        <CardMuestra titulo='TABLA DE REDUCTORES' muestra='https://storage.googleapis.com/backend-calvo-415917.appspot.com/muestrasCortinas/persianaAluminio/reductores.webp' />
                        <CardMuestra titulo='LADO DEL MECANISMO' muestra='https://storage.googleapis.com/backend-calvo-415917.appspot.com/muestrasCortinas/persianaAluminio/ladoDelMecanismo.webp' />
                    </>)
                    :
                    (tipo == 'portonAluminio' &&
                        <>
                            <CardMuestra titulo='DAP-55 CON FELPA' muestra='https://storage.googleapis.com/backend-calvo-415917.appspot.com/muestrasCortinas/portonAluminio/dap55.webp' />
                            <CardMuestra titulo='DAP-64' muestra='https://storage.googleapis.com/backend-calvo-415917.appspot.com/muestrasCortinas/portonAluminio/dap64.webp' />
                            <CardMuestra titulo='DAP-79' muestra='https://storage.googleapis.com/backend-calvo-415917.appspot.com/muestrasCortinas/portonAluminio/dap79.webp' />
                        </>
                    )
                )
            }
        </div>
    );
}