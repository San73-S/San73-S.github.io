const fondo = document.getElementById("fondoNuevo");
const jugar = document.getElementById("jugar");
const comoJugar = document.getElementById("como-jugar");
const contenedorBtn = document.getElementById("botones");
const carga = document.getElementById("carga");
const main = document.getElementById("main");
const comenzar = document.getElementById("comenzar");
const instrucciones = document.getElementById("instructivo");
const cerrar = document.getElementById("cerrar");
const amb = document.getElementById("ambiente");
const efecto = document.getElementById("efectos-sonido");
const botonFormulario = document.getElementById("btn-form");
const nombre = document.getElementById("nombre-jugador");
const btnJugar = document.getElementById("btn-jugar");
const btnContrato = document.getElementById("btn-contrato");

jugar.addEventListener('click', () => {
    contenedorBtn.style.display = "none";
    fondo.style.backgroundImage = 'url("images/menuFondo2.png")';
    fondo.classList.add("zoom");
    efecto.src = `audio/whoosh2.mp3`;
    efecto.play();

    setTimeout( ()=>{
        main.style.alignItems = "end";
        carga.style.display = "flex";  
        amb.volume = 0.5;  
        efecto.src = `audio/recarga1.mp3`;
        efecto.play();    
    }, 3000);

    setTimeout( ()=>{        
        comenzar.style.opacity = 1;        
    }, 10000);
});

comoJugar.addEventListener('click', ()=>{
    contenedorBtn.style.display = "none";
    instrucciones.style.display = "flex";
    efecto.src = `audio/whoosh1.mp3`;
    efecto.play();
    instrucciones.style.animation = "zoomInsAbrir 1s linear forwards";    
    amb.play();
    amb.loop = true;
});

cerrar.addEventListener('click', ()=>{    
    instrucciones.style.animation = "zoomInsCerrar 1s linear forwards";
    efecto.src = `audio/whoosh1.mp3`;
    efecto.play();
    setTimeout(()=>{
        instrucciones.style.display = "none";
        contenedorBtn.style.display = "inline";
    },1000)
});

jugar.addEventListener('mouseover', ()=>{
    efecto.src = `audio/hover.mp3`;
    efecto.play();
    efecto.volume = 0.7;
})

comoJugar.addEventListener('mouseover', ()=>{
    efecto.src = `audio/hover.mp3`;
    efecto.play();
    efecto.volume = 0.7;    
})

botonFormulario.addEventListener('mouseover', ()=>{
    efecto.src = `audio/hover.mp3`;
    efecto.play();
    efecto.volume = 0.7;
})

botonFormulario.addEventListener('click', () =>{    
    event.preventDefault();

    if(nombre.value.trim() === ""){
        nombre.classList.add('incompleto');
        return;
    }

    localStorage.setItem("nombreUsuario", nombre.value);
    nombre.classList.remove('incompleto');
    cerrar.click();
    btnJugar.style.display = "flex";
    btnContrato.style.display = "none";
})