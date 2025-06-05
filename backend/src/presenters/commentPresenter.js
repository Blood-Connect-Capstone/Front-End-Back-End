const commentModel = require('../models/commentModel');
const { createClient } = require('@supabase/supabase-js');

const createSupabaseClient = (token) => {
    return createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY,
        {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        }
    );
};

const extractToken = (request, h) => {
    const authHeader = request.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
        throw h.response({
            success: false,
            message: 'Unauthorized: token missing',
        }).code(401);
    }

    return token;
};

module.exports = {
    async getAllComment(request, h) {
        try {
            const token = extractToken(request, h);
            const supabase = createSupabaseClient(token);
            const comments = await commentModel.getAll(supabase);

            return h.response({
                success: true,
                data: comments,
                message: 'Comments fetched successfully'
            }).code(200);
        } catch (err) {
            if (err.isBoom || err.statusCode) {
                return err;
            }

            return h.response({
                success: false,
                message: 'Failed to fetch comments',
                error: err.message
            }).code(500);
        }
    },

    async getCommentById(request, h) {
        try {
            const { id } = request.params;
            const comment = await commentModel.getById(id);

            return h.response({
                success: true,
                data: comment,
                message: 'Comment fetched successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Comment not found',
                error: err.message
            }).code(404);
        }
    },

    async createComment(request, h) {
        try {
            const token = extractToken(request, h);
            const supabase = createSupabaseClient(token);
            const comment = await commentModel.create(request.payload, supabase);

            return h.response({
                success: true,
                data: comment,
                message: 'Comment created successfully'
            }).code(201);
        } catch (err) {
            if (err.isBoom || err.statusCode) {
                return err;
            }

            return h.response({
                success: false,
                message: 'Failed to create comment',
                error: err.message
            }).code(500);
        }
    },

    async updateComment(request, h) {
        try {
            const { id } = request.params;
            const { content } = request.payload;
            const updatedComment = await commentModel.update(id, content);

            return h.response({
                success: true,
                data: updatedComment,
                message: 'Comment updated successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to update comment',
                error: err.message
            }).code(500);
        }
    },

    async deleteComment(request, h) {
        try {
            const token = extractToken(request, h);
            const supabase = createSupabaseClient(token);
            const { id } = request.params;

            await commentModel.delete(id, supabase);

            return h.response({
                success: true,
                message: 'Comment deleted successfully'
            }).code(200);
        } catch (err) {
            if (err.isBoom || err.statusCode) {
                return err;
            }

            return h.response({
                success: false,
                message: 'Failed to delete comment',
                error: err.message
            }).code(500);
        }
    }
};