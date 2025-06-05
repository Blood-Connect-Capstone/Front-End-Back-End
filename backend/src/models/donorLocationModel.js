const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

module.exports = {
    async getAll() {
        const { data, error } = await supabase
            .from('donor_locations')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async getById(id) {
        const { data, error } = await supabase
            .from('donor_locations')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    async create(donorLocation) {
        const { name, address, lat, lng, phone, hours } = donorLocation;

        const { data, error } = await supabase
            .from('donor_locations')
            .insert([{ name, address, lat, lng, phone, hours }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async update(id, donorLocation) {
        const { name, address, lat, lng, phone, hours } = donorLocation;

        const { data, error } = await supabase
            .from('donor_locations')
            .update({ name, address, lat, lng, phone, hours })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async delete(id) {
        const { error } = await supabase
            .from('donor_locations')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    }
};
