import CardProducto from "../Card Producto/cardProducto";
import { useProductos } from "../../../contextProductos";

export default function Eliminados() {
  const {
    productosEliminados,
    productosIndexado
  } = useProductos();

  return (
    <>
      <div className="row rowProductos">
        {productosEliminados.map((producto) => (
          <div key={producto} className="col-12 col-md-6 col-lg-4 producto">
            <CardProducto
              id={productosIndexado[producto].id}
              cod_orig={productosIndexado[producto].cod_orig}
              tipo_prod={productosIndexado[producto].tipo_prod}
              srubro={productosIndexado[producto].srubro}
              detalle={productosIndexado[producto].detalle}
              precio={productosIndexado[producto].precio}
              color={productosIndexado[producto].color}
              kg={productosIndexado[producto].kg}
              key={productosIndexado[producto].id}
              cod_int={productosIndexado[producto].cod_int}
            />
          </div>
        ))}
      </div>
    </>
  );
}