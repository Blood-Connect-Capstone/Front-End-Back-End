// /presenter/DonorPresenter.js
import { ref, computed } from 'vue'
import { DonorForm2Model } from '../models/DonorForm2Model'

export function useDonorPresenter() {
  const questions = ref(DonorForm2Model.questions)
  const options = DonorForm2Model.options
  const answers = ref(Array(questions.value.length).fill(null))

  const selectOption = (index, option) => {
    answers.value[index] = option
  }

  const isComplete = computed(() =>
    answers.value.every(answer => answer !== null)
  )

  const submit = () => {
    console.log('Jawaban:', answers.value)
    alert('Jawaban berhasil dikirim!')
  }

  return {
    questions,
    options,
    answers,
    selectOption,
    isComplete,
    submit
  }
}
