import React, { useEffect, useState } from 'react';
import './mercadoPago.css';

const PaymentBrick = () => {
  const [formularioCompleto, setFormularioCompleto] = useState(false);

  useEffect(() => {
    if (window.MercadoPago) {
      initializeMercadoPago();
    } else {
      const script = document.createElement('script');
      script.src = 'https://sdk.mercadopago.com/js/v2';
      script.async = true;
      script.onload = () => {
        console.log('📦 SDK de MercadoPago cargado');
        initializeMercadoPago();
      };
      document.body.appendChild(script);
    }

    return () => {
      if (window.paymentBrickController) {
        window.paymentBrickController.unmount();
        window.paymentBrickController = null;
      }
    };
  }, []);


  const initializeMercadoPago = async () => {
    try {
      const mp = new window.MercadoPago('TEST-5d27e009-d6a9-4368-ba33-1f274b63a24c', {
        locale: 'es',
      });

      const bricksBuilder = mp.bricks();

      window.paymentBrickController = await bricksBuilder.create(
        'payment',
        'paymentBrick_container',
        {
          initialization: {
            amount: 10000,
            enableValidation: true,
          },
          customization: {
            visual: { style: { theme: 'bootstrap' } },
            paymentMethods: {
              creditCard: 'all',
              debitCard: 'all',
              bankTransfer: 'all',
              wallet_purchase: 'all',
              maxInstallments: 12,
            },
          },
          callbacks: {
            onReady: () => {
              console.log('✅ Brick listo');
            },
            onValidityChange: (data) => {
              console.log('📦 onValidityChange llamado con:', data);
              setFormularioCompleto(data.valid === true);
            },
            onSubmit: ({ formData }) => {
              return fetch('/process_payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
              })
                .then((res) => res.json())
                .then((res) => {
                  if (res.success) {
                    console.log('✅ Pago exitoso');
                  }
                })
                .catch((err) => {
                  console.error('❌ Error procesando el pago', err);
                });
            },
            onError: (error) => {
              console.error('❌ Error del Brick:', error);
            },
          },
        }
      );
    } catch (error) {
      console.error('❌ Error al inicializar MercadoPago:', error);
    }
  };

  // ✅ Nuevo useEffect para imprimir el estado cada 0.5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('📋 formularioCompleto:', formularioCompleto);
    }, 500);

    return () => clearInterval(interval); // limpieza al desmontar
  }, [formularioCompleto]); // se ejecuta nuevamente si cambia el estado

  return (
    <>
      <div id="paymentBrick_container" />
      <div className="contenedorConfirmarBoton">
        <button
          className="confirmarBoton"
          onClick={() => {
            if (window.paymentBrickController) {
              window.paymentBrickController.submit();
            }
          }}
          disabled={!formularioCompleto}
        >
          Confirmar
        </button>
      </div>
    </>
  );
};

export default PaymentBrick;
