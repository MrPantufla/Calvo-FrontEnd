import CardProducto from "../Card Producto/cardProducto";
import { useProductos } from "../../../contextProductos";

export default function Eliminados() {
  const {
    productosEliminados,
    productosIndexado,
    procesos
  } = useProductos();

  return (
    <>
      <div className="row rowProductos">
        {productosEliminados
          .filter(producto => productosIndexado[producto] || procesos[producto])
          .map((producto) => (
            <div key={producto} className="col-12 col-md-6 col-lg-4 producto">
              <CardProducto
                producto={productosIndexado[producto] || procesos[producto]}
              />
            </div>
          ))
        }
      </div>
    </>
  );
}