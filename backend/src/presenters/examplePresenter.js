const exampleModel = require('../models/exampleModel');

module.exports = {
    async getAllUsers(request, h) {
        try {
            const users = await exampleModel.getAll();
            return h.response({
                success: true,
                message: 'Users fetched successfully',
                data: users
            });
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to fetch users',
                error: err.message
            }).code(500);
        }
    },

    async createUser(request, h) {
        try {
            const { name, email } = request.payload;
            await exampleModel.create({ name, email });
            return h.response({
                success: true,
                message: 'User created successfully'
            }).code(201);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to create user',
                error: err.message
            }).code(500);
        }
    },

    async updateUser(request, h) {
        try {
            const { id } = request.params;
            const { name, email } = request.payload;
            await exampleModel.update(id, { name, email });
            return h.response({
                success: true,
                message: 'User updated successfully'
            });
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to update user',
                error: err.message
            }).code(500);
        }
    },

    async deleteUser(request, h) {
        try {
            const { id } = request.params;
            await exampleModel.delete(id);
            return h.response({
                success: true,
                message: 'User deleted successfully'
            });
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to delete user',
                error: err.message
            }).code(500);
        }
    }
};
