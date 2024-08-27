import './pdfCarrito.css';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import React, { useRef } from 'react';
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

  const generarPDF = async () => {
    const element = pdfRef.current;

    const canvas = await html2canvas(element, {
      scale: 1,
      useCORS: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
    pdf.save('presupuestoCalvo.pdf');
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

  let elementosConProcesos = [];

  let elementosSinProcesos = [];

  let elementosFinal = [];

  let procesosTemporal = [];

  if (elementos.length > 0) {
    elementosConProcesos = elementos.filter(elemento => typeof elemento.id === 'string' && elemento.id.includes('('));
    elementosSinProcesos = elementos.filter(objB => !elementosConProcesos.some(objA => objA.id === objB.id));

    elementosFinal = elementosSinProcesos;

    let productoActual;
    let productoAgregar;
    let procesoActual;
    let procesoAgregar;
    let acabadoActual;
    let acabadoAgregar;

    elementosConProcesos.map((elemento) => {
      acabadoActual = null;
      acabadoAgregar = null;
      //-------------------------------
      productoActual = productosIndexado[extraerProducto(elemento.id)];

      productoAgregar = {
        cantidad: elemento.cantidad,
        cantidadCarrito: elemento.cantidadCarrito,
        cod_origProducto: productoActual.cod_orig,
        detalleProducto: productoActual.detalle,
        id: productoActual.id,
        kg: elemento.kg,
        precioProducto: productoActual.precio,
        tipo_prod: productoActual.tipo_prod
      }

      procesosTemporal.push(productoAgregar);
      //-------------------------------
      procesoActual = procesos[extraerProceso(elemento.id)];

      procesoAgregar = {
        cantidad: elemento.cantidad,
        cantidadCarrito: elemento.cantidadCarrito,
        cod_origProducto: procesoActual.cod_orig,
        detalleProducto: procesoActual.detalle,
        id: procesoActual.id,
        kg: productoActual.rubro != 85 ? (elemento.kg * elemento.cantidadCarrito) : (extraerMetrosCuadrados(productoActual.detalle)),
        precioProducto: procesoActual.precio,
        tipo_prod: procesoActual.tipo_prod
      }

      procesosTemporal.push(procesoAgregar);
      //-------------------------------
      if (extraerAcabado(elemento.id) != 0) {
        acabadoActual = procesos[extraerAcabado(elemento.id)];

        acabadoAgregar = {
          cantidad: elemento.cantidad,
          cantidadCarrito: elemento.cantidadCarrito,
          cod_origProducto: acabadoActual.cod_orig,
          detalleProducto: acabadoActual.detalle,
          id: acabadoActual.id,
          kg: productoActual.rubro != 85 ? (elemento.kg * elemento.cantidadCarrito) : (extraerMetrosCuadrados(productoActual.detalle)),
          precioProducto: acabadoActual.precio,
          tipo_prod: acabadoActual.tipo_prod
        }

        procesosTemporal.push(acabadoAgregar);
      }
    })

    console.log(procesosTemporal)

    /*procesosTemporal.map((elemento) => {
      const coincidencia = elementosFinal.find((e) => e.id == elemento.id);

      if (coincidencia) {
        coincidencia.cantidadCarrito += elemento.cantidadCarrito;
        if (coincidencia.tipo_prod == 'PROCESOS') {
          coincidencia.kg += (elemento.kg);
        }
      }
      else {
        elementosFinal.push(elemento);
      }
    })*/
  }

  procesosTemporal.forEach((elementoActual, index) => {
    // Verificar si el elemento es un proceso y no un acabado
    if (elementoActual.tipo_prod === 'PROCESOS' && elementoActual.rubro !== 89) {
      // Buscar un elemento con el mismo id en la lista
      const coincidencia = procesosTemporal.find((e, idx) => e.id === elementoActual.id && idx !== index);
  
      if (coincidencia) {
        // Verificar si el siguiente elemento del elementoActual es un acabado
        const siguienteElemento = procesosTemporal[index + 1];
        const siguienteElementoCoincidente = procesosTemporal[procesosTemporal.indexOf(coincidencia) + 1];

        if (siguienteElemento && siguienteElemento.rubro === 89) {
          if (siguienteElemento.id === siguienteElementoCoincidente?.id) {
            // Sumar cantidades y kg si los procesos y acabados coinciden
            coincidencia.cantidadCarrito += elementoActual.cantidadCarrito;
            coincidencia.kg += elementoActual.kg;
            siguienteElementoCoincidente.cantidadCarrito += siguienteElemento.cantidadCarrito;
            siguienteElementoCoincidente.kg += siguienteElemento.kg;
  
            // Eliminar los elementos coincidentes
            procesosTemporal.splice(procesosTemporal.indexOf(coincidencia), 1);
            procesosTemporal.splice(procesosTemporal.indexOf(siguienteElementoCoincidente), 1);
            
            // Reordenar la lista para posicionar el producto correspondiente antes del productoActual
            // Encuentra el producto correspondiente a los acabados
            const productoCoincidente = procesosTemporal.find(e => e.id === coincidencia.id && e.tipo_prod !== 'PROCESOS');
            if (productoCoincidente) {
              const indexProducto = procesosTemporal.indexOf(productoCoincidente);
              // Mueve el productoCoincidente antes del elementoActual
              procesosTemporal.splice(indexProducto, 1);
              procesosTemporal.splice(index, 0, productoCoincidente);
            }
          }
        } else{
          // Si no hay acabado siguiente, comprobar que el siguiente del proceso coincidente no sea un acabado
          const siguienteElementoCoincidente = procesosTemporal[procesosTemporal.indexOf(coincidencia) + 1];
          if (!siguienteElementoCoincidente || siguienteElementoCoincidente.rubro !== 89) {
            // Sumar cantidades y kg
            let indice = procesosTemporal.indexOf(coincidencia) -1;

            const [elemento] = procesosTemporal.splice(indice, 1);

            procesosTemporal.splice((index +1), 0, elemento);
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            //--------------SEGUIR TOCANDO POR ACÁ PARA INSERTAR EL ELEMENTO EN EL INDICE ACTUAL +1---------------------
            //----------------------------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------------------------
            coincidencia.cantidadCarrito += elementoActual.cantidadCarrito;
            coincidencia.kg += elementoActual.kg;
  
            // Eliminar el proceso coincidente
            procesosTemporal.splice(procesosTemporal.indexOf(coincidencia), 1);
            procesosTemporal.splice()
          }
        }
      }
    }
  });

  console.log(procesosTemporal)

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

          {elementosFinal.length > 0 && elementosFinal.map((elemento) => {
            if (!elemento) return null;

            let producto = productosIndexado[elemento.id];

            if (!producto) {
              producto = procesos[elemento.id];
              if (!producto) {
                producto = troquelados[elemento.id];
                if (!producto) {
                  return null;
                }
              }
            }

            const esProceso = producto.rubro && (producto.rubro === 67 || producto.rubro === 78 || producto.rubro === 3 || producto.rubro === 73 || producto.rubro === 89 || producto.rubro == 88);

            // Verificamos que las propiedades necesarias existen antes de acceder a ellas
            const unidad = ((marcasUnicas && marcasUnicas.has(producto.marca)) || (esProceso && !producto.detalle.includes("M2"))) ?
              ("KG")
              :
              (
                esProceso ?
                  ('M2')
                  :
                  ('UNID')
              );

            const totalUnidad = ((unidad === "KG" || unidad === 'M2') ?
              marcasUnicas.has(producto.marca) ?
                (elemento.cantidadCarrito ? producto.kg * elemento.cantidadCarrito : 0)
                :
                (elemento.kg)
              :
              (producto.cantidad && elemento.cantidadCarrito ? producto.cantidad * elemento.cantidadCarrito : 0)
            );

            const totalProducto = ((producto.cantidad || 1) * (producto.precio || 1) * ((elemento.kg > 0 && producto.rubro != 85) ? elemento.kg : 1) * (esProceso ? (1) : elemento.cantidadCarrito)).toFixed(2);

            return (
              <div className="elementosPdf" key={elemento.id}>
                <p className="primerP">{producto.cod_int}</p>{/*Código*/}
                <p>{producto.cod_orig + " - " + (producto.detalle || '')}</p>{/*Descripción*/}
                <p>{(elemento.cantidadCarrito * (producto.cantidad || 1)).toFixed(2)}</p>{/*Cant.Unid.*/}
                <p>{(totalProducto / (totalUnidad)).toFixed(2)}</p>{/*P. X Unid.*/}
                <p>{unidad}</p>{/*Unid.Med.*/}
                <p>{totalUnidad.toFixed(2)}</p>{/*Cantidad*/}
                <p>{(producto.precio || 0).toFixed(2)}</p>{/*P.Vta.*/}
                <p>{totalProducto}</p>{/*Total*/}
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
        <button onClick={() => generarPDF()}>Generar pdf</button>
      </div>
    </div>
  );
}