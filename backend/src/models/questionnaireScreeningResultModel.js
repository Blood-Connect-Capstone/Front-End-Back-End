const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

module.exports = {
    async getAll() {
        const { data, error } = await supabase
            .from('questionnaire_screening_results')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async getById(id) {
        const { data, error } = await supabase
            .from('questionnaire_screening_results')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    async getByUserId(user_id) {
        const { data, error } = await supabase
            .from('questionnaire_screening_results')
            .select('*')
            .eq('user_id', user_id)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async create(result) {
        const { user_id, final_result, notes } = result;

        const { data, error } = await supabase
            .from('questionnaire_screening_results')
            .insert([{ user_id, final_result, notes }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async update(id, result) {
        const { user_id, final_result, notes } = result;
        const { data, error } = await supabase
            .from('questionnaire_screening_results')
            .update({ user_id, final_result, notes })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async delete(id) {
        const { error } = await supabase
            .from('questionnaire_screening_results')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    }
};
