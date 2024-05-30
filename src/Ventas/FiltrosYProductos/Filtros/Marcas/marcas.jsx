import './marcas.css';
import Marca from './marca.jsx';
import { useTienda } from '../../../../contextTienda.jsx';

export default function Marcas(args) {

    const { marcaActiva } = useTienda();

    return (
        <>
            {marcaActiva ?
                (<Marca
                    marca={marcaActiva}
                    handleScrollClick={args.handleScrollClick}
                    setPaginaActual={args.setPaginaActual}
                    rubro={args.rubro}
                    coloresUnicos={args.coloresUnicos}
                    srubrosUnicos={args.srubrosUnicos}
                    key={marcaActiva.nombre}
                />)
                :
                (args.rubro.marcas.map((marca) => (
                    <Marca
                        marca={marca}
                        handleScrollClick={args.handleScrollClick}
                        setPaginaActual={args.setPaginaActual}
                        rubro={args.rubro}
                        coloresUnicos={args.coloresUnicos}
                        srubrosUnicos={args.srubrosUnicos}
                        key={marca.nombre}
                    />
                )))
            }
        </>
    );
}