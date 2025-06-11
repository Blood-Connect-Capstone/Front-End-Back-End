import { getCurrentUserWithProfile } from "@/composables/supabaseClient";
import axios from "axios";

export const getDonorForm3Questions = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/questionnaire-questions`);

    const questionsWithOptions = response.data.data.map(question => ({
      id: question.id,
      text: question.text,
      stage: question.stage,
      options: question.questionnaire_question_options.map(opt => ({
        id: opt.id,
        code: opt.code,
        label: opt.label,
        logicAction: opt.logic_action,
        logicNotes: opt.logic_notes
      }))
    }));

    return {
      questionsWithOptions
    };
  } catch (error) {
    console.error("Error fetching donor questions:", error);

    return {
      questionsWithOptions: []
    };
  }
};

export async function saveAnswer(answers) {
  try {
    const user = await getCurrentUserWithProfile();

    const formattedAnswers = answers.map(answer => ({
      questionId: answer.questionId,
      optionId: answer.optionId,
      manualInput: ""
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
