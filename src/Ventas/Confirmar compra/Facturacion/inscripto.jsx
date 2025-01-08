import { useState, useRef } from "react";
import { useFinalizarCompra } from "../../../contextFinalizarCompra";
import { useCarrito } from "../../../contextCarrito";
import { useVariables } from "../../../contextVariables";

export default function Inscripto() {

    const {
        confirmarCompra,
        limpiarCarrito,
        setCarritoAbierto
    } = useCarrito();

    const {
        setErrorMessage,
        cuit,
        setCuit,
        almacenarFacturacion,
        metodoPago,
        dni,
        setDatosPedido,
        primerosDigitos,
        setPrimerosDigitos,
        ultimoDigito,
        setUltimoDigito
    } = useFinalizarCompra();

    const {
        setMostrarFacturacion,
        setMostrarFinalizarPedido
    } = useVariables();

    const [inputsFocus, setInputsFocus] = useState(false);

    const primerosDigitosRef = useRef(null);
    const ultimoDigitoRef = useRef(null);

    const confirmar = (e) => {
        e.preventDefault();

        const numerosRegex = /^[0-9]+$/;

        if (!cuit) {
            setErrorMessage('Por favor, completa todos los campos')
            return;
        }
        else if (!numerosRegex.test(cuit)) {
            setErrorMessage('CUIT solo puede contener números')
            return;
        }

        if (cuit.length != 11) {
            setErrorMessage('CUIT debe contener 11 caracteres')
            return;
        }

        setDatosPedido('Facturar a ' + cuit);

        setMostrarFacturacion(false);
        //setMostrarFinalizarPedido(true);
        almacenarFacturacion();
        confirmarCompra('Facturar a ' + cuit)
        setErrorMessage('');
    }

    const keyDownCuit = (slot, valor) => {
        return (event) => {
            let cursorPosition;
            let endPosition;

            if (slot == 0) {
                cursorPosition = primerosDigitosRef.current.selectionStart;
                endPosition = primerosDigitosRef.current.selectionEnd;
            }
            else {
                cursorPosition = ultimoDigitoRef.current.selectionStart;
                endPosition = ultimoDigitoRef.current.selectionEnd;
            }

            //Se verifica que no estemos seleccionando varios numeros, que no estemows en el primer input y que estemos en la posicion 0
            if (event.key === 'Backspace' || event.key === 'ArrowLeft') {
                if ((cursorPosition === endPosition) && (slot > 0) && (cursorPosition === 0 || valor.length === 0)) {
                    event.preventDefault();
                    const previousInput = primerosDigitosRef.current;
                    previousInput.focus();

                    previousInput.setSelectionRange(previousInput.value.length, previousInput.value.length); //Parar el cursor en el ultimo caracter
                }
            }
            else if (event.key == 'ArrowRight') {
                if ((slot < 1) && (cursorPosition === valor.length)) {
                    const nextInput = ultimoDigitoRef.current;
                    nextInput.focus();

                    setTimeout(() => {
                        nextInput.setSelectionRange(0, 0); // Posicionar el cursor al inicio del siguiente input
                    }, 0);
                }
            }
            else if(/^[0-9]$/.test(event.key)) {
                if(slot == 0 && valor.length == 2){
                    ultimoDigitoRef.current.focus()
                }
            }
        }
    }

    return (
        <>
            <div className="contenedorFormConfirmarCompra contenedorInscripto">
                <div className="contenedorEntradaConfirmarCompra">
                    <label htmlFor="primerosDigitos" className={`${metodoPago == 'tarjeta' ? 'izquierda' : 'medio'}`}>CUIT</label>
                    {/*metodoPago == 'tarjeta'*/false ?
                        (<>
                            <div className="contenedorCuitInscriptoTarjeta">
                                <input
                                    className={`${inputsFocus && 'focuseado'}`}
                                    value={primerosDigitos}
                                    onChange={(e) => {e.target.value.length >= 2 && ultimoDigitoRef.current.focus(); setPrimerosDigitos(e.target.value.replace(/[^0-9]/g, '')); setCuit(e.target.value + dni + ultimoDigito)}}
                                    onFocus={() => setInputsFocus(true)}
                                    onBlur={() => { inputsFocus && setInputsFocus(false) }}
                                    inputMode="numeric"
                                    maxLength="2"
                                    id="primerosDigitos"
                                    ref={primerosDigitosRef}
                                    onKeyDown={(e) => keyDownCuit(0, primerosDigitos)(e)}
                                />
                                <p className={`${inputsFocus && 'focuseado'}`}>{dni}</p>
                                <input
                                    className={`${inputsFocus && 'focuseado'}`}
                                    value={ultimoDigito}
                                    onChange={(e) => {setUltimoDigito(e.target.value); setCuit(primerosDigitos + dni + e.target.value.replace(/[^0-9]/g, ''))}}
                                    onFocus={() => setInputsFocus(true)}
                                    onBlur={() => { inputsFocus && setInputsFocus(false) }}
                                    inputMode="numeric"
                                    maxLength="1"
                                    ref={ultimoDigitoRef}
                                    onKeyDown={(e) => keyDownCuit(1, ultimoDigito)(e)}
                                />
                            </div>
                        </>)
                        :
                        (<input id="cuit"
                            value={cuit}
                            onChange={(e) => setCuit(e.target.value)}
                            onFocus={() => setErrorMessage('')}
                            inputMode="numeric"
                            maxLength="11"
                        />)
                    }
                </div>
            </div>
            <div className="contenedorConfirmarBoton">
                <button onClick={(e) => confirmar(e)} className="confirmarBoton">Confirmar</button>
            </div>
        </>
    );
}