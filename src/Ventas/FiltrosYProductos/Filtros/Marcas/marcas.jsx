import './marcas.css';
import Marca from './marca.jsx';
import { useTienda } from '../../../../contextTienda.jsx';
import { useEffect, useState } from 'react';

export default function Marcas(args) {
    const {
        marcas,
        marcaActiva
    } = useTienda();

    const [marcasRender, setMarcasRender] = useState(marcas);

    useEffect(() => {
        if (marcaActiva) {
            const updatedMarcas = marcas.filter(marca => marca !== marcaActiva);
            updatedMarcas.unshift(marcaActiva);
            setMarcasRender(updatedMarcas);
        } else {
            setMarcasRender(marcas);
        }
    }, [marcaActiva, marcas]);

    let marcasFiltradas = marcasRender;

    if(args.sinEco){
        marcasFiltradas = marcasRender.filter((marca) => !marca.nombre.includes('ECO'));
    }

    let sinColores = args.sinColores ? true : false;

    return (
        <div className="marcasRender" onClick={(e) => e.stopPropagation()}>
            {marcasFiltradas.map((marca) => (
                marca != null &&
                <Marca
                    marca={marca}
                    handleScrollClick={args.handleScrollClick}
                    setPaginaActual={args.setPaginaActual}
                    rubro={args.rubro}
                    key={marca.nombre}
                    sinColores={sinColores}
                />
            ))}
        </div>
    );
}
