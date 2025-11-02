//Generamos un numero aleatorio que se encuentre en el rango del 1 al 25
const numeroAleatorio = Math.floor(Math.random()*25)+1;

//Creamos una constante que permite identificar el maximo de intentos 
const numeroIntentos = 3;

//Guardara el numero de intentos que realiza el usuario
let intentos = 1;
function generarNumeroAleatorio(){
    let mensaje;
    const parrafo = document.querySelector("#idParrafo");
    if (intentos <= numeroIntentos){
        let numero = prompt(
            "¿Que numero se ha generado (Intento" + intentos +")?"
        );

        //Convertimos el numero ingresado a entero
        numero = parseInt(numero);

        //Verificamos el numero aleatorio con el ingresado por el usuario
        if(numero == numeroAleatorio){
            mensaje = `¡Es sorprente, pudiste adivinar el numero oculto (${numeroAleatorio})!. Refresque la página para volver a jugar.`;
        } else if (intentos == numeroIntentos){
            mensaje = `Su numero de intentos ha terminado. El numero oculto era: ${numeroAleatorio}. Refresque la pagina para volver a jugar.`;
        } else {
            if(numero < numeroAleatorio){
                mensaje = `Incorrecto. El numero oculto es mas ALTO. Quedan ${numeroIntentos - intentos} intentos`;
            }else {
                mensaje = `Incorrecto. El numero oculto es mas BAJO. Quedan ${numeroIntentos - intentos}.`;
            }
        }

        //aumentamos el valor de los intentos 
        intentos++;
    } else {
        mensaje=`Su numero de intentos ha terminado. El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
    }
    parrafo.innerHTML = mensaje;


}