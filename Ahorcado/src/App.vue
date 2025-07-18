<template>
  <div class="contenedorPrincipal">
    <h1>{{ titulo }}</h1>
    <div class="formulario-jugador">
    <input 
      v-model="nombreJugador" 
      placeholder="Escribe tu nombre" 
      class="input-nombre"
    />
    <p v-if="nombreJugador" class="bienvenida">¡Hola, {{ nombreJugador }}! 👋</p>
  </div>
  <!-- Tabla de récords -->
  <div class="tabla-records">
    <h3>🏆 Top Jugadores</h3>
    <ul>
      <li v-for="([nombre, puntos], index) in top5Records" :key="nombre">
        {{ index + 1 }}. {{ nombre }}: {{ puntos }} puntos
      </li>
    </ul>
  </div>
    <div class="primeraPantalla" v-if="pantallaActual === 'dificultades'">
      <div class="contenedorNiveles">
        <button class="facil" @click="seleccionarDificultad('facil')" :disabled="!nombreJugador.trim()">
          Facil
        </button>
        <button class="medio" @click="seleccionarDificultad('medio')" :disabled="!nombreJugador.trim()">
          Medio
        </button>
        <button class="dificil" @click="seleccionarDificultad('dificil')" :disabled="!nombreJugador.trim()">
          Dificil
        </button>
      </div>
    </div>

    <div class="segundaPantalla" v-else-if="pantallaActual === 'categorias'">
      <div class="tituloPantalla">
        <h2>
          Seleccione la Categoria (Dificultad: {{ dificultadSeleccionada }})
        </h2>
      </div>
      <div class="contenedorCategorias">
        <button class="animales" @click="seleccionarCategoria('animales')">
          Animales
        </button>
        <button class="deportes" @click="seleccionarCategoria('deportes')">
          Deportes
        </button>
        <button class="paises" @click="seleccionarCategoria('paises')">
          Paises
        </button>
        <button
          class="profesiones"
          @click="seleccionarCategoria('profesionales')"
        >
          Profesiones
        </button>
      </div>

      <div class="btnVolver">
        <button class="volver" @click="botonVolverDificultades()">
          Volver
        </button>
      </div>
    </div>

    <div class="terceraPantalla" v-else-if="pantallaActual === 'juego'">
      <h2>Empieza a adivinar 🤭</h2>
      <div class="temporizador" v-if="dificultadSeleccionada" :style="{ color: tiempoRestante <= 5 ? 'red': 'black' }">
        ⏳ {{ tiempoRestante }} segundos
        <div 
        class="barra-tiempo"
        :style="{ width: (tiempoRestante / configTiempo[dificultadSeleccionada]) * 100 + '%' }"
        ></div>
      </div>
      <div class="infoJuego">
        <span class="infoDificultad"
          ><span style="color: chartreuse">Dificultad:</span>
          {{ dificultadSeleccionada }}</span
        >
        <span class="infoCategoria"
          ><span style="color: chartreuse">Categoria:</span>
          {{ categoriaSeleccionada }}</span
        >

        <div class="contenedorAhorcado">
          <img
            v-show="partesVisibles.includes('cabeza')"
            :src="cabezaMario"
            alt="Cabeza de Mario"
            :class="['cabeza', {'muerto': juegoTerminado}]"
          />
          <img
            v-show="partesVisibles.includes('torso')"
            src="/public/images/torsoMario.png"
            alt="Torso de Mario"
            style="width: 90px; height: 90px; object-fit: cover"
            class="torso"
          />
          <img
            v-show="partesVisibles.includes('brazoDerecho')"
            src="/public/images/brazoDerecho.png"
            alt="Brazo Derecho de Mario"
            style="width: 100px; height: 100px; object-fit: cover"
            class="brazoDerecho"
          />
          <img
            v-show="partesVisibles.includes('brazoIzquierdo')"
            src="/public/images/brazoIzquierdo.png"
            alt="Brazo Izquierdo de Mario"
            style="width: 100px; height: 100px; object-fit: cover"
            class="brazoIzquierdo"
          />
          <img
            v-show="partesVisibles.includes('piernaDerecha')"
            src="/public/images/piernaDerechaa.png"
            alt="Pierna Derecha de Mario"
            style="width: 160px; height: 150px; object-fit: cover"
            class="piernaDerecha"
          />
          <img
            v-show="partesVisibles.includes('piernaIzquierda')"
            src="/public/images/piernaIzquierda.png"
            alt="Pierna Izquierda de Mario"
            style="width: 160px; height: 150px; object-fit: cover"
            class="piernaIzquierda"
          />
          <img
            v-show="partesVisibles.includes('pieDerecho')"
            src="/public/images/pieDerechoo.png"
            alt="Pie Derecho de Mario"
            style="width: 160px; height: 150px; object-fit: cover"
            class="pieDerecho"
          />
          <img
            v-show="partesVisibles.includes('pieIzquierdo')"
            src="/public/images/pieIzquierdo.png"
            alt="Pie Izquierdo de Mario"
            style="width: 160px; height: 150px; object-fit: cover"
            class="pieIzquierdo"
          />
        </div>

        <p v-if="palabraSecreta">
          Palabra oculta: {{ obtenerPalabraOculta() }}
        </p>
        <div class="contenedorIntentosErrores" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <p v-if="maxErrores">Tienes: {{ maxErrores }} intentos</p>
          <p v-if="errores">Errores: {{ errores }}</p>
        </div>
      </div>
      <div class="contendorTecladoVirtual">
        <button
        v-for="letra in abecedario"
        :key="letra"
        @click="adivinarLetra(letra)"
        :disabled="letrasAdivinadas.includes(letra) || juegoTerminado || juegoGanado"
        class="tecla"
        >
          {{ letra.toUpperCase() }}
      </button>
      <button class="tecla tecla-especial" @click="reiniciarJuego()">
        Reiniciar
      </button>
      </div>
      <div class="btnVolver">
        <button class="volver" @click="botonVolverCategorias()">⬅️</button>
      </div>
    </div>
    <!-- Modal para mensajes perdedor/ganador/tiempo -->
    <div class="modal-overlay" v-if="mostrarModal && (juegoTerminado || juegoGanado) && pantallaActual === 'juego'">
      <div class="modal-content">
        <h2>{{ modalTitulo }}</h2>
        <p>{{ modalMensaje }}</p>
        <div class="modal-buttons">
          <button @click="reiniciarJuego" class="modal-btn reiniciar">Jugar de nuevo</button>
          <button @click="volverACategorias" class="modal-btn volver">Volver a categorias</button>
          <button @click="volverInicio" class="modal-btn inicio">Inicio</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

let titulo = ref("Bienvenido Ahorcado");
let nombreJugador = ref("");
let records = ref({});
let pantallaActual = ref("dificultades"); //dificultades o categorias
let dificultadSeleccionada = ref("");
let categoriaSeleccionada = ref("");
let palabraSecreta = ref("");
let letrasAdivinadas = ref([]);
let maxErrores = ref(0);
let abecedario = "abcdefghijklmnñopqrstuvwxyz".split("");
let errores = ref(0);
let juegoTerminado = ref(false);
let juegoGanado = ref(false);
let mostrarModal = ref(false);
let modalTitulo = ref("");
let modalMensaje = ref("");
let tiempoRestante = ref(0);
let temporizadorInterval;

let top5Records = computed(() => {
  return Object.entries(records.value)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5);
});

// Cargamos los datos que estan en el localStorage
onMounted(() => {
  const datosGuardados = localStorage.getItem("ahorcadoRecords");
  if (datosGuardados) records.value = JSON.parse(datosGuardados);

})

onMounted(() => {
  console.log("Estado al iniciar:", {
    juegoTerminado: juegoTerminado.value,
    mostrarModal: mostrarModal.value,
    pantallaActual: pantallaActual.value
  });
});

const configTiempo = {
  facil: 60,  // 60 segundos
  medio: 40,  // 40 segundos
  dificil: 20  // 20 segundos
}

function botonVolverDificultades() {
  pantallaActual.value = "dificultades";
}

function botonVolverCategorias() {
  pantallaActual.value = "categorias";
}

function reiniciarJuego() {
  clearInterval(temporizadorInterval); // Limpiar el temporizador anterior
  mostrarModal.value = false;
  errores.value = 0;
  juegoTerminado.value = false;
  juegoGanado.value = false;
  letrasAdivinadas.value = [];

  if (categoriaSeleccionada.value === "animales") {
    palabraSecreta.value = animales[Math.floor(Math.random() * animales.length)];
  } else if (categoriaSeleccionada.value === "deportes") {
    palabraSecreta.value = deportes[Math.floor(Math.random() * deportes.length)];
  } else if (categoriaSeleccionada.value === "paises") {
    palabraSecreta.value = paises[Math.floor(Math.random() * paises.length)];
  } else if (categoriaSeleccionada.value === "profesionales") {
    palabraSecreta.value = profesiones[Math.floor(Math.random() * profesiones.length)];
  }

  // Reiniciamos el temporizador
  iniciarTemporizador();
}

let animales = ["perro", "gato", "serpiente", "cabra", "gallina", "elefante", "tigre", "jirafa", "cocodrilo", "mariposa"];
let deportes = ["futbol", "baloncesto", "tennis", "golf", "tejo", "natacion", "ciclismo", "atletismo", "boxeo", "voleibol"];
let paises = ["colombia", "argentina", "chile", "peru", "ecuador", "brasil", "mexico", "venezuela", "uruguay", "bolivia"];
let profesiones = ["doctor", "futbolista", "cantante", "abogado", "carpintero", "ingeniero", "maestro", "policia", "bombero", "cocinero"];

function seleccionarDificultad(dificultad) {
  dificultadSeleccionada.value = dificultad;
  pantallaActual.value = "categorias";

  if (dificultadSeleccionada.value == "facil") {
    maxErrores.value = 8;
  } else if (dificultadSeleccionada.value == "medio") {
    maxErrores.value = 6;
  } else if (dificultadSeleccionada.value == "dificil") {
    maxErrores.value = 4;
  }
}

function seleccionarCategoria(categoria) {
  categoriaSeleccionada.value = categoria;
  pantallaActual.value = "juego";

  errores.value = 0;
  juegoTerminado.value = false;
  juegoGanado.value = false;

  if (categoria === "animales") {
    palabraSecreta.value =
      animales[Math.floor(Math.random() * animales.length)];
  } else if (categoria === "deportes") {
    palabraSecreta.value =
      deportes[Math.floor(Math.random() * deportes.length)];
  } else if (categoria === "paises") {
    palabraSecreta.value = paises[Math.floor(Math.random() * paises.length)];
  } else if (categoria === "profesionales") {
    palabraSecreta.value =
      profesiones[Math.floor(Math.random() * profesiones.length)];
  }

  // Reiniciar letras adivinadas al cambiar de categoría
  letrasAdivinadas.value = [];

  // Iniciamos el temporizador
  iniciarTemporizador();
}

// Funcion para aparecer las imagenes segun la dificultad
const partesVisibles = computed(() => {
  const partes = [];

  if (dificultadSeleccionada.value === "facil") {

    if (errores.value >= 1) partes.push("cabeza");
    if (errores.value >= 2) partes.push("torso");
    if (errores.value >= 3) partes.push("brazoDerecho");
    if (errores.value >= 4) partes.push("brazoIzquierdo");
    if (errores.value >= 5) partes.push("piernaDerecha");
    if (errores.value >= 6) partes.push("piernaIzquierda");
    if (errores.value >= 7) partes.push("pieDerecho");
    if (errores.value >= 8) partes.push("pieIzquierdo");

  }else if (dificultadSeleccionada.value === "medio") {

    if(errores.value >= 1) partes.push("cabeza");
    if(errores.value >= 2) partes.push("torso");
    if(errores.value >= 3) partes.push("brazoDerecho", "brazoIzquierdo");
    if(errores.value >= 4) partes.push("piernaDerecha");
    if(errores.value >= 5) partes.push("piernaIzquierda");
    if(errores.value >= 6) partes.push("pieDerecho", "pieIzquierdo");

  }else {

    if(errores.value >= 1) partes.push("cabeza");
    if(errores.value >= 2) partes.push("torso", "brazoDerecho", "brazoIzquierdo");
    if(errores.value >= 3) partes.push("piernaDerecha", "piernaIzquierda");
    if(errores.value >= 4) partes.push("pieDerecho", "pieIzquierdo");

  }

  return partes;
});

const cabezaMario = computed(() => {
  if(juegoTerminado.value){
    return "/public/images/cabezaMuerto.png";
  }
  return "/public/images/cabezaMario.png"
})

// Mostrar palabra oculta
function obtenerPalabraOculta() {
  return palabraSecreta.value
    .split("")
    .map((letra) =>
      letrasAdivinadas.value.includes(letra.toLowerCase()) ? letra : "_"
    )
    .join(" ");
}

// Guardar letra adivinada
function adivinarLetra(letra) {
  if (juegoTerminado.value) return;

  if (!letrasAdivinadas.value.includes(letra)) {
    letrasAdivinadas.value.push(letra);

    if (!palabraSecreta.value.includes(letra)) {
      errores.value++;

      if (errores.value >= maxErrores.value) {
        juegoTerminado.value = true;
        mostrarModalGameOver();
      }
    } else {
      // Verificar si ya ganó
      const todasAdivinadas = palabraSecreta.value
        .split("")
        .every((l) => letrasAdivinadas.value.includes(l));

      if (todasAdivinadas) {
        juegoGanado.value = true;
        mostrarModalGanador();
      }
    }
  }
}

function iniciarTemporizador() {
  // Detenemos el temporizador si ya esta activo
  if (temporizadorInterval) clearInterval(temporizadorInterval);

  // Configuramos el tiempo según la dificultad
  tiempoRestante.value = configTiempo[dificultadSeleccionada.value];

  // Iniciamos la cuenta regresiva
  temporizadorInterval = setInterval(() => {
    tiempoRestante.value--;

    // En caso de que le tiempo se agote
    if (tiempoRestante.value <= 0){
      clearInterval(temporizadorInterval);
      juegoTerminado.value = true;
      mostrarModalFinalTiempo();
    }
  }, 1000) // Esto hará que se actualice cada segundo
}
function mostrarModalFinalTiempo() {
  clearInterval(temporizadorInterval); // Detenemos el temporizador
  modalTitulo.value = "¡Se te acabo el tiempo! ☠️";
  modalMensaje.value = `La palabra era: ${palabraSecreta.value}`;
  mostrarModal.value = true;
}

function mostrarModalGameOver() {
  clearInterval(temporizadorInterval); // Detenemos el temporizador
  modalTitulo.value = "¡Perdiste! ☠️";
  modalMensaje.value = `La palabra era: ${palabraSecreta.value}`;
  mostrarModal.value = true;
}

function mostrarModalGanador() {
  if (nombreJugador.value.trim()) {
    // Calculamos el puntaje del jugador
    const puntajeActual = 100 + (tiempoRestante.value * 2);

    if (records.value[nombreJugador.value]) {
      records.value[nombreJugador.value] += puntajeActual;
    }else {
      records.value[nombreJugador.value] = puntajeActual;
    }

    // Actualizamos el record
    localStorage.setItem("ahorcadoRecords", JSON.stringify(records.value))

    modalTitulo.value = "¡Ganaste! 🎉";
    modalMensaje.value = `Puntos obtenidos: ${puntajeActual} (Total: ${records.value[nombreJugador.value]})`;
  }
  clearInterval(temporizadorInterval); // Detenemos el temporizador
  mostrarModal.value = true;
}

function volverACategorias() {
  mostrarModal.value = false;
  pantallaActual.value = "categorias";
}

function volverInicio() {
  mostrarModal.value = false
  pantallaActual.value = "dificultades"
}

// Escuchar teclado físico
function manejarTecla(event) {
  const letra = event.key.toLowerCase();
  if (abecedario.includes(letra)) {
    adivinarLetra(letra);
  }
}

window.addEventListener("keydown", manejarTecla);
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.contenedorPrincipal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h1,
h2 {
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: white;
}

.formulario-jugador {
  margin: 20px 0;
  text-align: center;
}

.input-nombre {
  padding: 10px;
  border: 2px solid #6c5ce7;
  border-radius: 8px;
  font-size: 1rem;
  width: 80%;
  max-width: 300px;
}

.bienvenida {
  color: white;
  font-size: 1.2rem;
  margin-top: 5px;
}

.tabla-records {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  padding: 15px;
  margin: 20px auto;
  width: 90%;
  max-width: 400px;
}

.tabla-records h3 {
  color: #fdcb6e;
  text-align: center;
}

.tabla-records ul {
  list-style: none;
  padding: 0;
}

.tabla-records li {
  color: white;
  padding: 8px;
  border-bottom: 1px solid #636e72;
}

.primeraPantalla {
  display: flex;
  justify-content: center;
  width: 95%;
  max-width: 900px;
  margin: 20px auto;
  padding: 40px 20px;
  background: linear-gradient(135deg, #74b9ff, #0984e3, #6c5ce7, #a29bfe);
  position: relative;
  overflow: hidden;
  border-radius: 25px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.primeraPantalla::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.contenedorNiveles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 25px;
  margin: 0px auto;
  width: 100%;
  max-width: 700px;
  z-index: 1;
  position: relative;
}
.contenedorNiveles button {
  border: none;
  border-radius: 20px;
  padding: 40px 25px;
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 2px;
  transform: translateY(0);
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contenedorNiveles button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.6s ease;
}

.contenedorNiveles button:hover::before {
  left: 100%;
}

.contenedorNiveles button:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.contenedorNiveles button:active {
  transform: translateY(-4px) scale(1.02);
  transition: all 0.1s ease;
}

/* Estilos específicos para cada botón */
.contenedorNiveles .facil {
  background: linear-gradient(135deg, #a8e6cf, #dcedc8);
  border: 3px solid #4caf50;
  color: #2e7d32;
}

.contenedorNiveles .facil::after {
  content: '🟢';
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.2rem;
}

.contenedorNiveles .facil:hover {
  background: linear-gradient(135deg, #81c784, #a5d6a7);
  border-color: #388e3c;
  color: #1b5e20;
  box-shadow: 0 15px 40px rgba(76, 175, 80, 0.4);
}

.contenedorNiveles .medio {
  background: linear-gradient(135deg, #ffcc02, #ffd54f);
  border: 3px solid #ff9800;
  color: #e65100;
}

.contenedorNiveles .medio::after {
  content: '🟡';
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.2rem;
}

.contenedorNiveles .medio:hover {
  background: linear-gradient(135deg, #ffb74d, #ffcc02);
  border-color: #f57c00;
  color: #bf360c;
  box-shadow: 0 15px 40px rgba(255, 152, 0, 0.4);
}

.contenedorNiveles .dificil {
  background: linear-gradient(135deg, #ffcdd2, #f8bbd9);
  border: 3px solid #f44336;
  color: #c62828;
}

.contenedorNiveles .dificil::after {
  content: '🔴';
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.2rem;
}

.contenedorNiveles .dificil:hover {
  background: linear-gradient(135deg, #ef5350, #e57373);
  border-color: #d32f2f;
  color: #b71c1c;
  box-shadow: 0 15px 40px rgba(244, 67, 54, 0.4);
}

/* Animaciones */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Efectos de pulso para botones */
.contenedorNiveles button {
  animation: fadeInUp 0.6s ease-out, pulse 2s infinite 1s;
}

@keyframes pulse {
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-2px) scale(1.01); }
  100% { transform: translateY(0) scale(1); }
}

/* Efecto hover para toda la primera pantalla */
.primeraPantalla:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
}

.volver {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  margin-bottom: 10px;
}

.volver:hover {
  background-color: rgb(118, 255, 152);
}

.segundaPantalla {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  max-width: 900px;
  gap: 25px;
  padding: 30px;
  background: linear-gradient(135deg, #0c0c0c, #1a1a2e, #16213e, #0f3460);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  margin: 20px auto;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.tituloPantalla {
  text-align: center;
  margin-bottom: 10px;
}

.tituloPantalla h2 {
  font-size: 2.2rem;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: slideIn 0.8s ease-out;
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.contenedorCategorias {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px auto;
  width: 100%;
  max-width: 800px;
  place-content: center;
}

.contenedorCategorias button {
  border: none;
  border-radius: 15px;
  padding: 40px 25px;
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.4s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.contenedorCategorias button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s ease;
}

.contenedorCategorias button:hover::before {
  left: 100%;
}

.contenedorCategorias button:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
}

.contenedorCategorias button:active {
  transform: translateY(-2px) scale(0.98);
}

.animales {
  background: linear-gradient(135deg, #ff9a9e, #fecfef);
  border: 3px solid #ff6b6b;
}

.animales:hover {
  background-image: url(https://i.pinimg.com/564x/78/95/7b/78957b3f76fce9bc4a631fdf407935bc.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: overlay;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  border-color: #ff4757;
}

.deportes {
  background: linear-gradient(135deg, #a8edea, #fed6e3);
  border: 3px solid #26d0ce;
}

.deportes:hover {
  background-image: url(https://s.france24.com/media/display/6aca8d1a-7783-11ea-9cf2-005056bf87d6/w:1280/p:4x3/WEB%2005ABR%20DEPORTES%20PORTADA%20FOTO.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: overlay;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  border-color: #0abde3;
}

.paises {
  background: linear-gradient(135deg, #ffecd2, #fcb69f);
  border: 3px solid #ff9ff3;
}

.paises:hover {
  background-image: url(https://media.istockphoto.com/id/577965774/es/foto/banderas-nacionales-de-los-pa%C3%ADses-del-mundo-bandera-brasile%C3%B1a.jpg?s=612x612&w=0&k=20&c=yGVNINUNvv80akcNjXjlcf-4OGEAnIH_PIBB8Xcf2rQ=);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: overlay;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  border-color: #ff6348;
}

.profesiones {
  background: linear-gradient(135deg, #d299c2, #fef9d7);
  border: 3px solid #a55eea;
}

.profesiones:hover {
  background-image: url(https://static.vecteezy.com/system/resources/previews/021/568/434/non_2x/kids-professions-cartoon-cute-children-dressed-in-different-occupation-uniform-characters-with-jobs-different-occupation-vector.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: overlay;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  border-color: #8e44ad;
}

.btnVolver {
  margin-top: 10px;
}

.btnVolver .volver {
  padding: 15px 35px;
  border: none;
  border-radius: 15px;
  background: linear-gradient(135deg, #6c757d, #495057);
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.btnVolver .volver::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.btnVolver .volver:hover::before {
  left: 100%;
}

.btnVolver .volver:hover {
  background: linear-gradient(135deg, #28a745, #20c997);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.btnVolver .volver:active {
  transform: translateY(-1px);
}

/* Animaciones de entrada para los botones */
.contenedorCategorias button {
  animation: fadeInUp 0.6s ease-out;
}

.contenedorCategorias button:nth-child(1) {
  animation-delay: 0.1s;
}

.contenedorCategorias button:nth-child(2) {
  animation-delay: 0.2s;
}

.contenedorCategorias button:nth-child(3) {
  animation-delay: 0.3s;
}

.contenedorCategorias button:nth-child(4) {
  animation-delay: 0.4s;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.terceraPantalla {
  display: flex;
  width: 95%;
  max-width: 800px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  margin: 20px auto;
}

.terceraPantalla h2 {
  font-size: 2.5rem;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

.temporizador {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.6rem;
  color: #333;
  background: rgba(255, 255, 255, 0.9);
  padding: 12px 25px;
  border-radius: 50px;
  display: inline-block;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.temporizador::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  transform: translateX(-100%);
  animation: shine 2s infinite;
}

@keyframes shine {
  100% { transform: translateX(100%); }
}

.barra-tiempo {
  height: 4px;
  background: linear-gradient(90deg, #4facfe, #00f2fe);
  border-radius: 2px;
  margin-top: 8px;
}

.infoJuego {
  display: flex;
  flex-direction: column;
  gap: 25px;
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 20px 0px;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  width: 100%;
  max-width: 550px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.infoJuego:hover {
  transform: translateY(-5px);
}

.infoJuego .infoDificultad,
.infoJuego .infoCategoria
{
  margin-left: 0px;
  font-weight: 600;
  padding: 10px 15px;
  background: linear-gradient(90deg, #f8f9fa, #e9ecef);
  border-radius: 15px;
  border-left: 5px solid #28a745;
  transition: all 0.3s ease;
}

.infoJuego .infoDificultad:hover,
.infoJuego .infoCategoria:hover 
{
  background: linear-gradient(90deg, #e9ecef, #dee2e6);
  transform: translateX(5px);
}

.infoJuego p {
  margin: 0;
  padding: 12px 15px;
  background: #f8f9fa;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.contenedorIntentosErrores p:nth-child(1) {
  background: linear-gradient(90deg, #ffc107, #e0a800);
  color: #2c3e50;
}

.contenedorIntentosErrores p:nth-child(2) {
  background: linear-gradient(90deg, #dc3545, #c82333);
  color: white;
  animation: pulse 1.5s infinite;
}

.infoJuego p:nth-child(4) {
  background: linear-gradient(90deg, #17a2b8, #138496);
  color: white;
}

.infoJuego p:nth-child(6) {
  background: linear-gradient(90deg, #28a745, #218838);
  color: white;
  animation: celebration 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

@keyframes celebration {
  0%, 100% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.05) rotate(1deg); }
  75% { transform: scale(1.05) rotate(-1deg); }
}

.contenedorAhorcado {
  border: 3px solid #343a40;
  border-radius: 15px;
  width: 215px;
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  position: relative;
  background: linear-gradient(135deg, #fff5f5, #f8f9fa);
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.contenedorAhorcado:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.contenedorAhorcado img {
  transition: all 0.5s ease;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
}

.contenedorAhorcado .cabeza {
  width: 100px; 
  height: 100px; 
  position: absolute;
  z-index: 2;
  animation: aparecer 0.5s ease-in-out;
}

.contenedorAhorcado .cabeza.muerto {
  position: absolute;
  top: 5px;
  left: 51px;
  z-index: 2;
  width: 100px; 
  height: 100px; 
  object-fit: cover;
  filter: grayscale(100%);
  transform: rotate(-10deg);
}

.contenedorAhorcado .torso {
  position: absolute;
  top: 90px;
  left: 65px;
  z-index: 1;
  animation: aparecer 0.5s ease-in-out;
}

.contenedorAhorcado .brazoDerecho {
  position: absolute;
  top: 105px;
  left: 79px;
  transform: rotate(-15deg);
  animation: aparecer 0.5s ease-in-out;
}

.contenedorAhorcado .brazoIzquierdo {
  position: absolute;
  top: 103px;
  left: 28px;
  transform: rotate(15deg);
  animation: aparecer 0.5s ease-in-out;
}

.contenedorAhorcado .piernaDerecha {
  position: absolute;
  top: 105px;
  left: 29px;
  transform: rotate(8deg);
  animation: aparecer 0.5s ease-in-out;
}

.contenedorAhorcado .piernaIzquierda {
  position: absolute;
  top: 105px;
  left: 31px;
  transform: rotate(-8deg);
  animation: aparecer 0.5s ease-in-out;
}

.contenedorAhorcado .pieDerecho {
  position: absolute;
  top: 102px;
  left: 29px;
  transform: rotate(5deg);
  animation: aparecer 0.5s ease-in-out;
}

.contenedorAhorcado .pieIzquierdo {
  position: absolute;
  top: 102px;
  left: 31px;
  transform: rotate(-5deg);
  animation: aparecer 0.5s ease-in-out;
}

@keyframes aparecer {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.btnVolver {
  margin-top: 20px;
}

.btnVolver .volver {
  padding: 15px 30px;
  border: none;
  border-radius: 15px;
  background: linear-gradient(135deg, #6c757d, #495057);
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.btnVolver .volver:hover {
  background: linear-gradient(135deg, #28a745, #20c997);
}

.btnVolver .volver:active {
  transform: translateY(-1px);
}

/* teclado virtual */
.contendorTecladoVirtual {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 8px;
  width: 100%;
  max-width: 600px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
}

.tecla {
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: #74b9ff;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tecla:hover:not(:disabled) {
  background: #0984e3;
  transform: translateY(-2px);
}

.tecla:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tecla-especial {
  grid-column: span 10;
  background: #ff7675;
}

.tecla-especial:hover {
  background: #d63031;
}

/* Estilos para el modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.4s ease-out;
}

.modal-content h2 {
  color: white;
  font-size: 2.2rem;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.modal-content p {
  color: white;
  font-size: 1.4rem;
  margin-bottom: 25px;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.modal-btn {
  padding: 12px 25px;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-btn.reiniciar {
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  color: white;
}

.modal-btn.volver {
  background: linear-gradient(135deg, #2196F3, #0D47A1);
  color: white;
  margin-bottom: 0px;
}

.modal-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-btn:active {
  transform: translateY(-1px);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(30px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsividad */
@media (max-width: 768px) {
  .primeraPantalla {
    width: 95%;
    padding: 30px 15px;
    margin: 15px auto;
  }
  
  .contenedorNiveles {
    grid-template-columns: 1fr;
    gap: 20px;
    max-width: 350px;
  }
  
  .contenedorNiveles button {
    padding: 35px 20px;
    font-size: 1.2rem;
    min-height: 100px;
  }

  .segundaPantalla {
    width: 95%;
    padding: 20px;
  }

  .tituloPantalla h2 {
    font-size: 1.8rem;
  }

  .contenedorCategorias {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
  }

  .contenedorCategorias button {
    padding: 30px 20px;
    font-size: 1.1rem;
  }

  .terceraPantalla {
    width: 95%;
    padding: 15px;
  }

  .terceraPantalla h2 {
    font-size: 2rem;
  }

  .infoJuego {
    font-size: 1.4rem;
    padding: 20px;
    max-width: 100%;
  }

  .contendorTecladoVirtual {
    grid-template-columns: repeat(7, 1fr);
  }

  .tecla-especial {
    grid-column: span 7;
  }
}

@media (max-width: 600px) {
  .modal-content {
    padding: 20px;
  }
  
  .modal-content h2 {
    font-size: 1.8rem;
  }
  
  .modal-content p {
    font-size: 1.2rem;
  }
  
  .modal-buttons {
    flex-direction: column;
    gap: 10px;
  }
  
  .modal-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .primeraPantalla {
    padding: 25px 10px;
  }
  
  .contenedorNiveles button {
    padding: 30px 15px;
    font-size: 1.1rem;
    min-height: 90px;
    letter-spacing: 1px;
  }

  .contenedorCategorias {
    grid-template-columns: 1fr 1fr;
  }
  
  .contenedorCategorias button {
    padding: 25px 15px;
    font-size: 1rem;
  }

  .temporizador {
    font-size: 1.2rem;
    padding: 10px 15px;
  }

  .contendorTecladoVirtual {
    grid-template-columns: repeat(5, 1fr);
  }

  .tecla-especial {
    grid-column: span 5;
  }
}
</style>