import './productoGrande.css';

export default function ProductoGrande(props) {
    return (
        <div className="contenedorPrincipalProductoGrande">
            <div className="parteUtilizableProductoGrande">
                <div className="botonCerrarContainer">
                    <button className="botonCerrarProductoGrande" />
                </div>
                <div className="productoGrandeContainer">
                    <p className="informacion">
                        {props.cod_orig}
                        {props.detalle}
                    </p>
                </div>
            </div>
        </div>
    );
}