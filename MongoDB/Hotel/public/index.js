mostrarDatos();
mostrarClientes();
mostrarRerevas();

function mostrarDatos(){
    fetch(`/API/habitaciones`)
    .then((res) => res.json())
        .then((data) => {
            let tabla =`<table class="table table-striped border="2">
   
    <tr>
    <th  colspan="6" >HABITACIONES</th>

    <tr>
        <th scope="col"> HABITACIÓN </th>
        <th scope="col"> Nº CAMAS </th>
        <th scope="col"> ESTADO </th>  
    </tr>`
    for(let i=0;i<data.length;i++){
    tabla+=`<tr>
    <th>${data[i].numHab}</th>
    <th>${data[i].camas}</th>
    <th>${data[i].estado}</th>
    </tr>`
    }
    tabla+=`</table>`
    document.getElementById("listaHabitaciones").innerHTML=tabla;
    
});

}

function enviarDatosPost(){
    let nombre= document.getElementById("nombre").value;
    let apellido= document.getElementById("apellido").value;
    let dni= document.getElementById("dni").value;
    let cliente={"nombre":nombre,"apellido":apellido,"dni":dni};
    fetch(`/API/clientes/registro`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cliente)
    
    }).then((res) => res.json())
    .then(function (datos) {
        document.getElementById("nombreRegistrado").innerHTML = datos.mensaje;
        mostrarClientes();
    });
    
}

function enviarDatosPut(){
    let nombreM= document.getElementById("nombreM").value;
    let apellidoM= document.getElementById("apellidoM").value;
    let dniM= document.getElementById("dniM").value;

    let cliente={}
    cliente.dni=dniM;
        if (nombreM!=""){
            cliente.nombre=nombreM
        }
        if (apellidoM!=""){
            cliente.apellido=apellidoM
        }
    fetch(`/API/clientes/modificar`,{
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cliente)
    
    }).then((res) => res.json())
    .then(function (datos) {
        document.getElementById("userModificado").innerHTML = datos.mensaje;
        mostrarClientes();
    });
    
}

function elimarCliente(){
    let dni= document.getElementById("dniM").value;
    fetch(`/API/clientes/eliminar`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "dni": dni })
    }).then((res) => res.json())
        .then(function (datos) {
            document.getElementById("checkOutrealizado").innerHTML = datos.mensaje;
        });
}



function mostrarClientes(){
    fetch(`/API/clientes`,{
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        },
    })
    .then((res) => res.json())
    .then((data) => {let tabla=`<table class="table table-light table-striped border="2" >
    <tbody class="table-group-divider">
    <tr>
        <th scope="col">NOMBRE</th>
        <th scope="col">APELLIDO</th>
        <th scope="col">DNI</th>  
    </tr>
    <tbody class="table-group-divider">`
    for(let i=0;i<data.length;i++){
    tabla+=`<tr>
    <th>${data[i].nombre}</th>
    <th>${data[i].apellido}</th>
    <th>${data[i].dni}</th>
    </tr>`
    }
    tabla+=`</table>`
    document.getElementById("listaClientes").innerHTML=tabla;
    
});

}

function mostrarRerevas(){
    fetch(`/API/reservas`,{
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        },
    })
    .then((res) => res.json())
        .then((data) => {
            let tabla =`<table class="table table-striped border="2">
            <tbody class="table-group-divider">
   
    <tr>
    <th  colspan="6" >RESERVAS</th>
    <tbody class="table-group-divider">

    <tr>
        <th scope="col"> ID </th>
        <th scope="col"> DIN CLIENTE </th>
        <th scope="col"> HABITACIÓN</th>
        <th scope="col"> FECHA DE ENTRADA </th>  
        <th scope="col"> FECHA DE SALIDA </th>  
    </tr>
    `
    for(let i=0;i<data.length;i++){
    tabla+=`<tr>
    <th>${data[i]._id}</th>
    <th>${data[i].dni}</th>
    <th>${data[i].numHab}</th>
    <th>${data[i].fechaCi}</th>
    <th>${data[i].fechaCo}</th>
    </tr>`
    }
    tabla+=`</table>`
    document.getElementById("listaReservas").innerHTML=tabla;
    
});

}

function reservaHabitacion(){
    let nombre= document.getElementById("nombreR").value;
    let apellido= document.getElementById("apellidoR").value;
    let dni= document.getElementById("dniR").value;
    let numHab=document.getElementById("numHabR").value;
    let fechaCi=document.getElementById("checkIn").value;
    let fechaCo=document.getElementById("checkOut").value;
    let reserva={"nombre":nombre,"apellido":apellido,"dni":dni,"numHab":numHab,"fechaCi":fechaCi,"fechaCo":fechaCo};

    fetch("/API/reservas/registro",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reserva)
    }).then((res) => res.json())
    .then(function (datos) {
            document.getElementById("reservaRealizada").innerHTML=datos.mensaje;
            mostrarDatos();
    });
}
function anularReserva(){
    let dni= document.getElementById("dniD").value;
    fetch("/API/reservas/check-out",{
        method: "DELETE",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"dni":dni})
    }).then((res) => res.json())
    .then(function (datos) {
            document.getElementById("checkOutrealizado").innerHTML=datos.mensaje;
            mostrarDatos();
    });
}

// /* global bootstrap: false */
// (() => {
//     'use strict'
//     const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
//     tooltipTriggerList.forEach(tooltipTriggerEl => {
//       new bootstrap.Tooltip(tooltipTriggerEl)
//     })
//   })()
  