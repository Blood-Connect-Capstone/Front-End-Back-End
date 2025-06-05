const questionnaireScreeningResultsModel = require('../models/questionnaireScreeningResultModel');

module.exports = {
    async getAll(request, h) {
        try {
            const data = await questionnaireScreeningResultsModel.getAll();
            return h.response({
                success: true,
                data,
                message: 'Screening results fetched successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to fetch screening results',
                error: err.message
            }).code(500);
        }
    },

    async getById(request, h) {
        try {
            const { id } = request.params;
            const data = await questionnaireScreeningResultsModel.getById(id);
            return h.response({
                success: true,
                data,
                message: 'Screening result fetched successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Screening result not found',
                error: err.message
            }).code(404);
        }
    },

    async getByUserId(request, h) {
        try {
            const { user_id } = request.params;
            const data = await questionnaireScreeningResultsModel.getByUserId(user_id);
            return h.response({
                success: true,
                data,
                message: 'Screening results fetched by user ID'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to fetch screening results by user ID',
                error: err.message
            }).code(500);
        }
    },

    async create(request, h) {
        try {
            const data = await questionnaireScreeningResultsModel.create(request.payload);
            return h.response({
                success: true,
                data,
                message: 'Screening result created successfully'
            }).code(201);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to create screening result',
                error: err.message
            }).code(500);
        }
    },

    async update(request, h) {
        try {
            const { id } = request.params;
            const data = await questionnaireScreeningResultsModel.update(id, request.payload);
            return h.response({
                success: true,
                data,
                message: 'Screening result updated successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to update screening result',
                error: err.message
            }).code(500);
        }
    },

    async delete(request, h) {
        try {
            const { id } = request.params;
            await questionnaireScreeningResultsModel.remove(id);
            return h.response({
                success: true,
                message: 'Screening result deleted successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to delete screening result',
                error: err.message
            }).code(500);
        }
    }
};
