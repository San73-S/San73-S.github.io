function obtenerValores(){
    event.preventDefault();
    var cantidad=document.getElementById("cantidad");
    var categoria=document.getElementById("categoria");
    var nombre=document.getElementById("nombre");
    var apellido=document.getElementById("apellido");
    var email=document.getElementById("correo");

    var totalAPagar;

    var valorCant=cantidad.value;
    var valorNombre=nombre.value;
    var valorApellido=apellido.value;
    var valorEmail=correo.value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(valorEmail)){
        alert("El email es incorrecto.")
    }
    else if(valorCant=="" || valorNombre=="" || valorApellido=="" || !emailRegex.test(valorEmail)){
        alert("Hay campos vacíos.Por favor complete todos los campos.");
    }
    else{
        alert("Se envió el contenido con éxito.");
    }


    if(categoria.value=="Estudiante"){
        totalAPagar= 200*cantidad.value - (200*cantidad.value * 80 / 100) ;
        document.getElementById("total").textContent = "Total a Pagar: $ " + totalAPagar;
    }
    else if(categoria.value=="Trainee"){
        totalAPagar= 200*cantidad.value - (200*cantidad.value * 50 / 100) ;
        document.getElementById("total").textContent = "Total a Pagar: $ " + totalAPagar;
    }
    else{
        totalAPagar= 200*cantidad.value - (200*cantidad.value * 15 / 100) ;
        document.getElementById("total").textContent = "Total a Pagar: $ " + totalAPagar;
    }

  
    

}

function borrarContenido(){
    document.getElementById("total").textContent = "Total a Pagar: $ ";
    alert("Se borro el contenido con éxito.");
}