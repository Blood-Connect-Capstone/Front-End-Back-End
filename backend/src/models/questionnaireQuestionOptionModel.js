const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

module.exports = {
    async getAll() {
        const { data, error } = await supabase
            .from('questionnaire_question_options')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async getById(id) {
        const { data, error } = await supabase
            .from('questionnaire_question_options')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    async getByQuestionId(question_id) {
        const { data, error } = await supabase
            .from('questionnaire_question_options')
            .select('*')
            .eq('question_id', question_id)
            .order('created_at', { ascending: true });

        if (error) throw error;
        return data;
    },

    async create(option) {
        const { question_id, code, label, description, logic_action, logic_notes } = option;
        const { data, error } = await supabase
            .from('questionnaire_question_options')
            .insert([{ question_id, code, label, description, logic_action, logic_notes }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async update(id, option) {
        const { question_id, code, label, description, logic_action, logic_notes } = option;
        const { data, error } = await supabase
            .from('questionnaire_question_options')
            .update({ question_id, code, label, description, logic_action, logic_notes })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async delete(id) {
        const { error } = await supabase
            .from('questionnaire_question_options')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    }
};
