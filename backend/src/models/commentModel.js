const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

module.exports = {
    async getAll(supabase) {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async getById(id) {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    async create({ post_id, user_id, content }, supabase) {
        const { data, error } = await supabase
            .from('comments')
            .insert([{ post_id, user_id, content }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async update(id, content) {
        const { data, error } = await supabase
            .from('comments')
            .update({ content, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async delete(id, supabase) {
        const { error } = await supabase
            .from('comments')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    }
};


