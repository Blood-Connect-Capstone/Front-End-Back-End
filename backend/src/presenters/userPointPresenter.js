const userPointsModel = require("../models/userPointModel");

module.exports = {
    async getUserPointsByUser(request, h) {
        try {
            const { userId } = request.params;
            const userPoints = await userPointsModel.getByUserId(userId);

            return h
                .response({
                    success: true,
                    data: userPoints,
                    message: "User points fetched successfully",
                })
                .code(200);
        } catch (err) {
            return h
                .response({
                    success: false,
                    message: "Failed to fetch user points",
                    error: err.message,
                })
                .code(500);
        }
    },

    async createUserPoints(request, h) {
        try {
            const { user_id, amount, source, description } = request.payload;

            if (!user_id || !amount) {
                return h
                    .response({
                        success: false,
                        message: "user_id and amount are required",
                    })
                    .code(400);
            }

            if (isNaN(amount) || parseInt(amount) === 0) {
                return h
                    .response({
                        success: false,
                        message: "Amount must be a valid number and not zero",
                    })
                    .code(400);
            }

            const userPoints = await userPointsModel.create({
                user_id,
                amount,
                source,
                description
            });

            return h
                .response({
                    success: true,
                    data: userPoints,
                    message: "User points created successfully",
                })
                .code(201);
        } catch (err) {
            return h
                .response({
                    success: false,
                    message: "Failed to create user points",
                    error: err.message,
                })
                .code(500);
        }
    },

    async updateUserPoints(request, h) {
        try {
            const { id } = request.params;
            const { amount, source, description } = request.payload;

            if (amount !== undefined && (isNaN(amount) || parseInt(amount) === 0)) {
                return h
                    .response({
                        success: false,
                        message: "Amount must be a valid number and not zero",
                    })
                    .code(400);
            }

            const updatedUserPoints = await userPointsModel.update(id, {
                amount,
                source,
                description
            });

            return h
                .response({
                    success: true,
                    data: updatedUserPoints,
                    message: "User points updated successfully",
                })
                .code(200);
        } catch (err) {
            return h
                .response({
                    success: false,
                    message: "Failed to update user points",
                    error: err.message,
                })
                .code(500);
        }
    },

    async deleteUserPoints(request, h) {
        try {
            const { id } = request.params;
            await userPointsModel.delete(id);

            return h
                .response({
                    success: true,
                    message: "User points deleted successfully",
                })
                .code(200);
        } catch (err) {
            return h
                .response({
                    success: false,
                    message: "Failed to delete user points",
                    error: err.message,
                })
                .code(500);
        }
    },

    async getUserPointsStats(request, h) {
        try {
            const { userId } = request.params;
            const stats = await userPointsModel.getTotalPointsByUser(userId);

            return h
                .response({
                    success: true,
                    data: stats,
                    message: "User points statistics fetched successfully",
                })
                .code(200);
        } catch (err) {
            return h
                .response({
                    success: false,
                    message: "Failed to fetch user points statistics",
                    error: err.message,
                })
                .code(500);
        }
    },

    async getOverallPointsStats(request, h) {
        try {
            const stats = await userPointsModel.getPointsStats();

            return h
                .response({
                    success: true,
                    data: stats,
                    message: "Overall points statistics fetched successfully",
                })
                .code(200);
        } catch (err) {
            return h
                .response({
                    success: false,
                    message: "Failed to fetch overall points statistics",
                    error: err.message,
                })
                .code(500);
        }
    },

    async getPointsBySource(request, h) {
        try {
            const stats = await userPointsModel.getPointsBySource();

            return h
                .response({
                    success: true,
                    data: stats,
                    message: "Points by source statistics fetched successfully",
                })
                .code(200);
        } catch (err) {
            return h
                .response({
                    success: false,
                    message: "Failed to fetch points by source statistics",
                    error: err.message,
                })
                .code(500);
        }
    }
};