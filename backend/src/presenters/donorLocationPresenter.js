const donorLocationModel = require('../models/donorLocationModel');

module.exports = {
    async getAllDonorLocation(request, h) {
        try {
            const donorLocations = await donorLocationModel.getAll();

            return h.response({
                success: true,
                data: donorLocations,
                message: 'Donor locations fetched successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to fetch donor locations',
                error: err.message
            }).code(500);
        }
    },

    async getDonorLocationById(request, h) {
        try {
            const { id } = request.params;
            const donorLocation = await donorLocationModel.getById(id);

            return h.response({
                success: true,
                data: donorLocation,
                message: 'Donor location fetched successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Donor location not found',
                error: err.message
            }).code(404);
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
                message: 'Failed to create donor location',
                error: err.message
            }).code(500);
        }
    },

    async updateDonorLocation(request, h) {
        try {
            const { id } = request.params;
            const updatedDonorLocation = await donorLocationModel.update(id, request.payload);

            return h.response({
                success: true,
                data: updatedDonorLocation,
                message: 'Donor location updated successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to update donor location',
                error: err.message
            }).code(500);
        }
    },

    async deleteDonorLocation(request, h) {
        try {
            const { id } = request.params;
            await donorLocationModel.delete(id);

            return h.response({
                success: true,
                message: 'Donor location deleted successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to delete donor location',
                error: err.message
            }).code(500);
        }
    }
};
