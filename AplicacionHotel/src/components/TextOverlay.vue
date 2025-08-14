<!-- components/TextOverlay.vue -->
<template>
    <div class="absolute-bottom text-center overlay-container">
        <div class="overlay-content">
        <div class="text-h3 text-weight-bold text-overlay">
            {{ title }}
        </div>
        <div class="text-h6 text-weight-light q-mt-sm text-overlay">
            {{ subtitle }}
        </div>
        <div v-if="btnLabel" class="q-mt-lg">
            <slot name="button">
            <q-btn
                color="white"
                text-color="dark"
                :label="btnLabel"
                size="lg"
                class="btn-anim"
                @click="$emit('click')"
                unelevated
                no-caps
                style="font-weight: 600"
            />
            </slot>
        </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    subtitle: String,
    btnLabel: String
})

defineEmits(['click'])
</script>

<style scoped>
.overlay-container {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent 60%);
    padding: 40px 20px 60px;
    border-radius: 16px 16px 0 0;
}

.overlay-content {
    max-width: 700px;
    margin: 0 auto;
    animation: fadeInUp 0.8s ease-out;
}

.text-overlay {
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8),
                0 0 6px rgba(0, 0, 0, 0.4);
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.btn-anim {
    transition: all 0.3s ease;
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 14px rgba(255, 255, 255, 0.3);
    }
}
</style>