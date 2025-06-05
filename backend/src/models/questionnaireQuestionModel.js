const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

module.exports = {
    async getAll() {
        const { data, error } = await supabase
            .from('questionnaire_questions')
            .select('*, questionnaire_question_options(*)')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async getById(id) {
        const { data, error } = await supabase
            .from('questionnaire_questions')
            .select('*, questionnaire_question_options(*)')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    async create({ stage, text }) {
        const { data, error } = await supabase
            .from('questionnaire_questions')
            .insert([{ stage, text }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async update(id, { stage, text }) {
        const { data, error } = await supabase
            .from('questionnaire_questions')
            .update({ stage, text })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async remove(id) {
        const { error } = await supabase
            .from('questionnaire_questions')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    }
};
