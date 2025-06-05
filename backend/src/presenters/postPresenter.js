const postModel = require('../models/postModel');
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
    async getAllPost(request, h) {
        try {
            const token = extractToken(request, h);
            const supabase = createSupabaseClient(token);
            const posts = await postModel.getAll(supabase);

            return h.response({
                success: true,
                data: posts,
                message: 'Posts fetched successfully'
            }).code(200);
        } catch (err) {
            if (err.isBoom || err.statusCode) {
                return err;
            }

            return h.response({
                success: false,
                message: 'Failed to fetch posts',
                error: err.message
            }).code(500);
        }
    },

    async createPost(request, h) {
        try {
            const token = extractToken(request, h);
            const supabase = createSupabaseClient(token);
            const post = await postModel.create(request.payload, supabase);

            return h.response({
                success: true,
                data: post,
                message: 'Post created successfully'
            }).code(201);
        } catch (err) {
            if (err.isBoom || err.statusCode) {
                return err;
            }

            return h.response({
                success: false,
                message: 'Failed to create post',
                error: err.message
            }).code(500);
        }
    },

    async updatePost(request, h) {
        try {
            const { id } = request.params;
            const { content, category } = request.payload;
            const updatedPost = await postModel.update(id, content, category);

            return h.response({
                success: true,
                data: updatedPost,
                message: 'Post updated successfully'
            }).code(200);
        } catch (err) {
            return h.response({
                success: false,
                message: 'Failed to update post',
                error: err.message
            }).code(500);
        }
    },

    async deletePost(request, h) {
        try {
            const token = extractToken(request, h);
            const supabase = createSupabaseClient(token);
            const { id } = request.params;

            await postModel.delete(id, supabase);

            return h.response({
                success: true,
                message: 'Post deleted successfully'
            }).code(200);
        } catch (err) {
            if (err.isBoom || err.statusCode) {
                return err;
            }

            return h.response({
                success: false,
                message: 'Failed to delete post',
                error: err.message
            }).code(500);
        }
    }
};