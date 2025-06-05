const bloodRequestModel = require('../models/bloodRequestModel');

module.exports = {
    async getAllBloodRequests(request, h) {
        try {
            const requests = await bloodRequestModel.getAll();

            return h.response({
                success: true,
                data: requests,
                message: 'Blood requests fetched successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to fetch blood requests',
                error: err.message
            }).code(500);
        }
    },

    async getBloodRequestById(request, h) {
        try {
            const { id } = request.params;
            const data = await bloodRequestModel.getById(id);

            return h.response({
                success: true,
                data,
                message: 'Blood request fetched successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Blood request not found',
                error: err.message
            }).code(404);
        }
    },

    async createBloodRequest(request, h) {
        try {
            const data = await bloodRequestModel.create(request.payload);

            return h.response({
                success: true,
                data,
                message: 'Blood request created successfully'
            }).code(201);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to create blood request',
                error: err.message
            }).code(500);
        }
    },

    async updateBloodRequest(request, h) {
        try {
            const { id } = request.params;
            const data = await bloodRequestModel.update(id, request.payload);

            return h.response({
                success: true,
                data,
                message: 'Blood request updated successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to update blood request',
                error: err.message
            }).code(500);
        }
    },

    async deleteBloodRequest(request, h) {
        try {
            const { id } = request.params;
            await bloodRequestModel.delete(id);

            return h.response({
                success: true,
                message: 'Blood request deleted successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to delete blood request',
                error: err.message
            }).code(500);
        }
    }
};
