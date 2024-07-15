import './marcas.css';
import Marca from './marca.jsx';
import { useTienda } from '../../../../contextTienda.jsx';

export default function Marcas(args) {

    const { marcaActiva } = useTienda();

    const marcasOrdenadas = args.rubro.marcas.filter(marca => marca !== marcaActiva);

    marcasOrdenadas.unshift(marcaActiva);

    return (
        <>
            {(marcasOrdenadas.map((marca) => (
                marca != null &&
                <Marca
                    marca={marca}
                    handleScrollClick={args.handleScrollClick}
                    setPaginaActual={args.setPaginaActual}
                    rubro={args.rubro}
                    coloresUnicos={args.coloresUnicos}
                    srubrosUnicos={args.srubrosUnicos}
                    key={marca.nombre}
                />
            )))}
        </>
    );
}