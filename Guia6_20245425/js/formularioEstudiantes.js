const inputCarnet = document.getElementById("idTxtCarnet");
const inputNombreCompleto = document.getElementById("idTxtNombreCompleto");
const inputDUI = document.getElementById("idTxtDUI");
const inputNIT = document.getElementById("idTxtNIT");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputCorreo = document.getElementById("idTxtCorreo");
const inputEdad = document.getElementById("idTxtEdad");

const buttonAgregarEstudiante = document.getElementById("idBtnAgregar");
const buttonLimpiarEstudiante = document.getElementById("idBtnLimpiar");
const buttonMostrarEstudiante = document.getElementById("idBtnMostrar");

const notificacion = document.getElementById("idNotificacion");
const mensaje = document.getElementById("idMensaje");
const btnCloseToast = document.querySelector(".btn-close");

let arrayEstudiante = [];

// Función para mostrar toast
function showToast() {
    notificacion.classList.add("show");
    setTimeout(() => {
        notificacion.classList.remove("show");
    }, 3000); // Auto-hide after 3 seconds
}

// Función para ocultar toast manualmente
btnCloseToast.addEventListener("click", () => {
    notificacion.classList.remove("show");
});

// Función para limpiar el formulario
const limpiarForm = () => {
    inputCarnet.value = "";
    inputNombreCompleto.value = "";
    inputDUI.value = "";
    inputNIT.value = "";
    inputFechaNacimiento.value = "";
    inputCorreo.value = "";
    inputEdad.value = "";

    inputCarnet.focus();
};

// Función para validar campos usando expresiones regulares
const validarCampos = () => {
    const regexCarnet = /^[A-Z]{2}\d{3}$/;
    const regexNombre = /^[a-zA-Z\s]+$/;
    const regexDUI = /^\d{8}-\d$/;
    const regexNIT = /^\d{4}-\d{6}-\d{3}-\d$/;
    const regexFecha = /^\d{2}\/\d{2}\/\d{4}$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexEdad = /^\d+$/;

    if (!regexCarnet.test(inputCarnet.value)) {
        mensaje.innerHTML = "Carnet inválido. Debe ser dos letras mayúsculas y tres números (Ej: AB001).";
        showToast();
        return false;
    }
    if (!regexNombre.test(inputNombreCompleto.value)) {
        mensaje.innerHTML = "Nombre completo inválido. Solo letras y espacios, sin números o caracteres especiales.";
        showToast();
        return false;
    }
    if (!regexDUI.test(inputDUI.value)) {
        mensaje.innerHTML = "DUI inválido. Formato: ########-#.";
        showToast();
        return false;
    }
    if (!regexNIT.test(inputNIT.value)) {
        mensaje.innerHTML = "NIT inválido. Formato: ####-######-###-#.";
        showToast();
        return false;
    }
    if (!regexFecha.test(inputFechaNacimiento.value)) {
        mensaje.innerHTML = "Fecha de nacimiento inválida. Formato: DD/MM/YYYY.";
        showToast();
        return false;
    }
    if (!regexCorreo.test(inputCorreo.value)) {
        mensaje.innerHTML = "Correo electrónico inválido.";
        showToast();
        return false;
    }
    if (!regexEdad.test(inputEdad.value)) {
        mensaje.innerHTML = "Edad inválida. Solo números.";
        showToast();
        return false;
    }
    return true;
};

// Función para agregar estudiante
const addEstudiante = function () {
    if (validarCampos()) {
        let carnet = inputCarnet.value;
        let nombreCompleto = inputNombreCompleto.value;
        let dui = inputDUI.value;
        let nit = inputNIT.value;
        let fechaNacimiento = inputFechaNacimiento.value;
        let correo = inputCorreo.value;
        let edad = inputEdad.value;

        arrayEstudiante.push([carnet, nombreCompleto, dui, nit, fechaNacimiento, correo, edad]);

        mensaje.innerHTML = "Estudiante registrado correctamente.";
        showToast();

        limpiarForm();
    }
};

// Función para imprimir filas de la tabla
function imprimirFilas() {
    let $fila = "";
    let contador = 1;

    arrayEstudiante.forEach((element) => {
        $fila += `<tr>
                <td>${contador}</td>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td>${element[2]}</td>
                <td>${element[3]}</td>
                <td>${element[4]}</td>
                <td>${element[5]}</td>
                <td>${element[6]}</td>
                <td>
                    <button id="idBtnEditar${contador}" type="button" class="btn-primary">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button id="idBtnEliminar${contador}" type="button" class="btn-danger">
                        <i class="bi bi-trash3-fill"></i>
                    </button>
                </td>
            </tr>`;
        contador++;
    });
    return $fila;
}

// Función para imprimir estudiantes en tabla
const imprimirEstudiantes = () => {
    let $table = `<div class="table-responsive">
    <table class="table table-striped table-hover table-bordered">
        <tr>
            <th scope="col" class="text-center" style="width:5%">#</th>
            <th scope="col" class="text-center" style="width:10%">Carnet</th>
            <th scope="col" class="text-center" style="width:20%">Nombre Completo</th>
            <th scope="col" class="text-center" style="width:10%">DUI</th>
            <th scope="col" class="text-center" style="width:15%">NIT</th>
            <th scope="col" class="text-center" style="width:10%">Fecha Nacimiento</th>
            <th scope="col" class="text-center" style="width:15%">Correo</th>
            <th scope="col" class="text-center" style="width:5%">Edad</th>
            <th scope="col" class="text-center" style="width:10%">Opciones</th>
        </tr>
        ${imprimirFilas()}
    </table>
    </div>`;

    document.getElementById("idTablaEstudiantes").innerHTML = $table;
};

// Función para eliminar estudiante
function eliminarEstudiante(index) {
    arrayEstudiante.splice(index, 1);
    mensaje.innerHTML = "Estudiante eliminado correctamente.";
    showToast();
    imprimirEstudiantes();
}

// Función para editar estudiante
function editarEstudiante(index) {
    const estudiante = arrayEstudiante[index];

    inputCarnet.value = estudiante[0];
    inputNombreCompleto.value = estudiante[1];
    inputDUI.value = estudiante[2];
    inputNIT.value = estudiante[3];
    inputFechaNacimiento.value = estudiante[4];
    inputCorreo.value = estudiante[5];
    inputEdad.value = estudiante[6];

    arrayEstudiante.splice(index, 1);

    mensaje.innerHTML = "Editando estudiante.";
    showToast();

    inputCarnet.focus();
    imprimirEstudiantes();
}

// Event listeners
buttonLimpiarEstudiante.onclick = () => {
    limpiarForm();
};

buttonAgregarEstudiante.onclick = () => {
    addEstudiante();
};

buttonMostrarEstudiante.onclick = () => {
    imprimirEstudiantes();
};

document.getElementById("idTablaEstudiantes").addEventListener("click", (e) => {
    if (e.target.closest("button")) {
        const boton = e.target.closest("button");
        const id = boton.id;

        if (id.startsWith("idBtnEliminar")) {
            const index = parseInt(id.replace("idBtnEliminar", "")) - 1;
            eliminarEstudiante(index);
        }

        if (id.startsWith("idBtnEditar")) {
            const index = parseInt(id.replace("idBtnEditar", "")) - 1;
            editarEstudiante(index);
        }
    }
});

limpiarForm();