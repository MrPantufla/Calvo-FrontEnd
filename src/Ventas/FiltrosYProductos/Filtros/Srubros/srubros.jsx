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
        if (args.marca ? (srubroActivo?.srubros?.length > 1) : (srubroActivo?.colores?.length > 1)) {
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

    //Si estamos en el rubro de perfiles, los srubros pasan a ser los colores y viceversa. Marca se envía como argumento para saber dentro del Srubro si nos encontramos con el rubro "Perfiles" activo

    return (
        <div className="srubrosRender">
            {srubrosRender?.length > 0 && (srubrosRender.map((srubro, index) => (
                srubro !== undefined &&
                <Srubro
                    index={index}
                    srubro={srubro}
                    key={index}
                    rubro={args.rubro}
                    colores={srubro.colores}
                    setPaginaActual={args.setPaginaActual}
                    sinColores={args.sinColores}
                    marca={args.marca && args.marca}
                />
            )))}
        </div>
    );
}