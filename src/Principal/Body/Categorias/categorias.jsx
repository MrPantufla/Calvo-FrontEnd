import CardCategoria from './cardCategoria';
import './categorias.css';

export default function Categorias() {
    const categorias = ["PERFILES", "TRATAMIENTOS", "ACCESORIOS", "PANELES", "PUERTAS", "POLICARBONATOS",
        "POLIESTIRENOS", "CORTINAS", "AUTOMATIZACION", "MAQUINAS Y HERRAMIENTAS", "CIELORRASOS", "SOFTWARE"];

    return (
        <div className="contenedorPrincipalCategorias">
            <div className="row rowCategorias">
                {categorias.map((categoria) => (
                    <div className="col-3 categoria" key={categoria}>
                        <CardCategoria cat={categoria}/>
                    </div>
                ))}
            </div>
        </div>
    );
}
