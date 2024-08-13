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

    return (
        <div className="marcasRender">
            {marcasRender.map((marca) => (
                marca != null &&
                <Marca
                    marca={marca}
                    handleScrollClick={args.handleScrollClick}
                    setPaginaActual={args.setPaginaActual}
                    rubro={args.rubro}
                    key={marca.nombre}
                />
            ))}
        </div>
    );
}
