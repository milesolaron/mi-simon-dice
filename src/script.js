//Variables
let secuenciaSimon = [];
let secuenciaUsuario = [];

const numeroRonda = document.getElementById("ronda");
const estado = document.getElementById("estado");
const botonInicio = document.getElementById("empezar-btn");
const cuadros = Array.from(document.querySelectorAll(".cuadro"));

//Eventos
botonInicio.addEventListener("click", comenzarJuego);
actualizarEstado('¡Hacé click en "Empezar" para jugar!');
actualizarNumeroRonda('-');
bloquearInputUsuario();

//Funciones
function comenzarJuego() {
    reiniciarEstado();
    manejarRonda();
}

function reiniciarEstado() {
    estado.innerHTML = '¡Hacé click en "Empezar" para jugar!';
    secuenciaSimon = [];
    secuenciaUsuario = [];
    ronda = 0;
}

function manejarRonda() {
    actualizarEstado("¡Turno de Simón!");
    bloquearInputUsuario();

    const nuevoCuadro = obtenerCuadroAleatorio();
    secuenciaSimon.push(nuevoCuadro);

    const turnoJugador = (secuenciaSimon.length + 1) * 1000;

    secuenciaSimon.forEach(($cuadro, i) => {
        const tiempoRetraso = (i + 1) * 1000;
        setTimeout(() => {
            resaltar($cuadro);
        }, tiempoRetraso);
    });

    setTimeout(() => {
        actualizarEstado("¡Es tu turno!");
        desbloquearInputUsuario();
    }, turnoJugador);

    secuenciaUsuario = [];
    ronda++;
    actualizarNumeroRonda(ronda);
}

function actualizarNumeroRonda(numeroRonda) {
    const $numeroRonda = document.getElementById("ronda");
    $numeroRonda.textContent = numeroRonda;
}

function manejarInputUsuario(e) {
    const $cuadro = e.target;
    resaltar($cuadro);
    secuenciaUsuario.push($cuadro);
    const $cuadroSimon = secuenciaSimon[secuenciaUsuario.length - 1];
    if ($cuadro.id !== $cuadroSimon.id) return perder();
    if (secuenciaUsuario.length === secuenciaSimon.length) {
        bloquearInputUsuario();
        setTimeout(manejarRonda, 1000);
    }
}

function obtenerCuadroAleatorio() {
    const $cuadros = document.querySelectorAll(".cuadro");
    const { length } = $cuadros;
    const indice = Math.floor(length * Math.random());
    return $cuadros[indice];
}

function actualizarEstado(estado, error = false) {
    const $estado = document.querySelector("#estado");
    $estado.textContent = estado;
    if (error) {
        $estado.classList.remove("alert-dark");
        $estado.classList.add("alert-danger");
    } else {
        $estado.classList.remove("alert-danger");
        $estado.classList.add("alert-dark");
    }
}

function resaltar($cuadro) {
    $cuadro.style.opacity = 1;
    setTimeout(function() {
        $cuadro.style.opacity = 0.5;
    } , 300);
}

function bloquearInputUsuario() {
    document.querySelectorAll(".cuadro").forEach($cuadro => {
        $cuadro.onclick = function() {

        };
    });
}

function desbloquearInputUsuario() {
    document.querySelectorAll(".cuadro").forEach($cuadro => {
        $cuadro.onclick = manejarInputUsuario;
    });
}

function perder() {
    bloquearInputUsuario();
    actualizarEstado("¡Perdiste! :(");
    document.querySelector("#empezar-btn").addEventListener("click", comenzarJuego);
}