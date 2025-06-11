const donorReservationModel = require('../models/donorReservationModel');

module.exports = {
    async getAllDonorReservations(request, h) {
        try {
            const donorReservations = await donorReservationModel.getAll();

            return h.response({
                success: true,
                data: donorReservations,
                message: 'Donor reservations fetched successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to fetch donor reservations',
                error: err.message
            }).code(500);
        }
    },

    async getDonorReservationById(request, h) {
        try {
            const { id } = request.params;
            const donorReservation = await donorReservationModel.getById(id);

            return h.response({
                success: true,
                data: donorReservation,
                message: 'Donor reservation fetched successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Donor reservation not found',
                error: err.message
            }).code(404);
        }
    },

    async getDonorReservationsByUserId(request, h) {
        try {
            const { userId } = request.params;
            const donorReservations = await donorReservationModel.getByUserId(userId);

            return h.response({
                success: true,
                data: donorReservations,
                message: 'User donor reservations fetched successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to fetch user donor reservations',
                error: err.message
            }).code(500);
        }
    },

    async createDonorReservation(request, h) {
        try {
            const donorReservation = await donorReservationModel.create(request.payload);

            return h.response({
                success: true,
                data: donorReservation,
                message: 'Donor reservation created successfully'
            }).code(201);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to create donor reservation',
                error: err.message
            }).code(500);
        }
    },

    async updateDonorReservation(request, h) {
        try {
            const { id } = request.params;
            const updatedDonorReservation = await donorReservationModel.update(id, request.payload);

            return h.response({
                success: true,
                data: updatedDonorReservation,
                message: 'Donor reservation updated successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to update donor reservation',
                error: err.message
            }).code(500);
        }
    },

    async updateDate(request, h) {
        try {
            const { user_id, reservation_type, refer_id, donor_date } = request.payload;
            const updatedDonorReservation = await donorReservationModel.updateDate(user_id, reservation_type, refer_id, donor_date);

            return h.response({
                success: true,
                data: updatedDonorReservation,
                message: 'Date updated successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to update date',
                error: err.message
            }).code(500);
        }
    },

    async updateStatus(request, h) {
        try {
            const { user_id, reservation_type, refer_id, status } = request.payload;
            const updatedDonorReservation = await donorReservationModel.updateStatus(user_id, reservation_type, refer_id, status);
            return h.response({
                success: true,
                data: updatedDonorReservation,
                message: 'Status updated successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to update status',
                error: err.message
            }).code(500);
        }
    },

    async updateScreeningStatus(request, h) {
        try {
            const { user_id, reservation_type, refer_id, screening_status } = request.payload;

            const updatedDonorReservation = await donorReservationModel.updateScreeningStatus(user_id, reservation_type, refer_id, screening_status);

            return h.response({
                success: true,
                data: updatedDonorReservation,
                message: 'Screening status updated successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to update screening status',
                error: err.message
            }).code(500);
        }
    },

    async deleteDonorReservation(request, h) {
        try {
            const { id } = request.params;
            await donorReservationModel.delete(id);

            return h.response({
                success: true,
                message: 'Donor reservation deleted successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to delete donor reservation',
                error: err.message
            }).code(500);
        }
    },

    async getUserDonorReservationsByReference(request, h) {
        try {
            const { reservationType, referId, userId } = request.params;

            const donorReservations = await donorReservationModel.getUserDonorReservationsByReference(reservationType, referId, userId);

            return h.response({
                success: true,
                data: donorReservations,
                message: 'User donor reservations by reference fetched successfully'
            }).code(200);
        }
        catch (err) {
            return h.response({
                success: false,
                message: 'Failed to fetch user donor reservations by reference',
                error: err.message
            }).code(500);
        }
    },
};