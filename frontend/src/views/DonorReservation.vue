<script setup>
import { onMounted } from 'vue';
import DonorForm1 from './DonorForm1.vue';
import DonorForm2 from './DonorForm2.vue';
import DonorForm3 from './DonorForm3.vue';
import Navbar from '@/components/Navbar.vue';
import ScreeningResult from '@/components/ScreeningResult.vue';
import useDonorReservationPresenter from '@/presenters/DonorReservationPresenter';

const {
    isLoading,
    refer_id,
    reservation_type,
    currentUserStep,
    userEligibility,
    fetchData,
    refreshCurrentStep,
    resetScreening,
} = useDonorReservationPresenter();

const handleFormSubmitted = async () => {
    await refreshCurrentStep();
};

onMounted(async () => {
    await fetchData();
});
</script>

<template>
    <div v-if="isLoading">
        <Navbar />
        <div class="loading-container">
            <div class="spinner"></div>
            <span class="loading-text">Memuat data...</span>
        </div>
    </div>
    <div v-else>
        <div v-if="userEligibility === 'allowed'">
            <DonorForm1 v-if="currentUserStep == null" @form-submitted="handleFormSubmitted" :refer_id="refer_id"
                :reservation_type="reservation_type" />
            <DonorForm2 v-else-if="currentUserStep == 'tahap_1'" @form-submitted="handleFormSubmitted"
                :refer_id="refer_id" :reservation_type="reservation_type" />
            <DonorForm3 v-else-if="currentUserStep == 'tahap_2'" @form-submitted="handleFormSubmitted"
                :refer_id="refer_id" :reservation_type="reservation_type" />
        </div>
        <div v-else>
            <Navbar />
            <div class="screening-container">
                <div style="width: 80%;">
                    <ScreeningResult action="REJECT"
                        reason="Berdasarkan Screening Sebelumnya, Anda belum dapat untuk mendonorkan darah"
                        @restart="resetScreening" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 0;
    min-height: 200px;
}

.spinner {
    width: 48px;
    height: 48px;
    border: 4px solid rgba(220, 38, 38, 0.1);
    border-left-color: #DC2626;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

.loading-text {
    color: #6c757d;
    font-size: 0.95rem;
}

.screening-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    padding: 40px 0;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>