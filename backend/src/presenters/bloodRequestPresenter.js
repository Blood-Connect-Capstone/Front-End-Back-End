const bloodRequestModel = require('../models/bloodRequestModel');

module.exports = {
    async getAllBloodRequest(request, h) {
        try {
            const bloodRequest = await bloodRequestModel.getAll();

            return h.response({
                success: true,
                message: 'Blood requests fetched successfully',
                data: bloodRequest
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: err.message || 'Failed to fetch blood requests'
            }).code(500);
        }
    },
};
