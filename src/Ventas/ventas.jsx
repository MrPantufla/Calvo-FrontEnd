import Filtros from './FiltrosYProductos/filtrosYProductos';
import Footer from '../Principal/Footer/footer.jsx';
import Catalogos from './Catalogos/catalogos.jsx';
import { useCarrito } from '../contextCarrito.jsx';
import DesplegablePerfil from '../Principal/Header/Desplegable perfil/desplegablePerfil.jsx';
import RenderHeader from '../Principal/Header/renderHeader.jsx';
import CartelError from './CartelError/cartelError.jsx';
import PedidoRealizado from './Confirmar compra/Pedido realizado/pedidoRealizado.jsx';
import { useTienda } from '../contextTienda.jsx';
import { ProviderCortinas } from '../contextCortinas.jsx';
import { useVariables } from '../contextVariables.jsx';
import CartelCliente from '../Login y registro/Cartel cliente/cartelCliente.jsx';
import ConfirmarCompra from './Confirmar compra/confirmarCompra.jsx';
import Domicilio from './Confirmar compra/Envios/Domicilio/domicilio.jsx';
import Sucursal from './Confirmar compra/Envios/Sucursal/sucursal.jsx';
import Retira from './Confirmar compra/Envios/Retira/retira.jsx';
import Efectivo from './Confirmar compra/Pagos/efectivo.jsx';
import Tarjeta from './Confirmar compra/Pagos/tarjeta.jsx';
import { useState } from 'react';
import SinFacturar from './Confirmar compra/Facturacion/sinFacturar.jsx';
import ConsumidorFinal from './Confirmar compra/Facturacion/consumidorFinal.jsx';
import Inscripto from './Confirmar compra/Facturacion/inscripto.jsx';
import { useFinalizarCompra } from '../contextFinalizarCompra.jsx';
import { useAuth } from '../contextLogin.jsx';
import FinalizarPedido from './Confirmar compra/Finalizar pedido/finalizarPedido.jsx';
import Arregla from './Confirmar compra/Envios/Arregla/arregla.jsx';
import MercadoPagoPaymentBrick from './Confirmar compra/Pagos/mercadoPago.jsx';
import PaymentBrick from './Confirmar compra/Pagos/mercadoPago.jsx';

export default function Ventas() {

  const {
    state
  } = useAuth();

  const {
    mostrarCartelCliente,
    mostrarCartelPresupuesto,
    mostrarConfirmarCompra,
    setMostrarConfirmarCompra,
    mostrarEnvios,
    setMostrarEnvios,
    mostrarPagos,
    setMostrarPagos,
    mostrarFacturacion,
    setMostrarFacturacion,
    mostrarFinalizarPedido,
    setMostrarFinalizarPedido
  } = useVariables();

  const {
    confirmarCompraAbierto,
    compraRealizadaAbierto,
    mostrarCartelError,
    elementos
  } = useCarrito();

  const {
    setStipoProceso,
    setAcabado,
    acabado,
    tipoProceso,
    stipoProceso,
    setTipoProceso,
    isMobile,
    categoriaSeleccionadaPinturas,
    setCategoriaSeleccionadaPinturas,
    setColorSeleccionado
  } = useTienda();

  const {
    setMedioEnvio,
    setMetodoPago,
    setMetodoFacturacion,
    tipoEnvio,
    medioEnvio,
    setTipoEnvio,
    metodoPago
  } = useFinalizarCompra();

  const atras = () => {
    if (acabado != null && tipoProceso == 'anodizados') {
      setAcabado(null);
    }
    else if (categoriaSeleccionadaPinturas != null && tipoProceso == 'pinturas') {
      setCategoriaSeleccionadaPinturas(null);
    }
    else if (stipoProceso != null) {
      setStipoProceso(null);
    }
    else if (tipoProceso != null) {
      setTipoProceso(null);
    }
  }

  const atrasProcesos = () => {
    if (tipoProceso == 'anodizados') {
      if (acabado != null) {
        setAcabado(null);
      }
      else if (stipoProceso != null) {
        setStipoProceso(null);
      }
      else {
        setTipoProceso(null);
      }
    }
    else if (tipoProceso == 'pinturas') {
      if (stipoProceso != null) {
        setStipoProceso(null);
      }
      else if (categoriaSeleccionadaPinturas != null) {
        setCategoriaSeleccionadaPinturas(null);
      }
      else {
        setTipoProceso(null);
      }
    }
  }

  const tieneProceso = elementos && elementos.some(elemento => (elemento.id.length > 0 && elemento.id.includes("(")));
  const tieneEco = elementos && elementos.some(elemento => elemento.cod_origProducto && (elemento.tipo_prod == 'PERFIL' && (elemento.cod_origProducto.endsWith('ES') || elemento.cod_origProducto.endsWith('E'))));

  const aclaracionesEnvio = (
    <div className="aclaracionesConfirmarCompra">
      {(medioEnvio == 'domicilio' && tipoEnvio === 'transportePropio') && (
        <>
          -<a href={isMobile ? `https://wa.me/5493456475294` : `https://web.whatsapp.com/send?phone=+5493456475294`} target='blank' rel='noopener noreferrer'>
            Consultar
          </a> con la empresa por disponibilidad del servicio de transporte propio en tu zona si no estás seguro
          <br />
        </>
      )}
      {(tipoEnvio === 'correo' || medioEnvio === 'sucursal') && (
        <>
          -El costo del envío se abona al transportista al llegar la mercadería
          <br />
        </>
      )}
    </div>
  );

  const enviosArray = [
    {
      nombre: 'Envío a domicilio', comparador: 'domicilio', set: () => setMedioEnvio('domicilio'), componente: <Domicilio key='domicilio' siguiente={() => setMostrarPagos(true)} />, aclaraciones: aclaracionesEnvio
    },
    /*{
      nombre: 'Envío a sucursal', comparador: 'sucursal', set: () => { setMedioEnvio('sucursal'); setTipoEnvio('') }, componente: <Sucursal key='sucursal' siguiente={() => setMostrarPagos(true)} />, aclaraciones: aclaracionesEnvio
    },*/
    {
      nombre: 'Retira por su cuenta', comparador: 'retira', set: () => { setMedioEnvio('retira'); setTipoEnvio('') }, componente: <Retira key='retira' siguiente={() => setMostrarPagos(true)} />, aclaraciones: ''
    },
    {
      nombre: 'Coordina con ventas', comparador: 'arregla', set: () => { setMedioEnvio('arregla'); setTipoEnvio('') }, componente: <Arregla key='arregla' siguiente={() => setMostrarPagos(true)} />, aclaraciones: ''
    }
  ];

  const aclaracionesPagoEfectivo =
    <p className="aclaracionesConfirmarCompra">
      -Al pagar en efectivo podes realizarlo en el local al retirar tu mercadería o a nuestro transportista al momento de la entrega a domicilio
    </p>
    ;

  const aclaracionesPagoTarjeta =
    <p className="aclaracionesConfirmarCompra">
      -La empresa no almacenará nignún dato relacionado con tarjetas de crédito o débito
      <br />
      -Se almacenarán los siguientes datos para facilitar el proceso de futuras compras: nombre, apellido, fecha de nacimiento y DNI
    </p>
    ;

  const pagosArray = [
    // Solo agregamos la opción de "Efectivo" si se cumple la condición
    ...((state.userInfo && ((state.userInfo.cliente && tipoEnvio == 'transportePropio' || medioEnvio == 'retira' || medioEnvio == 'arregla'))) ? [{
      nombre: 'Efectivo',
      comparador: 'efectivo',
      set: () => setMetodoPago('efectivo'),
      componente: <Efectivo siguiente={() => setMostrarFacturacion(true)} />,
      aclaraciones: aclaracionesPagoEfectivo
    }] : []),  // Si la condición no se cumple, no se incluye este objeto

    {
      nombre: 'Tarjeta de crédito/débito',
      comparador: 'tarjeta',
      set: () => setMetodoPago('tarjeta'),
      componente: <Tarjeta siguiente={() => setMostrarFacturacion(true)} />,
      aclaraciones: aclaracionesPagoTarjeta
    },

    /*{
      nombre: 'Mercado Pago',
      comparador: 'mercadopago',
      set: () => setMetodoPago('mercadopago'),
      componente: <PaymentBrick />,
      aclaraciones: aclaracionesPagoTarjeta
    }*/
  ];

  const aclaracionesFacturacion =
    <p className="aclaracionesConfirmarCompra">Recordatorio de términos y condiciones:<br />
      -El precio listado de los perfiles es aproximado en base al peso estimativo de los mismos.<br />
      -Los productos están sujetos a disponibilidad.<br />
      -Los precios pueden variar sin previo aviso. <br />
      -Ciertos precios se encuentran sujetos al valor dólar y el valor final del pedido se concreta al momento de la facturación.


      {tieneProceso && (
        <>
          <br />
          -El plazo de entrega de los procesos puede variar.<br />
          -Para concretar un pedido con procesos, se debe abonar una seña del 50% del valor estimativo de los mismos. Una persona de ventas se comunicará para concretar dicha transacción e informar el plazo de entrega.
        </>
      )}
    </p>
    ;

  const facturacionArray = [
    ...((metodoPago != 'tarjeta' && metodoPago != 'transferencia')/*true*/
      ? [
        {
          nombre: 'Sin facturar',
          comparador: 'sinFacturar',
          set: () => setMetodoFacturacion('sinFacturar'),
          componente: <SinFacturar />,
          aclaraciones: aclaracionesFacturacion,
        },
      ]
      : []),
    {
      nombre: 'Consumidor final',
      comparador: 'consumidorFinal',
      set: () => setMetodoFacturacion('consumidorFinal'),
      componente: <ConsumidorFinal />,
      aclaraciones: aclaracionesFacturacion,
    },
    {
      nombre: 'Inscripto',
      comparador: 'inscripto',
      set: () => setMetodoFacturacion('inscripto'),
      componente: <Inscripto />,
      aclaraciones: aclaracionesFacturacion,
    },
  ];

  return (
    <>
        <ProviderCortinas>
          <RenderHeader />
          <DesplegablePerfil />
          <Catalogos />
          <Filtros />
          {mostrarCartelError && <CartelError />}
          {compraRealizadaAbierto && <PedidoRealizado />}
          {tipoProceso && <button className="atrasProcesos" onClick={() => atrasProcesos()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708z" />
            </svg>
          </button>}
          <Footer />

          {mostrarConfirmarCompra && (
            <>
              {mostrarEnvios ? (
                <ConfirmarCompra
                  titulo='ENVÍO'
                  componentesArray={enviosArray}
                  atras={() => {
                    setMostrarEnvios(false);
                    setMostrarConfirmarCompra(false);
                  }}
                />
              )
                :
                mostrarPagos ? (
                  <ConfirmarCompra
                    titulo='MÉTODO DE PAGO'
                    componentesArray={pagosArray}
                    atras={() => {
                      setMostrarPagos(false);
                      setMostrarEnvios(true);
                    }}
                  />
                )
                  :
                  (mostrarFacturacion ? (
                    <ConfirmarCompra
                      titulo='CONDICIÓN DE FACTURACIÓN'
                      componentesArray={facturacionArray}
                      atras={() => {
                        setMostrarFacturacion(false);
                        if (state.userInfo.cliente && state.userInfo.zona != 'S/ZONA' && state.userInfo.tipo_usuario != 'admin') {
                          setMostrarEnvios(true);
                        }
                        else {
                          setMostrarPagos(true);
                        }
                      }}
                    />
                  )
                    :
                    (mostrarFinalizarPedido && (
                      <FinalizarPedido
                        titulo='FINALIZAR PEDIDO'
                        atras={() => {
                          setMostrarFinalizarPedido(false);
                          setMostrarFacturacion(true);
                        }}
                      />
                    ))
                  )
              }
            </>
          )}
          {mostrarCartelCliente && <CartelCliente />}
        </ProviderCortinas>
    </>
  );
}