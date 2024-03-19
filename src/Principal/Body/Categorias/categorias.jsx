import CardCategoria from './cardCategoria';
import './categorias.css';

export default function Categorias() {
    const categorias = ["PERFILES", "ACCESORIOS", "PANELES", "PUERTAS PLACAS", "POLICARBONATOS Y POLIESTIRENOS", "MÁQUINAS Y HERRAMIENTAS", "CORTINAS", "SOFTWARE"];
    
    return (
        <div className="contenedorPrincipalCategorias">
            <div className="row rowCategorias">
                {categorias.map((categoria, index) => (
                    <div className="col-6 col-md-3 categoria" key={categoria}>
                        <CardCategoria cat={categoria} imagen={(index % 2 !== 0) ? ("ACCESORIO2") : ("PERFIL")}/>
                    </div>
                ))}
            </div>
        </div>
    );
}
