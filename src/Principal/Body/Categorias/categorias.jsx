import CardCategoria from './cardCategoria';
import './categorias.css';
import { rubros } from '../../../rubros.js';

export default function Categorias() {
    const categorias = ["PERFILES", "ACCESORIOS", "AUTOMATISMOS", "CHAPAS", "HERRAMIENTAS", "PANELES", "POLICARBONATOS Y POLIESTIRENOS", "PUERTAS PLACAS", "TEJIDOS MOSQUITEROS", "MÁQUINAS", "CORTINAS", "SOFTWARE"];

    function convertString(input) {
        let words = input.split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
    
        let result = words.join('').replace(/\s+/g, '');
    
        return result;
    }

    return (
        <div className="contenedorPrincipalCategorias">
            <div className="row rowCategorias">
                {categorias.map((categoria, index) => {
                    let rubro = rubros.find(r => r.nombre === categoria);

                    return (
                        <div className="col-6 col-md-3 categoria" key={categoria}>
                            <CardCategoria
                                referencia={convertString(categoria)}
                                cat={categoria}
                                imagen={categoria}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}