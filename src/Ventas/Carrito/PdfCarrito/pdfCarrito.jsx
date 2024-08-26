import './pdfCarrito.css';

import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { useCarrito } from '../../../contextCarrito';
import { useAuth } from '../../../contextLogin';
import { useEffect, useState } from 'react';
import { useVariables } from '../../../contextVariables';
import Cookies from 'js-cookie';
import { useProductos } from '../../../contextProductos';

export default function PdfCarrito() {
  const pdfRef = useRef(null);

  const {
    elementos,
    extraerProceso,
    extraerProducto,
    extraerAcabado
  } = useCarrito();

  const {
    procesos,
    troquelados,
    productosSueltos,
    productosIndexado,
    marcasUnicas,
    extraerMetrosCuadrados
  } = useProductos();

  const { state } = useAuth();

  const { backend } = useVariables();

  const [clienteInfo, setClienteInfo] = useState(null);

  const obtenerFechaFormateada = () => {
    const fecha = new Date();

    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();

    return `${dia}/${mes}/${anio}`;
  };

  const generarPDF = () => {
    const element = pdfRef.current;

    // Configura las opciones del PDF
    const options = {
      margin: [10, 10, 10, 10],
      filename: 'presupuestoCalvo.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generar y guardar el PDF
    html2pdf().from(element).set(options).save();
  };

  const obtenerCliente = async () => {
    let tokenParaEnviar = Cookies.get('jwtToken');

    if (tokenParaEnviar == undefined) {
      tokenParaEnviar = null;
    }

    try {
      const response = await fetch(`${backend}/api/obtenerCliente`, {
        method: 'GET',
        headers: {
          'Authorization': tokenParaEnviar,
        },
      })
      if (response.ok) {
        const data = await response.json();
        setClienteInfo(data);
      }
    } catch (error) {
      console.error('Error al obtener cliente:', error);
    }
  };

  useEffect(() => {
    if (state.userInfo && state.userInfo.cliente) {
      obtenerCliente();
    }
  }, [state.userInfo.cliente]);

  const calcularTotal = (elementos, conDescuento) => {
    return elementos.reduce((total, elemento) => {

      const idProducto = extraerProducto(elemento.id);
      const idProceso = extraerProceso(elemento.id);
      const idAcabado = extraerAcabado(elemento.id);

      let producto = productosIndexado[idProducto];

      if (producto == null) {
        producto = productosSueltos[idProducto];
      }

      let proceso = procesos[idProceso];
      let acabado = procesos[idAcabado];

      if (!proceso) {
        proceso = troquelados[idProceso]
      }

      const precioElemento = (producto.rubro == 85 ?
        (producto.precio + (proceso ? (proceso.precio * extraerMetrosCuadrados(producto.detalle)) : (0)) + (acabado ? (acabado.precio * extraerMetrosCuadrados(producto.detalle)) : (0)))
        :
        (producto && producto.kg > 0)
          ? (producto.precio * producto.kg + (proceso ? (proceso.precio * producto.kg) : 0) + (acabado ? (acabado.precio * producto.kg) : (0)))
          : producto.precio
      )

      if (conDescuento && !(elemento.tipo_prod == 'PERFIL' && (elemento.cod_origProducto.endsWith('E') || elemento.cod_origProducto.endsWith('ES')))) {

        return total + ((precioElemento * elemento.cantidadCarrito * elemento.cantidad) * 97 / 100);
      }
      else {
        return total + (precioElemento * elemento.cantidadCarrito * elemento.cantidad);
      }
    }, 0);
  };

  return (
    <div>
      <div id="pdf-preview" ref={pdfRef}>
        <img src="/ImagenesExtra/logo_calvo.webp" />
        <h1 className="tituloPdf">PRESUPUESTO</h1>
        <h2 className="fechaPdf">{obtenerFechaFormateada()}</h2>

        {clienteInfo &&
          <div className="datosContenedorPdf">
            <div>
              <p><span>Cliente: </span>{"       " + clienteInfo.codigo + "        " + state.userInfo.nombre.toUpperCase() + " " + state.userInfo.apellido.toUpperCase()}</p>
              <p><span>IVA: </span>{clienteInfo.iva + "     " + state.userInfo.cuit}</p>
            </div>

            <div>
              <p><span>Domicilio: </span>{"       " + clienteInfo.direccion.trim().toUpperCase()}</p>
              <p>{state.userInfo.localidad}</p>
              <p>{state.userInfo.provincia}</p>
              <p>{clienteInfo.zona}</p>
            </div>
          </div>
        }

        <div className="productosContenedorPdf" style={{ marginTop: clienteInfo ? ("165px") : ("115px") }}>
          <p>     Código            Descripción                                                                   Cant.Unid.   P.x Unid.   Unid.Med.     Cantidad     P.Vta.             Total</p>
          <hr />
          {elementos.map((elemento) => {
            const producto = productosIndexado[elemento.id];

            const unidad = (marcasUnicas && marcasUnicas.has(producto.marca)) ?
              ("KG")
              :
              (
                ((producto.rubro == 65 || producto.rubro == 67 || producto.rubro == 78 || producto.rubro == 3 || producto.rubro == 73 || producto.rubro == 89) && producto.detalle.includes("M2")) ?
                  ('M2')
                  :
                  ('UNID')
              )

            const totalUnidad = (unidad == "KG" ?
              (producto.kg * elemento.cantidadCarrito)
              :
              (producto.cantidad * elemento.cantidadCarrito)
            )

            return (
              <div className="elementosPdf" key={elemento.id}>
                <p className="primerP">{producto.cod_int}</p>
                <p>{producto.cod_orig + " - " + producto.detalle}</p>
                <p>{(elemento.cantidadCarrito * producto.cantidad).toFixed(2)}</p>
                <p>{(producto.precio * (producto.kg > 0 ? producto.kg : 1)).toFixed(2)}</p>
                <p>{unidad}
                </p>
                <p>{totalUnidad.toFixed(2)}</p>
                <p>{(producto.precio).toFixed(2)}</p>
                <p>{(elemento.cantidadCarrito * producto.cantidad * producto.precio * (producto.kg > 0 ? producto.kg : 1)).toFixed(2)}</p>
              </div>
            );
          })}
        </div>
        <p className="totalPresupuesto">TOTAL<br />{calcularTotal(elementos, false).toFixed(2)}</p>
        <p className="warningPresupuesto"> 
          1- Para poder confirmar presupuestos en colores varios o anodizados se necesita una seña del 50%   del presupuesto. Dicha seña no congela el precio del presupuesto<br />
          2- Los precios pueden variar sin previo aviso<br />
          3- Los KG son a modo referencial, los mismo pueden variar al momento de preparar el pedido<br />
          <span>Corroborar el presupuesto al confirmar, la empresa no se responsabiliza de  diferencia alguna.</span>
        </p>
      </div>
    </div>
  );
}