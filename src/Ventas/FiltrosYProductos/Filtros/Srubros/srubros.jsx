import './srubros.css';
import { useTienda } from "../../../../contextTienda";
import { useEffect, useState } from 'react';
import Srubro from './srubro.jsx';

export default function Srubros(args) {
    const rubro = args.rubro;

    const {
        srubroActivo
    } = useTienda();

    const [srubrosRender, setSrubrosRender] = useState(args.srubros);

    useEffect(() => {
        if (srubroActivo && rubro.id != 'Maquinas' && rubro.id != 'PuertasPlacas' && rubro.id != 'Automatismos' && rubro.id != 'Chapas' && rubro.id != 'Herramientas' && rubro.id != 'TejidosMosquiteros') {
            const updatedSrubros = args.srubros.filter(srubro => srubro !== undefined && srubro !== srubroActivo);
            const selectedSurbro = args.srubros.find(srubro => srubro !== undefined && srubro === srubroActivo);
            if (selectedSurbro) {
                updatedSrubros.unshift(selectedSurbro);
            }
            setSrubrosRender(updatedSrubros);
        } else {
            setSrubrosRender(args.srubros);
        }
    }, [srubroActivo, rubro]);

    return (
        <div className="srubrosRender">
            {srubrosRender.length > 0 && (srubrosRender.map((srubro, index) => (
                srubro !== undefined &&
                <Srubro
                    index={index}
                    srubro={srubro}
                    key={index}
                    rubro={args.rubro}
                    colores={srubro.colores}
                    setPaginaActual={args.setPaginaActual}
                />
            )))}
        </div>
    );
}