import './srubros.css';
import { useTienda } from "../../../../contextTienda";
import { useEffect, useState } from 'react';
import { srubrosPerfiles } from "../../../../rubros.js";
import Srubro from './srubro.jsx';

export default function Srubros(args) {
    const [srubrosStruct, setSrubrosStruct] = useState([]);
    const [srubrosListos, setSrubrosListos] = useState(false);

    const {
        marcaActiva,
        srubroActivo
    } = useTienda();

    let srubros = args.srubros;

    useEffect(() => {
        if (marcaActiva) {
            const nuevosSrubrosStruct = srubros.map(numeroSrubro => {
                return srubrosPerfiles.find(srubro => srubro.id === numeroSrubro);
            });
            setSrubrosStruct(nuevosSrubrosStruct);
        } else {
            setSrubrosStruct(srubros);
        }
        setSrubrosListos(true);
    }, [marcaActiva, srubros]);

    if (!srubrosListos) {
        return null;
    }

    return (
        <>
            {srubroActivo ?
                (<Srubro
                    index={1}
                    srubro={srubrosStruct.find(srubro => srubro.id == srubroActivo)}
                    rubro={args.rubro}
                    coloresUnicos={args.coloresUnicos}
                    setPaginaActual={args.setPaginaActual}
                />)
                :
                (srubrosStruct.map((srubro, index) => (
                    srubro !== undefined &&
                    <Srubro
                        index={index}
                        srubro={srubro}
                        key={index}
                        rubro={args.rubro}
                        coloresUnicos={args.coloresUnicos}
                        setPaginaActual={args.setPaginaActual}
                    />
                )))}
        </>
    );
}
