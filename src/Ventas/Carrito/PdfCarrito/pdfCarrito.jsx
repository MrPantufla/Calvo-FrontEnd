import './pdfCarrito.css';

import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { useCarrito } from '../../../contextCarrito';
import { useAuth } from '../../../contextLogin';

export default function PdfCarrito() {
  const pdfRef = useRef(null);

  const carrito = useCarrito();

  const { state } = useAuth();

  const obtenerFechaFormateada = () => {
    const fecha = new Date();

    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();

    console.log(dia + "/" + mes + "/" + anio)
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

  return (
    <div>
      <div id="pdf-preview" ref={pdfRef}>
        <img src="/ImagenesExtra/logo_calvo.webp" />
        <h1>PRESUPUESTO</h1>
        <h2>{obtenerFechaFormateada()}</h2>

        {state.userInfo.cliente &&
          <div className="datosContenedor">
            
          </div>
        }
      </div>
    </div>
  );
}