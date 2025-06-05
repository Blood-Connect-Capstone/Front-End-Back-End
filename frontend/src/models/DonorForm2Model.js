import { getCurrentUserWithProfile } from "@/composables/supabaseClient";
import axios from "axios";

// /model/DonorModel.js
export const DonorForm2Model = {
  options: ['Ya', 'Tidak', 'Mungkin'],
  questions: [
    'Apakah Anda berusia lebih dari 65 tahun dan telah dinyatakan tidak sehat oleh dokter?',
    'Apakah Anda pernah didiagnosis menderita kanker darah atau kanker yang berhubungan dengan infeksi virus dalam darah?',
    'Apakah Anda pernah didiagnosis menderita kanker (selain kanker darah) dan belum mencapai remisi selama minimal 5 tahun setelah pengobatan terakhir?',
    'Apakah Anda pernah menerima pengobatan dengan ekstrak dari kelenjar pituitari manusia, atau pernah menerima cangkok kornea atau duramater (selaput otak)?',
    'Apakah Anda sedang menjalani pengobatan diabetes dengan insulin?',
    'Apakah Anda pernah menyalahgunakan narkoba dengan cara disuntikkan?',
    'Apakah Anda memiliki riwayat penyakit jantung atau pembuluh darah, seperti penyakit jantung koroner, angina, gangguan irama jantung berat, stroke, atau trombosis arteri/vena berulang?',
    'Apakah Anda terinfeksi atau menjadi pembawa virus HIV, HTLV, hepatitis B (HBV), atau hepatitis C (HCV)?',
    'Apakah Anda pernah didiagnosis menderita penyakit menular tertentu seperti Babesiosis, Leishmaniasis (Kala-Azar), Q Fever kronis, atau penyakit Chagas?',
    'Apakah Anda pernah menerima transplantasi jaringan atau organ dari hewan (xenotransplantasi)?',
    'Apakah Anda memiliki riwayat reaksi alergi berat (anafilaksis)?',
    'Apakah Anda memiliki penyakit autoimun yang memengaruhi lebih dari satu organ tubuh?',
    'Apakah Anda memiliki kecenderungan mengalami perdarahan abnormal, seperti hemofilia atau gangguan pembekuan darah lainnya?',
    'Apakah Anda memiliki penyakit hati kronis atau gangguan fungsi hati yang serius?',
    'Apakah Anda pernah didiagnosis menderita Polycythaemia Vera, yaitu kondisi ketika jumlah sel darah merah di dalam sel tubuh terlalu banyak?'
  ]
}

export async function fetchQuestionsStage2() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/questionnaire-questions`);

    const stage2Questions = response.data.data.filter(question => question.stage == 2);

    return stage2Questions.map(question => ({
      id: question.id,
      text: question.text
    }));
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
}

export async function saveAnswer(answers) {
  try {
    const user = await getCurrentUserWithProfile();

    const formattedAnswers = answers.map(answer => ({
      questionId: answer.questionId,
      optionId: null,
      manualInput: answer.answer
    }));

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/questionnaire-user-answers/bulk`, {
      user_id: user.user.id,
      answers: formattedAnswers
    });

    return response.data;
  } catch (error) {
    console.error('Error saving answers:', error);
    throw error;
  }
}