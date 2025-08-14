<template>
    <div class="habitaciones q-pa-md">
        <h1 class="text-h4 text-center q-mb-lg">Habitaciones con Alma Caribeña</h1>
        <div class="contenedorCards">
            <Card
            v-for="habitacion in habitaciones"
            :key="habitacion.id"
            :titulo-card="habitacion.titulo"
            :imagen-card="habitacion.imagen"
            :descripcion-card="habitacion.descripcion"
            :precio="habitacion.precio"
            :detalles="habitacion.detalles"
            />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Card from "../components/Card.vue"

const habitaciones = [
    {
        id: 1,
        titulo: 'Suite Presidencial',
        descripcion: 'Amplia suite con vista al mar.',
        imagen: 'https://i.pinimg.com/originals/52/18/a7/5218a738ab37026e7147c9e1692f2b47.jpg',
        precio: '$250/noche',
        detalles: {
            capacidad: '2 personas',
            servicios: 'Minibar, terraza privada, cama king size, WiFi premium, desayuno buffet incluido',
            habitaciones: '1 dormitorio + sala de estar',
            medidas: '85 m²'
        }
    },
    {
        id: 2,
        titulo: 'Habitación Doble',
        descripcion: 'Ideal para parejas.',
        imagen: 'https://www.hola.com/horizon/original_aspect_ratio/a628b238aa65-habitaciones-hotel-18a-a.jpg',
        precio: '$120/noche',
        detalles: {
            capacidad: '2 personas',
            servicios: 'TV de 43", aire acondicionado, escritorio, WiFi gratuito',
            habitaciones: '1 dormitorio',
            medidas: '32 m²'
        }
    },
    {
        id: 3,
        titulo: 'Habitación Familiar',
        descripcion: 'Espaciosa para 4 personas.',
        imagen: 'https://www.hotelmedici.com/images/stories/camere/family_1200/family_1_1200.jpg',
        precio: '$180/noche',
        detalles: {
            capacidad: '4 personas',
            servicios: 'Dos camas dobles, zona de juegos infantil, cocina básica, calefacción',
            habitaciones: '2 dormitorios comunicados',
            medidas: '55 m²'
        }
    },
    {
        id: 4,
        titulo: 'Estudio con Cocina',
        descripcion: 'Perfecto para estancias largas.',
        imagen: 'https://best-western-atrium.getmunichhotels.com/data/Photos/OriginalPhoto/10185/1018558/1018558003.JPEG',
        precio: '$150/noche',
        detalles: {
            capacidad: '2 personas',
            servicios: 'Kitchenette, microondas, nevera, cafetera, escritorio amplio',
            habitaciones: '1 ambiente (estudio)',
            medidas: '40 m²'
        }
    },
    {
        id: 5,
        titulo: 'Cabaña en la Montaña',
        descripcion: 'Privacidad y naturaleza.',
        imagen: 'https://content.arquitecturaydiseno.es/medio/2024/01/09/dsc-6279_00000000_5a699724_240109125620_1280x794.jpg',
        precio: '$200/noche',
        detalles: {
            capacidad: '2 personas + 1 niño',
            servicios: 'Energía solar, baño ecológico, terraza con hamaca, vista al bosque',
            habitaciones: '1 dormitorio principal + zona de estar',
            medidas: '50 m²'
        }
    },
    {
        id: 6,
        titulo: 'Loft Romántico en la Azotea',
        descripcion: 'Disfruta de una experiencia íntima bajo las estrellas con jacuzzi privado y vista panorámica al océano.',
        imagen: 'https://a0.muscache.com/im/pictures/miso/Hosting-51688910/original/cf66bae8-b739-43ae-be1d-9fe2341bc952.jpeg?im_w=720',
        precio: '$380/noche',
        detalles: {
            capacidad: '2 personas',
            servicios: 'Jacuzzi privado, cena romántica en la terraza, música ambiental, desayuno en cama',
            habitaciones: '1 dormitorio + terraza exclusiva',
            medidas: '60 m² + 40 m² de terraza',
            ambiente: 'Romántico, exclusivo, ideal para lunas de miel'
        }
    },
]
</script>

<style scoped>
.habitaciones {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
}
.contenedorCards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 24px;
    padding: 20px 16px;
    place-items: center;
    background: #e0f7fa;
}
@media (max-width: 600px) {
    .contenedorCards {
        grid-template-columns: 1fr;
        gap: 20px;
    }
}
</style>