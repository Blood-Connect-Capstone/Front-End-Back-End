import { ref, computed, onMounted } from 'vue'
import { getDonorForm3Questions } from '@/models/DonorForm3Model';
import { updateUserEligibility } from '@/models/DonorReservationModel';

export function useDonorPresenter() {
  const questionsWithOptions = ref([])
  const answers = ref([])
  const answerResults = ref([])
  const isLoading = ref(true)
  const error = ref(null)
  const currentQuestionIndex = ref(0)
  const canProceed = ref(false)
  const isScreeningEnded = ref(false)
  const endScreeningReason = ref(null)
  const endScreeningAction = ref(null)

  const fetchQuestions = async () => {
    isLoading.value = true
    try {
      const data = await getDonorForm3Questions()

      questionsWithOptions.value = data.questionsWithOptions.filter(q => q.stage == 3)

      answers.value = Array(data.questionsWithOptions.length).fill(null)
      answerResults.value = Array(data.questionsWithOptions.length).fill(null)
    } catch (err) {
      error.value = 'Gagal memuat pertanyaan. Silakan coba lagi nanti.'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(fetchQuestions)

  const selectOption = (questionIndex, option) => {
    answers.value[questionIndex] = option.label
    answerResults.value[questionIndex] = {
      questionId: questionsWithOptions.value[questionIndex].id,
      optionId: option.id,
      logicAction: option.logicAction,
      logicNotes: option.logicNotes
    }
  }

  const nextQuestion = async () => {
    if (!answerResults.value[currentQuestionIndex.value]) {
      return;
    }

    const currentAnswer = answerResults.value[currentQuestionIndex.value];

    if (currentAnswer.logicAction === 'ACCEPT') {
      if (currentQuestionIndex.value < questionsWithOptions.value.length - 1) {
        currentQuestionIndex.value++;
      }
    } else {
      endScreeningReason.value = currentAnswer.logicNotes ||
        (currentAnswer.logicAction === 'REJECT'
          ? 'Maaf, Anda tidak dapat melanjutkan proses donor darah.'
          : 'Silakan konsultasikan dengan petugas medis.');

      isScreeningEnded.value = true;
      endScreeningAction.value = currentAnswer.logicAction;

      await updateUserEligibility('temporary_ban');
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex.value > 0) {
      currentQuestionIndex.value--;
      endScreeningReason.value = null;
    }
  }

  const resetScreening = () => {
    currentQuestionIndex.value = 0;
    isScreeningEnded.value = false;
    endScreeningReason.value = null;
    answers.value = Array(questionsWithOptions.value.length).fill(null);
    answerResults.value = Array(questionsWithOptions.value.length).fill(null);
    canProceed.value = false;
  }

  const isComplete = computed(() => {

    return currentQuestionIndex.value === questionsWithOptions.value.length - 1 &&
      answers.value[currentQuestionIndex.value] !== null;
  })

  const submit = async () => {
    const lastAnswer = answerResults.value[currentQuestionIndex.value];

    if (lastAnswer?.logicAction !== 'ACCEPT') {
      endScreeningReason.value = lastAnswer?.logicNotes ||
        (lastAnswer?.logicAction === 'REJECT'
          ? 'Maaf, Anda tidak dapat melanjutkan proses donor darah.'
          : 'Silakan konsultasikan dengan petugas medis.');

      if (lastAnswer?.logicAction === 'REJECT') {
        isScreeningEnded.value = true;
      }

      return;
    }

    try {
      alert('Jawaban berhasil dikirim!')
    } catch (error) {
      console.error("Error submitting answers:", error)
      alert('Gagal mengirim jawaban. Silakan coba lagi.')
    }
  }

  return {
    questionsWithOptions,
    answers,
    answerResults,
    isLoading,
    error,
    currentQuestionIndex,
    canProceed,
    isScreeningEnded,
    endScreeningReason,
    endScreeningAction,
    selectOption,
    nextQuestion,
    previousQuestion,
    resetScreening,
    isComplete,
    submit,
    fetchQuestions
  }
}
