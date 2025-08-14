<template>
    <div class="servicios">
        <h1 class="text-h4 text-center q-mb-lg">Tu Bienestar, Nuestra Prioridad</h1>
        <div class="contenedorCards">
            <Card
            v-for="servicio in servicios"
            :key="servicio.id"
            :titulo-card="servicio.titulo"
            :imagen-card="servicio.imagen"
            :descripcion-card="servicio.descripcion"
            :precio="servicio.precio"
            :detalles="servicio.detalles"
            />
        </div>
    </div>
</template>

<script setup>
import Card from '../components/Card.vue';

const servicios = [
    {
        id: 1,
        titulo: 'Spa Maya Holístico',
        descripcion: 'Revitalízate con tratamientos inspirados en la medicina tradicional maya y productos naturales locales.',
        imagen: 'https://i0.wp.com/hotbook.mx/wp-content/uploads/2025/03/spas-maya-square-image-pdp-treatment-1.jpg?fit=570%2C570&ssl=1',
        precio: 'Desde $75',
        detalles: {
            tipo: 'Spa y bienestar',
            especialidad: 'Masajes con piedras calientes, temazcal ceremonial, envolturas de cacao y ceniza',
            horario: '9:00 - 19:00',
            servicios: 'Masajes, terapias energéticas, rituales de purificación, productos 100% naturales',
            ambiente: 'Tranquilo, con sonidos de la naturaleza y aromaterapia'
        }
    },
    {
        id: 2,
        titulo: 'Desayuno Gourmet Incluido',
        descripcion: 'Comienza tu día con un desayuno buffet premium con opciones internacionales y locales.',
        imagen: 'https://productosgourmet.online/blog/wp-content/uploads/2020/07/que-debe-tener-un-desayuno-gourmet-3-e1594099874383.jpg',
        precio: 'Incluido en la estadía',
        detalles: {
            tipo: 'Alimentación',
            especialidad: 'Frutas tropicales, pan artesanal, huevos a elección, jugos naturales, café de Chiapas',
            horario: '7:00 - 10:30',
            servicios: 'Opciones veganas, sin gluten, para celíacos y dietas especiales',
            ambiente: 'Al aire libre, junto a la piscina'
        }
    },
    {
        id: 3,
        titulo: 'Concierge Personalizado',
        descripcion: 'Nuestro equipo te ayuda a planificar tours, reservas, traslados y experiencias únicas.',
        imagen: 'https://www.evento.love/blog/wp-content/uploads/2022/04/evento.love-weddingplanner-organizadoresdebodas-concierge-coche.jpg',
        precio: 'Sin costo adicional',
        detalles: {
            tipo: 'Servicio personal',
            especialidad: 'Reservas en restaurantes, tours privados, alquiler de yates, eventos románticos',
            horario: '24/7',
            servicios: 'Asistencia en español, inglés y francés, organización de bodas y lunas de miel',
            ambiente: 'Discreto, profesional y amable'
        }
    },
    {
        id: 4,
        titulo: 'Piscina Infinita con Bar Acuático',
        descripcion: 'Relájate en nuestra piscina con vista al Caribe y disfruta de cócteles sin salir del agua.',
        imagen: 'https://us.123rf.com/450wm/paulvinten/paulvinten1711/paulvinten171100075/89695905-large-swimming-pool-with-bar-and-aqua-park-water-slides-at-a-luxury-tropical-hotel-resort.jpg',
        precio: 'Acceso gratuito para huéspedes',
        detalles: {
            tipo: 'Área común',
            especialidad: 'Cócteles artesanales, snacks tropicales, música lounge',
            horario: '8:00 - 20:00',
            servicios: 'Tumbonas, toallas premium, sombrillas, servicio a la piscina',
            ambiente: 'Elegante, relajado y con vista al océano'
        }
    },
    {
        id: 5,
        titulo: 'Programa Eco-Friendly',
        descripcion: 'Únete a nuestro compromiso con el medio ambiente y la comunidad local.',
        imagen: 'https://plazadelasamericas.com.co/wp-content/uploads/2021/07/friendly.png',
        precio: 'Sin costo – participa libremente',
        detalles: {
            tipo: 'Sostenibilidad',
            especialidad: 'Limpieza de playa, siembra de corales, talleres culturales mayas',
            horario: 'Actividades semanales programadas',
            servicios: 'Donamos el 5% de ingresos a conservación marina, usamos productos biodegradables',
            ambiente: 'Conciente, comunitario y educativo'
        }
    },
    {
        id: 6,
        titulo: 'Tratamiento de Spa Maya con Ceniza Sagrada',
        descripcion: 'Un ritual de purificación ancestral que combina masajes, arcilla volcánica y ceniza ceremonial.',
        imagen: 'https://i0.wp.com/www.guiamexico.com.br/wp-content/uploads/2020/04/16-azulik-maya-spa-vy733.jpg?resize=768%2C640&strip=all&quality=60&ssl=1',
        precio: '$130/sesión',
        detalles: {
            tipo: 'Spa y bienestar',
            especialidad: 'Ritual de purificación maya, envoltura de ceniza, masaje energético, aromaterapia con copal',
            horario: '9:00 - 18:00',
            servicios: 'Duración: 2.5 horas, incluye temazcal, hidratación con agua de coco sagrada',
            ambiente: 'Espiritual, relajante, con música de tambores y cantos tradicionales'
        }
    }
]
</script>

<style scoped>
.servicios {
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
@media (max-width: 600px){
    .contenedorCards {
        grid-template-columns: 1fr;
        gap: 20px;
    }
}
</style>