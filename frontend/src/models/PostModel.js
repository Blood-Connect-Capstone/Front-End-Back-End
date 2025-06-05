import axios from 'axios';
import { getAuthHeaders } from '../composables/supabaseClient.js';

const BASE_URL = import.meta.env.VITE_API_URL;

export const getAllPosts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/posts`, {
            headers: await getAuthHeaders()
        });

        return response.data.data.map(post => ({
            ...post,
            showComments: false,
            comments: post.comments || [],
            category: post.category || 'pengalaman'
        }));
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const createPost = async (postData) => {
    try {
        const response = await axios.post(`${BASE_URL}/posts`, postData, {
            headers: await getAuthHeaders()
        });

        return response.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

export const deletePost = async (postId) => {
    try {
        await axios.delete(`${BASE_URL}/posts/${postId}`, {
            headers: await getAuthHeaders()
        });

        return true;
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};