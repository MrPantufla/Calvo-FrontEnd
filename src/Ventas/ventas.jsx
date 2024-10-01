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

export default function Ventas() {
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
    setMostrarFacturacion
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
    setTipoProceso
  } = useTienda();

  const atrasProcesos = () => {
    if (acabado != null && tipoProceso == 'anodizados') {
      setAcabado(null);
    }
    else if (stipoProceso != null) {
      setStipoProceso(null);
    }
    else if (tipoProceso != null) {
      setTipoProceso(null);
    }
  }

  const tieneProceso = elementos && elementos.some(elemento => (elemento.id.length > 0 && elemento.id.includes("(")));

  const aclaracionesEnvio =
    <p className="aclaracionesConfirmarCompra">
      -Los envíos se realizan por medio del servicio de Correro Argentino<br />
      -Podrás realizar un seguimiento del estado de tu envío en la sección <a href='/misCompras' target="blank">Mis compras</a>
    </p>
    ;

  const enviosArray = [
    {
      nombre: 'Envío a domicilio', componente: <Domicilio key='domicilio' siguiente={() => setMostrarPagos(true)} />, aclaraciones: aclaracionesEnvio
    },
    {
      nombre: 'Envío a sucursal', componente: <Sucursal key='sucursal' siguiente={() => setMostrarPagos(true)} />, aclaraciones: aclaracionesEnvio
    },
    {
      nombre: 'Retira por su cuenta', componente: <Retira key='retira' siguiente={() => setMostrarPagos(true)} />, aclaraciones: ''
    }
  ];

  const aclaracionesPagoEfectivo =
    <p className="aclaracionesConfirmarCompra">
      -Al pagar en efectivo podes realizarlo en el local en caso de retirar personalmente tu mercadería o al transportista al momento de la entrega a domicilio
    </p>
    ;

  const pagosArray = [
    {
      nombre: 'Efectivo', componente: <Efectivo siguiente={() => setMostrarFacturacion(true)} />, aclaraciones: aclaracionesPagoEfectivo
    },
    {
      nombre: 'Tarjeta de crédito/débito', componente: <Tarjeta siguiente={() => setMostrarFacturacion(true)} />, aclaraciones: ''
    }
  ];

  const aclaracionesFacturacion =
    <p className="aclaracionesConfirmarCompra">Recordatorio de términos y condiciones:<br />
      -El precio listado de los perfiles es aproximado en base al peso estimativo de los mismos.<br />
      -Los productos están sujetos a disponibilidad.<br />
      -Los precios pueden variar sin previo aviso. <br />
      -Ciertos precios se encuentran sujetos al valor dólar y el valor final del pedido se concreta al momento de la facturación.<br />
    </p>
  {
    tieneProceso && (
      <>
        -El plazo de entrega de los procesos puede variar.<br />
        -Para concretar un pedido con procesos, se debe abonar una seña del 50% del valor estimativo de los mismos. Una persona de ventas se comunicará para concretar dicha transacción e informar el plazo de entrega.
      </>
    )
  }
  ;

  const facturacionArray = [
    {
      nombre: 'Sin facturar', componente: <SinFacturar />, aclaraciones: aclaracionesFacturacion
    },
    {
      nombre: 'Consumidor final', componente: <ConsumidorFinal />, aclaraciones: aclaracionesFacturacion
    },
    {
      nombre: 'Inscripto', componente: <Inscripto />, aclaraciones: aclaracionesFacturacion
    }
  ]

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
                errorMessage=""
                atras={() => {setMostrarEnvios(false); setMostrarConfirmarCompra(false)}}
              />
            )
              :
              mostrarPagos ? (
                <ConfirmarCompra
                  titulo='MÉTODO DE PAGO'
                  componentesArray={pagosArray}
                  errorMessage=""
                  atras={() => {
                    setMostrarPagos(false);
                    setMostrarEnvios(true);
                  }}
                />
              )
                :
                (mostrarFacturacion && (
                  <ConfirmarCompra
                    titulo='CONDICIÓN DE FACTURACIÓN'
                    componentesArray={facturacionArray}
                    errorMessage=''
                    atras={() => {
                      setMostrarFacturacion(false);
                      setMostrarPagos(true);
                    }}
                  />
                ))
            }
          </>
        )}
        {/* {mostrarConfirmarCompra && <ConfirmarCompra titulo={'ENVÍO'} componentesArray={enviosArray} errorMessage='' />} */}
        {/* {mostrarCartelCliente && <CartelCliente />} */}
      </ProviderCortinas>
    </>
  );
}