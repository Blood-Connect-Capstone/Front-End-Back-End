// /presenter/DonorPresenter.js
import { ref, computed, onMounted } from 'vue'
import { DonorForm2Model, fetchQuestionsStage2, saveAnswer } from '../models/DonorForm2Model'
import { updateUserEligibility, updateReservationStatus, getUserDonorReservationsByReference } from '@/models/DonorReservationModel'
import { getCurrentUserWithProfile } from '@/composables/supabaseClient'

export function useDonorPresenter() {
  const questions = ref([])
  const options = DonorForm2Model.options
  const answers = ref([])
  const isLoading = ref(true)
  const endScreeningReason = ref('')

  onMounted(async () => {
    try {
      isLoading.value = true
      const fetchedQuestions = await fetchQuestionsStage2()
      questions.value = fetchedQuestions

      answers.value = Array(questions.value.length).fill(null)
      isLoading.value = false
    } catch (error) {
      console.error('Error in presenter:', error)
      isLoading.value = false
    }
  })

  const selectOption = (index, option) => {
    const questionId = questions.value[index].id
    answers.value[index] = {
      questionId: questionId,
      answer: option
    }
  }

  const isComplete = computed(() =>
    questions.value.length > 0 && answers.value.length === questions.value.length &&
    answers.value.every(answer => answer !== null)
  )

  const hasYesAnswer = computed(() => {
    return answers.value.some(answer => answer?.answer === 'Ya');
  })

  const hasMaybeAnswer = computed(() => {
    return answers.value.some(answer => answer?.answer === 'Mungkin');
  })

  const submit = async (reservation_type, refer_id) => {
    try {
      let userEligibility = ''
      const reservation = await getUserDonorReservationsByReference(reservation_type, refer_id);
      const user = await getCurrentUserWithProfile();

      if (hasYesAnswer.value) {
        userEligibility = 'banned';
        endScreeningReason.value = 'Mohon maaf, berdasarkan jawaban Anda, Anda tidak dapat mendonorkan darah saat ini.';

        await updateReservationStatus(user.user.id, reservation_type, refer_id, 'tidak-memenuhi');
      } else if (hasMaybeAnswer.value) {
        userEligibility = 'temporary_ban';
        endScreeningReason.value = 'Mohon maaf, berdasarkan jawaban Anda, Anda tidak dapat mendonorkan darah saat ini.';

        await updateReservationStatus(user.user.id, reservation_type, refer_id, 'tidak-memenuhi');
      } else {
        userEligibility = 'allowed'
        endScreeningReason.value = 'Anda telah memenuhi syarat untuk menuju tahap screening berikutnya.';

        if (refer_id) {
          await updateReservationStatus(user.user.id, reservation_type, refer_id, 'tahap_2');
        }
      }

      await updateUserEligibility(userEligibility)
      await saveAnswer(answers.value, reservation.id);

      return userEligibility;
    } catch (error) {
      alert('Gagal menyimpan jawaban. Silahkan coba lagi.')
      console.error('Error submitting answers:', error)
      return null;
    }
  }
  const resetScreening = () => {
    answers.value = Array(questions.value.length).fill(null);
    return null;
  }

  return {
    questions,
    options,
    answers,
    isLoading,
    hasYesAnswer,
    selectOption,
    isComplete,
    endScreeningReason,
    resetScreening,
    submit
  }
}
