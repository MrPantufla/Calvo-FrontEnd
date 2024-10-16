import { useFinalizarCompra } from '../../../contextFinalizarCompra';
import { useVariables } from '../../../contextVariables';
import './tarjeta.css';
import { useState, useEffect, useRef } from 'react';

export default function Tarjeta() {

    const {
        numeroTarjeta1,
        setNumeroTarjeta1,
        numeroTarjeta2,
        setNumeroTarjeta2,
        numeroTarjeta3,
        setNumeroTarjeta3,
        numeroTarjeta4,
        setNumeroTarjeta4,
        mesCaducidad,
        setMesCaducidad,
        anioCaducidad,
        setAnioCaducidad,
        codigoSeguridad,
        setCodigoSeguridad,
        setErrorMessage
    } = useFinalizarCompra();

    const [caducidadFocus, setCaducidadFocus] = useState(false);
    const [numeroTarjetaFocus, setNumeroTarjetaFocus] = useState(false);
    const mesCaducidadRef = useRef(null);
    const anioCaducidadRef = useRef(null);
    const numeroTarjeta1Ref = useRef(null);
    const numeroTarjeta2Ref = useRef(null);
    const numeroTarjeta3Ref = useRef(null);
    const numeroTarjeta4Ref = useRef(null);
    const codigoSeguridadRef = useRef(null);

    const {
        setMostrarPagos,
        setMostrarFacturacion
    } = useVariables();

    const obtenerUltimosDosDigitosAnioActual = () => {
        const fechaActual = new Date();
        const anioActual = fechaActual.getFullYear(); // Obtiene el año actual en formato de 4 dígitos
        const ultimosDosDigitos = anioActual % 100; // Obtiene los últimos 2 dígitos
        return ultimosDosDigitos < 10 ? `0${ultimosDosDigitos}` : ultimosDosDigitos; // Agrega un cero delante si es menor que 10
    };

    const anioActualTarjeta = obtenerUltimosDosDigitosAnioActual();

    const confirmar = (e) => {
        e.preventDefault();
        
        if(numeroTarjeta1 == '' || numeroTarjeta2 == '' || numeroTarjeta3 == '' || numeroTarjeta4 == '' || mesCaducidad == '' || anioCaducidad == '' || codigoSeguridad == ''){
            setErrorMessage('Por favor, completa todos los campos')
        }
        else if(numeroTarjeta1.length != 4 || numeroTarjeta2.length != 4 || numeroTarjeta3.length != 4 || numeroTarjeta4.length != 4){
            setErrorMessage('Número de tarjeta inválido');
        }
        else if(mesCaducidad < 1 || mesCaducidad > 12){
            setErrorMessage('Mes de vencimiento inválido');
        }
        else if(anioCaducidad < anioActualTarjeta){
            setErrorMessage('Año de vencimiento inválido')
        }
        else if(codigoSeguridad.length != 3){
            setErrorMessage('Código de seguridad inválido');
        }
        else{
            //fetch de tarjeta y si response.ok va lo de abajo
            setMostrarPagos(false);
            setMostrarFacturacion(true);
        }
    };

    const pasteNumeroTarjeta = (slot) => (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto de pegar

        // Obtiene el texto del portapapeles
        const pastedData = event.clipboardData.getData('text/plain').replace(/\D/g, '');
    
        // Crea un array de los números a repartir
        const nuevosValores = [...Array(4)].map((_, index) => {
            return pastedData.slice(index * 4, index * 4 + 4); // Corta en grupos de 4
        });
    
        // Actualiza los estados de los inputs
        setNumeroTarjeta1(nuevosValores[0]);
        setNumeroTarjeta2(nuevosValores[1]);
        setNumeroTarjeta3(nuevosValores[2]);
        setNumeroTarjeta4(nuevosValores[3]);
    
        // Enfoca el último input que ha sido modificado
        if (nuevosValores[slot].length === 4 && slot < 3) {
            tarjetaInputs[slot + 1].focus();
        }
    };

    const tarjetaInputs = [
        numeroTarjeta1Ref.current,
        numeroTarjeta2Ref.current,
        numeroTarjeta3Ref.current,
        numeroTarjeta4Ref.current,
    ];

    const changeNumeroTarjeta = (slot, valor) => {
        // Eliminamos cualquier carácter no numérico
        let nuevoValor = valor.replace(/\D/g, '');

        // Limitar el valor a 4 caracteres
        if (nuevoValor.length > 4) {
            nuevoValor = nuevoValor.slice(0, 4);
        }

        // Si el nuevo valor tiene 4 caracteres, pasamos al siguiente input
        if (nuevoValor.length === 4 && slot < tarjetaInputs.length - 1) {
            tarjetaInputs[slot + 1].focus();
        }

        // Actualizar el estado según el input que corresponde
        switch (slot) {
            case 0:
                setNumeroTarjeta1(nuevoValor);
                break;
            case 1:
                setNumeroTarjeta2(nuevoValor);
                break;
            case 2:
                setNumeroTarjeta3(nuevoValor);
                break;
            case 3:
                setNumeroTarjeta4(nuevoValor);
        }
    };

    const keyDownNumeroTarjeta = (slot, valor) => {
        return (event) => {

            const cursorPosition = tarjetaInputs[slot].selectionStart;
            const endPosition = tarjetaInputs[slot].selectionEnd;

            if (event.key === 'Backspace' || event.key === 'ArrowLeft') {
                //Se verifica que no estemos seleccionando varios numeros, que no estemows en el primer input y que estemos en la posicion 0
                if ((cursorPosition === endPosition) && (slot > 0) && (cursorPosition === 0)) {

                    event.preventDefault();

                    const previousInput = tarjetaInputs[slot - 1];
                    previousInput.focus(); // Enfocar al input anterior

                    previousInput.setSelectionRange(previousInput.value.length, previousInput.value.length); //Parar el cursor en el ultimo caracter
                }
            }
            else if (event.key == 'ArrowRight') {
                if (slot < 3 && (cursorPosition === valor.length)) {
                    const nextInput = tarjetaInputs[slot + 1];
                    nextInput.focus();

                    setTimeout(() => {
                        nextInput.setSelectionRange(0, 0); // Posicionar el cursor al inicio del siguiente input
                    }, 0);
                }
            }
        };
    };

    const changeCaducidad = (slot, valor) => {
        let nuevoValor = valor.replace(/\D/g, '');

        // Limitar el valor a 2 caracteres
        if (nuevoValor.length > 2) {
            nuevoValor = nuevoValor.slice(0, 2);
        }

        if (nuevoValor.length === 2 && slot === 0) {
            anioCaducidadRef.current.focus();
        }

        // Actualizar el estado según el input que corresponde
        switch (slot) {
            case 0:
                setMesCaducidad(nuevoValor);
                break;
            case 1:
                setAnioCaducidad(nuevoValor);
        }
    }

    const keyDownCaducidad = (slot, valor) => {
        return (event) => {
            let cursorPosition;
            let endPosition;

            if(slot == 0){
                cursorPosition = mesCaducidadRef.current.selectionStart;
                endPosition = mesCaducidadRef.current.selectionEnd;
            }
            else{
                cursorPosition = anioCaducidadRef.current.selectionStart;
                endPosition = anioCaducidadRef.current.selectionEnd;
            }

            //Se verifica que no estemos seleccionando varios numeros, que no estemows en el primer input y que estemos en la posicion 0
            if (event.key === 'Backspace' || event.key === 'ArrowLeft') {
                if((cursorPosition === endPosition) && (slot > 0) && (cursorPosition === 0 || valor.length === 0)){
                    event.preventDefault();
                    const previousInput = mesCaducidadRef.current;
                    previousInput.focus();

                    previousInput.setSelectionRange(previousInput.value.length, previousInput.value.length); //Parar el cursor en el ultimo caracter
                }
            }
            else if(event.key == 'ArrowRight'){
                if((slot < 1) && (cursorPosition === valor.length)){
                    const nextInput = anioCaducidadRef.current;
                    nextInput.focus();

                    setTimeout(() => {
                        nextInput.setSelectionRange(0, 0); // Posicionar el cursor al inicio del siguiente input
                    }, 0);
                }
            }
        }
    }

    const changeCodigoSeguridad = (valor) => {
        let nuevoValor = valor.replace(/\D/g, '');

        // Limitar el valor a 2 caracteres
        if (nuevoValor.length > 3) {
            nuevoValor = nuevoValor.slice(0, 3);
        }

        setCodigoSeguridad(nuevoValor)
    }

    return (
        <>
            <div className="contenedorFormConfirmarCompra">
                <div className="contenedorEntradaConfirmarCompra contenedorNumerosTarjeta">
                    <label htmlFor="numeroTarjeta">Número de tarjeta</label>
                    <div>
                        <input
                            className={`${numeroTarjetaFocus && 'focuseado'}`}
                            id="numeroTarjeta1"
                            type="text"
                            ref={numeroTarjeta1Ref}
                            onFocus={() => setNumeroTarjetaFocus(true)}
                            onBlur={() => setNumeroTarjetaFocus(false)}
                            value={numeroTarjeta1}
                            onChange={(e) => changeNumeroTarjeta(0, e.target.value)}
                            onKeyDown={(e) => keyDownNumeroTarjeta(0, numeroTarjeta1)(e)}
                            onPaste={pasteNumeroTarjeta(0)}
                        />
                        <p className={`${numeroTarjetaFocus && 'focuseado'}`} >-</p>
                        <input
                            className={`${numeroTarjetaFocus && 'focuseado'}`}
                            id="numeroTarjeta2"
                            type="text"
                            ref={numeroTarjeta2Ref}
                            onFocus={() => setNumeroTarjetaFocus(true)}
                            onBlur={() => setNumeroTarjetaFocus(false)}
                            value={numeroTarjeta2}
                            onChange={(e) => changeNumeroTarjeta(1, e.target.value)}
                            onKeyDown={(e) => keyDownNumeroTarjeta(1, numeroTarjeta2)(e)}
                            onPaste={pasteNumeroTarjeta(0)}
                        />
                        <p className={`${numeroTarjetaFocus && 'focuseado'}`} >-</p>
                        <input
                            className={`${numeroTarjetaFocus && 'focuseado'}`}
                            id="numeroTarjeta3"
                            type="text"
                            ref={numeroTarjeta3Ref}
                            onFocus={() => setNumeroTarjetaFocus(true)}
                            onBlur={() => setNumeroTarjetaFocus(false)}
                            value={numeroTarjeta3}
                            onChange={(e) => changeNumeroTarjeta(2, e.target.value)}
                            onKeyDown={(e) => keyDownNumeroTarjeta(2, numeroTarjeta3)(e)}
                            onPaste={pasteNumeroTarjeta(0)}
                        />
                        <p className={`${numeroTarjetaFocus && 'focuseado'}`} >-</p>
                        <input
                            className={`${numeroTarjetaFocus && 'focuseado'}`}
                            id="numeroTarjeta4"
                            type="text"
                            ref={numeroTarjeta4Ref}
                            onFocus={() => setNumeroTarjetaFocus(true)}
                            onBlur={() => setNumeroTarjetaFocus(false)}
                            value={numeroTarjeta4}
                            onChange={(e) => changeNumeroTarjeta(3, e.target.value)}
                            onKeyDown={(e) => keyDownNumeroTarjeta(3, numeroTarjeta4)(e)}
                            onPaste={pasteNumeroTarjeta(0)}
                        />
                    </div>
                </div>

                <div className="contenedorEntradaConfirmarCompra">
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div className="contenedorPequeñoTarjeta">
                            <label className="labelTarjeta" htmlFor="mesCaducidad">Fecha de caducidad</label>
                            <div className="contenedorInputCaducidad">
                                <input
                                    className={`inputPequeñoTarjeta ${caducidadFocus && 'focuseado'}`}
                                    id="mesCaducidad"
                                    type="text"
                                    ref={mesCaducidadRef}
                                    onFocus={() => setCaducidadFocus(true)}
                                    onBlur={() => { caducidadFocus && setCaducidadFocus(false) }}
                                    value={mesCaducidad}
                                    onChange={(e) => changeCaducidad(0, e.target.value)}
                                    onKeyDown={(e) => keyDownCaducidad(0, mesCaducidad)(e)}
                                />
                                <p className={`separadorInputPequeñoTarjeta ${caducidadFocus && 'focuseado'}`}>/</p>
                                <input
                                    className={`inputPequeñoTarjeta ${caducidadFocus && 'focuseado'}`}
                                    id="anioCaducidad"
                                    type="text"
                                    ref={anioCaducidadRef}
                                    onFocus={() => setCaducidadFocus(true)}
                                    onBlur={() => caducidadFocus && setCaducidadFocus(false)}
                                    value={anioCaducidad}
                                    onChange={(e) => changeCaducidad(1, e.target.value)}
                                    onKeyDown={(e) => keyDownCaducidad(1, anioCaducidad)(e)}
                                />
                            </div>
                        </div>

                        <div className="contenedorPequeñoTarjeta">
                            <label className="labelTarjeta" htmlFor="codigoSeguridad">Código de seguridad</label>
                            <div>
                                <input
                                    className="inputPequeñoTarjeta"
                                    id="codigoSeguridad"
                                    type="text"
                                    ref={codigoSeguridadRef}
                                    value={codigoSeguridad}
                                    onChange={(e) => changeCodigoSeguridad(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contenedorConfirmarBoton">
                <button onClick={(e)=> confirmar(e)} className="confirmarBoton">Confirmar</button>
            </div>
        </>
    );
}
