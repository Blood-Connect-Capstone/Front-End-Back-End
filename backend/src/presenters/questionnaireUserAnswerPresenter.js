const questionnaireUserAnswersModel = require('../models/questionnaireUserAnswerModel');

module.exports = {
    async getAll(request, h) {
        try {
            const data = await questionnaireUserAnswersModel.getAll();
            return h.response({
                success: true,
                data,
                message: 'User answers fetched successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to fetch user answers',
                error: err.message
            }).code(500);
        }
    },

    async getById(request, h) {
        try {
            const { id } = request.params;
            const data = await questionnaireUserAnswersModel.getById(id);
            return h.response({
                success: true,
                data,
                message: 'User answer fetched successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'User answer not found',
                error: err.message
            }).code(404);
        }
    },

    async getByUserId(request, h) {
        try {
            const { user_id } = request.params;
            const data = await questionnaireUserAnswersModel.getByUserId(user_id);
            return h.response({
                success: true,
                data,
                message: 'User answers fetched by user ID'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to fetch user answers by user ID',
                error: err.message
            }).code(500);
        }
    },

    async create(request, h) {
        try {
            const data = await questionnaireUserAnswersModel.create(request.payload);

            return h.response({
                success: true,
                data,
                message: 'User answer created successfully'
            }).code(201);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to create user answer',
                error: err.message
            }).code(500);
        }
    },

    async update(request, h) {
        try {
            const { id } = request.params;
            const data = await questionnaireUserAnswersModel.update(id, request.payload);
            return h.response({
                success: true,
                data,
                message: 'User answer updated successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to update user answer',
                error: err.message
            }).code(500);
        }
    }, async delete(request, h) {
        try {
            const { id } = request.params;
            await questionnaireUserAnswersModel.remove(id);
            return h.response({
                success: true,
                message: 'User answer deleted successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to delete user answer',
                error: err.message
            }).code(500);
        }
    },

    async createBulk(request, h) {
        try {
            const { user_id, answers } = request.payload;

            if (!user_id) {
                return h.response({
                    success: false,
                    message: 'User ID is required'
                }).code(400);
            }

            if (!answers || !Array.isArray(answers) || answers.length === 0) {
                return h.response({
                    success: false,
                    message: 'Answers array is required and must not be empty'
                }).code(400);
            }

            for (let answer of answers) {
                if (!answer.questionId) {
                    return h.response({
                        success: false,
                        message: 'Question ID is required for all answers'
                    }).code(400);
                }
            }

            const data = await questionnaireUserAnswersModel.createBulk(user_id, answers);

            return h.response({
                success: true,
                data,
                message: 'Bulk answers created successfully'
            }).code(201);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to create bulk answers',
                error: err.message
            }).code(500);
        }
    }
};
