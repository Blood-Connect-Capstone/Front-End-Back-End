<script setup>
  import Navbar from "@/components/Navbar.vue"
  import Footer from "@/components/Footer.vue"
  import { useDonorPresenter } from "@/presenters/DonorForm2Presenter"

  const {
    questions,
    options,
    answers,
    selectOption,
    isComplete,
    submit
  } = useDonorPresenter()

  const handleSubmit = () => {
    submit()
  }
</script>

<template>
  <Navbar />
    <div class="container">
      <form @submit.prevent="handleSubmit">
        <div
          v-for="(question, index) in questions"
          :key="index"
          class="mb-5 box"
        >
          <!-- Question Label with Auto-Increment Circle -->
          <label
            class="form-label d-flex align-items-start mb-3 fw-bold question"
          >
            <span class="circle-number me-3 flex-shrink-0">{{ index + 1 }}</span>
            <span class="question-text flex-grow-1">{{ question }}</span>
          </label>



          <!-- Answer Options -->
          <div class="d-flex flex-column gap-3">
            <div
              v-for="option in options"
              :key="option"
              class="p-3 border rounded text-start option"
              :class="{ 'selected': answers[index] === option }"
              @click="selectOption(index, option)"
              style="cursor: pointer;"
            >
              {{ option }}
            </div>
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-danger"
          :disabled="!isComplete"
        >
          Kirim Jawaban
        </button>
      </form>
    </div>
  <Footer />
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
  button {
    width: 100%;
    height: 56px;
    margin-bottom: 153px;
    background-color: #DC2626;
  }
</style>