<template>
    <div class="deportes q-pa-md">
        <h1 class="text-h4 text-center q-mb-lg">Vive la Aventura al Límite</h1>
        <div class="contenedorCards">
            <Card
            v-for="deporte in deportesExtremos"
            :key="deporte.id"
            :titulo-card="deporte.titulo"
            :imagen-card="deporte.imagen"
            :descripcion-card="deporte.descripcion"
            :precio="deporte.precio"
            :detalles="deporte.detalles"
            />
        </div>
    </div>
</template>

<script setup>
import Card from '../components/Card.vue';

const deportesExtremos = [
    {
        id: 1,
        titulo: 'Snorkel en Cenotes Sagrados',
        descripcion: 'Explora cuevas submarinas iluminadas naturalmente y descubre formaciones geológicas únicas.',
        imagen: 'https://www.dresseldivers.com/wp-content/uploads/Cenotes_buzos.jpg',
        precio: '$85/persona',
        detalles: {
            atraccion: 'Snorkel en cenote',
            duracion: '4 horas',
            nivel: 'Principiante/Intermedio',
            incluye: 'Equipo completo, guía certificado, traslado ida y vuelta',
            ubicacion: 'Cenote Azul y Cenote Escondido',
            recomendaciones: 'Traje de baño, toalla, protector solar ecológico'
        }
    },
    {
        id: 2,
        titulo: 'Circuitos de Tirolesas en la Selva',
        descripcion: 'Vuela sobre la copa de los árboles con vistas panorámicas a la jungla y el mar.',
        imagen: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/10/27/ea/4d.jpg',
        precio: '$110/persona',
        detalles: {
            atraccion: 'Tirolesa en selva tropical',
            duracion: '3.5 horas',
            nivel: 'Intermedio',
            incluye: 'Casco, arnés, guías bilingües, fotos aéreas',
            ubicacion: 'Parque Ek Balam',
            recomendaciones: 'Ropa cómoda, calzado cerrado, evitar objetos sueltos'
        }
    },
    {
        id: 3,
        titulo: 'Buceo en el Arrecife Mesoamericano',
        descripcion: 'Sumérgete en uno de los arrecifes de coral más grandes del mundo, hogar de más de 500 especies marinas.',
        imagen: 'https://quintanaroo.quadratin.com.mx/www/wp-content/uploads/2018/12/WhatsApp-Image-2018-12-02-at-1.52.05-PM-1.jpeg',
        precio: '$140/persona',
        detalles: {
            atraccion: 'Buceo certificado (Open Water)',
            duracion: '6 horas (2 inmersiones)',
            nivel: 'Intermedio/Avanzado',
            incluye: 'Equipo de buceo, instructor PADI, certificación temporal',
            ubicacion: 'Arrecife de Cozumel',
            recomendaciones: 'Certificación mínima Open Water, no fumar antes del buceo'
        }
    },
    {
        id: 4,
        titulo: 'Rafting en Río Sábana',
        descripcion: 'Navega rápidos emocionantes mientras disfrutas del paisaje selvático y la fauna local.',
        imagen: 'https://expeditioncolombia.com/wp-content/uploads/elementor/thumbs/rio-samana-rafting-3-q1hocltutqjy61zrrb9ae4j4fb6k4vdnisxs4gkdaw.jpg',
        precio: '$95/persona',
        detalles: {
            atraccion: 'Rafting en río tropical',
            duracion: '5 horas',
            nivel: 'Principiante',
            incluye: 'Chaleco salvavidas, casco, instructor, transporte',
            ubicacion: 'Río Sábana, Riviera Maya',
            recomendaciones: 'Traje de baño, cerrar cámaras en fundas impermeables'
        }
    },
    {
        id: 5,
        titulo: 'Tour en Quad por la Jungla',
        descripcion: 'Conduce tu propia motocicleta todo terreno por caminos selváticos y antiguos senderos mayas.',
        imagen: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0d/f2/90/c9.jpg',
        precio: '$120/persona',
        detalles: {
            atraccion: 'Tour en quad (ATV)',
            duracion: '3 horas',
            nivel: 'Principiante',
            incluye: 'Quad, casco, guía, botella de agua',
            ubicacion: 'Reserva Natural Xcacel',
            recomendaciones: 'Ropa que pueda ensuciarse, gafas o lentes de sol'
        }
    },
    {
        id: 6,
        titulo: 'Snorkel con Tortugas Marinas',
        descripcion: 'Nada junto a tortugas marinas en su hábitat natural, en una laguna protegida de aguas cristalinas.',
        imagen: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/06/6c/3c/8d.jpg',
        precio: '$90/persona',
        detalles: {
            atraccion: 'Snorkel con vida marina',
            duracion: '3 horas',
            nivel: 'Principiante',
            incluye: 'Equipo de snorkel, chaleco salvavidas, guía especializado, fotos subacuáticas',
            ubicacion: 'Bahía de Akumal',
            recomendaciones: 'No usar protector solar químico (ofrecemos uno ecológico), no tocar a los animales'
        }
    }
]
</script>


<style scoped>
.deportes {
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