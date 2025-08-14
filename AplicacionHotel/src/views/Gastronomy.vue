<template>
    <div class="gastronomia q-pa-md">
        <h1 class="text-h4 text-center q-mb-lg">Experiencias Gastronómicas</h1>
        <div class="contenedorCards">
            <Card
            v-for="restaurante in restaurantes"
            :key="restaurante.id"
            :titulo-card="restaurante.titulo"
            :imagen-card="restaurante.imagen"
            :descripcion-card="restaurante.descripcion"
            :precio="restaurante.precio"
            :detalles="restaurante.detalles"
            />
        </div>
    </div>
</template>

<script setup>
import Card from '../components/Card.vue';
const restaurantes = [
    {
        id: 1,
        titulo: 'Restaurante Vista al Mar',
        descripcion: 'Cocina gourmet con ingredientes frescos del día y espectaculares vistas panorámicas.',
        imagen: 'https://st1.uvnimg.com/79/06/a060ece340bc8af6e90c2a03e911/54sd4ereamare.png',
        precio: 'Desde $45/persona',
        detalles: {
        tipo: 'Gourmet - Internacional',
        horario: '18:00 - 23:00',
        especialidad: 'Mariscos frescos, vinos premium, menú degustación',
        servicios: 'Reservas recomendadas, música en vivo los viernes',
        ambiente: 'Elegante y romántico'
        }
    },
    {
        id: 2,
        titulo: 'Bar de Tapas Mediterráneo',
        descripcion: 'Pequeñas delicias españolas y mediterráneas en un ambiente relajado.',
        imagen: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/ae/77/b2/location-atlantis.jpg',
        precio: 'Desde $12/tapa',
        detalles: {
        tipo: 'Tapas - Mediterráneo',
        horario: '17:00 - 00:00',
        especialidad: 'Jamón ibérico, pulpo a la gallega, tortilla de patatas',
        servicios: 'Barra libre los sábados, cervezas artesanales',
        ambiente: 'Casual y animado'
        }
    },
    {
        id: 3,
        titulo: 'Desayuno Premium Incluido',
        descripcion: 'Buffet completo con opciones saludables, dulces y tradicionales.',
        imagen: 'https://imagenes.elpais.com/resizer/v2/RCTFAV3LOFB7DCIQZB5TO3JXGQ.jpg?auth=c98861b373eff86e8be1cebcdadfb4310eec561dc7d8e64a73732e9e6762114f&width=1960&height=1103&focal=2842%2C1663',
        precio: 'Incluido en la estadía',
        detalles: {
        tipo: 'Buffet - Desayuno',
        horario: '7:00 - 10:30',
        especialidad: 'Frutas frescas, jugos naturales, pan recién horneado, huevos a elección',
        servicios: 'Opciones veganas, sin gluten y para celíacos',
        ambiente: 'Familiar y relajado'
        }
    },
    {
        id: 4,
        titulo: 'Cenas Temáticas Nocturnas',
        descripcion: 'Cada noche una cultura diferente: mexicana, tailandesa, italiana y más.',
        imagen: 'https://hemmabogota.com/wp-content/uploads/2025/03/cena.jpg',
        precio: '$35/persona (con bebida)',
        detalles: {
        tipo: 'Cena temática - Internacional',
        horario: '20:00 - 23:30 (solo jueves a domingo)',
        especialidad: 'Menú rotativo por semana: cocina mexicana, japonesa, india, italiana',
        servicios: 'Entretenimiento en vivo, show de cocina, fotos temáticas',
        ambiente: 'Divertido y festivo'
        }
    },
    {
        id: 5,
        titulo: 'Cócteles en la Terraza',
        descripcion: 'Disfruta de tragos exclusivos bajo las estrellas con música suave.',
        imagen: 'https://www.costabravahotelsdeluxe.com/wp-content/uploads/2021/05/cocktail-terraza.jpg',
        precio: 'Desde $15/cocktail',
        detalles: {
        tipo: 'Bar - Cócteles premium',
        horario: '18:00 - 01:00',
        especialidad: 'Cócteles artesanales, gin tonics gourmet, mocktails sin alcohol',
        servicios: 'Coctelería en vivo, DJ los fines de semana, vista 360°',
        ambiente: 'Sofisticado y relajante'
        }
    },
    {
        id: 6,
        titulo: 'Cena Privada en la Playa',
        descripcion: 'Una velada inolvidable con menú gourmet servido bajo la luz de las velas en la orilla del mar.',
        imagen: 'https://images.trvl-media.com/localexpert/625514/7397327e-0849-4c68-84af-706170539ce2.jpg?impolicy=resizecrop&rw=1005&rh=565',
        precio: '$120/persona',
        detalles: {
            tipo: 'Cena privada - Romántica',
            horario: '20:00 - 23:00 (bajo reserva)',
            especialidad: 'Menú de 5 tiempos con mariscos frescos, vinos seleccionados, postre artesanal',
            servicios: 'Decoración con pétalos, música en vivo, fotos profesionales, traslado en carruaje',
            ambiente: 'Íntimo, elegante, perfecto para propuestas o aniversarios'
        }
    }
]
</script>

<style scoped>
.gastronomia {
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
    border-radius: 8px;
}
@media (max-width: 600px) {
    .contenedorCards {
        grid-template-columns: 1fr;
        gap: 20px;
    }
}
</style>