const questionnaireQuestionOptionsPresenter = require('../presenters/questionnaireQuestionOptionPresenter');
const questionnaireUserAnswersPresenter = require('../presenters/questionnaireUserAnswerPresenter');
const questionnaireScreeningResultsPresenter = require('../presenters/questionnaireScreeningResultPresenter');
const QuestionnaireQuestionPresenter = require('../presenters/QuestionnaireQuestionPresenter');

module.exports = [
    {
        method: 'GET',
        path: '/api/v1/questionnaire-questions',
        handler: QuestionnaireQuestionPresenter.getAllQuestionnaireQuestions,
    },
    {
        method: 'GET',
        path: '/api/v1/questionnaire-questions/{id}',
        handler: QuestionnaireQuestionPresenter.getQuestionnaireQuestionById,
    },
    {
        method: 'POST',
        path: '/api/v1/questionnaire-questions',
        handler: QuestionnaireQuestionPresenter.createQuestionnaireQuestion,
    },
    {
        method: 'PUT',
        path: '/api/v1/questionnaire-questions/{id}',
        handler: QuestionnaireQuestionPresenter.updateQuestionnaireQuestion,
    },
    {
        method: 'DELETE',
        path: '/api/v1/questionnaire-questions/{id}',
        handler: QuestionnaireQuestionPresenter.deleteQuestionnaireQuestion,
    },

    {
        method: 'GET',
        path: '/api/v1/questionnaire-question-options',
        handler: questionnaireQuestionOptionsPresenter.getAll,
    },
    {
        method: 'GET',
        path: '/api/v1/questionnaire-question-options/{id}',
        handler: questionnaireQuestionOptionsPresenter.getById,
    },
    {
        method: 'GET',
        path: '/api/v1/questionnaire-question-options/question/{question_id}',
        handler: questionnaireQuestionOptionsPresenter.getByQuestionId,
    },
    {
        method: 'POST',
        path: '/api/v1/questionnaire-question-options',
        handler: questionnaireQuestionOptionsPresenter.create,
    },
    {
        method: 'PUT',
        path: '/api/v1/questionnaire-question-options/{id}',
        handler: questionnaireQuestionOptionsPresenter.update,
    },
    {
        method: 'DELETE',
        path: '/api/v1/questionnaire-question-options/{id}',
        handler: questionnaireQuestionOptionsPresenter.delete,
    },

    {
        method: 'GET',
        path: '/api/v1/questionnaire-user-answers',
        handler: questionnaireUserAnswersPresenter.getAll,
    },
    {
        method: 'GET',
        path: '/api/v1/questionnaire-user-answers/{id}',
        handler: questionnaireUserAnswersPresenter.getById,
    },
    {
        method: 'GET',
        path: '/api/v1/questionnaire-user-answers/user/{user_id}',
        handler: questionnaireUserAnswersPresenter.getByUserId,
    },
    {
        method: 'POST',
        path: '/api/v1/questionnaire-user-answers',
        handler: questionnaireUserAnswersPresenter.create,
    },
    {
        method: 'PUT',
        path: '/api/v1/questionnaire-user-answers/{id}',
        handler: questionnaireUserAnswersPresenter.update,
    }, {
        method: 'DELETE',
        path: '/api/v1/questionnaire-user-answers/{id}',
        handler: questionnaireUserAnswersPresenter.delete,
    },
    {
        method: 'POST',
        path: '/api/v1/questionnaire-user-answers/bulk',
        handler: questionnaireUserAnswersPresenter.createBulk,
    },
    {
        method: 'GET',
        path: '/api/v1/questionnaire-screening-results',
        handler: questionnaireScreeningResultsPresenter.getAll,
    },
    {
        method: 'GET',
        path: '/api/v1/questionnaire-screening-results/{id}',
        handler: questionnaireScreeningResultsPresenter.getById,
    },
    {
        method: 'GET',
        path: '/api/v1/questionnaire-screening-results/user/{user_id}',
        handler: questionnaireScreeningResultsPresenter.getByUserId,
    },
    {
        method: 'POST',
        path: '/api/v1/questionnaire-screening-results',
        handler: questionnaireScreeningResultsPresenter.create,
    },
    {
        method: 'PUT',
        path: '/api/v1/questionnaire-screening-results/{id}',
        handler: questionnaireScreeningResultsPresenter.update,
    },
    {
        method: 'DELETE',
        path: '/api/v1/questionnaire-screening-results/{id}',
        handler: questionnaireScreeningResultsPresenter.delete,
    },
];
