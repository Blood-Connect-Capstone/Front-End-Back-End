<script setup>
import Navbar from "@/components/Navbar.vue"
import Footer from "@/components/Footer.vue"
import { useDonorPresenter } from "@/presenters/DonorForm2Presenter"
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ScreeningResult from "@/components/ScreeningResult.vue"
import { getUserDonorReservationsByReference, deleteDonorReservation, updateUserEligibility } from "@/models/DonorReservationModel"

const props = defineProps({
  refer_id: String,
  reservation_type: String
});

const emit = defineEmits(['form-submitted']);

const {
  isLoading,
  questions,
  options,
  answers,
  selectOption,
  isComplete,
  submit,
  endScreeningReason,
} = useDonorPresenter()

const route = useRoute()

const userEligibility = ref(null)

const handleSubmit = async () => {
  const res = await submit(route.params.type, route.params.id)

  if (res) {
    userEligibility.value = res

    if (userEligibility.value === 'allowed') {
      emit('form-submitted')
    }
  }
}

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
</script>

<template>
  <Navbar />
  <div v-if="!isLoading" class="container">
    <div v-if="userEligibility" class="screening-complete-container">
      <ScreeningResult v-if="userEligibility === 'temporary_ban'" action="REJECT" :reason="endScreeningReason"
        @restart="resetScreening" />

      <ScreeningResult v-else action="REJECT" :reason="endScreeningReason" @restart="resetScreening" />
    </div>

    <form v-else @submit.prevent="handleSubmit">
      <div v-for="(question, index) in questions" :key="index" class="mb-5 box">
        <label class="form-label d-flex align-items-start mb-3 fw-bold question">
          <span class="circle-number me-3 flex-shrink-0">{{ index + 1 }}</span>
          <span class="question-text flex-grow-1">{{ question.text }}</span>
        </label>



        <div class="d-flex flex-column gap-3">
          <div v-for="option in options" :key="option" class="p-3 border rounded text-start option"
            :class="{ 'selected': answers[index]?.answer === option }" @click="selectOption(index, option)"
            style="cursor: pointer;">
            {{ option }}
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-danger" :disabled="!isComplete">
        Kirim Jawaban
      </button>
    </form>
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

.selected {
  background-color: #DC2626;
  color: white;
  border-color: #DC2626;
}

.option.selected {
  background-color: #DC2626;
  color: white;
}

button {
  width: 100%;
  height: 56px;
  margin-bottom: 153px;
  background-color: #DC2626;
}

.screening-complete-container {
  width: 100%;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}
</style>