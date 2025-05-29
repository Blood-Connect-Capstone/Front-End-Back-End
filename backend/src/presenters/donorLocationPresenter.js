const donorLocationModel = require('../models/donorLocationModel');

module.exports = {
    async getAllDonorLocation(request, h) {
        try {
            const donorLocation = await donorLocationModel.getAll();

            return h.response({
                success: true,
                data: donorLocation,
                message: 'Donor locations fetched successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to fetch donor locations'
            }).code(500);
        }
    },

    async createDonorLocation(request, h) {
        try {
            const donorLocation = await donorLocationModel.create(request.payload);

            return h.response({
                success: true,
                data: donorLocation,
                message: 'Donor location created successfully'
            }).code(201);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to create donor location'
            }).code(500);
        }
    }
};
