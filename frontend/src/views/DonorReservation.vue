<script setup>
import { onMounted, ref } from 'vue';
import DonorForm1 from './DonorForm1.vue';
import DonorForm2 from './DonorForm2.vue';
import DonorForm3 from './DonorForm3.vue';
import Navbar from '@/components/Navbar.vue';
import ScreeningResult from '@/components/ScreeningResult.vue';
import useDonorReservationPresenter from '@/presenters/DonorReservationPresenter';
import Footer from '@/components/Footer.vue';

const isSubmittingDate = ref(false);
const selectedDate = ref('');

const {
    isLoading,
    refer_id,
    reservation_type,
    currentUserStep,
    userEligibility,
    fetchData,
    refreshCurrentStep,
    resetScreening,
    updateDate,
} = useDonorReservationPresenter();

const handleFormSubmitted = async () => {
    await refreshCurrentStep();
};

const handleDateSubmit = async () => {
    try {
        isSubmittingDate.value = true;
        await updateDate(selectedDate.value);
        isSubmittingDate.value = false;
    } catch (error) {
        console.error('Error submitting date:', error);
        isSubmittingDate.value = false;
    }
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
            <!-- Date Reservation Form -->
            <div v-else>
                <Navbar />
                <div class="form-container">
                    <div class="form-card">
                        <h2 class="form-title">Pilih Tanggal Kedatangan</h2>
                        <p class="form-subtitle">Mohon pilih tanggal yang sesuai untuk donor darah Anda</p>

                        <form @submit.prevent="handleDateSubmit" class="reservation-form">
                            <div class="form-group">
                                <label for="date" class="form-label">Tanggal Kedatangan</label>
                                <input type="date" id="date" v-model="selectedDate" class="form-input" required />
                            </div>

                            <div class="form-actions">
                                <button type="submit" class="submit-btn" :disabled="isSubmittingDate">
                                    <span v-if="isSubmittingDate">Menyimpan...</span>
                                    <span v-else>Simpan</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
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

.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 64px);
    padding: 20px;
    background-color: #f8f9fa;
}

.form-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    width: 100%;
    max-width: 500px;
}

.form-title {
    font-size: 1.75rem;
    font-weight: 600;
    color: #DC2626;
    margin-bottom: 0.5rem;
    text-align: center;
}

.form-subtitle {
    color: #6c757d;
    text-align: center;
    margin-bottom: 2rem;
    font-size: 0.95rem;
}

.reservation-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-label {
    font-weight: 500;
    color: #374151;
    font-size: 0.95rem;
}

.form-input {
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s ease;
}

.form-input:focus {
    outline: none;
    border-color: #DC2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-actions {
    margin-top: 1rem;
}

.submit-btn {
    width: 100%;
    padding: 12px 24px;
    background-color: #DC2626;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.submit-btn:hover:not(:disabled) {
    background-color: #B91C1C;
}

.submit-btn:disabled {
    background-color: #9CA3AF;
    cursor: not-allowed;
}
</style>