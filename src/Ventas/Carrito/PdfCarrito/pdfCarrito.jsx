import './pdfCarrito.css';

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
    extraerTroquelado,
    extraerAcabado,
    setPdfRef
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

  const {
    backend,
    obtenerFechaFormateada
  } = useVariables();

  const [clienteInfo, setClienteInfo] = useState(null);

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

  let elementosConProcesos = [];

  let elementosSinProcesos = [];

  let elementosFinal = [];

  let procesosTemporal = [];

  if (elementos.length > 0) {
    elementosConProcesos = elementos.filter(elemento => typeof elemento.id === 'string' && elemento.id.includes('('));
    elementosSinProcesos = elementos.filter(objB => !elementosConProcesos.some(objA => objA.id === objB.id));
    let elementosSinProcesosSeparados = [];
    let perfilAgregar;
    let troqueladoAgregarSinProceso;

    if (elementosSinProcesos.length > 0) {
      elementosSinProcesos.forEach(e => {
        const perfil = productosIndexado[extraerProducto(e.id)];

        perfilAgregar = {
          cantidad: e.cantidad,
          cantidadCarrito: e.cantidadCarrito,
          cod_origProducto: perfil.cod_orig,
          detalleProducto: perfil.detalle,
          id: perfil.id,
          kg: perfil.kg,
          precioProducto: perfil.precio,
          tipo_prod: perfil.tipo_prod,
          rubro: perfil.rubro
        }

        elementosSinProcesosSeparados.push(perfilAgregar);

        if(typeof(e.id) == "string" && e.id.includes("-")){
          const troq = troquelados[extraerTroquelado(e.id)];

          if(troq){
            troqueladoAgregarSinProceso = {
              cantidad: e.cantidad,
              cantidadCarrito: e.cantidadCarrito,
              cod_origProducto: troq.cod_orig,
              detalleProducto: troq.detalle,
              id: troq.id,
              kg: perfil.kg,
              precioProducto: troq.precio,
              tipo_prod: troq.tipo_prod,
              rubro: troq.rubro
            }
          }

          elementosSinProcesosSeparados.push(troqueladoAgregarSinProceso);
        }
      })
    }

    elementosFinal = elementosSinProcesosSeparados;

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
        tipo_prod: productoActual.tipo_prod,
        rubro: productoActual.rubro
      }

      procesosTemporal.push(productoAgregar);
      //-------------------------------
      if(elemento.id.includes("-")){
        const troq = troquelados[extraerTroquelado(elemento.id)];

        if(troq){
          troqueladoAgregarSinProceso = {
            cantidad: elemento.cantidad,
            cantidadCarrito: elemento.cantidadCarrito,
            cod_origProducto: troq.cod_orig,
            detalleProducto: troq.detalle,
            id: troq.id,
            kg: elemento.kg,
            precioProducto: troq.precio,
            tipo_prod: troq.tipo_prod,
            rubro: troq.rubro
          }
        }

        procesosTemporal.push(troqueladoAgregarSinProceso);
      }
      //-------------------------------
      procesoActual = procesos[extraerProceso(elemento.id)];
      if (!procesoActual) {
        procesoActual = troquelados[extraerProceso(elemento.id)];
      }

      procesoAgregar = {
        cantidad: elemento.cantidad,
        cantidadCarrito: elemento.cantidadCarrito,
        cod_origProducto: procesoActual.cod_orig,
        detalleProducto: procesoActual.detalle,
        id: procesoActual.id,
        kg: productoActual.rubro != 85 ? (elemento.kg * elemento.cantidadCarrito) : (extraerMetrosCuadrados(productoActual.detalle) * elemento.cantidadCarrito),
        precioProducto: procesoActual.precio,
        tipo_prod: procesoActual.tipo_prod,
        rubro: procesoActual.rubro
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
          kg: productoActual.rubro != 85 ? (elemento.kg * elemento.cantidadCarrito) : (extraerMetrosCuadrados(productoActual.detalle) * elemento.cantidadCarrito),
          precioProducto: acabadoActual.precio,
          tipo_prod: acabadoActual.tipo_prod,
          rubro: acabadoActual.rubro
        }

        procesosTemporal.push(acabadoAgregar);
      }
    })

    procesosTemporal.forEach((elementoActual, index) => {
      // Verificar si el elemento es un proceso y no un acabado
      if (procesos[elementoActual.id] && procesos[elementoActual.id].rubro !== 89) {
        // Usamos un bucle for para encontrar todas las coincidencias después del índice actual
        for (let j = index + 1; j < procesosTemporal.length; j++) {
          const elementoComparado = procesosTemporal[j];

          // Comprobar si ambos elementos son el mismo proceso
          if (elementoComparado.id === elementoActual.id) {
            // Obtener el siguiente elemento para ambos procesos
            const siguienteElementoActual = procesosTemporal[index + 1];
            const siguienteElementoComparado = procesosTemporal[j + 1];

            // Verificar si ambos productos no tienen acabado
            const ambosSinAcabado =
              (!siguienteElementoActual ||
                !(procesos[siguienteElementoActual.id] && procesos[siguienteElementoActual.id].rubro === 89)) &&
              (!siguienteElementoComparado ||
                !(procesos[siguienteElementoComparado.id] && procesos[siguienteElementoComparado.id].rubro === 89));

            // Verificar si ambos productos tienen el mismo acabado
            const mismoAcabado =
              siguienteElementoActual &&
              siguienteElementoComparado &&
              procesos[siguienteElementoActual.id] &&
              procesos[siguienteElementoActual.id].rubro === 89 &&
              siguienteElementoActual.id === siguienteElementoComparado.id;

            if (ambosSinAcabado || mismoAcabado) {
              // Sumar cantidades y kg si los procesos coinciden
              elementoActual.cantidadCarrito += elementoComparado.cantidadCarrito;
              elementoActual.kg += elementoComparado.kg;

              // Si ambos tienen el mismo acabado, sumar cantidades y kg del acabado también
              if (mismoAcabado) {
                siguienteElementoActual.cantidadCarrito += siguienteElementoComparado.cantidadCarrito;
                siguienteElementoActual.kg += siguienteElementoComparado.kg;
              }

              // Mover el producto actual justo antes del proceso con el que coincide
              const indiceElementoComparado = procesosTemporal.indexOf(elementoComparado);

              if (mismoAcabado) {
                procesosTemporal.splice(indiceElementoComparado, 2)
              }
              else {
                procesosTemporal.splice(indiceElementoComparado, 1)
              }

              const productoParaMover = procesosTemporal[indiceElementoComparado - 1];
              procesosTemporal.splice(index, 0, productoParaMover)
              procesosTemporal.splice(indiceElementoComparado, 1)
            }
          }
        }
      }
    });
  }

  procesosTemporal.forEach((elementoActual) => {
    elementosFinal.push(elementoActual);
  })

  useEffect(() => {
    setPdfRef(pdfRef)
  }, [])

  const calcularTotal = (elementos, conDescuento) => {
    return elementos.reduce((total, elemento) => {

      const idProducto = extraerProducto(elemento.id);
      const idTroquelado = extraerTroquelado(elemento.id);
      const idProceso = extraerProceso(elemento.id);
      const idAcabado = extraerAcabado(elemento.id);

      let producto = productosIndexado[idProducto];

      if (producto == null) {
        producto = productosSueltos[idProducto];
      }

      let troquelado = troquelados[idTroquelado];
      let proceso = procesos[idProceso];
      let acabado = procesos[idAcabado];

      if (!proceso) {
        proceso = troquelados[idProceso]
      }

      const precioElemento = (producto && producto.rubro == 85 ?
        (producto.precio + (proceso ? (proceso.precio * extraerMetrosCuadrados(producto.detalle)) : (0)) + (acabado ? (acabado.precio * extraerMetrosCuadrados(producto.detalle)) : (0)))
        :
        (producto && producto.precio && producto.kg > 0)
          ? (producto.precio * producto.kg + (troquelado ? (troquelado.precio * producto.kg) : 0) + (proceso ? (proceso.precio * producto.kg) : 0) + (acabado ? (acabado.precio * producto.kg) : (0)))
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
      <div id="pdf-preview" ref={pdfRef} style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
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

          {elementosFinal.length > 0 && elementosFinal.map((elemento, index) => {
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

            const esProceso = producto.rubro && (producto.rubro === 65 || producto.rubro === 67 || producto.rubro === 78 || producto.rubro === 3 || producto.rubro === 73 || producto.rubro === 89 || producto.rubro == 88);

            const cantUnid = (elemento.cantidadCarrito * (producto.cantidad || 1));

            const unidad = ((marcasUnicas && marcasUnicas.has(producto.marca)) || (esProceso && !producto.detalle.includes("M2"))) ?
              ("KG")
              :
              (
                esProceso ?
                  ('M2')
                  :
                  ('UNID')
              );

            const cantidad = ((unidad === "KG" || unidad === 'M2') ?
              marcasUnicas.has(producto.marca) ?
                (elemento.cantidadCarrito ? producto.kg * elemento.cantidadCarrito : 0)
                :
                (elemento.kg)
              :
              (producto.cantidad && elemento.cantidadCarrito ? producto.cantidad * elemento.cantidadCarrito : 0)
            );

            const totalProducto = (producto.precio * cantidad).toFixed(2);

            return (
              <div className="elementosPdf" key={`${elemento.id}-${index}`}>
                <p className="primerP">{producto.cod_int}</p>{/*Código*/}
                <p>{producto.cod_orig + " - " + (producto.detalle || '')}</p>{/*Descripción*/}
                <p>{cantUnid.toFixed(2)}</p>{/*Cant.Unid.*/}
                <p>{(totalProducto / (cantUnid)).toFixed(2)}</p>{/*P. X Unid.*/}
                <p>{unidad}</p>{/*Unid.Med.*/}
                <p>{cantidad.toFixed(2)}</p>{/*Cantidad*/}
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
      </div>
    </div>
  );
}