<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="caribe text-white" height-hint="98">
      <q-toolbar class="q-px-md">
        <q-toolbar-title>
          <div class="row items-center no-wrap">
          <q-avatar size="48px" class="q-mr-md">
            <img src="https://s2.ppllstatics.com/elcorreo/www/multimedia/202002/14/media/cortadas/cieloazul1-k1zG-U100155473657HzH-1968x1216@RC.jpg" alt="Cielo Azul Logo" />
          </q-avatar>
            <div>
              <div class="text-h6 text-weight-bold">Cielo Azul</div>
              <div class="text-caption text-weight-light">Hotel & Spa</div>
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="right"
      indicator-color="transparent"
      class="text-white"
      active-color="white"
      inactive-color="white"
      shrink
      >
        <q-route-tab name="descripcion" to="/" label="Inicio" />
        <q-route-tab name="gastronomia" to="/gastronomy" label="Gastronomia" />
        <q-route-tab name="habitaciones" to="/rooms" label="Habitaciones" />
        <q-route-tab name="servicios" to="/services" label="Services" />
        <q-route-tab name="deportes" to="/sports" label="Sports" />
      </q-tabs>
    </q-header>
    
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-blue-grey-5 text-white">
      <q-toolbar class="q-py-md">
        <q-toolbar-title class="text-center text-subtitle2">
          &copy; {{ new Date().getFullYear() }} Cielo Azul Hotel & Spa · Playa del Carmen, Riviera Maya ·
          <span class="text-weight-light">Sostenible • Auténtico • Inolvidable</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue';

</script>

<style lang="scss" scoped>
// Gradiente de fondo inspirado en el Caribe
.caribe {
  background: rgba(25, 46, 56, 0.8);
}

// Mejora visual en los tabs
.q-tab {
  position: relative;
  transition: all 0.3s ease;
  opacity: 0.85;

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }

  &.q-tab--active {
    opacity: 1;
    font-weight: 600;
    // Efecto de línea inferior sutil
    &::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 8px;
      height: 8px;
      background: white;
      border-radius: 50%;
    }
  }
}
// Responsive: en pantallas pequeñas, los tabs se ocultan o se ajustan
@media (max-width: 768px) {
  .q-tabs {
    font-size: 0.8rem;
  }

  .q-toolbar-title {
    font-size: 0.9rem;
  }
}
</style>