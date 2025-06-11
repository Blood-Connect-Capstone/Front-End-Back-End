const donorHistoryModel = require("../models/donorHistoryModel");

module.exports = {
    async getDonorHistoryByUser(request, h) {
        try {
            const { userId } = request.params;
            const donorHistories = await donorHistoryModel.getByUserId(userId);

            return h
                .response({
                    success: true,
                    data: donorHistories,
                    message: "User donor histories fetched successfully",
                })
                .code(200);
        } catch (err) {
            return h
                .response({
                    success: false,
                    message: "Failed to fetch user donor histories",
                    error: err.message,
                })
                .code(500);
        }
    },

    async createDonorHistory(request, h) {
        try {
            const { user_id, donor_reservation_id, volume, notes } = request.payload;

            if (!user_id || !donor_reservation_id || !volume) {
                return h
                    .response({
                        success: false,
                        message: "user_id, donor_reservation_id, and volume are required",
                    })
                    .code(400);
            }

            if (isNaN(volume) || parseFloat(volume) <= 0) {
                return h
                    .response({
                        success: false,
                        message: "Volume must be a positive number",
                    })
                    .code(400);
            }

            const donorHistory = await donorHistoryModel.create({
                user_id,
                donor_reservation_id,
                volume,
                notes
            });

            return h
                .response({
                    success: true,
                    data: donorHistory,
                    message: "Donor history created successfully",
                })
                .code(201);
        } catch (err) {
            return h
                .response({
                    success: false,
                    message: "Failed to create donor history",
                    error: err.message,
                })
                .code(500);
        }
    },

    async updateDonorHistory(request, h) {
        try {
            const { id } = request.params;
            const { volume, notes } = request.payload;

            if (volume !== undefined && (isNaN(volume) || parseFloat(volume) <= 0)) {
                return h
                    .response({
                        success: false,
                        message: "Volume must be a positive number",
                    })
                    .code(400);
            }

            const updatedDonorHistory = await donorHistoryModel.update(id, {
                volume,
                notes
            });

            return h
                .response({
                    success: true,
                    data: updatedDonorHistory,
                    message: "Donor history updated successfully",
                })
                .code(200);
        } catch (err) {
            return h
                .response({
                    success: false,
                    message: "Failed to update donor history",
                    error: err.message,
                })
                .code(500);
        }
    },

    async deleteDonorHistory(request, h) {
        try {
            const { id } = request.params;
            await donorHistoryModel.delete(id);

            return h
                .response({
                    success: true,
                    message: "Donor history deleted successfully",
                })
                .code(200);
        } catch (err) {
            return h
                .response({
                    success: false,
                    message: "Failed to delete donor history",
                    error: err.message,
                })
                .code(500);
        }
    },

    async getUserDonationStats(request, h) {
        try {
            const { userId } = request.params;
            const stats = await donorHistoryModel.getTotalVolumeByUser(userId);

            return h
                .response({
                    success: true,
                    data: stats,
                    message: "User donation statistics fetched successfully",
                })
                .code(200);
        } catch (err) {
            return h
                .response({
                    success: false,
                    message: "Failed to fetch user donation statistics",
                    error: err.message,
                })
                .code(500);
        }
    },

    async getOverallDonationStats(request, h) {
        try {
            const stats = await donorHistoryModel.getDonationStats();

            return h
                .response({
                    success: true,
                    data: stats,
                    message: "Overall donation statistics fetched successfully",
                })
                .code(200);
        } catch (err) {
            return h
                .response({
                    success: false,
                    message: "Failed to fetch overall donation statistics",
                    error: err.message,
                })
                .code(500);
        }
    }
};