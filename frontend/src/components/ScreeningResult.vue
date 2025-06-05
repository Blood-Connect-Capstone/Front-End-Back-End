<script setup>
import { computed } from 'vue'

const props = defineProps({
    action: {
        type: String,
        required: true,
        validator: value => ['REJECT', 'CONSULT'].includes(value)
    },
    reason: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: 'Screening Selesai'
    },
    note: {
        type: String,
        default: 'Jika Anda memiliki pertanyaan, silakan hubungi petugas medis kami.'
    },
    restartButtonText: {
        type: String,
        default: 'Mulai Ulang Screening'
    }
})

const emit = defineEmits(['restart'])

const iconUrl = computed(() => {
    return props.action === 'REJECT'
        ? 'https://img.icons8.com/?size=100&id=fYgQxDaH069W&format=png&color=000000'
        : 'https://img.icons8.com/?size=100&id=dKMGP5XqWxob&format=png&color=000000'
})

const message = computed(() => {
    return props.action === 'REJECT'
        ? props.reason
        : `Maaf Anda belum dapat mendonorkan darah. ${props.reason}`
})

const handleRestart = () => {
    emit('restart')
}
</script>

<template>
    <div class="screening-complete-container">
        <div class="screening-complete-card"
            :class="{ 'reject': action === 'REJECT', 'consult': action === 'CONSULT' }">
            <div class="screening-icon">
                <img style="width: 80px;" :src="iconUrl" :alt="action === 'REJECT' ? 'Rejected' : 'Consult'" />
            </div>

            <h2 class="screening-title">{{ title }}</h2>

            <div class="screening-content">
                <p class="screening-message">{{ message }}</p>
                <div class="screening-divider"></div>
                <p class="screening-note">{{ note }}</p>
            </div>
        </div>

        <button class="btn-restart" @click="handleRestart">
            <i class="icon-restart"></i>
            <span>{{ restartButtonText }}</span>
        </button>
    </div>
</template>

<style scoped>
.screening-complete-container {
    width: 100%;
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
}

.screening-complete-card {
    width: 100%;
    padding: 48px 40px;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 2px solid;
    position: relative;
    overflow: hidden;
}

.screening-complete-card.reject {
    background-color: #FEE2E2;
    border-color: #F87171;
    color: #B91C1C;
}

.screening-complete-card.consult {
    background-color: #FEF3C7;
    border-color: #FBBF24;
    color: #B45309;
}

.screening-title {
    font-size: 2.25rem;
    font-weight: 700;
    margin: 24px 0;
}

.screening-content {
    max-width: 600px;
    margin: 0 auto;
}

.screening-message {
    font-size: 1.125rem;
    line-height: 1.75;
    margin-bottom: 24px;
    font-weight: 500;
}

.screening-divider {
    width: 100px;
    height: 3px;
    margin: 24px auto;
    border-radius: 2px;
}

.reject .screening-divider {
    background: rgba(220, 38, 38, 0.3);
}

.consult .screening-divider {
    background: rgba(217, 119, 6, 0.3);
}

.screening-note {
    font-size: 1rem;
    line-height: 1.5;
    opacity: 0.8;
    margin: 0;
    font-style: italic;
}

.btn-restart {
    background-color: #047857;
    color: white;
    font-size: 18px;
    font-weight: 600;
    border-radius: 12px;
    margin-bottom: 40px;
    padding: 12px 24px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-restart:hover {
    background-color: #065f46;
}

@media (max-width: 768px) {
    .screening-complete-card {
        padding: 32px 24px;
        margin: 0 16px;
    }

    .screening-title {
        font-size: 1.875rem;
    }

    .screening-message {
        font-size: 1rem;
    }

    .btn-restart {
        min-width: 200px;
        height: 56px;
        font-size: 16px;
        margin: 0 16px 40px;
    }
}

@media (max-width: 480px) {
    .screening-complete-container {
        padding: 24px 0;
    }

    .screening-complete-card {
        padding: 24px 20px;
        margin: 0 12px;
    }

    .screening-title {
        font-size: 1.5rem;
    }
}
</style>