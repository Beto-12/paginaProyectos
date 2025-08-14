<template>
    <div class="contenedorDescription">
        <HotelCarrusel />
        <div class="titulo q-py-xl">
            <h1 class="tituloTexto">Cielo Azul Hotel <br> <span class="subtitulo">Donde el mar te abraza cada mañana.</span> </h1>
        </div>
        <div class="contenedorTextoDescription q-px-md q-pb-xl">
            <div class="textoDescription q-mb-lg">
                <p class="texto">
                    Ubicado frente a las cristalinas aguas del Caribe, en el pintoresco centro de Playa del Carmen, <strong>Cielo Azul Hotel</strong> es el refugio perfecto para quienes buscan relajación, estilo y comodidad. Nuestro hotel boutique combina diseño contemporáneo con toques auténticos del Caribe mexicano, ofreciendo un ambiente íntimo y acogedor para parejas, familias y viajeros exigentes.
                </p>
                <p class="texto q-mt-md">
                    Disfruta de nuestras habitaciones y suites con vista al mar, decoradas con elegancia y equipadas con lo último en comodidades. Relájate en nuestra piscina al aire libre, revitalízate con un tratamiento en nuestro spa de inspiración maya, o deleita tu paladar en Mar Adentro, nuestro restaurante gourmet con cocina local e internacional.
                </p>
                <p class="texto q-mt-md">
                    Ya sea que vengas a descansar, celebrar o explorar la Riviera Maya, cada detalle en Cielo Azul está pensado para hacer de tu estancia una experiencia inolvidable.
                </p>
            </div>
            <div class="seccion">
                <h3 class="tiitulo-seccion">Historia</h3>
                <p class="texto">
                    Cielo Azul nació en 2015 con la visión de ofrecer un alojamiento íntimo y sostenible, sin sacrificar el lujo. Hoy, seguimos comprometidos con el cuidado del entorno y la autenticidad en cada servicio.
                </p>
            </div>
            <div class="seccion">
                <h4 class="titulo-seccion">Lo que te espera</h4>
                <ul class="lista">
                    <li>Piscina infinita con vista al océano</li>
                    <li>Spa con tratamientos inspirados en la medicina tradicional maya</li>
                    <li>Restaurante con cocina fusión local e internacional</li>
                    <li>Tours privados a playas vírgenes y cenotas</li>
                </ul>
            </div>
            <div class="seccion">
                <h4 class="titulo-seccion">Compromiso con el entorno</h4>
                <p class="texto">Trabajamos con proveedores locales, usamos productos ecológicos y donamos parte de nuestros ingresos a proyectos de conservación marina.</p>
            </div>
            <div class="seccion">
                <h5 class="titulo-seccion">¿Por qué elegirnos?</h5>
                <div class="beneficios">
                    <p class="beneficio-item"><span class="icono">📍</span> Frente a la playa</p>
                    <p class="beneficio-item"><span class="icono">🍳</span> Desayuno incluido</p>
                    <p class="beneficio-item"><span class="icono">🐾</span> Mascotas bienvenidas</p>
                    <p class="beneficio-item"><span class="icono">🚗</span> Estacionamiento gratuito</p>
                    <p class="beneficio-item"><span class="icono">🌿</span> Sostenible y eco-friendly</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import HotelCarrusel from '../components/HotelCarrusel.vue';


</script>

<style lang="scss" scoped>
.contenedorDescription{
    font-family: 'Poppins', 'Roboto', 'sans-serif';
    color: #424242;
    background: #e0f7fa;
}

// Titulo principal
.titulo {
    text-align: center;
    background: #e0f7fa;
    color: #ffffff;
    padding: 60px 20px;
    margin-top: -100px;
}
.tituloTexto {
    font-size: 45px;
    font-weight: 700;
    margin: 0;
    line-height: 1.3;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
.subtitulo {
    font-size: 20px;
    font-weight: 300;
    color: #00bcd4;
    display: block;
    margin-top: 10px;
}

// Contenedor texto descripcion
.contenedorTextoDescription{
    max-width: 1200px;
    margin: 0px auto;
    line-height: 1.8;
}

// Parrafos
.texto{
    font-size: 18px;
    color: #424242;
    text-align: justify;
}

// Secciones
.seccion {
    margin: 40px 0;
}

.titulo-seccion {
    color: #006064;
    font-weight: 600;
    border-bottom: 3px solid #00bcd4;
    display: inline-block;
    padding-bottom: 8px;
    margin-bottom: 20px;
}

// Lista
.lista {
    padding-left: 12px;
    font-size: 18px;
    color: #424242;

    li {
        margin-bottom: 12px;
        position: relative;
        list-style-type: none;
        padding-left: 25px;

        &::before {
            content: '🌊';
            position: absolute;
            left: 0;
            top: 0;
        }
    }
}

// Beneficios
.beneficios {
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-size: 18px;
}

.beneficio-item {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
}

.icono {
    font-size: 21px;
}

// Responsividad
@media (max-width: 768px){
    .tituloTexto {
        font-size: 32px;
    }

    .subtitulo {
        font-size: 18px;
    }

    .texto {
        font-size: 16px;
        text-align: left;
    }

    .titulo-seccion {
        font-size: 22px;
    }
}
</style>