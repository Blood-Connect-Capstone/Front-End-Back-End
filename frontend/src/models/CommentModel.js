import axios from 'axios';
import { getAuthHeaders } from '../composables/supabaseClient.js';

const BASE_URL = import.meta.env.VITE_API_URL;

export const createComment = async (commentData) => {
    try {
        const response = await axios.post(`${BASE_URL}/comments`, commentData, {
            headers: await getAuthHeaders()
        });

        return response.data;
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
};

export const deleteComment = async (commentId) => {
    try {
        await axios.delete(`${BASE_URL}/comments/${commentId}`, {
            headers: await getAuthHeaders()
        });

        return true;
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};