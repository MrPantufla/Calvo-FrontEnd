import CardProducto from "../Card Producto/cardProducto";
import { useProductos } from "../../../contextProductos";

export default function Eliminados(){
    const { productosEliminados } = useProductos();

    return(
        <>
            <div className="row rowProductos">
                {productosEliminados.map((producto) => (
                  <div key={producto.id} className="col-12 col-md-6 col-lg-4 producto">
                    <CardProducto
                      id={producto.id}
                      cod_orig={producto.cod_orig}
                      tipo_prod={producto.tipo_prod}
                      srubro={producto.srubro}
                      detalle={producto.detalle}
                      precio={producto.precio}
                      color={producto.color}
                      kg={producto.kg}
                      key={producto.id}
                      cod_int={producto.cod_int}
                    />
                  </div>
                ))}
              </div>
        </>
    );
}