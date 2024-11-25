const fondo = document.getElementById("fondoNuevo");
const jugar = document.getElementById("jugar");
const comoJugar = document.getElementById("como-jugar");
const contenedorBtn = document.getElementById("botones");
const carga = document.getElementById("carga");
const main = document.getElementById("main");
const comenzar = document.getElementById("comenzar");
const instrucciones = document.getElementById("instructivo");
const cerrar = document.getElementById("cerrar");

jugar.addEventListener('click', () => {
    contenedorBtn.style.display = "none";
    fondo.style.backgroundImage = 'url("images/menuFondo2.png")';
    fondo.classList.add("zoom");

    setTimeout( ()=>{
        main.style.alignItems = "end";
        carga.style.display = "flex";        
    }, 3000);

    setTimeout( ()=>{        
        comenzar.style.opacity = 1;        
    }, 13000);
});

comoJugar.addEventListener('click', ()=>{
    contenedorBtn.style.display = "none";
    instrucciones.style.display = "flex";
    instrucciones.style.animation = "zoomInsAbrir 1s linear forwards";
});

cerrar.addEventListener('click', ()=>{    
    instrucciones.style.animation = "zoomInsCerrar 1s linear forwards";
    setTimeout(()=>{
        instrucciones.style.display = "none";
        contenedorBtn.style.display = "inline";
    },1000)
});