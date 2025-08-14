<template>
    <div class="Card">
        <div class="transition">
        <q-intersection
            transition="scale"
            class="exampleItem"
        >
            <div class="img">
                <img :src="props.imagenCard" :alt="props.tituloCard" />
            </div>
            <div class="card-body">
                <div class="titulo">
                    {{ props.tituloCard }}
                </div>
                <div class="descripcion">
                    {{ props.descripcionCard }}
                </div>
                <div class="boton">
                    {{ props.botonCard }}
                </div>
                <div class="precio">
                    <p class="price">
                    <strong>{{ props.precio }}</strong>
                    </p>
                </div>
                <!-- Botón que abre el diálogo -->
                <q-btn
                    color="primary"
                    label="Ver detalles"
                    outline
                    @click="openDialog('blur(4px) saturate(150%)')"
                    class="full-width"
                />
            </div>
            </q-intersection>
        </div>

        <!-- Diálogo de detalles -->
        <q-dialog v-model="dialog" :backdrop-filter="backdropFilter">
        <q-card style="min-width: 350px; max-width: 500px; width: 90%">
            <q-card-section class="row items-center q-pb-none text-h6">
            Detalles de {{ props.tituloCard }}
            </q-card-section>

            <q-card-section>
            <q-img
                :src="props.imagenCard"
                :alt="props.tituloCard"
                height="200px"
            />
            <div class="text-h6">{{ props.tituloCard }}</div>
            <p><strong>Descripción:</strong> {{ props.descripcionCard }}</p>
            <p><strong>Precio:</strong> {{ props.precio }}</p>
            <!-- Vista habitaciones -->
            <p v-if="props.detalles.capacidad">
                <strong>Capacidad:</strong> {{ props.detalles.capacidad }}
            </p>
            <p v-if="props.detalles.servicios">
                <strong>Servicios:</strong> {{ props.detalles.servicios }}
            </p>
            <p v-if="props.detalles.medidas">
                <strong>Medidas:</strong> {{ props.detalles.medidas }}
            </p>
            <!-- Vistas gastronomía -->
            <p v-if="props.detalles.tipo">
                <strong>Tipo:</strong> {{ props.detalles.tipo }}
            </p>
            <p v-if="props.detalles.horario">
                <strong>Horario:</strong> {{ props.detalles.horario }}
            </p>
            <p v-if="props.detalles.especialidad">
                <strong>Especialidad:</strong> {{ props.detalles.especialidad }}
            </p>
            <p v-if="props.detalles.ambiente">
                <strong>Ambiente:</strong> {{ props.detalles.ambiente }}
            </p>
            <!-- Vista deporte -->
            <p v-if="props.detalles.atraccion">
                <strong>Atracción:</strong> {{ props.detalles.atraccion }}
            </p>
            <p v-if="props.detalles.duracion">
                <strong>Duración:</strong> {{ props.detalles.duracion }}
            </p>
            <p v-if="props.detalles.nivel">
                <strong>Nivel:</strong> {{ props.detalles.nivel }}
            </p>
            <p v-if="props.detalles.incluye">
                <strong>Incluye:</strong> {{ props.detalles.incluye }}
            </p>
            <p v-if="props.detalles.ubicacion">
                <strong>Ubicación:</strong> {{ props.detalles.ubicacion }}
            </p>
            <p v-if="props.detalles.recomendaciones">
                <strong>Recomendaciones:</strong>
                {{ props.detalles.recomendaciones }}
            </p>
            </q-card-section>

            <q-card-actions align="right">
            <q-btn flat label="Cerrar" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
        </q-dialog>
    </div>
</template>

    <script setup>
    import { ref } from "vue";

    const props = defineProps({
    imagenCard: {
        required: true,
        type: String,
    },
    tituloCard: {
        required: true,
        type: String,
    },
    descripcionCard: {
        required: true,
        type: String,
    },
    precio: {
        required: true,
        type: String,
    },
    detalles: {
        type: Object,
        default: () => ({}),
    },
    });

    // Estado del diálogo
    const dialog = ref(false);
    const backdropFilter = ref(null);

    // Método para abrir el diálogo con un filtro específico
    function openDialog(filter) {
    backdropFilter.value = filter;
    dialog.value = true;
    }
    </script>

    <style lang="scss" scoped>
    .Card {
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        cursor: pointer;
        background-color: #fff;
        width: 350px;
    }
    .Card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15);
        border-color: #00a8b5;
    }

    .exampleItem{
        width: 100%;
        height: 420px;
    }
    .img img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
    .card-body {
        padding: 16px;
    }
    .descripcion {
        color: #555;
        font-size: 15px;
        line-height: 1.5;
        margin: 8px 0;
    }

    .precio {
        color: #e91e63;
        font-size: 17px;
        margin: 12px 0;
    }
    </style>
