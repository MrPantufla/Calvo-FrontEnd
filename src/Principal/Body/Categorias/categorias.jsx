import CardCategoria from './cardCategoria';
import './categorias.css';
import { rubros } from '../../../rubros.js';

export default function Categorias() {
    const categorias = ["PERFILES", "ACCESORIOS", "AUTOMATISMOS", "CHAPAS", "HERRAMIENTAS", "PANELES", "POLICARBONATOS Y POLIESTIRENOS", "PUERTAS PLACAS", "TEJIDOS MOSQUITEROS", "MÁQUINAS", "CORTINAS", "SOFTWARE"];

    return (
        <div className="contenedorPrincipalCategorias">
            <div className="row rowCategorias">
                {categorias.map((categoria, index) => {
                    let rubro = rubros.find(r => r.nombre === categoria);

                    if (categoria === 'POLICARBONATOS Y POLIESTIRENOS') {
                        rubro = rubros.find(r => r.nombre === "POLICARBONATOS");
                    }

                    return (
                        <div className="col-6 col-md-3 categoria" key={categoria}>
                            <CardCategoria
                                referencia={rubro ? rubro.id : null}
                                cat={categoria}
                                imagen={(index % 2 !== 0) ? "ACCESORIO2" : "PERFIL"}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}