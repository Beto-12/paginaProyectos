// variables globales
let errores = [];
let arrayMascotas = [];
let modo = 0;
let idMascota = 0;

function guardarLocalStorage() {
    localStorage.setItem('mascotas', JSON.stringify(arrayMascotas));
}

function cargarLocalStorage() {
    const datosGuardados = localStorage.getItem('mascotas');
    if (datosGuardados){
        arrayMascotas = JSON.parse(datosGuardados);
        pintarMascotas();
    }
}

function contarCaracteres() {
    const span = document.getElementById("spanContador");
    const textarea = document.getElementById("motivo");

    const caracteresActuales = textarea.value.length;
    const caracteresMaximos = 400;

    span.textContent = `${caracteresActuales}/ ${caracteresMaximos}`;

    if (caracteresActuales >= 380){
        span.style.color = "red";
    } else if (caracteresActuales >= 350) {
        span.style.color = "orange";
    } else {
        span.style.color = "black";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let consecutivo = Math.random() * 1000 + Date.now()
    console.log(Math.round(consecutivo));

    // Mostramos el listener para filtrar por estados
    document.getElementById("estados").addEventListener("change", filtrarEstado);

    // Mostramos el listener para filtrar por nombres
    document.getElementById("buscarNombres").addEventListener("input", buscarNombres);

    // Mostramos el listener para el contador de caracteres
    document.getElementById("motivo").addEventListener("input", contarCaracteres);

    // Cargamos datos del LocalStorage
    cargarLocalStorage();
})

// Funcion para mostrar el formulario de registro de mascota
function registrarMascota() {
    let form = document.getElementById("contenedorFormulario")
    form.style.display = "block";
    document.getElementById("padre").style.filter = "blur(5px)";
}

// Funcion para cerrar el fomulario
function cerrarFormulario() {
    let formNone = document.getElementById("contenedorFormulario")
    formNone.style.display = "none";
    document.getElementById("padre").style.filter = "blur(0px)";
}

function enviarForm() {
    if (modo == 0) {
        validarFormulario();
    } else if (modo == 1) {
        editarMascota();
    }
}

// Validaciones para el formulario de registro de mascota
function validarFormulario() {
    let nombreMascota = document.getElementById("nombre").value;
    let nombrePropietario = document.getElementById("propietario").value;
    let telefono = document.getElementById("telefono").value;
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    let tipoMascota = document.getElementById("tipoMascotas").value;
    let sintomas = document.getElementById("motivo").value;
    let estado = document.getElementById("estadoCita").value;

    if (nombreMascota == "") {
        errores.push("El nombre de la mascota es obligatorio");
    } else if (nombrePropietario == "") {
        errores.push("El  nombre del propietario es obligatorio");
    } else if (!/^\d{10}$/.test(telefono)) {
        errores.push("El telefono debe tener 10 digitos");
    } else if (fecha == "") {
        errores.push("La fecha es obligatoria");
    } else if (new Date(fecha) < new Date().setHours(0, 0, 0, 0)) {
        errores.push("La fecha no debe ser menor a la anterior");
    } else if (hora == "") {
        errores.push("La hora es obligatoria");
    } else if (hora < "08:00" || hora > "20:00") {
        errores.push("La hora para agendar la cita debe ser entre las 08:00 am y las 08:00 pm");
    } else if (tipoMascota == "") {
        errores.push("Seleccione el tipo de mascota");
    } else if (sintomas == "") {
        errores.push("Indique que sintomas tiene la mascota");
    } else {
        let mascota = {
            id: Math.round(Math.random() * 1000 + Date.now()),
            nombreMascota: nombreMascota,
            nombrePropietario: nombrePropietario,
            telefono: telefono,
            fecha: fecha,
            hora: hora,
            tipoMascota: tipoMascota,
            sintomas: sintomas,
            estado: estado
        }
        arrayMascotas.unshift(mascota);
        console.log(arrayMascotas);
        guardarLocalStorage();
        limpiarFormulario();
        pintarMascotas();
        
    }
    

    if (errores.length === 0) {
        cerrarFormulario();
        pintarMascotas();
    }

    // Mostramos los errores si hay
    if (errores.length > 0) {
        document.getElementById("parrafoError").textContent = errores.join(", ");
        document.getElementById("dialogoErrores").showModal();

        document.getElementById("btnCerrar").addEventListener("click", () => {
            document.getElementById("dialogoErrores").close()
            errores = [];
        })
    } else {
        document.getElementById("dialogoConfirmacion").showModal();
        document.getElementById("btnCerrarConfir").addEventListener("click", () => {
            document.getElementById("dialogoConfirmacion").close();
        });
    }
}

// Funcion para limpiar el formulario
function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("propietario").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("tipoMascotas").value = "";
    document.getElementById("motivo").value = "";
    document.getElementById("estadoCita").value = "Abierta";
}

//Funcion editar mascotas 
function editarMascota() {
    let nombreMascota = document.getElementById("nombre").value;
    let nombrePropietario = document.getElementById("propietario").value;
    let telefono = document.getElementById("telefono").value;
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    let tipoMascota = document.getElementById("tipoMascotas").value;
    let sintomas = document.getElementById("motivo").value;
    let estado = document.getElementById("estadoCita").value;

    if (nombreMascota == "") {
        errores.push("El nombre de la mascota es obligatorio");
    } else if (nombrePropietario == "") {
        errores.push("El  nombre del propietario es obligatorio");
    } else if (!/^\d{10}$/.test(telefono)) {
        errores.push("El telefono debe tener 10 digitos");
    } else if (fecha == "") {
        errores.push("La fecha es obligatoria");
    } else if (new Date(fecha) < new Date().setHours(0, 0, 0, 0)) {
        errores.push("La fecha debe ser mayor a la actual");
    } else if (hora == "") {
        errores.push("La hora es obligatoria");
    } else if (hora < "08:00" || hora > "20:00") {
        errores.push("La hora para agendar la cita debe ser entre las 08:00 am y las 08:00 pm");
    } else if (tipoMascota == "") {
        errores.push("Seleccione el tipo de mascota");
    } else if (sintomas == "") {
        errores.push("Indique que sintomas tiene la mascota");
    } else {
        // Actualizamos la mascota en el array
        let indice = arrayMascotas.findIndex((m) => m.id == idMascota);
        console.log(indice);

        if (indice !== -1) {
            arrayMascotas[indice].nombreMascota = nombreMascota;
            arrayMascotas[indice].nombrePropietario = nombrePropietario;
            arrayMascotas[indice].telefono = telefono;
            arrayMascotas[indice].fecha = fecha;
            arrayMascotas[indice].hora = hora;
            arrayMascotas[indice].tipoMascota = tipoMascota;
            arrayMascotas[indice].sintomas = sintomas;
            arrayMascotas[indice].estado = estado;

            guardarLocalStorage();
            pintarMascotas();
            limpiarFormulario();
            cerrarFormulario();
            modo = 0;
            document.getElementById("btnEnviar").textContent = "Guardar mascota";
            console.log(arrayMascotas);
            document.getElementById("divEstados").style.display = "none";
        }
        
    }

    if (errores.length > 0) {
        document.getElementById("parrafoError").textContent = errores.join(", ");
        document.getElementById("dialogoErrores").showModal();

        document.getElementById("btnCerrar").addEventListener("click", () => {
            document.getElementById("dialogoErrores").close();
            errores = [];
        });
    }

    
}

//Funcion para pintar las mascotas 
function pintarMascotas() {
    document.getElementById("contenedorCards").textContent = "";
    arrayMascotas.forEach((item, i) => {
        let divCard = document.createElement("div");

        let divNombreMascota = document.createElement("div");
        let textoMascota = document.createElement("h2");
        textoMascota.style.textAlign = "center";
        textoMascota.textContent = `Mascota: ${item.nombreMascota}`;
        divNombreMascota.appendChild(textoMascota);
        divCard.appendChild(divNombreMascota);

        let divIdCita = document.createElement("div");
        let textoId = document.createElement("h3");
        textoId.textContent = `Cita #${item.id}`;
        textoId.style.textAlign = "center";
        divIdCita.appendChild(textoId);
        divCard.appendChild(divIdCita);

        let divImagen = document.createElement("div");
        let imagen = document.createElement("img");
        imagen.className = "imagenCard";
        divCard.className = "divCard";

        divImagen.appendChild(imagen);
        divCard.appendChild(divImagen);



        document.getElementById("contenedorCards").appendChild(divCard);

        let divPropietario = document.createElement("div");
        let parrafoPropietario = document.createElement("p");
        parrafoPropietario.textContent = `Propietario: ${item.nombrePropietario}`;
        divPropietario.appendChild(parrafoPropietario);
        divCard.appendChild(divPropietario);

        let divTelefono = document.createElement("div");
        let parrafoTelefeno = document.createElement("p");
        parrafoTelefeno.textContent = `Número de telefono: ${item.telefono}`;
        divTelefono.appendChild(parrafoTelefeno);
        divCard.appendChild(divTelefono);

        let divFecha = document.createElement("div");
        let parrafoFecha = document.createElement("p");
        parrafoFecha.textContent = `Fecha: ${item.fecha}`;
        divFecha.appendChild(parrafoFecha);
        divCard.appendChild(divFecha);

        let divHora = document.createElement("div");
        let parrafoHora = document.createElement("p");
        parrafoHora.textContent = `Hora: ${item.hora}`;
        divHora.appendChild(parrafoHora);
        divCard.appendChild(divHora);

        let divTipo = document.createElement("div");
        let parrafoTipo = document.createElement("p");
        parrafoTipo.textContent = `Tipo de mascota: ${item.tipoMascota}`;
        divTipo.appendChild(parrafoTipo);
        divCard.appendChild(divTipo);

        if (item.tipoMascota == "perro") {
            imagen.src = "https://es.mypet.com/wp-content/uploads/sites/23/2021/03/GettyImages-1143107320-e1597136744606.jpg";
        } else if (item.tipoMascota == "gato") {
            imagen.src = "https://hospitalveterinariodonostia.com/wp-content/uploads/2022/02/Personalidad-gatos.png";
        } else if (item.tipoMascota == "loro") {
            imagen.src = "https://cdn.pixabay.com/photo/2023/11/06/06/50/parrot-8368951_1280.png"
        } else if (item.tipoMascota == "vaca") {
            imagen.src = "https://a.storyblok.com/f/160385/4bf112f0cd/datos_curiosos.jpg/m/filters:quality(70)/"
        } else if (item.tipoMascota == "caballo") {
            imagen.src = "https://concepto.de/wp-content/uploads/2021/07/caballos-e1626738224231.jpg"
        } else if (item.tipoMascota == "cerdo") {
            imagen.src = "https://www.animanaturalis.org/img/pages/full/202005/P27-11697.jpg"
        } else if (item.tipoMascota == "pato") {
            imagen.src = "https://www.allaboutbirds.org/guide/assets/photo/308743051-1900px.jpg?__hstc=6989805.2f3f33a24b44870ec4a577029c49e44b.1747785600117.1747785600118.1747785600119.1&__hssc=6989805.1.1747785600120&__hsfp=3282704936"
        } else if (item.tipoMascota == "conejo") {
            imagen.src = "https://de.cdn-website.com/067971d52ba44fdcb3a1d4ff47e1118c/dms3rep/multi/conejo-99a4995b.jpg"
        } else if (item.tipoMascota == "oveja") {
            imagen.src = "https://www.masquesaludanimal.es//posts/easset_upload_file43365_884961_e.png"
        } else if (item.tipoMascota == "gallina") {
            imagen.src = "https://pazodevilane.com/wp-content/uploads/2022/08/curiosidades_portada.jpg"
        } else {
            imagen.src = "https://www.insm.es/blognoticias/wp-content/uploads/2022/04/sin-preguntas.jpeg"
        }

        let divSintomas = document.createElement("div");
        let parrafoSintomas = document.createElement("p");
        parrafoSintomas.textContent = `Sintomas: ${item.sintomas}`;
        divSintomas.appendChild(parrafoSintomas);
        divCard.appendChild(divSintomas);

        let divEstados = document.createElement("div");
        let textoEstado = document.createElement("h3");
        textoEstado.className = "estadoCita";
        textoEstado.textContent = `${item.estado}`;
        divEstados.appendChild(textoEstado);
        divCard.appendChild(divEstados);

        let divBotones = document.createElement("div");
        divBotones.className = "divBotones";
        let botonEditar = document.createElement("button");
        botonEditar.className = "botonEditar";
        botonEditar.textContent = "Editar 🖋️";
        let botonEliminar = document.createElement("button");
        botonEliminar.className = "botonEliminar";
        botonEliminar.textContent = "Eliminar ❌";

        botonEditar.addEventListener("click", () => {
            document.getElementById("contenedorFormulario").style.display = "block";
            document.getElementById("padre").style.filter = "blur(5px)";
            document.getElementById("nombre").value = item.nombreMascota;
            document.getElementById("propietario").value = item.nombrePropietario;
            document.getElementById("telefono").value = item.telefono;
            document.getElementById("fecha").value = item.fecha;
            document.getElementById("hora").value = item.hora;
            document.getElementById("tipoMascotas").value = item.tipoMascota;
            document.getElementById("motivo").value = item.sintomas;
            document.getElementById("estadoCita").value = item.estado;

            document.getElementById("divEstados").style.display = "block";

            // Cambiamos el texto del boton de enviar
            document.getElementById("btnEnviar").textContent = "Actualizar";

            
            registrarMascota();
            modo = 1; // Cambiamos el modo a editar
            idMascota = item.id; // Guardamos el id de la mascota a editar
        });

        botonEliminar.addEventListener("click", () => {
            document.getElementById("padre").style.filter = "blur(5px)";
            document.getElementById("dialogoConfirmacionEliminar").showModal();
            idMascota = item.id; // Guardamos el id de la mascota a eliminar
        });

        divBotones.appendChild(botonEditar);
        divBotones.appendChild(botonEliminar);
        divCard.appendChild(divBotones);
    })
}

// Al hacer click en aceptar se elimanará la mascota

function btnAceptarEliminacion() {
    let indice = arrayMascotas.findIndex((m) => m.id == idMascota);
    console.log(`Posicion eliminada: ${indice}`);
    if (indice !== -1) {
        arrayMascotas.splice(indice, 1);
        console.log(arrayMascotas);
        guardarLocalStorage();
        pintarMascotas();
        document.getElementById("dialogoConfirmacionEliminar").close();
        document.getElementById("padre").style.filter = "blur(0px)";
    };
};

// Al hacer click en cancelar se mantendrá la mascota
function btnCancelarEliminacion() {
    document.getElementById("dialogoConfirmacionEliminar").close();
    document.getElementById("padre").style.filter = "blur(0px)";
};

// Funcion para filtrar por estados
function filtrarEstado() {
    let estadoSeleccionado = document.getElementById("estados").value;
    let mascotas = document.querySelectorAll("#contenedorCards > div");

    mascotas.forEach((m, i) => {
        let estadoMascota = arrayMascotas[i].estado;

        if (estadoMascota.includes(estadoSeleccionado)){
            m.style.display = ""; // Muestra la mascota si el estado coincide
        } else if (estadoSeleccionado === "Todas las citas"){
            m.style.display = ""; // Muestra todas las mascotas si se selecciona "Todas"
        } else {
            m.style.display = "none"; // Oculta la mascota si el estado no coincide
        }
    })
}

// Funcion para buscar mascotas por su nombre o por el nombre del dueño
function buscarNombres() {
    let inputBuscar = document.getElementById("buscarNombres").value.toLowerCase();
    let mascotas = document.querySelectorAll("#contenedorCards > div");

    mascotas.forEach((m, i) => {
        let nombreMascota = arrayMascotas[i].nombreMascota.toLowerCase();
        let nombrePropietario = arrayMascotas[i].nombrePropietario.toLowerCase();

        if (nombreMascota.startsWith(inputBuscar) || nombrePropietario.startsWith(inputBuscar)){
            m.style.display = ""; // Muestra los nombres
        } else {
            m.style.display = "none"; // Oculta si no se encuentran los nombres
        }
    });
}
