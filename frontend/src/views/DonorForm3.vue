<script setup>
import Navbar from "@/components/Navbar.vue"
import Footer from "@/components/Footer.vue"
import { useDonorPresenter } from "@/presenters/DonorForm3Presenter"
import { ref } from 'vue'
import ScreeningResult from "@/components/ScreeningResult.vue"
import { useRoute } from "vue-router"
import { getUserDonorReservationsByReference, updateUserEligibility } from "@/models/DonorReservationModel"

const emit = defineEmits(['form-submitted']);

const {
  questionsWithOptions,
  answers,
  answerResults,
  isLoading,
  error,
  currentQuestionIndex,
  isScreeningEnded,
  endScreeningReason,
  endScreeningAction,
  selectOption,
  nextQuestion,
  previousQuestion,
  isComplete,
  submit
} = useDonorPresenter()

const route = useRoute()

const resetScreening = async () => {
  try {
    const response = await getUserDonorReservationsByReference(route.params.type, route.params.id);
    await deleteDonorReservation(response.id);

    await updateUserEligibility('allowed');
    userEligibility.value = 'allowed';

    emit('form-submitted');
  } catch (error) {
    console.error('Error resetting screening:', error);
    alert('Failed to reset screening. Please try again.');
  }
}

const handleSubmit = async () => {
  const res = await submit(route.params.type, route.params.id);

  emit('form-submitted')
}
</script>

<template>
  <Navbar />
  <div class="container">
    <div v-if="questionsWithOptions.length > 0 && !isScreeningEnded" class="progress mb-4">
      <div class="progress-bar" role="progressbar" style="background-color: #DC2626;"
        :style="{ width: (currentQuestionIndex + 1) / questionsWithOptions.length * 100 + '%' }"
        :aria-valuenow="(currentQuestionIndex + 1) / questionsWithOptions.length * 100" aria-valuemin="0"
        aria-valuemax="100">
        {{ Math.round((currentQuestionIndex + 1) / questionsWithOptions.length * 100) }}%
      </div>
    </div>

    <div v-if="isScreeningEnded" class="screening-complete-container">
      <ScreeningResult v-if="endScreeningAction == 'REJECT'" action="REJECT" :reason="endScreeningReason"
        @restart="resetScreening" />

      <ScreeningResult v-else-if="endScreeningAction == 'CONSULT'" action="CONSULT" :reason="endScreeningReason"
        @restart="resetScreening" />
    </div>

    <div v-else-if="questionsWithOptions.length > 0" class="box mb-5">
      <div class="text-secondary mb-3">
        Pertanyaan {{ currentQuestionIndex + 1 }} dari {{ questionsWithOptions.length }}
      </div>

      <label class="form-label d-flex align-items-start mb-3 fw-bold question">
        <span class="circle-number me-3 flex-shrink-0">{{ currentQuestionIndex + 1 }}</span>
        <span class="question-text flex-grow-1">{{ questionsWithOptions[currentQuestionIndex].text }}</span>
      </label>

      <div class="d-flex flex-column gap-3">
        <div v-for="option in questionsWithOptions[currentQuestionIndex].options" :key="option.id"
          class="p-3 border rounded text-start option"
          :class="{ 'selected': answers[currentQuestionIndex] === option.label }"
          @click="selectOption(currentQuestionIndex, option)" style="cursor: pointer;">
          {{ option.label }}
        </div>
      </div>

      <div v-if="endScreeningReason && !isScreeningEnded" class="mt-3 alert" :class="{
        'alert-danger': answerResults[currentQuestionIndex]?.logicAction === 'REJECT',
        'alert-warning': answerResults[currentQuestionIndex]?.logicAction === 'CONSULT'
      }">
        {{ endScreeningReason }}
      </div>

      <div class="btn-navigation d-flex justify-content-end align-items-center gap-2 mt-4">
        <button v-if="currentQuestionIndex > 0" @click="previousQuestion" class="btn-custom btn-back">
          <span>Kembali</span>
        </button>

        <button v-if="currentQuestionIndex < questionsWithOptions.length - 1" @click="nextQuestion"
          class="btn-custom btn-next" :disabled="!answers[currentQuestionIndex]">
          <span>Lanjut</span>
        </button>

        <button v-else-if="isComplete" @click="handleSubmit" class="btn-custom btn-submit">
          <span>Kirim Jawaban</span>
        </button>
      </div>
    </div>
  </div>
  <Footer v-if="!isLoading" />
</template>

<style scoped>
.container {
  margin: 35px auto;
}

.box {
  padding: 30px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
}

.question {
  margin-bottom: 40px !important;
}

.question-text {
  min-width: 0;
}

.option {
  border-radius: 8px !important;
}

.circle-number {
  width: 32px;
  height: 32px;
  background-color: #DC2626;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  flex-shrink: 0;
}

.option:hover {
  background-color: #DC2626;
  color: white;
}

.option.selected {
  background-color: #DC2626;
  color: white;
}

.screening-complete-container {
  width: 100%;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.btn-custom {
  gap: 8px;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
}

.btn-next,
.btn-submit {
  background-color: #DC2626;
  color: white;
}

.btn-next:disabled {
  background-color: #9CA3AF;
  cursor: not-allowed;
}

.btn-back {
  background-color: #F3F4F6;
  color: #374151;
  border: 1px solid #D1D5DB;
}

.btn-navigation {
  margin-top: 40px;
}

@media (max-width: 768px) {
  .btn-custom {
    height: 48px;
    font-size: 14px;
    padding: 10px 20px;
  }

  .btn-navigation .btn-custom {
    width: 100%;
    justify-content: center;
  }
}
</style>