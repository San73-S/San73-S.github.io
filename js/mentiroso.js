let nombreJugador;
const contenedorNombreJugador = document.getElementById("nombre-jugador")

document.addEventListener('DOMContentLoaded', function() {
    const nombreJugador = localStorage.getItem("nombreUsuario");
    contenedorNombreJugador.textContent = nombreJugador;
});

class Jugador{

    constructor(id, nombre, vidas, turno, cartasDisponibles){
        this.id = id;
        this.nombre = nombre;
        this.vidas = vidas;
        this.turno = turno;
        this.cartasDisponibles = cartasDisponibles;        
    }

    verCartas(){
        console.log(`\nCartas de ${this.nombre}`)
        this.baraja.forEach(element => {
            console.log(`${element.Valor} de ${element.Palo}`)
        });
    }

    imprimirCartas(){
        let cadena = "";
        this.baraja.forEach((element, indice) => {
            cadena += `${indice + 1}) ${element.Valor} de ${element.Palo} (${element.Figura})\n`
        });
        return cadena;
    }

}

/*ASIGNACION DE LA FIGURA A TIRAR EN LA RONDA ACTUAL */

let ronda = "";

// CREE EL ARRAY CON LOS ELEMENTOS REPETIDOS PARA GARANTIZAR UNA MAYOR ALEATORIEDAD EN SU SELECCION
const figuraDeCartas = ['As', 'King', 'Ten', 'As', 'Ten', 'Jack', 'As', 'King', 'Ten', 'Jack', 'Ten', 'King', 'Jack', 'As', 'Jack', 'As', 'As', 'Jack', 'King', 'Queen', 'King', 'As', 'King', 'Ten', 'Ten', 'Jack', 'Queen', 'Ten', 'King', 'Queen', 'As', 'King', 'Ten', 'King', 'Jack', 'Queen', 'Ten', 'Queen', 'Jack', 'Queen', 'As', 'King', 'Queen', 'Queen', 'Queen', 'As', 'Jack', 'Queen', 'Ten', 'Jack'];

const seleccionDeFigura = (figuraDeCartas) => figuraDeCartas[Math.floor(Math.random() * (figuraDeCartas.length))];

/*GENERAR EL MAZO DE CADA JUGADOR */

const contenedorCarta = document.querySelectorAll(".carta");

async function generarMazo(){

    const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?cards= XX,AS,AD,AC,AH,0S,0D,0C,0H,JS,JD,JC,JH,QS,QD,QC,QH,KS,KD,KC,KH");
        //XX es para solucionar un problema de la api, ya que omite el primer parametro y AS nunca formaba parte de la baraja de cartas
    const mazo = await response.json();
    const deckId = mazo.deck_id;

    const cartasObtenidas = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=10`);
    const baraja = await cartasObtenidas.json(); 

    baraja.cards.forEach((carta, index) => {        
        contenedorCarta[index].src = index >4 ? carta.image : "https://deckofcardsapi.com/static/img/back.png" ;
        contenedorCarta[index].alt = `${carta.code}`;
    });
    
}

function buscarEnApi(carta, callback) {
    const url = `https://deckofcardsapi.com/api/deck/new/shuffle/?cards=${carta}`;

    fetch(url)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            const deckId = datos.deck_id;
            return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        })
        .then((respuesta) => respuesta.json())
        .then((cartaDatos) => {            
            callback(cartaDatos.cards[0]); 
        })
        .catch((error) => {
            console.error('Error al buscar:', error);
        });
}

/*PONER SOBRE LA MESA LA CARTA DE LA FIGURA QUE TOCO */
let audioSelec;

const cartaEnMesa = document.getElementById("figura");

function figuraEnMesa(){
    switch (ronda){
        case "As":
            cartaEnMesa.src = "../images/As.png";
            audioSelec = "as"
            break;
        case "Ten":
            cartaEnMesa.src = "../images/Ten.png";
            audioSelec = "ten"
            break;
        case "Jack":
            cartaEnMesa.src = "../images/Jack.png";
            audioSelec = "jack"
            break;
        case "Queen":
            cartaEnMesa.src = "../images/Queen.png";
            audioSelec = "queen"
            break;
        case "King":
            cartaEnMesa.src = "../images/King.png";
            audioSelec = "king"
            break;            
    }
}

/**
 *  CONTROLADOR PARA INICIAR LA PARTIDA
 */

let jugador1 = new Jugador(1, nombreJugador, 5, true, 5);
let jugador2 = new Jugador(2, "Bot", 5, false, 5); 

function iniciarJuego(){  
    generarMazo(); 
    ronda = seleccionDeFigura(figuraDeCartas);
    figuraEnMesa();   
}

iniciarJuego();

/**
 *  CONTROLADORES PARA SELECCION DE CARTAS
 */

const cartasPropias = document.querySelectorAll(".cartas-propias");
const cartasRival = document.querySelectorAll(".cartas-rival");
const vidasPropiasImg = document.querySelectorAll(".icono-vida-propias")
const vidasRivalImg = document.querySelectorAll(".icono-vida-rival")
const cartaMazo = document.getElementById("carta-mazo");
const fondoMain = document.getElementById("fondo-main");
let urlImgMazo;
let espacioFlag = false; // EVITA QUE SE PUEDA TOCAR ESPACIO CUANDO NO ES TU TURNO O NO HAY CARTAS EN LA MESA
let posicionesCartasBot = [0, 1, 2, 3, 4, 5];


function cartaBotAleatoria(){
    let posAux =  Math.floor(Math.random() * posicionesCartasBot.length);
    let numAux = posicionesCartasBot[posAux];
    posicionesCartasBot.splice(posAux, 1);
    return numAux;
}

cartasPropias.forEach((carta, index) =>{
    carta.addEventListener('click', () => {        
        if(jugador1.turno){

            voces.src = `../audio/one ${audioSelec}.mp3`;
            voces.play();

            espacioFlag  = false;

            carta.style.display = "none";
            cartaMazo.style.display = "block";           
            const img = carta.querySelector('img');
            urlImgMazo = img.src;
            cartaMazo.src="../images/Reverso.png";
            cartaMazo.alt = img.alt;
            jugador1.turno = false;
            jugador1.cartasDisponibles--;
            jugador2.turno = true;
        }   
        
        if(jugador2){  

            setTimeout(() =>{

                let numAux = cartaBotAleatoria();

                if(numAux == 5 || jugador1.cartasDisponibles == 0){
                    esMentiraBot();
                } else{
                    cartasRival[numAux].click();
                    
                    voces.src = `../audio/one ${audioSelec} bot.mp3`;
                    voces.play();
                    cartasRival[numAux].style.display = "none";
                    cartaMazo.src="../images/Reverso2.png"; //Hacer varios diseños y modificar el reverso 2-3-4-5 con ´´ USAR CONTADOR de cartas tiradas
                    const img = cartasRival[numAux].querySelector('img');
    
                    buscarEnApi(img.alt, (dato) => {
                        urlImgMazo = dato.image;
                    });            
    
                    cartaMazo.alt = img.alt;    
                    jugador1.turno = true;
                    jugador2.turno = false;  
                }
                espacioFlag = true;
            }, 3000 + (1000 * Math.floor(Math.random() * 2)+1));

            
        }
    });    
});


/**
 *  EVENTO PARA QUE EL USUARIO ACUSE DE MENTIRA
 */

const voces = document.getElementById("audio");

function comprobarRonda(){
    let rondaAux;
    switch (ronda){
        case "As":
            rondaAux = "A";
            break;
        case "Ten":
            rondaAux = "0";
            break;
        case "Jack":
            rondaAux = "J";
            break;
        case "Queen":
            rondaAux = "Q";
            break;
        case "King":
            rondaAux = "K";
            break;            
    }
    return rondaAux;
}

const textoMentir = document.getElementById("texto")

document.addEventListener('keydown', function(event){
    const key = event.key;
    if(key === ' ' && espacioFlag){

        // VOZ DE LIAR
        voces.src = jugador2.vidas == 1 ? "../audio/ja liar.mp3" : "../audio/liar.mp3";
        voces.play();

        // EFECTO DE MENTIRA
        gsap.fromTo(
            textoMentir,
            { scale: 0.5, opacity: 0 },
            { 
                scale: 12, 
                opacity: 1,
                duration: 2,
                ease: "power3.out",
                onComplete: () => {
                gsap.to(textoMentir, {
                    opacity: 0,
                    duration: 1,
                    delay: 1 
                });
            }
            }
        );
        
        setTimeout(()=>{
            cartaMazo.src = urlImgMazo; // AGREGAR ACÁ EFEC ROTATIVO
            cartaMazo.style.zIndex = 40;
            cartaMazo.classList.add('levantar');
        }, 3500); 

        setTimeout(()=>{
            cartaMazo.classList.remove('levantar');
            cartaMazo.classList.add('rotar');
        }, 6500)        
        

        let rondaAux = comprobarRonda();
        let figuraEnMesa = cartaMazo.alt[0]

        setTimeout(() =>{

            if(rondaAux == figuraEnMesa){       
                jugador1.vidas--;  
                vidasPropiasImg[jugador1.vidas].src = "../images/calavera.png"  
                reiniciarRonda();
            } else{     // HACER QUE GIRE PARA REVELAR LA CARTA QUE SALIO , PONER TIMER
                jugador2.vidas--; 
                vidasRivalImg[jugador2.vidas].src = "../images/calavera.png"  
                reiniciarRonda();
            }
        
        }, 10000);
    }    
})

/**
 *   EVENTO PARA QUE EL BOT ACUSE DE MENTIRA
 */

function esMentiraBot(){

    voces.src = jugador1.vidas == 1 ? "../audio/ja liar bot.mp3" : "../audio/liarBot.mp3";
    voces.play();

    gsap.fromTo(
        textoMentir,
        { scale: 0.5, opacity: 0 },
        { 
            scale: 12, 
            opacity: 1,
            duration: 2,
            ease: "power3.out",
            onComplete: () => {
            gsap.to(textoMentir, {
                opacity: 0,
                duration: 1,
                delay: 1 
            });
        }
        }
    );
    
    setTimeout(()=>{
        cartaMazo.src = urlImgMazo;
        cartaMazo.style.zIndex = 40;
        cartaMazo.classList.add('levantar');
    }, 3500); 

    setTimeout(()=>{
        cartaMazo.classList.remove('levantar');
        cartaMazo.classList.add('rotar');
    }, 6500)  

    let rondaAux = comprobarRonda();
    let figuraEnMesa = cartaMazo.alt[0];

    setTimeout(() =>{

        if(rondaAux == figuraEnMesa){     
            jugador2.vidas--; 
            vidasRivalImg[jugador2.vidas].src = "../images/calavera.png"
            reiniciarRonda();
        } else{  
            jugador1.vidas--;  
            vidasPropiasImg[jugador1.vidas].src = "../images/calavera.png"   
            reiniciarRonda();
        }  
    }, 10000);    
}


/**
 *    FUNCION PARA RESETEAR MESA
 */
let ganador;

function reiniciarRonda() {
    if(jugador1.vidas == 3) fondoMain.style.backgroundImage = "url('../images/fondo2.png')";
    if(jugador1.vidas == 1) fondoMain.style.backgroundImage = "url('../images/fondo3.png')";

    if(jugador1.vidas > 0 && jugador2.vidas == 0) ganador = "Ganaste!";
    if(jugador1.vidas == 0 && jugador2.vidas > 0) ganador = "Perdiste!";

    jugador1.turno = true;
    jugador1.cartasDisponibles = 5;
    jugador2.turno = false;
    espacioFlag = false;
    cartaMazo.classList.remove('rotar');
    cartaMazo.style.zIndex = 20;
    cartaMazo.src = "";
    cartaMazo.alt = "";
    cartaMazo.style.display = "none";

    for (let i = 0; i < contenedorCarta.length; i++) {
        contenedorCarta[i].src = "";
        contenedorCarta[i].alt = "";
        if (i < 5) {
            resetCartas(i);
            hacerVisibleCartas(i);
        }
    }

    urlImgMazo = "";
    posicionesCartasBot= [];
    posicionesCartasBot = [0, 1, 2, 3, 4, 5];

    if(jugador1.vidas == 0 || jugador2.vidas == 0){
        Swal.fire({
            title: `${ganador}\n¿Volver a jugar?`,
            confirmButtonText: "Si",
            showCancelButton: true,
            cancelButtonText: "No",
            customClass:{
                confirmButton:'estiloBotonSi',
                cancelButton:'estiloBotonNo',
                title:'estilosTitulo',
                popup:'fondoReiniciar'
            }
        }).then((result) => {
            if(!result.isConfirmed){
                window.location.href = "../index.html"
            } else{
                reiniciarJugadores();
            }
        })
    } 

    iniciarJuego();
}

function resetCartas(i) {
    cartasPropias[i].src = "";
    cartasPropias[i].alt = "";
    cartasPropias[i].style.display = "none";
    
    cartasRival[i].src = "";
    cartasRival[i].alt = "";
    cartasRival[i].style.display = "none";
}

function hacerVisibleCartas(i) {
    cartasPropias[i].style.display = "inline";
    cartasPropias[i].style.pointerEvents = "auto";

    cartasRival[i].style.display = "inline";
    cartasRival[i].style.pointerEvents = "none";
}

function reiniciarJugadores(){
    jugador1.vidas = 5;
    jugador2.vidas = 5;

    for(let i = 0; i < 5; i++){
        vidasRivalImg[i].src = "../images/calavera2.png"            
        vidasPropiasImg[i].src = "../images/calavera2.png" 
    }

}

const opc = document.getElementById("opciones");

opc.addEventListener('click', () =>{
    Swal.fire({
        title: "¿Quiere volver al menu principal?",
        confirmButtonText: "Si",
        showCancelButton: true,
        cancelButtonText: "No",
        customClass:{
            confirmButton:'estiloBotonSi2',
            cancelButton:'estiloBotonNo2',
            title:'estilosTitulo',
            popup:'fondoReiniciar'
        }
    }).then((result) => {
        if(result.isConfirmed){
            window.location.href = "../index.html"
        }
    })
})

const amb = document.getElementById("ambiente");
amb.volume = 0.8;