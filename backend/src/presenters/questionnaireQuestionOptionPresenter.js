const questionnaireQuestionOptionsModel = require('../models/questionnaireQuestionOptionModel');

module.exports = {
    async getAll(request, h) {
        try {
            const data = await questionnaireQuestionOptionsModel.getAll();
            return h.response({
                success: true,
                data,
                message: 'Questionnaire question options fetched successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to fetch questionnaire question options',
                error: err.message
            }).code(500);
        }
    },

    async getById(request, h) {
        try {
            const { id } = request.params;
            const data = await questionnaireQuestionOptionsModel.getById(id);
            return h.response({
                success: true,
                data,
                message: 'Questionnaire question option fetched successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Questionnaire question option not found',
                error: err.message
            }).code(404);
        }
    },

    async getByQuestionId(request, h) {
        try {
            const { question_id } = request.params;
            const data = await questionnaireQuestionOptionsModel.getByQuestionId(question_id);
            return h.response({
                success: true,
                data,
                message: 'Questionnaire question options fetched by question ID'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to fetch questionnaire question options by question ID',
                error: err.message
            }).code(500);
        }
    },

    async create(request, h) {
        try {
            const data = await questionnaireQuestionOptionsModel.create(request.payload);
            return h.response({
                success: true,
                data,
                message: 'Questionnaire question option created successfully'
            }).code(201);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to create questionnaire question option',
                error: err.message
            }).code(500);
        }
    },

    async update(request, h) {
        try {
            const { id } = request.params;
            const data = await questionnaireQuestionOptionsModel.update(id, request.payload);
            return h.response({
                success: true,
                data,
                message: 'Questionnaire question option updated successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to update questionnaire question option',
                error: err.message
            }).code(500);
        }
    },

    async delete(request, h) {
        try {
            const { id } = request.params;
            await questionnaireQuestionOptionsModel.remove(id);
            return h.response({
                success: true,
                message: 'Questionnaire question option deleted successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to delete questionnaire question option',
                error: err.message
            }).code(500);
        }
    }
};
