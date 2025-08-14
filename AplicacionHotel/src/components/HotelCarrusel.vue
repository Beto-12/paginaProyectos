<!-- Carrusel.vue -->
<template>
    <div class="carrusel">
        <q-carousel
        v-model="slide"
        :autoplay="autoplay"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        control-color="white"
        padding
        arrows
        height="700px"
        class="rounded-borders"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
        >
        <!-- Bienvenida -->
        <q-carousel-slide name="1" :img-src="images[0]">
            <TextOverlay
            title="Bienvenido a Cielo Azul Hotel"
            subtitle="Tu refugio frente al mar en Playa del Carmen"
            />
        </q-carousel-slide>

        <!-- Habitaciones -->
        <q-carousel-slide name="2" :img-src="images[1]">
            <TextOverlay
            title="Elegancia y confort"
            subtitle="Habitaciones con vista al mar y detalles caribeños"
            btn-label="Ver habitaciones"
            @click="goTo('habitaciones')"
            />
        </q-carousel-slide>

        <!-- Piscina -->
        <q-carousel-slide name="3" :img-src="images[2]">
            <TextOverlay
            title="Relax infinito"
            subtitle="Piscina infinita con vista al Caribe"
            btn-label="Ver servicios"
            @click="goTo('servicios')"
            />
        </q-carousel-slide>

        <!-- Gastronomía -->
        <q-carousel-slide name="4" :img-src="images[3]">
            <TextOverlay
            title="Sabores del Caribe"
            subtitle="Cocina local e internacional con productos frescos"
            btn-label="Ver gastronomía"
            @click="goTo('gastronomia')"
            />
        </q-carousel-slide>
        </q-carousel>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TextOverlay from '../components/TextOverlay.vue'

const images = [
    'https://cache.marriott.com/content/dam/marriott-renditions/KNASI/knasi-exterior-5282-hor-feat.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1920px:*',
    'https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152251/Dorado-Beach-a-Ritz-Carlton-Reserve-3.jpg',
    'https://paradores.es/sites/default/files/images/blog/parador_de_aiguablava_21.jpg',
    'https://png.pngtree.com/background/20230427/original/pngtree-buffet-with-a-variety-of-food-for-sale-picture-image_2496277.jpg'
]

const slide = ref('1')
const autoplay = ref(true)
const router = useRouter()

const goTo = (view) => {
    router.push({ name: view })
}
</script>

<style lang="scss" scoped>
.carrusel {
    position: relative;
    top: -100px;
}
</style>