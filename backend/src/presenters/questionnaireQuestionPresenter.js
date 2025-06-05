const questionnaireQuestionModel = require('../models/questionnaireQuestionModel');

module.exports = {
    async getAllQuestionnaireQuestions(request, h) {
        try {
            const questions = await questionnaireQuestionModel.getAll();

            return h.response({
                success: true,
                data: questions,
                message: 'Questionnaire questions fetched successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to fetch questionnaire questions',
                error: err.message
            }).code(500);
        }
    },

    async getQuestionnaireQuestionById(request, h) {
        try {
            const { id } = request.params;
            const question = await questionnaireQuestionModel.getById(id);

            return h.response({
                success: true,
                data: question,
                message: 'Questionnaire question fetched successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Questionnaire question not found',
                error: err.message
            }).code(404);
        }
    },

    async createQuestionnaireQuestion(request, h) {
        try {
            const newQuestion = await questionnaireQuestionModel.create(request.payload);

            return h.response({
                success: true,
                data: newQuestion,
                message: 'Questionnaire question created successfully'
            }).code(201);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to create questionnaire question',
                error: err.message
            }).code(500);
        }
    },

    async updateQuestionnaireQuestion(request, h) {
        try {
            const { id } = request.params;
            const updated = await questionnaireQuestionModel.update(id, request.payload);

            return h.response({
                success: true,
                data: updated,
                message: 'Questionnaire question updated successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to update questionnaire question',
                error: err.message
            }).code(500);
        }
    },

    async deleteQuestionnaireQuestion(request, h) {
        try {
            const { id } = request.params;
            await questionnaireQuestionModel.remove(id);

            return h.response({
                success: true,
                message: 'Questionnaire question deleted successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to delete questionnaire question',
                error: err.message
            }).code(500);
        }
    }
};
