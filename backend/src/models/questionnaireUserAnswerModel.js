const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

module.exports = {
    async getAll() {
        const { data, error } = await supabase
            .from('questionnaire_user_answers')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async getById(id) {
        const { data, error } = await supabase
            .from('questionnaire_user_answers')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    async getByUserId(user_id) {
        const { data, error } = await supabase
            .from('questionnaire_user_answers')
            .select('*')
            .eq('user_id', user_id)
            .order('created_at', { ascending: true });

        if (error) throw error;
        return data;
    },

    async create(answer) {
        const { user_id, donor_reservation_id, question_id, option_id, manual_input } = answer;

        const { data, error } = await supabase
            .from('questionnaire_user_answers')
            .insert([{ user_id, donor_reservation_id, question_id, option_id, manual_input }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async update(id, answer) {
        const { user_id, donor_reservation_id, question_id, option_id, manual_input } = answer;

        const { data, error } = await supabase
            .from('questionnaire_user_answers')
            .update({ user_id, donor_reservation_id, question_id, option_id, manual_input })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }, async remove(id) {
        const { error } = await supabase
            .from('questionnaire_user_answers')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    },

    async createBulk(user_id, answers) {
        const dataToInsert = answers.map(answer => ({
            user_id: user_id,
            donor_reservation_id: answer.donorReservationId || null,
            question_id: answer.questionId,
            option_id: answer.optionId,
            manual_input: answer.manualInput || null
        }));

        const { data, error } = await supabase
            .from('questionnaire_user_answers')
            .insert(dataToInsert)
            .select();

        if (error) throw error;
        return data;
    }
};
