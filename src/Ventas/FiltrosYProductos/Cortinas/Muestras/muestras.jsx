import './muestras.css';
import { useCortinas } from '../../../../contextCortinas';
import CardMuestra from './Card muestra/cardMuestra';
import { useTienda } from '../../../../contextTienda';

export default function Muestras() {
    const { 
        tipo,
        muestrasAbierto,
        setMuestrasAbierto
    } = useCortinas();
    
    const { 
        busquedaYFiltrosTop,
        isMobile
    } = useTienda();

    return (
        <div className={`contenedorPrincipalMuestras ${muestrasAbierto ? 'open' : ''}`} style={isMobile == false ? ({top: `${busquedaYFiltrosTop}rem`}) : {}}>
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
            <CardMuestra titulo="Medida de vano" muestra="categoria" />
            <CardMuestra titulo="Medida de abertura" muestra="categoria" />
        </div>
    );
}